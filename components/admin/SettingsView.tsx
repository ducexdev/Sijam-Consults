'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Mail,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Send,
  Lock,
  RefreshCw,
  Clock,
  RotateCw,
} from 'lucide-react';
import { COMPANY } from '@/lib/routes';
import { adminTestSmtp } from '@/app/actions/admin';
import { adminGetEmailOutbox, adminRetryOutboxEmail } from '@/app/actions/consultations';
import { EmailOutboxRecord } from '@/lib/types/database';

export function SettingsView() {
  const [testEmail, setTestEmail] = useState('james.samson@sijamconsults.com');
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Email Outbox state
  const [outboxItems, setOutboxItems] = useState<EmailOutboxRecord[]>([]);
  const [outboxLoading, setOutboxLoading] = useState(true);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const fetchOutbox = async () => {
    setOutboxLoading(true);
    try {
      const items = await adminGetEmailOutbox();
      setOutboxItems(items);
    } catch (err) {
      console.error('Failed to load outbox queue:', err);
    } finally {
      setOutboxLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    adminGetEmailOutbox()
      .then((items) => {
        if (!ignore) {
          setOutboxItems(items);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error('Failed to load outbox queue:', err);
        }
      })
      .finally(() => {
        if (!ignore) {
          setOutboxLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleRetryEmail = async (id: string) => {
    setRetryingId(id);
    try {
      await adminRetryOutboxEmail(id);
      await fetchOutbox();
    } catch (err) {
      console.error('Failed to retry email dispatch:', err);
    } finally {
      setRetryingId(null);
    }
  };

  const handleTestSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTestResult(null);
    try {
      const res = await adminTestSmtp(testEmail);
      setTestResult(res.message);
    } catch (err) {
      console.error(err);
      setTestResult('SMTP dispatch error. Check cPanel host credentials.');
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
            Configuration & Legal Identity • Infrastructure Relay
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            System Settings & SMTP Mailer
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800">
            cPanel SMTP: 465 SSL Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Legal Identity & Operating Coordinates */}
        <div className="bg-[#121B2B] rounded-2xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Building2 className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Company Legal Identity Coordinates
              </h3>
              <p className="text-[11px] text-slate-400">
                Official statutory data recorded with the Corporate Affairs Commission.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Registered Business Name:</span>
              <span className="text-white font-semibold">{COMPANY.legalName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">CAC Registration Number:</span>
              <span className="text-purple-300 font-mono font-bold">{COMPANY.cacNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Kaduna Consular Hub:</span>
              <span className="text-white text-right max-w-xs">{COMPANY.address.full}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Direct Case Hotline:</span>
              <span className="text-slate-200 font-mono">{COMPANY.phones.primary}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">WhatsApp Intake Desk:</span>
              <span className="text-emerald-400 font-mono">+{COMPANY.whatsapp.number}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Primary Advisory Email:</span>
              <span className="text-slate-200 font-mono">{COMPANY.emails.primary}</span>
            </div>
          </div>
        </div>

        {/* Right: Transactional SMTP Relay */}
        <div className="bg-[#121B2B] rounded-2xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                cPanel Transactional SMTP Engine
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated email receipts for appointments, candidate applications & reviews.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">SMTP Server Host:</span>
              <span className="text-white font-mono">mail.sijamconsults.com</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Port & Encryption:</span>
              <span className="text-emerald-300 font-mono">Port 465 (SSL/TLS Encrypted)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Sender Identity:</span>
              <span className="text-white font-mono">&quot;SIJAM Consults&quot; &lt;no-reply@sijamconsults.com&gt;</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">NDPR PII Compliance:</span>
              <span className="text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> Enforced
              </span>
            </div>
          </div>

          {/* Test Dispatch Form */}
          <form onSubmit={handleTestSmtp} className="pt-3 border-t border-slate-800 space-y-3">
            <label className="block text-[11px] uppercase font-bold text-slate-400">
              Dispatch Verification Ping / Test Relay
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="officer@sijamconsults.com"
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-[#257CFF]/25 transition shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                {loading ? 'Relaying...' : 'Send Test Email'}
              </button>
            </div>

            {testResult && (
              <div className="p-3 rounded-xl bg-slate-900 border border-purple-800/60 text-purple-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{testResult}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Email Outbox Queue & Delivery Telemetry */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Durable Transactional Email Outbox Queue
              </h3>
              <p className="text-[11px] text-slate-400">
                Persistent buffer for cPanel SMTP relays, delivery retry workers, and failure auditing.
              </p>
            </div>
          </div>
          <button
            onClick={fetchOutbox}
            disabled={outboxLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${outboxLoading ? 'animate-spin' : ''}`} />
            Refresh Queue
          </button>
        </div>

        {outboxItems.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No outgoing messages recorded in the current session outbox buffer. Test dispatch above to populate.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Template</th>
                  <th className="py-3 px-3">Recipient</th>
                  <th className="py-3 px-3">Subject</th>
                  <th className="py-3 px-3">Attempts</th>
                  <th className="py-3 px-3">Timestamp</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {outboxItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'sent'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                            : item.status === 'failed'
                            ? 'bg-red-950/80 text-red-300 border border-red-800'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {item.status === 'sent' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {item.status === 'failed' && <AlertCircle className="w-3 h-3 text-red-400" />}
                        {item.status !== 'sent' && item.status !== 'failed' && <Clock className="w-3 h-3 text-amber-400" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-purple-300">
                      {item.template_name}
                    </td>
                    <td className="py-3 px-3 text-slate-200">
                      <div>{item.recipient_name || 'Client'}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.recipient_email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 max-w-xs truncate">
                      {item.subject}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400 text-center">
                      {item.attempt_count} / {item.max_attempts}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {item.status !== 'sent' ? (
                        <button
                          onClick={() => handleRetryEmail(item.id)}
                          disabled={retryingId === item.id}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-200 text-[11px] font-semibold transition cursor-pointer"
                        >
                          <RotateCw className={`w-3 h-3 ${retryingId === item.id ? 'animate-spin' : ''}`} />
                          Retry
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-500/80 font-mono">Delivered</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
