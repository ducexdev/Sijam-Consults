import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { ManpowerSupplyDesk } from '@/components/home/ManpowerSupplyDesk';
import { WhyUsPreview } from '@/components/home/WhyUsPreview';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { VideoTestimonialsSection } from '@/components/home/VideoTestimonialsSection';
import { PartnerMarquee } from '@/components/home/PartnerMarquee';
import { HomeFAQ } from '@/components/home/HomeFAQ';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';

export const metadata: Metadata = {
  title: 'Sijam Consults Limited | International Recruitment, Manpower Supply & Global Mobility',
  description:
    'Nigeria\'s leading International Recruitment & Manpower Supply Agency (CAC RC: 1715416). Verified foreign employer quotas in the UK, Poland, Slovakia & Saudi Arabia, statutory work permits, study abroad, B2B workforce sourcing, and global mobility consultancy.',
  keywords: [
    'International Recruitment and Manpower Supply',
    'Work Permit and Employment Immigration Consultancy',
    'Study Abroad and Student Recruitment',
    'Visa Consultancy and Application Assistance',
    'Travel Consultancy and Flight Booking Assistance',
    'Business Setup and International Business Consultancy',
    'B2B Recruitment Partnerships and Manpower Sourcing',
    'Human Resources and Workforce Consultancy',
    'Football Talent Networking and International Partnerships',
    'overseas recruitment agency Nigeria',
    'manpower supply Nigeria',
    'foreign job quotas Nigeria',
    'Poland work permit Nigeria',
    'Slovakia work permit Nigeria',
    'Saudi Arabia recruitment agency',
    'Sijam Consults',
  ],
  openGraph: {
    title: 'Sijam Consults Limited | International Recruitment, Manpower Supply & Global Mobility',
    description:
      'Nigeria\'s leading International Recruitment & Manpower Supply Agency (CAC RC: 1715416). Direct foreign employer quotas for the UK, Poland, Slovakia & Saudi Arabia, statutory work permits, and B2B workforce sourcing.',
    url: 'https://sijamconsults.com',
    siteName: 'Sijam Consults Limited',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sijam Consults Limited | International Recruitment, Manpower Supply & Global Mobility',
    description:
      'Nigeria\'s leading International Recruitment & Manpower Supply Agency (CAC RC: 1715416). Direct foreign employer quotas, European work permits, study abroad, and B2B workforce sourcing.',
  },
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* 1 — Cinematic hero with YouTube video + pathways grid */}
      <HeroSection />
      {/* 2 — Animated trust metrics bar */}
      <StatsBar />
      {/* 3 — B2B Manpower Supply flagship section */}
      <ManpowerSupplyDesk />
      {/* 4 — Why Sijam: proof pillars */}
      <WhyUsPreview />
      {/* 5 — 4-stage advisory process */}
      <ProcessSteps />
      {/* 6 — Video testimonials */}
      <VideoTestimonialsSection />
      {/* 7 — Partner logos marquee */}
      <PartnerMarquee />
      {/* 8 — FAQ accordion */}
      <HomeFAQ />
      {/* 9 — Final CTA banner */}
      <ConsultationBanner />
    </PublicLayout>
  );
}
