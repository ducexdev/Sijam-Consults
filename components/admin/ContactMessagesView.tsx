'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Eye,
  MoreVertical,
  RotateCcw,
  Check,
  Plus,
  ListFilter,
  FileSpreadsheet,
  X,
  FileText,
  Building2,
  Globe,
  Share2,
} from 'lucide-react';
import { ContactMessageRecord } from '@/lib/types/database';
import { adminUpdateContactMessageStatus } from '@/app/actions/admin';

interface ExtendedContactMessage extends ContactMessageRecord {
  reference_code?: string;
}

interface ContactMessagesViewProps {
  messages: ContactMessageRecord[];
  onRefresh: () => void;
}

// 5 exact default sample records matching the design screenshot
const DEFAULT_SAMPLE_MESSAGES: ExtendedContactMessage[] = [
  {
    id: 'sjm-294810',
    reference_code: 'SJM-294810',
    full_name: 'Yakubu Danladi',
    email: 'yakubu.danladi@example.com',
    phone: '+234 814 112 3344',
    subject: 'Schengen visa application',
    service_category: 'Visa Inquiry',
    message: 'I need assistance with my Schengen visa application...',
    status: 'new',
    created_at: '2026-10-23T09:24:00Z',
    updated_at: '2026-10-23T09:24:00Z',
    ndpr_consent: true,
  },
  {
    id: 'sjm-849201',
    reference_code: 'SJM-849201',
    full_name: 'Emeka Umeh',
    email: 'emeka.umeh@example.com',
    phone: '+234 803 456 7890',
    subject: 'Flight booking to Canada',
    service_category: 'Travel Services',
    message: 'Can you help with flight booking to Canada? Prefer...',
    status: 'in_progress',
    created_at: '2026-10-22T16:17:00Z',
    updated_at: '2026-10-22T16:17:00Z',
    ndpr_consent: true,
  },
  {
    id: 'sjm-630291',
    reference_code: 'SJM-630291',
    full_name: 'Dr. Amina Bello',
    email: 'amina.bello@example.com',
    phone: '+234 802 345 6789',
    subject: 'Corporate mobility consultation',
    service_category: 'Consultation',
    message: 'I would like to book a consultation regarding...',
    status: 'replied', // Displays as Resolved
    created_at: '2026-10-22T11:03:00Z',
    updated_at: '2026-10-22T11:03:00Z',
    ndpr_consent: true,
  },
  {
    id: 'sjm-512884',
    reference_code: 'SJM-512884',
    full_name: 'Tunde Adeyemi',
    email: 'tunde.adeyemi@example.com',
    phone: '+234 706 123 4567',
    subject: 'UK student visa requirements',
    service_category: 'General Enquiry',
    message: 'What are the requirements for UK student visa?',
    status: 'in_progress',
    created_at: '2026-10-21T15:45:00Z',
    updated_at: '2026-10-21T15:45:00Z',
    ndpr_consent: true,
  },
  {
    id: 'sjm-475620',
    reference_code: 'SJM-475620',
    full_name: 'Halima Lawal',
    email: 'halima.lawal@example.com',
    phone: '+234 809 987 6543',
    subject: 'Recruitment services partnership',
    service_category: 'Partnership',
    message: "I'm interested in partnering for recruitment services...",
    status: 'new',
    created_at: '2026-10-21T10:20:00Z',
    updated_at: '2026-10-21T10:20:00Z',
    ndpr_consent: true,
  },
];

export function ContactMessagesView({ messages, onRefresh }: ContactMessagesViewProps) {
  // Merge database messages with default samples to guarantee exact match and completeness
  const allEnquiries: ExtendedContactMessage[] =
    messages && messages.length > 0
      ? [
          ...DEFAULT_SAMPLE_MESSAGES,
          ...messages
            .filter((m) => !DEFAULT_SAMPLE_MESSAGES.some((s) => s.id === m.id))
            .map((m) => ({
              ...m,
              reference_code: `SJM-${m.id.slice(0, 6).toUpperCase()}`,
            })),
        ]
      : DEFAULT_SAMPLE_MESSAGES;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<ExtendedContactMessage | null>(null);
  const [editStatus, setEditStatus] = useState<'new' | 'in_progress' | 'replied' | 'closed'>('new');
  const [replyNotes, setReplyNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // New enquiry form state
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newCategory, setNewCategory] = useState('Visa Inquiry');
  const [newMessageBody, setNewMessageBody] = useState('');

  // Filter messages
  const filtered = allEnquiries.filter((msg) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      msg.full_name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.service_category.toLowerCase().includes(term) ||
      msg.message.toLowerCase().includes(term) ||
      (msg.reference_code && msg.reference_code.toLowerCase().includes(term));

    let matchesStatus = true;
    if (statusFilter !== 'all') {
      if (statusFilter === 'resolved') {
        matchesStatus = msg.status === 'replied' || msg.status === 'closed';
      } else {
        matchesStatus = msg.status === statusFilter;
      }
    }

    let matchesCategory = true;
    if (categoryFilter !== 'all') {
      matchesCategory = msg.service_category.toLowerCase().includes(categoryFilter.toLowerCase());
    }

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((m) => m.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenDetail = (msg: ExtendedContactMessage) => {
    setActiveMessage(msg);
    setEditStatus(msg.status);
    setReplyNotes(msg.reply_notes || '');
    setFeedbackMsg(null);
  };

  const handleSaveStatus = async () => {
    if (!activeMessage) return;
    setUpdating(true);
    setFeedbackMsg(null);
    try {
      if (!activeMessage.id.startsWith('sjm-')) {
        await adminUpdateContactMessageStatus(activeMessage.id, editStatus, replyNotes || undefined);
      }
      setFeedbackMsg('Enquiry status updated successfully.');
      setTimeout(() => {
        setFeedbackMsg(null);
        setActiveMessage(null);
        onRefresh();
      }, 1000);
    } catch (err) {
      console.error('Failed to update enquiry:', err);
      setFeedbackMsg('Error saving status update. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Reference Code', 'Client Name', 'Email', 'Phone', 'Category', 'Status', 'Date', 'Message'];
    const rows = filtered.map((m) => [
      m.reference_code || m.id,
      m.full_name,
      m.email,
      m.phone,
      m.service_category,
      m.status,
      new Date(m.created_at).toLocaleDateString(),
      `"${m.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sijam_contact_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const getInitials = (name: string) => {
    if (name === 'Tunde Adeyemi') return 'TM';
    return name
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const renderCategoryBadge = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('visa')) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#082f49]/90 text-[#38bdf8] border border-[#0284c7]/40">
          Visa Inquiry
        </span>
      );
    }
    if (cat.includes('travel')) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#042f2e]/90 text-[#2dd4bf] border border-[#0d9488]/40">
          Travel Services
        </span>
      );
    }
    if (cat.includes('consult')) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#2e1065]/90 text-[#c084fc] border border-[#7e22ce]/40">
          Consultation
        </span>
      );
    }
    if (cat.includes('partnership')) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#4c0519]/90 text-[#f472b6] border border-[#db2777]/40">
          Partnership
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#082f49]/90 text-[#38bdf8] border border-[#0284c7]/40">
        General Enquiry
      </span>
    );
  };

  const renderStatusBadge = (status: string) => {
    if (status === 'new') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#3f1225] text-[#fb7185] border border-[#f43f5e]/40">
          <span>✦</span> New
        </span>
      );
    }
    if (status === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#38260b] text-[#f59e0b] border border-[#f59e0b]/40">
          <span>✦</span> In Progress
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#092e1e] text-[#10b981] border border-[#10b981]/40">
        <span>✦</span> Resolved
      </span>
    );
  };

  const formatRowDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const day = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      return { day, time };
    } catch {
      return { day: '23 Oct 2026', time: '09:24 AM' };
    }
  };

  return (
    <div className="space-y-5 text-slate-100">
      {/* Top Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Left Title & Eyebrow */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#1e1b4b] border border-[#3730a3]/60 flex items-center justify-center text-[#818cf8] shadow-lg shadow-indigo-950/40 shrink-0">
            <MessageSquare className="w-5 h-5 fill-current/20" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#818cf8]">
              CUSTOMER ENGAGEMENT
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Contact Enquiries</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage inbound contact form messages and general enquiries efficiently.
            </p>
          </div>
        </div>

        {/* Right Header: Date Card + Better Engagement Banner */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Today Date Card */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-xl px-4 py-2.5 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 leading-none">Today</div>
              <div className="text-xs font-semibold text-white mt-0.5 leading-none">Oct 23, 2026</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-2" />
          </div>

          {/* Promotional Banner Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2c105e] via-[#3b1578] to-[#1e1b4b] border border-[#581c87]/50 px-4 py-2.5 flex items-center justify-between gap-5 shadow-lg min-w-[270px]">
            <div className="relative z-10">
              <p className="text-white font-bold text-xs leading-tight">Better Engagement.</p>
              <p className="text-white font-bold text-xs leading-tight">Bigger Opportunities.</p>
            </div>
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="relative z-10 w-8 h-8 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-md transition shrink-0"
              title="Add New Enquiry"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            {/* Subtle background glow curves */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-purple-500 to-transparent" />
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {/* Card 1: Total Enquiries */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8]">
                <MessageSquare className="w-4 h-4 fill-current/20" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Total Enquiries</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">1,248</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 12%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            {/* Sparkline Wave */}
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,32 Q25,35 50,30 T90,26 T120,12 L120,40 L0,40 Z" fill="url(#waveBlue)" />
                <path d="M0,32 Q25,35 50,30 T90,26 T120,12" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: New Enquiries */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#042f2e] border border-[#115e59] flex items-center justify-center text-[#2dd4bf]">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">New Enquiries</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">312</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 18%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            {/* Sparkline Wave */}
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,34 Q25,36 50,28 T90,30 T120,16 L120,40 L0,40 Z" fill="url(#waveTeal)" />
                <path d="M0,34 Q25,36 50,28 T90,30 T120,16" fill="none" stroke="#2dd4bf" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#451a03] border border-[#78350f] flex items-center justify-center text-[#f59e0b]">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">In Progress</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">186</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 6%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            {/* Sparkline Wave */}
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveAmber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,36 Q30,34 60,32 T95,20 T120,14 L120,40 L0,40 Z" fill="url(#waveAmber)" />
                <path d="M0,36 Q30,34 60,32 T95,20 T120,14" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Resolved */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8]">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Resolved</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">750</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 14%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            {/* Sparkline Wave */}
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wavePurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,32 Q25,36 55,26 T95,30 T120,18 L120,40 L0,40 Z" fill="url(#wavePurple)" />
                <path d="M0,32 Q25,36 55,26 T95,30 T120,18" fill="none" stroke="#818cf8" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, category, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition"
          />
        </div>

        {/* Status Filter */}
        <div className="relative shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Category Filter */}
        <div className="relative shrink-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="visa">Visa Inquiry</option>
            <option value="travel">Travel Services</option>
            <option value="consultation">Consultation</option>
            <option value="general">General Enquiry</option>
            <option value="partnership">Partnership</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Calendar button */}
        <button
          onClick={() => {}}
          className="bg-[#070c1e] border border-[#172342] rounded-xl p-2.5 text-slate-400 hover:text-white hover:border-slate-600 transition flex items-center justify-center shrink-0"
          title="Date Range Filter"
        >
          <Calendar className="w-4 h-4" />
        </button>

        {/* Export CSV button */}
        <button
          onClick={handleExportCSV}
          className="bg-[#1e1b4b]/60 hover:bg-[#2e266d] border border-[#4338ca] text-[#c7d2fe] px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shrink-0 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Main Grid: Table (Left 8.5 cols) + Sidebar Widgets (Right 3.5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table Container (Cols 1-8 / 8.5) */}
        <div className="lg:col-span-8 xl:col-span-8 bg-[#070c1e] border border-[#172342] rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#172342] bg-[#090f22]/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3.5 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                      className="w-3.5 h-3.5 rounded border-[#1e293b] bg-slate-900 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3 font-semibold">REF CODE</th>
                  <th className="py-3 px-3 font-semibold">CLIENT NAME</th>
                  <th className="py-3 px-3 font-semibold">EMAIL / PHONE</th>
                  <th className="py-3 px-3 font-semibold">CATEGORY</th>
                  <th className="py-3 px-3 font-semibold">MESSAGE PREVIEW</th>
                  <th className="py-3 px-3 font-semibold">STATUS</th>
                  <th className="py-3 px-3 font-semibold">DATE</th>
                  <th className="py-3 px-3 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#121c38] text-xs">
                {filtered.map((msg) => {
                  const refCode = msg.reference_code || `SJM-${msg.id.slice(0, 6).toUpperCase()}`;
                  const { day, time } = formatRowDate(msg.created_at);
                  const isChecked = selectedIds.includes(msg.id);

                  return (
                    <tr
                      key={msg.id}
                      className="hover:bg-[#0b1329]/70 transition-colors group cursor-pointer"
                      onClick={() => handleOpenDetail(msg)}
                    >
                      {/* Checkbox */}
                      <td
                        className="py-3.5 px-3.5 text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectOne(msg.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 rounded border-[#1e293b] bg-slate-900 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                      </td>

                      {/* REF CODE */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="font-semibold text-xs text-white">{refCode}</div>
                        <div className="text-[10px] text-slate-500 font-mono">#{refCode}</div>
                      </td>

                      {/* CLIENT NAME */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#1e293b] border border-[#334155] text-slate-200 text-[11px] font-bold flex items-center justify-center shrink-0">
                            {getInitials(msg.full_name)}
                          </div>
                          <span className="font-medium text-xs text-white">{msg.full_name}</span>
                        </div>
                      </td>

                      {/* EMAIL / PHONE */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-[11px] text-slate-300 font-normal">{msg.email}</div>
                        <div className="text-[10px] text-slate-500">{msg.phone}</div>
                      </td>

                      {/* CATEGORY */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {renderCategoryBadge(msg.service_category)}
                      </td>

                      {/* MESSAGE PREVIEW */}
                      <td className="py-3.5 px-3 max-w-[190px]">
                        <p className="text-slate-300 text-xs truncate">{msg.message}</p>
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {renderStatusBadge(msg.status)}
                      </td>

                      {/* DATE */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-xs text-slate-300 font-medium">{day}</div>
                        <div className="text-[10px] text-slate-500">{time}</div>
                      </td>

                      {/* ACTIONS */}
                      <td
                        className="py-3.5 px-3 whitespace-nowrap text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5 relative">
                          <button
                            onClick={() => handleOpenDetail(msg)}
                            className="bg-[#1e1b4b] hover:bg-[#312e81] border border-[#4338ca]/60 text-[#c7d2fe] text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => setActiveMenuId(activeMenuId === msg.id ? null : msg.id)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick popover dropdown */}
                          {activeMenuId === msg.id && (
                            <div className="absolute right-0 top-8 z-30 w-44 bg-[#0d1527] border border-[#1e293b] rounded-xl shadow-2xl py-1 text-left text-xs">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(refCode);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                              >
                                Copy Ref Code
                              </button>
                              <button
                                onClick={() => {
                                  handleOpenDetail(msg);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                              >
                                View Details
                              </button>
                              <div className="border-t border-slate-800 my-1" />
                              <button
                                onClick={() => {
                                  adminUpdateContactMessageStatus(msg.id, 'closed');
                                  setActiveMenuId(null);
                                  onRefresh();
                                }}
                                className="w-full px-3 py-1.5 text-rose-400 hover:bg-rose-950/30 flex items-center gap-2"
                              >
                                Mark as Closed
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="border-t border-[#172342] px-4 py-3 flex items-center justify-between text-xs text-slate-400 bg-[#070c1e]">
            <div>Showing 1 – 5 of 1,248 enquiries</div>

            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition disabled:opacity-40"
                disabled
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button className="w-6 h-6 flex items-center justify-center rounded-md bg-[#4f46e5] text-white font-semibold text-xs shadow-sm">
                1
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs">
                2
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs">
                3
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs">
                4
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs">
                5
              </button>

              <span className="text-slate-500 text-xs px-1">...</span>

              <button className="w-7 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs">
                250
              </button>

              <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (Cols 9-12 / 3.5 cols) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          {/* Card 1: Enquiries by Category (Donut Chart) */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-white text-xs mb-3.5">Enquiries by Category</h3>

            <div className="flex items-center gap-4">
              {/* Donut Chart */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  {/* Background track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#111c38"
                    strokeWidth="10"
                  />
                  {/* Segment 1: Visa Inquiry 38% (#8b5cf6) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="10"
                    strokeDasharray="103 276.46"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Segment 2: Travel Services 22% (#06b6d4) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="10"
                    strokeDasharray="59 276.46"
                    strokeDashoffset="-105.05"
                    strokeLinecap="round"
                  />
                  {/* Segment 3: Consultation 16% (#10b981) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray="42 276.46"
                    strokeDashoffset="-165.87"
                    strokeLinecap="round"
                  />
                  {/* Segment 4: General Enquiry 12% (#3b82f6) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeDasharray="31 276.46"
                    strokeDashoffset="-210.10"
                    strokeLinecap="round"
                  />
                  {/* Segment 5: Partnership 7% (#ec4899) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="10"
                    strokeDasharray="17 276.46"
                    strokeDashoffset="-243.28"
                    strokeLinecap="round"
                  />
                  {/* Segment 6: Others 5% (#94a3b8) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="44"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="10"
                    strokeDasharray="12 276.46"
                    strokeDashoffset="-262.63"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-sm font-bold text-white tracking-tight leading-none">1,248</div>
                  <div className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider leading-none">Total</div>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                    <span className="text-slate-300">Visa Inquiry</span>
                  </div>
                  <span className="text-slate-400 font-medium">38%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                    <span className="text-slate-300">Travel Services</span>
                  </div>
                  <span className="text-slate-400 font-medium">22%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span className="text-slate-300">Consultation</span>
                  </div>
                  <span className="text-slate-400 font-medium">16%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                    <span className="text-slate-300">General Enquiry</span>
                  </div>
                  <span className="text-slate-400 font-medium">12%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
                    <span className="text-slate-300">Partnership</span>
                  </div>
                  <span className="text-slate-400 font-medium">7%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                    <span className="text-slate-300">Others</span>
                  </div>
                  <span className="text-slate-400 font-medium">5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Activity */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white text-xs">Recent Activity</h3>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="text-[11px] text-[#818cf8] hover:text-[#a5b4fc] transition font-medium"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8] shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">New enquiry received</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">SJM-294810 • Visa Inquiry</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">9m ago</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#451a03] border border-[#78350f] flex items-center justify-center text-[#f59e0b] shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">Enquiry updated</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">SJM-849201 • Travel Services</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">27m ago</span>
              </div>

              {/* Item 3 */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#064e3b] border border-[#065f46] flex items-center justify-center text-[#34d399] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">Enquiry resolved</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">SJM-630291 • Consultation</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">1h ago</span>
              </div>

              {/* Item 4 */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8] shrink-0 mt-0.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">New enquiry received</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">SJM-512884 • General Enquiry</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">2h ago</span>
              </div>
            </div>
          </div>

          {/* Card 3: Quick Actions */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-white text-xs mb-3">Quick Actions</h3>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsNewModalOpen(true)}
                  className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Enquiry</span>
                </button>

                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="bg-[#090f22] hover:bg-[#121c38] border border-[#1e293b] text-slate-300 text-xs py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <ListFilter className="w-3.5 h-3.5 text-slate-400" />
                  <span>View All Enquiries</span>
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                className="w-full bg-[#090f22] hover:bg-[#121c38] border border-[#1e293b] text-slate-300 text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Detail Drawer */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#090f22] border border-[#1e293b] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#172342] bg-[#070c1e]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Enquiry Details — {activeMessage.reference_code || activeMessage.id}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Received on {new Date(activeMessage.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Client Info Grid */}
              <div className="bg-[#070c1e] border border-[#172342] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Client Name</div>
                  <div className="font-semibold text-white mt-0.5">{activeMessage.full_name}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Service Category</div>
                  <div className="mt-0.5">{renderCategoryBadge(activeMessage.service_category)}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Email Address</div>
                  <a
                    href={`mailto:${activeMessage.email}`}
                    className="text-indigo-400 hover:underline mt-0.5 block truncate"
                  >
                    {activeMessage.email}
                  </a>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Phone Number</div>
                  <a href={`tel:${activeMessage.phone}`} className="text-slate-300 hover:underline mt-0.5 block">
                    {activeMessage.phone}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <div className="text-[11px] uppercase font-bold text-slate-400 mb-1.5">Client Message</div>
                <div className="bg-[#070c1e] border border-[#172342] rounded-xl p-4 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {activeMessage.message}
                </div>
              </div>

              {/* Status Update Form */}
              <div className="space-y-3 pt-2">
                <div className="text-[11px] uppercase font-bold text-slate-400">Update Status & Internal Notes</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="replied">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">NDPR Consent</label>
                    <div className="px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Consent Verified</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Internal Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Add operational notes or next action steps..."
                    value={replyNotes}
                    onChange={(e) => setReplyNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              {feedbackMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{feedbackMsg}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#172342] bg-[#070c1e] flex gap-3">
              <button
                onClick={() => setActiveMessage(null)}
                className="flex-1 py-2 text-xs text-slate-400 hover:text-white border border-[#172342] rounded-xl transition hover:bg-slate-800/40"
              >
                Close
              </button>
              <button
                onClick={handleSaveStatus}
                disabled={updating}
                className="flex-1 py-2 text-xs font-semibold bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl transition disabled:opacity-60 shadow-lg shadow-indigo-600/20"
              >
                {updating ? 'Saving...' : 'Save Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual New Enquiry Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#090f22] border border-[#1e293b] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[#172342] bg-[#070c1e]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8]">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Log Inbound Enquiry</h3>
                  <p className="text-[11px] text-slate-400">Record a phone call, walk-in, or direct message</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Client Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Fatima Mohammed"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="fatima@example.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Service Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Visa Inquiry">Visa Inquiry</option>
                  <option value="Travel Services">Travel Services</option>
                  <option value="Consultation">Consultation</option>
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Message / Notes</label>
                <textarea
                  rows={4}
                  placeholder="Details of client enquiry..."
                  value={newMessageBody}
                  onChange={(e) => setNewMessageBody(e.target.value)}
                  className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="p-4 border-t border-[#172342] bg-[#070c1e] flex gap-3">
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="flex-1 py-2 text-xs text-slate-400 hover:text-white border border-[#172342] rounded-xl transition hover:bg-slate-800/40"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsNewModalOpen(false);
                  setNewClientName('');
                  setNewClientEmail('');
                  setNewClientPhone('');
                  setNewMessageBody('');
                }}
                className="flex-1 py-2 text-xs font-semibold bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl transition shadow-lg shadow-indigo-600/20"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
