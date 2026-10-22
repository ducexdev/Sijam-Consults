'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plane,
  Ticket,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  RotateCcw,
  Luggage,
  PhoneCall,
  Scale,
  Compass,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

interface FlightCalculatorState {
  destinationType: 'schengen' | 'uk' | 'us' | 'canada' | 'gulf';
  tripType: 'round_trip' | 'one_way' | 'multi_city';
  travelerType: 'tourist' | 'student' | 'worker';
}

export const FlightPnrCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [state, setState] = useState<FlightCalculatorState>({
    destinationType: 'schengen',
    tripType: 'round_trip',
    travelerType: 'tourist',
  });

  const evaluation = useMemo(() => {
    const embassyData = {
      schengen: {
        name: 'Schengen Area (EU Consulates: France, Germany, Italy, Poland)',
        codeType: 'Round-trip mandatory for Type-C tourist/business visas',
        pnrHold: '7 to 14 days active GDS seat hold',
        recommendedCarriers: 'Turkish Airlines, Qatar Airways, Lufthansa, Air France',
        transitWarning: 'Avoid routing through two consecutive Schengen airports (e.g. Frankfurt + Paris) without holding an active Schengen visa, as this requires entering the Schengen internal border zone.',
      },
      uk: {
        name: 'United Kingdom (UK Visas & Immigration - UKVI)',
        codeType: 'Round-trip for visitors; One-way permitted with valid CAS / CoS',
        pnrHold: '7 to 10 days active GDS seat hold',
        recommendedCarriers: 'British Airways, Virgin Atlantic, Qatar Airways, EgyptAir',
        transitWarning: 'Nigerian passport holders transiting through the UK on their way to a third country frequently require a Direct Airside Transit Visa (DATV) unless holding an exemption visa (e.g., valid US/Canada visa).',
      },
      us: {
        name: 'United States (US Embassy Abuja & Consulate Lagos)',
        codeType: 'Tentative round-trip matching DS-160 declarations',
        pnrHold: '7 to 10 days active GDS seat hold',
        recommendedCarriers: 'Delta, United, Qatar Airways, Ethiopian Airlines, Royal Air Maroc',
        transitWarning: 'US visa guidelines specifically instruct applicants NOT to buy non-refundable tickets prior to interview approval. A verifiable GDS reservation fulfills proof of intent.',
      },
      canada: {
        name: 'Canada (IRCC Visa Centers)',
        codeType: 'Tentative round-trip for TRV; One-way for approved study/work permits',
        pnrHold: '10 to 14 days active GDS seat hold',
        recommendedCarriers: 'Air Canada, Lufthansa, KLM, Ethiopian Airlines, Qatar Airways',
        transitWarning: 'Transit through European hubs (London, Paris, Amsterdam) requires adherence to specific airside transfer policies for Nigerian nationals.',
      },
      gulf: {
        name: 'Gulf States (UAE, Saudi Arabia, Qatar, Oman)',
        codeType: 'Round-trip mandatory for tourist; One-way for employment visa',
        pnrHold: '5 to 7 days active GDS seat hold',
        recommendedCarriers: 'Emirates, Qatar Airways, Saudia, EgyptAir, Ethiopian Airlines',
        transitWarning: 'Ensure destination visa issuance matches passenger passport surname order exactly as formatted in GDS PNR.',
      },
    }[state.destinationType];

    const baggagePerks = {
      student: 'Student Fare: 2 pieces of 23kg (up to 46kg total allowance) + flexible date change upon visa receipt',
      worker: 'Relocation Fare: 2 pieces of 23kg + flexible cancellation if consular start date is deferred',
      tourist: 'Standard Economy: 23kg checked bag + 7kg cabin baggage with price freeze',
    }[state.travelerType];

    const tripTypeLabels = {
      round_trip: 'Round Trip (Outbound & Return Itinerary)',
      one_way: 'One Way (Direct Relocation / Student Entry)',
      multi_city: 'Multi-City (Open-Jaw Regional Circuit)',
    }[state.tripType];

    return {
      embassyData,
      baggagePerks,
      tripTypeLabels,
    };
  }, [state]);

  const handleReset = () => {
    setState({
      destinationType: 'schengen',
      tripType: 'round_trip',
      travelerType: 'tourist',
    });
    setCurrentStep(1);
  };

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-5 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#402493]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4DA5EC]/15 border border-[#4DA5EC]/30 text-[10px] font-black uppercase tracking-wider text-[#4DA5EC]">
            <Sparkles className="w-3 h-3" />
            Amadeus &amp; Sabre GDS Terminal
          </div>
          <h2 className="text-lg sm:text-xl font-heading font-black text-white mt-1.5 tracking-tight">
            Flight PNR &amp; Route Verifier
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure verifiable itineraries, GDS hold durations, and transit rules in 2 simple steps.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors pt-1 cursor-pointer shrink-0"
          title="Reset selections"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* 2-Step Progress Indicator Bar */}
      <div className="relative z-10 pt-4 pb-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              currentStep === 1
                ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  currentStep === 1
                    ? 'bg-[#4DA5EC] text-[#070415]'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {currentStep === 2 ? '✓' : '1'}
              </span>
              <div>
                <span className="text-[11px] font-bold block leading-tight">Step 1: Route &amp; Type</span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Jurisdiction &amp; Format</span>
              </div>
            </div>
            {currentStep === 1 && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse shrink-0" />
            )}
          </button>

          {/* Step 2 Pill */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              currentStep === 2
                ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  currentStep === 2
                    ? 'bg-[#4DA5EC] text-[#070415]'
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                2
              </span>
              <div>
                <span className="text-[11px] font-bold block leading-tight">Step 2: PNR Telemetry</span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Hold &amp; Baggage Rules</span>
              </div>
            </div>
            {currentStep === 2 && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse shrink-0" />
            )}
          </button>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] h-full transition-all duration-300"
            style={{ width: currentStep === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 1: ROUTE & PASSENGER PARAMETERS
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="relative z-10 space-y-4 pt-2">
          {/* Destination Corridors */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Target Embassy / Visa Jurisdiction
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'schengen', label: 'Schengen (EU)', flag: '🇪🇺' },
                { id: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
                { id: 'us', label: 'United States', flag: '🇺🇸' },
                { id: 'canada', label: 'Canada (IRCC)', flag: '🇨🇦' },
                { id: 'gulf', label: 'Gulf (UAE/Qatar)', flag: '🇦🇪' },
              ].map((item) => {
                const isSelected = state.destinationType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        destinationType: item.id as FlightCalculatorState['destinationType'],
                      }))
                    }
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)] ring-1 ring-[#257CFF]'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold truncate">{item.label}</span>
                    <span className="text-sm ml-1">{item.flag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              2. Itinerary Routing Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'round_trip', label: 'Round Trip', sub: 'Embassy Preferred' },
                { id: 'one_way', label: 'One Way', sub: 'Study/Work Visa' },
                { id: 'multi_city', label: 'Multi-City', sub: 'Multi-Destination' },
              ].map((item) => {
                const isSelected = state.tripType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        tripType: item.id as FlightCalculatorState['tripType'],
                      }))
                    }
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#402493]/30 border-purple-500/60 text-white shadow-[0_0_15px_rgba(64,36,147,0.3)]'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className="text-[10px] text-slate-400">{item.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passenger Category */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              3. Passenger Category (Baggage &amp; Fare Rules)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tourist', label: 'Tourist / Visitor', perk: 'Price Lock' },
                { id: 'student', label: 'Student Visa', perk: '40–46kg Baggage' },
                { id: 'worker', label: 'Work Relocation', perk: 'Flex Date' },
              ].map((p) => {
                const isSelected = state.travelerType === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        travelerType: p.id as FlightCalculatorState['travelerType'],
                      }))
                    }
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#257CFF]/20 border-[#4DA5EC] text-white shadow-[0_0_15px_rgba(77,165,236,0.25)]'
                        : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-xs font-bold block">{p.label}</span>
                    <span className="text-[10px] text-[#4DA5EC] font-semibold">{p.perk}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 1 Continue Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Continue to PNR verification breakdown</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Next: Review live GDS hold telemetry, airline inventory &amp; transit rules
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: LIVE PNR TELEMETRY & ROUTE BREAKDOWN
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="relative z-10 space-y-3.5 pt-2">
          {/* Dynamic Results Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3.5">
            {/* PNR Telemetry Strip */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Routing &amp; Format</span>
                <span className="text-xs font-bold text-white block">
                  {evaluation.tripTypeLabels}
                </span>
                <span className="text-[10px] text-slate-400">
                  Target: {evaluation.embassyData.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">GDS Active Seat Hold</span>
                <span className="text-xs font-black text-emerald-400 flex items-center justify-end gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {evaluation.embassyData.pnrHold}
                </span>
              </div>
            </div>

            {/* Consular-Compliant Carrier Inventory */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/05 text-xs text-slate-300">
              <span className="text-slate-400 block mb-1 font-bold uppercase text-[10px] tracking-wider">
                Consular-Compliant Carrier Inventory:
              </span>
              <span className="font-semibold text-white">
                {evaluation.embassyData.recommendedCarriers}
              </span>
            </div>

            {/* Embassy Routing Guidance */}
            <div className="p-2.5 rounded-lg bg-[#402493]/20 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed flex items-start gap-2">
              <Scale className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0 mt-0.5" />
              <span>{evaluation.embassyData.codeType}</span>
            </div>

            {/* Baggage Perk Notice */}
            <div className="p-2.5 rounded-lg bg-[#257CFF]/15 border border-[#4DA5EC]/30 text-[11px] text-cyan-200 leading-relaxed flex items-start gap-2">
              <Luggage className="w-3.5 h-3.5 text-[#4DA5EC] shrink-0 mt-0.5" />
              <span>{evaluation.baggagePerks}</span>
            </div>

            {/* Layover Transit Warning */}
            <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200 leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">Critical Layover / Transit Warning:</span>
                <span>{evaluation.embassyData.transitWarning}</span>
              </div>
            </div>

            {/* PNR Authenticity Strip */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
              <span>Verifiable on Airline &lsquo;Manage Booking&rsquo;</span>
              <span className="text-[#4DA5EC] font-bold">100% GDS Amadeus/Sabre</span>
            </div>
          </div>

          {/* Step 2 Actions */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="#booking-widget"
                className="group inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request flight reservation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.number}?text=Hello%20Sijam%20Consults%20and%20Everbright%20Travels%20Desk,%20I%20need%20a%20verifiable%20flight%20reservation%20with%20an%20active%20GDS%20PNR%20for%20my%20visa%20application.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-xs tracking-wide border border-purple-500/40 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span>Chat with aviation desk</span>
              </a>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to edit parameters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
