'use client';

import React from 'react';
import {
  MessageSquare,
  Briefcase,
  Users,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Server,
  Mail,
  HardDrive,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ConsultationRequestRecord,
  JobApplicationRecord,
  TestimonialRecord,
} from '@/lib/types/database';
import { AdminTab } from './AdminSidebar';

interface OverviewViewProps {
  metrics: {
    pendingConsultations: number;
    scheduledAppointments: number;
    openJobs: number;
    totalApplications: number;
    pendingApplications: number;
    pendingTestimonials: number;
    publishedArticles: number;
    totalStaff: number;
  };
  recentConsultations: ConsultationRequestRecord[];
  recentApplications: JobApplicationRecord[];
  pendingReviews: TestimonialRecord[];
  onNavigate: (tab: AdminTab) => void;
}

export function OverviewView({
  metrics,
  recentConsultations,
  recentApplications,
  pendingReviews,
  onNavigate,
}: OverviewViewProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Consular Command Center • Real-Time Telemetry
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Operations & Triage Overview
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Backend Active: Dual-Mode Synced
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Consultations */}
        <div
          onClick={() => onNavigate('consultations')}
          className="bg-[#141E30] hover:bg-[#18243A] p-5 rounded-2xl border border-slate-800 cursor-pointer transition shadow-sm group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending Inquiries</span>
            <MessageSquare className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-white">
              {metrics.pendingConsultations}
            </p>
            <span className="text-xs text-purple-300 font-mono flex items-center gap-0.5">
              Triage queue <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {metrics.scheduledAppointments} appointments on calendar
          </p>
        </div>

        {/* Candidate Intake */}
        <div
          onClick={() => onNavigate('applications')}
          className="bg-[#141E30] hover:bg-[#18243A] p-5 rounded-2xl border border-slate-800 cursor-pointer transition shadow-sm group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Candidate Dossiers</span>
            <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-white">
              {metrics.totalApplications}
            </p>
            <span className="text-xs text-blue-300 font-mono flex items-center gap-0.5">
              Intake desk <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {metrics.pendingApplications} waiting for initial screening
          </p>
        </div>

        {/* Open Job Listings */}
        <div
          onClick={() => onNavigate('jobs')}
          className="bg-[#141E30] hover:bg-[#18243A] p-5 rounded-2xl border border-slate-800 cursor-pointer transition shadow-sm group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Verified Job Openings</span>
            <Briefcase className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-white">
              {metrics.openJobs}
            </p>
            <span className="text-xs text-emerald-300 font-mono flex items-center gap-0.5">
              Live postings <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Poland healthcare, tech & agriculture
          </p>
        </div>

        {/* Pending Reviews */}
        <div
          onClick={() => onNavigate('testimonials')}
          className="bg-[#141E30] hover:bg-[#18243A] p-5 rounded-2xl border border-slate-800 cursor-pointer transition shadow-sm group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Review Moderation</span>
            <Star className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-white">
              {metrics.pendingTestimonials}
            </p>
            <span className="text-xs text-amber-300 font-mono flex items-center gap-0.5">
              Pending review <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            PII redaction check required before publishing
          </p>
        </div>
      </div>

      {/* Urgent Action Queue & Infrastructure Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Urgent Intake Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Consultations */}
          <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <h2 className="font-heading font-bold text-sm text-white">
                  Recent Inbound Consultation Enquiries
                </h2>
              </div>
              <button
                onClick={() => onNavigate('consultations')}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium"
              >
                View all queue &rarr;
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {recentConsultations.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-slate-800/40 transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-purple-300">
                        {item.reference_code}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {item.full_name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({item.preferred_method})
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {item.applicant_objective}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Filed on {new Date(item.created_at).toLocaleDateString()} • Destination: {item.target_destination || 'General'}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        item.status === 'new'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : item.status === 'assigned'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {item.status}
                    </span>
                    <button
                      onClick={() => onNavigate('consultations')}
                      className="text-xs text-purple-400 hover:underline"
                    >
                      Manage &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Candidate Applications */}
          <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <h2 className="font-heading font-bold text-sm text-white">
                  Recent Candidate Job Applications
                </h2>
              </div>
              <button
                onClick={() => onNavigate('applications')}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                View candidate dossiers &rarr;
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {recentApplications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-4 hover:bg-slate-800/40 transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-300">
                        {app.reference_code}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {app.full_name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({app.city_country})
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Applied for: <span className="text-white font-medium">{app.job_title || 'Position'}</span>
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Experience: {app.years_experience} yrs • Qualification: {app.highest_education}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      {app.status}
                    </span>
                    <button
                      onClick={() => onNavigate('applications')}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Inspect CV &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Infrastructure & Security Monitor */}
        <div className="space-y-6">
          <div className="bg-[#121B2B] rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Infrastructure & Security Monitor
            </h3>

            <div className="space-y-3">
              {/* PostgreSQL Engine */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Supabase PostgreSQL
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    RLS Active • Migration v20261013
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>

              {/* cPanel Transactional SMTP */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    cPanel SMTP Mailer
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    mail.sijamconsults.com:465 (SSL)
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>

              {/* Storage Buckets */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Supabase Storage Buckets
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    public-assets & applicant-documents
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Isolated
                </span>
              </div>

              {/* NDPR & Anti-Guarantee Compliance */}
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Legal Compliance
                  </span>
                  <span className="text-[10px] font-mono text-purple-400">
                    RC: 1715416
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Candidate CVs stored privately with signed URL access. Disclaimers enforced across public intake.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-[#121B2B] rounded-2xl border border-slate-800 p-5 space-y-3">
            <h3 className="font-heading font-bold text-sm text-white">
              Executive Fast Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('jobs')}
                className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>+ Create New Verified Job Listing</span>
                <span className="text-purple-400">&rarr;</span>
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>+ Publish Travel Guide / News Article</span>
                <span className="text-purple-400">&rarr;</span>
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition flex items-center justify-between"
              >
                <span>Test Transactional Email Relay</span>
                <span className="text-purple-400">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
