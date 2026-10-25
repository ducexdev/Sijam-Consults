'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ExternalLink,
  ArrowRight,
  FileSearch,
  Scale,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

/**
 * InformationGainSection
 *
 * UNIQUE CONTENT NOT COVERED BY ANY TOP 3 COMPETITORS:
 * 1. Forensic Consular Audit vs. Street Agent Checklist — interactive comparison table
 * 2. True Relocation Cost Breakdown — transparent fee anatomy (no competitor does this)
 *
 * SEO entities naturally included: consular audit, apostille, statutory work permit,
 * voivodeship, ethical recruitment, MFA Abuja, bilateral agreements, immigration
 * consultancy in Nigeria, CAC RC: 1715416.
 */

/* ─────────────────────────────────────────────── */
/* 1. CONSULAR AUDIT vs. STREET AGENT CHECKLIST   */
/* ─────────────────────────────────────────────── */

type CheckItem = {
  criterion: string;
  accredited: string | true;
  streetAgent: string | false;
};

const checklistItems: CheckItem[] = [
  {
    criterion: 'CAC Company Registration (verifiable)',
    accredited: 'CAC RC: 1715416 — publicly searchable',
    streetAgent: false,
  },
  {
    criterion: 'Physical office address (not just WhatsApp)',
    accredited: 'Kaduna HQ + Abuja Advisory Desk',
    streetAgent: false,
  },
  {
    criterion: 'Written, itemised service agreement',
    accredited: 'Milestone-billing contract provided upfront',
    streetAgent: false,
  },
  {
    criterion: 'Employer / university verification before application',
    accredited: 'Direct verified bilateral employer quotas',
    streetAgent: false,
  },
  {
    criterion: 'Zero forged or fabricated documentation policy',
    accredited: 'Anti-falsification audit on every file',
    streetAgent: false,
  },
  {
    criterion: 'MFA Abuja apostille and consular attestation',
    accredited: 'Full MFA & destination embassy legalisation',
    streetAgent: false,
  },
  {
    criterion: 'Transparent statutory processing timelines',
    accredited: 'Realistic windows given at first consultation',
    streetAgent: false,
  },
  {
    criterion: 'Refund / cancellation clause in writing',
    accredited: 'Defined in service agreement',
    streetAgent: false,
  },
  {
    criterion: 'Sovereign visa decision disclaimer',
    accredited: 'Clearly communicated — we are not an embassy',
    streetAgent: 'Often omitted; outcome "guaranteed"',
  },
  {
    criterion: 'ILO Fair Recruitment compliance',
    accredited: 'Zero illegal placement fees charged',
    streetAgent: false,
  },
];

/* ─────────────────────────────────────────────── */
/* 2. TRUE RELOCATION COST BREAKDOWN              */
/* ─────────────────────────────────────────────── */

type CostLine = {
  category: string;
  items: { label: string; note: string }[];
  color: string;
};

const costBreakdown: CostLine[] = [
  {
    category: 'Statutory Government Fees',
    color: 'text-blue-400 border-blue-500/30',
    items: [
      { label: 'Embassy visa application fee', note: 'Paid directly to embassy — non-refundable' },
      { label: 'Voivodeship work permit filing (Poland)', note: '~PLN 440 (approx. ₦165,000) per permit' },
      { label: 'Slovak Foreign Police Single Permit', note: 'EUR 232 (approx. ₦420,000)' },
      { label: 'UK Skilled Worker visa application', note: 'From £719 (approx. ₦1.3M) — depends on category' },
      { label: 'Nigeria MFA apostille / attestation', note: 'Per-document fee (MFA Abuja tariff)' },
    ],
  },
  {
    category: 'Sijam Advisory & Filing Fees',
    color: 'text-purple-400 border-purple-500/30',
    items: [
      { label: 'Initial eligibility assessment', note: 'Disclosed at first consultation' },
      { label: 'Document audit & compliance review', note: 'Milestone 1 — payable before submission' },
      { label: 'Employer matching & quota reservation', note: 'Milestone 2 — payable on employer confirmation' },
      { label: 'Full consular dossier preparation', note: 'Milestone 3 — payable before embassy submission' },
      { label: 'Pre-departure & arrival coordination', note: 'Milestone 4 — payable on visa grant' },
    ],
  },
  {
    category: 'Candidate Personal Responsibilities',
    color: 'text-emerald-400 border-emerald-500/30',
    items: [
      { label: 'Medical fitness examination (NAFDAC-approved clinic)', note: 'Candidate arranges & pays direct' },
      { label: 'Police clearance certificate (NPF)', note: 'Candidate applies; Sijam advises process' },
      { label: 'Translation of documents (certified translator)', note: 'Required for non-English dossiers' },
      { label: 'Flight ticket & travel insurance', note: 'Issued after visa grant' },
      { label: 'First-month accommodation (destination)', note: "Employer-arranged or candidate's responsibility" },
    ],
  },
  {
    category: "Hidden Costs Some Agencies Don't Disclose",
    color: 'text-amber-400 border-amber-500/30',
    items: [
      { label: 'Courier / DHL for original documents to embassy', note: 'Both ways — budget separately' },
      { label: 'Passport biometrics appointment (some embassies)', note: 'VFS/TLScontact service charge' },
      { label: 'Re-submission fee if refused on documentation gap', note: 'New government fee applies; Sijam re-files at no extra advisory charge if gap is ours' },
      { label: 'Currency exchange spread on foreign-currency fees', note: 'Exchange at a reputable bureau — rates fluctuate' },
    ],
  },
];

/* ─────────────────────────────────────────────── */
/* COMPONENT                                       */
/* ─────────────────────────────────────────────── */

export const InformationGainSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'costs'>('checklist');
  const [openCostIndex, setOpenCostIndex] = useState<number | null>(0);

  return (
    <section
      className="py-20 lg:py-28 bg-[#08041A] text-white border-b border-purple-950/60 relative overflow-hidden"
      aria-labelledby="info-gain-heading"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#257CFF]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#402493]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs text-blue-200">
            <FileSearch className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Information You Won't Find on Other Agency Websites
            </span>
          </div>

          <h2
            id="info-gain-heading"
            className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]"
          >
            What Every Applicant{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Needs to Know First
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Two resources we publish openly because informed clients make better decisions —
            and because no other international recruitment agency in Nigeria has bothered to.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl bg-white/[0.04] border border-white/10 p-1 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-[#402493] to-[#2D186B] text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 shrink-0" />
              Consular Audit Checklist
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('costs')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                activeTab === 'costs'
                  ? 'bg-gradient-to-r from-[#402493] to-[#2D186B] text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSearch className="w-3.5 h-3.5 shrink-0" />
              True Cost Breakdown
            </button>
          </div>
        </div>

        {/* ── TAB 1: CHECKLIST ─────────────────────── */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/8 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-amber-300">Before you pay anyone:</strong> Use this
                forensic checklist to verify whether the consultancy you are considering
                operates to accredited, ethical standards — or whether you are dealing with an
                unregistered street agent. Every item in this table is verifiable.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/10">
                    <th className="p-4 text-left font-bold text-slate-300 w-2/5">
                      Verification Criterion
                    </th>
                    <th className="p-4 text-left font-bold text-emerald-400 w-[30%]">
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Accredited Agency (SIJAM)
                      </span>
                    </th>
                    <th className="p-4 text-left font-bold text-red-400 w-[30%]">
                      <span className="flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Typical Street Agent
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {checklistItems.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/[0.05] hover:bg-white/[0.025] transition-colors"
                    >
                      <td className="p-4 text-slate-200 font-medium leading-snug">
                        {row.criterion}
                      </td>
                      <td className="p-4">
                        <span className="flex items-start gap-2 text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                          <span className="leading-snug">{row.accredited}</span>
                        </span>
                      </td>
                      <td className="p-4">
                        {row.streetAgent === false ? (
                          <span className="flex items-center gap-2 text-red-400">
                            <XCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                            <span className="leading-snug">Typically absent</span>
                          </span>
                        ) : (
                          <span className="flex items-start gap-2 text-amber-300">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                            <span className="leading-snug">{row.streetAgent}</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center">
              <Link
                href={ROUTES.whyChooseUs}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] text-white font-bold text-xs uppercase tracking-wider border border-purple-500/40 hover:brightness-110 transition-all"
              >
                <span>Read Our Full Compliance Methodology</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* ── TAB 2: TRUE COST BREAKDOWN ───────────── */}
        {activeTab === 'costs' && (
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-500/8 border border-blue-500/20">
              <FileSearch className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-blue-300">Full fee transparency:</strong> Below is a
                structured breakdown of every cost category involved in an international
                relocation. Sijam Consults charges advisory fees in clearly defined milestones
                — no hidden surcharges. Government fees are paid directly by you to the
                relevant authority.
              </p>
            </div>

            <div className="space-y-3">
              {costBreakdown.map((section, si) => (
                <div
                  key={si}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenCostIndex(openCostIndex === si ? null : si)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
                    aria-expanded={openCostIndex === si}
                  >
                    <span className={`font-heading font-bold text-sm sm:text-base ${section.color.split(' ')[0]}`}>
                      {section.category}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                        openCostIndex === si ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openCostIndex === si && (
                    <div className={`border-t ${section.color.split(' ')[1]} divide-y divide-white/5`}>
                      {section.items.map((item, ii) => (
                        <div key={ii} className="flex items-start justify-between gap-4 px-5 py-3.5">
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${section.color.split(' ')[0]}`} />
                            <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 text-right leading-snug shrink-0 max-w-[45%]">
                            {item.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/6 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Sijam's Milestone-Billing Promise
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our advisory fees are split into four defined milestones and only become due at
                each confirmed deliverable. You are never asked to pay the full amount upfront.
                A written service agreement is signed before any work begins — protecting both parties.
              </p>
            </div>

            <div className="text-center">
              <Link
                href={ROUTES.consultation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] hover:brightness-110 transition-all"
              >
                <span>Get Your Personalised Cost Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
