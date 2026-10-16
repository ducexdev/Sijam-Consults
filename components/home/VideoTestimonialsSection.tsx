'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { CLIENT_REVIEWS } from '@/lib/data/reviews';
import { ROUTES } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const VideoTestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B071E] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#402493]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#DC2F11]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DC2F11]/10 border border-[#DC2F11]/30 text-xs font-black uppercase tracking-widest text-[#F98864] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2F11] animate-pulse" />
              <span>Authentic Client Voices</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
              Real Stories.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                Real Relocations.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl font-normal leading-relaxed">
              Hear directly from the professionals, students, and families whose lives were transformed by Sijam Consults Limited.
            </p>
          </div>
          <Link
            href={ROUTES.reviews}
            className="shrink-0 inline-flex items-center text-xs sm:text-sm font-bold text-[#F98864] hover:text-white transition-colors group"
          >
            <span>All Client Reviews</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Video & Review Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto lg:max-w-none">
          {/* Testimonial 1 */}
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <VideoPlayer
                src={VIDEOS.TESTIMONIAL_1}
                title="Client Review: Approved Polish Admission & Visa"
                aspectRatio="9/16"
              />
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <Quote className="w-6 h-6 text-[#DC2F11]/50 mb-3" />
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{CLIENT_REVIEWS[0].quote}&rdquo;
              </p>
              <div className="text-xs font-bold text-[#F98864] mt-3">
                — {CLIENT_REVIEWS[0].clientName},{' '}
                <span className="text-slate-400 font-normal">{CLIENT_REVIEWS[0].destinationCountry}</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <VideoPlayer
                src={VIDEOS.TESTIMONIAL_2}
                title="Client Review: Polish Skilled Labor Authorization"
                aspectRatio="9/16"
              />
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <Quote className="w-6 h-6 text-[#DC2F11]/50 mb-3" />
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{CLIENT_REVIEWS[2].quote}&rdquo;
              </p>
              <div className="text-xs font-bold text-[#F98864] mt-3">
                — {CLIENT_REVIEWS[2].clientName},{' '}
                <span className="text-slate-400 font-normal">{CLIENT_REVIEWS[2].destinationCountry}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
