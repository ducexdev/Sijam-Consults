'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Plus,
  Eye,
  Filter,
  Search,
  X,
} from 'lucide-react';
import { TestimonialRecord, TestimonialStatus } from '@/lib/types/database';
import { adminModerateReview, submitPublicReview } from '@/app/actions/testimonials';

interface TestimonialsViewProps {
  testimonials: TestimonialRecord[];
  onRefresh: () => void;
}

export function TestimonialsView({
  testimonials,
  onRefresh,
}: TestimonialsViewProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [rejectingItem, setRejectingItem] = useState<TestimonialRecord | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Contains personal identifying information or does not meet compliance guidelines.');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const pendingList = testimonials.filter((t) => t.status === 'pending_moderation');
  const approvedList = testimonials.filter((t) => t.status === 'approved');
  const rejectedList = testimonials.filter((t) => t.status === 'rejected');

  const currentList =
    activeTab === 'pending'
      ? pendingList
      : activeTab === 'approved'
      ? approvedList
      : rejectedList;

  const handleApprove = async (id: string) => {
    setLoading(true);
    try {
      await adminModerateReview(id, 'approved');
      setSuccessMsg('Review approved and published to public showcases.');
      setTimeout(() => {
        setSuccessMsg(null);
        onRefresh();
      }, 1000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingItem) return;
    setLoading(true);
    try {
      await adminModerateReview(rejectingItem.id, 'rejected', rejectionReason);
      setSuccessMsg('Review rejected with compliance note.');
      setTimeout(() => {
        setSuccessMsg(null);
        setRejectingItem(null);
        onRefresh();
      }, 1000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Reputation & Social Proof • PII Redaction Desk
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Testimonial & Review Moderation
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-950/80 text-amber-300 border border-amber-800">
            {pendingList.length} Pending Moderation
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Pending Moderation Queue</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
            {pendingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeTab === 'approved'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Live Approved Reviews</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-black text-[10px] font-bold">
            {approvedList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
            activeTab === 'rejected'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Rejected / Non-Compliant</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
            {rejectedList.length}
          </span>
        </button>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentList.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-500 bg-[#121B2B] rounded-2xl border border-slate-800">
            No testimonials in the {activeTab} queue.
          </div>
        ) : (
          currentList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121B2B] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">
                      {rev.client_name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {rev.location} • Category: {rev.category}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Destination */}
                <div className="text-[10px] text-slate-400 font-mono">
                  Destination: <span className="text-purple-300">{rev.destination_country}</span>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>

                {/* Full story if present */}
                {rev.full_story && (
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {rev.full_story}
                  </p>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] text-slate-500 font-mono">
                  Submitted {new Date(rev.created_at).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {rev.status === 'pending_moderation' && (
                    <>
                      <button
                        onClick={() => setRejectingItem(rev)}
                        disabled={loading}
                        className="px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold transition"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(rev.id)}
                        disabled={loading}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition"
                      >
                        Approve & Publish
                      </button>
                    </>
                  )}

                  {rev.status === 'approved' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Live on /reviews
                    </span>
                  )}

                  {rev.status === 'rejected' && (
                    <span className="text-[10px] text-rose-400 italic">
                      Reason: {rev.rejection_reason || 'Compliance rejected'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reject Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white">
                Reject Client Review: {rejectingItem.client_name}
              </h3>
              <button
                onClick={() => setRejectingItem(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReject} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Reason for Rejection / Internal Note
                </label>
                <textarea
                  rows={3}
                  required
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setRejectingItem(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg transition"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
