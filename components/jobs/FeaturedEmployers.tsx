'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Users, Sparkles } from 'lucide-react';

interface FeaturedEmployer {
  name: string;
  country: string;
  flag: string;
  sector: string;
  licenseDetails: string;
  activeQuotas: number;
  highlightRole: string;
  slug: string;
  perks: string[];
}

const EMPLOYERS: FeaturedEmployer[] = [
  {
    name: 'EuroMed Care Sp. z o.o.',
    country: 'Poland (Krakow & Katowice)',
    flag: '🇵🇱',
    sector: 'Healthcare & Inpatient Hospital Services',
    licenseDetails: 'Certified Polish Ministry of Health Registry',
    activeQuotas: 15,
    highlightRole: 'Registered General Nurse (Hospital Placement)',
    slug: 'registered-general-nurse-poland-healthcare',
    perks: ['Voivodeship Permit', 'Subsidized Hospital Housing', 'Language Onboarding'],
  },
  {
    name: 'St. Jude Healthcare Trust Ltd',
    country: 'United Kingdom (Midlands & Yorkshire)',
    flag: '🇬🇧',
    sector: 'Residential Care & Specialist Health Support',
    licenseDetails: 'Home Office Licensed Tier 2 A-Rated Sponsor',
    activeQuotas: 20,
    highlightRole: 'Senior Care Assistant & Resident Support',
    slug: 'senior-care-assistant-uk-healthcare',
    perks: ['Defined CoS Provided', 'Health & Care Visa', 'Relocation Support'],
  },
  {
    name: 'Danube Heavy Fabrication s.r.o.',
    country: 'Slovakia (Bratislava & Trnava)',
    flag: '🇸🇰',
    sector: 'Structural Steel & Heavy Manufacturing',
    licenseDetails: 'Accredited Slovak Central Labor Office Registry',
    activeQuotas: 18,
    highlightRole: 'Certified MIG / MAG Structural Welder',
    slug: 'certified-mig-mag-welder-slovakia',
    perks: ['Single Work Permit', 'Furnished Dormitory', 'Shift Allowances'],
  },
  {
    name: 'TransEuro Logistics Polska',
    country: 'Poland (Poznań & Wrocław)',
    flag: '🇵🇱',
    sector: 'Trans-European Road Freight & Logistics',
    licenseDetails: 'Voivodeship Authorized Transport Operator',
    activeQuotas: 25,
    highlightRole: 'International HGV / Articulated Truck Driver',
    slug: 'heavy-commercial-truck-driver-poland',
    perks: ['Type A Work Permit', 'Code 95 Training', 'Modern Scania Fleet'],
  },
];

export const FeaturedEmployers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/40 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span>Authenticated Host Sponsors</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Who’s Hiring International Talent Right Now?
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Foreign corporate employers with allocated labor quotas, direct statutory work permits, and active relocation packages.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:overflow-visible">
        {EMPLOYERS.map((emp) => (
          <div
            key={emp.name}
            className="w-[85vw] sm:w-auto shrink-0 snap-center p-6 rounded-3xl bg-[#0D0826]/90 hover:bg-[#120A38] border border-white/10 hover:border-[#4DA5EC]/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-xl"
          >
            <div className="space-y-3">
              {/* Country & Quota count */}
              <div className="flex items-center justify-between">
                <span className="text-2xl">{emp.flag}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {emp.activeQuotas} Quotas
                </span>
              </div>

              {/* Employer Name */}
              <div>
                <h3 className="font-heading font-black text-base text-white group-hover:text-[#F98864] transition-colors leading-snug">
                  {emp.name}
                </h3>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#F45A2A] shrink-0" />
                  <span className="truncate">{emp.country}</span>
                </div>
              </div>

              {/* Sector & Accreditation */}
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                  {emp.sector}
                </div>
                <div className="text-[10px] text-slate-400">
                  {emp.licenseDetails}
                </div>
              </div>

              {/* Highlight Role */}
              <div className="pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Open Position:
                </div>
                <div className="text-xs font-bold text-white mt-0.5 group-hover:text-[#4DA5EC] transition-colors">
                  {emp.highlightRole}
                </div>
              </div>

              {/* Perks */}
              <div className="flex flex-wrap gap-1 pt-1">
                {emp.perks.map((p, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/10"
                  >
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <Link
                href={`/jobs/${emp.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all text-center border border-[#4DA5EC]/30"
              >
                <span>View Employer Quotas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
