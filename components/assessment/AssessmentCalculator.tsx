'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Globe2,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Clock,
  TrendingUp,
  RotateCcw,
  Scale,
  Calendar,
  Lock,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { CountrySelect } from '@/components/ui/CountrySelect';
import { submitPublicConsultation } from '@/app/actions/consultations';

export interface AssessmentFormState {
  primaryGoal: 'Study Abroad' | 'Employer Work Permit' | 'Permanent Residency' | 'European Business / Sp. z o.o.';
  destinationPreference: string;
  highestEducation: 'High School / WAEC' | 'OND / HND' | 'Bachelor Degree' | 'Master / PhD';
  hasEcaWes: 'Yes, Completed' | 'In Progress' | 'Not Started';
  englishTestStatus: 'IELTS / PTE (6.5+ Band)' | 'WAEC C6+ English (Waiver eligible)' | 'None / Will Take Test';
  yearsExperience: '0 - 1 Year' | '2 - 4 Years' | '5+ Years';
  jobRoleCategory: 'Tech / Engineering' | 'Healthcare / Nursing' | 'Finance / Business' | 'Trades / Logistics' | 'General / Other';
  fundsSeasoningTenure: 'Under 1 Month (Fresh Deposit)' | '1 - 3 Months Seasoned' | '4 - 6+ Months Mature' | 'Third-Party Sponsor Backed';
  budgetBracket: 'Below ₦5M' | '₦5M - ₦12M' | '₦12M - ₦25M' | 'Above ₦25M';
  priorRefusal: 'None (Clean Passport)' | '1 Previous Refusal' | '2+ Previous Refusals';
  fullName: string;
  email: string;
  phone: string;
}

export const AssessmentCalculator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<AssessmentFormState>({
    primaryGoal: 'Study Abroad',
    destinationPreference: 'Poland',
    highestEducation: 'Bachelor Degree',
    hasEcaWes: 'Not Started',
    englishTestStatus: 'WAEC C6+ English (Waiver eligible)',
    yearsExperience: '2 - 4 Years',
    jobRoleCategory: 'Finance / Business',
    fundsSeasoningTenure: '1 - 3 Months Seasoned',
    budgetBracket: '₦5M - ₦12M',
    priorRefusal: 'None (Clean Passport)',
    fullName: '',
    email: '',
    phone: '',
  });

  // Calculate dynamic 0-100 Case Readiness Score based on consular risk criteria
  const readinessAudit = useMemo(() => {
    let score = 50; // base score

    // Education points
    if (formData.highestEducation === 'Master / PhD') score += 15;
    else if (formData.highestEducation === 'Bachelor Degree') score += 12;
    else if (formData.highestEducation === 'OND / HND') score += 8;
    else score += 4;

    // English / ECA
    if (formData.englishTestStatus === 'IELTS / PTE (6.5+ Band)') score += 10;
    else if (formData.englishTestStatus === 'WAEC C6+ English (Waiver eligible)') score += 6;

    if (formData.hasEcaWes === 'Yes, Completed') score += 8;
    else if (formData.hasEcaWes === 'In Progress') score += 4;

    // Experience
    if (formData.yearsExperience === '5+ Years') score += 10;
    else if (formData.yearsExperience === '2 - 4 Years') score += 7;
    else score += 2;

    // Financial Seasoning (Consular Critical Trap)
    if (formData.fundsSeasoningTenure === '4 - 6+ Months Mature') score += 12;
    else if (formData.fundsSeasoningTenure === '1 - 3 Months Seasoned') score += 6;
    else if (formData.fundsSeasoningTenure === 'Third-Party Sponsor Backed') score += 3;
    else score -= 8; // Fresh unseasoned deposits trigger 80% of visa rejections in Nigeria

    // Budget match
    if (formData.budgetBracket === 'Above ₦25M') score += 10;
    else if (formData.budgetBracket === '₦12M - ₦25M') score += 8;
    else if (formData.budgetBracket === '₦5M - ₦12M') score += 4;
    else score -= 4;

    // Prior Refusal penalty
    if (formData.priorRefusal === '1 Previous Refusal') score -= 10;
    else if (formData.priorRefusal === '2+ Previous Refusals') score -= 22;

    // Normalize between 25 and 97 (never give 100% false certainty)
    const finalScore = Math.min(Math.max(score, 28), 96);

    let tier: 'High Viability' | 'Moderate Viability' | 'High Risk / Requires Remediation';
    let colorClass: string;
    let summary: string;

    if (finalScore >= 80) {
      tier = 'High Viability';
      colorClass = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      summary =
        'Your profile exhibits solid statutory alignment. With properly verified documentation and seasoned funds, your probability of first-pass consular approval is high.';
    } else if (finalScore >= 60) {
      tier = 'Moderate Viability';
      colorClass = 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      summary =
        'Your profile has strong foundational eligibility, but contains 1 or 2 forensic vulnerabilities (such as fund seasoning tenure or documentation gaps) that must be remediated before formal lodgement.';
    } else {
      tier = 'High Risk / Requires Remediation';
      colorClass = 'text-rose-400 bg-rose-950/60 border-rose-500/40';
      summary =
        'Lodging an application right now carries a high risk of refusal under standard immigration rules. A strategic profile rebuild, fund seasoning plan, or pathway adjustment is mandatory before spending consular fees.';
    }

    return {
      score: finalScore,
      tier,
      colorClass,
      summary,
    };
  }, [formData]);

  const getPathwayRecommendation = () => {
    switch (formData.primaryGoal) {
      case 'Study Abroad':
        return {
          corridor: 'Poland, Malta, Cyprus & UK University Pipelines',
          permitType: 'National Type D Student Visa / UK Student Route',
          avgProcessingTime: '8 to 14 Weeks',
          tuitionBracket: '€2,500 – €4,800/yr (approx. ₦4.2M – ₦8.1M)',
          postStudyWork: '1 to 3 Years Legal Post-Study Work Search Visa',
          routeLink: ROUTES.services.studyVisa,
          vitalMilestones: [
            'Direct partner university admission without third-party broker markups',
            'WAEC/NECO Apostille & Ministry of Foreign Affairs legalisation',
            'CBN Form A / PTA tuition remittance compliance and 3-month funds seasoning',
            'Consular interview forensic dossier preparation (SOP & ties verification)',
          ],
        };
      case 'Employer Work Permit':
        return {
          corridor: 'Poland (Voivodeship), Slovakia, Czech Republic & Romania',
          permitType: 'Statutory Single Permit (Zezwolenie na Pracę / National D-Type)',
          avgProcessingTime: '12 to 24 Weeks',
          tuitionBracket: 'No Tuition (Official Labour Contract)',
          postStudyWork: 'Renewable 1 to 3-Year Temporary Residence Card (Karta Pobytu)',
          routeLink: ROUTES.services.workVisa,
          vitalMilestones: [
            'Shortage list employer matching with verified tax registration and labour authorization',
            'State Labour Office Voivodeship permit issuance in your legal passport name',
            'Criminal record (Interpol police clearance) legalisation in Abuja',
            'Embassy biometric booking and consular submission file audit',
          ],
        };
      case 'Permanent Residency':
        return {
          corridor: 'Canada Express Entry (FSW/PNP) & European Long-Term Residence',
          permitType: 'Direct Permanent Resident Visa (COPR)',
          avgProcessingTime: '6 to 12 Months',
          tuitionBracket: 'No Tuition (Government Processing & Settlement Funds)',
          postStudyWork: 'Indefinite Right to Work and Settle with Family',
          routeLink: ROUTES.services.permanentResidency,
          vitalMilestones: [
            'WES/ICAS Educational Credential Assessment equivalency report',
            'Language benchmark achievement (IELTS General CLB 7 to 9)',
            '6-month unencumbered liquid proof of funds bank verification',
            'TEER 0, 1, 2, or 3 employment tenure letter forensic cross-checking',
          ],
        };
      case 'European Business / Sp. z o.o.':
      default:
        return {
          corridor: 'Poland (Warsaw / Krakow) & Schengen Corporate Corridor',
          permitType: 'Sp. z o.o. Company Formation & Business Director D-Visa',
          avgProcessingTime: '6 to 10 Weeks',
          tuitionBracket: 'Corporate Capital: PLN 5,000 (approx. ₦1.8M Statutory Minimum)',
          postStudyWork: 'Renewable Corporate Director Residence Card (Karta Pobytu)',
          routeLink: ROUTES.services.businessRegistration,
          vitalMilestones: [
            'KRS National Court Register incorporation and PESEL electronic ID setup',
            'European Corporate EUR/PLN bank account activation with VAT-EU & NIP registration',
            'Commercial business plan demonstration of economic benefit to the host economy',
            'National D-Type business residency application for directors and shareholders',
          ],
        };
    }
  };

  const recommendation = getPathwayRecommendation();

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please enter your full name, email address, and active WhatsApp number.');
      return;
    }
    setIsSubmitting(true);

    try {
      const serviceSlugMap: Record<string, string> = {
        'Study Abroad': 'study-visa',
        'Employer Work Permit': 'work-visa',
        'Permanent Residency': 'permanent-residency',
        'European Business / Sp. z o.o.': 'business-registration',
      };

      await submitPublicConsultation({
        serviceSlug: serviceSlugMap[formData.primaryGoal] || 'study-visa',
        targetDestination: formData.destinationPreference,
        applicantObjective: `[Case Readiness Score: ${readinessAudit.score}/100 — ${readinessAudit.tier}] Primary Goal: ${formData.primaryGoal}. Education: ${formData.highestEducation}. Experience: ${formData.yearsExperience}. Funds Seasoning: ${formData.fundsSeasoningTenure}. Budget: ${formData.budgetBracket}. Prior Refusals: ${formData.priorRefusal}.`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredMethod: 'whatsapp_video',
        conditionalData: {
          assessmentScore: readinessAudit.score,
          assessmentTier: readinessAudit.tier,
          ...formData,
        },
        ndprConsent: true,
      });
    } catch (err) {
      console.error('[Assessment Lead Capture Note]:', err);
    } finally {
      setIsSubmitting(false);
      setIsCalculated(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2">
      {/* Top Badge & Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#4DA5EC]/30 text-[#4DA5EC] text-xs font-semibold mb-3 tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
          <span>Statutory Immigration Qualification Engine (2026/2027 Guidelines)</span>
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
          Calculate Your Case Readiness Score
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          Evaluate your profile against genuine European, UK, and Canadian visa rules before spending money on
          applications or non-refundable embassy fees.
        </p>

        {/* Multi-Step Progress Tracker */}
        {!isCalculated && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
              <span className="text-white font-semibold">Step {step} of 4</span>
              <span>
                {step === 1 && 'Relocation Objective'}
                {step === 2 && 'Academic & Language'}
                {step === 3 && 'Career & Funds Seasoning'}
                {step === 4 && 'Lead Audit Delivery'}
              </span>
              <span className="text-[#4DA5EC] font-bold">{step * 25}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] rounded-full transition-all duration-300"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Glassmorphic Diagnostic Card */}
      <div className="rounded-3xl bg-[#0B071E]/90 border border-white/10 p-6 sm:p-9 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#257CFF]/10 rounded-full blur-3xl pointer-events-none" />

        {!isCalculated ? (
          <div>
            {/* STEP 1: Objective & Corridor */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-1">
                    1. What is your primary relocation objective?
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Select the statutory pathway best aligned with your personal timeline and long-term settlement goals.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        key: 'Study Abroad' as const,
                        icon: GraduationCap,
                        title: 'Study Abroad (Bachelor / Master)',
                        desc: 'Accredited European or UK university admission with legal part-time and post-study work rights.',
                      },
                      {
                        key: 'Employer Work Permit' as const,
                        icon: Briefcase,
                        title: 'Employer-Sponsored Work Permit',
                        desc: 'Direct statutory employment via official labour office permits (e.g. Poland Voivodeship).',
                      },
                      {
                        key: 'Permanent Residency' as const,
                        icon: Globe2,
                        title: 'Permanent Residency (Point-Based)',
                        desc: 'Direct PR settlement for qualified skilled professionals (Canada Express Entry / EU routes).',
                      },
                      {
                        key: 'European Business / Sp. z o.o.' as const,
                        icon: Building2,
                        title: 'European Business Incorporation',
                        desc: 'Form a Polish limited liability company (Sp. z o.o.) and obtain director Schengen residency.',
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = formData.primaryGoal === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setFormData({ ...formData, primaryGoal: item.key })}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#257CFF]/15 border-[#257CFF] shadow-[0_0_20px_rgba(37,124,255,0.25)] ring-1 ring-[#257CFF]'
                              : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-[#257CFF] text-white'
                                  : 'bg-white/[0.05] text-slate-300'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white leading-snug">{item.title}</div>
                              <div className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <CountrySelect
                    value={formData.destinationPreference}
                    onChange={(country) => setFormData({ ...formData, destinationPreference: country })}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Continue to Academic Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Academic, ECA, English */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-1">
                    2. Highest Level of Education Completed
                  </label>
                  <p className="text-xs text-slate-400 mb-2.5">
                    Consulates verify institutional accreditation and certificates through official legalisation channels.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(['High School / WAEC', 'OND / HND', 'Bachelor Degree', 'Master / PhD'] as const).map(
                      (edu) => (
                        <button
                          key={edu}
                          type="button"
                          onClick={() => setFormData({ ...formData, highestEducation: edu })}
                          className={`py-3 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                            formData.highestEducation === edu
                              ? 'bg-[#257CFF] text-white border-[#257CFF]'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          {edu}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-1">
                      English Language Proficiency Status
                    </label>
                    <p className="text-xs text-slate-400 mb-2">
                      Many European universities accept WAEC C6+ or medium-of-instruction letters in place of IELTS.
                    </p>
                    <div className="space-y-2">
                      {(
                        [
                          'WAEC C6+ English (Waiver eligible)',
                          'IELTS / PTE (6.5+ Band)',
                          'None / Will Take Test',
                        ] as const
                      ).map((test) => (
                        <button
                          key={test}
                          type="button"
                          onClick={() => setFormData({ ...formData, englishTestStatus: test })}
                          className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                            formData.englishTestStatus === test
                              ? 'bg-[#257CFF]/15 border-[#257CFF] text-white'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span>{test}</span>
                          {formData.englishTestStatus === test && (
                            <CheckCircle2 className="w-4 h-4 text-[#4DA5EC] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-1">
                      Credential Assessment (WES / ICAS / ECA)
                    </label>
                    <p className="text-xs text-slate-400 mb-2">
                      Required for Canadian Express Entry; optional or waived for European master&apos;s admissions.
                    </p>
                    <div className="space-y-2">
                      {(['Not Started', 'In Progress', 'Yes, Completed'] as const).map((eca) => (
                        <button
                          key={eca}
                          type="button"
                          onClick={() => setFormData({ ...formData, hasEcaWes: eca })}
                          className={`w-full py-2.5 px-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                            formData.hasEcaWes === eca
                              ? 'bg-[#257CFF]/15 border-[#257CFF] text-white'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span>{eca}</span>
                          {formData.hasEcaWes === eca && (
                            <CheckCircle2 className="w-4 h-4 text-[#4DA5EC] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Proceed to Career &amp; Funds</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Career, Funds Seasoning, Refusal History */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-1">
                      Professional Work Experience
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['0 - 1 Year', '2 - 4 Years', '5+ Years'] as const).map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setFormData({ ...formData, yearsExperience: exp })}
                          className={`py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                            formData.yearsExperience === exp
                              ? 'bg-[#257CFF] text-white border-[#257CFF]'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-1">
                      Job Role Category / Sector
                    </label>
                    <select
                      value={formData.jobRoleCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jobRoleCategory: e.target.value as AssessmentFormState['jobRoleCategory'],
                        })
                      }
                      className="w-full py-2.5 px-3 rounded-xl bg-[#070415] border border-white/15 text-xs text-white focus:outline-none focus:border-[#257CFF]"
                    >
                      <option value="Tech / Engineering">Tech / Engineering / Software</option>
                      <option value="Healthcare / Nursing">Healthcare / Nursing / Medical</option>
                      <option value="Finance / Business">Finance / Banking / Accounting / Admin</option>
                      <option value="Trades / Logistics">Trades / Logistics / Construction / Driver</option>
                      <option value="General / Other">General Commercial / Retail / Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-bold text-white">
                      Proof of Funds (POF) Seasoning Tenure
                    </label>
                    <span className="text-[11px] font-semibold text-rose-400">#1 Refusal Risk Factor</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2.5">
                    Unexplained lump-sum deposits made 1–2 weeks before visa submission trigger immediate document
                    fraud red flags at European and UK high commissions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        key: '4 - 6+ Months Mature' as const,
                        label: '4 to 6+ Months Mature Seasoning',
                        badge: 'Consular Preferred',
                        badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/80',
                      },
                      {
                        key: '1 - 3 Months Seasoned' as const,
                        label: '1 to 3 Months Seasoned',
                        badge: 'Acceptable with Audit',
                        badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800/80',
                      },
                      {
                        key: 'Under 1 Month (Fresh Deposit)' as const,
                        label: 'Under 1 Month (Fresh or Lump-Sum)',
                        badge: 'High Risk of Refusal',
                        badgeColor: 'text-rose-400 bg-rose-950/80 border-rose-800/80',
                      },
                      {
                        key: 'Third-Party Sponsor Backed' as const,
                        label: 'Direct First-Degree Family Sponsor',
                        badge: 'Requires Affidavit & Proof of Ties',
                        badgeColor: 'text-blue-400 bg-blue-950/80 border-blue-800/80',
                      },
                    ].map((item) => {
                      const isSelected = formData.fundsSeasoningTenure === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setFormData({ ...formData, fundsSeasoningTenure: item.key })}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#257CFF]/15 border-[#257CFF] text-white ring-1 ring-[#257CFF]'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className="font-semibold leading-tight">{item.label}</span>
                          <span
                            className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-1">
                      Estimated Relocation Budget (Total Capital)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Below ₦5M', '₦5M - ₦12M', '₦12M - ₦25M', 'Above ₦25M'] as const).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetBracket: b })}
                          className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                            formData.budgetBracket === b
                              ? 'bg-[#257CFF] text-white border-[#257CFF]'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-1">
                      Prior Visa Refusal History
                    </label>
                    <div className="space-y-2">
                      {(
                        [
                          'None (Clean Passport)',
                          '1 Previous Refusal',
                          '2+ Previous Refusals',
                        ] as const
                      ).map((refusal) => (
                        <button
                          key={refusal}
                          type="button"
                          onClick={() => setFormData({ ...formData, priorRefusal: refusal })}
                          className={`w-full py-2 px-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                            formData.priorRefusal === refusal
                              ? 'bg-[#257CFF]/15 border-[#257CFF] text-white'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span>{refusal}</span>
                          {formData.priorRefusal === refusal && (
                            <CheckCircle2 className="w-4 h-4 text-[#4DA5EC] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Proceed to Delivery &amp; Results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Personal Details & Calculation */}
            {step === 4 && (
              <form onSubmit={handleSubmitAssessment} className="space-y-5">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Where should we deliver your verified readiness audit?
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Your personal information is protected under the Nigeria Data Protection Act (NDPA) and NDPR
                    statutes. We never disclose your records to third parties.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Full Legal Name (as written on International Passport)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chukwuebuka Daniel Okafor"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#257CFF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Active Email Address (for Detailed Audit Sheet)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. c.okafor@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#257CFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        WhatsApp / Active Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 803 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#257CFF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 text-[11px] text-slate-400">
                  <Lock className="w-4 h-4 text-[#4DA5EC] shrink-0 mt-0.5" />
                  <span>
                    By clicking calculate, you consent to receiving your tailored eligibility diagnostic score and
                    statutory milestone breakdown. Sijam Consults Limited does not sell or distribute applicant leads.
                  </span>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? 'Auditing Parameters...' : 'Calculate Case Readiness Score'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* CALCULATED RESULTS STATE */
          <div className="space-y-7 animate-in fade-in duration-300">
            {/* Top Score Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl bg-[#070415] border border-white/15 flex flex-col items-center justify-center shrink-0 shadow-inner">
                  <span className="text-2xl font-black text-white">{readinessAudit.score}</span>
                  <span className="text-[10px] font-bold text-[#4DA5EC] uppercase tracking-wider">/ 100 PTS</span>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
                    Calculated Case Readiness Score
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${readinessAudit.colorClass}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {readinessAudit.tier}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 md:max-w-xs leading-relaxed">
                Candidate: <strong className="text-white">{formData.fullName || 'Candidate'}</strong>
                <br />
                Target Corridor: <strong className="text-[#4DA5EC]">{formData.destinationPreference}</strong>
              </div>
            </div>

            {/* Diagnostic Commentary */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white font-semibold">Diagnostic Summary: </strong>
              {readinessAudit.summary}
            </div>

            {/* Recommended Pathway Blueprint */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#070415]/70 border border-[#257CFF]/30 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4DA5EC]">
                    Statutory Recommended Pathway
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white mt-0.5">
                    {recommendation.permitType}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#4DA5EC]" />
                  Avg Timeline: {recommendation.avgProcessingTime}
                </span>
              </div>

              {/* Grid of Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corridor / Hub</div>
                  <div className="text-xs font-bold text-white mt-1">{recommendation.corridor}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tuition or Capital</div>
                  <div className="text-xs font-bold text-white mt-1">{recommendation.tuitionBracket}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Settlement Standing</div>
                  <div className="text-xs font-bold text-white mt-1">{recommendation.postStudyWork}</div>
                </div>
              </div>

              {/* Strategic Milestone Roadmap */}
              <div className="pt-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Mandatory Statutory Milestones Before Submission</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {recommendation.vitalMilestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-[#257CFF] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href={ROUTES.consultation}
                className="flex-1 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all text-center"
              >
                <span>Book 1-on-1 Consular Diagnostic Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={recommendation.routeLink}
                className="inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-xs border border-white/15 transition-all text-center"
              >
                <span>Examine Full Route Specs</span>
              </Link>
            </div>

            {/* Recalculate Option */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsCalculated(false);
                  setStep(1);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Adjust parameters and recalculate</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
