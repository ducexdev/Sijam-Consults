import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Building2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  PhoneCall,
  Scale,
  Layers,
  Users,
  Shield,
  Calendar,
  Clock,
  Landmark,
  FileText,
  Lock,
  ExternalLink,
  Globe2,
  Coins,
  CreditCard,
  Briefcase,
  ChevronRight,
  BadgeCheck,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { BusinessSetupCalculator } from '@/components/services/BusinessSetupCalculator';
import { SERVICES_DATA } from '@/lib/data/services';
import { ROUTES, COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'Foreign Company Registration & Setup | Sijam Consults',
  description:
    'Establish your European enterprise or register a Nigerian company with ease. Turnkey Poland Sp. z o.o. incorporation and commercial business visa advisory.',
  keywords: [
    'foreign business registration services',
    'european company registration for nigerians',
    'poland sp z oo incorporation assistance',
    'schengen business visa guidance',
    'cac company registration in nigeria',
    'krs company formation poland',
    'register company in poland from nigeria',
    'corporate bank account europe for nigerians',
    'Sijam Consults Limited',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/services/business-registration',
  },
  openGraph: {
    title: 'Foreign Company Registration & Setup | Sijam Consults',
    description:
      'Establish your European enterprise or register a Nigerian company with ease. Turnkey Poland Sp. z o.o. incorporation and commercial business visa advisory.',
    url: 'https://sijamconsults.com/services/business-registration',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foreign Company Registration & Setup | Sijam Consults',
    description:
      'Establish your European enterprise or register a Nigerian company with ease. Turnkey Poland Sp. z o.o. incorporation and commercial business visa advisory.',
  },
};

const BUSINESS_SETUP_FAQS: AccordionItem[] = [
  {
    id: 'biz-faq-1',
    question: 'Does incorporating a Polish Sp. z o.o. automatically grant me European residency or a visa?',
    answer:
      'No, and understanding this boundary is critical. Company incorporation is a commercial legal event that grants your business separate legal personality, a KRS court register number, tax IDs (NIP/REGON), and European banking access. It does not automatically grant immigration rights. However, once your company is incorporated and operating with legitimate economic activity, company directors and major shareholders can apply for a National D-Type commercial visa and subsequently a Temporary Residence Permit (Karta Pobytu) through the provincial Voivodeship office.',
  },
  {
    id: 'biz-faq-2',
    question: 'Can a Nigerian citizen 100% own a company in Poland without a local European partner?',
    answer:
      'Yes. Polish corporate law permits non-EU foreign nationals to hold 100% equity as sole shareholder and serve as sole president of the management board (Zarząd). There is no statutory requirement to have a Polish or EU citizen as a co-director or shareholder for an Sp. z o.o. (Limited Liability Company).',
  },
  {
    id: 'biz-faq-3',
    question: 'What is the minimum share capital required to incorporate a Polish Sp. z o.o.?',
    answer:
      'The statutory minimum share capital is PLN 5,000 (approximately ₦1.8M depending on currency exchange rates). This capital can be contributed by shareholders and deposited into the company corporate bank account post-incorporation. It is not an unrecoverable fee; it remains working operational capital for your enterprise.',
  },
  {
    id: 'biz-faq-4',
    question: 'How do I obtain a Polish electronic signature (PESEL / Profil Zaufany) from Nigeria?',
    answer:
      'To utilize the S24 electronic court filing system, foreign directors need a Polish national identification number (PESEL) and a Trusted Profile (Profil Zaufany). Sijam Consults assists clients in applying for a legal PESEL through the statutory legal basis of corporate tax representation, or alternatively arranges a notarized and Apostilled Power of Attorney (PoA) so our Polish corporate attorneys can incorporate the entity on your behalf through a notarial deed.',
  },
  {
    id: 'biz-faq-5',
    question: 'How do we open a European corporate bank account without traveling abroad?',
    answer:
      'Once the company is officially gazetted in the National Court Register (KRS) and issued its NIP tax ID, we assist in establishing multi-currency corporate banking rails (supporting EUR, USD, GBP, and PLN). While physical high-street banks in Warsaw frequently require in-person director identification, we coordinate video-verified European electronic money institutions (EMIs) and corporate banking platforms that issue full SEPA and SWIFT IBANs remotely.',
  },
  {
    id: 'biz-faq-6',
    question: 'What are the requirements for foreign investors setting up a Nigerian entity under CAMA 2020?',
    answer:
      'Foreign investors establishing a company in Nigeria must register with the Corporate Affairs Commission (CAC) with a statutory minimum share capital of ₦100,000,000 for foreign equity participation. Post-incorporation, the business must register with the Nigerian Investment Promotion Commission (NIPC), secure a Business Permit and Expatriate Quotas from the Federal Ministry of Interior, and obtain an Electronic Certificate of Capital Importation (eCCI) from the Central Bank of Nigeria.',
  },
  {
    id: 'biz-faq-7',
    question: 'What ongoing accounting and tax compliance is required for a Polish company?',
    answer:
      'A Polish Sp. z o.o. must maintain full double-entry commercial bookkeeping (pełna księgowość), file monthly or quarterly VAT declarations (JPK_V7), submit annual financial statements to the KRS financial repository, and register ultimate beneficial owners with the Central Register of Beneficial Owners (CRBR) within 14 days of incorporation. We partner directly with licensed Polish accounting bureaus (biuro rachunkowe) to handle your monthly compliance.',
  },
  {
    id: 'biz-faq-8',
    question: 'What is the complete timeline from signing to full operational corporate status?',
    answer:
      'Through our accelerated S24 electronic workflow, company registration and KRS number assignment typically conclude within 14 to 21 business days. Tax identification (NIP), statistical registration (REGON), and corporate banking onboarding generally take an additional 7 to 14 days, bringing total turnkey delivery to approximately 4 to 5 calendar weeks.',
  },
];

const MARKET_ENTRY_PILLARS = [
  {
    num: '01',
    title: 'Poland Sp. z o.o. Corporate Formation',
    highlight: 'KRS Court Register',
    icon: Building2,
    desc: 'Turnkey registration of your Polish limited liability company through the Ministry of Justice S24 court system or notarial deed, granting 100% foreign equity ownership.',
  },
  {
    num: '02',
    title: 'Multi-Currency European Banking Rails',
    highlight: 'EUR / USD / PLN IBAN',
    icon: CreditCard,
    desc: 'Assistance setting up institutional European corporate bank accounts with dedicated IBANs, enabling global invoicing, SEPA transfers, and international payment gateway integration.',
  },
  {
    num: '03',
    title: 'Corporate Tax (NIP) & VAT-EU Activation',
    highlight: 'Intra-Bloc Trading',
    icon: Landmark,
    desc: 'Registration with the Polish Tax Office (Urząd Skarbowy) for corporate income tax (CIT), local NIP, and cross-border VAT-EU status for zero-rated trade across the 27 EU member states.',
  },
  {
    num: '04',
    title: 'Commercial D-Visa & Director Residency',
    highlight: 'Karta Pobytu Strategy',
    icon: Briefcase,
    desc: 'Strategic advisory preparing your corporate resolution, economic business plan, and tax filings to qualify company directors for National D-Type visas and European residency permits.',
  },
  {
    num: '05',
    title: 'Inbound Nigeria FDI Setup (CAMA 2020)',
    highlight: 'CAC & NIPC Onboarding',
    icon: ShieldCheck,
    desc: 'Comprehensive market entry for international investors into Nigeria: ₦100M foreign equity incorporation, NIPC registration, Ministry of Interior Business Permits, and Expatriate Quotas.',
  },
  {
    num: '06',
    title: 'Virtual Office & Domiciliary Address',
    highlight: 'Warsaw / Krakow Address',
    icon: Layers,
    desc: 'Statutory corporate registered office in prime commercial districts in Warsaw or Krakow with professional mail handling, scanning, and official administrative representation.',
  },
];

const INCORPORATION_COMPARISON = [
  {
    feature: 'Corporate Entity Registry',
    sijam: 'Official KRS (National Court Register) gazetted filing with verified electronic KRS extract and Ministry of Justice certificate',
    informal: 'Unregistered paper companies or unfiled draft agreements with zero legal personality in European corporate registries',
  },
  {
    feature: 'Statutory Share Capital',
    sijam: 'Statutory PLN 5,000 capital properly accounted for and deposited into official company account under formal legal resolution',
    informal: 'Opaque lump-sum demands with no legal breakdown of statutory share capital vs agency commissions',
  },
  {
    feature: 'Corporate Banking Access',
    sijam: 'Dedicated European corporate IBANs in company name with full SEPA, SWIFT, and multi-currency business functionality',
    informal: 'Directors forced to use personal accounts or unregulated third-party wallets that trigger anti-money laundering freezes',
  },
  {
    feature: 'Residency Legal Transparency',
    sijam: 'Strict legal clarity: company formation does not equal automatic visa; we build real economic substance for lawful D-Visa lodgement',
    informal: 'False promises that buying a company guarantees immediate European citizenship or Schengen passport privileges',
  },
  {
    feature: 'Tax & Accounting Governance',
    sijam: 'Direct onboarding with licensed Polish certified accounting bureaus (Biuro Rachunkowe) for monthly VAT & annual balance sheets',
    informal: 'Zero tax compliance support, leading to immediate corporate court fines, tax audit blacklists, and KRS registry liquidation',
  },
];

const VERIFIED_BUSINESS_OUTCOMES = [
  {
    client: 'Chief Anthony & Partners',
    businessType: 'Agro-Allied Export & European Commodity Trade',
    structure: 'Poland Sp. z o.o. · Warsaw Registered Office',
    quote:
      'We needed European banking rails to export processed sesame and cashew nuts to buyers in Germany and the Netherlands. Sijam incorporated our Polish Sp. z o.o., activated our VAT-EU, and opened our corporate EUR account in 24 days. No middleman broker drama.',
    milestones: 'KRS Court Gazetted · Corporate EUR IBAN Active · Multi-Year Director D-Visa Stamped',
    flag: '🇵🇱',
  },
  {
    client: 'Kolawole D. (Tech Founder)',
    businessType: 'B2B Enterprise Software & Cloud Consulting',
    structure: 'Poland Sp. z o.o. · S24 Electronic Setup',
    quote:
      'Operating as a Nigerian tech enterprise, international enterprise clients in Scandinavia refused to pay into local domiciliary accounts. Setting up our Polish entity through Sijam gave us immediate Stripe, Wise, and European client contract compliance.',
    milestones: 'Full CRBR Registration · NIP & REGON Issued · European Contract Settlement Active',
    flag: '🇪🇺',
  },
  {
    client: 'Nordic Industrial Consortium',
    businessType: 'Inbound Renewable Infrastructure FDI',
    structure: 'Nigerian Entity · ₦100M Share Capital CAC',
    quote:
      'Entering the Nigerian energy market required navigating complex foreign investment statutes. Sijam handled our CAC incorporation under CAMA 2020, secured our NIPC certificate, and processed our Ministry of Interior Business Permit with precision.',
    milestones: 'CAC CAMA 2020 Incorporation · NIPC Clearance · CERPAC Expatriate Quotas Issued',
    flag: '🇳🇬',
  },
];

export default function BusinessRegistrationPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'business-registration');
  if (!service) notFound();

  const businessFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BUSINESS_SETUP_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <PublicLayout>
      <ServiceSchema service={service} />
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessFaqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* Background atmospheric glows */}
        <div className="fixed top-0 right-1/4 w-[700px] h-[700px] bg-[#402493]/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="fixed top-1/2 left-[-100px] w-[500px] h-[500px] bg-[#257CFF]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-[400px] h-[400px] bg-[#DC2F11]/08 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* ─────────────────────────────────────────────────────────
              SECTION 1: HERO (2-COLUMN GRID MATCHING HOMEPAGE)
          ───────────────────────────────────────────────────────── */}
          <section className="pt-8 pb-16 lg:pt-12 lg:pb-20">
            <div className="mb-6">
              <Breadcrumbs
                items={[
                  { label: 'Services', href: '/services' },
                  { label: 'Company Registration & Business Setup' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* LEFT COLUMN — Editorial Authority Copy & Actions */}
              <div className="lg:col-span-7 space-y-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                  <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                  <span>KRS Poland &amp; CAC Nigeria Corporate Formation Desk</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
                    Establish Your European Enterprise.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                      Access Global Banking Rails
                    </span>{' '}
                    With Turnkey Precision.
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    Expanding your commerce into the European Single Market requires more than an informal address.
                    We incorporate 100% foreign-owned Polish Sp. z o.o. corporations with the National Court Register (KRS),
                    activate corporate EUR banking rails, and structure legitimate founder migration pathways.
                  </p>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    For international investors entering Africa, we deliver turnkey Nigerian market entry under CAMA 2020:
                    ₦100M share capital incorporation, NIPC registration, and Ministry of Interior Business Permits.
                  </p>
                </div>

                {/* Quick metrics bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                  {[
                    { value: 'PLN 5,000', label: 'Statutory Capital Poland', color: 'text-[#4DA5EC]' },
                    { value: '14–21 Days', label: 'Turnkey Court Gazetting', color: 'text-emerald-400' },
                    { value: '100% Foreign', label: 'Direct Legal Ownership', color: 'text-[#F98864]' },
                    { value: '27 EU States', label: 'VAT-EU Single Market', color: 'text-purple-400' },
                  ].map((metric) => (
                    <div key={metric.label} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-left">
                      <div className={`text-lg sm:text-xl font-black ${metric.color}`}>{metric.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Dual CTA Buttons — matching exact homepage button styles */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      href={ROUTES.consultation}
                      className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Book business advisory</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href={ROUTES.assessment}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                      <span>Calculate setup feasibility</span>
                    </Link>
                  </div>
                </div>

                {/* Trust and regulatory compliance strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                    KRS &amp; S24 Polish Court Compliant
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    CAC RC: 1715416 Registered Entity
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Scale className="w-3.5 h-3.5 text-[#F98864]" />
                    Corporate Substance Standards
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN — Interactive Business Setup Calculator */}
              <div className="lg:col-span-5">
                <BusinessSetupCalculator />
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2: THE REAL PROBLEM IN CROSS-BORDER BUSINESS
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Corporate Risk Advisory
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  Why Most &ldquo;Offshore Setups&rdquo; Trigger Bank Freezes &amp;{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-[#F45A2A]">
                    Immigration Blacklists
                  </span>
                </h2>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Many Nigerian executives are sold a dangerous fantasy: pay an online middleman to register a
                    shell company in Europe, and automatically receive a multi-entry Schengen passport or permanent residence.
                  </p>
                  <p>
                    European tax authorities and consular fraud detection divisions actively scrutinize &ldquo;paper companies&rdquo;
                    that show zero economic substance, no commercial contracts, no VAT filings, and no physical office lease.
                    When discovered, foreign directors face corporate liquidation, banking asset freezes under European anti-money
                    laundering directives, and immediate Schengen Information System (SIS II) entry bans.
                  </p>
                  <p className="text-white font-semibold">
                    At Sijam Consults, we do not set up empty paper shells. We build legitimate, commercially active
                    corporate structures with verified tax IDs, transparent banking rails, and lawful director residence filings.
                  </p>
                </div>
              </div>

              {/* The 4 Traps in International Company Registration */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-white mb-4">
                  The Four Fatal Mistakes in Foreign Business Setup
                </h3>
                {[
                  {
                    num: '01',
                    trap: 'Conflating Company Formation with Automatic Visas',
                    impact:
                      'Buying a company registration and assuming it grants an automatic visa. Corporate ownership is distinct from immigration rights; a company must show economic substance to sponsor a Director D-Visa.',
                    color: 'border-l-rose-500',
                  },
                  {
                    num: '02',
                    trap: 'Unregistered Nominee Directors & Shell Addresses',
                    impact:
                      'Using anonymous nominee services that fail European Ultimate Beneficial Owner (CRBR) transparency audits, leading to immediate bank account closure and criminal inquiries.',
                    color: 'border-l-[#F45A2A]',
                  },
                  {
                    num: '03',
                    trap: 'Ignoring Polish VAT & Accounting Compliance',
                    impact:
                      'Failing to submit monthly JPK_V7 VAT returns or annual financial statements to the KRS court, triggering automatic administrative penalties and revocation of your tax ID (NIP).',
                    color: 'border-l-amber-500',
                  },
                  {
                    num: '04',
                    trap: 'Inadequate Share Capital Structuring for Nigerian FDI',
                    impact:
                      'Attempting to register foreign-owned Nigerian enterprises with less than the statutory ₦100M authorized share capital, causing immediate rejection by the CAC and Ministry of Interior.',
                    color: 'border-l-purple-500',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={`pl-4 py-4 pr-4 rounded-r-xl bg-white/[0.03] border-l-2 ${item.color} border border-white/[0.06] border-l-0 space-y-1`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500">{item.num}</span>
                      <h4 className="text-sm font-bold text-white">{item.trap}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5">{item.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3: INFORMATION GAIN — THE POLAND SP. Z O.O. BLUEPRINT
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#4DA5EC]/10 px-3 py-1 rounded-full border border-[#4DA5EC]/25 mb-3">
                <FileCheck2 className="w-3.5 h-3.5" />
                Information Gain · Statutory European Architecture
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The Poland Sp. z o.o. Complete Setup Protocol
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                Why Poland? Poland is the sixth-largest economy in the European Union, offering 9% corporate income tax (CIT)
                for small businesses, unrestricted access to the 450M-consumer Single Market, and legal 100% foreign ownership.
                Here is our step-by-step statutory execution path.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  step: 'Stage 01',
                  title: 'PESEL & Electronic Signatures',
                  desc: 'Acquisition of your official Polish identity number (PESEL) and Trusted Profile (Profil Zaufany), or execution of a sworn notarial Power of Attorney in Nigeria.',
                  icon: Lock,
                  color: 'text-[#4DA5EC]',
                },
                {
                  step: 'Stage 02',
                  title: 'Articles of Association & PKD Codes',
                  desc: 'Drafting bilingual corporate charters selecting specific Polish Classification of Activities (PKD) codes aligned with your international import, export, or tech operations.',
                  icon: FileText,
                  color: 'text-purple-400',
                },
                {
                  step: 'Stage 03',
                  title: 'KRS Court Gazetting & CRBR Filing',
                  desc: 'Electronic lodgement through the Ministry of Justice S24 portal, official court registration (KRS), and declaration on the Central Register of Beneficial Owners.',
                  icon: Landmark,
                  color: 'text-emerald-400',
                },
                {
                  step: 'Stage 04',
                  title: 'NIP, VAT-EU & Corporate Banking',
                  desc: 'Issuance of corporate tax ID (NIP), statistical number (REGON), intra-bloc VAT-EU certificate, and activation of multi-currency EUR/PLN business banking rails.',
                  icon: CreditCard,
                  color: 'text-[#F98864]',
                },
              ].map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.step}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          {stage.step}
                        </span>
                        <Icon className={`w-4 h-4 ${stage.color}`} />
                      </div>
                      <h3 className="font-heading font-bold text-base text-white">{stage.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 4: CORE SERVICE DELIVERABLES
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F98864] bg-[#F98864]/10 px-3 py-1 rounded-full border border-[#F98864]/25">
                <Sparkles className="w-3.5 h-3.5" />
                Our Institutional Deliverables
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Six Turnkey Pillars of Cross-Border Setup
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                From initial legal charter drafting to multi-currency banking and commercial visa compliance, our corporate
                desk manages the full market entry lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MARKET_ENTRY_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="p-7 sm:p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#402493] to-[#2D186B] group-hover:from-[#257CFF] group-hover:to-[#4DA5EC] text-white flex items-center justify-center font-heading font-black text-base shadow transition-colors">
                          {pillar.num}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-2.5 py-1 rounded-full border border-[#257CFF]/20">
                          {pillar.highlight}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#4DA5EC] transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 5: FORENSIC MATRIX: SIJAM VS INFORMAL AGENTS
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40">
                <Scale className="w-3.5 h-3.5" />
                Due Diligence Comparison
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Sijam Corporate Setup vs Informal Middlemen
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                Before wiring capital or trusting sensitive passport records to any service provider, compare their legal
                infrastructure against Sijam.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="p-4 sm:p-5 font-heading font-bold text-slate-300 uppercase tracking-wider text-[11px] w-1/4">
                      Evaluation Dimension
                    </th>
                    <th className="p-4 sm:p-5 font-heading font-bold text-[#4DA5EC] uppercase tracking-wider text-[11px] w-5/12 bg-[#257CFF]/10 border-x border-white/10">
                      Sijam Consults Limited
                    </th>
                    <th className="p-4 sm:p-5 font-heading font-bold text-slate-400 uppercase tracking-wider text-[11px] w-1/3">
                      Informal Online Middlemen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {INCORPORATION_COMPARISON.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                      <td className="p-4 sm:p-5 bg-[#257CFF]/05 border-x border-white/10 text-slate-200">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{row.sijam}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{row.informal}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-8">
              <Link
                href={ROUTES.consultation}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book business advisory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 6: VERIFIED CASE STUDIES & REAL COMMERCIAL OUTCOMES
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Documented Client Milestones
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Proven Commercial Cross-Border Expansions
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                Review verified corporate establishments across European trade corridors and inbound African FDI setups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VERIFIED_BUSINESS_OUTCOMES.map((item) => (
                <div
                  key={item.client}
                  className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#4DA5EC]/30 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{item.flag}</span>
                        <div>
                          <div className="font-bold text-sm text-white">{item.client}</div>
                          <div className="text-[11px] text-slate-400">{item.businessType}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#257CFF]/10 border border-[#257CFF]/20 text-xs font-semibold text-[#4DA5EC]">
                      {item.structure}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item.milestones}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <Link
                href={ROUTES.reviews}
                className="inline-flex items-center gap-2 text-sm text-[#4DA5EC] hover:text-white font-semibold transition-colors"
              >
                <span>Read all client case outcomes</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 7: WE MAY NOT BE RIGHT FOR YOU IF...
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-700/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <h3 className="font-heading font-bold text-lg text-rose-300">
                      We may not be right for you if…
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'You expect corporate registration alone to magically give you a European passport.',
                      'You want to set up an empty paper shell company with zero commercial operations.',
                      'You are unwilling to deposit the statutory PLN 5,000 share capital in Poland.',
                      'You plan to ignore monthly VAT-EU returns and statutory financial bookkeeping.',
                      'You are looking for offshore secrecy rather than legitimate, transparent international banking.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-rose-200 leading-relaxed">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-700/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-heading font-bold text-lg text-emerald-300">
                      You will get immense value if…
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'You are an African exporter, tech founder, or executive expanding into the EU Single Market.',
                      'You need genuine multi-currency corporate IBANs (EUR, USD, PLN) for global trade settlements.',
                      'You want an accredited Polish Sp. z o.o. entity that can legally sponsor Director National D-Visas.',
                      'You are an international investor seeking full compliance under Nigeria CAMA 2020 and NIPC rules.',
                      'You value transparent contracts, corporate legal accountability, and physical office presence.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-emerald-200 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 8: FAQ ACCORDION (WITH SCHEMA DATA)
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#4DA5EC]/10 px-3 py-1 rounded-full border border-[#4DA5EC]/25">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Statutory Business Setup Questions
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                  Clear Answers on European &amp; Nigerian Entity Setup
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Transparent guidance on KRS registration, minimum capital, corporate banking, and residency parameters.
                </p>
              </div>

              <Accordion items={BUSINESS_SETUP_FAQS} variant="dark" allowMultiple={false} />
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 9: SOFT CLOSING CTA & CORPORATE INVITATION
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-br from-[#120C33] via-[#0E0926] to-[#070415] border border-white/15 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#402493]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/25">
                  <Sparkles className="w-3.5 h-3.5" />
                  Confidential Corporate Advisory
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  Ready to Launch Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                    European or African Enterprise?
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Schedule a private executive strategy session. Our corporate compliance attorneys will evaluate your
                  ownership model, draft your PKD business activities, and outline your turnkey incorporation roadmap.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href={ROUTES.consultation}
                    className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <span>Book business advisory</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.number}?text=${encodeURIComponent(
                      'Hello Sijam Consults, I am an executive seeking corporate establishment advisory for a Polish Sp. z o.o. or Nigerian entity.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-500 pt-1">
                  Sijam Consults Limited · CAC RC: 1715416 · Suite A10, 2nd Floor, 2/4 Kachia Road, Kaduna
                  {' '}· Corporate setup &amp; international commercial advisory desk.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 10: TRUST BANNER & STATUTORY DISCLAIMER
          ───────────────────────────────────────────────────────── */}
          <section className="py-10 border-t border-white/[0.06]">
            <div className="max-w-4xl mx-auto">
              <TrustBanner showFullDisclaimer={false} />
            </div>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}
