'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  FileCheck,
  GraduationCap,
  Compass,
  Plane,
  FileText,
  Building2,
  Trophy,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export interface ServicePathwayItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  scope: string[];
  href: string;
  icon: React.ElementType;
  tag: string;
  tagColor: string;
}

export const CORE_PATHWAYS: ServicePathwayItem[] = [
  {
    id: 'recruitment',
    title: 'International Recruitment & Manpower Solutions',
    tagline: 'Direct foreign employer quotas & B2B workforce sourcing',
    description:
      'We connect qualified Nigerian professionals and skilled trades with accredited employers across the UK, Poland, Slovakia, and Saudi Arabia under transparent, legal contracts.',
    scope: ['Employer quota verification', 'Candidate skills screening', 'Pre-departure orientation'],
    href: ROUTES.services.recruitmentSupply,
    icon: Briefcase,
    tag: 'Flagship Service',
    tagColor: 'bg-[#DC2F11]/15 text-[#F98864] border-[#DC2F11]/30',
  },
  {
    id: 'work-permits',
    title: 'Work Permits & Employment Placement',
    tagline: 'Statutory labor authorizations & consular dossier filing',
    description:
      'Expert advisory for Polish Voivodeship Type A permits, Slovakian single work permits, and UK Certificate of Sponsorship (CoS) compliance reviews.',
    scope: ['Statutory permit filing', 'MFA document legalization', 'Embassy interview coaching'],
    href: ROUTES.services.workVisa,
    icon: FileCheck,
    tag: 'Statutory Filings',
    tagColor: 'bg-[#402493]/25 text-purple-300 border-purple-500/30',
  },
  {
    id: 'study-abroad',
    title: 'Study Abroad & Student Admissions',
    tagline: 'Direct university placements & up to 50% tuition grants',
    description:
      'Comprehensive university admissions counseling across Cyprus, Poland, Spain, the UK, and Canada, including scholarship advisory and student visa packaging.',
    scope: ['Direct university offers', 'Academic grant matching', 'Student visa preparation'],
    href: ROUTES.services.studyVisa,
    icon: GraduationCap,
    tag: 'Up to 50% Grants',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'tourist-visas',
    title: 'Tourist & Visitor Visa Guidance',
    tagline: 'Refusal prevention & itinerary structuring',
    description:
      'Strategic advisory for business travelers, vacationers, and family visits to Schengen countries, the UK, USA, Canada, and the UAE with thorough dossier audits.',
    scope: ['Financial profile audit', 'Travel itinerary justification', 'Biometrics scheduling'],
    href: ROUTES.services.touristVisa,
    icon: Compass,
    tag: 'Travel Advisory',
    tagColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  },
  {
    id: 'flight-reservations',
    title: 'Flight Reservations & Travel Services',
    tagline: 'Verifiable GDS airline itineraries with active PNR',
    description:
      'Official flight booking arrangements and confirmed airline itineraries adhering strictly to embassy requirements, facilitated through Everbright Travels & Consultants.',
    scope: ['Live GDS PNR codes', 'Embassy-compliant schedules', 'Flexible date adjustments'],
    href: ROUTES.services.flightReservations,
    icon: Plane,
    tag: 'GDS Verifiable',
    tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  },
  {
    id: 'document-legalization',
    title: 'Document Legalization & Attestation',
    tagline: 'MFA Abuja authentication & consular verification',
    description:
      'End-to-end liaison for notarization, Ministry of Foreign Affairs (MFA) Abuja authentication, and bilateral foreign embassy attestation for educational and civil certificates.',
    scope: ['MFA Abuja verification', 'Police clearance apostille', 'Embassy attestation seals'],
    href: ROUTES.services.documentLegalization,
    icon: FileText,
    tag: 'Authentication',
    tagColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  },
  {
    id: 'business-registration',
    title: 'Company Registration & Business Consultancy',
    tagline: 'European corporate setup & international trade advisory',
    description:
      'Assistance with international business incorporation (including Poland Sp. z o.o.), corporate bank introductions, and European business residency compliance.',
    scope: ['KRS registry filing', 'Corporate bank liaison', 'Commercial visa guidance'],
    href: ROUTES.services.businessRegistration,
    icon: Building2,
    tag: 'Corporate Mobility',
    tagColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  },
  {
    id: 'football-talent',
    title: 'Football Talent Scouting & International Pathways',
    tagline: 'Cadet screening & European trial representation',
    description:
      'In partnership with Basic Soccer Academy Kaduna (RC: 2839888), we scout, prepare, and connect promising Nigerian football players with international club trials and academies.',
    scope: ['Kaduna scouting trials', 'Player video analysis dossiers', 'European academy liaison'],
    href: ROUTES.services.footballTalent,
    icon: Trophy,
    tag: 'Sports Diplomacy',
    tagColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  },
];

export const ServicePathwaysSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Manual scroll helper
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Double items for seamless infinite marquee loop
  const duplicatedPathways = [...CORE_PATHWAYS, ...CORE_PATHWAYS];

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden scroll-mt-20">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#402493]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span className="font-bold uppercase tracking-wider text-[11px] text-purple-200">
                Core Advisory Corridors
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
              Specialized Services Built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                Global Mobility
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Every pathway follows a strict verification framework. Hover or interact with any card to pause and inspect requirements.
            </p>
          </div>

          {/* Controls: Prev/Next & Pause Indicator */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-slate-300 transition-colors"
              aria-label={isPaused ? 'Resume sliding' : 'Pause sliding'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#4DA5EC]" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#4DA5EC]" />
                  <span>Pause</span>
                </>
              )}
            </button>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Previous services"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Next services"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── HORIZONTALLY SLIDING MARQUEE TRACK (PAUSES ON HOVER) ─────── */}
        <div
          className="relative group/track -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left gradient fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-[#070415] to-transparent" />
          {/* Right gradient fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-[#070415] to-transparent" />

          {/* Sliding Track Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-none py-2"
          >
            <div
              className="flex items-stretch gap-5 w-max"
              style={{
                animation: 'service-marquee 45s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
                willChange: 'transform',
              }}
            >
              {duplicatedPathways.map((pathway, index) => {
                const Icon = pathway.icon;
                return (
                  <div
                    key={`${pathway.id}-${index}`}
                    className="w-[310px] sm:w-[350px] md:w-[370px] shrink-0 group relative p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.07] border border-white/10 hover:border-[#4DA5EC]/60 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-md hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Top edge gradient highlight on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-4">
                      {/* Top Bar: Icon + Tag */}
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl bg-[#402493]/60 group-hover:bg-gradient-to-br group-hover:from-[#4DA5EC] group-hover:to-[#257CFF] text-[#4DA5EC] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${pathway.tagColor}`}>
                          {pathway.tag}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#4DA5EC] transition-colors leading-snug line-clamp-2">
                          {pathway.title}
                        </h3>
                        <p className="text-xs text-purple-300/80 font-medium mt-1 line-clamp-1">
                          {pathway.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {pathway.description}
                      </p>

                      {/* Deliverables Scope */}
                      <div className="pt-3 border-t border-white/8 space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Key Deliverables:
                        </div>
                        {pathway.scope.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-[#4DA5EC] shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="pt-4 mt-4 border-t border-white/8">
                      <Link
                        href={pathway.href}
                        className="inline-flex items-center justify-between w-full text-xs font-bold text-[#4DA5EC] group-hover:text-white transition-colors"
                      >
                        <span>View Requirements &amp; Process</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Helper Note & All Services Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/8">
          <p className="text-[11px] font-medium text-slate-400">
            💡 Hover over any service card to pause sliding.
          </p>
          <Link
            href={ROUTES.services.root}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs uppercase tracking-wider border border-white/15 backdrop-blur-md transition-all hover:scale-[1.02]"
          >
            <span>Compare All 8 Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#4DA5EC]" />
          </Link>
        </div>
      </div>

      {/* Marquee keyframe injection */}
      <style>{`
        @keyframes service-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
