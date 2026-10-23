import type { JobListing } from '../types';
import type { JobRecord, JobStatus } from '../types/database';
import { COUNTRIES_DATA } from './countries';

export const JOBS_DATA: JobListing[] = [
  {
    id: 'job-1',
    slug: 'registered-general-nurse-poland-healthcare',
    title: 'Registered General Nurse (Hospital Placement)',
    companyName: 'EuroMed Care Sp. z o.o.',
    isEmployerVerified: true,
    location: 'Krakow, Poland',
    country: 'Poland',
    flag: '🇵🇱',
    category: 'Healthcare & Nursing',
    employmentType: 'Full-time',
    salaryRange: '€2,400 – €3,200 / month (gross)',
    postedDate: '2026-09-15',
    deadline: '2026-12-30',
    status: 'Open',
    experienceLevel: 'Professional Licensure (RN/BNSc)',
    vacanciesCount: 15,
    featured: true,
    ageRequirement: '21 – 45 years',
    perks: ['Voivodeship Permit Sponsored', 'Paid Polish Language Immersion', 'Subsidized Hospital Housing', 'EU Residency Pathway'],
    description: 'EuroMed Care, an accredited regional healthcare network in southern Poland, is recruiting certified international Registered General Nurses for acute inpatient wards. Successful candidates undergo paid Polish language onboarding and supervised clinical orientation.',
    responsibilities: [
      'Deliver patient-centered nursing care in accordance with European clinical standards.',
      'Administer prescribed medications, monitor vital signs, and maintain electronic clinical records.',
      'Participate in hospital interdisciplinary team rounds and patient rehabilitation planning.',
      'Engage in intensive professional Polish language adaptation courses sponsored by the employer.',
    ],
    eligibilityRequirements: [
      'Bachelor of Nursing Science (BNSc) or Registered Nurse (RN) diploma with current NMCN license.',
      'Minimum of 2 years post-qualification clinical experience in a hospital environment.',
      'Clean criminal record and verifiable professional references.',
      'Willingness to commit to language immersion and medical licensure adaptation in Poland.',
    ],
    visaSupportDetails: 'The employer issues a formal Voivodeship labor permit authorization and provides subsidized initial accommodation. Sijam Consults provides independent document attestation, file audit, and Polish consular visa advisory.',
    applicationInstructions: 'Submit your CV, NMCN license copy, and degree certificate. Shortlisted applicants will be invited for an initial English interview with hospital human resources.',
    disclaimer: 'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate file preparation and consular filing protocols. We are not an employer and do not guarantee hiring or visa issuance. Hiring decisions are made strictly by EuroMed Care.',
  },
  {
    id: 'job-general-worker-poland',
    slug: 'multi-skilled-general-worker-poland-construction-agriculture',
    title: 'Multi-Skilled General Worker (Construction, Agriculture, Plumbing & Electrical Support)',
    companyName: 'PolBuild Agrotechnika Sp. z o.o.',
    isEmployerVerified: true,
    location: 'Poznań & Wrocław, Poland',
    country: 'Poland',
    flag: '🇵🇱',
    category: 'Others (General Worker)',
    employmentType: 'Full-time',
    salaryRange: '€1,850 – €2,600 / month (gross)',
    postedDate: '2026-10-18',
    deadline: '2026-12-31',
    status: 'Open',
    experienceLevel: 'Basic Trade Experience (1-2 Years)',
    vacanciesCount: 25,
    featured: true,
    ageRequirement: '21 – 45 years',
    generalWorkerSectors: [
      'Basic Electrical Wiring Support',
      'Basic Plumbing & Pipe Fitting',
      'Construction Site Labor & Masonry',
      'Agriculture & Greenhouse Maintenance',
      'Warehouse Stacking & Material Loading',
    ],
    perks: [
      'Voivodeship Permit Sponsored',
      'Furnished Company Housing Included',
      'Safety Gear & Tooling Provided',
      'Paid Language Immersion Course',
      'EU Schengen Travel Mobility',
    ],
    description: 'PolBuild Agrotechnika is recruiting versatile, multi-skilled general workers for industrial facilities, agricultural greenhouses, and residential construction sites across western Poland. Candidates must be adaptable and possess basic practical experience in hands-on trade duties including electrical wiring assistance, plumbing fittings, construction labor, and farm operations.',
    responsibilities: [
      'Perform general construction support including material movement, concrete assistance, and site preparation.',
      'Assist certified technicians with basic electrical cable pulling, socket fittings, and conduit laying.',
      'Support piping and plumbing installations, solvent welding, and sanitary fixtures setup.',
      'Engage in seasonal agricultural greenhouse maintenance, harvesting, and packaging.',
      'Operate manual pallet jacks and maintain strict workshop safety and cleanliness.',
    ],
    eligibilityRequirements: [
      'Candidate Age Bracket: Verified between 21 and 45 years old at time of application.',
      'Basic practical aptitude and demonstrable experience in one or more general worker sectors (electrical, plumbing, masonry, or agriculture).',
      'Physically fit and able to undertake active manual and technical support duties.',
      'Valid International Passport with at least 18 months remaining validity.',
      'Clean police character record and verifiable trade references.',
    ],
    visaSupportDetails: 'Host employer issues official Voivodeship Type A labor permit authorization with subsidized dormitory accommodation and round-trip airport reception. Sijam Consults handles complete NDPR-compliant document verification and consular advisory.',
    applicationInstructions: 'Submit your CV highlighting your practical trade skills (electrician, plumbing, masonry, farm work) and international passport bio-data page.',
    disclaimer: 'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate verification and statutory consular dossier advisory. Sovereign visa decisions remain strictly at the statutory discretion of the consular authority.',
  },
  {
    id: 'job-uk-care',
    slug: 'senior-care-assistant-uk-healthcare',
    title: 'Senior Care Assistant & Resident Support Specialist',
    companyName: 'St. Jude Healthcare Trust Ltd',
    isEmployerVerified: true,
    location: 'Birmingham & Leeds, United Kingdom',
    country: 'United Kingdom',
    flag: '🇬🇧',
    category: 'Healthcare & Nursing',
    employmentType: 'Full-time',
    salaryRange: '£23,800 – £28,500 / year + overtime',
    postedDate: '2026-10-01',
    deadline: '2026-12-15',
    status: 'Open',
    experienceLevel: 'Mid Level (2+ Years)',
    vacanciesCount: 20,
    featured: true,
    perks: ['Certificate of Sponsorship (CoS)', 'Health & Care Worker Visa', 'Relocation Allowance', 'Overtime Shifts Available'],
    description: 'Accredited residential healthcare provider across the West Midlands and Yorkshire is recruiting compassionate, experienced Senior Care Assistants. Sponsoring under the UK Health & Care Worker route with direct Home Office licensed sponsorship.',
    responsibilities: [
      'Coordinate individualized daily living care plans for elderly and neurodiverse residents.',
      'Administer controlled medications safely following UK CQC protocols.',
      'Supervise junior care staff and liaise with visiting GPs and community district nurses.',
      'Maintain computerized care documentation and infection control compliance.',
    ],
    eligibilityRequirements: [
      'Diploma, Degree, or certified training in Nursing, Public Health, Social Work, or Caregiving.',
      'Minimum of 2 years demonstrable caregiving or hospital clinical experience.',
      'IELTS UKVI Academic/General (score 5.0+) or verifiable English medium degree validation.',
      'Clear international police certificate and verifiable employment references.',
    ],
    visaSupportDetails: 'Employer provides defined Certificate of Sponsorship (CoS). Sijam Consults assists with TB screening booking, UKVI visa dossier packaging, and biometric scheduling at TLScontact Abuja/Lagos.',
    applicationInstructions: 'Submit comprehensive CV with caregiving duties detailed, educational certificates, and international passport bio-data page.',
    disclaimer: 'Sijam Consults Limited operates strictly as educational and travel documentation advisors. Visas are issued solely at the statutory discretion of UK Visas and Immigration (UKVI).',
  },
  {
    id: 'job-3',
    slug: 'certified-mig-mag-welder-slovakia',
    title: 'Certified MIG / MAG Structural Welder',
    companyName: 'Danube Heavy Fabrication s.r.o.',
    isEmployerVerified: true,
    location: 'Bratislava & Trnava, Slovakia',
    country: 'Slovakia',
    flag: '🇸🇰',
    category: 'Engineering & Construction',
    employmentType: 'Contract',
    salaryRange: '€1,800 – €2,600 / month + overtime',
    postedDate: '2026-09-10',
    deadline: '2026-11-20',
    status: 'Open',
    experienceLevel: 'Trade Certified (3+ Years)',
    vacanciesCount: 18,
    featured: true,
    perks: ['Slovak Single Work Permit', 'Furnished Company Housing Included', 'Airport Pickup & Safety Gear', 'Annual Flight Stipend'],
    description: 'Heavy industrial manufacturing plant in western Slovakia seeks certified MIG/MAG welders for structural steel beams and pressure vessel assembly. Practical trade test required.',
    responsibilities: [
      'Perform MIG and MAG welding operations on heavy structural steel components.',
      'Read and interpret technical engineering drawings and welding symbols.',
      'Maintain strict compliance with European occupational health and safety regulations.',
    ],
    eligibilityRequirements: [
      'Recognized technical trade certificate or City & Guilds / NABTEB certification in welding.',
      'At least 3 years practical experience in heavy fabrication.',
      'Ability to pass standard visual and radiographic weld inspections.',
      'Valid international passport with minimum 2 years validity.',
    ],
    visaSupportDetails: 'Employer provides Slovak Single Work Permit sponsorship, airport reception, and furnished company dormitory accommodation at nominal cost.',
    applicationInstructions: 'Submit your trade certificates, work samples/video of welding bead work, and current resume.',
    disclaimer: 'Sijam Consults provides visa documentation guidance only. No job offer or visa grant is guaranteed.',
  },
  {
    id: 'job-truck-driver',
    slug: 'heavy-commercial-truck-driver-poland',
    title: 'International HGV / Commercial Truck Driver (CE License)',
    companyName: 'TransEuro Logistics Polska Sp. z o.o.',
    isEmployerVerified: true,
    location: 'Poznań & Wrocław, Poland',
    country: 'Poland',
    flag: '🇵🇱',
    category: 'Logistics & Transport',
    employmentType: 'Full-time',
    salaryRange: '€2,200 – €3,100 / month (net)',
    postedDate: '2026-10-05',
    deadline: '2026-12-20',
    status: 'Open',
    experienceLevel: 'Class CE / Heavy Duty Driver',
    vacanciesCount: 25,
    featured: true,
    perks: ['Polish Work Permit (Type A)', 'Code 95 Certification Sponsored', 'Modern Euro-6 Trucks (Scania/Volvo)', 'Schengen Wide Transit'],
    description: 'Major Central European freight carrier operating across Germany, Poland, France, and Benelux is recruiting seasoned articulated truck drivers. Employer sponsors Code 95 professional driver qualification and full Schengen work permit.',
    responsibilities: [
      'Safely operate articulated truck-trailer combinations on domestic and international European corridors.',
      'Ensure secure cargo strapping, temperature-control monitoring for refrigerated reefers, and digital tachograph logging.',
      'Complete international CMR freight documentation and border transit records.',
    ],
    eligibilityRequirements: [
      'Valid Nigerian Commercial Driving License (Category E / Articulated) with clean record.',
      'Verifiable 3+ years experience driving heavy articulated trailers or long-distance haulage.',
      'Basic conversational English for road communication and dispatch updates.',
      'Ability to undergo medical fitness examination and psychotechnical testing.',
    ],
    visaSupportDetails: 'Sponsor files official Voivodeship labor permit with Wielkopolska provincial office. Sijam Consults prepares the consular visa folder, sworn Polish translations, and travel logistics.',
    applicationInstructions: 'Upload current driver’s license (front and back), passport data page, and reference letters from previous transport employers.',
    disclaimer: 'Recruitment is subject to passing practical driving assessment in Poland and issuance of national D-type employment visa.',
  },
  {
    id: 'job-2',
    slug: 'fullstack-software-engineer-warsaw',
    title: 'Fullstack Software Engineer (TypeScript & Next.js)',
    companyName: 'FinNova Technologies Poland',
    isEmployerVerified: true,
    location: 'Warsaw, Poland',
    country: 'Poland',
    flag: '🇵🇱',
    category: 'Information Technology',
    employmentType: 'Full-time',
    salaryRange: '€3,500 – €5,000 / month',
    postedDate: '2026-09-20',
    deadline: '2026-12-15',
    status: 'Open',
    experienceLevel: 'Mid-Senior Level (3+ Years)',
    vacanciesCount: 4,
    featured: false,
    perks: ['EU Blue Card Fast-Track', 'Relocation Package & Flights', 'Hybrid Flexibility in Warsaw', 'Private Health & Multisport'],
    description: 'FinNova is a high-growth fintech building modern banking rails across Central Europe. We seek an experienced Fullstack Engineer with proven Next.js, Node.js, and PostgreSQL expertise for our Warsaw engineering hub.',
    responsibilities: [
      'Architect and build customer-facing web applications with React 19, Next.js, and TypeScript.',
      'Design robust RESTful and GraphQL APIs integrated with secure banking microservices.',
      'Participate in agile sprint ceremonies, code reviews, and DevOps automation.',
    ],
    eligibilityRequirements: [
      '3+ years of professional software engineering experience.',
      'Deep fluency in modern TypeScript, React, Next.js, and relational databases.',
      'Strong written and spoken English communication skills.',
      'Demonstrated portfolio or GitHub contributions.',
    ],
    visaSupportDetails: 'Eligible candidates receive formal Polish Type-A work permit sponsorship and relocation allowance. Sijam Consults handles the embassy filing pack.',
    applicationInstructions: 'Apply with your portfolio link, GitHub profile, and technical resume.',
    disclaimer: 'Recruitment is conducted directly by FinNova Technologies. Visa approval remains at the sole statutory discretion of the Embassy of Poland.',
  },
  {
    id: 'job-electrical-tech',
    slug: 'industrial-electrician-automation-technician',
    title: 'Industrial Automation & Electrical Maintenance Technician',
    companyName: 'Silesia Precision Robotics Sp. z o.o.',
    isEmployerVerified: true,
    location: 'Katowice & Gliwice, Poland',
    country: 'Poland',
    flag: '🇵🇱',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    salaryRange: '€2,000 – €2,700 / month + bonuses',
    postedDate: '2026-09-28',
    deadline: '2026-11-30',
    status: 'Open',
    experienceLevel: 'Trade Certified (Electrician)',
    vacanciesCount: 10,
    featured: false,
    perks: ['Voivodeship Labor Declaration', 'Company Accommodation Provided', 'Overtime Bonus +20%', 'Permanent Contract Option'],
    description: 'Advanced automotive parts assembly facility in southern Poland requires skilled industrial electricians to diagnose, maintain, and repair automated robotic manufacturing cells and high-voltage power switchboards.',
    responsibilities: [
      'Conduct scheduled preventive electrical maintenance on CNC machinery, conveyor drives, and automated robotic arms.',
      'Troubleshoot PLC control panels (Siemens / Omron), relays, sensors, and circuit breakers.',
      'Adhere to European CE electrical safety codes and lock-out/tag-out (LOTO) protocols.',
    ],
    eligibilityRequirements: [
      'Trade diploma, OND/HND, or City & Guilds in Electrical/Electronic Engineering.',
      'Minimum 2 years industrial plant electrical maintenance experience.',
      'Familiarity with industrial schematic diagrams and wiring conventions.',
    ],
    visaSupportDetails: 'Host company coordinates Type A labor permit with Katowice labor authority. Sijam Consults provides documentation legalization and visa file prep.',
    applicationInstructions: 'Submit technical resume, diploma certificates, and verifiable employment verification letters.',
    disclaimer: 'Final hiring is determined by employer review; visa grant is governed by the Polish Ministry of Foreign Affairs.',
  },
  {
    id: 'job-4',
    slug: 'hotel-front-office-supervisor-cyprus',
    title: 'Hotel Front Office Supervisor (Resort Operations)',
    companyName: 'Mediterranean Azure Resorts',
    isEmployerVerified: true,
    location: 'Kyrenia, Cyprus',
    country: 'Cyprus',
    flag: '🇨🇾',
    category: 'Hospitality & Tourism',
    employmentType: 'Full-time',
    salaryRange: '$1,400 – $1,900 / month + meals & housing',
    postedDate: '2026-09-01',
    deadline: '2026-11-15',
    status: 'Closing Soon',
    experienceLevel: 'Hospitality Supervisor (2+ Years)',
    vacanciesCount: 6,
    featured: false,
    perks: ['Free Resort Accommodation', 'All Duty Meals Provided', 'Return Airfare Covered', 'Tax-Free Tips Sharing'],
    description: 'Luxury seaside resort is expanding its international guest relations team. Looking for a proactive front desk supervisor with hospitality background to manage check-ins and VIP guest coordination.',
    responsibilities: [
      'Oversee reception desk operations, room assignments, and VIP arrivals.',
      'Resolve guest inquiries promptly and ensure superior guest satisfaction scores.',
      'Coordinate with housekeeping and security for seamless property operations.',
    ],
    eligibilityRequirements: [
      'Degree or Higher Diploma in Hospitality Management, Tourism, or Business Administration.',
      '2+ years front office experience in a 4-star or 5-star hotel.',
      'Excellent verbal English communication skills; additional languages are a plus.',
    ],
    visaSupportDetails: 'Official work authorization permit filed by hotel group with northern Cyprus labor ministry. Return airfare provided upon completion of contract.',
    applicationInstructions: 'Submit comprehensive CV and a recent professional passport photograph.',
    disclaimer: 'Employment is subject to passing background checks and final labor permit validation by Cyprus authorities.',
  },
  {
    id: 'job-5',
    slug: 'agricultural-greenhouse-technician-portugal',
    title: 'Agricultural Greenhouse Technician (Hydroponics)',
    companyName: 'LusiAgro Cooperativa Lda',
    isEmployerVerified: true,
    location: 'Alentejo & Faro, Portugal',
    country: 'Portugal',
    flag: '🇵🇹',
    category: 'Agriculture & Processing',
    employmentType: 'Full-time',
    salaryRange: '€1,200 – €1,600 / month + housing',
    postedDate: '2026-08-25',
    deadline: '2026-12-10',
    status: 'Open',
    experienceLevel: 'Agronomy / Farm Experience (1+ Year)',
    vacanciesCount: 12,
    featured: false,
    perks: ['D1/D3 Employment Visa Quota', 'Shared Farmhouse Accommodation', 'European Social Security Registration', 'Overtime Pay'],
    description: 'Modern hydroponic horticultural enterprise in southern Portugal seeks skilled agricultural technicians to manage automated irrigation, nutrient dosing, and crop harvesting for high-value berries and vegetables.',
    responsibilities: [
      'Supervise automated drip irrigation and climate control computer systems.',
      'Monitor crop health, identify pest risks, and apply organic integrated pest control.',
      'Supervise harvest teams and quality control for European supermarket exports.',
    ],
    eligibilityRequirements: [
      'Diploma or BSc in Agronomy, Crop Production, or related Agricultural Sciences.',
      '1–3 years hands-on experience in commercial greenhouse or farm operations.',
      'Physical fitness and comfort working in varied agricultural weather conditions.',
    ],
    visaSupportDetails: 'Employer provides Portuguese employment contract with D3 / D1 work visa quota sponsorship.',
    applicationInstructions: 'Submit resume with details of agricultural machinery or greenhouse experience.',
    disclaimer: 'Job placement is contingent upon Portuguese labor authority approval. Sijam Consults strictly operates as documentation advisor.',
  },
  {
    id: 'job-bakery-prod',
    slug: 'commercial-bakery-food-production-operator',
    title: 'Commercial Food & Bakery Production Operator',
    companyName: 'PolBake Confectionery Sp. z o.o.',
    isEmployerVerified: true,
    location: 'Łódź, Poland',
    country: 'Poland',
    flag: '🇵🇱',
    category: 'Manufacturing & Production',
    employmentType: 'Full-time',
    salaryRange: '€1,400 – €1,850 / month + meal stipends',
    postedDate: '2026-10-02',
    deadline: '2026-12-05',
    status: 'Open',
    experienceLevel: 'Entry to Mid Level (Training Provided)',
    vacanciesCount: 30,
    featured: false,
    perks: ['Voivodeship Labor Permit', 'Subsidized Company Dormitory', 'Free Factory Meals on Shift', 'Year-Round Stable Employment'],
    description: 'Modern European industrial bakery producing frozen dough and pastry products for supermarket retail chains across the EU seeks reliable production line operators. Full on-the-job training and European hygiene certifications provided.',
    responsibilities: [
      'Operate automated dough mixing, dividing, and tunnel oven conveyor machinery.',
      'Conduct visual quality inspections, weigh samples, and monitor packaging seal integrity.',
      'Comply with HACCP food safety standards, sanitarian wear, and workplace hygiene protocols.',
    ],
    eligibilityRequirements: [
      'Secondary school certificate (WAEC / NECO) or vocational training.',
      'Prior manufacturing, food handling, or warehousing experience is an advantage.',
      'Good physical stamina, reliable attendance, and commitment to working shift rosters.',
    ],
    visaSupportDetails: 'Employer issues certified provincial labor permit (Zezwolenie na Pracę). Sijam Consults handles complete legal file audit and consular submission in Nigeria.',
    applicationInstructions: 'Submit CV with personal contact details and valid passport copy.',
    disclaimer: 'Notice of Statutory Independence: Visa approvals are strictly within the sovereign prerogative of the Polish consular mission.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE DESTINATION CORRIDORS (UX PSYCHOLOGY & REGIONAL CHUNKING)
// ─────────────────────────────────────────────────────────────────────────────

export interface DestinationCorridor {
  name: string;
  flag: string;
  region: string;
  currency: 'EUR' | 'GBP' | 'CAD' | 'USD' | 'SAR' | 'AED' | string;
  defaultVisa: string;
  sampleLocation: string;
  isPopular?: boolean;
}

export const DESTINATION_REGIONS = [
  'Western & Central Europe (EU/Schengen)',
  'Balkans & South-Eastern Europe',
  'Eastern Europe & Eurasia',
  'United Kingdom',
  'North America & Commonwealth',
  'Mediterranean & Middle East',
] as const;

export const JOB_DESTINATIONS: DestinationCorridor[] = [
  // ── 1. Western & Central Europe (EU / Schengen) ──
  {
    name: 'Poland',
    flag: '🇵🇱',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Voivodeship Type A Labor Permit (Wojewoda)',
    sampleLocation: 'Warsaw & Krakow, Poland',
    isPopular: true,
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Opportunity Card (Chancenkarte) / Skilled Worker',
    sampleLocation: 'Berlin & Frankfurt, Germany',
    isPopular: true,
  },
  {
    name: 'Netherlands',
    flag: '🇳🇱',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'IND Single Permit (GVVA) / Kennismigrant Scheme',
    sampleLocation: 'Amsterdam & Rotterdam, Netherlands',
  },
  {
    name: 'Belgium',
    flag: '🇧🇪',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Single Permit (Permis Unique / Gecombineerde Vergunning)',
    sampleLocation: 'Brussels & Antwerp, Belgium',
  },
  {
    name: 'France',
    flag: '🇫🇷',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Talent Passport / Autorisation de Travail (Salarié)',
    sampleLocation: 'Paris & Lyon, France',
  },
  {
    name: 'Czech Republic',
    flag: '🇨🇿',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Employee Card (Zaměstnanecká Karta)',
    sampleLocation: 'Prague & Brno, Czech Republic',
  },
  {
    name: 'Slovakia',
    flag: '🇸🇰',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Single Residence & Work Permit',
    sampleLocation: 'Bratislava & Trnava, Slovakia',
    isPopular: true,
  },
  {
    name: 'Lithuania',
    flag: '🇱🇹',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'National D Visa / Temporary Residence Permit (TRP)',
    sampleLocation: 'Vilnius & Kaunas, Lithuania',
  },
  {
    name: 'Portugal',
    flag: '🇵🇹',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'D1 / D3 Subordinate Work Contract Visa',
    sampleLocation: 'Lisbon & Porto, Portugal',
    isPopular: true,
  },
  {
    name: 'Malta',
    flag: '🇲🇹',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Identità Single Permit (Work & Residence)',
    sampleLocation: 'Valletta & Birkirkara, Malta',
  },
  {
    name: 'Ireland',
    flag: '🇮🇪',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Critical Skills / General Employment Permit',
    sampleLocation: 'Dublin & Cork, Ireland',
  },
  {
    name: 'Italy',
    flag: '🇮🇹',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Decreto Flussi Work Permit (Nulla Osta)',
    sampleLocation: 'Milan & Rome, Italy',
  },
  {
    name: 'Spain',
    flag: '🇪🇸',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Cuenta Ajena Work & Residence Authorization',
    sampleLocation: 'Madrid & Barcelona, Spain',
  },
  {
    name: 'Croatia',
    flag: '🇭🇷',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'MUP Residence & Work Permit (Dozvola za Boravak i Rad)',
    sampleLocation: 'Zagreb & Split, Croatia',
  },
  {
    name: 'Austria',
    flag: '🇦🇹',
    region: 'Western & Central Europe (EU/Schengen)',
    currency: 'EUR',
    defaultVisa: 'Red-White-Red Card (Rot-Weiß-Rot-Karte)',
    sampleLocation: 'Vienna & Graz, Austria',
  },

  // ── 2. Balkans & South-Eastern Europe ──
  {
    name: 'Romania',
    flag: '🇷🇴',
    region: 'Balkans & South-Eastern Europe',
    currency: 'EUR',
    defaultVisa: 'IGI Work Authorization (Aviz de Angajare)',
    sampleLocation: 'Bucharest & Cluj-Napoca, Romania',
    isPopular: true,
  },
  {
    name: 'Serbia',
    flag: '🇷🇸',
    region: 'Balkans & South-Eastern Europe',
    currency: 'EUR',
    defaultVisa: 'National Employment Service (NES) Work Permit',
    sampleLocation: 'Belgrade & Novi Sad, Serbia',
  },
  {
    name: 'Albania',
    flag: '🇦🇱',
    region: 'Balkans & South-Eastern Europe',
    currency: 'EUR',
    defaultVisa: 'Unique Permit for Employment & Residence (Leje Unike)',
    sampleLocation: 'Tirana & Durrës, Albania',
  },
  {
    name: 'North Macedonia',
    flag: '🇲🇰',
    region: 'Balkans & South-Eastern Europe',
    currency: 'EUR',
    defaultVisa: 'Employment Agency (AVRM) Work Permit',
    sampleLocation: 'Skopje & Bitola, North Macedonia',
  },
  {
    name: 'Kosovo',
    flag: '🇽🇰',
    region: 'Balkans & South-Eastern Europe',
    currency: 'EUR',
    defaultVisa: 'Ministry of Internal Affairs Employment Residence Permit',
    sampleLocation: 'Pristina & Prizren, Kosovo',
  },

  // ── 3. Eastern Europe & Eurasia ──
  {
    name: 'Belarus',
    flag: '🇧🇾',
    region: 'Eastern Europe & Eurasia',
    currency: 'EUR',
    defaultVisa: 'Special Work Permit for Foreign Specialists',
    sampleLocation: 'Minsk & Grodno, Belarus',
  },
  {
    name: 'Russia',
    flag: '🇷🇺',
    region: 'Eastern Europe & Eurasia',
    currency: 'EUR',
    defaultVisa: 'Labor Quota & Highly Qualified Specialist (HQS) Permit',
    sampleLocation: 'Moscow & Saint Petersburg, Russia',
  },

  // ── 4. United Kingdom ──
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'United Kingdom',
    currency: 'GBP',
    defaultVisa: 'Health & Care / Skilled Worker CoS (Home Office)',
    sampleLocation: 'London & Birmingham, United Kingdom',
    isPopular: true,
  },

  // ── 5. North America & Commonwealth ──
  {
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America & Commonwealth',
    currency: 'CAD',
    defaultVisa: 'LMIA-Approved Employer-Specific Work Permit',
    sampleLocation: 'Toronto & Calgary, Canada',
    isPopular: true,
  },

  // ── 6. Mediterranean & Middle East ──
  {
    name: 'Cyprus',
    flag: '🇨🇾',
    region: 'Mediterranean & Middle East',
    currency: 'EUR',
    defaultVisa: 'Ministry of Labor Foreign Employment Permit',
    sampleLocation: 'Limassol & Nicosia, Cyprus',
    isPopular: true,
  },
  {
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    region: 'Mediterranean & Middle East',
    currency: 'SAR',
    defaultVisa: 'Qiwa / MHRSD Consular Work Visa',
    sampleLocation: 'Riyadh & Jeddah, Saudi Arabia',
  },
  {
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Mediterranean & Middle East',
    currency: 'AED',
    defaultVisa: 'MOHRE Employment Residence Visa',
    sampleLocation: 'Dubai & Abu Dhabi, UAE',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ALL WORLD DESTINATION CORRIDORS (ALL 197+ COUNTRIES IN THE WORLD)
// ─────────────────────────────────────────────────────────────────────────────

const existingDestByName = new Map<string, DestinationCorridor>(
  JOB_DESTINATIONS.map((d) => [d.name.toLowerCase(), d])
);

export const ALL_JOB_DESTINATIONS: DestinationCorridor[] = COUNTRIES_DATA.map((c) => {
  const existing = existingDestByName.get(c.name.toLowerCase());
  if (existing) {
    return existing;
  }

  // Derive regional currency and default visa terms
  let currency: 'EUR' | 'GBP' | 'CAD' | 'USD' | 'SAR' | 'AED' | string = 'USD';
  if (c.region === 'Europe') currency = 'EUR';
  else if (c.name === 'United Kingdom') currency = 'GBP';
  else if (c.name === 'Canada') currency = 'CAD';
  else if (c.name === 'Saudi Arabia') currency = 'SAR';
  else if (c.name === 'United Arab Emirates') currency = 'AED';
  else if (c.name === 'Qatar') currency = 'QAR';
  else if (c.name === 'Kuwait') currency = 'KWD';
  else if (c.name === 'Australia') currency = 'AUD';
  else if (c.name === 'New Zealand') currency = 'NZD';

  return {
    name: c.name,
    flag: c.flag,
    region: c.region,
    currency,
    defaultVisa: `${c.name} Statutory Employment Authorization / Work Visa`,
    sampleLocation: `${c.name}`,
    isPopular: !!c.isPopular,
  };
});

export const WORLD_DESTINATION_REGIONS = [
  'Europe',
  'North America',
  'Middle East',
  'Asia',
  'Africa',
  'Americas',
  'Oceania',
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE SECTOR CATEGORIES & DOMAIN CHUNKING (UX PSYCHOLOGY)
// ─────────────────────────────────────────────────────────────────────────────

export interface SectorDefinition {
  name: string;
  icon: string;
  group: string;
  description: string;
}

export const SECTOR_GROUPS = [
  'Healthcare & Medical',
  'Technology & Digital',
  'Engineering & Heavy Industry',
  'General Labor & Multi-Skilled',
  'Logistics & Supply Chain',
  'Agriculture & Food Production',
  'Hospitality & Tourism',
  'Commerce & Financial Services',
  'Specialized Mobility & Education',
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// GENERAL WORKER SUB-SECTOR TAXONOMY
// ─────────────────────────────────────────────────────────────────────────────

export interface GeneralWorkerSubSector {
  id: string;
  name: string;
  defaultTrades: string[];
  description: string;
}

export const GENERAL_WORKER_SUB_SECTORS: GeneralWorkerSubSector[] = [
  {
    id: 'multi_trade_core',
    name: 'Multi-Trade General Worker (Basic Electrician, Plumbing, Construction & Agriculture)',
    defaultTrades: ['Electrician (Basic)', 'Plumbing (Pipe Fitting)', 'Construction Labor', 'Agriculture'],
    description: 'Versatile multi-skilled worker capable of handling basic electrical installations, plumbing repairs, construction support, and farm duties.',
  },
  {
    id: 'construction_masonry',
    name: 'Construction Site Labor & Masonry Support',
    defaultTrades: ['Construction Site Labor', 'Masonry Support', 'Material Mixing & Hauling', 'Scaffolding Helper'],
    description: 'Active site preparation, concrete mixing assistance, block carrying, and scaffolding support.',
  },
  {
    id: 'electrical_support',
    name: 'Basic Electrical & Wiring Support',
    defaultTrades: ['Electrician (Basic Wiring)', 'Conduit Laying', 'Fixture Installation', 'Cable Pulling'],
    description: 'Assisting certified electricians with cable pulling, socket installation, and light fixture assembly.',
  },
  {
    id: 'plumbing_piping',
    name: 'Basic Plumbing & Piping Assistance',
    defaultTrades: ['Plumbing (Pipe Fitting)', 'Drainage Clearing', 'Sanitary Ware Installation', 'Trenching'],
    description: 'Assisting plumbers with pipe cutting, solvent welding, fixture installation, and trenching.',
  },
  {
    id: 'agriculture_farm',
    name: 'Agriculture, Greenhouse & Farm Hand',
    defaultTrades: ['Agriculture (Crop Harvesting)', 'Greenhouse Maintenance', 'Livestock Handling', 'Irrigation Support'],
    description: 'Field cultivation, seasonal harvesting, drip irrigation monitoring, and animal feeding.',
  },
  {
    id: 'carpentry_woodwork',
    name: 'Carpentry, Formwork & Woodwork Support',
    defaultTrades: ['Carpentry & Formwork', 'Timber Cutting', 'Roof Framing Support', 'Pallet Repairs'],
    description: 'Formwork erecting, timber preparation, rough framing, and pallet repairs.',
  },
  {
    id: 'warehouse_logistics',
    name: 'Warehouse Stacking, Packaging & Loading',
    defaultTrades: ['Warehouse Packing', 'Stock Stacking', 'Loading / Offloading', 'Pallet Jack Operation'],
    description: 'Order picking, shrink wrapping, container de-stuffing, and inventory stacking.',
  },
  {
    id: 'facility_handyman',
    name: 'General Facility Maintenance & Handyman',
    defaultTrades: ['General Handyman', 'Basic Repairs', 'Groundskeeping', 'Painting Touch-ups'],
    description: 'Day-to-day property upkeep, minor door/window repairs, painting touch-ups, and filter replacements.',
  },
  {
    id: 'painting_surface',
    name: 'Painting, Plastering & Surface Preparation',
    defaultTrades: ['Wall Painting & Priming', 'Sanding & Surface Prep', 'Plastering Assistance', 'Masking'],
    description: 'Wall preparation, rolling, masking, sanding, and coating applications.',
  },
  {
    id: 'cleaning_sanitation',
    name: 'Industrial Sanitation & Facility Cleaning',
    defaultTrades: ['Industrial Cleaning', 'Waste Disposal', 'Disinfection & Sanitizing', 'Floor Scrubbing'],
    description: 'Industrial plant floor scrubbing, post-construction cleanup, and waste sorting.',
  },
  {
    id: 'welding_helper',
    name: 'Welding & Metal Fabrication Assistant',
    defaultTrades: ['Metal Grinding', 'Slag Chipping', 'Workshop Labor', 'Material Clamping'],
    description: 'Assisting structural welders with metal preparation, grinding, clamping, and workpiece movement.',
  },
  {
    id: 'custom_general',
    name: 'Custom Trade Combination (Specify exact sectors below)',
    defaultTrades: ['Electrician', 'Plumbing', 'Construction', 'Agriculture'],
    description: 'Tailored blend of trades customized for employer operational requirements.',
  },
];

export const COMPREHENSIVE_SECTORS: SectorDefinition[] = [
  // ── Healthcare & Medical ──
  {
    name: 'Healthcare & Nursing',
    icon: '🏥',
    group: 'Healthcare & Medical',
    description: 'Registered General Nurses, Senior Caregivers, Clinical Technicians & Allied Health Specialists',
  },

  // ── Technology & Digital ──
  {
    name: 'Information Technology',
    icon: '💻',
    group: 'Technology & Digital',
    description: 'Fullstack Software Engineers, Cloud/DevOps Architects, Cybersecurity & IT Infrastructure',
  },

  // ── Engineering & Heavy Industry ──
  {
    name: 'Engineering & Construction',
    icon: '🏗️',
    group: 'Engineering & Heavy Industry',
    description: 'Civil Engineers, Structural Fabricators, Project Superintendents & MEP Specialists',
  },
  {
    name: 'Skilled Trades',
    icon: '⚡',
    group: 'Engineering & Heavy Industry',
    description: 'MIG/MAG Certified Welders, Industrial Electricians, CNC Machinists & Precision Fitters',
  },
  {
    name: 'Manufacturing & Production',
    icon: '🏭',
    group: 'Engineering & Heavy Industry',
    description: 'Automated Line Operators, Food Production Crew, Assembly Technicians & Quality Assurance',
  },
  {
    name: 'Automotive & Heavy Equipment',
    icon: '🔧',
    group: 'Engineering & Heavy Industry',
    description: 'Diesel Mechanics, Earthmoving Plant Operators, Heavy Fleet Technicians & Auto Electricians',
  },
  {
    name: 'Energy, Oil & Gas',
    icon: '🛢️',
    group: 'Engineering & Heavy Industry',
    description: 'Offshore/Onshore Rig Operators, Pipeline Welders, Renewable Wind/Solar Technicians',
  },
  {
    name: 'Mining, Extraction & Metallurgy',
    icon: '⛏️',
    group: 'Engineering & Heavy Industry',
    description: 'Underground Miners, Heavy Drill Operators, Mineral Processors & Metallurgical Techs',
  },

  // ── Logistics & Supply Chain ──
  {
    name: 'Logistics & Transport',
    icon: '🚛',
    group: 'Logistics & Supply Chain',
    description: 'CE Articulated Truck Drivers (Code 95), High-Reach Forklift Operators & Distribution Dispatchers',
  },

  // ── Agriculture & Food Production ──
  {
    name: 'Agriculture & Processing',
    icon: '🌾',
    group: 'Agriculture & Food Production',
    description: 'Greenhouse Technicians, Agri-Machinery Operators, Dairy Farmers & Abattoir Specialists',
  },

  // ── Hospitality & Tourism ──
  {
    name: 'Hospitality & Tourism',
    icon: '🏨',
    group: 'Hospitality & Tourism',
    description: 'Executive Chefs, Front Office Hosts, F&B Service Supervisors & Resort Operations Crew',
  },
  {
    name: 'Security & Facility Management',
    icon: '🛡️',
    group: 'Hospitality & Tourism',
    description: 'Aviation Ground Handling, Commercial Facility Technicians & Certified Safety Officers',
  },

  // ── Commerce & Financial Services ──
  {
    name: 'Corporate & Financial Services',
    icon: '💼',
    group: 'Commerce & Financial Services',
    description: 'Corporate Accountants, FinTech Operation Analysts, Risk Auditors & Bilingual Administrators',
  },
  {
    name: 'Sales, Retail & Customer Support',
    icon: '🛍️',
    group: 'Commerce & Financial Services',
    description: 'B2B International Account Managers, Multilingual Customer Service & Retail Leaders',
  },

  // ── Specialized Mobility & Education ──
  {
    name: 'Sports Mobility & Athletics',
    icon: '⚽',
    group: 'Specialized Mobility & Education',
    description: 'Professional Football Talent, Club Trial Showcases, Academy Athletes & Certified Sports Coaches',
  },
  {
    name: 'Education & Vocational Training',
    icon: '🎓',
    group: 'Specialized Mobility & Education',
    description: 'Vocational Technical Tutors, STEM Secondary Educators & Early Childhood Specialists',
  },

  // ── General Labor & Multi-Skilled (Others) ──
  {
    name: 'Others (General Worker)',
    icon: '🧰',
    group: 'General Labor & Multi-Skilled',
    description: 'Versatile multi-skilled workforce covering basic electrical, plumbing, construction site labor, agriculture & facility upkeep',
  },
];

export { jobRecordToJobListing, jobListingToJobRecord } from './adapters';
