import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

const reviews = [
  {
    name: "Christopher E.",
    role: "Work Permit & Overseas Employment",
    text: "SIJAM Consults Limited made the process of getting my work permit so easy. They were very knowledgeable and helpful, keeping me updated on every single step of the process. Highly recommended!",
    country: "Schengen Europe",
  },
  {
    name: "John Braun",
    role: "Study Visa Admissions",
    text: "I was very impressed with the speed and professionalism provided by SIJAM Consults. They helped me secure my university admission and student visa efficiently with zero document omissions.",
    country: "Cyprus West University",
  },
  {
    name: "Vatican Bells Pharm Ltd",
    role: "Corporate Executive & Business Travel",
    text: "Sijam handles our corporate travel and document legalization with the utmost confidentiality and accuracy. Their Kaduna office is transparent and reliable.",
    country: "Corporate B2B Client",
  },
];

// Sample of real physical visa stamps copied from local inventory
const visaStamps = [
  { id: "1", file: "/visas/1.png", tag: "Study Visa Grant" },
  { id: "2", file: "/visas/2.png", tag: "Work Permit Issued" },
  { id: "3", file: "/visas/3.png", tag: "Schengen Approval" },
  { id: "4", file: "/visas/4.png", tag: "Visitor Visa Issued" },
  { id: "5", file: "/visas/5.png", tag: "European D-Type" },
  { id: "6", file: "/visas/6.png", tag: "Residency Granted" },
];

export function ProofSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0D0826] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Genuine Physical Approvals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Clients. Verifiable Results.
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3">
            Inspect authentic embassy approval stamps and verified feedback from applicants who achieved their international goals through Sijam.
          </p>
        </div>

        {/* 6-Stamp Proof Gallery ("Visas Done") */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F98864]">
              Recent Visa Approvals Gallery (Personal Data Redacted)
            </h3>
            <Link 
              href="/reviews"
              className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1"
            >
              <span>View All 33 Approved Files</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {visaStamps.map((v) => (
              <div 
                key={v.id}
                className="group relative bg-white/5 rounded-xl p-2 border border-white/10 hover:border-[#F45A2A]/50 transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-white/10">
                  <Image 
                    src={v.file}
                    alt={`Sijam Consults Visa Proof ${v.id}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-center">
                    {v.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div 
              key={i}
              className="bg-[#1A1040] rounded-2xl p-7 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-bold text-white">{r.name}</div>
                <div className="text-[11px] text-[#F98864] font-medium">{r.role}</div>
                <div className="text-[10px] text-white/50">{r.country}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
