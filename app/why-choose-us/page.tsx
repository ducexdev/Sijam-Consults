import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Award,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileCheck2,
  Sparkles,
  Lock,
  Ban,
  Clock,
  HeartHandshake,
  MapPin,
  PhoneCall,
  AlertTriangle,
  Scale,
  Star,
  ChevronRight,
  FileText,
  BadgeCheck,
  Globe2,
  GraduationCap,
  Briefcase,
  Layers,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { COMPANY, ROUTES } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'Why Sijam Consults | Accredited International Advisory',
  description:
    'Discover why hundreds of professionals, students, and employers trust Sijam Consults Limited (RC: 1715416). Transparent advisory, no false promises, CAC accredited.',
  keywords: [
    'accredited immigration consultancy in nigeria',
    'why choose sijam consults limited',
    'verified travel agency in kaduna nigeria',
    'reliable study abroad and visa agents',
    'ethical international recruitment standards',
    'CAC registered immigration company nigeria',
    'licensed visa consultants abuja lagos kaduna',
    'Sijam Consults trust',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/why-choose-us',
  },
};

const WHY_CHOOSE_US_FAQS: AccordionItem[] = [
  {
    id: 'why-faq-1',
    question: 'How do I verify that Sijam Consults Limited is legally accredited in Nigeria?',
    answer:
      'Sijam Consults Limited is a legally incorporated corporate body under the Companies and Allied Matters Act of the Federal Republic of Nigeria, holding CAC Registration Number RC: 1715416. You can verify our incorporation status directly on the official Corporate Affairs Commission (CAC) public registry search portal (search.cac.gov.ng). Furthermore, we operate from a permanent, open physical headquarters at Suite A10, 2nd Floor, 2/4 Kachia Road, Kaduna, where prospective clients meet our leadership team in person.',
  },
  {
    id: 'why-faq-2',
    question: 'Do you guarantee visa approval for your clients?',
    answer:
      'No, and we view any agency or agent that promises a "100% guaranteed visa" as fundamentally fraudulent. Sovereign immigration law dictates that final authority to approve or refuse any visa application belongs exclusively to consular officers of destination governments (such as UKVI, IRCC Canada, or European Schengen consular posts). What Sijam Consults provides is forensic document auditing, statutory compliance verification, and direct institutional partnerships that maximize your legal file strength and prevent procedural refusals.',
  },
  {
    id: 'why-faq-3',
    question: 'How does your 47-point compliance audit prevent visa refusals?',
    answer:
      'Most visa refusals in Nigeria occur because of technical documentation mismatches: unseasoned bank statements, lack of Ministry of Foreign Affairs (MFA) legalisation, inconsistent employment tax declarations, or unverified study programs. Our 47-point compliance matrix subjects your dossier to forensic scrutiny across six categories: identity consistency, financial seasoning, institutional legitimacy, employment tax trails, consular interview readiness, and ties to home country. Any vulnerability is resolved before embassy lodgement.',
  },
  {
    id: 'why-faq-4',
    question: 'Can you provide "show money" or arrange temporary bank statements?',
    answer:
      'No. We maintain an uncompromising zero-tolerance policy against financial document forgery, fabricated bank statements, or borrowed show money. Consular fraud detection units in Abuja and Lagos cross-reference banking records directly with Nigerian financial institutions under statutory anti-fraud protocols. Submitting altered statements triggers lifetime travel bans under international immigration laws. We assist clients in legally seasoning and verifying genuine personal or sponsor funds.',
  },
  {
    id: 'why-faq-5',
    question: 'What happens if I have an existing visa refusal from the UK, US, or Schengen zone?',
    answer:
      'Over 40% of our successful clients came to us after suffering one or more refusals through informal street agents. We conduct an exhaustive forensic refusal review: retrieving your case notes (such as GCMS notes for Canada or refusal code schedules for Schengen/UK), identifying the statutory omission that caused the rejection, and constructing a comprehensive legal rebuttal file addressing every concern before resubmission.',
  },
  {
    id: 'why-faq-6',
    question: 'How are your professional fees structured, and do you take payments to personal accounts?',
    answer:
      'All payments to Sijam Consults Limited are made exclusively into our verified corporate bank accounts held in the registered legal name of Sijam Consults Limited. We never request payments into personal accounts, crypto wallets, or cash handovers. Our fees are broken into transparent, milestone-based stages defined in a signed advisory agreement with official receipting and no hidden surprise charges.',
  },
  {
    id: 'why-faq-7',
    question: 'How does Sijam handle client data privacy and sensitive passports?',
    answer:
      'We operate in full compliance with the Nigeria Data Protection Act (NDPR 2023). Your academic transcripts, financial statements, and civil records are stored within enterprise-grade encrypted repositories. Unlike informal agents who circulate client passports across open WhatsApp groups, your personal information is accessible only to your assigned compliance officer and case supervisor.',
  },
  {
    id: 'why-faq-8',
    question: 'How are your university admissions partnerships structured?',
    answer:
      'We hold direct bilateral recruitment agreements with accredited foreign institutions, including Cyprus West University (CWU) and accredited colleges across Poland, Malta, and Slovakia. This eliminates sub-agent broker fees, provides guaranteed merit tuition discounts up to 50%, and ensures admissions letters are issued directly in the student\'s legal name with verifiable university registrars.',
  },
];

const COMPLIANCE_PILLARS = [
  {
    num: '01',
    title: 'Statutory CAC Corporate Registration',
    highlight: 'RC: 1715416 Verified',
    icon: ShieldCheck,
    description:
      'Fully incorporated limited liability company under Nigerian corporate law with verifiable public standing on the CAC registry portal. We operate open corporate offices in Kaduna where you sit across from our directors.',
  },
  {
    num: '02',
    title: '47-Point Consular Compliance Audit',
    highlight: 'Zero-Omission Standard',
    icon: FileCheck2,
    description:
      'Every file undergoes rigorous cross-examination against destination embassy refusal schedules. We audit financial seasoning, tax receipts, academic apostilles, and employment contracts before any visa lodgement.',
  },
  {
    num: '03',
    title: 'Direct Bilateral Academic Alliances',
    highlight: 'Up to 50% Tuition Grants',
    icon: Award,
    description:
      'Direct, contracted partnerships with accredited institutions across Poland, Cyprus, Malta, and the UK. No middleman brokers, no inflated tuition markups, and direct university registrar verification.',
  },
  {
    num: '04',
    title: 'Ethical B2B Manpower Supply (ILO 181)',
    highlight: 'Zero-Fee Worker Protection',
    icon: Building2,
    description:
      'We enforce International Labour Organization Fair Recruitment guidelines. Employers fund cross-border mobilization while skilled Nigerian artisans and healthcare personnel undergo rigorous testing at our Kaduna facility.',
  },
  {
    num: '05',
    title: 'Intensive Consular Interview Coaching',
    highlight: '1-on-1 Simulated Audits',
    icon: Users,
    description:
      'We prepare candidates with realistic simulated interviews covering ties to Nigeria, study objectives, and technical employment verification to eliminate panic and inconsistent verbal testimony.',
  },
  {
    num: '06',
    title: 'Transparent Milestones & Corporate Escrow',
    highlight: 'Official Bank Accounts',
    icon: Ban,
    description:
      'All transactions flow through documented corporate bank accounts with formal legal retainers. Zero hidden charges, zero fake paperwork, and zero informal street agent middlemen.',
  },
];

const FORENSIC_COMPARISON = [
  {
    criteria: 'Corporate Legal Identity',
    sijam: 'CAC Registered Corporate Entity (RC: 1715416) with verifiable Kaduna headquarters suite and accountable directors',
    others: 'Informal street agents operating via anonymous social media accounts, unregistered phone numbers, and cybercafes',
  },
  {
    criteria: 'Financial Records Policy',
    sijam: '100% authentic banking trails, legitimate funds seasoning advisory, and sworn legal affidavits',
    others: 'Fabricated "show money" and fake bank statements triggering 10-year embassy fraud bans and police blacklists',
  },
  {
    criteria: 'Fee Structure & Accountability',
    sijam: 'Clear milestone-based agreements with formal contracts, official corporate bank accounts, and legal receipts',
    others: 'Opaque lump-sum demands into personal accounts with false "100% visa guarantee" promises and sudden hidden levies',
  },
  {
    criteria: 'Institutional Partnerships',
    sijam: 'Direct bilateral contracts with foreign universities and vetted international industrial employers',
    others: 'Unlicensed intermediaries buying offer letters through third-party brokers with inflated tuition markups',
  },
  {
    criteria: 'Client Data Security',
    sijam: 'NDPR 2023 compliant data handling with encrypted electronic document storage and strict confidentiality',
    others: 'Passports, identity cards, and personal financial statements circulated across public WhatsApp groups',
  },
  {
    criteria: 'Refusal Remediation Capability',
    sijam: 'Forensic refusal analysis, statutory GCMS note audits, and structured legal re-application dossiers',
    others: 'Abandonment of applicant upon refusal, with no explanation or refund of informal commissions',
  },
];

const PROVEN_METRICS = [
  { value: 'RC: 1715416', label: 'Federal CAC Corporate Accreditation', color: 'text-[#4DA5EC]' },
  { value: '47 Checks', label: 'Pre-Submission File Audit Protocol', color: 'text-emerald-400' },
  { value: '500+ Cases', label: 'Lawful Filings Across UK, EU & Gulf', color: 'text-[#F98864]' },
  { value: '0% Forgery', label: 'Strict Anti-Fraud Document Standard', color: 'text-purple-400' },
];

const VERIFIED_CASE_TRACKS = [
  {
    name: 'Tunde & Mary O.',
    corridor: 'Cyprus & Poland Education',
    badge: 'Direct Admission & 50% Merit Grant',
    quote:
      'After an informal agent in Abuja lost our original WAEC certificates and demanded ₦1.8M for fake bank statements, we visited Sijam\'s Kaduna office. They evaluated our genuine qualifications, secured direct admission to Cyprus West University with a 50% tuition scholarship, and completed our Polish legalizations cleanly.',
    details: 'WAEC English waiver verified · Zero forged paperwork · Legal study visa approved in 9 weeks',
    flag: '🇨🇾',
    icon: GraduationCap,
  },
  {
    name: 'Malam Ibrahim K.',
    corridor: 'Slovakia & Poland Fabrication',
    badge: 'MIG/MAG 135/136 Welder Work Permit',
    quote:
      'I had two previous Schengen visa refusals on my passport. The team at Sijam did not make false promises. They conducted real radiographic tests at their Kaduna testing bay, audited my trade credentials, and applied through a registered Slovakian engineering quota. My work permit and national visa were stamped without delay.',
    details: 'Caduna trade testing facility · Refusal audit remediation · 3-year renewable European residence',
    flag: '🇸🇰',
    icon: Briefcase,
  },
  {
    name: 'Chief Anthony E.',
    corridor: 'Polish Sp. z o.o. Corporate Migration',
    badge: 'European LLC & Director D-Visa',
    quote:
      'Structuring an international business requires genuine corporate attorneys, not street agents. Sijam incorporated our Polish Sp. z o.o. with the National Court Register (KRS), set up European corporate banking rails, and processed our Director National D-Visas with zero intermediary friction.',
    details: 'Full KRS corporate formation · VAT-EU registration · Lawful multi-entry Schengen access',
    flag: '🇵🇱',
    icon: Building2,
  },
];

export default function WhyChooseUsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: WHY_CHOOSE_US_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sijam Consults Limited',
    legalName: 'Sijam Consults Limited',
    url: 'https://sijamconsults.com',
    logo: 'https://sijamconsults.com/brand/logo.png',
    description:
      'Accredited Nigerian international travel and educational advisory consultancy (RC: 1715416) specializing in authentic university admissions, statutory work permits, and document legalisation.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Suite A10, 2nd Floor, 2/4 Kachia Road',
      addressLocality: 'Kaduna',
      addressRegion: 'Kaduna State',
      addressCountry: 'Nigeria',
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'Corporate Affairs Commission Registration',
      value: 'RC: 1715416',
    },
  };

  return (
    <PublicLayout>
      <BreadcrumbSchema items={[{ label: 'Why Choose Sijam', href: '/why-choose-us' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* Ambient background lighting */}
        <div className="fixed top-0 right-1/4 w-[700px] h-[700px] bg-[#402493]/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="fixed top-1/2 left-[-100px] w-[500px] h-[500px] bg-[#257CFF]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-[400px] h-[400px] bg-[#DC2F11]/08 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* ─────────────────────────────────────────────────────────
              SECTION 1: HERO (2-COLUMN GRID MATCHING HOMEPAGE)
          ───────────────────────────────────────────────────────── */}
          <section className="pt-8 pb-16 lg:pt-12 lg:pb-20">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Why Choose Sijam' }]} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* LEFT COLUMN — Editorial Copy & Actions */}
              <div className="lg:col-span-7 space-y-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CAC Registered RC: 1715416 · Institutional Travel Advisory</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
                    We Do Not Sell Illusions.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                      We Build Bulletproof Files
                    </span>{' '}
                    That Pass Consular Scrutiny.
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    Every year, thousands of Nigerian professionals and students suffer life-altering 5-to-10-year
                    embassy bans because informal street agents forged bank statements, submitted altered tax records,
                    or promised guaranteed visas they had no legal power to deliver.
                  </p>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    Sijam Consults Limited was built on the opposite principle: institutional transparency, verifiable
                    bilateral agreements, and a forensic 47-point audit that catches omissions before your file ever
                    reaches an embassy desk.
                  </p>
                </div>

                {/* Metrics bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                  {PROVEN_METRICS.map((m) => (
                    <div key={m.label} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-left">
                      <div className={`text-lg sm:text-xl font-black ${m.color}`}>{m.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons — matching exact homepage button styles */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      href={ROUTES.consultation}
                      className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Book advisory session</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href={ROUTES.assessment}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                      <span>Eligibility pre-check</span>
                    </Link>
                  </div>
                </div>

                {/* Verification strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                    CAC RC: 1715416 Verified
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {COMPANY.address.suite}, Kaduna
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Lock className="w-3.5 h-3.5 text-[#F98864]" />
                    NDPR 2023 Data Compliant
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN — Institutional Proof Showcase Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#12093A] via-[#0E072E] to-[#070415] p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 right-0 w-44 h-44 bg-[#257CFF]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#4DA5EC] block">
                          Institutional Distinction
                        </span>
                        <h2 className="font-heading font-black text-xl text-white mt-0.5">
                          The Sijam Standard
                        </h2>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
                        Verified Firm
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          title: 'Zero Document Forgery',
                          desc: 'We never alter statements, invent employment history, or use borrowed show money.',
                          icon: Ban,
                          color: 'text-rose-400',
                          bg: 'bg-rose-950/30 border-rose-800/40',
                        },
                        {
                          title: 'Physical Headquarters Accountability',
                          desc: 'Permanent Kaduna corporate address where you meet our leadership team in person.',
                          icon: Building2,
                          color: 'text-[#4DA5EC]',
                          bg: 'bg-blue-950/30 border-blue-800/40',
                        },
                        {
                          title: 'Direct University Admissions',
                          desc: 'Contracted bilateral partnerships with European universities offering up to 50% grants.',
                          icon: Award,
                          color: 'text-purple-400',
                          bg: 'bg-purple-950/30 border-purple-800/40',
                        },
                        {
                          title: 'Transparent Milestone Contracts',
                          desc: 'Corporate bank accounts only. Formal signed agreements with zero surprise levies.',
                          icon: Scale,
                          color: 'text-emerald-400',
                          bg: 'bg-emerald-950/30 border-emerald-800/40',
                        },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.title}
                            className={`p-3.5 rounded-xl border flex items-start gap-3 ${item.bg}`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${item.color}`} />
                            <div>
                              <div className="text-xs font-bold text-white">{item.title}</div>
                              <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Verification callout */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span>Federal Republic of Nigeria</span>
                      <a
                        href="https://search.cac.gov.ng/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4DA5EC] hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>Verify RC: 1715416</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Video highlight snippet */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300">
                      Need immediate profile triage? Our advisory desk is online.
                    </span>
                  </div>
                  <Link
                    href={ROUTES.contact}
                    className="text-[#4DA5EC] hover:text-white font-bold shrink-0 inline-flex items-center gap-1"
                  >
                    <span>Contact desk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2: THE REAL PROBLEM IN NIGERIAN IMMIGRATION
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  The Uncomfortable Reality
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  Why Most Nigerian Relocation Plans End in{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-[#F45A2A]">
                    Heartbreak &amp; 10-Year Bans
                  </span>
                </h2>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Nigeria's visa refusal rates for Western and European destinations remain among the highest in
                    the world. Not because Nigerian applicants lack talent, capital, or genuine intent — but because
                    the informal agency market relies on shortcuts that trigger immediate consular red flags.
                  </p>
                  <p>
                    Street agents routinely fabricate bank statements, claim non-existent employment history, or
                    use generic statement-of-purpose templates downloaded from the internet. When consular fraud
                    detection officers discover this, the result is devastating: Section 212(a)(6)(C)(i) permanent
                    misrepresentation flags, UK Paragraph V 3.6 10-year bans, and complete loss of capital.
                  </p>
                  <p className="text-white font-semibold">
                    At Sijam Consults, we refuse to touch falsified files. We do the hard, meticulous compliance
                    work required to build a genuine, legally unimpeachable file that stands up to every background check.
                  </p>
                </div>
              </div>

              {/* The 4 Consular Traps */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-white mb-4">
                  The Four Consular Traps Destroying Nigerian Files
                </h3>
                {[
                  {
                    num: '01',
                    trap: 'Unseasoned Borrowed "Show Money"',
                    impact:
                      'Sudden large deposits dumped into an account 2 weeks before submission. Consular officers cross-examine transactional velocity and reject the statement as unverified third-party funds.',
                    color: 'border-l-rose-500',
                  },
                  {
                    num: '02',
                    trap: 'Unregistered Middleman Brokers',
                    impact:
                      'Paying millions into personal savings accounts of agents who operate exclusively on WhatsApp. When the refusal arrives, the phone number is switched off and your money is gone.',
                    color: 'border-l-[#F45A2A]',
                  },
                  {
                    num: '03',
                    trap: 'Unauthenticated Academic Certificates',
                    impact:
                      'Submitting WAEC, NECO, or degree certificates without Nigerian Federal Ministry of Education (FME) and Ministry of Foreign Affairs (MFA) legalisation seals, prompting immediate rejection.',
                    color: 'border-l-amber-500',
                  },
                  {
                    num: '04',
                    trap: 'Generic Statement of Purpose Templates',
                    impact:
                      'Using copied internet templates that fail to establish genuine home ties, economic rationale, or clear post-study career trajectory back in Nigeria, failing the consular intention test.',
                    color: 'border-l-purple-500',
                  },
                ].map((trap) => (
                  <div
                    key={trap.num}
                    className={`pl-4 py-4 pr-4 rounded-r-xl bg-white/[0.03] border-l-2 ${trap.color} border border-white/[0.06] border-l-0 space-y-1`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500">{trap.num}</span>
                      <h4 className="text-sm font-bold text-white">{trap.trap}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5">{trap.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3: INFORMATION GAIN — THE 47-POINT COMPLIANCE MATRIX
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#4DA5EC]/10 px-3 py-1 rounded-full border border-[#4DA5EC]/25 mb-3">
                <FileCheck2 className="w-3.5 h-3.5" />
                Information Gain · Forensic Framework
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The Sijam 47-Point Consular Compliance Audit
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                Before any client dossier is scheduled for embassy submission, it passes through our six-stage
                pre-submission compliance protocol. This forensic approach is why our clients maintain an exceptional
                first-pass approval rate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  phase: 'Phase 1',
                  name: 'Identity & Civil Integrity',
                  checks: [
                    'NIMC NIN database biographical cross-verification',
                    'Passport validity margin (>6 months beyond intended stay)',
                    'Birth attestation & NPC age declaration consistency',
                    'Previous name change and marriage affidavit authentication',
                  ],
                  icon: Lock,
                  color: 'text-[#4DA5EC]',
                },
                {
                  phase: 'Phase 2',
                  name: 'Academic Legalisation & WES',
                  checks: [
                    'WAEC / NECO direct verification scratch-card audit',
                    'Federal Ministry of Education (FME) attestation Abuja',
                    'Ministry of Foreign Affairs (MFA) legalisation seals',
                    'WES / ICAS / European NARIC equivalence mapping',
                  ],
                  icon: GraduationCap,
                  color: 'text-purple-400',
                },
                {
                  phase: 'Phase 3',
                  name: 'Financial Seasoning & Tax Trails',
                  checks: [
                    '3 to 6-month transaction velocity and average balance audit',
                    'Lump-sum deposit source verification and tax receipts',
                    'First-degree family sponsorship affidavit & legal proof of ties',
                    'CBN Form A tuition remittance compliance parameters',
                  ],
                  icon: Scale,
                  color: 'text-emerald-400',
                },
                {
                  phase: 'Phase 4',
                  name: 'Employment & Technical Tenure',
                  checks: [
                    'PENCOM retirement savings account (RSA) statement audit',
                    'Corporate Affairs Commission verification of employer',
                    'Direct HR reference verification & official domain check',
                    'Kaduna technical testing scorecards for skilled artisans',
                  ],
                  icon: Briefcase,
                  color: 'text-[#F98864]',
                },
                {
                  phase: 'Phase 5',
                  name: 'Institutional Direct Issuance',
                  checks: [
                    'Official university admission letters with direct verification keys',
                    'Foreign employer labour authorization (Voivodeship / CoS)',
                    'Merit scholarship grant confirmation letters',
                    'Direct registrar communications with zero sub-agent markups',
                  ],
                  icon: Award,
                  color: 'text-blue-400',
                },
                {
                  phase: 'Phase 6',
                  name: 'Consular Interview & Ties Defense',
                  checks: [
                    'SOP articulation defense: Economic return on investment',
                    'Ties to Nigeria audit: Family, landed assets & career progression',
                    'High-probability consular query scenario testing',
                    'Mock non-verbal posture and document presentation drill',
                  ],
                  icon: Users,
                  color: 'text-rose-400',
                },
              ].map((matrix) => {
                const Icon = matrix.icon;
                return (
                  <div
                    key={matrix.phase}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          {matrix.phase}
                        </span>
                        <Icon className={`w-4 h-4 ${matrix.color}`} />
                      </div>
                      <h3 className="font-heading font-bold text-base text-white">{matrix.name}</h3>
                      <ul className="space-y-2 pt-1">
                        {matrix.checks.map((chk, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${matrix.color}`} />
                            <span>{chk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 4: SIX CORE PILLARS OF INSTITUTIONAL EXCELLENCE
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F98864] bg-[#F98864]/10 px-3 py-1 rounded-full border border-[#F98864]/25">
                <Sparkles className="w-3.5 h-3.5" />
                Our Foundational Standards
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Six Uncompromising Standards That Protect Your Future
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                Every policy we enforce is designed around one goal: protecting your passport record and ensuring
                your investment yields a legitimate, verified outcome.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPLIANCE_PILLARS.map((pillar) => {
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
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 5: FORENSIC MATRIX: SIJAM VS STREET AGENTS
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40">
                <Scale className="w-3.5 h-3.5" />
                Objective Market Comparison
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Sijam Consults vs Informal Street Agents
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                Before entrusting your passport, academic degrees, and family savings to any consultancy, compare their
                operational standards against Sijam.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="p-4 sm:p-5 font-heading font-bold text-slate-300 uppercase tracking-wider text-[11px] w-1/4">
                      Evaluation Criteria
                    </th>
                    <th className="p-4 sm:p-5 font-heading font-bold text-[#4DA5EC] uppercase tracking-wider text-[11px] w-5/12 bg-[#257CFF]/10 border-x border-white/10">
                      Sijam Consults Limited
                    </th>
                    <th className="p-4 sm:p-5 font-heading font-bold text-slate-400 uppercase tracking-wider text-[11px] w-1/3">
                      Street / Unregistered Agents
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {FORENSIC_COMPARISON.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-white">{row.criteria}</td>
                      <td className="p-4 sm:p-5 bg-[#257CFF]/05 border-x border-white/10 text-slate-200">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{row.sijam}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{row.others}</span>
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
                <span>Book advisory session</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 6: VERIFIED CASE TRACKS & CLIENT RESULTS
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Documented Client Outcomes
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Real Profiles. Real Consular Approvals.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                These are verified Nigerian applicants who chose methodical compliance over shortcuts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VERIFIED_CASE_TRACKS.map((caseItem) => {
                const Icon = caseItem.icon;
                return (
                  <div
                    key={caseItem.name}
                    className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#4DA5EC]/30 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{caseItem.flag}</span>
                          <div>
                            <div className="font-bold text-sm text-white">{caseItem.name}</div>
                            <div className="text-[11px] text-slate-400">{caseItem.corridor}</div>
                          </div>
                        </div>
                        <Icon className="w-4 h-4 text-[#4DA5EC]" />
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#257CFF]/10 border border-[#257CFF]/20 text-xs font-semibold text-[#4DA5EC]">
                        {caseItem.badge}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        &ldquo;{caseItem.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{caseItem.details}</span>
                    </div>
                  </div>
                );
              })}
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
                      'You are looking for an agent who promises 100% guaranteed visa grants.',
                      'You want someone to generate fake bank statements or borrowed show money.',
                      'You want to submit fabricated employment letters or unverified credentials.',
                      'You are unwilling to go through a rigorous 47-point pre-submission audit.',
                      'You want shortcuts instead of doing the statutory documentation work properly.',
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
                      'You want a legally incorporated CAC firm with verifiable physical accountability.',
                      'You have experienced previous visa refusals and need forensic remediation.',
                      'You want direct European university admission without inflated broker markups.',
                      'You are a qualified skilled tradesperson or nurse seeking genuine overseas employment.',
                      'You value your passport history and want zero risk of document forgery bans.',
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
                  Frequently Asked Questions
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                  Transparent Answers on Accreditation &amp; Standards
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Clear, factual answers on how we protect your application and maintain institutional compliance.
                </p>
              </div>

              <Accordion items={WHY_CHOOSE_US_FAQS} variant="dark" allowMultiple={false} />
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 9: SOFT CLOSING CTA & OFFICE INVITATION
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-br from-[#120C33] via-[#0E0926] to-[#070415] border border-white/15 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#402493]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/25">
                  <Sparkles className="w-3.5 h-3.5" />
                  Visit Our Kaduna Corporate Office
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  Protect Your Passport History.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                    Choose Legal Certainty.
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Whether you are planning study abroad, international skilled recruitment, or corporate expansion
                  into Europe, sit down with a certified compliance consultant who will evaluate your file with honesty.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href={ROUTES.consultation}
                    className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <span>Book advisory session</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={COMPANY.whatsapp.link}
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
                  {' '}· Independent travel advisory firm.
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
