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
  EyeOff,
  FileCheck2,
  Globe2,
  AlertCircle,
  HelpCircle,
  LogOut,
  KeyRound,
  UserCheck,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { JobListing, JobCategory, EmploymentType } from '@/lib/types';
import {
  apiLoginStaff as loginStaff,
  apiLogoutStaff as logoutStaff,
  apiGetStaffSession as getStaffSession,
  apiCreateJob as adminCreateJob,
} from '@/lib/api/jobs-client';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated?: (newJob: JobListing) => void;
}

interface StaffUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  department?: string | null;
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
  // Authentication State
  const [staffUser, setStaffUser] = useState<StaffUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form Wizard State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Step 1: Core Job Details
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('Sijam Verified Partner Network');
  const [isEmployerVerified, setIsEmployerVerified] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(DESTINATIONS[0].name);
  const [location, setLocation] = useState('Warsaw & Krakow, Poland');
  const [category, setCategory] = useState<JobCategory>('Healthcare & Nursing');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [vacanciesCount, setVacanciesCount] = useState<number>(10);
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (2+ Years)');
  const [deadline, setDeadline] = useState('2026-12-31');

  // Step 2: Remuneration & Relocation Perks
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

  // Step 3: Description, Responsibilities & Qualifications
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

  // Verify staff session on modal open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsCheckingAuth(true);
    setAuthError(null);
    setValidationError(null);

    getStaffSession()
      .then(({ session, profile }) => {
        if (!isMounted) return;
        if (profile && profile.is_active) {
          setStaffUser({
            id: profile.id,
            email: profile.email,
            full_name: profile.full_name,
            role: profile.role,
            department: profile.department,
          });
        } else {
          setStaffUser(null);
        }
      })
      .catch((err) => {
        console.error('Session check error:', err);
        if (isMounted) setStaffUser(null);
      })
      .finally(() => {
        if (isMounted) setIsCheckingAuth(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Sync destination currency and default visa terms
  useEffect(() => {
    const dest = DESTINATIONS.find((d) => d.name === selectedCountry);
    if (dest) {
      setCurrency(dest.currency);
      setVisaSupportDetails(
        `Employer provides official ${dest.defaultVisa} with consular dossier packaging managed by Sijam Consults.`
      );
    }
  }, [selectedCountry]);

  // Quick preset loader for management convenience
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
    setValidationError(null);
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

  // Manual Staff Authentication Handler (Zero Auto-Fill, Pure Production)
  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    try {
      const res = await loginStaff({
        email: authEmail.trim(),
        password: authPassword,
        rememberMe,
      });

      if (res.success && res.staff) {
        setStaffUser(res.staff);
        setAuthPassword('');
      } else {
        setAuthError(res.message || 'Invalid email or password. Please verify your Sijam management credentials.');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'A network error occurred while connecting to the Sijam management authority.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleStaffLogout = async () => {
    try {
      await logoutStaff();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setStaffUser(null);
    setCurrentStep(1);
  };

  // Step Progression Validator (Industry Standard UX)
  const validateStep = (step: number): boolean => {
    setValidationError(null);
    if (step === 1) {
      if (!title.trim()) {
        setValidationError('Please enter a descriptive Job Title.');
        return false;
      }
      if (!location.trim()) {
        setValidationError('Please enter the City / Region placement.');
        return false;
      }
      if (!companyName.trim()) {
        setValidationError('Please enter the Employer or Partner Network name.');
        return false;
      }
      if (vacanciesCount < 1) {
        setValidationError('Please specify at least 1 open quota spot.');
        return false;
      }
    } else if (step === 2) {
      const min = Number(salaryMin);
      const max = Number(salaryMax);
      if (isNaN(min) || min <= 0) {
        setValidationError('Please enter a valid minimum salary amount.');
        return false;
      }
      if (isNaN(max) || max < min) {
        setValidationError('Maximum compensation cannot be less than the minimum salary.');
        return false;
      }
      if (!visaSupportDetails.trim()) {
        setValidationError('Please specify the statutory work permit and visa terms.');
        return false;
      }
    } else if (step === 3) {
      if (!description.trim() || description.trim().length < 20) {
        setValidationError('Please provide a substantive job overview description (at least 20 characters).');
        return false;
      }
      const activeResp = responsibilities.filter((r) => r.trim().length > 0);
      if (activeResp.length === 0) {
        setValidationError('Please include at least one operational responsibility duty.');
        return false;
      }
      const activeReqs = eligibilityRequirements.filter((r) => r.trim().length > 0);
      if (activeReqs.length === 0) {
        setValidationError('Please include at least one candidate qualification requirement.');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (prev + 1) as any);
    }
  };

  // Final Publish Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    if (!staffUser) {
      setAuthError('Authentication required. Only verified Sijam management can publish vacancies.');
      return;
    }

    setIsSubmitting(true);

    try {
      const dest = DESTINATIONS.find((d) => d.name === selectedCountry);
      const slugBase = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const generatedSlug = `${slugBase}-${Date.now().toString().slice(-4)}`;

      const currencySymbol = currency === 'GBP' ? '£' : currency === 'CAD' ? 'CA$' : currency === 'USD' ? '$' : '€';
      const formattedSalary = `${currencySymbol}${Number(salaryMin).toLocaleString()} – ${currencySymbol}${Number(
        salaryMax
      ).toLocaleString()} ${salaryPeriod}`;

      const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // Persist to Centralized Database Repository with Audit Logging
      await adminCreateJob(
        {
          title: title.trim(),
          employerId: 'e1000000-0000-0000-0000-000000000001',
          employerName: companyName.trim() || 'Sijam Verified Partner Network',
          categoryId: categorySlug,
          country: selectedCountry,
          location: location.trim(),
          employmentType: employmentType,
          salaryRange: formattedSalary,
          description: description.trim(),
          responsibilities: responsibilities.filter((r) => r.trim() !== ''),
          eligibilityRequirements: eligibilityRequirements.filter((r) => r.trim() !== ''),
          visaSupportDetails: visaSupportDetails.trim(),
          applicationInstructions:
            'Submit your CV, educational diplomas, and international passport bio-data page. Sijam Consults will schedule an initial file verification.',
          deadline: deadline || '2026-12-31',
          status: 'open',
          acceptsApplications: true,
          slug: generatedSlug,
        },
        staffUser.id
      );

      // Create Local Job Object for Instant Real-Time UI Updates
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

      // Store in localStorage for persistence across reloads
      const existing = localStorage.getItem('sijam_posted_jobs');
      const list: JobListing[] = existing ? JSON.parse(existing) : [];
      list.unshift(newJob);
      localStorage.setItem('sijam_posted_jobs', JSON.stringify(list));

      // Broadcast live event to directory components
      window.dispatchEvent(new CustomEvent('sijam:job_created', { detail: newJob }));

      if (onJobCreated) {
        onJobCreated(newJob);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error publishing job:', err);
      alert(err?.message || 'Failed to publish job. Please ensure database connection is intact.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    setTitle('');
    setValidationError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-xl bg-black/85 animate-fade-in">
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
                  Post A Job
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Management Desk</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official foreign quota allocation • Verified employer sponsorships
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── AUTHENTICATED OFFICER SESSION RIBBON ── */}
        {staffUser && !isSuccess && (
          <div className="px-6 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Authorized Officer: <strong className="text-white font-bold">{staffUser.full_name}</strong>{' '}
                <span className="text-emerald-400/80 capitalize font-mono text-[11px]">
                  ({staffUser.role.replace('_', ' ')})
                </span>
                {' · '}
                <span className="text-slate-400 hidden sm:inline">{staffUser.email}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleStaffLogout}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-semibold border border-white/10 transition-colors cursor-pointer"
              title="Sign out of management session"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Step Indicator Bar (Visible when authenticated and not in success view) */}
        {staffUser && !isSuccess && (
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
                  onClick={() => {
                    if (s.num < currentStep || validateStep(currentStep)) {
                      setCurrentStep(s.num as any);
                    }
                  }}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg font-bold transition-all cursor-pointer ${
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
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10 cursor-pointer"
              >
                🇵🇱 Nurse
              </button>
              <button
                type="button"
                onClick={() => loadPreset('uk_care')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10 cursor-pointer"
              >
                🇬🇧 Care
              </button>
              <button
                type="button"
                onClick={() => loadPreset('slovakia_welder')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10 cursor-pointer"
              >
                🇸🇰 Welder
              </button>
              <button
                type="button"
                onClick={() => loadPreset('hgv_driver')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10 cursor-pointer"
              >
                🚛 Driver
              </button>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* 1. Loading State */}
          {isCheckingAuth ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-300">
                Verifying Sijam Management Authorization...
              </p>
            </div>
          ) : !staffUser ? (
            /* 2. Manual Management Authentication Screen (Industry Standard Production Gate) */
            <div className="max-w-md mx-auto py-6 space-y-6 animate-fade-in">
              {/* Security Badge Header */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 mx-auto shadow-[0_0_40px_rgba(147,51,234,0.3)]">
                  <div className="w-full h-full bg-[#0C0824] rounded-[14px] flex items-center justify-center text-purple-300">
                    <ShieldCheck className="w-8 h-8 text-[#4DA5EC]" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  <span>Restricted Access • Sijam Managing Team</span>
                </div>
                <h3 className="font-heading font-black text-2xl text-white">
                  Management Authentication
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Sign in with your corporate Sijam Consults credentials to publish and manage foreign job quotas.
                </p>
              </div>

              {/* Error Message */}
              {authError && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{authError}</span>
                </div>
              )}

              {/* Clean Manual Login Form */}
              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#4DA5EC]" />
                    <span>Corporate Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="e.g. officer@sijamconsults.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4DA5EC] focus:bg-white/[0.07] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#4DA5EC]" />
                    <span>Management Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="Enter your confidential password"
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4DA5EC] focus:bg-white/[0.07] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/20 bg-white/5 text-[#4DA5EC] focus:ring-0"
                    />
                    <span>Remember management session</span>
                  </label>
                  <span className="text-[11px] text-slate-400">RC: 1715416</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-purple-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-cta transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Authorize & Unlock Job Publisher</span>
                    </>
                  )}
                </button>
              </form>

              {/* Statutory Footnote */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 text-center leading-relaxed">
                All foreign labor quotas are cryptographically stamped with the authorized officer&apos;s identity and verified under Federal Republic of Nigeria CAC (RC: 1715416) guidelines.
              </div>
            </div>
          ) : isSuccess ? (
            /* 3. Success View */
            <div className="py-8 text-center space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-black uppercase tracking-widest text-[#4DA5EC]">
                  Status: Published & Verified
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Job Quota Successfully Published!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Your foreign vacancy <strong className="text-white">&ldquo;{title}&rdquo;</strong> is now live on the Sijam Consults recruitment directory and open to candidates.
                </p>
                <div className="pt-2 text-[11px] text-slate-400 font-mono">
                  Authorized by: {staffUser.full_name} ({staffUser.role})
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(37,124,255,0.4)] border border-[#4DA5EC]/30 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Live Directory</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                    setTitle('');
                    setValidationError(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Another Job</span>
                </button>
              </div>
            </div>
          ) : (
            /* 4. Authenticated 4-Step Production Wizard */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Validation Error Banner */}
              {validationError && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="font-medium">{validationError}</span>
                </div>
              )}

              {/* STEP 1: Core Job Details */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="font-heading font-black text-base sm:text-lg text-white">
                      Step 1: Role Specification & Corridor
                    </h3>
                    <p className="text-xs text-slate-400">
                      Define the exact professional title, destination country, and employer profile.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Job Title */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        <span>Job Title *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Registered General Nurse (Inpatient), MIG Structural Welder"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4DA5EC] focus:bg-white/[0.07]"
                      />
                    </div>

                    {/* Destination Country Corridor */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        <span>Destination Country Corridor *</span>
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d.name} value={d.name} className="bg-[#140D36] text-white">
                            {d.flag} {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Precise City / Region Placement */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        <span>City / Region Placement *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Warsaw & Krakow, Poland"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>

                    {/* Employer / Hiring Organization */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        <span>Employer / Enterprise Name *</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. EuroMed Care Sp. z o.o."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>

                    {/* Sector Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Sector Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as JobCategory)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c} className="bg-[#140D36] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Employment Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Contract Structure</label>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
                      >
                        <option value="Full-time">Full-time (Statutory Permanent)</option>
                        <option value="Contract">Fixed-Term Work Contract (1-3 Yrs)</option>
                        <option value="Seasonal">Seasonal Agricultural Quota (9 Mo)</option>
                        <option value="Apprenticeship">Vocational Traineeship</option>
                      </select>
                    </div>

                    {/* Vacancy Quota Allocation */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200">Allocated Quota Spots</label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={vacanciesCount}
                        onChange={(e) => setVacanciesCount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>

                    {/* Application Deadline */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#4DA5EC]" />
                        <span>Filing Window Deadline</span>
                      </label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                    </div>

                    {/* Experience Level Required */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-200">Minimum Experience</label>
                      <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
                      >
                        <option value="Entry-Level (0-1 Year)">Entry-Level (0-1 Year)</option>
                        <option value="Mid-Level (2+ Years)">Mid-Level (2+ Years)</option>
                        <option value="Senior Specialist (5+ Years)">Senior Specialist (5+ Years)</option>
                        <option value="Lead / Supervisory (7+ Years)">Lead / Supervisory (7+ Years)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Compensation & Visa Facilitation */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="font-heading font-black text-base sm:text-lg text-white">
                      Step 2: Salary Package, Visa Sponsorship & Statutory Perks
                    </h3>
                    <p className="text-xs text-slate-400">
                      Specify the remuneration package and European employer relocation commitments.
                    </p>
                  </div>

                  {/* Salary inputs */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span>Remuneration Package</span>
                      </span>
                      <span className="text-xs text-slate-400">
                        Denomination:{' '}
                        <strong className="text-white font-mono">{currency}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-300 font-semibold">Minimum Net / Gross</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">
                            {currency === 'GBP' ? '£' : currency === 'CAD' ? 'CA$' : currency === 'USD' ? '$' : '€'}
                          </span>
                          <input
                            type="number"
                            value={salaryMin}
                            onChange={(e) => setSalaryMin(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-300 font-semibold">Maximum Potential</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">
                            {currency === 'GBP' ? '£' : currency === 'CAD' ? 'CA$' : currency === 'USD' ? '$' : '€'}
                          </span>
                          <input
                            type="number"
                            value={salaryMax}
                            onChange={(e) => setSalaryMax(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-300 font-semibold">Payment Frequency</label>
                        <select
                          value={salaryPeriod}
                          onChange={(e) => setSalaryPeriod(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
                        >
                          <option value="/ month">/ month (Standard European)</option>
                          <option value="/ year">/ year (UK Annual Salary)</option>
                          <option value="/ hour">/ hour (Shift Based)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Visa Sponsorship Details */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                      <span>Statutory Work Permit & Visa Sponsorship Terms *</span>
                    </label>
                    <textarea
                      rows={3}
                      value={visaSupportDetails}
                      onChange={(e) => setVisaSupportDetails(e.target.value)}
                      placeholder="Specify government authorization e.g. Voivodeship Type A Permit, UK CoS, etc."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#4DA5EC] leading-relaxed"
                    />
                  </div>

                  {/* Benefits & Relocation Perks Checkboxes */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                      <span>Included Relocation & Employer Perks</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        ({selectedPerks.length} selected)
                      </span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      {PERK_OPTIONS.map((perk) => {
                        const isChecked = selectedPerks.includes(perk);
                        return (
                          <button
                            type="button"
                            key={perk}
                            onClick={() => handleTogglePerk(perk)}
                            className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-[#4DA5EC]/20 text-white border border-[#4DA5EC]/40'
                                : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] border border-transparent'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded text-[10px] flex items-center justify-center font-bold ${
                                isChecked ? 'bg-[#4DA5EC] text-white' : 'border border-white/30'
                              }`}
                            >
                              {isChecked && '✓'}
                            </span>
                            <span className="truncate">{perk}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Job Description & Qualifications */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="font-heading font-black text-base sm:text-lg text-white">
                      Step 3: Role Scope & Candidate Eligibility Requirements
                    </h3>
                    <p className="text-xs text-slate-400">
                      Detail mandatory statutory qualifications, language prerequisites, and core tasks.
                    </p>
                  </div>

                  {/* Overview Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200">Role Summary & Context *</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief overview of operational environment, employer expectations, and contract parameters."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#4DA5EC] leading-relaxed"
                    />
                  </div>

                  {/* Key Responsibilities */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200">
                        Operational Responsibilities ({responsibilities.length})
                      </label>
                      <button
                        type="button"
                        onClick={handleAddResponsibility}
                        className="text-xs text-[#4DA5EC] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Duty</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => handleUpdateResponsibility(idx, e.target.value)}
                            placeholder={`Duty #${idx + 1}`}
                            className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-[#4DA5EC]"
                          />
                          {responsibilities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveResponsibility(idx)}
                              className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility Requirements */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200">
                        Mandatory Candidate Qualifications ({eligibilityRequirements.length})
                      </label>
                      <button
                        type="button"
                        onClick={handleAddRequirement}
                        className="text-xs text-[#4DA5EC] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Requirement</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {eligibilityRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleUpdateRequirement(idx, e.target.value)}
                            placeholder={`Requirement #${idx + 1} (e.g. valid passport, degree, clean police report)`}
                            className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs focus:outline-none focus:border-[#4DA5EC]"
                          />
                          {eligibilityRequirements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRequirement(idx)}
                              className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                              aria-label="Remove requirement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review, Sijam Authorization & Final Publish */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="font-heading font-black text-base sm:text-lg text-white">
                      Step 4: Live Preview & Publication Sign-Off
                    </h3>
                    <p className="text-xs text-slate-400">
                      Candidate-facing preview on the Sijam recruitment board.
                    </p>
                  </div>

                  {/* Candidate-Facing Preview Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#160E36] to-[#0D0826] border border-purple-500/30 space-y-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {DESTINATIONS.find((d) => d.name === selectedCountry)?.flag || '🌍'}
                          </span>
                          <h4 className="font-heading font-black text-lg text-white">
                            {title || 'Untitled Vacancy'}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          {companyName} • {location}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-emerald-400">
                          {currency === 'GBP' ? '£' : currency === 'CAD' ? 'CA$' : currency === 'USD' ? '$' : '€'}
                          {Number(salaryMin).toLocaleString()} – {currency === 'GBP' ? '£' : currency === 'CAD' ? 'CA$' : '€'}
                          {Number(salaryMax).toLocaleString()} {salaryPeriod}
                        </span>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {vacanciesCount} Quota Slots Allocated
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/10 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Corridor</span>
                        <span className="font-bold text-white">{selectedCountry}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Category</span>
                        <span className="font-bold text-white">{category}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Contract</span>
                        <span className="font-bold text-white">{employmentType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Deadline</span>
                        <span className="font-bold text-white">{deadline}</span>
                      </div>
                    </div>

                    {/* Selected Perks Badges */}
                    {selectedPerks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {selectedPerks.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300"
                          >
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Authenticated Officer Sign-Off Stamp */}
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authorized Officer Verification Stamp</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Publishing as <strong className="text-white">{staffUser.full_name}</strong> ({staffUser.role.replace('_', ' ')}). This quota will be stamped with your officer credentials and recorded in the Sijam management audit log.
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
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
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
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold flex items-center gap-1.5 shadow-cta hover:brightness-110 transition-all cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_28px_rgba(37,124,255,0.45)] border border-[#4DA5EC]/40 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Publishing Live Quota...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Publish Quota to Live Board</span>
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
