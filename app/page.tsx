import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { ServiceHighlights } from '@/components/home/ServiceHighlights';
import { WhyUsPreview } from '@/components/home/WhyUsPreview';
import { VisaStampGallery } from '@/components/home/VisaStampGallery';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { VideoTestimonialsSection } from '@/components/home/VideoTestimonialsSection';
import { PartnerMarquee } from '@/components/home/PartnerMarquee';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';

export const metadata: Metadata = {
  title: 'Sijam Consult: Your Trusted Immigration & Travel Agency in Nigeria',
  description:
    "Simplify your travel desire with Sijam Consult. We're your one-stop shop for visas, flights, hotels & more: expert travel agency + personalized immigration services. Contact us today!",
  keywords: [
    'travel agency',
    'a travel agency',
    'travel agent agency',
    'travel agency in Nigeria',
    'trusted travel agency',
    'immigration services Nigeria',
    'visa application travel agency',
    'flights and hotels travel agency',
  ],
  openGraph: {
    title: 'Sijam Consult: Your Trusted Immigration & Travel Agency in Nigeria',
    description:
      "Simplify your travel desire with Sijam Consult. We're your one-stop shop for visas, flights, hotels & more: expert travel agency + personalized immigration services. Contact us today!",
    url: 'https://sijamconsults.com',
    siteName: 'Sijam Consults Limited',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sijam Consult: Your Trusted Immigration & Travel Agency in Nigeria',
    description:
      "Simplify your travel desire with Sijam Consult. We're your one-stop shop for visas, flights, hotels & more: expert travel agency + personalized immigration services. Contact us today!",
  },
};

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsBar />
      <ServiceHighlights />
      <WhyUsPreview />
      <VisaStampGallery />
      <ProcessSteps />
      <VideoTestimonialsSection />
      <PartnerMarquee />
      <ConsultationBanner />
    </PublicLayout>
  );
}
