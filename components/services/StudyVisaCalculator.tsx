'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Banknote,
  Clock,
  Briefcase,
  Building,
  RotateCcw,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

interface StudyCalculatorState {
  destination: 'cyprus' | 'poland' | 'uk' | 'malta-greece' | 'canada';
  degreeLevel: 'bachelor' | 'master';
  waecEnglishGrade: 'c6_above' | 'below_c6';
  budgetBracket: 'below_4m' | '4m_8m' | '8m_15m' | 'above_15m';
}

export const StudyVisaCalculator: React.FC = () => {
  const [state, setState] = useState<StudyCalculatorState>({
    destination: 'cyprus',
    degreeLevel: 'bachelor',
    waecEnglishGrade: 'c6_above',
    budgetBracket: '4m_8m',
  });

  const calculation = useMemo(() => {
    switch (state.destination) {
      case 'cyprus':
        return {
          countryName: 'Northern Cyprus (Cyprus West University)',
          flag: '🇨🇾',
          tuitionOriginal: '€4,000 – €6,000 / year',
          grantApplied: 'Up to 50% Institutional Merit Grant',
          tuitionNet: '€1,800 – €2,800 / year (approx. ₦3.1M – ₦4.8M)',
          depositNeeded: 'Initial deposit: €1,000 – €1,500 to secure admission and grant',
          englishStatus:
            state.waecEnglishGrade === 'c6_above'
              ? 'WAEC C6+ English Waiver Accepted (Zero IELTS required)'
              : 'University English Placement Test on Arrival',
          workRights: 'On-campus and local student employment permitted',
          pofRequired: 'Low: €3,500 – €5,000 living expenses proof',
          visaType: 'Student Visa with Direct Institutional Sponsorship',
          postStudy: '1-Year Stay-Back & Easy Credit Transfer to EU',
          highlight: 'Lowest barrier to entry with high admission confirmation rates for Nigerian students.',
        };
      case 'poland':
        return {
          countryName: 'Poland (Schengen Area)',
          flag: '🇵🇱',
          tuitionOriginal: '€3,500 – €4,800 / year',
          grantApplied: 'Early Enrollment Subsidies Available',
          tuitionNet: '€2,500 – €3,800 / year (approx. ₦4.2M – ₦6.5M)',
          depositNeeded: 'First semester or full-year payment required for National D-Visa',
          englishStatus:
            state.waecEnglishGrade === 'c6_above'
              ? 'English Medium of Instruction Letter or WAEC Waiver Accepted'
              : 'Medium of instruction proof or Duolingo/PTE',
          workRights: 'Legal 20 hours/week during term-time; full-time during vacations',
          pofRequired: 'Approx. €12,100 (Living buffer + return flight proof, ~₦21M–₦25M)',
          visaType: 'National Type-D Student Visa (Schengen Multi-Entry)',
          postStudy: '9-Month to 1-Year Job Search Residence Card (Karta Pobytu)',
          highlight: 'Full Schengen travel freedom across 29 European countries with legal student work.',
        };
      case 'uk':
        return {
          countryName: 'United Kingdom',
          flag: '🇬🇧',
          tuitionOriginal: '£14,000 – £18,000 / year',
          grantApplied: '£1,500 – £4,000 Vice-Chancellor Merit Scholarships',
          tuitionNet: '£11,500 – £15,000 / year (approx. ₦23M – ₦30M)',
          depositNeeded: 'CAS deposit: £3,000 – £5,000 before CAS issuance',
          englishStatus:
            state.waecEnglishGrade === 'c6_above'
              ? 'WAEC English C6+ accepted by select partner universities'
              : 'IELTS Academic (6.0 - 6.5 minimum) or university internal test',
          workRights: '20 hours/week permitted during academic term',
          pofRequired: '£9,207 (outside London) or £12,006 (in London) + remaining tuition for 28 consecutive days',
          visaType: 'UK Student Route Visa',
          postStudy: '2-Year Graduate Route Post-Study Work Permit',
          highlight: 'World-recognized British degree with a guaranteed 2-year post-study work visa.',
        };
      case 'malta-greece':
        return {
          countryName: 'Malta & Greece (Southern Europe)',
          flag: '🇲🇹',
          tuitionOriginal: '€5,000 – €7,500 / year',
          grantApplied: '15% – 30% Regional Academic Rebates',
          tuitionNet: '€3,800 – €5,500 / year (approx. ₦6.5M – ₦9.4M)',
          depositNeeded: 'Tuition installment deposit upon provisional acceptance',
          englishStatus: 'WAEC English accepted with formal secondary school reference letter',
          workRights: '20 hours/week permitted under European student directives',
          pofRequired: 'Approx. €8,000 – €10,000 living maintenance fund',
          visaType: 'Schengen National Student D-Visa',
          postStudy: 'EU stay-back options for qualified graduates',
          highlight: 'English-speaking Mediterranean lifestyle with official European Union degrees.',
        };
      case 'canada':
      default:
        return {
          countryName: 'Canada',
          flag: '🇨🇦',
          tuitionOriginal: 'CAD $16,000 – $24,000 / year',
          grantApplied: 'Entrance awards ($1,000 – $3,000 CAD)',
          tuitionNet: 'CAD $15,000 – $22,000 / year (approx. ₦16M – ₦24M)',
          depositNeeded: 'Full first-year tuition deposit required for DLI Provincial Attestation (PAL)',
          englishStatus: 'IELTS Academic (6.0+ band) or PTE Academic strongly advised for SDS track',
          workRights: 'Up to 24 hours/week off-campus during academic sessions',
          pofRequired: 'CAD $20,635 living expenses + first year full tuition paid upfront',
          visaType: 'Canadian Study Permit with PAL Attestation',
          postStudy: 'Up to 3-Year Post-Graduation Work Permit (PGWP)',
          highlight: 'Direct pathway to Permanent Residency (PR) through Canadian Experience Class.',
        };
    }
  }, [state]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#0B071E]/90 border border-white/10 p-6 sm:p-9 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#4DA5EC]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#257CFF]/10 px-3.5 py-1 rounded-full border border-[#257CFF]/30">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Admissions &amp; Grant Estimator
        </span>
        <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mt-2 tracking-tight">
          Estimate Tuition, Grants &amp; Visa Living Buffers
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg mx-auto">
          Calculate genuine tuition costs after institutional grants, English waiver eligibility, and realistic proof
          of funds requirements.
        </p>
      </div>

      {/* Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Destination */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Target Destination
          </label>
          <select
            value={state.destination}
            onChange={(e) => setState({ ...state, destination: e.target.value as StudyCalculatorState['destination'] })}
            className="w-full py-2.5 px-3 rounded-xl bg-[#070415] border border-white/15 text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
          >
            <option value="cyprus">Northern Cyprus (Cyprus West Univ.)</option>
            <option value="poland">Poland (College of Economics)</option>
            <option value="uk">United Kingdom (British Univs.)</option>
            <option value="malta-greece">Malta / Greece (Schengen)</option>
            <option value="canada">Canada (Designated DLI)</option>
          </select>
        </div>

        {/* Degree Level */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Degree Level
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setState({ ...state, degreeLevel: 'bachelor' })}
              className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                state.degreeLevel === 'bachelor'
                  ? 'bg-[#257CFF] text-white border-[#257CFF]'
                  : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
              }`}
            >
              Bachelor&apos;s
            </button>
            <button
              type="button"
              onClick={() => setState({ ...state, degreeLevel: 'master' })}
              className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                state.degreeLevel === 'master'
                  ? 'bg-[#257CFF] text-white border-[#257CFF]'
                  : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
              }`}
            >
              Master&apos;s / PGD
            </button>
          </div>
        </div>

        {/* WAEC English Grade */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            WAEC/NECO English
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setState({ ...state, waecEnglishGrade: 'c6_above' })}
              className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                state.waecEnglishGrade === 'c6_above'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
              }`}
            >
              A1 – C6 (Credit)
            </button>
            <button
              type="button"
              onClick={() => setState({ ...state, waecEnglishGrade: 'below_c6' })}
              className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                state.waecEnglishGrade === 'below_c6'
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
              }`}
            >
              D7 – F9 (Pass)
            </button>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Tuition Capital (NGN)
          </label>
          <select
            value={state.budgetBracket}
            onChange={(e) =>
              setState({ ...state, budgetBracket: e.target.value as StudyCalculatorState['budgetBracket'] })
            }
            className="w-full py-2.5 px-3 rounded-xl bg-[#070415] border border-white/15 text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
          >
            <option value="below_4m">Under ₦4M</option>
            <option value="4m_8m">₦4M – ₦8M</option>
            <option value="8m_15m">₦8M – ₦15M</option>
            <option value="above_15m">Above ₦15M</option>
          </select>
        </div>
      </div>

      {/* Dynamic Results Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#070415] border border-[#257CFF]/40 space-y-4">
        {/* Top Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{calculation.flag}</span>
            <div>
              <div className="text-[10px] font-bold text-[#4DA5EC] uppercase tracking-wider">
                Corridor Breakdown
              </div>
              <h4 className="font-heading font-black text-lg sm:text-xl text-white">
                {calculation.countryName}
              </h4>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-700/60 px-3 py-1 rounded-full">
            {calculation.grantApplied}
          </span>
        </div>

        {/* 4 Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Annual Tuition</div>
            <div className="text-sm font-bold text-white mt-1">{calculation.tuitionNet}</div>
            <div className="text-[10px] text-slate-400 line-through mt-0.5">{calculation.tuitionOriginal}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">English Test Status</div>
            <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{calculation.englishStatus}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Work Rights</div>
            <div className="text-xs font-bold text-white mt-1 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0" />
              <span>{calculation.workRights}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Post-Study Search</div>
            <div className="text-xs font-bold text-[#F45A2A] mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{calculation.postStudy}</span>
            </div>
          </div>
        </div>

        {/* POF & Strategy Highlight */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div>
            <strong className="text-white font-semibold">Consular Living Buffer: </strong>
            <span>{calculation.pofRequired}</span>
            <p className="text-[11px] text-slate-400 mt-0.5">{calculation.highlight}</p>
          </div>
          <Link
            href={ROUTES.consultation}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:brightness-110 transition-all"
          >
            <span>Apply for This Route</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
