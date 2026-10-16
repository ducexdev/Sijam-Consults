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
    title: 'Football Talent Networking & International Partnerships | Intermediary & Club Trials Nigeria',
    description:
      'Licensed football intermediary and athletic mobility advisory by Sijam Consults Limited. European club trials, academy scouting showcases, and sports visa facilitation across Spain, Portugal, Turkey, Romania, Greece & Asia. Led by CEO James Samson. RC: 1715416.',
    path: '/services/football-talent',
  });
}

export default function FootballTalentPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'football-talent');
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
