import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { ServicePathwaysSection } from '@/components/home/ServicePathwaysSection';
import { ManpowerSupplyDesk } from '@/components/home/ManpowerSupplyDesk';
import { WorkPermitsTransparencySection } from '@/components/home/WorkPermitsTransparencySection';
import { FeaturedJobsSection } from '@/components/home/FeaturedJobsSection';
import { StudyAbroadSection } from '@/components/home/StudyAbroadSection';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { WhyUsPreview } from '@/components/home/WhyUsPreview';
import { VideoTestimonialsSection } from '@/components/home/VideoTestimonialsSection';
import { PartnerMarquee } from '@/components/home/PartnerMarquee';
import { FeaturedGuidesSection } from '@/components/home/FeaturedGuidesSection';
import { HomeFAQ } from '@/components/home/HomeFAQ';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';
import { HonestFitSection } from '@/components/home/HonestFitSection';
import { InformationGainSection } from '@/components/home/InformationGainSection';

export const metadata: Metadata = {
  title: 'Sijam Consults | International Recruitment & Immigration Agency',
  description:
    'Sijam Consults Limited is an accredited Nigerian consultancy providing ethical international recruitment, study abroad admissions, and statutory work permits.',
  keywords: [
    'immigration and international recruitment consultancy in nigeria',
    'study abroad agency in nigeria',
    'work permit consultancy in nigeria',
    'international recruitment agency in nigeria',
    'travel and visa consultants in nigeria',
    'Sijam Consults Limited',
    'CAC RC: 1715416',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com',
  },
  openGraph: {
    title: 'Sijam Consults | International Recruitment & Immigration Agency',
    description:
      'Sijam Consults Limited is an accredited Nigerian consultancy providing ethical international recruitment, study abroad admissions, and statutory work permits.',
    url: 'https://sijamconsults.com',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sijam Consults | International Recruitment & Immigration Agency',
    description:
      'Sijam Consults Limited is an accredited Nigerian consultancy providing ethical international recruitment, study abroad admissions, and statutory work permits.',
  },
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* 1. Cinematic Hero Section with conversion CTAs & verified video */}
      <HeroSection />

      {/* 2. Key Operational Trust & Compliance Bar */}
      <StatsBar />

      {/* 3. Comprehensive Global Mobility & Recruitment Service Pathways */}
      <ServicePathwaysSection />

      {/* 4. International Recruitment & B2B Manpower Supply Desk */}
      <ManpowerSupplyDesk />

      {/* 5. Work Permits, Foreign Employment & Consular Transparency */}
      <WorkPermitsTransparencySection />

      {/* 6. Featured International Opportunities from Live Data */}
      <FeaturedJobsSection />

      {/* 7. Study Abroad & Direct University Admissions */}
      <StudyAbroadSection />

      {/* 8. 5-Stage Transparent Advisory & Compliance Process */}
      <ProcessSteps />

      {/* 9. Institutional Integrity, Corporate Governance & Track Record */}
      <WhyUsPreview />

      {/* 9b. Honest Agency Fit & Disqualification (Information Gain — unique competitor gap) */}
      <HonestFitSection />

      {/* 9c. Consular Audit Checklist & True Cost Breakdown (Information Gain) */}
      <InformationGainSection />

      {/* 10. Verified Client Approvals & Video Testimonials */}
      <VideoTestimonialsSection />

      {/* 11. Horizontal Sliding Bilateral Alliances & University Consortia */}
      <PartnerMarquee />

      {/* 12. Editorial Intelligence & Verified Migration Guides */}
      <FeaturedGuidesSection />

      {/* 13. Frequently Asked Questions Accordion */}
      <HomeFAQ />

      {/* 14. Consultation Action Banner & Physical Headquarters Appointment */}
      <ConsultationBanner />
    </PublicLayout>
  );
}
