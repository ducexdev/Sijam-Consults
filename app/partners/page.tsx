import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Handshake, ShieldCheck, CheckCircle2, ArrowRight, Award, GraduationCap, Building2 } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { PARTNERS_DATA } from '@/lib/data/partners';
import { ROUTES, COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'Global Academic & Institutional Partners | Sijam Consults Limited',
  description: 'Explore Sijam Consults Limited’s official academic and corporate partnerships across Cyprus, Poland, Europe, and Nigeria. Direct university admissions and certified verification.',
};

export default function PartnersPage() {
  const universities = PARTNERS_DATA.filter((p) => p.category === 'University');
  const others = PARTNERS_DATA.filter((p) => p.category !== 'University');

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
                <span>Verified Bilateral Academic & Corporate Accreditations</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Institutional &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Global Partners
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Sijam Consults Limited (RC: 1715416) maintains verified bilateral ties with accredited European universities, credential evaluators, and international corporate mobility desks. No sub-agent markups. Guaranteed merit scholarship quotas.
              </p>

              {/* Fast Trust Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#F98864]" />
                    <span>Direct Admissions</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Cyprus West & Poland</div>
                </div>
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Up to 50% Grants</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Merit scholarship quotas</div>
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
            {/* Direct Partner Universities */}
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    Direct Partner Higher Education Institutions
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    European universities offering direct admissions, English instruction waivers, and scholarship quotas
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Accredited Programs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {universities.map((uni) => (
                  <div
                    key={uni.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="h-16 w-40 relative bg-white/10 rounded-2xl p-2.5 flex items-center justify-center overflow-hidden border border-white/15"
                          style={{ position: 'relative' }}
                        >
                          <Image
                            src={uni.logoUrl}
                            alt={uni.name}
                            fill
                            sizes="160px"
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#402493]/60 text-purple-200 border border-purple-500/30">
                          {uni.country}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-[#F98864] transition-colors">
                          {uni.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                          {uni.description}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
                        <strong className="text-white">Bilateral Scope:</strong> {uni.collaborationScope}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                      {uni.websiteUrl ? (
                        <a
                          href={uni.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                        >
                          <span>Institutional Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">Direct Institutional Agreement</span>
                      )}
                      <Link
                        href={ROUTES.services.studyVisa}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold shadow-cta border border-[#4DA5EC]/30"
                      >
                        <span>Apply via Sijam</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial & Professional Alliances */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Corporate & Credentialing Alliances
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Accredited academies, international recruitment networks, and industry verification partners
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {others.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all backdrop-blur-md flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div
                        className="h-16 w-full relative bg-black rounded-xl overflow-hidden border border-white/10"
                        style={{ position: 'relative' }}
                      >
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F98864]">
                          {partner.category}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-white mt-0.5">
                          {partner.name}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-3 leading-relaxed">
                          {partner.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-4 border-t border-white/10 space-y-2">
                      <div className="text-[11px] text-purple-300">
                        <strong className="text-slate-400">Scope:</strong> {partner.collaborationScope}
                      </div>
                      {partner.websiteUrl && (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4DA5EC] hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Visit Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Partnership Proposal Banner */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1A1040] to-[#0D0826] border border-white/15 text-center max-w-3xl mx-auto shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#402493] text-white flex items-center justify-center mx-auto border border-purple-500/30">
                <Handshake className="w-6 h-6 text-[#F98864]" />
              </div>
              <h3 className="font-heading font-black text-2xl text-white">
                Explore Institutional Alliances With Sijam Consults
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Are you an accredited international university, vocational training academy, or verified European employer seeking authenticated Nigerian candidate referrals? Connect with our corporate liaisons desk.
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
