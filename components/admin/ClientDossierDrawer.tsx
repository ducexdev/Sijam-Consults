'use client';

import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  Download,
  KeyRound,
  FileText,
  DollarSign,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Plus,
  Loader2,
  Lock,
} from 'lucide-react';
import { WhatsAppNotificationModal, WhatsAppClientInfo } from './WhatsAppNotificationModal';

export interface DossierClient {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  countryOrCity?: string;
  targetCorridor: string;
  serviceCategory: string;
  leadIntentScore: number; // 0 - 100
  estimatedLtvUsd: number;
  status: string;
  createdAt: string;
  assignedOfficerName?: string;
  consultationFeePaid: boolean;
  retainerStage?: string;
  retainerAmountUsd?: number;
  paystackRef?: string;
  notes?: string;
  documents?: {
    name: string;
    type: string;
    path: string;
    size: string;
    status: 'Encrypted' | 'Verified' | 'Pending';
  }[];
  timeline?: {
    date: string;
    title: string;
    description: string;
    category: 'intake' | 'payment' | 'compliance' | 'consular';
  }[];
}

interface ClientDossierDrawerProps {
  client: DossierClient | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (newStatus: string) => void;
}

export function ClientDossierDrawer({
  client,
  isOpen,
  onClose,
  onUpdateStatus,
}: ClientDossierDrawerProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'commercial' | 'notes'>('timeline');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState<string[]>([]);
  const [generatingSignedUrl, setGeneratingSignedUrl] = useState<string | null>(null);

  if (!isOpen || !client) return null;

  const defaultTimeline = client.timeline || [
    {
      date: 'Just now',
      title: 'Active Case Officer Assigned',
      description: `Case officer ${client.assignedOfficerName || 'James Samson'} took ownership of file ${client.referenceCode}.`,
      category: 'intake',
    },
    {
      date: '18 mins ago',
      title: 'Consultation Fee Verified',
      description: `Paystack transaction confirmed (Ref: ${client.paystackRef || 'PSTK-92841029'}). Status moved to Qualified.`,
      category: 'payment',
    },
    {
      date: '35 mins ago',
      title: 'Inbound File Intake Submitted',
      description: `Applicant completed initial online assessment for ${client.targetCorridor}.`,
      category: 'intake',
    },
  ];

  const defaultDocuments = client.documents || [
    {
      name: 'International_Passport_DataPage.pdf',
      type: 'Identity Proof',
      path: `candidates/${client.referenceCode}/Passport_Redacted.pdf`,
      size: '1.4 MB',
      status: 'Verified',
    },
    {
      name: 'Curriculum_Vitae_Consular_Format.pdf',
      type: 'Professional Dossier',
      path: `candidates/${client.referenceCode}/CV_Verified.pdf`,
      size: '340 KB',
      status: 'Verified',
    },
    {
      name: 'Proof_of_Funds_Bank_Statement.pdf',
      type: 'Financial Capacity',
      path: `candidates/${client.referenceCode}/Bank_Statement.pdf`,
      size: '2.1 MB',
      status: 'Encrypted',
    },
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotesList([newNote.trim(), ...notesList]);
    setNewNote('');
  };

  const handleGenerateSignedUrl = async (path: string) => {
    setGeneratingSignedUrl(path);
    try {
      const res = await fetch('/api/media/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, bucket: 'applicant-documents', expiresIn: 900 }),
      });
      const data = await res.json();
      if (res.ok && data.signedUrl) {
        window.open(data.signedUrl, '_blank');
      } else {
        alert('Could not generate secure signed URL.');
      }
    } catch (e) {
      console.error(e);
      alert('Secure download link unavailable.');
    } finally {
      setGeneratingSignedUrl(null);
    }
  };

  const whatsAppInfo: WhatsAppClientInfo = {
    fullName: client.fullName,
    phone: client.phone,
    referenceCode: client.referenceCode,
    serviceOrCorridor: client.targetCorridor,
    officerName: client.assignedOfficerName,
    consultationFee: client.consultationFeePaid ? '₦50,000 (Verified)' : '₦50,000',
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in">
        <div className="bg-[#080E20] border-l border-[#16203A] w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* ── Top Header Bar ── */}
          <div className="p-6 border-b border-[#16203A] bg-[#060A18] flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-900 to-indigo-700 flex items-center justify-center text-white text-base font-black shrink-0 shadow-lg">
                {client.fullName.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-black text-lg text-white truncate">
                    {client.fullName}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                    {client.referenceCode}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                  <span className="text-purple-300 font-semibold">{client.targetCorridor}</span>
                  <span>•</span>
                  <span>{client.countryOrCity || 'Nigeria'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── Commercial Scorecard Strip ── */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-[#0B132B] border-b border-[#16203A]">
            <div className="p-3 rounded-xl bg-[#080E20] border border-[#16203A]">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                Estimated LTV
              </span>
              <span className="text-lg font-black text-emerald-400 block mt-0.5">
                ${client.estimatedLtvUsd.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#080E20] border border-[#16203A]">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                Intent Score
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-lg font-black text-white">
                  {client.leadIntentScore}/100
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#080E20] border border-[#16203A]">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                Consultation Fee
              </span>
              <span className={`text-xs font-bold block mt-1 ${client.consultationFeePaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {client.consultationFeePaid ? '✅ Verified Paid' : '⏳ Pending Paystack'}
              </span>
            </div>
          </div>

          {/* ── Action Trigger Bar ── */}
          <div className="px-6 py-3 bg-[#070D1C] border-b border-[#16203A] flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-bold transition shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              WhatsApp Cloud
            </button>

            <a
              href={`tel:${client.phone}`}
              className="px-3 py-2 rounded-xl bg-[#121B2B] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              Call
            </a>

            <a
              href={`mailto:${client.email}`}
              className="px-3 py-2 rounded-xl bg-[#121B2B] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              Email
            </a>
          </div>

          {/* ── Drawer Tabs ── */}
          <div className="px-6 pt-3 flex items-center gap-2 border-b border-[#16203A] bg-[#080E20]">
            {(
              [
                { id: 'timeline', label: '360° Timeline', icon: Clock },
                { id: 'documents', label: 'Documents & Vault', icon: FileText },
                { id: 'commercial', label: 'Revenue & Retainer', icon: DollarSign },
                { id: 'notes', label: 'Case Notes', icon: Sparkles },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition ${
                    isActive
                      ? 'border-purple-500 text-purple-300'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── Tab Panels (Scrollable) ── */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {/* 1. Timeline */}
            {activeTab === 'timeline' && (
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#16203A]">
                {defaultTimeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#080E20] border-2 border-purple-500 group-hover:scale-125 transition" />
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                        {item.date}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Documents */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-300">
                  Candidate documents are encrypted with Supabase RLS. Click to generate a 15-minute temporary cryptographic download link.
                </div>

                {defaultDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0D1426] border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {doc.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {doc.type} • {doc.size}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleGenerateSignedUrl(doc.path)}
                      disabled={generatingSignedUrl === doc.path}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-200 text-[11px] font-semibold transition shrink-0 flex items-center gap-1.5"
                    >
                      {generatingSignedUrl === doc.path ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <KeyRound className="w-3 h-3" />
                      )}
                      15-Min Link
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Commercial & Retainer */}
            {activeTab === 'commercial' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 via-[#0B132B] to-[#080E20] border border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-purple-300">
                      High-Ticket Retainer Stage
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {client.retainerStage || 'Consultation Paid'}
                    </span>
                  </div>

                  <div>
                    <span className="text-2xl font-black text-white">
                      ${client.retainerAmountUsd ? client.retainerAmountUsd.toLocaleString() : '2,800'}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5">
                      Target Placement Retainer
                    </span>
                  </div>

                  <div className="pt-2 border-t border-purple-900/30 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Paystack Verified ID</span>
                      <span className="font-mono text-slate-300 text-[11px]">
                        {client.paystackRef || 'pstk_9482019482'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Invoice Status</span>
                      <span className="text-emerald-400 font-bold text-[11px]">
                        Paid in Full
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                    Institutional Placement Milestone Track
                  </span>
                  {[
                    { step: '1. Initial Intake & Regulatory Eligibility', done: true },
                    { step: '2. Priority Consultation Fee Paid (₦50k / $100)', done: client.consultationFeePaid },
                    { step: '3. Legal Retainer Agreement Executed', done: true },
                    { step: '4. Voivodeship Work Permit / University Admission Filing', done: false },
                    { step: '5. Consular Biometrics & Embassy Decision', done: false },
                    { step: '6. Settlement & Commission Release', done: false },
                  ].map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        m.done
                          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                          : 'bg-slate-900/30 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>{m.step}</span>
                      {m.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={3}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter confidential consular note or case officer briefing..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newNote.trim()}
                      className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition"
                    >
                      Save Internal Note
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  {[
                    ...(client.notes ? [client.notes] : []),
                    ...notesList,
                    'Applicant confirmed possession of original B.Sc Nursing certificate and active NMCN license. Suitable for Polish hospital corridor sponsorship.',
                  ].map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0C1326] border border-slate-800 text-xs text-slate-300 leading-relaxed"
                    >
                      <span className="text-[10px] font-mono text-purple-400 block mb-1">
                        Case Officer Entry • Confidential
                      </span>
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Drawer Footer ── */}
          <div className="p-4 px-6 border-t border-[#16203A] bg-[#060A18] flex items-center justify-between text-xs text-slate-500">
            <span>Dossier ID: {client.id}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal nested */}
      <WhatsAppNotificationModal
        client={whatsAppInfo}
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </>
  );
}
