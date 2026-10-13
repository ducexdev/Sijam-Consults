import React from 'react';
import { Award, FileCheck2, Globe2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { COMPANY, ROUTES } from '@/lib/routes';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      label: 'Verified Consular Filings',
      value: '450+',
      detail: 'Schengen, UK, Canada & Cyprus',
      href: ROUTES.reviews,
      icon: Award,
    },
    {
      label: 'File Audit Accuracy',
      value: '98.4%',
      detail: 'Zero avoidable clerical refusals',
      href: ROUTES.services.visaAssistance,
      icon: FileCheck2,
    },
    {
      label: 'Active Global Jurisdictions',
      value: '12+',
      detail: 'Poland, Cyprus, Greece, UK & more',
      href: ROUTES.services.root,
      icon: Globe2,
    },
    {
      label: 'Corporate Registration',
      value: COMPANY.cacNumber,
      detail: 'Corporate Affairs Commission Verified',
      href: ROUTES.about,
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-[#0B0620] text-white border-y border-white/10 py-10 relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#402493]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Link
                key={i}
                href={stat.href}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#402493]/60 group-hover:bg-[#F45A2A] text-white flex items-center justify-center shrink-0 border border-purple-500/20 transition-colors shadow">
                  <Icon className="w-6 h-6 text-[#F98864] group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#F98864] transition-colors">
                      {stat.value}
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#F45A2A] transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="font-semibold text-xs text-slate-200 mt-0.5 truncate">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {stat.detail}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
