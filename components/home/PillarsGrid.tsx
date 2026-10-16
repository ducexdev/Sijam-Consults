'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  GraduationCap,
  FileCheck2,
  Plane,
  Building2,
  Handshake,
  UserCheck,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

interface PillarItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: 'workforce' | 'immigration' | 'corporate';
  categoryLabel: string;
  badge: string;
  isFlagship?: boolean;
  icon: React.ElementType;
  description: string;
  keyOfferings: string[];
  corridors: string;
  ctaText: string;
  ctaHref: string;
}

const PILLARS_DATA: PillarItem[] = [
  {
    id: 'international-recruitment',
    number: '01',
    title: 'International Recruitment and Manpower Supply',
    shortTitle: 'International Recruitment',
    category: 'workforce',
    categoryLabel: 'Workforce & Recruitment',
    badge: 'Primary Flagship Offering',
    isFlagship: true,
    icon: Users,
    description:
      'Our primary specialized service: direct foreign employer quota allocation and bulk manpower supply. We connect verified skilled, semi-skilled, healthcare, and industrial talent with legitimate employer sponsorships across Europe and the Gulf.',
    keyOfferings: [
      'Verified foreign employer quotas in UK, Poland, Slovakia & Saudi Arabia',
      'Technical trade testing, nursing verification & candidate profile audits',
      'End-to-end statutory work permit legalization & consular processing',
      'Zero illegal placement fees — strict compliance with international labor laws',
    ],
    corridors: 'UK, Poland, Slovakia, Portugal, Cyprus & Saudi Arabia',
    ctaText: 'Explore Foreign Job Quotas',
    ctaHref: ROUTES.jobs.root,
  },
  {
    id: 'work-permits',
    number: '02',
    title: 'Work Permit and Employment Immigration Consultancy',
    shortTitle: 'Work Permits & Employment',
    category: 'workforce',
    categoryLabel: 'Workforce & Recruitment',
    badge: 'Statutory Filings',
    icon: Briefcase,
    description:
      'End-to-end legal immigration processing for employment-based relocation. We handle government labor office filings, official employer sponsor validation, and embassy-compliant dossier assembly.',
    keyOfferings: [
      'Polish Voivodeship Type-A work permit allocations & renewals',
      'Slovakian single work-and-residence permit applications',
      'UK Skilled Worker Visa Certificate of Sponsorship (CoS) review',
      'Attestation at Ministry of Foreign Affairs (MFA Abuja) & Consulates',
    ],
    corridors: 'Poland, Slovakia, Portugal, UK & Canada',
    ctaText: 'Consult on Work Permits',
    ctaHref: ROUTES.services.workVisa,
  },
  {
    id: 'study-abroad',
    number: '03',
    title: 'Study Abroad and Student Recruitment',
    shortTitle: 'Study Abroad Admissions',
    category: 'immigration',
    categoryLabel: 'Immigration & Study',
    badge: 'Direct Admissions',
    icon: GraduationCap,
    description:
      'Direct admissions representation with accredited European and global higher education institutions. We secure official acceptance letters, merit tuition scholarship discounts, and manage compliant student visas.',
    keyOfferings: [
      'Direct university partnerships (Cyprus West University, WSEI Poland)',
      'Tuition scholarship grants up to 50% with flexible installment options',
      'Proof of Funds (POF) structuring & academic Statement of Purpose (SOP)',
      'Mock embassy consular interviews and on-campus accommodation',
    ],
    corridors: 'Northern Cyprus, Poland, Greece, UK & Canada',
    ctaText: 'Explore Study Pathways',
    ctaHref: ROUTES.services.studyVisa,
  },
  {
    id: 'visa-consultancy',
    number: '04',
    title: 'Visa Consultancy and Application Assistance',
    shortTitle: 'Visa Consultancy & Audit',
    category: 'immigration',
    categoryLabel: 'Immigration & Study',
    badge: 'Zero-Omission Review',
    icon: FileCheck2,
    description:
      'Professional visa file auditing and rejection reversal advisory. Every document is pre-screened by experienced immigration specialists to prevent discrepancies and maximize consular approval rates.',
    keyOfferings: [
      'Comprehensive 47-point visa dossier audit before submission',
      'Consular interview preparation & tailored mock session coaching',
      'Administrative review & refusal appeal advisory for rejected cases',
      'Appointment scheduling and biometrics slot coordination',
    ],
    corridors: 'Schengen Area, UK, USA, Canada & Australia',
    ctaText: 'Book File Audit Session',
    ctaHref: ROUTES.services.visaAssistance,
  },
  {
    id: 'travel-consultancy',
    number: '05',
    title: 'Travel Consultancy and Flight Booking Assistance',
    shortTitle: 'Travel & Flight Bookings',
    category: 'immigration',
    categoryLabel: 'Immigration & Study',
    badge: 'Verifiable GDS PNR',
    icon: Plane,
    description:
      'Professional corporate and individual travel management. We issue 100% verifiable airline reservations with active GDS PNR codes accepted by all major foreign embassies for visa appointments.',
    keyOfferings: [
      'Active GDS airline reservation itineraries verifiable online by visa officers',
      'Flexible flight dates tailored to appointment windows without financial risk',
      'Full ticket issuance, airport transfer guidance & hotel vouchers',
      'Corporate corporate executive flight reservations and group bookings',
    ],
    corridors: 'Global Airline Networks (Amadeus & Sabre GDS)',
    ctaText: 'Reserve Flight Itinerary',
    ctaHref: ROUTES.services.flightReservations,
  },
  {
    id: 'business-setup',
    number: '06',
    title: 'Business Setup and International Business Consultancy',
    shortTitle: 'International Business Setup',
    category: 'corporate',
    categoryLabel: 'Business & Talent',
    badge: 'European Incorporation',
    icon: Building2,
    description:
      'Corporate internationalization and European commercial establishment for Nigerian entrepreneurs and investors. We incorporate overseas entities, set up commercial bank accounts, and secure director residency.',
    keyOfferings: [
      'Remote company registration in Poland (Sp. z o.o.) and the United Kingdom',
      'KRS National Court Register filing, NIP tax ID, and EU VAT activation',
      'Virtual office commercial address and European multi-currency corporate banking',
      'Schengen D-Type Business Residency permits for company directors',
    ],
    corridors: 'Poland (EU), United Kingdom & Schengen Zone',
    ctaText: 'Explore Business Setup',
    ctaHref: ROUTES.services.businessRegistration,
  },
  {
    id: 'b2b-recruitment',
    number: '07',
    title: 'B2B Recruitment Partnerships and Manpower Sourcing',
    shortTitle: 'B2B Manpower Sourcing',
    category: 'workforce',
    categoryLabel: 'Workforce & Recruitment',
    badge: 'Enterprise Partnerships',
    icon: Handshake,
    description:
      'Turnkey overseas manpower sourcing solutions for European, British, and Gulf employers, main contractors, and recruitment agencies seeking verified, pre-screened African workforce cohorts.',
    keyOfferings: [
      'B2B bilateral recruitment agency agreements with verified SLAs',
      'Bulk talent pipeline sourcing in Healthcare, Construction, Welding & Logistics',
      'Consular legalization of employment contracts through MFA and Embassies',
      'Pre-departure orientation, trade certification, and flight mobilization',
    ],
    corridors: 'European Union, United Kingdom & Gulf Cooperation Council (GCC)',
    ctaText: 'Partner With Sijam B2B',
    ctaHref: ROUTES.partners,
  },
  {
    id: 'hr-workforce',
    number: '08',
    title: 'Human Resources and Workforce Consultancy',
    shortTitle: 'HR & Workforce Advisory',
    category: 'workforce',
    categoryLabel: 'Workforce & Recruitment',
    badge: 'Corporate Advisory',
    icon: UserCheck,
    description:
      'Strategic cross-border human resources advisory. We guide international employers and expatriate personnel through statutory labor compliance, contractual frameworks, and overseas workforce integration.',
    keyOfferings: [
      'Cross-border labor compliance advisory adhering to EU and Gulf regulations',
      'Expatriate compensation benchmarking and legal contract structuring',
      'Workplace orientation, cultural integration, and language preparation',
      'Staff retention strategies and diaspora personnel management',
    ],
    corridors: 'International Corporate Desks (Nigeria, EU & GCC)',
    ctaText: 'Request HR Consultation',
    ctaHref: ROUTES.contact,
  },
  {
    id: 'football-talent',
    number: '09',
    title: 'Football Talent Networking and International Partnerships',
    shortTitle: 'Football Talent Mobility',
    category: 'corporate',
    categoryLabel: 'Business & Talent',
    badge: 'Sports Mobility',
    icon: Trophy,
    description:
      'Connecting aspiring African football talent, youth academies, and athletes with legitimate European trial invitations, certified scouting networks, and compliant sports visa pathways.',
    keyOfferings: [
      'Bilateral networking with accredited European football academies and clubs',
      'Facilitation of authenticated trial invitations and training camps',
      'Sports visa legal dossier assembly and consular representation',
      'Athlete management contract verification and international advisory',
    ],
    corridors: 'Spain, Portugal, Italy, Malta & Central Europe',
    ctaText: 'Explore Sports Mobility',
    ctaHref: ROUTES.services.footballTalent,
  },
];

export const PillarsGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'workforce' | 'immigration' | 'corporate'>('all');

  const filteredPillars =
    activeTab === 'all'
      ? PILLARS_DATA
      : PILLARS_DATA.filter((item) => item.category === activeTab);

  const flagshipPillar = PILLARS_DATA[0];

  return (
    <section className="py-20 lg:py-28 bg-[#070415] text-white border-b border-purple-950/70 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#402493]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#257CFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Our 9 Core Pillars of Global Mobility
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Strategic Recruitment, Immigration &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Workforce Solutions
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Sijam Consults Limited operates a multi-corridor international framework spanning foreign manpower supply, statutory work permits, academic admissions, and cross-border corporate partnerships.
          </p>

          {/* Interactive Category Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              All 9 Pillars
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('workforce')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'workforce'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Workforce &amp; Recruitment (4)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('immigration')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'immigration'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span>Immigration &amp; Study (3)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('corporate')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'corporate'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-purple-300" />
              <span>Business &amp; Sports Talent (2)</span>
            </button>
          </div>
        </div>

        {/* FLAGSHIP HERO SPOTLIGHT: Pillar 01 - International Recruitment and Manpower Supply */}
        {(activeTab === 'all' || activeTab === 'workforce') && (
          <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#120A38] via-[#0E072E] to-[#070415] border-2 border-[#257CFF]/50 shadow-[0_20px_60px_-15px_rgba(37,124,255,0.35)] overflow-hidden">
            {/* Top Glowing Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#257CFF]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Primary Flagship Offering • Pillar {flagshipPillar.number}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#257CFF]/20 text-[#4DA5EC] border border-[#257CFF]/40">
                    Direct Employer Quotas
                  </span>
                </div>

                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {flagshipPillar.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {flagshipPillar.description}
                </p>

                {/* Offerings 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {flagshipPillar.keyOfferings.map((offering, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-200 bg-white/[0.03] p-2.5 rounded-xl border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{offering}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-[#4DA5EC] font-bold">Active Corridors:</span>
                  <span>{flagshipPillar.corridors}</span>
                </div>
              </div>

              {/* Right CTA / Action Panel */}
              <div className="lg:col-span-4 flex flex-col justify-center gap-3 p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-center pb-2 border-b border-white/10">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Foreign Vacancies &amp; Manpower
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Updated Daily • CAC Registered (RC: 1715416)
                  </div>
                </div>

                <Link
                  href={ROUTES.jobs.root}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-extrabold text-xs uppercase tracking-wider text-center shadow-cta hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Live Job Quotas</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact?intent=hire_manpower"
                  className="w-full py-3 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs uppercase tracking-wider text-center border border-white/15 transition-all flex items-center justify-center gap-2"
                >
                  <span>Hire Manpower (Employers)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#4DA5EC]" />
                </Link>

                <p className="text-[10px] text-slate-400 text-center leading-tight">
                  Direct employer sponsorships with full legal work permit and relocation support.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* The Remaining Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPillars
            .filter((p) => !p.isFlagship)
            .map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg backdrop-blur-md"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#402493]/70 group-hover:bg-[#257CFF] text-white flex items-center justify-center transition-colors shadow">
                        <Icon className="w-5 h-5 text-[#4DA5EC] group-hover:text-white" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">
                          {pillar.number}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {pillar.badge}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#F98864]">
                        {pillar.categoryLabel}
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#4DA5EC] transition-colors mt-0.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Key Deliverables:
                      </div>
                      <ul className="space-y-1">
                        {pillar.keyOfferings.slice(0, 2).map((offering, idx) => (
                          <li
                            key={idx}
                            className="text-[11px] text-slate-300 flex items-start gap-1.5 line-clamp-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] shrink-0 mt-1.5" />
                            <span>{offering}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                      {pillar.corridors}
                    </span>
                    <Link
                      href={pillar.ctaHref}
                      className="inline-flex items-center gap-1 font-bold text-[#4DA5EC] group-hover:text-white transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
