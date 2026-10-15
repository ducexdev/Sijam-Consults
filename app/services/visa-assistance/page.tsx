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
    title: 'Visa Application Assistance & File Audit | Mock Consular Interview Nigeria',
    description:
      'Pre-submission visa application review, document forensic audits, and intensive mock consular interview coaching for self-applying clients in Nigeria. Prevent refusals before they happen. Sijam Consults Limited, Kaduna. RC: 1715416.',
    path: '/services/visa-assistance',
  });
}

export default function VisaAssistancePage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'visa-assistance');
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
