'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Video,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SERVICES_DATA } from '@/lib/data/services';
import { COMPANY, ROUTES } from '@/lib/routes';
import { validateConsultationForm } from '@/lib/validation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ConsultationSubmission, ConsultationMethod } from '@/lib/types';

export const ConsultationWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ConsultationSubmission>({
    serviceSlug: 'study-visa',
    targetDestination: 'Poland / Europe',
    applicantObjective: '',
    fullName: '',
    email: '',
    phone: '',
    preferredMethod: 'in_person_kaduna',
    preferredDate: '',
    preferredTimeSlot: '10:00 AM - 11:00 AM WAT',
    notes: '',
    ndprConsent: false,
  });

  const [conditionalFields, setConditionalFields] = useState<Record<string, string>>({
    highestEducation: 'Bachelor Degree',
    intendedStudyLevel: 'Postgraduate (MSc)',
    englishStatus: 'MOI Letter from Nigerian Institution',
    tradeProfession: 'Healthcare & Nursing',
    yearsExperience: '3-5 years',
    companyType: 'Sp. z o.o. (Poland LLC)',
    shareholdersCount: '1-2 Directors',
    travelTimeline: 'Next 1-3 Months',
    priorTravel: 'First-time Schengen traveler',
    documentType: 'Degree Certificate & Transcript',
    legalizationAuthority: 'MFA & Polish Embassy Abuja',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>('');

  const nextStep = () => {
    setErrors({});
    if (step === 2) {
      if (!formData.applicantObjective || formData.applicantObjective.trim().length < 10) {
        setErrors({ applicantObjective: 'Please describe your travel/relocation objective in at least 10 characters.' });
        return;
      }
    }
    if (step === 3) {
      const validation = validateConsultationForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        applicantObjective: formData.applicantObjective,
        ndprConsent: true,
      });
      if (!validation.isValid) {
        setErrors(validation.errors as Record<string, string>);
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ndprConsent) {
      setErrors({ ndprConsent: 'You must consent to the privacy notice to proceed.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { submitPublicConsultation } = await import('@/app/actions/consultations');
      const res = await submitPublicConsultation({
        serviceSlug: formData.serviceSlug,
        targetDestination: formData.targetDestination,
        applicantObjective: formData.applicantObjective,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredMethod: formData.preferredMethod,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        conditionalData: conditionalFields,
        notes: formData.notes,
        ndprConsent: formData.ndprConsent,
      });

      if (res.success && res.referenceCode) {
        setReferenceCode(res.referenceCode);
        setIsSuccess(true);
      } else if (res.errors) {
        setErrors(res.errors);
      } else {
        setErrors({ form: res.message || 'Submission failed.' });
      }
    } catch (err) {
      console.error('Consultation booking transmission error:', err);
      setErrors({ form: 'A network error occurred while transmitting your consultation request. Please check your connection and retry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.04] border border-amber-500/40 backdrop-blur-2xl text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6 border border-amber-500/30 shadow-lg">
            <Clock className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3.5 py-1 rounded-full uppercase tracking-wider border border-amber-800/60">
            Request Logged • Pending Officer Verification
          </span>

          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-4">
            Consultation Request Received
          </h2>
          <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Your consultation request has been queued with our Kaduna triage desk. In accordance with consular governance, requested appointment windows are verified before being formally scheduled.
          </p>

          <div className="bg-white/[0.03] rounded-2xl p-5 my-6 border border-white/10 text-left">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Booking Reference</div>
            <div className="font-mono font-black text-2xl text-[#F98864] mt-0.5">{referenceCode}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div><strong className="text-white">Applicant:</strong> {formData.fullName}</div>
              <div><strong className="text-white">Service:</strong> {formData.serviceSlug}</div>
              <div><strong className="text-white">Channel:</strong> {formData.preferredMethod.replace('_', ' ')}</div>
              <div><strong className="text-white">Requested Window:</strong> {formData.preferredDate || 'Next Open Window'} ({formData.preferredTimeSlot})</div>
            </div>
          </div>

          {/* Verification Protocol Notice */}
          <div className="bg-amber-950/30 rounded-2xl p-4 my-5 border border-amber-500/30 text-left text-xs text-amber-200/90 leading-relaxed space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Consular Availability Invariant
            </div>
            <p>
              Requested slots are not confirmed until an advisory officer reviews case volume and calendar availability. You will receive an official calendar confirmation or rescheduling options via email and WhatsApp within 2–4 business hours.
            </p>
          </div>

          {/* What Happens Next Roadmap */}
          <div className="text-left bg-purple-950/30 rounded-2xl p-5 border border-purple-500/20 my-6 space-y-3">
            <h4 className="font-heading font-bold text-sm text-purple-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F45A2A]" />
              What Happens Next:
            </h4>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong className="text-white">Dossier Evaluation (Within 2 Hours):</strong> Our senior counselor reviews your destination goals.
              </li>
              <li>
                <strong className="text-white">Availability Verification:</strong> Our desk verifies advisor calendar slots and issues the official meeting link or Kaduna office directions.
              </li>
              <li>
                <strong className="text-white">Structured Strategy Session:</strong> 30-minute structured review of your genuine documentation and risk factors.
              </li>
              <li>
                <strong className="text-white">Zero Document Demands:</strong> We never collect original passports or fees before a signed retainer contract.
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={COMPANY.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all border border-[#4DA5EC]/30"
            >
              <span>Message Senior Advisor on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href={ROUTES.home}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-semibold border border-white/15 transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6">
      {/* Stepper Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>Step {step} of 6</span>
          <span className="text-[#F98864] font-bold">
            {step === 1 && '1. Select Service'}
            {step === 2 && '2. Explain Objective'}
            {step === 3 && '3. Contact Information'}
            {step === 4 && '4. Advisory Channel'}
            {step === 5 && '5. Schedule Slot'}
            {step === 6 && '6. Review & NDPR Consent'}
          </span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#402493] to-[#257CFF] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
               1. Select the Relevant Service
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Choose the primary immigration or travel service you require advisory for.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.slug}
                  type="button"
                  onClick={() => setFormData({ ...formData, serviceSlug: srv.slug })}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    formData.serviceSlug === srv.slug
                      ? 'bg-[#402493]/60 border-[#257CFF] shadow-neon-blue ring-1 ring-[#257CFF]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="font-heading font-bold text-sm text-white">
                    {srv.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {srv.tagline}
                  </div>
                  <div className="mt-3 text-[11px] font-bold text-[#4DA5EC]">
                    {formData.serviceSlug === srv.slug ? '✓ Selected' : 'Select'}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Explain Objective */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
                2. Explain Your Relocation or Travel Objective
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Help us understand what you hope to achieve, your preferred timeline, and any specific destinations.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Target Destination / Country of Interest
                </label>
                <input
                  type="text"
                  value={formData.targetDestination || ''}
                  onChange={(e) => setFormData({ ...formData, targetDestination: e.target.value })}
                  placeholder="e.g. Poland, Cyprus, United Kingdom, Canada, Schengen Area"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#F45A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Your Primary Objective & Background *
                </label>
                <textarea
                  rows={4}
                  value={formData.applicantObjective}
                  onChange={(e) => setFormData({ ...formData, applicantObjective: e.target.value })}
                  placeholder="Explain your plans: e.g., Looking to pursue an MSc in Computer Science for Spring intake; currently hold WAEC and BSc with 3 years IT experience..."
                  className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                    errors.applicantObjective ? 'border-red-500' : 'border-white/15'
                  }`}
                />
                {errors.applicantObjective && (
                  <p className="text-xs text-red-400 mt-1">{errors.applicantObjective}</p>
                )}
              </div>

              {/* Service-Specific Conditional Field Sets */}
              {formData.serviceSlug === 'study-visa' && (
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                      Study Visa Academic Profile
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono">Conditional Fields</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Current Highest Qualification
                      </label>
                      <select
                        value={conditionalFields.highestEducation || 'Bachelor Degree'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, highestEducation: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="High School / WAEC" className="bg-[#0D0826]">High School / WAEC</option>
                        <option value="OND / HND" className="bg-[#0D0826]">OND / HND</option>
                        <option value="Bachelor Degree" className="bg-[#0D0826]">Bachelor Degree</option>
                        <option value="Master / PhD" className="bg-[#0D0826]">Master / PhD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Target Degree Level
                      </label>
                      <select
                        value={conditionalFields.intendedStudyLevel || 'Postgraduate (MSc)'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, intendedStudyLevel: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="Undergraduate (BSc)" className="bg-[#0D0826]">Undergraduate (BSc)</option>
                        <option value="Postgraduate (MSc)" className="bg-[#0D0826]">Postgraduate (MSc)</option>
                        <option value="PhD Research" className="bg-[#0D0826]">PhD Research</option>
                        <option value="Diploma / Pathway" className="bg-[#0D0826]">Diploma / Pathway</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        English Proficiency
                      </label>
                      <select
                        value={conditionalFields.englishStatus || 'MOI Letter from Nigerian Institution'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, englishStatus: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="MOI Letter from Nigerian Institution" className="bg-[#0D0826]">MOI Letter (English Medium)</option>
                        <option value="IELTS / TOEFL Passed" className="bg-[#0D0826]">IELTS / TOEFL Passed</option>
                        <option value="Planning to write exam" className="bg-[#0D0826]">Planning to write exam</option>
                        <option value="Exempt" className="bg-[#0D0826]">Exempt / Native Speaker</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceSlug.includes('work') && (
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                      Work Permit & Employment Placement Profile
                    </span>
                    <span className="text-[10px] text-blue-400 font-mono">Conditional Fields</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Primary Trade / Vocation
                      </label>
                      <select
                        value={conditionalFields.tradeProfession || 'Healthcare & Nursing'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, tradeProfession: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="Healthcare & Nursing" className="bg-[#0D0826]">Healthcare & Nursing</option>
                        <option value="Information Technology" className="bg-[#0D0826]">Information Technology</option>
                        <option value="Skilled Trades (Welding/Electrical)" className="bg-[#0D0826]">Skilled Trades (Welder / Electrician)</option>
                        <option value="Construction & Engineering" className="bg-[#0D0826]">Construction & Engineering</option>
                        <option value="Logistics & Heavy Transport" className="bg-[#0D0826]">Logistics & Heavy Transport</option>
                        <option value="Hospitality & Culinary" className="bg-[#0D0826]">Hospitality & Culinary</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Verified Practical Experience
                      </label>
                      <select
                        value={conditionalFields.yearsExperience || '3-5 years'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, yearsExperience: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="Less than 2 years" className="bg-[#0D0826]">Less than 2 years</option>
                        <option value="3-5 years" className="bg-[#0D0826]">3 to 5 years (Standard)</option>
                        <option value="6-9 years" className="bg-[#0D0826]">6 to 9 years (Senior)</option>
                        <option value="10+ years" className="bg-[#0D0826]">10+ years (Master / Lead)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {(formData.serviceSlug.includes('company') || formData.serviceSlug.includes('business')) && (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                      Foreign Corporate Formation Profile
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Conditional Fields</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Target Corporate Structure
                      </label>
                      <select
                        value={conditionalFields.companyType || 'Sp. z o.o. (Poland LLC)'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, companyType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="Sp. z o.o. (Poland LLC)" className="bg-[#0D0826]">Polish Sp. z o.o. (Limited Liability)</option>
                        <option value="UK Private Limited (Ltd)" className="bg-[#0D0826]">UK Private Limited Company</option>
                        <option value="European Branch Office" className="bg-[#0D0826]">European Subsidiary / Branch</option>
                        <option value="Holding / Joint Venture" className="bg-[#0D0826]">Holding / Joint Venture</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Number of Founding Directors
                      </label>
                      <select
                        value={conditionalFields.shareholdersCount || '1-2 Directors'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, shareholdersCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="1 Director (Sole Founder)" className="bg-[#0D0826]">1 Director (Sole Founder)</option>
                        <option value="2-3 Directors" className="bg-[#0D0826]">2 to 3 Directors / Partners</option>
                        <option value="4+ Directors / Institutional" className="bg-[#0D0826]">4+ Directors / Institutional</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {formData.serviceSlug.includes('tourist') && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Tourist & Visitor Travel Profile
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">Conditional Fields</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Intended Travel Window
                      </label>
                      <select
                        value={conditionalFields.travelTimeline || 'Next 1-3 Months'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, travelTimeline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="Next 30 Days (Urgent)" className="bg-[#0D0826]">Next 30 Days (Urgent)</option>
                        <option value="Next 1-3 Months" className="bg-[#0D0826]">Next 1 to 3 Months</option>
                        <option value="Next 4-6 Months" className="bg-[#0D0826]">Next 4 to 6 Months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Prior International Travel History
                      </label>
                      <select
                        value={conditionalFields.priorTravel || 'First-time Schengen traveler'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, priorTravel: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="First-time international traveler" className="bg-[#0D0826]">First-time international traveler</option>
                        <option value="Africa / Middle East travel history" className="bg-[#0D0826]">Africa / Middle East history</option>
                        <option value="Prior Schengen / UK / US / Canada visas" className="bg-[#0D0826]">Prior Schengen / UK / US visas</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {(formData.serviceSlug.includes('legaliz') || formData.serviceSlug.includes('document')) && (
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                      Document Legalization & Apostille Profile
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">Conditional Fields</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Primary Document Category
                      </label>
                      <select
                        value={conditionalFields.documentType || 'Degree Certificate & Transcript'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, documentType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="Degree Certificate & Transcript" className="bg-[#0D0826]">Academic Degree & Transcripts</option>
                        <option value="Birth / Marriage Certificates" className="bg-[#0D0826]">Birth / Marriage Certificate</option>
                        <option value="Police Character Certificate" className="bg-[#0D0826]">Police Character Certificate</option>
                        <option value="Corporate / CAC Instruments" className="bg-[#0D0826]">Corporate / CAC Instruments</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-300 uppercase mb-1">
                        Target Consular Authority
                      </label>
                      <select
                        value={conditionalFields.legalizationAuthority || 'MFA & Polish Embassy Abuja'}
                        onChange={(e) => setConditionalFields({ ...conditionalFields, legalizationAuthority: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white focus:outline-none focus:border-[#F45A2A]"
                      >
                        <option value="MFA & Polish Embassy Abuja" className="bg-[#0D0826]">MFA & Polish Embassy Abuja</option>
                        <option value="Ministry of Foreign Affairs (MFA Only)" className="bg-[#0D0826]">Ministry of Foreign Affairs Only</option>
                        <option value="Ministry of Education & MFA" className="bg-[#0D0826]">Ministry of Education & MFA</option>
                        <option value="Multi-Embassy Attestation" className="bg-[#0D0826]">Multi-Embassy Attestation</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
                3. Provide Contact Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                We will use these details strictly to confirm your appointment. Zero spam or third-party marketing.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ibrahim Emmanuel Chukwudi"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                      errors.fullName ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                        errors.email ? 'border-red-500' : 'border-white/15'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 801 234 5678"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                        errors.phone ? 'border-red-500' : 'border-white/15'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Preferred Method */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
                4. Select Preferred Advisory Channel
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Choose between visiting our Kaduna headquarters in person or meeting virtually.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                {
                  id: 'in_person_kaduna',
                  title: 'Kaduna Office (In-Person)',
                  desc: 'Executive Suite A10, 2/4 Kachia Road, Kaduna.',
                  icon: MapPin,
                },
                {
                  id: 'whatsapp_video',
                  title: 'WhatsApp Video Call',
                  desc: 'Encrypted direct video session with senior advisor.',
                  icon: Video,
                },
                {
                  id: 'google_meet',
                  title: 'Google Meet / Zoom',
                  desc: 'Screen-sharing session for live document inspection.',
                  icon: Video,
                },
                {
                  id: 'phone_call',
                  title: 'Direct Voice Call',
                  desc: 'Standard telephone voice consultation.',
                  icon: PhoneCall,
                },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = formData.preferredMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        preferredMethod: method.id as ConsultationMethod,
                      })
                    }
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#402493]/60 border-[#257CFF] shadow-neon-blue ring-1 ring-[#257CFF]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm' : 'bg-[#402493]/60 text-purple-200'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-xs sm:text-sm text-white">
                          {method.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {method.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Schedule Slot */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
                5. Select An Available Time Window
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Consultations run Mon–Fri (9am–5pm WAT) and Saturday (10am–2pm WAT).
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="date"
                    value={formData.preferredDate || ''}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-[#F45A2A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Preferred Time Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    '10:00 AM - 11:00 AM WAT',
                    '01:00 PM - 02:00 PM WAT',
                    '03:00 PM - 04:00 PM WAT',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTimeSlot: slot })}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        formData.preferredTimeSlot === slot
                          ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border-[#257CFF] shadow-cta'
                          : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
              >
                <span>Review Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Review & NDPR Consent */}
        {step === 6 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
                6. Review Your Details & Submit
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Please verify your details. No sensitive original documents are required at this initial stage.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/10 space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <span className="text-slate-400">Service:</span>{' '}
                  <strong className="text-white">{formData.serviceSlug}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Destination:</span>{' '}
                  <strong className="text-white">{formData.targetDestination || 'Europe / Global'}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Applicant:</span>{' '}
                  <strong className="text-white">{formData.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Phone:</span>{' '}
                  <strong className="text-white">{formData.phone}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Channel:</span>{' '}
                  <strong className="text-white">{formData.preferredMethod.replace('_', ' ')}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Scheduled:</span>{' '}
                  <strong className="text-white">
                    {formData.preferredDate || 'Next Open Date'} ({formData.preferredTimeSlot})
                  </strong>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-slate-400">Objective:</span>
                <p className="italic text-slate-200 mt-0.5">{formData.applicantObjective}</p>
              </div>
            </div>

            {/* NDPR Privacy Consent */}
            <div className="rounded-2xl p-4 bg-purple-950/40 border border-purple-500/20 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ndprConsent}
                  onChange={(e) =>
                    setFormData({ ...formData, ndprConsent: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 text-[#257CFF] rounded border-white/20 bg-black/40 focus:ring-[#257CFF]"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I consent to Sijam Consults Limited collecting and processing my contact details solely for scheduling and providing this advisory consultation, under the Nigeria Data Protection Act (NDPR 2023). I acknowledge that Sijam Consults Limited is an independent consultancy and not an embassy or consular authority.
                </span>
              </label>
              {errors.ndprConsent && (
                <p className="text-xs text-red-400 font-semibold">{errors.ndprConsent}</p>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting...' : 'Confirm & Reserve Session'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
