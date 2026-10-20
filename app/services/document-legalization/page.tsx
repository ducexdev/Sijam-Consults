import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileCheck2,
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
  Building,
  Calendar,
  Clock,
  Landmark,
  FileText,
  Building2,
  Stamp,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { LegalizationCalculator } from '@/components/services/LegalizationCalculator';
import { SERVICES_DATA } from '@/lib/data/services';
import { ROUTES, COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'Document Legalization & MFA Attestation | Sijam Consults',
  description:
    'Expedited document legalization, MFA Abuja authentication, and foreign embassy attestation for educational transcripts, corporate deeds, and police certificates.',
  keywords: [
    'document legalization services in nigeria',
    'mfa abuja authentication services',
    'apostille certificate nigeria',
    'embassy attestation services abuja',
    'police character certificate legalization',
    'ministry of foreign affairs abuja attestation',
    'degree legalization nigeria',
    'Sijam Consults Limited',
    'CAC RC: 1715416',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/services/document-legalization',
  },
  openGraph: {
    title: 'Document Legalization & MFA Attestation | Sijam Consults',
    description:
      'Expedited document legalization, MFA Abuja authentication, and foreign embassy attestation for educational transcripts, corporate deeds, and police certificates.',
    url: 'https://sijamconsults.com/services/document-legalization',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Document Legalization & MFA Attestation | Sijam Consults',
    description:
      'Expedited document legalization, MFA Abuja authentication, and foreign embassy attestation for educational transcripts, corporate deeds, and police certificates.',
  },
};

const LEGALIZATION_FAQS: AccordionItem[] = [
  {
    question: 'Can Nigerian documents receive a Hague Apostille certificate?',
    answer:
      'Nigeria is currently not a signatory to the 1961 Hague Apostille Convention. Consequently, Nigerian authorities cannot issue an Apostille stamp. Instead, Nigerian documents must undergo the statutory bilateral chain of legalization: High Court Notarization, followed by preliminary line ministry verification (such as the Federal Ministry of Education for academic records), authentication by the Ministry of Foreign Affairs (MFA Abuja), and final consular attestation at the destination country foreign embassy located in Abuja or Lagos.',
  },
  {
    question: 'How long does document authentication take at the Ministry of Foreign Affairs (MFA) Abuja?',
    answer:
      'Standard individual submissions made independently can take between 2 to 4 weeks due to long administrative queues and manual verification registers at the Federal Secretariat. Through our dedicated physical liaison desk in Abuja, Sijam Consults processes standard batches in 7 to 10 business days and express priority files in 3 to 5 business days, with physical hand-to-hand tracking.',
  },
  {
    question: 'Can laminated original certificates be authenticated by the MFA or foreign embassies?',
    answer:
      'No. Embassies and the MFA Legal Services Division reject laminated certificates because their physical seals, red ribbons, and wet-ink authentication stamps must be applied directly to the original parchment or paper stock. If your original document is already laminated, you must obtain a Certified True Copy (CTC) from the issuing university, board, or court, or order a replacement document before beginning the attestation sequence.',
  },
  {
    question: 'What is required to legalize a Police Character Certificate for overseas employment?',
    answer:
      'The Police Character Clearance must be issued by the Central Criminal Registry (CCR) of the Nigeria Police Force (CID Alagbon, Lagos or Force Headquarters, Abuja). The certificate must bear the biometric digital stamp and fingerprint capture. It is then taken through High Court attestation and presented to the Ministry of Foreign Affairs (MFA Abuja) for international legal validity. Note that foreign embassies generally consider police clearances valid for only 3 to 6 months from the date of issue.',
  },
  {
    question: 'Do academic degrees require Federal Ministry of Education (FME) authentication before the MFA?',
    answer:
      'Yes. The Ministry of Foreign Affairs will not authenticate university degrees, diplomas, or transcripts without an antecedent verification seal from the Federal Ministry of Education (FME) Evaluation and Accreditation Division in Abuja. For healthcare professionals, verification by the Medical and Dental Council of Nigeria (MDCN) or Nursing and Midwifery Council of Nigeria (NMCN) is additionally required before diplomatic stamping.',
  },
  {
    question: 'How do you guarantee the safety of my original irreplaceable documents?',
    answer:
      'We operate a strict Chain-of-Custody protocol. Each client file is cataloged in a tamper-evident serial-coded security envelope upon physical intake at our Kaduna or Abuja offices. Our bonded administrative officers carry out hand-to-hand delivery to ministry officials without relying on third-party municipal post. Clients receive written intake receipts and real-time tracking updates at every ministerial stage.',
  },
];

export default function DocumentLegalizationPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'document-legalization');
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: LEGALIZATION_FAQS.map((faq) => ({
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
          { label: 'Document Legalization & Attestation', href: '/services/document-legalization' },
        ]}
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
          {/* Mobile static fallback poster */}
          <div className="sm:hidden absolute inset-0">
            <Image
              src="/visas/2.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35 contrast-125"
            />
          </div>
          {/* Ambient Video on larger viewports */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/visas/2.png"
            className="hidden sm:block w-full h-full object-cover opacity-65 contrast-110 saturate-110"
            src={VIDEOS.DOCUMENT_LEGALIZATION}
            aria-hidden="true"
          />
          {/* Brand gradient scrims — transparent enough so video motion is visible */}
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
                { label: 'Document Legalization & Attestation' },
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
                    Trusted Documentation · Sijam Consults
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <Shield className="w-3 h-3 text-[#4DA5EC]" />
                    CAC RC: 1715416
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <Landmark className="w-3 h-3 text-[#4DA5EC]" />
                    Abuja Liaison Desk · FME &amp; MFA
                  </span>
                </div>

                {/* H1 — matches homepage font sizing exactly, crisp solid white text */}
                <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                  Document Legalization &amp; MFA Attestation Services in Nigeria: Secure Ministry Authentication &amp; Embassy Seals.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                  International universities, foreign employers, and sovereign immigration departments will reject unauthenticated Nigerian certificates. Sijam Consults Limited navigates the multi-tier government trail in Abuja on your behalf—securing High Court notarizations, Ministry of Education endorsements, Ministry of Foreign Affairs (MFA) diplomatic stamps, and bilateral embassy legalizations without risking the loss of your irreplaceable originals.
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
                    <strong className="text-white">Over 4,200 Official Files Authenticated</strong> across UAE, Europe, UK, Canada, and Asian consular jurisdictions
                  </p>
                </div>

                {/* CTA Buttons — exactly the homepage button style with First letter capitalized */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href={ROUTES.consultation}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Submit Documents For Legalization</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={ROUTES.assessment}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Calculate Processing Timeline</span>
                  </Link>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20have%20documents%20that%20need%20MFA%20Abuja%20legalization.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Chat On WhatsApp</span>
                  </a>
                </div>

                {/* Active Legalization Desks Pill Bar */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Active Desks:</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    MFA Abuja Legal Services
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    Federal Ministry of Education (FME)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    NPF CID Biometric Clearances
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-slate-300">
                    UAE, Italian &amp; Spanish Consular Sections
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN — Interactive Legalization Calculator Card */}
              <div className="lg:col-span-5">
                <LegalizationCalculator />
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 2: THE REAL-STAKES HOOK & PROBLEM EXPLANATION
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                The Real Risk You Face
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Why a Single Missing Seal Halts Your Relocation, Visa, or Foreign Employment.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#DC2F11]/20 border border-[#DC2F11]/40 flex items-center justify-center text-[#DC2F11]">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  The Bureaucratic Maze of Abuja
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Authentication in Nigeria is not a one-stop shop. A university degree requires validation at the Federal Ministry of Education in Block B, followed by transfer across town to the Ministry of Foreign Affairs in the Central Business District, before queuing at the target foreign embassy. Independent applicants waste days in gridlock and administrative confusion.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Counterfeit Roadside Stamps
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The perimeter outside government secretariats in Abuja is filled with unauthorized touts offering &ldquo;express same-day&rdquo; MFA stamps. Embassies inspect certificates under ultraviolet light and scan digital serial numbers. A forged stamp leads to immediate file refusal and potential 10-year visa bans for document fraud.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#257CFF]/20 border border-[#257CFF]/40 flex items-center justify-center text-[#4DA5EC]">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Loss of Irreplaceable Originals
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your university degree parchment, original WAEC certificate, or family court marriage registry deed are irreplaceable assets. Entrusting them to informal dispatch riders or unbonded middlemen with zero tracking guarantees carries intolerable risks of water damage, misplacement, or outright loss.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 3: INFORMATION GAIN #1 (Hague Apostille vs Bilateral Chain)
          ───────────────────────────────────────────────── */}
          <section className="mb-24 rounded-3xl bg-gradient-to-br from-[#402493]/20 via-white/[0.02] to-transparent border border-white/10 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-xs font-bold text-[#4DA5EC] mb-3">
                <Scale className="w-4 h-4" />
                <span>Information Gain · International Diplomatic Law</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The Hague Apostille Myth: Why Nigerian Documents Require Bilateral Legalization.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                Many Nigerian applicants fall victim to fraudulent agents promising an &ldquo;instant Apostille certificate for Nigeria.&rdquo; Here is the statutory reality that every overseas traveler, student, and business executive must understand.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="rounded-2xl bg-black/40 border border-white/10 p-7 space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5" />
                  <span>The Apostille Convention (1961 Hague Treaty)</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Why Nigeria Cannot Issue an Apostille
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Hague Apostille Convention abolishes the requirement of diplomatic or consular legalization for foreign public documents between contracting member states. <strong className="text-white">Nigeria is NOT a signatory to this treaty.</strong> Therefore, no statutory authority in Nigeria has the legal standing to issue an official Hague Apostille. Anyone selling an &ldquo;Apostille Stamp from Nigeria&rdquo; is providing a counterfeit document that foreign embassies and immigration bodies immediately flag.
                </p>
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
                  <strong>Practical Warning:</strong> Submitting a fabricated apostille to embassies in Italy, Germany, or the UAE results in criminal document fraud investigations under Section 467 of the Nigerian Criminal Code.
                </div>
              </div>

              <div className="rounded-2xl bg-[#257CFF]/10 border border-[#4DA5EC]/30 p-7 space-y-4">
                <div className="flex items-center gap-2 text-[#4DA5EC] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>The Legitimate Bilateral Chain of Legalization</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  How Foreign Sovereign States Legally Accept Nigerian Papers
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Because Nigeria is outside the Apostille framework, international law mandates the traditional 4-step bilateral legalization protocol. Every public or private document must trace an unbroken chain of statutory sovereignty:
                </p>
                <ul className="space-y-2 text-xs text-slate-200 pt-1">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#257CFF] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <span><strong>Notarization:</strong> A duly appointed Notary Public of the Supreme Court of Nigeria certifies the authenticity of the signatory.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#257CFF] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <span><strong>Line Ministry Verification:</strong> Federal Ministry of Education (FME) for academic credentials, or CAC for corporate records.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#257CFF] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <span><strong>MFA Abuja Legalization:</strong> The Legal Services Division of the Ministry of Foreign Affairs certifies the seals of the Notary and Line Ministry.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#257CFF] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                    <span><strong>Consular Super-Legalization:</strong> The destination country embassy in Abuja or Lagos stamps the document for valid international recognition.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 4: SERVICE DELIVERABLES (DOCUMENTS HANDLED)
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Comprehensive Coverage
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Official Documents We Authenticate, Legalize &amp; Attest.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                We manage physical submissions across ministerial divisions in Abuja for private individuals, international scholarship recipients, healthcare professionals, and corporate entities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: 'Academic Credentials',
                  lead: 'Federal Ministry of Education (FME) & MFA Abuja',
                  items: [
                    'University Degrees (B.Sc., M.Sc., Ph.D.)',
                    'Higher National Diplomas (HND & OND)',
                    'Official Academic Transcripts',
                    'WAEC, NECO & NABTEB Certificates',
                    'Nursing (NMCN) & Medical (MDCN) Licenses',
                  ],
                },
                {
                  icon: FileText,
                  title: 'Civil & Vital Records',
                  lead: 'National Population Commission (NPC) & Courts',
                  items: [
                    'NPC Birth Attestations & Birth Certificates',
                    'Federal Marriage Registry Certificates (Ikoyi / Abuja)',
                    'Statutory Affidavits of Single Status',
                    'Certificates of Origin & State Identification',
                    'Court Change of Name Deeds & Gazette Publications',
                  ],
                },
                {
                  icon: ShieldCheck,
                  title: 'Police Character Clearances',
                  lead: 'Nigeria Police Force (NPF) CID Alagbon & Abuja',
                  items: [
                    'Central Criminal Registry (CCR) Clearances',
                    'Biometric Digital Fingerprint Authentication',
                    'Expedited MFA Diplomatic Certification',
                    'Embassy-Specific Validity Tracking (3-6 Months)',
                    'Court Sworn Declarations of Clean Record',
                  ],
                },
                {
                  icon: Building2,
                  title: 'Corporate & Commercial Deeds',
                  lead: 'Corporate Affairs Commission (CAC) & Ministry of Justice',
                  items: [
                    'CAC Status Reports & Certificates of Incorporation',
                    'Certified True Copies of Memorandum & Articles (MEMART)',
                    'Board Resolutions & Powers of Attorney',
                    'Commercial Invoices & Certificates of Free Sale',
                    'Chamber of Commerce (NACCIMA) Legalizations',
                  ],
                },
                {
                  icon: Stamp,
                  title: 'Embassy Super-Legalization',
                  lead: 'Foreign Consulates & Bilateral Diplomatic Missions',
                  items: [
                    'UAE Embassy Abuja (MOFA UAE Electronic Validation)',
                    'Qatar, Saudi Arabia & Kuwait Consular Attestation',
                    'Italian Embassy (Dichiarazione di Valore & Translation)',
                    'Spanish Embassy Legalization & Consular Stamping',
                    'Chinese Embassy Authentication & Visa Section Filing',
                  ],
                },
                {
                  icon: Landmark,
                  title: 'Judicial & Notarial Services',
                  lead: 'Supreme Court Appointed Notaries & High Courts',
                  items: [
                    'Senior Notary Public Seals & Red Ribbon Binding',
                    'High Court Registry Oath Administration',
                    'Certified Sworn Translations (French, Spanish, Italian)',
                    'Custodian Affidavits & Power of Guardianship',
                    'Affidavits of Financial Sponsorship Support',
                  ],
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 backdrop-blur-md hover:border-[#4DA5EC]/40 transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#402493]/20 border border-purple-500/40 flex items-center justify-center text-[#4DA5EC] mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#4DA5EC] font-semibold mt-1 mb-4">
                        {card.lead}
                      </p>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <Link
                        href={ROUTES.consultation}
                        className="text-xs font-bold text-[#4DA5EC] hover:text-white flex items-center gap-1.5 transition-colors group"
                      >
                        <span>Submit for Intake</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 5: INFORMATION GAIN #2 (Abuja Ministry Jurisdiction Matrix)
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Information Gain · Procedural Transparency
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Abuja Ministry Jurisdiction Matrix: Which Department Handles What.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                Submitting a file to the wrong ministerial division causes weeks of dormant backlog. Here is the exact jurisdictional mapping utilized by our Abuja liaison desk.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04] text-white">
                    <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px] text-[#4DA5EC]">
                      Document Classification
                    </th>
                    <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px] text-slate-300">
                      Primary Line Authority
                    </th>
                    <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px] text-slate-300">
                      MFA Abuja Department
                    </th>
                    <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px] text-slate-300">
                      Standard Foreign Consular Destination
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">
                      University Degrees, Diplomas &amp; Transcripts
                    </td>
                    <td className="py-4 px-5">
                      Federal Ministry of Education (FME) Evaluation &amp; Accreditation Division, Abuja
                    </td>
                    <td className="py-4 px-5">Legal Services Division (Consular &amp; Legal)</td>
                    <td className="py-4 px-5">WES / CES, UK ENIC, Italian Embassy (Dichiarazione), UAE MOFA</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">
                      Birth Certificates &amp; Age Declarations
                    </td>
                    <td className="py-4 px-5">
                      National Population Commission (NPC) Headquarters &amp; High Court Registry
                    </td>
                    <td className="py-4 px-5">Diplomatic Authentication Desk</td>
                    <td className="py-4 px-5">Spanish, German, Canadian, Polish Consular Sections</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">
                      Police Character Certificate
                    </td>
                    <td className="py-4 px-5">
                      Central Criminal Registry (CCR), Nigeria Police Force Headquarters / CID
                    </td>
                    <td className="py-4 px-5">Bilateral Security &amp; Legal Section</td>
                    <td className="py-4 px-5">Overseas Labor Ministries, Skilled Worker Visas, Residency Desks</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">
                      CAC Status Report &amp; Corporate Charters
                    </td>
                    <td className="py-4 px-5">
                      Corporate Affairs Commission (CAC) Headquarters, Maitama, Abuja
                    </td>
                    <td className="py-4 px-5">Commercial &amp; Trade Treaties Division</td>
                    <td className="py-4 px-5">Foreign Chambers of Commerce, China Embassy, Gulf Trade Registries</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">
                      Medical &amp; Nursing Licenses
                    </td>
                    <td className="py-4 px-5">
                      Medical &amp; Dental Council (MDCN) or Nursing Council (NMCN) Headquarters
                    </td>
                    <td className="py-4 px-5">Professional Credentials Desk</td>
                    <td className="py-4 px-5">UK NHS Trusts, UAE Department of Health (DOH), Irish Nursing Board</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 6: INFORMATION GAIN #3 (Chain of Custody & Courier Escort)
          ───────────────────────────────────────────────── */}
          <section className="mb-24 rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Information Gain · Zero-Loss Guarantee
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Strict Chain-of-Custody &amp; Hand-Carried Courier Escort Protocol.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                We treat every client document with the security rigor of sovereign diplomatic mail. Our three-layer custody protocol protects your irreplaceable originals from the moment of intake to final doorstep delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#257CFF]/20 border border-[#4DA5EC]/40 flex items-center justify-center text-[#4DA5EC] font-black text-sm">
                    01
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Tamper-Evident Intake
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Upon receipt at our Kaduna or Abuja reception desks, documents undergo high-resolution digital scanning and are sealed in serial-numbered tamper-evident pouches. Clients receive an official counterfoil custody receipt listing every original certificate enclosed.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#402493]/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-sm">
                    02
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Direct Hand-to-Hand Liaison
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our vetted liaison officers carry your pouch directly into the Federal Secretariat, FME Accreditation Desk, and foreign embassy consular sections. We never hand client files to unvetted dispatchers or commercial third-party couriers inside the ministries.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-black text-sm">
                    03
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Insured Doorstep Return
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Once ministerial stamping and embassy seals are completed, documents are either collected in person at our offices or dispatched via premium tracked courier (DHL / FedEx Express) with active tracking numbers and signature confirmation upon delivery.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 7: 4-STAGE SYSTEMATIC PROCESS BREAKDOWN
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Execution Framework
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Our 4-Stage Legalization &amp; Authentication Flow.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                A predictable, disciplined sequence engineered to eliminate administrative delays and guarantee international acceptance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 'Stage 1',
                  title: 'Document Intake & Notary Audit',
                  desc: 'We inspect your physical certificates for lamination issues, watermarks, and verifiable signatures, followed by official High Court Notary Public attestation.',
                  days: 'Day 1',
                },
                {
                  step: 'Stage 2',
                  title: 'Line Ministry Endorsement',
                  desc: 'Submission to the relevant federal authority (Federal Ministry of Education for academic records, CAC for corporate deeds, or Police HQ for clearances).',
                  days: 'Days 2 – 3',
                },
                {
                  step: 'Stage 3',
                  title: 'MFA Legal Services Division',
                  desc: 'Our liaison desk presents your file at the Ministry of Foreign Affairs, Abuja for official authentication, diplomatic red ribbon, and dry seal.',
                  days: 'Days 3 – 5',
                },
                {
                  step: 'Stage 4',
                  title: 'Embassy Consular Legalization',
                  desc: 'Final presentation to the destination foreign embassy (UAE, Italy, Spain, Qatar, China) for bilateral attestation, followed by secured release.',
                  days: 'Days 6 – 10',
                },
              ].map((flow, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-md relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC]">
                        {flow.step}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300">
                        {flow.days}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-white mb-2">
                      {flow.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {flow.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statutory Compliance Checked</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 8: REAL-WORLD RESULTS & CASE STUDIES
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Proven Track Record
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Real Results: Real Documents Authenticated in Record Time.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#4DA5EC]/15 text-[#4DA5EC] text-[10px] font-black uppercase tracking-wider">
                    Healthcare Relocation
                  </span>
                  <span className="text-xs font-bold text-emerald-400">4 Business Days</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Medical Consultant Relocating to Dubai, UAE
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Challenge:</strong> Dr. K. had received an urgent consultant contract at a private hospital in Dubai, requiring MDCN registration certificate, MBBS degree, and internship completion letters fully legalized by the UAE Embassy in Abuja within 6 business days.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Resolution:</strong> Sijam Consults synchronized FME pre-authentication, MFA Legal Services Division verification, and same-week submission to the UAE Embassy Abuja consular desk. All documents were returned with valid UAE MOFA QR-verification stamps in 4 business days.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-purple-500/15 text-purple-300 text-[10px] font-black uppercase tracking-wider">
                    Study Abroad
                  </span>
                  <span className="text-xs font-bold text-emerald-400">7 Business Days</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Graduate Student Admitted to Politecnico di Milano, Italy
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Challenge:</strong> Miss O. needed a Declaration of Value (&ldquo;Dichiarazione di Valore in Loco&rdquo;) from the Italian Embassy in Abuja for her engineering degree and academic transcripts to finalize university enrollment.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Resolution:</strong> We managed the complete sequence: High Court notarization, FME accreditation, MFA diplomatic seal, sworn Italian translation by an embassy-accredited translator, and final consular legalization in Abuja. Her student visa was approved without administrative queries.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    Corporate Expansion
                  </span>
                  <span className="text-xs font-bold text-emerald-400">5 Business Days</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Nigerian Fintech Opening European Operations
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Challenge:</strong> A Lagos-based software enterprise required certified CAC status reports, board resolutions, and a registered power of attorney authenticated at the MFA for international bank account opening and licensing in Europe.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Resolution:</strong> We retrieved certified true copies directly from the CAC headquarters in Abuja, secured senior Notary Public seals with ribbon binding, and finalized MFA commercial division legalization within 5 business days.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 9: HONEST DISQUALIFICATION SECTION
          ───────────────────────────────────────────────── */}
          <section className="mb-24 rounded-3xl bg-red-950/20 border border-red-500/30 p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Strict Compliance Notice</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                We May Not Be Right For You If...
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                To protect the diplomatic integrity of our firm and the legitimate visas of our clients, Sijam Consults enforces strict anti-fraud standards. We will decline your file under the following conditions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <h3 className="font-heading font-bold text-sm text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Forged or Fabricated Certificates</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We do not authenticate fake degree certificates, bought diplomas, or counterfeit WAEC scratch cards. Every academic document is checked against institutional registries prior to ministry submission.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <h3 className="font-heading font-bold text-sm text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Unverifiable Digital Printouts</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We do not process laminated documents, unstamped scanned photocopies, or documents where the applicant refuses to provide the original paper certificate required by federal registries.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                <h3 className="font-heading font-bold text-sm text-red-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Requests for Illegal Bypass</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We do not bribe officials or attempt to skip mandatory statutory checks at the Federal Ministry of Education or Ministry of Justice. All authentications follow lawful federal channels.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 10: FAQS ACCORDION SECTION
          ───────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Frequently Answered Questions
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Everything You Need to Know About Document Legalization in Nigeria.
              </h2>
            </div>

            <div className="max-w-4xl">
              <Accordion items={LEGALIZATION_FAQS} />
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 11: CONVERSION CALL-TO-ACTION (SOFT CTA)
          ───────────────────────────────────────────────── */}
          <section className="rounded-3xl bg-gradient-to-r from-[#402493]/40 via-[#0D0826] to-[#257CFF]/20 border border-white/10 p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-xs font-bold text-[#4DA5EC]">
                <ShieldCheck className="w-4 h-4" />
                <span>Physical Abuja Liaison Desk · CAC RC: 1715416</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Get Your Documents Authenticated &amp; Embassy-Legalized Without Traveling to Abuja.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Save days of travel expenses, long queues at the Federal Secretariat, and the risk of lost files. Speak directly with our senior documentation officers today to begin intake and track your certification.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href={ROUTES.consultation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Submit Documents For Legalization</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20need%20urgent%20document%20legalization%20and%20MFA%20attestation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Chat With Documentation Officer</span>
                </a>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Kaduna Intake Center: 16/17 Ahmadu Bello Way
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Abuja Liaison Desk: Federal Secretariat &amp; Maitama
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Bonded Physical Courier Tracking
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
