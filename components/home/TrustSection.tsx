import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Award, Building, ArrowRight } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#1A1040] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official CAC Certificate Viewer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white p-3 group">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <Image 
                  src="/brand/cac-certificate.png" 
                  alt="Sijam Consults Limited CAC Certificate of Incorporation RC: 1715416"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="pt-3 pb-1 px-2 text-center text-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-[#402493]">
                  Federal Republic of Nigeria
                </div>
                <div className="text-[11px] text-slate-600">
                  Corporate Affairs Commission Certificate of Incorporation • RC: 1715416
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 leading-relaxed text-center">
              Official corporate registration guarantees legal accountability and consumer protection under Nigerian commercial law.
            </div>
          </div>

          {/* Right Column: 4 Trust Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F98864] mb-3">
                Uncompromising Authenticity
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Why Discerning Clients Entrust Their Future to SIJAM
              </h2>
              <p className="text-base text-white/70 leading-relaxed">
                We reject fabricated shortcuts and unverified promises. Our advisory approach is rooted in rigorous compliance, embassy requirements auditing, and lawful global mobility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#F45A2A]/20 text-[#F45A2A]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Pre-Submission Audit</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Every document, financial statement, and application form undergoes rigorous verification to eliminate grounds for refusal.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#402493]/40 text-[#F98864]">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Verified Track Record</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Over 33 authentic visa approvals on physical file across European study, work permits, and residency programs.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Kaduna Headquarters</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Physical walk-in corporate office in Kaduna where you meet accredited consultants face-to-face.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Institutional Partners</h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Direct recruitment alliances with institutions like Cyprus West University and NOVARIC Academy.
                </p>
              </div>

            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#F98864] hover:text-white transition-colors"
              >
                <span>Read Full Company Profile & Leadership Bios</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
