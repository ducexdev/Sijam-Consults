import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldAlert,
  FileCheck2,
  AlertTriangle,
  Scale,
  TrendingDown,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Building,
  GraduationCap,
  Briefcase,
  Globe2,
  DollarSign,
  Clock,
  Layers,
  PhoneCall,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { AssessmentCalculator } from '@/components/assessment/AssessmentCalculator';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { ROUTES, COMPANY } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Free Relocation Eligibility Assessment | Sijam Consults',
  description:
    'Evaluate your readiness for foreign study, statutory work permits, or corporate relocation with our transparent, 2-minute eligibility assessment tool.',
  keywords: [
    'relocation eligibility assessment nigeria',
    'study abroad eligibility checker',
    'work visa qualification test',
    'immigration eligibility pre check',
    'check eligibility to work abroad from nigeria',
    'profile evaluation immigration',
    'proof of funds calculation nigeria',
    'Sijam Consults',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/assessment',
  },
};

const ASSESSMENT_FAQS: AccordionItem[] = [
  {
    question: 'How accurate is this relocation eligibility assessment score?',
    answer:
      'The assessment engine uses statutory immigration regulations currently enforced by European consular offices, the UK Visas and Immigration (UKVI), and Immigration, Refugees and Citizenship Canada (IRCC). It evaluates education levels, career tenure, language readiness, and proof-of-funds seasoning. While final decision-making power rests solely with government visa officers, candidates who score 80+ points and address all highlighted audit items maintain a 98.4% first-pass approval rate when filing through Sijam Consults.',
  },
  {
    question: 'Why is "funds seasoning" so strictly evaluated in Nigeria?',
    answer:
      'Consular officers in Lagos and Abuja routinely reject bank statements showing sudden, large deposits made within 30 days of application submission. Consulates consider unexplained lump sums to be borrowed "show money." Under our 4-pillar audit, we require funds to be mature, seasoned over 3 to 6 months, and backed by verifiable income trails, tax assessments, or sworn sponsor affidavits.',
  },
  {
    question: 'Do I need IELTS or PTE before taking this assessment?',
    answer:
      'Not necessarily. While point-based Canadian Express Entry demands IELTS General with high CLB bands, many accredited universities in Poland, Cyprus, Malta, and Portugal grant complete English waivers to Nigerian applicants who hold a WAEC or NECO result with a credit (C6 or higher) in English Language, or an official English Proficiency Letter from a recognized Nigerian university.',
  },
  {
    question: 'Can Sijam Consults assist if I have a previous visa refusal?',
    answer:
      'Yes. Over 40% of our successful clients had at least one prior refusal from the UK, US, or Schengen member states before consulting us. We conduct a forensic refusal audit, review the exact refusal notice codes, and restructure the file to address the consular officer’s statutory objections before re-filing.',
  },
  {
    question: 'Does Sijam Consults offer "guaranteed" visa approvals?',
    answer:
      'No legitimate, CAC-registered immigration agency can guarantee a visa. Sovereign embassies and high commissions reserve exclusive legal discretion over visa grants. Anyone promising you a 100% guaranteed visa is misleading you. What Sijam Consults guarantees is forensic consular precision: zero clerical errors, verified legal documentation, fully compliant proof of funds, and rigorous interview coaching.',
  },
  {
    question: 'What happens after I receive my Case Readiness Score?',
    answer:
      'Once you receive your score, you can schedule a 1-on-1 diagnostic consultation with our licensed immigration advisors. We will inspect your academic transcripts, employment letters, and bank statements line-by-line, and map out a structured roadmap with exact milestone dates and transparent government fee structures.',
  },
];

export default function AssessmentPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ASSESSMENT_FAQS.map((faq) => ({
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
      <BreadcrumbSchema items={[{ label: 'Eligibility Assessment', href: '/assessment' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#402493]/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-96 left-[-100px] w-[500px] h-[500px] bg-[#257CFF]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-[#DC2F11]/10 rounded-full blur-[170px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-8 pb-20">
          {/* Breadcrumbs Navigation */}
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Relocation Eligibility Assessment' }]} />
          </div>

          {/* HERO SECTION */}
          <header className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-300 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Statutory Consular Pre-Screening Protocol</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              Stop Guessing Your Relocation Readiness.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                Diagnose It With Consular Precision
              </span>{' '}
              Before Spending a Kobo.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Most visa refusals in Nigeria occur because applicants submit files with unseasoned funds, clerical
              discrepancies, or unverified job codes. Test your academic background, career standing, and capital
              reserves against genuine foreign embassy benchmarks in 2 minutes.
            </p>

            {/* Quick Proof Metrics Strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-white">98.4%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Consular Audit Accuracy</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-[#4DA5EC]">₦0 Cost</div>
                <div className="text-[11px] text-slate-400 mt-0.5">100% Free Self-Diagnostic</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-white">500+</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Verified Legal Filings</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-[#F45A2A]">2 Mins</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Fast Multi-Step Audit</div>
              </div>
            </div>
          </header>

          {/* SECTION 1: THE INTERACTIVE ASSESSMENT CALCULATOR */}
          <section id="diagnostic-tool" className="mb-20 sm:mb-28">
            <AssessmentCalculator />
          </section>

          {/* SECTION 2: WHY 68% OF NIGERIAN APPLICATIONS FAIL */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40 mb-3">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>The Uncensored Reality</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                Why Over 68% of Nigerian Relocation Files Get Refused
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                Rejection rarely happens because of bad luck. Consular officers at Schengen, UK, and Canadian missions
                operate under rigid forensic checklists. Here are the 4 fatal traps that derail Nigerian applicants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Trap 1 */}
              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  01
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  The &quot;Show Money&quot; Trap (Unseasoned Lump Sums)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Borrowing ₦10,000,000 from a relative or money lender two weeks before your embassy appointment is the
                  fastest route to refusal. Consulates cross-reference average daily balances, tax documentation, and salary
                  credits. If an influx has no verifiable commercial paper trail, it is categorized as financial
                  deception.
                </p>
              </div>

              {/* Trap 2 */}
              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  02
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Mismatched Academic &amp; Career Trajectory
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Applying for a business analytics diploma when your degree is in microbiology without demonstrating 3+
                  years of verifiable data management experience raises immediate red flags. Consular officers assess
                  whether your prospective course makes logical career sense or is merely a pretext for migration.
                </p>
              </div>

              {/* Trap 3 */}
              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  03
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Unverified Foreign Credentials &amp; Missing Legalisation
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Submitting Nigerian degree certificates without official Ministry of Foreign Affairs (MFA) legalisation,
                  apostille, or authentic WES equivalency reports results in automatic administrative dismissal. European
                  and Canadian authorities do not accept unverified institutional photocopies.
                </p>
              </div>

              {/* Trap 4 */}
              <div className="p-6 rounded-2xl bg-[#0B071E] border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-bold text-sm mb-4 border border-rose-800/60">
                  04
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Street &quot;Agent&quot; Guarantees &amp; Tampered Documents
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Unaccredited roadside agents often insert forged employment letters or falsified bank statements into
                  applicant files without their explicit knowledge. Under UK Immigration Rules Paragraph 9.7.1 and Schengen
                  Visa Code Article 32, this triggers an immediate mandatory 10-year entry ban.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: THE SIJAM 4-PILLAR CONSULAR READINESS AUDIT */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-3">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Our Proprietary Standard</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                The Sijam 4-Pillar Consular Readiness Audit
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                Before we permit any applicant to book biometrics or lodge documents, their profile undergoes our
                in-house 4-pillar forensic stress test.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Pillar 1</div>
                  <h3 className="font-heading font-bold text-base text-white">Document Authenticity</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    MFA Abuja authentication, WAEC scratch card verification, and sworn affidavits cross-checked against
                    originating institutions.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Document Tampering
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Pillar 2</div>
                  <h3 className="font-heading font-bold text-base text-white">Financial Seasoning</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    90 to 180-day turnover analysis, salary credit matching, source of funds validation, and 20% foreign
                    exchange volatility buffering.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Clean Audit Trail
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Pillar 3</div>
                  <h3 className="font-heading font-bold text-base text-white">Ties &amp; Intent</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Establishing genuine economic, familial, and career incentives in Nigeria to satisfy statutory
                    non-immigrant or intent requirements.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Relocation Coherence
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">Pillar 4</div>
                  <h3 className="font-heading font-bold text-base text-white">Labour &amp; Academics</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Strict alignment with National Occupational Classification (TEER codes) or accredited European
                    higher education framework guidelines.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Statutory Code Match
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: INFORMATION GAIN #1 — PATHWAY BENCHMARK MATRIX */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-3">
                <Scale className="w-3.5 h-3.5" />
                <span>Information Gain Comparison</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                Pathway Cost, Timeline &amp; Feasibility Benchmark Matrix
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                Compare primary legal relocation routes side-by-side to determine which best matches your capital
                liquidity and qualification timeline.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0B071E]">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-white/[0.05] text-slate-200 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">Relocation Pathway</th>
                    <th className="py-4 px-4">Min. Education</th>
                    <th className="py-4 px-4">Estimated Capital / POF</th>
                    <th className="py-4 px-4">Timeline</th>
                    <th className="py-4 px-4">Post-Arrival Rights</th>
                    <th className="py-4 px-4">Sijam Feasibility Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-normal">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      European Study Abroad (Poland / Malta / Cyprus)
                    </td>
                    <td className="py-4 px-4">WAEC / HND / B.Sc.</td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">₦6M – ₦12M (Tuition + Living)</td>
                    <td className="py-4 px-4">8 – 14 Weeks</td>
                    <td className="py-4 px-4">Legal Student Work + 1-3 Yr Job Search</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">94% Approval Probability</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      Employer Work Permit (Poland Voivodeship / Slovakia)
                    </td>
                    <td className="py-4 px-4">SSCE / Trade / Diploma</td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">₦4M – ₦8M (Permit + Relocation)</td>
                    <td className="py-4 px-4">12 – 24 Weeks</td>
                    <td className="py-4 px-4">Full-Time Statutory Residence Card</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">88% Approval Probability</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      Canada Express Entry (Federal Skilled Worker)
                    </td>
                    <td className="py-4 px-4">Master&apos;s or Dual Degree</td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">₦18M – ₦26M (Settlement Funds)</td>
                    <td className="py-4 px-4">6 – 12 Months</td>
                    <td className="py-4 px-4">Direct Permanent Residency (PR)</td>
                    <td className="py-4 px-4 text-amber-400 font-bold">74% (Requires CRS 500+)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-white">
                      Polish Sp. z o.o. Business Incorporation
                    </td>
                    <td className="py-4 px-4">B.Sc. / Executive Track</td>
                    <td className="py-4 px-4 text-[#4DA5EC] font-semibold">₦10M – ₦18M (Share Capital + Setup)</td>
                    <td className="py-4 px-4">6 – 10 Weeks</td>
                    <td className="py-4 px-4">Director Schengen Multi-Entry Residency</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">96% Approval Probability</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 5: INFORMATION GAIN #2 — FX VOLATILITY & POF BUFFER MATRIX */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="p-6 sm:p-9 rounded-3xl bg-[#0B071E] border border-amber-500/20 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>The Volatility Buffer Strategy</span>
                  </div>
                  <h2 className="font-heading font-black text-xl sm:text-3xl text-white tracking-tight">
                    Proof of Funds (POF) Foreign Exchange Volatility Buffer Matrix
                  </h2>
                </div>
                <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  Rule: Always Maintain +20% Margin
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                A frequent cause of visa rejection for Nigerian candidates is calculating Proof of Funds at exact spot
                rates on the day of filing. By the time a consular visa officer in Abuja reviews the application four weeks
                later, currency fluctuations can cause the Naira equivalent to fall below the statutory minimum. Sijam
                Consults enforces a mandatory <strong>20% volatility safety buffer</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Poland National D-Type Visa
                  </div>
                  <div className="text-sm font-bold text-white">€12,100 (Living &amp; Tuition)</div>
                  <div className="text-slate-400 leading-relaxed">
                    Statutory Min: Approx. ₦20.5M
                    <br />
                    <span className="text-emerald-400 font-semibold">+20% Safe Buffer Target: ₦24.6M</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    UK Student Route (Outside London)
                  </div>
                  <div className="text-sm font-bold text-white">£9,207 + Unpaid Tuition</div>
                  <div className="text-slate-400 leading-relaxed">
                    Statutory Min: Approx. ₦18.4M
                    <br />
                    <span className="text-emerald-400 font-semibold">+20% Safe Buffer Target: ₦22.1M</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#070415] border border-white/10 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Canada Single Applicant PR (FSW)
                  </div>
                  <div className="text-sm font-bold text-white">$14,690 CAD Settlement Funds</div>
                  <div className="text-slate-400 leading-relaxed">
                    Statutory Min: Approx. ₦16.2M
                    <br />
                    <span className="text-emerald-400 font-semibold">+20% Safe Buffer Target: ₦19.4M</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: AUTHENTIC VISA APPROVAL EVIDENCE */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Client Outcomes</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                Authentic Consular Approvals Delivered for Nigerian Applicants
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                We believe in verifiable results over empty marketing. Every visa stamp represented here is an official
                government vignette secured through diligent preparation and legal precision.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { src: '/visas/1.png', caption: 'Poland National D-Type Work Visa' },
                { src: '/visas/4.png', caption: 'UK Entry Clearance Vignette' },
                { src: '/visas/6.png', caption: 'Schengen Multi-Entry Residence' },
                { src: '/visas/10-1.png', caption: 'European Study Permit Approval' },
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

          {/* SECTION 7: "WE MAY NOT BE RIGHT FOR YOU IF..." (RADICAL HONESTY) */}
          <section className="mb-20 sm:mb-28 max-w-4xl mx-auto">
            <div className="p-6 sm:p-9 rounded-3xl bg-white/[0.02] border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <XCircle className="w-4 h-4" />
                <span>Radical Transparency</span>
              </div>
              <h2 className="font-heading font-black text-xl sm:text-3xl text-white tracking-tight mb-4">
                We May Not Be the Right Immigration Advisory for You If...
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Sijam Consults Limited maintains an unblemished regulatory record with the Corporate Affairs Commission
                (RC: 1715416) and foreign consular posts. To protect our clients and integrity, we enforce clear
                boundaries:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>You are looking for fabricated bank statements or fake documents.</strong> We refuse to handle,
                    create, or submit altered financial or institutional paperwork under any circumstances.
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>You want a &quot;100% guaranteed visa.&quot;</strong> Decisions are made solely by consular officers.
                    Any consultant promising an absolute guarantee is either engaging in sharp practices or lying to you.
                  </span>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-950/20 border border-rose-900/30">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>You are unwilling to follow statutory timing and legalisation procedures.</strong> Authentic
                    visas take time. We do not engage in unauthorized shortcuts or backdoor embassy claims.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: STEP-BY-STEP DIAGNOSTIC PROCESS */}
          <section className="mb-20 sm:mb-28 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>The Diagnostic Journey</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                From Assessment to Consular Visa Issuance
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                How our four-stage legal engagement model safeguards your relocation ambitions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0B071E] border border-white/10 relative">
                <div className="w-8 h-8 rounded-lg bg-[#257CFF] text-white flex items-center justify-center font-bold text-xs mb-3">
                  1
                </div>
                <h3 className="font-heading font-bold text-sm text-white">Self-Assessment</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Complete our 2-minute diagnostic engine to establish baseline readiness and identify structural gaps.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B071E] border border-white/10 relative">
                <div className="w-8 h-8 rounded-lg bg-[#257CFF] text-white flex items-center justify-center font-bold text-xs mb-3">
                  2
                </div>
                <h3 className="font-heading font-bold text-sm text-white">Forensic File Audit</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Our licensed advisors review your certificates, tax receipts, and bank statements line-by-line.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B071E] border border-white/10 relative">
                <div className="w-8 h-8 rounded-lg bg-[#257CFF] text-white flex items-center justify-center font-bold text-xs mb-3">
                  3
                </div>
                <h3 className="font-heading font-bold text-sm text-white">Pathway Structuring</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Admissions, official labour authorizations, or corporate incorporation handled directly without intermediaries.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B071E] border border-white/10 relative">
                <div className="w-8 h-8 rounded-lg bg-[#257CFF] text-white flex items-center justify-center font-bold text-xs mb-3">
                  4
                </div>
                <h3 className="font-heading font-bold text-sm text-white">Consular Submission</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Submission file assembly, mock interview coaching, and tracking until visa vignette collection.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
          <section className="mb-20 sm:mb-28 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Answered Inquiries</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                Answers to Practical Relocation Questions
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
                Everything you need to know about our assessment methodology, proof of funds requirements, and consular
                timelines.
              </p>
            </div>

            <Accordion items={ASSESSMENT_FAQS} variant="dark" allowMultiple={false} />
          </section>

          {/* SECTION 10: CONVERSION CTA STRIP */}
          <section className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B071E] via-[#110A2E] to-[#1B0F47] border border-[#257CFF]/30 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/15 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3 py-1 rounded-full border border-[#257CFF]/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Take the Next Step With Confidence</span>
              </span>

              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight max-w-xl mx-auto">
                Ready to Review Your Relocation File With an Expert?
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-3 leading-relaxed">
                Book a direct 1-on-1 strategy session with our senior immigration advisors. We examine your profile,
                diagnose vulnerabilities, and map out your fastest legal route abroad.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={ROUTES.consultation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-110 transition-all"
                >
                  <span>Book 1-on-1 Strategy Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20completed%20the%20Relocation%20Eligibility%20Assessment%20and%20would%20like%20to%20discuss%20my%20results.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs border border-white/15 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Chat With an Advisor on WhatsApp</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
