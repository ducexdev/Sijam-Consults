'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Handshake,
  Sparkles,
  Plane,
  Luggage,
  Clock,
  Search,
  Globe2,
  FileCheck2,
  Building2,
  Award,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export const EverbrightAllianceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'verification' | 'airlines'>('benefits');

  const supportedAirlines = [
    { name: 'Qatar Airways', hub: 'Doha (DOH)', code: 'QR' },
    { name: 'Turkish Airlines', hub: 'Istanbul (IST)', code: 'TK' },
    { name: 'Emirates', hub: 'Dubai (DXB)', code: 'EK' },
    { name: 'British Airways', hub: 'London Heathrow (LHR)', code: 'BA' },
    { name: 'Lufthansa', hub: 'Frankfurt (FRA)', code: 'LH' },
    { name: 'Ethiopian Airlines', hub: 'Addis Ababa (ADD)', code: 'ET' },
    { name: 'KLM Royal Dutch', hub: 'Amsterdam (AMS)', code: 'KL' },
    { name: 'Air France', hub: 'Paris (CDG)', code: 'AF' },
    { name: 'Virgin Atlantic', hub: 'London (LHR)', code: 'VS' },
    { name: 'EgyptAir', hub: 'Cairo (CAI)', code: 'MS' },
    { name: 'Royal Air Maroc', hub: 'Casablanca (CMN)', code: 'AT' },
    { name: 'RwandAir', hub: 'Kigali (KGL)', code: 'WB' },
  ];

  const verificationSteps = [
    {
      step: '1',
      title: 'Receive Official Itinerary & 6-Character PNR',
      desc: 'Our joint flight desk issues an official airline booking document containing your passenger name, flight numbers, aircraft type, and unique 6-character PNR booking code (e.g., 7X9KLM).',
    },
    {
      step: '2',
      title: 'Navigate to Official Airline Website',
      desc: 'Open the official website of the operating carrier (e.g., qatarairways.com, turkishairlines.com, or emirates.com) and click "Manage Booking" or "My Trips".',
    },
    {
      step: '3',
      title: 'Enter Booking Reference & Passenger Surname',
      desc: 'Input your 6-character PNR code along with your exact last name as shown on your international passport and booking confirmation.',
    },
    {
      step: '4',
      title: 'Confirm Live Aircraft Seat Reservation',
      desc: 'The airline portal will immediately display your confirmed itinerary, flight schedule, seat assignment, and luggage entitlement. Consular officers verify files using this exact same system.',
    },
  ];

  const allianceHighlights = [
    {
      icon: ShieldCheck,
      title: 'Direct GDS Consolidator Access',
      desc: 'Everbright Travels operates direct terminal credentials across certified Global Distribution Systems (Amadeus and Sabre), issuing live GDS PNR codes with zero third-party scraping risks.',
    },
    {
      icon: FileCheck2,
      title: '100% Embassy-Ready Dossiers',
      desc: 'Accepted seamlessly across Schengen consulates (France, Poland, Germany, Italy, Spain), UK Visas & Immigration (UKVI), US Embassies, and Canadian IRCC visa centers.',
    },
    {
      icon: Luggage,
      title: 'Exclusive Student & Worker Fares',
      desc: 'Special bilateral fare categories offering up to 40kg–46kg excess student luggage allowances and waiver of date change penalties in case of consular processing delays.',
    },
    {
      icon: Clock,
      title: 'Rapid 60-Minute Turnaround',
      desc: 'Urgent visa appointments accommodated with verified electronic itineraries dispatched to your email and WhatsApp within 60 to 120 minutes of request.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#09051C] via-[#0E072E] to-[#09051C] text-white border-b border-purple-950/70 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#257CFF]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#402493]/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
            <Handshake className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Official Aviation Strategic Alliance
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Sijam Consults &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-cyan-300 to-[#257CFF]">
              Everbright Travels &amp; Consultants Limited
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            To provide our clients with the gold standard in verifiable airline reservations and seamless international flight ticketing, Sijam Consults Limited operates in certified bilateral alliance with <strong>Everbright Travels &amp; Consultants Limited</strong> — <em>“...Simplifying Your World”</em>.
          </p>
        </div>

        {/* Strategic Partner Spotlight Card */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Partner Info & Logo Showcase */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Bilateral Aviation Partner</span>
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Amadeus &amp; Sabre GDS Certified
                </span>
              </div>

              {/* Logo Card Presentation */}
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white p-6 shadow-xl max-w-md border border-slate-200">
                <div className="relative h-16 w-52">
                  <Image
                    src="/partners/everbright-travels-logo.png"
                    alt="Everbright Travels & Consultants Limited Logo"
                    fill
                    sizes="208px"
                    className="object-contain"
                  />
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                    Everbright Travels
                  </div>
                  <div className="text-[10px] text-slate-500 italic mt-0.5">
                    ...Simplifying Your World
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Why This Bilateral Alliance Protects Your Visa &amp; Wallet
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Through Everbright Travels’ direct airline consolidator contracts and certified Global Distribution System (GDS) ticketing terminals, Sijam Consults clients receive genuine, live airline seat reservations. You never have to worry about consular refusal letters citing unconfirmed dummy itineraries or forfeiting hundreds of thousands of Naira on non-refundable tickets prior to visa grant.
                </p>
              </div>

              {/* Key SLA Metric Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-lg font-black text-emerald-400">100%</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">Verifiable PNR</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-lg font-black text-[#4DA5EC]">&lt; 90m</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">Fast Turnaround</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-lg font-black text-purple-300">46kg</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">Student Baggage</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-lg font-black text-amber-300">30+</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">Partner Airlines</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Tab Selector & Content */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
              {/* Tab Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('benefits')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'benefits'
                      ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Core Perks
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('verification')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'verification'
                      ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  How to Verify
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('airlines')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'airlines'
                      ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Carriers
                </button>
              </div>

              {/* Tab 1: Benefits */}
              {activeTab === 'benefits' && (
                <div className="space-y-4 animate-fade-in">
                  {allianceHighlights.map((hl, idx) => {
                    const Icon = hl.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="w-9 h-9 rounded-xl bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{hl.title}</div>
                          <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">{hl.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Verification Tutorial */}
              {activeTab === 'verification' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#4DA5EC] mb-1">
                    4-Step Consular Verification Process
                  </div>
                  {verificationSteps.map((st) => (
                    <div key={st.step} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="w-6 h-6 rounded-full bg-[#4DA5EC]/20 text-[#4DA5EC] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {st.step}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white">{st.title}</div>
                        <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Supported Airlines */}
              {activeTab === 'airlines' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Accessible Global Airlines (Amadeus / Sabre)
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1">
                    {supportedAirlines.map((air, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white line-clamp-1">{air.name}</div>
                          <div className="text-[10px] text-slate-400">{air.hub}</div>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                          {air.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Booking CTA */}
              <div className="pt-2 border-t border-white/10">
                <a
                  href={`https://wa.me/2347064229556?text=${encodeURIComponent(
                    "Hello Sijam Consult & Everbright Travels Desk, I want to book an embassy flight reservation or ticketing quote."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider text-center shadow-cta flex items-center justify-center gap-2 transition-all"
                >
                  <span>Connect With Everbright Flight Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
