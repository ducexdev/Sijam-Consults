'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/routes';

export const WhatsAppFloat: React.FC = () => {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={COMPANY.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with Sijam Consults on WhatsApp"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105"
      >
        {/* Pulsating Ping */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <MessageCircle className="w-5 h-5 fill-white stroke-[#25D366]" />
        <span className="hidden sm:inline font-heading font-semibold text-xs tracking-wide">
          Chat With Advisor
        </span>
      </a>
    </aside>
  );
};
