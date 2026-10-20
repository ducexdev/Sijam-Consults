'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Stethoscope,
  Building2,
  Truck,
  Wheat,
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Scale,
  Users,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

interface RequisitionState {
  industry: 'trades' | 'healthcare' | 'construction' | 'logistics';
  headcount: '5_15' | '16_50' | '51_plus';
  destination: 'eu' | 'uk' | 'gulf';
  timelineTier: 'accelerated' | 'standard';
}

export const ManpowerRequisitionCalculator: React.FC = () => {
  const [state, setState] = useState<RequisitionState>({
    industry: 'trades',
    headcount: '16_50',
    destination: 'eu',
    timelineTier: 'accelerated',
  });

  const calculation = useMemo(() => {
    const industryData = {
      trades: {
        title: 'Skilled Trades & Fabrication',
        testingStandard: 'ISO 9606-1 / ASME Section IX Welder Certification at Kaduna Technical Test Facility',
        vettingChecks: 'Physical radiographic weld seam inspection, technical college credential verification',
        typicalRoles: 'MIG/MAG 135/136 Welders, Pipefitters, CNC Machinists, Structural Steel Fabricators',
      },
      healthcare: {
        title: 'Healthcare & Clinical Personnel',
        testingStandard: 'NMCN Nursing Registry Audit, Clinical OSCE Simulator Assessment, IELTS/OET Verification',
        vettingChecks: 'Primary source verification at issuing nursing schools, hospital tenure confirmation',
        typicalRoles: 'Registered General Nurses (RGN), Senior Care Workers, Radiographers, Physiotherapists',
      },
      construction: {
        title: 'Construction & Civil Infrastructure',
        testingStandard: 'Heavy Plant Operator Trade Testing, Structural Scaffolding & Formwork Assessment',
        vettingChecks: 'Federal Ministry of Works skills certificate audit, NPF biometric criminal clearance',
        typicalRoles: 'Heavy Equipment Operators, Structural Carpenters, Rebar Fixers, Site Electricians',
      },
      logistics: {
        title: 'Logistics & Industrial Manufacturing',
        testingStandard: 'Automated Warehouse Simulation, Counterbalance Forklift Operator Practical Evaluation',
        vettingChecks: 'Federal Road Safety Corps driver history audit, verified industrial tenure references',
        typicalRoles: 'Reach Truck Drivers, Automotive Assembly Line Operators, Packaging Technicians',
      },
    }[state.industry];

    const destinationData = {
      eu: {
        region: 'European Union (Poland, Slovakia, Germany)',
        workPermitType: 'Statutory Type D National Employment Visa & Voivodeship Labor Quota',
        mobilizationTime: state.timelineTier === 'accelerated' ? '45 to 60 calendar days' : '65 to 80 calendar days',
        consularProtocol: 'In-person Embassy biometrics in Abuja, sworn Polish/German translation, police clearance',
      },
      uk: {
        region: 'United Kingdom (UKVI Skilled Worker)',
        workPermitType: 'Home Office Defined Certificate of Sponsorship (CoS) Allocation',
        mobilizationTime: state.timelineTier === 'accelerated' ? '40 to 55 calendar days' : '60 to 75 calendar days',
        consularProtocol: 'VFS Global biometrics in Lagos/Abuja, TB clearance certificate, UKVI CoS linkage',
      },
      gulf: {
        region: 'Gulf States (UAE, Saudi Arabia, Qatar)',
        workPermitType: 'Bilateral Ministry of Human Resources Employment Visa Quota',
        mobilizationTime: state.timelineTier === 'accelerated' ? '30 to 45 calendar days' : '45 to 60 calendar days',
        consularProtocol: 'MFA Abuja authentication, destination embassy consular legalization, GAMCA medicals',
      },
    }[state.destination];

    const headcountMultiplier = {
      '5_15': 'Cohort Batch 1 (5–15 Specialists)',
      '16_50': 'Turnkey Mobilization (16–50 Operatives)',
      '51_plus': 'Enterprise Workforce Deployment (50+ Personnel)',
    }[state.headcount];

    return {
      industryData,
      destinationData,
      headcountMultiplier,
    };
  }, [state]);

  const generateWhatsAppInquiry = () => {
    const text = `Hello Sijam Consults Corporate Bilateral Desk,\n\nWe represent an international contractor seeking manpower sourcing from Nigeria.\n\nRequisition Profile:\n• Industry: ${calculation.industryData.title}\n• Headcount: ${calculation.headcountMultiplier}\n• Destination: ${calculation.destinationData.region}\n• Expected Timeline: ${calculation.destinationData.mobilizationTime}\n\nPlease share your B2B Manpower Supply Agreement and Trade-Testing SLA.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#402493]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
            <Sparkles className="w-3 h-3" />
            B2B Mobilization Engine
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-black text-white mt-1.5">
            Manpower Quota &amp; SLA Estimator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Calculate candidate trade-testing timelines, consular steps, and mobilization quotas.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setState({
              industry: 'trades',
              headcount: '16_50',
              destination: 'eu',
              timelineTier: 'accelerated',
            })
          }
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors pt-1 cursor-pointer"
          title="Reset selections"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Controls */}
      <div className="relative z-10 space-y-4 pt-5">
        {/* Industry Sector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            1. Target Labor Sector
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'trades', label: 'Skilled Trades & Welders', icon: Wrench },
              { id: 'healthcare', label: 'Healthcare & Clinical', icon: Stethoscope },
              { id: 'construction', label: 'Construction & Civil', icon: Building2 },
              { id: 'logistics', label: 'Manufacturing & Logistics', icon: Truck },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = state.industry === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      industry: item.id as RequisitionState['industry'],
                    }))
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)]'
                      : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#4DA5EC]' : 'text-slate-400'
                    }`}
                  />
                  <span className="text-xs font-semibold truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Headcount */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            2. Requisition Headcount Cohort
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '5_15', label: '5 – 15', sub: 'Specialist Pod' },
              { id: '16_50', label: '16 – 50', sub: 'Standard Quota' },
              { id: '51_plus', label: '51 – 150+', sub: 'Enterprise Batch' },
            ].map((item) => {
              const isSelected = state.headcount === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      headcount: item.id as RequisitionState['headcount'],
                    }))
                  }
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#402493]/30 border-purple-500/60 text-white shadow-[0_0_15px_rgba(64,36,147,0.3)]'
                      : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-xs font-bold block">{item.label}</span>
                  <span className="text-[10px] text-slate-400">{item.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Destination Corridors */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            3. Project Worksite Destination
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'eu', label: 'European Union', flag: '🇪🇺' },
              { id: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
              { id: 'gulf', label: 'Gulf States', flag: '🇦🇪' },
            ].map((item) => {
              const isSelected = state.destination === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      destination: item.id as RequisitionState['destination'],
                    }))
                  }
                  className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white'
                      : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-xs font-semibold truncate">{item.label}</span>
                  <span className="text-xs">{item.flag}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Results Card */}
      <div className="relative z-10 mt-5 p-4 rounded-xl bg-black/40 border border-white/10 space-y-3.5">
        {/* Timeline Indicator */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#4DA5EC]" />
            <span className="text-xs text-slate-300">Turnkey Mobilization Window:</span>
          </div>
          <span className="text-xs font-black text-emerald-400">
            {calculation.destinationData.mobilizationTime}
          </span>
        </div>

        {/* Trade Testing Facility */}
        <div className="text-xs text-slate-300 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Practical Skills Validation Standard:
          </span>
          <p className="font-semibold text-white leading-relaxed">
            {calculation.industryData.testingStandard}
          </p>
        </div>

        {/* Consular Permitting */}
        <div className="p-2.5 rounded-lg bg-[#402493]/20 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <Scale className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span>Permit &amp; Consular Protocol:</span>
          </div>
          <p>{calculation.destinationData.consularProtocol}</p>
        </div>

        {/* 90-Day Replacement Guarantee */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            90-Day Free Candidate Replacement SLA against attrition or performance mismatch.
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
        <Link
          href={ROUTES.contact}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Request B2B Manpower Proposal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={`https://wa.me/${COMPANY.whatsapp.number}?text=${generateWhatsAppInquiry()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-xs tracking-wide border border-purple-500/40 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#4DA5EC]" />
          <span>Chat With Corporate Director</span>
        </a>
      </div>
    </div>
  );
};
