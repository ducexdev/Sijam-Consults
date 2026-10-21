'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X, Sparkles, Globe } from 'lucide-react';
import { COUNTRIES_DATA, type CountryInfo, getCountryByName } from '@/lib/data/countries';

export interface CountrySelectProps {
  value: string;
  onChange: (countryName: string) => void;
  label?: string;
  className?: string;
}

type RegionFilter = 'All' | 'Popular' | 'Europe' | 'North America' | 'Middle East' | 'Asia' | 'Africa' | 'Americas' | 'Oceania';

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  label = 'Preferred Destination Corridor',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('All');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Selected Country data
  const selectedCountry = useMemo(() => {
    return getCountryByName(value) || {
      name: value || 'Poland',
      code: 'PL',
      flag: '🇵🇱',
      region: 'Europe' as const,
      isPopular: true,
      highlight: 'Top EU Work Permit & Study Hub',
    };
  }, [value]);

  // Filter countries based on search and active region filter
  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return COUNTRIES_DATA.filter((country) => {
      // Region filter
      if (activeRegion === 'Popular' && !country.isPopular) return false;
      if (
        activeRegion !== 'All' &&
        activeRegion !== 'Popular' &&
        country.region !== activeRegion
      ) {
        return false;
      }

      // Search filter
      if (!query) return true;
      return (
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        (country.highlight && country.highlight.toLowerCase().includes(query)) ||
        country.region.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activeRegion]);

  // Split into Popular vs All if viewing 'All' and no search query
  const popularSection = useMemo(() => {
    if (searchQuery || activeRegion !== 'All') return [];
    return COUNTRIES_DATA.filter((c) => c.isPopular);
  }, [searchQuery, activeRegion]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input after modal opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredCountries.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries[highlightedIndex]) {
        handleSelect(filteredCountries[highlightedIndex].name);
      }
    }
  };

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setSearchQuery('');
  };

  const regions: RegionFilter[] = [
    'All',
    'Popular',
    'Europe',
    'North America',
    'Middle East',
    'Asia',
    'Africa',
    'Americas',
    'Oceania',
  ];

  return (
    <div className={`relative ${className}`} ref={containerRef} onKeyDown={handleKeyDown}>
      {/* Label & Meta Strip */}
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-bold text-white tracking-wide">
          {label}
        </label>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#4DA5EC] bg-[#257CFF]/10 px-2.5 py-0.5 rounded-full border border-[#257CFF]/20">
          <Globe className="w-3 h-3" />
          <span>195+ Sovereign Corridors</span>
        </span>
      </div>

      {/* Trigger Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#120C33] to-[#0A061C] border text-left transition-all duration-200 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 ${
          isOpen
            ? 'border-[#257CFF] ring-2 ring-[#257CFF]/30 shadow-[0_0_25px_rgba(37,124,255,0.25)]'
            : 'border-white/15 hover:border-white/30 hover:bg-[#160F3D]'
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Flag Avatar */}
          <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {selectedCountry.flag}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-black text-base text-white tracking-tight truncate">
                {selectedCountry.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 border border-white/10 uppercase tracking-wider">
                {selectedCountry.region}
              </span>
              {selectedCountry.isPopular && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Popular</span>
                </span>
              )}
            </div>

            {selectedCountry.highlight ? (
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {selectedCountry.highlight}
              </p>
            ) : (
              <p className="text-xs text-slate-400 truncate mt-0.5">
                Global consular filing &amp; advisory pathway
              </p>
            )}
          </div>
        </div>

        {/* Action / Arrow indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400">
            Change
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
              isOpen
                ? 'bg-[#257CFF] border-[#4DA5EC] text-white rotate-180'
                : 'bg-white/[0.05] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* DROPDOWN POPOVER */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl bg-[#09051B] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl ring-1 ring-white/10 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ maxHeight: '420px' }}
        >
          {/* SEARCH BAR HEADER */}
          <div className="p-3 border-b border-white/10 bg-[#0E092B]/90 shrink-0">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4DA5EC]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Search 195+ countries (e.g. Poland, Canada, UK, Nigeria)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#257CFF] focus:bg-white/[0.09] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* REGION FILTER TABS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar text-xs">
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => {
                    setActiveRegion(region);
                    setHighlightedIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-all cursor-pointer text-[11px] ${
                    activeRegion === region
                      ? 'bg-[#257CFF] text-white shadow-sm'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* COUNTRIES LIST */}
          <div
            ref={listRef}
            className="overflow-y-auto flex-1 divide-y divide-white/[0.04] p-2 space-y-1"
            tabIndex={-1}
          >
            {/* Show Popular First if viewing all with no search */}
            {popularSection.length > 0 && (
              <div className="pb-2">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#4DA5EC] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>High-Volume Sijam Consular Corridors</span>
                </div>
                <div className="space-y-1">
                  {popularSection.map((country) => {
                    const isSelected = country.name === selectedCountry.name;
                    return (
                      <button
                        key={`pop-${country.code}`}
                        type="button"
                        onClick={() => handleSelect(country.name)}
                        className={`w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#257CFF] text-white font-bold shadow-md'
                            : 'hover:bg-white/[0.08] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl shrink-0">{country.flag}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold truncate">
                                {country.name}
                              </span>
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-white/5 text-slate-400'
                                }`}
                              >
                                {country.region}
                              </span>
                            </div>
                            {country.highlight && (
                              <p
                                className={`text-[11px] truncate ${
                                  isSelected ? 'text-blue-100' : 'text-slate-400'
                                }`}
                              >
                                {country.highlight}
                              </p>
                            )}
                          </div>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Matching Countries */}
            <div>
              {popularSection.length > 0 && (
                <div className="px-3 pt-3 pb-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Globe className="w-3 h-3" />
                  <span>All Countries (A – Z)</span>
                </div>
              )}

              {filteredCountries.length === 0 ? (
                <div className="py-8 text-center px-4">
                  <Globe className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-slate-300 font-semibold">
                    No country found matching &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Try searching by full country name or clearing the region filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveRegion('All');
                    }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {filteredCountries.map((country, idx) => {
                    const isSelected = country.name === selectedCountry.name;
                    const isHighlighted = idx === highlightedIndex;
                    return (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleSelect(country.name)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#257CFF] text-white font-bold shadow-md'
                            : isHighlighted
                            ? 'bg-white/[0.08] text-white'
                            : 'hover:bg-white/[0.05] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl shrink-0">{country.flag}</span>
                          <div className="min-w-0">
                            <span className="text-xs sm:text-sm font-semibold truncate block">
                              {country.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-white/[0.04] text-slate-400'
                            }`}
                          >
                            {country.region}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER BAR */}
          <div className="px-3.5 py-2 border-t border-white/10 bg-[#070417] text-[11px] text-slate-400 flex items-center justify-between shrink-0">
            <span>
              Showing <strong className="text-white">{filteredCountries.length}</strong> destination corridors
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              Press <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[9px] text-slate-300">ESC</kbd> to close
            </span>
          </div>
        </div>
      )}

      {/* Helper text */}
      <p className="text-xs text-slate-400 mt-2">
        Select your primary target country. Our case officers cross-reference statutory embassy requirements and visa quota availability for your chosen destination.
      </p>
    </div>
  );
};
