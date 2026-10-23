import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { CookieConsent } from '@/components/ui/CookieConsent';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-[#0F172A]">
      {/* WCAG 2.1 AA (SC 2.4.1 Bypass Blocks) — Skip to main content link for keyboard & assistive technology */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#402493] focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white font-semibold text-xs sm:text-sm transition-all"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <CookieConsent />
    </div>
  );
};
