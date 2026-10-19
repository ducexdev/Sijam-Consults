'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Award, FileCheck2, Globe2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { COMPANY, ROUTES } from '@/lib/routes';

interface Stat {
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  detail: string;
  href: string;
  icon: React.ElementType;
  accentColor: string;
}

const STATS: Stat[] = [
  {
    label: 'Verified Placements & Filings',
    value: '500+',
    numericValue: 500,
    suffix: '+',
    detail: 'UK, Poland, Slovakia, Cyprus & Gulf',
    href: ROUTES.reviews,
    icon: Award,
    accentColor: '#DC2F11',
  },
  {
    label: 'File Accuracy Rate',
    value: '98.4%',
    numericValue: 98.4,
    suffix: '%',
    detail: 'Zero avoidable clerical refusals',
    href: ROUTES.services.visaAssistance,
    icon: FileCheck2,
    accentColor: '#4DA5EC',
  },
  {
    label: 'Active Global Corridors',
    value: '12+',
    numericValue: 12,
    suffix: '+',
    detail: 'Poland, Cyprus, UK, Saudi Arabia & more',
    href: ROUTES.services.root,
    icon: Globe2,
    accentColor: '#402493',
  },
  {
    label: 'CAC Corporate Registration',
    value: COMPANY.cacNumber,
    detail: 'Corporate Affairs Commission Verified',
    href: ROUTES.about,
    icon: ShieldCheck,
    accentColor: '#4DA5EC',
  },
];

function AnimatedCount({ value, numericValue, suffix }: { value: string; numericValue?: number; suffix?: string }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!numericValue) { setDisplayed(value); return; }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const start = 0;
          const end = numericValue;
          const duration = 1800;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;
            setDisplayed(
              Number.isInteger(end)
                ? `${Math.round(current)}${suffix || ''}`
                : `${current.toFixed(1)}${suffix || ''}`
            );
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue, suffix, value]);

  return <span ref={ref}>{displayed}</span>;
}

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-[#070415] via-[#0D0826] to-[#070415] text-white border-y border-white/10 py-10 relative z-20 overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#402493]/12 via-transparent to-transparent pointer-events-none" />
      {/* Moving gradient line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2F11]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#402493]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Link
                key={i}
                href={stat.href}
                className="group relative flex items-start gap-3.5 p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.065] border border-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Hover accent glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${stat.accentColor}18 0%, transparent 60%)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 relative z-10"
                  style={{ backgroundColor: `${stat.accentColor}22`, border: `1px solid ${stat.accentColor}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.accentColor }} />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight group-hover:text-white transition-colors">
                      <AnimatedCount value={stat.value} numericValue={stat.numericValue} suffix={stat.suffix} />
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div className="font-semibold text-[11px] text-slate-200 mt-0.5 leading-snug">{stat.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{stat.detail}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
