'use client';

import React, { useState, useSyncExternalStore } from 'react';
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
  Users,
  Globe2,
  Play,
  Pause,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
const getReducedMotionSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getReducedMotionServerSnapshot = () => false;

const PATHWAYS = [
  {
    id: 'recruitment',
    label: 'Foreign Jobs & Quotas',
    icon: Briefcase,
    href: ROUTES.jobs.root,
    desc: 'UK, Poland, Slovakia & Saudi Arabia — verified employer sponsorships.',
    tag: '🔥 Flagship',
    tagColor: 'bg-[#DC2F11]/20 text-[#F98864] border-[#DC2F11]/40',
  },
  {
    id: 'work',
    label: 'Work Permits',
    icon: FileCheck,
    href: ROUTES.services.workVisa,
    desc: 'Polish Voivodeship, Slovakian labor filings & UK Certificate of Sponsorship.',
    tag: 'Statutory',
    tagColor: 'bg-[#402493]/30 text-purple-300 border-purple-500/30',
  },
  {
    id: 'study',
    label: 'Study Abroad',
    icon: GraduationCap,
    href: ROUTES.services.studyVisa,
    desc: 'University admissions in Cyprus, Poland, Spain, UK & Canada — up to 50% grants.',
    tag: 'Up to 50% Off',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'manpower',
    label: 'B2B Manpower Supply',
    icon: Building2,
    href: ROUTES.partners,
    desc: 'Turnkey skilled workforce mobilization for global employers & contractors.',
    tag: 'Enterprise',
    tagColor: 'bg-[#257CFF]/15 text-[#4DA5EC] border-[#257CFF]/30',
  },
  {
    id: 'visa',
    label: 'Visa Consultancy',
    icon: Compass,
    href: ROUTES.services.visaAssistance,
    desc: '47-point file audit, embassy appointments & mock interview coaching.',
    tag: 'Zero Omission',
    tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  },
  {
    id: 'flights',
    label: 'Flight Reservations',
    icon: Plane,
    href: ROUTES.services.flightReservations,
    desc: '100% verifiable GDS PNR airline itineraries for visa applications.',
    tag: 'Active PNR',
    tagColor: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  },
];

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
    if (bgPaused) { videoRef.play().catch(() => {}); setBgPaused(false); }
    else { videoRef.pause(); setBgPaused(true); }
  };

  return (
    <section className="relative bg-[#070415] text-white overflow-hidden pt-0 pb-0 min-h-screen flex flex-col">
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
          style={{ backgroundImage: 'linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)', backgroundSize: '60px 60px' }}
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
          {bgPaused
            ? <Play className="w-3.5 h-3.5" />
            : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ── MAIN HERO CONTENT ─────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 pt-24 pb-10 lg:pt-28 lg:pb-16">

        {/* Trust strip */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DC2F11]/15 border border-[#DC2F11]/40 text-[10px] font-black uppercase tracking-widest text-[#F98864]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2F11] animate-pulse" />
            Nigeria&apos;s #1 Recruitment &amp; Manpower Agency
          </span>
        </div>

        {/* ── HEADLINE — Conversion-optimised, psychologically-driven ── */}
        <div className="max-w-4xl space-y-5 mb-10">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] text-white leading-[1.05] tracking-tight">
            Your{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2F11] via-[#F45A2A] to-[#F98864]">
                Dream Job Abroad
              </span>
              {/* Underline accent */}
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#DC2F11] to-[#F98864] opacity-70" />
            </span>{' '}
            Starts Here —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              We Handle Everything.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
            Sijam Consults Limited connects ambitious Nigerians to{' '}
            <strong className="text-white font-semibold">verified foreign employer quotas</strong>{' '}
            in the UK, Poland, Slovakia & Saudi Arabia — with statutory work permits, manpower supply, study abroad placements, and travel solutions, all under one{' '}
            <strong className="text-white font-semibold">CAC-registered roof.</strong>
          </p>

          {/* Social proof micro-copy */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex -space-x-2">
              {['bg-[#402493]','bg-[#DC2F11]','bg-[#257CFF]','bg-emerald-600'].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-[#070415] flex items-center justify-center text-[10px] font-black text-white`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              <strong className="text-white">500+ professionals</strong> placed abroad this year alone
            </p>
          </div>
        </div>

        {/* ── CTA GROUP ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-14">
          <Link
            href={ROUTES.jobs.root}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#DC2F11] to-[#F45A2A] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(220,47,17,0.7)] hover:shadow-[0_12px_40px_-8px_rgba(220,47,17,0.9)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Live Foreign Job Quotas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact?intent=hire_manpower"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-semibold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Users className="w-4 h-4 text-[#F98864]" />
            <span>Hire International Manpower</span>
          </Link>
          <a
            href={COMPANY.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 font-semibold text-sm border border-emerald-500/30 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* WhatsApp icon inline SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L0 24l6.335-1.52A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-4.998-1.37l-.359-.213-3.758.902.944-3.665-.235-.378A9.786 9.786 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.418 0 9.818 4.401 9.818 9.818 0 5.418-4.4 9.818-9.818 9.818z" />
            </svg>
            <span>WhatsApp Us Now</span>
          </a>
        </div>

        {/* ── TWO-COLUMN LOWER BLOCK ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Service pathways grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#4DA5EC]">
                Select Your International Pathway
              </p>
              <Link href={ROUTES.services.root} className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors">
                All Services →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PATHWAYS.map(({ id, label, icon: Icon, href, desc, tag, tagColor }) => (
                <Link
                  key={id}
                  href={href}
                  className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#DC2F11]/50 transition-all duration-300 flex flex-col gap-2.5 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#402493]/60 group-hover:bg-[#DC2F11] text-[#4DA5EC] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${tagColor}`}>
                      {tag}
                    </span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-xs text-white group-hover:text-[#F98864] transition-colors leading-snug">
                      {label}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#4DA5EC] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: YouTube video card */}
          <div className="lg:col-span-5 space-y-3">
            {/* Video embed */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-black group">
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-[#DC2F11]/0 group-hover:border-[#DC2F11]/40 transition-all duration-500 pointer-events-none z-10" />
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
                  <div className="w-6 h-6 rounded-lg bg-[#DC2F11]/20 flex items-center justify-center border border-[#DC2F11]/30">
                    <Play className="w-3 h-3 text-[#F98864] ml-0.5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px]">Sijam Consults Limited</div>
                    <div className="text-slate-400 text-[10px]">Official Company Overview</div>
                  </div>
                </div>
                <Link href={ROUTES.about} className="text-[11px] font-semibold text-[#4DA5EC] hover:text-white transition-colors flex items-center gap-1">
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
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">100+ Approvals</div>
                  <div className="text-[10px] text-slate-400">View Verified Stamps</div>
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
                  <div className="text-[10px] text-slate-400">EU, UK & Gulf Partners</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ──────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Discover More</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#DC2F11] animate-[bounce_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};
