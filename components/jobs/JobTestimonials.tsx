'use client';

import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, Quote, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface CandidateTestimonial {
  name: string;
  role: string;
  destination: string;
  flag: string;
  quote: string;
  rating: number;
  visaType: string;
  year: string;
}

const TESTIMONIALS: CandidateTestimonial[] = [
  {
    name: 'Nurse Deborah O.',
    role: 'Registered General Nurse',
    destination: 'Krakow, Poland',
    flag: '🇵🇱',
    quote:
      'After countless failed promises by local agents, Sijam Consults handled my Polish hospital placement transparently. They audited my NMCN license, managed the Voivodeship permit, and coached me for the consular interview in Abuja. I have been practicing in Krakow for 10 months now with full European health insurance and residency.',
    rating: 5,
    visaType: 'Type-A National Work Visa',
    year: '2025 Placement',
  },
  {
    name: 'Engr. Emeka N.',
    role: 'Certified MIG/MAG Welder',
    destination: 'Bratislava, Slovakia',
    flag: '🇸🇰',
    quote:
      'I was working in Kaduna as an industrial welder. Sijam evaluated my technical trade certificate, matched me with Danube Heavy Fabrication, and facilitated my Slovak single work permit. The company dormitory was ready on arrival, and my monthly pay arrives on time in Euros. Sijam is 100% genuine.',
    rating: 5,
    visaType: 'Single Work & Residence Permit',
    year: '2025 Placement',
  },
  {
    name: 'Fatima B.',
    role: 'Senior Healthcare Assistant',
    destination: 'Leeds, United Kingdom',
    flag: '🇬🇧',
    quote:
      'Securing a UK Health and Care Worker visa without being scammed felt impossible until I walked into Sijam’s Kaduna office. They helped verify my CoS directly on the Home Office portal, booked my TB test, and guided my submission. Today I am earning well and supporting my family back home.',
    rating: 5,
    visaType: 'UK Health & Care Worker CoS',
    year: '2026 Placement',
  },
];

export const JobTestimonials: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[11px] font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Candidate Proofs</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Why Nigerian Professionals Trust Sijam for Foreign Employment
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Real feedback from skilled Nigerians who relocated to Europe and the UK through authentic foreign employer sponsorships.
          </p>
        </div>

        <Link
          href="/reviews"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F98864] hover:text-[#F45A2A] transition-colors"
        >
          <span>View All Consular Proofs & Reviews</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="p-6 sm:p-7 rounded-3xl bg-[#0D0826]/90 hover:bg-[#120A38] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Stars & Year */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-white/10">
                  {t.year}
                </span>
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            {/* Candidate Info */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>{t.name}</span>
                  <span className="text-base">{t.flag}</span>
                </h4>
                <div className="text-[11px] text-purple-300 font-medium">
                  {t.role}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#F45A2A]" />
                  <span>{t.destination}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-800/40">
                  {t.visaType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
