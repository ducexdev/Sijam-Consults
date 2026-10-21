'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  RotateCcw,
  Coins,
  Scale,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  ExternalLink,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

interface CorridorData {
  name: string;
  flag: string;
  jurisdictionTag: string;
  studyPOF: string;
  workPOF: string;
  tuitionOrSalary: string;
  studyTimeline: string;
  workTimeline: string;
  englishReq: string;
  workRights: string;
  settlementProspects: string;
  keyStatutoryCheck: string;
  guideSlug?: string;
  advisoryTip: string;
}

const CORRIDOR_DATABASE: Record<string, CorridorData> = {
  poland: {
    name: 'Poland (Schengen Zone)',
    flag: '🇵🇱',
    jurisdictionTag: 'National Type D Visa / Voivodeship Office',
    studyPOF: '€12,100 (~₦21M–₦25M) living buffer + return flight proof',
    workPOF: 'No personal POF if backed by verified Voivodeship employment contract',
    tuitionOrSalary: 'Tuition: €2,500 – €3,800/yr | Min. Wage: 4,300 PLN/mo gross',
    studyTimeline: '4–8 weeks university admission + 3–5 weeks consular appointment',
    workTimeline: '6–14 weeks Voivodeship Type A permit + 3–5 weeks visa filing',
    englishReq: 'WAEC C6+ English waiver or Medium of Instruction accepted (No IELTS required)',
    workRights: 'Students: 20 hrs/wk term-time, full-time holidays | Workers: Full-time 40 hrs/wk',
    settlementProspects: 'Karta Pobytu (Temporary Residence) renewable for up to 3 years, leading to EU PR',
    keyStatutoryCheck: 'Original Voivodeship permit with provincial coat of arms or university acceptance with paid tuition receipt',
    guideSlug: 'poland-work-permits-explained',
    advisoryTip: 'Polish consulates in Abuja enforce strict scrutiny on third-party fund transfers right before statement generation.',
  },
  cyprus: {
    name: 'Northern Cyprus (CWU)',
    flag: '🇨🇾',
    jurisdictionTag: 'Direct Institutional Visa & Bilateral Admissions',
    studyPOF: '€3,500 – €5,000 living maintenance proof (Lowest European barrier)',
    workPOF: 'N/A (Primary corridor is higher education with local on-campus employment)',
    tuitionOrSalary: 'Net Tuition: €1,800 – €2,800/yr after automatic 50% merit grant',
    studyTimeline: '3–7 business days admission confirmation + 2–4 weeks transit visa',
    workTimeline: 'Post-study transition to Turkey, UAE, or European credit transfer',
    englishReq: 'WAEC/NECO C6 or above in English qualifies for automatic language test waiver',
    workRights: 'On-campus student employment and authorized local service roles permitted',
    settlementProspects: 'Direct European ECTS credit transfer to Poland, Spain, and UK universities',
    keyStatutoryCheck: 'Official CWU Acceptance Letter & verified bank wire receipt to university treasury',
    guideSlug: 'cyprus-west-admissions',
    advisoryTip: 'Direct institutional admission letters bypass external third-party broker markups and lock in 50% tuition grants.',
  },
  slovakia: {
    name: 'Slovakia (Central Europe)',
    flag: '🇸🇰',
    jurisdictionTag: 'Unified Single Residence & Work Permit (ÚPSVaR)',
    studyPOF: 'Approx. €4,500 – €6,000 annual maintenance in personal bank account',
    workPOF: 'Covered by binding employer contract under Slovak statutory wage laws',
    tuitionOrSalary: 'Tuition: €3,000 – €5,000/yr | Min. Wage: €750 – €1,200/mo base',
    studyTimeline: '4–6 weeks admission + 60–90 days consular residence review',
    workTimeline: '20 working days vacancy reporting + 60–90 days Single Permit processing',
    englishReq: 'English medium of instruction proof accepted; basic Slovak beneficial for trades',
    workRights: 'Full-time employment under unified Single Permit with Schengen mobility',
    settlementProspects: '2-Year renewable residence permit with clear trajectory to permanent settlement',
    keyStatutoryCheck: 'Labour Office confirmation of vacancy + MFA Abuja attested police character report',
    guideSlug: 'schengen-d-visa',
    advisoryTip: 'All Nigerian personal documents must undergo sworn translation by a Slovak Ministry of Justice certified translator.',
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    jurisdictionTag: 'UKVI Points-Based System (Student Route & Skilled Worker CoS)',
    studyPOF: '£9,207 (outside London) or £12,006 (in London) held untouched for 28 consecutive days',
    workPOF: '£1,270 maintenance in account for 28 days (or employer certification on CoS)',
    tuitionOrSalary: 'Tuition: £11,500 – £16,000/yr | Min. Salary: £26,200 – £38,700/yr',
    studyTimeline: 'CAS issuance (2–4 weeks) + UKVI visa processing (3–6 weeks)',
    workTimeline: 'Defined CoS allocation (1–3 weeks) + priority/standard visa (3–5 weeks)',
    englishReq: 'IELTS Academic/UKVI or select university WAEC C6+ English recognition',
    workRights: 'Students: 20 hrs/wk during term | Skilled Workers: Full-time sponsored role only',
    settlementProspects: 'Students: 2-Year Graduate Route (PSW) | Workers: 5-Year pathway to ILR and British citizenship',
    keyStatutoryCheck: 'Home Office verified CAS number or Defined CoS from an A-rated licensed sponsor',
    guideSlug: 'nursing-in-canada',
    advisoryTip: 'UKVI strictly scrutinizes funds holding periods. Do not allow your balance to dip even £1 below the threshold during the 28-day window.',
  },
  canada: {
    name: 'Canada',
    flag: '🇨🇦',
    jurisdictionTag: 'IRCC Portal (Study Permit, PGWP & Express Entry)',
    studyPOF: 'CA$20,635 living expenses benchmark + first-year full tuition deposit',
    workPOF: 'Proof of settlement funds under Express Entry (approx. CA$13,757 for single applicant)',
    tuitionOrSalary: 'Tuition: CA$16,000 – CA$28,000/yr | Average Starting Salary: CA$55,000 – CA$85,000/yr',
    studyTimeline: 'DLI Letter of Acceptance (4–8 weeks) + PAL + Study Permit review (8–16 weeks)',
    workTimeline: 'Express Entry draws (bi-weekly) / Provincial Nominee Program (3–6 months)',
    englishReq: 'IELTS Academic (min. 6.0/6.5) or PTE Academic (min. 60) mandatory for most streams',
    workRights: 'Students: 24 hrs/wk off-campus during term-time + Post-Graduation Work Permit (PGWP)',
    settlementProspects: 'Canadian Experience Class (CEC) and Provincial Nominee Streams leading to Canadian Permanent Residency',
    keyStatutoryCheck: 'Provincial Attestation Letter (PAL) from designated learning institution or WES ECA report',
    guideSlug: 'nursing-in-canada',
    advisoryTip: 'Canada study permit applications require demonstrable multi-generational home ties to rebut IRPR 179(b) immigrant intent presumption.',
  },
};

export const RelocationCorridorComparator: React.FC = () => {
  const [selectedCorridor, setSelectedCorridor] = useState<string>('poland');
  const [selectedPathway, setSelectedPathway] = useState<'study' | 'work'>('study');

  const corridor = useMemo(() => {
    return CORRIDOR_DATABASE[selectedCorridor] || CORRIDOR_DATABASE.poland;
  }, [selectedCorridor]);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B071E] p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#4DA5EC]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#402493]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-wider text-blue-300 mb-2">
            <Sparkles className="w-3 h-3 text-[#4DA5EC]" />
            Interactive Relocation Intelligence
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight">
            European &amp; Global Relocation Corridor Comparison Engine
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare verified Proof of Funds, salary baselines, English waiver policies, and statutory timelines across active Nigerian relocation pathways.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedCorridor('poland');
            setSelectedPathway('study');
          }}
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Comparator</span>
        </button>
      </div>

      {/* Control Filters */}
      <div className="relative z-10 py-6 border-b border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Corridor Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { id: 'poland', label: 'Poland', flag: '🇵🇱' },
            { id: 'cyprus', label: 'Cyprus', flag: '🇨🇾' },
            { id: 'slovakia', label: 'Slovakia', flag: '🇸🇰' },
            { id: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
            { id: 'canada', label: 'Canada', flag: '🇨🇦' },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCorridor(c.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                selectedCorridor === c.id
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] border border-[#4DA5EC]/40 scale-[1.02]'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-base">{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Pathway Toggle */}
        <div className="flex items-center gap-1 bg-[#070415] p-1 rounded-xl border border-white/10 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setSelectedPathway('study')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedPathway === 'study'
                ? 'bg-[#402493] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Study Pathway</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedPathway('work')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedPathway === 'work'
                ? 'bg-[#402493] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work &amp; Relocation</span>
          </button>
        </div>
      </div>

      {/* Corridor Overview HUD */}
      <div className="relative z-10 pt-6 space-y-6">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl sm:text-4xl">{corridor.flag}</span>
            <div>
              <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider">Target Relocation Destination</div>
              <h4 className="text-lg sm:text-xl font-black text-white">{corridor.name}</h4>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{corridor.jurisdictionTag}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              Verified Sovereign Framework
            </span>
          </div>
        </div>

        {/* 4 Metric Data Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Proof of Funds */}
          <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Proof of Funds (POF)</span>
            </div>
            <div className="text-xs font-bold text-white">
              {selectedPathway === 'study' ? corridor.studyPOF : corridor.workPOF}
            </div>
            <div className="text-[10px] text-slate-500">Statutory minimum living maintenance benchmark</div>
          </div>

          {/* Tuition or Salary */}
          <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Building className="w-4 h-4 text-[#4DA5EC]" />
              <span>Financial Baseline</span>
            </div>
            <div className="text-xs font-bold text-white">{corridor.tuitionOrSalary}</div>
            <div className="text-[10px] text-slate-500">Official fee structure or statutory minimum wage</div>
          </div>

          {/* Lead Time */}
          <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Processing Lead Time</span>
            </div>
            <div className="text-xs font-bold text-white">
              {selectedPathway === 'study' ? corridor.studyTimeline : corridor.workTimeline}
            </div>
            <div className="text-[10px] text-slate-500">Institutional admission / permit + visa review</div>
          </div>

          {/* English Requirement */}
          <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Language Policy</span>
            </div>
            <div className="text-xs font-bold text-white">{corridor.englishReq}</div>
            <div className="text-[10px] text-slate-500">WAEC English credit waivers vs IELTS mandates</div>
          </div>
        </div>

        {/* Deep Insights Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#4DA5EC]" />
              <span>Post-Arrival Rights &amp; Settlement Trajectory</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <strong className="text-white block mb-0.5">Work Rights:</strong>
                <p className="text-slate-400">{corridor.workRights}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <strong className="text-white block mb-0.5">Permanent Settlement Route:</strong>
                <p className="text-slate-400">{corridor.settlementProspects}</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Forensic Case Advisory</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Critical Requirement:</strong> {corridor.keyStatutoryCheck}
              </p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 leading-relaxed">
                <strong>Advisory Warning:</strong> {corridor.advisoryTip}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              {corridor.guideSlug && (
                <Link
                  href={`/guides/${corridor.guideSlug}`}
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Read full statutory guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
              <Link
                href={ROUTES.assessment}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-xs border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span>Check my eligibility</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
