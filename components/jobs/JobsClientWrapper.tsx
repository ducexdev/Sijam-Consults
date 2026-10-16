'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Globe2,
  Building2,
  Plane,
  Sparkles,
  Plus,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { VIDEOS } from '@/lib/constants/videos';
import { HeroJobSearch } from './HeroJobSearch';
import { CountryCorridors } from './CountryCorridors';
import { FeaturedEmployers } from './FeaturedEmployers';
import { JobsDirectory } from './JobsDirectory';
import { RelocationProcess } from './RelocationProcess';
import { JobTestimonials } from './JobTestimonials';
import { PostJobModal } from './PostJobModal';
import { ROUTES } from '@/lib/routes';

const QUICK_SECTORS = [
  'Healthcare & Nursing',
  'Logistics & Transport',
  'Engineering & Construction',
  'Manufacturing & Production',
  'Information Technology',
  'Hospitality & Tourism',
  'Agriculture & Processing',
  'Skilled Trades',
  'Automotive Assembly',
  'Residential Care',
];

export const JobsClientWrapper: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleHeroSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleHeroCountry = (country: string) => {
    setCountryFilter(country);
  };

  const handleSectorClick = (sector: string) => {
    setSearchTerm(sector);
    const dir = document.getElementById('directory');
    if (dir) {
      dir.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Cinematic Hero — Full-Screen Video Background */}
      <section className="relative overflow-hidden min-h-[62vh] sm:min-h-[68vh] flex flex-col justify-center border-b border-black/60 pt-4 pb-12 sm:pt-6 sm:pb-14">
        {/* ── Video Background ── */}
        <div className="absolute inset-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
            src={VIDEOS.WORK_VISA}
          />
          {/* Dark gradient bottom-up so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
          {/* Subtle brand colour tint */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,_rgba(64,36,147,0.45)_0%,_transparent_70%)]" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-6 sm:space-y-7">
          {/* Main Headline & Write-up (Centered) */}
          <div className="space-y-3.5 max-w-5xl mx-auto text-center">
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] text-white tracking-tight leading-tight drop-shadow-xl sm:whitespace-nowrap">
              Find your next job{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#A855F7]">
                opportunity,
              </span>{' '}
              faster.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-normal max-w-3xl mx-auto">
              Verified foreign employer sponsorships in the UK, Poland, Slovakia, Portugal &amp; Cyprus — including full statutory work permit filings and relocation support.
            </p>
          </div>

          {/* ── Connected Hero Job Search Bar with Frontend "Post A Job" Trigger ── */}
          <HeroJobSearch
            onSearchChange={handleHeroSearch}
            onCountryChange={handleHeroCountry}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />

          {/* ── Bottom Trust Stats (Centered) ── */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-1 text-center">
            <div className="flex items-center gap-2 text-sm text-white/75">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong className="text-white">Zero</strong> illegal placement fees</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Globe2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong className="text-white">5+</strong> destination countries</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Building2 className="w-4 h-4 text-[#4DA5EC] shrink-0" />
              <span><strong className="text-white">Direct</strong> employer sponsorships</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Plane className="w-4 h-4 text-[#F98864] shrink-0" />
              <span><strong className="text-white">Full</strong> relocation pack included</span>
            </div>
          </div>

          {/* ── Browse by sector: immediately after trust stats ── */}
          <div className="border-t border-white/10 pt-5 max-w-4xl mx-auto text-center space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
              Browse by sector:
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_SECTORS.map((sector) => (
                <button
                  key={sector}
                  type="button"
                  onClick={() => handleSectorClick(sector)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.08] hover:bg-[#4DA5EC]/20 text-slate-200 hover:text-white border border-white/15 hover:border-[#4DA5EC]/40 transition-all backdrop-blur-sm cursor-pointer"
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destination Corridors (Billion-Dollar Flag Cards) */}
      <section className="py-14 bg-[#090518] border-b border-purple-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <CountryCorridors />
        </div>
      </section>

      {/* 3. Featured International Employers */}
      <section className="py-14 bg-[#0B071E] border-b border-purple-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FeaturedEmployers />
        </div>
      </section>

      {/* 4. Main Directory & Job Board (With Frontend Post Job Integration) */}
      <section id="directory" className="py-16 bg-[#070415]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40 text-[11px] font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-[#F45A2A]" />
                <span>Active International Vacancies</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white">
                Live Foreign Employer Quotas &amp; Applications
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                Browse open positions with authorized visa sponsorships. Filter by destination nation, technical trade, or contract type.
              </p>
            </div>

            {/* Quick Management Link */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setIsPostModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Post A Foreign Vacancy</span>
              </button>
            </div>
          </div>

          {/* Directory Console */}
          <JobsDirectory
            initialSearchTerm={searchTerm}
            initialCountry={countryFilter}
          />
        </div>
      </section>

      {/* 5. The Relocation Process (4-Step Engine) */}
      <section className="py-16 bg-[#0B071E] border-t border-purple-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <RelocationProcess />
        </div>
      </section>

      {/* 6. Candidate Testimonials & Verification Proofs */}
      <section className="py-16 bg-[#070415] border-t border-purple-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <JobTestimonials />
        </div>
      </section>

      {/* Global Post Job Modal (Triggerable anywhere on the page) */}
      <PostJobModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </>
  );
};
