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
  Search,
  MapPin,
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
        {/* 1. Cinematic Hero — Full-Screen Video Background */}
        <section className="relative overflow-hidden min-h-[88vh] flex flex-col justify-end border-b border-black/60">

          {/* ── Video Background ── */}
          <div className="absolute inset-0 pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80"
              src={VIDEOS.WORK_VISA}
            />
            {/* Dark gradient bottom-up so text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
            {/* Subtle brand colour tint */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,_rgba(64,36,147,0.45)_0%,_transparent_70%)]" />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-14 pt-28 lg:pt-36 space-y-8">

            {/* Breadcrumbs */}
            <Breadcrumbs items={[{ label: 'Foreign Jobs & Relocation' }]} />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F45A2A]" />
              <span className="font-semibold tracking-wide">
                100% Foreign Positions • CAC Registered (RC: 1715416) • Official Work Permit Quotas
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 max-w-4xl">
              <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] drop-shadow-xl">
                Find your next job{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#A855F7]">
                  opportunity,
                </span>{' '}
                faster.
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal max-w-2xl">
                Verified foreign employer sponsorships in the UK, Poland, Slovakia, Portugal &amp; Cyprus — including full statutory work permit filings and relocation support.
              </p>
            </div>

            {/* ── Jobberman-Style Search Bar ── */}
            <div className="bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl shadow-2xl">
              <div className="flex items-center gap-3 flex-1 bg-white/10 rounded-xl px-4 py-3">
                <Search className="w-5 h-5 text-white/60 shrink-0" />
                <span className="text-white/50 text-sm select-none">Job title, keyword, or skill…</span>
              </div>
              <div className="flex items-center gap-3 flex-1 bg-white/10 rounded-xl px-4 py-3 border-l border-white/10">
                <MapPin className="w-5 h-5 text-white/60 shrink-0" />
                <span className="text-white/50 text-sm select-none">Country or region</span>
              </div>
              <Link
                href="#directory"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                Search Jobs
              </Link>
            </div>

            {/* ── Bottom Trust Stats ── */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong className="text-white">Zero</strong> illegal placement fees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Globe2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong className="text-white">5+</strong> destination countries</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Building2 className="w-4 h-4 text-[#4DA5EC] shrink-0" />
                <span><strong className="text-white">Direct</strong> employer sponsorships</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Plane className="w-4 h-4 text-[#F98864] shrink-0" />
                <span><strong className="text-white">Full</strong> relocation pack included</span>
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
