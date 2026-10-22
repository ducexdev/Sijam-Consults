'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Clock,
  RotateCcw,
  Landmark,
  FileText,
  PhoneCall,
  Scale,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

interface LegalizationCalculatorState {
  documentType: 'academic' | 'police' | 'civil' | 'corporate' | 'medical';
  destinationCountry: 'uae_gulf' | 'schengen' | 'uk' | 'canada_us' | 'asia_china';
  turnaroundSpeed: 'standard' | 'express';
}

export const LegalizationCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [state, setState] = useState<LegalizationCalculatorState>({
    documentType: 'academic',
    destinationCountry: 'uae_gulf',
    turnaroundSpeed: 'express',
  });

  const evaluation = useMemo(() => {
    // Document Specific Specifications
    const docData = {
      academic: {
        title: 'Academic Credentials & Transcripts',
        leadMinistry: 'Federal Ministry of Education (FME) Abuja',
        requiredStamps: [
          'High Court Notary Public Attestation',
          'FME Evaluation & Accreditation Division Seal',
          'Ministry of Foreign Affairs (MFA Abuja) Legal Services Stamp',
          'Destination Foreign Embassy / Consular Super-Legalization',
        ],
        verificationCheck: 'Original certificate verification or institutional portal confirmation',
        commonPitfall: 'Submitting unauthenticated color photocopies or laminations that cannot receive physical wax or embossed stamps',
      },
      police: {
        title: 'Police Character Clearance Certificate',
        leadMinistry: 'Nigeria Police Force Central Criminal Registry (CCR)',
        requiredStamps: [
          'NPF Forensic Biometrics Authentication',
          'High Court Oath Attestation',
          'Ministry of Foreign Affairs (MFA Abuja) Bilateral Stamp',
          'Foreign Embassy Legalization',
        ],
        verificationCheck: 'Character certificates expire within 3 to 6 months depending on foreign consular guidelines',
        commonPitfall: 'Legalizing an expired police clearance or one lacking the official biometric stamp from CID Alagbon/Abuja',
      },
      civil: {
        title: 'Civil & Vital Statistics Records (Birth / Marriage)',
        leadMinistry: 'National Population Commission (NPC) / Federal Marriage Registry',
        requiredStamps: [
          'NPC Birth Attestation or Court Marriage Certificate',
          'High Court Notary Seal',
          'Ministry of Foreign Affairs (MFA Abuja) Diplomatic Authentication',
          'Target Foreign Embassy Legalization',
        ],
        verificationCheck: 'Baptismal certificates or local government age declarations must be supported by official NPC attestation',
        commonPitfall: 'Submitting non-NPC hospital birth cards which foreign embassies reject outright without prior statutory regularization',
      },
      corporate: {
        title: 'Corporate & Commercial Documents (CAC Deeds / Resolutions)',
        leadMinistry: 'Corporate Affairs Commission (CAC) / Ministry of Justice',
        requiredStamps: [
          'Certified True Copy (CTC) from CAC Abuja Registry',
          'Senior Notary Public Seal & Red Wax Notarial Ribbon',
          'Ministry of Foreign Affairs (MFA Abuja) Commercial Division Stamp',
          'Destination Bilateral Consular Legalization',
        ],
        verificationCheck: 'Board resolutions and power of attorney documents require verified director signatures matching CAC filings',
        commonPitfall: 'Omitting CAC Status Report or submitting unstamped commercial agreements',
      },
      medical: {
        title: 'Medical Licensure & Professional Certifications',
        leadMinistry: 'Federal Ministry of Health & Respective Professional Board (MDCN, NMCN)',
        requiredStamps: [
          'Regulatory Board Letter of Good Standing',
          'High Court Verification Notary',
          'MFA Abuja Legal Services Authentication',
          'Destination Consular Attestation',
        ],
        verificationCheck: 'Verification of current annual practicing license with regulatory register',
        commonPitfall: 'Attempting MFA authentication without prerequisite line ministry endorsement',
      },
    }[state.documentType];

    // Destination Specific Requirements
    const destinationData = {
      uae_gulf: {
        region: 'United Arab Emirates & Gulf States (UAE, Qatar, Saudi Arabia, Oman)',
        embassyProtocol: 'Direct foreign embassy consular attestation with bilateral fee vouchers',
        mandatorySteps: 'Full 4-tier chain required: Notary → Line Ministry → MFA Abuja → UAE Embassy Abuja',
        notes: 'UAE MOFA requires QR-code electronic legalization verification after physical embassy seal.',
        typicalTimeline: state.turnaroundSpeed === 'express' ? '3 to 5 business days' : '7 to 10 business days',
      },
      schengen: {
        region: 'European Union & Schengen Area (Italy, Spain, Germany, Poland, France)',
        embassyProtocol: 'Consular legalizations often paired with sworn certified translation and Dichiarazione di Valore',
        mandatorySteps: 'Court Notarization → FME/Line Ministry → MFA Abuja → Embassy Legalization / Translation',
        notes: 'Most EU embassies require sworn Italian, Spanish, or French certified translations before final stamp.',
        typicalTimeline: state.turnaroundSpeed === 'express' ? '4 to 6 business days' : '8 to 12 business days',
      },
      uk: {
        region: 'United Kingdom (UK ENIC, Professional Bodies & UKVI)',
        embassyProtocol: 'MFA Legal Services Division Authentication + Solicitor verification',
        mandatorySteps: 'High Court Notarization → Line Ministry → MFA Abuja Diplomatic Seal',
        notes: 'UK institutions generally do not require British High Commission attestation; MFA Abuja stamp is universally recognized.',
        typicalTimeline: state.turnaroundSpeed === 'express' ? '2 to 4 business days' : '5 to 7 business days',
      },
      canada_us: {
        region: 'North America (Canada WES / US Credential Evaluation)',
        embassyProtocol: 'MFA Authentication or direct institutional registrar-to-evaluator transmission',
        mandatorySteps: 'Notary Public → FME Authentication → MFA Abuja Seal',
        notes: 'WES Canada / US specifically requires direct institutional verification alongside notarized copies.',
        typicalTimeline: state.turnaroundSpeed === 'express' ? '3 to 5 business days' : '6 to 9 business days',
      },
      asia_china: {
        region: 'China & Asia-Pacific Corridor',
        embassyProtocol: 'Chinese Embassy Consular Legalization Sticker with security watermarking',
        mandatorySteps: 'Notary Public → MFA Abuja Authentication → Chinese Embassy Abuja Consular Section',
        notes: 'Chinese Embassy imposes strict document formatting rules and requires physical submission in Abuja.',
        typicalTimeline: state.turnaroundSpeed === 'express' ? '4 to 6 business days' : '8 to 12 business days',
      },
    }[state.destinationCountry];

    return {
      docData,
      destinationData,
    };
  }, [state]);

  const handleReset = () => {
    setState({
      documentType: 'academic',
      destinationCountry: 'uae_gulf',
      turnaroundSpeed: 'express',
    });
    setCurrentStep(1);
  };

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-5 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#402493]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
            <Sparkles className="w-3 h-3" />
            Abuja Liaison Protocol
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-black text-white mt-1.5 tracking-tight">
            Legalization &amp; MFA Attestation Estimator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Calculate exact ministerial steps, stamps required, and custody timelines in 2 simple steps.
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
                <span className="text-[9px] text-slate-400 hidden sm:block">Document &amp; Corridor</span>
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
                <span className="text-[11px] font-bold block leading-tight">Step 2: Estimation</span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Chain &amp; Timeline</span>
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
          STEP 1: PARAMETERS SELECTION
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="relative z-10 space-y-4 pt-2">
          {/* Control 1: Document Type */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Select Document Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'academic', label: 'Academic & Degree', icon: FileCheck2 },
                { id: 'police', label: 'Police Character', icon: ShieldCheck },
                { id: 'civil', label: 'Birth / Marriage', icon: FileText },
                { id: 'corporate', label: 'Corporate & CAC', icon: Building2 },
                { id: 'medical', label: 'Medical License', icon: Landmark },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = state.documentType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        documentType: item.id as LegalizationCalculatorState['documentType'],
                      }))
                    }
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)] ring-1 ring-[#257CFF]'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected ? 'text-[#4DA5EC]' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-xs font-semibold truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control 2: Destination Country */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              2. Destination Diplomatic Jurisdiction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'uae_gulf', label: 'UAE & Gulf States (MOFA)', flag: '🇦🇪' },
                { id: 'schengen', label: 'European Union / Schengen', flag: '🇪🇺' },
                { id: 'uk', label: 'United Kingdom (UK ENIC)', flag: '🇬🇧' },
                { id: 'canada_us', label: 'Canada & United States (WES)', flag: '🇨🇦' },
                { id: 'asia_china', label: 'China & Asia-Pacific', flag: '🇨🇳' },
              ].map((dest) => {
                const isSelected = state.destinationCountry === dest.id;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        destinationCountry: dest.id as LegalizationCalculatorState['destinationCountry'],
                      }))
                    }
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#402493]/30 border-purple-500/60 text-white shadow-[0_0_15px_rgba(64,36,147,0.3)]'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold truncate">{dest.label}</span>
                    <span className="text-sm ml-2">{dest.flag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control 3: Speed Protocol */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              3. Processing Speed Protocol
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  id: 'express',
                  label: 'Express Abuja Courier',
                  sub: '3 – 5 Business Days',
                  tag: 'Recommended',
                },
                {
                  id: 'standard',
                  label: 'Standard Administrative',
                  sub: '7 – 10 Business Days',
                  tag: 'Economical',
                },
              ].map((spd) => {
                const isSelected = state.turnaroundSpeed === spd.id;
                return (
                  <button
                    key={spd.id}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        turnaroundSpeed: spd.id as LegalizationCalculatorState['turnaroundSpeed'],
                      }))
                    }
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)]'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold text-white">{spd.label}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#4DA5EC] font-bold">
                        {spd.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1">{spd.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 1 Continue Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Continue to authentication breakdown</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Next: Review required ministry stamps, embassy protocols &amp; turnaround
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: ESTIMATION BREAKDOWN & ROADMAP
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="relative z-10 space-y-3.5 pt-2">
          {/* Dynamic Results Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3.5">
            {/* Timeline & Jurisdiction Strip */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Corridor &amp; Document</span>
                <span className="text-xs font-bold text-white block">
                  {evaluation.docData.title}
                </span>
                <span className="text-[10px] text-slate-400">
                  Target: {evaluation.destinationData.region}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Turnaround</span>
                <span className="text-xs font-black text-emerald-400 flex items-center justify-end gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {evaluation.destinationData.typicalTimeline}
                </span>
              </div>
            </div>

            {/* Required Ministry Authentication Chain */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Mandatory Authentication Stamps in Chain:
              </span>
              <div className="space-y-1.5">
                {evaluation.docData.requiredStamps.map((stamp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0 mt-0.5" />
                    <span>{stamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Consular Note */}
            <div className="p-2.5 rounded-lg bg-[#402493]/20 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed flex items-start gap-2">
              <Scale className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0 mt-0.5" />
              <span>{evaluation.destinationData.notes}</span>
            </div>

            {/* Verification Check & Common Pitfall warning */}
            <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">Critical Pre-Submission Rule:</span>
                <span>{evaluation.docData.commonPitfall}</span>
              </div>
            </div>

            {/* Custody Guarantee */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Physical hand-to-hand delivery by bonded Abuja liaison officers. Zero third-party postal risk.
              </span>
            </div>
          </div>

          {/* Step 2 Actions */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href={ROUTES.consultation}
                className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Submit documents for legalization</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults,%20I%20need%20MFA%20Abuja%20legalization%20for%20my%20documents.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-xs tracking-wide border border-purple-500/40 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span>Chat with Abuja liaison officer</span>
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
