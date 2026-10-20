'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Shield,
  Users,
  Globe2,
  Play,
  Pause,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
const getReducedMotionSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServerSnapshot = () => false;

export const HeroSection: React.FC = () => {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [bgPaused, setBgPaused] = useState(false);
  const [videoRef, setVideoRef] = React.useState<HTMLVideoElement | null>(null);

  const toggleBg = () => {
    if (!videoRef) return;
    if (bgPaused) {
      videoRef.play().catch(() => {});
      setBgPaused(false);
    } else {
      videoRef.pause();
      setBgPaused(true);
    }
  };

  return (
    <section className="relative bg-[#070415] text-white overflow-hidden pt-0 pb-0 min-h-[92vh] flex flex-col justify-between">
      {/* ── CINEMATIC BACKGROUND LAYER ────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Mobile poster */}
        <div className="sm:hidden absolute inset-0">
          <Image
            src="/hero/passport-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 contrast-125"
          />
        </div>
        {/* Desktop ambient video */}
        <video
          ref={(el) => setVideoRef(el)}
          autoPlay={!isReducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero/passport-hero.png"
          className="hidden sm:block w-full h-full object-cover opacity-50 contrast-110 saturate-110"
          src="/media/hero-preview.mp4"
          aria-hidden="true"
        />
        {/* Gradient scrims — brand-consistent purple depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#070415]/92 via-[#0D0826]/70 to-[#070415]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070415]/80 via-transparent to-[#070415]" />
        {/* Purple orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#402493]/18 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#DC2F11]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#257CFF]/12 rounded-full blur-[120px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Background video toggle (desktop) */}
      <div className="hidden sm:block absolute bottom-6 right-6 z-20">
        <button
          type="button"
          onClick={toggleBg}
          aria-label={bgPaused ? 'Resume background video' : 'Pause background video'}
          className="w-9 h-9 rounded-full bg-black/40 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
          {bgPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ── MAIN HERO CONTENT (2-COLUMN OPPOSITE LAYOUT) ──────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 pt-24 pb-12 lg:pt-32 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Trust, Headline, Subtext, Social Proof & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-[10px] font-black uppercase tracking-widest text-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse" />
                Trusted Immigration
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-bold text-slate-300">
                <Shield className="w-3 h-3 text-[#4DA5EC]" />
                &amp; Travel Agency
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-[3.15rem] xl:text-[3.55rem] text-white leading-[1.08] tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                International Recruitment,
              </span>{' '}
              Study Abroad &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                Immigration Agency
              </span>{' '}
              in Nigeria
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Sijam Consults Limited guides candidates, students, and employers through legitimate international relocation, accredited university admissions, statutory work permits, and global manpower solutions with forensic compliance and transparent advisory.
            </p>

            {/* Social proof micro-copy */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {['bg-[#402493]', 'bg-[#DC2F11]', 'bg-[#257CFF]', 'bg-emerald-600'].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-[#070415] flex items-center justify-center text-[10px] font-black text-white`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                <strong className="text-white">Authentic Case Advisories &amp; Filings</strong> across UK, Poland, Slovakia, Cyprus &amp; Gulf corridors
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="#services"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={ROUTES.assessment}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-sm tracking-wide border border-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Eligibility Pre-Check</span>
              </Link>
              <Link
                href={ROUTES.contact}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-semibold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Users className="w-4 h-4 text-[#F98864]" />
                <span>Speak With Us</span>
              </Link>
              <Link
                href={ROUTES.jobs.root}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Job Vacancies</span>
              </Link>
            </div>

            {/* Verified Active Corridors Pill Bar */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Active Corridors:</span>
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                UK Healthcare (CoS)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                Poland Voivodeship Type A
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                Slovakia Single Permits
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                Cyprus Study (50% Grants)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                Saudi Arabia Quotas
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Video Player & Proof Cards (Directly opposite the H1) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Video embed */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-black group">
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-[#4DA5EC]/0 group-hover:border-[#4DA5EC]/40 transition-all duration-500 pointer-events-none z-10" />
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/LOB8JuM_Lrg?si=kJ-Cg1lNc5nmCbgz&rel=0&modestbranding=1"
                  title="Sijam Consults Limited — Official Company Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              {/* Bottom HUD */}
              <div className="px-4 py-3 bg-gradient-to-b from-[#0D0826]/95 to-[#070415] border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#4DA5EC]/20 flex items-center justify-center border border-[#4DA5EC]/30">
                    <Play className="w-3 h-3 text-[#4DA5EC] ml-0.5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px]">Sijam Consults Limited</div>
                    <div className="text-slate-400 text-[10px]">Official Company Overview</div>
                  </div>
                </div>
                <Link
                  href={ROUTES.about}
                  className="text-[11px] font-semibold text-[#4DA5EC] hover:text-white transition-colors flex items-center gap-1"
                >
                  About Us →
                </Link>
              </div>
            </div>

            {/* Quick proof cards */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href={ROUTES.reviews}
                className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Client Reviews</div>
                  <div className="text-[10px] text-slate-400">View Real Case Studies</div>
                </div>
              </Link>
              <Link
                href={ROUTES.partners}
                className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-300 flex items-center justify-center shrink-0">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">Bilateral Alliances</div>
                  <div className="text-[10px] text-slate-400">EU, UK &amp; Gulf Partners</div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── SCROLL INDICATOR ──────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-6">
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Discover More</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#4DA5EC] animate-[bounce_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};
