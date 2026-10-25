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
            telephone: '+234-706-422-9556',
            contactType: 'customer service',
            areaServed: ['NG', 'GB', 'PL', 'SK', 'PT', 'SA', 'AU'],
            availableLanguage: ['English', 'Hausa'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+234-802-856-2200',
            contactType: 'corporate recruitment',
            areaServed: ['NG', 'EU', 'GCC'],
            availableLanguage: ['English'],
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Sijam Consults Core Services & Manpower Solutions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'International Recruitment and Manpower Supply',
                description:
                  'Flagship international recruitment service connecting authenticated skilled, healthcare, and technical personnel across Africa, Asia, and globally directly with foreign employer quotas across the UK, Poland, Slovakia, Portugal, Cyprus, Canada, Australia, and Saudi Arabia.',
                provider: { '@id': 'https://sijamconsults.com/#organization' },
                serviceType: 'International Recruitment and Manpower Supply',
                areaServed: ['European Union', 'United Kingdom', 'Saudi Arabia', 'Australia', 'Canada', 'Nigeria', 'Africa', 'Asia'],
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
                  'Direct university admissions across accredited European, UK, and Canadian higher education institutions with tuition scholarship grants up to 50%.',
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
            name: 'Does Sijam Consults assist individuals seeking international employment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Sijam Consults Limited connects qualified professionals, artisans, healthcare personnel, and skilled workers across Africa, Asia, and globally with legitimate international career opportunities. We guide candidates through credential screening, trade testing, compliance documentation, and statutory application stages. We operate transparently and never charge illegal placement fees.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can international employers hire manpower through Sijam Consults?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Foreign employers, international staffing firms, and contractors can partner with our dedicated B2B Manpower Supply Desk to recruit pre-vetted, trade-tested workforce cohorts from Africa, Asia, and international corridors across construction, engineering, hospitality, healthcare, agriculture, and logistics under structured corporate agreements and verified labor quotas.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Sijam Consults verify foreign job offers or recruitment corridors?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every recruitment pathway undergoes rigorous due diligence before any applicant is introduced. We confirm corporate registry records, verify official quotas issued by destination labor ministries (such as Polish Voivodeship permits, Slovakian Single Permits, UK Home Office CoS, or Saudi Qiwa quotas), and authenticate genuine direct employment contracts.',
            },
          },
          {
            '@type': 'Question',
            name: 'What documents are typically required for work permit processing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Requirements vary by destination country and occupation, but standard files include: a valid international passport (minimum 6–12 months validity), standardized CV/resume, police character certificate legalised by the Ministry of Foreign Affairs (MFA Abuja), certified medical fitness report, verified educational/trade credentials, and authenticated work experience records.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does your study abroad advisory work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We provide student-first educational placement connecting applicants directly to accredited universities in Northern Cyprus, Poland, Spain, the United Kingdom, and Canada. We manage admissions paperwork, assist with institutional tuition fee grants (up to 50%), guide proof of funds structuring, and provide comprehensive student visa interview preparation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Sijam Consults guarantee visa approval?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. In compliance with international standards and Nigerian law, Sijam Consults does not and cannot guarantee visa approvals. Sovereign consular and immigration authorities retain sole discretion over visa issuance. Our role is strictly professional advisory: eliminating administrative omissions, ensuring legitimate documentation, and maximizing your compliance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I visit your Kaduna office for an in-person consultation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Our corporate headquarters is located at Suite A10, 2/4 Kachia Road, Kaduna, Nigeria (CAC Registered RC: 1715416). Physical consultations, document verifications, and intake appointments are conducted Monday to Friday, 9:00 AM – 5:00 PM. You can schedule an appointment online or contact our desk directly.',
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
