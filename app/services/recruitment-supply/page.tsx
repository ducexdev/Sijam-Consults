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
    title: 'International Recruitment & Labour Supply | Overseas Job Placement Nigeria',
    description:
      'Accredited international recruitment and labour supply for Nigerian professionals and skilled artisans. Work abroad Nigeria with verified employer contracts in Europe, UK, Middle East, Canada & Asia. Screening, visa processing, travel arrangements, and post-arrival support. Sijam Consults Limited, Kaduna. RC: 1715416.',
    path: '/services/recruitment-supply',
  });
}

export default function RecruitmentSupplyPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'recruitment-supply');
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
