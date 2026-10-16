import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Handshake, ShieldCheck, CheckCircle2, ArrowRight, Award, GraduationCap, Globe2, Briefcase, Building2, Plane } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { PARTNERS_DATA } from '@/lib/data/partners';
import { ROUTES, COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'Global Academic & Institutional Partners | Sijam Consults Limited',
  description: 'Explore Sijam Consults Limited’s official bilateral partnerships across Australia, Europe, the UK, and Saudi Arabia. Verified direct admissions, work permit quotas, and international recruitment.',
};

export default function PartnersPage() {
  const educationPartners = PARTNERS_DATA.filter((p) =>
    ['Accreditation Body', 'Academic Consultancy', 'Education & Mobility', 'Education & Migration Agency'].includes(p.category)
  );
  const recruitmentPartners = PARTNERS_DATA.filter((p) =>
    ['Foreign Job Placement', 'Manpower Services', 'Recruitment Partner'].includes(p.category)
  );
  const aviationPartners = PARTNERS_DATA.filter((p) =>
    ['Aviation & Ticketing Partner'].includes(p.category)
  );

  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* 1. Cinematic Hero Section with Ambient Partners Video */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-125"
              src={VIDEOS.SIJAM_CONSULTS_PARTNERS}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Institutional Partners' }]} />
            </div>

            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <Handshake className="w-4 h-4 text-[#F45A2A]" />
                <span>Verified Bilateral Educational & Recruitment Accreditations</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Institutional &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Global Partners
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Sijam Consults Limited (RC: 1715416) maintains verified bilateral ties with accredited international academic consultancies, credential evaluators, and official recruitment &amp; manpower agencies across Australia, Europe, the UK, and Saudi Arabia / GCC. No sub-agent markups. Direct bilateral pipelines.
              </p>

              {/* Fast Trust Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Global Corridors</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Australia, EU, UK &amp; Saudi Arabia</div>
                </div>
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Direct Quotas</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Sponsorships &amp; admissions</div>
                </div>
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>RC: 1715416</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">CAC Verified Corporation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Main Partners Showcase */}
        <section className="py-16 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
            
            {/* Group 1: Education & Academic Mobility Alliances */}
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Academic &amp; Migration Alliances</span>
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    International Education &amp; Migration Partners
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Accredited education agencies, MARA-registered migration advisors, and credential evaluators across Australia, Europe, and the UK.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Accredited Pathways
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {educationPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#4DA5EC]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="h-20 w-48 relative bg-black/60 rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-white/15"
                          style={{ position: 'relative' }}
                        >
                          <Image
                            src={partner.logoUrl}
                            alt={partner.name}
                            fill
                            sizes="192px"
                            className="object-contain p-1.5"
                          />
                        </div>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#402493]/60 text-purple-200 border border-purple-500/30 whitespace-nowrap">
                          {partner.country}
                        </span>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#F98864]">
                          {partner.category}
                        </div>
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#4DA5EC] transition-colors mt-0.5">
                          {partner.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                          {partner.description}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
                        <strong className="text-white">Bilateral Scope:</strong> {partner.collaborationScope}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                      {partner.websiteUrl ? (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">Direct Institutional Agreement</span>
                      )}
                      <Link
                        href={ROUTES.contact}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold shadow-cta border border-[#4DA5EC]/30 hover:brightness-110 transition-all"
                      >
                        <span>Inquire via Sijam</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group 2: International Recruitment & Manpower Corridors */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Foreign Employment &amp; Manpower Pipelines</span>
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    International Manpower &amp; Recruitment Networks
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Verified foreign recruitment desks and manpower suppliers for direct employer sponsorship in Europe, Turkey, Saudi Arabia, and the GCC.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Direct Quotas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recruitmentPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="h-20 w-48 relative bg-black/60 rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-white/15"
                          style={{ position: 'relative' }}
                        >
                          <Image
                            src={partner.logoUrl}
                            alt={partner.name}
                            fill
                            sizes="192px"
                            className="object-contain p-1.5"
                          />
                        </div>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                          {partner.country}
                        </span>
                      </div>

                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#F98864]">
                          {partner.category}
                        </div>
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-emerald-400 transition-colors mt-0.5">
                          {partner.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                          {partner.description}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
                        <strong className="text-white">Bilateral Scope:</strong> {partner.collaborationScope}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                      {partner.websiteUrl ? (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Direct Consular Quota Agreement</span>
                        </span>
                      )}
                      <Link
                        href={ROUTES.jobs.root}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold shadow-cta border border-[#4DA5EC]/30 hover:brightness-110 transition-all"
                      >
                        <span>Explore Vacancies</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group 3: Strategic Aviation & Ticketing Alliances */}
            {aviationPartners.length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] mb-1">
                      <Plane className="w-4 h-4" />
                      <span>Aviation &amp; Travel Management</span>
                    </div>
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                      Strategic Aviation &amp; Flight Ticketing Alliances
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Official aviation consolidator partnerships providing live GDS airline terminal reservations (Amadeus &amp; Sabre), verifiable PNR codes, and international flight ticketing.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Live GDS Desk
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aviationPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#4DA5EC]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className="h-20 w-48 relative bg-white rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-white/20 shadow-md"
                            style={{ position: 'relative' }}
                          >
                            <Image
                              src={partner.logoUrl}
                              alt={partner.name}
                              fill
                              sizes="192px"
                              className="object-contain p-1.5"
                            />
                          </div>
                          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-950/70 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                            {partner.country}
                          </span>
                        </div>

                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#F98864]">
                            {partner.category}
                          </div>
                          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#4DA5EC] transition-colors mt-0.5">
                            {partner.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                            {partner.description}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200">
                          <strong className="text-white">Bilateral Scope:</strong> {partner.collaborationScope}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                        <Link
                          href="/services/flight-reservations"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          <span>Explore Flight Desk</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        </Link>
                        <Link
                          href="/services/flight-reservations#booking-widget"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold shadow-cta border border-[#4DA5EC]/30 hover:brightness-110 transition-all"
                        >
                          <span>Request Flight PNR</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Institutional Partnership Proposal Banner */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1A1040] to-[#0D0826] border border-white/15 text-center max-w-3xl mx-auto shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#402493] text-white flex items-center justify-center mx-auto border border-purple-500/30">
                <Handshake className="w-6 h-6 text-[#F98864]" />
              </div>
              <h3 className="font-heading font-black text-2xl text-white">
                Explore Institutional Alliances With Sijam Consults
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Are you an accredited international university, migration advisory, or verified employer seeking authenticated Nigerian candidate referrals? Connect with our corporate liaisons desk.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={ROUTES.contact}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta border border-[#4DA5EC]/30"
                >
                  <span>Initiate Partnership Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`mailto:${COMPANY.emails.primary}?subject=Institutional%20Partnership%20Proposal`}
                  className="px-5 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-xs border border-white/15 transition-all"
                >
                  Direct Email Desk
                </a>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <TrustBanner showFullDisclaimer={false} />
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
