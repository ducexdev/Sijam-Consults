'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Stethoscope,
  Building2,
  Truck,
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  Scale,
  Users,
  Globe,
  Zap,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { getCountryByName } from '@/lib/data/countries';

interface RequisitionState {
  industry: 'trades' | 'healthcare' | 'construction' | 'logistics';
  headcount: '5_15' | '16_50' | '51_plus';
  destination: string;
  timelineTier: 'accelerated' | 'standard';
}

function getDestinationMobilizationData(destinationCountry: string, timelineTier: 'accelerated' | 'standard') {
  const isAccelerated = timelineTier === 'accelerated';
  const country = getCountryByName(destinationCountry) || {
    name: destinationCountry || 'Poland',
    code: 'PL',
    flag: '🇵🇱',
    region: 'Europe' as const,
  };

  const name = country.name;

  if (name === 'Poland') {
    return {
      countryName: 'Poland',
      flag: '🇵🇱',
      region: 'European Union (Schengen Zone)',
      workPermitType: 'Statutory Voivodeship Type A Labor Authorization (Zezwolenie na Pracę)',
      mobilizationTime: isAccelerated ? '45 to 60 calendar days' : '65 to 80 calendar days',
      consularProtocol: 'Voivodeship labor office quota lodgement, sworn Polish translations, NPF biometric criminal clearance & Embassy Type D visa stamping.',
    };
  }

  if (name === 'United Kingdom') {
    return {
      countryName: 'United Kingdom',
      flag: '🇬🇧',
      region: 'United Kingdom (UKVI)',
      workPermitType: 'Home Office Defined Certificate of Sponsorship (CoS) Allocation',
      mobilizationTime: isAccelerated ? '35 to 50 calendar days' : '55 to 70 calendar days',
      consularProtocol: 'VFS Global priority biometrics in Lagos/Abuja, IOM TB clearance certificate, UKVI CoS linkage & vignette issuance.',
    };
  }

  if (['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'].includes(name)) {
    return {
      countryName: name,
      flag: country.flag,
      region: 'Gulf Cooperation Council (GCC)',
      workPermitType: `Bilateral Ministry of Human Resources ${name} Work Visa Quota`,
      mobilizationTime: isAccelerated ? '30 to 45 calendar days' : '45 to 60 calendar days',
      consularProtocol: 'Federal Ministry of Labor vetting, MFA Abuja authentication, GAMCA accredited medicals & destination embassy visa stamping.',
    };
  }

  if (name === 'Canada') {
    return {
      countryName: 'Canada',
      flag: '🇨🇦',
      region: 'North America (IRCC)',
      workPermitType: 'IRCC LMIA (Labor Market Impact Assessment) / Provincial Nominee Employer Work Permit',
      mobilizationTime: isAccelerated ? '60 to 80 calendar days' : '80 to 105 calendar days',
      consularProtocol: 'IRCC employer compliance filing, VFS biometrics, panel physician medicals, and Letter of Introduction (LOI) work authorization.',
    };
  }

  if (name === 'United States') {
    return {
      countryName: 'United States',
      flag: '🇺🇸',
      region: 'North America (USCIS / DOL)',
      workPermitType: 'USCIS Form I-129 / H-2B Non-Agricultural / EB-3 Corporate Labor Quota',
      mobilizationTime: isAccelerated ? '65 to 85 calendar days' : '85 to 110 calendar days',
      consularProtocol: 'US Department of Labor prevailing wage audit, USCIS I-797 approval, and US Consulate Lagos/Abuja DS-160 biometric interview.',
    };
  }

  if (name === 'Germany') {
    return {
      countryName: 'Germany',
      flag: '🇩🇪',
      region: 'European Union (FEA / ZAV)',
      workPermitType: 'Federal Employment Agency (ZAV) Pre-Approval & Skilled Immigration Permit',
      mobilizationTime: isAccelerated ? '50 to 65 calendar days' : '65 to 85 calendar days',
      consularProtocol: 'ZAV labor office registration, certified German translations, police criminal certificate, and German Embassy Abuja biometrics.',
    };
  }

  if (name === 'Slovakia' || name === 'Czech Republic') {
    return {
      countryName: name,
      flag: country.flag,
      region: 'European Union (Central Europe)',
      workPermitType: 'Statutory Single Work & Residence Permit (Jednotné Povolenie)',
      mobilizationTime: isAccelerated ? '45 to 60 calendar days' : '60 to 75 calendar days',
      consularProtocol: 'Host government labor office quota verification, police certificate Apostille/legalisation, and embassy D-Visa biometrics.',
    };
  }

  if (name === 'Australia' || name === 'New Zealand') {
    return {
      countryName: name,
      flag: country.flag,
      region: 'Oceania (DHA / INZ)',
      workPermitType: 'Accredited Employer Work Sponsorship (Subclass 482 / AEWV)',
      mobilizationTime: isAccelerated ? '55 to 75 calendar days' : '75 to 95 calendar days',
      consularProtocol: 'VETASSESS / TRA skills recognition audit, chest X-ray & medical clearance, and immigration portal electronic grant notice.',
    };
  }

  // Worldwide sovereign corridor fallback
  return {
    countryName: name,
    flag: country.flag,
    region: `${country.region} Sovereign Corridor`,
    workPermitType: `Statutory ${name} Ministry of Labor Foreign Work Authorization & Quota`,
    mobilizationTime: isAccelerated ? '40 to 60 calendar days' : '60 to 85 calendar days',
    consularProtocol: `Nigerian Ministry of Foreign Affairs (MFA) document legalisation, Interpol police certificate authentication, and bilateral ${name} Embassy consular stamping.`,
  };
}

export const ManpowerRequisitionCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [state, setState] = useState<RequisitionState>({
    industry: 'trades',
    headcount: '16_50',
    destination: 'Poland',
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

    const destinationData = getDestinationMobilizationData(state.destination, state.timelineTier);

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
    const text = `Hello Sijam Consults Corporate Bilateral Desk,\n\nWe represent an international contractor seeking international manpower sourcing.\n\nRequisition Profile:\n• Industry: ${calculation.industryData.title}\n• Headcount: ${calculation.headcountMultiplier}\n• Destination Worksite: ${calculation.destinationData.countryName} (${calculation.destinationData.region})\n• Work Permit: ${calculation.destinationData.workPermitType}\n• Mobilization SLA: ${calculation.destinationData.mobilizationTime}\n• Deployment Tier: ${state.timelineTier === 'accelerated' ? 'Accelerated Priority' : 'Standard Schedule'}\n\nPlease share your B2B Manpower Supply Agreement, Trade-Testing Protocol, and Commercial Terms.`;
    return encodeURIComponent(text);
  };

  const handleReset = () => {
    setState({
      industry: 'trades',
      headcount: '16_50',
      destination: 'Poland',
      timelineTier: 'accelerated',
    });
    setCurrentStep(1);
  };

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-5 sm:p-7 backdrop-blur-md shadow-2xl relative">
      {/* Background ambient light */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#402493]/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
            <Sparkles className="w-3 h-3" />
            B2B Mobilization Engine
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-black text-white mt-1.5 tracking-tight">
            Manpower Quota &amp; SLA Estimator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Calculate candidate trade-testing timelines, consular steps, and mobilization quotas worldwide in 2 simple steps.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors pt-1 cursor-pointer shrink-0"
          title="Reset selections"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* 2-Step Progress Indicator Bar */}
      <div className="relative z-10 pt-4 pb-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              currentStep === 1
                ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  currentStep === 1
                    ? 'bg-[#4DA5EC] text-[#070415]'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {currentStep === 2 ? '✓' : '1'}
              </span>
              <div>
                <span className="text-[11px] font-bold block leading-tight">Step 1: Parameters</span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Sector &amp; Corridor</span>
              </div>
            </div>
            {currentStep === 1 && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse shrink-0" />
            )}
          </button>

          {/* Step 2 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              currentStep === 2
                ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  currentStep === 2
                    ? 'bg-[#4DA5EC] text-[#070415]'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                2
              </span>
              <div>
                <span className="text-[11px] font-bold block leading-tight">Step 2: Mobilization SLA</span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Timeline &amp; Guarantees</span>
              </div>
            </div>
            {currentStep === 2 && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse shrink-0" />
            )}
          </button>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] h-full transition-all duration-300"
            style={{ width: currentStep === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 1: LABOR REQUISITION PARAMETERS
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="relative z-10 space-y-4 pt-2">
          {/* 1. Industry Sector */}
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
                        ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)] ring-1 ring-[#257CFF]'
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

          {/* 2. Headcount */}
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

          {/* 3. Destination Corridors (Supports All 195+ Countries Worldwide) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                3. Project Worksite Destination
              </label>
              <span className="text-[11px] font-semibold text-[#4DA5EC] flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Worldwide Corridors</span>
              </span>
            </div>

            {/* Quick Primary Hub Pills for Frequent Corridors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
              {[
                { id: 'Poland', label: 'Poland (EU)', flag: '🇵🇱' },
                { id: 'United Kingdom', label: 'United Kingdom', flag: '🇬🇧' },
                { id: 'Saudi Arabia', label: 'Saudi Arabia', flag: '🇸🇦' },
                { id: 'Canada', label: 'Canada', flag: '🇨🇦' },
              ].map((item) => {
                const isSelected = state.destination === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, destination: item.id }))}
                    className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#257CFF]/25 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)] ring-1 ring-[#257CFF]'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold truncate">{item.label}</span>
                    <span className="text-sm shrink-0">{item.flag}</span>
                  </button>
                );
              })}
            </div>

            {/* Full Searchable Combobox for All 195+ Global Countries */}
            <div>
              <CountrySelect
                value={state.destination}
                onChange={(country) => setState((s) => ({ ...s, destination: country }))}
                label="Or Select Any Country Worldwide (195+ Sovereign States):"
                className="mt-1"
              />
            </div>
          </div>

          {/* 4. Deployment Schedule Tier Toggle */}
          <div className="pt-1">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              4. Mobilization Priority Tier
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, timelineTier: 'accelerated' }))}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                  state.timelineTier === 'accelerated'
                    ? 'bg-gradient-to-r from-[#257CFF]/25 to-purple-600/25 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)]'
                    : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                }`}
              >
                <Zap className="w-4 h-4 text-[#F45A2A] shrink-0" />
                <div>
                  <span className="text-xs font-bold block leading-tight">Accelerated Priority</span>
                  <span className="text-[10px] text-slate-400">Fast-track biometrics &amp; flight batching</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, timelineTier: 'standard' }))}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                  state.timelineTier === 'standard'
                    ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)]'
                    : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                }`}
              >
                <Clock className="w-4 h-4 text-[#4DA5EC] shrink-0" />
                <div>
                  <span className="text-xs font-bold block leading-tight">Standard Schedule</span>
                  <span className="text-[10px] text-slate-400">Standard statutory cohort mobilization</span>
                </div>
              </button>
            </div>
          </div>

          {/* Step 1 Continue Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Continue to mobilization &amp; SLA report</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Next: Review trade testing standards, permit protocols, and replacement SLAs
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: MOBILIZATION SLA & CONSULAR BREAKDOWN
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="relative z-10 space-y-3.5 pt-2">
          {/* Dynamic Results Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3.5">
            {/* Destination & Timeline Strip */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{calculation.destinationData.flag}</span>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {calculation.destinationData.countryName} Worksite
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {calculation.destinationData.region}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobilization Window</span>
                <span className="text-xs font-black text-emerald-400">
                  {calculation.destinationData.mobilizationTime}
                </span>
              </div>
            </div>

            {/* Requisition Cohort & Role Profiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/05">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Deployment Cohort:
                </span>
                <span className="text-white font-semibold block truncate">
                  {calculation.headcountMultiplier}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/05">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Selected Industry Sector:
                </span>
                <span className="text-white font-semibold block truncate">
                  {calculation.industryData.title}
                </span>
              </div>
            </div>

            {/* Typical Roles */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/05 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Standard Verified Job Roles:
              </span>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                {calculation.industryData.typicalRoles}
              </p>
            </div>

            {/* Trade Testing & Vetting Standard */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/05 text-xs text-slate-300 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Practical Skills Validation Standard:
              </span>
              <p className="font-semibold text-white leading-relaxed text-[11px]">
                {calculation.industryData.testingStandard}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <CheckCircle2 className="w-3 h-3 text-[#4DA5EC] shrink-0" />
                <span>{calculation.industryData.vettingChecks}</span>
              </div>
            </div>

            {/* Consular Permitting Protocol */}
            <div className="p-2.5 rounded-lg bg-[#402493]/20 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Scale className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0" />
                <span>{calculation.destinationData.workPermitType}:</span>
              </div>
              <p className="text-[11px]">{calculation.destinationData.consularProtocol}</p>
            </div>

            {/* 90-Day Replacement Guarantee & Zero Fee Policy */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                90-Day Free Candidate Replacement SLA &amp; ILO Convention 181 Zero-Fee Worker Protection.
              </span>
            </div>
          </div>

          {/* Step 2 Actions */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href={ROUTES.contact}
                className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request B2B manpower proposal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.number}?text=${generateWhatsAppInquiry()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-xs tracking-wide border border-purple-500/40 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span>Chat with corporate director</span>
              </a>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to edit parameters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
