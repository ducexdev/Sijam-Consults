'use client';

import React from 'react';
import {
  MessageSquare,
  Users,
  Briefcase,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Check,
  Zap,
  Plus,
  FileText,
  Mail,
  Database,
  HardDrive,
  Video,
  User as UserIcon,
} from 'lucide-react';
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
  onNavigate,
}: OverviewViewProps) {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-widest text-[#7C66DC] uppercase">
            CONSULAR COMMAND CENTER · LIVE OPERATIONS
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Operations & Triage Overview
          </h1>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#03241F]/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Backend active · dual-mode synced</span>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pending Inquiries */}
        <div
          onClick={() => onNavigate('consultations')}
          className="group relative bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-5 cursor-pointer transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#1A1038] border border-purple-500/30 flex items-center justify-center text-purple-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition">
                <span className="text-xs font-medium">Pending Inquiries</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div className="mt-4">
              <div className="font-heading font-black text-3xl text-white tracking-tight">
                {metrics.pendingConsultations || 2}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Triage queue
              </div>
            </div>
          </div>

          {/* Sparkline wave: Purple */}
          <div className="h-10 w-full mt-3 overflow-hidden">
            <svg viewBox="0 0 280 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,30 Q35,15 70,28 T140,24 T210,18 T280,26 L280,40 L0,40 Z"
                fill="url(#purpleGrad)"
              />
              <path
                d="M0,30 Q35,15 70,28 T140,24 T210,18 T280,26"
                fill="none"
                stroke="#A855F7"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Candidate Dossiers */}
        <div
          onClick={() => onNavigate('applications')}
          className="group relative bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-5 cursor-pointer transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#091C36] border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition">
                <span className="text-xs font-medium">Candidate Dossiers</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div className="mt-4">
              <div className="font-heading font-black text-3xl text-white tracking-tight">
                {metrics.totalApplications || 2}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Intake desk
              </div>
            </div>
          </div>

          {/* Sparkline wave: Cyan/Blue */}
          <div className="h-10 w-full mt-3 overflow-hidden">
            <svg viewBox="0 0 280 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,25 Q35,32 70,20 T140,30 T210,22 T280,26 L280,40 L0,40 Z"
                fill="url(#cyanGrad)"
              />
              <path
                d="M0,25 Q35,32 70,20 T140,30 T210,22 T280,26"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Verified Job Openings */}
        <div
          onClick={() => onNavigate('jobs')}
          className="group relative bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-5 cursor-pointer transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#08222E] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition">
                <span className="text-xs font-medium">Verified Job Openings</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div className="mt-4">
              <div className="font-heading font-black text-3xl text-white tracking-tight">
                {metrics.openJobs || 2}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Live postings
              </div>
            </div>
          </div>

          {/* Sparkline wave: Teal/Emerald */}
          <div className="h-10 w-full mt-3 overflow-hidden">
            <svg viewBox="0 0 280 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,32 Q35,22 70,26 T140,18 T210,26 T280,22 L280,40 L0,40 Z"
                fill="url(#tealGrad)"
              />
              <path
                d="M0,32 Q35,22 70,26 T140,18 T210,26 T280,22"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 4: Review Moderation */}
        <div
          onClick={() => onNavigate('testimonials')}
          className="group relative bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-5 cursor-pointer transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#1A1038] border border-purple-500/30 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition">
                <span className="text-xs font-medium">Review Moderation</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div className="mt-4">
              <div className="font-heading font-black text-3xl text-white tracking-tight">
                {metrics.pendingTestimonials || 1}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                Pending review
              </div>
            </div>
          </div>

          {/* Sparkline wave: Amber */}
          <div className="h-10 w-full mt-3 overflow-hidden">
            <svg viewBox="0 0 280 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,28 Q35,34 70,22 T140,26 T210,16 T280,24 L280,40 L0,40 Z"
                fill="url(#amberGrad)"
              />
              <path
                d="M0,28 Q35,34 70,22 T140,26 T210,16 T280,24"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Main Split Section: Tables (Left 67%) + Status Monitors (Right 33%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tables */}
        <div className="lg:col-span-8 space-y-6">
          {/* Table A: Recent Inbound Consultation Enquiries */}
          <div className="bg-[#080E20] border border-[#16203A] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1A1038] border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h2 className="font-heading font-bold text-base text-white">
                  Recent Inbound Consultation Enquiries
                </h2>
              </div>
              <button
                onClick={() => onNavigate('consultations')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
              >
                View all queue &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#141B30] text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">REF #</th>
                    <th className="pb-3 font-semibold">CLIENT</th>
                    <th className="pb-3 font-semibold">CONTACT METHOD</th>
                    <th className="pb-3 font-semibold">DESTINATION</th>
                    <th className="pb-3 font-semibold text-center">STATUS</th>
                    <th className="pb-3 font-semibold">DATE</th>
                    <th className="pb-3 font-semibold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#12192E]">
                  {/* Row 1 */}
                  <tr className="hover:bg-[#0B132B]/50 transition">
                    <td className="py-3.5 pr-2 font-mono text-slate-200 font-semibold whitespace-nowrap">
                      SJM-294810
                      <div className="text-[10px] font-mono text-slate-500 font-normal">#SJM-294810</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="font-semibold text-white">Yakubu Danladi</div>
                      <div className="text-[10px] text-slate-500">(whatsapp_video)</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <span className="text-emerald-400 text-sm">💬</span>
                        <span className="font-medium">WhatsApp Video</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-5">Consultation</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Slovakia</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-4.5">Visa / Work Permit</div>
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#381018] text-[#F87171] border border-[#DC2626]/40">
                        NEW
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      <div>10/14/2026</div>
                      <div className="text-[10px] text-slate-500">09:24 AM</div>
                    </td>
                    <td className="py-3.5 pl-2 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('consultations')}
                        className="text-purple-400 hover:text-purple-300 font-medium transition"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-[#0B132B]/50 transition">
                    <td className="py-3.5 pr-2 font-mono text-slate-200 font-semibold whitespace-nowrap">
                      SJM-849201
                      <div className="text-[10px] font-mono text-slate-500 font-normal">#SJM-849201</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="font-semibold text-white">Emeka Umeh</div>
                      <div className="text-[10px] text-slate-500">(fin_person_kaduna)</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-medium">In-Person</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-5">Consultation</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Poland / Cyprus</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-4.5">Work & Study</div>
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A2D22] text-[#34D399] border border-[#059669]/40">
                        SCHEDULED
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      <div>10/12/2026</div>
                      <div className="text-[10px] text-slate-500">04:17 PM</div>
                    </td>
                    <td className="py-3.5 pl-2 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('consultations')}
                        className="text-purple-400 hover:text-purple-300 font-medium transition"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-[#0B132B]/50 transition">
                    <td className="py-3.5 pr-2 font-mono text-slate-200 font-semibold whitespace-nowrap">
                      SJM-630291
                      <div className="text-[10px] font-mono text-slate-500 font-normal">#SJM-630291</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="font-semibold text-white">Dr. Amina Bello</div>
                      <div className="text-[10px] text-slate-500">(google_meet)</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-medium">Google Meet</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-5">Consultation</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Poland / Schengen</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-4.5">Visa / Work Permit</div>
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0C2240] text-[#60A5FA] border border-[#2563EB]/40">
                        ASSIGNED
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      <div>10/11/2026</div>
                      <div className="text-[10px] text-slate-500">11:03 AM</div>
                    </td>
                    <td className="py-3.5 pl-2 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('consultations')}
                        className="text-purple-400 hover:text-purple-300 font-medium transition"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table B: Recent Candidate Job Applications */}
          <div className="bg-[#080E20] border border-[#16203A] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#091C36] border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="font-heading font-bold text-base text-white">
                  Recent Candidate Job Applications
                </h2>
              </div>
              <button
                onClick={() => onNavigate('applications')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
              >
                View candidate dossiers &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#141B30] text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">APP #</th>
                    <th className="pb-3 font-semibold">APPLICANT</th>
                    <th className="pb-3 font-semibold">POSITION</th>
                    <th className="pb-3 font-semibold">LOCATION</th>
                    <th className="pb-3 font-semibold text-center">STATUS</th>
                    <th className="pb-3 font-semibold">DATE</th>
                    <th className="pb-3 font-semibold text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#12192E]">
                  {/* Row 1 */}
                  <tr className="hover:bg-[#0B132B]/50 transition">
                    <td className="py-3.5 pr-2 font-mono text-slate-200 font-semibold whitespace-nowrap">
                      APP-812390
                      <div className="text-[10px] font-mono text-slate-500 font-normal">#APP-812390</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="font-semibold text-white">Fatima Sanusi</div>
                      <div className="text-[10px] text-slate-500">(abuja_nigeria)</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="font-medium text-slate-200">Fullstack Software Engineer</div>
                      <div className="text-[10px] text-slate-500">(TypeScript & Next.js)</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Abuja</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-4.5">Nigeria</div>
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#082B38] text-[#38BDF8] border border-[#0284C7]/40">
                        SUBMITTED
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      <div>10/09/2026</div>
                      <div className="text-[10px] text-slate-500">02:36 PM</div>
                    </td>
                    <td className="py-3.5 pl-2 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('applications')}
                        className="text-purple-400 hover:text-purple-300 font-medium transition"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-[#0B132B]/50 transition">
                    <td className="py-3.5 pr-2 font-mono text-slate-200 font-semibold whitespace-nowrap">
                      APP-519284
                      <div className="text-[10px] font-mono text-slate-500 font-normal">#APP-519284</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="font-semibold text-white">Tunde Adeyemi</div>
                      <div className="text-[10px] text-slate-500">(kaduna_nigeria)</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="font-medium text-slate-200">Registered General Nurse</div>
                      <div className="text-[10px] text-slate-500">(Hospital Placement)</div>
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-200 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Kaduna</span>
                      </div>
                      <div className="text-[10px] text-slate-500 pl-4.5">Nigeria</div>
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0C2240] text-[#60A5FA] border border-[#2563EB]/40">
                        SCREENING
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      <div>10/07/2026</div>
                      <div className="text-[10px] text-slate-500">10:21 AM</div>
                    </td>
                    <td className="py-3.5 pl-2 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('applications')}
                        className="text-purple-400 hover:text-purple-300 font-medium transition"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Infrastructure Monitor & Fast Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Infrastructure & Security Monitor */}
          <div className="bg-[#080E20] border border-[#16203A] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <h2 className="font-heading font-bold text-sm">
                Infrastructure & Security Monitor
              </h2>
            </div>

            <div className="space-y-2.5">
              {/* Item 1: Supabase PostgreSQL */}
              <div className="p-3 rounded-xl bg-[#0B1226] border border-[#16203A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#05261F] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Supabase PostgreSQL
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      RLS Active · Migration v20261013
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#05261F] border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Ready</span>
                </div>
              </div>

              {/* Item 2: cPanel SMTP Mailer */}
              <div className="p-3 rounded-xl bg-[#0B1226] border border-[#16203A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#05261F] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      cPanel SMTP Mailer
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      mail.sijamconsults.com:465 (SSL)
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#05261F] border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Ready</span>
                </div>
              </div>

              {/* Item 3: Supabase Storage Buckets */}
              <div className="p-3 rounded-xl bg-[#0B1226] border border-[#16203A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#05261F] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Supabase Storage Buckets
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      public-assets & applicant-documents
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#05261F] border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Isolated</span>
                </div>
              </div>

              {/* Legal Compliance Box */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#1E0F3D] to-[#140B2C] border border-purple-500/30 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    Legal Compliance
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 font-semibold">
                    RC: 1715416
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Candidate CVs stored privately with signed URL access. Disclaimers enforced across public intake.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Executive Fast Actions */}
          <div className="bg-[#080E20] border border-[#16203A] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Zap className="w-4 h-4 text-purple-400" />
              <h2 className="font-heading font-bold text-sm">
                Executive Fast Actions
              </h2>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('jobs')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0B1226] hover:bg-[#101A36] border border-[#16203A] text-xs text-slate-200 font-medium transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>Create New Verified Job Listing</span>
                </div>
                <span className="text-slate-500 group-hover:text-purple-400 transition">&rarr;</span>
              </button>

              <button
                onClick={() => onNavigate('blog')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0B1226] hover:bg-[#101A36] border border-[#16203A] text-xs text-slate-200 font-medium transition group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Publish Travel Guide / News Article</span>
                </div>
                <span className="text-slate-500 group-hover:text-purple-400 transition">&rarr;</span>
              </button>

              <button
                onClick={() => onNavigate('settings')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0B1226] hover:bg-[#101A36] border border-[#16203A] text-xs text-slate-200 font-medium transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>Test Transactional Email Relay</span>
                </div>
                <span className="text-slate-500 group-hover:text-purple-400 transition">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
