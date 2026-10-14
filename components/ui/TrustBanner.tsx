import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { COMPANY } from '@/lib/routes';

export interface TrustBannerProps {
  showFullDisclaimer?: boolean;
  variant?: 'dark' | 'light';
  className?: string;
}

export const TrustBanner: React.FC<TrustBannerProps> = ({
  showFullDisclaimer = false,
  variant = 'dark',
  className = '',
}) => {
  const isDark = variant === 'dark';

  if (!isDark) {
    return (
      <div className={`rounded-2xl border border-purple-200/80 bg-white p-5 shadow-lg ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#402493] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading font-black text-sm sm:text-base text-slate-900">
                  Corporate Affairs Commission Registered
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {COMPANY.cacNumber}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Federal Republic of Nigeria • Fully Accredited Travel &amp; Educational Advisory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero-Omission File Audit Standard</span>
          </div>
        </div>

        {showFullDisclaimer && (
          <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-start gap-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <AlertTriangle className="w-4 h-4 text-[#F45A2A] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-900 font-bold uppercase tracking-wider">Notice of Statutory Independence:</strong>{' '}
              {COMPANY.disclaimers.regulatory}
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ── High-Contrast Luxury Dark Theme (Default) ── */
  return (
    <div
      className={`rounded-2xl border border-white/20 bg-gradient-to-br from-[#160E36] via-[#0E0926] to-[#070415] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl ring-1 ring-white/10 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Shield & CAC Information */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4DA5EC] to-[#257CFF] text-white flex items-center justify-center shrink-0 shadow-[0_8px_25px_rgba(37,124,255,0.4)] border border-white/25">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
                Corporate Affairs Commission Registered
              </span>
              <a
                href="https://search.cac.gov.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono font-black px-2.5 py-0.5 rounded-full border border-emerald-500/40 inline-flex items-center gap-1 transition-colors"
                title="Verify on CAC Registry"
              >
                <span>{COMPANY.cacNumber}</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-normal mt-1">
              Federal Republic of Nigeria • Fully Accredited Travel &amp; Educational Advisory
            </p>
          </div>
        </div>

        {/* Right: File Audit Standard Badge */}
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/15 px-3.5 py-2 rounded-xl border border-emerald-500/35 shadow-sm backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Zero-Omission File Audit Standard</span>
        </div>
      </div>

      {/* Full Regulatory Disclaimer (High-Contrast Callout) */}
      {showFullDisclaimer && (
        <div className="mt-4 pt-3.5 border-t border-white/15">
          <div className="flex items-start gap-3 text-xs text-slate-200 bg-black/50 p-4 rounded-xl border border-white/15 backdrop-blur-md leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-slate-200">
              <strong className="text-amber-300 font-bold uppercase tracking-wider mr-1">
                Notice of Statutory Independence:
              </strong>
              {COMPANY.disclaimers.regulatory}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
