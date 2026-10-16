'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Lock,
  ArrowRight,
  Eye,
  FileCheck2,
  Globe2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { JobListing, JobCategory, EmploymentType } from '@/lib/types';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated?: (newJob: JobListing) => void;
}

const CATEGORIES: JobCategory[] = [
  'Healthcare & Nursing',
  'Logistics & Transport',
  'Engineering & Construction',
  'Manufacturing & Production',
  'Information Technology',
  'Hospitality & Tourism',
  'Agriculture & Processing',
  'Skilled Trades',
];

const DESTINATIONS = [
  { name: 'Poland', flag: '🇵🇱', currency: 'EUR', defaultVisa: 'Voivodeship Type A Labor Permit (Wojewoda)' },
  { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', defaultVisa: 'Health & Care / Skilled Worker CoS' },
  { name: 'Slovakia', flag: '🇸🇰', currency: 'EUR', defaultVisa: 'Single Residence & Work Permit' },
  { name: 'Portugal', flag: '🇵🇹', currency: 'EUR', defaultVisa: 'D1 / D3 Subordinate Work Contract Visa' },
  { name: 'Cyprus', flag: '🇨🇾', currency: 'EUR', defaultVisa: 'Ministry of Labor Foreign Permit' },
  { name: 'Germany', flag: '🇩🇪', currency: 'EUR', defaultVisa: 'Opportunity Card (Chancenkarte) / Skilled Worker' },
  { name: 'Canada', flag: '🇨🇦', currency: 'CAD', defaultVisa: 'LMIA-Approved Work Permit' },
  { name: 'Ireland', flag: '🇮🇪', currency: 'EUR', defaultVisa: 'Critical Skills Employment Permit' },
];

const PERK_OPTIONS = [
  'Voivodeship Permit Sponsored',
  'Certificate of Sponsorship (CoS)',
  'Furnished Company Housing Included',
  'Subsidized Accommodation',
  'Paid Language Immersion Course',
  'Flight Ticket Allowance',
  'Health Insurance Coverage',
  'Overtime Shifts Available (1.5x)',
  'Permanent Residency Pathway (5 Yrs)',
  'Direct Airport Pickup & Orientation',
  'Safety Gear & Tooling Provided',
  'EU Schengen Travel Mobility',
];

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdJobSlug, setCreatedJobSlug] = useState<string>('');

  // Form State
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('Sijam Verified Partner Network');
  const [isEmployerVerified, setIsEmployerVerified] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(DESTINATIONS[0].name);
  const [location, setLocation] = useState('Warsaw & Krakow, Poland');
  const [category, setCategory] = useState<JobCategory>('Healthcare & Nursing');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [vacanciesCount, setVacanciesCount] = useState<number>(10);
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (2+ Years)');

  // Compensation & Perks
  const [currency, setCurrency] = useState('EUR');
  const [salaryMin, setSalaryMin] = useState('2200');
  const [salaryMax, setSalaryMax] = useState('3200');
  const [salaryPeriod, setSalaryPeriod] = useState('/ month');
  const [visaSupportDetails, setVisaSupportDetails] = useState(
    'Employer provides formal Voivodeship labor permit authorization with full filing support by Sijam Consults.'
  );
  const [selectedPerks, setSelectedPerks] = useState<string[]>([
    'Voivodeship Permit Sponsored',
    'Subsidized Accommodation',
    'Paid Language Immersion Course',
  ]);

  // Description & Requirements
  const [description, setDescription] = useState(
    'Seeking qualified international professionals for accredited foreign operations. Includes statutory work authorization, visa filing advisory, and structured employer onboarding.'
  );
  const [responsibilities, setResponsibilities] = useState<string[]>([
    'Deliver specialized duties according to host country regulatory standards.',
    'Collaborate within multi-disciplinary international teams.',
    'Maintain safe practices and report to department supervisors.',
  ]);
  const [eligibilityRequirements, setEligibilityRequirements] = useState<string[]>([
    'Relevant degree, diploma, or verified trade certificate.',
    'Minimum 2 years verifiable practical work experience.',
    'Valid International Passport with at least 18 months validity.',
    'Clean police conduct certificate.',
  ]);

  // Management Passcode (Optional security / easy bypass)
  const [managementPasscode, setManagementPasscode] = useState('');
  const [isPasscodeUnlocked, setIsPasscodeUnlocked] = useState(true);
  const [deadline, setDeadline] = useState('2026-12-31');

  // Sync destination currency and visa
  useEffect(() => {
    const dest = DESTINATIONS.find((d) => d.name === selectedCountry);
    if (dest) {
      setCurrency(dest.currency);
      setVisaSupportDetails(
        `Employer provides official ${dest.defaultVisa} with consular dossier packaging managed by Sijam Consults.`
      );
    }
  }, [selectedCountry]);

  // Quick preset loader for management
  const loadPreset = (preset: 'poland_nurse' | 'uk_care' | 'slovakia_welder' | 'hgv_driver') => {
    if (preset === 'poland_nurse') {
      setTitle('Registered General Nurse (Hospital Placement)');
      setSelectedCountry('Poland');
      setLocation('Krakow, Poland');
      setCategory('Healthcare & Nursing');
      setSalaryMin('2400');
      setSalaryMax('3400');
      setVacanciesCount(15);
      setSelectedPerks([
        'Voivodeship Permit Sponsored',
        'Subsidized Accommodation',
        'Paid Language Immersion Course',
        'EU Schengen Travel Mobility',
      ]);
    } else if (preset === 'uk_care') {
      setTitle('Senior Care Assistant & Resident Support');
      setSelectedCountry('United Kingdom');
      setLocation('Manchester & Leeds, United Kingdom');
      setCategory('Healthcare & Nursing');
      setSalaryMin('24000');
      setSalaryMax('29500');
      setSalaryPeriod('/ year');
      setVacanciesCount(20);
      setSelectedPerks([
        'Certificate of Sponsorship (CoS)',
        'Overtime Shifts Available (1.5x)',
        'Permanent Residency Pathway (5 Yrs)',
      ]);
    } else if (preset === 'slovakia_welder') {
      setTitle('Certified MIG / MAG Structural Welder');
      setSelectedCountry('Slovakia');
      setLocation('Bratislava, Slovakia');
      setCategory('Engineering & Construction');
      setSalaryMin('1900');
      setSalaryMax('2700');
      setVacanciesCount(12);
      setSelectedPerks([
        'Furnished Company Housing Included',
        'Safety Gear & Tooling Provided',
        'Direct Airport Pickup & Orientation',
      ]);
    } else if (preset === 'hgv_driver') {
      setTitle('International Heavy Commercial Truck Driver (CE)');
      setSelectedCountry('Poland');
      setLocation('Poznań & Wrocław, Poland');
      setCategory('Logistics & Transport');
      setSalaryMin('2500');
      setSalaryMax('3600');
      setVacanciesCount(25);
      setSelectedPerks([
        'Voivodeship Permit Sponsored',
        'EU Schengen Travel Mobility',
        'Overtime Shifts Available (1.5x)',
      ]);
    }
  };

  const handleTogglePerk = (perk: string) => {
    setSelectedPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
    );
  };

  const handleAddResponsibility = () => {
    setResponsibilities((prev) => [...prev, '']);
  };

  const handleUpdateResponsibility = (idx: number, val: string) => {
    setResponsibilities((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleRemoveResponsibility = (idx: number) => {
    setResponsibilities((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddRequirement = () => {
    setEligibilityRequirements((prev) => [...prev, '']);
  };

  const handleUpdateRequirement = (idx: number, val: string) => {
    setEligibilityRequirements((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleRemoveRequirement = (idx: number) => {
    setEligibilityRequirements((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a Job Title');
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);

    const dest = DESTINATIONS.find((d) => d.name === selectedCountry);
    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const generatedSlug = `${slugBase}-${Date.now().toString().slice(-4)}`;

    const currencySymbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';
    const formattedSalary = `${currencySymbol}${Number(salaryMin).toLocaleString()} – ${currencySymbol}${Number(
      salaryMax
    ).toLocaleString()} ${salaryPeriod}`;

    const newJob: JobListing = {
      id: `job-frontend-${Date.now()}`,
      slug: generatedSlug,
      title: title.trim(),
      companyName: companyName.trim() || 'Verified European Partner Employer',
      isEmployerVerified: isEmployerVerified,
      location: location.trim(),
      country: selectedCountry,
      flag: dest?.flag || '🌍',
      category: category,
      employmentType: employmentType,
      salaryRange: formattedSalary,
      postedDate: new Date().toISOString().split('T')[0],
      deadline: deadline || '2026-12-31',
      status: 'Open',
      description: description.trim(),
      responsibilities: responsibilities.filter((r) => r.trim() !== ''),
      eligibilityRequirements: eligibilityRequirements.filter((r) => r.trim() !== ''),
      visaSupportDetails: visaSupportDetails.trim(),
      applicationInstructions:
        'Submit your CV, educational diplomas, and international passport bio-data page. Sijam Consults will schedule an initial file verification.',
      disclaimer:
        'Notice of Statutory Independence: Sijam Consults Limited facilitates statutory documentation and immigration filing advisory. Hiring prerogatives and visa issuances remain strictly sovereign prerogatives.',
      perks: selectedPerks,
      experienceLevel: experienceLevel,
      vacanciesCount: Number(vacanciesCount) || 10,
      featured: true,
    };

    setTimeout(() => {
      try {
        // Persist to localStorage
        const existing = localStorage.getItem('sijam_posted_jobs');
        const list: JobListing[] = existing ? JSON.parse(existing) : [];
        list.unshift(newJob);
        localStorage.setItem('sijam_posted_jobs', JSON.stringify(list));

        // Dispatch window event so all components listen and update in real-time
        window.dispatchEvent(new CustomEvent('sijam:job_created', { detail: newJob }));

        if (onJobCreated) {
          onJobCreated(newJob);
        }

        setCreatedJobSlug(generatedSlug);
        setIsSuccess(true);
      } catch (err) {
        console.error('Error saving job to localStorage:', err);
      } finally {
        setIsSubmitting(false);
      }
    }, 700);
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    setTitle('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-xl bg-black/80 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0C0824] border border-purple-500/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-white overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4.5 sm:px-8 sm:py-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#170E3B] via-[#0E0927] to-[#120A30] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4DA5EC] to-[#257CFF] flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-lg sm:text-xl text-white">
                  Post A Foreign Job Vacancy
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Management Desk
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Direct frontend submission • Instant live publication to Sijam portal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {!isSuccess && (
          <div className="px-6 py-3 bg-[#110B2F] border-b border-white/5 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto">
              {[
                { num: 1, label: 'Role & Location' },
                { num: 2, label: 'Salary & Visa' },
                { num: 3, label: 'Requirements' },
                { num: 4, label: 'Review & Publish' },
              ].map((s) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num as any)}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg font-bold transition-all ${
                    currentStep === s.num
                      ? 'bg-[#4DA5EC]/20 text-[#4DA5EC] border border-[#4DA5EC]/40'
                      : currentStep > s.num
                      ? 'text-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                      currentStep === s.num
                        ? 'bg-[#4DA5EC] text-white'
                        : currentStep > s.num
                        ? 'bg-emerald-500 text-black'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {currentStep > s.num ? '✓' : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Presets Menu */}
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Quick Template:</span>
              <button
                type="button"
                onClick={() => loadPreset('poland_nurse')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10"
              >
                🇵🇱 Nurse
              </button>
              <button
                type="button"
                onClick={() => loadPreset('uk_care')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10"
              >
                🇬🇧 Care
              </button>
              <button
                type="button"
                onClick={() => loadPreset('slovakia_welder')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10"
              >
                🇸🇰 Welder
              </button>
              <button
                type="button"
                onClick={() => loadPreset('hgv_driver')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10"
              >
                🚛 Driver
              </button>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {isSuccess ? (
            /* Success View */
            <div className="py-8 text-center space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC]">
                  Status: Published & Active
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Job Quota Successfully Published!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Your foreign vacancy <strong className="text-white">&ldquo;{title}&rdquo;</strong> is now live on the Sijam Consults recruitment directory.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs tracking-wider shadow-cta"
                >
                  View in Live Directory
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                    setTitle('');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15"
                >
                  + Post Another Foreign Job
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: Role & Destination */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                        <span>Job Title / Foreign Designation *</span>
                        <span className="text-[11px] text-slate-400 font-normal">e.g. Senior Care Assistant, Heavy Welder</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Registered ICU Nurse (Hospital Placement)"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4DA5EC] focus:ring-1 focus:ring-[#4DA5EC]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Sector / Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as JobCategory)}
                        className="w-full px-4 py-3 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Destination Sovereign Country *</label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d.name} value={d.name}>
                            {d.flag} {d.name} ({d.currency})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Specific City / Region *</label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Krakow & Warsaw, Poland"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Employment Contract Type</label>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                        className="w-full px-4 py-3 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      >
                        <option value="Full-time">Full-time (Standard Foreign Contract)</option>
                        <option value="Contract">Fixed-Term Contract (1 - 3 Years)</option>
                        <option value="Seasonal">Seasonal Agricultural / Resort</option>
                        <option value="Apprenticeship">Ausbildung / Clinical Apprenticeship</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Open Vacancies Quota</label>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={vacanciesCount}
                        onChange={(e) => setVacanciesCount(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Required Experience Level</label>
                      <input
                        type="text"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        placeholder="e.g. Mid-Level (2+ Years), Trade Certified"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Compensation & Visa Sponsorship */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200">Foreign Salary Range</label>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400">Currency:</span>
                        {['EUR', 'GBP', 'USD', 'PLN'].map((curr) => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => setCurrency(curr)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              currency === curr
                                ? 'bg-[#4DA5EC] text-white'
                                : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {curr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[11px] text-slate-400">Minimum Salary</span>
                        <input
                          type="number"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm font-semibold focus:outline-none focus:border-[#4DA5EC]"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400">Maximum Salary</span>
                        <input
                          type="number"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm font-semibold focus:outline-none focus:border-[#4DA5EC]"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400">Period</span>
                        <select
                          value={salaryPeriod}
                          onChange={(e) => setSalaryPeriod(e.target.value)}
                          className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm font-semibold focus:outline-none"
                        >
                          <option value="/ month">/ month (Gross)</option>
                          <option value="/ year">/ year (Gross)</option>
                          <option value="/ hour">/ hour</option>
                        </select>
                      </div>
                    </div>

                    {/* Calculated Naira Conversion helper */}
                    <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                      <span>Estimated Naira Conversion:</span>
                      <span>
                        ~₦{(Number(salaryMin) * (currency === 'GBP' ? 2100 : 1750)).toLocaleString()} - ₦
                        {(Number(salaryMax) * (currency === 'GBP' ? 2100 : 1750)).toLocaleString()}
                        {salaryPeriod}
                      </span>
                    </div>
                  </div>

                  {/* Visa Pathway */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                      <span>Statutory Work Permit / Visa Support Pathway *</span>
                      <span className="text-[11px] text-purple-300">Official Labor Filing</span>
                    </label>
                    <textarea
                      rows={2}
                      value={visaSupportDetails}
                      onChange={(e) => setVisaSupportDetails(e.target.value)}
                      placeholder="e.g. Employer issues formal Voivodeship labor permit authorization with full file audit by Sijam Consults."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs leading-relaxed focus:outline-none focus:border-[#4DA5EC]"
                    />
                  </div>

                  {/* Relocation Perks Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-200">
                      Select Included Relocation & Benefits Perks (Click to toggle):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PERK_OPTIONS.map((perk) => {
                        const isSelected = selectedPerks.includes(perk);
                        return (
                          <button
                            key={perk}
                            type="button"
                            onClick={() => handleTogglePerk(perk)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border border-[#4DA5EC] shadow-sm'
                                : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/10'
                            }`}
                          >
                            <span className="text-xs">{isSelected ? '✓' : '+'}</span>
                            <span>{perk}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Company & Requirements */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Company / Employer Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. EuroMed Healthcare Network Sp. z o.o."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Application Deadline</label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>
                  </div>

                  {/* Summary / Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200">Role Summary & Context</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs leading-relaxed focus:outline-none focus:border-[#4DA5EC]"
                    />
                  </div>

                  {/* Responsibilities list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200">Key Responsibilities (Bullets)</label>
                      <button
                        type="button"
                        onClick={handleAddResponsibility}
                        className="text-xs font-bold text-[#4DA5EC] hover:text-white flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Duty</span>
                      </button>
                    </div>
                    {responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-bold">{i + 1}.</span>
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => handleUpdateResponsibility(i, e.target.value)}
                          placeholder="Duty description..."
                          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                        />
                        {responsibilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveResponsibility(i)}
                            className="text-slate-400 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Eligibility criteria list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200">Eligibility Requirements (Bullets)</label>
                      <button
                        type="button"
                        onClick={handleAddRequirement}
                        className="text-xs font-bold text-[#4DA5EC] hover:text-white flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Requirement</span>
                      </button>
                    </div>
                    {eligibilityRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-bold">{i + 1}.</span>
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => handleUpdateRequirement(i, e.target.value)}
                          placeholder="Requirement..."
                          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                        />
                        {eligibilityRequirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement(i)}
                            className="text-slate-400 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Publish */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-[#140D36] border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-[#4DA5EC]" />
                        Live Card Preview
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                        ✨ Ready to Publish
                      </span>
                    </div>

                    {/* Preview Mock Card */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-left">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-bold text-white bg-purple-900/60 px-2 py-0.5 rounded">
                          {selectedCountry}
                        </span>
                        <span className="text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                          {category}
                        </span>
                        <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Sponsor
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-lg text-white">
                        {title || 'Untitled Foreign Position'}
                      </h4>
                      <div className="text-xs text-slate-300">
                        {companyName} • {location}
                      </div>
                      <div className="text-sm font-extrabold text-emerald-400">
                        {currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€'}
                        {Number(salaryMin).toLocaleString()} – {currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€'}
                        {Number(salaryMax).toLocaleString()} {salaryPeriod}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-2">
                        {description}
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {selectedPerks.slice(0, 3).map((p, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-purple-200"
                          >
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Management Access Key / Security Pin */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        <span>Management Authorization Key</span>
                      </label>
                      <span className="text-[11px] text-slate-400">Default: SIJAM2026 (Optional)</span>
                    </div>
                    <input
                      type="text"
                      value={managementPasscode}
                      onChange={(e) => setManagementPasscode(e.target.value)}
                      placeholder="Enter SIJAM2026 or leave blank for instant publish"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#4DA5EC]"
                    />
                    <p className="text-[11px] text-slate-400">
                      Ensures authorized Sijam Consults management postings without requiring full administrative dashboard login.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation & Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (currentStep === 1 && !title.trim()) {
                          alert('Please enter a Job Title');
                          return;
                        }
                        setCurrentStep((prev) => (prev + 1) as any);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold flex items-center gap-1.5 shadow-cta hover:brightness-110 transition-all"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Publishing Quota...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Publish Live to Portal</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
