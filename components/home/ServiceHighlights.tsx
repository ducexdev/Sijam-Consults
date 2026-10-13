import React from 'react';
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

  return (
    <section className="py-20 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#402493]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F45A2A]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-wider text-[#F98864] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
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
          <Link
            href={ROUTES.services.root}
            className="inline-flex items-center text-xs sm:text-sm font-bold text-[#F98864] hover:text-white transition-colors shrink-0 group"
          >
            <span>Explore All 7 Services</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv) => {
            const Icon = iconMap[srv.slug] || GraduationCap;
            return (
              <div
                key={srv.id}
                className="p-6 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#402493] to-[#2D186B] group-hover:from-[#F45A2A] group-hover:to-[#DD4819] text-white flex items-center justify-center transition-colors shadow">
                      <Icon className="w-6 h-6" />
                    </div>
                    {srv.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F45A2A]/15 text-[#F98864] border border-orange-500/20">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-lg sm:text-xl text-white group-hover:text-[#F98864] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-purple-200/80 font-medium mt-1">
                    {srv.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 line-clamp-3 leading-relaxed font-normal">
                    {srv.summary}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Advisory Scope:
                    </div>
                    {srv.assistanceOffered.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-[#F98864] group-hover:text-white transition-colors"
                  >
                    <span>View Requirements & Process</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
