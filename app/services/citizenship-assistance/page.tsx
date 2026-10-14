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
    title: 'Citizenship Assistance | Polish, Canadian & US Citizenship by Descent Nigeria',
    description:
      'Expert citizenship by descent and marriage assistance for Nigerians seeking Polish, Canadian, American, or EU citizenship. Full documentation handling, law firm network across Canada, Poland & USA, transparent process. Sijam Consults Limited, Kaduna Nigeria. RC: 1715416.',
    path: '/services/citizenship-assistance',
  });
}

export default function CitizenshipAssistancePage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'citizenship-assistance');
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
