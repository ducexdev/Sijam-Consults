'use client';

import React from 'react';
import { ShieldCheck, FileCheck2, Globe2, Building2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { COMPANY, ROUTES } from '@/lib/routes';

interface TrustIndicator {
  label: string;
  badge: string;
  detail: string;
  href: string;
  icon: React.ElementType;
  accentColor: string;
}

const TRUST_INDICATORS: TrustIndicator[] = [
  {
    label: 'Corporate Registration',
    badge: COMPANY.cacNumber,
    detail: 'Corporate Affairs Commission Verified',
    href: ROUTES.about,
    icon: ShieldCheck,
    accentColor: '#4DA5EC',
  },
  {
    label: 'Active International Corridors',
    badge: 'UK, EU & CA, AUS',
    detail: 'Poland, Slovakia, Cyprus, UK & Saudi Arabia',
    href: ROUTES.services.root,
    icon: Globe2,
    accentColor: '#257CFF',
  },
  {
    label: 'Procedural Compliance',
    badge: 'MFA Abuja Legalized',
    detail: 'Official Ministry & Embassy Attestations',
    href: ROUTES.services.documentLegalization,
    icon: FileCheck2,
    accentColor: '#4DA5EC',
  },
  {
    label: 'Physical Corporate Headquarters',
    badge: 'Kaduna, Nigeria',
    detail: 'Suite A10, Kachia Road Consultations',
    href: ROUTES.contact,
    icon: Building2,
    accentColor: '#402493',
  },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#070415] via-[#0D0826] to-[#070415] text-white border-y border-white/10 py-10 relative z-20 overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#402493]/12 via-transparent to-transparent pointer-events-none" />
      {/* Moving gradient line top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4DA5EC]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#402493]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TRUST_INDICATORS.map((indicator, i) => {
            const Icon = indicator.icon;
            return (
              <Link
                key={i}
                href={indicator.href}
                className="group relative flex items-start gap-3.5 p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.065] border border-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Hover accent glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${indicator.accentColor}18 0%, transparent 60%)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 relative z-10"
                  style={{ backgroundColor: `${indicator.accentColor}22`, border: `1px solid ${indicator.accentColor}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: indicator.accentColor }} />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="font-heading font-black text-lg sm:text-xl text-white tracking-tight group-hover:text-[#4DA5EC] transition-colors">
                      {indicator.badge}
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div className="font-semibold text-xs text-slate-200 mt-0.5 leading-snug">{indicator.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{indicator.detail}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
