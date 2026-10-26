'use client';

import React, { useState, useMemo, useTransition } from 'react';
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
  RefreshCw,
  Trash2,
  X,
  Briefcase,
  Layers,
} from 'lucide-react';
import { RetainerDealRecord, RetainerStage, ProfileRecord } from '@/lib/types/database';
import { ClientDossierDrawer, DossierClient } from './ClientDossierDrawer';
import { WhatsAppNotificationModal, WhatsAppClientInfo } from './WhatsAppNotificationModal';
import {
  adminCreateRetainerDeal,
  adminUpdateRetainerDealStage,
  adminDeleteRetainerDeal,
} from '@/app/actions/catalog';

// ─── Pipeline Stage Definitions (Preserving strict stage keys for test invariants) ────

export const STAGES: {
  key: RetainerStage;
  label: string;
  shortLabel: string;
  badgeColor: string;
  dotColor: string;
  description: string;
}[] = [
  {
    key: 'initial_assessment',
    label: '1. Initial Assessment',
    shortLabel: 'Assessment',
    badgeColor: 'border-slate-700 bg-slate-900/80 text-slate-300',
    dotColor: 'bg-slate-400',
    description: 'Inbound intake assessment & corridor eligibility qualification',
  },
  {
    key: 'consultation_paid',
    label: '2. Consultation Paid',
    shortLabel: 'Consultation',
    badgeColor: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
    dotColor: 'bg-amber-400',
    description: '₦50,000 / $100 fee verified by Paystack gateway',
  },
  {
    key: 'retainer_signed',
    label: '3. Retainer Signed',
    shortLabel: 'Retainer',
    badgeColor: 'border-blue-500/40 bg-blue-950/40 text-blue-300',
    dotColor: 'bg-blue-400',
    description: 'Formal legal retainer agreement executed ($1.5k–$5k)',
  },
  {
    key: 'document_filing',
    label: '4. Document Filing',
    shortLabel: 'Filing',
    badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300',
    dotColor: 'bg-cyan-400',
    description: 'Legalized translations, MFA seal & Voivodeship submitted',
  },
  {
    key: 'embassy_decision',
    label: '5. Embassy Decision',
    shortLabel: 'Embassy',
    badgeColor: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300',
    dotColor: 'bg-indigo-400',
    description: 'Consular interview complete · awaiting visa issuance',
  },
  {
    key: 'commission_released',
    label: '6. Commission Released',
    shortLabel: 'Released',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
    dotColor: 'bg-emerald-400',
    description: 'Full retainer & employer bilateral bounty settled in bank',
  },
];

const SERVICE_CORRIDORS = [
  'Poland (EU Hospital Corridor)',
  'Poland (Logistics / Warehouse Track)',
  'Canada (PGWP Nursing Track)',
  'Canada (Express Entry / Provincial Nominee)',
  'United Kingdom (Tier 2 Sponsor License)',
  'Slovakia (Voivodeship Permit)',
  'Cyprus / Malta Diaspora Track',
  'Germany (Chancenkarte / Skilled Mobility)',
];

const SERVICE_CATEGORIES = [
  'Healthcare Mobility',
  'Study Relocation',
  'Work Permit',
  'Corporate Mobility',
  'General Worker Placement',
  'Permanent Residency',
];

interface RevenuePipelineViewProps {
  staffList?: ProfileRecord[];
  initialDeals?: RetainerDealRecord[];
  onRefresh?: () => void;
}

export function RevenuePipelineView({
  staffList = [],
  initialDeals = [],
  onRefresh,
}: RevenuePipelineViewProps) {
  const [deals, setDeals] = useState<RetainerDealRecord[]>(initialDeals);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [corridorFilter, setCorridorFilter] = useState('all');
  const [selectedClientDossier, setSelectedClientDossier] = useState<DossierClient | null>(null);
  const [whatsAppClient, setWhatsAppClient] = useState<WhatsAppClientInfo | null>(null);
  const [isPending, startTransition] = useTransition();

  // New Deal Modal state
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('+234 ');
  const [newCorridor, setNewCorridor] = useState(SERVICE_CORRIDORS[0]);
  const [newCategory, setNewCategory] = useState(SERVICE_CATEGORIES[0]);
  const [newDealValueUsd, setNewDealValueUsd] = useState(3500);
  const [newOfficerName, setNewOfficerName] = useState(staffList[0]?.full_name || 'James Samson');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sync state if initialDeals prop updates
  React.useEffect(() => {
    setDeals(initialDeals);
  }, [initialDeals]);

  // ─── Financial Calculations ───
  const financialMetrics = useMemo(() => {
    let pipelineTotalUsd = 0;
    let pipelineTotalNgn = 0;
    let collectedTotalUsd = 0;
    let closedCount = 0;
    let activeFiles = 0;

    deals.forEach((d) => {
      pipelineTotalUsd += Number(d.deal_value_usd || 0);
      pipelineTotalNgn += Number(d.deal_value_ngn || (Number(d.deal_value_usd || 0) * 1500));
      collectedTotalUsd += Number(d.retainer_amount_paid_usd || 0);
      if (d.stage === 'commission_released') {
        closedCount++;
      } else {
        activeFiles++;
      }
    });

    const avgDealUsd = deals.length > 0 ? Math.round(pipelineTotalUsd / deals.length) : 0;
    const avgDealNgn = deals.length > 0 ? Math.round(pipelineTotalNgn / deals.length) : 0;
    const approvalRate = deals.length > 0 ? Math.round((closedCount / deals.length) * 100) : 94.2;

    return {
      pipelineTotalUsd,
      pipelineTotalNgn,
      collectedTotalUsd,
      collectedTotalNgn: collectedTotalUsd * 1500,
      avgDealUsd,
      avgDealNgn,
      totalDeals: deals.length,
      activeFiles,
      closedCount,
      approvalRate,
    };
  }, [deals]);

  // ─── Filtered Deals ───
  const filteredDeals = useMemo(() => {
    return deals.filter((d) => {
      if (stageFilter !== 'all' && d.stage !== stageFilter) return false;
      if (corridorFilter !== 'all' && d.target_corridor !== corridorFilter) return false;
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        return (
          d.client_name.toLowerCase().includes(q) ||
          d.reference_code.toLowerCase().includes(q) ||
          d.target_corridor.toLowerCase().includes(q) ||
          d.client_email.toLowerCase().includes(q) ||
          d.service_category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [deals, stageFilter, corridorFilter, searchTerm]);

  // ─── Advance Deal Stage ───
  const handleAdvanceStage = async (dealId: string, currentStage: RetainerStage) => {
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

    // Optimistic UI update
    setDeals((prev) =>
      prev.map((d) =>
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

    // Call server action
    startTransition(async () => {
      try {
        const res = await adminUpdateRetainerDealStage(dealId, nextStage);
        if (!res.success) {
          console.error(res.message);
        } else {
          setStatusMessage(`Deal successfully advanced to ${nextStage.replace(/_/g, ' ')}.`);
          setTimeout(() => setStatusMessage(null), 3000);
        }
      } catch (err) {
        console.error('Error advancing deal stage:', err);
      }
    });
  };

  // ─── Delete Deal ───
  const handleDeleteDeal = async (dealId: string, clientName: string) => {
    if (!confirm(`Are you sure you want to remove the retainer deal for "${clientName}"?`)) {
      return;
    }

    setDeals((prev) => prev.filter((d) => d.id !== dealId));

    startTransition(async () => {
      try {
        const res = await adminDeleteRetainerDeal(dealId);
        if (res.success) {
          setStatusMessage('Retainer deal removed from pipeline.');
          setTimeout(() => setStatusMessage(null), 3000);
        }
      } catch (err) {
        console.error('Error deleting deal:', err);
      }
    });
  };

  // ─── Create Deal Submit ───
  const handleCreateDealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const refCode = `SJM-RET-${Math.floor(1000 + Math.random() * 9000)}`;
    const usdVal = Number(newDealValueUsd) || 3500;
    const ngnVal = usdVal * 1500;

    const dealPayload: Omit<RetainerDealRecord, 'id' | 'created_at' | 'updated_at'> = {
      reference_code: refCode,
      client_name: newClientName.trim(),
      client_email: newClientEmail.trim(),
      client_phone: newClientPhone.trim(),
      service_category: newCategory,
      target_corridor: newCorridor,
      deal_value_usd: usdVal,
      deal_value_ngn: ngnVal,
      stage: 'initial_assessment',
      consultation_fee_paid: false,
      retainer_amount_paid_usd: 0,
      assigned_officer_name: newOfficerName,
      payment_gateway: 'paystack',
    };

    try {
      const res = await adminCreateRetainerDeal(dealPayload);
      if (res.success && res.deal) {
        setDeals((prev) => [res.deal!, ...prev]);
        setIsNewDealOpen(false);
        setNewClientName('');
        setNewClientEmail('');
        setNewClientPhone('+234 ');
        setStatusMessage('New commercial retainer deal initialized successfully.');
        setTimeout(() => setStatusMessage(null), 3500);
      } else {
        alert(res.message || 'Failed to create retainer deal.');
      }
    } catch (err) {
      console.error('Error creating deal:', err);
      alert('Network error while saving deal record.');
    } finally {
      setSubmitting(false);
    }
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
      paystackRef: d.payment_gateway === 'paystack' ? 'pstk_verified' : undefined,
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
      {/* ── Status Toast ── */}
      {statusMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center justify-between shadow-lg shadow-emerald-950/40 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Top Bar with Currency & Actions ── */}
      <div className="relative rounded-2xl overflow-hidden border border-[#1a2744] bg-gradient-to-br from-[#06091a] via-[#0d1330] to-[#0b0e2a] p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                Commercial Operations • Agency Retainer Pipeline
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                Live Backend Sync
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
              Revenue &amp; Retainer Pipeline Tracker
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Track multi-corridor legal retainer engagements, milestone payments, embassy outcomes, and commission settlements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#080E20] border border-slate-800 shadow-inner">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  currency === 'USD'
                    ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
              <button
                type="button"
                onClick={() => setCurrency('NGN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  currency === 'NGN'
                    ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ₦ NGN
              </button>
            </div>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
                title="Refresh from database"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsNewDealOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition whitespace-nowrap active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Create Retainer Deal
            </button>
          </div>
        </div>
      </div>

      {/* ── 4 Institutional Revenue Scorecards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Pipeline Value */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-[#1a2744] hover:border-cyan-500/40 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-cyan-400">
              Active Pipeline Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
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
              Across {financialMetrics.totalDeals} registered client deals
            </span>
          </div>
        </div>

        {/* Card 2: Retainers Collected */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-emerald-500/30 hover:border-emerald-500/50 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-emerald-400">
              Collected Retainers
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-300 tracking-tight">
              {currency === 'USD'
                ? `$${financialMetrics.collectedTotalUsd.toLocaleString()}`
                : `₦${financialMetrics.collectedTotalNgn.toLocaleString()}`}
            </span>
            <span className="text-[11px] text-emerald-400/80 block mt-1">
              Verified via Paystack &amp; Bank Wire
            </span>
          </div>
        </div>

        {/* Card 3: Average File Retainer */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-[#1a2744] hover:border-blue-500/40 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-blue-400">
              Average File Deal Size
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition">
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

        {/* Card 4: Consular Approval / Closed */}
        <div className="p-5 rounded-2xl bg-[#080E20] border border-[#1a2744] hover:border-amber-500/40 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-400">
              Consular Approval Benchmark
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                {financialMetrics.totalDeals > 0
                  ? `${financialMetrics.approvalRate}%`
                  : '94.2%'}
              </span>
              <span className="text-xs text-emerald-400 font-bold">
                {financialMetrics.closedCount} Completed
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Zero fraudulent document guarantee
            </span>
          </div>
        </div>
      </div>

      {/* ── Visual Retainer Stage Pipeline Funnel ── */}
      <div className="bg-[#0B1224] p-5 rounded-2xl border border-[#1a2744] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Institutional Stage Distribution Funnel
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Click any stage to filter pipeline matrix
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {STAGES.map((st) => {
            const stageDeals = deals.filter((d) => d.stage === st.key);
            const stageValueUsd = stageDeals.reduce((acc, curr) => acc + Number(curr.deal_value_usd || 0), 0);
            const isSelected = stageFilter === st.key;

            return (
              <button
                key={st.key}
                type="button"
                onClick={() => setStageFilter(isSelected ? 'all' : st.key)}
                className={`p-3.5 rounded-xl border text-left transition relative overflow-hidden ${
                  isSelected
                    ? 'bg-blue-950/80 border-[#257CFF] shadow-[0_0_20px_rgba(37,124,255,0.3)] ring-1 ring-[#4DA5EC]'
                    : 'bg-[#080E20] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`w-2 h-2 rounded-full ${st.dotColor}`} />
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-300 truncate">
                    {st.shortLabel}
                  </span>
                </div>
                <div className="font-heading font-extrabold text-sm text-white">
                  {stageDeals.length} files
                </div>
                <div className="text-[10px] font-mono text-cyan-300 mt-0.5">
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search deals by client, reference code, corridor..."
              className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={corridorFilter}
              onChange={(e) => setCorridorFilter(e.target.value)}
              className="px-3 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-[#4DA5EC]"
            >
              <option value="all">All Corridors</option>
              {SERVICE_CORRIDORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(stageFilter !== 'all' || corridorFilter !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setStageFilter('all');
                setCorridorFilter('all');
                setSearchTerm('');
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
            >
              Reset filters
            </button>
          )}
          <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
            Showing {filteredDeals.length} of {deals.length} deals
          </span>
        </div>
      </div>

      {/* ── Deals Matrix / Empty State Table ── */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {deals.length === 0 ? (
          /* Empty state when NO deals exist at all */
          <div className="py-16 px-6 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#091024] border border-[#1a2744] flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-inner">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-white">
              No Commercial Retainer Deals Yet
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Initialize client retainer files to track European and Canadian migration pipelines, milestone payments, and case progress with zero revenue slippage.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsNewDealOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition"
              >
                <Plus className="w-4 h-4" />
                Initialize First Retainer Deal
              </button>
            </div>
          </div>
        ) : filteredDeals.length === 0 ? (
          /* Empty state when filters return 0 results */
          <div className="py-12 px-6 text-center text-slate-400">
            <Search className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-300">No matching retainer deals</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or stage filters.</p>
            <button
              onClick={() => {
                setStageFilter('all');
                setCorridorFilter('all');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        ) : (
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
                {filteredDeals.map((deal) => {
                  const stageObj = STAGES.find((s) => s.key === deal.stage);
                  const isFinalStage = deal.stage === 'commission_released';

                  return (
                    <tr
                      key={deal.id}
                      className="hover:bg-slate-800/40 transition cursor-pointer group"
                      onClick={() => openDossierForDeal(deal)}
                    >
                      {/* Client */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a2744] to-[#0d1420] border border-slate-700 flex items-center justify-center text-cyan-300 font-bold text-xs shrink-0">
                            {deal.client_name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm group-hover:text-cyan-300 transition">
                              {deal.client_name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {deal.reference_code} • {deal.client_phone}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Corridor */}
                      <td className="p-4">
                        <div className="text-slate-200 font-medium">{deal.target_corridor}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {deal.service_category} • Officer: {deal.assigned_officer_name || 'James Samson'}
                        </div>
                      </td>

                      {/* Value (preserving deal_value_usd & deal_value_ngn) */}
                      <td className="p-4 font-mono">
                        <div className="font-bold text-white text-sm">
                          {currency === 'USD'
                            ? `$${Number(deal.deal_value_usd || 0).toLocaleString()}`
                            : `₦${Number(deal.deal_value_ngn || (Number(deal.deal_value_usd || 0) * 1500)).toLocaleString()}`}
                        </div>
                        <div className="text-[10px] text-emerald-400 mt-0.5">
                          Paid: ${Number(deal.retainer_amount_paid_usd || 0).toLocaleString()}
                        </div>
                      </td>

                      {/* Stage Badge */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            stageObj ? stageObj.badgeColor : 'border-slate-700 bg-slate-800'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${stageObj?.dotColor || 'bg-slate-400'}`} />
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
                        {!isFinalStage && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceStage(deal.id, deal.stage)}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-[11px] font-semibold shadow-sm transition inline-flex items-center gap-1"
                            title="Advance to next pipeline stage"
                          >
                            Advance Stage →
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openWhatsAppForDeal(deal)}
                          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition inline-flex"
                          title="WhatsApp Client Dispatch"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openDossierForDeal(deal)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition inline-flex"
                          title="Open 360° Client Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteDeal(deal.id, deal.client_name)}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 transition inline-flex"
                          title="Archive Deal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
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
                <DollarSign className="w-4 h-4 text-cyan-400" />
                Initialize Commercial Retainer Deal
              </h3>
              <button
                type="button"
                onClick={() => setIsNewDealOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
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
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
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
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
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
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Service Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Target Corridor *
                  </label>
                  <select
                    value={newCorridor}
                    onChange={(e) => setNewCorridor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                  >
                    {SERVICE_CORRIDORS.map((cor) => (
                      <option key={cor} value={cor}>
                        {cor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                  />
                  <span className="text-[10px] font-mono text-cyan-400 block mt-1">
                    ≈ ₦{(newDealValueUsd * 1500).toLocaleString()} NGN
                  </span>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Assigned Officer
                  </label>
                  <input
                    type="text"
                    value={newOfficerName}
                    onChange={(e) => setNewOfficerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#080E20] border border-cyan-950 text-[11px] text-cyan-300">
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
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition disabled:opacity-60"
                >
                  {submitting ? 'Creating...' : 'Create Deal Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
