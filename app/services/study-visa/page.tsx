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
    title: 'Study Abroad & Student Visa Advisory',
    description: 'Gain admission to top accredited universities in Cyprus, Poland, Greece, Canada, and the UK with Sijam Consults, leading student visa consultants Nigeria. Comprehensive study visa Nigeria and study abroad Nigeria advisory across our 100+ university network with scholarship and visa processing support.',
    path: '/services/study-visa',
  });
}

export default function StudyVisaPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'study-visa');
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
