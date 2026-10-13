import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { COMPANY, ROUTES } from '@/lib/routes';

export const ConsultationBanner: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#070415] via-[#1A1040] to-[#070415] text-white relative overflow-hidden border-t border-purple-950/60">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] text-white text-xs backdrop-blur-md border border-white/10">
            <ShieldCheck className="w-4 h-4 text-[#F98864]" />
            <span>Confidential • 1-on-1 Strategy Session • Kaduna Office or Virtual</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Ready to Plan Your Relocation With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Forensic Precision?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
            Simplify your travel desire with Sijam Consult. We&apos;re your one-stop shop for visas, flights, hotels &amp; more: <strong className="text-white font-medium">expert travel agency</strong> + personalized immigration services. Speak with our certified advisors today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={ROUTES.consultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all border border-[#4DA5EC]/30"
            >
              <span>Book Advisory Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${COMPANY.phones.primary}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-xs border border-white/15 backdrop-blur-md transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#F98864]" />
              <span>Call Hotline: {COMPANY.phones.primary}</span>
            </a>
          </div>

          <div className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span>Kaduna Office: {COMPANY.address.suite}, {COMPANY.address.building} • Mon–Sun 09:00–17:00 WAT</span>
          </div>
        </div>
      </div>
    </section>
  );
};
