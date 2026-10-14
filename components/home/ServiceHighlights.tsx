'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Compass,
  FileSearch,
  Building,
  FileCheck,
  Plane,
  ArrowRight,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { SERVICES_DATA } from '@/lib/data/services';
import { ROUTES } from '@/lib/routes';

export const ServiceHighlights: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    'study-visa': GraduationCap,
    'work-visa': Briefcase,
    'tourist-visa': Compass,
    'visa-assistance': FileSearch,
    'business-registration': Building,
    'document-legalization': FileCheck,
    'flight-reservations': Plane,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive items count determination
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalServices = SERVICES_DATA.length;
  // Maximum index we can scroll to so we don't display trailing blank slots on desktop
  const maxIndex = Math.max(0, totalServices - visibleItems);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay timer with 4.5s dwell time for optimal cognitive processing
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile (Fitts's Law + natural gesture expectations)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  return (
    <section
      className="py-16 lg:py-24 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden"
      aria-label="Core Services Carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#402493]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#DC2F11]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-wider text-[#F98864] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#DC2F11]" />
              <span>Full-Spectrum Travel Agency & Immigration Suite</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
              Verified Solutions for Students,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                Professionals & Investors
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
              As a dedicated <strong className="text-white font-medium">travel agent agency</strong>, we combine personalized immigration consulting with full travel agency services—including verifiable flight reservations, university placements, and embassy-ready filings.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={ROUTES.services.root}
              className="hidden sm:inline-flex items-center text-xs sm:text-sm font-bold text-[#F98864] hover:text-white transition-colors mr-2 group"
            >
              <span>Explore All {totalServices} Services</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2 bg-white/[0.04] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-[#402493] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#4DA5EC]"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4DA5EC]"
                aria-label={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
                title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              >
                {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-slate-300" />}
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-[#402493] text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#4DA5EC]"
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Sliding Track */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {SERVICES_DATA.map((srv, idx) => {
              const Icon = iconMap[srv.slug] || GraduationCap;
              const isCardActive = idx >= currentIndex && idx < currentIndex + visibleItems;

              return (
                <div
                  key={srv.id}
                  className="px-3 shrink-0 flex flex-col"
                  style={{
                    width: `${100 / visibleItems}%`,
                  }}
                >
                  <div
                    className={`h-full p-6 sm:p-7 rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] border transition-all duration-500 backdrop-blur-xl flex flex-col justify-between shadow-xl group hover:-translate-y-1.5 ${
                      isCardActive
                        ? 'border-white/12 opacity-100'
                        : 'border-white/5 opacity-80'
                    } hover:border-[#DC2F11]/50 hover:shadow-2xl hover:shadow-[#402493]/20`}
                  >
                    <div>
                      {/* Card Header: Icon & Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#402493] to-[#2D186B] group-hover:from-[#DC2F11] group-hover:to-[#B82B10] text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-105">
                          <Icon className="w-6 h-6" />
                        </div>
                        {srv.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DC2F11]/15 text-[#F98864] border border-[#DC2F11]/30">
                            {srv.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="font-heading font-black text-lg sm:text-xl text-white group-hover:text-[#F98864] transition-colors leading-snug">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-purple-200/80 font-medium mt-1.5">
                        {srv.tagline}
                      </p>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-slate-300 mt-3.5 line-clamp-3 leading-relaxed font-normal">
                        {srv.summary}
                      </p>

                      {/* Advisory Scope */}
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Advisory Scope:
                        </div>
                        {srv.assistanceOffered.slice(0, 3).map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="inline-flex items-center justify-between w-full text-xs font-bold text-[#F98864] group-hover:text-white transition-colors"
                      >
                        <span>View Requirements & Process</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators / Pagination Dots (Hick's Law & Progress Awareness) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-2">
          {/* Active Status & Hover indicator */}
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4DA5EC] animate-pulse" />
            <span>
              Showing <strong className="text-white">{currentIndex + 1}</strong> to{' '}
              <strong className="text-white">{Math.min(currentIndex + visibleItems, totalServices)}</strong> of{' '}
              <strong className="text-white">{totalServices}</strong> services
            </span>
            <span className="hidden md:inline text-slate-500">• Hover card or controls to pause</span>
          </div>

          {/* Interactive Progress Bar & Step Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, stepIdx) => (
              <button
                key={stepIdx}
                onClick={() => setCurrentIndex(stepIdx)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4DA5EC] ${
                  currentIndex === stepIdx
                    ? 'w-8 h-2.5 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] shadow-sm'
                    : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${stepIdx + 1}`}
              />
            ))}
          </div>

          {/* Mobile direct link */}
          <div className="sm:hidden w-full text-center mt-2">
            <Link
              href={ROUTES.services.root}
              className="inline-flex items-center text-xs font-bold text-[#F98864] hover:text-white transition-colors group"
            >
              <span>Explore All {totalServices} Services</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

