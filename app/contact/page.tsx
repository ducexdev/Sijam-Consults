import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  PhoneCall,
  Scale,
  Building,
  Users,
  Globe2,
  FileText,
  BadgeCheck,
  Zap,
  HelpCircle,
  Shield,
  Send,
  Navigation,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { OfficeLocationHub } from '@/components/contact/OfficeLocationHub';
import { ContactForm } from '@/components/contact/ContactForm';
import { COMPANY, ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Contact Sijam Consults | Kaduna & Abuja Office Desks',
  description:
    'Get in touch with Sijam Consults Limited. Visit our corporate office in Kaduna or reach our Abuja advisory desk via official phone, email, or WhatsApp.',
  keywords: [
    'contact sijam consults limited',
    'sijam consults office address kaduna',
    'sijam consults abuja phone number',
    'immigration consultancy office in kaduna',
    'reach sijam consults customer advisory desk',
    'travel agency in kaduna',
    'visa consultant kachia road kaduna',
    'Sijam Consults Limited CAC RC 1715416',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/contact',
  },
};

const CONTACT_FAQS: AccordionItem[] = [
  {
    question: 'Where is the physical corporate headquarters of Sijam Consults Limited located?',
    answer: `Our corporate headquarters is located at The Lord's Doing Plaza, No. 2/4, Suite A10, 2nd Floor, Kachia Road, Ungwan Boro (Directly opposite Our Lady of Fatima Catholic Church), P.O. Box 12962, Kaduna State, Nigeria. We maintain permanent, physical executive offices where clients can walk in for document verifications, contract reviews, and in-person consultations.`,
  },
  {
    question: 'Do I need an appointment before visiting your Kaduna corporate office?',
    answer: `While walk-in clients are welcome during official business hours (Monday to Friday, 9:00 AM – 5:00 PM; Saturday, 10:00 AM – 2:00 PM), we strongly encourage scheduling an appointment in advance. Pre-booking ensures that the specific senior specialist overseeing your pathway (study abroad, European work permits, or consular file audits) is available and has reviewed your preliminary case details.`,
  },
  {
    question: 'How does Sijam Consults operate in Abuja for embassy biometrics and consular submissions?',
    answer: `We operate a dedicated Consular & Diplomatic Liaison Desk in Abuja FCT. Our Abuja desk manages document legalization at the Ministry of Foreign Affairs (MFA Abuja), coordinates Federal Ministry of Education (FME) authentications, schedules VFS/TLS biometric appointments, and provides in-person consular escort for clients submitting visas at sovereign embassies across the Central Business District and Diplomatic Zone.`,
  },
  {
    question: 'What is your response time Service Level Agreement (SLA) for online inquiries?',
    answer: `Every online inquiry transmitted through our official portal is acknowledged immediately and assigned to a relevant documentation counselor. During regular business hours (Monday to Friday, 9:00 AM – 5:00 PM WAT), our client relations desk delivers an initial case evaluation and callback within 2 business hours. For urgent weekend matters, our verified WhatsApp concierge operates with priority triage.`,
  },
  {
    question: 'Can clients outside Kaduna or based in the diaspora consult with Sijam Consults remotely?',
    answer: `Yes. Over 50% of our active casework serves clients residing across Lagos, Abuja, Port Harcourt, Kano, and international diaspora communities in the UK, US, Canada, and Europe. We run secure high-definition virtual strategy sessions via Google Meet and Zoom, supported by digital document transmission, formal retainer agreements, and real-time casework tracking.`,
  },
  {
    question: 'How do I ensure I am paying into the legitimate corporate bank account of Sijam Consults?',
    answer: `Sijam Consults Limited (CAC RC: 1715416) never accepts payments into individual personal bank accounts. All advisory retainers, document evaluation fees, and corporate invoices must be settled exclusively into our verified corporate bank accounts bearing the legal business name "Sijam Consults Limited". Official receipts and written retainer contracts are issued for every transaction.`,
  },
];

const COMMUNICATION_TIERS = [
  {
    icon: Building,
    title: 'Kaduna Executive Chambers',
    badge: 'Physical Walk-Ins',
    badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    description: "The Lord's Doing Plaza, No. 2/4, Suite A10, 2nd Floor, Kachia Road, Ungwan Boro, Kaduna. Open for physical document audits and 1-on-1 strategy sessions.",
    actionText: 'View Office Coordinates',
    href: '#office-locations',
  },
  {
    icon: MapPin,
    title: 'Abuja Consular Liaison Desk',
    badge: 'MFA & Biometrics',
    badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    description: 'Central Business District & Diplomatic Zone liaison. Coordinates Ministry of Foreign Affairs (MFA) attestations, VFS biometrics, and embassy submissions.',
    actionText: 'View Abuja Protocol',
    href: '#office-locations',
  },
  {
    icon: MessageSquare,
    title: 'Encrypted WhatsApp Concierge',
    badge: 'Priority Response',
    badgeColor: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
    description: 'Direct priority channel with our senior client relations team. Instant triage, quick credential feedback, and consultation scheduling.',
    actionText: 'Launch WhatsApp Chat',
    href: COMPANY.whatsapp.link,
    external: true,
  },
];

const TRIAGE_STEPS = [
  {
    step: 1,
    title: 'Inquiry Intake & Verification',
    timeline: '0–30 Minutes',
    desc: 'Your submitted inquiry or WhatsApp dispatch is logged into our secure intake registry. Our triage desk validates your contact details and checks case scope.',
    icon: FileText,
  },
  {
    step: 2,
    title: 'Specialist Assignment',
    timeline: '30–60 Minutes',
    desc: 'Your file is routed to the dedicated department head (Admissions, Work Permits, or Consular Auditing) based on your target corridor and timeline.',
    icon: Users,
  },
  {
    step: 3,
    title: 'Diagnostic Pre-Assessment',
    timeline: 'Under 2 Hours',
    desc: 'The senior counselor evaluates your academic background, professional credentials, or refusal history against current sovereign immigration gazettes.',
    icon: BadgeCheck,
  },
  {
    step: 4,
    title: 'Actionable Strategic Callback',
    timeline: 'Same Day',
    desc: 'You receive a structured phone call or comprehensive digital briefing outlining your qualification score, statutory document checklist, and recommended next steps.',
    icon: PhoneCall,
  },
];

const LEGITIMACY_CHECKPOINTS = [
  {
    title: 'Corporate Affairs Commission (CAC) Search',
    detail: 'Verify company incorporation on search.cac.gov.ng. Sijam Consults Limited is registered under RC: 1715416 with verified active status.',
    riskAvoided: 'Prevents dealing with unregistered fly-by-night operators.',
  },
  {
    title: 'Permanent Physical Commercial Lease',
    detail: "Verify a real office address with physical signage, meeting rooms, and staff. Sijam operates permanently at The Lord's Doing Plaza on Kachia Road, Kaduna.",
    riskAvoided: 'Prevents dealing with ghost agents operating only from temporary social media handles.',
  },
  {
    title: 'Corporate Commercial Bank Invoicing',
    detail: 'All fees must be payable strictly to corporate bank accounts in the company’s registered name. Never transfer funds to personal individual accounts.',
    riskAvoided: 'Eliminates untraceable cash transfers and personal account diversion scams.',
  },
  {
    title: 'Direct Bilateral Agreements & Quotas',
    detail: 'Demand proof of direct university agency agreements (e.g. Cyprus West University) or verified foreign employer labor quota allocations.',
    riskAvoided: 'Stops inflated sub-agent markups and counterfeit offer letters.',
  },
];

export default function ContactPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CONTACT_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    description:
      'Accredited educational advisory, foreign work permit documentation, and visa file auditing firm based in Kaduna, Nigeria.',
    telephone: COMPANY.phones.primary,
    email: COMPANY.emails.primary,
    url: 'https://sijamconsults.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Lord’s Doing Plaza, No. 2/4, Suite A10, 2nd Floor, Kachia Road, Ungwan Boro',
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      addressCountry: 'NG',
      postalCode: '800283',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.4682,
      longitude: 7.4244,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
  };

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BreadcrumbSchema items={[{ label: 'Contact Us', href: ROUTES.contact }]} />

      {/* ── HERO SECTION (2-COLUMN OPPOSITE LAYOUT) ─────────────────────── */}
      <section className="relative bg-[#070415] text-white overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Background ambient layers */}
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

            {/* LEFT COLUMN: Trust, Headline, Subtext, Social Proof & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <Breadcrumbs items={[{ label: 'Contact Us', href: ROUTES.contact }]} />

              {/* Trust badge strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[10px] font-black uppercase tracking-widest text-purple-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse" />
                  Corporate Office &amp; Advisory Desks
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-[#4DA5EC]" />
                  CAC RC: {COMPANY.cacNumber}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  2-Hour Response SLA
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                Connect With Sijam Consults —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Verified Corporate Presence
                </span>{' '}
                in Kaduna &amp; Abuja
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Real immigration guidance requires institutional precision, verifiable office locations, and licensed accountability. Visit our corporate chambers in Kaduna, reach our Abuja consular liaison desk, or dispatch your inquiry online for guaranteed direct counsel.
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
                  <strong className="text-white">Physical consultations &amp; nationwide remote advisory</strong> delivered with complete NDPR compliance
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Dispatch online inquiry</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`tel:${COMPANY.phones.primary}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Call primary hotline</span>
                </a>
                <a
                  href={COMPANY.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Active Desks Pill Bar */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Active advisory desks:</span>
                {[
                  'Kaduna Headquarters (Kachia Rd)',
                  'Abuja Consular Liaison Desk',
                  'Diaspora Remote Portal (UK/EU/US)',
                  'Direct Phone Hotlines',
                ].map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Visual Corporate Office Credentials HUD & Live SLA Response Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#0B071E] p-5 space-y-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#4DA5EC]/15 flex items-center justify-center">
                      <Building className="w-3.5 h-3.5 text-[#4DA5EC]" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Verified Corporate Credentials
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Open &amp; Operating
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Corporate Headquarters
                    </div>
                    <div className="text-xs font-bold text-white leading-relaxed">
                      {COMPANY.address.suite}, {COMPANY.address.building}, {COMPANY.address.city}, {COMPANY.address.state}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      The Lord&apos;s Doing Plaza (Opposite Our Lady of Fatima)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Hotline</div>
                      <a href={`tel:${COMPANY.phones.primary}`} className="text-xs font-bold text-[#4DA5EC] hover:underline">
                        {COMPANY.phones.primary}
                      </a>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official Email</div>
                      <a href={`mailto:${COMPANY.emails.primary}`} className="text-xs font-bold text-slate-200 hover:text-white truncate block">
                        {COMPANY.emails.primary}
                      </a>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Hours</div>
                      <div className="text-xs font-medium text-slate-200">{COMPANY.hours}</div>
                    </div>
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                </div>

                <div className="pt-2 text-center text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">✓ Client Protection Guarantee:</span> In-person document review &amp; formal corporate invoicing
                </div>
              </div>

              {/* 2 Quick proof cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4DA5EC]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#4DA5EC]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#4DA5EC]">CAC RC: 1715416</div>
                    <div className="text-[10px] text-slate-400">Licensed advisory</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-emerald-400">Under 2 Hours</div>
                    <div className="text-[10px] text-slate-400">Average response SLA</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOOK / PROBLEM EXPLANATION: THE GHOST AGENCY PHENOMENON ──────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DC2F11]/10 border border-[#DC2F11]/30 text-[11px] font-black uppercase tracking-widest text-red-300">
              <AlertTriangle className="w-3 h-3" />
              The Ghost Agency Risk
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
              Why Hundreds of Nigerians Lose Millions to Unreachable Travel Agents
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              You transferred funds to an &ldquo;agent&rdquo; you met online. When your visa got delayed or refused, their phone lines went dead, their WhatsApp profile disappeared, and you discovered they had no real physical office anywhere in Nigeria.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Over 65% of immigration fraud complaints lodged with consumer protection bodies involve virtual &ldquo;ghost consultants&rdquo; operating solely through social media adverts and individual bank accounts. Without a verified physical corporate address, corporate bank invoicing, and verifiable regulatory registration, clients have zero legal recourse when things go wrong.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              At Sijam Consults Limited, we believe immigration counsel demands <strong className="text-white">absolute institutional visibility</strong>. You can walk into our Kaduna executive offices, meet our documentation counselors face-to-face, inspect your physical files, and pay exclusively into corporate accounts backed by Nigerian company law.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3-TIER CLIENT COMMUNICATION CHANNELS ─────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <Users className="w-3 h-3" />
              Structured Channels
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              3 Direct Ways to Engage Our Advisory Team
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Choose the communication channel that best matches your location, urgency, and documentation needs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMMUNICATION_TIERS.map((tier) => (
              <div
                key={tier.title}
                className="p-6 rounded-2xl bg-[#070415] border border-white/[0.06] hover:border-white/[0.15] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#4DA5EC]/10 flex items-center justify-center shrink-0">
                      <tier.icon className="w-5 h-5 text-[#4DA5EC]" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white">{tier.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{tier.description}</p>
                </div>

                <div className="pt-2">
                  {tier.external ? (
                    <a
                      href={tier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#4DA5EC] hover:text-white font-bold transition-colors"
                    >
                      <span>{tier.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={tier.href}
                      className="inline-flex items-center gap-1.5 text-xs text-[#4DA5EC] hover:text-white font-bold transition-colors"
                    >
                      <span>{tier.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE OFFICE LOCATION & ROUTING HUB ─────────────────────── */}
      <section id="office-locations" className="bg-[#070415] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <OfficeLocationHub />
        </div>
      </section>

      {/* ── HIGH-PRECISION INQUIRY FORM & OFFICE CREDENTIALS ────────────── */}
      <section id="contact-form" className="bg-[#0B071E] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Direct Dispatches & Operating Standards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
                  <ShieldCheck className="w-3 h-3" />
                  Casework Submission
                </span>
                <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
                  Reach Our Client Relations Desk
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every inquiry submitted here enters our secure triage system and is reviewed by senior counselors before callback.
                </p>
              </div>

              {/* Direct Details Box */}
              <div className="p-6 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#4DA5EC]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#4DA5EC]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct Hotlines</div>
                    <div>
                      <a href={`tel:${COMPANY.phones.primary}`} className="text-xs font-bold text-white hover:text-[#4DA5EC]">
                        {COMPANY.phones.primary}
                      </a>{' '}
                      <span className="text-[10px] text-slate-400">(Primary Executive)</span>
                    </div>
                    <div>
                      <a href={`tel:${COMPANY.phones.secondary}`} className="text-xs font-bold text-white hover:text-[#4DA5EC]">
                        {COMPANY.phones.secondary}
                      </a>{' '}
                      <span className="text-[10px] text-slate-400">(Advisory Desk)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-white/[0.04]">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Departmental Emails</div>
                    <div>
                      <a href={`mailto:${COMPANY.emails.primary}`} className="text-xs font-bold text-white hover:text-[#4DA5EC]">
                        {COMPANY.emails.primary}
                      </a>{' '}
                      <span className="text-[10px] text-slate-400">(General Inquiries)</span>
                    </div>
                    <div>
                      <a href={`mailto:${COMPANY.emails.admissions}`} className="text-xs font-bold text-white hover:text-[#4DA5EC]">
                        {COMPANY.emails.admissions}
                      </a>{' '}
                      <span className="text-[10px] text-slate-400">(Study Abroad &amp; CWU)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-white/[0.04]">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Office Hours (WAT)</div>
                    <div className="text-xs font-medium text-slate-200">Monday – Friday: 9:00 AM – 5:00 PM</div>
                    <div className="text-xs font-medium text-slate-200">Saturday: 10:00 AM – 2:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <a
                href={COMPANY.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600/20 via-emerald-700/20 to-emerald-800/10 border border-emerald-500/30 flex items-center justify-between group hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-emerald-300">Fast-Track Channel</div>
                    <div className="text-sm font-bold text-white">Chat on WhatsApp Concierge</div>
                    <div className="text-[11px] text-slate-400">Direct connection to senior case officers</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Column: High-Precision Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── 4-STAGE INQUIRY TRIAGE PROTOCOL ──────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <Zap className="w-3 h-3" />
              Response SLA
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              What Happens After You Contact Us?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Our 4-stage client intake protocol ensures every inquiry receives thorough, specialist review rather than automated brush-offs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRIAGE_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-[#0B071E] border border-white/[0.06] hover:border-white/[0.15] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#4DA5EC]/10 flex items-center justify-center shrink-0">
                      <step.icon className="w-4 h-4 text-[#4DA5EC]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Stage {step.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-2 border-t border-white/[0.04] text-[11px] font-mono font-bold text-emerald-400">
                  SLA: {step.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFORMATION GAIN: CORPORATE LEGITIMACY CHECKLIST ─────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-black uppercase tracking-widest text-emerald-300">
              <Scale className="w-3 h-3" />
              Information Gain: Client Protection
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              How to Verify Any Travel Consultant in Nigeria Before Paying
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Before paying any consultation fee or processing retainer to any agency, run this 4-point legitimacy test:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {LEGITIMACY_CHECKPOINTS.map((check) => (
              <div
                key={check.title}
                className="p-6 rounded-2xl bg-[#070415] border border-white/[0.06] hover:border-white/[0.15] transition-all space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-white">{check.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{check.detail}</p>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] text-slate-400">
                  <strong className="text-slate-300">Protection Earned:</strong> {check.riskAvoided}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WE MAY NOT BE RIGHT FOR YOU IF... ───────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl bg-[#0B071E] border border-amber-500/25 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                  We May Not Be Right For You If…
                </h3>
                <p className="text-xs text-slate-400">
                  We believe in establishing transparent operational boundaries from your very first message.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {[
                'You want someone to provide fake bank statements, counterfeit employment letters, or falsified tax certificates (we maintain an absolute zero-tolerance policy against document fabrication).',
                'You demand a 100% guarantee of visa approval before filing (visa issuance is the sovereign prerogative of foreign embassies; ethical consultants only promise rigorous procedural precision).',
                'You are looking for unverified "backdoor" travel arrangements without legal work permits or accredited university offer letters.',
                'You prefer informal cash transactions without corporate invoicing or legal retainer contracts.',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <HelpCircle className="w-3 h-3" />
              Client Questions
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Frequently Asked Questions About Contacting Us
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Clear answers regarding physical office visits, response times, and casework triage.
            </p>
          </div>
          <Accordion items={CONTACT_FAQS} />
        </div>
      </section>

      {/* ── STATUTORY LEGAL NOTICE ───────────────────────────────────────── */}
      <section className="bg-[#070415] py-8 border-b border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B071E] border border-white/[0.06]">
            <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Statutory Notice:</strong> Sijam Consults Limited (CAC RC: 1715416) is a registered Nigerian educational advisory and travel facilitation consultancy. We are NOT an embassy, high commission, or consular visa-issuing authority. The final grant or refusal of any visa or permit remains the sovereign legal prerogative of foreign governments. We strictly prohibit and reject any falsified documentation.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CONVERSION CTA ────────────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-300">
              Begin Your Relocation Strategy
            </span>
          </div>
          <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
            Ready to Speak With a Verified Advisor?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Visit Our Chambers or Connect Online.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you want an in-person file audit at our Kaduna office or a fast-track virtual strategy session, our senior counselors are ready to assist you under our 2-hour response SLA.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={ROUTES.consultation}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book formal consultation</span>
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
              href={COMPANY.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-500">
            {COMPANY.address.suite}, {COMPANY.address.building}, {COMPANY.address.city}, {COMPANY.address.state} • {COMPANY.phones.primary} • {COMPANY.emails.primary}
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
