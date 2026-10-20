'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Scale,
  Building,
  RotateCcw,
  Plane,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

interface TouristCalculatorState {
  destination: 'schengen' | 'uk' | 'us' | 'canada';
  employmentType: 'employed' | 'business_owner' | 'remote_tech' | 'sponsored';
  statementStatus: 'seasoned_6mo' | 'lump_sum' | 'steady_business';
  travelHistory: 'frequent' | 'regional' | 'first_time';
}

export const TouristVisaCalculator: React.FC = () => {
  const [state, setState] = useState<TouristCalculatorState>({
    destination: 'schengen',
    employmentType: 'employed',
    statementStatus: 'seasoned_6mo',
    travelHistory: 'regional',
  });

  const assessment = useMemo(() => {
    let score = 50;
    const notes: string[] = [];
    const redFlags: string[] = [];

    // Destination benchmarks
    const destinationData = {
      schengen: {
        name: 'Schengen Short-Stay (France, Germany, Spain, Italy)',
        flag: '🇪🇺',
        fee: '€90 (approx. ₦145,000) + VFS service charge',
        processingTime: '15 to 30 calendar days',
        recommendedBalance: '₦4,500,000 – ₦7,500,000',
        visaValidity: 'Up to 90 days in any 180-day period (Single or Multi-Entry)',
      },
      uk: {
        name: 'UK Standard Visitor Visa',
        flag: '🇬🇧',
        fee: '£115 (approx. ₦210,000) for 6-month validity',
        processingTime: '3 to 6 weeks (Priority available)',
        recommendedBalance: '₦5,000,000 – ₦8,500,000 (after return flight & hotel)',
        visaValidity: '6 months standard (2, 5, and 10-year multi-entry options)',
      },
      us: {
        name: 'United States B1/B2 Visitor Visa',
        flag: '🇺🇸',
        fee: '$185 (MRV fee) payable through GTBank',
        processingTime: 'Depends on consular appointment waitlist in Lagos/Abuja',
        recommendedBalance: '₦6,000,000 – ₦10,000,000',
        visaValidity: 'Typically 5 years multiple entry for Nigerian citizens',
      },
      canada: {
        name: 'Canada Temporary Resident Visa (TRV)',
        flag: '🇨🇦',
        fee: 'CAD $100 application + CAD $85 biometrics',
        processingTime: '8 to 16 weeks via IRCC Portal',
        recommendedBalance: '₦6,500,000 – ₦12,000,000',
        visaValidity: 'Often granted up to passport expiry date (up to 10 years)',
      },
    }[state.destination];

    // Statement calculations
    if (state.statementStatus === 'seasoned_6mo' || state.statementStatus === 'steady_business') {
      score += 25;
      notes.push('Consistent 6-month transaction trail eliminates the unseasoned funds suspicion.');
    } else {
      score -= 20;
      redFlags.push('Recent lump-sum deposit detected. Consulates treat sudden transfers without paper trail as borrowed money.');
    }

    // Employment ties
    if (state.employmentType === 'business_owner') {
      score += 15;
      notes.push('Registered CAC corporate documents demonstrate verifiable commercial ties to Nigeria.');
    } else if (state.employmentType === 'employed') {
      score += 12;
      notes.push('Formal employment with payslips and an approved employer leave letter satisfies Section 214(b) job roots.');
    } else if (state.employmentType === 'remote_tech') {
      score += 8;
      notes.push('Remote contracts require formal foreign invoice receipts and domestic tax records to prove stable career intent.');
    } else {
      score += 2;
      redFlags.push('Sponsorship files require third-party affidavit of support and proof of sponsor relationship.');
    }

    // Travel history
    if (state.travelHistory === 'frequent') {
      score += 10;
      notes.push('Established international travel record gives consuls high confidence in your return compliance.');
    } else if (state.travelHistory === 'regional') {
      score += 5;
      notes.push('Regional travel (Ghana, Kenya, Rwanda, Dubai) demonstrates prior border compliance.');
    } else {
      notes.push('First-time applicant (virgin passport): Requires exceptional domestic ties documentation to offset zero travel history.');
    }

    const readinessScore = Math.max(35, Math.min(96, score));

    return {
      destinationData,
      readinessScore,
      notes,
      redFlags,
      readinessTier:
        readinessScore >= 80 ? 'High Approval Potential' : readinessScore >= 65 ? 'Moderate — Audit Recommended' : 'High Refusal Risk Without Remediation',
      tierColor:
        readinessScore >= 80
          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
          : readinessScore >= 65
          ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
          : 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    };
  }, [state]);

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      {/* Decorative top lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#257CFF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#4DA5EC] uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Consular Audit Tool</span>
          </div>
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
            Visitor Visa Readiness &amp; Proof of Funds Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Simulate how embassy visa officers evaluate your home ties, employment stability, and financial balance.
          </p>
        </div>

        <button
          onClick={() =>
            setState({
              destination: 'schengen',
              employmentType: 'employed',
              statementStatus: 'seasoned_6mo',
              travelHistory: 'regional',
            })
          }
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Form</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Selectors */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Destination */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>1. Target Destination Corridor</span>
              <span className="text-[11px] font-mono text-[#4DA5EC]">
                {assessment.destinationData.flag} {state.destination.toUpperCase()}
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'schengen', label: '🇪🇺 Schengen Area', desc: 'France, Germany, Spain, Italy' },
                { id: 'uk', label: '🇬🇧 United Kingdom', desc: 'Standard Visitor 6mo/2yr' },
                { id: 'us', label: '🇺🇸 United States', desc: 'B1/B2 Tourist/Business' },
                { id: 'canada', label: '🇨🇦 Canada', desc: 'TRV Visitor up to 10yr' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, destination: opt.id as any }))}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    state.destination === opt.id
                      ? 'bg-gradient-to-r from-[#402493]/60 to-[#2D186B]/60 border-[#4DA5EC] text-white shadow-md'
                      : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Employment Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              2. Economic Status &amp; Home Ties in Nigeria
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'employed', label: 'Salaried Employee', sub: 'Payslips + Approved Leave' },
                { id: 'business_owner', label: 'Registered Business Owner', sub: 'CAC + Corporate Bank Account' },
                { id: 'remote_tech', label: 'Remote Professional / Freelancer', sub: 'Contracts + USD/NGN Invoices' },
                { id: 'sponsored', label: 'Sponsored by Family / Host', sub: 'Invitation Letter Required' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, employmentType: opt.id as any }))}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    state.employmentType === opt.id
                      ? 'bg-[#402493]/50 border-[#4DA5EC] text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-[10px] text-slate-400">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Bank Statement Seasoning */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              3. Bank Statement Transaction Pattern
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'seasoned_6mo', label: 'Steady 6-Month Trail', note: 'Consistent balance & salary flow' },
                { id: 'steady_business', label: 'High Business Turnover', note: 'Active corporate cashflow' },
                { id: 'lump_sum', label: 'Recent Lump Sum Deposit', note: 'Sudden large deposit within 30 days' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, statementStatus: opt.id as any }))}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    state.statementStatus === opt.id
                      ? 'bg-[#402493]/50 border-[#4DA5EC] text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{opt.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Travel History */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              4. Prior Travel History
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'frequent', label: 'Strong Travel History', sub: 'Prior UK, US, or Schengen visas' },
                { id: 'regional', label: 'Regional Travel', sub: 'Ghana, Kenya, Rwanda, Dubai' },
                { id: 'first_time', label: 'First-Time Traveler', sub: 'Virgin Nigerian passport' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, travelHistory: opt.id as any }))}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    state.travelHistory === opt.id
                      ? 'bg-[#402493]/50 border-[#4DA5EC] text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Diagnostic Results Card */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#120A38] to-[#0A0620] border border-white/15 space-y-5">
            {/* Score header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Consular Readiness Estimate
                </span>
                <div className="text-2xl sm:text-3xl font-heading font-black text-white mt-0.5">
                  {assessment.readinessScore}% Score
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${assessment.tierColor}`}>
                {assessment.readinessTier}
              </span>
            </div>

            {/* Statutory details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-400 text-[11px]">Recommended Closing Balance:</span>
                <div className="font-bold text-white text-sm">{assessment.destinationData.recommendedBalance}</div>
                <div className="text-[10px] text-slate-400">Demonstrates trip affordability</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-400 text-[11px]">Statutory Embassy Fee:</span>
                <div className="font-bold text-[#4DA5EC] text-sm">{assessment.destinationData.fee}</div>
                <div className="text-[10px] text-slate-400">Paid directly to consular authority</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-400 text-[11px]">Consular Decision Window:</span>
                <div className="font-bold text-white">{assessment.destinationData.processingTime}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-400 text-[11px]">Granted Stay Duration:</span>
                <div className="font-bold text-white">{assessment.destinationData.visaValidity}</div>
              </div>
            </div>

            {/* Forensic observations */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Audit Observations For Your Profile:
              </div>
              <div className="space-y-2">
                {assessment.notes.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{n}</span>
                  </div>
                ))}
                {assessment.redFlags.map((rf, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-rose-300 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{rf}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Link
                href={ROUTES.consultation}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs uppercase tracking-wider shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] hover:brightness-110 transition-all text-center"
              >
                <span>Book 1-on-1 File Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={ROUTES.assessment}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs border border-white/10 transition-all text-center"
              >
                Full Diagnostic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
