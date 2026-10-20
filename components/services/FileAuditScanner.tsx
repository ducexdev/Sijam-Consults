'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  FileSearch,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Scale,
  Users,
  Building,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

interface FileAuditScannerState {
  destination: 'us' | 'uk' | 'schengen' | 'canada';
  history: 'first_time' | 'one_refusal' | 'multiple_refusals';
  finances: 'personal_salary' | 'business_account' | 'third_party' | 'lump_sum';
  ties: 'strong_ties' | 'moderate_ties' | 'vulnerable_ties';
}

export const FileAuditScanner: React.FC = () => {
  const [state, setState] = useState<FileAuditScannerState>({
    destination: 'schengen',
    history: 'first_time',
    finances: 'personal_salary',
    ties: 'moderate_ties',
  });

  const analysis = useMemo(() => {
    let riskScore = 20; // baseline low risk
    const criticalTriggers: string[] = [];
    const recommendedRemediations: string[] = [];

    // History weighting
    if (state.history === 'one_refusal') {
      riskScore += 25;
      criticalTriggers.push('Active prior refusal record on consular biometric database');
      recommendedRemediations.push('Forensic deconstruction of previous refusal letter before new submission');
    } else if (state.history === 'multiple_refusals') {
      riskScore += 45;
      criticalTriggers.push('Pattern of consecutive refusals triggering escalated consular suspicion');
      recommendedRemediations.push('Procedural change-in-circumstance memorandum mandatory to overturn refusal precedent');
    }

    // Financial weighting
    if (state.finances === 'lump_sum') {
      riskScore += 35;
      criticalTriggers.push('Sudden unexplained bank deposit flagged as artificial proof of funds (funds parking)');
      recommendedRemediations.push('Source-of-funds statutory affidavit, deed of sale, or corporate dividend voucher reconciliation');
    } else if (state.finances === 'third_party') {
      riskScore += 20;
      criticalTriggers.push('Non-immediate family third-party sponsor scrutinised heavily for genuine financial commitment');
      recommendedRemediations.push('Verifiable proof of relationship, sponsor tax receipts, and notarised sponsorship covenant');
    } else if (state.finances === 'business_account') {
      riskScore += 10;
      criticalTriggers.push('Commingled personal and corporate funds without formal board resolution or dividend vouchers');
      recommendedRemediations.push('CAC corporate status report, company bank statements + board resolution authorising expenditure');
    }

    // Ties weighting
    if (state.ties === 'vulnerable_ties') {
      riskScore += 25;
      criticalTriggers.push('Low demonstrable economic or domestic anchors in Nigeria (high immigrant intent presumption)');
      recommendedRemediations.push('Establish multi-asset home ties: tenancy agreements, family obligations, and ongoing corporate engagements');
    } else if (state.ties === 'moderate_ties') {
      riskScore += 10;
      criticalTriggers.push('Standard employment documentation without strong evidence of non-removable career obligations');
      recommendedRemediations.push('Employer approved leave letter explicitly guaranteeing job retention upon return');
    }

    // Destination specifics
    let destinationLabel = 'Schengen Area (29 Nations)';
    let primaryRefusalCode = 'Article 32(1)(b) — Justification for purpose and conditions of stay';
    if (state.destination === 'us') {
      destinationLabel = 'United States (DS-160 / Consular Section)';
      primaryRefusalCode = 'INA Section 214(b) — Presumption of immigrant intent / weak non-immigrant ties';
    } else if (state.destination === 'uk') {
      destinationLabel = 'United Kingdom (UKVI Visit / Student / Work)';
      primaryRefusalCode = 'Immigration Rules Appendix V: V 4.2(a) & (e) — Genuine intention to leave at end of visit';
    } else if (state.destination === 'canada') {
      destinationLabel = 'Canada (IRCC / GCKey Portal)';
      primaryRefusalCode = 'IRPR Section 179(b) — Officer not satisfied you will leave Canada at end of authorized stay';
    }

    // Risk category
    let riskLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    let riskBadgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    let verdictText = 'File appears structurally sound with standard review requirements.';

    if (riskScore >= 75) {
      riskLevel = 'critical';
      riskBadgeColor = 'text-red-400 bg-red-500/10 border-red-500/30';
      verdictText = 'CRITICAL REFUSAL RISK: Submitting this file in its current state will almost certainly trigger a refusal or multi-year cooldown. Immediate professional audit required.';
    } else if (riskScore >= 50) {
      riskLevel = 'high';
      riskBadgeColor = 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      verdictText = 'HIGH RISK: Serious documentation vulnerabilities identified. The consular officer is likely to reject the application without written remediation.';
    } else if (riskScore >= 35) {
      riskLevel = 'moderate';
      riskBadgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      verdictText = 'MODERATE RISK: Noticeable gaps in financial or home ties clarity. A targeted pre-submission audit will resolve these before booking biometrics.';
    }

    return {
      riskScore: Math.min(riskScore, 98),
      riskLevel,
      riskBadgeColor,
      verdictText,
      destinationLabel,
      primaryRefusalCode,
      criticalTriggers: criticalTriggers.length > 0 ? criticalTriggers : ['Zero obvious red flags detected; standard consistency audit recommended.'],
      recommendedRemediations: recommendedRemediations.length > 0 ? recommendedRemediations : ['Standard line-by-line DS-160/Schengen form verification and 45-minute mock interview rehearsal.'],
    };
  }, [state]);

  const whatsappMessage = encodeURIComponent(
    `Hello Sijam Consults, I ran the Pre-Submission Refusal Risk Scanner for ${analysis.destinationLabel}. My profile returned a ${analysis.riskLevel.toUpperCase()} RISK rating (${analysis.riskScore}% risk score). I need a senior documentation consultant to audit my file before submission.`,
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B071E] p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#4DA5EC]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#DC2F11]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-wider text-blue-300 mb-2">
            <Sparkles className="w-3 h-3 text-[#4DA5EC]" />
            Live Pre-Submission Diagnostic
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight">
            47-Point Visa Dossier Refusal Risk Scanner
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate how a foreign consular officer evaluates your paperwork before you pay non-refundable visa fees.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setState({
              destination: 'schengen',
              history: 'first_time',
              finances: 'personal_salary',
              ties: 'moderate_ties',
            })
          }
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Scanner</span>
        </button>
      </div>

      {/* Scanner Controls */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-white/[0.08]">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3 h-3 text-[#4DA5EC]" />
            Target Consulate / Embassy
          </label>
          <select
            value={state.destination}
            onChange={(e) => setState((s) => ({ ...s, destination: e.target.value as FileAuditScannerState['destination'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="schengen">🇪🇺 Schengen (Poland, France, Germany)</option>
            <option value="us">🇺🇸 United States (DS-160 / NIV)</option>
            <option value="uk">🇬🇧 United Kingdom (UKVI Visit / Student)</option>
            <option value="canada">🇨🇦 Canada (IRCC Portal)</option>
          </select>
        </div>

        {/* Prior Visa History */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3 text-red-400" />
            Previous Visa Decision History
          </label>
          <select
            value={state.history}
            onChange={(e) => setState((s) => ({ ...s, history: e.target.value as FileAuditScannerState['history'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="first_time">First-Time Applicant (Clean Record)</option>
            <option value="one_refusal">1 Prior Visa Refusal on Record</option>
            <option value="multiple_refusals">2+ Multiple Refusals / Stamped Rejections</option>
          </select>
        </div>

        {/* Bank Statement Structure */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building className="w-3 h-3 text-amber-400" />
            Financial Proof Architecture
          </label>
          <select
            value={state.finances}
            onChange={(e) => setState((s) => ({ ...s, finances: e.target.value as FileAuditScannerState['finances'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="personal_salary">Salary Account with Consistent Monthly Payroll</option>
            <option value="business_account">Corporate CAC Account (Director Drawing)</option>
            <option value="third_party">Third-Party Sponsor / Relative Affidavit</option>
            <option value="lump_sum">Recent Large Inflow / Unexplained Lump Sum</option>
          </select>
        </div>

        {/* Socio-Economic Ties */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3 h-3 text-purple-400" />
            Demonstrable Ties to Nigeria
          </label>
          <select
            value={state.ties}
            onChange={(e) => setState((s) => ({ ...s, ties: e.target.value as FileAuditScannerState['ties'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="strong_ties">Strong: Real Estate / Registered Business / Family Anchors</option>
            <option value="moderate_ties">Moderate: Stable Employment with Formal Leave Approval</option>
            <option value="vulnerable_ties">Vulnerable: Young / Single / Freelance / Career Transition</option>
          </select>
        </div>
      </div>

      {/* Dynamic Results Display */}
      <div className="relative z-10 pt-6 space-y-6">
        {/* Risk Score & Verdict HUD */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Jurisdiction Under Review: <span className="text-white">{analysis.destinationLabel}</span>
            </div>
            <div className="text-xs font-mono text-slate-500">
              High-Probability Consular Rejection Clause: <span className="text-amber-300 font-semibold">{analysis.primaryRefusalCode}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Refusal Risk Exposure</div>
              <div className="text-2xl font-black text-white">{analysis.riskScore}%</div>
            </div>
            <span className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${analysis.riskBadgeColor}`}>
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {analysis.riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Verdict Callout */}
        <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Forensic Assessment:</strong> {analysis.verdictText}
        </div>

        {/* Two-Column Findings & Remediations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Triggers */}
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-400">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>Consular Red Flags Detected In Your Selection</span>
            </div>
            <ul className="space-y-2.5">
              {analysis.criticalTriggers.map((trigger, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                  <span>{trigger}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Remediations */}
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400 mb-3">
                <FileSearch className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mandatory Audit Remediations Before Filing</span>
              </div>
              <ul className="space-y-2.5">
                {analysis.recommendedRemediations.map((rem, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4 border-t border-white/[0.05]">
              <Link
                href={ROUTES.consultation}
                className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book 47-point file audit</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.number}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-xs border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>Send file for triage</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
