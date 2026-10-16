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
} from 'lucide-react';
import {
  JobApplicationRecord,
  JobApplicationStatus,
  JobRecord,
} from '@/lib/types/database';
import { apiUpdateApplicationStatus as adminUpdateApplicationStatus } from '@/lib/api/jobs-client';

interface ApplicationsViewProps {
  applications: JobApplicationRecord[];
  jobs: JobRecord[];
  onRefresh: () => void;
}

export function ApplicationsView({
  applications,
  jobs,
  onRefresh,
}: ApplicationsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<JobApplicationRecord | null>(null);

  // Status transition state
  const [newStatus, setNewStatus] = useState<JobApplicationStatus>('screening');
  const [recruiterNote, setRecruiterNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = applications.filter((app) => {
    const matchesSearch =
      searchTerm === '' ||
      app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.reference_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.job_title || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesJob = jobFilter === 'all' || app.job_id === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    setLoading(true);
    try {
      await adminUpdateApplicationStatus(selectedApp.id, newStatus, recruiterNote);
      setSuccessMsg('Candidate status updated and audit entry recorded.');
      setTimeout(() => {
        setSuccessMsg(null);
        setSelectedApp(null);
        onRefresh();
      }, 1200);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      'Reference Code',
      'Candidate Name',
      'Job Title',
      'Email',
      'Phone',
      'Residence Country',
      'Experience (Yrs)',
      'Qualification',
      'Status',
      'Submitted At',
    ];
    const rows = filtered.map((a) => [
      a.reference_code,
      `"${a.full_name.replace(/"/g, '""')}"`,
      `"${(a.job_title || '').replace(/"/g, '""')}"`,
      a.email,
      a.phone,
      a.city_country,
      a.years_experience,
      `"${a.highest_education.replace(/"/g, '""')}"`,
      a.status,
      a.created_at,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `sijam_candidate_dossiers_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
            Candidate Intake & Consular Vetting Desk
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Job Candidate Dossiers
          </h1>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          Export Candidate Roster (CSV)
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate name, email, ref code (e.g. APP-519284)..."
            className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Screening Stages ({applications.length})</option>
            <option value="submitted">Submitted (Intake)</option>
            <option value="screening">Consular Screening</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="submitted_to_employer">Sent to EU Employer</option>
            <option value="interviewing">Interviewing</option>
            <option value="offered">Offer Extended</option>
            <option value="rejected">Unsuccessful</option>
          </select>
        </div>

        <div>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Targeted Jobs</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">App Ref</th>
                <th className="p-4">Candidate Profile</th>
                <th className="p-4">Applied Position</th>
                <th className="p-4">Experience & Edu</th>
                <th className="p-4">Anti-Guarantee Signoff</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No candidate applications match the filter.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-mono font-bold text-blue-300">
                      {app.reference_code}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{app.full_name}</div>
                      <div className="text-[11px] text-slate-400">{app.email}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {app.phone} • {app.city_country}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-medium">{app.job_title || 'Position'}</div>
                      <div className="text-[10px] text-slate-400">
                        Submitted: {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-200">
                        {app.years_experience} yrs experience
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {app.highest_education}
                      </div>
                    </td>
                    <td className="p-4">
                      {app.confirmed_no_guarantees ? (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                          <CheckCircle2 className="w-3 h-3" /> Signed
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-400">Unsigned</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          app.status === 'submitted'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : app.status === 'screening'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : app.status === 'shortlisted'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : app.status === 'offered'
                            ? 'bg-green-900 text-green-200 border border-green-600'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {app.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setNewStatus(app.status);
                          setRecruiterNote(app.internal_notes || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 border border-blue-700 text-blue-300 text-xs font-semibold transition"
                      >
                        Review Dossier &rarr;
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Dossier Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-blue-400">
                  {selectedApp.reference_code}
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  Candidate Vetting Dossier: {selectedApp.full_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Target Position</span>
                <span className="text-white font-semibold">{selectedApp.job_title || 'General Placement'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Country of Residence</span>
                <span className="text-slate-200">{selectedApp.city_country}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Email Contact</span>
                <span className="text-blue-300 font-mono">{selectedApp.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Phone / WhatsApp</span>
                <span className="text-slate-200 font-mono">{selectedApp.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Experience</span>
                <span className="text-slate-200">{selectedApp.years_experience} years verified</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Highest Qualification</span>
                <span className="text-slate-200">{selectedApp.highest_education}</span>
              </div>
            </div>

            {/* Candidate Professional Summary */}
            {selectedApp.cover_note && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-300">
                  Professional Statement & Competency Summary
                </span>
                <p className="text-xs text-slate-200 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  {selectedApp.cover_note}
                </p>
              </div>
            )}

            {/* Curriculum Vitae Storage Reference */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-white font-semibold">Candidate CV Document</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Storage: applicant-documents/{selectedApp.resume_file_path || selectedApp.resume_file_url || 'resume.pdf'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-blue-300 bg-blue-900/60 px-2 py-1 rounded border border-blue-700 font-mono">
                Encrypted Signed URL
              </span>
            </div>

            {/* Statutory Compliance Notice */}
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                Candidate confirmed statutory acknowledgement: Sijam Consults Limited prepares employment dossiers and consular permits; recruitment outcomes are subject to foreign sovereign and employer authority.
              </span>
            </div>

            {/* Recruiter Action Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Recruitment Pipeline Stage
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as JobApplicationStatus)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="submitted">Submitted (New Intake)</option>
                  <option value="screening">Consular Screening & Document Audit</option>
                  <option value="shortlisted">Shortlisted for Employer Review</option>
                  <option value="submitted_to_employer">Forwarded to EU Sponsor / Voivodeship</option>
                  <option value="interviewing">Interview Scheduled</option>
                  <option value="offered">Offer / Work Permit Issued</option>
                  <option value="rejected">Application Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Recruiter Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={recruiterNote}
                  onChange={(e) => setRecruiterNote(e.target.value)}
                  placeholder="Record credentials audit notes, interview feedback, or permit tracking details..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>

              {successMsg && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {successMsg}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg transition"
                >
                  {loading ? 'Updating...' : 'Save Pipeline Transition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
