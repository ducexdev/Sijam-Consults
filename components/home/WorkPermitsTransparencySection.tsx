'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  FileCheck2,
  CheckCircle2,
  Scale,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

export const WorkPermitsTransparencySection: React.FC = () => {
  const corridors = [
    {
      country: 'United Kingdom 🇬🇧',
      permitType: 'Skilled Worker Visa & Health and Care Worker Visa',
      authority: 'UK Visas and Immigration (UKVI) / Home Office',
      scope:
        'Verification of employer Certificate of Sponsorship (CoS), salary threshold compliance, and NHS / Home Office applicant qualification reviews.',
    },
    {
      country: 'Poland 🇵🇱',
      permitType: 'Zezwolenie na Pracę (Voivodeship Type A Work Permit)',
      authority: 'Polish Provincial Voivodeship Offices (Urząd Wojewódzki)',
      scope:
        'Liaison with verified Polish employers for labor market testing exemptions, Voivodeship statutory filings, and National Visa Type D document preparation.',
    },
    {
      country: 'Slovakia 🇸🇰',
      permitType: 'Single Work & Residence Permit (Prechodný Pobyt)',
      authority: 'Central Office of Labour, Social Affairs and Family (ÚPSVaR)',
      scope:
        'Manufacturing and welding workforce authorization, certified apostille translations, and Slovak Foreign Police appointment dossiers.',
    },
    {
      country: 'Saudi Arabia 🇸🇦',
      permitType: 'Employer-Sponsored Work Visa (Iqama Pathway)',
      authority: 'Ministry of Human Resources and Social Development (Qiwa)',
      scope:
        'Pre-screened technical and hospitality recruitment, Qiwa platform contracts, and Saudi Embassy consular attestation in Abuja.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#09051E] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#DC2F11]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs text-purple-200">
            <Scale className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Statutory Governance &amp; Ethical Recruitment
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Work Permits &amp; Overseas Employment:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Clear Accountability
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            International work authorizations are governed by strict bilateral labor regulations. Sijam Consults Limited provides advisory compliance and employer quota matching, maintaining total transparency on what we do and where official government decisions lie.
          </p>
        </div>

        {/* Legal Transparency & Accountability Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#12082A] via-[#0F0624] to-[#080318] border border-white/12 space-y-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-white">
                Crucial Regulatory Notice &amp; Consular Integrity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Sijam Consults Limited (CAC RC: 1715416)</strong> is an accredited educational, recruitment, and travel consultancy in Nigeria. We are <strong>not</strong> an embassy, high commission, or sovereign visa-issuing authority. The final grant or refusal of any work permit, visa, or entry clearance remains the sole statutory prerogative of respective foreign sovereign governments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero Illegal Placement Fees</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We operate in full accordance with Nigerian statutory regulations and international ethical recruitment codes. We never levy hidden placement charges for verified corporate vacancies.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4DA5EC]">
                <FileCheck2 className="w-4 h-4 shrink-0" />
                <span>Zero Document Falsification</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every trade certification, statement of account, and statutory filing is audited for 100% authenticity before submission to foreign ministry or consular portals.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4DA5EC]">
                <Building className="w-4 h-4 shrink-0" />
                <span>Direct Employer Quotas</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                We only advertise vacancies tied to verified bilateral agreements with foreign main contractors, healthcare groups, and accredited recruitment partners.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Active Jurisdictions Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-xl text-white">
              Active Work Authorization Corridors
            </h3>
            <Link
              href={ROUTES.services.workVisa}
              className="text-xs font-bold text-[#4DA5EC] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>View Full Work Visa Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {corridors.map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-white">{c.country}</span>
                  <span className="text-[10px] font-mono text-purple-300 bg-[#402493]/30 px-2 py-0.5 rounded border border-purple-500/30">
                    {c.authority}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#4DA5EC]">{c.permitType}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.scope}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/8">
          <div>
            <div className="text-xs font-bold text-white">Have questions about your work permit eligibility?</div>
            <div className="text-[11px] text-slate-400">Speak directly with our senior immigration and documentation compliance officers.</div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href={ROUTES.jobs.root}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider text-center shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(37,124,255,0.7)] hover:brightness-110 transition-all"
            >
              View Active Quotas
            </Link>
            <Link
              href={ROUTES.consultation}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#402493]/50 hover:bg-[#402493] text-white font-semibold text-xs border border-purple-500/30 transition-all text-center"
            >
              Book Advisory Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
