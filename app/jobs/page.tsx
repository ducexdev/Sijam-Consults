import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { CountryCorridors } from '@/components/jobs/CountryCorridors';
import { FeaturedEmployers } from '@/components/jobs/FeaturedEmployers';
import { JobsDirectory } from '@/components/jobs/JobsDirectory';
import { RelocationProcess } from '@/components/jobs/RelocationProcess';
import { JobTestimonials } from '@/components/jobs/JobTestimonials';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';
import { VIDEOS } from '@/lib/constants/videos';
import { ROUTES } from '@/lib/routes';
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Sparkles,
  ArrowRight,
  Plane,
  Building2,
  FileCheck2,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Foreign Jobs & International Career Quotas | Sijam Consults Limited',
  description:
    'Explore authentic foreign employment opportunities in the UK, Poland, Slovakia, Portugal, and Cyprus. Verified employer sponsorships, statutory work permits (Voivodeship, CoS), and full relocation advisory for Nigerian professionals.',
  keywords:
    'foreign jobs for Nigerians, UK care assistant visa, Poland work permit, Slovakia welder jobs, European work visa, overseas recruitment agency Nigeria, Sijam Consults Kaduna',
};

export default function JobsPage() {
  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* 1. Cinematic Hero Header with Ambient Video */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-125"
              src={VIDEOS.WORK_VISA}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/80 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
            <div className="mb-4">
              <Breadcrumbs items={[{ label: 'Foreign Jobs & Relocation' }]} />
            </div>

            <div className="max-w-4xl space-y-5">
              {/* Statutory Accreditation Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-purple-500/30 backdrop-blur-md text-xs text-purple-200">
                <ShieldCheck className="w-4 h-4 text-[#F45A2A]" />
                <span className="font-semibold">
                  100% Foreign Positions • CAC Registered (RC: 1715416) • Official Work Permit Quotas
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Find Your Next{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#A855F7]">
                  Foreign Job Opportunity,
                </span>{' '}
                Faster.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
                We connect qualified Nigerian nurses, tradespeople, drivers, engineers, and hospitality personnel with verified foreign employers across the United Kingdom, Poland, Slovakia, Portugal, and Cyprus. All vacancies include statutory work permit filings (Voivodeship, CoS, or Single Work Authorizations).
              </p>

              {/* Key Trust Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero Illegal Fees</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">No secret placement cuts</div>
                </div>

                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-purple-400" />
                    <span>Host Permits</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Statutory labor filings</div>
                </div>

                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Direct Sponsors</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Verified EU & UK employers</div>
                </div>

                <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-[#F98864]" />
                    <span>Relocation Pack</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Visas, housing & flights</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Destination Corridors (Jobberman format) */}
        <section className="py-14 bg-[#090518] border-b border-purple-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <CountryCorridors />
          </div>
        </section>

        {/* 3. Featured International Employers */}
        <section className="py-14 bg-[#0B071E] border-b border-purple-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FeaturedEmployers />
          </div>
        </section>

        {/* 4. Main Directory & Job Board */}
        <section id="directory" className="py-16 bg-[#070415]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40 text-[11px] font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-[#F45A2A]" />
                <span>Active International Vacancies</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
                Live Foreign Employer Quotas & Applications
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                Browse open positions with authorized visa sponsorships. Filter by destination nation, technical trade, or contract type.
              </p>
            </div>

            <div className="max-w-4xl">
              <TrustBanner showFullDisclaimer={false} />
            </div>

            <JobsDirectory />
          </div>
        </section>

        {/* 5. The Relocation Process (Level Up Your Career section) */}
        <section className="py-16 bg-[#0B071E] border-t border-purple-950/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <RelocationProcess />
          </div>
        </section>

        {/* 6. Candidate Testimonials & Verification Proofs */}
        <section className="py-16 bg-[#070415] border-t border-purple-950/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <JobTestimonials />
          </div>
        </section>

        {/* 7. Unlisted Skills Talent Bank Callout */}
        <section className="py-12 bg-gradient-to-r from-[#120836] via-[#1C0D4F] to-[#0D0626] border-t border-purple-900/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-purple-200 border border-white/10 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span>International Talent Repository</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Don’t See Your Specific Trade or Profession Listed?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Foreign corporate quotas open continuously for industrial electricians, heavy machinery operators, hospitality crews, and healthcare workers. Register your profile and CV with our Kaduna employment desk to be fast-tracked when matching allocations open.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={ROUTES.consultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs uppercase tracking-wider shadow-cta hover:brightness-110 transition-all border border-[#4DA5EC]/40"
              >
                <span>Submit CV to Talent Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.contact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs border border-white/15 transition-all"
              >
                <span>Visit Our Kaduna Office</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Global Consultation Banner */}
        <ConsultationBanner />
      </div>
    </PublicLayout>
  );
}
