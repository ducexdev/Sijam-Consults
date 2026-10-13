import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { AssessmentCalculator } from '@/components/assessment/AssessmentCalculator';

export const metadata: Metadata = {
  title: 'Free Visa & Relocation Eligibility Assessment | Sijam Consults Limited',
  description: 'Complete our 2-minute eligibility quiz to discover your best pathway for studying, working, or relocating abroad. Instant personalized recommendation.',
};

export default function AssessmentPage() {
  return (
    <PublicLayout>
      <div className="py-12 bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#402493]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F45A2A]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Eligibility Assessment' }]} />
          </div>

          <div className="mb-8 max-w-2xl mx-auto">
            <TrustBanner showFullDisclaimer={false} />
          </div>

          <AssessmentCalculator />
        </div>
      </div>
    </PublicLayout>
  );
}
