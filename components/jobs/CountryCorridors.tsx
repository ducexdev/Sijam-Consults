'use client';

import React from 'react';
import Link from 'next/link';
import { Globe2, ArrowRight, CheckCircle2, Building, ShieldCheck, MapPin } from 'lucide-react';

interface CountryCorridor {
  country: string;
  flag: string;
  status: string;
  popularRoles: string[];
  salaryBenchmark: string;
  visaType: string;
  perks: string;
  accent: string;
}

const CORRIDORS: CountryCorridor[] = [
  {
    country: 'Poland & Schengen',
    flag: '🇵🇱',
    status: 'High Volume Quotas',
    popularRoles: ['Registered Nurses', 'Heavy Truck Drivers', 'Automation Electricians', 'Bakery Operatives'],
    salaryBenchmark: '€1,500 – €3,500 / month',
    visaType: 'Voivodeship Type-A Work Permit',
    perks: 'Subsidized housing & Schengen travel',
    accent: 'from-blue-500/20 to-purple-600/20',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    status: 'Direct Sponsor Quota',
    popularRoles: ['Senior Care Assistants', 'Hospital Support', 'Specialist Technicians', 'Software Engineers'],
    salaryBenchmark: '£23,800 – £38,000 / year',
    visaType: 'Health & Care Worker / Skilled Worker CoS',
    perks: 'NHS surcharge discount & 5-yr ILR pathway',
    accent: 'from-red-500/20 to-blue-600/20',
  },
  {
    country: 'Slovakia',
    flag: '🇸🇰',
    status: 'Heavy Industry Hiring',
    popularRoles: ['Certified MIG/MAG Welders', 'Automotive Assemblers', 'CNC Operators', 'Fabricators'],
    salaryBenchmark: '€1,800 – €2,600 / month',
    visaType: 'Single Residence & Work Permit',
    perks: 'Free employer dormitory & shift bonuses',
    accent: 'from-amber-500/20 to-purple-600/20',
  },
  {
    country: 'Portugal',
    flag: '🇵🇹',
    status: 'Agricultural & Tech',
    popularRoles: ['Greenhouse Technicians', 'Irrigation Managers', 'D8 Tech Nomads', 'Hospitality Staff'],
    salaryBenchmark: '€1,200 – €2,200 / month',
    visaType: 'D1 / D3 Subordinate Work Visa',
    perks: 'Farm accommodation & EU residency rights',
    accent: 'from-emerald-500/20 to-teal-600/20',
  },
  {
    country: 'Cyprus',
    flag: '🇨🇾',
    status: 'Resort Quotas',
    popularRoles: ['Front Office Supervisors', 'Executive Chefs', 'Guest Relations Managers', 'F&B Supervisors'],
    salaryBenchmark: '$1,400 – $2,000 / month',
    visaType: 'Ministry of Labor Foreign Permit',
    perks: 'Resort accommodation + duty meals included',
    accent: 'from-orange-500/20 to-amber-600/20',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    status: 'Chancenkarte Advisory',
    popularRoles: ['Qualified Nurses (B2)', 'Mechanical Engineers', 'IT Architects', 'Apprentices (Ausbildung)'],
    salaryBenchmark: '€2,800 – €4,800 / month',
    visaType: 'Opportunity Card & Skilled Immigration',
    perks: 'High standard of living & family reunification',
    accent: 'from-yellow-500/20 to-slate-600/20',
  },
];

export const CountryCorridors: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5 text-[#F45A2A]" />
            <span>Target Work Destinations</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Explore Opportunities by Foreign Destination
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            We only process jobs with statutory labor authority approvals in these vetted sovereign corridors.
          </p>
        </div>
      </div>

      {/* Grid of 6 Country Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CORRIDORS.map((corridor) => (
          <div
            key={corridor.country}
            className="p-6 rounded-3xl bg-[#0D0826]/90 hover:bg-[#120A38] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl flex flex-col justify-between space-y-5 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Background Accent glow */}
            <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${corridor.accent} blur-2xl pointer-events-none group-hover:scale-125 transition-transform`} />

            <div className="space-y-4 relative z-10">
              {/* Header with Flag and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl filter drop-shadow-md">{corridor.flag}</span>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-[#F98864] transition-colors">
                      {corridor.country}
                    </h3>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {corridor.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Salary Package Benchmark */}
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Typical Foreign Salary Range
                </div>
                <div className="text-base font-black text-emerald-400">
                  {corridor.salaryBenchmark}
                </div>
              </div>

              {/* Popular Roles in corridor */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  High-Demand Foreign Professions:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {corridor.popularRoles.map((role, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1F1545]/60 text-purple-200 border border-purple-500/20"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visa & Perks Info */}
              <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-white/10">
                <div className="flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-slate-300">
                    <strong className="text-white">Visa Route:</strong> {corridor.visaType}
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#F45A2A] shrink-0 mt-0.5" />
                  <span className="text-[11px] text-slate-300">
                    <strong className="text-white">Key Perks:</strong> {corridor.perks}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <Link
                href={`/services/work-visa?country=${encodeURIComponent(corridor.country)}`}
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-white border border-white/10 transition-colors group-hover:border-[#4DA5EC]/40"
              >
                <span>Explore {corridor.country} Pathway</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F45A2A] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
