import React from 'react';
import Link from 'next/link';
import { ArrowRight, PhoneCall, ShieldCheck, Sparkles, MapPin, MessageCircle } from 'lucide-react';
import { COMPANY, ROUTES } from '@/lib/routes';

export const ConsultationBanner: React.FC = () => {
  return (
    <section className="py-24 bg-[#070415] text-white relative overflow-hidden border-t border-purple-950/60">
      {/* Background orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#402493]/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#DC2F11]/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2F11]/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2F11]/10 border border-[#DC2F11]/30 text-xs text-[#F98864] mb-8">
          <ShieldCheck className="w-4 h-4 text-[#DC2F11]" />
          <span className="font-bold uppercase tracking-wider">Confidential · 1-on-1 Advisory · Kaduna Office or Virtual</span>
        </div>

        {/* Headline */}
        <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-6">
          Ready to Start Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2F11] via-[#F45A2A] to-[#F98864]">
            International Journey?
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
            Let's Make It Happen.
          </span>
        </h2>

        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
          Whether you're seeking a job abroad, sending workers overseas, or studying internationally —{' '}
          <strong className="text-white font-semibold">Sijam Consults Limited</strong> is your trusted, CAC-registered partner every step of the way.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href={ROUTES.consultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#DC2F11] to-[#F45A2A] text-white font-black text-sm uppercase tracking-wider shadow-[0_8px_32px_-8px_rgba(220,47,17,0.7)] hover:shadow-[0_12px_40px_-8px_rgba(220,47,17,0.9)] hover:brightness-110 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Free Advisory Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={COMPANY.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 font-bold text-sm border border-emerald-500/30 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${COMPANY.phones.primary}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/[0.07] hover:bg-white/[0.13] text-white font-semibold text-sm border border-white/15 backdrop-blur-md transition-all"
          >
            <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
            <span>{COMPANY.phones.primary}</span>
          </a>
        </div>

        {/* Location note */}
        <div className="text-xs text-slate-500 flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#402493]" />
          <span>
            {COMPANY.address.suite}, {COMPANY.address.building}, Kaduna · Mon–Sat 09:00–17:00 WAT
          </span>
        </div>
      </div>
    </section>
  );
};
