'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { CLIENT_REVIEWS } from '@/lib/data/reviews';
import { ROUTES } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const VideoTestimonialsSection: React.FC = () => {
  const videoReviews = [
    {
      review: CLIENT_REVIEWS[0],
      videoSrc: VIDEOS.TESTIMONIAL_1,
      title: 'Client Review: Approved Polish Admission & Visa',
      tag: 'University Study Visa',
    },
    {
      review: CLIENT_REVIEWS[2],
      videoSrc: VIDEOS.TESTIMONIAL_2,
      title: 'Client Review: Polish Skilled Labor Authorization',
      tag: 'Statutory Work Permit',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#0B071E] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#402493]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#257CFF]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-xs font-black uppercase tracking-widest text-[#4DA5EC] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC] animate-pulse" />
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
            className="shrink-0 inline-flex items-center text-xs sm:text-sm font-bold text-[#4DA5EC] hover:text-white transition-colors group"
          >
            <span>All Client Reviews</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Video & Review Grid — Compact Reel Height with Side-by-Side Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videoReviews.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white/[0.035] hover:bg-white/[0.06] border border-white/10 hover:border-[#4DA5EC]/40 transition-all duration-300 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-stretch gap-6 shadow-xl"
            >
              {/* Compact Video Reel (Constrained width keeps portrait 9/16 video height under ~390px) */}
              <div className="w-full max-w-[210px] shrink-0 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black self-center">
                <VideoPlayer
                  src={item.videoSrc}
                  title={item.title}
                  aspectRatio="9/16"
                />
              </div>

              {/* Review & Story Details */}
              <div className="flex-1 flex flex-col justify-between py-1 text-left w-full space-y-4">
                <div className="space-y-3">
                  {/* Category & Verified Badge */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#402493]/30 border border-purple-500/30 text-purple-200">
                      {item.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Relocation
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="w-5 h-5 text-[#4DA5EC]/40 absolute -top-1 -left-1 -z-10" />
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed pl-3 border-l-2 border-[#4DA5EC]/40">
                      &ldquo;{item.review.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Client Meta */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{item.review.clientName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.review.clientTitle} · {item.review.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Destination
                      </span>
                      <div className="text-xs font-bold text-[#4DA5EC]">
                        {item.review.destinationCountry}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
