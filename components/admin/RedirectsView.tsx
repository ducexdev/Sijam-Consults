'use client';

import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
} from 'lucide-react';
import { RedirectRecord } from '@/lib/types/database';
import { adminCreateRedirect } from '@/app/actions/admin';

interface RedirectsViewProps {
  redirects: RedirectRecord[];
  onRefresh: () => void;
}

export function RedirectsView({ redirects, onRefresh }: RedirectsViewProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [sourcePath, setSourcePath] = useState('');
  const [destinationPath, setDestinationPath] = useState('');
  const [statusCode, setStatusCode] = useState<308 | 301 | 302 | 307>(308);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminCreateRedirect(sourcePath, destinationPath, statusCode, notes);
      setSuccessMsg('Permanent redirect mapping created and active.');
      setTimeout(() => {
        setIsCreating(false);
        setSourcePath('');
        setDestinationPath('');
        setNotes('');
        setSuccessMsg(null);
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
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            SEO Hygiene & Link Equity Preservation
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            308 Permanent Redirects Manager
          </h1>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Redirect Rule
        </button>
      </div>

      {/* Redirects Table */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Source Legacy URL</th>
                <th className="p-4">Canonical Destination</th>
                <th className="p-4">HTTP Status</th>
                <th className="p-4">Notes / Migration Context</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 text-rose-300">{r.source_path}</td>
                  <td className="p-4 text-emerald-400">{r.destination_path}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-purple-300 text-[10px]">
                      {r.status_code} Permanent
                    </span>
                  </td>
                  <td className="p-4 font-sans text-slate-400 text-xs">
                    {r.notes || 'Legacy route preservation'}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Redirect Rule */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white">
                Add 308 Permanent Redirect Rule
              </h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Source Legacy Path
                </label>
                <input
                  type="text"
                  required
                  value={sourcePath}
                  onChange={(e) => setSourcePath(e.target.value)}
                  placeholder="/old-slug"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Target Canonical Path
                </label>
                <input
                  type="text"
                  required
                  value={destinationPath}
                  onChange={(e) => setDestinationPath(e.target.value)}
                  placeholder="/services/new-slug"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  HTTP Status Code
                </label>
                <select
                  value={statusCode}
                  onChange={(e) => setStatusCode(Number(e.target.value) as 308 | 301 | 302 | 307)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value={308}>308 Permanent Redirect (Recommended for Next.js)</option>
                  <option value={301}>301 Moved Permanently</option>
                  <option value={307}>307 Temporary Redirect</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Context / Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Legacy WordPress migration"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {successMsg && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {successMsg}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition"
                >
                  {loading ? 'Creating...' : 'Create Redirect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
