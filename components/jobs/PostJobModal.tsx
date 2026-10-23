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
  Clock,
  Users,
} from 'lucide-react';
import { JobListing, JobCategory, EmploymentType } from '@/lib/types';
import {
  JOB_DESTINATIONS,
  ALL_JOB_DESTINATIONS,
  DESTINATION_REGIONS,
  WORLD_DESTINATION_REGIONS,
  COMPREHENSIVE_SECTORS,
  SECTOR_GROUPS,
  GENERAL_WORKER_SUB_SECTORS,
} from '@/lib/data/jobs';
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

const CATEGORIES: JobCategory[] = COMPREHENSIVE_SECTORS.map((s) => s.name as JobCategory);
const DESTINATIONS = ALL_JOB_DESTINATIONS;

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

  // Candidate Age Restriction Bracket (UX Psychology)
  const [hasAgeRestriction, setHasAgeRestriction] = useState<boolean>(true);
  const [ageMin, setAgeMin] = useState<number>(21);
  const [ageMax, setAgeMax] = useState<number>(45);

  // Eligible Nationalities / Countries Restriction
  const [isAllNationalities, setIsAllNationalities] = useState<boolean>(true);
  const [eligibleCountriesText, setEligibleCountriesText] = useState<string>('All Countries / Worldwide');

  // Document Processing Time
  const [processingTime, setProcessingTime] = useState<string>('1 – 2 Months');

  // General Worker ("Others") Sub-Sector Selection
  const [generalWorkerSubSector, setGeneralWorkerSubSector] = useState<string>(
    GENERAL_WORKER_SUB_SECTORS[0].name
  );
  const [exactGeneralWorkerSectors, setExactGeneralWorkerSectors] = useState<string>(
    'Electrician (Basic), Plumbing, Construction, Agriculture'
  );

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
  const loadPreset = (
    preset: 'poland_nurse' | 'uk_care' | 'slovakia_welder' | 'hgv_driver' | 'general_worker'
  ) => {
    if (preset === 'poland_nurse') {
      setTitle('Registered General Nurse (Hospital Placement)');
      setSelectedCountry('Poland');
      setLocation('Krakow, Poland');
      setCategory('Healthcare & Nursing');
      setSalaryMin('2400');
      setSalaryMax('3400');
      setVacanciesCount(15);
      setHasAgeRestriction(true);
      setAgeMin(22);
      setAgeMax(48);
      setIsAllNationalities(true);
      setEligibleCountriesText('All Countries / Worldwide');
      setProcessingTime('1 – 2 Months');
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
      setHasAgeRestriction(true);
      setAgeMin(21);
      setAgeMax(50);
      setIsAllNationalities(false);
      setEligibleCountriesText('Nigeria, Ghana, Sierra Leone, Kenya');
      setProcessingTime('4 – 6 Weeks');
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
      setHasAgeRestriction(true);
      setAgeMin(21);
      setAgeMax(45);
      setIsAllNationalities(true);
      setEligibleCountriesText('All Countries / Worldwide');
      setProcessingTime('2 – 3 Months');
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
      setHasAgeRestriction(true);
      setAgeMin(23);
      setAgeMax(50);
      setIsAllNationalities(true);
      setEligibleCountriesText('All Countries / Worldwide');
      setProcessingTime('1 – 2 Months');
      setSelectedPerks([
        'Voivodeship Permit Sponsored',
        'EU Schengen Travel Mobility',
        'Overtime Shifts Available (1.5x)',
      ]);
    } else if (preset === 'general_worker') {
      setTitle('Multi-Skilled General Worker (Construction, Plumbing & Electrical Support)');
      setSelectedCountry('Poland');
      setLocation('Poznań & Wrocław, Poland');
      setCategory('Others (General Worker)');
      setGeneralWorkerSubSector(GENERAL_WORKER_SUB_SECTORS[0].name);
      setExactGeneralWorkerSectors('Electrician (Basic), Plumbing, Construction, Agriculture, Handyman');
      setHasAgeRestriction(true);
      setAgeMin(21);
      setAgeMax(45);
      setIsAllNationalities(false);
      setEligibleCountriesText('Nigeria, Ghana, Sierra Leone');
      setProcessingTime('1 – 2 Months');
      setSalaryMin('1850');
      setSalaryMax('2600');
      setVacanciesCount(20);
      setSelectedPerks([
        'Voivodeship Permit Sponsored',
        'Furnished Company Housing Included',
        'Safety Gear & Tooling Provided',
        'Paid Language Immersion Course',
        'EU Schengen Travel Mobility',
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
      if (!processingTime.trim()) {
        setValidationError('Please specify the Document Processing Time (e.g. 1 – 2 Months).');
        return false;
      }
      if (hasAgeRestriction) {
        if (ageMin < 18) {
          setValidationError('Minimum age cannot be below 18 years for legal foreign employment.');
          return false;
        }
        if (ageMax < ageMin) {
          setValidationError('Maximum age cannot be less than the minimum age.');
          return false;
        }
      }
      if (!isAllNationalities && !eligibleCountriesText.trim()) {
        setValidationError('Please specify the eligible countries/nationalities or choose All Nationalities.');
        return false;
      }
      if ((category === 'Others (General Worker)' || category === 'Others') && !exactGeneralWorkerSectors.trim()) {
        setValidationError('Please specify the exact sectors or categories for the General Worker position (e.g. Electrician, Plumbing, Agriculture).');
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

      const ageRequirement = hasAgeRestriction ? `${ageMin} – ${ageMax} years` : '18+ (No upper age restriction)';
      const isGeneralWorker = category === 'Others (General Worker)' || category === 'Others';
      const generalWorkerTrades = isGeneralWorker
        ? exactGeneralWorkerSectors.split(',').map((s) => s.trim()).filter(Boolean)
        : undefined;
      const eligibleCountriesList = isAllNationalities
        ? ['All Nationalities']
        : eligibleCountriesText.split(',').map((s) => s.trim()).filter(Boolean);

      // Prepend screening criteria to eligibility requirements if not already present
      const finalEligibility = [...eligibilityRequirements.filter((r) => r.trim() !== '')];
      if (hasAgeRestriction) {
        const ageMsg = `Candidate Age Bracket: Verified between ${ageMin} and ${ageMax} years old at time of application.`;
        if (!finalEligibility.some((r) => r.toLowerCase().includes('age'))) {
          finalEligibility.unshift(ageMsg);
        }
      }
      if (!isAllNationalities && eligibleCountriesList.length > 0) {
        const countryMsg = `Eligible Passports & Nationalities: Restricted to ${eligibleCountriesList.join(', ')}.`;
        if (!finalEligibility.some((r) => r.toLowerCase().includes('eligible') || r.toLowerCase().includes('passport'))) {
          finalEligibility.unshift(countryMsg);
        }
      }
      if (isGeneralWorker && generalWorkerTrades && generalWorkerTrades.length > 0) {
        const workerMsg = `General Worker Trade Capabilities: Practical basic proficiency in ${generalWorkerTrades.join(', ')}.`;
        if (!finalEligibility.some((r) => r.toLowerCase().includes('general worker'))) {
          finalEligibility.unshift(workerMsg);
        }
      }

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
          eligibilityRequirements: finalEligibility,
          visaSupportDetails: visaSupportDetails.trim(),
          applicationInstructions:
            'Submit your CV, educational diplomas, and international passport bio-data page. Sijam Consults will schedule an initial file verification.',
          deadline: deadline || '2026-12-31',
          status: 'open',
          acceptsApplications: true,
          slug: generatedSlug,
          ageRequirement,
          eligibleCountries: eligibleCountriesList,
          processingTime: processingTime.trim(),
          generalWorkerSectors: generalWorkerTrades || null,
        }
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
        eligibilityRequirements: finalEligibility,
        visaSupportDetails: visaSupportDetails.trim(),
        applicationInstructions:
          'Submit your CV, educational diplomas, and international passport bio-data page. Sijam Consults will schedule an initial file verification.',
        disclaimer:
          'Notice of Statutory Independence: Sijam Consults Limited facilitates statutory documentation and immigration filing advisory. Hiring prerogatives and visa issuances remain strictly sovereign prerogatives.',
        perks: selectedPerks,
        experienceLevel: experienceLevel,
        vacanciesCount: Number(vacanciesCount) || 10,
        featured: true,
        ageRequirement,
        eligibleCountries: eligibleCountriesList,
        processingTime: processingTime.trim(),
        generalWorkerSectors: generalWorkerTrades,
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
              <button
                type="button"
                onClick={() => loadPreset('general_worker')}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer"
              >
                🧰 General Worker
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
                      <span>Login & Continue</span>
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
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <Globe2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                          <span>Destination Country Corridor *</span>
                        </label>
                        <span className="text-[10px] text-purple-300 font-semibold px-2 py-0.5 rounded-md bg-purple-900/40 border border-purple-500/20">
                          {DESTINATIONS.length} World Countries
                        </span>
                      </div>
                      <select
                        value={selectedCountry}
                        onChange={(e) => {
                          const newCountry = e.target.value;
                          setSelectedCountry(newCountry);
                          const dest = DESTINATIONS.find((d) => d.name === newCountry);
                          if (dest) {
                            setLocation(dest.sampleLocation);
                            setCurrency(dest.currency as any);
                            setVisaSupportDetails(
                              `Employer provides official ${dest.defaultVisa} with consular dossier packaging managed by Sijam Consults.`
                            );
                          }
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
                      >
                        {/* 1. Featured / Popular Sijam Corridors */}
                        <optgroup label="⭐ Featured Corridors (Popular Sijam Hubs)" className="bg-[#0C0824] text-amber-300 font-bold">
                          {DESTINATIONS.filter((d) => d.isPopular).map((d) => (
                            <option key={`pop-${d.name}`} value={d.name} className="bg-[#140D36] text-white font-normal">
                              {d.flag} {d.name} ({d.currency}) • Popular
                            </option>
                          ))}
                        </optgroup>

                        {/* 2. Europe */}
                        <optgroup label="Europe (All Countries)" className="bg-[#0C0824] text-purple-300 font-bold">
                          {DESTINATIONS.filter((d) => d.region === 'Europe').map((d) => (
                            <option key={`eu-${d.name}`} value={d.name} className="bg-[#140D36] text-white font-normal">
                              {d.flag} {d.name} ({d.currency})
                            </option>
                          ))}
                        </optgroup>

                        {/* 3. North America & Caribbean */}
                        <optgroup label="North America & Americas" className="bg-[#0C0824] text-purple-300 font-bold">
                          {DESTINATIONS.filter((d) => d.region === 'North America' || d.region === 'Americas').map((d) => (
                            <option key={`am-${d.name}`} value={d.name} className="bg-[#140D36] text-white font-normal">
                              {d.flag} {d.name} ({d.currency})
                            </option>
                          ))}
                        </optgroup>

                        {/* 4. Middle East & Gulf */}
                        <optgroup label="Middle East & Gulf" className="bg-[#0C0824] text-purple-300 font-bold">
                          {DESTINATIONS.filter((d) => d.region === 'Middle East').map((d) => (
                            <option key={`me-${d.name}`} value={d.name} className="bg-[#140D36] text-white font-normal">
                              {d.flag} {d.name} ({d.currency})
                            </option>
                          ))}
                        </optgroup>

                        {/* 5. Asia */}
                        <optgroup label="Asia" className="bg-[#0C0824] text-purple-300 font-bold">
                          {DESTINATIONS.filter((d) => d.region === 'Asia').map((d) => (
                            <option key={`as-${d.name}`} value={d.name} className="bg-[#140D36] text-white font-normal">
                              {d.flag} {d.name} ({d.currency})
                            </option>
                          ))}
                        </optgroup>

                        {/* 6. Africa */}
                        <optgroup label="Africa" className="bg-[#0C0824] text-purple-300 font-bold">
                          {DESTINATIONS.filter((d) => d.region === 'Africa').map((d) => (
                            <option key={`af-${d.name}`} value={d.name} className="bg-[#140D36] text-white font-normal">
                              {d.flag} {d.name} ({d.currency})
                            </option>
                          ))}
                        </optgroup>

                        {/* 7. Oceania & Pacific */}
                        <optgroup label="Oceania & Pacific" className="bg-[#0C0824] text-purple-300 font-bold">
                          {DESTINATIONS.filter((d) => d.region === 'Oceania').map((d) => (
                            <option key={`oc-${d.name}`} value={d.name} className="bg-[#140D36] text-white font-normal">
                              {d.flag} {d.name} ({d.currency})
                            </option>
                          ))}
                        </optgroup>
                      </select>

                      {/* UX Psychology: Instant Contextual Corridor Anchor */}
                      {(() => {
                        const currentDest = DESTINATIONS.find((d) => d.name === selectedCountry);
                        if (!currentDest) return null;
                        return (
                          <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-200 flex items-start gap-2 animate-fade-in">
                            <span className="text-base leading-none shrink-0">{currentDest.flag}</span>
                            <div className="flex-1 leading-tight">
                              <div className="font-bold text-white flex items-center justify-between">
                                <span>{currentDest.name} • {currentDest.region}</span>
                                <span className="text-[10px] text-emerald-400 font-mono font-semibold uppercase">{currentDest.currency} Standard</span>
                              </div>
                              <div className="text-blue-300/90 text-[10px] mt-0.5">
                                <strong>Statutory Visa:</strong> {currentDest.defaultVisa}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
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
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#F98864]" />
                          <span>Sector Category *</span>
                        </label>
                        <span className="text-[10px] text-amber-300 font-semibold px-2 py-0.5 rounded-md bg-amber-900/30 border border-amber-500/20">
                          {COMPREHENSIVE_SECTORS.length} Sectors
                        </span>
                      </div>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as JobCategory)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
                      >
                        {SECTOR_GROUPS.map((group) => {
                          const groupSectors = COMPREHENSIVE_SECTORS.filter((s) => s.group === group);
                          if (groupSectors.length === 0) return null;
                          return (
                            <optgroup key={group} label={group} className="bg-[#0C0824] text-[#F98864] font-bold">
                              {groupSectors.map((sec) => (
                                <option key={sec.name} value={sec.name} className="bg-[#140D36] text-white font-normal">
                                  {sec.icon} {sec.name}
                                </option>
                              ))}
                            </optgroup>
                          );
                        })}
                      </select>

                      {/* UX Psychology: Cognitive Chunking Hint */}
                      {(() => {
                        const currentSec = COMPREHENSIVE_SECTORS.find((s) => s.name === category);
                        if (!currentSec) return null;
                        return (
                          <div className="p-2 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-slate-300">
                            <span className="text-[#F98864] font-bold">{currentSec.icon} Key Roles:</span>{' '}
                            <span className="text-slate-300">{currentSec.description}</span>
                          </div>
                        );
                      })()}
                    </div>

                    {/* GENERAL WORKER ("OTHERS") DYNAMIC SUB-DROPDOWN & EXACT SECTOR SPECIFICATION */}
                    {(category === 'Others (General Worker)' || category === 'Others') && (
                      <div className="sm:col-span-2 p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#181039] to-[#120B30] border-2 border-amber-500/40 space-y-3.5 animate-fade-in shadow-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">🧰</span>
                            <div>
                              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                                <span>General Worker Specification Desk</span>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-200">
                                  Multi-Skilled
                                </span>
                              </h4>
                              <p className="text-[11px] text-slate-300">
                                General workers possess basic practical experience across multiple trades (electrical, plumbing, masonry, construction, farming).
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* General Worker Sub-Dropdown */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                            <span>General Worker Primary Sub-Sector *</span>
                            <span className="text-[10px] text-purple-300 font-semibold">Select primary focus profile</span>
                          </label>
                          <select
                            value={generalWorkerSubSector}
                            onChange={(e) => {
                              const val = e.target.value;
                              setGeneralWorkerSubSector(val);
                              const found = GENERAL_WORKER_SUB_SECTORS.find((s) => s.name === val);
                              if (found) {
                                setExactGeneralWorkerSectors(found.defaultTrades.join(', '));
                              }
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-[#140D36] border border-amber-500/40 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
                          >
                            {GENERAL_WORKER_SUB_SECTORS.map((sub) => (
                              <option key={sub.id} value={sub.name} className="bg-[#0C0824] text-white py-1">
                                {sub.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Exact Categories / Sectors Input Field */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-200">
                              Exact Categories or Sectors Person Will Be Working *
                            </label>
                            <span className="text-[10px] text-slate-400">Comma separated or tap chips below</span>
                          </div>
                          <input
                            type="text"
                            required
                            value={exactGeneralWorkerSectors}
                            onChange={(e) => setExactGeneralWorkerSectors(e.target.value)}
                            placeholder="e.g. Electrician, Plumbing, Construction, Agriculture, Handyman"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-amber-500/40 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-medium"
                          />

                          {/* Quick-add Trade Chips */}
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <span className="text-[10px] text-amber-300/90 font-bold mr-1">Quick Add Trades:</span>
                            {[
                              'Electrician',
                              'Plumbing',
                              'Construction',
                              'Agriculture',
                              'Carpentry',
                              'Warehouse',
                              'Handyman',
                              'Painting',
                              'Masonry',
                              'Sanitation',
                              'Welding Helper',
                            ].map((trade) => (
                              <button
                                key={trade}
                                type="button"
                                onClick={() => {
                                  if (!exactGeneralWorkerSectors.includes(trade)) {
                                    setExactGeneralWorkerSectors((prev) =>
                                      prev.trim() ? `${prev.trim()}, ${trade}` : trade
                                    );
                                  }
                                }}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-200 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer"
                              >
                                + {trade}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

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

                    {/* Document Processing Time */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#4DA5EC]" />
                          <span>Document Processing Time *</span>
                        </label>
                        <span className="text-[10px] text-slate-400">Monthly / Weeks</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={processingTime}
                        onChange={(e) => setProcessingTime(e.target.value)}
                        placeholder="e.g. 1 – 2 Months, 2 – 3 Months, 4 – 6 Weeks"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                      />
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        {['1 – 2 Months', '2 – 3 Months', '3 – 4 Months', '4 – 6 Weeks', '6 – 8 Weeks'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setProcessingTime(preset)}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
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
                        <option value="Basic Trade Experience (1-2 Years)">Basic Trade Experience (1-2 Years)</option>
                        <option value="Mid-Level (2+ Years)">Mid-Level (2+ Years)</option>
                        <option value="Senior Specialist (5+ Years)">Senior Specialist (5+ Years)</option>
                        <option value="Lead / Supervisory (7+ Years)">Lead / Supervisory (7+ Years)</option>
                      </select>
                    </div>

                    {/* CANDIDATE AGE RESTRICTION / BRACKET */}
                    <div className="space-y-2 sm:col-span-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#4DA5EC]" />
                          <span>Candidate Age Restriction / Bracket *</span>
                        </label>
                        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                          <button
                            type="button"
                            onClick={() => setHasAgeRestriction(true)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              hasAgeRestriction
                                ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Specific Age Bracket
                          </button>
                          <button
                            type="button"
                            onClick={() => setHasAgeRestriction(false)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              !hasAgeRestriction
                                ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            No Age Restriction (18+)
                          </button>
                        </div>
                      </div>

                      {hasAgeRestriction ? (
                        <div className="space-y-3 pt-1 animate-fade-in">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-slate-300">Minimum Age</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="18"
                                  max="65"
                                  value={ageMin}
                                  onChange={(e) => setAgeMin(Math.max(18, Number(e.target.value)))}
                                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                                  years
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-slate-300">Maximum Age</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min={ageMin}
                                  max="70"
                                  value={ageMax}
                                  onChange={(e) => setAgeMax(Math.max(ageMin, Number(e.target.value)))}
                                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-[#4DA5EC]"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
                                  years
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Age Presets */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-slate-400 font-semibold mr-1">Common Brackets:</span>
                            {[
                              { label: '21 – 45 yrs (Standard)', min: 21, max: 45 },
                              { label: '18 – 35 yrs (Youth)', min: 18, max: 35 },
                              { label: '25 – 50 yrs (Skilled)', min: 25, max: 50 },
                              { label: '22 – 55 yrs (General)', min: 22, max: 55 },
                            ].map((preset) => (
                              <button
                                key={preset.label}
                                type="button"
                                onClick={() => {
                                  setAgeMin(preset.min);
                                  setAgeMax(preset.max);
                                }}
                                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-purple-200 border border-white/10 transition-all cursor-pointer"
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>

                          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-bold">
                              <span>🎂 Specified Age Requirement:</span>
                              <span className="text-white font-extrabold text-sm">{ageMin} to {ageMax} years old</span>
                            </span>
                            <span className="text-[10px] text-amber-300/80 uppercase font-mono tracking-wider">
                              Enforced for Candidate Screening
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                          <span>Open to all adult candidates meeting statutory host country working age (18+). No upper age limit enforced.</span>
                        </div>
                      )}
                    </div>

                    {/* ELIGIBLE NATIONALITIES / ELIGIBLE COUNTRIES */}
                    <div className="space-y-2 sm:col-span-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Eligible Nationalities / Eligible Passports *</span>
                        </label>
                        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAllNationalities(true);
                              setEligibleCountriesText('All Countries / Worldwide');
                            }}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              isAllNationalities
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-sm font-extrabold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            All Nationalities (Open to All)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsAllNationalities(false);
                              if (eligibleCountriesText.includes('All')) {
                                setEligibleCountriesText('Nigeria, Ghana, Sierra Leone');
                              }
                            }}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              !isAllNationalities
                                ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Specific Eligible Countries Only
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={eligibleCountriesText}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEligibleCountriesText(val);
                              if (val.toLowerCase().includes('all')) {
                                setIsAllNationalities(true);
                              } else {
                                setIsAllNationalities(false);
                              }
                            }}
                            placeholder="e.g. Nigeria, Ghana, Sierra Leone or All Countries"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#4DA5EC]"
                          />
                        </div>

                        {/* Quick-add Country Chips */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick Select:</span>
                          {[
                            'Nigeria',
                            'Ghana',
                            'Sierra Leone',
                            'Kenya',
                            'South Africa',
                            'Cameroon',
                            'Rwanda',
                            'Uganda',
                            'All Countries / Worldwide',
                          ].map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => {
                                if (c.includes('All')) {
                                  setIsAllNationalities(true);
                                  setEligibleCountriesText('All Countries / Worldwide');
                                } else {
                                  setIsAllNationalities(false);
                                  if (eligibleCountriesText.includes('All')) {
                                    setEligibleCountriesText(c);
                                  } else if (!eligibleCountriesText.includes(c)) {
                                    setEligibleCountriesText((prev) =>
                                      prev.trim() ? `${prev.trim()}, ${c}` : c
                                    );
                                  }
                                }
                              }}
                              className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-200 border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
                            >
                              + {c}
                            </button>
                          ))}
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {isAllNationalities ? (
                            <span className="text-emerald-300 font-semibold">
                              ✓ Open to candidates of any citizenship worldwide. No nationality restrictions applied.
                            </span>
                          ) : (
                            <span className="text-amber-300 font-semibold">
                              ⚠️ Restrictive Quota: Only passport holders of the above countries are eligible for screening.
                            </span>
                          )}
                        </p>
                      </div>
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
                      <div>
                        <span className="text-slate-400 block text-[10px]">Age Bracket</span>
                        <span className="font-bold text-amber-300">
                          {hasAgeRestriction ? `${ageMin} – ${ageMax} yrs` : '18+ (No Limit)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Processing Time</span>
                        <span className="font-bold text-emerald-300">{processingTime}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block text-[10px]">Eligible Passports</span>
                        <span className="font-bold text-blue-300 truncate block">
                          {isAllNationalities ? 'All Nationalities (Worldwide)' : eligibleCountriesText}
                        </span>
                      </div>
                    </div>

                    {/* General Worker Trade Breakdown in Preview */}
                    {(category === 'Others (General Worker)' || category === 'Others') && exactGeneralWorkerSectors && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                        <span className="font-bold text-[10px] uppercase tracking-wider text-amber-300 block">
                          🧰 General Worker Sectors Required:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {exactGeneralWorkerSectors.split(',').map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-200 border border-amber-500/40 text-[10px] font-medium">
                              ✓ {t.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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
