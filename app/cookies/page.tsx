'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Cookie, Shield, CheckCircle2 } from 'lucide-react';
import { CookiePreferences } from '@/lib/types';

export default function CookiesPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sijam_cookie_consent');
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    return {
      essential: true,
      analytics: true,
      marketing: false,
    };
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    try {
      localStorage.setItem('sijam_cookie_consent', JSON.stringify(preferences));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Cookie Preferences' }]} />

          <div className="my-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#402493] text-xs font-semibold">
              <Cookie className="w-4 h-4" />
              <span>Consent Governance</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Cookie Settings & Transparency
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage your cookie preferences and control how Sijam Consults processes web telemetry.
            </p>
          </div>

          <Card className="p-6 sm:p-10 space-y-8 bg-white border-purple-100 shadow-sm leading-relaxed text-sm text-slate-700">
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#402493]" />
                How We Use Cookies
              </h2>
              <p>
                Sijam Consults Limited uses cookies and browser storage technologies to maintain platform security, preserve user session inputs across eligibility assessment steps, and aggregate anonymous analytics.
              </p>
            </section>

            {/* Cookie Categories */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
              {/* Essential */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-base text-[#0F172A]">
                      Strictly Essential Cookies
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Required for core website functionality, secure HTTPS forms, anti-CSRF token verification, and navigation routing.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-[#402493] cursor-not-allowed opacity-60"
                />
              </div>

              {/* Analytics */}
              <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-[#0F172A]">
                    Performance & Analytics Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Helps us understand how visitors interact with our visa eligibility wizards, popular country guides, and page load speeds without storing personal identifiers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-[#402493] focus:ring-[#402493] cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-[#0F172A]">
                    Targeted Advisory & Campaign Cookies
                  </h3>
                  <p className="text-xs text-slate-600">
                    Used to present relevant study intake alerts and European scholarship announcements when you return to our portal.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-[#402493] focus:ring-[#402493] cursor-pointer"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <Button onClick={handleSave} variant="primary" size="md">
                Save Preferences
              </Button>
              {saved && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Preferences Saved Successfully
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
