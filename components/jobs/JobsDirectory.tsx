'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  Sparkles,
  Plane,
  Home,
  Shield,
  FileCheck,
  Calendar,
  SlidersHorizontal,
  X,
  Users,
  Award,
  Plus,
  Bookmark,
  BookmarkCheck,
  Eye,
  TrendingUp,
  Flame,
  Clock,
  LayoutGrid,
  ListFilter,
  DollarSign,
  Share2,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import {
  JOBS_DATA,
  JOB_DESTINATIONS,
  DESTINATION_REGIONS,
  COMPREHENSIVE_SECTORS,
} from '@/lib/data/jobs';
import { JobListing } from '@/lib/types';
import { formatDate, formatRelativeDays } from '@/lib/utils';
import { formatSalaryDisplay } from '@/lib/utils/currency';
import { ROUTES } from '@/lib/routes';
import { JobSpecsSlideover } from './JobSpecsSlideover';

interface JobsDirectoryProps {
  initialSearchTerm?: string;
  initialCountry?: string;
}

export const JobsDirectory: React.FC<JobsDirectoryProps> = ({
  initialSearchTerm = '',
  initialCountry = 'All',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'salary' | 'deadline'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showNaira, setShowNaira] = useState(false);

  // Slideover Detail Modal state
  const [activeJobForSpecs, setActiveJobForSpecs] = useState<JobListing | null>(null);

  // Saved / Bookmarked Jobs state
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // User/Management posted jobs loaded from localStorage
  const [userJobs, setUserJobs] = useState<JobListing[]>([]);

  const itemsPerPage = 6;
  const listingsRef = useRef<HTMLDivElement>(null);

  // Load custom-posted jobs & bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sijam_posted_jobs');
      if (stored) {
        setUserJobs(JSON.parse(stored));
      }

      const bookmarks = localStorage.getItem('sijam_saved_jobs');
      if (bookmarks) {
        setSavedJobIds(JSON.parse(bookmarks));
      }
    } catch (e) {
      console.error('Failed to load local storage data:', e);
    }

    // Listen for custom event from PostJobModal
    const handleNewJob = (e: any) => {
      if (e.detail) {
        setUserJobs((prev) => [e.detail, ...prev]);
      }
    };
    window.addEventListener('sijam:job_created', handleNewJob);
    return () => window.removeEventListener('sijam:job_created', handleNewJob);
  }, []);

  // Sync external search props
  useEffect(() => {
    if (initialSearchTerm) setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    if (initialCountry) setSelectedCountry(initialCountry);
  }, [initialCountry]);

  // Combine static JOBS_DATA and frontend posted userJobs
  const allAvailableJobs = useMemo(() => {
    // Avoid duplicate IDs if any
    const userJobIds = new Set(userJobs.map((j) => j.id));
    const dedupedStatic = JOBS_DATA.filter((j) => !userJobIds.has(j.id));
    return [...userJobs, ...dedupedStatic];
  }, [userJobs]);

  const categories = useMemo(() => ['All', ...COMPREHENSIVE_SECTORS.map((s) => s.name)], []);

  const countries = useMemo(
    () => [
      { name: 'All', flag: '🌍', region: 'All' },
      ...JOB_DESTINATIONS,
    ],
    []
  );

  const popularTags = [
    { label: 'Registered Nurse', country: 'Poland', category: 'Healthcare & Nursing' },
    { label: 'Senior Care Assistant', country: 'United Kingdom', category: 'Healthcare & Nursing' },
    { label: 'Structural Welder', country: 'Slovakia', category: 'Engineering & Construction' },
    { label: 'HGV Truck Driver', country: 'Poland', category: 'Logistics & Transport' },
    { label: 'Software Engineer', country: 'Poland', category: 'Information Technology' },
    { label: 'Automation Electrician', country: 'Poland', category: 'Manufacturing & Production' },
    { label: 'Bakery Operator', country: 'Poland', category: 'Manufacturing & Production' },
    { label: 'Greenhouse Tech', country: 'Portugal', category: 'Agriculture & Processing' },
    { label: 'Hotel Front Office', country: 'Cyprus', category: 'Hospitality & Tourism' },
  ];

  const handleToggleBookmark = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedJobIds((prev) => {
      const updated = prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];
      try {
        localStorage.setItem('sijam_saved_jobs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleDeleteUserJob = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this job posting?')) {
      const updated = userJobs.filter((j) => j.id !== jobId);
      setUserJobs(updated);
      try {
        localStorage.setItem('sijam_posted_jobs', JSON.stringify(updated));
      } catch {}
    }
  };

  const filteredJobs = useMemo(() => {
    let result = allAvailableJobs.filter((job) => {
      if (showSavedOnly && !savedJobIds.includes(job.id)) {
        return false;
      }

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        (job.perks && job.perks.some((p) => p.toLowerCase().includes(q)));

      const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || job.country === selectedCountry;
      const matchesType = selectedType === 'All' || job.employmentType === selectedType;

      return matchesSearch && matchesCat && matchesCountry && matchesType;
    });

    if (sortBy === 'deadline') {
      result = [...result].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    return result;
  }, [allAvailableJobs, searchTerm, selectedCategory, selectedCountry, selectedType, sortBy, showSavedOnly, savedJobIds]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTagClick = (tag: { label: string; country?: string; category?: string }) => {
    setSearchTerm(tag.label);
    if (tag.country) setSelectedCountry(tag.country);
    if (tag.category) setSelectedCategory(tag.category);
    setCurrentPage(1);
    setShowSavedOnly(false);
    if (listingsRef.current) {
      listingsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCountry('All');
    setSelectedType('All');
    setSortBy('newest');
    setShowSavedOnly(false);
    setCurrentPage(1);
  };

  const isFiltered =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    selectedCountry !== 'All' ||
    selectedType !== 'All' ||
    showSavedOnly;

  return (
    <div ref={listingsRef} className="space-y-6">
      {/* ── TOP BILLION-DOLLAR CONTROL HUD ── */}
      <div className="p-5 sm:p-7 rounded-3xl bg-[#0E092B]/95 border border-purple-500/25 backdrop-blur-2xl shadow-2xl space-y-5">
        {/* Top Control Bar with Saved Roles Tab + Currency Toggle */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Saved Jobs Filter Tab */}
            <button
              type="button"
              onClick={() => {
                setShowSavedOnly((prev) => !prev);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                showSavedOnly
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/10 hover:bg-white/[0.08]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Saved Roles ({savedJobIds.length})</span>
            </button>
          </div>

          {/* Psychology Anchoring: Live Naira Currency Converter Toggle */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
              <span className="text-slate-400 font-medium">Currency:</span>
              <button
                type="button"
                onClick={() => setShowNaira(false)}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  !showNaira
                    ? 'bg-[#4DA5EC] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Foreign (EUR/GBP)
              </button>
              <button
                type="button"
                onClick={() => setShowNaira(true)}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
                  showNaira
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'text-slate-400 hover:text-emerald-400'
                }`}
              >
                <span>₦ NGN (Naira)</span>
                <span className="text-[9px] px-1 py-0.2 bg-emerald-950/60 text-emerald-300 rounded font-black">
                  ~₦1,750/€
                </span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:inline-flex items-center bg-white/[0.04] p-1 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition-colors ${
                  viewMode === 'list' ? 'bg-[#4DA5EC] text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="List view"
              >
                <ListFilter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-colors ${
                  viewMode === 'grid' ? 'bg-[#4DA5EC] text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Input & Dropdowns Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter by job role, technical skill, or foreign employer (e.g. Nurse, Welder, Driver, IT)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#170F3B]/90 border border-purple-500/25 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4DA5EC] focus:ring-1 focus:ring-[#4DA5EC] transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Destination Corridor Select */}
          <div className="relative min-w-[220px]">
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-[#170F3B]/90 border border-purple-500/25 text-white text-xs font-semibold focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
            >
              <option value="All" className="bg-[#0B071E] text-white font-bold">
                🌍 All Destination Corridors ({JOB_DESTINATIONS.length}+ Countries)
              </option>
              {DESTINATION_REGIONS.map((region) => {
                const regionDests = JOB_DESTINATIONS.filter((d) => d.region === region);
                if (regionDests.length === 0) return null;
                return (
                  <optgroup key={region} label={region} className="bg-[#0C0824] text-purple-300 font-bold">
                    {regionDests.map((c) => (
                      <option key={c.name} value={c.name} className="bg-[#0B071E] text-white font-normal">
                        {c.flag} {c.name} ({c.currency})
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 text-xs">
              ▼
            </div>
          </div>

          {/* Sort By Select */}
          <div className="relative min-w-[160px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-[#170F3B]/90 border border-purple-500/25 text-white text-xs font-semibold focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
            >
              <option value="newest" className="bg-[#0B071E]">⚡ Sort: Newest Quotas</option>
              <option value="deadline" className="bg-[#0B071E]">⏳ Sort: Closing Soonest</option>
            </select>
            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#4DA5EC]" />
            Sector:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-md border border-[#4DA5EC]/40 scale-105'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Showing <strong className="text-white font-bold">{filteredJobs.length}</strong> active foreign quotas with official visa sponsorship
            </span>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 text-[#F98864] hover:text-[#F45A2A] font-bold cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters ({filteredJobs.length} results)</span>
            </button>
          )}
        </div>
      </div>

      {/* ── JOB LISTINGS RENDERING ── */}
      {paginatedJobs.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/[0.03] border border-white/10 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-white">No Vacancies Match This Exact Filter</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Our international labor desk receives fresh foreign quotas bi-weekly. Clear your search or post a vacancy directly.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs shadow-md transition-all hover:brightness-110 cursor-pointer"
            >
              Clear Search Filters &amp; Show All Quotas
            </button>
          </div>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
              : 'space-y-4'
          }
        >
          {paginatedJobs.map((job) => {
            const isBookmarked = savedJobIds.includes(job.id);
            const isUserPosted = job.id.startsWith('job-frontend-');

            return (
              <div
                key={job.id}
                onClick={() => setActiveJobForSpecs(job)}
                className={`p-6 sm:p-7 rounded-3xl bg-[#0D0826]/90 border transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1 shadow-xl relative overflow-hidden cursor-pointer ${
                  isUserPosted
                    ? 'border-emerald-500/50 bg-gradient-to-br from-[#0F1B2B] via-[#0D0826] to-[#122425]'
                    : job.featured
                    ? 'border-purple-500/40 hover:border-[#4DA5EC]/60 bg-gradient-to-br from-[#0F0A2A] via-[#0D0826] to-[#160E3D]'
                    : 'border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04]'
                }`}
              >
                {/* Top Ribbons: High Priority or Frontend Management Posted */}
                {isUserPosted ? (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 text-black text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-black" />
                    <span>Frontend Posted</span>
                  </div>
                ) : job.featured ? (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#4DA5EC] to-[#257CFF] text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Priority Quota</span>
                  </div>
                ) : null}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Column / Main Information */}
                  <div className="space-y-3.5 flex-1 min-w-0">
                    {/* Badges Bar */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-[#402493]/60 text-purple-200 border border-purple-500/30">
                        <span>{job.flag || '🌍'}</span>
                        <span>{job.country}</span>
                      </span>

                      <span className="px-3 py-1 rounded-full font-medium bg-white/[0.06] text-slate-300 border border-white/10">
                        {job.category}
                      </span>

                      {job.isEmployerVerified && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/40 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Verified Sponsor
                        </span>
                      )}

                      {job.vacanciesCount && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-blue-200 bg-blue-950/50 border border-blue-800/30 text-[11px]">
                          <Users className="w-3 h-3 text-blue-400" />
                          {job.vacanciesCount} Allocations
                        </span>
                      )}

                      {/* Scarcity Pill: Days Remaining */}
                      <span className="text-[11px] text-amber-300 bg-amber-950/40 border border-amber-800/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3" />
                        <span>{formatRelativeDays(job.deadline)}</span>
                      </span>
                    </div>

                    {/* Title & Employer */}
                    <div>
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-[#4DA5EC] transition-colors leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 mt-1.5 flex-wrap">
                        <span className="flex items-center gap-1.5 font-medium text-slate-200">
                          <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                          {job.companyName}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-4 h-4 text-[#F45A2A] shrink-0" />
                          {job.location}
                        </span>
                        {job.experienceLevel && (
                          <span className="flex items-center gap-1 text-purple-300 font-medium text-xs bg-purple-950/40 px-2.5 py-0.5 rounded-lg border border-purple-800/30">
                            <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            {job.experienceLevel}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Salary Highlight Bar with Real-time Currency Converter */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30">
                      <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                        {showNaira ? 'Naira Package (~Est):' : 'Statutory Compensation:'}
                      </span>
                      <span className="text-sm sm:text-base font-black text-emerald-400">
                        {formatSalaryDisplay(job.salaryRange, showNaira)}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
                      {job.description}
                    </p>

                    {/* Relocation Perks Chips */}
                    {job.perks && job.perks.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap pt-1">
                        {job.perks.map((perk, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/[0.05] text-purple-200 border border-white/10"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#4DA5EC]" />
                            <span>{perk}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Actions Column */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between lg:justify-center gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 w-full sm:w-auto min-w-0 sm:min-w-[210px]">
                    {/* Apply for Quota */}
                    <Link
                      href={`/jobs/${job.slug}/apply`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full sm:flex-1 lg:w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-black uppercase tracking-wider shadow-cta hover:shadow-cta-hover hover:scale-[1.02] transition-all text-center border border-[#4DA5EC]/40"
                    >
                      <span>Apply for Quota</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Quick Specs View Drawer Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveJobForSpecs(job);
                      }}
                      className="w-full sm:flex-1 lg:w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-bold border border-white/15 transition-all text-center cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#4DA5EC]" />
                      <span>View Specifications</span>
                    </button>

                    {/* Bookmark & Management Delete Bar */}
                    <div className="flex items-center justify-end gap-2 w-full pt-1">
                      <button
                        type="button"
                        onClick={(e) => handleToggleBookmark(job.id, e)}
                        className={`p-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          isBookmarked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                        <span className="text-[11px] hidden sm:inline">
                          {isBookmarked ? 'Saved' : 'Save'}
                        </span>
                      </button>

                      {isUserPosted && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteUserJob(job.id, e)}
                          className="p-2 rounded-xl text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20"
                          title="Delete posted job"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              listingsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-xs font-bold border border-white/10 transition-colors"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCurrentPage(i + 1);
                listingsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-10 h-10 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                currentPage === i + 1
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta border border-[#4DA5EC]/40 scale-105'
                  : 'bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              listingsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-xs font-bold border border-white/10 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Discover Opportunities by Specific Skill Tag Cloud */}
      <div className="p-7 sm:p-8 rounded-3xl bg-[#0F0A2A]/80 border border-purple-500/20 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-[#F45A2A]" />
          <h3 className="font-heading font-black text-lg text-white">
            Discover Verified Foreign Opportunities by Specific Skill
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
          Click on any high-demand foreign skill or job title below to instantly filter active European and international employer sponsorships:
        </p>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {popularTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-gradient-to-r hover:from-[#4DA5EC] hover:to-[#257CFF] text-slate-200 hover:text-white border border-white/10 hover:border-transparent transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span>{tag.label}</span>
              <span className="ml-1.5 text-[10px] text-purple-300">({tag.country})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── MODALS & SLIDEOVERS ── */}
      {/* Slideover Full Specifications Drawer */}
      <JobSpecsSlideover
        job={activeJobForSpecs}
        onClose={() => setActiveJobForSpecs(null)}
        showNaira={showNaira}
      />
    </div>
  );
};
