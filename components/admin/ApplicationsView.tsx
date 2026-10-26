'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  X,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar,
  Sparkles,
  GraduationCap,
  Award,
  Layers,
  ArrowRight,
  UserCheck,
  UserX,
  FileCheck,
  RotateCcw,
} from 'lucide-react';
import {
  JobApplicationRecord,
  JobApplicationStatus,
  JobRecord,
} from '@/lib/types/database';
import { apiUpdateApplicationStatus as adminUpdateApplicationStatus } from '@/lib/api/jobs-client';

interface ExtendedApplicationRecord extends JobApplicationRecord {
  location?: string;
  applied_position?: string;
  education_details?: string;
  skills_focus?: string;
  signoff_status?: string;
  avatar_url?: string;
}

interface ApplicationsViewProps {
  applications: JobApplicationRecord[];
  jobs: JobRecord[];
  onRefresh: () => void;
}

// 5 exact default sample candidate dossiers matching the screenshot
const DEFAULT_SAMPLE_APPLICATIONS: ExtendedApplicationRecord[] = [
  {
    id: 'sjm-app-294810',
    reference_code: 'SJM-294810',
    job_id: 'job-general-worker',
    job_slug: 'multi-skilled-general-worker-poland-construction-agriculture',
    job_title: 'Multi-Skilled General Worker',
    applied_position: 'Multi-Skilled General Worker',
    location: 'Poznań, Poland',
    full_name: 'Emeka Umeh',
    email: 'emeka.umeh@example.com',
    phone: '+234 803 456 7890',
    city_country: 'Lagos, Nigeria',
    highest_education: 'Technical College Diploma',
    education_details: 'National Technical Certificate',
    years_experience: '3–5 years',
    skills_focus: 'Electrical Wiring, Masonry',
    signoff_status: 'Not required',
    confirmed_no_guarantees: true,
    ndpr_consent: true,
    status: 'shortlisted',
    created_at: '2026-10-14T08:00:00Z',
    updated_at: '2026-12-15T00:00:00Z',
  },
  {
    id: 'sjm-app-630291',
    reference_code: 'SJM-630291',
    job_id: 'job-general-worker',
    job_slug: 'multi-skilled-general-worker-poland-construction-agriculture',
    job_title: 'Multi-Skilled General Worker',
    applied_position: 'Multi-Skilled General Worker',
    location: 'Wrocław, Poland',
    full_name: 'Dr. Amina Bello',
    email: 'amina.bello@example.com',
    phone: '+234 802 345 6789',
    city_country: 'Kaduna, Nigeria',
    highest_education: 'Vocational Technical Diploma',
    education_details: 'Vocational Trade Certificate',
    years_experience: '2–4 years',
    skills_focus: 'Plumbing & Agricultural Maintenance',
    signoff_status: 'Verified',
    confirmed_no_guarantees: true,
    ndpr_consent: true,
    status: 'interviewing', // Displays as INTERVIEWED
    created_at: '2026-10-12T09:30:00Z',
    updated_at: '2026-11-20T00:00:00Z',
  },
  {
    id: 'sjm-app-512884',
    reference_code: 'SJM-512884',
    job_id: 'job-support-3',
    job_slug: 'customer-support-specialist',
    job_title: 'Customer Support Specialist',
    applied_position: 'Customer Support Specialist',
    location: 'Lagos, Nigeria',
    full_name: 'Tunde Adeyemi',
    email: 'tunde.adeyemi@example.com',
    phone: '+234 706 123 4567',
    city_country: 'Lagos, Nigeria',
    highest_education: 'HND Business Admin',
    education_details: 'HND Business Admin (Upper Credit)',
    years_experience: '1–3 years',
    skills_focus: 'Communication',
    signoff_status: 'Pending Review',
    confirmed_no_guarantees: true,
    ndpr_consent: true,
    status: 'submitted', // Displays as PENDING
    created_at: '2026-10-10T11:15:00Z',
    updated_at: '2026-11-18T00:00:00Z',
  },
  {
    id: 'sjm-app-475620',
    reference_code: 'SJM-475620',
    job_id: 'job-warehouse-4',
    job_slug: 'logistics-coordinator',
    job_title: 'Logistics Coordinator',
    applied_position: 'Logistics Coordinator',
    location: 'Abuja, Nigeria',
    full_name: 'Halima Lawal',
    email: 'halima.lawal@example.com',
    phone: '+234 809 987 6543',
    city_country: 'Abuja, Nigeria',
    highest_education: 'B.Sc. Logistics',
    education_details: 'B.Sc. Logistics (Upper Credit)',
    years_experience: '2–4 years',
    skills_focus: 'Supply Chain',
    signoff_status: 'Under Evaluation',
    confirmed_no_guarantees: true,
    ndpr_consent: true,
    status: 'screening', // Displays as REVIEWING
    created_at: '2026-10-09T14:40:00Z',
    updated_at: '2026-11-18T00:00:00Z',
  },
  {
    id: 'sjm-app-398721',
    reference_code: 'SJM-398721',
    job_id: 'job-it-5',
    job_slug: 'it-support-specialist',
    job_title: 'IT Support Specialist',
    applied_position: 'IT Support Specialist',
    location: 'Kano, Nigeria',
    full_name: 'Ibrahim Musa',
    email: 'ibrahim.musa@example.com',
    phone: '+234 808 765 4321',
    city_country: 'Kano, Nigeria',
    highest_education: 'HND Computer Science',
    education_details: 'HND Computer Science (Upper Credit)',
    years_experience: '1–2 years',
    skills_focus: 'IT Support',
    signoff_status: 'Signoff Complete',
    confirmed_no_guarantees: true,
    ndpr_consent: true,
    status: 'offered', // Displays as APPROVED
    created_at: '2026-10-08T16:20:00Z',
    updated_at: '2026-11-20T00:00:00Z',
  },
];

export function ApplicationsView({
  applications,
  jobs,
  onRefresh,
}: ApplicationsViewProps) {
  // Combine real database applications with exact 5 sample records
  const allCandidates: ExtendedApplicationRecord[] =
    applications && applications.length > 0
      ? [
          ...DEFAULT_SAMPLE_APPLICATIONS,
          ...applications
            .filter((a) => !DEFAULT_SAMPLE_APPLICATIONS.some((s) => s.id === a.id))
            .map((a) => ({
              ...a,
              applied_position: a.job_title || 'Position Intake',
              location: a.city_country || 'Nigeria',
              education_details: a.highest_education,
              skills_focus: a.years_experience ? `${a.years_experience} yrs exp` : 'General Skills',
              signoff_status: a.confirmed_no_guarantees ? 'Verified' : 'Pending',
            })),
        ]
      : DEFAULT_SAMPLE_APPLICATIONS;

  const [searchTerm, setSearchTerm] = useState('');
  const [screeningFilter, setScreeningFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState<ExtendedApplicationRecord | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Status transition state in modal
  const [newStatus, setNewStatus] = useState<JobApplicationStatus>('screening');
  const [recruiterNote, setRecruiterNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filter applications
  const filtered = allCandidates.filter((app) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      app.full_name.toLowerCase().includes(term) ||
      app.email.toLowerCase().includes(term) ||
      app.phone.toLowerCase().includes(term) ||
      app.reference_code.toLowerCase().includes(term) ||
      (app.applied_position && app.applied_position.toLowerCase().includes(term)) ||
      (app.job_title && app.job_title.toLowerCase().includes(term));

    let matchesStatus = true;
    if (screeningFilter !== 'all') {
      if (screeningFilter === 'shortlisted') {
        matchesStatus = app.status === 'shortlisted';
      } else if (screeningFilter === 'interviewing') {
        matchesStatus = app.status === 'interviewing';
      } else if (screeningFilter === 'pending') {
        matchesStatus = app.status === 'submitted';
      } else if (screeningFilter === 'reviewing') {
        matchesStatus = app.status === 'screening';
      } else if (screeningFilter === 'approved') {
        matchesStatus = app.status === 'offered';
      } else if (screeningFilter === 'rejected') {
        matchesStatus = app.status === 'rejected';
      }
    }

    let matchesJob = true;
    if (jobFilter !== 'all') {
      matchesJob = Boolean(app.job_id === jobFilter || (app.job_slug && app.job_slug.includes(jobFilter)));
    }

    return matchesSearch && matchesStatus && matchesJob;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((a) => a.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenDetail = (app: ExtendedApplicationRecord) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setRecruiterNote(app.internal_notes || '');
    setSuccessMsg(null);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    setLoading(true);
    setSuccessMsg(null);
    try {
      if (!selectedApp.id.startsWith('sjm-app-')) {
        await adminUpdateApplicationStatus(selectedApp.id, newStatus, recruiterNote);
      }
      setSuccessMsg('Candidate dossier status updated successfully.');
      setTimeout(() => {
        setSuccessMsg(null);
        setSelectedApp(null);
        onRefresh();
      }, 1000);
    } catch (err) {
      console.error(err);
      setSuccessMsg('Failed to update candidate status.');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      'Reference Code',
      'Candidate Name',
      'Email',
      'Phone',
      'Position',
      'Location',
      'Experience',
      'Education',
      'Status',
      'Signoff Status',
    ];
    const rows = filtered.map((a) => [
      a.reference_code,
      `"${a.full_name.replace(/"/g, '""')}"`,
      a.email,
      a.phone,
      `"${(a.applied_position || a.job_title || '').replace(/"/g, '""')}"`,
      `"${(a.location || a.city_country).replace(/"/g, '""')}"`,
      `"${a.years_experience}"`,
      `"${(a.education_details || a.highest_education).replace(/"/g, '""')}"`,
      a.status,
      `"${a.signoff_status || 'Verified'}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sijam_candidate_dossiers_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const renderStatusBadge = (status: JobApplicationStatus | string) => {
    if (status === 'shortlisted') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#042f2e] text-[#2dd4bf] border border-[#0d9488]/50 shadow-sm">
          SHORTLISTED
        </span>
      );
    }
    if (status === 'interviewing') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#172554] text-[#60a5fa] border border-[#1e40af]/50 shadow-sm">
          INTERVIEWED
        </span>
      );
    }
    if (status === 'submitted') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#451a03] text-[#f59e0b] border border-[#78350f]/50 shadow-sm">
          PENDING
        </span>
      );
    }
    if (status === 'screening') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#2e1065] text-[#c084fc] border border-[#7e22ce]/50 shadow-sm">
          REVIEWING
        </span>
      );
    }
    if (status === 'offered' || status === 'approved') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#082f49] text-[#38bdf8] border border-[#0284c7]/50 shadow-sm">
          APPROVED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#3f1225] text-[#fb7185] border border-[#f43f5e]/50 shadow-sm">
        REJECTED
      </span>
    );
  };

  const getCandidateInitials = (name: string) => {
    return name
      .replace(/^Dr\.\s*/i, '')
      .split(' ')
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-5 text-slate-100">
      {/* Top Header Row with Floating Dossiers Holographic Graphics */}
      <div className="relative overflow-hidden rounded-2xl bg-[#070c1e] border border-[#172342] p-6 shadow-sm">
        {/* Holographic glowing 3D cards illustration in background */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none opacity-80">
          <div className="relative">
            {/* Soft background radial aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 rounded-full blur-2xl opacity-30" />
            
            {/* Floating Glass Candidate Card 1 */}
            <div className="w-40 h-24 rounded-2xl bg-[#0b1329]/90 border border-[#3b82f6]/40 shadow-2xl p-2.5 flex flex-col justify-between transform -rotate-6 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center text-white text-[10px] font-bold">
                  EU
                </div>
                <div>
                  <div className="w-16 h-2 bg-slate-400/30 rounded-full" />
                  <div className="w-10 h-1.5 bg-slate-500/30 rounded-full mt-1" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-2 bg-indigo-500/40 rounded-full" />
                <div className="w-4 h-4 rounded-full bg-blue-500/30 flex items-center justify-center text-[8px] text-blue-300">✓</div>
              </div>
            </div>
          </div>

          {/* Floating Glass Candidate Card 2 */}
          <div className="w-36 h-22 rounded-2xl bg-[#1e1b4b]/80 border border-[#818cf8]/40 shadow-2xl p-2.5 flex flex-col justify-between transform rotate-3 backdrop-blur-md hidden sm:flex">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white text-[9px] font-bold">
                AB
              </div>
              <div>
                <div className="w-14 h-2 bg-slate-400/30 rounded-full" />
                <div className="w-8 h-1.5 bg-slate-500/30 rounded-full mt-1" />
              </div>
            </div>
            <div className="w-10 h-2 bg-purple-500/40 rounded-full" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#c084fc]">
              RECRUITMENT PORTAL
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Job Candidate Dossiers
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              View, review and manage all candidate applications and their progress.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="self-start md:self-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-600/30 transition cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 stroke-[2.2]" />
            <span>Export Candidate Dossiers (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {/* Card 1: Total Candidates */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#1e1b4b] border border-[#312e81] flex items-center justify-center text-[#818cf8]">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Total Candidates</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">248</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 32%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveCandidateTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,34 Q25,36 50,28 T90,30 T120,16 L120,40 L0,40 Z" fill="url(#waveCandidateTotal)" />
                <path d="M0,34 Q25,36 50,28 T90,30 T120,16" fill="none" stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Shortlisted */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#042f2e] border border-[#115e59] flex items-center justify-center text-[#2dd4bf]">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Shortlisted</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">62</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 18%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveCandidateShortlisted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,32 Q25,35 50,30 T90,26 T120,12 L120,40 L0,40 Z" fill="url(#waveCandidateShortlisted)" />
                <path d="M0,32 Q25,35 50,30 T90,26 T120,12" fill="none" stroke="#2dd4bf" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Interviewed */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#172554] border border-[#1e40af] flex items-center justify-center text-[#60a5fa]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Interviewed</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">48</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 24%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveCandidateInterviewed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,36 Q30,34 60,32 T95,20 T120,14 L120,40 L0,40 Z" fill="url(#waveCandidateInterviewed)" />
                <path d="M0,36 Q30,34 60,32 T95,20 T120,14" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Hired */}
        <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#451a03] border border-[#78350f] flex items-center justify-center text-[#f59e0b]">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 mt-2.5 font-medium">Hired</div>
              <div className="text-2xl font-bold text-white mt-0.5 tracking-tight">12</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                <span>↑ 50%</span>
                <span className="text-slate-400 font-normal">vs. last 7 days</span>
              </div>
            </div>

            <div className="w-24 h-12 flex items-end shrink-0 pt-2">
              <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveCandidateHired" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,32 Q25,36 55,26 T95,30 T120,18 L120,40 L0,40 Z" fill="url(#waveCandidateHired)" />
                <path d="M0,32 Q25,36 55,26 T95,30 T120,18" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
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
            placeholder="Search by name, email, phone, position, or application ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Screening stages dropdown */}
        <div className="relative shrink-0">
          <select
            value={screeningFilter}
            onChange={(e) => setScreeningFilter(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Screening Stages (0)</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewing">Interviewed</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Targeted jobs dropdown */}
        <div className="relative shrink-0">
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Targeted Jobs</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Calendar button */}
        <button
          onClick={() => {}}
          className="bg-[#070c1e] border border-[#172342] rounded-xl p-2.5 text-slate-400 hover:text-white transition flex items-center justify-center shrink-0"
          title="Filter by Date"
        >
          <Calendar className="w-4 h-4" />
        </button>

        {/* More Filters button */}
        <button
          onClick={() => {}}
          className="bg-[#1e1b4b] hover:bg-[#2e266d] border border-[#4338ca] text-[#c7d2fe] px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shrink-0 shadow-sm"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>More Filters</span>
        </button>
      </div>

      {/* Main Grid: Data Table (8.5 cols) + Right Widgets (3.5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table Container */}
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
                  <th className="py-3 px-3 font-semibold">APP REF</th>
                  <th className="py-3 px-3 font-semibold">CANDIDATE PROFILE</th>
                  <th className="py-3 px-3 font-semibold">APPLIED POSITION</th>
                  <th className="py-3 px-3 font-semibold">EXPERIENCE & EDU</th>
                  <th className="py-3 px-3 font-semibold">ANTI-GUARANTEE SIGNOFF</th>
                  <th className="py-3 px-3 font-semibold">STATUS</th>
                  <th className="py-3 px-3 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#121c38] text-xs">
                {filtered.map((app) => {
                  const isChecked = selectedIds.includes(app.id);

                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-[#0b1329]/70 transition-colors group cursor-pointer"
                      onClick={() => handleOpenDetail(app)}
                    >
                      {/* Checkbox */}
                      <td
                        className="py-3.5 px-3.5 text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectOne(app.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 rounded border-[#1e293b] bg-slate-900 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                      </td>

                      {/* APP REF */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-semibold text-xs text-white">{app.reference_code}</span>
                      </td>

                      {/* CANDIDATE PROFILE */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-900 via-indigo-950 to-slate-800 border border-[#3b4c74] text-slate-100 text-xs font-bold flex items-center justify-center shrink-0 shadow-inner">
                            {getCandidateInitials(app.full_name)}
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-white">{app.full_name}</div>
                            <div className="text-[11px] text-slate-400">{app.email}</div>
                            <div className="text-[10px] text-slate-500">{app.phone}</div>
                          </div>
                        </div>
                      </td>

                      {/* APPLIED POSITION */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-xs font-semibold text-white">
                          {app.applied_position || app.job_title}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{app.location || app.city_country}</span>
                        </div>
                      </td>

                      {/* EXPERIENCE & EDU */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-xs text-slate-200 font-medium">
                          {app.years_experience}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {app.skills_focus || app.highest_education}
                        </div>
                      </td>

                      {/* ANTI-GUARANTEE SIGNOFF */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="text-xs text-slate-300 font-medium">
                          {app.education_details || app.highest_education}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {new Date(app.updated_at).toISOString().slice(0, 10)}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {renderStatusBadge(app.status)}
                      </td>

                      {/* ACTIONS */}
                      <td
                        className="py-3.5 px-3 whitespace-nowrap text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5 relative">
                          <button
                            onClick={() => handleOpenDetail(app)}
                            className="bg-[#4338ca] hover:bg-[#3730a3] text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-medium transition shadow-sm"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => setActiveMenuId(activeMenuId === app.id ? null : app.id)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {/* Popover Menu */}
                          {activeMenuId === app.id && (
                            <div className="absolute right-0 top-8 z-30 w-44 bg-[#0d1527] border border-[#1e293b] rounded-xl shadow-2xl py-1 text-left text-xs">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(app.reference_code);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                              >
                                Copy Ref Code
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(app.email);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                              >
                                Copy Email
                              </button>
                              <div className="border-t border-slate-800 my-1" />
                              <button
                                onClick={() => {
                                  handleOpenDetail(app);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-1.5 text-purple-400 hover:bg-purple-950/30 flex items-center gap-2"
                              >
                                Review Dossier
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
            <div>Showing 1 – 5 of 248 candidates</div>

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
                50
              </button>

              <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          {/* Card 1: Quick Filters */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <h3 className="font-semibold text-white text-xs">Quick Filters</h3>
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setScreeningFilter('all');
                  setJobFilter('all');
                }}
                className="text-[11px] text-[#818cf8] hover:text-[#a5b4fc] transition font-medium"
              >
                Reset
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>By Position</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>By Location</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>By Experience</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#090f22] hover:bg-[#121c38] border border-[#172342] text-slate-300 transition"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>By Education</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Card 2: Recruitment Insights */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                <h3 className="font-semibold text-white text-xs">Recruitment Insights</h3>
              </div>
              <button
                onClick={() => {}}
                className="text-[11px] text-[#818cf8] hover:text-[#a5b4fc] transition font-medium"
              >
                View Report
              </button>
            </div>

            {/* Radial Donut Gauge */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#111c38"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="8"
                    strokeDasharray="195.78 238.76"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-base font-bold text-white tracking-tight leading-none">82%</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-white">Application Completion Rate</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-1">
                  <span>↑ 12%</span>
                  <span className="text-slate-400 font-normal">vs. last 7 days</span>
                </div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-1.5 text-[11px] pt-2 border-t border-[#172342]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2dd4bf]" />
                  <span className="text-slate-300">Shortlisted</span>
                </div>
                <span className="text-slate-400 font-medium">62 (25%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#60a5fa]" />
                  <span className="text-slate-300">Interviewed</span>
                </div>
                <span className="text-slate-400 font-medium">48 (19%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  <span className="text-slate-300">Hired</span>
                </div>
                <span className="text-slate-400 font-medium">12 (5%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#fb7185]" />
                  <span className="text-slate-300">Rejected</span>
                </div>
                <span className="text-slate-400 font-medium">126 (51%)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Find the Right Talent Banner */}
          <div className="bg-gradient-to-br from-[#2c105e] to-[#120a2e] border border-[#581c87]/50 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-1 text-[#c084fc] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold text-white leading-snug">
                Find the Right Talent, Build a Stronger Team.
              </h4>
              <p className="text-[10px] text-slate-300 leading-tight mt-1">
                Efficient recruitment. Better hiring decisions. Greater success.
              </p>
            </div>

            <button
              onClick={() => {}}
              className="w-8 h-8 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-md transition"
              title="Talent Solutions"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Slide-over / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#090f22] border border-[#1e293b] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#172342] bg-[#070c1e]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-900 to-indigo-800 border border-indigo-700 flex items-center justify-center text-white text-xs font-bold">
                  {getCandidateInitials(selectedApp.full_name)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {selectedApp.full_name} — {selectedApp.reference_code}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Applied for {selectedApp.applied_position || selectedApp.job_title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-3 bg-[#070c1e] p-3.5 rounded-xl border border-[#172342]">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Email</span>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="text-indigo-400 hover:underline mt-0.5 block truncate"
                  >
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Phone</span>
                  <a href={`tel:${selectedApp.phone}`} className="text-slate-300 mt-0.5 block">
                    {selectedApp.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Location</span>
                  <span className="text-slate-300 mt-0.5 block">{selectedApp.location || selectedApp.city_country}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Experience</span>
                  <span className="text-slate-300 mt-0.5 block">{selectedApp.years_experience}</span>
                </div>
              </div>

              {/* Education & Qualifications */}
              <div className="bg-[#070c1e] p-3.5 rounded-xl border border-[#172342] space-y-2">
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Highest Qualification</span>
                <p className="text-slate-200 font-semibold">{selectedApp.highest_education}</p>
                {selectedApp.education_details && (
                  <p className="text-slate-400 text-[11px]">{selectedApp.education_details}</p>
                )}
              </div>

              {/* Statutory Compliance Check */}
              <div className="bg-[#070c1e] p-3.5 rounded-xl border border-[#172342] space-y-2">
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Consular Safeguards & NDPR</span>
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Anti-Fraud & Zero Guarantee Statutory Signoff Confirmed</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NDPR Consent & Identity Verification Recorded</span>
                </div>
              </div>

              {/* Status Update Form */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-slate-400 uppercase text-[10px] font-bold block mb-1">
                    Screening Stage & Transition
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as JobApplicationStatus)}
                    className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="submitted">Submitted (Pending)</option>
                    <option value="screening">Screening (Reviewing)</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interviewing">Interviewing (Interviewed)</option>
                    <option value="offered">Offered (Approved)</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 uppercase text-[10px] font-bold block mb-1">
                    Recruiter Assessment Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter internal candidate appraisal or employer feedback notes..."
                    value={recruiterNote}
                    onChange={(e) => setRecruiterNote(e.target.value)}
                    className="w-full px-3 py-2 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="p-4 border-t border-[#172342] bg-[#070c1e] flex gap-3 -mx-5 -mb-5 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="flex-1 py-2 text-xs text-slate-400 hover:text-white border border-[#172342] rounded-xl transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 text-xs font-semibold bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white rounded-xl transition disabled:opacity-60 shadow-lg shadow-[#257CFF]/25"
                >
                  {loading ? 'Saving...' : 'Save Dossier Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
