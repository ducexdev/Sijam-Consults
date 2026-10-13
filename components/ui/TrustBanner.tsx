import React from 'react';
import { Shield, CheckCircle2, AlertTriangle } from 'lucide-react';
import { COMPANY } from '@/lib/routes';

export const TrustBanner: React.FC<{ showFullDisclaimer?: boolean }> = ({
  showFullDisclaimer = false,
}) => {
  return (
    <div className="rounded-xl border border-purple-200/60 bg-gradient-to-r from-purple-50 via-white to-orange-50/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#402493] text-white flex items-center justify-center shrink-0 shadow-md">
            <Shield className="w-5 h-5 text-[#F98864]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-bold text-sm text-[#0F172A]">
                Corporate Affairs Commission Registered
              </span>
              <span className="bg-[#EDE9FE] text-[#402493] text-xs font-bold px-2 py-0.5 rounded-full border border-purple-300">
                {COMPANY.cacNumber}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Federal Republic of Nigeria • Fully Accredited Travel & Educational Advisory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Zero-Omission File Audit Standard</span>
        </div>
      </div>

      {showFullDisclaimer && (
        <div className="mt-4 pt-3 border-t border-purple-100 flex items-start gap-2.5 text-xs text-slate-500">
          <AlertTriangle className="w-4 h-4 text-[#F45A2A] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-700">Notice of Statutory Independence:</strong>{' '}
            {COMPANY.disclaimers.regulatory}
          </p>
        </div>
      )}
    </div>
  );
};
