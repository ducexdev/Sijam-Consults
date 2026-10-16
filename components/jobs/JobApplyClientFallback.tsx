'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JobListing } from '@/lib/types';
import { JOBS_DATA } from '@/lib/data/jobs';
import { JobApplicationForm } from './JobApplicationForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ROUTES } from '@/lib/routes';
import { Briefcase, ArrowLeft } from 'lucide-react';

interface Props {
  slug: string;
}

export const JobApplyClientFallback: React.FC<Props> = ({ slug }) => {
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check static JOBS_DATA
    const staticJob = JOBS_DATA.find((j) => j.slug === slug);
    if (staticJob) {
      setJob(staticJob);
      setLoading(false);
      return;
    }

    // 2. Check localStorage for frontend management-posted jobs
    try {
      const stored = localStorage.getItem('sijam_posted_jobs');
      if (stored) {
        const list: JobListing[] = JSON.parse(stored);
        const found = list.find((j) => j.slug === slug || j.id === slug);
        if (found) {
          setJob(found);
          setLoading(false);
          return;
        }
      }
    } catch {}

    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading application intake...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Job Opportunity Not Found</h2>
        <p className="text-sm text-slate-600">
          This quota may have been filled or expired. Please explore other available European vacancies.
        </p>
        <Link
          href={ROUTES.jobs.root}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FAF8FF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'Opportunities', href: ROUTES.jobs.root },
            { label: job.title, href: `/jobs/${job.slug}` },
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
            Position with <strong className="text-slate-800">{job.companyName}</strong> in{' '}
            <strong className="text-slate-800">{job.location}</strong>. Complete the intake form below to begin evaluation.
          </p>
        </div>

        <JobApplicationForm job={job} />
      </div>
    </div>
  );
};
