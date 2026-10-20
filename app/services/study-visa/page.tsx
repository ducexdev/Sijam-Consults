import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  GraduationCap,
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
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { StudyVisaCalculator } from '@/components/services/StudyVisaCalculator';
import { SERVICES_DATA } from '@/lib/data/services';
import { ROUTES, COMPANY } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Study Abroad Consultants in Nigeria | Sijam Consults',
  description:
    'Gain direct admission to accredited universities in Cyprus, Poland, Spain, and Canada. Comprehensive study visa packaging and up to 50% tuition grant guidance.',
  keywords: [
    'study abroad consultants in nigeria',
    'study visa consultant in nigeria',
    'student visa application assistance',
    'cheapest countries to study abroad for nigerian students',
    'cyprus university admissions nigeria',
    'Cyprus West University',
    'Poland student visa from Nigeria',
    'tuition grant advisory nigeria',
    'Sijam Consults',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/services/study-visa',
  },
};

const STUDY_VISA_FAQS: AccordionItem[] = [
  {
    question: 'How does Sijam Consults secure up to 50% tuition grants for Nigerian students?',
    answer:
      `We hold bilateral institutional representation agreements with accredited European and Mediterranean institutions, notably Cyprus West University and partner business colleges in Poland. Because we liaise directly with university international admissions boards, our eligible undergraduate and master's applicants are granted direct merit tuition fee waivers without inflated third-party intermediary markups.`,
  },
  {
    question: 'Can I study in Europe without writing IELTS or TOEFL?',
    answer:
      'Yes. For many accredited institutions in Cyprus, Poland, Malta, and Portugal, Nigerian students who hold a WAEC or NECO certificate with a credit grade (C6 or higher) in English Language, or a verified English Medium of Instruction letter from a recognized Nigerian tertiary institution, are exempt from IELTS and TOEFL requirements.',
  },
  {
    question: 'Does university admission guarantee that my student visa will be approved?',
    answer:
      'No, and any consultant claiming otherwise is being dishonest. University admission confirms your academic eligibility at an educational institution; however, visa issuance remains the exclusive sovereign legal prerogative of foreign embassies and high commissions. At Sijam Consults, we decouple admission from visa processing by subjecting your financial, identity, and intent documents to forensic consular audits before submission.',
  },
  {
    question: 'How much money must I show as Proof of Funds (POF) for a European student visa?',
    answer:
      'Requirements vary by destination. For Northern Cyprus, proof of €3,500 – €5,000 in living costs is typically sufficient. For a Poland National Type-D student visa, consulates mandate proof of living expenses (approx. €800/month for 12 months), return travel funds, and first-year tuition, amounting to approximately €12,100 (around ₦21M–₦25M with our recommended 20% volatility safety buffer). In the UK, you must show £9,207 (outside London) or £12,006 (in London) plus remaining unpaid tuition held untouched for 28 consecutive days.',
  },
  {
    question: 'Can I work legally as a Nigerian student while studying abroad?',
    answer:
      'Yes, within statutory limits. In Poland, international students on a full-time National Type-D visa enjoy the right to work up to 20 hours per week during term time and full-time during official semester breaks. In the UK, international students on a Student Route visa are legally permitted 20 hours per week during term time. In Cyprus, on-campus and local student employment frameworks are open to enrolled students.',
  },
  {
    question: 'How do you protect students from Naira exchange rate volatility when paying tuition?',
    answer:
      'We advise applicants on official Central Bank of Nigeria (CBN) Form A / PTA remittance protocols and direct international invoice settlement channels. Furthermore, our financial advisors calculate a mandatory 20% foreign exchange volatility buffer so that currency shifts during the 4 to 8-week visa review window do not leave your account short of the statutory living benchmark.',
  },
];

export default function StudyVisaPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'study-visa');
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: STUDY_VISA_FAQS.map((faq) => ({
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
          { label: 'Study Abroad & Admissions', href: '/services/study-visa' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* Ambient atmospheric lighting */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#402493]/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-96 left-[-100px] w-[500px] h-[500px] bg-[#257CFF]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-[#DC2F11]/10 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-8 pb-20">
          {/* Breadcrumbs Navigation */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: 'Services', href: '/services' },
                { label: 'Study Abroad & Admissions' },
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
                    Study Abroad Advisory
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <Shield className="w-3 h-3 text-[#4DA5EC]" />
                    Up to 50% Tuition Grants
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                    <GraduationCap className="w-3 h-3 text-emerald-400" />
                    WAEC C6+ English Waivers
                  </span>
                </div>

                {/* H1 — matches homepage font sizing exactly */}
                <h1 className="font-heading font-black text-[24px] sm:text-[30px] lg:text-[42px] xl:text-[52px] text-white leading-[1.15] tracking-tight">
                  Gain Direct Admission to Accredited Universities.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                    With Up to 50% Tuition Grants
                  </span>{' '}
                  and Consular Precision.
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                  Studying abroad should not cost your family&apos;s life savings or end in a heartbreaking visa
                  refusal. Sijam Consults connects Nigerian students directly to accredited universities across Cyprus,
                  Poland, the UK, and Canada while auditing your financial dossier to meet strict embassy standards.
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
                    <strong className="text-white">Verified student admissions & visa filings</strong> across Cyprus,
                    Poland, UK & Canada corridors
                  </p>
                </div>

                {/* CTA Buttons — exactly the homepage button style */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href={ROUTES.consultation}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Book admissions consultation</span>
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
                    href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20would%20like%20to%20apply%20for%20a%20study%20abroad%20admission.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Active Study Corridors Pill Bar */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Study Corridors:</span>
                  {[
                    '🇨🇾 Cyprus (50% Grants)',
                    '🇵🇱 Poland (Schengen)',
                    '🇬🇧 UK (2-Yr Graduate Route)',
                    '🇨🇦 Canada (PR Track)',
                    '🇬🇷 Malta & Greece',
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
                {/* Proof metrics cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-white">50% Off</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Guaranteed Merit Grants</div>
                    <div className="mt-2 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Cyprus West University
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-[#4DA5EC]">€1,800/yr</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Starting Tuition Rates</div>
                    <div className="mt-2 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> After institutional grant
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-white">WAEC C6+</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">English Waiver — No IELTS</div>
                    <div className="mt-2 text-[10px] font-semibold text-[#4DA5EC] flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Save up to ₦280,000
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all flex flex-col">
                    <div className="text-2xl font-black text-[#F45A2A]">98.4%</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Consular Audit Accuracy</div>
                    <div className="mt-2 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> First-pass approvals
                    </div>
                  </div>
                </div>

                {/* Visa stamps row */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { src: '/visas/10-1.png', caption: 'Student D-Visa' },
                    { src: '/visas/4.png', caption: 'UK Entry' },
                    { src: '/visas/6.png', caption: 'Schengen' },
                    { src: '/visas/1.png', caption: 'Poland' },
                  ].map((stamp, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl bg-[#0B071E] border border-white/10 overflow-hidden p-1.5 hover:border-[#4DA5EC]/50 transition-all"
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
              SECTION 2: INTERACTIVE ADMISSIONS & GRANT CALCULATOR
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28">
            <StudyVisaCalculator />
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 3: WHY NIGERIAN STUDENTS GET DENIED
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40 mb-3">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Unspoken Reality</span>
              </div>
              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
                Why Thousands of Nigerian Students Lose Fees &amp; Face Visa Refusals
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                Securing an admission letter is only 30% of the journey. Inexperienced agents often treat admission as
                the end goal, leaving students unprepared for the forensic scrutiny of foreign embassies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  01
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-white">
                  The &quot;Sub-Agent Markup&quot; Trap
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Many local middlemen act as third-party brokers, tacking on $1,500 to $3,000 in hidden fees to free
                  university application forms. Worse, they divert tuition deposits into personal bank accounts rather
                  than paying the university directly, leaving students stranded without verified receipts.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  02
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-white">
                  Sudden &quot;Show Money&quot; Bank Deposits
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Dumping ₦15,000,000 into a fresh account two weeks before your embassy date triggers an immediate
                  document fraud flag. Consulates in Abuja and Lagos look for 90 to 180-day seasoning, steady payroll or
                  business credits, and legal affidavits of support.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  03
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-white">
                  Currency Devaluation During Visa Processing
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  When the Naira devalues while an application is pending, a bank balance that was adequate on the day of
                  submission can fall below the statutory threshold when reviewed by an officer 6 weeks later. Without a
                  proper buffer, the application gets refused.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  04
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-white">
                  Copy-Pasted Statements of Purpose (SOP)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Submitting generic, AI-generated, or copied letters of intent that fail to explain career progression,
                  course choices, or economic incentives to return to Nigeria leads to instant rejection under standard
                  immigration statutes.
                </p>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 4: THE SIJAM 4-STAGE ARCHITECTURE
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>The Sijam Strategic Framework</span>
              </div>
              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
                Our 4-Stage Admissions &amp; Consular Packaging Protocol
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                How we guide applicants from transcript evaluation to visa vignette collection with institutional
                precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Stage 1</div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">Academic Audit &amp; Course Match</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    We review your WAEC/NECO scratch cards, undergraduate degrees, and career trajectory to select
                    accredited courses with high admission and visa feasibility.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct university screening
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Stage 2</div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">Direct Admission &amp; Grants</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    We secure your official acceptance letter directly from partner institutions, applying guaranteed
                    tuition merit discounts (up to 50%) without third-party brokers.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Up to 50% tuition discount
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Stage 3</div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">Legalisation &amp; Funds Seasoning</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    MFA Abuja attestation, police character certification, and 90-day bank statement seasoning with a
                    mandatory 20% exchange-rate volatility buffer.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Seasoned proof of funds
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Stage 4</div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">Consular Dossier &amp; Mock Drill</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Custom-written academic statements of purpose, biometric slot scheduling, and rigorous 1-on-1 mock
                    interview drills led by former consular advisors.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Embassy interview ready
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 5: DESTINATION BENCHMARK MATRIX
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-3">
                <Scale className="w-3.5 h-3.5" />
                <span>Information Gain Comparison</span>
              </div>
              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
                Tuition, Cost &amp; Work Rights by Study Destination
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                Real numbers across key corridors — match your family&apos;s budget and post-graduation career ambitions.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0B071E]">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-white/[0.05] text-slate-200 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">Destination Corridor</th>
                    <th className="py-4 px-4">Annual Tuition (Net)</th>
                    <th className="py-4 px-4">English Requirement</th>
                    <th className="py-4 px-4">Work Rights</th>
                    <th className="py-4 px-4">Post-Study Work</th>
                    <th className="py-4 px-4">Consular Living Buffer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-normal">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      🇨🇾 Northern Cyprus (Cyprus West Univ.)
                    </td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">€1,800 – €2,800 (50% Grant)</td>
                    <td className="py-4 px-4 text-emerald-400 font-semibold">WAEC C6+ Waiver</td>
                    <td className="py-4 px-4">On-campus / local student work</td>
                    <td className="py-4 px-4">1-Year Stay-Back</td>
                    <td className="py-4 px-4">€3,500 – €5,000</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      🇵🇱 Poland (College of Economics &amp; Tech)
                    </td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">€2,500 – €3,800</td>
                    <td className="py-4 px-4 text-emerald-400 font-semibold">Medium of Instruction Waiver</td>
                    <td className="py-4 px-4">20 hrs/wk legal work (Schengen)</td>
                    <td className="py-4 px-4">9-Month Job Search Card</td>
                    <td className="py-4 px-4">€12,100 (approx. ₦21M – ₦25M)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      🇬🇧 United Kingdom (British Univ. Network)
                    </td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">£11,500 – £15,000 (after grant)</td>
                    <td className="py-4 px-4">WAEC C6+ (Select Univs) / IELTS</td>
                    <td className="py-4 px-4">20 hrs/wk term-time</td>
                    <td className="py-4 px-4">2-Year Graduate Route</td>
                    <td className="py-4 px-4">£9,207 or £12,006 + Tuition (28 days)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      🇨🇦 Canada (Designated Learning Inst.)
                    </td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">CAD $15,000 – $22,000</td>
                    <td className="py-4 px-4">IELTS 6.0+ or PTE Academic</td>
                    <td className="py-4 px-4">Up to 24 hrs/wk off-campus</td>
                    <td className="py-4 px-4">Up to 3-Year PGWP (Direct PR track)</td>
                    <td className="py-4 px-4">CAD $20,635 + Full 1st Year Tuition</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 6: WAEC ENGLISH WAIVER PROTOCOL
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="p-6 sm:p-9 rounded-3xl bg-[#0B071E] border border-[#257CFF]/30 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Cost-Saving Intelligence</span>
                  </div>
                  <h2 className="font-heading font-black text-[20px] sm:text-[26px] lg:text-[32px] text-white tracking-tight">
                    The WAEC C6+ English Waiver Framework: Save ₦280,000 on IELTS
                  </h2>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shrink-0">
                  Zero IELTS for 75% of European Corridors
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Many Nigerian students waste upwards of ₦280,000 sitting for IELTS or PTE examinations that their
                target European universities do not even require. Because Nigeria is an Anglophone nation where primary,
                secondary, and tertiary education is delivered in English, our partner institutions in Northern Cyprus,
                Poland, and parts of the UK accept verified WAEC/NECO scratch cards with an official English Medium of
                Instruction letter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WAEC / NECO Result</div>
                  <div className="text-sm font-bold text-white">Grade A1 to C6 in English</div>
                  <p className="text-slate-400 leading-relaxed">
                    Satisfies institutional English proficiency requirements for direct degree entry at Cyprus West
                    University and Polish partner faculties.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">University Degree Holders</div>
                  <div className="text-sm font-bold text-white">Medium of Instruction Letter</div>
                  <p className="text-slate-400 leading-relaxed">
                    Nigerian university graduates applying for European Master&apos;s degrees use an official letter from
                    their Registrar confirming their B.Sc. was taught in English.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">When IELTS Is Necessary</div>
                  <div className="text-sm font-bold text-amber-400">Canadian SDS &amp; Certain UK Routes</div>
                  <p className="text-slate-400 leading-relaxed">
                    Only required for Canadian SDS streams and UK universities that do not recognize WAEC. We tell you
                    the truth before you register for the test.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 7: DECOUPLING ADMISSION FROM VISA APPROVAL
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="p-6 sm:p-9 rounded-3xl bg-[#0B071E] border border-amber-500/20 relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Consular Law Transparency</span>
              </div>
              <h2 className="font-heading font-black text-[20px] sm:text-[26px] lg:text-[32px] text-white tracking-tight mb-4">
                Why We Strictly Decouple University Admission from Visa Approval
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Our practical opinion: The biggest deception in the Nigerian travel consulting industry is the phrase
                &quot;100% Guaranteed Student Visa.&quot; Universities issue acceptance letters because you meet their
                academic standards. Consular officers issue visas only if you satisfy sovereign immigration law,
                demonstrate unencumbered living funds, and prove home ties. Confusing the two is why many students lose
                non-refundable flight tickets and tuition deposits.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4DA5EC]" />
                    Academic Admission (The University&apos;s Role)
                  </div>
                  <p className="text-slate-400 leading-relaxed text-xs">
                    Evaluates grades, transcripts, and course prerequisites. Once verified, the university issues a
                    Letter of Acceptance or CAS. They have zero legal say in whether an embassy grants your visa.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Consular Assessment (The Embassy&apos;s Prerogative)
                  </div>
                  <p className="text-slate-400 leading-relaxed text-xs">
                    Evaluates financial seasoning, source of wealth, criminal records, and genuine intention to study.
                    This is where Sijam Consults conducts forensic file audits to ensure your file meets consular
                    statutes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 8: AUTHENTIC VISA APPROVALS
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Client Outcomes</span>
              </div>
              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
                Real Student Visas Delivered for Nigerian Applicants
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                Evidence over empty promises. Official consular entry vignettes and residence authorizations
                secured by our student advisory team.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { src: '/visas/10-1.png', caption: 'European National D Student Visa' },
                { src: '/visas/4.png', caption: 'UK Student Route Entry Clearance' },
                { src: '/visas/6.png', caption: 'Schengen Multi-Entry Residence' },
                { src: '/visas/1.png', caption: 'Poland Higher Education D-Visa' },
              ].map((stamp, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-[#0B071E] border border-white/10 overflow-hidden p-2 hover:border-[#4DA5EC]/50 transition-all"
                >
                  <div className="relative h-44 w-full rounded-xl overflow-hidden bg-black/40">
                    <Image
                      src={stamp.src}
                      alt={stamp.caption}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 filter contrast-110"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <div className="text-[11px] font-bold text-slate-200">{stamp.caption}</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">Verified by Sijam Consults</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 9: RADICAL HONESTY DISQUALIFICATION
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-4xl mx-auto">
            <div className="p-6 sm:p-9 rounded-3xl bg-white/[0.02] border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <XCircle className="w-4 h-4" />
                <span>Radical Transparency</span>
              </div>
              <h2 className="font-heading font-black text-[20px] sm:text-[26px] lg:text-[32px] text-white tracking-tight mb-4">
                We May Not Be the Right Study Abroad Consultancy for You If...
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Sijam Consults maintains direct bilateral university relationships and strict ethical standards. We work
                only with applicants committed to legitimate, verifiable academic pathways.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>You are asking for forged WAEC scratch cards or altered academic transcripts.</strong> We
                    conduct direct verification with the West African Examinations Council and university registries.
                    Altered credentials result in immediate termination of engagement.
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>You want a &quot;100% guaranteed visa&quot; promise.</strong> Consular officers are sovereign
                    government officials. We prepare your file with forensic precision, but we do not sell fake
                    guarantees.
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>You are looking for unaccredited diploma mills solely to bypass border control.</strong> We
                    only represent officially accredited higher education institutions recognized by national ministries
                    of education.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 10: FREQUENTLY ASKED QUESTIONS
          ───────────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Answered Inquiries</span>
              </div>
              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight">
                Practical Answers for Nigerian Students &amp; Parents
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
                Clear guidance on partner universities, tuition grants, bank statement seasoning, and visa interviews.
              </p>
            </div>

            <Accordion items={STUDY_VISA_FAQS} variant="dark" allowMultiple={false} />
          </section>

          {/* ─────────────────────────────────────────────────
              SECTION 11: CONVERSION CTA STRIP
          ───────────────────────────────────────────────── */}
          <section className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B071E] via-[#110A2E] to-[#1B0F47] border border-[#257CFF]/30 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/15 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Take the Next Step With Institutional Backing</span>
              </span>

              <h2 className="font-heading font-black text-[20px] sm:text-[28px] lg:text-[36px] text-white tracking-tight max-w-xl mx-auto">
                Ready to Review Your Study Abroad Options With an Advisor?
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-3 leading-relaxed">
                Schedule a 1-on-1 strategy session with our international admissions team. We review your WAEC/degree
                results, check tuition grant eligibility, and calculate your required proof of funds.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={ROUTES.consultation}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Book 1-on-1 admissions session</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20would%20like%20to%20apply%20for%20a%20study%20abroad%20admission%20and%20tuition%20grant.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Chat with an advisor on WhatsApp</span>
                </a>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href={ROUTES.assessment}
                  className="text-xs text-slate-400 hover:text-white underline transition-colors"
                >
                  Or calculate your full profile eligibility with our free 2-minute diagnostic tool &rarr;
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
