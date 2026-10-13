'use client';

import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  Clock,
  Eye,
  FileCode,
  X,
} from 'lucide-react';
import { AuditLogRecord } from '@/lib/types/database';

interface AuditLogsViewProps {
  logs: AuditLogRecord[];
}

export function AuditLogsView({ logs }: AuditLogsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLogRecord | null>(null);

  const filtered = logs.filter((log) => {
    return (
      searchTerm === '' ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user_email && log.user_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.entity_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Forensic Security Trail • NDPR Compliance Record
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            System Mutation Audit Logs
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-800">
            Immutable Append-Only Log
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter audit trail by action (e.g. jobs.create, consultation.status_change), actor, or entity ID..."
          className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
        />
      </div>

      {/* Logs Table */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Action Code</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">IP Address</th>
                <th className="p-4 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 text-slate-400">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="p-4 text-slate-200">
                    {log.user_email || 'System / Web Visitor'}
                  </td>
                  <td className="p-4 text-purple-300 font-bold">
                    {log.action}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                      {log.entity_type}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1">
                      ({log.entity_id.slice(0, 12)})
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {log.ip_address || '127.0.0.1'}
                  </td>
                  <td className="p-4 text-right font-sans">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                    >
                      Inspect JSON
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-purple-400">
                  Audit Log: {selectedLog.id}
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  Mutation Payload Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Action:</span>
                <span className="text-purple-300">{selectedLog.action}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Entity:</span>
                <span className="text-slate-200">{selectedLog.entity_type} ({selectedLog.entity_id})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-200">{selectedLog.created_at}</span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Details JSON:</span>
                <pre className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-400 overflow-x-auto border border-slate-800 max-h-60">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
