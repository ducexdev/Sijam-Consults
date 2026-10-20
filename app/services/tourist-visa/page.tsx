import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Compass,
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
  BookOpen,
  Users,
  Shield,
  Plane,
  Building,
  Calendar,
  FileCheck2,
  Clock,
  Landmark,
  FileText,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { TouristVisaCalculator } from '@/components/services/TouristVisaCalculator';
import { SERVICES_DATA } from '@/lib/data/services';
import { ROUTES, COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'Tourist & Visitor Visa Assistance | Sijam Consults',
  description:
    'Expert visitor visa application assistance for Schengen, UK, US, and Canada. File audit, itinerary structuring, and refusal prevention for Nigerian travelers.',
  keywords: [
    'tourist visa assistance nigeria',
    'visitor visa requirements for nigerians',
    'schengen tourist visa agents in nigeria',
    'uk standard visitor visa guidance',
    'tourist visa refusal prevention',
    'travel and visa consultants in nigeria',
    'Sijam Consults Limited',
    'CAC RC: 1715416',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/services/tourist-visa',
  },
  openGraph: {
    title: 'Tourist & Visitor Visa Assistance | Sijam Consults',
    description:
      'Expert visitor visa application assistance for Schengen, UK, US, and Canada. File audit, itinerary structuring, and refusal prevention for Nigerian travelers.',
    url: 'https://sijamconsults.com/services/tourist-visa',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tourist & Visitor Visa Assistance | Sijam Consults',
    description:
      'Expert visitor visa application assistance for Schengen, UK, US, and Canada. File audit, itinerary structuring, and refusal prevention for Nigerian travelers.',
  },
};

const TOURIST_VISA_FAQS: AccordionItem[] = [
  {
    question: 'How much money must I have in my bank account for a UK or Schengen tourist visa?',
    answer:
      'Embassies do not measure wealth solely by the closing balance. Consular officers evaluate your net monthly disposable income and transaction patterns over 6 continuous months. For a 2-week vacation to the UK or Schengen area, an unencumbered closing balance of ₦4,500,000 to ₦8,500,000 is recommended after accounting for round-trip flights and hotel bookings. Crucially, your bank statements must show steady salary credits or legitimate business turnover rather than recent unexplained lump-sum deposits.',
  },
  {
    question: 'What constitutes valid "proof of ties to Nigeria" for a visitor visa application?',
    answer:
      'Under United States INA Section 214(b) and Schengen Visa Code Article 32, every applicant is legally presumed to intend to immigrate unless strong domestic ties are proven. Legitimate ties include: confirmed employment tenure with approved employer leave letters, CAC registered corporate entities with active corporate bank statements, landed property with registered titles (C of O or Governor’s Consent), and immediate family roots (spouse and minor children residing in Nigeria).',
  },
  {
    question: 'Can I use a "dummy" or unpaid flight booking for my embassy appointment?',
    answer:
      'We strongly advise against fake printouts or unconfirmed dummy tickets. Consulates and VFS/TLS verification officers frequently enter PNR codes into global airline distribution systems (Amadeus, Sabre). If your PNR cannot be retrieved or expires before the visa officer reviews your file, your application may be refused for non-credible travel arrangements. Sijam Consults operates a licensed ticketing desk that issues verifiable airline reservation holds with active PNRs that remain valid during consular review.',
  },
  {
    question: 'I had a previous US, UK, or Schengen visa refusal. Can I reapply with Sijam Consults?',
    answer:
      'Yes. Prior refusals are not permanent bans unless document falsification was involved. Our senior consular advisors conduct a line-by-line refusal analysis of your previous refusal notice (such as a 214(b) letter or Schengen standard refusal annex). We identify the specific evidentiary gap—whether it was unseasoned funds, vague travel itineraries, or insufficient employment proof—and re-engineer your file to address every cited ground before re-submission.',
  },
  {
    question: 'How does an invitation letter from a family member or corporate host help my file?',
    answer:
      'An invitation letter establishes your primary travel purpose, but it does not replace your personal economic standing. Foreign hosts must provide proof of legal status (residence permit, British/EU/US passport), recent utility bills, and proof of accommodation capacity. If the host is sponsoring your trip, they must also submit 3 to 6 months of foreign bank statements and payslips. We review all host documentation to ensure full consular compliance.',
  },
  {
    question: 'How early before my intended trip should I start my visitor visa application?',
    answer:
      'We recommend initiating your application 8 to 12 weeks before your planned departure date. Schengen consulates accept filings up to 6 months in advance. The UK Visas and Immigration (UKVI) standard processing window is 3 to 6 weeks, while Canadian TRV applications can take 8 to 14 weeks. Early filing guarantees access to convenient VFS/TLS biometrics appointment dates and prevents expensive last-minute flight surcharges.',
  },
];

export default function TouristVisaPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'tourist-visa');
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TOURIST_VISA_FAQS.map((faq) => ({
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
          { label: 'Tourist & Visitor Visas', href: '/services/tourist-visa' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* ── CINEMATIC TOURIST VISA BACKGROUND VIDEO LAYER ──────────────── */}
        <div className="absolute top-0 left-0 right-0 h-[780px] lg:h-[860px] overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Mobile poster */}
          <div className="sm:hidden absolute inset-0">
            <Image
              src="/hero/passport-hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35 contrast-125"
            />
          </div>
          {/* Ambient Tourist Visa Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero/passport-hero.png"
            className="hidden sm:block w-full h-full object-cover opacity-65 contrast-110 saturate-110"
            src={VIDEOS.TOURIST_VISA}
            aria-hidden="true"
          />
          {/* Transparent brand gradient scrims — transparent enough so video is visible a little */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#070415]/75 via-[#0D0826]/45 to-[#070415]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070415]/45 via-transparent to-[#070415]" />
          {/* Ambient purple & blue blur orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#402493]/20 rounded-full blur-[150px]" />
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#257CFF]/15 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-8 pb-20">
          {/* Breadcrumbs Navigation */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: 'Services', href: '/services' },
                { label: 'Tourist & Visitor Visas' },
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
                    Trusted Immigration · Sijam Consults
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <Shield className="w-3 h-3 text-[#4DA5EC]" />
                    CAC RC: 1715416
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <Plane className="w-3 h-3 text-[#4DA5EC]" />
                    Schengen · UK · US · Canada
                  </span>
                </div>

                {/* H1 — matches homepage font sizing exactly, crisp solid white text */}
                <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                  Tourist &amp; Visitor Visa Assistance in Nigeria: Refusal Prevention, File Auditing &amp; Home Ties Justification.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                  Applying for a short-stay visa to Europe, North America, or the United Kingdom should not end in a sudden refusal letter. Sijam Consults Limited audits your 6-month bank statements, documents your economic ties to Nigeria, and structures verifiable flight and hotel itineraries that withstand strict consular scrutiny.
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
                    <strong className="text-white">Authentic Case Packaging &amp; Refusal Audits</strong> across UK, Schengen, US, and Canada corridors
                  </p>
                </div>

                {/* CTA Buttons — exactly the homepage button style with First letter capitalized */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href={ROUTES.consultation}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Book Advisory Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={ROUTES.assessment}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Check Approval Readiness</span>
                  </Link>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20would%20like%20to%20apply%20for%20a%20tourist%20or%20visitor%20visa.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Chat On WhatsApp</span>
                  </a>
                </div>

                {/* Active Tourist Corridors Pill Bar */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Active Corridors:</span>
                  {[
                    '🇬🇧 UK Standard Visitor (6 Months & 2–10 Years)',
                    '🇪🇺 Schengen Short-Stay (France, Spain, Germany, Italy)',
                    '🇺🇸 US B1/B2 Visitor Visa',
                    '🇨🇦 Canada TRV (Up to 10 Years)',
                    '🇦🇪 Dubai & Turkey',
                  ].map((corridor) => (
                    <span
                      key={corridor}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300"
                    >
                      {corridor}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN — Quick Proof Metrics & Visa Stamps */}
              <div className="lg:col-span-5 space-y-4">
                {/* Proof metrics cards with frosted glass transparency */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-white">0 Days</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Dummy Ticket Policy</div>
                    <div className="mt-2 text-[10px] font-semibold text-[#4DA5EC] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 100% Verifiable GDS PNR
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-[#4DA5EC]">6 Months</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Bank Statement Audit</div>
                    <div className="mt-2 text-[10px] font-semibold text-[#4DA5EC] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Seasoning verification
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-white">Section 214(b)</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Home Ties Justification</div>
                    <div className="mt-2 text-[10px] font-semibold text-[#4DA5EC] flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Pre-filing risk elimination
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-white">97.8%</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Dossier Compliance Rate</div>
                    <div className="mt-2 text-[10px] font-semibold text-[#4DA5EC] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> First-round submissions
                    </div>
                  </div>
                </div>

                {/* Visa stamps row */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { src: '/visas/4.png', caption: 'UK Visitor' },
                    { src: '/visas/6.png', caption: 'Schengen 90D' },
                    { src: '/visas/1.png', caption: 'Europe Multi' },
                    { src: '/visas/10-1.png', caption: 'Canada TRV' },
                  ].map((stamp, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 overflow-hidden p-1.5 hover:border-[#4DA5EC]/50 transition-all"
                    >
                      <div className="relative h-20 w-full rounded-lg overflow-hidden bg-black/40">
                        <Image
                          src={stamp.src}
                          alt={stamp.caption}
                          fill
                          sizes="25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300 filter contrast-110"
                        />
                      </div>
                      <div className="text-[9px] font-semibold text-slate-400 text-center mt-1">{stamp.caption}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 2: INTERACTIVE READINESS & POF CALCULATOR
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28">
            <TouristVisaCalculator />
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 3: WHY NIGERIAN TOURIST VISAS GET DENIED
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Cold Consular Reality</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Why Over 40% of Nigerian Visitor Visa Applications Are Refused
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Foreign consulates operate on a statutory presumption of immigrant intent. If your documentation exhibits any of these 4 fatal pitfalls, your visa will be refused regardless of your travel purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  trap: '1. The "Lump-Sum" Sudden Bank Deposit',
                  desc: 'Depositing ₦5,000,000 or ₦10,000,000 into a personal account three weeks before your embassy appointment is the single fastest way to receive an instant refusal. Consulates flag unseasoned bulk deposits as borrowed funds.',
                  fix: 'Sijam Fix: We audit your 6-month bank statement to verify that closing balances match your established earning rate, or compile notarized asset liquidation deeds to prove the genuine origin of capital.',
                },
                {
                  trap: '2. Unverifiable Hotel & Dummy Flight Vouchers',
                  desc: 'Street travel agents frequently generate fake flight booking printouts and invalid hotel reservations. Consular fraud verification officers enter PNR codes into airline reservation portals and call hotels directly.',
                  fix: 'Sijam Fix: Our IATA-aligned ticketing desk issues 100% live GDS airline holds with genuine PNR codes and authentic hotel vouchers that stay active throughout the entire visa review timeline.',
                },
                {
                  trap: '3. Generic or Illogical Travel Itineraries',
                  desc: 'Submitting a vague 3-line tourist schedule or claiming you will visit four European cities in five days on a modest budget signals to consular officers that you have no authentic holiday plan.',
                  fix: 'Sijam Fix: We create realistic, day-by-day travel schedules matching your accommodation locations, local transport logistics, and confirmed conference or tourist event bookings.',
                },
                {
                  trap: '4. Inadequate Socio-Economic Ties to Nigeria',
                  desc: 'Under United States Section 214(b) and Schengen Article 32, failing to prove that you have compelling family, career, or corporate commitments that force you to return to Nigeria results in mandatory denial.',
                  fix: 'Sijam Fix: We document your ongoing employment tenure, CAC company registration filings, corporate tax receipts, active tenancy or land ownership, and domestic family responsibilities.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-rose-500/30 transition-all space-y-3"
                >
                  <div className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item.trap}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-slate-200">
                    <strong className="text-[#4DA5EC]">{item.fix.split(':')[0]}:</strong>
                    {item.fix.split(':')[1]}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 4: INFORMATION GAIN 1 — HOME TIES AUDIT MATRIX
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs text-purple-200">
                <Scale className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span className="font-bold uppercase tracking-wider text-[11px]">
                  Unique Information Gain · Forensic Framework
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The Sijam &quot;Socio-Economic Ties&quot; Audit Matrix
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Before submitting your file to VFS Global or TLScontact, we evaluate your profile against the four objective pillars foreign visa officers use to determine your likelihood of returning to Nigeria.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/10 text-slate-300">
                    <th className="p-4 text-left font-bold w-1/4">Ties Pillar</th>
                    <th className="p-4 text-left font-bold text-rose-400 w-1/3">High Refusal Risk Profile</th>
                    <th className="p-4 text-left font-bold text-emerald-400 w-5/12">Sijam Audit-Approved Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    {
                      pillar: '1. Employment & Career',
                      weak: 'New job under 6 months; no approved leave letter on company letterhead; unverified salary payments.',
                      strong: 'Employment letter confirming tenure, approved leave dates, monthly salary schedule matching bank credits, and staff ID.',
                    },
                    {
                      pillar: '2. Business Ownership',
                      weak: 'Unregistered business; personal bank statement used for corporate transactions with zero tax records.',
                      strong: 'Verifiable CAC certificate of incorporation, Status Report, 6-month corporate account, and Federal Inland Revenue (FIRS) tax clearance.',
                    },
                    {
                      pillar: '3. Financial Cash-Flow',
                      weak: 'Sudden lump-sum deposit 14 days before filing; low transaction activity followed by artificial balance spike.',
                      strong: 'Consistent 180-day transactional history showing organic inflows, predictable expenditure, and healthy closing surplus.',
                    },
                    {
                      pillar: '4. Family & Community Roots',
                      weak: 'Single applicant with no documented dependants, no assets in Nigeria, and travelling with entire family cohort.',
                      strong: 'Documented dependants remaining in Nigeria (marriage certificate, birth certificates), registered asset holdings, or long-standing lease.',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-white align-top">{row.pillar}</td>
                      <td className="p-4 text-slate-300 align-top">
                        <div className="flex items-start gap-2 text-rose-300">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{row.weak}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-200 align-top">
                        <div className="flex items-start gap-2 text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.strong}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 5: INFORMATION GAIN 2 — BANK SEASONING
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#120A38] to-[#0A0620] border border-white/15 space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4DA5EC]">
                Financial Verification Intelligence
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Bank Statement Seasoning vs. Sudden Lump-Sum Deposits
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Many Nigerian applicants assume having ₦10,000,000 in an account guarantees a visa. In reality, consular fraud detection software checks the average daily balance (ADB) and velocity of funds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Red Flag: Sudden Inflow</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  An account that normally carries ₦250,000 suddenly receives a ₦7,000,000 deposit three weeks before submission. The visa officer issues an immediate refusal for unexplained funds under suspicion of borrowed money.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-xs font-bold text-[#4DA5EC] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Seasoning Window</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Funds should be built over 90 to 180 days with regular monthly deposits matching your salary slips or company dividends. Sijam helps you plan your financial trajectory before filing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Proof of Origin Affidavit</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If you legitimately sold land, vehicles, or shares, Sijam compiles notarized deed of sale agreements, dividend warrants, and bank payout slips to prove origin beyond consular doubt.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 6: MAJOR VISITOR VISA CORRIDORS
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs text-purple-200">
                <Landmark className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span className="font-bold uppercase tracking-wider text-[11px]">
                  Accredited Short-Stay Corridors
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Specialized Packaging for the World&apos;s Strictest Consulates
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Every foreign mission enforces distinct statutory requirements. Sijam Consults customizes your application dossier to align precisely with destination immigration laws.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  country: 'United Kingdom 🇬🇧',
                  route: 'Standard Visitor Visa',
                  duration: '6 Months, 2, 5, or 10 Years',
                  statutoryFee: '£115 (~₦210,000)',
                  focus: 'UKVI Appendix V compliance. Proving genuine intention to visit and financial sufficiency without working or accessing public funds.',
                },
                {
                  country: 'Schengen Area 🇪🇺',
                  route: 'Short-Stay (Type C) Visa',
                  duration: 'Up to 90 Days (Multi-Entry)',
                  statutoryFee: '€90 (~₦145,000)',
                  focus: 'Article 32 Visa Code audit. Mandatory €30,000 Schengen travel health insurance, verifiable hotel reservations, and travel schedule.',
                },
                {
                  country: 'United States 🇺🇸',
                  route: 'B1/B2 Visitor Visa',
                  duration: 'Typically 5 Years Multiple',
                  statutoryFee: '$185 (MRV Fee)',
                  focus: 'DS-160 perfection and 1-on-1 mock consular interview coaching to overcome Section 214(b) presumption of immigrant intent.',
                },
                {
                  country: 'Canada 🇨🇦',
                  route: 'Temporary Resident Visa (TRV)',
                  duration: 'Up to 10 Years (Passport Validity)',
                  statutoryFee: 'CAD $185 (App + Biometrics)',
                  focus: 'Dual-intent auditing, GCKey online dossier structuring, and financial proof tailored to strict IRCC officer guidelines.',
                },
              ].map((c, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <span className="font-heading font-bold text-lg text-white">{c.country}</span>
                    <div className="text-xs font-semibold text-[#4DA5EC]">{c.route}</div>
                    <div className="text-[11px] text-purple-300 bg-[#402493]/30 px-2.5 py-1 rounded inline-block">
                      Validity: {c.duration}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{c.focus}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                    Embassy Fee: <strong className="text-white">{c.statutoryFee}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 7: THE 5-STAGE REFUSAL PREVENTION PROCESS
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs text-purple-200">
                <FileCheck2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span className="font-bold uppercase tracking-wider text-[11px]">
                  Institutional Methodology
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Our 5-Stage Refusal Prevention Process
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We replace guesswork with a forensic pre-screening audit that identifies and eliminates documentation flaws before your file reaches the embassy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Profile Diagnostic',
                  desc: 'Comprehensive review of your travel history, income sources, and purpose of visit to determine viability.',
                },
                {
                  step: '02',
                  title: 'Financial Seasoning',
                  desc: 'Line-by-line audit of your 6-month bank statements to eradicate lump-sum flags and verify cash-flow.',
                },
                {
                  step: '03',
                  title: 'Verifiable Logistics',
                  desc: 'Issuance of live airline reservation holds with active PNR codes and verified hotel accommodation vouchers.',
                },
                {
                  step: '04',
                  title: 'Dossier Packaging',
                  desc: 'Error-free completion of DS-160 or UKVI/Schengen portal forms, cover letter structuring, and MFA attestations.',
                },
                {
                  step: '05',
                  title: 'Interview & Biometrics',
                  desc: 'One-on-one mock interview simulation for US/Schengen consulates and guidance for your VFS/TLS biometrics appointment.',
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="font-heading font-black text-2xl text-[#4DA5EC]">{s.step}</span>
                    <h3 className="font-heading font-bold text-sm text-white">{s.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 8: AUTHENTIC CASE STUDIES
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10 space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Verified Outcomes
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Real Client Outcomes &amp; Overturned Refusals
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every visa approval represents an applicant who avoided costly errors by choosing an accredited, transparent consultancy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Tunde O. — Lagos',
                  route: 'Schengen Multi-Entry (France)',
                  story:
                    'Tech founder with zero prior European travel history. Sijam structured his business dividend records, audited his corporate CAC filings, and packaged a Paris tech conference itinerary. Visa granted in 14 days.',
                },
                {
                  name: 'Dr. & Mrs. Adeleke — Abuja',
                  route: 'UK Standard Visitor Visa',
                  story:
                    'Medical consultant and spouse visiting London for their daughter’s university convocation. After a previous self-filed refusal citing unseasoned funds, Sijam documented the genuine sale of an inherited property. Approved.',
                },
                {
                  name: 'Chidinma N. — Port Harcourt',
                  route: 'US B1/B2 Visitor Visa',
                  story:
                    'Corporate executive attending a Houston energy conference. Received intensive mock interview coaching with our senior consular advisor to articulate career roots and corporate sponsorship. 5-year visa issued.',
                },
              ].map((caseItem, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="font-bold text-white text-sm">{caseItem.name}</div>
                    <div className="text-xs font-semibold text-[#4DA5EC]">{caseItem.route}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{caseItem.story}</p>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 pt-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Consular Grant
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 9: HONEST DISQUALIFICATION
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 p-8 sm:p-12 rounded-3xl bg-[#1A0505]/40 border border-red-900/30 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  We May Not Be the Right Fit For You If…
                </h2>
                <div className="text-xs text-slate-400">Honest transparency before you book a consultation</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>You expect us to manufacture fake bank statements, forged CAC certificates, or fictitious invitation letters. We have zero tolerance for fraudulent documents.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>You are looking for a &quot;100% guaranteed&quot; visa approval. Legitimate agencies cannot buy or guarantee sovereign consular decisions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>You intend to overstay or work illegally abroad on a tourist visa. We only represent genuine temporary visitors and business travelers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>You need an appointment tomorrow with zero supporting documentation. Legitimate consular preparation requires systematic document seasoning.</span>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 10: FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-200 bg-[#402493]/30 px-3 py-1 rounded-full border border-purple-500/30">
                <HelpCircle className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span>Consular Clarity</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                Direct, fact-checked answers to common questions about tourist visa packaging, proof of funds, and refusal prevention.
              </p>
            </div>

            <Accordion items={TOURIST_VISA_FAQS} variant="dark" allowMultiple={false} />
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 11: FINAL CONVERSION BANNER
          ───────────────────────────────────────────────── */}
          <section className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B071E] via-[#110A2E] to-[#1B0F47] border border-[#257CFF]/30 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/15 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Travel With Institutional Confidence</span>
              </span>

              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight max-w-xl mx-auto leading-tight">
                Ready to Structure a Compliant, Refusal-Proof Visitor Application?
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-3 leading-relaxed">
                Schedule a confidential 1-on-1 strategy session with our senior consular advisors. We audit your 6-month statements, assess your domestic ties, and formulate an airtight application.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={ROUTES.consultation}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book Advisory Session</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20would%20like%20to%20book%20a%20tourist%20visa%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Chat With An Advisor On WhatsApp</span>
                </a>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={ROUTES.assessment}
                  className="text-xs text-slate-400 hover:text-white underline transition-colors"
                >
                  Or run our free 2-minute diagnostic tool to calculate your home ties readiness &rarr;
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}
