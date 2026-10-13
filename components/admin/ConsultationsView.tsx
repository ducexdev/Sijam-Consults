'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Calendar,
  UserCheck,
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  X,
  MessageSquare,
} from 'lucide-react';
import {
  ConsultationRequestRecord,
  ConsultationStatus,
  ConsultationMethod,
  ProfileRecord,
} from '@/lib/types/database';
import {
  adminUpdateConsultationStatus,
  adminAssignConsultation,
  adminScheduleAppointment,
  adminRescheduleAppointment,
  adminCancelAppointment,
} from '@/app/actions/consultations';

interface ConsultationsViewProps {
  consultations: ConsultationRequestRecord[];
  staffList: ProfileRecord[];
  onRefresh: () => void;
}

export function ConsultationsView({
  consultations,
  staffList,
  onRefresh,
}: ConsultationsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ConsultationRequestRecord | null>(null);

  // Status update modal state
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<ConsultationStatus>('contacted');
  const [internalNote, setInternalNote] = useState('');
  const [assignedStaffId, setAssignedStaffId] = useState('');

  // Schedule Appointment modal state
  const [isScheduling, setIsScheduling] = useState(false);
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('10:00');
  const [apptMethod, setApptMethod] = useState<ConsultationMethod>('google_meet');
  const [apptRoom, setApptRoom] = useState('https://meet.google.com/sjm-cons-cad');
  const [apptNotes, setApptNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Filter list
  const filtered = consultations.filter((c) => {
    const matchesSearch =
      searchTerm === '' ||
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.reference_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.applicant_objective.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setActionLoading(true);
    try {
      await adminUpdateConsultationStatus(selectedItem.id, newStatus, internalNote);
      if (assignedStaffId && assignedStaffId !== selectedItem.assigned_to) {
        await adminAssignConsultation(selectedItem.id, assignedStaffId);
      }
      setActionSuccess('Consultation status and notes updated successfully.');
      setTimeout(() => {
        setActionSuccess(null);
        setIsUpdatingStatus(false);
        setSelectedItem(null);
        onRefresh();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleScheduleAppt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !apptDate) return;
    setActionLoading(true);
    try {
      await adminScheduleAppointment({
        consultationRequestId: selectedItem.id,
        scheduledAt: `${apptDate}T${apptTime}:00Z`,
        durationMinutes: 45,
        meetingMethod: apptMethod,
        meetingLinkOrRoom: apptRoom,
        officerId: selectedItem.assigned_to || undefined,
        notes: apptNotes,
      });
      setActionSuccess(
        selectedItem.status === 'scheduled'
          ? 'Appointment rescheduled and update dispatched.'
          : 'Appointment verified, scheduled, and confirmation dispatched.'
      );
      setTimeout(() => {
        setActionSuccess(null);
        setIsScheduling(false);
        setSelectedItem(null);
        onRefresh();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelAppt = async () => {
    if (!selectedItem) return;
    setActionLoading(true);
    try {
      await adminUpdateConsultationStatus(selectedItem.id, 'cancelled', apptNotes || 'Cancelled by consular administrator');
      setActionSuccess('Appointment marked as cancelled.');
      setTimeout(() => {
        setActionSuccess(null);
        setIsScheduling(false);
        setSelectedItem(null);
        onRefresh();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      'Reference Code',
      'Full Name',
      'Email',
      'Phone',
      'Service',
      'Target Destination',
      'Method',
      'Status',
      'Assigned To',
      'Created At',
    ];
    const rows = filtered.map((c) => [
      c.reference_code,
      `"${c.full_name.replace(/"/g, '""')}"`,
      c.email,
      c.phone,
      c.service_slug,
      `"${(c.target_destination || '').replace(/"/g, '""')}"`,
      c.preferred_method,
      c.status,
      c.assigned_to || 'Unassigned',
      c.created_at,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `sijam_consultations_export_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Intake Queue • Case Officer Roster
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Consultation Enquiries Management
          </h1>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-purple-400" />
          Export Queue (CSV)
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, email, ref code (e.g. SJM-102948)..."
            className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Consultation Statuses ({consultations.length})</option>
            <option value="new">New (Unreviewed)</option>
            <option value="assigned">Assigned to Officer</option>
            <option value="contacted">Client Contacted</option>
            <option value="scheduled">Appointment Scheduled</option>
            <option value="completed">Completed / Filed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Consultations Table */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Ref Code</th>
                <th className="p-4">Client Contact</th>
                <th className="p-4">Service & Destination</th>
                <th className="p-4">Preferred Channel</th>
                <th className="p-4">Assigned Officer</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No consultation enquiries match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const assignedStaff = staffList.find((s) => s.id === item.assigned_to);

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 font-mono font-bold text-purple-300">
                        {item.reference_code}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-white">{item.full_name}</div>
                        <div className="text-[11px] text-slate-400">{item.email}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-200 capitalize">
                          {item.service_slug.replace(/-/g, ' ')}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Target: {item.target_destination || 'Global'}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[10px] text-slate-300 font-mono">
                          {item.preferred_method}
                        </span>
                        {item.preferred_date && (
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {item.preferred_date} ({item.preferred_time_slot || 'Anytime'})
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {assignedStaff ? (
                          <div className="text-slate-200 font-medium">
                            {assignedStaff.full_name}
                          </div>
                        ) : (
                          <span className="text-[10px] text-rose-400 italic">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            item.status === 'new'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : item.status === 'assigned'
                              ? 'bg-blue-950 text-blue-300 border border-blue-800'
                              : item.status === 'scheduled'
                              ? 'bg-purple-950 text-purple-300 border border-purple-800'
                              : item.status === 'completed'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setNewStatus(item.status);
                            setAssignedStaffId(item.assigned_to || '');
                            setInternalNote(item.internal_notes || '');
                            setIsUpdatingStatus(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-purple-300 text-[11px] font-semibold transition"
                        >
                          Triage & Notes
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            if (item.preferred_date) setApptDate(item.preferred_date);
                            setIsScheduling(true);
                          }}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition cursor-pointer ${
                            item.status === 'scheduled'
                              ? 'bg-blue-950/80 hover:bg-blue-900 border-blue-700 text-blue-300'
                              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                          }`}
                        >
                          {item.status === 'scheduled' ? 'Reschedule' : 'Verify & Schedule'}
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

      {/* Modal: Triage & Update Status */}
      {isUpdatingStatus && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-purple-400">
                  {selectedItem.reference_code}
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  Triage Client Enquiry
                </h3>
              </div>
              <button
                onClick={() => setIsUpdatingStatus(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Context Box */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <span className="font-semibold text-white">{selectedItem.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-purple-300">{selectedItem.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-slate-300">{selectedItem.phone}</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block mb-1">Applicant Objective:</span>
                <p className="text-slate-200 bg-slate-950/60 p-2 rounded border border-slate-800/80 leading-relaxed">
                  {selectedItem.applicant_objective}
                </p>
              </div>
              {selectedItem.conditional_data && typeof selectedItem.conditional_data === 'object' && Object.keys(selectedItem.conditional_data).length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Service Qualifications Profile:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 bg-slate-950/60 p-2.5 rounded border border-slate-800/80 text-[11px]">
                    {Object.entries(selectedItem.conditional_data).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                        <span className="text-purple-300 font-medium">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Enquiry Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ConsultationStatus)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="submitted">Submitted (Awaiting Triage)</option>
                    <option value="received">Received / Logged</option>
                    <option value="assigned">Assigned to Officer</option>
                    <option value="in_progress">In Progress / Assessment</option>
                    <option value="awaiting_customer">Awaiting Customer Response</option>
                    <option value="scheduled">Scheduled / Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="closed">Closed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Assigned Officer
                  </label>
                  <select
                    value={assignedStaffId}
                    onChange={(e) => setAssignedStaffId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">-- Unassigned --</option>
                    {staffList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.full_name} ({s.role.replace('_', ' ')})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Internal Notes & Strategy
                </label>
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Record consular assessment findings, POF readiness, or next action..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 placeholder-slate-500"
                />
              </div>

              {actionSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {actionSuccess}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUpdatingStatus(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition"
                >
                  {actionLoading ? 'Saving...' : 'Save Updates'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Schedule Appointment */}
      {isScheduling && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-purple-400">
                  {selectedItem.reference_code}
                </span>
                <h3 className="font-heading font-bold text-lg text-white">
                  {selectedItem.status === 'scheduled'
                    ? 'Reschedule Confirmed Appointment'
                    : 'Verify Availability & Schedule Session'}
                </h3>
              </div>
              <button
                onClick={() => setIsScheduling(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleAppt} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={apptDate}
                    onChange={(e) => setApptDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={apptTime}
                    onChange={(e) => setApptTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Meeting Medium
                </label>
                <select
                  value={apptMethod}
                  onChange={(e) => setApptMethod(e.target.value as ConsultationMethod)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="google_meet">Google Meet (Online Video)</option>
                  <option value="whatsapp_video">WhatsApp Video Call</option>
                  <option value="phone_call">Direct Phone Call</option>
                  <option value="in_person_kaduna">In-Person (Kaduna Consular Hub)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Meeting Link or Physical Room
                </label>
                <input
                  type="text"
                  value={apptRoom}
                  onChange={(e) => setApptRoom(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Session Brief / Instructions
                </label>
                <textarea
                  rows={2}
                  value={apptNotes}
                  onChange={(e) => setApptNotes(e.target.value)}
                  placeholder="Please have academic transcripts or CV handy..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 placeholder-slate-500"
                />
              </div>

              {actionSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {actionSuccess}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                {selectedItem.status === 'scheduled' ? (
                  <button
                    type="button"
                    onClick={handleCancelAppt}
                    disabled={actionLoading}
                    className="px-3 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold transition cursor-pointer"
                  >
                    Cancel Consultation
                  </button>
                ) : <div />}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsScheduling(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition cursor-pointer"
                  >
                    {actionLoading
                      ? 'Dispatching...'
                      : selectedItem.status === 'scheduled'
                      ? 'Confirm Reschedule'
                      : 'Confirm & Dispatch Notice'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
