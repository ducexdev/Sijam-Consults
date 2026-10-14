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
    title: 'Permanent Residency Advisory | Canada PR & Express Entry Nigeria',
    description:
      'Comprehensive permanent residency advisory for Nigerians. Canada Express Entry, Italy point-based system, and USA green card pathways. Free eligibility assessment, transparent fee structure, and full filing support. Sijam Consults Limited, Kaduna Nigeria. RC: 1715416.',
    path: '/services/permanent-residency',
  });
}

export default function PermanentResidencyPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'permanent-residency');
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
