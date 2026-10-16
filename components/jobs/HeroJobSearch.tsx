'use client';

import React, { useState } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';

import { JOB_DESTINATIONS, DESTINATION_REGIONS } from '@/lib/data/jobs';

interface HeroJobSearchProps {
  onSearchChange?: (term: string) => void;
  onCountryChange?: (country: string) => void;
}

export const HeroJobSearch: React.FC<HeroJobSearchProps> = ({
  onSearchChange,
  onCountryChange,
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
    <div className="w-full max-w-4xl mx-auto">
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
            className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer [&>option]:bg-[#0D0826] [&>option]:text-white [&>optgroup]:bg-[#0D0826] [&>optgroup]:text-purple-300"
          >
            <option value="All">🌍 All Destination Corridors (Europe, UK & Global)</option>
            {DESTINATION_REGIONS.map((region) => {
              const regionDests = JOB_DESTINATIONS.filter((d) => d.region === region);
              if (regionDests.length === 0) return null;
              return (
                <optgroup key={region} label={region}>
                  {regionDests.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.flag} {d.name} ({d.currency})
                    </option>
                  ))}
                </optgroup>
              );
            })}
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
