export const COMPANY = {
  name: 'Sijam Consults Limited',
  legalName: 'Sijam Consults Limited',
  cacNumber: 'RC: 1715416',
  tagline: 'Bridging You to Global Opportunities with Integrity and Institutional Precision',
  address: {
    suite: 'Suite A10, 2nd Floor',
    building: '2/4 Kachia Road',
    city: 'Kaduna',
    state: 'Kaduna State',
    country: 'Nigeria',
    full: 'Suite A10, 2/4 Kachia Road, Kaduna, Nigeria',
  },
  phones: {
    primary: '+234 706 422 9556',
    secondary: '+234 802 856 2200',
    primaryRaw: '2347064229556',
  },
  emails: {
    primary: 'info@sijamconsults.com',
    support: 'support@sijamconsults.com',
    admissions: 'admissions@sijamconsults.com',
  },
  whatsapp: {
    number: '2347064229556',
    defaultMessage: 'Hello Sijam Consults, I would like to schedule an immigration & visa advisory consultation.',
    link: 'https://wa.me/2347064229556?text=Hello%20Sijam%20Consults%2C%20I%20would%20like%20to%20schedule%20an%20immigration%20%26%20visa%20advisory%20consultation.',
  },
  hours: 'Monday – Friday: 9:00 AM – 5:00 PM WAT | Saturday: 10:00 AM – 2:00 PM WAT',
  disclaimers: {
    regulatory: 'Sijam Consults Limited (RC: 1715416) is a registered Nigerian educational advisory and travel facilitation consultancy. We are NOT an embassy, consulate, or governmental visa-issuing authority. The final grant or refusal of any visa, permit, or entry remains the sole statutory prerogative of respective foreign sovereign governments. We strictly prohibit and reject any falsified documentation.',
    employment: 'Sijam Consults provides visa facilitation, application documentation review, and logistical coordination for verified job opportunities. We do NOT guarantee employment, job placements, or visa grants, and we never charge illegal placement fees.',
  },
};

export const ROUTES = {
  home: '/',
  about: '/about',
  whyChooseUs: '/why-choose-us',
  services: {
    root: '/services',
    studyVisa: '/services/study-visa',
    workVisa: '/services/work-visa',
    touristVisa: '/services/tourist-visa',
    visaAssistance: '/services/visa-assistance',
    businessRegistration: '/services/business-registration',
    documentLegalization: '/services/document-legalization',
    flightReservations: '/services/flight-reservations',
    citizenshipAssistance: '/services/citizenship-assistance',
    permanentResidency: '/services/permanent-residency',
    recruitmentSupply: '/services/recruitment-supply',
    footballTalent: '/services/football-talent',
  },
  consultation: '/consultation',
  assessment: '/assessment',
  contact: '/contact',
  reviews: '/reviews',
  testimonials: '/testimonials',
  partners: '/partners',
  guides: {
    root: '/guides',
    detail: (slug: string) => `/guides/${slug}`,
  },
  blog: {
    root: '/blog',
    detail: (slug: string) => `/blog/${slug}`,
  },
  jobs: {
    root: '/jobs',
    detail: (slug: string) => `/jobs/${slug}`,
    apply: (slug: string) => `/jobs/${slug}/apply`,
  },
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
  admin: '/admin',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: ROUTES.home },
  {
    label: 'Services',
    href: ROUTES.services.root,
    children: [
      {
        title: 'Study Abroad & Admissions',
        href: ROUTES.services.studyVisa,
        desc: 'Admissions and study visas for Cyprus, Poland, Greece, Canada & UK.',
        badge: 'Popular',
      },
      {
        title: 'Work Permits & Employment Placement',
        href: ROUTES.services.workVisa,
        desc: 'Legal work authorization and employer sponsorship guidance.',
        badge: 'Verified',
      },
      {
        title: 'Tourist & Visitor Visas',
        href: ROUTES.services.touristVisa,
        desc: 'UK, US, Schengen & Canada leisure and business visit filings.',
      },
      {
        title: 'File Audit & Mock Interviews',
        href: ROUTES.services.visaAssistance,
        desc: 'Rigorous pre-submission refusal prevention and interview coaching.',
      },
      {
        title: 'Company Registration & Business Visa',
        href: ROUTES.services.businessRegistration,
        desc: 'Foreign business registration in Europe & Schengen business visa.',
        badge: 'Investor',
      },
      {
        title: 'Document Legalization & Attestation',
        href: ROUTES.services.documentLegalization,
        desc: 'MFA Abuja attestation, High Court affidavits, and Embassy stamping.',
      },
      {
        title: 'Flight Reservation & Ticketing',
        href: ROUTES.services.flightReservations,
        desc: '100% verifiable flight reservation itineraries with active PNR codes.',
      },
    ],
  },
  { label: 'Why Us', href: ROUTES.whyChooseUs },
  { label: 'Jobs', href: ROUTES.jobs.root, badge: 'New' },
  { label: 'Partners', href: ROUTES.partners },
  { label: 'About', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact },
  {
    label: 'More',
    href: '#',
    children: [
      {
        title: 'Reviews & Visa Proofs',
        href: ROUTES.reviews,
        desc: 'Verified client visa approval stamps, case studies & testimonials.',
        badge: 'Proof',
      },
      {
        title: 'Travel & Immigration Guides',
        href: ROUTES.guides.root,
        desc: 'Destination requirements, visa checklists & relocation insights.',
      },
      {
        title: '+ Post A Job',
        href: '/jobs?action=post',
        desc: 'Sijam Managing Team quota allocation and foreign vacancy publisher.',
        badge: 'Management',
      },
    ],
  },
];
