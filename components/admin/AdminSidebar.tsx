'use client';

import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Users,
  Star,
  FileText,
  Globe,
  Image as ImageIcon,
  Settings,
  ArrowRightLeft,
  ShieldCheck,
  History,
  Lock,
  Inbox,
} from 'lucide-react';
import { AdminRole } from '@/lib/types/database';
import { hasPermission, Permission } from '@/lib/auth/permissions';
import { COMPANY } from '@/lib/routes';

export type AdminTab =
  | 'overview'
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
  countKey?: 'pendingConsultations' | 'openJobs' | 'pendingApplications' | 'pendingTestimonials';
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview Hub',
    icon: LayoutDashboard,
    requiredPermission: 'dashboard:view',
  },
  {
    id: 'consultations',
    label: 'Consultation Inquiries',
    icon: MessageSquare,
    requiredPermission: 'consultations:view',
    countKey: 'pendingConsultations',
  },
  {
    id: 'enquiries',
    label: 'Contact Enquiries',
    icon: Inbox,
    requiredPermission: 'consultations:view',
    countKey: 'pendingEnquiries' as never,
  },
  {
    id: 'jobs',
    label: 'Job Listings Desk',
    icon: Briefcase,
    requiredPermission: 'jobs:view',
    countKey: 'openJobs',
  },
  {
    id: 'applications',
    label: 'Candidate Applications',
    icon: Users,
    requiredPermission: 'applications:view',
    countKey: 'pendingApplications',
  },
  {
    id: 'testimonials',
    label: 'Review Moderation',
    icon: Star,
    requiredPermission: 'testimonials:view',
    countKey: 'pendingTestimonials',
  },
  {
    id: 'blog',
    label: 'Blog & Travel Guides',
    icon: FileText,
    requiredPermission: 'content:view',
  },
  {
    id: 'services',
    label: 'Services & Partners',
    icon: Globe,
    requiredPermission: 'services:manage',
  },
  {
    id: 'media',
    label: 'Storage & Media',
    icon: ImageIcon,
    requiredPermission: 'media:view',
  },
  {
    id: 'settings',
    label: 'Settings & SMTP',
    icon: Settings,
    requiredPermission: 'settings:view',
  },
  {
    id: 'redirects',
    label: '308 Redirects Map',
    icon: ArrowRightLeft,
    requiredPermission: 'redirects:manage',
  },
  {
    id: 'staff',
    label: 'Staff & RBAC Matrix',
    icon: ShieldCheck,
    requiredPermission: 'users:view',
  },
  {
    id: 'audit_logs',
    label: 'System Audit Trail',
    icon: History,
    requiredPermission: 'audit_logs:view',
  },
];

export function AdminSidebar({
  currentTab,
  onSelectTab,
  role,
  counts,
}: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-[#0A101D] border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
      {/* Navigation Items */}
      <div className="p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
          Platform Operations
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isAllowed = !item.requiredPermission || hasPermission(role, item.requiredPermission);
          const isActive = currentTab === item.id;
          const badgeCount = item.countKey ? counts[item.countKey] : 0;

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
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                isActive
                  ? 'bg-purple-900/40 text-purple-200 border border-purple-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {badgeCount > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    item.id === 'consultations'
                      ? 'bg-purple-600 text-white'
                      : item.id === 'applications'
                      ? 'bg-blue-600 text-white'
                      : item.id === 'testimonials'
                      ? 'bg-amber-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / Compliance notice */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070C16]">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="font-mono text-[10px]">CAC RC: 1715416</span>
            <span className="text-[9px] px-1 bg-emerald-950 text-emerald-400 rounded border border-emerald-800">
              NDPR
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Confidential intake platform. All mutations audited with HMAC signature.
          </p>
        </div>
      </div>
    </aside>
  );
}
