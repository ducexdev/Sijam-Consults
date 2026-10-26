'use client';

import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Search,
  Plus,
  Users,
  Eye,
  Send,
  Building2,
  FileText,
  CreditCard,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { RetainerDealRecord, RetainerStage, ProfileRecord } from '@/lib/types/database';
import { ClientDossierDrawer, DossierClient } from './ClientDossierDrawer';
import { WhatsAppNotificationModal, WhatsAppClientInfo } from './WhatsAppNotificationModal';

// ─── Default Sample Deals ─────────────────────────────────────────────────────

const INITIAL_DEALS: RetainerDealRecord[] = [
  {
    id: 'deal-01',
    reference_code: 'SJM-RN-9481',
    client_name: 'Yakubu Danladi',
    client_email: 'yakubudanladi@example.com',
    client_phone: '+234 812 112 3344',
    service_category: 'Healthcare Mobility',
    target_corridor: 'Poland (EU Hospital Corridor)',
    deal_value_usd: 3500,
    deal_value_ngn: 5250000,
    stage: 'document_filing',
    consultation_fee_paid: true,
    retainer_amount_paid_usd: 2000,
    invoice_reference: 'INV-2026-0941',
    payment_gateway: 'paystack',
    payment_verified_at: '2026-10-18T10:14:00Z',
    assigned_officer_name: 'James Samson',
    contract_signed_at: '2026-10-19T14:30:00Z',
    filing_date: '2026-10-22T09:00:00Z',
    expected_decision_date: '2026-12-15T00:00:00Z',
    created_at: '2026-10-14T09:24:00Z',
    updated_at: '2026-10-22T09:00:00Z',
  },
  {
    id: 'deal-02',
    reference_code: 'SJM-ST-8492',
    client_name: 'Emeka Umeh',
    client_email: 'emekauemeh@example.com',
    client_phone: '+234 803 456 7890',
    service_category: 'Study Relocation',
    target_corridor: 'Canada (PGWP Nursing Track)',
    deal_value_usd: 4200,
    deal_value_ngn: 6300000,
    stage: 'retainer_signed',
    consultation_fee_paid: true,
    retainer_amount_paid_usd: 2500,
    invoice_reference: 'INV-2026-0912',
    payment_gateway: 'paystack',
    payment_verified_at: '2026-10-17T11:20:00Z',
    assigned_officer_name: 'Blessing Attabor',
    contract_signed_at: '2026-10-20T16:00:00Z',
    created_at: '2026-10-15T11:03:00Z',
    updated_at: '2026-10-20T16:00:00Z',
  },
  {
    id: 'deal-03',
    reference_code: 'SJM-WK-7104',
    client_name: 'Tunde Adeyemi',
    client_email: 'tunde.adeyemi@example.com',
    client_phone: '+234 706 123 4567',
    service_category: 'Work Permit',
    target_corridor: 'Slovakia (Voivodeship Permit)',
    deal_value_usd: 2800,
    deal_value_ngn: 4200000,
    stage: 'consultation_paid',
    consultation_fee_paid: true,
    retainer_amount_paid_usd: 0,
    invoice_reference: 'INV-2026-0884',
    payment_gateway: 'paystack',
    payment_verified_at: '2026-10-21T09:15:00Z',
    assigned_officer_name: 'James Samson',
    created_at: '2026-10-18T14:45:00Z',
    updated_at: '2026-10-21T09:15:00Z',
  },
  {
    id: 'deal-04',
    reference_code: 'SJM-BS-5921',
    client_name: 'Dr. Amina Bello',
    client_email: 'amina.bello@example.com',
    client_phone: '+234 802 345 6789',
    service_category: 'Corporate Mobility',
    target_corridor: 'United Kingdom (Tier 2 Sponsor License)',
    deal_value_usd: 6500,
    deal_value_ngn: 9750000,
    stage: 'embassy_decision',
    consultation_fee_paid: true,
    retainer_amount_paid_usd: 4500,
    invoice_reference: 'INV-2026-0792',
    payment_gateway: 'wire_transfer',
    payment_verified_at: '2026-10-05T08:00:00Z',
    assigned_officer_name: 'James Samson',
    contract_signed_at: '2026-10-06T10:00:00Z',
    filing_date: '2026-10-12T12:00:00Z',
    expected_decision_date: '2026-11-05T00:00:00Z',
    created_at: '2026-10-02T10:00:00Z',
    updated_at: '2026-10-12T12:00:00Z',
  },
  {
    id: 'deal-05',
    reference_code: 'SJM-REC-3841',
    client_name: 'Ngozi Eze',
    client_email: 'ngozi.eze@example.com',
    client_phone: '+234 805 987 6543',
    service_category: 'General Worker Placement',
    target_corridor: 'Poland (Logistics / Warehouse)',
    deal_value_usd: 2400,
    deal_value_ngn: 3600000,
    stage: 'commission_released',
    consultation_fee_paid: true,
    retainer_amount_paid_usd: 2400,
    invoice_reference: 'INV-2026-0651',
    payment_gateway: 'paystack',
    payment_verified_at: '2026-09-20T14:00:00Z',
    assigned_officer_name: 'Salami Zainab',
    decision_outcome: 'approved',
    created_at: '2026-09-10T10:00:00Z',
    updated_at: '2026-10-22T17:00:00Z',
  },
  {
    id: 'deal-06',
    reference_code: 'SJM-AS-1029',
    client_name: 'Halima Lawal',
    client_email: 'halima.lawal@example.com',
    client_phone: '+234 809 987 6543',
    service_category: 'Permanent Residency',
    target_corridor: 'Cyprus / Malta Diaspora Track',
    deal_value_usd: 5000,
    deal_value_ngn: 7500000,
    stage: 'initial_assessment',
    consultation_fee_paid: false,
    retainer_amount_paid_usd: 0,
    assigned_officer_name: 'Blessing Attabor',
    created_at: '2026-10-23T08:15:00Z',
    updated_at: '2026-10-23T08:15:00Z',
  },
];

// ─── Pipeline Stage Definitions ───────────────────────────────────────────────

const STAGES: {
  key: RetainerStage;
  label: string;
  badgeColor: string;
  dotColor: string;
  description: string;
}[] = [
  {
    key: 'initial_assessment',
    label: '1. Initial Assessment',
    badgeColor: 'border-slate-700 bg-slate-900/60 text-slate-300',
    dotColor: 'bg-slate-400',
    description: 'Inbound intake assessment & qualification',
  },
  {
    key: 'consultation_paid',
    label: '2. Consultation Paid',
    badgeColor: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
    dotColor: 'bg-amber-400',
    description: '₦50,000 / $100 fee verified by Paystack',
  },
  {
    key: 'retainer_signed',
    label: '3. Retainer Signed',
    badgeColor: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
    dotColor: 'bg-purple-400',
    description: 'Formal legal retainer agreement executed ($1.5k–$5k)',
  },
  {
    key: 'document_filing',
    label: '4. Document Filing',
    badgeColor: 'border-blue-500/40 bg-blue-950/40 text-blue-300',
    dotColor: 'bg-blue-400',
    description: 'Legalized translations, MFA seal & Voivodeship submitted',
  },
  {
    key: 'embassy_decision',
    label: '5. Embassy Decision',
    badgeColor: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300',
    dotColor: 'bg-indigo-400',
    description: 'Consular interview complete · awaiting visa stamp',
  },
  {
    key: 'commission_released',
    label: '6. Commission Released',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
    dotColor: 'bg-emerald-400',
    description: 'Full retainer & employer bounty settled in bank',
  },
];

interface RevenuePipelineViewProps {
  staffList?: ProfileRecord[];
}

export function RevenuePipelineView({ staffList = [] }: RevenuePipelineViewProps) {
  const [deals, setDeals] = useState<RetainerDealRecord[]>(INITIAL_DEALS);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedClientDossier, setSelectedClientDossier] = useState<DossierClient | null>(null);
  const [whatsAppClient, setWhatsAppClient] = useState<WhatsAppClientInfo | null>(null);

  // New Deal Modal state
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('+234 800 000 0000');
  const [newCorridor, setNewCorridor] = useState('Poland (EU Hospital Corridor)');
  const [newCategory, setNewCategory] = useState('Healthcare Mobility');
  const [newDealValueUsd, setNewDealValueUsd] = useState(3500);

  // ─── Financial Calculations ───
  const financialMetrics = useMemo(() => {
    let pipelineTotalUsd = 0;
    let pipelineTotalNgn = 0;
    let collectedMonthUsd = 0;
    let closedCount = 0;

    deals.forEach((d) => {
      pipelineTotalUsd += d.deal_value_usd;
      pipelineTotalNgn += d.deal_value_ngn;
      collectedMonthUsd += d.retainer_amount_paid_usd;
      if (d.stage === 'commission_released') {
        closedCount++;
      }
    });

    const avgDealUsd = deals.length > 0 ? Math.round(pipelineTotalUsd / deals.length) : 0;
    const avgDealNgn = deals.length > 0 ? Math.round(pipelineTotalNgn / deals.length) : 0;

    return {
      pipelineTotalUsd,
      pipelineTotalNgn,
      collectedMonthUsd,
      collectedMonthNgn: collectedMonthUsd * 1500,
      avgDealUsd,
      avgDealNgn,
      totalDeals: deals.length,
      closedCount,
    };
  }, [deals]);

  // ─── Filtered Deals ───
  const filteredDeals = useMemo(() => {
    return deals.filter((d) => {
      if (stageFilter !== 'all' && d.stage !== stageFilter) return false;
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        return (
          d.client_name.toLowerCase().includes(q) ||
          d.reference_code.toLowerCase().includes(q) ||
          d.target_corridor.toLowerCase().includes(q) ||
          d.client_email.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [deals, stageFilter, searchTerm]);

  // ─── Advance Deal Stage ───
  const handleAdvanceStage = (dealId: string, currentStage: RetainerStage) => {
    const stageOrder: RetainerStage[] = [
      'initial_assessment',
      'consultation_paid',
      'retainer_signed',
      'document_filing',
      'embassy_decision',
      'commission_released',
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex >= stageOrder.length - 1) return;

    const nextStage = stageOrder[currentIndex + 1];
    setDeals(
      deals.map((d) =>
        d.id === dealId
          ? {
              ...d,
              stage: nextStage,
              consultation_fee_paid: true,
              updated_at: new Date().toISOString(),
            }
          : d
      )
    );
  };

  const handleCreateDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDeal: RetainerDealRecord = {
      id: `deal-${Date.now()}`,
      reference_code: `SJM-RET-${Math.floor(1000 + Math.random() * 9000)}`,
      client_name: newClientName,
      client_email: newClientEmail,
      client_phone: newClientPhone,
      service_category: newCategory,
      target_corridor: newCorridor,
      deal_value_usd: Number(newDealValueUsd),
      deal_value_ngn: Number(newDealValueUsd) * 1500,
      stage: 'initial_assessment',
      consultation_fee_paid: false,
      retainer_amount_paid_usd: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setDeals([newDeal, ...deals]);
    setIsNewDealOpen(false);
    setNewClientName('');
    setNewClientEmail('');
  };

  const openDossierForDeal = (d: RetainerDealRecord) => {
    setSelectedClientDossier({
      id: d.id,
      referenceCode: d.reference_code,
      fullName: d.client_name,
      email: d.client_email,
      phone: d.client_phone,
      targetCorridor: d.target_corridor,
      serviceCategory: d.service_category,
      leadIntentScore: d.consultation_fee_paid ? 96 : 82,
      estimatedLtvUsd: d.deal_value_usd,
      status: d.stage,
      createdAt: d.created_at,
      assignedOfficerName: d.assigned_officer_name || 'James Samson',
      consultationFeePaid: d.consultation_fee_paid,
      retainerStage: STAGES.find((s) => s.key === d.stage)?.label,
      retainerAmountUsd: d.deal_value_usd,
      paystackRef: d.payment_gateway === 'paystack' ? 'pstk_948291048' : undefined,
    });
  };

  const openWhatsAppForDeal = (d: RetainerDealRecord) => {
    setWhatsAppClient({
      fullName: d.client_name,
      phone: d.client_phone,
      referenceCode: d.reference_code,
      serviceOrCorridor: d.target_corridor,
      officerName: d.assigned_officer_name || undefined,
      consultationFee: d.consultation_fee_paid ? '₦50,000 (Verified)' : '₦50,000',
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Top Bar with Currency & Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            Commercial Operations • Agency Retainer Pipeline
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Revenue &amp; Retainer Pipeline Tracker
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Currency Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#0B1224] border border-slate-800">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                currency === 'USD'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                currency === 'NGN'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ₦ NGN
            </button>
          </div>

          <button
            onClick={() => setIsNewDealOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            Create Retainer Deal
          </button>
        </div>
      </div>

      {/* ── 4 Institutional Revenue Scorecards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Pipeline Value */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-[#16203A] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-purple-400">
              Active Pipeline Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              {currency === 'USD'
                ? `$${financialMetrics.pipelineTotalUsd.toLocaleString()}`
                : `₦${financialMetrics.pipelineTotalNgn.toLocaleString()}`}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Across {financialMetrics.totalDeals} active agency files
            </span>
          </div>
        </div>

        {/* Card 2: Retainers Collected */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-emerald-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-emerald-400">
              Collected Retainers
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-300 tracking-tight">
              {currency === 'USD'
                ? `$${financialMetrics.collectedMonthUsd.toLocaleString()}`
                : `₦${financialMetrics.collectedMonthNgn.toLocaleString()}`}
            </span>
            <span className="text-[11px] text-emerald-400/80 block mt-1">
              Verified via Paystack &amp; Bank Wire
            </span>
          </div>
        </div>

        {/* Card 3: Average File Retainer */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-[#16203A]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-blue-400">
              Average File Deal Size
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              {currency === 'USD'
                ? `$${financialMetrics.avgDealUsd.toLocaleString()}`
                : `₦${financialMetrics.avgDealNgn.toLocaleString()}`}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              High-ticket European/Canadian placement
            </span>
          </div>
        </div>

        {/* Card 4: Embassy Issuance Rate */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-[#16203A]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-400">
              Consular Approval Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                94.2%
              </span>
              <span className="text-xs text-emerald-400 font-bold">+2.4% vs benchmark</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Zero fraudulent document guarantee
            </span>
          </div>
        </div>
      </div>

      {/* ── Visual Retainer Stage Pipeline Funnel ── */}
      <div className="bg-[#0B1224] p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Institutional Stage Distribution Funnel
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Click any stage to filter matrix
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {STAGES.map((st) => {
            const stageDeals = deals.filter((d) => d.stage === st.key);
            const stageValueUsd = stageDeals.reduce((acc, curr) => acc + curr.deal_value_usd, 0);
            const isSelected = stageFilter === st.key;

            return (
              <button
                key={st.key}
                type="button"
                onClick={() => setStageFilter(isSelected ? 'all' : st.key)}
                className={`p-3.5 rounded-xl border text-left transition relative overflow-hidden ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'bg-[#080E20] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`w-2 h-2 rounded-full ${st.dotColor}`} />
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-300 truncate">
                    {st.label.replace(/^[0-9]\.\s*/, '')}
                  </span>
                </div>
                <div className="font-heading font-extrabold text-sm text-white">
                  {stageDeals.length} files
                </div>
                <div className="text-[10px] font-mono text-purple-300 mt-0.5">
                  {currency === 'USD'
                    ? `$${stageValueUsd.toLocaleString()}`
                    : `₦${(stageValueUsd * 1500).toLocaleString()}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search deals by client, reference code, corridor..."
            className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {stageFilter !== 'all' && (
            <button
              onClick={() => setStageFilter('all')}
              className="text-xs text-purple-400 hover:underline px-2 py-1"
            >
              Clear stage filter
            </button>
          )}
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredDeals.length} of {deals.length} deals
          </span>
        </div>
      </div>

      {/* ── Deals Matrix Table ── */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Client Dossier</th>
                <th className="p-4">Target Corridor</th>
                <th className="p-4">Deal Value</th>
                <th className="p-4">Current Stage</th>
                <th className="p-4">Payment Verification</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No deals found in this pipeline segment.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => {
                  const stageObj = STAGES.find((s) => s.key === deal.stage);

                  return (
                    <tr
                      key={deal.id}
                      className="hover:bg-slate-800/40 transition cursor-pointer"
                      onClick={() => openDossierForDeal(deal)}
                    >
                      {/* Client */}
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm">
                          {deal.client_name}
                        </div>
                        <div className="text-[10px] text-purple-300 font-mono mt-0.5">
                          {deal.reference_code} • {deal.client_phone}
                        </div>
                      </td>

                      {/* Corridor */}
                      <td className="p-4">
                        <div className="text-slate-200 font-medium">{deal.target_corridor}</div>
                        <div className="text-[10px] text-slate-400">
                          {deal.service_category} • Officer: {deal.assigned_officer_name || 'James Samson'}
                        </div>
                      </td>

                      {/* Value */}
                      <td className="p-4 font-mono">
                        <div className="font-bold text-white text-sm">
                          {currency === 'USD'
                            ? `$${deal.deal_value_usd.toLocaleString()}`
                            : `₦${deal.deal_value_ngn.toLocaleString()}`}
                        </div>
                        <div className="text-[10px] text-emerald-400">
                          Paid: ${deal.retainer_amount_paid_usd.toLocaleString()}
                        </div>
                      </td>

                      {/* Stage Badge */}
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            stageObj ? stageObj.badgeColor : 'border-slate-700 bg-slate-800'
                          }`}
                        >
                          {stageObj ? stageObj.label : deal.stage}
                        </span>
                      </td>

                      {/* Payment Verification */}
                      <td className="p-4">
                        {deal.consultation_fee_paid ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {deal.payment_gateway === 'paystack'
                                ? 'Paystack Confirmed'
                                : 'Bank Wire Verified'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-amber-400 text-[11px] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Awaiting Paystack
                          </span>
                        )}
                        {deal.invoice_reference && (
                          <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                            {deal.invoice_reference}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleAdvanceStage(deal.id, deal.stage)}
                          className="px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-200 text-[11px] font-semibold transition"
                          title="Advance to next pipeline stage"
                        >
                          Advance Stage →
                        </button>

                        <button
                          onClick={() => openWhatsAppForDeal(deal)}
                          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition inline-flex"
                          title="WhatsApp Client"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openDossierForDeal(deal)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition inline-flex"
                          title="Open 360° Client Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 360° Client Dossier Drawer ── */}
      <ClientDossierDrawer
        client={selectedClientDossier}
        isOpen={Boolean(selectedClientDossier)}
        onClose={() => setSelectedClientDossier(null)}
      />

      {/* ── WhatsApp Cloud Dispatch Modal ── */}
      {whatsAppClient && (
        <WhatsAppNotificationModal
          client={whatsAppClient}
          isOpen={Boolean(whatsAppClient)}
          onClose={() => setWhatsAppClient(null)}
        />
      )}

      {/* ── New Retainer Deal Modal ── */}
      {isNewDealOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1420] border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Initialize Commercial Retainer Deal
              </h3>
              <button
                onClick={() => setIsNewDealOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDealSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Oluwaseun Adeleke"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Target Corridor *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCorridor}
                    onChange={(e) => setNewCorridor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Deal Value (USD) *
                  </label>
                  <input
                    type="number"
                    min={500}
                    step={100}
                    required
                    value={newDealValueUsd}
                    onChange={(e) => setNewDealValueUsd(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[11px] text-purple-300">
                Notice: Commercial retainers are legally structured with Sijam Consults non-guarantee advisory clauses under Nigerian &amp; corridor immigration law.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewDealOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition"
                >
                  Create Deal Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
