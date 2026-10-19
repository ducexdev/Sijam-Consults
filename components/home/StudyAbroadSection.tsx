'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  Globe2,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const StudyAbroadSection: React.FC = () => {
  const destinations = [
    {
      country: 'Cyprus (West & North)',
      flag: '🇨🇾',
      highlights: 'Up to 50% tuition grants, affordable cost of living, no IELTS requirement for initial offer.',
      institutions: 'Cyprus West University & partner European campuses.',
    },
    {
      country: 'Poland (EU / Schengen)',
      flag: '🇵🇱',
      highlights: 'Globally recognized Bologna degrees, affordable EUR tuition, post-study European residence paths.',
      institutions: 'Warsaw, Wroclaw & Poznan university partners.',
    },
    {
      country: 'Spain & Malta',
      flag: '🇪🇸',
      highlights: 'English-taught Bachelor & Master degrees, Schengen travel freedom, specialized management degrees.',
      institutions: 'Accredited European business schools & university networks.',
    },
    {
      country: 'United Kingdom & Canada',
      flag: '🇬🇧',
      highlights: 'Direct Master’s degree admissions, healthcare & nursing conversion tracks, dependent spouse support.',
      institutions: 'Designated Learning Institutions (DLIs) & UKVI sponsor universities.',
    },
  ];

  const studentSteps = [
    { num: '01', title: 'Transcript & Eligibility Review', desc: 'Detailed academic evaluation to identify matching programs.' },
    { num: '02', title: 'Direct Application & Grant Matching', desc: 'Direct submission to universities for expedited admission offers & tuition discounts.' },
    { num: '03', title: 'Financial Dossier & Visa Preparation', desc: 'Sponsorship proof, police clearances, and university fee confirmation guidance.' },
    { num: '04', title: 'Pre-Departure & Arrival Orientation', desc: 'Accommodation reservation, airport pickup liaison, and campus registration support.' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#402493]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs text-purple-200">
            <GraduationCap className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              International Student Admissions &amp; Mobility
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Global Education Pathways With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Direct Admissions Support
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Sijam Consults Limited guides Nigerian students into accredited international universities across Europe and North America with verified tuition discounts, transparent documentation, and personalized study visa packaging.
          </p>
        </div>

        {/* 4 Key Destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((d, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.065] border border-white/8 hover:border-[#4DA5EC]/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{d.flag}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#402493]/30 text-purple-200 border border-purple-500/30">
                    Bologna Standard
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-[#4DA5EC] transition-colors">
                    {d.country}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {d.highlights}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/8 text-[11px] text-slate-400">
                <span className="font-semibold text-white/80">Campuses: </span>
                {d.institutions}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Steps Timeline for Students */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#120830] via-[#0D0724] to-[#080417] border border-white/12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Structured Admissions Process
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              From Transcript Review to Visa Approval &amp; Arrival
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We eliminate avoidable study visa refusals through strict financial document audits, academic intent reviews, and simulated embassy interview sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentSteps.map((st, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2">
                <span className="font-heading font-black text-xl text-[#F98864]">{st.num}</span>
                <div className="font-heading font-bold text-xs text-white">{st.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              Looking for 2026/2027 academic intakes? Intakes in Poland, Cyprus, Spain, and the UK are currently open.
            </div>
            <Link
              href={ROUTES.services.studyVisa}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider text-center shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(37,124,255,0.7)] hover:brightness-110 transition-all whitespace-nowrap"
            >
              <span>Explore Study Abroad Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
