'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ZoomIn, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { VISA_PROOFS } from '@/lib/data/reviews';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

const CARDS_VISIBLE = 4; // desktop visible cards
const AUTO_SLIDE_MS = 3500;

export const VisaStampGallery: React.FC = () => {
  const [selectedProof, setSelectedProof] = useState<typeof VISA_PROOFS[0] | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categories = ['All', 'Study Visa', 'Work Permit', 'Tourist Visa', 'Schengen Business'];

  const filteredProofs = filter === 'All'
    ? VISA_PROOFS
    : VISA_PROOFS.filter((p) => p.category === filter);

  const totalSlides = filteredProofs.length;
  const maxIndex = Math.max(0, totalSlides - CARDS_VISIBLE);

  // Reset carousel when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const slideTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning, maxIndex]);

  const slideNext = useCallback(() => {
    slideTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, slideTo]);

  const slidePrev = useCallback(() => {
    slideTo(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, slideTo]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || totalSlides <= CARDS_VISIBLE) return;
    timerRef.current = setTimeout(slideNext, AUTO_SLIDE_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPaused, slideNext, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') slidePrev();
      if (e.key === 'ArrowRight') slideNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [slidePrev, slideNext]);

  // Scroll active tab pill into view
  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    const tabEl = tabsRef.current?.querySelector(`[data-tab="${cat}"]`) as HTMLElement | null;
    tabEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // Card width: 25% desktop, 50% tablet, 100% mobile (via CSS)
  const cardWidthPercent = 100 / CARDS_VISIBLE;
  const translateX = currentIndex * cardWidthPercent;

  return (
    <section className="py-20 bg-[#0D0826] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F98864] bg-purple-950 px-3 py-1 rounded-full border border-purple-800 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F45A2A]" />
              <span>Authentic Approvals Showcase</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Verified Visa Approvals &amp; Consular Grants
            </h2>
            <p className="text-sm text-purple-200 mt-2 max-w-2xl">
              Authentic embassy approvals processed by Sijam Consult as your trusted{' '}
              <strong className="text-white font-medium">travel agency</strong> across European, UK,
              Canadian, and Schengen jurisdictions. Redacted in strict adherence with Nigerian Data
              Protection Regulation (NDPR).
            </p>
          </div>
          <Button href={ROUTES.reviews} variant="glass" size="sm">
            <span>View All Approval Stamps</span>
          </Button>
        </div>

        {/* ── Scrollable Filter Tabs ── */}
        <div className="relative mb-8">
          {/* Fade edges hint — indicates scrollability */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0D0826] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0D0826] to-transparent z-10" />

          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Filter visa approvals by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                data-tab={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                onClick={() => handleFilterChange(cat)}
                className={`flex-shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full border transition-all whitespace-nowrap ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border-[#257CFF] shadow-sm scale-105'
                    : 'bg-purple-950/60 text-purple-200 border-purple-800/60 hover:bg-purple-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Carousel Track ── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Prev / Next buttons */}
          {totalSlides > CARDS_VISIBLE && (
            <>
              <button
                type="button"
                onClick={slidePrev}
                aria-label="Previous approvals"
                className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-purple-900/80 border border-purple-700 text-white flex items-center justify-center hover:bg-[#257CFF] transition-colors shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={slideNext}
                aria-label="Next approvals"
                className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-purple-900/80 border border-purple-700 text-white flex items-center justify-center hover:bg-[#257CFF] transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Overflow mask */}
          <div className="overflow-hidden rounded-xl">
            {/* Sliding track */}
            <div
              className="flex transition-transform duration-[400ms] ease-in-out"
              style={{ transform: `translateX(-${translateX}%)` }}
              aria-live="polite"
              aria-atomic="false"
            >
              {filteredProofs.map((proof) => (
                <div
                  key={proof.id}
                  // 100% on mobile, 50% on sm/md, 25% on lg+
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-2"
                  aria-roledescription="slide"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedProof(proof)}
                    className="group w-full cursor-pointer rounded-2xl bg-white p-2.5 sm:p-3 border border-purple-900/40 hover:border-[#257CFF] transition-all duration-300 hover:scale-[1.02] shadow-xl flex flex-col justify-between text-left"
                    aria-label={`View ${proof.label} approval stamp`}
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3">
                      <Image
                        src={proof.image}
                        alt={proof.label}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                      <div className="text-[11px] font-bold text-slate-800 line-clamp-1">{proof.label}</div>
                      <div className="text-[10px] text-slate-500 flex items-center justify-between mt-1">
                        <span>{proof.country}</span>
                        <span className="text-[#402493] font-semibold">{proof.category}</span>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          {totalSlides > CARDS_VISIBLE && (
            <div className="flex justify-center gap-1.5 mt-6" role="group" aria-label="Slide position">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => slideTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentIndex ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-[#257CFF]'
                      : 'w-1.5 bg-purple-700 hover:bg-purple-500'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Slide counter */}
          {totalSlides > CARDS_VISIBLE && (
            <p className="text-center text-[10px] text-purple-400 mt-2">
              {currentIndex + 1} – {Math.min(currentIndex + CARDS_VISIBLE, totalSlides)} of {totalSlides}
            </p>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      {selectedProof && (
        <Modal
          isOpen={Boolean(selectedProof)}
          onClose={() => setSelectedProof(null)}
          title={selectedProof.label}
          maxWidth="4xl"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl h-[420px] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
              <Image
                src={selectedProof.image}
                alt={selectedProof.label}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
              />
            </div>
            <div className="mt-4 w-full flex items-center justify-between text-xs text-slate-600 border-t pt-3">
              <div>
                <span className="font-semibold text-slate-800">Destination:</span>{' '}
                {selectedProof.country} ({selectedProof.category})
              </div>
              <div className="text-slate-400">Personal identifiers masked for privacy (NDPR compliant)</div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
