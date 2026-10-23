'use client';

import React from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  LogOut,
  ChevronDown,
  User,
  Lock,
} from 'lucide-react';
import { ProfileRecord } from '@/lib/types/database';
import { formatRoleLabel } from '@/lib/auth/permissions';
import { COMPANY } from '@/lib/routes';

interface AdminHeaderProps {
  currentStaff: ProfileRecord;
  onSignOut: () => void;
  onChangePassword?: () => void;
}

export function AdminHeader({
  currentStaff,
  onSignOut,
  onChangePassword,
}: AdminHeaderProps) {
  return (
    <header className="h-16 bg-[#060A18] border-b border-[#141B30] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Organization & Environment */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
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
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[#1A1038] text-purple-300 border border-purple-500/40">
            {COMPANY.cacNumber}
          </span>
        </div>
      </div>

      {/* Center / User info & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Staff Persona Pill */}
        <div className="flex items-center gap-2 bg-[#0B1020] border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-200 shadow-sm cursor-pointer hover:border-slate-600 transition">
          <User className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-white">{currentStaff.full_name || 'Principal Administrator'}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Super Administrator Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#201048] text-purple-200 border border-purple-500/40 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>{formatRoleLabel(currentStaff.role) || 'Super Administrator'}</span>
        </div>

        {/* Change Password Button */}
        {onChangePassword && (
          <button
            onClick={onChangePassword}
            title="Change Account Password"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-slate-200 hover:text-white bg-[#0B1020] hover:bg-[#121930] border border-slate-700/60 rounded-xl transition font-medium shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Password</span>
          </button>
        )}

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          title="Sign out of administrative session"
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-slate-200 hover:text-rose-300 bg-[#0B1020] hover:bg-rose-950/30 border border-slate-700/60 hover:border-rose-800/60 rounded-xl transition font-medium shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
