'use client';

import React from 'react';
import Image from 'next/image';
import {
  LayoutGrid,
  DollarSign,
  Globe,
  MessageSquare,
  Star,
  Users,
  Briefcase,
  FileText,
  Layers,
  HardDrive,
  ShieldCheck,
  Server,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { AdminRole } from '@/lib/types/database';
import { hasPermission, Permission } from '@/lib/auth/permissions';
import { COMPANY } from '@/lib/routes';

export type AdminTab =
  | 'overview'
  | 'revenue'
  | 'seo'
  | 'consultations'
  | 'enquiries'
  | 'jobs'
  | 'applications'
  | 'testimonials'
  | 'blog'
  | 'services'
  | 'media'
  | 'settings'
  | 'redirects'
  | 'staff'
  | 'audit_logs';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  role: AdminRole;
  counts: {
    pendingConsultations: number;
    openJobs: number;
    pendingApplications: number;
    pendingTestimonials: number;
  };
}

interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredPermission?: Permission;
  badge?: {
    count: number;
    color: string;
  };
}

interface NavPillar {
  title: string;
  items: NavItem[];
}

export function AdminSidebar({
  currentTab,
  onSelectTab,
  role,
  counts,
}: AdminSidebarProps) {
  const PILLARS: NavPillar[] = [
    {
      title: '1. Executive Command',
      items: [
        {
          id: 'overview',
          label: 'Overview Hub',
          icon: LayoutGrid,
          requiredPermission: 'dashboard:view',
        },
        {
          id: 'revenue',
          label: 'Revenue & Retainers',
          icon: DollarSign,
          requiredPermission: 'dashboard:view',
          badge: {
            count: 6,
            color: 'bg-emerald-600 text-white',
          },
        },
        {
          id: 'seo',
          label: 'SEO & Search Console',
          icon: Globe,
          requiredPermission: 'dashboard:view',
        },
      ],
    },
    {
      title: '2. Client Acquisition & Triage',
      items: [
        {
          id: 'consultations',
          label: 'Inbound Leads & Triage',
          icon: MessageSquare,
          requiredPermission: 'consultations:view',
          badge: {
            count: counts.pendingConsultations || 4,
            color: 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm',
          },
        },
        {
          id: 'testimonials',
          label: 'Review Moderation',
          icon: Star,
          requiredPermission: 'testimonials:view',
          badge: {
            count: counts.pendingTestimonials || 1,
            color: 'bg-amber-600 text-white',
          },
        },
      ],
    },
    {
      title: '3. Talent Recruitment Desk',
      items: [
        {
          id: 'jobs',
          label: 'Recruitment & Candidates',
          icon: Briefcase,
          requiredPermission: 'jobs:view',
          badge: {
            count: (counts.openJobs || 2) + (counts.pendingApplications || 2),
            color: 'bg-blue-600 text-white',
          },
        },
      ],
    },
    {
      title: '4. Platform Governance',
      items: [
        {
          id: 'blog',
          label: 'Blog & Editorial',
          icon: FileText,
          requiredPermission: 'content:view',
        },
        {
          id: 'services',
          label: 'Catalog & Partners',
          icon: Layers,
          requiredPermission: 'services:manage',
        },
        {
          id: 'media',
          label: 'Storage & Media',
          icon: HardDrive,
          requiredPermission: 'media:view',
        },
        {
          id: 'staff',
          label: 'Staff & RBAC Matrix',
          icon: ShieldCheck,
          requiredPermission: 'users:view',
        },
        {
          id: 'settings',
          label: 'Infrastructure & Routing',
          icon: Server,
          requiredPermission: 'settings:view',
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#060A18] border-r border-[#141B30] flex flex-col justify-between shrink-0 select-none">
      {/* Navigation Items Organized by 4 Core Pillars */}
      <div className="p-3 space-y-4 overflow-y-auto">
        {PILLARS.map((pillar, pIdx) => (
          <div key={pIdx} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-purple-400/80 font-bold">
              {pillar.title}
            </div>

            {pillar.items.map((item) => {
              const Icon = item.icon;
              const isAllowed = !item.requiredPermission || hasPermission(role, item.requiredPermission);
              
              // Map legacy tabs to active parent item
              const isActive =
                currentTab === item.id ||
                (item.id === 'consultations' && currentTab === 'enquiries') ||
                (item.id === 'jobs' && currentTab === 'applications') ||
                (item.id === 'settings' && (currentTab === 'redirects' || currentTab === 'audit_logs'));

              if (!isAllowed) {
                return (
                  <div
                    key={item.id}
                    title={`Access restricted for ${role}. Requires permission: ${item.requiredPermission}`}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-600 cursor-not-allowed select-none bg-slate-900/30 opacity-60"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-600" />
                      <span>{item.label}</span>
                    </div>
                    <Lock className="w-3 h-3 text-slate-600" />
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#183168]/90 via-[#102450]/70 to-[#0c1836]/90 text-white border border-[#257CFF]/50 shadow-[0_0_15px_rgba(37,124,255,0.25)] font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-[#0B1024]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#4DA5EC]' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${item.badge.color}`}
                    >
                      {item.badge.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / System Online & Company Badge */}
      <div className="p-3 border-t border-[#141B30] bg-[#050814]">
        <div className="p-3 rounded-2xl bg-[#080E20] border border-slate-800/80 space-y-2">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Executive Command · CAC 7890456</span>
          </div>

          {/* Details */}
          <div className="flex items-center gap-2.5 pt-0.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-900 to-indigo-700 flex items-center justify-center p-0.5 shrink-0 shadow-inner">
              <div className="w-full h-full bg-[#060A18] rounded-full flex items-center justify-center text-purple-300 text-xs font-black">
                S
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-slate-300 font-mono leading-tight">
                {COMPANY.cacNumber}
              </div>
              <div className="text-[10px] text-slate-400 truncate leading-tight">
                Sijam Consults · Consular Consultancy
              </div>
              <div className="text-[9px] text-slate-500 truncate leading-tight">
                Global Access. Institutional Trust.
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
