'use client';

import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Calendar,
  Eye,
  Check,
  X,
  FileText,
  User,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Zap,
  Flame,
  ArrowUpRight,
  Send,
  UserCheck,
  Building2,
  CalendarCheck,
  Smartphone,
} from 'lucide-react';
import {
  ConsultationRequestRecord,
  ContactMessageRecord,
  ProfileRecord,
} from '@/lib/types/database';
import {
  adminUpdateConsultationStatus,
  adminAssignConsultation,
} from '@/app/actions/consultations';
import { adminUpdateContactMessageStatus } from '@/app/actions/admin';
import { ClientDossierDrawer, DossierClient } from './ClientDossierDrawer';
import { WhatsAppNotificationModal, WhatsAppClientInfo } from './WhatsAppNotificationModal';

// ─── Unified Lead Model ───────────────────────────────────────────────────────

export type LeadType = 'consultation' | 'contact_enquiry';

export interface UnifiedLead {
  id: string;
  referenceCode: string;
  type: LeadType;
  fullName: string;
  email: string;
  phone: string;
  serviceOrCategory: string;
  targetDestination?: string;
  subjectOrObjective: string;
  fullMessage?: string;
  preferredMethod?: string;
  status: 'new' | 'in_progress' | 'scheduled' | 'replied' | 'closed';
  createdAt: string;
  assignedTo?: string | null;
  notes?: string | null;
  source: string;
  rawConsultation?: ConsultationRequestRecord;
  rawMessage?: ContactMessageRecord;
}

interface UnifiedLeadsViewProps {
  consultations: ConsultationRequestRecord[];
  messages: ContactMessageRecord[];
  staffList: ProfileRecord[];
  initialSegment?: 'all' | 'consultations' | 'enquiries' | 'at_risk';
  onRefresh: () => void;
}

// ─── Helper: SLA Calculation ──────────────────────────────────────────────────

interface SlaStatus {
  elapsedMinutes: number;
  label: string;
  badgeClass: string;
  level: 'prime' | 'warning' | 'breached' | 'completed';
}

function calculateSla(createdAtStr: string, status: string): SlaStatus {
  if (status === 'scheduled' || status === 'replied' || status === 'closed') {
    return {
      elapsedMinutes: 0,
      label: '✓ Contacted',
      badgeClass: 'bg-emerald-950/70 border-emerald-800 text-emerald-400',
      level: 'completed',
    };
  }

  const createdTime = new Date(createdAtStr).getTime();
  const now = Date.now();
  const diffMinutes = Math.max(1, Math.floor((now - createdTime) / (1000 * 60)));

  if (diffMinutes < 15) {
    return {
      elapsedMinutes: diffMinutes,
      label: `< 15m (${diffMinutes}m) • Golden Window`,
      badgeClass: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 animate-pulse',
      level: 'prime',
    };
  }

  if (diffMinutes <= 60) {
    return {
      elapsedMinutes: diffMinutes,
      label: `< 1h (${diffMinutes}m) • At Risk`,
      badgeClass: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
      level: 'warning',
    };
  }

  const hours = Math.floor(diffMinutes / 60);
  const remMinutes = diffMinutes % 60;
  return {
    elapsedMinutes: diffMinutes,
    label: `Breached (${hours}h ${remMinutes}m) • SLA Escalation`,
    badgeClass: 'bg-rose-950/90 border-rose-500/50 text-rose-300 font-bold',
    level: 'breached',
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function UnifiedLeadsView({
  consultations,
  messages,
  staffList,
  initialSegment = 'all',
  onRefresh,
}: UnifiedLeadsViewProps) {
  // ── Normalize Leads Stream ──
  const unifiedList = useMemo<UnifiedLead[]>(() => {
    const list: UnifiedLead[] = [];

    // Map Consultation Requests
    (consultations || []).forEach((c) => {
      list.push({
        id: `consultation-${c.id}`,
        referenceCode: c.reference_code || `SJM-${c.id.slice(0, 6).toUpperCase()}`,
        type: 'consultation',
        fullName: c.full_name,
        email: c.email,
        phone: c.phone,
        serviceOrCategory: c.service_slug || 'General Consultation',
        targetDestination: c.target_destination || undefined,
        subjectOrObjective: c.applicant_objective || 'Consular Advisory Consultation',
        preferredMethod: c.preferred_method,
        status: (c.status as any) || 'new',
        createdAt: c.created_at,
        assignedTo: c.assigned_to,
        notes: c.notes,
        source: c.submission_source || 'Website Intake Wizard',
        rawConsultation: c,
      });
    });

    // Map Contact Messages
    (messages || []).forEach((m) => {
      list.push({
        id: `message-${m.id}`,
        referenceCode: `ENQ-${m.id.slice(0, 6).toUpperCase()}`,
        type: 'contact_enquiry',
        fullName: m.full_name,
        email: m.email,
        phone: m.phone,
        serviceOrCategory: m.service_category || 'General Enquiry',
        subjectOrObjective: m.subject || 'Direct Contact Form',
        fullMessage: m.message,
        status: (m.status as any) || 'new',
        createdAt: m.created_at,
        assignedTo: m.assigned_to,
        notes: m.reply_notes,
        source: 'Public Contact Page',
        rawMessage: m,
      });
    });

    // Sort by most recent first
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [consultations, messages]);

  // ── State ──
  const [activeSegment, setActiveSegment] = useState<'all' | 'consultations' | 'enquiries' | 'at_risk'>(initialSegment);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<UnifiedLead | null>(null);
  const [whatsAppModalLead, setWhatsAppModalLead] = useState<WhatsAppClientInfo | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // ── Metrics Strip ──
  const metrics = useMemo(() => {
    let prime = 0;
    let warning = 0;
    let breached = 0;
    let completed = 0;

    unifiedList.forEach((lead) => {
      const sla = calculateSla(lead.createdAt, lead.status);
      if (sla.level === 'prime') prime++;
      else if (sla.level === 'warning') warning++;
      else if (sla.level === 'breached') breached++;
      else if (sla.level === 'completed') completed++;
    });

    return {
      total: unifiedList.length,
      prime,
      warning,
      breached,
      completed,
      pendingCount: prime + warning + breached,
    };
  }, [unifiedList]);

  // ── Filtered Leads ──
  const filteredLeads = useMemo(() => {
    return unifiedList.filter((lead) => {
      if (activeSegment === 'consultations' && lead.type !== 'consultation') return false;
      if (activeSegment === 'enquiries' && lead.type !== 'contact_enquiry') return false;
      if (activeSegment === 'at_risk') {
        const sla = calculateSla(lead.createdAt, lead.status);
        if (sla.level !== 'warning' && sla.level !== 'breached') return false;
      }

      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;

      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        return (
          lead.fullName.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.toLowerCase().includes(query) ||
          lead.referenceCode.toLowerCase().includes(query) ||
          lead.subjectOrObjective.toLowerCase().includes(query) ||
          (lead.targetDestination || '').toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [unifiedList, activeSegment, statusFilter, searchTerm]);

  // ── Dossier Conversion ──
  const selectedDossierClient = useMemo<DossierClient | null>(() => {
    if (!selectedLead) return null;
    const assignedStaff = staffList.find((s) => s.id === selectedLead.assignedTo);
    return {
      id: selectedLead.id,
      referenceCode: selectedLead.referenceCode,
      fullName: selectedLead.fullName,
      email: selectedLead.email,
      phone: selectedLead.phone,
      targetCorridor: selectedLead.targetDestination || selectedLead.serviceOrCategory,
      serviceCategory: selectedLead.serviceOrCategory,
      leadIntentScore: selectedLead.type === 'consultation' ? 96 : 82,
      estimatedLtvUsd: selectedLead.type === 'consultation' ? 3500 : 1800,
      status: selectedLead.status,
      createdAt: selectedLead.createdAt,
      assignedOfficerName: assignedStaff?.full_name || 'James Samson',
      consultationFeePaid: selectedLead.status === 'scheduled',
      retainerStage: selectedLead.status === 'scheduled' ? 'Consultation Paid' : 'Initial Assessment',
      notes: selectedLead.notes || undefined,
    };
  }, [selectedLead, staffList]);

  // ── Handlers ──
  const handleStatusChange = async (lead: UnifiedLead, newStatus: any) => {
    setActionLoading(true);
    setFeedbackMsg(null);
    try {
      if (lead.type === 'consultation' && lead.rawConsultation) {
        await adminUpdateConsultationStatus(lead.rawConsultation.id, newStatus);
      } else if (lead.type === 'contact_enquiry' && lead.rawMessage) {
        await adminUpdateContactMessageStatus(lead.rawMessage.id, newStatus);
      }
      setFeedbackMsg(`Lead ${lead.referenceCode} updated to ${newStatus}.`);
      onRefresh();
      if (selectedLead && selectedLead.id === lead.id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update lead status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignStaff = async (lead: UnifiedLead, staffId: string) => {
    if (lead.type !== 'consultation' || !lead.rawConsultation) return;
    setActionLoading(true);
    try {
      await adminAssignConsultation(lead.rawConsultation.id, staffId);
      setFeedbackMsg(`Assigned to case officer.`);
      onRefresh();
      if (selectedLead && selectedLead.id === lead.id) {
        setSelectedLead({ ...selectedLead, assignedTo: staffId });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to assign staff.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleQuickAction = async (
    lead: UnifiedLead,
    action: 'assign' | 'mark_contacted' | 'schedule_interview'
  ) => {
    setActionLoading(true);
    try {
      if (action === 'assign') {
        const defaultOfficer = staffList[0]?.id;
        if (defaultOfficer) {
          await handleAssignStaff(lead, defaultOfficer);
        } else {
          setFeedbackMsg('No staff officer available for automatic assignment.');
        }
      } else if (action === 'mark_contacted') {
        await handleStatusChange(lead, 'in_progress');
        setFeedbackMsg(`✓ Marked ${lead.fullName} as Contacted (In Progress).`);
      } else if (action === 'schedule_interview') {
        await handleStatusChange(lead, 'scheduled');
        openWhatsAppModal(lead);
        setFeedbackMsg(`✓ Interview scheduled for ${lead.fullName}. WhatsApp invitation opened.`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to execute quick action.');
    } finally {
      setActionLoading(false);
    }
  };

  const openWhatsAppModal = (lead: UnifiedLead) => {
    setWhatsAppModalLead({
      fullName: lead.fullName,
      phone: lead.phone,
      referenceCode: lead.referenceCode,
      serviceOrCorridor: lead.targetDestination || lead.serviceOrCategory,
      officerName: staffList.find((s) => s.id === lead.assignedTo)?.full_name || 'James Samson',
      consultationFee: lead.status === 'scheduled' ? '₦50,000 (Verified)' : '₦50,000',
    });
  };

  const handleExportCsv = () => {
    const headers = [
      'Reference Code',
      'Lead Type',
      'Full Name',
      'Email',
      'Phone',
      'Service/Category',
      'Target Destination',
      'Status',
      'Elapsed Minutes',
      'Created Date',
    ];

    const rows = filteredLeads.map((l) => [
      l.referenceCode,
      l.type,
      `"${l.fullName.replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.serviceOrCategory}"`,
      `"${l.targetDestination || ''}"`,
      l.status,
      calculateSla(l.createdAt, l.status).elapsedMinutes,
      l.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sijam-leads-triage-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* ── Top Bar & Executive Context ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Client Acquisition Engine • Speed-to-Lead Triage Desk
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Inbound Leads &amp; Triage Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#121B2B] hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Managing Director Escalation Alert (Loss Aversion Trigger) ── */}
      {metrics.breached > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 via-[#1F0A12] to-rose-950/80 border border-rose-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-rose-950/40 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-600/60 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-heading font-black text-white text-xs uppercase tracking-wider block">
                Managing Director Escalation — {metrics.breached} Files Breached (&gt; 60 Mins)
              </span>
              <span className="text-rose-200/80 text-[11px] mt-0.5 block leading-relaxed">
                Conversion probability drops by 391% past the golden window. Immediate WhatsApp outreach or case officer re-assignment required.
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveSegment('at_risk')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 shadow-lg transition self-start sm:self-auto"
          >
            Triage Breached Leads Now →
          </button>
        </div>
      )}

      {/* ── Executive SLA Metric Strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Prime Window */}
        <div className="p-4 rounded-2xl bg-[#08151D] border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold block">
              Prime SLA (&lt; 15 min)
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {metrics.prime}
            </span>
            <span className="text-[10px] text-emerald-500/80">391% higher conversion</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Warning SLA */}
        <div className="p-4 rounded-2xl bg-[#1A150D] border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block">
              Warning SLA (15–60m)
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {metrics.warning}
            </span>
            <span className="text-[10px] text-amber-500/80">Action recommended</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800/80 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Breached SLA */}
        <div className="p-4 rounded-2xl bg-[#1D0D12] border border-rose-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-bold block">
              SLA Breached (&gt; 1h)
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {metrics.breached}
            </span>
            <span className="text-[10px] text-rose-500/80">Escalated to MD</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800/80 flex items-center justify-center text-rose-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        {/* Contacted / Active */}
        <div className="p-4 rounded-2xl bg-[#121B2B] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-bold block">
              Contacted / Active
            </span>
            <span className="text-2xl font-black text-white mt-1 block">
              {metrics.completed}
            </span>
            <span className="text-[10px] text-slate-400">In triage pipeline</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800/80 flex items-center justify-center text-purple-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ── Segment Selector & Filters ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Segment Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0D1420] p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSegment('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeSegment === 'all'
                ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Inbound ({unifiedList.length})
          </button>
          <button
            onClick={() => setActiveSegment('consultations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSegment === 'consultations'
                ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🎯 Consultations</span>
            <span className="text-[10px] font-mono bg-purple-950 px-1.5 rounded-full text-purple-300">
              {consultations.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSegment('enquiries')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSegment === 'enquiries'
                ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>✉️ Contact Inquiries</span>
            <span className="text-[10px] font-mono bg-purple-950 px-1.5 rounded-full text-purple-300">
              {messages.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSegment('at_risk')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeSegment === 'at_risk'
                ? 'bg-rose-950 text-rose-200 border border-rose-800'
                : 'text-rose-400/80 hover:text-rose-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Overdue SLA ({metrics.warning + metrics.breached})</span>
          </button>
        </div>

        {/* Search & Status */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads, phone, email..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New (Uncontacted)</option>
            <option value="in_progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {feedbackMsg}
        </div>
      )}

      {/* ── Leads Table ── */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Lead &amp; Contact</th>
                <th className="p-4">Type &amp; Service</th>
                <th className="p-4">Speed-to-Lead SLA</th>
                <th className="p-4">Case Officer</th>
                <th className="p-4">Status</th>
                <th className="p-4">Quick Action</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const sla = calculateSla(lead.createdAt, lead.status);
                  const assignedStaffMember = staffList.find((s) => s.id === lead.assignedTo);
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, '');

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/40 transition cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Name & Contact */}
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                          {lead.fullName}
                          <span className="text-[10px] font-mono text-slate-500">
                            {lead.referenceCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                          <span className="truncate max-w-[180px]">{lead.email}</span>
                          <span className="text-slate-600">•</span>
                          <span className="font-mono text-purple-300">{lead.phone}</span>
                        </div>
                      </td>

                      {/* Type & Service */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          {lead.type === 'consultation' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-950 text-purple-300 border border-purple-800">
                              🎯 Consultation
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                              ✉️ Enquiry
                            </span>
                          )}
                          <span className="text-slate-300 font-medium">
                            {lead.serviceOrCategory}
                          </span>
                        </div>
                        {lead.targetDestination && (
                          <div className="text-[10px] text-slate-400 mt-1 font-mono">
                            Destination: {lead.targetDestination}
                          </div>
                        )}
                      </td>

                      {/* SLA Visual Countdown */}
                      <td className="p-4 font-mono">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${sla.badgeClass}`}
                        >
                          {sla.level === 'prime' && <Zap className="w-3 h-3 text-emerald-400" />}
                          {sla.level === 'warning' && <Clock className="w-3 h-3 text-amber-400" />}
                          {sla.level === 'breached' && <Flame className="w-3 h-3 text-rose-400" />}
                          {sla.label}
                        </span>
                      </td>

                      {/* Assigned Case Officer */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        {lead.type === 'consultation' ? (
                          <select
                            value={lead.assignedTo || ''}
                            onChange={(e) => handleAssignStaff(lead, e.target.value)}
                            disabled={actionLoading}
                            className="px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-[11px] text-slate-300 focus:outline-none focus:border-purple-500"
                          >
                            <option value="">Unassigned</option>
                            {staffList.map((st) => (
                              <option key={st.id} value={st.id}>
                                {st.full_name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            {assignedStaffMember ? assignedStaffMember.full_name : 'General Triage'}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead, e.target.value)}
                          disabled={actionLoading}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Quick Action Dropdown */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            const val = e.target.value as 'assign' | 'mark_contacted' | 'schedule_interview';
                            if (val) {
                              handleQuickAction(lead, val);
                              e.target.value = '';
                            }
                          }}
                          disabled={actionLoading}
                          className="px-2.5 py-1 bg-purple-950/40 hover:bg-purple-900/40 border border-purple-700/60 rounded-lg text-[11px] text-purple-200 font-semibold focus:outline-none focus:border-purple-400 cursor-pointer"
                        >
                          <option value="" disabled>⚡ Quick Action...</option>
                          <option value="assign">Assign to Case Officer</option>
                          <option value="mark_contacted">Mark Contacted</option>
                          <option value="schedule_interview">Schedule Interview</option>
                        </select>
                      </td>

                      {/* Direct Actions */}
                      <td className="p-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        {/* WhatsApp Cloud Dispatch */}
                        <button
                          onClick={() => openWhatsAppModal(lead)}
                          className="inline-flex p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition"
                          title="Dispatch WhatsApp Notification"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        {/* Direct Call */}
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        {/* Open 360° Dossier Drawer */}
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="inline-flex p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-300 transition"
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
        client={selectedDossierClient}
        isOpen={Boolean(selectedDossierClient)}
        onClose={() => setSelectedLead(null)}
      />

      {/* ── WhatsApp Cloud Dispatch Modal ── */}
      {whatsAppModalLead && (
        <WhatsAppNotificationModal
          client={whatsAppModalLead}
          isOpen={Boolean(whatsAppModalLead)}
          onClose={() => setWhatsAppModalLead(null)}
        />
      )}
    </div>
  );
}
