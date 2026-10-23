'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Plane,
  Home,
  Clock,
  Sparkles,
  Users,
  Award,
  Globe2,
  Share2,
  Bookmark,
} from 'lucide-react';
import { JobListing } from '@/lib/types';
import { formatDate, formatRelativeDays } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

interface JobSpecsSlideoverProps {
  job: JobListing | null;
  onClose: () => void;
  showNaira?: boolean;
}

export const JobSpecsSlideover: React.FC<JobSpecsSlideoverProps> = ({
  job,
  onClose,
  showNaira = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [checkedReqs, setCheckedReqs] = useState<number[]>([]);

  useEffect(() => {
    if (!job) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [job, onClose]);

  if (!job) return null;

  const handleToggleReq = (idx: number) => {
    setCheckedReqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/jobs/${job.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-specs-title"
      className="fixed inset-0 z-50 overflow-hidden backdrop-blur-md bg-black/75 flex justify-end animate-fade-in"
    >
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Slideout Panel */}
      <div className="relative w-full max-w-2xl bg-[#0C0824] border-l border-purple-500/30 text-white h-full shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col z-10 animate-slide-in-right">
        {/* Header HUD */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#170E3B] to-[#0E0927] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">{job.flag || '🌍'}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
                Quota Specification
              </span>
              <div className="text-xs text-slate-300 font-semibold">{job.country} • {job.category}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#4DA5EC]"
              title="Share job link"
              aria-label="Share job link"
            >
              <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close job specifications"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-white/10">
          {/* Main Title Block */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-3 py-1 rounded-full font-bold bg-[#402493]/70 text-purple-200 border border-purple-500/30 flex items-center gap-1.5">
                <span aria-hidden="true">{job.flag || '🌍'}</span>
                <span>{job.country}</span>
              </span>
              <span className="px-3 py-1 rounded-full font-medium bg-white/[0.06] text-slate-300 border border-white/10">
                {job.employmentType}
              </span>
              {job.ageRequirement && (
                <span className="px-3 py-1 rounded-full font-bold bg-amber-950/60 text-amber-300 border border-amber-800/40 text-[11px] flex items-center gap-1">
                  <span>🎂 Age:</span>
                  <span>{job.ageRequirement}</span>
                </span>
              )}
              {job.processingTime && (
                <span className="px-3 py-1 rounded-full font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[11px] flex items-center gap-1">
                  <span>⏳ Processing:</span>
                  <span>{job.processingTime}</span>
                </span>
              )}
              {job.eligibleCountries && job.eligibleCountries.length > 0 && (
                <span className="px-3 py-1 rounded-full font-bold bg-blue-950/60 text-blue-300 border border-blue-800/40 text-[11px] flex items-center gap-1">
                  <span>🌍 Passports:</span>
                  <span>{job.eligibleCountries.join(', ')}</span>
                </span>
              )}
              {job.isEmployerVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/40 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  Verified Employer Sponsor
                </span>
              )}
            </div>

            <h2 id="job-specs-title" className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">
              {job.title}
            </h2>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                {job.companyName}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-4 h-4 text-[#F45A2A] shrink-0" />
                {job.location}
              </span>
              {job.vacanciesCount && (
                <span className="text-blue-300 font-semibold text-xs flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  {job.vacanciesCount} Allocations Available
                </span>
              )}
            </div>
          </div>

          {/* Compensation Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-[#0E0927] to-[#120A38] border border-emerald-500/30 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              Statutory Compensation Package
            </span>
            <div className="text-2xl font-black text-emerald-400">
              {job.salaryRange}
            </div>
            <p className="text-xs text-slate-300">
              Contract includes standard host sovereign health coverage, paid leave, and structured social security contributions.
            </p>
          </div>

          {/* Statutory Visa Sponsorship Details */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-purple-500/25 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-[#4DA5EC]" />
              <span>Official Visa & Work Permit Authorization</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {job.visaSupportDetails}
            </p>
            <div className="text-[11px] text-purple-200 font-medium bg-purple-950/50 p-2.5 rounded-xl border border-purple-800/30 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#F45A2A] shrink-0" />
              <span>Full consular visa dossier packaging and appointment advisory managed by Sijam Consults.</span>
            </div>
          </div>

          {/* General Worker Trade Breakdown */}
          {job.generalWorkerSectors && job.generalWorkerSectors.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <span className="text-base">🧰</span>
                <span>General Worker Trade Specializations</span>
              </div>
              <p className="text-xs text-slate-300">
                This quota requires multi-trade basic adaptability across the following operational domains:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.generalWorkerSectors.map((sector, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold"
                  >
                    ✓ {sector}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Relocation Perks */}
          {job.perks && job.perks.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider text-slate-300">
                Included Relocation & Settlement Benefits:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.perks.map((perk, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider text-slate-300">
              Opportunity Overview:
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider text-slate-300">
                Scope of Work & Duties:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] shrink-0 mt-1.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Candidate Eligibility Self-Check */}
          {job.eligibilityRequirements && job.eligibilityRequirements.length > 0 && (
            <div className="space-y-3 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-black text-sm text-white uppercase tracking-wider">
                  Candidate Eligibility Checklist:
                </h3>
                <span className="text-[11px] text-[#4DA5EC] font-semibold">
                  {checkedReqs.length}/{job.eligibilityRequirements.length} Met
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tap each criteria to verify your match before applying:
              </p>
              <div className="space-y-2">
                {job.eligibilityRequirements.map((req, i) => {
                  const isChecked = checkedReqs.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleToggleReq(i)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-black font-bold'
                            : 'border-white/20'
                        }`}
                      >
                        {isChecked && '✓'}
                      </span>
                      <span>{req}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Statutory Notice */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/30 text-[11px] text-purple-300 leading-relaxed">
            <strong>Statutory Disclosure:</strong> Sijam Consults Limited facilitates candidate verification and consular file advisory. We strictly reject forged documents. Sovereign visa approvals remain the prerogative of respective immigration authorities.
          </div>
        </div>

        {/* Footer Fixed Action Bar */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-[#110B2E] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Deadline: </span>
            <strong className="text-white">{formatDate(job.deadline)}</strong>
            <span className="ml-1 text-amber-300 font-semibold">
              ({formatRelativeDays(job.deadline)})
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href={`/jobs/${job.slug}/apply`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs uppercase tracking-wider shadow-cta hover:brightness-110 transition-all text-center"
            >
              <span>Apply for Quota</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
