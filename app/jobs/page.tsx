import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { JobsDirectory } from '@/components/jobs/JobsDirectory';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';
import { VIDEOS } from '@/lib/constants/videos';
import { Briefcase, ShieldCheck, CheckCircle2, Globe2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jobs & International Opportunities | Sijam Consults Limited – Verified Vacancies',
  description: 'Explore verified international employment opportunities in Poland, Slovakia, Cyprus, and Portugal. Direct employer sponsorships with professional visa assistance.',
};

export default function JobsPage() {
  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* Cinematic Header with Ambient Video */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-125"
              src={VIDEOS.WORK_VISA}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Jobs & Opportunities' }]} />
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <ShieldCheck className="w-4 h-4 text-[#F45A2A]" />
                <span>Verified European Employers & Statutory Labor Filings</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Verified Global{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Career Openings
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Opportunities authenticated directly with verified European and international corporate sponsors. Sijam Consults conducts corporate credential checks and assists qualified candidates through statutory labor authorization filings.
              </p>

              {/* Trust Value Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>No Illegal Fees</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Zero placement markups</div>
                </div>
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-purple-400" />
                    <span>Host Nation Permits</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Official Voivodeship filings</div>
                </div>
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#F98864]" />
                    <span>Active Vacancies</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Direct sponsor links</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Body */}
        <section className="py-12 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8 max-w-4xl">
              <TrustBanner showFullDisclaimer={true} />
            </div>

            <JobsDirectory />
          </div>
        </section>

        <ConsultationBanner />
      </div>
    </PublicLayout>
  );
}
