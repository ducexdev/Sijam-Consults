import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JOBS_DATA } from '@/lib/data/jobs';
import { ROUTES } from '@/lib/routes';
import { JobApplicationForm } from '@/components/jobs/JobApplicationForm';

import { JobApplyClientFallback } from '@/components/jobs/JobApplyClientFallback';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOBS_DATA.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = JOBS_DATA.find((j) => j.slug === slug);
  if (!job) return { title: 'Apply - Foreign Opportunity | Sijam Consults' };

  return {
    title: `Apply: ${job.title} | Sijam Consults Limited`,
    description: `Submit your candidate profile for ${job.title} with ${job.companyName} in ${job.location}.`,
  };
}

export default async function JobApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const job = JOBS_DATA.find((j) => j.slug === slug);

  if (!job) {
    return (
      <PublicLayout>
        <JobApplyClientFallback slug={slug} />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Opportunities', href: ROUTES.jobs.root },
              { label: job.title, href: ROUTES.jobs.detail(job.slug) },
              { label: 'Apply' },
            ]}
          />

          <div className="text-center max-w-2xl mx-auto mb-8 mt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#402493] bg-purple-100 px-3 py-1 rounded-full">
              Verified Candidate Intake
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight mt-3">
              Application for {job.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Position with <strong className="text-slate-800">{job.companyName}</strong> in <strong className="text-slate-800">{job.location}</strong>. Complete the intake form below to begin evaluation.
            </p>
          </div>

          <JobApplicationForm job={job} />
        </div>
      </div>
    </PublicLayout>
  );
}
