import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { CookieConsent } from '@/components/ui/CookieConsent';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-[#0F172A]">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CookieConsent />
    </div>
  );
};
