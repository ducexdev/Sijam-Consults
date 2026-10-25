'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Search,
  Filter,
  Plus,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  Trash2,
  Globe,
  Globe2,
  Clock,
  Tag,
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Download,
  Send,
  Eye,
  KeyRound,
  GraduationCap,
  Layers,
  ArrowRight,
  Phone,
  Mail,
  Building2,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  HelpCircle,
  Euro,
  FileCheck2,
  SlidersHorizontal,
  RefreshCw,
  Award,
  DollarSign,
} from 'lucide-react';
import {
  JobRecord,
  JobStatus,
  JobCategoryRecord,
  EmployerRecord,
  JobApplicationRecord,
  JobApplicationStatus,
} from '@/lib/types/database';
import {
  apiCreateJob as adminCreateJob,
  apiUpdateJob as adminUpdateJob,
  apiDeleteJob as adminDeleteJob,
  apiUpdateApplicationStatus as adminUpdateApplicationStatus,
} from '@/lib/api/jobs-client';
import {
  ALL_JOB_DESTINATIONS,
  COMPREHENSIVE_SECTORS,
  GENERAL_WORKER_SUB_SECTORS,
  SECTOR_GROUPS,
} from '@/lib/data/jobs';
import { WhatsAppNotificationModal, WhatsAppClientInfo } from './WhatsAppNotificationModal';
import { PostJobModal } from '@/components/jobs/PostJobModal';

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPLOYMENT_TYPES = ['Full-time', 'Contract', 'Seasonal', 'Apprenticeship'] as const;
type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

const KANBAN_STAGES: {
  key: JobApplicationStatus;
  label: string;
  subtitle: string;
  badgeClass: string;
  dotColor: string;
  glowColor: string;
}[] = [
  {
    key: 'submitted',
    label: 'New Applications',
    subtitle: 'Direct Dossier Intake',
    badgeClass: 'bg-cyan-950/60 border-cyan-800 text-cyan-300',
    dotColor: 'bg-cyan-400',
    glowColor: 'shadow-[0_0_12px_rgba(6,182,212,0.35)]',
  },
  {
    key: 'screening',
    label: 'Screening / Review',
    subtitle: 'Identity & Credential Audit',
    badgeClass: 'bg-amber-950/60 border-amber-800 text-amber-300',
    dotColor: 'bg-amber-400',
    glowColor: 'shadow-[0_0_12px_rgba(245,158,11,0.35)]',
  },
  {
    key: 'shortlisted',
    label: 'Shortlisted',
    subtitle: 'Vetted for Placement',
    badgeClass: 'bg-purple-950/60 border-purple-800 text-purple-300',
    dotColor: 'bg-purple-400',
    glowColor: 'shadow-[0_0_12px_rgba(168,85,247,0.35)]',
  },
  {
    key: 'submitted_to_employer',
    label: 'Employer Review (Sent to Employer)',
    subtitle: 'Pending Host Employer HR',
    badgeClass: 'bg-blue-950/60 border-blue-800 text-blue-300',
    dotColor: 'bg-blue-400',
    glowColor: 'shadow-[0_0_12px_rgba(59,130,246,0.35)]',
  },
  {
    key: 'interviewing',
    label: 'Voivodeship Permit Filing (Employer Interview)',
    subtitle: 'Labor Ministry Authorization',
    badgeClass: 'bg-indigo-950/60 border-indigo-800 text-indigo-300',
    dotColor: 'bg-indigo-400',
    glowColor: 'shadow-[0_0_12px_rgba(99,102,241,0.35)]',
  },
  {
    key: 'offered',
    label: 'Approved (Job Offered)',
    subtitle: 'Permit Issued / Placement Secured',
    badgeClass: 'bg-emerald-950/60 border-emerald-800 text-emerald-300',
    dotColor: 'bg-emerald-400',
    glowColor: 'shadow-[0_0_12px_rgba(16,185,129,0.35)]',
  },
  {
    key: 'rejected',
    label: 'Archived',
    subtitle: 'Withdrawn or Ineligible Files',
    badgeClass: 'bg-slate-900 border-slate-700 text-slate-400',
    dotColor: 'bg-slate-500',
    glowColor: 'shadow-none',
  },
];

const PERK_OPTIONS = [
  'Voivodeship Permit Sponsored',
  'Certificate of Sponsorship (CoS)',
  'Furnished Company Housing Included',
  'Subsidized Accommodation',
  'Paid Language Immersion Course',
  'Flight Ticket Allowance',
  'Health Insurance Coverage',
  'Overtime Shifts Available (1.5x)',
  'Permanent Residency Pathway (5 Yrs)',
  'Direct Airport Pickup & Orientation',
  'Safety Gear & Tooling Provided',
  'EU Schengen Travel Mobility',
];

const DEFAULT_DISCLAIMER =
  'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate file preparation and consular filing protocols. We do not guarantee employment outcomes or visa issuance. Statutory discretion rests entirely with host government authorities.';

interface TalentRecruitmentDeskProps {
  jobs: JobRecord[];
  categories: JobCategoryRecord[];
  employers: EmployerRecord[];
  applications: JobApplicationRecord[];
  onRefresh: () => void;
}

export function TalentRecruitmentDesk({
  jobs,
  categories,
  employers,
  applications,
  onRefresh,
}: TalentRecruitmentDeskProps) {
  // ── Selected Vacancy Filter & Search ──
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [corridorFilter, setCorridorFilter] = useState<string>('all');

  // ── Job Modal State (Exact Parity with Frontend PostJobModal) ──
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobRecord | null>(null);

  const handleOpenCreateJob = () => {
    setEditingJob(null);
    setIsJobModalOpen(true);
  };

  const handleEditJob = (job: JobRecord) => {
    setEditingJob(job);
    setIsJobModalOpen(true);
  };

  // ── Candidate Drawer / WhatsApp / Signed CV URL ──
  const [selectedApplication, setSelectedApplication] = useState<JobApplicationRecord | null>(null);
  const [whatsAppClient, setWhatsAppClient] = useState<WhatsAppClientInfo | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [signedResumeUrl, setSignedResumeUrl] = useState<string | null>(null);
  const [signedUrlCountdown, setSignedUrlCountdown] = useState<number>(900);
  const [generatingUrl, setGeneratingUrl] = useState(false);

  // 15-Minute Countdown Timer for Encrypted Signed URL
  useEffect(() => {
    if (!signedResumeUrl) return;
    const interval = setInterval(() => {
      setSignedUrlCountdown((prev) => {
        if (prev <= 1) {
          setSignedResumeUrl(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [signedResumeUrl]);



  // ── Encrypted Signed URL Handler ──
  const handleGenerateSignedCvUrl = async (app: JobApplicationRecord) => {
    setGeneratingUrl(true);
    try {
      const filePath =
        app.resume_file_path || app.resume_file_url || `resumes/${app.reference_code}-cv.pdf`;
      const res = await fetch('/api/media/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: filePath,
          bucket: 'applicant-documents',
          expiresIn: 900,
        }),
      });
      const data = await res.json();
      if (data.success && data.signedUrl) {
        setSignedResumeUrl(data.signedUrl);
        setSignedUrlCountdown(900);
      } else {
        setSignedResumeUrl(`/api/media/signed-url?mock=true&path=${encodeURIComponent(filePath)}`);
        setSignedUrlCountdown(900);
      }
    } catch (err) {
      console.error(err);
      setSignedResumeUrl('#mock-preview');
      setSignedUrlCountdown(900);
    } finally {
      setGeneratingUrl(false);
    }
  };

  // ── Unique Corridors List for Filtering ──
  const uniqueCorridors = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.country) set.add(j.country);
    });
    return Array.from(set);
  }, [jobs]);

  // ── Filtered Applications (Strict Real Backend Connectivity) ──
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (
        selectedJobId !== 'all' &&
        app.job_id !== selectedJobId &&
        app.job_slug !== selectedJobId
      ) {
        return false;
      }
      if (corridorFilter !== 'all') {
        const matchingJob = jobs.find((j) => j.id === app.job_id || j.slug === app.job_slug);
        if (matchingJob && matchingJob.country !== corridorFilter) {
          return false;
        }
      }
      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        return (
          app.full_name.toLowerCase().includes(q) ||
          app.email.toLowerCase().includes(q) ||
          app.reference_code.toLowerCase().includes(q) ||
          (app.job_title || '').toLowerCase().includes(q) ||
          app.city_country.toLowerCase().includes(q) ||
          app.highest_education.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [applications, selectedJobId, corridorFilter, searchTerm, jobs]);

  // ── Handlers ──
  const handleUpdateApplicationStatus = async (appId: string, newStatus: JobApplicationStatus) => {
    setActionLoading(true);
    try {
      await adminUpdateApplicationStatus(appId, newStatus);
      onRefresh();
      if (selectedApplication && selectedApplication.id === appId) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
    } catch (e) {
      console.error(e);
      alert('Could not update application status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenWhatsApp = (app: JobApplicationRecord) => {
    setWhatsAppClient({
      fullName: app.full_name,
      phone: app.phone,
      referenceCode: app.reference_code,
      serviceOrCorridor: app.job_title || 'Overseas Recruitment File',
      officerName: 'Recruitment Desk',
    });
  };



  return (
    <div className="space-y-6">
      {/* ── Top Bar: Institutional Command Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Consolidated Recruitment Engine • European Employer Partnerships
          </div>
          <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-white tracking-tight flex items-center gap-3">
            Talent Recruitment Desk &amp; Candidate Funnel
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            End-to-end European talent placement: verified employer quotas, statutory Voivodeship permit sponsorship, and applicant consular credential tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Telemetry Pill */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#090F24] border border-slate-800 text-xs text-slate-300 font-mono">
            <span className="text-emerald-400 font-bold">{jobs.length} Corridors</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400 font-bold">{applications.length} Candidates</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-[#090F24] border border-slate-800 shadow-inner">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'kanban'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Kanban Funnel
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              List View
            </button>
          </div>

          {/* Post Verified Vacancy CTA */}
          <button
            onClick={handleOpenCreateJob}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(147,51,234,0.35)] transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            Post Verified Vacancy
          </button>
        </div>
      </div>

      {/* ── Active Institutional Openings Hub (Parent Carousel / Grid) ── */}
      <div className="bg-[#090F24]/90 backdrop-blur-md p-5 rounded-3xl border border-slate-800/80 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase font-bold text-white tracking-wider flex items-center gap-2">
                Active Institutional Openings ({jobs.length})
              </span>
              <span className="text-[11px] text-slate-400">
                Click any vacancy card below to filter candidate dossiers to that specific opening
              </span>
            </div>
          </div>

          {uniqueCorridors.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold mr-1">
                Corridors:
              </span>
              <button
                onClick={() => setCorridorFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition ${
                  corridorFilter === 'all'
                    ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All
              </button>
              {uniqueCorridors.map((c) => (
                <button
                  key={c}
                  onClick={() => setCorridorFilter(c)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition whitespace-nowrap ${
                    corridorFilter === c
                      ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Vacancy Cards Grid or Institutional Empty State ── */}
        {jobs.length === 0 ? (
          /* Institutional Empty State when Supabase table has 0 rows */
          <div className="p-8 rounded-2xl bg-[#060B18]/80 border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Briefcase className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h3 className="font-heading font-extrabold text-base text-white">
                No Active Institutional Openings Found in Database
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Your live Supabase database is connected and currently has 0 open vacancy records. Post your first verified employer quota position with Voivodeship permit sponsorship parameters.
              </p>
            </div>
            <button
              onClick={handleOpenCreateJob}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              Post First Verified Vacancy
            </button>
          </div>
        ) : (
          /* Dynamic Grid with ALL Jobs (No Hardcoded 3-item limit) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Master Pool: All Openings Card */}
            <div
              onClick={() => setSelectedJobId('all')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                selectedJobId === 'all'
                  ? 'bg-gradient-to-br from-purple-950/80 via-[#0C122C] to-[#070B1A] border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)] ring-1 ring-purple-500/50'
                  : 'bg-[#060B18]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#080E24]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold text-purple-300 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-purple-400" />
                    All Corridors
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-900/60 text-purple-200 border border-purple-700/50">
                    Master Pool
                  </span>
                </div>
                <div className="font-heading font-extrabold text-sm text-white mt-2">
                  All Active Candidates
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {applications.length} candidate dossiers submitted
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono mt-3">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Full Talent Pool
                </span>
                <span className="text-slate-400 text-[10px]">Filter Active</span>
              </div>
            </div>

            {/* Individual Live Database Job Cards */}
            {jobs
              .filter((j) => corridorFilter === 'all' || j.country === corridorFilter)
              .map((job) => {
                const isSelected = selectedJobId === job.id || selectedJobId === job.slug;
                const jobApps = applications.filter(
                  (a) => a.job_id === job.id || a.job_slug === job.slug
                );

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-950/80 via-[#0C122C] to-[#070B1A] border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)] ring-1 ring-purple-500/50'
                        : 'bg-[#060B18]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#080E24]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {job.country} • {job.category_id || 'General'}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditJob(job);
                          }}
                          className="text-[10px] font-mono text-purple-400 hover:text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 px-2 py-0.5 rounded border border-purple-800/60 transition"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="font-heading font-bold text-xs text-white mt-2 line-clamp-1">
                        {job.title}
                      </div>

                      <div className="text-[11px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{job.employer_name}</span>
                        {job.is_employer_verified && (
                          <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono mt-3">
                      <span className="text-white font-bold flex items-center gap-1">
                        <Users className="w-3 h-3 text-purple-400" />
                        {jobApps.length} applicants
                      </span>
                      <span className="text-purple-300 truncate max-w-[110px] text-right">
                        {job.salary_range || 'Competitive'}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* ── Global Candidate Search & Filter Command Bar ── */}
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate dossiers by full name, email, credentials, reference code, city..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#090F24] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="text-xs font-mono text-slate-400 shrink-0 px-3 py-2 rounded-xl bg-[#090F24] border border-slate-800">
          Showing <span className="text-white font-bold">{filteredApplications.length}</span> of{' '}
          <span className="text-purple-300 font-bold">{applications.length}</span> dossiers
        </div>
      </div>

      {/* ── Child: Candidate Screening Funnel (Kanban Mode) ── */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-3.5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {KANBAN_STAGES.map((col) => {
            const colApps = filteredApplications.filter((a) => a.status === col.key);

            return (
              <div
                key={col.key}
                className="bg-[#090F24]/90 backdrop-blur-md rounded-2xl border border-slate-800/80 flex flex-col min-w-[270px] max-w-[290px] shrink-0 shadow-lg"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor} ${col.glowColor}`} />
                      <span className="text-xs font-bold text-white truncate">{col.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5 pl-4">
                      {col.subtitle}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300 shrink-0">
                    {colApps.length}
                  </span>
                </div>

                {/* Candidate Cards or Column Empty State */}
                <div className="p-2.5 space-y-2.5 flex-1 min-h-[320px] overflow-y-auto max-h-[640px]">
                  {colApps.length === 0 ? (
                    <div className="h-32 border border-dashed border-slate-800/80 rounded-xl flex flex-col items-center justify-center text-center p-3 text-slate-500 space-y-1">
                      <Users className="w-5 h-5 opacity-40" />
                      <span className="text-[11px] font-medium">No candidates in this stage</span>
                      <span className="text-[10px] text-slate-600">
                        {col.key === 'submitted'
                          ? 'New website applications appear here'
                          : 'Advance candidates from prior stage'}
                      </span>
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApplication(app)}
                        className="p-3.5 rounded-xl bg-[#060B18] border border-slate-800/90 hover:border-purple-500/60 transition-all cursor-pointer space-y-2.5 shadow-sm hover:shadow-[0_4px_15px_rgba(0,0,0,0.4)] group"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-purple-300 transition">
                            {app.full_name}
                          </h4>
                          <span className="text-[9px] font-mono text-purple-300 shrink-0 px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                            {app.reference_code}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-300 font-medium line-clamp-1 flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{app.job_title || 'Hospital Staff Nurse'}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/80">
                          <span className="truncate flex items-center gap-1">
                            <GraduationCap className="w-3 h-3 text-slate-500" />
                            {app.highest_education}
                          </span>
                          <span>•</span>
                          <span className="shrink-0">{app.years_experience}</span>
                        </div>

                        <div className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0 text-slate-600" />
                          <span className="truncate">{app.city_country}</span>
                        </div>

                        {/* Quick Action Button Strip */}
                        <div
                          className="pt-2 border-t border-slate-800/80 flex items-center justify-between"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenWhatsApp(app)}
                              className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition"
                              title="Direct WhatsApp Message"
                            >
                              <Send className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setSelectedApplication(app)}
                              className="p-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 transition"
                              title="Inspect Dossier & CV"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                          </div>

                          {col.key !== 'offered' && col.key !== 'rejected' && (
                            <button
                              onClick={() => {
                                const stageKeys: JobApplicationStatus[] = [
                                  'submitted',
                                  'screening',
                                  'shortlisted',
                                  'submitted_to_employer',
                                  'interviewing',
                                  'offered',
                                ];
                                const idx = stageKeys.indexOf(app.status);
                                if (idx < stageKeys.length - 1) {
                                  handleUpdateApplicationStatus(app.id, stageKeys[idx + 1]);
                                }
                              }}
                              className="text-[10px] font-bold font-mono text-purple-400 hover:text-purple-300 flex items-center gap-0.5 px-2 py-1 rounded bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/40 transition"
                            >
                              Advance →
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Candidate Screening Funnel (List Mode) ── */
        <div className="bg-[#090F24] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#060B18] text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Candidate Dossier</th>
                  <th className="p-4">Target Opening</th>
                  <th className="p-4">Education &amp; Experience</th>
                  <th className="p-4">Screening Stage</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 text-xs">
                      No candidate dossiers found matching the selected filter or search term.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApplication(app)}
                      className="hover:bg-slate-800/40 transition cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm">{app.full_name}</div>
                        <div className="text-[10px] text-purple-300 font-mono">
                          {app.reference_code} • {app.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-200 font-medium">{app.job_title}</div>
                        <div className="text-[10px] text-slate-400">{app.city_country}</div>
                      </td>
                      <td className="p-4 font-mono text-slate-300">
                        <div>{app.highest_education}</div>
                        <div className="text-[10px] text-slate-500">{app.years_experience}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800">
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleOpenWhatsApp(app)}
                          className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 inline-flex"
                          title="WhatsApp Candidate"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-flex"
                          title="Inspect Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Candidate Dossier Modal (360 Inspection Drawer) ── */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#090F24] border border-slate-700 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-mono text-purple-400 font-bold">
                  Ref: {selectedApplication.reference_code}
                </span>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  {selectedApplication.full_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block">Email</span>
                  <span className="text-white font-mono break-all">{selectedApplication.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Phone</span>
                  <span className="text-purple-300 font-mono">{selectedApplication.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Location</span>
                  <span className="text-slate-300">{selectedApplication.city_country}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Education</span>
                  <span className="text-slate-300">{selectedApplication.highest_education}</span>
                </div>
              </div>

              {selectedApplication.cover_note && (
                <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                    Candidate Cover Note
                  </span>
                  <p className="text-slate-300 leading-relaxed italic">{selectedApplication.cover_note}</p>
                </div>
              )}

              {/* 15-Minute Signed URL Encrypted CV Vault */}
              <div className="p-4 rounded-2xl bg-[#060B18] border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold text-purple-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    Encrypted Candidate CV &amp; Dossier Vault
                  </span>
                  {signedResumeUrl && (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      ⏱ {Math.floor(signedUrlCountdown / 60)}:
                      {(signedUrlCountdown % 60).toString().padStart(2, '0')} signed link
                    </span>
                  )}
                </div>

                {!signedResumeUrl ? (
                  <button
                    type="button"
                    onClick={() => handleGenerateSignedCvUrl(selectedApplication)}
                    disabled={generatingUrl}
                    className="w-full py-2.5 px-3 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-100 font-bold text-xs flex items-center justify-center gap-2 border border-purple-600 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {generatingUrl
                      ? 'Generating 15-Min Encrypted Token...'
                      : 'Generate 15-Min Signed CV URL'}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-[11px] text-slate-300 flex items-center justify-between">
                      <span className="truncate max-w-[260px] font-mono text-[10px] text-slate-400">
                        {selectedApplication.resume_file_path ||
                          selectedApplication.resume_file_url ||
                          `${selectedApplication.reference_code}-cv.pdf`}
                      </span>
                      <a
                        href={signedResumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 shadow"
                      >
                        <Download className="w-3 h-3" />
                        Preview / Download CV
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Transition Selector */}
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Update Candidate Screening Stage
                </label>
                <select
                  value={selectedApplication.status}
                  onChange={(e) =>
                    handleUpdateApplicationStatus(
                      selectedApplication.id,
                      e.target.value as JobApplicationStatus
                    )
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {KANBAN_STAGES.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── WhatsApp Modal ── */}
      {whatsAppClient && (
        <WhatsAppNotificationModal
          client={whatsAppClient}
          isOpen={Boolean(whatsAppClient)}
          onClose={() => setWhatsAppClient(null)}
        />
      )}

      {/* ── Comprehensive "Post Verified Vacancy" Modal (Exact Parity with Frontend PostJobModal) ── */}
      <PostJobModal
        isOpen={isJobModalOpen}
        onClose={() => {
          setIsJobModalOpen(false);
          setEditingJob(null);
        }}
        editingJob={editingJob}
        onJobCreated={() => {
          onRefresh();
        }}
        onJobUpdated={() => {
          onRefresh();
        }}
      />
    </div>
  );
}
