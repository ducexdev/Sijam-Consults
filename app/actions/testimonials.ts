'use server';

import { dbRepository } from '@/lib/db/repository';
import { emailService } from '@/lib/email/smtp';
import { TestimonialRecord, TestimonialStatus } from '@/lib/types/database';

export interface TestimonialActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

/**
 * Public Server Action: Submit Client Review for Moderation
 */
export async function submitPublicReview(
  formData: {
    clientName: string;
    clientTitle?: string;
    location: string;
    category: 'Study Visa' | 'Work Permit' | 'Schengen Business' | 'Tourist Visa' | 'Document Legalization';
    destinationCountry: string;
    rating: number;
    quote: string;
    fullStory?: string;
    email?: string;
    permissionToPublish: boolean;
    privacyAcknowledged: boolean;
    honeypot?: string;
  },
  clientIp = '127.0.0.1'
): Promise<TestimonialActionResponse> {
  // 1. Honeypot check
  if (formData.honeypot && formData.honeypot.trim().length > 0) {
    return { success: true, message: 'Review received for verification.' };
  }

  // 2. Validation
  const errors: Record<string, string> = {};
  if (!formData.clientName || formData.clientName.trim().length < 2) {
    errors.clientName = 'Please provide your name or display initial.';
  }
  if (!formData.quote || formData.quote.trim().length < 15) {
    errors.quote = 'Please share a meaningful review of your experience (at least 15 characters).';
  }
  if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
    errors.rating = 'Please provide a star rating between 1 and 5.';
  }
  if (!formData.permissionToPublish) {
    errors.permissionToPublish = 'You must grant permission to publish this review.';
  }
  if (!formData.privacyAcknowledged) {
    errors.privacyAcknowledged = 'Privacy acknowledgement is required.';
  }

  // 3. Sensitive Data Protection Check (Prevent leaking passport numbers)
  const sensitivePattern = /\b([A-Z]\d{8}|[A-Z0-9]{9})\b/i;
  if (sensitivePattern.test(formData.quote) || (formData.fullStory && sensitivePattern.test(formData.fullStory))) {
    errors.quote = 'Please do not include passport numbers or sensitive document IDs in your public review.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: 'Please fix the highlighted issues.' };
  }

  try {
    // 4. Save review strictly as PENDING MODERATION (never directly approved)
    const record = await dbRepository.createTestimonial({
      client_name: formData.clientName.trim(),
      client_title: formData.clientTitle?.trim() || null,
      location: formData.location.trim() || 'Nigeria',
      category: formData.category,
      destination_country: formData.destinationCountry.trim() || 'Europe',
      rating: formData.rating,
      quote: formData.quote.trim(),
      full_story: formData.fullStory?.trim() || null,
      proof_type: 'written',
      is_redacted_compliant: true,
      permission_to_publish: formData.permissionToPublish,
      privacy_acknowledged: formData.privacyAcknowledged,
      is_featured: false,
      display_order: 10,
    });

    // 5. Audit Log
    await dbRepository.recordAuditLog({
      action: 'testimonials.public_submit',
      entity_type: 'testimonial',
      entity_id: record.id,
      details: { client_name: record.client_name, rating: record.rating },
      ip_address: clientIp,
    });

    // 6. Optional Email Acknowledgement
    if (formData.email) {
      emailService.sendTestimonialReceipt(record, formData.email).catch((e) => console.error(e));
    }

    return {
      success: true,
      message: 'Thank you! Your review has been submitted to our moderation desk for compliance verification.',
    };
  } catch (error) {
    console.error('[Review Submission Error]:', error);
    return { success: false, message: 'An error occurred submitting your review.' };
  }
}

/**
 * Admin Server Action: Moderate Review (Approve / Reject)
 */
export async function adminModerateReview(
  id: string,
  status: TestimonialStatus,
  reason?: string,
  moderatorId = '00000000-0000-0000-0000-000000000001'
) {
  const updated = await dbRepository.moderateTestimonial(id, status, reason, moderatorId);
  if (updated) {
    await dbRepository.recordAuditLog({
      user_id: moderatorId,
      action: `testimonials.${status}`,
      entity_type: 'testimonial',
      entity_id: id,
      details: { status, reason },
    });
  }
  return updated;
}
