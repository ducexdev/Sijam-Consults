'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileCheck,
  ArrowRight,
  Globe2,
  Stethoscope,
  HardHat,
  Flame,
  Truck,
  Hotel,
  Briefcase,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const ManpowerSupplyDesk: React.FC = () => {
  const sectors = [
    {
      name: 'Healthcare & Nursing',
      icon: Stethoscope,
      roles: 'Registered Nurses, Senior Care Assistants, Clinical Support',
      destinations: 'UK NHS & Poland Care Facilities',
      accent: 'border-blue-500/30 text-blue-400',
    },
    {
      name: 'Industrial & Welding',
      icon: Flame,
      roles: 'Certified MIG/MAG Welders, CNC Operators, Pipefitters',
      destinations: 'Slovakia & Poland Heavy Industry',
      accent: 'border-orange-500/30 text-orange-400',
    },
    {
      name: 'Construction & Civil',
      icon: HardHat,
      roles: 'Site Supervisors, Scaffolders, Electricians, Carpenters',
      destinations: 'Saudi Arabia (GCC) & EU Infrastructure',
      accent: 'border-emerald-500/30 text-emerald-400',
    },
    {
      name: 'Logistics & Warehousing',
      icon: Truck,
      roles: 'Reach-Truck Drivers, Inventory Handlers, Fleet Operators',
      destinations: 'Central European Distribution Hubs',
      accent: 'border-purple-500/30 text-purple-400',
    },
    {
      name: 'Hospitality & Services',
      icon: Hotel,
      roles: 'Chefs, Housekeeping Supervisors, Front Desk Staff',
      destinations: 'Cyprus, Portugal & Gulf Resorts',
      accent: 'border-teal-500/30 text-teal-400',
    },
    {
      name: 'Technical & Engineering',
      icon: Briefcase,
      roles: 'Mechanical Techs, Solar Technicians, QA Inspectors',
      destinations: 'European & Gulf Contracting Firms',
      accent: 'border-sky-500/30 text-sky-400',
    },
  ];

  const standards = [
    {
      title: 'Authenticated Skills & Trade Testing',
      desc: 'Every candidate undergoes rigorous practical trade evaluations, criminal background clearance, and medical fitness checks before profile submission.',
    },
    {
      title: 'Full Consular & MFA Legalisation',
      desc: 'All employment contracts and statutory work permit documents are authenticated through Nigeria’s Ministry of Foreign Affairs (MFA Abuja) and destination embassies.',
    },
    {
      title: 'Zero Illegal Placement Fees',
      desc: 'Sijam Consults strictly adheres to the ILO Fair Recruitment Initiative and CAC regulations. We never charge unauthorized candidate placement deductions.',
    },
    {
      title: 'Direct Bilateral Quotas',
      desc: 'We operate through direct agreements with verified corporate employers and institutional partners across Europe, the UK, and Saudi Arabia.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#09051C] text-white border-b border-purple-950/70 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#257CFF]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              B2B International Workforce Sourcing Desk
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Turnkey Overseas Manpower Supply for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-[#4DA5EC]">
              Global Employers
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Sijam Consults Limited mobilizes verified, job-ready workforce cohorts from Nigeria and West Africa for international main contractors, healthcare networks, and corporate employers in Europe, the United Kingdom, and the Gulf.
          </p>
        </div>

        {/* Sectors Sourced Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Sectors Mobilized for Overseas Placement
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Pre-screened candidate pipelines with statutory labor permits and verified trade certifications.
              </p>
            </div>
            <Link
              href={ROUTES.jobs.root}
              className="text-xs font-bold text-[#4DA5EC] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>View Active Vacancy Quotas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-300 space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#4DA5EC]" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {sec.destinations}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-white group-hover:text-[#4DA5EC] transition-colors">
                      {sec.name}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {sec.roles}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Pillars of Manpower Verification & Compliance */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#120A38] to-[#0A0620] border border-white/15 space-y-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Corporate Governance &amp; Ethics
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mt-1">
              Rigorous Recruitment Standards &amp; Legal Compliance
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Every worker mobilized through Sijam Consults is authenticated in strict adherence to Nigerian statutory mandates (CAC RC: 1715416) and destination country immigration laws.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((std, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-white">{std.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Dual Action Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Foreign Employer Partnership Desk</div>
                <div className="text-[11px] text-slate-400">Direct SLA agreements with certified global employers &amp; agencies</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/contact?intent=hire_manpower"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-cta hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Initiate Manpower Requisition</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={ROUTES.jobs.root}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs uppercase tracking-wider text-center border border-white/15 transition-all"
              >
                View Live Board
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
