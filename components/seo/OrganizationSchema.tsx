/**
 * Organization + LocalBusiness + ServiceCatalog + FAQPage JSON-LD schema.
 * Formatted for Google Rich Results, Passage Indexing, and Knowledge Graph validation.
 * Uses verified, factual CAC-accredited data (RC: 1715416).
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'EmploymentAgency'],
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
          'Sijam Consults Limited is a Nigerian-based consultancy company specializing in Recruitment & Manpower Solutions, International Student Recruitment & Study Abroad Services, Immigration & Work Permit Consultancy, Travel Consultancy, and International Business Consultancy.',
        foundingDate: '2019',
        legalStatus: 'Incorporated company registered with the Corporate Affairs Commission (CAC) of Nigeria',
        identifier: {
          '@type': 'PropertyValue',
          name: 'CAC Registration Number',
          value: 'RC: 1715416',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Suite A10, 2/4 Kachia Road',
          addressLocality: 'Kaduna',
          addressRegion: 'Kaduna State',
          addressCountry: 'NG',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+234-903-000-8218',
            contactType: 'customer service',
            areaServed: ['NG', 'GB', 'PL', 'SK', 'PT', 'SA', 'AU'],
            availableLanguage: ['English', 'Hausa'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+234-708-000-7621',
            contactType: 'corporate recruitment',
            areaServed: ['NG', 'EU', 'GCC'],
            availableLanguage: ['English'],
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Sijam Consults 9 Core Services & Manpower Solutions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'International Recruitment and Manpower Supply',
                description:
                  'Primary flagship service connecting authenticated African skilled and technical personnel directly with foreign employer quotas across the UK, Poland, Slovakia, Portugal, Cyprus, and Saudi Arabia (GCC).',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'International Recruitment and Manpower Supply',
                areaServed: ['European Union', 'United Kingdom', 'Saudi Arabia', 'Australia', 'Nigeria'],
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Work Permit and Employment Immigration Consultancy',
                description:
                  'Comprehensive statutory work permit processing, employer sponsorship verification, and legal visa filing support.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'Work Permit & Employment Immigration',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Study Abroad and Student Recruitment',
                description:
                  'Direct university admissions across accredited European, UK, and Canadian higher education institutions with tuition scholarship quotas.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'Study Abroad Admissions',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Visa Consultancy and Application Assistance',
                description:
                  'Full dossier review, appointment scheduling, Proof of Funds structuring, and 1-on-1 mock consular interview preparation.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'Visa Advisory & File Audit',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Travel Consultancy and Flight Booking Assistance',
                description:
                  'Corporate and individual travel planning with 100% verifiable GDS PNR airline flight reservations for visa appointments.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'Flight Reservation & Ticketing',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Business Setup and International Business Consultancy',
                description:
                  'Cross-border corporate incorporation, European company registration (Polish Sp. z o.o., UK Ltd), EU bank accounts, and Schengen business residency.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'International Corporate Incorporation',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'B2B Recruitment Partnerships and Manpower Sourcing',
                description:
                  'Turnkey candidate pre-screening, skills verification, and batch manpower mobilization for foreign employers and global recruitment agencies.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'B2B Manpower Sourcing',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Human Resources and Workforce Consultancy',
                description:
                  'Expatriate workforce advisory, statutory labor compliance, and cross-border organizational staffing.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'Human Resources Consultancy',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Football Talent Networking and International Partnerships',
                description:
                  'Connecting promising African football players and academies with verified European trial invitations, academy scouting networks, and sports visa pathways.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'Sports Talent Mobility',
              },
            },
          ],
        },
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
      {
        '@type': 'FAQPage',
        '@id': 'https://sijamconsults.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Sijam Consults’ International Recruitment and Manpower Supply service?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sijam Consults Limited is an accredited recruitment agency in Nigeria (RC: 1715416) that connects qualified skilled, semi-skilled, technical, and healthcare candidates with legitimate foreign employer quotas in the UK, Poland, Slovakia, Portugal, Cyprus, and Saudi Arabia. We handle candidate pre-screening, trade validation, statutory work permit filings, and embassy visa legalisation.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Sijam Consults protect candidates from fake job offers and visa scams?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every job quota published through Sijam Consults is backed by an authentic employer contract, valid government-approved work permit allocations (e.g. Voivodeship permits in Poland, Slovakian labor quotas, or UK Certificates of Sponsorship), and attested through diplomatic and consular channels. We charge zero illegal placement fees and operate under CAC corporate regulation.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can European or Gulf employers partner with Sijam for B2B manpower sourcing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'International corporations, recruitment agencies, and main contractors can engage our dedicated B2B Manpower Desk. Sijam Consults conducts comprehensive trade testing, background verification, medical clearances, and consular document attestation (MFA Abuja) to deploy reliable cohorts directly to project sites.',
            },
          },
          {
            '@type': 'Question',
            name: 'What countries are available for Study Abroad admissions through Sijam Consults?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We maintain verified bilateral partnerships with accredited higher education institutions across Northern Cyprus (Cyprus West University), Poland (WSEI Krakow), Spain, the United Kingdom, and Canada, offering up to 50% tuition scholarship quotas and direct admission without third-party markups.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can Nigerian entrepreneurs incorporate a company in Europe through Sijam Consults?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Our Business Setup and International Business Consultancy service facilitates remote company incorporation in Poland (Sp. z o.o.) and the UK, including KRS court registration, VAT/NIP tax identification, EU corporate banking setup, and Schengen business residency advisory.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is Football Talent Networking and International Partnerships?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Through verified sports management networks, Sijam Consults facilitates legitimate trial invitations, youth academy scouting links, and sports mobility visa advisory for ambitious African football talent looking to showcase their abilities to European clubs and certified FIFA-licensed academies.',
            },
          },
        ],
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
