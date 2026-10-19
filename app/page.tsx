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

export const metadata: Metadata = {
  title: 'Immigration & Travel Consultancy in Nigeria | SIJAM',
  description:
    'Explore visa guidance, study abroad, work permit, international recruitment and travel services from Sijam Consults Limited in Nigeria (CAC RC: 1715416).',
  keywords: [
    'immigration and travel consultancy in Nigeria',
    'visa consultancy in Nigeria',
    'travel agency in Nigeria',
    'work permit consultancy',
    'study abroad consultancy',
    'international recruitment services',
    'manpower solutions',
    'flight reservation for visa application',
    'business registration consultancy',
    'document legalization and attestation',
    'visa application assistance',
    'Sijam Consults Limited',
    'Sijam Consults',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com',
  },
  openGraph: {
    title: 'Immigration & Travel Consultancy in Nigeria | SIJAM',
    description:
      'Explore visa guidance, study abroad, work permit, international recruitment and travel services from Sijam Consults Limited in Nigeria (CAC RC: 1715416).',
    url: 'https://sijamconsults.com',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigration & Travel Consultancy in Nigeria | SIJAM',
    description:
      'Explore visa guidance, study abroad, work permit, international recruitment and travel services from Sijam Consults Limited in Nigeria.',
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
