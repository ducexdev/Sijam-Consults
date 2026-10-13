'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  FileText,
  Clock,
  Sparkles,
  HelpCircle,
  FolderOpen,
  Play,
  Pause,
  MapPin,
  ChevronRight,
  GraduationCap,
  Award,
  Globe2,
  Banknote,
  BookOpen,
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import { SERVICES_DATA } from '@/lib/data/services';
import { Accordion } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { ROUTES, COMPANY } from '@/lib/routes';

// Featured destinations for Study Visa specialization
const STUDY_DESTINATIONS = [
  {
    country: 'Poland',
    flag: '🇵🇱',
    status: 'Schengen National D-Visa',
    tagline: 'High-standard European degrees with legal 20 hrs/week work rights and post-study stay-back permits.',
    tuition: 'From €2,500 – €3,800 / year',
    workRights: '20 hrs/week permitted by law',
    language: 'English Medium Waiver Accepted (No IELTS required)',
    partners: 'College of Economics & Computer Science, WSEI Warsaw',
  },
  {
    country: 'Northern Cyprus',
    flag: '🇨🇾',
    status: 'Guaranteed 50% Scholarship',
    tagline: 'Direct institutional liaison offering guaranteed merit tuition waivers and rapid admission issuance.',
    tuition: 'From €1,800 – €2,800 / year (after 50% scholarship)',
    workRights: 'On-campus & local student employment permitted',
    language: '100% English instruction with official waivers',
    partners: 'Cyprus West University Direct Liaison',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    status: '2-Year Graduate Route',
    tagline: 'Prestigious global qualifications with 2-year post-study work authorization across the UK.',
    tuition: 'From £12,500 – £16,000 / year (flexible deposit)',
    workRights: '20 hrs/week term-time, full-time during holidays',
    language: 'WAEC English C6+ accepted by select universities',
    partners: 'Accredited British Universities Network',
  },
  {
    country: 'Greece & Southern Europe',
    flag: '🇬🇷',
    status: 'Affordable EU Gateway',
    tagline: 'Low cost of living, high visa success rates, and seamless mobility across the European Union.',
    tuition: 'From €3,000 – €4,500 / year',
    workRights: 'EU seasonal & academic student work framework',
    language: 'English-taught Bachelor & Master programs',
    partners: 'Mediterranean University Consortia',
  },
];

export const ServiceDetailPage: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const related = SERVICES_DATA.filter((s) =>
    service.relatedServices.includes(s.slug)
  );

  const isStudyVisa = service.slug === 'study-visa';

  return (
    <div className="bg-[#070415] text-white min-h-screen">
      {/* 1. Dramatic Cinematic Hero Section with High-Visibility Video Background */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-purple-950/80">
        {/* Background Ambient Video Layer - Optimized for High Visibility */}
        {service.videoUrl && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={service.videoPoster ?? undefined}
              className="absolute inset-0 w-full h-full object-cover opacity-100 filter contrast-105 saturate-110 scale-105 transition-all duration-700"
              aria-hidden="true"
              onCanPlay={(e) => {
                const v = e.currentTarget;
                if (isPlaying) v.play().catch(() => {});
              }}
            >
              <source src={service.videoUrl} type="video/mp4" />
            </video>
            {/* Minimal left-only overlay — dark enough for text WCAG contrast, transparent everywhere else so the video is fully visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070415]/75 via-[#070415]/30 to-transparent" />
            {/* Thin top scrim to blend with navbar */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070415]/60 to-transparent" />
          </div>
        )}

        {/* Ambient Video Control Badge */}
        {service.videoUrl && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleVideo}
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
              className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-medium text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isPlaying ? 'Pause Ambient Motion' : 'Play Ambient Motion'}</span>
              {isPlaying ? <Pause className="w-3 h-3 ml-0.5" /> : <Play className="w-3 h-3 ml-0.5" />}
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Services', href: ROUTES.services.root },
                { label: service.shortTitle },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline, Trust Signals & Direct CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#257CFF]/20 text-[#4DA5EC] border border-[#257CFF]/40">
                  {service.group} Specialization
                </span>
                {service.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F45A2A]/20 text-[#F98864] border border-orange-500/30">
                    {service.badge}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Consular Dossier Audit Active
                </span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-5xl tracking-tight leading-[1.12] text-white">
                {isStudyVisa ? (
                  <>
                    Gain Direct Admission to{' '}
                    <span className="bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-transparent bg-clip-text">
                      Globally Recognized Universities
                    </span>
                  </>
                ) : (
                  service.heroHeadline
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
                {service.summary}
              </p>

              {/* Trust Value Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-[#0D1528]/80 p-3.5 rounded-xl border border-white/15 backdrop-blur-md">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero Faked Docs</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Strict forensic auditing</div>
                </div>
                <div className="bg-[#0D1528]/80 p-3.5 rounded-xl border border-white/15 backdrop-blur-md">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F98864]" />
                    <span>&lt; 2 Hr Response</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Direct Kaduna advisor desk</div>
                </div>
                <div className="bg-[#0D1528]/80 p-3.5 rounded-xl border border-white/15 backdrop-blur-md col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#4DA5EC]" />
                    <span>RC: 1715416</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Verified CAC Entity</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={ROUTES.consultation}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-sm tracking-wide shadow-cta hover:shadow-cta-hover transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#4DA5EC]/40"
                >
                  <span>Book Private Advisory Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={ROUTES.assessment}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-sm tracking-wide border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-[#F98864]" />
                  <span>Check Qualification Quiz</span>
                </Link>
              </div>
            </div>

            {/* Right Column: High-Impact Video HUD / Showcase Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-black/80 backdrop-blur-xl group">
                {service.videoUrl ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <VideoPlayer
                      src={service.videoUrl}
                      poster={service.videoPoster}
                      title={`${service.title} Film Presentation`}
                    />
                  </div>
                ) : (
                  <div className="p-8 space-y-4 bg-gradient-to-b from-[#1A1040] to-[#0D0826]">
                    <div className="w-14 h-14 rounded-2xl bg-[#402493] text-white flex items-center justify-center border border-purple-500/30 shadow-lg">
                      <Shield className="w-8 h-8 text-[#F98864]" />
                    </div>
                    <h3 className="font-heading font-black text-2xl text-white">
                      Institutional Advisory Standard
                    </h3>
                    <p className="text-xs text-purple-200 leading-relaxed">
                      Processed strictly under official statutory guidelines and Nigerian Corporate Affairs Commission registration ({COMPANY.cacNumber}).
                    </p>
                  </div>
                )}

                {/* Card Sub-Bar */}
                <div className="p-4 bg-gradient-to-b from-[#0D0826]/95 to-[#070415] border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F45A2A]" />
                    <span className="text-slate-300 font-medium text-[11px]">Kaduna HQ or Encrypted Google Meet</span>
                  </div>
                  <a
                    href={COMPANY.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4DA5EC] hover:text-white font-semibold transition-colors flex items-center gap-1"
                  >
                    Direct WhatsApp Desk →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Stat Strip */}
      <section className="py-6 bg-[#0A071E] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-transparent bg-clip-text">
                98.2%
              </div>
              <div className="text-xs text-slate-300 font-medium">Admission Offer Success</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-white">
                Up to 50%
              </div>
              <div className="text-xs text-slate-300 font-medium">Merit Scholarships Secured</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-transparent bg-clip-text">
                45+
              </div>
              <div className="text-xs text-slate-300 font-medium">Accredited Global Universities</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-white">
                &lt; 2 Hours
              </div>
              <div className="text-xs text-slate-300 font-medium">Kaduna Advisor Triage SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Body with Dark Luxury Architecture */}
      <section className="py-16 bg-[#09061A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8-Cols: Core Details, Interactive Checklists, Process & FAQs */}
            <div className="lg:col-span-8 space-y-14">
              
              {/* Bespoke Module: Top Study Destinations (When Study Visa) */}
              {isStudyVisa && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                        <Globe2 className="w-4 h-4" />
                      </div>
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                        Featured Study Gateways & University Partnerships
                      </h2>
                    </div>
                    <span className="text-xs text-[#4DA5EC] font-mono bg-[#257CFF]/15 px-3 py-1 rounded-full border border-[#257CFF]/30">
                      Fall 2026 / Spring 2027 Admissions Open
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    We maintain direct representation agreements with recognized institutions across Europe and the UK, securing direct offer letters, tuition installment plans, and official consular documentation for African applicants.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {STUDY_DESTINATIONS.map((dest, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl p-5 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-[#4DA5EC]/50 transition-all duration-300 space-y-3.5 backdrop-blur-md group hover:shadow-[0_8px_30px_rgba(37,124,255,0.12)]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{dest.flag}</span>
                            <span className="font-heading font-black text-lg text-white group-hover:text-[#4DA5EC] transition-colors">
                              {dest.country}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#257CFF]/20 text-[#4DA5EC] border border-[#257CFF]/40">
                            {dest.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {dest.tagline}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="text-slate-400 flex items-center gap-1">
                              <Banknote className="w-3.5 h-3.5 text-emerald-400" /> Tuition:
                            </span>
                            <span className="font-semibold text-white">{dest.tuition}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="text-slate-400 flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 text-[#4DA5EC]" /> Work Rights:
                            </span>
                            <span className="text-emerald-300 font-medium text-[11px]">{dest.workRights}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 pt-1">
                            <strong className="text-slate-300">Language:</strong> {dest.language}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link
                            href={ROUTES.consultation}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#4DA5EC] hover:text-white transition-colors"
                          >
                            <span>Explore Admission to {dest.country}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who This Service Is For (Card Grid) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                    Who This Service Is For
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.whoIsThisFor.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-sm flex items-start gap-3 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assistance & Advisory Scope */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                    Assistance & Advisory Scope
                  </h2>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <ul className="space-y-3">
                    {service.assistanceOffered.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                        <span className="w-5 h-5 rounded-md bg-[#257CFF]/30 text-[#4DA5EC] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#257CFF]/40">
                          ✓
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interactive Document Checklist & Requirements */}
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                      Document Checklist & Preparation
                    </h2>
                  </div>
                  <span className="text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    Strict Zero-Fraud Policy
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300">
                  Every dossier is audited against the latest consular refusal databases before embassy submission. All documents must be clear color scans (minimum 300 DPI).
                </p>

                {/* Interactive Requirements Cards */}
                <div className="space-y-4">
                  {service.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#257CFF]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#4DA5EC]" />
                          {req.category}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            req.mandatory
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-slate-700/50 text-slate-200 border border-slate-600/40'
                          }`}
                        >
                          {req.mandatory ? 'Mandatory' : 'Country-Specific'}
                        </span>
                      </div>

                      <ul className="space-y-2.5 mt-2">
                        {req.items.map((it, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] mt-2 shrink-0" />
                            <span className="leading-relaxed">{it}</span>
                          </li>
                        ))}
                      </ul>

                      {req.notes && (
                        <div className="mt-3 text-xs text-amber-300/95 bg-amber-500/10 px-3.5 py-2 rounded-xl border border-amber-500/25">
                          <strong>Note:</strong> {req.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Service Process Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                    Step-by-Step Consular Process
                  </h2>
                </div>

                <div className="space-y-3.5">
                  {service.processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#257CFF]/40 transition-all flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#257CFF] to-[#1D4ED8] group-hover:from-[#4DA5EC] group-hover:to-[#257CFF] text-white font-heading font-black text-sm flex items-center justify-center shrink-0 border border-white/15 shadow-md transition-colors">
                        {step.step}
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h4 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#4DA5EC] transition-colors">
                            {step.title}
                          </h4>
                          {step.timeline && (
                            <span className="text-[11px] font-semibold text-[#4DA5EC] bg-[#257CFF]/15 px-2.5 py-0.5 rounded-full border border-[#257CFF]/30">
                              {step.timeline}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequently Asked Questions (Fully High-Contrast & Visible) */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Factual, transparent answers regarding admissions, embassy interviews, Proof of Funds (POF), and tuition installment structures.
                  </p>
                </div>

                {/* Upgraded High-Contrast Accordion with dark theme */}
                <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-2 sm:p-3">
                  <Accordion items={service.faqs} variant="dark" />
                </div>
              </div>

              {/* Statutory Legal Disclaimer Notice */}
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-5 text-xs text-amber-200/90 flex items-start gap-3.5 backdrop-blur-sm">
                <AlertTriangle className="w-5 h-5 text-[#F45A2A] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <strong className="font-bold text-white text-sm block">Statutory Notice & Institutional Transparency:</strong>
                  <p className="leading-relaxed text-slate-300">
                    {service.disclaimer}
                  </p>
                  <p className="leading-relaxed text-slate-400 pt-1 border-t border-amber-500/20">
                    {COMPANY.disclaimers.regulatory}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 4-Cols: Sticky High-Conversion Action Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl sticky top-28 shadow-2xl space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4DA5EC] bg-[#257CFF]/15 px-3 py-1 rounded-full border border-[#257CFF]/30 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#4DA5EC]" />
                  Priority Advisory Window
                </div>

                <div>
                  <h3 className="font-heading font-black text-xl text-white">
                    Start Your {service.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Review your complete dossier with a senior advisor. Zero original documents collected pre-contract.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href={ROUTES.consultation}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all hover:scale-[1.02] border border-[#4DA5EC]/40"
                  >
                    <span>Schedule 1-on-1 Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={COMPANY.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs border border-white/20 transition-all"
                  >
                    <span>Message Senior Advisor via WhatsApp</span>
                  </a>
                </div>

                {/* Office & SLA Details */}
                <div className="pt-4 border-t border-white/10 text-xs text-slate-300 space-y-2.5">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Clock className="w-4 h-4 text-[#F98864]" />
                    <span>Advisor Response: Under 2 Hours</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400 text-[11px] leading-relaxed">
                    <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{COMPANY.address.suite}, {COMPANY.address.building}, {COMPANY.address.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>CAC Registration: {COMPANY.cacNumber}</span>
                  </div>
                </div>

                {/* Related Services */}
                {related.length > 0 && (
                  <div className="pt-5 border-t border-white/10">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Complimentary Services
                    </div>
                    <div className="space-y-2">
                      {related.map((rel) => (
                        <Link
                          key={rel.slug}
                          href={`/services/${rel.slug}`}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-semibold text-slate-200 hover:text-[#4DA5EC] transition-all border border-white/5"
                        >
                          <span>{rel.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
