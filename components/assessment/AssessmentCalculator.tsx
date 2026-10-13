'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Compass,
  Building,
  CheckCircle2,
  Shield,
  FileCheck,
  Send,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES, COMPANY } from '@/lib/routes';
import { AssessmentSubmission } from '@/lib/types';

export const AssessmentCalculator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<AssessmentSubmission>({
    currentStatus: 'Employed Professional',
    primaryGoal: 'Study Overseas',
    preferredDestination: 'Poland',
    highestEducation: 'Bachelor Degree',
    yearsExperience: '2-4 years',
    budgetBracket: '₦3M - ₦7M',
    fullName: '',
    email: '',
    phone: '',
  });

  const [isCalculated, setIsCalculated] = useState(false);

  const calculatePathway = () => {
    setIsCalculated(true);
  };

  const getRecommendation = () => {
    if (formData.primaryGoal === 'Study Overseas') {
      return {
        title: 'European Master’s or Undergraduate Admissions Pathway',
        destination: 'Poland / Cyprus / Greece / Portugal',
        feasibility: '94% Match Probability',
        recommendedRoute: ROUTES.services.studyVisa,
        details: 'Your educational profile qualifies for direct university admissions with English proficiency waivers. Low-cost tuition structures and legal student work rights are permitted by host nation statutes.',
        keySteps: [
          'Partner university direct application (No third-party broker markups)',
          'Proof of funds structure review',
          'Consular mock interview coaching & visa filing',
        ],
      };
    }
    if (formData.primaryGoal === 'Work & Live Abroad') {
      return {
        title: 'European Statutory Labor Authorization (Voivodeship Permit)',
        destination: 'Poland / Slovakia / Czech Republic',
        feasibility: '88% Match Probability',
        recommendedRoute: ROUTES.services.workVisa,
        details: 'With your verifiable career background, European shortage sectors provide direct statutory channels with genuine employer sponsorship and legal work permits.',
        keySteps: [
          'Host employer credential verification & contract audit',
          'Voivodeship labor permit issuance & authentication',
          'National D-Type long-stay work visa embassy packet',
        ],
      };
    }
    if (formData.primaryGoal === 'Incorporate Business in Europe') {
      return {
        title: 'Polish Sp. z o.o. Corporate Registration & Director D-Visa',
        destination: 'Poland (Warsaw / Krakow)',
        feasibility: '96% Match Probability',
        recommendedRoute: ROUTES.services.businessRegistration,
        details: 'Your stated capital and executive profile qualify for full corporate incorporation under the Polish Commercial Companies Code with 9% CIT and Schengen multi-entry director residency.',
        keySteps: [
          'KRS National Court Register incorporation',
          'Corporate bank account activation & VAT/NIP setup',
          'Schengen D-Type residence visa filing for directors',
        ],
      };
    }
    return {
      title: 'Consular-Audited Tourist & Visitor Visa Dossier',
      destination: 'United Kingdom / Schengen Area / Canada',
      feasibility: '82% Match Probability',
      recommendedRoute: ROUTES.services.touristVisa,
      details: 'Focus is placed on presenting verifiable home ties to Nigeria, active commercial/employment standing, and airline GDS-traceable PNR reservations.',
      keySteps: [
        'Economic & family ties documentation audit',
        'Verifiable round-trip flight PNR itinerary',
        'Consular question readiness briefing',
      ],
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6">
      {/* Progress Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F98864] bg-[#F45A2A]/10 px-3.5 py-1 rounded-full border border-orange-500/30">
          <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
          Instant Consular Assessment Engine
        </span>
        <h1 className="font-heading font-black text-2xl sm:text-4xl text-white mt-3 tracking-tight">
          Discover Your Relocation Pathway
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg mx-auto">
          Diagnostic assessment based on current European, UK, and Commonwealth statutory immigration frameworks.
        </p>

        {/* Progress Stepper Bar */}
        {!isCalculated && (
          <div className="mt-6 flex items-center justify-between text-xs text-slate-400 max-w-md mx-auto">
            <span>Step {step} of 3</span>
            <div className="flex-1 mx-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#402493] to-[#F45A2A] transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            <span className="text-[#F98864] font-semibold">{Math.round((step / 3) * 100)}%</span>
          </div>
        )}
      </div>

      {/* Main Glass Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
        {!isCalculated ? (
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  1. What is your primary international relocation objective?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Study Overseas' as const, icon: GraduationCap, desc: 'Bachelor’s, Master’s or Diploma' },
                    { label: 'Work & Live Abroad' as const, icon: Briefcase, desc: 'Employer-sponsored work permit' },
                    { label: 'Tourist Travel' as const, icon: Compass, desc: 'Holiday, business conference or family visit' },
                    { label: 'Incorporate Business in Europe' as const, icon: Building, desc: 'Polish Sp. z o.o. & Schengen residency' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.primaryGoal === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, primaryGoal: item.label })}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#402493]/60 border-[#257CFF] shadow-neon-blue ring-1 ring-[#257CFF]'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm' : 'bg-[#402493]/60 text-purple-200'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-heading font-bold text-xs sm:text-sm text-white">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  2. Your Academic & Professional Background
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Highest Level of Education Completed
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['High School / WAEC', 'OND / HND', 'Bachelor Degree', 'Master / PhD'] as const).map((edu) => (
                        <button
                          key={edu}
                          type="button"
                          onClick={() => setFormData({ ...formData, highestEducation: edu })}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                            formData.highestEducation === edu
                              ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border-[#257CFF] shadow-sm'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          {edu}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Professional Work Experience
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(['0-1 year', '2-4 years', '5+ years'] as const).map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setFormData({ ...formData, yearsExperience: exp })}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                            formData.yearsExperience === exp
                              ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border-[#257CFF] shadow-sm'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Self or Sponsor Relocation Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['Below ₦3M', '₦3M - ₦7M', '₦7M - ₦15M', 'Above ₦15M'] as const).map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetBracket: budget })}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                            formData.budgetBracket === budget
                              ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border-[#257CFF] shadow-sm'
                              : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
                  >
                    <span>Final Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  3. Where should we deliver your diagnostic recommendation?
                </h3>
                <p className="text-xs text-slate-300">
                  Your information is kept strictly private under the Nigeria Data Protection Regulation (NDPR). Zero spam.
                </p>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Samuel Adekunle"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#F45A2A]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="samuel@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#F45A2A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+234 801 234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#F45A2A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={calculatePathway}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Optimal Pathway</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Calculated Result State */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-white/10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {recommendation.feasibility}
              </span>
              <span className="text-xs text-slate-400">
                Target: <strong className="text-white">{recommendation.destination}</strong>
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider">
                Recommended Consular Pathway
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white mt-1">
                {recommendation.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {recommendation.details}
              </p>
            </div>

            {/* Strategic Roadmap Steps */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#4DA5EC]" />
                Recommended Next Milestones:
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {recommendation.keySteps.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#402493] text-[#4DA5EC] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={ROUTES.consultation}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all text-center border border-[#4DA5EC]/30"
              >
                <span>Book Advisor Session for This Pathway</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={recommendation.recommendedRoute}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs border border-white/15 transition-all text-center"
              >
                <span>Read Full Service Blueprint</span>
              </Link>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCalculated(false);
                  setStep(1);
                }}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Recalculate with different parameters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
