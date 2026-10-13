'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  HardDrive,
  Lock,
  Globe,
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export function MediaView() {
  const [activeBucket, setActiveBucket] = useState<'public-assets' | 'applicant-documents'>('public-assets');

  const publicAssets = [
    { name: 'logo.png', path: 'branding/logo.png', size: '42 KB', type: 'image/png', date: '2026-10-10' },
    { name: 'James-Samson.png', path: 'team/James-Samson.png', size: '128 KB', type: 'image/png', date: '2026-10-10' },
    { name: 'Blessing-Attabor.png', path: 'team/Blessing-Attabor.png', size: '115 KB', type: 'image/png', date: '2026-10-10' },
    { name: 'Salami-Zainab-Keyinde.png', path: 'team/Salami-Zainab-Keyinde.png', size: '122 KB', type: 'image/png', date: '2026-10-10' },
    { name: 'Why-Study-Nursing-in-Canada-20262027.png', path: 'blogs/Why-Study-Nursing-in-Canada-20262027.png', size: '340 KB', type: 'image/png', date: '2026-10-11' },
    { name: 'Ducex-Blog.png', path: 'blogs/Ducex-Blog.png', size: '290 KB', type: 'image/png', date: '2026-10-11' },
  ];

  const applicantDocuments = [
    { name: 'CV_Tunde_Adeyemi_RN.pdf', path: 'candidates/app-01/CV_Tunde_Adeyemi_RN.pdf', size: '412 KB', type: 'application/pdf', date: '2026-10-12', status: 'Encrypted' },
    { name: 'CV_Ngozi_Eze_Developer.pdf', path: 'candidates/app-02/CV_Ngozi_Eze_Developer.pdf', size: '280 KB', type: 'application/pdf', date: '2026-10-12', status: 'Encrypted' },
    { name: 'Passport_Data_Page_Redacted.pdf', path: 'candidates/app-01/Passport_Data_Page_Redacted.pdf', size: '1.2 MB', type: 'application/pdf', date: '2026-10-12', status: 'Restricted' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Cloudflare & Supabase Storage • Asset Governance
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Media & Document Vault
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveBucket('public-assets')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeBucket === 'public-assets'
                ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            public-assets
          </button>
          <button
            onClick={() => setActiveBucket('applicant-documents')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
              activeBucket === 'applicant-documents'
                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            applicant-documents (Private)
          </button>
        </div>
      </div>

      {/* Security Context Banner */}
      {activeBucket === 'applicant-documents' ? (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-2">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
            <Lock className="w-4 h-4" />
            Restricted Vault: Candidate Documents & PII Storage
          </div>
          <p className="text-xs text-rose-200/80 leading-relaxed">
            All files in this bucket are encrypted and protected by Supabase Row Level Security (RLS). Public direct URLs return 403 Forbidden. Authorized case officers can generate 15-minute signed download URLs upon identity verification.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-1">
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs">
            <Globe className="w-4 h-4" />
            Public Assets CDN: Edge-Cached via Cloudflare
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Assets uploaded here are served publicly with immutable cache-control headers for optimal Core Web Vitals (LCP) performance.
          </p>
        </div>
      )}

      {/* Files List */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-white">
            Bucket Contents: {activeBucket}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {activeBucket === 'public-assets' ? publicAssets.length : applicantDocuments.length} assets recorded
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {(activeBucket === 'public-assets' ? publicAssets : applicantDocuments).map((item) => (
            <div
              key={item.path}
              className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  {item.type.includes('image') ? (
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{item.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{item.path}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div className="text-[11px] text-slate-400 font-mono">
                  <div>{item.size}</div>
                  <div className="text-[10px] text-slate-500">{item.date}</div>
                </div>

                {activeBucket === 'public-assets' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Public CDN
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                    Signed URL Only
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
