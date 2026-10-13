'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  DollarSign,
  Calendar,
  Building2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { JOBS_DATA } from '@/lib/data/jobs';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export const JobsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories = ['All', 'Healthcare & Nursing', 'Information Technology', 'Engineering & Construction', 'Hospitality & Tourism', 'Agriculture & Processing'];
  const countries = ['All', 'Poland', 'Slovakia', 'Cyprus', 'Portugal'];
  const employmentTypes = ['All', 'Full-time', 'Contract'];

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || job.country === selectedCountry;
      const matchesType = selectedType === 'All' || job.employmentType === selectedType;

      return matchesSearch && matchesCat && matchesCountry && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedCountry, selectedType]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls HUD */}
      <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search verified positions by title, specialty or skill (e.g. Nurse, Welder, Developer)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#F45A2A] transition-colors"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Sector / Industry
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0D0826] border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#F45A2A]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Destination Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0D0826] border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#F45A2A]"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Engagement Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0D0826] border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#F45A2A]"
            >
              {employmentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
          <div>
            Showing <strong className="text-white">{filteredJobs.length}</strong> authenticated international openings
          </div>
          {(selectedCategory !== 'All' || selectedCountry !== 'All' || searchTerm) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedCountry('All');
                setSearchTerm('');
              }}
              className="text-[#F98864] hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Jobs Listing Cards */}
      {paginatedJobs.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/[0.03] border border-white/10 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-white">No Vacancies Match Your Filter</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search criteria or register your profile with our executive labor desk for matching future quotas.
          </p>
          <Link
            href={ROUTES.consultation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs shadow-cta border border-[#4DA5EC]/30"
          >
            <span>Consult With Employment Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:-translate-y-0.5 shadow-xl"
            >
              {/* Job Info */}
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#402493]/60 text-purple-200 border border-purple-500/30">
                    {job.country}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 text-slate-300">
                    {job.category}
                  </span>
                  {job.isEmployerVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Corporate Sponsor
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white group-hover:text-[#F98864] transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-purple-400" />
                      {job.companyName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F45A2A]" />
                      {job.location}
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {job.salaryRange}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
                  {job.description}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span>Permit Type: <strong className="text-white">{job.visaSupportDetails}</strong></span>
                  <span>•</span>
                  <span>Deadline: <strong className="text-white">{formatDate(job.deadline)}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col items-stretch md:items-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold border border-white/15 transition-all text-center"
                >
                  <span>Review Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/jobs/${job.slug}/apply`}
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all text-center border border-[#4DA5EC]/30"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                currentPage === i + 1
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta border border-[#4DA5EC]/30'
                  : 'bg-white/[0.05] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
