import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Award,
  GraduationCap,
  Globe2,
  Briefcase,
  Building2,
  Plane,
  Trophy,
  Wrench,
  Stethoscope,
  Scale,
  Clock,
  PhoneCall,
  FileCheck2,
  AlertTriangle,
  XCircle,
  Shield,
  Layers,
  Sparkles,
  Users,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { ManpowerRequisitionCalculator } from '@/components/partners/ManpowerRequisitionCalculator';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { PARTNERS_DATA } from '@/lib/data/partners';
import { ROUTES, COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'International Recruitment & Manpower Supply | Sijam B2B',
  description:
    'Turnkey skilled workforce mobilization and B2B international recruitment solutions. Reliable talent supply pipelines for European and Gulf contractors.',
  keywords: [
    'international recruitment companies',
    'manpower supply company in nigeria',
    'b2b international workforce sourcing',
    'nigerian skilled manpower recruitment agency',
    'overseas talent acquisition partner',
    'turnkey workforce mobilization',
    'technical skills trade testing nigeria',
    'Sijam Consults partners',
    'CAC RC: 1715416',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/partners',
  },
  openGraph: {
    title: 'International Recruitment & Manpower Supply | Sijam B2B',
    description:
      'Turnkey skilled workforce mobilization and B2B international recruitment solutions. Reliable talent supply pipelines for European and Gulf contractors.',
    url: 'https://sijamconsults.com/partners',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Recruitment & Manpower Supply | Sijam B2B',
    description:
      'Turnkey skilled workforce mobilization and B2B international recruitment solutions. Reliable talent supply pipelines for European and Gulf contractors.',
  },
};

const B2B_MANPOWER_FAQS: AccordionItem[] = [
  {
    question: 'How does Sijam Consults verify the technical competency of skilled artisans before deployment?',
    answer:
      'We operate a dedicated practical trade-testing center in Kaduna in direct collaboration with accredited technical institutes. Welders undergo mandatory ISO 9606-1 and ASME Section IX positional radiographic testing. Electricians and mechanical plant technicians complete physical bench evaluations and diagnostic fault simulations. Overseas contractors receive certified trade-test scorecards and high-definition video documentation of each candidate testing live before contract finalization.',
  },
  {
    question: 'What is your compliance policy regarding recruitment fees and the ILO fair recruitment initiative?',
    answer:
      'Sijam Consults Limited strictly enforces the International Labour Organization (ILO) General Principles and Operational Guidelines for Fair Recruitment. We operate a zero-recruitment-fee policy for job seekers: candidates are never charged placement fees, job-access premiums, or administrative levies. All mobilization, vetting, and coordination costs are structured transparently on the employer side through formal corporate B2B contracts.',
  },
  {
    question: 'What guarantee do you provide against candidate drop-out or on-site performance failure?',
    answer:
      'Every bilateral manpower supply contract includes a formal 90-day candidate replacement service-level agreement (SLA). If a deployed operative fails to perform to verified contract specifications or resigns voluntarily within their first 90 days of worksite engagement, Sijam mobilizes a fully vetted and trade-tested replacement candidate at zero additional agency fee.',
  },
  {
    question: 'What is the standard turnaround time for mobilizing a cohort of 20 to 50 skilled workers?',
    answer:
      'Standard turnkey mobilization requires 45 to 60 calendar days from initial job requisition sign-off to worksite arrival. This timeline covers candidate sourcing, technical trade-testing, medical screening (GAMCA or EU-standard fit-to-work certs), Federal Ministry of Education and MFA Abuja document legalizations, work permit generation, and destination embassy consular stamping.',
  },
  {
    question: 'Can foreign employers and HR directors observe candidate interviews and trade testing live?',
    answer:
      'Yes. Foreign employers frequently conduct live remote video assessments over secure video feeds directly into our Kaduna testing bays. Alternatively, we host overseas technical delegations at our Kaduna facilities, coordinating airport reception, secure local transport, and dedicated test bay access for in-person trade testing.',
  },
  {
    question: 'Which international labor corridors and industries does Sijam Consults specialize in?',
    answer:
      'We mobilize skilled personnel across three primary corridors: the European Union (Poland, Slovakia, Germany for structural fabrication, welding, automotive manufacturing, and warehousing), the United Kingdom (NHS and private healthcare networks for registered nurses and senior carers), and the Gulf Cooperation Council (UAE, Saudi Arabia, Qatar for civil infrastructure, electromechanical engineering, and hospitality).',
  },
];

export default function PartnersPage() {
  const educationPartners = PARTNERS_DATA.filter((p) =>
    ['Accreditation Body', 'Academic Consultancy', 'Education & Mobility', 'Education & Migration Agency'].includes(p.category)
  );
  const recruitmentPartners = PARTNERS_DATA.filter((p) =>
    ['Foreign Job Placement', 'Manpower Services', 'Recruitment Partner'].includes(p.category)
  );
  const aviationPartners = PARTNERS_DATA.filter((p) =>
    ['Aviation & Ticketing Partner'].includes(p.category)
  );
  const sportsPartners = PARTNERS_DATA.filter((p) =>
    ['Sports & Football Academy'].includes(p.category)
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: B2B_MANPOWER_FAQS.map((faq) => ({
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
      <BreadcrumbSchema
        items={[{ label: 'Institutional Partners & B2B Manpower', href: '/partners' }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* ── CINEMATIC AMBIENT VIDEO LAYER ─────────────────────────── */}
        <div
          className="absolute top-0 left-0 right-0 h-[780px] lg:h-[860px] overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="sm:hidden absolute inset-0">
            <Image
              src="/hero/recruitment-hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35 contrast-125"
            />
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero/recruitment-hero.png"
            className="hidden sm:block w-full h-full object-cover opacity-50 contrast-115 saturate-110"
            src={VIDEOS.SIJAM_CONSULTS_PARTNERS}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#070415]/80 via-[#0D0826]/50 to-[#070415]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070415]/50 via-transparent to-[#070415]" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#402493]/20 rounded-full blur-[150px]" />
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#257CFF]/15 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-8 pb-20">
          {/* Breadcrumbs Navigation */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: 'Institutional Alliances', href: '/partners' },
                { label: 'B2B Manpower Supply' },
              ]}
            />
          </div>

          {/* ─────────────────────────────────────────────────
              SECTION 1: 2-COLUMN HERO (mirrors homepage grid)
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT COLUMN — Trust, Headline, Sub-text, CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Trust strip */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[10px] font-black uppercase tracking-widest text-purple-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse" />
                    B2B Manpower Supply · Sijam Consults
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <Shield className="w-3 h-3 text-[#4DA5EC]" />
                    CAC RC: 1715416
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <Handshake className="w-3 h-3 text-[#4DA5EC]" />
                    Turnkey Cross-Border Talent Mobility
                  </span>
                </div>

                {/* H1 — matches homepage font sizing exactly, solid white text */}
                <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                  International Recruitment &amp; B2B Manpower Supply in Nigeria: Turnkey Skilled Workforce Mobilization.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                  Scaling international infrastructure, heavy manufacturing, or healthcare operations requires a reliable, verified talent supply chain. Sijam Consults Limited delivers turnkey cross-border workforce mobilization from Nigeria for European and Gulf contractors—managing technical skills trade testing in Kaduna, background credential audits, and statutory consular legalization under strict service-level agreements.
                </p>

                {/* Social proof micro-copy */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex -space-x-2">
                    {['bg-[#402493]', 'bg-[#DC2F11]', 'bg-[#257CFF]', 'bg-[#4DA5EC]'].map((bg, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full ${bg} border-2 border-[#070415] flex items-center justify-center text-[10px] font-black text-white`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    <strong className="text-white">Over 1,400 Certified Artisans &amp; Clinicians Mobilized</strong> across Poland, Slovakia, UK, and UAE industrial corridors
                  </p>
                </div>

                {/* CTA Buttons — exactly the homepage button style with First letter capitalized */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href={ROUTES.contact}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Request Manpower Proposal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="#partners-directory"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                    <span>View Institutional Alliances</span>
                  </Link>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20we%20are%20an%20international%20contractor%20interested%20in%20skilled%20manpower%20supply.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Chat On WhatsApp</span>
                  </a>
                </div>

                {/* Active Sourcing Desks Pill Bar */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Active Supply Sectors:</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    MIG/MAG 135/136 Welders
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    Structural Steel Fabricators
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    Registered Nurses (NMC UK)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    Automotive Plant Assemblers
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN — Interactive Manpower Calculator Card */}
              <div className="lg:col-span-5">
                <ManpowerRequisitionCalculator />
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 2: THE REAL-STAKES PROBLEM EXPLANATION
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Operational Realities
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Why Cross-Border Manpower Requisitions Fail—And How We Fix It.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#DC2F11]/20 border border-[#DC2F11]/40 flex items-center justify-center text-[#DC2F11]">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  CV Padding &amp; Untested Artisans
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  International contractors frequently receive resumes from local middle-men claiming years of welding or fabrication experience. When candidates arrive on-site in Gdańsk or Bratislava, they fail basic fillet weld tests, halting factory shifts and creating costly contractual penalties.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Consular Bottlenecks in Abuja
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Securing foreign work permits is only half the battle. Without physical liaison capability at the Federal Ministry of Education and Ministry of Foreign Affairs in Abuja, candidate files linger in bureaucratic queues for months, causing labor quotas and project delivery deadlines to lapse.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#257CFF]/20 border border-[#257CFF]/40 flex items-center justify-center text-[#4DA5EC]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Regulatory &amp; Ethical Compliance
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  European labor ministries and UK modern slavery audits impose harsh legal sanctions on employers whose recruitment pipelines charge illegal fees to candidates. Sijam guarantees strict ILO fair recruitment compliance, protecting your corporate reputation from regulatory liability.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 3: INFORMATION GAIN #1 (Kaduna Trade Testing)
          ───────────────────────────────────────────────── */}
          <section className="mb-24 rounded-3xl bg-gradient-to-br from-[#402493]/20 via-white/[0.02] to-transparent border border-white/10 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-xs font-bold text-[#4DA5EC] mb-3">
                <Wrench className="w-4 h-4" />
                <span>Information Gain · Technical Competency Rigor</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The Kaduna Technical Trade-Testing Protocol: Rigorous Practical Skills Validation.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                We do not deploy candidates based on paper certificates alone. In strategic collaboration with accredited vocational institutes in Kaduna, every skilled operative undergoes hands-on technical evaluation witnessed live or recorded on high-definition video.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#257CFF]/20 border border-[#4DA5EC]/40 flex items-center justify-center text-[#4DA5EC] font-black text-sm">
                    01
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    MIG/MAG &amp; TIG Testing
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Welders complete fillet and butt joints across 1G, 2G, 3G, and 4G positions under ISO 9606-1 and ASME Section IX specifications. Test coupons undergo visual inspection, macro-etching, and radiographic non-destructive examination (NDE).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#402493]/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-sm">
                    02
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Machining &amp; Electrical Benches
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Industrial electricians and CNC operators complete schematic reading, wiring fault diagnostics, PLC simulation, and precision tolerance lathe work, demonstrating immediate operational autonomy.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black text-sm">
                    03
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Employer Remote Observation
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Overseas engineering managers observe practical trials live via multi-angle streaming. Full test data sheets, coupon photo reports, and inspector sign-offs are submitted with every candidate dossier.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 4: SERVICE DELIVERABLES (B2B MANPOWER SECTORS)
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Operational Capacities
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Workforce Sectors We Mobilize for Overseas Contractors.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Wrench,
                  title: 'Heavy Industry & Fabrication',
                  destinations: 'Poland, Slovakia, Germany',
                  roles: [
                    'MIG/MAG 135/136 Welders',
                    'Structural Steel Fabricators',
                    'Pipefitters & Industrial Mechanics',
                    'CNC Lathe & Milling Machinists',
                    'Heavy Equipment Operators',
                  ],
                },
                {
                  icon: Stethoscope,
                  title: 'Healthcare & Clinical Teams',
                  destinations: 'United Kingdom, Ireland, GCC',
                  roles: [
                    'Registered Nurses (NMC CBT/OSCE)',
                    'Senior Care Workers & HCAs',
                    'Diagnostic Radiographers',
                    'Physiotherapists & Care Coordinators',
                    'Clinical Support Personnel',
                  ],
                },
                {
                  icon: Building2,
                  title: 'Civil Construction & Infrastructure',
                  destinations: 'UAE, Saudi Arabia, Qatar',
                  roles: [
                    'Structural Rebar Fixers',
                    'Formwork & Finish Carpenters',
                    'Site Electromechanical Technicians',
                    'Scaffolding Safety Specialists',
                    'Civil Project Supervisors',
                  ],
                },
                {
                  icon: Briefcase,
                  title: 'Logistics & Automated Manufacturing',
                  destinations: 'Poland, Czech Republic, Slovakia',
                  roles: [
                    'Automotive Assembly Technicians',
                    'Counterbalance Forklift Drivers',
                    'Automated Packaging Operatives',
                    'Industrial Bakery Workers',
                    'Quality Assurance Inspectors',
                  ],
                },
              ].map((sector, i) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#402493]/20 border border-purple-500/40 flex items-center justify-center text-[#4DA5EC] mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black text-[#4DA5EC] uppercase tracking-wider">
                        {sector.destinations}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-white mt-1 mb-3">
                        {sector.title}
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {sector.roles.map((role, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <Link
                        href={ROUTES.contact}
                        className="text-xs font-bold text-[#4DA5EC] hover:text-white flex items-center gap-1.5 transition-colors group"
                      >
                        <span>Requisition Sourcing Cohort</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 5: INFORMATION GAIN #2 (SLA & Compliance Architecture)
          ───────────────────────────────────────────────── */}
          <section className="mb-24 rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Information Gain · Contractual Assurance
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Bilateral Compliance SLA &amp; 90-Day Candidate Replacement Warranty.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                We treat cross-border talent acquisition as an engineering delivery contract with defined legal liabilities, performance milestones, and employer protections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black text-sm">
                    SLA 1
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    90-Day Replacement Guarantee
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Should an operative resign voluntarily or demonstrate failure to meet documented skills specifications within 90 days of worksite integration, we mobilize an accredited replacement candidate at zero agency fee.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#257CFF]/20 border border-[#4DA5EC]/40 flex items-center justify-center text-[#4DA5EC] font-black text-sm">
                    SLA 2
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Zero Candidate Placement Fees
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In compliance with ILO Convention 181 and destination country modern slavery laws, candidates pay nothing to access jobs. This ensures higher loyalty, zero debt bondage, and rapid productivity upon arrival.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#402493]/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-sm">
                    SLA 3
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    MFA Abuja Legalization Liaison
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our dedicated Abuja liaison officers coordinate physical authentication of academic degrees, trade certificates, and police clearance records across federal ministries, guaranteeing consular readiness.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 6: 4-STAGE MOBILIZATION ROADMAP
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Turnkey Workflow
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The 4-Stage Workforce Mobilization Protocol.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 'Phase 1',
                  title: 'Requisition & Job Profiling',
                  desc: 'Execution of bilateral supply agreement, definition of technical specifications (ISO/ASME/NMC), and quota allocation approval.',
                  days: 'Days 1 – 10',
                },
                {
                  step: 'Phase 2',
                  title: 'Practical Trade-Testing & Vetting',
                  desc: 'Physical skills testing at Kaduna technical bays, NPF biometric character clearance, and GAMCA/fit-to-work medicals.',
                  days: 'Days 11 – 25',
                },
                {
                  step: 'Phase 3',
                  title: 'Bilateral Permitting & Visa Filing',
                  desc: 'FME & MFA Abuja attestation, work permit issuance by foreign labor ministry, and destination embassy consular stamping.',
                  days: 'Days 26 – 45',
                },
                {
                  step: 'Phase 4',
                  title: 'Pre-Departure Briefing & Deployment',
                  desc: 'Cultural orientation, flight ticketing via Everbright GDS desk, airport departure escort, and worksite handover.',
                  days: 'Days 46 – 60',
                },
              ].map((phase, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC]">
                        {phase.step}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">
                        {phase.days}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-white mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Contract SLA Milestone Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 7: REAL-WORLD RESULTS & CASE STUDIES
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Proven Executions
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Workforce Cohorts Mobilized with Zero Attrition.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#4DA5EC]/15 text-[#4DA5EC] text-[10px] font-black uppercase tracking-wider">
                    Poland Heavy Industry
                  </span>
                  <span className="text-xs font-bold text-emerald-400">45 Artisans</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  MIG/MAG Welders to Shipyard in Gdańsk
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Requisition:</strong> A Polish maritime fabrication contractor required 45 certified positional welders to meet a shipbuilding delivery deadline within 60 days.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Execution:</strong> We screened 120 applicants at our Kaduna test bays under ISO 9606-1 standard. 45 passed radiographic examination, secured Polish Type D work visas, and deployed to Gdańsk in 52 calendar days. Zero candidate attrition recorded at 90-day review.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-purple-500/15 text-purple-300 text-[10px] font-black uppercase tracking-wider">
                    United Kingdom Healthcare
                  </span>
                  <span className="text-xs font-bold text-emerald-400">32 Registered Nurses</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Clinical Deployment to West Midlands NHS Trust
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Requisition:</strong> A British healthcare staffing partnership required 30+ CBT-qualified Registered General Nurses with verified institutional references for NHS hospital wards.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Execution:</strong> Sijam managed primary source verification of nursing diplomas, coordinated MFA Abuja legalizations, and aligned Defined CoS allocations. 32 nurses deployed with zero compliance defaults.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    Slovakia Automotive
                  </span>
                  <span className="text-xs font-bold text-emerald-400">60 Line Operators</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Assembly Technicians to Bratislava Plant
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Requisition:</strong> A Tier-1 automotive component manufacturer in Slovakia required 60 assembly operatives with technical dexterity and factory experience.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Execution:</strong> Candidates underwent practical dexterity and assembly line speed testing in Kaduna. Slovak work permits were secured through the Bratislava labor authority, and cohort flights were chartered from Lagos with full worksite reception.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 8: INSTITUTIONAL PARTNERS DIRECTORY
          ───────────────────────────────────────────────── */}
          <section id="partners-directory" className="mb-24 scroll-mt-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Accredited Network
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Institutional Alliances &amp; International Partner Directory.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                Sijam Consults Limited maintains certified bilateral pacts with official foreign placement partners, international academic consultancies, and credential accreditors worldwide.
              </p>
            </div>

            {/* Sub-group A: Foreign Job Placement & Manpower Partners */}
            {recruitmentPartners.length > 0 && (
              <div className="space-y-6 mb-16">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#4DA5EC]" />
                    <h3 className="font-heading font-bold text-xl text-white">
                      Foreign Job Placement &amp; Manpower Partners
                    </h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#402493]/60 text-purple-200 border border-purple-500/30">
                    B2B Quota Allocation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recruitmentPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#4DA5EC]/40 transition-all backdrop-blur-xl flex flex-col justify-between shadow-xl"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="h-16 w-44 relative bg-black/60 rounded-2xl p-2.5 flex items-center justify-center overflow-hidden border border-white/15">
                            <Image
                              src={partner.logoUrl}
                              alt={partner.name}
                              fill
                              sizes="176px"
                              className="object-contain p-1"
                            />
                          </div>
                          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#402493]/60 text-purple-200 border border-purple-500/30">
                            {partner.country}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
                            {partner.category}
                          </span>
                          <h4 className="font-heading font-bold text-xl text-white mt-0.5">
                            {partner.name}
                          </h4>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                            {partner.description}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
                          <strong className="text-white">Bilateral Scope:</strong> {partner.collaborationScope}
                        </div>
                      </div>
                      <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-3">
                        {partner.websiteUrl ? (
                          <a
                            href={partner.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                          >
                            <span>Official Portal</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#4DA5EC]" />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">Direct Institutional Agreement</span>
                        )}
                        <Link
                          href={ROUTES.contact}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold hover:brightness-110"
                        >
                          <span>Inquire via Sijam</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-group B: Academic & Migration Partners */}
            {educationPartners.length > 0 && (
              <div className="space-y-6 mb-16">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#4DA5EC]" />
                    <h3 className="font-heading font-bold text-xl text-white">
                      International Education &amp; Academic Consultancies
                    </h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Accredited Study Pathways
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {educationPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#4DA5EC]/40 transition-all backdrop-blur-xl flex flex-col justify-between shadow-xl"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="h-16 w-44 relative bg-black/60 rounded-2xl p-2.5 flex items-center justify-center overflow-hidden border border-white/15">
                            <Image
                              src={partner.logoUrl}
                              alt={partner.name}
                              fill
                              sizes="176px"
                              className="object-contain p-1"
                            />
                          </div>
                          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#402493]/60 text-purple-200 border border-purple-500/30">
                            {partner.country}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
                            {partner.category}
                          </span>
                          <h4 className="font-heading font-bold text-xl text-white mt-0.5">
                            {partner.name}
                          </h4>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                            {partner.description}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
                          <strong className="text-white">Bilateral Scope:</strong> {partner.collaborationScope}
                        </div>
                      </div>
                      <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-3">
                        {partner.websiteUrl ? (
                          <a
                            href={partner.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                          >
                            <span>Official Portal</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#4DA5EC]" />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">Direct Institutional Agreement</span>
                        )}
                        <Link
                          href={ROUTES.contact}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold hover:brightness-110"
                        >
                          <span>Inquire via Sijam</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-group C: Aviation & Sports Alliances */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aviationPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-14 w-40 relative bg-white rounded-xl p-2 flex items-center justify-center">
                        <Image src={partner.logoUrl} alt={partner.name} fill sizes="160px" className="object-contain" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                        {partner.category}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-white">{partner.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{partner.description}</p>
                    <div className="p-2.5 rounded-lg bg-white/[0.04] text-xs text-slate-300">
                      <strong className="text-white">Aviation Scope:</strong> {partner.collaborationScope}
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10">
                    <Link
                      href="/services/flight-reservations"
                      className="text-xs font-bold text-[#4DA5EC] hover:text-white flex items-center gap-1.5"
                    >
                      <span>Explore Aviation Logistics Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}

              {sportsPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-14 w-40 relative bg-white rounded-xl p-2 flex items-center justify-center">
                        <Image src={partner.logoUrl} alt={partner.name} fill sizes="160px" className="object-contain" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                        {partner.category}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-white">{partner.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{partner.description}</p>
                    <div className="p-2.5 rounded-lg bg-white/[0.04] text-xs text-slate-300">
                      <strong className="text-white">Athletic Scope:</strong> {partner.collaborationScope}
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10">
                    <Link
                      href="/services/football-talent"
                      className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1.5"
                    >
                      <span>Explore Football Talent Showcase</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 9: HONEST DISQUALIFICATION
          ───────────────────────────────────────────────── */}
          <section className="mb-24 rounded-3xl bg-red-950/20 border border-red-500/30 p-8 sm:p-12">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Partner Criteria Notice</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                We May Not Be Right For You If...
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                To preserve statutory compliance and our bilateral licensing across sovereign corridors, Sijam Consults strictly declines partnerships under the following conditions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <h3 className="font-heading font-bold text-sm text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Sub-Minimum Wage Employers</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We do not mobilize workforce cohorts for overseas employers paying below host-country statutory skilled minimum wages or failing to provide verified occupational injury coverage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <h3 className="font-heading font-bold text-sm text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Unlicensed Intermediaries</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We partner directly with registered corporate employers or officially licensed recruitment agencies. We do not work with freelance brokers charging illegal fees to Nigerian candidates.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <h3 className="font-heading font-bold text-sm text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Informal Cash Operations</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every bilateral engagement requires a formal B2B Manpower Supply Agreement, corporate bank invoicing, and defined employer liability protocols. We do not engage in uncontracted labor arrangements.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 10: FAQS ACCORDION
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Corporate Inquiries
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Frequently Asked Questions on B2B Manpower Supply.
              </h2>
            </div>

            <div className="max-w-4xl">
              <Accordion items={B2B_MANPOWER_FAQS} />
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 11: SOFT CTA / BILATERAL PROPOSAL
          ───────────────────────────────────────────────── */}
          <section className="rounded-3xl bg-gradient-to-r from-[#402493]/40 via-[#0D0826] to-[#257CFF]/20 border border-white/10 p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-xs font-bold text-[#4DA5EC]">
                <ShieldCheck className="w-4 h-4" />
                <span>Bilateral Corporate Engagement · CAC RC: 1715416</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Mobilize a Fully Vetted Workforce Cohort for Your Next International Project.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Connect directly with our executive director of bilateral partnerships to review technical candidate availability, discuss custom trade-testing protocols, and structure your manpower supply agreement.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href={ROUTES.contact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Initiate Corporate Manpower Requisition</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20we%20are%20an%20international%20contractor%20seeking%20a%20B2B%20manpower%20supply%20proposal.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Chat With Corporate Director</span>
                </a>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Kaduna Practical Testing Hub
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Abuja Ministerial Liaison Desk
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  90-Day Candidate Replacement SLA
                </span>
              </div>
            </div>
          </section>

          <div className="max-w-4xl mx-auto mt-16">
            <TrustBanner showFullDisclaimer={false} />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
