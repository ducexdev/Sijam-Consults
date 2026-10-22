import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  FileText,
  Download,
  Building2,
  CheckCircle2,
  Mail,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  Check,
  PhoneCall,
  ExternalLink,
  Lock,
  Globe2,
  Scale,
  FileCheck2,
  Briefcase,
  HelpCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { Accordion } from '@/components/ui/Accordion';
import {
  CopyCACButton,
  InteractiveCorridors,
  ForensicProtocol,
} from '@/components/about/AboutClientComponents';
import { VIDEOS } from '@/lib/constants/videos';
import { TEAM_MEMBERS } from '@/lib/data/team';
import { COMPANY, ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'About Sijam Consults Limited | Global Mobility Experts',
  description:
    'Learn about Sijam Consults Limited (RC: 1715416). Founded on integrity, forensic compliance, and professional clarity across international relocation and recruitment.',
  keywords: [
    'about sijam consults limited',
    'sijam consults corporate profile',
    'international consultancy agency kaduna abuja',
    'sijam consults management team and mission',
    'cac registered consultancy rc 1715416',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/about',
  },
};

export default function AboutPage() {
  const faqItems = [
    {
      id: 'faq-1',
      question: 'Why does Sijam Consults strictly reject falsified bank statements or artificial ties?',
      answer:
        'Sovereign consulates (UK Home Office, IRCC Canada, Polish Voivodeship offices, Schengen embassies) now employ automated banking APIs and bilateral verification desks in Nigeria. Submitting a single fraudulent document results in an immediate 5-to-10-year worldwide travel ban under Section 212/214 immigration codes. We structure only lawful, verifiable wealth documentation and genuine institutional ties, safeguarding your international future forever.',
    },
    {
      id: 'faq-2',
      question: 'How does Sijam Consults maintain an audited 98.4% first-pass consular approval rate?',
      answer:
        'Our success is driven by our zero-omission forensic file audit. Before any application is lodged at an embassy or Visa Application Centre (VFS / TLScontact), every document undergoes a 14-point review by our senior compliance auditors. We ensure proof-of-funds are properly seasoned, source-of-wealth is fully traced, educational credentials are authenticated at the Ministry of Foreign Affairs in Abuja, and clients undergo rigorous 1-on-1 mock interviews.',
    },
    {
      id: 'faq-3',
      question: 'Can I visit the Sijam Consults corporate headquarters in Kaduna before making a commitment?',
      answer:
        'Yes, absolutely. We welcome prospective students, corporate clients, and families to visit our permanent executive offices located at Suite A10, 2nd Floor, 2/4 Kachia Road, Kaduna, Nigeria. Our doors are open Monday through Sunday from 09:00 to 17:00 WAT. You can inspect our physical CAC incorporation credentials, meet our compliance team, and conduct your initial assessment in person.',
    },
    {
      id: 'faq-4',
      question: 'What are direct bilateral university partnerships and how do they benefit students?',
      answer:
        'Unlike unlicensed middlemen who rely on secondary commission portals, Sijam Consults maintains verified direct bilateral agreements with higher education institutions such as Cyprus West University and the College of Economics and Computer Science (WSEI) in Poland. This grants our applicants direct priority admissions, guaranteed 50% to 75% institutional tuition scholarships, waived IELTS requirements for Nigerian WAEC/NECO holders, and expedited OK-to-Board visa documentation.',
    },
    {
      id: 'faq-5',
      question: 'How does James Samson’s role as an international football intermediary operate?',
      answer:
        'Alongside his decade of immigration advisory leadership, James Samson is a licensed Football Intermediary specialising in the European and Asian sports markets. He works in close synergy with Federation- and Association-registered intermediaries to structure legitimate trial pathways, professional athlete work permits, and transfer legalities for exceptional African talents seeking verified contracts with European clubs.',
    },
    {
      id: 'faq-6',
      question: 'How is client privacy and original document security managed during legalization?',
      answer:
        'Sijam Consults adheres strictly to the Nigeria Data Protection Act (NDPR 2023) and international privacy frameworks. All physical passports, degree scrolls, and legal affidavits handled for Ministry of Foreign Affairs (MFA) attestation in Abuja are transported via secure courier chains and stored inside fireproof, biometric security safes at our Kaduna headquarters.',
    },
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sijam Consults Limited',
    legalName: 'Sijam Consults Limited',
    url: 'https://sijamconsults.com',
    logo: 'https://sijamconsults.com/brand/logo.png',
    foundingLocation: {
      '@type': 'Place',
      name: 'Kaduna, Nigeria',
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'Corporate Affairs Commission Registration Number',
      value: 'RC: 1715416',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Suite A10, 2nd Floor, 2/4 Kachia Road',
      addressLocality: 'Kaduna',
      addressRegion: 'Kaduna State',
      postalCode: '800283',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+2348032777148',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hausa'],
      areaServed: ['NG', 'PL', 'CY', 'GB', 'CA', 'SK'],
    },
    founder: {
      '@type': 'Person',
      name: 'James Samson',
      jobTitle: 'Managing Director & CEO',
      description: 'Human Resource Manager, Consular Compliance Specialist, and Licensed Football Intermediary.',
    },
    sameAs: [
      'https://search.cac.gov.ng/',
      COMPANY.whatsapp.link,
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen selection:bg-[#257CFF] selection:text-white">
        
        {/* ── 1. ARCHITECTURAL HERO: 2-Column Grid Layout Matching Homepage ── */}
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-14 lg:pb-28 border-b border-white/10">
          {/* Ambient Video Background Layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-125 scale-105"
              src={VIDEOS.SIJAM_CONSULT_LIMITED}
            />
            {/* Multi-layered dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/80 to-[#070415]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(64,36,147,0.4),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(37,124,255,0.18),_transparent_60%)]" />
            {/* Fine architectural grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Breadcrumbs items={[{ label: 'About Us' }]} />
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Corporate Headquarters • Kaduna, Nigeria</span>
              </div>
            </div>

            {/* 2-Column Grid Matching Homepage Architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column (7 cols): Copy, Dual Buttons & Proof Points */}
              <div className="lg:col-span-7 space-y-6">
                {/* Statutory Badge with Copyable CAC */}
                <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>CAC Incorporated</span>
                  </div>
                  <CopyCACButton />
                </div>

                {/* H1 Heading Using Standard Sizes */}
                <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
                  Bridging you to global opportunities with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#60A5FA]">
                    institutional integrity &amp; forensic precision.
                  </span>
                </h1>

                {/* Lead Subtitle */}
                <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                  <strong className="text-white font-semibold">Sijam Consults Limited</strong> was founded on an unapologetic mandate: to eliminate the predatory middlemen, deceptive promises, and fraudulent paperwork that destroy Nigerian families and professional careers.
                </p>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                  As a Corporate Affairs Commission registered entity (<strong className="text-white font-mono">RC: 1715416</strong>), we deliver audited advisory across International Student Recruitment, European Work Permits, Expatriate Manpower, and Cross-Border Business Setup.
                </p>

                {/* Dual Homepage CTA Buttons (Sentence Case) */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={ROUTES.consultation}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Book advisory session</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href={ROUTES.assessment}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FileCheck2 className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Eligibility pre-check</span>
                  </Link>
                </div>

                {/* Trust Verification Ledger */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-white">10+ Years</div>
                    <div className="text-[10px] font-mono text-[#4DA5EC] uppercase">Senior Advisory</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-emerald-400">1,200+</div>
                    <div className="text-[10px] font-mono text-emerald-400 uppercase">Lawful Filings</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-amber-400">98.4%</div>
                    <div className="text-[10px] font-mono text-amber-400 uppercase">First-Pass Rate</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-purple-400">RC: 1715416</div>
                    <div className="text-[10px] font-mono text-purple-400 uppercase">CAC Registered</div>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): High-Trust Executive Showcase Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md rounded-3xl p-6 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent border border-white/20 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] ring-1 ring-white/15 relative overflow-hidden space-y-6">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,_rgba(37,124,255,0.2),_transparent_70%)] pointer-events-none" />

                  {/* Header bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                        Executive Desk
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Verified CAC
                    </span>
                  </div>

                  {/* Founder Showcase */}
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#4DA5EC]/40 shadow-lg flex-shrink-0 bg-black/40"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src="/team/James-Samson.png"
                        alt="James Samson — Founder & Managing Director, Sijam Consults Limited"
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#4DA5EC] font-bold">
                        Founder &amp; Managing Director
                      </div>
                      <div className="text-lg font-heading font-black text-white">
                        James Samson
                      </div>
                      <div className="text-xs text-slate-300">
                        Certified HR Manager • Licensed Football Intermediary
                      </div>
                    </div>
                  </div>

                  {/* Operational Credentials Bento */}
                  <div className="space-y-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" /> Physical HQ
                      </span>
                      <span className="font-semibold text-white">GRA Kaduna, Nigeria</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Scale className="w-3.5 h-3.5 text-emerald-400" /> Legal Registration
                      </span>
                      <span className="font-mono font-bold text-emerald-400">RC: 1715416</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-purple-400" /> Consular Standard
                      </span>
                      <span className="font-semibold text-purple-300">Zero-Omission File Audit</span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <div className="pt-2">
                    <a
                      href="/docs/Sijam-Company-Profile.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs border border-white/15 backdrop-blur-xl transition-all group"
                    >
                      <Download className="w-4 h-4 text-[#4DA5EC] group-hover:translate-y-0.5 transition-transform" />
                      <span>Download corporate profile (PDF)</span>
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── 2. THE ORIGIN & UNCENSORED REALITY: The Problem Sijam Solves ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(37,124,255,0.06),_transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider text-red-300">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>The Nigerian Migration Reality</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Why Sijam Consults was founded:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                  Dismantling the epidemic of predatory visa fraud.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Every month in Nigeria, thousands of talented professionals, students, and families fall victim to unlicensed street agents. The pattern is tragically predictable:
              </p>
            </div>

            {/* The 3 Fatal Pitfalls of Street Agents vs Sijam Solution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-7 rounded-3xl bg-red-950/20 border border-red-500/25 space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Falsified Bank Statements
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Roadside agents pool unregistered funds or photoshop bank statements. Embassies verify accounts via direct API integrations. Result: an instant <strong className="text-red-400">10-year worldwide consular ban</strong> under UK Section 322 or Schengen Article 32.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Sijam uses only seasoned, lawful banking rails</span>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-red-950/20 border border-red-500/25 space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Ghost Work Permits &amp; Fake Visas
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Applicants are sold fictitious agricultural or healthcare job offers with non-existent overseas employers. Upon arrival or at the biometric window, the fraud is detected, leaving victims stranded and in debt.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Sijam works via verified Voivodeship &amp; CoS quotas</span>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-red-950/20 border border-red-500/25 space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Anonymous WhatsApp Ghost Offices
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Unregistered operators take massive cash deposits, issue no legally binding service level agreement, and delete their phone numbers as soon as a rejection letter or consular query arrives.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Sijam operates permanent corporate offices in Kaduna</span>
                </div>
              </div>

            </div>

            {/* Foundational Mission Pullout */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl space-y-6">
              <div className="max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4DA5EC] uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>Our Foundational Mission</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  Institutional Reliability Across 5 Specialized Practice Areas
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Sijam Consults Limited was built to offer a legally anchored sanctuary. We provide five specialized consulting divisions: <strong className="text-white">Recruitment &amp; Manpower Solutions</strong>, <strong className="text-white">International Student Recruitment &amp; Study Abroad Services</strong>, <strong className="text-white">Immigration &amp; Work Permit Consultancy</strong>, <strong className="text-white">Travel Consultancy</strong>, and <strong className="text-white">International Business Consultancy</strong>.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  We reject the premise that migration requires deception. Consular officers do not reject Nigerian applicants out of prejudice—they reject files laden with discrepancies, unexplained fund spikes, and unauthenticated certificates. When a case is built with institutional rigor, the outcome is predictable and lawful.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Professionalism
                  </div>
                  <p className="text-xs text-slate-300">
                    Certified procedures and zero-omission file reviews on every client dossier.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-[#4DA5EC] uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Integrity
                  </div>
                  <p className="text-xs text-slate-300">
                    No false guarantees, no fabricated records, and 100% genuine institutional quotas.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" /> Transparency
                  </div>
                  <p className="text-xs text-slate-300">
                    Milestone-based contractual retainers and transparent timeline tracking.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Client Satisfaction
                  </div>
                  <p className="text-xs text-slate-300">
                    Full post-arrival onboarding, accommodation arrangement, and residency renewals.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. UNIQUE INFORMATION GAIN: Operating Charter & Forensic Standards ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Information Gain • Sovereign Standards</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The Sijam Operating Charter:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Forensic Compliance Protocol
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                How our institutional standards protect Nigerian families and businesses from consular scrutiny, regulatory sanctions, and lost capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#257CFF]/15 border border-[#257CFF]/30 flex items-center justify-center text-[#4DA5EC]">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  1. 100% Lawful Banking Rails &amp; Fund Seasoning
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  We never engage in third-party bank statement lending or artificial account deposits. We instruct clients on legal financial seasoning, tax receipts, land sale documentation, and verified parental or sponsor affidavits that withstand automated embassy banking verification.
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>28-day continuous balance monitoring for UK Tier 4 CAS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Traceable source-of-wealth documentation for Poland Voivodeship</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Provincial Attestation Letter (PAL) liquid funds alignment for Canada</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  2. Direct Bilateral Institutional Alliances
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Sijam Consults bypasses multi-tier agents. We maintain direct bilateral covenants with higher education institutions including Cyprus West University and the College of Economics and Computer Science (WSEI Krakow), ensuring authentic admissions and verified tuition awards.
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>50% to 75% guaranteed institutional tuition scholarships</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>WAEC/NECO English waivers directly accepted by admissions boards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Expedited OK-to-Board student visa clearance directly from ministries</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  3. NDPR 2023 &amp; Biometric Document Vault
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Client passports, degree transcripts, and legal affidavits are sensitive national assets. We comply fully with the Nigeria Data Protection Act (NDPR 2023). Original documents submitted for Ministry of Foreign Affairs (MFA) legalization are safeguarded in fireproof biometric security vaults.
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Armed biometric access control at Kaduna headquarters vault</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Tracked courier manifests for MFA Abuja and High Court attestation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Zero document sharing with unauthorized third-party platforms</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  4. Verifiable CAC Corporate Entity (RC: 1715416)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  We are not an internet apparition. Sijam Consults Limited is incorporated under the Companies and Allied Matters Act (CAMA 2020). Every agreement is sealed with corporate legal liability, enforceable milestone terms, and corporate banking receipts.
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Active registration on the Corporate Affairs Commission (CAC) portal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Official Tax Identification Number (TIN) &amp; FIRS compliance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Physical premises open 7 days a week for walk-in client inspection</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. EXECUTIVE LEADERSHIP TEAM & CORPORATE OFFICERS ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Users className="w-3.5 h-3.5" />
                <span>Executive Governance</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Meet Our Leadership Team &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Senior Counsel
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Seasoned immigration specialists, human resource professionals, and international admissions directors steering your case with forensic precision.
              </p>
            </div>

            {/* Founder Spotlight Deep-Dive: James Samson */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Founder Photo */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div
                    className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-[#4DA5EC]/40 group"
                    style={{ position: 'relative' }}
                  >
                    <Image
                      src="/team/James-Samson.png"
                      alt="James Samson — Managing Director & CEO, Sijam Consults Limited"
                      fill
                      sizes="(max-width: 768px) 100vw, 384px"
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-transparent to-transparent opacity-85" />
                    
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Licensed Executive</span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1">
                      <div className="text-xs font-mono font-bold text-[#4DA5EC] uppercase tracking-wider">
                        Founder &amp; Managing Director
                      </div>
                      <div className="text-2xl font-heading font-black text-white">
                        James Samson
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        Human Resource Manager • 10+ Years Consular Advisory
                      </p>
                    </div>
                  </div>
                </div>

                {/* Founder Narrative & Manifesto */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-3">
                    <div className="text-3xl text-[#4DA5EC] font-serif leading-none select-none">&ldquo;</div>
                    <blockquote className="text-base sm:text-xl text-slate-100 font-medium leading-relaxed italic">
                      International relocation is never merely about filling forms; it represents the largest financial, emotional, and generational investment an African family or professional will ever make. Our duty is not to sell dreams—it is to build airtight, verifiable legal dossiers that withstand the fiercest sovereign consular scrutiny.
                    </blockquote>
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      — James Samson, Founder &amp; CEO (Sijam Consults Limited • RC: 1715416)
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    <p>
                      James Samson brings more than a decade of frontline experience as a senior decision-maker in immigration consulting, covering the full spectrum of visa categories: single work permits, bachelor and master admissions, business migration, investor pathways, and corporate entity creation across multiple jurisdictions.
                    </p>
                    <p>
                      Beyond corporate immigration, James is also an experienced <strong className="text-white">Licensed Football Intermediary</strong> specialising in the European and Asian professional football markets. In synergy with Federation- and Association-registered intermediaries, he creates verified pathways for elite African talents seeking professional contracts abroad.
                    </p>
                  </div>

                  {/* Credentials matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-white/10 text-xs text-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Certified Human Resource Manager (HRM)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>10+ Years Consular Advisory Practice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Licensed Football Intermediary (Europe &amp; Asia)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Permanent &amp; Temporary Residence Specialist</span>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={ROUTES.consultation}
                      className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Book advisory session</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <a
                      href={`mailto:${COMPANY.emails.primary}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Mail className="w-4 h-4 text-[#4DA5EC]" />
                      <span>Contact executive desk</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>

            {/* Team Grid: Leadership & Counsel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* David Attai Attaboh */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 group hover:border-[#257CFF]/40 transition-all">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-black/40 shadow-lg flex-shrink-0"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src="/team/David-Attai-Attaboh.jpeg"
                        alt="David Attai Attaboh — Head of Operations & Consular Documentation"
                        fill
                        sizes="80px"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#4DA5EC] uppercase tracking-wider">
                        Operations &amp; Consular Compliance
                      </div>
                      <h3 className="font-heading font-black text-xl text-white">
                        David Attai Attaboh
                      </h3>
                      <p className="text-xs text-slate-300">
                        Head of Operations &amp; Consular Documentation
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    David coordinates daily consular operations, document attestation workflows, and file quality audits. His rigorous standard ensures every client dossier submitted to foreign embassies or the Ministry of Foreign Affairs in Abuja adheres precisely to statutory checklists.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Operational Competencies
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Lead Consular File Auditor &amp; Quality Controller</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>MFA Abuja &amp; High Court Legalization Protocols</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Sovereign Dossier Packaging Specialist</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <a
                      href="mailto:david@sijamconsults.com"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#4DA5EC] hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>david@sijamconsults.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* James Egene Friday */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 group hover:border-[#257CFF]/40 transition-all">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-black/40 shadow-lg flex-shrink-0"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src="/team/James-Egene-Friday.jpeg"
                        alt="James Egene Friday — Recruitment Expert & International Talent Lead"
                        fill
                        sizes="80px"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#4DA5EC] uppercase tracking-wider">
                        Recruitment &amp; Manpower Solutions
                      </div>
                      <h3 className="font-heading font-black text-xl text-white">
                        James Egene Friday
                      </h3>
                      <p className="text-xs text-slate-300">
                        Recruitment Expert &amp; Talent Lead
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    James directs international workforce recruitment, bilateral employer matching, and foreign labor quota compliance across European and Gulf corridors. He specializes in vetting technical skills and structuring verified employment pathways.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Operational Competencies
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Certified International Recruitment Specialist</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Voivodeship &amp; European Labor Quota Auditor</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Bilateral Employer Placement Coordinator</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <a
                      href="mailto:friday@sijamconsults.com"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#4DA5EC] hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>friday@sijamconsults.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Keziah Simon */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 group hover:border-[#257CFF]/40 transition-all">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-black/40 shadow-lg flex-shrink-0"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src="/team/Keziah-Simon.jpeg"
                        alt="Keziah Simon — Corporate Relations Manager & Client Success Lead"
                        fill
                        sizes="80px"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#4DA5EC] uppercase tracking-wider">
                        Corporate Relations &amp; Advisory
                      </div>
                      <h3 className="font-heading font-black text-xl text-white">
                        Keziah Simon
                      </h3>
                      <p className="text-xs text-slate-300">
                        Corporate Relations Manager
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Keziah spearheads corporate partnerships, institutional liaison, and client success management. She ensures smooth onboarding, proactive communication, and tailored mobility solutions for corporate bodies, families, and individual applicants.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Operational Competencies
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Corporate Account Management Lead</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Client Success &amp; Intake Coordinator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Institutional Partner Liaison Facilitator</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <a
                      href="mailto:keziah@sijamconsults.com"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#4DA5EC] hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>keziah@sijamconsults.com</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── 5. THE 4-STAGE FORENSIC DOSSIER PROTOCOL ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>The Sijam Veracity Methodology</span>
              </div>
              
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Our 4-Stage Forensic{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Consular Dossier Protocol
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                How our rigorous zero-omission file audit catches preventable refusal triggers before files reach sovereign visa windows, delivering our audited 98.4% first-pass approval rate.
              </p>
            </div>

            {/* Interactive Protocol Stepper */}
            <ForensicProtocol />
          </div>
        </section>

        {/* ── 6. FORENSIC MATRIX: Sijam Consults vs Informal Agents ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Scale className="w-3.5 h-3.5" />
                <span>Accountability Matrix</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Forensic Matrix:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Sijam Consults vs Informal Agents
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Understand the stark structural difference between an incorporated corporate consultancy and an informal roadside operator.
              </p>
            </div>

            {/* Comparison Bento Table */}
            <div className="rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 overflow-hidden backdrop-blur-2xl shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 bg-white/[0.04]">
                      <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                        Operational Criterion
                      </th>
                      <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 border-x border-[#257CFF]/20">
                        Sijam Consults Limited
                      </th>
                      <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                        Informal Street Agents
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                    <tr>
                      <td className="py-4 px-6 font-semibold text-white">
                        Legal Entity &amp; CAC Status
                      </td>
                      <td className="py-4 px-6 bg-[#257CFF]/5 border-x border-[#257CFF]/20 text-emerald-300 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Incorporated under CAMA 2020 (RC: 1715416)</span>
                      </td>
                      <td className="py-4 px-6 text-red-300">
                        Unregistered individual or unregistered business name
                      </td>
                    </tr>

                    <tr>
                      <td className="py-4 px-6 font-semibold text-white">
                        Physical Premises
                      </td>
                      <td className="py-4 px-6 bg-[#257CFF]/5 border-x border-[#257CFF]/20 text-emerald-300 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Permanent Kaduna HQ with biometric vaults</span>
                      </td>
                      <td className="py-4 px-6 text-red-300">
                        No physical address; meetings in cafes or via WhatsApp only
                      </td>
                    </tr>

                    <tr>
                      <td className="py-4 px-6 font-semibold text-white">
                        Contractual Agreement
                      </td>
                      <td className="py-4 px-6 bg-[#257CFF]/5 border-x border-[#257CFF]/20 text-emerald-300 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Signed milestone SLA with corporate banking invoices</span>
                      </td>
                      <td className="py-4 px-6 text-red-300">
                        Cash deposits, personal bank accounts, zero written contracts
                      </td>
                    </tr>

                    <tr>
                      <td className="py-4 px-6 font-semibold text-white">
                        Bank Statement Handling
                      </td>
                      <td className="py-4 px-6 bg-[#257CFF]/5 border-x border-[#257CFF]/20 text-emerald-300 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Only genuine, seasoned, client-owned funds</span>
                      </td>
                      <td className="py-4 px-6 text-red-300">
                        Fake statements or temporary pooled funds risking 10-year bans
                      </td>
                    </tr>

                    <tr>
                      <td className="py-4 px-6 font-semibold text-white">
                        Institutional University Relations
                      </td>
                      <td className="py-4 px-6 bg-[#257CFF]/5 border-x border-[#257CFF]/20 text-emerald-300 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>Direct bilateral MOUs (CWU, WSEI Krakow)</span>
                      </td>
                      <td className="py-4 px-6 text-red-300">
                        Third-party sub-agent portals with inflated commission markups
                      </td>
                    </tr>

                    <tr>
                      <td className="py-4 px-6 font-semibold text-white">
                        Consular Risk Audit
                      </td>
                      <td className="py-4 px-6 bg-[#257CFF]/5 border-x border-[#257CFF]/20 text-emerald-300 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>14-point pre-audit before any fee submission</span>
                      </td>
                      <td className="py-4 px-6 text-red-300">
                        Blind submissions; no mock interview preparation
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ── 7. BILATERAL STRATEGIC CORRIDORS & ALLIANCES ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Sovereign Corridors</span>
              </div>
              
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Bilateral Alliances Across{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Europe &amp; North America
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Explore our primary educational and commercial corridors. Click on any region to inspect accredited partner institutions, scholarship rates, and processing timelines.
              </p>
            </div>

            {/* Interactive Corridor Bento Box */}
            <InteractiveCorridors />
          </div>
        </section>

        {/* ── 8. UX PSYCHOLOGY QUALIFICATION: We May Not Be Right For You If... ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                <Target className="w-3.5 h-3.5 text-purple-400" />
                <span>Candidate Qualification Charter</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Is Sijam Consults the Right Advisory for You?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                We believe in total transparency. We protect our 98.4% consular approval rate by choosing clients whose values align with our zero-deception operating charter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left: Disqualifier */}
              <div className="p-8 sm:p-10 rounded-3xl bg-red-950/20 border border-red-500/30 space-y-6">
                <div className="flex items-center gap-3 text-red-400">
                  <XCircle className="w-6 h-6 flex-shrink-0" />
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    We may not be right for you if:
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You are looking for someone to provide &ldquo;fake bank statements&rdquo; or create fictitious family ties to deceive embassies.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You expect &ldquo;100% guaranteed visa stamps&rdquo; from an agency—no ethical consultant can guarantee sovereign embassy decisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You are unwilling to undergo statutory document verification, MFA Abuja legalization, or attend mandatory mock interviews.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You prefer undocumented cash transactions with no formal contracts or legal corporate liability.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right: Qualifier */}
              <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-6">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    We are built specifically for you if:
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You want legitimate, verified pathways to Europe, the UK, or Canada backed by genuine university covenants and licensed employers.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You value working with an incorporated Nigerian consultancy (RC: 1715416) with a permanent Kaduna office and signed contracts.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You want a forensic pre-audit that uncovers and resolves refusal triggers before your visa fee is paid.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You are a family, corporate organization, or student seeking long-term global settlement without risking permanent travel bans.
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── 9. OFFICIAL CORPORARY DOCUMENTARY & KADUNA HQ TOUR ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Corporate Archival Film • 4K Documentary</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Behind the Dossier:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Corporate Operations Showcase
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Tour our permanent executive headquarters in Kaduna, examine our physical client consultation desks, and witness how our accredited team structures legitimate global pathways with forensic precision.
              </p>
            </div>

            {/* Cinema Player with High-Tech Bezel */}
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-black/60 border border-white/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl ring-1 ring-[#257CFF]/30">
                <div className="flex items-center justify-between pb-3 px-2 text-[10px] sm:text-xs font-mono text-slate-400 border-b border-white/10 mb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    SIJAM CORPORATE OVERVIEW • VERIFIED ARCHIVAL FILM
                  </span>
                  <span className="hidden sm:inline-block text-[#4DA5EC]">RC: 1715416 • KADUNA HQ</span>
                </div>

                <VideoPlayer
                  src="https://youtu.be/LOB8JuM_Lrg?si=8ITy5RfAbaNuRpbJ"
                  title="Sijam Consults Limited Corporate Overview Film"
                  aspectRatio="16/9"
                  className="w-full shadow-2xl rounded-2xl overflow-hidden"
                />
              </div>

              {/* CAC Certificate & Physical Premises Verification Strip */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-12">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Statutory Corporate Accreditation</span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                    Permanent Kaduna Corporate Headquarters
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Sijam Consults Limited maintains permanent corporate offices at <strong className="text-white">{COMPANY.address.full}</strong>. Our premises feature private client intake desks, biometric document vaults, and comprehensive walk-in accessibility Monday through Sunday from 09:00 to 17:00 WAT.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <CopyCACButton />
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-3xl p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-emerald-500/30">
                    <div className="text-center pb-2 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest border-b border-white/10 mb-2">
                      OFFICIAL CAC CERTIFICATE • RC: {COMPANY.cacNumber}
                    </div>
                    <div
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src="/brand/cac-certificate.png"
                        alt="CAC Certificate RC 1715416 — Sijam Consults Limited"
                        fill
                        sizes="(max-width: 768px) 100vw, 384px"
                        className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-center pt-2 text-[10px] text-slate-400 font-normal">
                      Verified by the Federal Republic of Nigeria
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 10. SEARCH-OPTIMIZED FAQ ACCORDION ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Answered Questions</span>
              </div>
              
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Institutional Transparency &amp; Consular Truth
              </h2>

              <p className="text-sm sm:text-base text-slate-300">
                Direct answers to the most important questions clients and corporate bodies ask about Sijam Consults Limited.
              </p>
            </div>

            <Accordion items={faqItems} allowMultiple={false} variant="dark" />
          </div>
        </section>

        {/* ── 11. EXECUTIVE CLOSING INVITATION (FINAL CTA) ── */}
        <section className="py-20 bg-gradient-to-b from-[#0A061C] to-[#070415] relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#18233C] via-[#0E1627] to-[#070415] border border-white/20 shadow-[0_30px_90px_rgba(37,124,255,0.25)] ring-1 ring-[#4DA5EC]/30 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(37,124,255,0.2),_transparent_70%)] pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs text-[#4DA5EC] font-mono font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>EXECUTIVE INTAKE • ZERO-OMISSION FILE AUDIT</span>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                  Ready to structure your legitimate global journey?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Schedule your comprehensive consular pre-assessment today. Meet our senior directors in person at Kaduna or via encrypted video consultation.
                </p>
              </div>

              {/* Dual Homepage CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href={ROUTES.consultation}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Book advisory session</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href={ROUTES.assessment}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileCheck2 className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Eligibility pre-check</span>
                </Link>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> CAC RC: {COMPANY.cacNumber}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" /> Permanent Kaduna Premises
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 98.4% Consular Compliance
                </span>
              </div>
            </div>

            <div className="pt-12">
              <TrustBanner showFullDisclaimer={true} />
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}