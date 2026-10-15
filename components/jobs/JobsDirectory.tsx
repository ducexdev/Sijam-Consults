'use client';

import React, { useState, useMemo, useRef } from 'react';
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
} from 'lucide-react';
import { JOBS_DATA } from '@/lib/data/jobs';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export const JobsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'salary' | 'deadline'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const listingsRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'Healthcare & Nursing',
    'Logistics & Transport',
    'Engineering & Construction',
    'Manufacturing & Production',
    'Information Technology',
    'Hospitality & Tourism',
    'Agriculture & Processing',
  ];

  const countries = [
    { name: 'All', flag: '🌍' },
    { name: 'Poland', flag: '🇵🇱' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Slovakia', flag: '🇸🇰' },
    { name: 'Portugal', flag: '🇵🇹' },
    { name: 'Cyprus', flag: '🇨🇾' },
  ];

  const employmentTypes = ['All', 'Full-time', 'Contract'];

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

  const filteredJobs = useMemo(() => {
    let result = JOBS_DATA.filter((job) => {
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
  }, [searchTerm, selectedCategory, selectedCountry, selectedType, sortBy]);

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
    setCurrentPage(1);
  };

  const isFiltered = searchTerm !== '' || selectedCategory !== 'All' || selectedCountry !== 'All' || selectedType !== 'All';

  return (
    <div ref={listingsRef} className="space-y-8">
      {/* 1. Main Search & Filter Console HUD */}
      <div className="p-5 sm:p-7 rounded-3xl bg-[#0F0A2A]/90 border border-purple-500/20 backdrop-blur-2xl shadow-2xl space-y-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search Input with Icon */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by foreign job role, skill, or employer (e.g. Nurse, Welder, Driver, IT)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#1A123D]/80 border border-purple-500/25 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#F45A2A] focus:ring-1 focus:ring-[#F45A2A] transition-all"
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

          {/* Quick Destination Select */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-[170px]">
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-[#1A123D]/80 border border-purple-500/25 text-white text-xs font-semibold focus:outline-none focus:border-[#F45A2A]"
              >
                {countries.map((c) => (
                  <option key={c.name} value={c.name} className="bg-[#0B071E] text-white">
                    {c.flag} {c.name === 'All' ? 'All Foreign Countries' : c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 text-xs">
                ▼
              </div>
            </div>

            {/* Sort Select */}
            <div className="relative min-w-[150px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full appearance-none px-4 py-3.5 rounded-2xl bg-[#1A123D]/80 border border-purple-500/25 text-white text-xs font-semibold focus:outline-none focus:border-[#F45A2A]"
              >
                <option value="newest" className="bg-[#0B071E]">Sort: Newest Quotas</option>
                <option value="deadline" className="bg-[#0B071E]">Sort: Closing Soonest</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#F45A2A]" />
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
                className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
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

        {/* Filter Summary & Reset Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-purple-950/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Showing <strong className="text-white font-bold">{filteredJobs.length}</strong> active foreign quotas with official work permit sponsorship
            </span>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 text-[#F98864] hover:text-[#F45A2A] font-semibold cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Job Listings Cards Stack */}
      {paginatedJobs.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/[0.03] border border-white/10 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-white">No Vacancies Match This Exact Filter</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Our international labor desk receives fresh foreign quotas bi-weekly. Clear your search or submit your profile to our talent bank for matching upcoming European quotas.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              Show All Quotas
            </button>
            <Link
              href={ROUTES.consultation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs shadow-cta"
            >
              <span>Consult Employment Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              className={`p-6 sm:p-7 rounded-3xl bg-[#0D0826]/90 border transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1 shadow-xl relative overflow-hidden ${
                job.featured
                  ? 'border-purple-500/40 hover:border-[#F45A2A]/60 bg-gradient-to-br from-[#0F0A2A] via-[#0D0826] to-[#160E3D]'
                  : 'border-white/10 hover:border-purple-500/30 hover:bg-white/[0.04]'
              }`}
            >
              {/* Highlight ribbon for featured */}
              {job.featured && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#F45A2A] to-[#F98864] text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>High Priority Quota</span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Main Content */}
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
                        {job.vacanciesCount} Open Allocations
                      </span>
                    )}
                  </div>

                  {/* Title & Employer */}
                  <div>
                    <Link href={`/jobs/${job.slug}`}>
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-[#F98864] transition-colors leading-snug">
                        {job.title}
                      </h3>
                    </Link>
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

                  {/* Salary Highlight Bar */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/30">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">Salary Package:</span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-400">
                      {job.salaryRange}
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
                          <CheckCircle2 className="w-3 h-3 text-[#F45A2A]" />
                          <span>{perk}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Deadline & Work Permit Notice */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{job.visaSupportDetails.slice(0, 75)}...</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Deadline: <strong className="text-white">{formatDate(job.deadline)}</strong></span>
                    </span>
                  </div>
                </div>

                {/* Right Action Callouts */}
                <div className="flex flex-row lg:flex-col items-stretch lg:items-end justify-between lg:justify-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 min-w-[210px]">
                  <Link
                    href={`/jobs/${job.slug}/apply`}
                    className="flex-1 lg:w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-black uppercase tracking-wider shadow-cta hover:shadow-cta-hover hover:scale-[1.02] transition-all text-center border border-[#4DA5EC]/40"
                  >
                    <span>Apply for Quota</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/jobs/${job.slug}`}
                    className="flex-1 lg:w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-bold border border-white/15 transition-all text-center"
                  >
                    <span>Full Specification</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Pagination Controls */}
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

      {/* 4. Discover Opportunities in Your Field (Jobberman Inspiration Tag Cloud) */}
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
    </div>
  );
};
