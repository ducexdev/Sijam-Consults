import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Compass, ArrowRight, Home, HelpCircle } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="py-20 bg-[#FAF8FF] flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-purple-100 text-[#402493] flex items-center justify-center mx-auto shadow-sm">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#257CFF] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Error 404 • Destination Not Found
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Looking for a Specific Visa or Travel Pathway?
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              The page or resource you requested may have moved or been updated under our enhanced information architecture.
            </p>
          </div>

          {/* Quick Shortcuts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-4 max-w-lg mx-auto">
            <Link
              href={ROUTES.services.studyVisa}
              className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-[#402493] transition-colors group flex items-center justify-between"
            >
              <div>
                <strong className="text-xs font-bold text-[#0F172A] group-hover:text-[#402493] block">
                  Study Abroad Admissions
                </strong>
                <span className="text-[11px] text-slate-500">Cyprus, Poland, Canada</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#402493]" />
            </Link>

            <Link
              href={ROUTES.services.workVisa}
              className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-[#402493] transition-colors group flex items-center justify-between"
            >
              <div>
                <strong className="text-xs font-bold text-[#0F172A] group-hover:text-[#402493] block">
                  Work Permits & Placement
                </strong>
                <span className="text-[11px] text-slate-500">European employer filings</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#402493]" />
            </Link>

            <Link
              href={ROUTES.services.businessRegistration}
              className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-[#402493] transition-colors group flex items-center justify-between"
            >
              <div>
                <strong className="text-xs font-bold text-[#0F172A] group-hover:text-[#402493] block">
                  EU Business Registration
                </strong>
                <span className="text-[11px] text-slate-500">Polish Sp. z o.o. & D-Visa</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#402493]" />
            </Link>

            <Link
              href={ROUTES.assessment}
              className="p-3.5 rounded-xl bg-white border border-purple-100 hover:border-[#402493] transition-colors group flex items-center justify-between"
            >
              <div>
                <strong className="text-xs font-bold text-[#0F172A] group-hover:text-[#402493] block">
                  Eligibility Calculator
                </strong>
                <span className="text-[11px] text-slate-500">Instant qualification quiz</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#402493]" />
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button href={ROUTES.home} variant="primary" size="md">
              <Home className="w-4 h-4 mr-1.5" /> Return to Homepage
            </Button>
            <Button href={ROUTES.contact} variant="outline" size="md">
              <HelpCircle className="w-4 h-4 mr-1.5" /> Contact Support
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
