'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Edit3,
  PauseCircle,
  PlayCircle,
  XCircle,
  X,
  Trash2,
} from 'lucide-react';
import {
  JobRecord,
  JobStatus,
  JobCategoryRecord,
  EmployerRecord,
} from '@/lib/types/database';
import {
  apiCreateJob as adminCreateJob,
  apiUpdateJob as adminUpdateJob,
  apiDeleteJob as adminDeleteJob,
} from '@/lib/api/jobs-client';

interface JobsViewProps {
  jobs: JobRecord[];
  categories: JobCategoryRecord[];
  employers: EmployerRecord[];
  onRefresh: () => void;
}

export function JobsView({
  jobs,
  categories,
  employers,
  onRefresh,
}: JobsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [editingJob, setEditingJob] = useState<JobRecord | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [employerId, setEmployerId] = useState(employers[0]?.id || 'emp-01');
  const [categoryId, setCategoryId] = useState('healthcare');
  const [country, setCountry] = useState('Poland');
  const [location, setLocation] = useState('Warsaw / Kraków, Poland');
  const [employmentType, setEmploymentType] = useState<'Full-time' | 'Contract' | 'Seasonal' | 'Apprenticeship'>('Full-time');
  const [salaryRange, setSalaryRange] = useState('€1,600 - €2,200 / month Net');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('Deliver quality professional care\nComply with EU workplace safety');
  const [requirementsText, setRequirementsText] = useState('B.Sc. Nursing or relevant diploma\nMinimum 1 year clinical experience\nBasic English proficiency (B1)');
  const [visaSupportDetails, setVisaSupportDetails] = useState('Full employer Polish Voivodeship work permit sponsorship included.');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [status, setStatus] = useState<JobStatus>('open');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = jobs.filter((j) => {
    const matchesSearch =
      searchTerm === '' ||
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.employer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setResponsibilitiesText('');
    setRequirementsText('');
    setSuccessMsg(null);
    setEditingJob(null);
  };

  const handleOpenEdit = (job: JobRecord) => {
    setEditingJob(job);
    setTitle(job.title);
    setEmployerId(job.employer_id);
    setCategoryId(job.category_id);
    setCountry(job.country);
    setLocation(job.location);
    setEmploymentType(job.employment_type);
    setSalaryRange(job.salary_range || '');
    setDescription(job.description);
    setResponsibilitiesText(job.responsibilities.join('\n'));
    setRequirementsText(job.eligibility_requirements.join('\n'));
    setVisaSupportDetails(job.visa_support_details);
    setDeadline(job.deadline);
    setStatus(job.status);
    setIsCreatingJob(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedEmployer = employers.find((e) => e.id === employerId);
      const employerName = selectedEmployer ? selectedEmployer.name : 'Verified European Partner';
      const responsibilities = responsibilitiesText.split('\n').filter((l) => l.trim().length > 0);
      const eligibilityRequirements = requirementsText.split('\n').filter((l) => l.trim().length > 0);

      if (editingJob) {
        await adminUpdateJob(editingJob.id, {
          title,
          employer_id: employerId,
          employer_name: employerName,
          category_id: categoryId,
          country,
          location,
          employment_type: employmentType,
          salary_range: salaryRange,
          description,
          responsibilities,
          eligibility_requirements: eligibilityRequirements,
          visa_support_details: visaSupportDetails,
          deadline,
          status,
          accepts_applications: status === 'open' || status === 'closing_soon',
        });
        setSuccessMsg('Job listing successfully updated.');
      } else {
        await adminCreateJob({
          title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          employerId,
          employerName,
          categoryId,
          country,
          location,
          employmentType,
          salaryRange,
          description,
          responsibilities,
          eligibilityRequirements,
          visaSupportDetails,
          applicationInstructions: 'Apply through the Sijam Consults recruitment portal with your CV and credentials.',
          deadline,
          status,
          acceptsApplications: status === 'open' || status === 'closing_soon',
        });
        setSuccessMsg('New verified job listing published successfully.');
      }

      setTimeout(() => {
        setIsCreatingJob(false);
        resetForm();
        onRefresh();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (job: JobRecord, newSt: JobStatus) => {
    try {
      await adminUpdateJob(job.id, {
        status: newSt,
        accepts_applications: newSt === 'open' || newSt === 'closing_soon',
      });
      onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteJob = async (job: JobRecord) => {
    if (!confirm(`Are you sure you want to permanently delete "${job.title}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await adminDeleteJob(job.id);
      onRefresh();
    } catch (e) {
      console.error(e);
      alert('Failed to delete job listing.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
            Recruitment Desk • Verified Employer Partnerships
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Job Listings Management
          </h1>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsCreatingJob(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Job Listing
        </button>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job title, location, or verified employer..."
            className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses ({jobs.length})</option>
            <option value="open">Open (Accepting Applications)</option>
            <option value="closing_soon">Closing Soon</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Position Title</th>
                <th className="p-4">Employer & Destination</th>
                <th className="p-4">Remuneration</th>
                <th className="p-4">Applications</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No job listings found.
                  </td>
                </tr>
              ) : (
                filtered.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="font-semibold text-white text-sm">{job.title}</div>
                      <div className="text-[10px] text-purple-300 font-mono">
                        {job.employment_type} • Category: {job.category_id}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-200 font-medium">{job.employer_name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" /> {job.location}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-emerald-400">
                      {job.salary_range || 'Competitive / Neg.'}
                    </td>
                    <td className="p-4 font-mono">
                      <span className="font-bold text-white">{job.application_count}</span>
                      <span className="text-[10px] text-slate-500 ml-1">profiles</span>
                    </td>
                    <td className="p-4 text-slate-400 font-mono">
                      {job.deadline}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          job.status === 'open'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : job.status === 'closing_soon'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : job.status === 'paused'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {job.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-medium transition"
                      >
                        Edit
                      </button>

                      {job.status === 'open' ? (
                        <button
                          onClick={() => handleToggleStatus(job, 'paused')}
                          title="Pause Applications"
                          className="px-2 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-800 text-amber-300 text-[11px] transition"
                        >
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(job, 'open')}
                          title="Reopen Job"
                          className="px-2 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-[11px] transition"
                        >
                          Open
                        </button>
                      )}

                      <a
                        href={`/jobs/${job.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block p-1 text-slate-400 hover:text-white"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleDeleteJob(job)}
                        title="Delete Job Listing"
                        className="p-1 text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create or Edit Job Listing */}
      {isCreatingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingJob ? 'Edit Job Listing' : 'Create Verified Job Listing'}
              </h3>
              <button
                onClick={() => {
                  setIsCreatingJob(false);
                  resetForm();
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Job Position Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Registered General Nurse (EU Hospital Placement)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Verified Employer
                  </label>
                  <select
                    value={employerId}
                    onChange={(e) => setEmployerId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {employers.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.country})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Job Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Location & Destination
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Remuneration / Net Salary
                  </label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="e.g. €1,600 - €2,200 / month Net"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as JobStatus)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="open">Open (Live & Accepting)</option>
                    <option value="closing_soon">Closing Soon</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Job Description & Scope
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description of the opportunity..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Core Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={responsibilitiesText}
                    onChange={(e) => setResponsibilitiesText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Eligibility Requirements (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsText}
                    onChange={(e) => setRequirementsText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Visa & Work Permit Support Protocol
                </label>
                <input
                  type="text"
                  value={visaSupportDetails}
                  onChange={(e) => setVisaSupportDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[10px] text-purple-300">
                Notice: Statutory disclaimer (&quot;Sijam Consults Limited facilitates candidate file preparation and consular filing protocols; we do not guarantee employment outcomes&quot;) will be automatically embedded.
              </div>

              {successMsg && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {successMsg}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingJob(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition"
                >
                  {loading ? 'Saving...' : editingJob ? 'Update Job Listing' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
