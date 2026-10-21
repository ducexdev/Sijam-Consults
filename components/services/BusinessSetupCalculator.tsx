'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Scale,
  Landmark,
  FileText,
  PhoneCall,
  Globe2,
  Lock,
  BadgeCheck,
  Briefcase,
  Layers,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

interface BusinessSetupState {
  jurisdiction: 'poland_spzoo' | 'uk_ltd' | 'nigeria_cama' | 'eu_branch';
  ownershipModel: 'single_director' | 'partnership_board' | 'corporate_holding';
  strategicIntent: 'banking_trade' | 'founder_residency' | 'market_entry';
}

export const BusinessSetupCalculator: React.FC = () => {
  const [state, setState] = useState<BusinessSetupState>({
    jurisdiction: 'poland_spzoo',
    ownershipModel: 'single_director',
    strategicIntent: 'founder_residency',
  });

  const evaluation = useMemo(() => {
    const jurisdictionProfiles = {
      poland_spzoo: {
        entityName: 'Polish Sp. z o.o. (Limited Liability Company)',
        flag: '🇵🇱',
        registryAuthority: 'KRS (National Court Register) · Ministry of Justice Poland',
        capitalThreshold: 'PLN 5,000 statutory minimum (approx. ₦1.8M capital)',
        incorporationWindow: '14 to 21 business days (via S24 electronic or Notarial Proxy)',
        taxIdentification: 'NIP (Tax ID), REGON (Stats ID), VAT & VAT-EU for intra-bloc trade',
        bankingFacility: 'Multi-currency corporate IBAN (EUR, PLN, USD) with European commercial banks',
        residencyRule:
          'Company ownership alone does not confer residency. Operational revenue, verifiable commercial contracts, and economic benefit must be established to apply for a Director National D-Visa or Temporary Residence (Karta Pobytu).',
        complianceMilestones: [
          'Sworn Power of Attorney (PoA) or electronic PESEL & Trusted Profile (Profil Zaufany)',
          'Articles of Association drafting with aligned PKD classification codes',
          'Electronic KRS court filing & Central Register of Beneficial Owners (CRBR) registration',
          'Urząd Skarbowy corporate tax & VAT-EU activation',
        ],
      },
      uk_ltd: {
        entityName: 'United Kingdom Private Limited Company (Ltd)',
        flag: '🇬🇧',
        registryAuthority: 'Companies House · Cardiff / London Registrar',
        capitalThreshold: '£100 to £1,000 standard issued share capital',
        incorporationWindow: '5 to 10 business days',
        taxIdentification: 'Unique Taxpayer Reference (UTR) · HMRC Corporate Tax Registration',
        bankingFacility: 'UK corporate digital banking rails (Wise Business, Revolut, Payoneer, or High Street)',
        residencyRule:
          'UK company incorporation does not grant a UK visa. Relocation requires sponsorship under the UK Innovator Founder, Global Talent, or Skilled Worker license sponsor route.',
        complianceMilestones: [
          'Memorandum & Articles of Association filed with Companies House',
          'UK registered corporate office address & service address allocation',
          'HMRC corporation tax activation & PAYE setup if drawing director salary',
          'Persons with Significant Control (PSC) statutory register declaration',
        ],
      },
      nigeria_cama: {
        entityName: 'Nigerian Corporate Entity with Foreign Participation',
        flag: '🇳🇬',
        registryAuthority: 'Corporate Affairs Commission (CAC CAMA 2020) & NIPC',
        capitalThreshold: '₦100,000,000 statutory authorized share capital for foreign equity',
        incorporationWindow: '10 to 18 business days',
        taxIdentification: 'FIRS Tax Identification Number (TIN) & Value Added Tax (VAT) certificate',
        bankingFacility: 'Corporate Naira & Foreign Currency Domiciliary Accounts in commercial banks',
        residencyRule:
          'Expatriate founders require a Ministry of Interior Business Permit and Expatriate Quota approval before applying for the Combined Expatriate Residence Permit and Aliens Card (CERPAC).',
        complianceMilestones: [
          'CAC pre-incorporation availability check & MEMART foreign equity structuring',
          'Nigerian Investment Promotion Commission (NIPC) statutory business registration',
          'Federal Ministry of Interior Business Permit & Expatriate Quotas (EQ)',
          'Central Bank of Nigeria Electronic Certificate of Capital Importation (eCCI)',
        ],
      },
      eu_branch: {
        entityName: 'European Commercial Branch / Subsidiary Office',
        flag: '🇪🇺',
        registryAuthority: 'Host European Commercial Court & Regional Trade Registry',
        capitalThreshold: 'Dependent on parent entity audited financial equity standing',
        incorporationWindow: '21 to 35 business days',
        taxIdentification: 'Local Corporate Tax ID & EU Intra-Community VAT registration',
        bankingFacility: 'Direct subsidiary corporate banking tied to parent corporate credit rails',
        residencyRule:
          'Inter-Company Transferee (ICT) permits can be requested for key managerial personnel transferred from the Nigerian parent entity to the European subsidiary.',
        complianceMilestones: [
          'Notarized & Apostilled Nigerian parent company CAC incorporation charter',
          'Resolution of parent board of directors authorizing cross-border branch opening',
          'Appointment of resident legal representative / process agent in host nation',
          'European commercial register filing & local branch office physical lease verification',
        ],
      },
    }[state.jurisdiction];

    const strategyMultiplier = {
      banking_trade: {
        focus: 'Commercial Trade & Cross-Border EUR Banking Rails',
        deliverable: 'Corporate establishment optimized for invoicing, VAT-EU intra-bloc zero rating, and global settlement.',
      },
      founder_residency: {
        focus: 'Founder Migration & Commercial D-Visa Pathway',
        deliverable: 'Entity configured to meet host immigration criteria: verified economic substance, tax registration, and director visa eligibility.',
      },
      market_entry: {
        focus: 'Institutional FDI & Corporate Market Penetration',
        deliverable: 'Complete turnkey compliance setup with statutory licensing, expatriate quotas, and tax incentive onboarding.',
      },
    }[state.strategicIntent];

    return {
      jurisdictionProfiles,
      strategyMultiplier,
    };
  }, [state]);

  const generateWhatsAppInquiry = () => {
    const text = `Hello Sijam Consults Corporate Desk,\n\nI am an executive seeking corporate establishment advisory.\n\nStructure Details:\n• Target Jurisdiction: ${evaluation.jurisdictionProfiles.entityName}\n• Ownership Model: ${state.ownershipModel.replace('_', ' ').toUpperCase()}\n• Strategic Objective: ${evaluation.strategyMultiplier.focus}\n• Capital Threshold: ${evaluation.jurisdictionProfiles.capitalThreshold}\n\nPlease share your corporate setup engagement framework, incorporation legal fee schedule, and consultation availability.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-5 sm:p-7 backdrop-blur-md shadow-2xl relative">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#402493]/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
            <Sparkles className="w-3 h-3" />
            Corporate Setup Evaluator
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-black text-white mt-1.5">
            Cross-Border Entity Feasibility Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit capital requirements, incorporation registries, banking access, and residency rules.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setState({
              jurisdiction: 'poland_spzoo',
              ownershipModel: 'single_director',
              strategicIntent: 'founder_residency',
            })
          }
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors pt-1 cursor-pointer"
          title="Reset selections"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Interactive Controls */}
      <div className="relative z-10 space-y-4 pt-5">
        {/* 1. Target Jurisdiction */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            1. Target Corporate Jurisdiction
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'poland_spzoo', label: 'Poland Sp. z o.o.', flag: '🇵🇱', sub: 'European LLC' },
              { id: 'uk_ltd', label: 'UK Private Ltd', flag: '🇬🇧', sub: 'Companies House' },
              { id: 'nigeria_cama', label: 'Nigeria FDI Entity', flag: '🇳🇬', sub: 'CAC / NIPC' },
              { id: 'eu_branch', label: 'European Branch', flag: '🇪🇺', sub: 'Subsidiary Office' },
            ].map((item) => {
              const isSelected = state.jurisdiction === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      jurisdiction: item.id as BusinessSetupState['jurisdiction'],
                    }))
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)] ring-1 ring-[#257CFF]'
                      : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className="text-[10px] text-slate-400">{item.sub}</span>
                  </div>
                  <span className="text-base shrink-0">{item.flag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Ownership Model */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            2. Founding Ownership Structure
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'single_director', label: 'Sole Founder', sub: '100% Equity' },
              { id: 'partnership_board', label: 'Co-Founders', sub: '2–4 Partners' },
              { id: 'corporate_holding', label: 'Corporate Parent', sub: 'Entity Shareholder' },
            ].map((item) => {
              const isSelected = state.ownershipModel === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      ownershipModel: item.id as BusinessSetupState['ownershipModel'],
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

        {/* 3. Primary Commercial Objective */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            3. Primary Strategic Objective
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'founder_residency', label: 'Director Residency', sub: 'D-Visa / Residence Permit' },
              { id: 'banking_trade', label: 'EUR Banking & Trade', sub: 'Invoicing & VAT-EU Rails' },
              { id: 'market_entry', label: 'Corporate FDI Market', sub: 'Inbound Nigeria Setup' },
            ].map((item) => {
              const isSelected = state.strategicIntent === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      strategicIntent: item.id as BusinessSetupState['strategicIntent'],
                    }))
                  }
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)]'
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
      </div>

      {/* Dynamic Results Card */}
      <div className="relative z-10 mt-5 p-4 rounded-xl bg-black/40 border border-white/10 space-y-3.5">
        {/* Jurisdiction & Timeline Strip */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{evaluation.jurisdictionProfiles.flag}</span>
            <div>
              <span className="text-xs font-bold text-white block">
                {evaluation.jurisdictionProfiles.entityName}
              </span>
              <span className="text-[10px] text-slate-400">
                {evaluation.jurisdictionProfiles.registryAuthority}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Setup Turnaround</span>
            <span className="text-xs font-black text-emerald-400">
              {evaluation.jurisdictionProfiles.incorporationWindow}
            </span>
          </div>
        </div>

        {/* Capital & Banking Rails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/05">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Capital Requirement:
            </span>
            <span className="text-white font-semibold">
              {evaluation.jurisdictionProfiles.capitalThreshold}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/05">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Tax &amp; Banking Rails:
            </span>
            <span className="text-white font-semibold">
              {evaluation.jurisdictionProfiles.taxIdentification}
            </span>
          </div>
        </div>

        {/* Statutory Residency Distinction Callout */}
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/95 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Corporate Setup vs Immigration Right Invariant:</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {evaluation.jurisdictionProfiles.residencyRule}
          </p>
        </div>

        {/* Core Milestones Checklist */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Statutory Formation Milestones:
          </span>
          <div className="space-y-1">
            {evaluation.jurisdictionProfiles.complianceMilestones.map((milestone, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-[#4DA5EC] shrink-0 mt-0.5" />
                <span>{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
        <Link
          href={ROUTES.consultation}
          className="group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Book Corporate Advisory</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
