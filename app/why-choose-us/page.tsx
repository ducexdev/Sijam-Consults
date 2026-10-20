import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrustBanner } from "@/components/ui/TrustBanner";
import {
  ShieldCheck,
  Award,
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileCheck2,
  Sparkles,
  Lock,
  Ban,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { COMPANY, ROUTES } from "@/lib/routes";
import { VIDEOS } from "@/lib/constants/videos";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Sijam Consults | Accredited International Advisory",
  description:
    "Discover why hundreds of professionals, students, and employers trust Sijam Consults Limited (RC: 1715416). Transparent advisory, no false promises, CAC accredited.",
  keywords: [
    "accredited immigration consultancy in nigeria",
    "why choose sijam consults limited",
    "verified travel agency in kaduna nigeria",
    "reliable study abroad and visa agents",
    "ethical international recruitment standards",
    "Sijam Consults trust",
  ],
  alternates: {
    canonical: "https://sijamconsults.com/why-choose-us",
  },
};

export default function WhyChooseUsPage() {
  const pillars = [
    {
      num: "01",
      title: "Corporate Affairs Commission Registered",
      description: "Fully incorporated legal entity under Nigerian corporate law (RC: 1715416). We operate from an open, verifiable corporate office in Kaduna where you meet our leadership team face-to-face.",
      icon: ShieldCheck,
      highlight: "RC: 1715416 Verified",
    },
    {
      num: "02",
      title: "Pre-Submission Zero-Omission Audit",
      description: "Every visa refusal inflicts long-term damage on your passport history. Our consular compliance desk cross-examines every date, bank record, and sponsorship document against active refusal matrices.",
      icon: FileCheck2,
      highlight: "Refusal Prevention",
    },
    {
      num: "03",
      title: "Direct Bilateral Academic Ties",
      description: "Direct official recruitment partnerships with accredited overseas universities including Cyprus West University (CWU) and Polish institutions. Genuine admission letters with merit scholarship quotas up to 50%.",
      icon: Award,
      highlight: "No Sub-Agent Markups",
    },
    {
      num: "04",
      title: "Authentic European Business Formation",
      description: "We connect Nigerian executives directly with licensed European legal counsel to establish Polish Sp. z o.o. corporations and secure lawful Schengen National D-Visas with zero intermediary falsification.",
      icon: Building2,
      highlight: "European Single Market",
    },
    {
      num: "05",
      title: "Consular Mock Interview Coaching",
      description: "We don't simply hand you paperwork. We conduct intensive 1-on-1 simulated interviews preparing you for high-probability consular queries, home ties articulation, and calm non-verbal posture.",
      icon: Users,
      highlight: "1-on-1 Simulation",
    },
    {
      num: "06",
      title: "Strict Anti-Fraud Transparency",
      description: "Zero hidden surcharges, zero fabricated bank statements. Every statutory embassy fee, biometric charge, and professional advisory milestone is declared in writing upfront with formal receipts.",
      icon: Ban,
      highlight: "Zero Faked Docs",
    },
  ];

  const comparison = [
    { criteria: "Corporate Legal Status", sijam: "CAC Registered Limited Company (RC: 1715416) with physical Kaduna HQ", others: "Informal street agents, anonymous social media accounts, no physical trace" },
    { criteria: "Document Policy", sijam: "100% authentic civil & financial records. Zero forged paperwork.", others: "Fabricated statements of account resulting in 10-year embassy fraud bans" },
    { criteria: "Payment Structure", sijam: "Milestone-based, clearly defined advisory scope with official receipts", others: "Opaque lump-sum demands with false 'guaranteed visa' promises" },
    { criteria: "Institutional Links", sijam: "Direct bilateral agreements with accredited European universities", others: "Unlicensed sub-agents buying offer letters through intermediaries" },
    { criteria: "Client Data Privacy", sijam: "NDPR 2023 certified handling. Data encrypted and protected", others: "Passports and sensitive financials shared across insecure WhatsApp groups" },
  ];

  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* 1. Cinematic Hero Section with Ambient Video */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-125"
              src={VIDEOS.SIJAM_CONSULT_LIMITED}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Why Choose Sijam' }]} />
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Institutional Excellence • CAC Registered RC: 1715416</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Why Discerning Clients Choose{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Sijam Consults
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                International relocation is a life-defining investment. We replace guesswork and anxious waiting with forensic document audits, transparent counsel, and authentic institutional pathways.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Six Core Pillars Grid */}
        <section className="py-16 bg-[#0B071E] border-b border-purple-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F98864]">Our Foundational Standards</span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mt-1">
                An Uncompromising Standard of Integrity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="p-8 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#402493] to-[#2D186B] group-hover:from-[#F45A2A] group-hover:to-[#DD4819] text-white flex items-center justify-center font-heading font-black text-base shadow transition-colors">
                          {pillar.num}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F98864] bg-[#F45A2A]/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                          {pillar.highlight}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-[#F98864] transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. The Forensic Comparison Matrix: Sijam vs Street Agents */}
        <section className="py-16 bg-[#070415] border-b border-purple-950/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F98864]">Objective Comparison</span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                The Sijam Difference vs Unregistered Agents
              </h2>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="p-4 sm:p-5 font-heading font-bold text-slate-300 uppercase tracking-wider text-[11px] w-1/4">Evaluation Criteria</th>
                    <th className="p-4 sm:p-5 font-heading font-bold text-[#F98864] uppercase tracking-wider text-[11px] w-5/12 bg-[#402493]/20 border-x border-white/10">Sijam Consults Limited</th>
                    <th className="p-4 sm:p-5 font-heading font-bold text-slate-400 uppercase tracking-wider text-[11px] w-1/3">Street / Unregistered Agents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparison.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-white">{row.criteria}</td>
                      <td className="p-4 sm:p-5 bg-[#402493]/10 border-x border-white/10 text-slate-200">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.sijam}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-4">
              <Link
                href={ROUTES.consultation}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all border border-[#4DA5EC]/30"
              >
                <span>Schedule Confidential Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Trust Banner & Disclaimer */}
        <section className="py-12 bg-[#0B071E]">
          <div className="max-w-4xl mx-auto px-4">
            <TrustBanner showFullDisclaimer={false} />
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
