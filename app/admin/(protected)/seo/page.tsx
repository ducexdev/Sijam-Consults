'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Globe } from 'lucide-react';
import { SeoCommandView } from '@/components/admin/SeoCommandView';

export default function AdminSEOPage() {
  return (
    <div className="min-h-screen bg-[#060A18] text-slate-100 p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Executive Command Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <Globe className="w-3.5 h-3.5" />
            <span>Organic SERP Command • CAC 7890456</span>
          </div>
        </div>

        {/* Embedded SEO Command Center */}
        <SeoCommandView />
      </div>
    </div>
  );
}
