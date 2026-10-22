'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  CheckCircle2,
  ExternalLink,
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe2,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';
import { COMPANY, ROUTES } from '@/lib/routes';

interface DeskLocation {
  id: 'kaduna' | 'abuja' | 'global';
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  addressLines: string[];
  landmarks: string;
  operatingHours: string;
  directPhone: string;
  phoneRaw: string;
  email: string;
  consultationType: string;
  mapQuery: string;
  notes: string;
}

const DESKS: Record<'kaduna' | 'abuja' | 'global', DeskLocation> = {
  kaduna: {
    id: 'kaduna',
    name: 'Kaduna Corporate Headquarters',
    tagline: 'Physical Walk-in Office, Executive Consultation Chambers & Document Audit Desk',
    badge: 'Headquarters & Walk-Ins',
    badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    addressLines: [
      "The Lord's Doing Plaza, No. 2/4",
      'Suite A10, 2nd Floor, Kachia Road',
      'Ungwan Boro (Opposite Our Lady of Fatima)',
      'P.O. Box 12962, Kaduna State, Nigeria',
    ],
    landmarks: 'Located directly opposite Our Lady of Fatima Catholic Church, along the main Kachia Road corridor.',
    operatingHours: 'Monday – Friday: 9:00 AM – 5:00 PM WAT | Saturday: 10:00 AM – 2:00 PM WAT',
    directPhone: '+234 706 422 9556',
    phoneRaw: '2347064229556',
    email: 'info@sijamconsults.com',
    consultationType: 'Walk-ins welcome & pre-scheduled 1-on-1 strategy sessions',
    mapQuery: 'The Lords Doing Plaza Kachia Road Kaduna Nigeria',
    notes: 'Clients visiting for document attestation, original passport reviews, or in-person mock interviews are received in our secure executive conference chambers.',
  },
  abuja: {
    id: 'abuja',
    name: 'Abuja Consular Liaison Desk',
    tagline: 'Diplomatic Mission Coordination, Embassy Biometrics & Document Authentication',
    badge: 'Consular & Biometrics Liaison',
    badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    addressLines: [
      'Diplomatic & Central Business District (CBD)',
      'Liaison Desk for Embassy Submissions & MFA Attestation',
      'Abuja Federal Capital Territory, Nigeria',
    ],
    landmarks: 'Minutes from the Ministry of Foreign Affairs (MFA Abuja), VFS Global, and diplomatic visa application centers.',
    operatingHours: 'Monday – Friday: 8:30 AM – 4:30 PM WAT (By Appointment)',
    directPhone: '+234 802 856 2200',
    phoneRaw: '2348028562200',
    email: 'support@sijamconsults.com',
    consultationType: 'By appointment for biometric escort, MFA attestation & consular dispatch',
    mapQuery: 'Central Business District Abuja Nigeria',
    notes: 'Handles document legalization at the Ministry of Foreign Affairs (MFA), VFS/TLS biometrics scheduling, and sovereign embassy dispatch coordination.',
  },
  global: {
    id: 'global',
    name: 'Global Remote & Diaspora Advisory',
    tagline: 'High-Touch Video Consultations & Cross-Border Client Advisory',
    badge: 'Virtual & Worldwide',
    badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    addressLines: [
      'Encrypted Digital Intake & High-Definition Video Channels',
      'Serving Nigerian Diaspora Clients in UK, EU, US, Canada & Middle East',
      'UTC / WAT / GMT Time Zone Matching',
    ],
    landmarks: 'Secure end-to-end digital casework portal with real-time audit milestones and video conferencing.',
    operatingHours: 'Monday – Saturday: Flexible appointment slots accommodating global time zones',
    directPhone: '+234 706 422 9556',
    phoneRaw: '2347064229556',
    email: 'admissions@sijamconsults.com',
    consultationType: 'Secure Zoom / Google Meet / Encrypted WhatsApp consultations',
    mapQuery: 'Sijam Consults Limited Nigeria',
    notes: 'Dedicated to international students, skilled workers, and corporate executives relocating or securing visas from overseas.',
  },
};

export const OfficeLocationHub: React.FC = () => {
  const [activeDesk, setActiveDesk] = useState<'kaduna' | 'abuja' | 'global'>('kaduna');
  const desk = DESKS[activeDesk];

  const whatsappMessage = encodeURIComponent(
    `Hello Sijam Consults, I would like to schedule an inquiry at your ${desk.name}.`,
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B071E] p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#4DA5EC]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#402493]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-wider text-blue-300 mb-2">
            <Sparkles className="w-3 h-3 text-[#4DA5EC]" />
            Verified Physical &amp; Liaison Footprint
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight">
            Interactive Office Location &amp; Advisory Desk Router
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose your preferred advisory desk to view exact address coordinates, landmarks, direct dial extensions, and operating protocols.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>CAC RC: {COMPANY.cacNumber}</span>
        </div>
      </div>

      {/* Desk Switcher Buttons */}
      <div className="relative z-10 py-6 border-b border-white/[0.08] flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'kaduna', label: 'Kaduna Headquarters', icon: Building },
          { id: 'abuja', label: 'Abuja Liaison Desk', icon: MapPin },
          { id: 'global', label: 'Global Remote & Diaspora', icon: Globe2 },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveDesk(item.id as 'kaduna' | 'abuja' | 'global')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeDesk === item.id
                ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] border border-[#4DA5EC]/40 scale-[1.02]'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Active Desk Display Details */}
      <div className="relative z-10 pt-6 space-y-6">
        {/* Banner with Badge */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${desk.badgeColor}`}>
                {desk.badge}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">{desk.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{desk.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`tel:${desk.directPhone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Direct Desk</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp.number}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-200 text-xs font-semibold border border-emerald-500/30 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* 3 Detail Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Physical Address & Coordinates */}
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4DA5EC]">
              <MapPin className="w-4 h-4" />
              <span>Official Address &amp; Routing</span>
            </div>
            <div className="space-y-1 text-xs text-slate-300 leading-relaxed font-medium">
              {desk.addressLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
            <div className="pt-2 border-t border-white/[0.04] text-[11px] text-slate-400">
              <strong className="text-slate-300">Landmark:</strong> {desk.landmarks}
            </div>
          </div>

          {/* Operating Times & Communication Channels */}
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <Clock className="w-4 h-4" />
              <span>Advisory Hours &amp; Hotline</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Business Hours:</span>
                <p className="font-medium">{desk.operatingHours}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Direct Phone:</span>
                <a href={`tel:${desk.directPhone}`} className="text-[#4DA5EC] hover:underline font-bold">
                  {desk.directPhone}
                </a>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Official Email:</span>
                <a href={`mailto:${desk.email}`} className="text-slate-300 hover:text-white">
                  {desk.email}
                </a>
              </div>
            </div>
          </div>

          {/* Engagement Protocol */}
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Casework Protocol</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white block mb-1">Access Method:</strong>
                {desk.consultationType}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {desk.notes}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.04]">
              {desk.id !== 'global' ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(desk.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#4DA5EC] hover:text-white font-bold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps Directions &rarr;</span>
                </a>
              ) : (
                <Link
                  href={ROUTES.consultation}
                  className="inline-flex items-center gap-1.5 text-xs text-[#4DA5EC] hover:text-white font-bold transition-colors"
                >
                  <span>Book Remote Virtual Strategy Session &rarr;</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
