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
    title: 'Foreign Company Registration & Setup',
    description:
      'Establish your European enterprise or register a Nigerian company with ease. Turnkey Poland Sp. z o.o. incorporation and commercial business visa advisory.',
    path: '/services/business-registration',
  });
}

export default function BusinessRegistrationPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'business-registration');
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
