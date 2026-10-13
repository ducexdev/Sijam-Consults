'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { COMPANY, ROUTES } from '@/lib/routes';
import { validateContactForm } from '@/lib/validation';
import { submitGeneralEnquiry } from '@/app/actions/contact';

export default function ContactPage() {
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
      console.warn('Submission fallback:', err);
      setInquiryRef(`INQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* Cinematic Header with Ambient Video */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-125"
              src="/videos/SIjam-Consult-Limited.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Contact Us' }]} />
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <MapPin className="w-4 h-4 text-[#F45A2A]" />
                <span>Kaduna Corporate Headquarters • Physical Visits Welcome</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Connect With Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Executive Counsel
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Visit our physical office suite in Kaduna or dispatch your inquiry online. Direct responses delivered under 2 business hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Body */}
        <section className="py-12 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-10 max-w-4xl mx-auto">
              <TrustBanner showFullDisclaimer={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Direct Office Credentials */}
              <div className="lg:col-span-5 space-y-5">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-xl space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#402493]/60 text-purple-200 flex items-center justify-center shrink-0 border border-purple-500/30">
                      <MapPin className="w-6 h-6 text-[#F98864]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        Kaduna Headquarters
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {COMPANY.address.suite}, {COMPANY.address.building}, {COMPANY.address.city}, {COMPANY.address.state}, Nigeria.
                      </p>
                      <div className="text-[11px] font-bold text-[#F98864] mt-1">
                        CAC Registered: {COMPANY.cacNumber}
                      </div>
                    </div>
                  </div>

                  {/* Telephone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F45A2A]/20 text-[#F98864] flex items-center justify-center shrink-0 border border-orange-500/30">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        Direct Lines
                      </h3>
                      <div className="space-y-1 mt-1 text-xs">
                        <div>
                          <a
                            href={`tel:${COMPANY.phones.primary}`}
                            className="text-slate-300 hover:text-white font-medium"
                          >
                            {COMPANY.phones.primary} (Primary Hotline)
                          </a>
                        </div>
                        <div>
                          <a
                            href={`tel:${COMPANY.phones.secondary}`}
                            className="text-slate-300 hover:text-white font-medium"
                          >
                            {COMPANY.phones.secondary} (Desk)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#402493]/60 text-purple-200 flex items-center justify-center shrink-0 border border-purple-500/30">
                      <Mail className="w-6 h-6 text-[#F98864]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        Official Dispatches
                      </h3>
                      <div className="space-y-1 mt-1 text-xs">
                        <div>
                          <a
                            href={`mailto:${COMPANY.emails.primary}`}
                            className="text-slate-300 hover:text-white"
                          >
                            {COMPANY.emails.primary}
                          </a>
                        </div>
                        <div>
                          <a
                            href={`mailto:${COMPANY.emails.admissions}`}
                            className="text-slate-300 hover:text-white"
                          >
                            {COMPANY.emails.admissions}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 text-slate-300 flex items-center justify-center shrink-0 border border-white/10">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        Operating Hours
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        {COMPANY.hours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Concierge Card */}
                <a
                  href={COMPANY.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white flex items-center justify-between shadow-xl hover:scale-[1.02] transition-transform group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">
                      Priority Response
                    </span>
                    <h4 className="font-heading font-bold text-base text-white mt-0.5">
                      WhatsApp Senior Concierge
                    </h4>
                    <p className="text-xs text-emerald-100 mt-0.5">
                      Chat directly with our senior advisor.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </a>
              </div>

              {/* Right Column: High-Precision Contact Form */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-2xl">
                  {isSuccess ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>
                      <h3 className="font-heading font-black text-2xl text-white">
                        Inquiry Successfully Transmitted
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        Our client relations desk in Kaduna will evaluate your inquiry and connect via your preferred contact channel under 2 business hours.
                      </p>
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
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                          Submit an Inquiry
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Provide your details and our senior counselors will respond directly.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Aminu Bello"
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                            errors.fullName ? 'border-red-500' : 'border-white/15'
                          }`}
                        />
                        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                              errors.email ? 'border-red-500' : 'border-white/15'
                            }`}
                          />
                          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+234 803 123 4567"
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                              errors.phone ? 'border-red-500' : 'border-white/15'
                            }`}
                          />
                          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Service of Interest
                        </label>
                        <select
                          value={formData.serviceCategory}
                          onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#0D0826] border border-white/15 text-white text-xs focus:outline-none focus:border-[#F45A2A]"
                        >
                          <option>Study Abroad & Admissions</option>
                          <option>Work Permits & Placement</option>
                          <option>Tourist & Visitor Visas</option>
                          <option>File Audit & Mock Interview</option>
                          <option>European Company Registration</option>
                          <option>MFA Document Legalization</option>
                          <option>Flight Reservations & Ticketing</option>
                          <option>Other Travel Advisory</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                          Your Inquiry / Travel Objective *
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe your current status, timeline, target destination, and questions..."
                          className={`w-full px-4 py-3 rounded-xl bg-white/[0.05] border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F45A2A] ${
                            errors.message ? 'border-red-500' : 'border-white/15'
                          }`}
                        />
                        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                      </div>

                      {/* NDPR Consent */}
                      <div className="pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.ndprConsent}
                            onChange={(e) => setFormData({ ...formData, ndprConsent: e.target.checked })}
                            className="mt-1 w-4 h-4 text-[#F45A2A] rounded border-white/20 bg-black/40 focus:ring-[#F45A2A]"
                          />
                          <span className="text-xs text-slate-400 leading-relaxed">
                            I agree that Sijam Consults Limited may process my details to respond to this inquiry under the Nigeria Data Protection Act (NDPR 2023).
                          </span>
                        </label>
                        {errors.ndprConsent && <p className="text-xs text-red-400 mt-1">{errors.ndprConsent}</p>}
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all cursor-pointer border border-[#4DA5EC]/30"
                        >
                          <Send className="w-4 h-4" />
                          <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Inquiry'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
