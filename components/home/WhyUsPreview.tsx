import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck2,
  Building,
  Ban,
  Clock,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

export const WhyUsPreview: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'CAC Registered Legal Entity',
      description: 'Fully accredited Nigerian corporate body (RC: 1715416) with transparent physical headquarters in Kaduna.',
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: 'Zero-Omission File Audit',
      description: 'Every visa application is pre-screened by senior consular specialists to eradicate procedural and documentation errors.',
      icon: FileCheck2,
    },
    {
      num: '03',
      title: 'Direct Institutional Ties',
      description: 'Direct relationships with accredited universities and European employers—eliminating predatory third-party middlemen.',
      icon: Building,
    },
    {
      num: '04',
      title: 'Strict Anti-Fraud Standard',
      description: 'Zero tolerance for forged credentials, fake bank statements, or fictitious employment offers.',
      icon: Ban,
    },
    {
      num: '05',
      title: 'Transparent Timelines & Fees',
      description: 'No hidden surcharges. Clear milestone billing and realistic statutory processing windows.',
      icon: Clock,
    },
    {
      num: '06',
      title: 'Pre-to-Post Departure Support',
      description: 'From initial admissions to airport transit, hotel bookings, flight reservations, and arrival support—complete travel agency assistance.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-20 bg-[#0B071E] text-white border-b border-purple-950/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-wider text-[#F98864] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
            <span>Why Discerning Clients Choose SIJAM</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            An Uncompromising Commitment to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Institutional Integrity
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-normal">
            International travel and relocation is a life-defining investment. Choosing <strong className="text-white font-medium">a travel agency</strong> you can trust makes every step seamless—we replace guesswork with forensic document audits, transparent counsel, and authentic institutional pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#402493] to-[#2D186B] group-hover:from-[#F45A2A] group-hover:to-[#DD4819] text-white flex items-center justify-center font-heading font-black text-base transition-colors shadow">
                      {pillar.num}
                    </div>
                    <Icon className="w-5 h-5 text-purple-300 group-hover:text-[#F98864] transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#F98864] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={ROUTES.whyChooseUs}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-xs uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all hover:scale-[1.02]"
          >
            <span>Read Our Full Track Record & Methodology</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
