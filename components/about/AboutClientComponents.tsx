'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Plane,
  Award,
  Globe2,
  Building2,
  FileCheck2,
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  PhoneCall,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

/* ── 1. Copy CAC Number Button ── */
export function CopyCACButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMPANY.cacNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono font-bold text-white transition-all active:scale-95"
        title="Copy CAC Number"
      >
        <span className="text-slate-400">RC:</span>
        <span className="text-emerald-400 font-black tracking-wider">{COMPANY.cacNumber}</span>
        {copied ? (
          <span className="text-[10px] text-emerald-400 font-sans font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" /> Copied
          </span>
        ) : (
          <Copy className="w-3 h-3 text-slate-400 hover:text-white" />
        )}
      </button>

      <a
        href="https://search.cac.gov.ng/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-300 text-[11px] font-semibold transition-all"
      >
        <span>Verify on CAC Portal</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

/* ── 2. Interactive Global Corridors Showcase ── */
interface Corridor {
  id: string;
  name: string;
  flag: string;
  region: string;
  universitiesCount: string;
  primaryPathways: string[];
  partnerHighlights: string;
  processingTimeline: string;
  scholarshipRate: string;
  consularFocus: string;
  partnerImage?: string;
}

const CORRIDORS: Corridor[] = [
  {
    id: 'poland',
    name: 'Poland & Central Europe',
    flag: '🇵🇱',
    region: 'European Union • Schengen Zone',
    universitiesCount: '15+ Partner Universities',
    primaryPathways: ['Single Work Permits (Type A)', 'Bachelor/Master Direct Admissions', 'Postgraduate Nursing & Tech Programs'],
    partnerHighlights: 'College of Economics and Computer Science (WSEI Krakow), Warsaw University of Business, accredited healthcare employers.',
    processingTimeline: '3 to 6 Months',
    scholarshipRate: 'Subsidized European Tuition (€2,200 – €3,800/yr)',
    consularFocus: 'Direct Voivodeship labor market permits, authenticated WAEC/NECO at MFA Abuja, verified student accommodation.',
    partnerImage: '/partners/COLLEGE-OF-ECONOMICS-AND-COMPUTER-SCIENCE-POLAND.jpg',
  },
  {
    id: 'cyprus',
    name: 'Cyprus & Mediterranean',
    flag: '🇨🇾',
    region: 'Eastern Mediterranean • EU Educational Framework',
    universitiesCount: 'Premier Bilateral Alliance',
    primaryPathways: ['50% to 75% Guaranteed Merit Scholarships', 'Direct English-Taught Degrees', 'Fast-Track Student Visa OK-to-Board'],
    partnerHighlights: 'Cyprus West University (CWU) official bilateral agreement; recognized by Ministry of National Education.',
    processingTimeline: '4 to 8 Weeks',
    scholarshipRate: '50% to 75% Tuition Coverage on Admission',
    consularFocus: 'Zero IELTS requirement for WAEC/NECO holders; direct institutional OK-to-Board issuance with seamless airport clearance.',
    partnerImage: '/partners/Cwu-Logo-White-02-Eng.png',
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Great Britain & Northern Ireland',
    universitiesCount: '30+ Russell Group & Public Universities',
    primaryPathways: ['Tier 4 Student Visa (CAS Direct)', 'Skilled Worker Visa (CoS)', 'Care & Healthcare Placement Transitions'],
    partnerHighlights: 'Novaric Academy, leading London and regional accredited academic and vocational training institutions.',
    processingTimeline: '3 to 8 Weeks (Priority Available)',
    scholarshipRate: '£2,000 – £5,000 International Student Grants',
    consularFocus: 'Forensic 28-day bank statement verification, TB test coordination at IOM Abuja/Lagos, strict CAS issuance compliance.',
    partnerImage: '/partners/NOVARIC-Academy-Logo.png',
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America • IRCC Designated Institutions',
    universitiesCount: '20+ DLIs Across Ontario, Alberta & BC',
    primaryPathways: ['Study Permit + PGWP (Post-Grad Work)', 'Provincial Attestation Letter (PAL) Direct Support', 'Permanent Residence Transition'],
    partnerHighlights: 'Accredited Designated Learning Institutions (DLIs) with guaranteed eligibility for post-graduation work permits.',
    processingTimeline: '8 to 14 Weeks',
    scholarshipRate: 'Institutional Entrance Awards up to $10,000 CAD',
    consularFocus: 'Forensic Statement of Purpose (SOP), verifiable dual intent, liquid proof-of-funds seasoning, and PAL allocation.',
  },
  {
    id: 'schengen-other',
    name: 'Slovakia, Greece & Germany',
    flag: '🇪🇺',
    region: 'Continental Schengen Area',
    universitiesCount: 'Selected Industrial & Tech Alliances',
    primaryPathways: ['MIG/MAG Certified Welding & Industrial Contracts', 'Schengen National D Visas', 'Public University Tuition-Free Tracks'],
    partnerHighlights: 'Verified industrial fabricators in Bratislava & Kosice; Greek maritime and hospitality training institutes.',
    processingTimeline: '3 to 5 Months',
    scholarshipRate: 'Competitive European Living & Work Wages (€1,400 – €2,400/mo)',
    consularFocus: 'Embassy legalization in Abuja, police character certificate attestation, biometric consular interview coaching.',
  },
];

export function InteractiveCorridors() {
  const [activeId, setActiveId] = useState<string>('poland');
  const active = CORRIDORS.find((c) => c.id === activeId) || CORRIDORS[0];

  return (
    <div className="space-y-8">
      {/* Corridor Selection Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
        {CORRIDORS.map((corridor) => {
          const isSelected = corridor.id === activeId;
          return (
            <button
              key={corridor.id}
              onClick={() => setActiveId(corridor.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-[0_8px_25px_rgba(37,124,255,0.4)] scale-102 border border-white/20'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent'
              }`}
            >
              <span className="text-base">{corridor.flag}</span>
              <span>{corridor.name}</span>
            </button>
          );
        })}
      </div>

      {/* Corridor Deep-Dive Bento Card */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-white/[0.01] border border-white/15 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden ring-1 ring-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(37,124,255,0.12),_transparent_70%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Column: Corridor Header & Main Value */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257CFF]/20 border border-[#257CFF]/40 text-xs font-bold text-[#4DA5EC]">
                <Globe2 className="w-3.5 h-3.5" />
                <span>{active.region}</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-white flex items-center gap-3">
                <span>{active.flag}</span>
                <span>{active.name}</span>
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                {active.universitiesCount}
              </p>
            </div>

            {/* Pathways list */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Primary Sovereign Pathways We Structure:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {active.primaryPathways.map((pathway, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 flex items-start gap-2 backdrop-blur-md"
                  >
                    <Check className="w-3.5 h-3.5 text-[#4DA5EC] flex-shrink-0 mt-0.5" />
                    <span>{pathway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consular Focus Audit */}
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Consular Veracity &amp; File Audit Mandate
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {active.consularFocus}
              </p>
            </div>
          </div>

          {/* Right Column: Key Operational Metrics & Partner Logo */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" />
                Institutional Alliances
              </div>

              {active.partnerImage && (
                <div className="relative w-full h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-3 flex items-center justify-center">
                  <Image
                    src={active.partnerImage}
                    alt={active.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {active.partnerHighlights}
              </p>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-left">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Average Timeline</div>
                  <div className="text-xs font-bold text-white mt-0.5">{active.processingTimeline}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Tuition / Earnings</div>
                  <div className="text-xs font-bold text-[#4DA5EC] mt-0.5">{active.scholarshipRate}</div>
                </div>
              </div>
            </div>

            <Link
              href={ROUTES.assessment}
              className="w-full group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Assess eligibility for {active.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3. The 4-Stage Forensic Dossier Protocol ── */
export function ForensicProtocol() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Sovereign Pre-Check & Forensic Profile Audit',
      subtitle: 'Rigorous 48-Hour Legal & Risk Vetting',
      desc: 'Before accepting any retainer, our compliance auditors rigorously scrutinize your travel history, educational credentials, home ties, and previous visa refusals. We reject files that rely on falsified records or deceptive claims.',
      deliverables: [
        'Comprehensive 14-point refusal risk audit',
        'Official educational verification (WAEC/NECO/Degree)',
        'Sovereign immigration policy alignment report',
      ],
      icon: ShieldCheck,
      color: 'text-[#4DA5EC]',
      bg: 'bg-[#257CFF]/15',
    },
    {
      num: '02',
      title: 'Bilateral University / Employer Matching',
      subtitle: 'Direct Institutional Admissions & Sponsorship',
      desc: 'We bypass unregulated third-party recruiters. Your dossier is placed directly before authorized admissions boards at our European partner institutions or licensed employers holding legitimate foreign labor quotas.',
      deliverables: [
        'Direct institutional offer letter / CAS / OK-to-Board',
        'Transparent tuition scholarship allocation (50%–75%)',
        'Authentic job contract with labor authority validation',
      ],
      icon: Building2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
    },
    {
      num: '03',
      title: 'Financial Forensics & Ministerial Legalization',
      subtitle: 'Airtight Proof-of-Funds & MFA Attestation',
      desc: 'Consular officers scrutinize bank accounts for irregular lump sums and fake certificates. We guide you through legitimate proof-of-funds seasoning, source-of-wealth documentation, and complete Ministry of Foreign Affairs legalization in Abuja.',
      deliverables: [
        '28-day seasoned bank statement forensic audit',
        'Ministry of Foreign Affairs (MFA) Abuja document legalization',
        'High Court affidavit and police clearance certificate',
      ],
      icon: FileCheck2,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15',
    },
    {
      num: '04',
      title: 'Consular Simulation & Sovereign Submission',
      subtitle: 'Mock Interviews & Biometric File Handover',
      desc: 'We conduct 1-on-1 consular interview simulations mirroring exact questions asked at foreign embassies in Abuja and Lagos. You walk into your appointment confident, articulate, and backed by a flawless physical dossier.',
      deliverables: [
        '3 tailored mock consular interview sessions',
        'Chronologically bound and indexed physical dossier',
        'Real-time biometric tracking and post-submission monitoring',
      ],
      icon: Award,
      color: 'text-[#F98864]',
      bg: 'bg-[#F45A2A]/15',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((s, idx) => {
          const isCurrent = activeStep === idx;
          const Icon = s.icon;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border ${
                isCurrent
                  ? 'bg-gradient-to-b from-[#18233C] via-[#10192D] to-[#0A1020] border-[#257CFF] shadow-[0_10px_30px_rgba(37,124,255,0.25)] ring-1 ring-[#4DA5EC]/40 scale-102'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-black ${isCurrent ? 'text-[#4DA5EC]' : 'text-slate-400'}`}>
                  STAGE {s.num}
                </span>
                <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.color} flex items-center justify-center border border-white/10`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h4 className={`font-heading font-bold text-xs sm:text-sm line-clamp-1 ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                {s.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-normal">
                {s.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-xs text-[#4DA5EC] font-mono font-bold">
              <span>PROTOCOL STAGE {steps[activeStep].num} OF 04</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
              {steps[activeStep].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="w-full lg:w-96 p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#4DA5EC] flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#4DA5EC]" />
              Verified Protocol Deliverables
            </div>
            <ul className="space-y-2.5">
              {steps[activeStep].deliverables.map((item, i) => (
                <li key={i} className="text-xs text-slate-200 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
