'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe2 } from 'lucide-react';
import { PARTNERS_DATA } from '@/lib/data/partners';
import { ROUTES } from '@/lib/routes';

/**
 * Splits the partners into two tracks for visual variety:
 * Track A (L→R): first half  |  Track B (R→L): second half
 */
const MID = Math.ceil(PARTNERS_DATA.length / 2);
const TRACK_A = PARTNERS_DATA.slice(0, MID);
const TRACK_B = PARTNERS_DATA.slice(MID);

interface TrackProps {
  partners: typeof PARTNERS_DATA;
  direction?: 'left' | 'right';
  speed?: number; // seconds for one full loop
  paused?: boolean;
}

const MarqueeTrack: React.FC<TrackProps> = ({
  partners,
  direction = 'left',
  speed = 28,
  paused = false,
}) => {
  // Triple the list so the loop is seamless even on ultra-wide screens
  const items = [...partners, ...partners, ...partners];

  return (
    <div
      className="flex items-center gap-5"
      style={{
        animation: `marquee-${direction} ${speed}s linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {items.map((partner, idx) => (
        <div
          key={`${partner.id}-${idx}`}
          className="group relative flex-shrink-0 w-44 h-20 flex items-center justify-center
                     rounded-2xl border border-white/8 bg-white/[0.035] backdrop-blur-sm
                     hover:bg-white/[0.075] hover:border-[#DC2F11]/40
                     transition-all duration-400 overflow-hidden cursor-default"
        >
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                          bg-[radial-gradient(circle_at_50%_100%,rgba(220,47,17,0.12),transparent_70%)] rounded-2xl" />
          <div className="relative w-32 h-10" style={{ position: 'relative' }}>
            <Image
              src={partner.logoUrl}
              alt={partner.name}
              fill
              sizes="128px"
              className="object-contain filter brightness-75 group-hover:brightness-100
                         saturate-0 group-hover:saturate-100 transition-all duration-400 p-1"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const PartnerMarquee: React.FC = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-16 bg-[#070415] border-y border-white/8 text-white relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                      from-[#402493]/8 via-transparent to-transparent pointer-events-none" />

      {/* Top & bottom brand lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r
                      from-transparent via-[#402493]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r
                      from-transparent via-[#DC2F11]/40 to-transparent" />

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-[#402493]/20 border border-[#402493]/40 text-xs">
              <Globe2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span className="font-black uppercase tracking-widest text-[10px] text-[#4DA5EC]">
                Verified Bilateral Alliances & Global Mobility Partners
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-lg leading-relaxed">
              Institutional alliances across Europe, Australia, the Gulf, and West Africa — each
              verified for compliance, ethical recruitment, and direct employer access.
            </p>
          </div>
          <Link
            href={ROUTES.partners}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold
                       text-[#F98864] hover:text-white transition-colors group"
          >
            <span>View All Partners</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── MARQUEE TRACKS ───────────────────────────────────────── */}
      {/* Fade edge masks */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10
                        bg-gradient-to-r from-[#070415] to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10
                        bg-gradient-to-l from-[#070415] to-transparent" />

        {/* Track A — slides left */}
        <div className="overflow-hidden mb-4">
          <MarqueeTrack partners={TRACK_A} direction="left" speed={32} paused={paused} />
        </div>

        {/* Track B — slides right (counter-direction for depth) */}
        <div className="overflow-hidden">
          <MarqueeTrack partners={TRACK_B} direction="right" speed={26} paused={paused} />
        </div>
      </div>

      {/* ── FOOTER NOTE ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 flex items-center justify-center gap-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">
          Hover to pause · {PARTNERS_DATA.length} Active Alliances
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* ── KEYFRAMES injected via style tag ─────────────────────── */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
