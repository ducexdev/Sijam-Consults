import type { JobListing } from '../types';
import type { JobRecord, JobStatus } from '../types/database';
import { COUNTRIES_DATA } from './countries';

export const JOBS_DATA: JobListing[] = [
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
  }
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
