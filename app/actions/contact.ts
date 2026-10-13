'use server';

import { dbRepository } from '@/lib/db/repository';
import { emailService } from '@/lib/email/smtp';
import { validateContactForm } from '@/lib/validation';

export interface ContactActionResponse {
  success: boolean;
  inquiryReference?: string;
  errors?: Record<string, string>;
  message?: string;
}

// In-memory rate limiting map for contact messages (IP -> timestamp[])
const contactRateLimitMap = new Map<string, number[]>();

function checkContactRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = contactRateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) {
    return false;
  }
  recent.push(now);
  contactRateLimitMap.set(ip, recent);
  return true;
}

/**
 * Public Server Action: Submit General Contact Enquiry
 */
export async function submitGeneralEnquiry(
  formData: {
    fullName: string;
    email: string;
    phone: string;
    serviceCategory: string;
    message: string;
    ndprConsent: boolean;
    honeypot?: string;
  },
  clientIp = '127.0.0.1'
): Promise<ContactActionResponse> {
  // 1. Bot Honeypot Protection
  if (formData.honeypot && formData.honeypot.trim().length > 0) {
    console.warn('[Spam Protection] Honeypot triggered on contact form');
    return {
      success: true,
      inquiryReference: 'INQ-999999',
      message: 'Your enquiry has been received.',
    };
  }

  // 2. Rate Limiting Check
  if (!checkContactRateLimit(clientIp)) {
    return {
      success: false,
      message: 'Too many enquiries submitted in a short period. Please wait a minute before trying again.',
    };
  }

  // 3. Server-Side Input Validation
  const validation = validateContactForm({
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
    ndprConsent: formData.ndprConsent,
  });

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors as Record<string, string>,
      message: 'Please resolve the highlighted validation errors.',
    };
  }

  try {
    const inquiryReference = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

    // 4. Persist to Database Repository
    const record = await dbRepository.createContactMessage({
      full_name: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      subject: `Enquiry: ${formData.serviceCategory}`,
      service_category: formData.serviceCategory,
      message: formData.message.trim(),
      status: 'new',
      ndpr_consent: formData.ndprConsent,
    });

    // 5. Immutable Audit Log
    await dbRepository.recordAuditLog({
      action: 'contact.public_submit',
      entity_type: 'contact_message',
      entity_id: record.id,
      details: {
        inquiry_reference: inquiryReference,
        category: formData.serviceCategory,
        email: record.email,
      },
      ip_address: clientIp,
    });

    // 6. Asynchronous cPanel SMTP Autoresponder & Internal Notification
    Promise.all([
      emailService.sendGeneralEnquiryReceipt({
        fullName: record.full_name,
        email: record.email,
        phone: record.phone,
        serviceCategory: record.service_category,
        message: record.message,
        inquiryReference,
      }),
      emailService.sendAdminStaffAlert({
        category: 'Contact Enquiry',
        referenceCode: inquiryReference,
        applicantName: record.full_name,
        summary: `${record.service_category} - "${record.message.slice(0, 80)}..."`,
      }),
    ]).catch((err) => {
      console.error('[SMTP Background Error] Contact dispatch failed:', err);
    });

    return {
      success: true,
      inquiryReference,
      message: 'Your enquiry has been filed with our Kaduna client services desk.',
    };
  } catch (error) {
    console.error('[Contact Submission Error]:', error);
    return {
      success: false,
      message: 'A temporary database error occurred. Please try again or reach our WhatsApp hotline.',
    };
  }
}
