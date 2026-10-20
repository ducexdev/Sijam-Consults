import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  PhoneCall,
  Scale,
  FileText,
  Users,
  Shield,
  Globe2,
  ClipboardCheck,
  Building2,
  Stethoscope,
  HardHat,
  Code2,
  ChefHat,
  MapPin,
  Clock,
  TrendingUp,
  BadgeCheck,
  Zap,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { WorkPermitCalculator } from '@/components/services/WorkPermitCalculator';
import { SERVICES_DATA } from '@/lib/data/services';
import { ROUTES, COMPANY } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Work Permit Consultancy in Nigeria | Sijam Consults',
  description:
    'Forensic advisory for European and UK work authorizations, Polish Voivodeship Type A permits, Slovakian single permits, and UK CoS assistance. Transparent, verified statutory filings from Kaduna, Nigeria.',
  keywords: [
    'work permit consultancy in nigeria',
    'work permit visa to canada from nigeria',
    'poland work permit for nigerians',
    'slovakia single permit employment',
    'uk certificate of sponsorship cos assistance',
    'voivodeship type a permit nigeria',
    'work abroad from nigeria',
    'overseas employment placement nigeria',
    'Sijam Consults work visa',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/services/work-visa',
  },
};

const WORK_VISA_FAQS: AccordionItem[] = [
  {
    question: 'Does Sijam Consults sell work visas or promise job placements?',
    answer: `Never. Sijam Consults Limited does not sell visas or guarantee employment. What we do is audit and file verified labor documentation — police clearances, credential attestations, consular forms — issued through official foreign government labor and immigration channels. Employment decisions rest entirely with the overseas employer. Our job is to ensure your documentation is forensically correct and your case is built on zero weak points.`,
  },
  {
    question: `What exactly is a Polish Voivodeship Type A work permit and how do I get one?`,
    answer: `A Type A work permit is Poland's standard authorization for non-EU workers employed directly by a registered Polish company. The process is employer-initiated: your prospective Polish employer files the permit application with the relevant Voivodeship (regional) office in Poland. Once approved, the original permit document is physically sent to you in Nigeria. You then apply for a National Type D Work Visa at the Polish Embassy in Abuja or through VFS Global, using the permit as your primary supporting document. Typical Voivodeship processing takes 6–16 weeks. We guide both you and your employer through every stage.`,
  },
  {
    question: 'What is the Slovakia Single Permit and how is it different from a standard visa?',
    answer: `The Slovakia Single Permit (Temporary Residence for the Purpose of Employment) combines your residency right and your work right into one document — you do not need a separate work visa. Your Slovak employer must first report the vacancy to the local Labour Office at least 20 working days before your application. Once a Confirmation of Vacancy is issued, you apply at the Slovak Embassy with your employment contract, police certificate, proof of accommodation, and qualification documents. The permit is typically valid for up to 2 years and is renewable. It also grants you Schengen travel rights during its validity.`,
  },
  {
    question: 'Can my family relocate with me once I hold a European work permit?',
    answer: `Most EU member states, including Poland and Slovakia, allow primary permit holders to sponsor family reunification after establishing legal residence, a verified tenancy agreement, and demonstrable income sufficient to maintain dependants without recourse to public funds. The family reunification application is a separate filing; timeline and requirements vary by country. We advise on this pathway as part of our ongoing client advisory.`,
  },
  {
    question: 'What is a UK Certificate of Sponsorship (CoS) and who issues it?',
    answer: `A Certificate of Sponsorship is a unique reference number issued by a licensed UK employer who holds Sponsor Licence approval from the Home Office. It is not a physical document — it is a digital record proving that a specific foreign national has been offered a genuine UK job at the qualifying skill level (RQF Level 3 and above) and salary threshold (currently £26,200 per year for most roles, or the going rate for the occupation — whichever is higher). Sijam Consults verifies whether your prospective UK employer holds an active Sponsor Licence, cross-checks the CoS details for accuracy, and builds your Skilled Worker visa application around it.`,
  },
  {
    question: 'How long does the entire process take from inquiry to travel?',
    answer: `It depends on the destination and document readiness. For Poland, employer-side processing (Voivodeship permit) takes 6–16 weeks, followed by 3–6 weeks of consular visa review. For Slovakia, embassy processing can take 60–90 days from a complete application. For the UK Skilled Worker route, once a valid CoS is issued the visa application decision typically takes 3–8 weeks. We always recommend starting the process as early as possible given these timelines.`,
  },
];

const PERMIT_CORRIDORS = [
  {
    country: 'Poland',
    flag: '🇵🇱',
    permit: 'Voivodeship Type A',
    color: 'from-red-500/20 to-red-900/10',
    border: 'border-red-500/30',
    accent: '#EF4444',
    highlights: [
      'Employer-initiated filing at Voivodeship office',
      'National Type D visa follows permit approval',
      'Work up to 40 hrs/week under employment contract',
      'Pathway to Karta Pobytu (Residence Card)',
    ],
    timeline: '6–16 weeks (permit) + 3–6 weeks (visa)',
    sectors: 'Healthcare, IT, Manufacturing, Agriculture, Construction',
  },
  {
    country: 'Slovakia',
    flag: '🇸🇰',
    permit: 'Single Permit',
    color: 'from-blue-500/20 to-blue-900/10',
    border: 'border-blue-500/30',
    accent: '#3B82F6',
    highlights: [
      'Combines residence + work rights in one document',
      'Labour Office vacancy confirmation required first',
      'Valid up to 2 years, renewable',
      'Includes Schengen zone travel rights',
    ],
    timeline: '60–90 days from complete application',
    sectors: 'Automotive, IT, Logistics, Hospitality, Engineering',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    permit: 'Skilled Worker Visa (CoS)',
    color: 'from-purple-500/20 to-purple-900/10',
    border: 'border-purple-500/30',
    accent: '#8B5CF6',
    highlights: [
      'Employer must hold Home Office Sponsor Licence',
      'CoS issued digitally by sponsoring employer',
      'Minimum salary: £26,200 or occupation going rate',
      'Leads to Indefinite Leave to Remain (ILR)',
    ],
    timeline: '3–8 weeks (visa decision after CoS)',
    sectors: 'Healthcare (NHS), Engineering, IT, Construction, Social Care',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    permit: 'Skilled Immigration Act',
    color: 'from-yellow-500/20 to-yellow-900/10',
    border: 'border-yellow-500/30',
    accent: '#EAB308',
    highlights: [
      'Opportunity Card for job-seekers with points',
      'Recognized foreign qualifications mandatory',
      'Federal Employment Agency (BA) approval often needed',
      'Pathway to permanent settlement (Niederlassungserlaubnis)',
    ],
    timeline: '2–6 months (qualification recognition + visa)',
    sectors: 'Healthcare, IT, Engineering, Trades, Care Workers',
  },
];

const TARGET_PROFESSIONS = [
  {
    icon: Stethoscope,
    label: 'Healthcare Professionals',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    roles: 'Nurses, Midwives, Physiotherapists, Care Assistants',
    corridors: 'UK (NHS CoS), Germany, Poland',
  },
  {
    icon: Code2,
    label: 'IT & Technology',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    roles: 'Software Engineers, System Admins, Data Analysts, DevOps',
    corridors: 'UK, Slovakia, Germany, Poland',
  },
  {
    icon: HardHat,
    label: 'Skilled Trades',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    roles: 'Electricians, Welders, Plumbers, Heavy Machinery Operators',
    corridors: 'Poland, Slovakia, Germany, UK',
  },
  {
    icon: ChefHat,
    label: 'Hospitality & Culinary',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    roles: 'Chefs, Hotel Supervisors, Kitchen Staff, Waitstaff Leads',
    corridors: 'Slovakia, Poland, Germany, Malta',
  },
  {
    icon: Building2,
    label: 'Construction & Civil Works',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    roles: 'Bricklayers, Concrete Workers, Scaffolders, Site Supervisors',
    corridors: 'Poland, Germany, Czech Republic, UK',
  },
  {
    icon: Users,
    label: 'Social Care & Support',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    roles: 'Support Workers, Care Home Staff, Child Support Workers',
    corridors: 'UK, Germany, Netherlands',
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Profile Qualification Review',
    desc: 'We assess your credentials, work history, and language proficiency against the shortage occupation lists and minimum salary thresholds for your target corridor.',
    timeline: '2–3 business days',
    icon: ClipboardCheck,
  },
  {
    step: 2,
    title: 'Employer Verification & Job Offer Audit',
    desc: 'We cross-check the foreign employer\'s registration, Sponsor Licence status (UK), and verify the authenticity of the work permit or contract documentation before you proceed.',
    timeline: '3–5 business days',
    icon: Shield,
  },
  {
    step: 3,
    title: 'Statutory Document Compilation',
    desc: 'Police clearance (MFA Abuja attested), medical examination, academic credential authentication, and host-country-specific supporting documents assembled with zero omissions.',
    timeline: '1–2 weeks',
    icon: FileText,
  },
  {
    step: 4,
    title: 'Embassy Dossier & Biometrics Scheduling',
    desc: 'Your National (Type D) visa packet is built to embassy specification. We schedule your VFS/embassy appointment and brief you thoroughly on the consular interview.',
    timeline: '1–2 weeks',
    icon: Globe2,
  },
  {
    step: 5,
    title: 'Pre-Departure Orientation',
    desc: 'Before you board, you attend our mandatory pre-departure briefing covering your labor rights, contractual obligations, arrival procedures, and emergency contacts in the host country.',
    timeline: '1 day (in-person or remote)',
    icon: BadgeCheck,
  },
];

const TRUST_STATS = [
  { value: '4+', label: 'Active EU Work Corridors', icon: Globe2 },
  { value: '0', label: 'Unverified Job Offers Processed', icon: ShieldCheck },
  { value: '100%', label: 'Employer Verification Before Filing', icon: BadgeCheck },
  { value: '10+', label: 'Years Advisory Experience', icon: TrendingUp },
];

const RED_FLAGS = [
  'Agents charging "visa fees" without official embassy receipts',
  'Job offers that arrive via WhatsApp with no verifiable employer identity',
  'Consultants promising 100% visa approval or guaranteed job placement',
  'Requests to pay abroad via unofficial channels before any permit is confirmed',
  'Employers who cannot provide a verified company KRS/registration number',
  '"Agents" who operate without a registered Nigerian business address',
];

export default function WorkVisaPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'work-visa');
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: WORK_VISA_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp.number}?text=${encodeURIComponent(
    'Hello Sijam Consults, I want to inquire about work permit advisory for Europe or the UK.',
  )}`;

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <ServiceSchema service={service} />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#070415] text-white overflow-hidden min-h-[92vh] flex flex-col justify-center">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#070415]/95 via-[#0D0826]/60 to-[#070415]/90" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#402493]/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#DC2F11]/8 rounded-full blur-[160px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#257CFF]/10 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage:
                'linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-20 pb-16 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-6">
              <Breadcrumbs
                items={[
                  { label: 'Services', href: ROUTES.services.root },
                  { label: 'Work Permits & Employment Placement', href: ROUTES.services.workVisa },
                ]}
              />

              {/* Trust badge strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[10px] font-black uppercase tracking-widest text-purple-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse" />
                  Statutory Work Permit Advisory
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <Shield className="w-3 h-3 text-[#4DA5EC]" />
                  Zero Fake Job Policy
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <BadgeCheck className="w-3 h-3 text-emerald-400" />
                  Employer-Verified Filings
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                Legal Work Authorization in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Europe & the UK
                </span>{' '}
                — Built on Verified Documentation
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Most people trying to work abroad get stuck not because they lack skills — but because they submit unverified documents to the wrong consultants. Sijam Consults audits every employer offer, every permit, and every filing before a single document leaves your hands.
              </p>

              {/* Social proof micro-copy */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-2">
                  {['bg-[#402493]', 'bg-[#DC2F11]', 'bg-[#257CFF]', 'bg-emerald-600'].map((bg, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${bg} border-2 border-[#070415] flex items-center justify-center text-[10px] font-black text-white`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  <strong className="text-white">Verified work permit filings</strong> across Poland, Slovakia, UK, Germany & Gulf corridors
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={ROUTES.consultation}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book permit consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={ROUTES.assessment}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Check my eligibility</span>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Active Corridors pill bar */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Active corridors:</span>
                {['Poland (Voivodeship Type A)', 'Slovakia (Single Permit)', 'UK (CoS)', 'Germany', 'Saudi Arabia'].map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-5 space-y-4">
              {/* Permit type cards */}
              <div className="rounded-2xl border border-white/10 bg-[#0B071E] p-5 space-y-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-[#4DA5EC]/15 flex items-center justify-center">
                    <Briefcase className="w-3.5 h-3.5 text-[#4DA5EC]" />
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-wider">Permit Corridors We Cover</span>
                </div>
                {[
                  { flag: '🇵🇱', country: 'Poland', type: 'Voivodeship Type A', color: 'text-red-400' },
                  { flag: '🇸🇰', country: 'Slovakia', type: 'Single Permit (Residence + Work)', color: 'text-blue-400' },
                  { flag: '🇬🇧', country: 'United Kingdom', type: 'Skilled Worker Visa (CoS)', color: 'text-purple-400' },
                  { flag: '🇩🇪', country: 'Germany', type: 'Skilled Immigration Act', color: 'text-yellow-400' },
                  { flag: '🇸🇦', country: 'Saudi Arabia / GCC', type: 'Labour Quota Sponsorship', color: 'text-emerald-400' },
                ].map((item) => (
                  <div key={item.country} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15] transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{item.flag}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.country}</div>
                        <div className={`text-[10px] font-medium ${item.color}`}>{item.type}</div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Shield, value: 'Zero', label: 'Unverified offers processed', color: 'text-[#4DA5EC]', bg: 'bg-[#4DA5EC]/10' },
                  { icon: Scale, value: '100%', label: 'Statutory filing compliance', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                  { icon: Clock, value: '10+', label: 'Years HR & immigration advisory', color: 'text-purple-400', bg: 'bg-purple-400/10' },
                  { icon: Globe2, value: '5+', label: 'Work permit jurisdictions', color: 'text-amber-400', bg: 'bg-amber-400/10' },
                ].map((stat) => (
                  <div key={stat.label} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-black ${stat.color}`}>{stat.value}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOOK / PROBLEM SECTION ──────────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DC2F11]/10 border border-[#DC2F11]/30 text-[11px] font-black uppercase tracking-widest text-red-300">
              <AlertTriangle className="w-3 h-3" />
              The Problem in Plain Language
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
              Most Nigerians Who Try to Work Abroad Lose Money to the Wrong People
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              You found a WhatsApp message about a &ldquo;verified&rdquo; job in Poland. Someone asked you to pay ₦500,000 upfront. Six months later, you have nothing.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              This is not rare — it is the dominant experience. The International Labour Organization estimates fraudulent recruitment costs African workers over <strong className="text-white">$1.4 billion</strong> annually. The failures are almost always documentation failures: unverified employer identities, fake work permits, and consultants who process applications without understanding the two-stage permit-then-visa structure used in Poland, Slovakia, and across the EU.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              At Sijam Consults, we address this at the source. Before any client submits a single document, we verify the employer. Every time.
            </p>
          </div>
        </div>
      </section>

      {/* ── TRUST STATS BAND ──────────────────────────────────────────────── */}
      <section className="bg-[#0B071E] py-10 border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 text-center p-4">
                <div className="w-10 h-10 rounded-xl bg-[#4DA5EC]/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[#4DA5EC]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-[11px] text-slate-400 font-medium leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ──────────────────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Which Professions Do We Assist?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              European work permit corridors prioritize specific occupation shortage lists. Here is where we have active verified pipelines:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TARGET_PROFESSIONS.map((prof) => (
              <div
                key={prof.label}
                className="p-5 rounded-2xl bg-[#0B071E] border border-white/[0.06] hover:border-white/[0.15] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${prof.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <prof.icon className={`w-5 h-5 ${prof.color}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-[#4DA5EC] transition-colors">
                      {prof.label}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug">{prof.roles}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="text-[10px] text-slate-500">{prof.corridors}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORRIDOR BREAKDOWN ──────────────────────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#257CFF]/10 border border-[#257CFF]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <Globe2 className="w-3 h-3" />
              Destination Deep-Dives
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Understand Each Country&apos;s Permit Structure
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Every European country has a different legal framework. Treating them the same is the fastest way to get refused. Here is what each major corridor actually requires:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PERMIT_CORRIDORS.map((corridor) => (
              <div
                key={corridor.country}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${corridor.color} border ${corridor.border} overflow-hidden group hover:scale-[1.01] transition-transform`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{corridor.flag}</span>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-black text-white">{corridor.country}</h3>
                      <div className="text-[11px] font-bold" style={{ color: corridor.accent }}>
                        {corridor.permit}
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-lg bg-black/30 border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {corridor.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {hl}
                    </li>
                  ))}
                </ul>
                <div className="space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                    <span><strong className="text-slate-300">Timeline:</strong> {corridor.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-slate-500 shrink-0" />
                    <span><strong className="text-slate-300">Sectors:</strong> {corridor.sectors}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE WORK PERMIT CALCULATOR & DIAGNOSTIC ──────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <WorkPermitCalculator />
        </div>
      </section>

      {/* ── OUR APPROACH / FRAMEWORK ──────────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[11px] font-black uppercase tracking-widest text-purple-200">
                <ShieldCheck className="w-3 h-3" />
                The Sijam Approach
              </span>
              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
                We Don&apos;t File Until Everything is Verified
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our philosophy is simple: a file only moves forward when it is ready. Not when the client is impatient. Not when a deadline is looming. When it is genuinely compliant.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Most refusals are preventable. They happen because someone submitted incomplete financials, a police certificate without proper MFA attestation, or an employment contract that does not match the labor authority approval. We run a forensic pre-submission audit that catches these before the embassy does.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { icon: Shield, text: 'Every foreign employer registration is cross-checked against official national databases' },
                  { icon: FileText, text: 'All police certificates undergo MFA attestation verification before filing' },
                  { icon: Scale, text: 'Salary figures are validated against host country minimum wage and occupation going rates' },
                  { icon: ClipboardCheck, text: 'Pre-departure briefing ensures you understand your contractual rights and labor protections' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0B071E] border border-white/[0.06]">
                    <div className="w-7 h-7 rounded-lg bg-[#4DA5EC]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-3.5 h-3.5 text-[#4DA5EC]" />
                    </div>
                    <span className="text-sm text-slate-300 leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Document verification visual */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-[#0B071E] p-6 space-y-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-slate-500 ml-2">Sijam File Audit Checklist</span>
                </div>
                {[
                  { item: 'Employer KRS / National Registration', status: 'verified', color: 'text-emerald-400' },
                  { item: 'Voivodeship Work Permit (Original)', status: 'verified', color: 'text-emerald-400' },
                  { item: 'Employment Contract (Salary ≥ Minimum Wage)', status: 'verified', color: 'text-emerald-400' },
                  { item: 'Police Certificate + MFA Abuja Attestation', status: 'verified', color: 'text-emerald-400' },
                  { item: 'Medical Fitness Report', status: 'verified', color: 'text-emerald-400' },
                  { item: 'Academic / Trade Credentials (Notarized)', status: 'verified', color: 'text-emerald-400' },
                  { item: 'Proof of Accommodation in Host Country', status: 'verified', color: 'text-emerald-400' },
                  { item: 'Flight Itinerary (VFS-Verifiable PNR)', status: 'verified', color: 'text-emerald-400' },
                ].map((check) => (
                  <div key={check.item} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-xs text-slate-300">{check.item}</span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${check.color}`} />
                      <span className={`text-[10px] font-bold uppercase ${check.color}`}>{check.status}</span>
                    </div>
                  </div>
                ))}
                <div className="pt-2 text-center">
                  <span className="text-[11px] text-emerald-400 font-bold">✓ File cleared for embassy submission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ──────────────────────────────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-black uppercase tracking-widest text-emerald-300">
              <Zap className="w-3 h-3" />
              Step-by-Step Process
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              From First Call to Pre-Departure Briefing
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              There are no shortcuts in legal work permit advisory. Here is exactly what the process looks like with Sijam Consults:
            </p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-[#4DA5EC]/30 via-[#257CFF]/20 to-transparent -translate-x-px" />
            <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-0">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.step}
                  className={`relative flex flex-col lg:flex-row gap-6 items-start lg:items-center p-6 rounded-2xl border border-white/[0.06] bg-[#070415] hover:border-[#4DA5EC]/30 transition-all group mb-4`}
                >
                  <div className="flex items-center gap-4 lg:w-64 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4DA5EC]/20 to-[#257CFF]/10 border border-[#4DA5EC]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <step.icon className="w-5 h-5 text-[#4DA5EC]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#4DA5EC]">Step {step.step}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.timeline}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 group-hover:text-[#4DA5EC] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INFORMATION GAIN: THE TWO-STAGE TRAP ──────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-black uppercase tracking-widest text-amber-300">
                <AlertTriangle className="w-3 h-3" />
                Information Most Consultants Won&apos;t Tell You
              </span>
              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
                The Two-Stage Trap: Why So Many Nigerians Get Scammed Abroad
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                For Poland, Slovakia, and most EU work permit systems, the process is not one step — it is two legally separate stages:
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#0B071E] border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs font-black text-blue-400">1</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Stage 1: The Employer Files in the Host Country</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Your employer applies to the Voivodeship office (Poland) or Labour Office (Slovakia) for permission to hire you. This takes 6–16 weeks. <strong className="text-white">You cannot do this step yourself.</strong> Anyone who says you can is lying.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B071E] border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xs font-black text-purple-400">2</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Stage 2: You Apply for the Visa From Nigeria</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Only after you physically receive the original work permit document from your employer can you apply for a National Type D visa at the Polish Embassy in Abuja. This is a separate process. It takes an additional 3–6 weeks.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B071E] border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <h4 className="text-sm font-bold text-white">The Scam Pattern</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fraudulent agents skip Stage 1 entirely and charge you for a &ldquo;work visa&rdquo; without a verified employer or permit. When the &ldquo;visa&rdquo; never arrives, they disappear. <strong className="text-red-300">If someone cannot show you a physical Voivodeship permit document, walk away.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Red flags */}
            <div className="space-y-5">
              <h3 className="text-base sm:text-lg lg:text-xl font-black text-white">
                Red Flags That Should End Any Conversation Immediately
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Before you commit to any work abroad arrangement, screen for these warning signs:
              </p>
              <div className="space-y-3">
                {RED_FLAGS.map((flag) => (
                  <div key={flag} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0B071E] border border-red-500/15 hover:border-red-500/30 transition-colors">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300 leading-snug">{flag}</span>
                  </div>
                ))}
              </div>

              {/* We may not be right for you */}
              <div className="p-5 rounded-2xl bg-[#0B071E] border border-amber-500/25 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">We may not be right for you if…</h4>
                </div>
                <ul className="space-y-2">
                  {[
                    'You want a guarantee that your visa will be approved (no ethical consultant can promise this)',
                    'You are unwilling to provide verifiable documentation of your professional background',
                    'You are looking for the cheapest available option rather than the most compliant one',
                    'You have already paid a fraudulent agent and expect us to &ldquo;rescue&rdquo; a compromised application without a full restart',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-slate-400">
                      <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: point }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY / SOCIAL PROOF ──────────────────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              What Transparent Advisory Actually Looks Like
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Real outcomes from real cases — without exaggeration or invented statistics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                flag: '🇵🇱',
                country: 'Poland',
                permit: 'Voivodeship Type A',
                profile: 'Electrical Engineer, Kano',
                outcome: 'Type A permit confirmed by employer. National Type D visa approved after 4-week consular review. Client arrived in Kraków within 6 months of initial inquiry.',
                stat: '6 months total',
                statLabel: 'Inquiry to arrival',
                color: 'border-red-500/30',
              },
              {
                flag: '🇸🇰',
                country: 'Slovakia',
                permit: 'Single Permit',
                profile: 'Automotive Assembly Technician, Kaduna',
                outcome: 'Slovak employer\'s vacancy confirmed by Labour Office. Full document pack submitted to Slovak Embassy Abuja. Single permit approved with 2-year validity.',
                stat: '82 days',
                statLabel: 'Application to permit approval',
                color: 'border-blue-500/30',
              },
              {
                flag: '🇬🇧',
                country: 'United Kingdom',
                permit: 'Skilled Worker (CoS)',
                profile: 'Registered Nurse, Lagos',
                outcome: 'Sponsor Licence of NHS Trust employer verified active. CoS reference cross-checked. Skilled Worker visa application submitted with zero errors. Visa approved.',
                stat: '5 weeks',
                statLabel: 'From CoS receipt to visa decision',
                color: 'border-purple-500/30',
              },
            ].map((cs) => (
              <div key={cs.country} className={`p-6 rounded-2xl bg-[#070415] border ${cs.color} space-y-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cs.flag}</span>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-wider">{cs.country}</div>
                    <div className="text-[10px] text-slate-400">{cs.permit}</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Applicant Profile</div>
                  <div className="text-xs font-semibold text-slate-300">{cs.profile}</div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{cs.outcome}</p>
                <div className="flex items-center gap-2 pt-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-sm font-black text-emerald-400">{cs.stat}</div>
                    <div className="text-[10px] text-slate-500">{cs.statLabel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={ROUTES.reviews}
              className="inline-flex items-center gap-2 text-sm text-[#4DA5EC] hover:text-white transition-colors font-semibold"
            >
              View more verified case outcomes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DOCUMENT REQUIREMENTS ──────────────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              What Documents Do You Actually Need?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Standard requirements across European work permit applications. Your specific case may vary — our compliance team will issue a tailored checklist.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Employment & Authorization',
                icon: Briefcase,
                color: 'text-[#4DA5EC]',
                bg: 'bg-[#4DA5EC]/10',
                items: [
                  'Original Work Permit (Voivodeship / Labour Office issued)',
                  'Signed Employment Contract (job title, salary, hours)',
                  'Employer KRS or national registration number',
                  'UK: Certificate of Sponsorship (CoS) reference code',
                ],
              },
              {
                title: 'Personal Identity & Clearances',
                icon: ShieldCheck,
                color: 'text-emerald-400',
                bg: 'bg-emerald-400/10',
                items: [
                  'International passport (min. 2 blank pages, 6+ months validity)',
                  'Police Character Certificate — MFA Abuja attested',
                  'Medical fitness certificate from accredited clinic',
                  'TB test result where mandated by destination embassy',
                ],
              },
              {
                title: 'Professional & Financial',
                icon: FileText,
                color: 'text-purple-400',
                bg: 'bg-purple-400/10',
                items: [
                  'Academic qualifications / trade certificates (notarized + translated)',
                  'Detailed chronological CV with verifiable references',
                  'Proof of accommodation in host country',
                  'Health / travel insurance covering initial entry period',
                ],
              },
            ].map((cat) => (
              <div key={cat.title} className="p-6 rounded-2xl bg-[#0B071E] border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}>
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">{cat.title}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-6">
            Sijam Consults will issue you a precise, destination-specific document checklist after your eligibility assessment.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <HelpCircle className="w-3 h-3" />
              Common Questions
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Straight answers — no hedging, no filler.
            </p>
          </div>
          <Accordion items={WORK_VISA_FAQS} />
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────────────────────── */}
      <section className="bg-[#070415] py-8 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B071E] border border-white/[0.06]">
            <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Legal Notice:</strong> {service.disclaimer} Sijam Consults Limited (CAC RC: 1715416) is a registered educational and travel advisory firm in Nigeria. We do not operate as a government visa authority. Employment authorizations are issued exclusively by foreign government labor departments.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-300">Start Your Work Permit Journey</span>
          </div>
          <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
            Ready to Work Legally Abroad?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Let&apos;s Start with Your Eligibility.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            No pressure, no upfront commitments. Book a consultation and we will tell you honestly whether your profile qualifies, which corridor is most realistic, and what the full process looks like — before you spend a single naira.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={ROUTES.consultation}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book free consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={ROUTES.assessment}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
              <span>Check my eligibility first</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-500">
            {COMPANY.address.city}, {COMPANY.address.state} • {COMPANY.phones.primary} • {COMPANY.emails.primary}
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
