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
  AlertCircle,
  Inbox,
  Reply,
} from 'lucide-react';
import { ContactMessageRecord } from '@/lib/types/database';
import { adminUpdateContactMessageStatus } from '@/app/actions/admin';

interface ContactMessagesViewProps {
  messages: ContactMessageRecord[];
  onRefresh: () => void;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-rose-900/50 text-rose-300 border-rose-700' },
  in_progress: { label: 'In Progress', color: 'bg-amber-900/50 text-amber-300 border-amber-700' },
  replied: { label: 'Replied', color: 'bg-emerald-900/50 text-emerald-300 border-emerald-700' },
  closed: { label: 'Closed', color: 'bg-slate-800 text-slate-400 border-slate-700' },
};

export function ContactMessagesView({ messages, onRefresh }: ContactMessagesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageRecord | null>(null);
  const [replyNotes, setReplyNotes] = useState('');
  const [newStatus, setNewStatus] = useState<ContactMessageRecord['status']>('replied');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = messages.filter((m) => {
    const matchesSearch =
      searchTerm === '' ||
      m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.service_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async () => {
    if (!selectedMessage) return;
    setLoading(true);
    setSuccessMsg(null);
    try {
      await adminUpdateContactMessageStatus(selectedMessage.id, newStatus, replyNotes || undefined);
      setSuccessMsg(`Enquiry marked as "${STATUS_LABELS[newStatus]?.label}".`);
      setTimeout(() => {
        setSuccessMsg(null);
        setSelectedMessage(null);
        onRefresh();
      }, 1200);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setLoading(false);
    }
  };

  const openMessage = (msg: ContactMessageRecord) => {
    setSelectedMessage(msg);
    setNewStatus(msg.status === 'new' ? 'in_progress' : msg.status);
    setReplyNotes(msg.reply_notes || '');
    setSuccessMsg(null);
  };

  const counts = {
    new: messages.filter((m) => m.status === 'new').length,
    in_progress: messages.filter((m) => m.status === 'in_progress').length,
    replied: messages.filter((m) => m.status === 'replied').length,
    closed: messages.filter((m) => m.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
            <Inbox className="w-5 h-5 text-purple-400" />
            Contact Enquiries
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage inbound contact form messages and general enquiries.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['new', 'in_progress', 'replied', 'closed'] as const).map((s) => {
          const conf = STATUS_LABELS[s];
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={`rounded-xl border p-3 text-left transition hover:opacity-80 ${
                statusFilter === s ? conf.color : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="text-2xl font-mono font-black">{counts[s]}</div>
              <div className="text-[11px] uppercase tracking-wide mt-0.5">{conf.label}</div>
            </button>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, category, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Messages List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-700" />
          <p className="text-sm">No enquiries match your current filters.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((msg) => {
            const st = STATUS_LABELS[msg.status] ?? STATUS_LABELS.new;
            return (
              <button
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`w-full text-left rounded-xl border p-4 transition hover:border-purple-600/50 bg-slate-900/60 group ${
                  msg.status === 'new' ? 'border-rose-700/40' : 'border-slate-800'
                } ${selectedMessage?.id === msg.id ? 'border-purple-500/60 bg-slate-800/80' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-white">{msg.full_name}</span>
                      {msg.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-mono ${st.color}`}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {msg.service_category} — {msg.email}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{msg.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(msg.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: '2-digit',
                      })}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail Drawer */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-end">
          <div className="w-full max-w-lg h-full bg-[#0D1525] border-l border-slate-700 flex flex-col shadow-2xl overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Reply className="w-4 h-4 text-purple-400" />
                <h3 className="font-heading font-bold text-base text-white">Enquiry Detail</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-500 hover:text-white p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Sender Info */}
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Mail className="w-4 h-4 text-purple-400" />
                  {selectedMessage.full_name}
                </div>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${selectedMessage.email}`} className="hover:text-purple-300 transition">
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedMessage.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Service Category</span>
                  <p className="text-sm text-amber-300 font-medium mt-0.5">{selectedMessage.service_category}</p>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Message</p>
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Current Status */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Current Status:</span>
                <span className={`text-[11px] px-2 py-0.5 rounded border font-mono ${STATUS_LABELS[selectedMessage.status]?.color}`}>
                  {STATUS_LABELS[selectedMessage.status]?.label}
                </span>
              </div>

              {/* Reply Notes */}
              {selectedMessage.reply_notes && (
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">Previous Notes</p>
                  <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-xs text-slate-300 italic">
                    {selectedMessage.reply_notes}
                  </div>
                </div>
              )}

              {/* Update Form */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Update Status</p>
                <div className="relative">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ContactMessageRecord['status'])}
                    className="appearance-none w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                <textarea
                  rows={4}
                  placeholder="Internal notes or reply reference... (not sent to client)"
                  value={replyNotes}
                  onChange={(e) => setReplyNotes(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {successMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {successMsg}
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="p-4 border-t border-slate-800 flex gap-3 shrink-0">
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex-1 py-2.5 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-xl transition"
              >
                Close
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={loading}
                className="flex-1 py-2.5 text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition disabled:opacity-60"
              >
                {loading ? 'Saving...' : 'Save Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
