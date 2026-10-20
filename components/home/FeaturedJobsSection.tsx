'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { JOBS_DATA } from '@/lib/data/jobs';
import { ROUTES } from '@/lib/routes';

/** Sort all Open jobs newest-first by postedDate */
const latestJobs = [...JOBS_DATA]
  .filter((j) => j.status === 'Open')
  .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());

/** Duplicate list so the infinite-loop illusion works (need at least 2× cards) */
const LOOP_JOBS = latestJobs.length > 0 ? [...latestJobs, ...latestJobs] : [];

const CARD_WIDTH_PX = 340; // card width + gap — matches CSS below
const GAP_PX = 24;
const CARD_TOTAL = CARD_WIDTH_PX + GAP_PX;
const AUTO_SCROLL_SPEED = 0.6; // pixels per animation frame (~36px/s at 60fps)

export const FeaturedJobsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0); // current scroll position in px
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const totalUniqueWidth = latestJobs.length * CARD_TOTAL;

  // Keep pausedRef in sync so the rAF loop can read it without stale closure
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const tick = useCallback(() => {
    if (!pausedRef.current && trackRef.current) {
      posRef.current += AUTO_SCROLL_SPEED;
      // When we've scrolled one full set of unique cards, reset silently
      if (posRef.current >= totalUniqueWidth) {
        posRef.current -= totalUniqueWidth;
      }
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [totalUniqueWidth]);

  useEffect(() => {
    if (latestJobs.length === 0) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // Manual arrow navigation (nudges by one card width)
  const nudge = (direction: 'prev' | 'next') => {
    posRef.current =
      direction === 'next'
        ? Math.min(posRef.current + CARD_TOTAL, totalUniqueWidth - 1)
        : Math.max(posRef.current - CARD_TOTAL, 0);
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.35s ease';
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
      }, 380);
    }
  };

  return (
    <section
      className="py-20 lg:py-28 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden"
      aria-label="Featured Overseas Employment Quotas"
    >
      {/* Background glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#402493]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#257CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">

        {/* ── Section Header ─────────────────────────────────────────── */}
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
              Active corporate recruitment corridors backed by verified destination labor ministry
              approvals. Updated as new quotas are confirmed — hover any card to pause.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Manual prev / next arrows */}
            {latestJobs.length > 0 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => nudge('prev')}
                  aria-label="Previous job"
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => nudge('next')}
                  aria-label="Next job"
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <Link
              href={ROUTES.jobs.root}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4DA5EC] hover:text-white transition-colors group"
            >
              <span>All Active Vacancies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Sliding Carousel or Empty State ────────────────────────── */}
        {latestJobs.length > 0 ? (
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* Left / Right fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070415] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070415] to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{ gap: `${GAP_PX}px` }}
            >
              {LOOP_JOBS.map((job, idx) => (
                <div
                  key={`${job.id}-${idx}`}
                  className="shrink-0 group relative p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#4DA5EC]/50 transition-all duration-300 flex flex-col justify-between shadow-lg backdrop-blur-sm cursor-pointer"
                  style={{ width: `${CARD_WIDTH_PX}px` }}
                >
                  <div className="space-y-4">
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-medium">
                        <span>{job.flag}</span>
                        <span>{job.country}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#4DA5EC] bg-[#4DA5EC]/10 px-2 py-0.5 rounded border border-[#4DA5EC]/20 truncate max-w-[140px]">
                        {job.category}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <div>
                      <h3 className="font-heading font-bold text-base text-white group-hover:text-[#4DA5EC] transition-colors leading-snug line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </p>
                    </div>

                    {/* Salary & Perks */}
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="text-xs font-bold text-emerald-400">{job.salaryRange}</div>
                      {job.perks && job.perks.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {job.perks.slice(0, 2).map((perk, pi) => (
                            <span
                              key={pi}
                              className="text-[10px] text-slate-300 bg-white/5 px-2 py-0.5 rounded"
                            >
                              {perk}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
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
                      tabIndex={0}
                    >
                      <span>View Role &amp; Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-3">
            <Briefcase className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-white">
              No Vacancies Currently Open for Public Intake
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our recruitment corridors open periodically upon receipt of verified employer labor
              quotas. Register your CV with our talent bank to be notified when matching roles
              become available.
            </p>
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs"
            >
              Submit Profile to Talent Bank
            </Link>
          </div>
        )}

        {/* ── Ethical Disclaimer ─────────────────────────────────────── */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 flex items-start sm:items-center gap-3.5 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-[#4DA5EC] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-slate-200">Statutory Transparency:</strong> Sijam Consults
            Limited facilitates file verification, trade test logistics, and consular compliance.
            We never charge unauthorized placement fees, and final hiring and work permit issuance
            decisions rest exclusively with destination employers and sovereign immigration
            authorities.
          </p>
        </div>
      </div>
    </section>
  );
};
