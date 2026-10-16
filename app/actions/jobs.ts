'use server';

import { dbRepository } from '@/lib/db/repository';
import { emailService } from '@/lib/email/smtp';
import { validateJobApplication } from '@/lib/validation';
import { JobApplicationStatus, JobRecord, JobStatus } from '@/lib/types/database';

export interface JobActionResponse {
  success: boolean;
  referenceCode?: string;
  errors?: Record<string, string>;
  message?: string;
}

/**
 * Public Server Action: Submit Candidate Application
 */
export async function submitCandidateApplication(
  formData: {
    jobId: string;
    jobSlug: string;
    fullName: string;
    email: string;
    phone: string;
    cityCountry: string;
    highestEducation: string;
    yearsExperience: string;
    portfolioUrl?: string;
    coverNote?: string;
    resumeFileUrl?: string;
    resumeFilePath?: string;
    confirmedNoGuarantees: boolean;
    ndprConsent: boolean;
    honeypot?: string;
  },
  clientIp = '127.0.0.1'
): Promise<JobActionResponse> {
  // 1. Spam Honeypot Check
  if (formData.honeypot && formData.honeypot.trim().length > 0) {
    return { success: true, referenceCode: 'APP-999999', message: 'Application logged.' };
  }

  // 2. Verify Job Availability & Expiration Check
  const job = await dbRepository.getJobBySlug(formData.jobSlug);
  if (!job) {
    return { success: false, message: 'The specified job listing could not be found.' };
  }

  if (job.status === 'closed' || job.status === 'expired' || !job.accepts_applications) {
    return {
      success: false,
      message: 'This job listing is currently closed and no longer accepting candidate applications.',
    };
  }

  const deadlineDate = new Date(job.deadline);
  const now = new Date();
  if (deadlineDate < now) {
    return {
      success: false,
      message: 'The application deadline for this opening has passed.',
    };
  }

  // 3. Server-side Validation
  const validation = validateJobApplication({
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    highestEducation: formData.highestEducation,
    yearsExperience: formData.yearsExperience,
    confirmedNoGuarantees: formData.confirmedNoGuarantees,
    ndprConsent: formData.ndprConsent,
  });

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors as Record<string, string>,
      message: 'Please complete all required fields and mandatory acknowledgements.',
    };
  }

  try {
    // 4. Persist Candidate Dossier to Private job_applications Table
    const record = await dbRepository.createApplication({
      job_id: job.id,
      job_slug: job.slug,
      job_title: job.title,
      full_name: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      city_country: formData.cityCountry.trim(),
      highest_education: formData.highestEducation,
      years_experience: formData.yearsExperience,
      portfolio_url: formData.portfolioUrl?.trim() || null,
      cover_note: formData.coverNote?.trim() || null,
      resume_file_url: formData.resumeFileUrl || null,
      resume_file_path: formData.resumeFilePath || null,
      confirmed_no_guarantees: formData.confirmedNoGuarantees,
      ndpr_consent: formData.ndprConsent,
      ip_hash: clientIp,
    });

    // 5. Audit Trail
    await dbRepository.recordAuditLog({
      action: 'jobs.candidate_apply',
      entity_type: 'job_application',
      entity_id: record.id,
      details: {
        job_id: job.id,
        job_title: job.title,
        reference_code: record.reference_code,
      },
      ip_address: clientIp,
    });

    // 6. Outbound Email Receipt
    emailService.sendJobApplicationReceipt(record, job.title).catch((err) => {
      console.error('[Email Failed] Job application receipt:', err);
    });

    return {
      success: true,
      referenceCode: record.reference_code,
      message: 'Your candidate application has been successfully filed with our recruitment desk.',
    };
  } catch (error) {
    console.error('[Candidate Application Error]:', error);
    return {
      success: false,
      message: 'An error occurred filing your application. Please try again.',
    };
  }
}

/**
 * Admin Server Action: Create New Job Listing
 */
export async function adminCreateJob(
  jobData: {
    title: string;
    slug?: string;
    employerId?: string | null;
    employerName: string;
    categoryId: string;
    country: string;
    location: string;
    employmentType: 'Full-time' | 'Contract' | 'Seasonal' | 'Apprenticeship';
    salaryRange?: string;
    description: string;
    responsibilities: string[];
    eligibilityRequirements: string[];
    visaSupportDetails: string;
    applicationInstructions: string;
    deadline: string;
    status: JobStatus;
    acceptsApplications: boolean;
  },
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const newJob = await dbRepository.createJob({
    slug: jobData.slug || jobData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: jobData.title,
    employer_id: jobData.employerId || 'e1000000-0000-0000-0000-000000000001',
    employer_name: jobData.employerName,
    is_employer_verified: true,
    category_id: jobData.categoryId,
    country: jobData.country,
    location: jobData.location,
    employment_type: jobData.employmentType,
    salary_range: jobData.salaryRange || null,
    description: jobData.description,
    responsibilities: jobData.responsibilities,
    eligibility_requirements: jobData.eligibilityRequirements,
    visa_support_details: jobData.visaSupportDetails,
    application_instructions: jobData.applicationInstructions,
    deadline: jobData.deadline,
    status: jobData.status,
    accepts_applications: jobData.acceptsApplications,
    published_at: jobData.status === 'open' ? new Date().toISOString() : null,
    disclaimer: 'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate file preparation and consular filing protocols. We do not guarantee employment outcomes.',
    created_by: adminId,
  });

  await dbRepository.recordAuditLog({
    user_id: adminId,
    action: 'jobs.create',
    entity_type: 'job',
    entity_id: newJob.id,
    details: { title: newJob.title, status: newJob.status },
  });

  return newJob;
}

/**
 * Admin Server Action: Update Job
 */
export async function adminUpdateJob(
  id: string,
  updates: Partial<JobRecord>,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const updated = await dbRepository.updateJob(id, updates);
  if (updated) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'jobs.update',
      entity_type: 'job',
      entity_id: id,
      details: updates,
    });
  }
  return updated;
}

/**
 * Admin Server Action: Delete Job Listing
 */
export async function adminDeleteJob(
  id: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const deleted = await dbRepository.deleteJob(id);
  if (deleted) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'jobs.delete',
      entity_type: 'job',
      entity_id: id,
      details: { deleted_job_id: id },
    });
  }
  return deleted;
}

/**
 * Admin Server Action: Toggle Job Status (Open / Closed)
 */
export async function adminToggleJobStatus(
  id: string,
  newStatus: JobStatus,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  return adminUpdateJob(id, { status: newStatus }, adminId);
}

/**
 * Admin Server Action: Review & Transition Candidate Application Status
 */
export async function adminUpdateApplicationStatus(
  id: string,
  newStatus: JobApplicationStatus,
  note?: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const updated = await dbRepository.updateApplicationStatus(id, newStatus, note, adminId);
  if (updated) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'applications.status_change',
      entity_type: 'job_application',
      entity_id: id,
      details: { to_status: newStatus, internal_note: note },
    });
  }
  return updated;
}
