'use client';

import React, { useState } from 'react';
import {
  Settings,
  ArrowRightLeft,
  History,
  Mail,
  Building2,
  ShieldCheck,
  Server,
  Layers,
} from 'lucide-react';
import { RedirectRecord, AuditLogRecord } from '@/lib/types/database';
import { SettingsView } from './SettingsView';
import { RedirectsView } from './RedirectsView';
import { AuditLogsView } from './AuditLogsView';

export type InfraSubTab = 'settings' | 'redirects' | 'audit_logs';

interface InfrastructureSettingsViewProps {
  initialSubTab?: InfraSubTab;
  redirects: RedirectRecord[];
  auditLogs: AuditLogRecord[];
  onRefresh: () => void;
}

export function InfrastructureSettingsView({
  initialSubTab = 'settings',
  redirects,
  auditLogs,
  onRefresh,
}: InfrastructureSettingsViewProps) {
  const [subTab, setSubTab] = useState<InfraSubTab>(initialSubTab);

  return (
    <div className="space-y-6">
      {/* Infrastructure Top Command Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B1024] via-[#0E1530] to-[#080D20] border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Platform Infrastructure & Security Governance</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold font-heading text-white">
              Infrastructure, Routing & Forensic Audit
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Centralized operational controls for Cloudflare edge routing, cPanel transactional mail relays, and NDPR-compliant immutable audit trails.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#060A18] p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setSubTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                subTab === 'settings'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-lg shadow-[#257CFF]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>SMTP & Config</span>
            </button>

            <button
              onClick={() => setSubTab('redirects')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                subTab === 'redirects'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-lg shadow-[#257CFF]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>308 Redirects</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                {redirects.length}
              </span>
            </button>

            <button
              onClick={() => setSubTab('audit_logs')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                subTab === 'audit_logs'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-lg shadow-[#257CFF]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Forensic Trail</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                {auditLogs.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Active Sub-View */}
      {subTab === 'settings' && <SettingsView />}
      {subTab === 'redirects' && <RedirectsView redirects={redirects} onRefresh={onRefresh} />}
      {subTab === 'audit_logs' && <AuditLogsView logs={auditLogs} />}
    </div>
  );
}
