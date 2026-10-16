'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface CountryCorridor {
  country: string;
  flag: string;
  status: string;
  openRoles: number;
  popularRoles: string[];
  salaryBenchmark: string;
  visaType: string;
  accent: string;
  accentBorder: string;
  accentText: string;
}

const CORRIDORS: CountryCorridor[] = [
  {
    country: 'Poland',
    flag: '🇵🇱',
    status: 'High Volume',
    openRoles: 42,
    popularRoles: ['Nurses', 'Truck Drivers', 'Electricians', 'Bakery Ops'],
    salaryBenchmark: '€1,500 – €3,500/mo',
    visaType: 'Voivodeship Permit',
    accent: 'from-blue-500/10 to-purple-600/10',
    accentBorder: 'border-blue-500/30 hover:border-blue-400/60',
    accentText: 'text-blue-300',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    status: 'Direct CoS',
    openRoles: 28,
    popularRoles: ['Care Assistants', 'Hospital Support', 'SW Engineers', 'Technicians'],
    salaryBenchmark: '£23,800 – £38k/yr',
    visaType: 'Health & Care Worker Visa',
    accent: 'from-red-500/10 to-blue-600/10',
    accentBorder: 'border-red-500/30 hover:border-red-400/60',
    accentText: 'text-red-300',
  },
  {
    country: 'Slovakia',
    flag: '🇸🇰',
    status: 'Industry Hiring',
    openRoles: 18,
    popularRoles: ['MIG/MAG Welders', 'CNC Operators', 'Assemblers', 'Fabricators'],
    salaryBenchmark: '€1,800 – €2,600/mo',
    visaType: 'Single Residence & Work Permit',
    accent: 'from-amber-500/10 to-purple-600/10',
    accentBorder: 'border-amber-500/30 hover:border-amber-400/60',
    accentText: 'text-amber-300',
  },
  {
    country: 'Portugal',
    flag: '🇵🇹',
    status: 'Agri & Tech',
    openRoles: 12,
    popularRoles: ['Greenhouse Techs', 'Irrigation Mgrs', 'Hospitality', 'D8 Nomads'],
    salaryBenchmark: '€1,200 – €2,200/mo',
    visaType: 'D1 / D3 Work Visa',
    accent: 'from-emerald-500/10 to-teal-600/10',
    accentBorder: 'border-emerald-500/30 hover:border-emerald-400/60',
    accentText: 'text-emerald-300',
  },
  {
    country: 'Cyprus',
    flag: '🇨🇾',
    status: 'Resort Quotas',
    openRoles: 9,
    popularRoles: ['Front Office', 'Exec Chefs', 'Guest Relations', 'F&B Supervisors'],
    salaryBenchmark: '$1,400 – $2,000/mo',
    visaType: 'Ministry of Labor Permit',
    accent: 'from-orange-500/10 to-amber-600/10',
    accentBorder: 'border-orange-500/30 hover:border-orange-400/60',
    accentText: 'text-orange-300',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    status: 'Chancenkarte',
    openRoles: 15,
    popularRoles: ['Qualified Nurses', 'Mech Engineers', 'IT Architects', 'Ausbildung'],
    salaryBenchmark: '€2,800 – €4,800/mo',
    visaType: 'Opportunity Card',
    accent: 'from-yellow-500/10 to-slate-600/10',
    accentBorder: 'border-yellow-500/30 hover:border-yellow-400/60',
    accentText: 'text-yellow-300',
  },
  {
    country: 'Romania',
    flag: '🇷🇴',
    status: 'IGI High Quota',
    openRoles: 34,
    popularRoles: ['Construction', 'Hospitality', 'Factory Line', 'Welders'],
    salaryBenchmark: '€1,200 – €2,200/mo',
    visaType: 'IGI Work Authorization',
    accent: 'from-yellow-500/10 to-blue-600/10',
    accentBorder: 'border-yellow-500/30 hover:border-yellow-400/60',
    accentText: 'text-yellow-300',
  },
  {
    country: 'Serbia',
    flag: '🇷🇸',
    status: 'NES Industrial',
    openRoles: 22,
    popularRoles: ['Structural Welders', 'Plant Mechanics', 'Warehouse Ops', 'Drivers'],
    salaryBenchmark: '€1,100 – €1,950/mo',
    visaType: 'National Employment Permit',
    accent: 'from-red-500/10 to-blue-600/10',
    accentBorder: 'border-red-500/30 hover:border-red-400/60',
    accentText: 'text-red-300',
  },
  {
    country: 'Czech Republic',
    flag: '🇨🇿',
    status: 'Automotive & Tech',
    openRoles: 19,
    popularRoles: ['CNC Machinists', 'Auto Technicians', 'Software Eng', 'Assembly'],
    salaryBenchmark: '€1,900 – €3,200/mo',
    visaType: 'Employee Card (Zaměstnanecká Karta)',
    accent: 'from-blue-500/10 to-red-600/10',
    accentBorder: 'border-blue-400/30 hover:border-blue-400/60',
    accentText: 'text-blue-300',
  },
  {
    country: 'Netherlands',
    flag: '🇳🇱',
    status: 'Logistics Hub',
    openRoles: 16,
    popularRoles: ['Supply Chain', 'Software Eng', 'High-Reach Forklift', 'Horticulture'],
    salaryBenchmark: '€2,600 – €4,400/mo',
    visaType: 'IND Single Permit (GVVA)',
    accent: 'from-orange-500/10 to-blue-600/10',
    accentBorder: 'border-orange-500/30 hover:border-orange-400/60',
    accentText: 'text-orange-300',
  },
];

export const CountryCorridors: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40 text-[11px] font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-[#F45A2A]" />
            <span>Target Work Destinations</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            Explore opportunities that<br className="hidden sm:block" />{' '}
            match your experience
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            We process only jobs with statutory labor authority approvals in these vetted sovereign corridors.
          </p>
        </div>
        <Link
          href="#directory"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4DA5EC] hover:text-white transition-colors shrink-0 group"
        >
          <span>View all open roles</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Horizontal scroll card row */}
      <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {CORRIDORS.map((corridor) => (
          <Link
            key={corridor.country}
            href={`/services/work-visa?country=${encodeURIComponent(corridor.country)}`}
            className={`shrink-0 w-[240px] sm:w-[260px] flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br ${corridor.accent} bg-[#0D0826] border ${corridor.accentBorder} transition-all duration-300 group hover:-translate-y-1 shadow-xl backdrop-blur-xl relative overflow-hidden cursor-pointer`}
          >
            {/* Background glow */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/5 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div className="relative z-10 space-y-4">
              {/* Flag + open count */}
              <div className="flex items-start justify-between">
                <span className="text-5xl leading-none filter drop-shadow-lg">{corridor.flag}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-white/10 border border-white/10 ${corridor.accentText}`}>
                  {corridor.status}
                </span>
              </div>

              {/* Country + open roles */}
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-white leading-tight">
                  {corridor.country}
                </h3>
                <div className={`text-xs font-semibold mt-0.5 flex items-center gap-1 ${corridor.accentText}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  {corridor.openRoles} open positions
                </div>
              </div>

              {/* Salary */}
              <div className="text-xs font-bold text-emerald-400">
                {corridor.salaryBenchmark}
              </div>

              {/* Top roles */}
              <div className="space-y-1">
                {corridor.popularRoles.slice(0, 3).map((role, i) => (
                  <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/70 group-hover:text-white transition-colors">
              <span>Explore pathway</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#F45A2A]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
