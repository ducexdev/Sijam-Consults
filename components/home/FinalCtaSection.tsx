import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-[#402493] via-[#2D186B] to-[#0D0826] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#F45A2A]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#F98864] mb-4">
          <span>Consultation Available Online & In-Person</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Ready to Take the Next Step Toward Your International Ambition?
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Speak with our accredited immigration consultants at our Kaduna office or start with our 2-minute eligibility quiz to discover your options.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/assessment" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-cta transition-transform hover:scale-[1.02] active:scale-[0.98] border border-[#4DA5EC]/30"
          >
            <span>Start Free Eligibility Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a 
            href="https://wa.me/2347064229556?text=Hello%20Sijam%20Consults%2C%20I%20would%20like%20to%20speak%20with%20an%20advisor%20about%20my%20visa%20options." 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm px-7 py-4 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With Senior Advisor</span>
          </a>
        </div>

        <div className="mt-8 text-xs text-white/50">
          Kaduna Office: Suite A10, 2/4 Kachia Road • Hotline: +234 706 422 9556
        </div>

      </div>
    </section>
  );
}
