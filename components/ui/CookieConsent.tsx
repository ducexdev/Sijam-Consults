'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { ROUTES } from '@/lib/routes';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sijam_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('sijam_cookie_consent', JSON.stringify({ essential: true, analytics: true }));
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('sijam_cookie_consent', JSON.stringify({ essential: true, analytics: false }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy notice"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-[#0D0826]/95 text-white backdrop-blur-md border-t border-purple-800/40 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#F45A2A] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            <span className="font-semibold text-white">NDPR Compliance & Cookie Notice: </span>
            Sijam Consults Limited uses strictly essential cookies and anonymized telemetry to ensure secure booking sessions and optimize user navigation. We do not sell personal data. View our{' '}
            <Link href={ROUTES.privacy} className="text-[#F98864] underline hover:text-white transition-colors">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href={ROUTES.cookies} className="text-[#F98864] underline hover:text-white transition-colors">
              Cookie Preferences
            </Link>.
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <Button
            variant="glass"
            size="sm"
            onClick={acceptEssential}
          >
            Essential Only
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={acceptAll}
          >
            Accept All
          </Button>
        </div>
      </div>
    </aside>
  );
};
