import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  DollarSign,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { JobPostingSchema } from '@/components/seo/JobPostingSchema';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { JOBS_DATA, jobRecordToJobListing } from '@/lib/data/jobs';
import { dbRepository } from '@/lib/db/repository';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { generatePageMetadata } from '@/lib/seo/metadata';

import { JobDetailClientFallback } from '@/components/jobs/JobDetailClientFallback';

export async function generateStaticParams() {
  return JOBS_DATA.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const staticJob = JOBS_DATA.find((j) => j.slug === slug);
  const dbJob = !staticJob ? await dbRepository.getJobBySlug(slug) : null;
  const job = staticJob || (dbJob ? jobRecordToJobListing(dbJob) : null);
  if (!job) return { title: 'Foreign Opportunity Details | Sijam Consults' };
  return generatePageMetadata({
    title: `${job.title} in ${job.location}`,
    description: `${job.description.slice(0, 155)}...`,
    path: `/jobs/${job.slug}`,
  });
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticJob = JOBS_DATA.find((j) => j.slug === slug);
  const dbJob = !staticJob ? await dbRepository.getJobBySlug(slug) : null;
  const job = staticJob || (dbJob ? jobRecordToJobListing(dbJob) : null);

  if (!job) {
    notFound();
  }

  return (
    <PublicLayout>
      <JobPostingSchema job={job} />
      <BreadcrumbSchema
        items={[
          { label: 'Jobs Directory', href: '/jobs' },
          { label: job.title, href: `/jobs/${job.slug}` },
        ]}
      />
      <div className="py-10 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Jobs Directory', href: ROUTES.jobs.root },
              { label: job.title },
            ]}
          />

          {/* Job Header Card */}
          <Card variant="light" className="p-6 sm:p-8 mb-8 border border-purple-100 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="purple" size="sm">
                    {job.category}
                  </Badge>
                  <span className="text-xs bg-purple-50 text-purple-900 border border-purple-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <span>{job.flag || '🌍'}</span>
                    <span>{job.country}</span>
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold">
                    {job.employmentType}
                  </span>
                  {job.ageRequirement && (
                    <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <span>🎂 Age:</span>
                      <span>{job.ageRequirement}</span>
                    </span>
                  )}
                  {job.processingTime && (
                    <span className="text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Processing: {job.processingTime}</span>
                    </span>
                  )}
                  {job.eligibleCountries && job.eligibleCountries.length > 0 && (
                    <span className="text-xs bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <span>🌍 Passports:</span>
                      <span>{job.eligibleCountries.join(', ')}</span>
                    </span>
                  )}
                  {job.isEmployerVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Host Employer
                    </span>
                  )}
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    Status: {job.status}
                  </span>
                </div>

                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0F172A]">
                  {job.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {job.companyName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  {job.salaryRange && (
                    <span className="text-[#F45A2A] font-bold">
                      {job.salaryRange}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>Published: {formatDate(job.postedDate)}</span>
                  <span>•</span>
                  <span className="text-rose-600 font-semibold">
                    Application Deadline: {formatDate(job.deadline)}
                  </span>
                </div>
              </div>

              <div className="shrink-0 pt-2 sm:pt-0">
                <Button
                  href={`/jobs/${job.slug}/apply`}
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto shadow-lg"
                >
                  Apply for Position <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Job Details Content */}
          <div className="space-y-8">
            {/* Overview */}
            <Card variant="light" className="p-6 sm:p-8 space-y-4">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                Position Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {job.description}
              </p>
            </Card>

            {/* Key Responsibilities */}
            <Card variant="light" className="p-6 sm:p-8 space-y-4">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                Key Duties & Responsibilities
              </h2>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#402493] mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Eligibility Requirements */}
            <Card variant="light" className="p-6 sm:p-8 space-y-5 border-l-4 border-l-[#402493]">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                  Eligibility & Candidate Profile
                </h2>
                {job.processingTime && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Processing: {job.processingTime}</span>
                  </span>
                )}
              </div>

              {/* Specific Screening Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {job.ageRequirement && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-base shrink-0">
                      🎂
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                        Age Requirement
                      </div>
                      <div className="text-sm font-extrabold text-amber-950 mt-0.5">
                        Between {job.ageRequirement}
                      </div>
                      <div className="text-[10px] text-amber-800 mt-0.5">
                        Statutory host quota requirement at time of application.
                      </div>
                    </div>
                  </div>
                )}

                {job.eligibleCountries && job.eligibleCountries.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-800 flex items-center justify-center font-bold text-base shrink-0">
                      🌍
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                        Eligible Nationalities
                      </div>
                      <div className="text-sm font-extrabold text-blue-950 mt-0.5">
                        {job.eligibleCountries.join(', ')}
                      </div>
                      <div className="text-[10px] text-blue-800 mt-0.5">
                        Verified passport eligibility designated by host employer.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* General Worker Trade Capabilities Callout */}
              {job.generalWorkerSectors && job.generalWorkerSectors.length > 0 && (
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#402493] font-bold text-xs uppercase tracking-wider">
                    <span>🧰</span>
                    <span>General Worker Operational Domains & Trade Capabilities</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Candidate must have basic hands-on capability across the following practical sectors:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.generalWorkerSectors.map((sector, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-[#402493] text-xs font-bold shadow-xs"
                      >
                        ✓ {sector}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <ul className="space-y-2.5 pt-2">
                {job.eligibilityRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Visa Support Details */}
            <Card variant="light" className="p-6 sm:p-8 space-y-4">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                Work Authorization & Visa Support Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {job.visaSupportDetails}
              </p>
            </Card>

            {/* Application Instructions */}
            <Card variant="light" className="p-6 sm:p-8 space-y-4">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                How to Apply
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {job.applicationInstructions}
              </p>
              <div className="pt-2">
                <Button
                  href={`/jobs/${job.slug}/apply`}
                  variant="primary"
                  size="md"
                >
                  Proceed to Job Application Form
                </Button>
              </div>
            </Card>

            {/* Mandatory Non-Guarantee Statutory Notice */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-[#F45A2A]" />
                <span>Statutory Notice of Separation & Non-Guarantee:</span>
              </div>
              <p className="leading-relaxed">
                {job.disclaimer}
              </p>
              <p className="leading-relaxed text-amber-800">
                Notice: Sijam Consults Limited does not sell jobs, charge illegal job finder fees, or promise consular visa grants. Candidates are assessed on true merit by the foreign employer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
