'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Video, Sparkles } from 'lucide-react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { CLIENT_REVIEWS } from '@/lib/data/reviews';
import { ROUTES } from '@/lib/routes';

export const VideoTestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B071E] text-white border-b border-purple-950/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-wider text-[#F98864] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
              <span>Authentic Client Voices</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
              Real Stories.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                Real Relocations.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
              Hear directly from students, skilled professionals, and families whose journeys were guided with care by Sijam Consult as their preferred <strong className="text-white font-medium">travel agency</strong> in Nigeria.
            </p>
          </div>

          <Link
            href={ROUTES.reviews}
            className="inline-flex items-center text-xs sm:text-sm font-bold text-[#F98864] hover:text-white transition-colors"
          >
            <span>See All Client Reviews & Approvals</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Video & Review Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Testimonial 1 */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <VideoPlayer
                src="/videos/WhatsApp Video 2026-10-12 at 10.45.26 AM.mp4"
                poster="/visas/1.png"
                title="Client Review: Approved Polish Admission & Visa"
              />
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{CLIENT_REVIEWS[0].quote}&rdquo;
              </p>
              <div className="text-xs font-bold text-[#F98864] mt-2">
                — {CLIENT_REVIEWS[0].clientName}, {CLIENT_REVIEWS[0].destinationCountry}
              </div>
            </div>
          </div>

          {/* Testimonial Cards & Video 2 */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <VideoPlayer
                src="/videos/WhatsApp Video 2026-10-12 at 10.45.27 AM.mp4"
                poster="/visas/2.png"
                title="Client Review: Polish Skilled Labor Authorization"
              />
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{CLIENT_REVIEWS[2].quote}&rdquo;
              </p>
              <div className="text-xs font-bold text-[#F98864] mt-2">
                — {CLIENT_REVIEWS[2].clientName}, {CLIENT_REVIEWS[2].destinationCountry}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
