'use client';

import React, { useMemo } from 'react';
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
  DollarSign,
  TrendingUp,
  Receipt,
  Coins,
  ArrowUpRight,
  Globe,
  Eye,
  MousePointerClick,
  Target,
  BarChart3,
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
  dailyMetrics?: {
    date: string;
    consultations: number;
    applications: number;
    enquiries: number;
    testimonials: number;
    blog_posts: number;
  }[];
  recentConsultations: ConsultationRequestRecord[];
  recentApplications: JobApplicationRecord[];
  pendingReviews: TestimonialRecord[];
  onNavigate: (tab: AdminTab) => void;
}

function generateDynamicWavePath(dataPoints: number[], width = 280, height = 40) {
  const points = dataPoints && dataPoints.length > 0 ? dataPoints : [2, 3, 2, 4, 3, 5, 4, 6];
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  const coords = points.map((val, idx) => {
    const x = Math.round(idx * step);
    const y = Math.round(height - ((val - min) / range) * (height - 12) - 6);
    return { x, y };
  });

  let d = `M${coords[0].x},${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const xc = (coords[i].x + coords[i + 1].x) / 2;
    const yc = (coords[i].y + coords[i + 1].y) / 2;
    d += ` Q${coords[i].x},${coords[i].y} ${xc},${yc}`;
  }
  const last = coords[coords.length - 1];
  d += ` T${last.x},${last.y}`;

  const linePath = d;
  const areaPath = `${d} L${width},${height} L0,${height} Z`;
  return { linePath, areaPath };
}

export function OverviewView({
  metrics,
  dailyMetrics = [],
  recentConsultations,
  recentApplications,
  onNavigate,
}: OverviewViewProps) {
  const inquiriesSeries = useMemo(() => {
    return dailyMetrics.length
      ? dailyMetrics.map((m) => m.consultations + m.enquiries)
      : [2, 4, 3, 5, 4, 6, 5, 8, 7, 9, 8, 10];
  }, [dailyMetrics]);

  const applicationsSeries = useMemo(() => {
    return dailyMetrics.length
      ? dailyMetrics.map((m) => m.applications)
      : [1, 3, 2, 4, 3, 6, 5, 7, 6, 8, 7, 9];
  }, [dailyMetrics]);

  const jobsSeries = useMemo(() => {
    return [2, 2, 3, 3, 2, 4, 3, 4, 3, 5, 4, 5];
  }, []);

  const reviewsSeries = useMemo(() => {
    return dailyMetrics.length
      ? dailyMetrics.map((m) => m.testimonials)
      : [1, 2, 1, 3, 2, 2, 3, 2, 4, 3, 4, 4];
  }, [dailyMetrics]);

  const wave1 = useMemo(() => generateDynamicWavePath(inquiriesSeries), [inquiriesSeries]);
  const wave2 = useMemo(() => generateDynamicWavePath(applicationsSeries), [applicationsSeries]);
  const wave3 = useMemo(() => generateDynamicWavePath(jobsSeries), [jobsSeries]);
  const wave4 = useMemo(() => generateDynamicWavePath(reviewsSeries), [reviewsSeries]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto select-none">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono font-bold tracking-widest text-[#7C66DC] uppercase">
            CONSULAR COMMAND CENTER · LIVE OPERATIONS
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Operations Overview
          </h1>
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
                d={wave1.areaPath}
                fill="url(#purpleGrad)"
              />
              <path
                d={wave1.linePath}
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
                d={wave2.areaPath}
                fill="url(#cyanGrad)"
              />
              <path
                d={wave2.linePath}
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: GSC Performance */}
        <div
          onClick={() => onNavigate('seo')}
          className="group relative bg-[#080E20] hover:bg-[#0C142A] border border-[#16203A] rounded-2xl p-5 cursor-pointer transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#08222E] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition">
                <span className="text-xs font-medium">GSC performance</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" />
              </div>
            </div>

            <div className="mt-4">
              <div className="font-heading font-black text-3xl text-white tracking-tight">
                14.8k
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1.5">
                <span>Organic clicks (28d)</span>
                <span className="text-emerald-400 font-bold text-[10px] font-mono">+22.5%</span>
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
                d={wave3.areaPath}
                fill="url(#tealGrad)"
              />
              <path
                d={wave3.linePath}
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
                d={wave4.areaPath}
                fill="url(#amberGrad)"
              />
              <path
                d={wave4.linePath}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2.5. Commercial Retainer Pipeline */}
      <div className="bg-[#090F24] border border-purple-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider">
                Commercial Operations • Institutional Revenue Matrix
              </span>
              <h2 className="font-heading font-black text-lg text-white">
                Commercial Retainer Pipeline
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Target Run-Rate: <strong className="text-white">$1.5M / Year</strong>
            </span>
            <button
              onClick={() => onNavigate('revenue')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-[#257CFF]/25 transition"
            >
              <span>Open Pipeline Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric A: Gross Booking Volume */}
          <div className="p-4 rounded-2xl bg-[#0C142A] border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
              Gross Booking Volume (GBV)
            </span>
            <div className="font-heading font-black text-2xl text-white">
              $24,400 <span className="text-xs font-mono text-purple-300 font-normal">/ ₦36.6M</span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% month-over-month
            </span>
          </div>

          {/* Metric B: Retainer Deposits Collected */}
          <div className="p-4 rounded-2xl bg-[#0C142A] border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
              Retainer Deposits Collected
            </span>
            <div className="font-heading font-black text-2xl text-emerald-400">
              $11,400 <span className="text-xs font-mono text-emerald-300/80 font-normal">/ ₦17.1M</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Verified through Paystack &amp; Treasury Wire
            </span>
          </div>

          {/* Metric C: Commission Disbursements */}
          <div className="p-4 rounded-2xl bg-[#0C142A] border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
              Commission Disbursements
            </span>
            <div className="font-heading font-black text-2xl text-amber-300">
              $5,900 <span className="text-xs font-mono text-slate-400 font-normal">released</span>
            </div>
            <span className="text-[10px] text-amber-400/80">
              $7,100 pending consular visa stamps
            </span>
          </div>
        </div>

        {/* Commercial Pipeline Funnel Stages */}
        <div className="pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] text-purple-400 block font-bold">1. Assessment Paid</span>
              <span className="text-white font-bold">₦50,000 / intake</span>
              <span className="text-[10px] text-slate-500 block">Lead triage window</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] text-blue-400 block font-bold">2. Retainer Signed</span>
              <span className="text-white font-bold">$1,500 – $5,000</span>
              <span className="text-[10px] text-slate-500 block">Contract formalized</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] text-amber-400 block font-bold">3. Consular Filing</span>
              <span className="text-white font-bold">Voivodeship / MFA</span>
              <span className="text-[10px] text-slate-500 block">Case officer active</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] text-emerald-400 block font-bold">4. Commission Released</span>
              <span className="text-white font-bold">Bank settled</span>
              <span className="text-[10px] text-slate-500 block">Visa stamp issued</span>
            </div>
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
                      <div className="font-medium text-slate-200">Multi-Skilled General Worker</div>
                      <div className="text-[10px] text-slate-500">(Construction & Agrotechnics)</div>
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

        {/* Right Column: SEO Performance Stats & Fast Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: SEO Performance Stats */}
          <div className="bg-[#080E20] border border-[#16203A] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <h2 className="font-heading font-bold text-sm">
                  SEO Performance Stats
                </h2>
              </div>
              <button
                onClick={() => onNavigate('seo')}
                className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition flex items-center gap-1"
              >
                <span>View GSC Intelligence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Item 1: Organic Search Clicks */}
              <div className="p-3 rounded-xl bg-[#0B1226] border border-[#16203A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0E1E38] border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      14,820 Organic Clicks
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Rolling 28-day SERP traffic
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#05261F] border border-emerald-500/40 text-emerald-300 text-[11px] font-bold font-mono">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>+22.5%</span>
                </div>
              </div>

              {/* Item 2: Search Impressions */}
              <div className="p-3 rounded-xl bg-[#0B1226] border border-[#16203A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#141238] border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      284.5k Impressions
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      High-intent visa query reach
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0B1D38] border border-indigo-500/40 text-indigo-300 text-[11px] font-bold font-mono">
                  <TrendingUp className="w-3 h-3 text-indigo-400" />
                  <span>+35.1%</span>
                </div>
              </div>

              {/* Item 3: Avg CTR & Position */}
              <div className="p-3 rounded-xl bg-[#0B1226] border border-[#16203A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#05261F] border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      5.2% CTR · Avg Pos #11.8
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Exceeds 4.5% consular benchmark
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#05261F] border border-emerald-500/40 text-emerald-300 text-[11px] font-bold font-mono">
                  <span>Top 10 Bound</span>
                </div>
              </div>

              {/* Top Corridor & Striking Distance Keywords Summary */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0C1738] to-[#120F2E] border border-cyan-500/30 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-200 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    Top Acquisition Corridors
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 font-semibold">
                    8 Striking Keywords
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  🇳🇬 Nigeria (70.3%) · 🇬🇧 UK (12.4%) · 🇨🇦 Canada (8.0%). Target queries in ranks 4–10 primed for page-1 dominance.
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
