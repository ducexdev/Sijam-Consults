'use client';

import React from 'react';
import Link from 'next/link';
import {
  UserCheck,
  FileSearch,
  Send,
  MessageSquareCheck,
  PlaneTakeoff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Profile Intake & Candid Eligibility Review',
      description:
        'We review your qualifications, CV, transcripts, and financial profile to identify realistic, viable pathways—never giving misleading promises.',
      icon: UserCheck,
    },
    {
      step: '02',
      title: 'Forensic Document Audit & Attestation',
      description:
        'Every trade certificate, sponsorship letter, and police character record is forensically audited and authenticated through MFA Abuja where required.',
      icon: FileSearch,
    },
    {
      step: '03',
      title: 'Institutional Filing & Portal Tracking',
      description:
        'We coordinate direct filings with verified foreign employers or universities, managing communication through authorized portals.',
      icon: Send,
    },
    {
      step: '04',
      title: 'Pre-Interview Coaching & Consular Guidance',
      description:
        'Simulated 1-on-1 consular interviews and file presentation coaching to ensure you articulate your purpose clearly and accurately.',
      icon: MessageSquareCheck,
    },
    {
      step: '05',
      title: 'Post-Decision Logistics & Departure Briefing',
      description:
        'Following visa issuance, we facilitate verifiable airline ticketing through Everbright Travels, accommodation guidance, and arrival orientation.',
      icon: PlaneTakeoff,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#402493]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="font-bold uppercase tracking-wider text-[11px] text-purple-200">
              Clear &amp; Accountable Roadmap
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Our 5-Stage{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Advisory &amp; Relocation Framework
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            We replace speculation with systematic milestones. Learn what happens at each stage of your consultation, documentation, and international onboarding.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.07] border border-white/8 hover:border-[#DC2F11]/40 transition-all duration-300 flex flex-col justify-between shadow-lg backdrop-blur-md hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-2xl text-[#F98864]">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#402493]/60 text-purple-200 flex items-center justify-center border border-purple-500/30 group-hover:bg-[#DC2F11] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#F98864] transition-colors leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                      {st.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/8 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified compliance step</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Disclaimer & Action */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-300 max-w-2xl">
            <strong>Advisory Note:</strong> Sijam Consults provides document preparation and procedural guidance. Final visa, permit, and admission decisions are exclusively determined by the sovereign governments and educational institutions involved.
          </p>
          <Link
            href={ROUTES.consultation}
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(37,124,255,0.7)] hover:brightness-110 transition-all"
          >
            <span>Begin Stage 01 Consultation</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
