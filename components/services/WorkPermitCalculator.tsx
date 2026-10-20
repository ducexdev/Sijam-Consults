'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Building,
  RotateCcw,
  ShieldCheck,
  FileCheck,
  Coins,
  Scale,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

interface WorkPermitCalculatorState {
  corridor: 'poland' | 'slovakia' | 'uk' | 'germany' | 'czech_malta';
  sector: 'healthcare' | 'trades' | 'it_tech' | 'hospitality' | 'manufacturing';
  offerStatus: 'has_offer' | 'seeking_offer';
  experienceYears: '1_2' | '3_5' | '5_plus';
}

export const WorkPermitCalculator: React.FC = () => {
  const [state, setState] = useState<WorkPermitCalculatorState>({
    corridor: 'poland',
    sector: 'trades',
    offerStatus: 'seeking_offer',
    experienceYears: '3_5',
  });

  const diagnostic = useMemo(() => {
    switch (state.corridor) {
      case 'poland':
        return {
          countryName: 'Poland (Voivodeship Type A)',
          flag: '🇵🇱',
          permitType: 'Zezwolenie na pracę Typ A (Employer-Initiated)',
          visaType: 'National Type-D Visa (Subcategory 05/06/21)',
          minWageStatutory: '4,300 PLN/month gross (Statutory minimum wage benchmark)',
          estimatedTimeline: '6–14 weeks permit approval + 3–5 weeks consular visa appointment',
          laborMarketTest:
            state.sector === 'trades' || state.sector === 'manufacturing'
              ? 'Shortage occupation exemption applies in key Voivodeships (Fast-tracked)'
              : 'Standard Staroste labor market clearance (Informacja Starosty)',
          keyDocuments: [
            'Original Type A Permit issued by Voivode (Urząd Wojewódzki)',
            'Bilingual employment contract with registered Polish KRS entity',
            'Police Character Certificate with Ministry of Foreign Affairs (MFA Abuja) attestation',
            'Comprehensive Schengen travel health insurance (€30,000 coverage)',
          ],
          pathwayAdvancement: 'Karta Pobytu (Temporary Residence Card) renewable for up to 3 years',
          readinessVerdict:
            state.offerStatus === 'has_offer'
              ? 'Urgent file audit recommended: verify Polish employer KRS number before fee transfers'
              : 'Eligibility verified: your profile qualifies for verified employer quota submissions',
          actionTip:
            'Never pay for a Polish work visa without first inspecting the physical Voivodeship permit bearing the official provincial coat of arms stamp.',
        };

      case 'slovakia':
        return {
          countryName: 'Slovakia (Single Residence & Work Permit)',
          flag: '🇸🇰',
          permitType: 'Prechodný pobyt na účel zamestnania (Unified Single Permit)',
          visaType: 'National D Visa for Residence Permit Collection in Bratislava',
          minWageStatutory: '€750 – €1,200/month gross base (plus statutory overtime & shift allowances)',
          estimatedTimeline: '20 working days vacancy reporting + 60–90 days consular processing',
          laborMarketTest: 'Mandatory 20-working-day vacancy clearance at Central Labour Office (ÚPSVaR)',
          keyDocuments: [
            'Written promise of employment or signed contract from Slovak registered company',
            'Confirmation of Vacancy from Central Labour Office (Potvrdenie o možnosti obsadenia VO)',
            'Police Clearance authenticated at MFA Abuja + certified Slovak sworn translation',
            'Notarized proof of guaranteed accommodation (Nájomná zmluva / Čestné vyhlásenie)',
          ],
          pathwayAdvancement: '2-Year renewable residence permit with unrestricted Schengen border mobility',
          readinessVerdict:
            state.offerStatus === 'has_offer'
              ? 'Labor clearance audit needed: ensure Slovak employer has submitted ÚPSVaR vacancy report'
              : 'Shortage profile: Slovakia actively seeks automotive, logistics, and technical specialists',
          actionTip:
            'Slovak single permit files require sworn translations by an authorized translator registered with the Ministry of Justice in Slovakia.',
        };

      case 'uk':
        return {
          countryName: 'United Kingdom (Skilled Worker Route)',
          flag: '🇬🇧',
          permitType: 'Defined Certificate of Sponsorship (CoS) — Home Office Approved',
          visaType: 'UK Skilled Worker Visa (Points-Based Immigration System, 70 Points)',
          minWageStatutory:
            state.sector === 'healthcare'
              ? '£23,200/year (or national pay scale rate under Health & Care Worker route exemption)'
              : '£26,200 – £38,700/year (or standard occupation going rate, whichever is higher)',
          estimatedTimeline: 'CoS allocation (1–3 weeks) + UKVI priority/standard visa (3–6 weeks)',
          laborMarketTest: 'Resident Labour Market Test abolished; employer must possess active Sponsor Licence',
          keyDocuments: [
            'Defined Certificate of Sponsorship (CoS) reference code assigned by A-rated sponsor',
            'IELTS for UKVI (Academic or General, minimum B1 CEFR level in all 4 components)',
            'Proof of financial maintenance (£1,270 in bank account held 28 days, or sponsor certification)',
            'Tuberculosis (TB) clearance certificate from IOM Migration Health Assessment Clinic Abuja/Lagos',
          ],
          pathwayAdvancement: '5-Year settlement pathway leading to Indefinite Leave to Remain (ILR) and British citizenship',
          readinessVerdict:
            state.offerStatus === 'has_offer'
              ? 'Sponsor verification required: verify whether the UK company is on the register of licensed sponsors'
              : 'Direct sponsorship advisory required: evaluate whether your occupation meets SOC 2020 eligibility',
          actionTip:
            'Care worker and senior care worker sponsorship rules underwent recent regulatory updates. Sijam verifies current Home Office sponsor quota allowances.',
        };

      case 'germany':
        return {
          countryName: 'Germany (Skilled Immigration Act & Opportunity Card)',
          flag: '🇩🇪',
          permitType: 'Aufenthaltstitel zur Beschäftigung / Chancenkarte (Opportunity Card Points)',
          visaType: 'National Type D Employment / Job Search Visa (Federal Republic of Germany)',
          minWageStatutory: '€12.41/hour statutory minimum (€2,150+/month) or collective tariff scale (TVöD)',
          estimatedTimeline: 'Credential recognition (ZAB/IHK: 2–3 months) + Embassy appointment (4–8 weeks)',
          laborMarketTest: 'Federal Employment Agency (Bundesagentur für Arbeit) pre-approval fast-track',
          keyDocuments: [
            'ZAB / Anabin equivalence statement or IHK FOSA vocational credential recognition',
            'Verbindliches Arbeitsplatzangebot (Binding employment contract or letter of intent)',
            'German language proficiency (A2/B1 Goethe-Zertifikat or telc) where mandated by sector',
            'Federal police certificate (MFA Abuja attested) + proof of certified living quarters',
          ],
          pathwayAdvancement: 'EU Blue Card or settlement permit (Niederlassungserlaubnis) after 21–27 months',
          readinessVerdict:
            state.offerStatus === 'has_offer'
              ? 'Deficit analysis audit: credential equivalence must be verified before embassy filing'
              : 'Points evaluation needed: assess your age, language, and credentials for Chancenkarte eligibility',
          actionTip:
            'The German Opportunity Card (Chancenkarte) enables skilled Nigerians to enter Germany for up to 12 months for active job searches if scoring at least 6 points.',
        };

      case 'czech_malta':
        return {
          countryName: 'Czech Republic & Malta (Central & Southern EU)',
          flag: '🇨🇿',
          permitType: 'Czech Employee Card (Zaměstnanecká karta) / Malta Single Permit (Jobsplus)',
          visaType: 'National Long-Stay D Visa for Employment',
          minWageStatutory: '€850 – €1,400/month gross depending on sector and destination country',
          estimatedTimeline: '60–120 days depending on consular interview slots and labor authority',
          laborMarketTest: 'Central vacancy registry check (30 days for Czech Republic; Jobsplus vacancy search in Malta)',
          keyDocuments: [
            'Official labor market clearance voucher from host ministry of labor',
            'Authenticated police certificate with full consular legalizations and official translations',
            'Standardized employer contract complying with host European statutory minimum benefits',
            'Pre-reserved accommodation agreement with verifiable municipal registry proof',
          ],
          pathwayAdvancement: 'Long-term residence permit renewable under EU Directive on third-country workers',
          readinessVerdict:
            state.offerStatus === 'has_offer'
              ? 'Consular queue audit: verify earliest biometric submission dates at the relevant Embassy in Abuja'
              : 'Quota eligibility: verify available bilateral bilateral slots for non-EU vocational candidates',
          actionTip:
            'Malta requires Jobsplus approval initiated by the employer. Never make financial commitments until Jobsplus issues the formal Approval in Principle letter.',
        };
    }
  }, [state]);

  const whatsappMessage = encodeURIComponent(
    `Hello Sijam Consults, I completed the Work Permit Corridor Diagnostic for ${diagnostic.countryName} (${diagnostic.permitType}) in the ${state.sector.toUpperCase()} sector. I would like to book a verification and eligibility advisory session.`,
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B071E] p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#4DA5EC]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#402493]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4DA5EC]/10 border border-[#4DA5EC]/30 text-[11px] font-black uppercase tracking-wider text-blue-300 mb-2">
            <Sparkles className="w-3 h-3 text-[#4DA5EC]" />
            Interactive Statutory Diagnostic Tool
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight">
            Work Permit Corridor &amp; Document Readiness Diagnostic
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate your legal work authorization pathway across European and UK corridors with live statutory criteria.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setState({
              corridor: 'poland',
              sector: 'trades',
              offerStatus: 'seeking_offer',
              experienceYears: '3_5',
            })
          }
          className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Diagnostic</span>
        </button>
      </div>

      {/* Form Controls Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-white/[0.08]">
        {/* Destination Corridor */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#4DA5EC]" />
            Target Work Corridor
          </label>
          <select
            value={state.corridor}
            onChange={(e) => setState((s) => ({ ...s, corridor: e.target.value as WorkPermitCalculatorState['corridor'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="poland">🇵🇱 Poland (Voivodeship Type A)</option>
            <option value="slovakia">🇸🇰 Slovakia (Single Permit)</option>
            <option value="uk">🇬🇧 United Kingdom (Skilled Worker / CoS)</option>
            <option value="germany">🇩🇪 Germany (Skilled Immigration Act)</option>
            <option value="czech_malta">🇨🇿 Czech Republic &amp; 🇲🇹 Malta</option>
          </select>
        </div>

        {/* Sector */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 text-purple-400" />
            Occupation Sector
          </label>
          <select
            value={state.sector}
            onChange={(e) => setState((s) => ({ ...s, sector: e.target.value as WorkPermitCalculatorState['sector'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="trades">Skilled Trades &amp; Technicians (Welders, Electricians, CNC)</option>
            <option value="healthcare">Healthcare &amp; Social Care (Nurses, Midwives, Care Aides)</option>
            <option value="it_tech">IT &amp; Software Engineering (DevOps, Systems, Data)</option>
            <option value="manufacturing">Manufacturing, Logistics &amp; Heavy Drivers</option>
            <option value="hospitality">Hospitality, Culinary &amp; Food Production</option>
          </select>
        </div>

        {/* Job Offer Status */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck className="w-3 h-3 text-emerald-400" />
            Current Employer Offer Status
          </label>
          <select
            value={state.offerStatus}
            onChange={(e) => setState((s) => ({ ...s, offerStatus: e.target.value as WorkPermitCalculatorState['offerStatus'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="seeking_offer">Seeking Verified Employer Quota Placement</option>
            <option value="has_offer">I Have an Employer Offer (Needs Verification)</option>
          </select>
        </div>

        {/* Verifiable Experience */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-amber-400" />
            Verifiable Work History
          </label>
          <select
            value={state.experienceYears}
            onChange={(e) => setState((s) => ({ ...s, experienceYears: e.target.value as WorkPermitCalculatorState['experienceYears'] }))}
            className="w-full bg-[#070415] border border-white/15 focus:border-[#4DA5EC] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-colors"
          >
            <option value="1_2">1 – 2 Years Verified Experience</option>
            <option value="3_5">3 – 5 Years Verified Experience (Optimal)</option>
            <option value="5_plus">5+ Years Senior / Certified Experience</option>
          </select>
        </div>
      </div>

      {/* Dynamic Results Display */}
      <div className="relative z-10 pt-6 space-y-6">
        {/* Overview Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl sm:text-4xl">{diagnostic.flag}</span>
            <div>
              <div className="text-xs font-bold text-[#4DA5EC] uppercase tracking-wider">Statutory Jurisdiction</div>
              <h4 className="text-lg sm:text-xl font-black text-white">{diagnostic.countryName}</h4>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{diagnostic.permitType}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct Bilateral Filing
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              {diagnostic.visaType}
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Statutory Salary / Minimum Wage */}
          <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Statutory Wage Benchmark</span>
            </div>
            <div className="text-sm font-black text-white">{diagnostic.minWageStatutory}</div>
            <div className="text-[11px] text-slate-500">Official host-country labor minimum legal baseline</div>
          </div>

          {/* Timeline */}
          <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Clock className="w-4 h-4 text-[#4DA5EC]" />
              <span>Realistic Filing Timeline</span>
            </div>
            <div className="text-sm font-black text-white">{diagnostic.estimatedTimeline}</div>
            <div className="text-[11px] text-slate-500">Employer authorization + consular visa window</div>
          </div>

          {/* Labor Market Test Status */}
          <div className="p-4 rounded-xl bg-[#070415] border border-white/[0.06] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Building className="w-4 h-4 text-purple-400" />
              <span>Labor Market Clearance</span>
            </div>
            <div className="text-sm font-black text-white">{diagnostic.laborMarketTest}</div>
            <div className="text-[11px] text-slate-500">Local worker priority test vs shortage exemption</div>
          </div>
        </div>

        {/* Requirements & Actionable Guidance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Mandatory Documents Checklist */}
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-300">
              <FileCheck className="w-4 h-4 text-[#4DA5EC]" />
              <span>Mandatory Dossier Checklist For This Corridor</span>
            </div>
            <ul className="space-y-2.5">
              {diagnostic.keyDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-white/[0.05]">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span><strong>Residency Transition:</strong> {diagnostic.pathwayAdvancement}</span>
            </div>
          </div>

          {/* Readiness Verdict & Practical Warning */}
          <div className="p-5 rounded-2xl bg-[#070415] border border-white/[0.06] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Forensic Advisory Verdict</span>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 leading-relaxed">
                <strong>Status:</strong> {diagnostic.readinessVerdict}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Compliance Warning:</strong> {diagnostic.actionTip}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              <Link
                href={ROUTES.consultation}
                className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book permit audit</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.number}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-xs border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share with advisor</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
