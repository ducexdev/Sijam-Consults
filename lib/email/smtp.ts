// ==============================================================================
// SIJAM Consults Limited (RC: 1715416) - Transactional Email & cPanel SMTP Service
// ==============================================================================

import {
  ConsultationRequestRecord,
  JobApplicationRecord,
  TestimonialRecord,
  ConsultationAppointmentRecord,
  NotificationRecord,
} from '@/lib/types/database';
import { COMPANY } from '@/lib/routes';
import {
  cpanelEmailTemplates,
  getCPanelSmtpConfig,
  getMaskedSmtpTelemetry,
  emailOutboxStore,
  notificationRecordsStore,
  enqueueAndDispatchEmail,
  isValidEmailAddress,
} from './cpanel-smtp';

export {
  cpanelEmailTemplates,
  getCPanelSmtpConfig,
  getMaskedSmtpTelemetry,
  emailOutboxStore,
  notificationRecordsStore,
  enqueueAndDispatchEmail,
  isValidEmailAddress,
};

// Re-export notification history referencing the centralized store
export const notificationHistory: NotificationRecord[] = notificationRecordsStore;

export function getSmtpConfig() {
  return getCPanelSmtpConfig();
}

/**
 * Unified Email Service Proxy implementing the 10 cPanel Brand Templates
 */
export const emailService = {
  // 1. General Enquiry Receipt
  async sendGeneralEnquiryReceipt(data: {
    fullName: string;
    email: string;
    phone: string;
    serviceCategory: string;
    message: string;
    inquiryReference: string;
  }) {
    const res = await cpanelEmailTemplates.sendGeneralEnquiryReceipt(data);
    return res.success;
  },

  // 2. Consultation Request Received (Pending Verification)
  async sendConsultationReceipt(req: ConsultationRequestRecord): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendConsultationRequestReceived(req);
    return res.success;
  },

  // 3. Consultation Confirmation (Officer Scheduled)
  async sendAppointmentConfirmation(
    appt: ConsultationAppointmentRecord,
    req: ConsultationRequestRecord,
    officerName?: string
  ): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendConsultationConfirmation(appt, req, officerName);
    return res.success;
  },

  // 4. Consultation Rescheduling
  async sendConsultationRescheduled(
    appt: ConsultationAppointmentRecord,
    req: ConsultationRequestRecord,
    reason?: string
  ): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendConsultationRescheduled(appt, req, reason);
    return res.success;
  },

  // 5. Consultation Cancellation
  async sendConsultationCancelled(req: ConsultationRequestRecord, reason?: string): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendConsultationCancelled(req, reason);
    return res.success;
  },

  // 6. Job Application Acknowledgement
  async sendJobApplicationReceipt(app: JobApplicationRecord, jobTitle: string): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendJobApplicationAcknowledgement(app, jobTitle);
    return res.success;
  },

  // 7. Review Submission Acknowledgement (Moderation Receipt)
  async sendTestimonialReceipt(t: TestimonialRecord, email: string): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendReviewSubmissionAcknowledgement(t, email);
    return res.success;
  },

  // 8. Review Publication Notification
  async sendReviewPublishedNotification(t: TestimonialRecord, email: string): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendReviewPublishedNotification(t, email);
    return res.success;
  },

  // 9. Password Reset / Security Token
  async sendSecurityToken(email: string, token: string, officerName: string): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendSecurityToken(email, token, officerName);
    return res.success;
  },

  // 10. Administrative Staff Alert
  async sendConsultationStaffAlert(req: ConsultationRequestRecord): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendAdminStaffAlert({
      category: 'Consultation',
      referenceCode: req.reference_code,
      applicantName: req.full_name,
      summary: `${req.service_slug} | ${req.applicant_objective.slice(0, 100)}...`,
    });
    return res.success;
  },

  async sendAdminStaffAlert(data: {
    category: 'Consultation' | 'Job Application' | 'Contact Enquiry' | 'Review' | 'System';
    referenceCode: string;
    applicantName: string;
    summary: string;
  }): Promise<boolean> {
    const res = await cpanelEmailTemplates.sendAdminStaffAlert(data);
    return res.success;
  },
};
