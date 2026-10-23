'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { validateContactForm } from '@/lib/validation';
import { submitGeneralEnquiry } from '@/app/actions/contact';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceCategory: 'Study Abroad & Admissions',
    message: '',
    ndprConsent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryRef, setInquiryRef] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      ndprConsent: formData.ndprConsent,
    });

    if (!result.isValid) {
      setErrors(result.errors as Record<string, string>);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitGeneralEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serviceCategory: formData.serviceCategory,
        message: formData.message,
        ndprConsent: formData.ndprConsent,
        honeypot: formData.honeypot,
      });

      if (res.success && res.inquiryReference) {
        setInquiryRef(res.inquiryReference);
        setIsSuccess(true);
      } else if (res.errors) {
        setErrors(res.errors);
      } else {
        setErrors({ form: res.message || 'Failed to file enquiry.' });
      }
    } catch (err) {
      console.error('Contact enquiry transmission error:', err);
      setErrors({ form: 'A network error occurred while submitting your message. Please check your connection and retry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0B071E] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#4DA5EC]/10 rounded-full blur-[80px] pointer-events-none" />

      {isSuccess ? (
        <div className="text-center py-10 space-y-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            Reference: {inquiryRef}
          </span>
          <h3 className="font-heading font-black text-2xl text-white">
            Inquiry Successfully Transmitted
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Our client relations desk in Kaduna has received your dossier and will evaluate your inquiry. A senior consultant will connect with you via your preferred channel under 2 business hours.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  serviceCategory: 'Study Abroad & Admissions',
                  message: '',
                  ndprConsent: false,
                  honeypot: '',
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold border border-white/15 transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[10px] font-black uppercase tracking-wider text-blue-300 mb-2">
              <Sparkles className="w-3 h-3 text-[#4DA5EC]" />
              Direct Casework Intake
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
              Submit an Official Client Inquiry
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Provide your details and case objectives. A senior counselor will review your requirements under our 2-hour response SLA.
            </p>
          </div>

          {/* Honeypot anti-spam field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="contact-full-name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Legal Name *
            </label>
            <input
              id="contact-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "contact-name-error" : undefined}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Aminu Bello"
              className={`w-full px-4 py-3 rounded-xl bg-[#070415] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC] focus-visible:ring-2 focus-visible:ring-[#4DA5EC] transition-colors ${
                errors.fullName ? 'border-red-500' : 'border-white/15'
              }`}
            />
            {errors.fullName && <p id="contact-name-error" className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Official Email Address *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#070415] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC] focus-visible:ring-2 focus-visible:ring-[#4DA5EC] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-white/15'
                }`}
              />
              {errors.email && <p id="contact-email-error" className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Phone / WhatsApp Number *
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 803 123 4567"
                className={`w-full px-4 py-3 rounded-xl bg-[#070415] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC] focus-visible:ring-2 focus-visible:ring-[#4DA5EC] transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-white/15'
                }`}
              />
              {errors.phone && <p id="contact-phone-error" className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="contact-category" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Service Area of Interest
            </label>
            <select
              id="contact-category"
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#070415] border border-white/15 text-white text-xs focus:outline-none focus:border-[#4DA5EC] focus-visible:ring-2 focus-visible:ring-[#4DA5EC] transition-colors"
            >
              <option>Study Abroad & Admissions</option>
              <option>Work Permits & Placement Advisory</option>
              <option>Tourist & Visitor Visas</option>
              <option>47-Point File Audit & Mock Interview</option>
              <option>European Company Registration & Business Visas</option>
              <option>Document Legalization (MFA Abuja Attestation)</option>
              <option>Flight Reservations & Ticketing</option>
              <option>General Executive Immigration Consultation</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Case Summary / Relocation Objective *
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Detail your target destination, timeline, qualifications, or specific questions..."
              className={`w-full px-4 py-3 rounded-xl bg-[#070415] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC] focus-visible:ring-2 focus-visible:ring-[#4DA5EC] transition-colors ${
                errors.message ? 'border-red-500' : 'border-white/15'
              }`}
            />
            {errors.message && <p id="contact-message-error" className="text-xs text-red-400 mt-1">{errors.message}</p>}
          </div>

          {/* NDPR Consent */}
          <div className="pt-1">
            <label htmlFor="contact-ndpr-consent" className="flex items-start gap-2.5 cursor-pointer">
              <input
                id="contact-ndpr-consent"
                name="ndprConsent"
                type="checkbox"
                aria-required="true"
                aria-invalid={!!errors.ndprConsent}
                aria-describedby={errors.ndprConsent ? "contact-ndpr-error" : undefined}
                checked={formData.ndprConsent}
                onChange={(e) => setFormData({ ...formData, ndprConsent: e.target.checked })}
                className="mt-1 w-4 h-4 text-[#257CFF] rounded border-white/20 bg-black/40 focus:ring-[#4DA5EC]"
              />
              <span className="text-[11px] text-slate-400 leading-relaxed">
                I agree that Sijam Consults Limited may process my details to respond to this inquiry under the Nigeria Data Protection Act (NDPR 2023). Zero spam guaranteed.
              </span>
            </label>
            {errors.ndprConsent && <p id="contact-ndpr-error" className="text-xs text-red-400 mt-1">{errors.ndprConsent}</p>}
          </div>

          {errors.form && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
              {errors.form}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting inquiry...' : 'Dispatch online inquiry'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
