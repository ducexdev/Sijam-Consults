import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ReviewsShowcase } from '@/components/reviews/ReviewsShowcase';

export const metadata: Metadata = {
  title: 'Client Testimonials & Verified Visa Approvals | Sijam Consults Limited',
  description: 'Read authentic client reviews and inspect verified consular visa approval stamps from Sijam Consults Limited across Poland, Cyprus, Canada, UK, and Schengen countries.',
  // Canonical points to /reviews — the canonical destination for all social-proof content.
  // /testimonials is preserved as an alias for legacy inbound links and sharing.
  alternates: {
    canonical: 'https://sijamconsults.com/reviews',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TestimonialsPage() {
  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Testimonials & Reviews' }]} />

          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#402493] bg-purple-100 px-3 py-1 rounded-full">
              Authentic Social Proof & Client Stories
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight mt-3">
              Client Testimonials & Success Stories
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Browse real experiences from Nigerian students, healthcare professionals, and corporate investors who achieved their international goals with Sijam Consults Limited.
            </p>
          </div>

          <ReviewsShowcase />
        </div>
      </div>
    </PublicLayout>
  );
}
