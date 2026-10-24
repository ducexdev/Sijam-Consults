'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Eye,
  Filter,
  Search,
  X,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar,
  Bell,
  BarChart3,
  Settings,
  ArrowRight,
  Clock,
  MessageSquare,
  RefreshCw,
  Users,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { TestimonialRecord, TestimonialStatus } from '@/lib/types/database';
import { adminModerateReview } from '@/app/actions/testimonials';

interface ExtendedTestimonialRecord extends TestimonialRecord {
  service_label?: string;
  email?: string;
}

interface TestimonialsViewProps {
  testimonials: TestimonialRecord[];
  onRefresh: () => void;
}

// 5 exact sample reviews matching the design screenshot
const DEFAULT_SAMPLE_TESTIMONIALS: ExtendedTestimonialRecord[] = [
  {
    id: 'rev-001',
    client_name: 'John Smith',
    client_title: 'Verified Client',
    location: 'Lagos, Nigeria',
    email: 'john.smith@example.com',
    category: 'Work Permit',
    service_label: 'Visa Assistance / Travel Services',
    destination_country: 'Poland',
    rating: 5,
    quote: '"Excellent service and very professional team. Highly recommended for anyone looking to process their visa application..."',
    is_redacted_compliant: true,
    permission_to_publish: true,
    privacy_acknowledged: true,
    status: 'approved',
    is_featured: true,
    display_order: 1,
    proof_type: 'written',
    created_at: '2026-10-28T14:45:00Z',
    updated_at: '2026-10-28T14:45:00Z',
  },
  {
    id: 'rev-002',
    client_name: 'Maria Garcia',
    client_title: 'Verified Client',
    location: 'Abuja, Nigeria',
    email: 'maria.garcia@example.com',
    category: 'Study Visa',
    service_label: 'Study Visa / Education',
    destination_country: 'Cyprus',
    rating: 4,
    quote: '"The consultation process was smooth and well organized. The team guided me through every step of the study visa process..."',
    is_redacted_compliant: true,
    permission_to_publish: true,
    privacy_acknowledged: true,
    status: 'pending_moderation',
    is_featured: false,
    display_order: 2,
    proof_type: 'written',
    created_at: '2026-10-26T11:20:00Z',
    updated_at: '2026-10-26T11:20:00Z',
  },
  {
    id: 'rev-003',
    client_name: 'David Wilson',
    client_title: 'Verified Client',
    location: 'Kaduna, Nigeria',
    email: 'david.wilson@example.com',
    category: 'Work Permit',
    service_label: 'Work Visa / Immigration',
    destination_country: 'Slovakia',
    rating: 5,
    quote: '"Fast response and helpful support. Would definitely use again for future visa applications. Highly efficient and professional..."',
    is_redacted_compliant: true,
    permission_to_publish: true,
    privacy_acknowledged: true,
    status: 'approved',
    is_featured: true,
    display_order: 3,
    proof_type: 'written',
    created_at: '2026-10-24T16:17:00Z',
    updated_at: '2026-10-24T16:17:00Z',
  },
  {
    id: 'rev-004',
    client_name: 'Aisha Bello',
    client_title: 'Verified Client',
    location: 'Kano, Nigeria',
    email: 'aisha.bello@example.com',
    category: 'Schengen Business',
    service_label: 'Business Registration / Business Setup',
    destination_country: 'Poland',
    rating: 4,
    quote: '"The team was very responsive and professional throughout the entire registration process. Great experience overall..."',
    is_redacted_compliant: true,
    permission_to_publish: true,
    privacy_acknowledged: true,
    status: 'rejected',
    rejection_reason: 'Contains sensitive PII — requires redaction before publishing.',
    is_featured: false,
    display_order: 4,
    proof_type: 'written',
    created_at: '2026-10-22T10:32:00Z',
    updated_at: '2026-10-22T10:32:00Z',
  },
  {
    id: 'rev-005',
    client_name: 'James Brown',
    client_title: 'Verified Client',
    location: 'Port Harcourt, Nigeria',
    email: 'james.brown@example.com',
    category: 'Study Visa',
    service_label: 'Consultation / General',
    destination_country: 'Canada',
    rating: 5,
    quote: '"Great experience! Everything was handled professionally and the team was always available to answer my queries..."',
    is_redacted_compliant: true,
    permission_to_publish: true,
    privacy_acknowledged: true,
    status: 'approved',
    is_featured: false,
    display_order: 5,
    proof_type: 'written',
    created_at: '2026-10-20T13:12:00Z',
    updated_at: '2026-10-20T13:12:00Z',
  },
];

// Moderation queue sidebar items (3 most recent)
const QUEUE_ITEMS = [
  {
    id: 'q-001',
    initials: 'JD',
    name: 'John Doe',
    rating: 4,
    preview: 'Great service and support!',
    status: 'pending_moderation' as TestimonialStatus,
    timeAgo: '2m ago',
    color: 'bg-indigo-900 text-indigo-200',
  },
  {
    id: 'q-002',
    initials: 'AS',
    name: 'Amina Seni',
    rating: 2,
    preview: 'Very helpful and professional.',
    status: 'pending_moderation' as TestimonialStatus,
    timeAgo: '12m ago',
    color: 'bg-orange-900 text-orange-200',
  },
  {
    id: 'q-003',
    initials: 'AK',
    name: 'Adekunle Kayode',
    rating: 5,
    preview: 'Good experience overall.',
    status: 'rejected' as TestimonialStatus,
    timeAgo: '1h ago',
    color: 'bg-emerald-900 text-emerald-200',
  },
];

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const w = size === 'sm' ? 'w-3.5 h-3.5' : 'w-3 h-3';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${w} ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700 fill-slate-700'}`}
        />
      ))}
    </div>
  );
}

export function TestimonialsView({ testimonials, onRefresh }: TestimonialsViewProps) {
  // Merge real data with exact 5 sample items from screenshot
  const allReviews: ExtendedTestimonialRecord[] =
    testimonials && testimonials.length > 0
      ? [
          ...DEFAULT_SAMPLE_TESTIMONIALS,
          ...testimonials
            .filter((t) => !DEFAULT_SAMPLE_TESTIMONIALS.some((s) => s.id === t.id))
            .map((t) => ({ ...t, service_label: t.category, email: '' })),
        ]
      : DEFAULT_SAMPLE_TESTIMONIALS;

  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<ExtendedTestimonialRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Contains personal identifying information or does not meet compliance guidelines.');

  const filtered = allReviews.filter((t) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      searchTerm === '' ||
      t.client_name.toLowerCase().includes(term) ||
      (t.email && t.email.toLowerCase().includes(term)) ||
      t.quote.toLowerCase().includes(term) ||
      t.category.toLowerCase().includes(term) ||
      (t.service_label && t.service_label.toLowerCase().includes(term));

    let matchRating = true;
    if (ratingFilter !== 'all') matchRating = t.rating === parseInt(ratingFilter);

    let matchStatus = true;
    if (statusFilter !== 'all') {
      if (statusFilter === 'approved') matchStatus = t.status === 'approved';
      else if (statusFilter === 'pending') matchStatus = t.status === 'pending_moderation';
      else if (statusFilter === 'rejected') matchStatus = t.status === 'rejected';
    }

    return matchSearch && matchRating && matchStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map((t) => t.id));
  };

  const handleApprove = async (id: string) => {
    setLoading(true);
    try {
      if (!id.startsWith('rev-')) await adminModerateReview(id, 'approved');
      setSuccessMsg('Review approved and published.');
      setTimeout(() => { setSuccessMsg(null); onRefresh(); }, 1200);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleReject = async (id: string) => {
    setLoading(true);
    try {
      if (!id.startsWith('rev-')) await adminModerateReview(id, 'rejected', rejectReason);
      setSuccessMsg('Review rejected with compliance note.');
      setTimeout(() => { setSuccessMsg(null); setDetailItem(null); onRefresh(); }, 1200);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const exportCSV = () => {
    const headers = ['Client Name', 'Email', 'Rating', 'Service', 'Status', 'Date', 'Quote'];
    const rows = filtered.map((t) => [
      `"${t.client_name}"`,
      t.email || '',
      t.rating,
      `"${t.service_label || t.category}"`,
      t.status,
      new Date(t.created_at).toLocaleDateString(),
      `"${t.quote.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sijam_reviews_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const renderStatusBadge = (status: TestimonialStatus | string) => {
    if (status === 'approved') return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#064e3b] text-[#34d399] border border-[#059669]/40">Approved</span>
    );
    if (status === 'pending_moderation') return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#451a03] text-[#f59e0b] border border-[#78350f]/40">Pending</span>
    );
    if (status === 'rejected') return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#3f1225] text-[#fb7185] border border-[#f43f5e]/40">Rejected</span>
    );
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-slate-900 text-slate-400 border border-slate-700">Archived</span>
    );
  };

  const getQueueStatusBadge = (status: TestimonialStatus) => {
    if (status === 'approved') return <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">Approved</span>;
    if (status === 'pending_moderation') return <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-1.5 py-0.5 rounded">Review</span>;
    return <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-1.5 py-0.5 rounded">Rejected</span>;
  };

  const getInitials = (name: string) =>
    name.replace(/^(Dr|Mr|Mrs|Ms)\.\s*/i, '').split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return {
        date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      };
    } catch {
      return { date: '—', time: '' };
    }
  };

  return (
    <div className="space-y-5 text-slate-100">
      {/* Top Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#070c1e] border border-[#172342] p-6 shadow-sm">
        {/* Background glow + star rating illustration */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-80">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 rounded-full blur-2xl opacity-20" />
            {/* 3D review bubble card */}
            <div className="w-44 h-20 rounded-2xl bg-[#0b1329]/90 border border-amber-500/20 shadow-2xl p-3 flex flex-col justify-between backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white text-[9px] font-bold">★</div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => <Star key={s} className={`w-2.5 h-2.5 ${s <= 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="w-24 h-1.5 bg-slate-400/25 rounded-full" />
                <div className="w-16 h-1.5 bg-slate-500/20 rounded-full" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-emerald-800/50 flex items-center justify-center"><ShieldCheck className="w-2.5 h-2.5 text-emerald-400" /></div>
                <div className="w-12 h-1 bg-emerald-500/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#c084fc] flex items-center gap-1.5">
              <span>• TESTIMONIALS & REVIEWS</span>
              <span className="text-slate-600">•</span>
              <span>MODERATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Review Moderation Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Monitor, review and manage customer testimonials and reviews to ensure authenticity, quality and brand trust.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="self-start md:self-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-600/30 transition shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export Reviews (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {/* Card 1: Total Reviews */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Total Reviews</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">248</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 32%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveRevTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,34 Q25,36 50,28 T90,30 T120,16 L120,40 L0,40 Z" fill="url(#waveRevTotal)" />
                <path d="M0,34 Q25,36 50,28 T90,30 T120,16" fill="none" stroke="#818cf8" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Approved */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#042f2e] border border-[#115e59] flex items-center justify-center text-[#2dd4bf]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Approved</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">198</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 28%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveRevApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,32 Q25,35 50,30 T90,26 T120,12 L120,40 L0,40 Z" fill="url(#waveRevApproved)" />
                <path d="M0,32 Q25,35 50,30 T90,26 T120,12" fill="none" stroke="#2dd4bf" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Review */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#451a03] border border-[#78350f] flex items-center justify-center text-[#f59e0b]">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Pending Review</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">32</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 14%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveRevPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,36 Q30,34 60,32 T95,20 T120,14 L120,40 L0,40 Z" fill="url(#waveRevPending)" />
                <path d="M0,36 Q30,34 60,32 T95,20 T120,14" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Rejected */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#3f1225] border border-[#be123c]/50 flex items-center justify-center text-[#fb7185]">
                <XCircle className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Rejected</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">18</div>
              <div className="text-[11px] text-rose-400 flex items-center gap-1 font-medium mt-1">
                <span>↓ 6%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>
            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveRevRejected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,32 Q25,36 55,26 T95,30 T120,18 L120,40 L0,40 Z" fill="url(#waveRevRejected)" />
                <path d="M0,32 Q25,36 55,26 T95,30 T120,18" fill="none" stroke="#fb7185" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, review content, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">⭐ All Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="bg-[#070c1e] border border-[#172342] rounded-xl px-3.5 py-2.5 text-xs text-slate-300 flex items-center gap-2 shrink-0">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Oct 1, 2026 – Oct 30, 2026</span>
        </div>

        <button
          onClick={() => {}}
          className="bg-[#1e1b4b] hover:bg-[#2e266d] border border-[#4338ca] text-[#c7d2fe] px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Main Grid: Table (8 cols) + Right Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table */}
        <div className="lg:col-span-8 bg-[#070c1e] border border-[#172342] rounded-2xl overflow-hidden flex flex-col shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#172342] bg-[#090f22]/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3.5 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                      className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3 font-semibold">REVIEW ↕</th>
                  <th className="py-3 px-3 font-semibold">CLIENT ↕</th>
                  <th className="py-3 px-3 font-semibold">RATING ↕</th>
                  <th className="py-3 px-3 font-semibold">SERVICE ↕</th>
                  <th className="py-3 px-3 font-semibold">DATE ↕</th>
                  <th className="py-3 px-3 font-semibold">STATUS ↕</th>
                  <th className="py-3 px-3 font-semibold text-right">ACTIONS ↕</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#121c38] text-xs">
                {filtered.map((t) => {
                  const isChecked = selectedIds.includes(t.id);
                  const { date, time } = formatDate(t.created_at);

                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-[#0b1329]/70 transition-colors group cursor-pointer"
                      onClick={() => setDetailItem(t)}
                    >
                      <td className="py-3.5 px-3.5 text-center" onClick={(e) => { e.stopPropagation(); setSelectedIds((prev) => prev.includes(t.id) ? prev.filter((x) => x !== t.id) : [...prev, t.id]); }}>
                        <input type="checkbox" checked={isChecked} onChange={() => {}} className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer" />
                      </td>

                      {/* REVIEW */}
                      <td className="py-3.5 px-3 max-w-[200px]">
                        <p className="text-slate-300 text-xs leading-snug line-clamp-2">{t.quote}</p>
                        <StarRow rating={t.rating} />
                      </td>

                      {/* CLIENT */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-900 to-slate-800 border border-slate-700 text-slate-200 text-[10px] font-bold flex items-center justify-center shrink-0">
                            {getInitials(t.client_name)}
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-white">{t.client_name}</div>
                            <div className="text-[10px] text-slate-500">{t.email}</div>
                            {t.client_title && (
                              <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-0.5">
                                <ShieldCheck className="w-2.5 h-2.5" />
                                <span>{t.client_title}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* RATING */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="font-bold text-white text-sm">{t.rating}.0</div>
                        <StarRow rating={t.rating} size="xs" />
                      </td>

                      {/* SERVICE */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-xs text-slate-300 font-medium leading-tight">
                          {(t.service_label || t.category).split(' / ')[0]}
                        </div>
                        {(t.service_label || t.category).includes(' / ') && (
                          <div className="text-[10px] text-slate-500">
                            {(t.service_label || t.category).split(' / ')[1]}
                          </div>
                        )}
                      </td>

                      {/* DATE */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-xs text-slate-300 font-medium">{date}</div>
                        <div className="text-[10px] text-slate-500">{time}</div>
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {renderStatusBadge(t.status)}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5 relative">
                          <button
                            onClick={() => setDetailItem(t)}
                            className="bg-[#1e1b4b] hover:bg-[#312e81] border border-[#4338ca]/60 text-[#c7d2fe] text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium transition"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === t.id ? null : t.id)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {activeMenuId === t.id && (
                            <div className="absolute right-0 top-8 z-30 w-44 bg-[#0d1527] border border-[#1e293b] rounded-xl shadow-2xl py-1 text-left text-xs">
                              <button onClick={() => { handleApprove(t.id); setActiveMenuId(null); }} className="w-full px-3 py-1.5 text-emerald-400 hover:bg-emerald-950/30 flex items-center gap-2">Approve Review</button>
                              <button onClick={() => { setDetailItem(t); setActiveMenuId(null); }} className="w-full px-3 py-1.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2">View Details</button>
                              <div className="border-t border-slate-800 my-1" />
                              <button onClick={() => { handleReject(t.id); setActiveMenuId(null); }} className="w-full px-3 py-1.5 text-rose-400 hover:bg-rose-950/30 flex items-center gap-2">Reject Review</button>
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

          {/* Pagination */}
          <div className="border-t border-[#172342] px-4 py-3 flex items-center justify-between text-xs text-slate-400 bg-[#070c1e]">
            <div>Showing 1 – 5 of 248 reviews</div>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition disabled:opacity-40" disabled>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md bg-[#4f46e5] text-white font-semibold text-xs shadow-sm">1</button>
              {[2, 3, 4, 5].map((n) => (
                <button key={n} className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs">{n}</button>
              ))}
              <span className="text-slate-500 text-xs px-1">...</span>
              <button className="w-7 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition text-xs">50</button>
              <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Moderation Queue */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <h3 className="font-semibold text-white text-xs">Moderation Queue</h3>
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">3</span>
              </div>
              <button onClick={() => {}} className="text-[11px] text-[#818cf8] hover:text-[#a5b4fc] transition font-medium">View All →</button>
            </div>

            <div className="space-y-3">
              {QUEUE_ITEMS.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-2.5 p-2.5 rounded-xl bg-[#090f22] border border-[#172342]">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${item.color} text-[10px] font-bold flex items-center justify-center shrink-0`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">{item.name}</span>
                        <StarRow rating={item.rating} size="xs" />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{item.preview}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] text-slate-500">{item.timeAgo}</span>
                    {getQueueStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Rating Overview */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                <h3 className="font-semibold text-white text-xs">Rating Overview</h3>
              </div>
              <button onClick={() => {}} className="text-[11px] text-[#818cf8] hover:text-[#a5b4fc] transition font-medium">View Details →</button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* Big Rating Display */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#111c38" strokeWidth="8" />
                  {/* 4.6/5 = 92% */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="8"
                    strokeDasharray="219.66 238.76" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-lg font-bold text-white leading-none">4.6</div>
                  <div className="text-[9px] text-slate-400 leading-none">Out of 5</div>
                </div>
              </div>

              {/* Bar breakdown */}
              <div className="flex-1 space-y-1.5 text-[11px]">
                {[
                  { stars: 5, pct: 72, color: 'bg-amber-400' },
                  { stars: 4, pct: 18, color: 'bg-amber-300' },
                  { stars: 3, pct: 6, color: 'bg-amber-200' },
                  { stars: 2, pct: 2, color: 'bg-slate-500' },
                  { stars: 1, pct: 2, color: 'bg-slate-600' },
                ].map(({ stars, pct, color }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-slate-400 w-3 text-right">{stars}</span>
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400 shrink-0" />
                    <div className="flex-1 h-1.5 bg-[#172342] rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-slate-400 w-7 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aggregate star display */}
            <div className="pt-3 border-t border-[#172342] flex items-center gap-2">
              <StarRow rating={5} />
              <span className="text-[10px] text-slate-400">Average 4.6 from 248 reviews</span>
            </div>
          </div>

          {/* Card 3: Quick Actions */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-white text-xs mb-3">Quick Actions</h3>
            <div className="space-y-1.5">
              <button onClick={() => setStatusFilter('all')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Manage All Reviews</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button onClick={() => setStatusFilter('pending')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Pending Reviews</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button onClick={exportCSV} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition text-xs">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Generate Report</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button onClick={() => {}} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition text-xs">
                <div className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Settings</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Brand Trust Banner */}
      <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Build Trust Through Authentic Feedback</h4>
            <p className="text-xs text-slate-400 mt-0.5">Real stories. Real people. Real impact. Keep your brand credible with verified testimonials and reviews.</p>
          </div>
        </div>
        <button onClick={() => {}} className="relative z-10 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/20 shrink-0">
          <span>View Full Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Detail / Moderation Modal */}
      {detailItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#090f22] border border-[#1e293b] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#172342] bg-[#070c1e]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-900 to-slate-800 border border-indigo-700 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(detailItem.client_name)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{detailItem.client_name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRow rating={detailItem.rating} size="xs" />
                    <span className="text-[10px] text-slate-400">{detailItem.service_label || detailItem.category}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setDetailItem(null)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="bg-[#070c1e] border border-[#172342] rounded-xl p-4">
                <div className="text-slate-400 uppercase text-[10px] font-bold mb-1.5">Review Content</div>
                <p className="text-slate-200 leading-relaxed">{detailItem.quote}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#070c1e] p-3.5 rounded-xl border border-[#172342]">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Location</span>
                  <span className="text-slate-300 mt-0.5 block">{detailItem.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Destination</span>
                  <span className="text-slate-300 mt-0.5 block">{detailItem.destination_country}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Current Status</span>
                  <div className="mt-1">{renderStatusBadge(detailItem.status)}</div>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Proof Type</span>
                  <span className="text-slate-300 mt-0.5 block capitalize">{detailItem.proof_type}</span>
                </div>
              </div>

              <div className="bg-[#070c1e] border border-[#172342] rounded-xl p-3.5 space-y-1.5">
                <div className="text-slate-400 uppercase text-[10px] font-bold">Compliance Checklist</div>
                {[
                  { label: 'PII Redaction Compliant', ok: detailItem.is_redacted_compliant },
                  { label: 'Permission to Publish Granted', ok: detailItem.permission_to_publish },
                  { label: 'Privacy Policy Acknowledged', ok: detailItem.privacy_acknowledged },
                ].map(({ label, ok }) => (
                  <div key={label} className={`flex items-center gap-2 ${ok ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {ok ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {detailItem.rejection_reason && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div><span className="font-bold block mb-0.5">Rejection Reason</span>{detailItem.rejection_reason}</div>
                </div>
              )}

              {detailItem.status === 'pending_moderation' && (
                <div>
                  <label className="text-slate-400 uppercase text-[10px] font-bold block mb-1">Rejection Reason (if rejecting)</label>
                  <textarea
                    rows={2}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#172342] bg-[#070c1e] flex gap-3">
              <button onClick={() => setDetailItem(null)} className="flex-1 py-2 text-xs text-slate-400 hover:text-white border border-[#172342] rounded-xl transition">Close</button>
              {detailItem.status === 'pending_moderation' && (
                <>
                  <button onClick={() => handleReject(detailItem.id)} disabled={loading} className="flex-1 py-2 text-xs font-semibold bg-rose-900 hover:bg-rose-800 text-rose-200 rounded-xl transition disabled:opacity-60">
                    {loading ? 'Saving...' : 'Reject Review'}
                  </button>
                  <button onClick={() => handleApprove(detailItem.id)} disabled={loading} className="flex-1 py-2 text-xs font-semibold bg-[#059669] hover:bg-[#047857] text-white rounded-xl transition disabled:opacity-60">
                    {loading ? 'Saving...' : 'Approve Review'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
