import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ServiceDetailPage } from '@/components/services/ServiceDetailPage';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { SERVICES_DATA } from '@/lib/data/services';
import { generatePageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Tourist & Visitor Visa Processing Advisory',
    description:
      'Expert tourist and visitor visa processing for the UK, US, Schengen Area, Canada, and Dubai with tailored travel itineraries, hotel booking vouchers, and consular interview coaching. Sijam Consults Limited, Kaduna Nigeria. RC: 1715416.',
    path: '/services/tourist-visa',
  });
}

export default function TouristVisaPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'tourist-visa');
  if (!service) notFound();

  return (
    <PublicLayout>
      <ServiceSchema service={service} />
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <ServiceDetailPage service={service} />
    </PublicLayout>
  );
}
