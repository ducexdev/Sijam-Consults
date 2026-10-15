'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Users2,
  Stamp,
  PlaneTakeoff,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const RelocationProcess: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Credential & CV Europass Audit',
      subtitle: 'Document Compliance Stage',
      description:
        'We review your degrees, professional licenses (NMCN, NABTEB, Trade Tests), international passport, and police character certificate to ensure flawless compliance with European and UK labor standards.',
      icon: FileCheck2,
      accent: 'from-blue-500 to-indigo-600',
    },
    {
      step: '02',
      title: 'Certified Employer Quota Allocation',
      subtitle: 'Direct Host Matching',
      description:
        'Your profile is submitted directly to verified European employers with allocated national labor quotas. We facilitate employer interviews, practical trade evaluations, and official offer letters.',
      icon: Users2,
      accent: 'from-purple-500 to-pink-600',
    },
    {
      step: '03',
      title: 'Statutory Work Permit Authorization',
      subtitle: 'Host Government Filing',
      description:
        'The host employer lodges your formal statutory work authorization (e.g. Polish Voivodeship permit, UK Certificate of Sponsorship, or Slovak labor clearance) with provincial foreign labor authorities.',
      icon: Stamp,
      accent: 'from-[#F45A2A] to-amber-500',
    },
    {
      step: '04',
      title: 'Consular Visa Protocol & Flight Dispatch',
      subtitle: 'Embassy Submission & Relocation',
      description:
        'Sijam Consults prepares your complete embassy filing dossier, books biometric appointments at VFS/TLScontact, arranges mandatory travel insurance, and coordinates your flight reservations and airport reception.',
      icon: PlaneTakeoff,
      accent: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F0A2A] via-[#0D0826] to-[#180F40] border border-purple-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#402493]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#F45A2A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Header Section */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-purple-200 border border-white/10 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
            <span>The Sijam Relocation Engine</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
            Everything You Need to Relocate Legally on a Verified Work Visa
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            We eliminate middleman scams and fraudulent agents. Every foreign job opening through Sijam Consults is backed by a registered foreign corporate entity and statutory government work permit filings.
          </p>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group flex flex-col justify-between space-y-4 backdrop-blur-sm shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-3xl text-purple-400/50 group-hover:text-purple-300 transition-colors">
                      {st.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${st.accent} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F98864] block">
                      {st.subtitle}
                    </span>
                    <h3 className="font-heading font-extrabold text-base text-white mt-0.5">
                      {st.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Sijam Guided Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <div className="p-5 rounded-2xl bg-[#090518] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Zero Placement Markups & Statutory Regulatory Pledge
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                We strictly audit all foreign sponsors. Nigerian candidates are never charged illegal recruitment fees. Our fees cover accredited legal file verification, consular advisory, and translation protocols only.
              </div>
            </div>
          </div>

          <Link
            href={ROUTES.consultation}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs shadow-cta hover:brightness-110 transition-all border border-[#4DA5EC]/40"
          >
            <span>Book Career Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
