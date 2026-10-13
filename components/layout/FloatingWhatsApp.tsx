"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = "Hello Sijam Consults, I am interested in exploring visa and relocation pathways.";
  const whatsappUrl = `https://wa.me/2347064229556?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-72 bg-[#1A1040] text-white rounded-2xl p-4 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10">
                <Image src="/brand/favicon.png" alt="Sijam Consults" fill sizes="32px" className="object-cover" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Sijam Consults Official</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  Verified Advisors Online
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-white/80 py-3 leading-relaxed">
            Welcome to Sijam Consults! Need immediate assistance with study admissions, work permits, or document legalization?
          </p>

          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
        aria-label="Chat on WhatsApp with Sijam Consults Advisor"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp Advisor</span>
      </button>
    </div>
  );
}
