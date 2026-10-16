'use client';

import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Plus, Briefcase, Building2, CheckCircle2 } from 'lucide-react';

interface HeroJobSearchProps {
  onSearchChange?: (term: string) => void;
  onCountryChange?: (country: string) => void;
  onOpenPostModal: () => void;
}

export const HeroJobSearch: React.FC<HeroJobSearchProps> = ({
  onSearchChange,
  onCountryChange,
  onOpenPostModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) onSearchChange(searchTerm);
    if (onCountryChange) onCountryChange(country);

    // Smooth scroll down to directory
    const dir = document.getElementById('directory');
    if (dir) {
      dir.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Upper Management Action Bar */}
      <div className="flex items-center justify-between px-2 text-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-slate-300 text-[11px] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Quota Board • Verified Employers</span>
        </div>

        {/* PROMINENT "POST A JOB" MANAGEMENT BUTTON */}
        <button
          type="button"
          onClick={onOpenPostModal}
          className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3] group-hover:rotate-90 transition-transform duration-200" />
          <span>Post A Foreign Job</span>
          <span className="text-[10px] bg-black/20 text-black px-1.5 py-0.5 rounded-md font-bold">
            Frontend
          </span>
        </button>
      </div>

      {/* Main Unified Search Box */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl w-full"
      >
        <div className="flex items-center gap-3 flex-1 bg-white/10 rounded-xl px-4 py-3">
          <Search className="w-5 h-5 text-white/60 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (onSearchChange) onSearchChange(e.target.value);
            }}
            placeholder="Job title, trade, or skill (e.g. Nurse, Welder, Driver)..."
            className="w-full bg-transparent text-white placeholder:text-white/50 text-sm font-medium focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 flex-1 bg-white/10 rounded-xl px-4 py-3 border-l border-white/10">
          <MapPin className="w-5 h-5 text-white/60 shrink-0" />
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              if (onCountryChange) onCountryChange(e.target.value);
            }}
            className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer [&>option]:bg-[#0D0826] [&>option]:text-white"
          >
            <option value="All">All Destination Corridors (Europe & UK)</option>
            <option value="Poland">Poland 🇵🇱 (Voivodeship Type A)</option>
            <option value="United Kingdom">United Kingdom 🇬🇧 (CoS / NHS)</option>
            <option value="Slovakia">Slovakia 🇸🇰 (Single Work Permit)</option>
            <option value="Portugal">Portugal 🇵🇹 (D1 / D3 Work Visa)</option>
            <option value="Cyprus">Cyprus 🇨🇾 (Resort & Hotel Quotas)</option>
            <option value="Germany">Germany 🇩🇪 (Chancenkarte / Skilled)</option>
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all shrink-0 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Find Jobs</span>
        </button>
      </form>
    </div>
  );
};
