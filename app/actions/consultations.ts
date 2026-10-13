'use server';

import { dbRepository } from '@/lib/db/repository';
import { emailService } from '@/lib/email/smtp';
import { validateConsultationForm } from '@/lib/validation';
import { ConsultationMethod, ConsultationStatus } from '@/lib/types/database';

export interface ConsultationActionResponse {
  success: boolean;
  referenceCode?: string;
  errors?: Record<string, string>;
  message?: string;
}

// Simple in-memory rate limiting map (IP -> timestamp[])
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) {
    return false;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

/**
 * Public Server Action: Submit Consultation Request
 */
export async function submitPublicConsultation(
  formData: {
    serviceSlug: string;
    targetDestination?: string;
    applicantObjective: string;
    fullName: string;
    email: string;
    phone: string;
    preferredMethod: ConsultationMethod;
    preferredDate?: string;
    preferredTimeSlot?: string;
    conditionalData?: Record<string, unknown>;
    notes?: string;
    ndprConsent: boolean;
    honeypot?: string; // Bot protection
  },
  clientIp = '127.0.0.1'
): Promise<ConsultationActionResponse> {
  // 1. Bot Honeypot Check
  if (formData.honeypot && formData.honeypot.trim().length > 0) {
    console.warn('[Spam Protection] Honeypot triggered on consultation request');
    // Silently return fake success to mislead bot
    return { success: true, referenceCode: 'SJM-999999', message: 'Inquiry received.' };
  }

  // 2. Rate Limiting Check
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      message: 'Too many submissions detected. Please wait a minute before submitting again.',
    };
  }

  // 3. Server-Side Input Validation
  const validation = validateConsultationForm({
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    applicantObjective: formData.applicantObjective,
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
    // 4. Persist to Database Repository
    const record = await dbRepository.createConsultation({
      service_slug: formData.serviceSlug,
      target_destination: formData.targetDestination,
      applicant_objective: formData.applicantObjective.trim(),
      full_name: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      preferred_method: formData.preferredMethod,
      preferred_date: formData.preferredDate,
      preferred_time_slot: formData.preferredTimeSlot,
      conditional_data: formData.conditionalData || null,
      notes: formData.notes,
      submission_source: 'website_wizard',
      ndpr_consent: formData.ndprConsent,
    });

    // 5. Audit Log
    await dbRepository.recordAuditLog({
      action: 'consultation.public_submit',
      entity_type: 'consultation_request',
      entity_id: record.id,
      details: {
        reference_code: record.reference_code,
        service: record.service_slug,
        preferred_method: record.preferred_method,
      },
      ip_address: clientIp,
    });

    // 6. Asynchronous Outbound Transactional Emails
    // A. Receipt to Applicant
    emailService.sendConsultationReceipt(record).catch((err) => {
      console.error('[Email Failed] Consultation receipt:', err);
    });

    // B. Internal Staff Alert
    emailService.sendConsultationStaffAlert(record).catch((err) => {
      console.error('[Email Failed] Staff alert:', err);
    });

    return {
      success: true,
      referenceCode: record.reference_code,
      message: 'Your consultation inquiry has been logged successfully.',
    };
  } catch (error) {
    console.error('[Consultation Submission Error]:', error);
    return {
      success: false,
      message: 'An unexpected database error occurred. Please try again or message our Kaduna WhatsApp hotline.',
    };
  }
}

/**
 * Admin Server Action: Update Consultation Status
 */
export async function adminUpdateConsultationStatus(
  id: string,
  newStatus: ConsultationStatus,
  note?: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const updated = await dbRepository.updateConsultationStatus(id, newStatus, note, adminId);
  if (updated) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'consultation.status_change',
      entity_type: 'consultation_request',
      entity_id: id,
      details: { from_status: updated.status, to_status: newStatus, note },
    });
  }
  return updated;
}

/**
 * Admin Server Action: Assign Consultation
 */
export async function adminAssignConsultation(
  id: string,
  staffId: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const assigned = await dbRepository.assignConsultation(id, staffId, adminId);
  if (assigned) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'consultation.assign',
      entity_type: 'consultation_request',
      entity_id: id,
      details: { assigned_to: staffId },
    });
  }
  return assigned;
}

/**
 * Admin Server Action: Schedule Appointment
 */
export async function adminScheduleAppointment(
  data: {
    consultationRequestId: string;
    scheduledAt: string;
    durationMinutes: number;
    meetingMethod: ConsultationMethod;
    meetingLinkOrRoom?: string;
    officerId?: string;
    notes?: string;
  },
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const appt = await dbRepository.scheduleConsultationAppointment({
    consultation_request_id: data.consultationRequestId,
    scheduled_at: data.scheduledAt,
    duration_minutes: data.durationMinutes,
    meeting_method: data.meetingMethod,
    meeting_link_or_room: data.meetingLinkOrRoom,
    officer_id: data.officerId,
    status: 'scheduled',
    notes: data.notes,
  });

  const req = await dbRepository.getConsultationById(data.consultationRequestId);
  if (req) {
    emailService.sendAppointmentConfirmation(appt, req).catch((e) => console.error(e));
  }

  await dbRepository.recordAuditLog({
    user_id: adminId,
    action: 'consultation.appointment_scheduled',
    entity_type: 'consultation_appointment',
    entity_id: appt.id,
    details: { scheduled_at: data.scheduledAt, method: data.meetingMethod },
  });

  return appt;
}

/**
 * Admin Server Action: Reschedule Appointment
 */
export async function adminRescheduleAppointment(
  appointmentId: string,
  newScheduledAt: string,
  reason?: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const appt = await dbRepository.rescheduleConsultationAppointment(appointmentId, newScheduledAt, reason, adminId);
  if (!appt) return null;

  const req = await dbRepository.getConsultationById(appt.consultation_request_id);
  if (req) {
    emailService.sendConsultationRescheduled(appt, req, reason).catch((e) => console.error(e));
  }

  await dbRepository.recordAuditLog({
    user_id: adminId,
    action: 'consultation.appointment_rescheduled',
    entity_type: 'consultation_appointment',
    entity_id: appt.id,
    details: { new_scheduled_at: newScheduledAt, reason },
  });

  return appt;
}

/**
 * Admin Server Action: Cancel Appointment
 */
export async function adminCancelAppointment(
  appointmentId: string,
  reason?: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const appt = await dbRepository.cancelConsultationAppointment(appointmentId, reason, adminId);
  if (!appt) return null;

  const req = await dbRepository.getConsultationById(appt.consultation_request_id);
  if (req) {
    emailService.sendConsultationCancelled(req, reason).catch((e) => console.error(e));
  }

  await dbRepository.recordAuditLog({
    user_id: adminId,
    action: 'consultation.appointment_cancelled',
    entity_type: 'consultation_appointment',
    entity_id: appt.id,
    details: { reason },
  });

  return appt;
}

/**
 * Admin Server Action: Fetch Email Outbox Queue
 */
export async function adminGetEmailOutbox(filter?: { status?: string }) {
  return dbRepository.getEmailOutbox(filter);
}

/**
 * Admin Server Action: Retry Outbox Email Dispatch
 */
export async function adminRetryOutboxEmail(
  id: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const retried = await dbRepository.retryEmailOutbox(id);
  if (retried) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'outbox.retry_dispatch',
      entity_type: 'email_outbox',
      entity_id: id,
      details: { recipient: retried.recipient_email, template: retried.template_name },
    });
  }
  return retried;
}

