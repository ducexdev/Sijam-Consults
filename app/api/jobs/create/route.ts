import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { JobStatus } from '@/lib/types/database';
import { requireAdminSession } from '@/lib/auth/require-admin';


export async function POST(request: NextRequest) {
  // ── Authentication Guard ────────────────────────────────────────────────
  const auth = await requireAdminSession(request);
  if (auth.error) return auth.error;
  const actorId = auth.staffId;

  try {
    const body = await request.json();
    const {
      title,
      slug,
      employerId,
      employerName,
      categoryId,
      country,
      location,
      employmentType,
      salaryRange,
      description,
      responsibilities,
      eligibilityRequirements,
      visaSupportDetails,
      applicationInstructions,
      deadline,
      status,
      acceptsApplications,
      ageRequirement,
      eligibleCountries,
      processingTime,
      generalWorkerSectors,
    } = body as {
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
      ageRequirement?: string | null;
      eligibleCountries?: string[] | null;
      processingTime?: string | null;
      generalWorkerSectors?: string[] | null;
      adminId?: string;
    };

    if (!title || !employerName || !description || !deadline) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: title, employerName, description, deadline.' },
        { status: 400 }
      );
    }

    const computedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newJob = await dbRepository.createJob({
      slug: computedSlug,
      title,
      employer_id: employerId || 'e1000000-0000-0000-0000-000000000001',
      employer_name: employerName,
      is_employer_verified: true,
      category_id: categoryId,
      country,
      location,
      employment_type: employmentType,
      salary_range: salaryRange || null,
      age_requirement: ageRequirement || null,
      eligible_countries: eligibleCountries || null,
      processing_time: processingTime || null,
      general_worker_sectors: generalWorkerSectors || null,
      description,
      responsibilities,
      eligibility_requirements: eligibilityRequirements,
      visa_support_details: visaSupportDetails,
      application_instructions: applicationInstructions,
      deadline,
      status,
      accepts_applications: acceptsApplications,
      published_at: status === 'open' ? new Date().toISOString() : null,
      disclaimer:
        'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate file preparation and consular filing protocols. We do not guarantee employment outcomes.',
      created_by: actorId,
    });

    await dbRepository.recordAuditLog({
      user_id: actorId,
      action: 'jobs.create',
      entity_type: 'job',
      entity_id: newJob.id,
      details: { title: newJob.title, status: newJob.status },
    });

    return NextResponse.json({ success: true, job: newJob });
  } catch (error) {
    console.error('[API /api/jobs/create] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create job listing. Please try again.' },
      { status: 500 }
    );
  }
}
