import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { JobsClientWrapper } from '@/components/jobs/JobsClientWrapper';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ROUTES, COMPANY } from '@/lib/routes';
import { dbRepository } from '@/lib/db/repository';
import { jobRecordToJobListing } from '@/lib/data/jobs';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Briefcase,
  Globe2,
  Users,
  FileText,
  Clock,
  Building2,
  Scale,
  PhoneCall,
  HelpCircle,
  Shield,
  Stethoscope,
  Wrench,
  Plane,
  BadgeCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verified International Job Vacancies | Sijam Consults',
  description:
    'Explore verified overseas job vacancies with direct employer sponsorship across the UK, Poland, and Slovakia for nurses, skilled trades, and technicians.',
  keywords: [
    'international job vacancies for nigerians',
    'jobs abroad for nigerians with visa sponsorship',
    'verified overseas recruitment jobs',
    'healthcare jobs in uk and poland for nigerians',
    'skilled trades jobs in europe for nigerians',
    'certificate of sponsorship nigeria',
    'direct employer sponsorship uk',
    'european employment contracts nigeria',
    'zero recruitment fee overseas jobs',
    'Sijam Consults jobs board',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/jobs',
  },
  openGraph: {
    title: 'Verified International Job Vacancies | Sijam Consults',
    description:
      'Explore verified overseas job vacancies with direct employer sponsorship across the UK, Poland, and Slovakia for nurses, skilled trades, and technicians.',
    url: 'https://sijamconsults.com/jobs',
    siteName: 'Sijam Consults Limited',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verified International Job Vacancies | Sijam Consults',
    description:
      'Explore verified overseas job vacancies with direct employer sponsorship across the UK, Poland, and Slovakia for nurses, skilled trades, and technicians.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Sijam Consults charge placement fees for international jobs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Sijam Consults Limited strictly complies with the ILO Convention on Private Employment Agencies and Nigerian law prohibiting recruitment fees from job seekers. Employer-side contracting fees are the sole financial arrangement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I verify that an international job listing is genuine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Legitimate international employers never request pre-payment for visa processing, flight tickets, or administrative fees. Every job listed on Sijam Consults has been verified against the UK Government Licensed Sponsor Register, EU labor ministry filings, or direct employer HR credentials.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Certificate of Sponsorship (CoS) and why do I need one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Certificate of Sponsorship (CoS) is a unique reference number issued by a UK Home Office-licensed employer that allows skilled workers to apply for a UK Skilled Worker Visa. Every UK job listed on Sijam Consults is only published when a verified CoS allocation exists with the employer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the minimum qualification requirements for healthcare jobs in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For Registered Nurse positions in the UK, applicants must hold a valid Nigerian Nursing and Midwifery Council (NMCN) registration, a nursing degree, and pass NMC CBT and OSCE examinations for UK registration. Care assistant roles require basic healthcare certificates and Clean NPC/police clearance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to pay for my own flight ticket when relocating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Relocation packages vary by employer. Some EU industrial employers include one-way flight reimbursements in their employment contracts, particularly for skilled trades and manufacturing roles in Poland and Slovakia. UK NHS employers frequently offer relocation grants of up to £5,000 for qualified healthcare professionals.',
      },
    },
  ],
};

export default async function JobsPage() {
  const dbJobs = await dbRepository.getJobs({ status: 'open' });
  const initialJobs = dbJobs.map(jobRecordToJobListing);

  return (
    <PublicLayout>
      <BreadcrumbSchema
        items={[{ label: 'International Jobs', href: '/jobs' }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen">

        {/* ─────────────────────────────────────────────────
            SECTION 1–6: Interactive Hero, Search, Corridors,
            Employers, Job Directory, Process, Testimonials
            (rendered by the client-side wrapper)
        ───────────────────────────────────────────────── */}
        <JobsClientWrapper initialJobs={initialJobs} />

        {/* ─────────────────────────────────────────────────
            SECTION 7: INFORMATION GAIN #1
            The Real Problem — Why Most Overseas Job Applications Fail
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                The Real Obstacles
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Why Most Nigerian Professionals Never Land Their International Job.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                Thousands of qualified nurses, welders, and engineers in Nigeria send CVs abroad every month. A fraction get through. The gap is rarely about skill—it is almost always about process, documentation, and who is actually coordinating your file on the employer side.
              </p>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
              <div className="w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center rounded-2xl bg-white/[0.03] border border-white/10 p-7 hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#DC2F11]/20 border border-[#DC2F11]/40 flex items-center justify-center text-[#DC2F11]">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Fraudulent &ldquo;Job Agents&rdquo; Without Employer Mandates
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The Nigerian recruitment market is saturated with individuals posing as overseas placement agents without any actual employer mandates. They collect processing fees of ₦150,000 to ₦500,000, promise UK or Canadian jobs, and disappear. No CoS. No contract. No employer.
                </p>
              </div>

              <div className="w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center rounded-2xl bg-white/[0.03] border border-white/10 p-7 hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Applications Sent to Employers Without Active Quota
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Most generic job portals list international positions that expired months ago or belong to employers who have already filled their immigration quota for the year. A skilled worker applying without an active sponsor quota wastes months of effort and application fees.
                </p>
              </div>

              <div className="w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center rounded-2xl bg-white/[0.03] border border-white/10 p-7 hover:border-[#4DA5EC]/40 transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#257CFF]/20 border border-[#257CFF]/40 flex items-center justify-center text-[#4DA5EC]">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Disqualification on Documentation Alone
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  UK visa sponsor applications are rejected for missing bank statements, unverified degree certificates, laminated credentials without MFA authentication, or employment reference letters that do not match HMRC payroll records. Professional screening before submission is non-negotiable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 8: INFORMATION GAIN #2
            Certificate of Sponsorship (CoS) — How It Actually Works
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#402493]/20 via-white/[0.02] to-transparent border border-white/10 p-8 sm:p-12 relative overflow-hidden">
              <div className="max-w-3xl mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-xs font-bold text-[#4DA5EC] mb-3">
                  <Scale className="w-4 h-4" />
                  <span>Information Gain · Employer Sponsorship Reality</span>
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  Certificate of Sponsorship (CoS): What It Is and Why You Cannot Proceed Without One.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                  Most candidates applying for UK Skilled Worker Visas have no idea how the CoS system actually works. This gap is the single biggest reason for early disqualification.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-2xl bg-black/40 border border-white/10 p-7 space-y-5">
                  <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#4DA5EC]" />
                    How the CoS System Works
                  </h3>
                  <ul className="space-y-3 text-xs text-slate-300">
                    {[
                      'A CoS is a unique alphanumeric reference code assigned by a UK Home Office-licensed sponsor employer to a specific named candidate.',
                      'Without a valid CoS reference, a skilled worker visa application cannot be submitted — there is no workaround.',
                      'The employer must hold an active Tier 2/Skilled Worker sponsor licence registered with UKVI before they can issue any CoS.',
                      'Each CoS costs the employer £239 (defined CoS) or is drawn from an annual allocation. Employers are selective because unused CoS allocations expire.',
                      'CoS codes can be verified on the UK Government\'s public register of licensed sponsors before accepting any job offer.',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#257CFF]/10 border border-[#4DA5EC]/30 p-7 space-y-5">
                  <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Sijam&rsquo;s Verification Standard Before Listing Any UK Job
                  </h3>
                  <ul className="space-y-3 text-xs text-slate-300">
                    {[
                      'Every UK employer listed on this board has been cross-referenced against the live UKVI Licensed Sponsor Register.',
                      'Employers must confirm active, unallocated CoS slots before any vacancy goes live on our board.',
                      'We request copies of employment contract templates, statutory salary rates, and accommodation policies before publishing.',
                      'European roles (Poland, Slovakia) are verified against EU Ministry of Labour employer registration databases and trade union collective agreements.',
                      'Zero fees are charged to candidates at any stage. Employer-side administrative coordination is our only contracted arrangement.',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 9: SECTOR CORRIDORS OVERVIEW
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Active Hiring Sectors
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                High-Demand International Sectors for Nigerian Professionals.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                Europe and the UK are facing record shortages in healthcare, skilled trades, and industrial manufacturing. These are the corridors with active verified quotas right now.
              </p>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible">
              {[
                {
                  icon: Stethoscope,
                  sector: 'Healthcare & Nursing',
                  destinations: 'UK (NHS Trusts), Ireland, Poland',
                  roles: ['Registered Nurse (RN/RGN)', 'Health Care Assistant (HCA)', 'Senior Care Worker', 'Hospital Support Officer'],
                  salaryRange: '£25,000 – £42,000 / year (UK)',
                  visaType: 'UK Skilled Worker Visa (Tier 2) · NMC Registration Required',
                  urgency: 'Critical Shortage',
                  urgencyColor: 'bg-rose-500/20 text-rose-300',
                },
                {
                  icon: Wrench,
                  sector: 'Skilled Trades & Fabrication',
                  destinations: 'Poland, Slovakia, Germany',
                  roles: ['MIG/MAG Welder', 'Structural Steel Fabricator', 'CNC Machine Operator', 'Pipefitter & Plumber'],
                  salaryRange: 'PLN 5,000 – 8,500 / month (Poland)',
                  visaType: 'EU Work Permit (Type D) · Employer Labour Contract',
                  urgency: 'High Demand',
                  urgencyColor: 'bg-amber-500/20 text-amber-300',
                },
                {
                  icon: Building2,
                  sector: 'Industrial & Manufacturing',
                  destinations: 'Slovakia, Poland, Czech Republic',
                  roles: ['Automotive Assembly Operator', 'Bakery Production Worker', 'Logistics & Warehouse Coordinator', 'Quality Control Technician'],
                  salaryRange: '€850 – €1,400 / month (Slovakia)',
                  visaType: 'Slovak / Polish Employment Visa D',
                  urgency: 'Active Quotas',
                  urgencyColor: 'bg-[#4DA5EC]/20 text-[#4DA5EC]',
                },
                {
                  icon: Globe2,
                  sector: 'Transport & Logistics',
                  destinations: 'UK, Germany, Poland',
                  roles: ['HGV / LGV Class 1 Driver', 'Logistics Coordinator', 'Freight & Cargo Handler', 'Fleet Operations Manager'],
                  salaryRange: '£32,000 – £50,000 / year (UK)',
                  visaType: 'UK Skilled Worker Visa · C+E Licence Required',
                  urgency: 'Active Quotas',
                  urgencyColor: 'bg-[#4DA5EC]/20 text-[#4DA5EC]',
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-[#4DA5EC]/40 transition-all space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#402493]/20 border border-purple-500/40 flex items-center justify-center text-[#4DA5EC]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded ${card.urgencyColor}`}>
                          {card.urgency}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-white mb-1">{card.sector}</h3>
                      <p className="text-xs text-[#4DA5EC] font-semibold mb-3">{card.destinations}</p>
                      <ul className="space-y-1.5 mb-4">
                        {card.roles.map((role, j) => (
                          <li key={j} className="flex items-center gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-white/5 pt-3 space-y-1.5">
                      <p className="text-xs font-bold text-white">{card.salaryRange}</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed">{card.visaType}</p>
                      <Link
                        href="#directory"
                        className="mt-2 text-xs font-bold text-[#4DA5EC] hover:text-white flex items-center gap-1.5 transition-colors group"
                      >
                        <span>Browse {card.sector} Jobs</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 10: INFORMATION GAIN #3
            Zero Recruitment Fee Framework — How to Spot Scams
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Anti-Fraud Framework
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                How to Identify a Fraudulent International Recruitment Offer in Nigeria.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                The ILO estimates that forced labor and fraudulent recruitment cost African workers billions annually. Knowing the exact warning signs is the first line of protection.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Red Flags Column */}
              <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 p-7 space-y-5">
                <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  10 Red Flags — Walk Away Immediately
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {[
                    'Any request for upfront payment — visa fee, flight ticket, admin slot, or processing levy — before a signed employment contract.',
                    'Job offers via WhatsApp from unknown numbers with no verifiable company website or physical office address.',
                    'Promises of employment in the UK without mentioning a Certificate of Sponsorship (CoS) reference number.',
                    'Employers who cannot supply a copy of their UK Sponsor Licence number or Polish Ministry of Labour registration.',
                    'Generic PDF job offers with no specific employer name, contract number, or HMRC employer reference.',
                    'Requests to submit your BVN, NIN, or bank account details before a signed offer letter.',
                    'Guaranteed visa approval within 3 to 7 days — processing legally takes weeks to months.',
                    'Jobs with salary figures significantly above the statutory UK or EU minimum wage without credible justification.',
                    'Agents who cannot name the specific medical or industrial employer — only the country.',
                    '"Registration fees" or "documentation handling fees" that must be paid before interviews.',
                  ].map((flag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Green Standards Column */}
              <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/25 p-7 space-y-5">
                <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  What a Legitimate Verified Offer Includes
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {[
                    'A named, verified employer with an active UKVI Sponsor Licence or EU Ministry of Labour registration.',
                    'A formal employment contract specifying job title, statutory salary, working hours, and probation period.',
                    'Zero recruitment fees charged to the candidate at any stage of the process.',
                    'Clear visa sponsorship documentation — Certificate of Sponsorship (UK) or Type D National Visa letter (EU).',
                    'A pre-departure briefing covering work rights, accommodation arrangements, and in-country legal support.',
                    'Direct contact details for the HR department at the hiring company.',
                    'Statutory salary meeting or exceeding the relevant country\'s minimum skilled worker wage threshold.',
                    'Written confirmation that the employer bears visa application and administrative costs, not the candidate.',
                    'Named Sijam Consults representative who manages coordination with the employer.',
                    'Access to the UK Government Licensed Sponsor Register link to independently verify the employer.',
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verification External Link */}
            <div className="mt-8 p-5 rounded-2xl bg-[#402493]/15 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">Verify any UK employer yourself on the official government register:</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  UK Home Office – Register of Licensed Sponsors (Workers) — updated weekly.
                </p>
              </div>
              <a
                href="https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs tracking-wide hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Check UK Sponsor Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 11: STATS BANNER
        ───────────────────────────────────────────────── */}
        <section className="py-16 bg-[#0A0620] border-t border-purple-950/60 border-b border-purple-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-heading font-black text-xl sm:text-3xl text-white text-center mb-10">
              Everything you need to advance your career internationally
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { stat: '5+', label: 'Destination corridors', icon: '🌍', desc: 'UK, Poland, Slovakia, Portugal & Cyprus' },
                { stat: '100+', label: 'Active job quotas', icon: '💼', desc: 'Open employer-sponsored positions' },
                { stat: '₦0', label: 'Candidate recruitment fees', icon: '🛡️', desc: 'Fully transparent — no hidden costs' },
                { stat: '100%', label: 'Permit-backed roles', icon: '📋', desc: 'Every role includes statutory visa filing' },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all text-center space-y-2 group"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div className="font-heading font-black text-3xl text-white group-hover:text-[#4DA5EC] transition-colors">
                    {item.stat}
                  </div>
                  <div className="text-sm font-bold text-white/90">{item.label}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 12: INFORMATION GAIN #4
            Pre-Departure Candidate Verification Checklist
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Information Gain · Candidate Readiness
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Pre-Application Readiness Checklist for International Job Seekers.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                Submitting a job application without the right documents is the fastest route to rejection. Use this practical checklist before applying to any international position on our board.
              </p>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
              {[
                {
                  category: 'Identity & Travel Documents',
                  icon: FileText,
                  items: [
                    'International Passport (min. 12 months validity at application)',
                    'NPC Birth Certificate (original or NPC-authenticated copy)',
                    'National Identity Number (NIN) slip',
                    'Two recent passport photographs (biometric format)',
                    'Marriage certificate if surname differs from birth record',
                  ],
                },
                {
                  category: 'Professional Qualifications',
                  icon: Briefcase,
                  items: [
                    'Academic degree certificates (notarized & FME-authenticated)',
                    'Professional board registration (NMCN, MDCN, COREN, etc.)',
                    'Official academic transcripts stamped by issuing university',
                    'Industry-specific licenses (NMC CBT result for UK nurses)',
                    'WAEC / NECO O-Level certificates (with scratch-card verification)',
                  ],
                },
                {
                  category: 'Employment & Financial Evidence',
                  icon: Building2,
                  items: [
                    '3 to 6-month salary payslips from current/previous employer',
                    'Employer reference letter on official letterhead',
                    'Updated CV (2-page max) matching your qualification dates',
                    '6-month personal bank statement with consistent salary credits',
                    'Police Character Certificate from NPF CCR (max 6 months old)',
                  ],
                },
              ].map((col, i) => {
                const Icon = col.icon;
                return (
                  <div key={i} className="w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#402493]/20 border border-purple-500/40 flex items-center justify-center text-[#4DA5EC]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-bold text-base text-white">{col.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 13: CASE STUDIES
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Verified Relocations
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Professionals Who Relocated Through Sijam Consults.
              </h2>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
              {[
                {
                  badge: 'UK Healthcare',
                  badgeColor: 'bg-[#4DA5EC]/15 text-[#4DA5EC]',
                  time: '14 Weeks Total',
                  name: 'Registered Nurse — NHS Trust, West Midlands',
                  challenge: 'Nurse A. had 8 years of clinical experience at a federal hospital in Kaduna but had never sat the NMC CBT. She applied to three agencies independently and received no response.',
                  outcome: 'Sijam coordinated her NMC CBT preparation, authenticated her NMCN registration and nursing degree at MFA Abuja, matched her to a verified NHS Trust with an active CoS allocation, and supported her UK Skilled Worker Visa application. She landed in Birmingham 14 weeks after initial contact.',
                },
                {
                  badge: 'Poland Skilled Trade',
                  badgeColor: 'bg-purple-500/15 text-purple-300',
                  time: '9 Weeks Total',
                  name: 'MIG/MAG Welder — Industrial Fabrication, Wrocław',
                  challenge: 'Mr. B. had advanced welding certificates from a technical college in Enugu but had been rejected twice by informal agents who collected ₦90,000 in processing fees without delivering any employer contract.',
                  outcome: 'After a portfolio skills assessment, Sijam submitted his credentials to a verified Polish steel fabrication employer with a confirmed labor quota. His employment contract, Polish Type D visa, and work permit were secured. No fees were charged to him at any stage.',
                },
                {
                  badge: 'Slovakia Manufacturing',
                  badgeColor: 'bg-amber-500/15 text-amber-300',
                  time: '11 Weeks Total',
                  name: 'Automotive Assembly Operator — Bratislava',
                  challenge: 'Ms. C. had production line experience at a Lagos factory but could not locate a legitimate EU industrial employer directly. Most job ads online were from unknown aggregators without verified company profiles.',
                  outcome: 'Sijam confirmed a verified Bratislava automotive plant with active quota for Nigerian production operatives. Her employment contract, Slovak work permit, and pre-departure orientation briefing were handled end-to-end. She relocated on a direct Lagos–Vienna connection with employer accommodation provided.',
                },
              ].map((cs, i) => (
                <div key={i} className="w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center rounded-2xl bg-white/[0.03] border border-white/10 p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${cs.badgeColor}`}>
                      {cs.badge}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">{cs.time}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">{cs.name}</h3>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Challenge</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1">Outcome</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{cs.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 14: DISQUALIFICATION — We May Not Be Right For You
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl bg-red-950/20 border border-red-500/30 p-8 sm:p-12">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Compliance Notice</span>
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  We May Not Be Right For You If...
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                  Our recruitment coordination service upholds strict legal and ethical standards. We will decline your application under the following conditions:
                </p>
              </div>

              <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 md:overflow-visible">
                {[
                  {
                    title: 'You Cannot Produce Original Credentials',
                    desc: 'We cannot process applications where academic certificates, professional board registrations, or employment records cannot be physically verified by the receiving employer or UK/EU immigration authority.',
                  },
                  {
                    title: 'Your Qualifications Do Not Meet Statutory Thresholds',
                    desc: 'UK Skilled Worker Visa requires minimum salary thresholds (£26,200+ per year or role-specific going rate). EU roles have minimum skills or apprenticeship certification requirements.',
                  },
                  {
                    title: 'You Expect a Guaranteed Visa or Job Offer',
                    desc: 'Employment authorizations and visa grants are sovereign decisions by foreign governments and employers. We do not guarantee outcomes, and any agency that does is misrepresenting the process.',
                  },
                  {
                    title: 'You Are Seeking Illegal Irregular Migration',
                    desc: 'We work strictly within lawful immigration frameworks. We do not facilitate unauthorized border crossings, visa overstays, or fraudulent documentation for any reason.',
                  },
                ].map((item, i) => (
                  <div key={i} className="w-[85vw] sm:w-[70vw] md:w-auto shrink-0 snap-center p-5 rounded-2xl bg-black/40 border border-red-500/20 space-y-2">
                    <h3 className="font-heading font-bold text-xs text-red-300 flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed pl-5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 15: FAQ SECTION
        ───────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC] block mb-2">
                Common Questions
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Frequently Asked Questions About International Jobs for Nigerians.
              </h2>
            </div>

            <div className="max-w-4xl space-y-3">
              {[
                {
                  q: 'Does Sijam Consults charge placement fees for international jobs?',
                  a: 'No. Sijam Consults Limited strictly complies with the ILO Convention on Private Employment Agencies and Nigerian law prohibiting recruitment fees from job seekers. Our administrative coordination is contracted solely with the employer side.',
                },
                {
                  q: 'What is a Certificate of Sponsorship (CoS) and why do I need one for a UK job?',
                  a: 'A Certificate of Sponsorship (CoS) is a unique reference number issued by a UK Home Office-licensed employer that allows skilled workers to apply for a UK Skilled Worker Visa. Every UK role listed on our board is only published when a verified CoS allocation exists with the employer.',
                },
                {
                  q: 'What are the minimum qualifications for nursing jobs in the UK?',
                  a: 'For Registered Nurse roles in the UK, applicants must hold a valid Nigerian Nursing and Midwifery Council (NMCN) registration, a nursing degree (B.Sc. Nursing or RN), and pass the NMC Computer-Based Test (CBT) and Objective Structured Clinical Examination (OSCE) for full NMC PIN registration.',
                },
                {
                  q: 'Do I need to pay for my own flight when relocating to Europe?',
                  a: 'Relocation packages vary by employer. Some EU industrial employers in Poland and Slovakia include one-way flight reimbursements in employment contracts. UK NHS employers frequently offer relocation grants of up to £5,000 for qualified healthcare professionals. Specific terms are stated in each published job listing.',
                },
                {
                  q: 'How long does the full process take from application to departure?',
                  a: 'For UK positions: 10 to 16 weeks (credential verification + CoS + visa processing). For Poland and Slovakia: 8 to 12 weeks (employer matching + Type D work permit). Timelines vary based on individual qualification verification requirements and consular processing queues.',
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 group open:border-[#4DA5EC]/40 transition-all"
                >
                  <summary className="cursor-pointer flex items-start justify-between gap-4 p-5 text-sm font-bold text-white list-none">
                    <span>{faq.q}</span>
                    <HelpCircle className="w-4 h-4 text-[#4DA5EC] shrink-0 mt-0.5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 mt-0 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 16: TALENT BANK CALLOUT
        ───────────────────────────────────────────────── */}
        <section className="py-14 bg-gradient-to-r from-[#120836] via-[#1C0D4F] to-[#0D0626] border-t border-purple-900/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-purple-200 border border-white/10 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span>International Talent Repository</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Don&rsquo;t See Your Trade or Profession Listed?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Foreign employer quotas open continuously for industrial electricians, heavy machinery operators, hospitality staff, and healthcare workers. Register your CV with our employment desk to be fast-tracked when matching allocations open.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={ROUTES.consultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Submit CV to Talent Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20am%20interested%20in%20international%20job%20opportunities%20and%20would%20like%20to%20register%20my%20CV.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 17: DISCOVER OPPORTUNITIES TAG CLOUD
        ───────────────────────────────────────────────── */}
        <section className="py-14 bg-[#070415] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center">
              <h2 className="font-heading font-black text-xl sm:text-3xl text-white">
                Browse all international job categories
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Click any role category to browse live positions with active employer quotas
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                'Registered Nurse', 'Senior Care Assistant', 'MIG/MAG Welder', 'HGV Truck Driver',
                'Software Engineer', 'Automation Electrician', 'Bakery Operator', 'Greenhouse Technician',
                'Hotel Front Office', 'CNC Machinist', 'Automotive Assembler', 'Structural Fabricator',
                'Healthcare Support', 'Logistics Coordinator', 'Irrigation Manager', 'IT Systems Admin',
                'Executive Chef', 'F&B Supervisor', 'Mechanical Engineer', 'Guest Relations Manager',
                'Residential Care', 'Road Freight', 'Childcare Worker', 'Hospitality Staff',
                'Ausbildung Apprentice', 'Hospital Support', 'Agricultural Worker', 'Security Officer',
              ].map((role) => (
                <Link
                  key={role}
                  href="#directory"
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.04] hover:bg-[#4DA5EC]/20 text-slate-300 hover:text-white border border-white/10 hover:border-[#4DA5EC]/40 transition-all"
                >
                  {role}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            SECTION 18: LEGAL DISCLAIMER FOOTER STRIP
        ───────────────────────────────────────────────── */}
        <section className="py-8 bg-[#040210] border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-500 leading-relaxed text-center space-y-1">
              <p className="font-bold text-slate-400 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#4DA5EC]" />
                Employment Regulatory Disclaimer
              </p>
              <p>
                {COMPANY.disclaimers.employment} Sijam Consults Limited (CAC RC: 1715416) operates exclusively within lawful immigration and labor frameworks. All listed international vacancies are for qualified professionals only and do not constitute guaranteed job offers or visa approvals. Employment authorizations are granted solely by the sovereign immigration authorities of the respective destination countries.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
