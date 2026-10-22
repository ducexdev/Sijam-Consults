'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Star,
  ZoomIn,
  Video,
  Building,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { CLIENT_REVIEWS, VISA_PROOFS } from '@/lib/data/reviews';
import { Modal } from '@/components/ui/Modal';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { SubmitReviewModal } from '@/components/reviews/SubmitReviewModal';
import { VIDEOS } from '@/lib/constants/videos';
import { MessageSquarePlus } from 'lucide-react';

type ReviewTab = 'all' | 'stamps' | 'videos' | 'corporate';

export const ReviewsShowcase: React.FC = () => {
  const [selectedProof, setSelectedProof] = useState<typeof VISA_PROOFS[0] | null>(null);
  const [activeTab, setActiveTab] = useState<ReviewTab>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isVisaPaused, setIsVisaPaused] = useState(false);

  const duplicatedProofs = [...VISA_PROOFS, ...VISA_PROOFS];

  const tabs: { id: ReviewTab; label: string }[] = [
    { id: 'all', label: 'All Verified Proofs' },
    { id: 'stamps', label: 'Visa Approval Stamps (55+)' },
    { id: 'videos', label: 'Client Video Recordings' },
    { id: 'corporate', label: 'Corporate Endorsements' },
  ];

  return (
    <div className="space-y-12">
      {/* Tab Filter Strip & Review Submission CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta border border-[#4DA5EC]/30'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsReviewModalOpen(true)}
          className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs sm:text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Leave a review</span>
        </button>
      </div>

      {/* Video Testimonials Section */}
      {(activeTab === 'all' || activeTab === 'videos') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Video className="w-4 h-4 text-[#F45A2A]" />
            <span>Uncut Client Video Testimonials</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <VideoPlayer
                  src={VIDEOS.TESTIMONIAL_1}
                  poster="/visas/1.png"
                  title="Client Review: Approved Polish Admission & Visa"
                />
              </div>
              <div className="p-2 space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{CLIENT_REVIEWS[0].quote}&rdquo;
                </p>
                <div className="text-xs font-bold text-[#F98864] pt-1">
                  — {CLIENT_REVIEWS[0].clientName} ({CLIENT_REVIEWS[0].category} • {CLIENT_REVIEWS[0].destinationCountry})
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <VideoPlayer
                  src={VIDEOS.TESTIMONIAL_2}
                  poster="/visas/2.png"
                  title="Client Review: Polish Skilled Labor Authorization"
                />
              </div>
              <div className="p-2 space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  &ldquo;{CLIENT_REVIEWS[2].quote}&rdquo;
                </p>
                <div className="text-xs font-bold text-[#F98864] pt-1">
                  — {CLIENT_REVIEWS[2].clientName} ({CLIENT_REVIEWS[2].category} • {CLIENT_REVIEWS[2].destinationCountry})
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Visa Stamps Gallery */}
      {(activeTab === 'all' || activeTab === 'stamps') && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white flex-wrap">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Catalogued Visa Approval Stamps (Redacted for NDPR Compliance)</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Carousel ({VISA_PROOFS.length}+ Stamps)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4DA5EC]" />
              <span>Hover to pause • Click any stamp to inspect in high resolution</span>
            </div>
          </div>

          {/* ── HORIZONTALLY SLIDING CAROUSEL TRACK (PAUSES ON HOVER) ── */}
          <div
            className="relative -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-hidden py-3"
            onMouseEnter={() => setIsVisaPaused(true)}
            onMouseLeave={() => setIsVisaPaused(false)}
            onTouchStart={() => setIsVisaPaused(true)}
            onTouchEnd={() => setIsVisaPaused(false)}
          >
            {/* Left gradient fade mask */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-r from-[#070415] to-transparent" />
            {/* Right gradient fade mask */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-l from-[#070415] to-transparent" />

            {/* Sliding Track Container */}
            <div className="overflow-x-auto scrollbar-none py-2">
              <div
                className="flex items-stretch gap-4 sm:gap-5 w-max"
                style={{
                  animation: 'visa-marquee 50s linear infinite',
                  animationPlayState: isVisaPaused || Boolean(selectedProof) ? 'paused' : 'running',
                  willChange: 'transform',
                }}
              >
                {duplicatedProofs.map((proof, idx) => (
                  <div
                    key={`${proof.id}-${idx}`}
                    onClick={() => setSelectedProof(proof)}
                    className="w-[260px] sm:w-[280px] shrink-0 group cursor-pointer rounded-2xl bg-white p-2.5 sm:p-3 border border-white/15 hover:border-[#4DA5EC] transition-all duration-300 hover:scale-[1.03] shadow-xl flex flex-col justify-between"
                  >
                    <div
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src={proof.image}
                        alt={proof.label}
                        fill
                        sizes="280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white flex items-center justify-center shadow-lg border border-[#4DA5EC]/40">
                          <ZoomIn className="w-5 h-5" />
                        </span>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Verified
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-slate-800 line-clamp-1">
                        {proof.label}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center justify-between mt-1">
                        <span>{proof.country}</span>
                        <span className="text-[#402493] font-semibold">{proof.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee keyframe injection */}
          <style>{`
            @keyframes visa-marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>
      )}

      {/* Corporate Endorsements */}
      {(activeTab === 'all' || activeTab === 'corporate') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Building className="w-4 h-4 text-[#F98864]" />
            <span>Corporate & Institutional Reviews</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-normal">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="font-heading font-bold text-xs sm:text-sm text-white">
                    {rev.clientName}
                  </div>
                  <div className="text-[11px] text-[#F98864]">
                    {rev.clientTitle ? `${rev.clientTitle} • ` : ''}{rev.location}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Service: {rev.category} ({rev.destinationCountry})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {selectedProof && (
        <Modal
          isOpen={Boolean(selectedProof)}
          onClose={() => setSelectedProof(null)}
          title={selectedProof.label}
          maxWidth="4xl"
        >
          <div className="flex flex-col items-center">
            <div
              className="relative w-full max-w-2xl h-[420px] rounded-2xl overflow-hidden bg-slate-900 shadow-inner"
              style={{ position: 'relative' }}
            >
              <Image
                src={selectedProof.image}
                alt={selectedProof.label}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
              />
            </div>
            <div className="mt-4 w-full flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
              <div>
                <span className="font-semibold text-white">Destination:</span>{' '}
                {selectedProof.country} ({selectedProof.category})
              </div>
              <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-[#F98864]" />
                Personal identifiers redacted under NDPR 2023 regulations
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Review Submission Modal */}
      <SubmitReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
};
