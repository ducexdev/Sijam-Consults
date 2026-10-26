'use client';

import React, { useState } from 'react';
import {
  Send,
  X,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  Loader2,
} from 'lucide-react';

export interface WhatsAppClientInfo {
  fullName: string;
  phone: string;
  referenceCode: string;
  serviceOrCorridor: string;
  officerName?: string;
  consultationFee?: string;
  appointmentDate?: string;
}

interface WhatsAppNotificationModalProps {
  client: WhatsAppClientInfo;
  isOpen: boolean;
  onClose: () => void;
}

type TemplateKey =
  | 'lead_acknowledgement'
  | 'consultation_paid'
  | 'embassy_interview'
  | 'visa_approval';

interface TemplateDef {
  title: string;
  category: 'Transactional' | 'Notification' | 'Milestone';
  buildText: (c: WhatsAppClientInfo) => string;
}

const TEMPLATES: Record<TemplateKey, TemplateDef> = {
  lead_acknowledgement: {
    title: 'Speed-to-Lead Instant Intake Notice (< 2 mins)',
    category: 'Transactional',
    buildText: (c) =>
      `Hello ${c.fullName},\n\nThank you for reaching out to Sijam Consults Limited regarding your ${c.serviceOrCorridor} file (Ref: ${c.referenceCode}).\n\nYour file has been routed to our senior consular triage desk. A designated case officer (${c.officerName || 'James Samson'}) is currently reviewing your profile to determine regulatory eligibility.\n\nTo fast-track your intake assessment, please reply directly to this message or reply "READY" to connect with your case officer immediately.\n\nSijam Consults Limited\nCAC RC: 1715416 · Global Access. Trusted Support.`,
  },
  consultation_paid: {
    title: 'Consultation Fee Receipt & Appointment Booking',
    category: 'Transactional',
    buildText: (c) =>
      `Official Payment Receipt — Sijam Consults Limited\n\nDear ${c.fullName},\n\nWe have verified your consultation retainer fee (${c.consultationFee || '₦50,000 / $100'}) under Reference: ${c.referenceCode}.\n\nYour priority consultation session has been scheduled:\n📅 Session: ${c.appointmentDate || 'Confirmed within 24 business hours'}\n👨‍💼 Senior Consultant: ${c.officerName || 'James Samson (Managing Director)'}\n📍 Channel: WhatsApp Video / In-Person Consular Desk\n\nPlease ensure your educational credentials and international passport data page are ready for verification.\n\nSijam Consults Limited`,
  },
  embassy_interview: {
    title: 'Consular Interview & Biometrics Filing Notice',
    category: 'Notification',
    buildText: (c) =>
      `URGENT: Consular Submission Notice — Sijam Consults Limited\n\nDear ${c.fullName},\n\nYour consular appointment date for ${c.serviceOrCorridor} has been confirmed:\n\n📅 Date & Time: ${c.appointmentDate || 'Scheduled date'}\n🏛️ Venue: Consular Section / VFS Global Application Centre\n📄 Mandatory Checklist:\n1. Barcoded appointment confirmation slip\n2. Original authenticated documents & legalized translations\n3. Proof of accommodation & institutional sponsorship certificate\n\nYour case officer will conduct a pre-interview briefing with you 24 hours prior. Please do not miss this slot.\n\nSijam Consults Limited`,
  },
  visa_approval: {
    title: 'Visa Issuance & Decision Milestone Celebration',
    category: 'Milestone',
    buildText: (c) =>
      `🎉 VISA ISSUANCE NOTIFICATION — SIJAM CONSULTS LIMITED\n\nCongratulations, ${c.fullName}!\n\nWe are delighted to formally confirm that your ${c.serviceOrCorridor} has been APPROVED by the consular authorities.\n\nFile Reference: ${c.referenceCode}\nStatus: Passport Ready for Collection / Digital Visa Verified\n\nPlease contact your primary case officer to finalize pre-departure compliance and employer induction protocols.\n\nWarmest congratulations on reaching this milestone!\n\nSijam Consults Limited · Management`,
  },
};

export function WhatsAppNotificationModal({
  client,
  isOpen,
  onClose,
}: WhatsAppNotificationModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('lead_acknowledgement');
  const [sendingApi, setSendingApi] = useState(false);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cleanPhone = client.phone.replace(/[^0-9]/g, '');
  const messageBody = TEMPLATES[selectedTemplate].buildText(client);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatchCloudApi = async () => {
    setSendingApi(true);
    setApiSuccess(null);
    try {
      const res = await fetch('/api/notifications/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          clientName: client.fullName,
          referenceCode: client.referenceCode,
          templateKey: selectedTemplate,
          message: messageBody,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Cloud API dispatch error');
      }

      setApiSuccess(`WhatsApp message queued via Cloud API (ID: ${data.messageId || 'WA-' + Date.now()})`);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      // Fallback directly to web
      window.open(
        `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageBody)}`,
        '_blank'
      );
    } finally {
      setSendingApi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1224] border border-[#1E294B] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1E294B] bg-[#070D1A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-white">
                  WhatsApp Cloud Dispatch
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 border border-emerald-800 text-emerald-400">
                  Verified Business API
                </span>
              </div>
              <p className="text-xs text-slate-400">
                To: {client.fullName} ({client.phone}) • Ref: {client.referenceCode}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Template Selector */}
          <div>
            <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 mb-2">
              Select Official Engagement Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => {
                const tmpl = TEMPLATES[key];
                const isSelected = selectedTemplate === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTemplate(key)}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-purple-950/50 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                        : 'bg-[#0E172E] border-[#1C2642] text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] font-bold line-clamp-1">{tmpl.title}</span>
                    <span className="text-[10px] text-purple-400 font-mono mt-1">
                      {tmpl.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Chat Preview Bubble */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Message Preview (What Client Sees)
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#081514] border border-emerald-900/40 relative font-sans">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-900/30">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
                  S
                </div>
                <span className="text-xs font-bold text-emerald-300">
                  Sijam Consults Limited Official
                </span>
                <span className="text-[10px] text-emerald-500/70 font-mono ml-auto">
                  Encrypted End-to-End
                </span>
              </div>
              <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {messageBody}
              </p>
            </div>
          </div>

          {apiSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {apiSuccess}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#1E294B] bg-[#070D1A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono">
            Direct corridor: {client.serviceOrCorridor}
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageBody)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#131D38] hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open WhatsApp Web
            </a>

            <button
              onClick={handleDispatchCloudApi}
              disabled={sendingApi || cleanPhone.length < 10}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2"
            >
              {sendingApi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              {sendingApi ? 'Dispatching...' : 'Dispatch Cloud API'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
