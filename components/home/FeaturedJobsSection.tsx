'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowRight, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';
import { JOBS_DATA } from '@/lib/data/jobs';
import { ROUTES } from '@/lib/routes';

export const FeaturedJobsSection: React.FC = () => {
  // Take open, featured jobs from the real jobs data source
  const featuredJobs = JOBS_DATA.filter((job) => job.status === 'Open').slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#402493]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#257CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs text-purple-200">
              <Briefcase className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span className="font-bold uppercase tracking-wider text-[11px]">
                Verified International Opportunities
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
              Featured Overseas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                Employment Quotas
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Active corporate recruitment corridors backed by verified destination labor ministry approvals. We operate under strict ethical standards with zero unauthorized recruitment deductions.
            </p>
          </div>

          <Link
            href={ROUTES.jobs.root}
            className="shrink-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4DA5EC] hover:text-white transition-colors group"
          >
            <span>Explore All Active Vacancies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Vacancies Grid or Clean Empty State */}
        {featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="group relative p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all duration-300 flex flex-col justify-between shadow-lg backdrop-blur-sm"
              >
                <div className="space-y-4">
                  {/* Top Meta: Flag, Country & Category */}
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-medium">
                      <span>{job.flag}</span>
                      <span>{job.country}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#4DA5EC] bg-[#4DA5EC]/10 px-2 py-0.5 rounded border border-[#4DA5EC]/20">
                      {job.category}
                    </span>
                  </div>

                  {/* Title & Employer */}
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#4DA5EC] transition-colors leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.location}</span>
                    </p>
                  </div>

                  {/* Salary & Perks */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="text-xs font-bold text-emerald-400">
                      {job.salaryRange}
                    </div>
                    {job.perks && job.perks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.perks.slice(0, 2).map((perk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-slate-300 bg-white/5 px-2 py-0.5 rounded"
                          >
                            {perk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Meta & CTA */}
                <div className="pt-5 mt-5 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>Deadline: {job.deadline}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{job.employmentType}</span>
                    </span>
                  </div>

                  <Link
                    href={`/jobs/${job.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs shadow-md hover:brightness-110 transition-all"
                  >
                    <span>View Role Details &amp; Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-3">
            <Briefcase className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-white">No Vacancies Currently Open for Public Intake</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our recruitment corridors open periodically upon receipt of verified employer labor quotas. Register your CV with our talent bank to be notified when matching roles become available.
            </p>
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs"
            >
              Submit Profile to Talent Bank
            </Link>
          </div>
        )}

        {/* Ethical Recruitment Disclaimer */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 flex items-start sm:items-center gap-3.5 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-[#4DA5EC] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-slate-200">Statutory Transparency:</strong> Sijam Consults Limited facilitates file verification, trade test logistics, and consular compliance. We never charge unauthorized placement fees, and final hiring and work permit issuance decisions rest exclusively with destination employers and sovereign immigration authorities.
          </p>
        </div>
      </div>
    </section>
  );
};
