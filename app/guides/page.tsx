import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
  BookOpen,
  GraduationCap,
  Briefcase,
  Search,
  ExternalLink,
  Coins,
  MapPin,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { ArticleDirectory } from '@/components/guides/ArticleDirectory';
import { RelocationCorridorComparator } from '@/components/guides/RelocationCorridorComparator';
import { GUIDES_DATA } from '@/lib/data/guides';
import { dbRepository } from '@/lib/db/repository';
import { blogRecordToGuideArticle } from '@/lib/data/blog';
import { ROUTES, COMPANY } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Authoritative Immigration & Relocation Guides | Sijam',
  description:
    'Fact-checked immigration, work permit, and study abroad guides for Nigerians. In-depth analysis of European visa requirements and international salary thresholds.',
  keywords: [
    'immigration and travel guides for nigerians',
    'study abroad guide for nigerian students',
    'how to evaluate a foreign job offer',
    'visa application checklist and document guide',
    'schengen d visa requirements explained',
    'poland work permit guide nigeria',
    'cyprus west university admissions guide',
    'nursing in canada roadmap from nigeria',
    'Sijam Consults relocation guides',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/guides',
  },
};

const GUIDES_FAQS: AccordionItem[] = [
  {
    question: 'How do Sijam Consults guides differ from free social media "japa" advice?',
    answer: `Most internet relocation advice is written by anonymous influencers, third-party sub-agents, or successful migrants whose individual circumstances do not apply to your profile. Sijam Consults guides are authored directly by licensed immigration and human resource consultants with over a decade of casework experience. Every article cites sovereign immigration acts (such as Polish Voivodeship labor regulations, UKVI Immigration Rules Appendix V, or Canadian IRPR codes), provides statutory salary benchmarks, and details actual embassy document verification procedures.`,
  },
  {
    question: 'What is the most common reason Nigerian relocation plans collapse financially?',
    answer: `Currency fluctuation and unbuffered Proof of Funds (POF). Many applicants calculate their required bank balance at current Central Bank of Nigeria (CBN) rates without factoring in the 4 to 8-week embassy review period. If the Naira depreciates while your passport is with consular officers, your account balance in foreign currency equivalent dips below the statutory threshold, triggering an automatic refusal for inadequate financial maintenance. We mandate a 20% foreign exchange volatility buffer in all our relocation financial blueprints.`,
  },
  {
    question: 'Can I study in Europe without writing IELTS or TOEFL exams?',
    answer: `Yes, in numerous accredited European destinations. In Northern Cyprus (such as Cyprus West University), Poland, Malta, and select private institutions across Germany and Spain, Nigerian students who attained a C6 or higher in WAEC or NECO English, or who hold a verified English Medium of Instruction letter from a recognized Nigerian university, are granted complete English language examination waivers. Our educational guides clearly flag which universities accept WAEC English waivers.`,
  },
  {
    question: 'How can I verify whether an overseas job offer or work permit is authentic?',
    answer: `Never pay for an overseas job without three verifiable proofs: 1) Verify the employer's national company registration number (such as the KRS or CEIDG registry in Poland, Companies House in the UK, or the local Commercial Register in Slovakia); 2) In the UK, verify that the sponsoring employer is actively listed on the Home Office Register of Licensed Sponsors; 3) In Europe, demand to see the physical labor authorization issued by the provincial Voivodeship or Central Labour Office before paying any fees. Sijam provides pre-filing employer verification to safeguard candidates.`,
  },
  {
    question: 'What personal Nigerian documents must be legalized by MFA Abuja before relocation?',
    answer: `For European work and student visas (particularly National Type D routes), standard consular protocols mandate that your Police Character Certificate (issued by the Nigeria Police Force CID), educational credentials (degree certificates and transcripts), and civil status records (birth or marriage certificates) must be authenticated by the Ministry of Foreign Affairs (MFA Abuja) and, where required, attested by the Federal Ministry of Education (FME) and the host country embassy.`,
  },
  {
    question: 'Are tuition installment payments allowed for Nigerian students studying abroad?',
    answer: `Yes. Under our bilateral agreements with accredited European partners (notably Cyprus West University and partner institutions in Poland), African students are not forced to pay full multi-year fees upfront. Students typically pay an initial deposit to trigger unconditional acceptance letters and visa sponsorship, with the remaining balance split across transparent semester-based installment plans.`,
  },
];

const RELOCATION_VULNERABILITIES = [
  {
    icon: Coins,
    title: 'Unbuffered Proof of Funds & Naira Volatility',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    description:
      'Calculating embassy maintenance funds down to the exact Naira without a 20% exchange buffer. When foreign currencies surge during visa processing, the bank balance fails statutory minimums.',
  },
  {
    icon: AlertTriangle,
    title: 'Unverified "Sub-Agent" Markups & Ghost Jobs',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    description:
      'Paying predatory intermediaries millions of Naira for unverified WhatsApp job offers. Genuine European work permits must originate directly from licensed employers through provincial labor offices.',
  },
  {
    icon: FileText,
    title: 'Clerical Mismatch & Unattested Certificates',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    description:
      'Submitting police character reports, degree certificates, or corporate records without mandatory Ministry of Foreign Affairs (MFA Abuja) attestations, resulting in instant rejection.',
  },
  {
    icon: GraduationCap,
    title: 'Unnecessary Testing & Ignored Language Waivers',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    description:
      'Spending ₦180,000+ on repetitive English language exams when the target institution officially recognizes WAEC/NECO credit grades or tertiary English Medium of Instruction certificates.',
  },
];

const SOVEREIGN_MATRIX = [
  {
    corridor: 'Northern Cyprus (CWU)',
    flag: '🇨🇾',
    pathway: 'Higher Education (BSc / MSc)',
    tuitionBenchmark: '€1,800 – €2,800/year (with 50% merit grant)',
    minPOF: '€3,500 – €5,000 in bank account',
    workRights: 'On-campus & local student employment',
    englishPolicy: 'WAEC C6+ English waiver accepted (Zero IELTS)',
    leadTime: '3–7 days admission + 2–4 weeks transit visa',
  },
  {
    corridor: 'Poland (Schengen Zone)',
    flag: '🇵🇱',
    pathway: 'Voivodeship Type A Work & Study',
    tuitionBenchmark: 'Study: €2,500 – €3,800/yr | Min Wage: 4,300 PLN/mo',
    minPOF: 'Study: €12,100 (~₦21M–₦25M) | Work: Employer backed',
    workRights: 'Students: 20 hrs/wk | Workers: Full-time (40 hrs/wk)',
    englishPolicy: 'Medium of instruction proof or WAEC waiver',
    leadTime: 'Permit: 6–14 weeks | Consular visa: 3–5 weeks',
  },
  {
    corridor: 'Slovakia (Central Europe)',
    flag: '🇸🇰',
    pathway: 'Single Residence & Work Permit',
    tuitionBenchmark: 'Work: €750 – €1,200/mo base gross plus allowances',
    minPOF: 'Covered by binding statutory employment contract',
    workRights: 'Full-time employment under unified Single Permit',
    englishPolicy: 'English proof accepted; basic Slovak for trades',
    leadTime: '20-day vacancy check + 60–90 days Single Permit',
  },
  {
    corridor: 'United Kingdom',
    flag: '🇬🇧',
    pathway: 'Student Route & Skilled Worker (CoS)',
    tuitionBenchmark: 'Study: £11,500 – £16,000/yr | Work: £26,200 – £38,700/yr',
    minPOF: 'Study: £9,207–£12,006 (28 days) | Work: £1,270 (28 days)',
    workRights: 'Students: 20 hrs/wk term-time | Workers: Sponsored role',
    englishPolicy: 'IELTS Academic/UKVI or select university WAEC waivers',
    leadTime: 'CAS / CoS: 1–3 weeks | Visa decision: 3–6 weeks',
  },
];

const BLUEPRINT_STEPS = [
  {
    step: 1,
    title: 'Eligibility & Profile Forensic Audit',
    desc: 'Evaluate your academic credentials, work history, and true liquid budget against current foreign immigration gazettes and shortage occupation lists.',
    timeline: '24–48 Hours',
    icon: ClipboardCheck,
  },
  {
    step: 2,
    title: 'Corridor & Institution Matching',
    desc: 'Select the optimal sovereign corridor (Poland, Cyprus, Slovakia, UK, or Canada) that matches your timeline, budget constraints, and long-term residency goals.',
    timeline: '3–5 Business Days',
    icon: Compass,
  },
  {
    step: 3,
    title: 'Institutional Admission or Labor Clearance',
    desc: 'Liaise directly with accredited university admissions boards or verified foreign employers to secure official offer letters or Voivodeship labor authorizations.',
    timeline: '2–8 Weeks',
    icon: Building,
  },
  {
    step: 4,
    title: 'Consular Dossier Assembly & Document Attestation',
    desc: 'Audit bank statements for funds-flow compliance, authenticate police character reports at MFA Abuja, and compile your 47-point embassy visa packet.',
    timeline: '1–2 Weeks',
    icon: FileText,
  },
  {
    step: 5,
    title: 'Consular Submission & Pre-Departure Briefing',
    desc: 'Attend biometrics submission with confidence. Upon visa issuance, complete mandatory pre-departure orientation on foreign labor rights and airport arrival protocols.',
    timeline: 'Pre-Travel Week',
    icon: BadgeCheck,
  },
];

export default async function GuidesPage() {
  const dbGuides = await dbRepository.getBlogPosts({ type: 'guide', status: 'published' });
  const dbArticles = dbGuides.map(blogRecordToGuideArticle);
  const staticSlugs = new Set(GUIDES_DATA.map((g) => g.slug));
  const allArticles = [
    ...GUIDES_DATA,
    ...dbArticles.filter((g) => !staticSlugs.has(g.slug)),
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GUIDES_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp.number}?text=${encodeURIComponent(
    'Hello Sijam Consults, I am reading your Immigration & Relocation Guides and would like to speak with an advisor about my relocation plans.',
  )}`;

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={[{ label: 'Relocation Guides', href: ROUTES.guides.root }]} />

      {/* ── HERO SECTION (2-COLUMN OPPOSITE LAYOUT) ─────────────────────── */}
      <section className="relative bg-[#070415] text-white overflow-hidden min-h-[90vh] flex flex-col justify-center">
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
              <Breadcrumbs items={[{ label: 'Immigration & Relocation Guides', href: ROUTES.guides.root }]} />

              {/* Trust badge strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[10px] font-black uppercase tracking-widest text-purple-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse" />
                  Forensic Consular Research &amp; Intelligence Hub
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <ShieldCheck className="w-3 h-3 text-[#4DA5EC]" />
                  Fact-Checked Statutory Roadmaps
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                  <Scale className="w-3 h-3 text-emerald-400" />
                  Official Foreign Gazettes
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                Authoritative Immigration &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Relocation Guides
                </span>{' '}
                for Nigerians
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Real relocation is governed by sovereign immigration laws, statutory salary baselines, and strict consular evidence standards. Our intelligence hub delivers verified roadmaps written directly by senior documentation advisors to protect your capital and ensure lawful international mobility.
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
                  <strong className="text-white">100% verified legal pathways</strong> covering European Voivodeship permits, CWU 50% tuition grants, and UK/Canada guidelines
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#articles-directory"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore relocation guides</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
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

              {/* Active Topics pill bar */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Active intelligence topics:</span>
                {[
                  'Poland Voivodeship Type A',
                  'Cyprus West 50% Grants',
                  'Canada Nursing Pathways',
                  'Schengen D-Visa Regulations',
                  'Proof of Funds Structuring',
                ].map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Visual Relocation Intelligence Radar HUD */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#0B071E] p-5 space-y-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#4DA5EC]/15 flex items-center justify-center">
                      <Compass className="w-3.5 h-3.5 text-[#4DA5EC]" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Relocation Intelligence Radar
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    2026/2027 Updated
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      topic: 'Poland Work Permit Regulations (Type A)',
                      corridor: '🇵🇱 Europe / Schengen',
                      status: 'Verified',
                      color: 'text-emerald-400',
                    },
                    {
                      topic: 'CWU International Tuition Grant Framework',
                      corridor: '🇨🇾 Northern Cyprus',
                      status: '50% Active',
                      color: 'text-[#4DA5EC]',
                    },
                    {
                      topic: 'Canada Nursing License & NCLEX-RN Roadmap',
                      corridor: '🇨🇦 North America',
                      status: 'Updated',
                      color: 'text-purple-400',
                    },
                    {
                      topic: 'Schengen National D-Type Company Formation',
                      corridor: '🇪🇺 Central Europe',
                      status: 'Statutory',
                      color: 'text-amber-400',
                    },
                    {
                      topic: 'Proof of Funds FX Volatility Protocol',
                      corridor: '₦ / € / £ Forex',
                      status: '+20% Buffer',
                      color: 'text-emerald-400',
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white">{row.topic}</div>
                        <div className="text-[10px] text-slate-400">{row.corridor}</div>
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 ${row.color}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">✓ Editorial Standard:</span> Fact-checked against official sovereign immigration portals
                </div>
              </div>

              {/* 2 Quick proof cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4DA5EC]/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-[#4DA5EC]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#4DA5EC]">In-Depth Guides</div>
                    <div className="text-[10px] text-slate-400">Detailed statutory analyses</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-emerald-400">Zero Hearsay</div>
                    <div className="text-[10px] text-slate-400">Citing legal gazettes</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOOK / PROBLEM EXPLANATION ──────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DC2F11]/10 border border-[#DC2F11]/30 text-[11px] font-black uppercase tracking-widest text-red-300">
              <AlertTriangle className="w-3 h-3" />
              The Cost of Bad Information
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
              Unverified Relocation Advice Costs Nigerian Families Millions of Naira Every Year
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              When prospective migrants rely on unverified social media tips, WhatsApp forwards, or unlicensed intermediaries, the fallout is devastating: forfeited tuition deposits, fake employment letters, and multi-year entry bans.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              International relocation is not a guessing game. Embassies operate on strict administrative codes. If your bank statement displays unexplained lump-sum inflows, if your educational certificates lack mandatory Ministry of Foreign Affairs (MFA Abuja) attestations, or if your prospective employer lacks a genuine quota authorization, your application will be refused regardless of how much you paid your agent.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Sijam Consults established this Relocation Intelligence Hub to provide Nigerian candidates with <strong className="text-white">transparent, fact-checked, and commercially viable relocation roadmaps</strong> before you commit your hard-earned funds.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4 CRITICAL RELOCATION VULNERABILITIES ───────────────────────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <AlertTriangle className="w-3 h-3" />
              Avoidable Traps
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              The 4 Critical Vulnerabilities That Derail Nigerian Relocations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Understand the operational and financial pitfalls before beginning your journey:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RELOCATION_VULNERABILITIES.map((vuln) => (
              <div
                key={vuln.title}
                className="p-6 rounded-2xl bg-[#070415] border border-white/[0.06] hover:border-white/[0.15] transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${vuln.bg} flex items-center justify-center shrink-0`}>
                    <vuln.icon className={`w-5 h-5 ${vuln.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{vuln.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{vuln.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE RELOCATION CORRIDOR COMPARATOR ──────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RelocationCorridorComparator />
        </div>
      </section>

      {/* ── INFORMATION GAIN: 2026/2027 SOVEREIGN RELOCATION MATRIX ──────── */}
      <section className="bg-[#0B071E] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-black uppercase tracking-widest text-emerald-300">
              <Scale className="w-3 h-3" />
              Information Gain: Comparative Analysis
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              2026/2027 Sovereign Relocation Matrix: Cost, Wages &amp; Language Rules
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Original side-by-side legal breakdown across the top destination corridors for Nigerian professionals and students:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SOVEREIGN_MATRIX.map((item) => (
              <div
                key={item.corridor}
                className="p-6 rounded-2xl bg-[#070415] border border-white/[0.06] hover:border-white/[0.15] transition-all space-y-3.5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{item.corridor}</h3>
                      <div className="text-xs font-semibold text-[#4DA5EC]">{item.pathway}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Active Pipeline
                  </span>
                </div>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div className="flex items-start justify-between gap-2 py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-medium">Financial Baseline:</span>
                    <span className="text-slate-200 font-bold text-right">{item.tuitionBenchmark}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-medium">Proof of Funds (POF):</span>
                    <span className="text-slate-200 font-bold text-right">{item.minPOF}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-medium">Post-Arrival Work Rights:</span>
                    <span className="text-slate-200 font-bold text-right">{item.workRights}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 py-1 border-b border-white/[0.03]">
                    <span className="text-slate-400 font-medium">Language Examination:</span>
                    <span className="text-emerald-300 font-bold text-right">{item.englishPolicy}</span>
                  </div>
                  <div className="flex items-start justify-between gap-2 py-1">
                    <span className="text-slate-400 font-medium">Realistic Lead Time:</span>
                    <span className="text-[#4DA5EC] font-bold text-right">{item.leadTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-STAGE RELOCATION BLUEPRINT ─────────────────────────────────── */}
      <section className="bg-[#070415] py-16 lg:py-20 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-widest text-blue-300">
              <Zap className="w-3 h-3" />
              Actionable Framework
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              The 5-Stage Relocation Planning Blueprint
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              How Sijam Consults structures a compliant, risk-managed relocation journey from Nigeria:
            </p>
          </div>

          <div className="space-y-4">
            {BLUEPRINT_STEPS.map((step) => (
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

      {/* ── ARTICLES DIRECTORY SECTION ───────────────────────────────────── */}
      <section id="articles-directory" className="py-16 lg:py-20 bg-[#0B071E] border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[10px] font-black uppercase tracking-widest text-purple-200">
              <BookOpen className="w-3.5 h-3.5 text-[#4DA5EC]" />
              Editorial Dispatch Directory
            </span>
            <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
              Explore Our In-Depth Destination Guides
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Search by destination, visa category, or statutory framework:
            </p>
          </div>

          <ArticleDirectory articles={allArticles} basePath="guides" />
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
                  We believe in setting clear expectations before initiating any client engagement.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {[
                'You are looking for "instant work visas" or undocumented backdoor shortcuts (we operate strictly within sovereign legal frameworks).',
                'You want someone to fabricate financial statements, tax clearance certificates, or academic credentials (we maintain a zero-tolerance policy against document falsification).',
                'You expect an ethical consultant to promise a 100% visa approval guarantee (embassy visa decisions are sovereign legal prerogatives).',
                'You are unwilling to follow verified pre-departure compliance and document attestation procedures.',
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
              Frequently Asked Questions About Relocation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Fact-checked insights from licensed immigration practitioners.
            </p>
          </div>
          <Accordion items={GUIDES_FAQS} />
        </div>
      </section>

      {/* ── LEGAL DISCLAIMER ────────────────────────────────────────────── */}
      <section className="bg-[#070415] py-8 border-b border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B071E] border border-white/[0.06]">
            <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-400">Statutory Notice:</strong> Sijam Consults Limited (CAC RC: 1715416) is a licensed Nigerian educational consultancy and international travel advisory firm. The information provided in our relocation guides is for educational and strategic guidance based on current official immigration gazettes. We are not an embassy or visa-issuing body; final visa approvals remain the sovereign legal prerogative of foreign governments.
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
              Transform Your Relocation Plan
            </span>
          </div>
          <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white leading-tight tracking-tight">
            Stop Guessing with Unverified Advice.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Start with a Clear, Fact-Checked Roadmap.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Speak directly with our senior immigration and educational advisors. We audit your qualifications, calculate your exact Proof of Funds, and structure an airtight relocation strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={ROUTES.consultation}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book relocation consultation</span>
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
