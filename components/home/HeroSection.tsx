'use client';

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  Briefcase,
  Compass,
  Building2,
  FileCheck,
  Plane,
  ArrowRight,
  Shield,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
  MapPin,
  Lock,
  Globe2,
} from 'lucide-react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { ROUTES } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [isPlaying, setIsPlaying] = useState(!isReducedMotion);

  useEffect(() => {
    if (isReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isReducedMotion]);

  const toggleBackgroundVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const pathways = [
    { id: 'study', label: 'Study Abroad', icon: GraduationCap, href: ROUTES.services.studyVisa, desc: 'Cyprus, Poland, Greece, UK & Canada university admissions.', tag: 'Merit Scholarships' },
    { id: 'work', label: 'Work Permits', icon: Briefcase, href: ROUTES.services.workVisa, desc: 'Verified European employer sponsorships & statutory labor filings.', tag: 'Verified Sponsors' },
    { id: 'tourist', label: 'Tourist Visas', icon: Compass, href: ROUTES.services.touristVisa, desc: 'UK, US, Canada & Schengen 90-day visitor authorizations.', tag: 'Fast-Track Filings' },
    { id: 'business', label: 'EU Business Reg', icon: Building2, href: ROUTES.services.businessRegistration, desc: 'Polish Sp. z o.o. incorporation & Schengen D-Residency.', tag: 'European Access' },
    { id: 'legalization', label: 'Document Legalization', icon: FileCheck, href: ROUTES.services.documentLegalization, desc: 'MFA Abuja attestation & bilateral embassy apostilles.', tag: 'Zero Omission' },
    { id: 'flights', label: 'Flight Reservations', icon: Plane, href: ROUTES.services.flightReservations, desc: '100% verifiable PNR itineraries for visa appointments.', tag: 'Active PNR Codes' },
  ];

  return (
    <section className="relative bg-[#070415] text-white overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-purple-950/60">
      {/* Background Cinematic Video Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
        {/* Mobile Static Poster (Avoids 12MB mobile payload on cellular connections) */}
        <div className="sm:hidden absolute inset-0">
          <Image
            src="/hero/passport-hero.png"
            alt="Nigerian applicants holding approved passports in Europe — Sijam Consults success stories"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 filter contrast-125"
          />
        </div>

        {/* Desktop & Tablet Muted Autoplay Video (With reduced motion respect) */}
        <video
          ref={videoRef}
          autoPlay={!isReducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero/passport-hero.png"
          className="hidden sm:block w-full h-full object-cover opacity-60 filter contrast-110 saturate-125"
          src="/media/hero-preview.mp4"
          aria-hidden="true"
        />

        {/* Professional Cinematic Scrim (balanced for high video visibility + crystal-clear text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070415]/85 via-[#070415]/45 to-[#070415]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070415]/60 via-transparent to-[#070415]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#402493]/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#402493]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#257CFF]/10 rounded-full blur-[160px]" />
      </div>

      {/* Accessible Ambient Video Control (Desktop) */}
      <div className="hidden sm:block absolute bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={toggleBackgroundVideo}
          aria-label={isPlaying ? 'Pause background video motion' : 'Play background video motion'}
          aria-pressed={isPlaying}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D0826]/80 hover:bg-[#0D0826] border border-white/15 text-[11px] text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-[#4DA5EC]" />
              <span>Pause Motion</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#4DA5EC]" />
              <span>Play Motion</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Headline & Psychology Triggers */}
          <div className="lg:col-span-7 space-y-6 animate-slide-up">
            {/* Top Credibility Strip */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md shadow-inner text-xs text-purple-100">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-white tracking-wide">
                CAC-Registered · RC: 1715416 · Consultations Open Now
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
              Stop Getting Refused.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] drop-shadow-sm">
                Start Getting Approved.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl font-normal">
              Sijam Consults is a leading immigration consultancy agency that help students, professionals &amp; families secure{' '}
              <strong className="text-white font-medium">study visas, work permits, tourist visas, citizenship assistance &amp; permanent residency</strong>{' '}
              with zero fake documents, fully transparent fees, and close ties to senior immigration lawyers in Europe, Canada &amp; the UK.
            </p>

            {/* Micro-Trust Signals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 pb-2">
              <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/[0.03] p-2.5 rounded-xl border border-white/5 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="font-medium">Zero Fake Documents</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/[0.03] p-2.5 rounded-xl border border-white/5 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="font-medium">Transparent Flat Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/[0.03] p-2.5 rounded-xl border border-white/5 backdrop-blur-sm col-span-2 sm:col-span-1">
                <Lock className="w-4 h-4 text-[#4DA5EC] shrink-0" aria-hidden="true" />
                <span className="font-medium">Senior Immigration Lawyers On-File</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={ROUTES.consultation}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-sm tracking-wide shadow-cta hover:shadow-cta-hover transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#4DA5EC]/40"
              >
                <span>Book 1-on-1 Strategy Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.assessment}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-sm tracking-wide border border-white/15 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#4DA5EC]" />
                <span>Check Visa Eligibility Free</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Cinematic Media Showcase Card */}
          <div className="lg:col-span-5 space-y-4 animate-fade-in delay-200">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-black/60 backdrop-blur-xl group" style={{ position: 'relative' }}>
              {/* Video Player */}
              <div className="relative aspect-video w-full overflow-hidden" style={{ position: 'relative' }}>
                <VideoPlayer
                  src={VIDEOS.SIJAM_CONSULT_LIMITED}
                  poster="/hero/passport-hero.png"
                  title="Sijam Consults Corporate Reel"
                  autoPlay={false}
                  loop={false}
                  muted={true}
                />
              </div>

              {/* HUD Banner underneath video */}
              <div className="p-4 bg-gradient-to-b from-[#0D0826]/90 to-[#070415] border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#402493]/70 text-[#4DA5EC] flex items-center justify-center border border-purple-500/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-[12px]">Kaduna Headquarters Suite A10</div>
                    <div className="text-slate-400 text-[10px]">2/4 Kachia Road • Physical Consultations Open</div>
                  </div>
                </div>

                <Link
                  href={ROUTES.about}
                  className="text-xs font-semibold text-[#4DA5EC] hover:text-white transition-colors flex items-center gap-1 group-hover:translate-x-0.5"
                >
                  Meet Leadership →
                </Link>
              </div>
            </div>

            {/* Quick Live Proof Bar */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href={ROUTES.reviews}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#4DA5EC]">100+ Visa Stamps</div>
                  <div className="text-[10px] text-slate-400">View Verified Approvals</div>
                </div>
              </Link>

              <Link
                href={ROUTES.partners}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#4DA5EC]">Bilateral Alliances</div>
                  <div className="text-[10px] text-slate-400">Cyprus, Poland &amp; UK</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 6 Core Relocation Pathways Grid */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs font-bold uppercase tracking-widest text-[#4DA5EC] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#257CFF]" />
              <span>Select Your International Pathway</span>
            </div>
            <Link
              href={ROUTES.services.root}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              All 7 Services →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {pathways.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#257CFF]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#402493]/70 group-hover:bg-[#257CFF] text-white flex items-center justify-center transition-colors shadow">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-[#4DA5EC] bg-[#257CFF]/10 px-1.5 py-0.5 rounded border border-[#257CFF]/20">
                        {cat.tag}
                      </span>
                    </div>
                    <div className="font-heading font-bold text-xs text-white group-hover:text-[#4DA5EC] transition-colors">
                      {cat.label}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="text-[11px] font-semibold text-[#4DA5EC] mt-3 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Explore →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
