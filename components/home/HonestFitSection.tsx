import React from 'react';
import Link from 'next/link';
import {
  XCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

/**
 * HonestFitSection — Brand Voice Honest Disqualification Block
 *
 * Purpose: Build genuine trust by telling visitors clearly when SIJAM is NOT
 * the right agency for them. This eliminates wasted advisory time, reduces
 * refund disputes, and signals institutional credibility to Google (E-E-A-T).
 *
 * Competitor gap: Zero of the top 3 SERP competitors (TransCareers, Harvard Consults,
 * Soundlines) feature an honest disqualification statement. This is a unique
 * Information Gain differentiator.
 */
export const HonestFitSection: React.FC = () => {
  const notForYou = [
    {
      label: 'You expect a guaranteed visa approval.',
      detail:
        "No agency — including embassies — can lawfully guarantee any sovereign government's immigration decision. If another consultant has promised you a guaranteed outcome, treat that as a serious red flag.",
    },
    {
      label: 'You are unwilling to provide authentic documentation.',
      detail:
        'Every application we submit is audited for 100% documentary integrity. We do not proceed with cases that require fabricated bank statements, forged academic transcripts, or fictitious employment records.',
    },
    {
      label: 'You want results within days for a statutory permit.',
      detail:
        'European work permits and university admission processes run on government statutory timelines — typically 6 to 20 weeks, depending on the country and case type. We give you realistic windows, not false urgency.',
    },
    {
      label: 'You are searching for the cheapest option with no due diligence.',
      detail:
        'Our advisory fees reflect senior consultant time, institutional filing precision, and real employer partnerships. We are not the right fit if cost alone drives your decision without regard for compliance or track record.',
    },
    {
      label: 'Your case involves a known immigration violation or previous deportation.',
      detail:
        'Cases involving undisclosed prior refusals, immigration bans, or active deportation orders require specialist legal representation beyond our scope of consultancy services.',
    },
  ];

  const rightForYou = [
    'You want a CAC-registered, verifiable Nigerian consultancy (RC: 1715416)',
    'You are prepared to invest in a thorough, compliant application process',
    'You can meet authentic documentation requirements for your category',
    'You understand visa decisions rest with sovereign foreign governments',
    'You value honest timelines and transparent, milestone-based billing',
    'You are a student, skilled professional, or employer seeking ethical global pathways',
  ];

  return (
    <section
      className="py-20 lg:py-28 bg-[#07040F] text-white border-b border-white/5 relative overflow-hidden"
      aria-labelledby="honest-fit-heading"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#DC2F11]/6 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-[#402493]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Honest Agency Assessment
            </span>
          </div>

          <h2
            id="honest-fit-heading"
            className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]"
          >
            We May Not Be the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Right Fit For You
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            We turn away enquiries we cannot serve ethically. Read the points below before
            contacting us — it saves everyone's time, and it's how a trustworthy consultancy
            should operate.
          </p>
        </div>

        {/* Two-column layout: NOT for you / IS for you */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* Column 1 — NOT right for you */}
          <div className="rounded-3xl bg-[#1A0505]/60 border border-red-900/30 p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-red-900/30">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="font-heading font-bold text-base text-white">
                  SIJAM is probably NOT right for you if…
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Honest criteria — no hard feelings
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {notForYou.map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <XCircle className="w-4 h-4 text-red-500/70 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white/90 leading-snug">
                      {item.label}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory Notice */}
            <div className="pt-4 border-t border-red-900/20">
              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                Sijam Consults Limited (CAC RC: 1715416) is a registered Nigerian advisory
                consultancy. We are not an embassy, consulate, or sovereign visa-issuing
                authority. Visa decisions rest solely with foreign government immigration
                agencies.
              </p>
            </div>
          </div>

          {/* Column 2 — IS right for you */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0A1A10]/80 to-[#051210]/80 border border-emerald-900/30 p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-emerald-900/30">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-heading font-bold text-base text-white">
                  SIJAM IS the right choice if…
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Clients who thrive with us
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {rightForYou.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-200 leading-relaxed font-normal">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Block */}
            <div className="pt-6 border-t border-emerald-900/20 space-y-3">
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Start with a free eligibility pre-check — no obligation</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={ROUTES.assessment}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-sm tracking-wide shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Check My Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={ROUTES.whyChooseUs}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-semibold text-sm border border-white/10 transition-all hover:scale-[1.02]"
                >
                  Our Full Methodology
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust nudge */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We have turned away cases we could not handle ethically. We will do the same for yours
            if honesty demands it. That policy has never changed since our founding (CAC registered
            consultancy, Kaduna HQ &amp; Abuja Advisory Desk).
          </p>
        </div>
      </div>
    </section>
  );
};
