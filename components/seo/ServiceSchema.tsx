import type { ServiceItem } from '@/lib/types';

interface ServiceSchemaProps {
  service: ServiceItem;
}

/**
 * Service JSON-LD for immigration advisory service pages.
 * Uses schema.org/Service type. Does NOT invent pricing, ratings, or review counts.
 */
export function ServiceSchema({ service }: ServiceSchemaProps) {
  const BASE_URL = 'https://sijamconsults.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Sijam Consults Limited',
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    serviceType: 'Immigration Advisory Consultancy',
    termsOfService: `${BASE_URL}/terms`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
