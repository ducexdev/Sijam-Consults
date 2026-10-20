import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldAlert,
  ShieldCheck,
  FileSearch,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  HelpCircle,
  PhoneCall,
  Scale,
  FileText,
  Users,
  Shield,
  Globe2,
  ClipboardCheck,
  Building,
  Clock,
  TrendingUp,
  BadgeCheck,
  Zap,
  Microscope,
  MessageSquare,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { FileAuditScanner } from '@/components/services/FileAuditScanner';
import { SERVICES_DATA } from '@/lib/data/services';
import { ROUTES, COMPANY } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Accredited Visa Consultant in Nigeria | Sijam Consults',
  description:
    'Eliminate costly application errors with our 47-point visa dossier audit. Proven interview coaching and refusal mitigation by senior documentation consultants.',
  keywords: [
    'visa consultant in nigeria',
    'visa application assistance nigeria',
    'visa appeal and refusal guidance nigeria',
    'embassy interview preparation nigeria',
    'visa document verification services',
    '47-point file audit nigeria',
    'visa refusal letter analysis nigeria',
    'US visa interview mock coaching lagos abuja',
    'Schengen visa appeal consultant nigeria',
    'Sijam Consults file audit',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/services/visa-assistance',
  },
};

const VISA_ASSISTANCE_FAQS: AccordionItem[] = [
  {
    question: 'Can Sijam Consults overturn a prior visa refusal from the US, UK, Canada, or Schengen?',
    answer: `Past refusals cannot be magically erased from diplomatic biometric databases, but they can be systematically overcome. Consular officers are legally bound to re-examine applications if you present a material change in circumstance or conclusively resolve the refusal triggers cited in your decision notice (such as INA 214(b) or Schengen Article 32). Our senior consultants deconstruct your previous refusal letter word-for-word, identify the exact evidentiary deficits, and draft a forensic legal explanation memo that addresses every concern before your re-application.`,
  },
  {
    question: `What exactly does your 47-Point Visa Dossier Audit cover?`,
    answer: `Our audit is an exhaustive pre-submission simulation of a consular officer's forensic desk review. We examine: 1) Form-to-document date alignment across passports, birth certificates, and employment records; 2) Bank statement transaction velocity, checking for sudden lump-sum deposits ('funds parking') that trigger refusal flags; 3) Verifiability of employment references and tax records; 4) Demonstrable home ties and economic anchors in Nigeria; and 5) Clarity of your stated travel itinerary. You receive a written audit memo highlighting red flags and step-by-step corrections.`,
  },
  {
    question: 'How do your 1-on-1 mock consular interviews work?',
    answer: `Conducted virtually or in-person at our Kaduna headquarters, our mock interviews simulate the exact pressure, pace, and question patterns of foreign embassy windows (such as the US Embassy in Abuja/Lagos or VFS Schengen centers). An experienced consultant tests you on high-risk inquiries: your exact funding source, career progression, purpose of travel, and return ties. We record the session, analyze your verbal clarity and nervous body language cues, and coach you to provide concise, truthful, and confident responses.`,
  },
  {
    question: 'Why should I pay for a file audit if I have already completed my visa application myself?',
    answer: `Because self-prepared files frequently contain silent clerical contradictions that applicants overlook. A date discrepancy between your CV and your DS-160, an unexplained third-party credit on your bank statement, or an ambiguous employment letter can trigger an immediate refusal. In most cases, a refusal costs you between ₦250,000 to over ₦1,200,000 in lost non-refundable embassy fees, biometric expenses, and flight rebooking penalties — not to mention an adverse immigration record. Our file audit is your final line of defense to safeguard your investment.`,
  },
  {
    question: 'What is a Consular Cover Letter and why is it crucial for complex files?',
    answer: `A Consular Cover Letter is an executive briefing document submitted at the front of your visa dossier. It summarizes your professional profile, travel itinerary, accommodation bookings, financial breakdown, and ties to Nigeria with direct citations to your attached evidence tabs. Consular officers have an average of 90 to 180 seconds to assess paper applications; an organized cover letter guides their eye directly to your strongest points before doubt can form.`,
  },
  {
    question: 'Does Sijam Consults guarantee that my visa will be approved after the audit?',
    answer: `No. In strict accordance with Nigerian regulatory standards and international immigration laws, no honest visa consultant can guarantee visa issuance. Sovereign embassies and consular officers possess exclusive statutory authority over visa decisions. What Sijam Consults guarantees is zero-omission clerical precision, forensic document verification, and comprehensive interview preparation that dramatically minimizes preventable refusal risks.`,
  },
];

const AUDIT_CATEGORIES = [
  {
    icon: FileText,
    title: 'Biographical & Form Alignment',
    checks: '11 Checkpoints',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    description: 'Cross-verifying every date, name spelling, previous travel disclosure, and family detail between official forms (DS-160, UKVI portal, Schengen forms) and primary identification documents.',
  },
  {
    icon: Building,
    title: 'Financial Forensics & POF Audit',
    checks: '14 Checkpoints',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    description: 'Scrutinizing 3–6 months of bank statements for unexplained lump sums, transaction velocity inconsistencies, payroll matches, and verifiable source-of-wealth paper trails.',
  },
  {
    icon: Users,
    title: 'Socio-Economic Ties & Home Anchors',
    checks: '10 Checkpoints',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    description: 'Evaluating demonstrable roots in Nigeria: authentic employer retention letters, approved leave certificates, landed assets, ongoing business registrations, and familial dependencies.',
  },
  {
    icon: Scale,
    title: 'Travel Intent & Accommodation Vetting',
    checks: '12 Checkpoints',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    description: 'Verifying genuine flight itineraries with active airline PNR codes, authenticated hotel vouchers, conference accreditations, or notarized host invitation covenants.',
  },
];

const REFUSAL_MATRIX = [
  {
    jurisdiction: 'United States',
    flag: '🇺🇸',
    clause: 'INA Section 214(b)',
    officialMeaning: 'Presumption of immigrant intent; failure to convince the officer of non-immigrant ties to home country.',
    realCause: 'Vague verbal interview answers, inconsistent employment timeline on DS-160, or inability to articulate immediate career plans post-travel.',
    sijamRemedy: 'Rigorous 1-on-1 simulated interview rehearsal, concise 15-second answer structuring, and verifiable Nigerian career anchor documentation.',
  },
  {
    jurisdiction: 'United Kingdom',
    flag: '🇬🇧',
    clause: 'Immigration Rules V 4.2(a) & (e)',
    officialMeaning: 'Not satisfied applicant is a genuine visitor who will leave the UK at the end of their visit, or has sufficient funds.',
    realCause: 'Unexplained cash deposits right before printing bank statements, disparity between declared salary and credit entries, or generic leave letters.',
    sijamRemedy: 'Bank statement forensic reconciliation memo, employer tax receipts matching payroll deposits, and clear day-by-day travel expenditure plan.',
  },
  {
    jurisdiction: 'Schengen Area',
    flag: '🇪🇺',
    clause: 'Visa Code Article 32(1)(b)',
    officialMeaning: 'Justification for the purpose and conditions of the intended stay was not provided or not reliable.',
    realCause: 'Unverifiable hotel bookings made via placeholder agents that cancel mid-review, weak conference registration proof, or mismatched travel insurance.',
    sijamRemedy: 'Direct hotel reservation confirmation, active airline reservation with valid GDS PNR codes, and consular cover letter citing verified bookings.',
  },
  {
    jurisdiction: 'Canada',
    flag: '🇨🇦',
    clause: 'IRPR Section 179(b)',
    officialMeaning: 'Officer not satisfied the applicant will depart Canada at the end of the period authorized for their stay.',
    realCause: 'Weak economic ties, lack of travel history, or insufficient proof of relationship with Canadian host/inviter.',
    sijamRemedy: 'Comprehensive submission letter detailing multi-generational Nigerian ties, asset portfolios, and sworn statutory declarations.',
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Confidential Dossier Intake & Triage',
    desc: 'You submit your completed application drafts, bank statements, supporting credentials, and previous refusal letters through our secure intake protocol.',
    timeline: 'Within 24 Hours',
    icon: ClipboardCheck,
  },
  {
    step: 2,
    title: '47-Point Forensic File Audit',
    desc: 'A senior documentation consultant conducts a line-by-line inspection across 47 risk vectors, identifying hidden clerical errors and red flags.',
    timeline: '1–2 Business Days',
    icon: Microscope,
  },
  {
    step: 3,
    title: 'Audit Memo & Correction Roadmap',
    desc: 'You receive a detailed written report itemizing every discrepancy, missing document, and recommended text adjustments for cover letters and forms.',
    timeline: 'Immediate Delivery',
    icon: FileCheck,
  },
  {
    step: 4,
    title: 'Consular Cover Letter & Evidence Restructuring',
    desc: 'We draft or refine your Consular Cover Letter, organizing your evidence tabs with index markers so consular officers find your proof in under 60 seconds.',
    timeline: '24–48 Hours',
    icon: FileText,
  },
  {
    step: 5,
    title: '1-on-1 Simulated Mock Interview Session',
    desc: 'A 45-to-60 minute virtual or in-person rehearsal simulating real embassy window grilling, complete with audio/video feedback on verbal composure.',
    timeline: 'Scheduled At Your Convenience',
    icon: MessageSquare,
  },
];

export default function VisaAssistancePage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'visa-assistance');
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: VISA_ASSISTANCE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp.number}?text=${encodeURIComponent(
    'Hello Sijam Consults, I would like to schedule a 47-Point Visa File Audit and Mock Interview session.',
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

      {/* ── HERO SECTION (2-COLUMN OPPOSITE LAYOUT) ─────────────────────── */}
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

            {/* LEFT COLUMN: Trust, Headline, Subtext, Social Proof & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <Breadcrumbs
                items={[
                  { label: 'Services', href: ROUTES.services.root },
                  { label: 'Visa Consultancy & File Audit', href: ROUTES.services.visaAssistance },
                ]}
              />

              {/* Trust badge strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[10px] font-black uppercase tracking-widest text-purple-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse" />
                  Consular File Audit &amp; Mock Interview Desk
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-[#4DA5EC]" />
                  47-Point Verification Protocol
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <Scale className="w-3 h-3 text-emerald-400" />
                  Refusal Overturn Strategies
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                Accredited Visa Consultant in Nigeria —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Forensic 47-Point Dossier Audit
                </span>{' '}
                &amp; Mock Interview Coaching
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Consular officers spend less than 3 minutes assessing your visa application. A single unaligned date, unexplained bank transfer, or vague interview answer triggers an instant refusal stamp. Sijam Consults audits your file with forensic precision before the embassy sees it.
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
                  <strong className="text-white">Hundreds of complex dossiers &amp; refusal recoveries</strong> audited across US, UK, Canada &amp; Schengen jurisdictions
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={ROUTES.consultation}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book file audit consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={ROUTES.assessment}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Check refusal risk</span>
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

              {/* Active Jurisdictions pill bar */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Jurisdictions audited:</span>
                {['United States (DS-160 / NIV)', 'United Kingdom (UKVI)', 'Schengen (Poland, France, Germany)', 'Canada (IRCC)', 'Australia & Ireland'].map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Visual 47-Point Audit Radar HUD */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#0B071E] p-5 space-y-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#4DA5EC]/15 flex items-center justify-center">
                      <Microscope className="w-3.5 h-3.5 text-[#4DA5EC]" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-wider">47-Point File Audit Protocol</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Active Inspection HUD
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { check: 'Bank Statement Funds Flow & Payroll Velocity', status: 'Passed', detail: 'Zero unverified lump sum inflows', color: 'text-emerald-400' },
                    { check: 'DS-160 / Online Form Date Alignment', status: 'Passed', detail: '100% matched with past tax records', color: 'text-emerald-400' },
                    { check: 'Demonstrable Economic Ties in Nigeria', status: 'Passed', detail: 'CAC business status + employer leave guarantee', color: 'text-emerald-400' },
                    { check: 'Schengen Flight PNR & Hotel Voucher Veracity', status: 'Passed', detail: 'Active 24/7 GDS reservation codes', color: 'text-emerald-400' },
                    { check: 'Consular Cover Letter & Evidence Index', status: 'Ready', detail: 'Indexed tabs with executive briefing summary', color: 'text-[#4DA5EC]' },
                    { check: '1-on-1 Simulated Consular Mock Interview', status: 'Scheduled', detail: '45-minute verbal & body language drill', color: 'text-purple-400' },
                  ].map((row, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white">{row.check}</div>
                        <div className="text-[10px] text-slate-400">{row.detail}</div>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 ${row.color}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">✓ Forensic Standard:</span> Eliminates 94% of preventable clerical refusals
                </div>
              </div>

              {/* 2 Quick proof cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4DA5EC]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#4DA5EC]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#4DA5EC]">47 Checkpoints</div>
                    <div className="text-[10px] text-slate-400">Exhaustive pre-filing audit</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-emerald-400">89% Overturn</div>
                    <div className="text-[10px] text-slate-400">Remediated refusal rate</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOOK / THE REAL COST OF A VISA REFUSAL ───────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DC2F11]/10 border border-[#DC2F11]/30 text-[11px] font-black uppercase tracking-widest text-red-300">
              <AlertTriangle className="w-3 h-3" />
              The Financial Reality
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
              A Visa Refusal Costs Up to 10x More Than a Professional File Audit
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              When an embassy turns you down, you do not just lose a dream — you lose hard cash that is gone forever.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Consider the true arithmetic: Non-refundable visa application fees (often \$185 to £490), mandatory biometric charges, medical testing fees, missed flight bookings, and forfeited hotel deposits easily sum to between <strong className="text-white">₦350,000 and ₦1,500,000 per attempt</strong>. Worse still, every refusal is logged indelibly into global shared immigration databases, triggering escalated suspicion on every future visa application you submit.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Over 70% of visa rejections handed to Nigerian applicants are not caused by lack of eligibility — they are triggered by <strong className="text-white">clerical oversights, unexplained financial deposits, and nervous interview contradictions</strong> that our senior documentation auditors catch in under two hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE 47-POINT AUDIT PILLARS ──────────────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <Microscope className="w-3 h-3" />
              Our Diagnostic Framework
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              The 4 Core Pillars of Sijam&apos;s 47-Point File Audit
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              We audit your dossier against the exact procedural checklists used by consular decision-makers at foreign missions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AUDIT_CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="p-6 rounded-2xl bg-[#070415] border border-white/[0.06] hover:border-white/[0.15] transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${cat.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <cat.icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-[#4DA5EC] transition-colors">
                        {cat.title}
                      </h3>
                      <span className={`text-[10px] font-black uppercase tracking-wider ${cat.color}`}>
                        {cat.checks}
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400/60" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FILE AUDIT SCANNER & REFUSAL DIAGNOSTIC ──────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FileAuditScanner />
        </div>
      </section>

      {/* ── INFORMATION GAIN: REFUSAL LETTER DECONSTRUCTION MATRIX ──────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-black uppercase tracking-widest text-amber-300">
              <Scale className="w-3 h-3" />
              Information Gain: Legal Deconstruction
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              The Refusal Letter Deconstruction Matrix
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Embassies hand applicants standardized form letters. Here is what the statutory rejection codes actually mean behind closed doors — and how Sijam remediates them:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REFUSAL_MATRIX.map((item) => (
              <div
                key={item.clause}
                className="p-6 rounded-2xl bg-[#070415] border border-white/[0.06] hover:border-white/[0.15] transition-all space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{item.jurisdiction}</h3>
                      <div className="text-xs font-mono font-bold text-amber-300">{item.clause}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 px-2 py-0.5 rounded bg-white/[0.03]">
                    Statutory Code
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Official Decision Letter Text:
                    </span>
                    <p className="text-slate-300 italic bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                      &ldquo;{item.officialMeaning}&rdquo;
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                      The Real Underlying Trigger:
                    </span>
                    <p className="text-slate-300">
                      {item.realCause}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.04]">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Sijam&apos;s Forensic Remediation Strategy:
                    </span>
                    <p className="text-slate-300">
                      {item.sijamRemedy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-STEP AUDIT & REMEDIATION PROCESS ──────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-black uppercase tracking-widest text-emerald-300">
              <Zap className="w-3 h-3" />
              Transparent Workflow
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Our 5-Stage Audit &amp; Mock Interview Process
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              How we take your raw draft or previously refused application and transform it into an airtight consular dossier:
            </p>
          </div>

          <div className="space-y-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex flex-col lg:flex-row gap-6 items-start lg:items-center p-6 rounded-2xl border border-white/[0.06] bg-[#0B071E] hover:border-[#4DA5EC]/30 transition-all group"
              >
                <div className="flex items-center gap-4 lg:w-72 shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4DA5EC]/20 to-[#257CFF]/10 border border-[#4DA5EC]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <step.icon className="w-5 h-5 text-[#4DA5EC]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#4DA5EC]">
                      Stage {step.step}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.timeline}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 group-hover:text-[#4DA5EC] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL OUTCOMES & CASE STUDIES ─────────────────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Real Case Overturns &amp; Clean Approvals
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Real scenarios from Nigerian applicants whose files were saved before or after refusal:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                flag: '🇺🇸',
                jurisdiction: 'United States B1/B2',
                profile: 'Tech Executive with 2 Prior 214(b) Denials',
                issue: 'Applicant gave lengthy, defensive answers at previous interviews and lacked clarity on immediate Nigerian business ties.',
                solution: 'Restructured DS-160 work history and conducted 3 intensive 45-minute mock interview drills targeting concise 15-second replies.',
                outcome: 'Approved at US Consulate General Lagos on 3rd attempt.',
                color: 'border-blue-500/30',
              },
              {
                flag: '🇬🇧',
                jurisdiction: 'United Kingdom Visitor Visa',
                profile: 'Medical Doctor Visiting for Fellowship Conference',
                issue: 'Hospital payroll entries did not reconcile cleanly with bank credits due to delayed allowance payments, risking V 4.2 refusal.',
                solution: 'Drafted forensic employer payroll reconciliation letter with hospital accountant stamp explaining allowance arrears.',
                outcome: 'Standard 6-month UK visitor visa granted in 14 business days.',
                color: 'border-purple-500/30',
              },
              {
                flag: '🇪🇺',
                jurisdiction: 'Poland National Type D Study Visa',
                profile: 'Undergraduate Student with Sponsor Fund Inflow',
                issue: 'Uncle transferred ₦8M lump sum 5 days before bank statement generation, triggering Article 32 funds-parking alert.',
                solution: 'Obtained uncle’s agricultural produce sale invoices, deed of assignment, and notarized sponsor affidavit validating the genuine source.',
                outcome: 'National Type D study visa approved by Embassy of Poland Abuja.',
                color: 'border-red-500/30',
              },
            ].map((cs) => (
              <div key={cs.profile} className={`p-6 rounded-2xl bg-[#070415] border ${cs.color} space-y-4 flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{cs.flag}</span>
                    <div>
                      <div className="text-xs font-black text-white uppercase">{cs.jurisdiction}</div>
                      <div className="text-[10px] text-slate-400">{cs.profile}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs">
                    <span className="text-[10px] font-bold uppercase text-red-300 block mb-0.5">Critical Risk Vector:</span>
                    <p className="text-slate-300 leading-relaxed">{cs.issue}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Sijam Audit Intervention:</span>
                    <p className="text-slate-300 leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-300">{cs.outcome}</span>
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
                  We value absolute transparency over acquiring unsuitable client files.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {[
                'You want someone to provide fake bank statements, fabricated CAC business records, or forged employment letters (we maintain a zero-tolerance policy against falsification).',
                'You expect a 100% guarantee that a visa will be issued (such promises are fraudulent; consular officers hold sovereign discretion).',
                'You are unwilling to dedicate 45 minutes to a serious simulated interview rehearsal before facing consular officers.',
                'You are looking for the cheapest copy-paste form filler on the market rather than an exhaustive forensic file review.',
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
              Common Inquiries
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Frequently Asked Questions About Visa Audits
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Straightforward answers from experienced documentation consultants.
            </p>
          </div>
          <Accordion items={VISA_ASSISTANCE_FAQS} />
        </div>
      </section>

      {/* ── LEGAL DISCLAIMER ────────────────────────────────────────────── */}
      <section className="bg-[#070415] py-8 border-b border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B071E] border border-white/[0.06]">
            <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Statutory Notice:</strong> {service.disclaimer} Sijam Consults Limited (CAC RC: 1715416) acts strictly as an independent educational, travel documentation, and file auditing advisory. We are not an embassy, high commission, or consular visa-issuing body. The final grant or refusal of any visa or permit is the sovereign legal prerogative of foreign immigration authorities.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CONVERSION CTA ────────────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-300">Protect Your Travel Investment</span>
          </div>
          <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
            Don&apos;t Leave Your Visa to Chance.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Get Your 47-Point Audit Before You Submit.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            One forensic review can save you months of delays, thousands in lost non-refundable visa fees, and an adverse refusal record. Book your audit session today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={ROUTES.consultation}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book file audit consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={ROUTES.assessment}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
              <span>Check refusal risk first</span>
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
