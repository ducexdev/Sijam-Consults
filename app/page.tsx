import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { ServicePathwaysSection } from '@/components/home/ServicePathwaysSection';
import { ManpowerSupplyDesk } from '@/components/home/ManpowerSupplyDesk';
import { WorkPermitsTransparencySection } from '@/components/home/WorkPermitsTransparencySection';
import { StudyAbroadSection } from '@/components/home/StudyAbroadSection';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { WhyUsPreview } from '@/components/home/WhyUsPreview';
import { VideoTestimonialsSection } from '@/components/home/VideoTestimonialsSection';
import { PartnerMarquee } from '@/components/home/PartnerMarquee';
import { FeaturedGuidesSection } from '@/components/home/FeaturedGuidesSection';
import { HomeFAQ } from '@/components/home/HomeFAQ';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';

export const metadata: Metadata = {
  title: 'International Recruitment Agency in Nigeria | Sijam Consults Limited',
  description:
    'Sijam Consults Limited (CAC RC: 1715416) is Nigeria’s accredited international recruitment agency and manpower consultancy. Verified employer quotas across the UK, Poland, Slovakia & Saudi Arabia, statutory work permits, study abroad, and ethical migration advisory.',
  keywords: [
    'International Recruitment Agency in Nigeria',
    'overseas recruitment agency Nigeria',
    'manpower supply Nigeria',
    'international recruitment agency',
    'work permit consultancy Nigeria',
    'study abroad agency Nigeria',
    'foreign employer quotas Nigeria',
    'Poland work permit Nigeria',
    'Slovakia work permit Nigeria',
    'UK sponsorship jobs Nigeria',
    'international talent recruitment',
    'B2B manpower sourcing',
    'Sijam Consults Limited',
    'Sijam Consults',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com',
  },
  openGraph: {
    title: 'International Recruitment Agency in Nigeria | Sijam Consults Limited',
    description:
      'Sijam Consults Limited is Nigeria’s premier international recruitment agency (RC: 1715416). Connecting Nigerian talent with verified foreign employer quotas, European work permits, study abroad, and B2B manpower supply.',
    url: 'https://sijamconsults.com',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Recruitment Agency in Nigeria | Sijam Consults Limited',
    description:
      'Accredited international recruitment agency in Nigeria (CAC RC: 1715416). Direct foreign employer quotas, European work permits, study abroad, and ethical advisory.',
  },
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* 1. Cinematic Hero Section with conversion CTAs & verified video */}
      <HeroSection />

      {/* 2. Key Operational Metrics & Trust Bar */}
      <StatsBar />

      {/* 3. Comprehensive Global Mobility & Recruitment Service Pathways */}
      <ServicePathwaysSection />

      {/* 4. International Recruitment & B2B Manpower Supply Desk */}
      <ManpowerSupplyDesk />

      {/* 5. Work Permits, Foreign Employment & Consular Transparency */}
      <WorkPermitsTransparencySection />

      {/* 6. Study Abroad & Direct University Admissions */}
      <StudyAbroadSection />

      {/* 7. 5-Stage Transparent Advisory & Compliance Process */}
      <ProcessSteps />

      {/* 8. Institutional Integrity, Corporate Governance & Track Record */}
      <WhyUsPreview />

      {/* 9. Verified Client Approvals & Video Testimonials */}
      <VideoTestimonialsSection />

      {/* 10. Horizontal Sliding Bilateral Alliances & University Consortia */}
      <PartnerMarquee />

      {/* 11. Editorial Intelligence & Verified Migration Guides */}
      <FeaturedGuidesSection />

      {/* 12. Frequently Asked Questions Accordion */}
      <HomeFAQ />

      {/* 13. Consultation Action Banner & Physical Headquarters Appointment */}
      <ConsultationBanner />
    </PublicLayout>
  );
}
