import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { emailService } from '@/lib/email/smtp';
import { validateJobApplication } from '@/lib/validation';


export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. Spam Honeypot Check
    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, referenceCode: 'APP-999999', message: 'Application logged.' });
    }

    // 2. Verify Job Availability & Expiration Check
    const job = await dbRepository.getJobBySlug(formData.jobSlug);
    if (!job) {
      return NextResponse.json({ success: false, message: 'The specified job listing could not be found.' }, { status: 404 });
    }

    if (job.status === 'closed' || job.status === 'expired' || !job.accepts_applications) {
      return NextResponse.json({
        success: false,
        message: 'This job listing is currently closed and no longer accepting candidate applications.',
      });
    }

    const deadlineDate = new Date(job.deadline);
    const now = new Date();
    if (deadlineDate < now) {
      return NextResponse.json({
        success: false,
        message: 'The application deadline for this opening has passed.',
      });
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
      return NextResponse.json({
        success: false,
        errors: validation.errors as Record<string, string>,
        message: 'Please complete all required fields and mandatory acknowledgements.',
      });
    }

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

    return NextResponse.json({
      success: true,
      referenceCode: record.reference_code,
      message: 'Your candidate application has been successfully filed with our recruitment desk.',
    });
  } catch (error) {
    console.error('[API /api/jobs/apply] Error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred filing your application. Please try again.' },
      { status: 500 }
    );
  }
}
