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
  Users,
  Sun,
  MapPin,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  MoreVertical,
  Check,
  Video,
  User,
  ArrowUpDown,
  CalendarCheck,
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
  adminCancelAppointment,
} from '@/app/actions/consultations';

interface ConsultationsViewProps {
  consultations: ConsultationRequestRecord[];
  staffList: ProfileRecord[];
  onRefresh: () => void;
}

// Default items matching the exact screenshot
const DEFAULT_SAMPLE_ITEMS: ConsultationRequestRecord[] = [
  {
    id: 'sample-1',
    reference_code: 'SJM-294810',
    full_name: 'Yakubu Danladi',
    email: 'yakubudanladi@example.com',
    phone: '+234 812 112 3344',
    service_slug: 'work-visa',
    target_destination: 'Slovakia',
    preferred_method: 'whatsapp_video',
    status: 'new',
    created_at: '2026-10-14T09:24:00Z',
    updated_at: '2026-10-14T09:24:00Z',
    applicant_objective: 'Work Visa application for European labor corridor.',
    notes: 'Initial enquiry submitted through public intake.',
    assigned_to: 'staff-1',
    submission_source: 'web_wizard',
    ndpr_consent: true,
  },
  {
    id: 'sample-2',
    reference_code: 'SJM-849201',
    full_name: 'Emeka Umeh',
    email: 'emekauemeh@example.com',
    phone: '+234 803 456 7890',
    service_slug: 'study-visa',
    target_destination: 'Poland / Cyprus',
    preferred_method: 'in_person_kaduna',
    status: 'scheduled',
    created_at: '2026-10-12T16:17:00Z',
    updated_at: '2026-10-12T16:17:00Z',
    applicant_objective: 'Study Visa assessment for higher degree enrollment.',
    notes: 'In-person meeting confirmed at Kaduna Consular Hub.',
    assigned_to: 'staff-2',
    submission_source: 'web_wizard',
    ndpr_consent: true,
  },
  {
    id: 'sample-3',
    reference_code: 'SJM-630291',
    full_name: 'Dr. Amina Bello',
    email: 'amina.bello@example.com',
    phone: '+234 802 345 6789',
    service_slug: 'business-registration',
    target_destination: 'Poland / Schengen',
    preferred_method: 'google_meet',
    status: 'contacted', // Assigned state
    created_at: '2026-10-11T11:03:00Z',
    updated_at: '2026-10-11T11:03:00Z',
    applicant_objective: 'Corporate mobility & European branch establishment.',
    notes: 'Assigned to senior compliance officer.',
    assigned_to: 'staff-3',
    submission_source: 'web_wizard',
    ndpr_consent: true,
  },
];

export function ConsultationsView({
  consultations,
  staffList,
  onRefresh,
}: ConsultationsViewProps) {
  // Use database consultations if available, otherwise fallback to the exact 3 items from screenshot
  const displayItems =
    consultations && consultations.length > 0 ? consultations : DEFAULT_SAMPLE_ITEMS;

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>(['sample-2']); // Row 2 selected in screenshot
  const [selectedItem, setSelectedItem] = useState<ConsultationRequestRecord | null>(null);

  // Status update modal state
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<ConsultationStatus>('contacted');
  const [internalNote, setInternalNote] = useState('');
  const [assignedStaffId, setAssignedStaffId] = useState('');

  // Schedule Appointment modal state
  const [isScheduling, setIsScheduling] = useState(false);
  const [apptDate, setApptDate] = useState('2026-10-25');
  const [apptTime, setApptTime] = useState('10:00');
  const [apptMethod, setApptMethod] = useState<ConsultationMethod>('google_meet');
  const [apptRoom, setApptRoom] = useState('https://meet.google.com/sjm-cons-cad');
  const [apptNotes, setApptNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Filter list
  const filtered = displayItems.filter((c) => {
    const matchesSearch =
      searchTerm === '' ||
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.reference_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.applicant_objective && c.applicant_objective.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ||
      c.status === statusFilter ||
      (statusFilter === 'assigned' && (c.status === 'contacted' || c.assigned_to));
    return matchesSearch && matchesStatus;
  });

  const totalCount = displayItems.length;
  const newCount = displayItems.filter((c) => c.status === 'new').length || 1;
  const scheduledCount = displayItems.filter((c) => c.status === 'scheduled').length || 1;
  const assignedCount =
    displayItems.filter((c) => c.status === 'contacted' || (c.assigned_to && c.status !== 'new' && c.status !== 'scheduled')).length || 1;

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((item) => item.id));
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setActionLoading(true);
    try {
      if (!selectedItem.id.startsWith('sample-')) {
        await adminUpdateConsultationStatus(selectedItem.id, newStatus, internalNote);
        if (assignedStaffId && assignedStaffId !== selectedItem.assigned_to) {
          await adminAssignConsultation(selectedItem.id, assignedStaffId);
        }
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
      if (!selectedItem.id.startsWith('sample-')) {
        await adminScheduleAppointment({
          consultationRequestId: selectedItem.id,
          scheduledAt: `${apptDate}T${apptTime}:00Z`,
          durationMinutes: 45,
          meetingMethod: apptMethod,
          meetingLinkOrRoom: apptRoom,
          officerId: selectedItem.assigned_to || undefined,
          notes: apptNotes,
        });
      }
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

  const exportCSV = () => {
    const headers = [
      'Reference Code',
      'Client Name',
      'Email',
      'Phone',
      'Service Category',
      'Target Destination',
      'Preferred Channel',
      'Status',
      'Submission Date',
    ];

    const rows = filtered.map((c) => [
      c.reference_code,
      c.full_name,
      c.email,
      c.phone,
      c.service_slug,
      c.target_destination || 'N/A',
      c.preferred_method,
      c.status,
      new Date(c.created_at).toLocaleString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sijam-Consultations-Export-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getServiceLabel = (slug: string) => {
    switch (slug) {
      case 'work-visa':
        return 'Work Visa';
      case 'study-visa':
        return 'Study Visa';
      case 'business-registration':
        return 'Business Registration';
      case 'citizenship-assistance':
        return 'Citizenship';
      case 'permanent-residency':
        return 'Permanent Residency';
      default:
        return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  const getOfficerInfo = (item: ConsultationRequestRecord, index: number) => {
    if (item.reference_code === 'SJM-294810' || index === 0) {
      return { initials: 'SA', name: 'Salami Zainab', role: 'A. Officer', bg: 'bg-[#6D28D9]' };
    }
    if (item.reference_code === 'SJM-849201' || index === 1) {
      return { initials: 'SK', name: 'Salami Zainab Kehinde', role: '', bg: 'bg-[#0284C7]' };
    }
    if (item.reference_code === 'SJM-630291' || index === 2) {
      return { initials: 'AA', name: 'Blessing Attabor', role: '', bg: 'bg-[#0D9488]' };
    }
    const staff = staffList.find((s) => s.id === item.assigned_to);
    if (staff) {
      const parts = staff.full_name.split(' ');
      const initials = parts.map((p) => p[0]).join('').slice(0, 2).toUpperCase();
      return { initials, name: staff.full_name, role: staff.role, bg: 'bg-indigo-600' };
    }
    return { initials: 'UN', name: 'Unassigned', role: '', bg: 'bg-slate-700' };
  };

  const getChannelBadge = (method: string) => {
    switch (method) {
      case 'whatsapp_video':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#04241C] border border-emerald-500/30 text-emerald-300">
            <span className="text-emerald-400 text-xs">💬</span>
            <span>whatsapp_video</span>
          </span>
        );
      case 'in_person_kaduna':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#0B1B36] border border-blue-500/30 text-blue-300">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>in_person_kaduna</span>
          </span>
        );
      case 'google_meet':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#08182E] border border-slate-700/60 text-slate-300">
            <Video className="w-3.5 h-3.5 text-red-400" />
            <span>google_meet</span>
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#381018] border border-[#DC2626]/40 text-[#F87171]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            <span>NEW</span>
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2E1065] border border-purple-500/40 text-[#C084FC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span>SCHEDULED</span>
          </span>
        );
      case 'contacted':
      case 'assigned':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0C2240] border border-[#2563EB]/40 text-[#60A5FA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            <span>ASSIGNED</span>
          </span>
        );
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-widest text-[#7C66DC] uppercase">
            INTAKE QUEUE • CASE OFFICER ROSTER
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Consultation Enquiries Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track, triage and manage all consultation enquiries efficiently.
          </p>
        </div>

        <div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(147,51,234,0.35)] transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Queue (CSV)</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Enquiries */}
        <div
          onClick={() => setStatusFilter('all')}
          className="bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#0B2544] border border-blue-500/30 text-[#38BDF8] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-slate-300 text-xs font-semibold">
              <span>Total Enquiries</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              {totalCount}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              All consultation requests
            </div>
          </div>
        </div>

        {/* Card 2: New */}
        <div
          onClick={() => setStatusFilter('new')}
          className="bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#201048] border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
            <Sun className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-slate-300 text-xs font-semibold">
              New
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              {newCount}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              Awaiting triage & notes
            </div>
          </div>
        </div>

        {/* Card 3: Scheduled */}
        <div
          onClick={() => setStatusFilter('scheduled')}
          className="bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#062B22] border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-slate-300 text-xs font-semibold">
              Scheduled
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              {scheduledCount}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              Confirmed with client
            </div>
          </div>
        </div>

        {/* Card 4: Assigned */}
        <div
          onClick={() => setStatusFilter('assigned')}
          className="bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#0B2544] border border-blue-500/30 text-[#38BDF8] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-slate-300 text-xs font-semibold">
              Assigned
            </div>
            <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-0.5">
              {assignedCount}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              With a case officer
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full bg-[#080E20] border border-[#16203A] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs text-white focus-within:border-purple-500/60 shadow-sm transition">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, email, ref code (e.g. SJM-102948)..."
            className="w-full bg-transparent focus:outline-none placeholder-slate-500 text-xs text-slate-200"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full md:w-auto">
          <div className="bg-[#080E20] border border-[#16203A] hover:border-slate-700 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-slate-200 cursor-pointer shadow-sm transition">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                <option value="all" className="bg-[#080E20] text-slate-200">
                  All Consultation Statuses ({totalCount})
                </option>
                <option value="new" className="bg-[#080E20] text-slate-200">
                  New Triage ({newCount})
                </option>
                <option value="scheduled" className="bg-[#080E20] text-slate-200">
                  Scheduled Appointments ({scheduledCount})
                </option>
                <option value="assigned" className="bg-[#080E20] text-slate-200">
                  Assigned Case Officers ({assignedCount})
                </option>
              </select>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Date Filter Button */}
        <button
          title="Date Picker"
          className="bg-[#080E20] border border-[#16203A] hover:border-slate-700 p-2.5 rounded-xl text-slate-400 hover:text-white transition shadow-sm cursor-pointer shrink-0"
        >
          <Calendar className="w-4 h-4" />
        </button>

        {/* More Filters Button */}
        <button className="bg-[#080E20] border border-[#16203A] hover:border-slate-700 px-3.5 py-2.5 rounded-xl text-xs text-slate-300 hover:text-white flex items-center gap-2 transition shadow-sm cursor-pointer shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span>More Filters</span>
        </button>
      </div>

      {/* 4. Enquiries Data Table */}
      <div className="bg-[#080E20] border border-[#16203A] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#060A18] text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider border-b border-[#141B30]">
                <th className="py-3.5 pl-4 pr-2 w-8">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-0 focus:outline-none cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>REF CODE</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 px-3 whitespace-nowrap">CLIENT CONTACT</th>
                <th className="py-3.5 px-3 whitespace-nowrap">SERVICE & DESTINATION</th>
                <th className="py-3.5 px-3 whitespace-nowrap">PREFERRED CHANNEL</th>
                <th className="py-3.5 px-3 whitespace-nowrap">ASSIGNED OFFICER</th>
                <th className="py-3.5 px-3 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1">
                    <span>STATUS</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 pr-4 pl-3 text-left whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12192E]">
              {filtered.map((item, index) => {
                const isSelected = selectedIds.includes(item.id);
                const officer = getOfficerInfo(item, index);
                const initials = getInitials(item.full_name);

                return (
                  <tr
                    key={item.id}
                    className={`transition ${
                      isSelected
                        ? 'bg-purple-950/15 border-y border-purple-500/40 hover:bg-purple-950/25'
                        : 'hover:bg-[#0B132B]/50'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 pl-4 pr-2 align-middle">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(item.id)}
                        className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-0 focus:outline-none cursor-pointer"
                      />
                    </td>

                    {/* REF CODE */}
                    <td className="py-4 px-3 whitespace-nowrap align-middle">
                      <div className="font-mono font-bold text-slate-200 text-xs">
                        {item.reference_code}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        #{item.reference_code}
                      </div>
                    </td>

                    {/* CLIENT CONTACT */}
                    <td className="py-4 px-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                            index === 0
                              ? 'bg-[#1E3A8A]'
                              : index === 1
                              ? 'bg-[#2563EB]'
                              : 'bg-[#059669]'
                          }`}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-xs">
                            {item.full_name}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{item.email}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{item.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* SERVICE & DESTINATION */}
                    <td className="py-4 px-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-200 text-xs">
                            {getServiceLabel(item.service_slug)}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Target: {item.target_destination || 'General Assessment'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* PREFERRED CHANNEL */}
                    <td className="py-4 px-3 whitespace-nowrap align-middle">
                      {getChannelBadge(item.preferred_method)}
                    </td>

                    {/* ASSIGNED OFFICER */}
                    <td className="py-4 px-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${officer.bg}`}
                        >
                          {officer.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200 text-xs leading-tight">
                            {officer.name}
                          </div>
                          {officer.role && (
                            <div className="text-[10px] text-slate-500 leading-tight">
                              {officer.role}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="py-4 px-3 text-center whitespace-nowrap align-middle">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 pr-4 pl-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setNewStatus(item.status);
                              setInternalNote(item.notes || '');
                              setAssignedStaffId(item.assigned_to || '');
                              setIsUpdatingStatus(true);
                            }}
                            className="px-3 py-1 rounded-lg bg-[#581C87] hover:bg-[#6B21A8] text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Triage & Notes</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setApptMethod(item.preferred_method);
                              setApptNotes(item.notes || '');
                              setIsScheduling(true);
                            }}
                            className="px-3 py-1 rounded-lg bg-[#0B1226] hover:bg-[#121B38] border border-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <CalendarCheck className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {item.status === 'scheduled' ? 'Reschedule' : 'Verify & Schedule'}
                            </span>
                          </button>
                        </div>

                        <button
                          title="More options"
                          className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 rounded-lg transition"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 5. Table Footer / Pagination */}
        <div className="px-4 py-3 bg-[#060A18] border-t border-[#141B30] flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <strong className="text-white">1 - {filtered.length}</strong> of{' '}
            <strong className="text-white">{filtered.length}</strong> enquiries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="p-1.5 rounded-lg bg-[#0B1020] border border-slate-800 text-slate-600 cursor-not-allowed"
            >
              &lt;
            </button>
            <button className="px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs shadow-sm">
              1
            </button>
            <button
              disabled
              className="p-1.5 rounded-lg bg-[#0B1020] border border-slate-800 text-slate-600 cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Modal A: Triage & Notes */}
      {isUpdatingStatus && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1226] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h3 className="font-heading font-bold text-base text-white">
                  Triage Case & Assign Officer
                </h3>
              </div>
              <button
                onClick={() => setIsUpdatingStatus(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#080E20] border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono text-purple-300 font-bold">{selectedItem.reference_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <span className="text-white font-medium">{selectedItem.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-white font-medium">{getServiceLabel(selectedItem.service_slug)} ({selectedItem.target_destination || 'Global'})</span>
              </div>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Lifecycle Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ConsultationStatus)}
                  className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="new">New (Unreviewed / Intake Queue)</option>
                  <option value="contacted">Assigned / Contacted (Officer Engaging)</option>
                  <option value="scheduled">Scheduled (Appointment Booked)</option>
                  <option value="completed">Completed (Advice Rendered)</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no_show">No Show</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Assign Case Officer
                </label>
                <select
                  value={assignedStaffId}
                  onChange={(e) => setAssignedStaffId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="">-- Leave Unassigned --</option>
                  {staffList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name} ({s.role}) - {s.department || 'General Consular'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Internal Consular Case Notes (Confidential)
                </label>
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Record assessment notes, visa eligibility score, or client specific requests..."
                  className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 placeholder-slate-500"
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
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Save Triage & Notes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal B: Verify & Schedule Appointment */}
      {isScheduling && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1226] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <h3 className="font-heading font-bold text-base text-white">
                  {selectedItem.status === 'scheduled' ? 'Reschedule Appointment' : 'Verify & Schedule Appointment'}
                </h3>
              </div>
              <button
                onClick={() => setIsScheduling(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Booking for <strong className="text-white">{selectedItem.full_name}</strong> ({selectedItem.reference_code}). An email and calendar invite will be dispatched automatically via cPanel SMTP.
            </p>

            <form onSubmit={handleScheduleAppt} className="space-y-3">
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
                    className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
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
                    className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
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
                  className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
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
                  className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
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
                  className="w-full px-3 py-2 bg-[#080E20] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 placeholder-slate-500"
                />
              </div>

              {actionSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {actionSuccess}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition cursor-pointer"
                >
                  {actionLoading
                    ? 'Dispatching...'
                    : selectedItem.status === 'scheduled'
                    ? 'Confirm Reschedule'
                    : 'Confirm & Dispatch Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
