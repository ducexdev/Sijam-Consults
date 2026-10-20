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
        'Yes, absolutely. We welcome prospective students, corporate clients, and families to visit our permanent executive offices located at Suite 3, Ground Floor, Corporate House, GRA Kaduna, Nigeria. Our doors are open Monday through Sunday from 09:00 to 17:00 WAT. You can inspect our physical CAC incorporation credentials, meet our compliance team, and conduct your initial assessment in person.',
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
  ];

  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen selection:bg-[#257CFF] selection:text-white">
        
        {/* ── 1. ARCHITECTURAL HERO: The Sovereign Mobility Dossier ── */}
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
                <span>Consular Compliance Headquarters • Kaduna, Nigeria</span>
              </div>
            </div>

            <div className="max-w-4xl space-y-6">
              {/* Statutory Badge with Copyable CAC */}
              <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-lg">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CAC Incorporated</span>
                </div>
                <CopyCACButton />
              </div>

              {/* High-Impact Editorial Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.06]">
                Forensic Legal Precision.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#60A5FA]">
                  Sovereign Cross-Border Mobility.
                </span>
              </h1>

              {/* Subtitle with executive clarity */}
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
                <strong className="text-white font-semibold">Sijam Consults Limited</strong> is a Nigerian-based consultancy company specializing in Recruitment &amp; Manpower Solutions, International Student Recruitment &amp; Study Abroad Services, Immigration &amp; Work Permit Consultancy, Travel Consultancy, and International Business Consultancy.
              </p>

              {/* Primary Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={ROUTES.consultation}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#1E6DEB] text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_35px_rgba(37,124,255,0.45)] hover:shadow-[0_15px_45px_rgba(37,124,255,0.65)] hover:scale-102 transition-all border border-white/20 active:scale-98"
                >
                  <Mail className="w-4 h-4" />
                  <span>Book Executive Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="/docs/Sijam-Company-Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs border border-white/15 backdrop-blur-xl transition-all hover:border-white/25 active:scale-98 group"
                >
                  <Download className="w-4 h-4 text-[#4DA5EC] group-hover:translate-y-0.5 transition-transform" />
                  <span>Corporate Profile (9.8MB PDF)</span>
                </a>
              </div>
            </div>

            {/* ── Bespoke Floating Stats Ledger ── */}
            <div className="pt-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">10+</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#4DA5EC]">Years Experience</div>
                  <p className="text-[10px] text-slate-400 font-normal">Frontline consular advisory</p>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">1,200+</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Lawful Filings</div>
                  <p className="text-[10px] text-slate-400 font-normal">Admissions &amp; work permits</p>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">98.4%</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">First-Pass Rate</div>
                  <p className="text-[10px] text-slate-400 font-normal">Zero-omission file audit</p>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">100+</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Global Partners</div>
                  <p className="text-[10px] text-slate-400 font-normal">Universities &amp; employers</p>
                </div>

                <div className="col-span-2 md:col-span-1 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">RC: 1715416</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400">CAC Registry</div>
                  <p className="text-[10px] text-slate-400 font-normal">Federal Republic of Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. ABOUT SIJAM CONSULTS LIMITED: OFFICIAL CORPORATE IDENTITY ── */}
        <section className="py-16 sm:py-24 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(37,124,255,0.06),_transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="max-w-4xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                  <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                  <span>Corporate Overview</span>
                </div>

                <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                  About Sijam Consults Limited
                </h2>

                <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal">
                  Sijam Consults Limited is a Nigerian-based consultancy company specializing in <strong className="text-white font-semibold">Recruitment &amp; Manpower Solutions</strong>, <strong className="text-white font-semibold">International Student Recruitment &amp; Study Abroad Services</strong>, <strong className="text-white font-semibold">Immigration &amp; Work Permit Consultancy</strong>, <strong className="text-white font-semibold">Travel Consultancy</strong>, and <strong className="text-white font-semibold">International Business Consultancy</strong>.
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  We connect employers with qualified talent, assist students in accessing international education opportunities, and provide professional guidance to individuals and businesses seeking employment, immigration, travel, and business opportunities across borders.
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Driven by professionalism, integrity, transparency, and client satisfaction, Sijam Consults Limited is committed to building trusted partnerships and delivering reliable solutions to clients in Nigeria and internationally.
                </p>

                {/* 4 Core Pillars of Practice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Professionalism</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      Rigorous compliance, certified procedures, and industry-leading standards across all casework.
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-2 text-[#4DA5EC] font-mono text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Integrity</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      Zero tolerance for document falsification, authentic employer quotas, and verified pathways.
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Transparency</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      Clear operational timelines, explicit contract terms, and direct accountability to our clients.
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                      <Award className="w-4 h-4" />
                      <span>Client Satisfaction</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      End-to-end support from preliminary assessment to cross-border settlement and onboarding.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CINEMATIC DOCUMENTARY & OPERATIONAL TRUTH ── */}
        <section className="py-20 lg:py-28 bg-[#0A061C] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(37,124,255,0.08),_transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
            {/* Header: Screening Room Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
                Official Corporate Documentary • 4K Film
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Behind the Dossier:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Corporate Operations Showcase
                </span>
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
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

              {/* The Triad of Operational Truth (Asymmetric Architectural Strip) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 backdrop-blur-xl space-y-3 hover:border-[#257CFF]/40 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#257CFF]/15 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-lg text-white">
                    Permanent Physical Premises
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Permanent corporate offices situated in GRA Kaduna. Dedicated face-to-face consultation desks, biometric file safes, and full walk-in accountability for every client.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 backdrop-blur-xl space-y-3 hover:border-emerald-500/40 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-lg text-white">
                    Zero-Deception Statutory Mandate
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Strict zero-tolerance policy against forged bank records, artificial ties, or fake sponsor documents. We protect our clients from permanent consular travel bans.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/10 backdrop-blur-xl space-y-3 hover:border-orange-500/40 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#F45A2A]/15 text-[#F98864] flex items-center justify-center border border-orange-500/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-lg text-white">
                    Bilateral Institutional Alliances
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Direct institutional treaties with European universities (Cyprus West University, WSEI Poland) and verified EU employers. No predatory third-party agents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. EXECUTIVE SPOTLIGHT & FOUNDER'S MANIFESTO: James Samson ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,_rgba(77,165,236,0.08),_transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,_rgba(64,36,147,0.15),_transparent_60%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Users className="w-3.5 h-3.5" />
                Executive Leadership Profile
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                The Founder&apos;s Mandate:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  James Samson
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Portrait & Authority Card */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-6">
                <div
                  className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)] ring-1 ring-[#4DA5EC]/40 group"
                  style={{ position: 'relative' }}
                >
                  {/* Decorative Geometric Corner Flairs */}
                  <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-[#257CFF]/40 to-transparent rounded-br-3xl z-10 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-[#4DA5EC]/30 to-transparent rounded-tl-3xl z-10 pointer-events-none" />
                  
                  {/* Floating verification badge */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Executive</span>
                  </div>

                  <Image
                    src="/team/James-Samson.png"
                    alt="James Samson — Managing Director & CEO, Sijam Consults Limited"
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1">
                    <div className="text-xs font-mono font-bold text-[#4DA5EC] uppercase tracking-widest">
                      Founder &amp; Managing Director
                    </div>
                    <div className="text-xl sm:text-2xl font-heading font-black text-white">
                      James Samson
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">
                      Certified HR Manager • 10+ Years Consular Practice
                    </p>
                  </div>
                </div>

                {/* Sub-profile quick metrics */}
                <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Advisory Focus</div>
                    <div className="text-xs font-bold text-white mt-0.5">Schengen &amp; Commonwealth</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Athletic Intermediary</div>
                    <div className="text-xs font-bold text-[#4DA5EC] mt-0.5">Europe &amp; Asian Leagues</div>
                  </div>
                </div>
              </div>

              {/* Right Column: The Founder's Manifesto & Bio */}
              <div className="lg:col-span-7 space-y-8">
                {/* Pull Quote Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
                  <div className="text-4xl text-[#4DA5EC] font-serif leading-none mb-2 select-none">&ldquo;</div>
                  <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed italic">
                    International relocation is never merely about filling forms; it represents the largest financial, emotional, and generational investment an African family or professional will ever make. Our duty is not to sell dreams—it is to build airtight, verifiable legal dossiers that withstand the fiercest sovereign consular scrutiny.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-sm text-white">James Samson</div>
                      <div className="text-xs text-slate-400">Chief Executive Officer, Sijam Consults Limited</div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      CAC RC: 1715416
                    </span>
                  </div>
                </div>

                {/* Deep-Dive Narrative */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  <p>
                    James Samson brings more than a decade of frontline experience as a senior decision-maker in immigration consulting, covering the full spectrum of visa categories: single work permits, bachelor and master admissions, business migration, investor pathways, and corporate entity creation across multiple jurisdictions.
                  </p>
                  <p>
                    His career was forged through close collaboration with senior immigration lawyers, regulatory authorities, and diplomatic liaisons across Nigeria and Europe. This professional crucible honed his technical competencies in resolving complex permanent and temporary residence applications that lesser agencies abandon.
                  </p>
                  <p>
                    Beyond corporate immigration, James is an experienced <strong className="text-white">Licensed Football Intermediary</strong> specialising in European and Asian professional football markets. In partnership with Federation- and Association-registered intermediaries, he creates verified pathways for elite African talents seeking professional contracts abroad, supported by direct club networks and verifiable athletic visas.
                  </p>
                </div>

                {/* Credentials Matrix */}
                <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#4DA5EC]" />
                    Verified Leadership Credentials &amp; Practice
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'CEO & MD, Sijam Consults Limited (CAC RC: 1715416)',
                      '10+ Years Forensic Consular Advisory Practice',
                      'Permanent & Temporary Residence Specialist',
                      'Collaborator with Senior Immigration Lawyers (Nigeria & EU)',
                      'Certified Human Resource Manager (HRM)',
                      'Licensed Football Intermediary — European & Asian Markets',
                    ].map((cred, idx) => (
                      <div key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Consultation Action */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={ROUTES.consultation}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Book Strategic Advisory Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={COMPANY.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Direct WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. THE 4-STAGE FORENSIC DOSSIER PROTOCOL (Non-Generic Process) ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <FileCheck2 className="w-3.5 h-3.5" />
                The Sijam Veracity Methodology
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Our 4-Stage Forensic{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Consular Dossier Protocol
                </span>
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                How our rigorous zero-omission file audit catches preventable refusal triggers before files reach sovereign visa windows, delivering our audited 98.4% first-pass approval rate.
              </p>
            </div>

            {/* Interactive Protocol Stepper */}
            <ForensicProtocol />
          </div>
        </section>

        {/* ── 5. GLOBAL STRATEGIC CORRIDORS & ALLIANCES ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Globe2 className="w-3.5 h-3.5" />
                Sovereign Relocation Corridors
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Bilateral Alliances Across{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Europe &amp; North America
                </span>
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                Explore our primary educational and commercial corridors. Click on any region to inspect accredited partner institutions, scholarship rates, and processing timelines.
              </p>
            </div>

            {/* Interactive Corridor Bento Box */}
            <InteractiveCorridors />
          </div>
        </section>

        {/* ── 6. STATUTORY ACCREDITATION & KADUNA HEADQUARTERS TOUR ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Statutory Accreditation Text */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Statutory Corporate Accreditation</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                    Corporate Affairs Commission Incorporation
                  </h3>

                  <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                    Sijam Consults Limited is incorporated under the Companies and Allied Matters Act 2020 with Registration Number <strong className="text-white font-bold">{COMPANY.cacNumber}</strong>. We operate with full tax compliance, verifiable physical premises, and zero tolerance for document forgery.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                      <div className="text-[10px] font-mono font-bold uppercase text-[#4DA5EC] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Physical Headquarters
                      </div>
                      <div className="text-xs font-semibold text-white">
                        {COMPANY.address.full}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Permanent executive offices with biometric client security.
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                      <div className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Working Hours &amp; Access
                      </div>
                      <div className="text-xs font-semibold text-white">
                        Mon – Sun: 09:00 – 17:00 WAT
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Walk-in appointments and corporate visits welcome.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-3">
                    <Lock className="w-4 h-4 text-[#4DA5EC] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Physical Document Vault Protocol:</strong> All client passports, academic certificates, and original transcripts submitted for MFA attestation in Abuja are locked in biometric fireproof security vaults.
                    </span>
                  </div>

                  <div className="pt-2">
                    <CopyCACButton />
                  </div>
                </div>

                {/* Right: High-Res CAC Certificate Showcase Frame */}
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

        {/* ── 7. EXECUTIVE LEADERSHIP COUNCIL ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Users className="w-3.5 h-3.5" />
                Senior Leadership &amp; Counsel
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Meet Our Leadership Team
              </h2>
              <p className="text-xs sm:text-base text-slate-400">
                Senior immigration specialists, legal compliance officers, and international admissions counselors steering your journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="p-7 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent hover:from-white/[0.08] hover:via-white/[0.04] border border-white/15 hover:border-[#257CFF]/50 transition-all duration-300 backdrop-blur-2xl flex flex-col justify-between shadow-2xl group hover:-translate-y-1.5"
                >
                  <div className="space-y-5">
                    {/* Portrait */}
                    <div
                      className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/15 shadow-inner"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-emerald-400 font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 w-fit">
                        {member.department}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-heading font-black text-xl text-white group-hover:text-[#4DA5EC] transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-xs font-bold text-[#4DA5EC] mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Institutional Credentials
                    </div>
                    <ul className="space-y-1.5">
                      {member.credentials.map((cred, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{cred}</span>
                        </li>
                      ))}
                    </ul>

                    {member.emailContact && (
                      <div className="pt-2">
                        <a
                          href={`mailto:${member.emailContact}`}
                          className="inline-flex items-center gap-2 text-xs font-mono text-[#4DA5EC] hover:text-white transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{member.emailContact}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. THE CONSULAR VERACITY ACCORDION (FAQ) ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <HelpCircle className="w-3.5 h-3.5" />
                Frequently Answered Questions
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                Institutional Transparency &amp; Consular Truth
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Direct answers to the most important questions clients and corporate bodies ask about Sijam Consults.
              </p>
            </div>

            <Accordion items={faqItems} allowMultiple={false} variant="dark" />
          </div>
        </section>

        {/* ── 9. EXECUTIVE INVITATION (FINAL CTA) ── */}
        <section className="py-20 bg-gradient-to-b from-[#0A061C] to-[#070415] relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#18233C] via-[#0E1627] to-[#070415] border border-white/20 shadow-[0_30px_90px_rgba(37,124,255,0.25)] ring-1 ring-[#4DA5EC]/30 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(37,124,255,0.2),_transparent_70%)] pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs text-[#4DA5EC] font-mono font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>EXECUTIVE INTAKE • CADRE OF EXCELLENCE</span>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
                  Ready to Structure Your Legitimate Global Journey?
                </h2>
                <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                  Schedule your comprehensive consular pre-assessment today. Meet our senior directors in person at Kaduna or via encrypted video consultation.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href={ROUTES.consultation}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#1E6DEB] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover hover:scale-102 transition-all active:scale-98"
                >
                  <Mail className="w-4 h-4" />
                  <span>Book Executive Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${COMPANY.phones.primaryRaw}`}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-xs border border-white/15 backdrop-blur-xl transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Call {COMPANY.phones.primary}</span>
                </a>
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
