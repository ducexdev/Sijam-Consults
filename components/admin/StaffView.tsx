'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  Lock,
  Check,
  X,
  AlertCircle,
  Eye,
  Plus,
  KeyRound,
  Trash2,
  Power,
  Search,
  Filter,
  UserCheck,
  UserX,
  RefreshCw,
} from 'lucide-react';
import { ProfileRecord, AdminRole } from '@/lib/types/database';
import {
  ROLE_PERMISSIONS,
  Permission,
  getRoleBadgeColor,
  formatRoleLabel,
} from '@/lib/auth/permissions';
import {
  adminCreateStaff,
  adminUpdateStaff,
  adminDeleteStaff,
  adminResetStaffPassword,
  adminToggleStaffStatus,
} from '@/app/actions/staff';

interface StaffViewProps {
  staffList: ProfileRecord[];
  onRefresh: () => void;
}

export function StaffView({ staffList, onRefresh }: StaffViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<ProfileRecord | null>(null);

  // New staff form state
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('consultation_manager');
  const [newDepartment, setNewDepartment] = useState('Consular Advisory Desk');
  const [newPhone, setNewPhone] = useState('+234 706 422 9556');
  const [newPassword, setNewPassword] = useState('SijamStaff@2026!');

  // Reset password form state
  const [resetNewPass, setResetNewPass] = useState('SijamReset@2026!');

  const roles: AdminRole[] = [
    'super_admin',
    'admin',
    'consultation_manager',
    'recruitment_manager',
    'content_editor',
    'reviewer_moderator',
  ];

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      searchTerm === '' ||
      s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.department || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg(null);

    try {
      const res = await adminCreateStaff({
        fullName: newFullName,
        email: newEmail,
        role: newRole,
        department: newDepartment,
        phone: newPhone,
        password: newPassword,
      });

      if (res.success) {
        setSuccessMsg(res.message || 'Staff profile created successfully.');
        setShowAddModal(false);
        setNewFullName('');
        setNewEmail('');
        onRefresh();
      } else {
        setErrorMsg(res.message || 'Failed to create staff account.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('A server error occurred while creating staff account.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRoleChange = async (staffId: string, role: AdminRole) => {
    setLoadingId(staffId);
    setErrorMsg(null);
    try {
      const res = await adminUpdateStaff(staffId, { role });
      if (res.success) {
        setSuccessMsg('Staff role updated and permission privileges refreshed.');
        setTimeout(() => setSuccessMsg(null), 3000);
        onRefresh();
      } else {
        setErrorMsg(res.message);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Failed to update role.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleStatus = async (staff: ProfileRecord) => {
    setLoadingId(staff.id);
    setErrorMsg(null);
    try {
      const res = await adminToggleStaffStatus(staff.id);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => setSuccessMsg(null), 3000);
        onRefresh();
      } else {
        setErrorMsg(res.message);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Failed to toggle status.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteStaff = async (staff: ProfileRecord) => {
    if (!confirm(`Are you sure you want to permanently delete staff account for ${staff.full_name} (${staff.email})? This action is logged.`)) {
      return;
    }

    setLoadingId(staff.id);
    setErrorMsg(null);
    try {
      const res = await adminDeleteStaff(staff.id);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => setSuccessMsg(null), 3000);
        onRefresh();
      } else {
        setErrorMsg(res.message);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Failed to delete staff.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;
    setActionLoading(true);
    setErrorMsg(null);

    try {
      const res = await adminResetStaffPassword(selectedStaff.id, resetNewPass);
      if (res.success) {
        setSuccessMsg(res.message);
        setShowResetModal(false);
        setSelectedStaff(null);
        setTimeout(() => setSuccessMsg(null), 3000);
        onRefresh();
      } else {
        setErrorMsg(res.message);
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Failed to reset password.');
    } finally {
      setActionLoading(false);
    }
  };

  const capabilityMatrix: { category: string; permissions: { label: string; perm: Permission }[] }[] = [
    {
      category: 'Consultation Intake Engine',
      permissions: [
        { label: 'View client inquiries', perm: 'consultations:view' },
        { label: 'Assign case officers', perm: 'consultations:assign' },
        { label: 'Update triage status & notes', perm: 'consultations:update_status' },
        { label: 'Schedule appointments', perm: 'consultations:schedule' },
        { label: 'Export consultation roster (CSV)', perm: 'consultations:export' },
      ],
    },
    {
      category: 'Recruitment & Job Desk',
      permissions: [
        { label: 'View job listings', perm: 'jobs:view' },
        { label: 'Create & edit job listings', perm: 'jobs:create' },
        { label: 'Pause / close job postings', perm: 'jobs:close' },
        { label: 'Manage employer partners', perm: 'jobs:manage_employers' },
      ],
    },
    {
      category: 'Candidate Dossiers & PII',
      permissions: [
        { label: 'View candidate applications', perm: 'applications:view' },
        { label: 'Consular vetting & review', perm: 'applications:review' },
        { label: 'Download candidate CVs (Signed URL)', perm: 'applications:download_cv' },
        { label: 'Pipeline status transition', perm: 'applications:update_status' },
        { label: 'Export applicant dossiers (CSV)', perm: 'applications:export' },
      ],
    },
    {
      category: 'Reputation & Social Proof',
      permissions: [
        { label: 'View review queues', perm: 'testimonials:view' },
        { label: 'Moderate (Approve/Reject) reviews', perm: 'testimonials:moderate' },
        { label: 'Create verified review', perm: 'testimonials:create_verified' },
      ],
    },
    {
      category: 'Content, CMS & Media',
      permissions: [
        { label: 'Create & edit articles / guides', perm: 'content:create' },
        { label: 'Publish articles to public web', perm: 'content:publish' },
        { label: 'Upload public media assets', perm: 'media:upload' },
      ],
    },
    {
      category: 'System Governance & Security',
      permissions: [
        { label: 'Manage 308 redirects map', perm: 'redirects:manage' },
        { label: 'Test cPanel SMTP relay', perm: 'smtp:test' },
        { label: 'Provision, delete, reset staff credentials', perm: 'users:manage_roles' },
        { label: 'Inspect system audit trail', perm: 'audit_logs:view' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Staff Credentialing • RBAC Access Management
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Staff Directory & Access Control
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#257CFF] hover:opacity-95 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Staff</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search staff by full name, email, or department..."
            className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
          />
        </div>

        <div className="relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="all">All Roles ({staffList.length})</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {formatRoleLabel(r)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            Authorized Officers ({filteredStaff.length} of {staffList.length})
          </h3>
          <span className="text-[11px] text-slate-400">
            Real-time permissions synced across active sessions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Staff Member</th>
                <th className="p-4">Department</th>
                <th className="p-4">Current Role</th>
                <th className="p-4">Account Status</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No staff members match the selected search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((s) => {
                  const badge = getRoleBadgeColor(s.role);
                  const isBusy = loadingId === s.id;

                  return (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4">
                        <div className="font-semibold text-white">{s.full_name}</div>
                        <div className="text-[10px] text-purple-300 font-mono mt-0.5">{s.email}</div>
                        {s.phone && <div className="text-[10px] text-slate-500 font-mono">{s.phone}</div>}
                      </td>

                      <td className="p-4 text-slate-300">
                        {s.department || 'Consular Operations'}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {formatRoleLabel(s.role)}
                          </span>
                          <select
                            disabled={isBusy}
                            value={s.role}
                            onChange={(e) => handleRoleChange(s.id, e.target.value as AdminRole)}
                            aria-label={`Change role for ${s.full_name}`}
                            className="px-2 py-1 bg-slate-900 border border-slate-700/80 rounded-lg text-[11px] text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
                          >
                            {roles.map((r) => (
                              <option key={r} value={r}>
                                {formatRoleLabel(r)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            s.is_active
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                              : 'bg-red-950/80 text-red-300 border border-red-800'
                          }`}
                        >
                          {s.is_active ? <UserCheck className="w-3 h-3 text-emerald-400" /> : <UserX className="w-3 h-3 text-red-400" />}
                          {s.is_active ? 'Active' : 'Suspended'}
                        </span>
                      </td>

                      <td className="p-4 text-slate-400 text-[11px] font-mono">
                        {s.last_login_at
                          ? new Date(s.last_login_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                          : 'Never'}
                      </td>

                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        {/* Reset Password */}
                        <button
                          onClick={() => {
                            setSelectedStaff(s);
                            setShowResetModal(true);
                          }}
                          disabled={isBusy}
                          title="Reset Password"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition cursor-pointer"
                        >
                          <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                        </button>

                        {/* Toggle Suspend / Active */}
                        <button
                          onClick={() => handleToggleStatus(s)}
                          disabled={isBusy}
                          title={s.is_active ? 'Suspend Account' : 'Reactivate Account'}
                          className={`p-1.5 rounded-lg border text-xs transition cursor-pointer ${
                            s.is_active
                              ? 'bg-amber-950/60 hover:bg-amber-900 border-amber-800 text-amber-300'
                              : 'bg-emerald-950/60 hover:bg-emerald-900 border-emerald-800 text-emerald-300'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Staff */}
                        <button
                          onClick={() => handleDeleteStaff(s)}
                          disabled={isBusy}
                          title="Delete Staff Member"
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Complete RBAC Permissions Matrix */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden space-y-2">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            Granular Role-Based Access Control (RBAC) Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified permissions enforced via server actions and database authorization checks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4 w-72">Operational Capability</th>
                {roles.map((r) => (
                  <th key={r} className="p-4 text-center font-mono">
                    <span className="block text-[10px] leading-tight text-slate-300">
                      {formatRoleLabel(r)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {capabilityMatrix.map((cat) => (
                <React.Fragment key={cat.category}>
                  <tr className="bg-slate-900/60 font-semibold text-purple-300 text-[11px]">
                    <td colSpan={7} className="px-4 py-2 uppercase tracking-wider font-mono">
                      {cat.category}
                    </td>
                  </tr>
                  {cat.permissions.map((p) => (
                    <tr key={p.perm} className="hover:bg-slate-800/30">
                      <td className="p-3 pl-6 text-slate-200">{p.label}</td>
                      {roles.map((r) => {
                        const hasPerm = ROLE_PERMISSIONS[r].includes(p.perm);
                        return (
                          <td key={r} className="p-3 text-center">
                            {hasPerm ? (
                              <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                            ) : (
                              <span className="text-slate-600 block text-xs">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Staff Member */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Provision New Staff Profile
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="e.g. Ibrahim Emmanuel"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Staff Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="name@sijamconsults.com"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Assigned Role *
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as AdminRole)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {formatRoleLabel(r)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="e.g. Consular Advisory Desk"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Initial Password *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition cursor-pointer"
                >
                  {actionLoading ? 'Creating Profile...' : 'Save & Provision Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Staff Password */}
      {showResetModal && selectedStaff && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-purple-400" />
                Reset Password for {selectedStaff.full_name}
              </h3>
              <button
                onClick={() => {
                  setShowResetModal(false);
                  setSelectedStaff(null);
                }}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Specify a new temporary password for <strong>{selectedStaff.email}</strong>. The staff member can update it upon their next sign-in.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  New Password (Min 8 Characters)
                </label>
                <input
                  type="text"
                  required
                  value={resetNewPass}
                  onChange={(e) => setResetNewPass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false);
                    setSelectedStaff(null);
                  }}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition cursor-pointer"
                >
                  {actionLoading ? 'Updating...' : 'Set Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
