/**
 * Organization + LocalBusiness JSON-LD schema.
 * Uses only verified, factual company data. No invented ratings or review counts.
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': 'https://sijamconsults.com/#organization',
        name: 'Sijam Consults Limited',
        legalName: 'Sijam Consults Limited',
        url: 'https://sijamconsults.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sijamconsults.com/sijam-logo.png',
          width: 200,
          height: 60,
        },
        description:
          'Sijam Consults Limited is a CAC-registered Nigerian immigration consultancy (RC: 1715416) offering study visa guidance, work permit advisory, tourist visa support, foreign business registration, document legalisation, and flight reservation services.',
        foundingDate: '2019',
        legalStatus: 'Incorporated company registered with the Corporate Affairs Commission (CAC) of Nigeria',
        identifier: {
          '@type': 'PropertyValue',
          name: 'CAC Registration Number',
          value: 'RC: 1715416',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kaduna',
          addressRegion: 'Kaduna State',
          addressCountry: 'NG',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+234-903-000-8218',
            contactType: 'customer service',
            areaServed: 'NG',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+234-708-000-7621',
            contactType: 'customer service',
            areaServed: 'NG',
            availableLanguage: ['English'],
          },
        ],
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sijamconsults.com/#website',
        url: 'https://sijamconsults.com',
        name: 'Sijam Consults Limited',
        publisher: { '@id': 'https://sijamconsults.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://sijamconsults.com/blog?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
