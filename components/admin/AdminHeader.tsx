'use client';

import React from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  LogOut,
  ChevronDown,
  Building2,
  Lock,
  Sparkles,
  KeyRound,
} from 'lucide-react';
import { ProfileRecord, AdminRole } from '@/lib/types/database';
import { getRoleBadgeColor, formatRoleLabel } from '@/lib/auth/permissions';
import { COMPANY } from '@/lib/routes';

interface AdminHeaderProps {
  currentStaff: ProfileRecord;
  staffList: ProfileRecord[];
  onSwitchStaff: (staff: ProfileRecord) => void;
  onSignOut: () => void;
  onChangePassword?: () => void;
}

export function AdminHeader({
  currentStaff,
  staffList,
  onSwitchStaff,
  onSignOut,
  onChangePassword,
}: AdminHeaderProps) {
  const roleBadge = getRoleBadgeColor(currentStaff.role);

  return (
    <header className="h-16 bg-[#0E1626] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left: Organization & Environment */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative w-36 h-9">
            <Image
              src="/brand/logo-white.png"
              alt="Sijam Consults"
              fill
              sizes="144px"
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800/60">
            {COMPANY.cacNumber}
          </span>
        </div>
      </div>

      {/* Right: Role Switcher & Persona controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Active Persona Dropdown */}
        <div className="flex items-center gap-2 bg-[#162032] border border-slate-700/80 rounded-xl px-2.5 py-1.5 shadow-sm">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-200">
              {currentStaff.full_name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {currentStaff.department}
            </span>
          </div>

          <div
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${roleBadge.bg} ${roleBadge.text} ${roleBadge.border}`}
          >
            {formatRoleLabel(currentStaff.role)}
          </div>

          {/* Quick Persona Selector for live RBAC demonstration */}
          <div className="relative group">
            <label htmlFor="persona-select" className="sr-only">Switch Staff Persona</label>
            <select
              id="persona-select"
              aria-label="Switch Staff Persona"
              value={currentStaff.id}
              onChange={(e) => {
                const selected = staffList.find((s) => s.id === e.target.value);
                if (selected) onSwitchStaff(selected);
              }}
              className="bg-transparent text-xs text-purple-300 font-mono focus:outline-none cursor-pointer py-0.5 pl-1 pr-4 appearance-none"
            >
              {staffList.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  Switch to: {s.full_name} ({formatRoleLabel(s.role)})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-0 top-1.5 pointer-events-none" />
          </div>
        </div>

        {/* Change Password */}
        {onChangePassword && (
          <button
            onClick={onChangePassword}
            title="Change Account Password"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
          >
            <KeyRound className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Password</span>
          </button>
        )}

        {/* Sign Out */}
        <button
          onClick={onSignOut}
          title="Sign out of administrative session"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-300 bg-slate-800/80 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-800/60 rounded-xl transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
