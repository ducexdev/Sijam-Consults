import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { ReviewsShowcase } from '@/components/reviews/ReviewsShowcase';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';
import { VIDEOS } from '@/lib/constants/videos';
import { ShieldCheck, Star, Award, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Reviews & Verified Visa Approvals | Sijam Consults Limited',
  description: 'See authentic proof of our results. Browse real visa approval stamps, client video reviews, and success stories across Schengen, Canada, and the UK.',
};

export default function ReviewsPage() {
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
              className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-125"
              src={VIDEOS.TOURIST_VISA}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Visa Approvals & Reviews' }]} />
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <ShieldCheck className="w-4 h-4 text-[#F45A2A]" />
                <span>Documented Consular Approvals & Client Video Testimonials</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Real Visas. Real Admissions.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Real Results.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Browse authentic sovereign embassy approvals, client video recordings, and corporate testimonials. All physical documents are redacted in full compliance with the Nigeria Data Protection Act (NDPR 2023).
              </p>

              {/* Fast Trust Counters */}
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F98864]" />
                  <span>33+ Catalogued Visa Stamps</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>5-Star Client Rating</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Genuine Records</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Body */}
        <section className="py-12 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-4xl mx-auto">
              <TrustBanner showFullDisclaimer={true} />
            </div>

            <ReviewsShowcase />
          </div>
        </section>

        <ConsultationBanner />
      </div>
    </PublicLayout>
  );
}
