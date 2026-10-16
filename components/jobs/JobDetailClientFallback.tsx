'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Building,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  DollarSign,
  ArrowLeft,
  Users,
  Award,
  Globe2,
} from 'lucide-react';
import { JobListing } from '@/lib/types';
import { JOBS_DATA } from '@/lib/data/jobs';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

interface Props {
  slug: string;
}

export const JobDetailClientFallback: React.FC<Props> = ({ slug }) => {
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const staticJob = JOBS_DATA.find((j) => j.slug === slug);
    if (staticJob) {
      setJob(staticJob);
      setLoading(false);
      return;
    }

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
      <div className="py-24 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-[#4DA5EC] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Retrieving foreign quota details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4 text-white">
        <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-2xl font-bold">Opportunity Not Found</h2>
        <p className="text-sm text-slate-300">
          This quota allocation may have expired or been filled. Please explore other available European vacancies.
        </p>
        <Link
          href={ROUTES.jobs.root}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#070415] text-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link
          href={ROUTES.jobs.root}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4DA5EC] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Foreign Positions</span>
        </Link>

        {/* Header Block */}
        <div className="p-7 sm:p-8 rounded-3xl bg-[#0D0826] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="px-3 py-1 rounded-full font-bold bg-[#402493]/70 text-purple-200">
              {job.country}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300">
              {job.employmentType}
            </span>
            {job.isEmployerVerified && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Sponsor
              </span>
            )}
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-4xl text-white">
            {job.title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Building className="w-4 h-4 text-purple-400" />
              {job.companyName}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-4 h-4 text-[#F45A2A]" />
              {job.location}
            </span>
            {job.vacanciesCount && (
              <span className="text-blue-300 font-semibold text-xs flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                {job.vacanciesCount} Allocations Available
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Compensation:</span>
            <div className="text-xl font-black text-emerald-400">{job.salaryRange}</div>
          </div>

          <div className="pt-2">
            <Link
              href={`/jobs/${job.slug}/apply`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs uppercase tracking-wider shadow-cta"
            >
              <span>Apply for Quota</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Visa & Requirements */}
        <div className="p-7 sm:p-8 rounded-3xl bg-[#0D0826] border border-white/10 space-y-6">
          <div className="space-y-2">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#4DA5EC]" />
              <span>Official Visa & Work Permit Pathway</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {job.visaSupportDetails}
            </p>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-5">
            <h3 className="font-bold text-base text-white">Overview:</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-2 border-t border-white/10 pt-5">
              <h3 className="font-bold text-base text-white">Responsibilities:</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {job.eligibilityRequirements && job.eligibilityRequirements.length > 0 && (
            <div className="space-y-2 border-t border-white/10 pt-5">
              <h3 className="font-bold text-base text-white">Eligibility Requirements:</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                {job.eligibilityRequirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
