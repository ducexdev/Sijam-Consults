import React from "react";
import Link from "next/link";
import { ClipboardCheck, FileSearch, Send, PlaneTakeoff, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Eligibility Assessment",
    desc: "Complete our quick qualification review online or at our Kaduna office. We assess your background against current embassy immigration policies.",
    icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Document Verification",
    desc: "Our compliance team audits your credentials, bank statements, and legal records to ensure 100% completeness before embassy submission.",
    icon: FileSearch,
  },
  {
    step: "03",
    title: "Application & Interview Prep",
    desc: "We assist with formal visa filing, biometrics appointment scheduling, and conduct mock consular interview coaching to build confidence.",
    icon: Send,
  },
  {
    step: "04",
    title: "Visa Grant & Departure",
    desc: "Upon visa approval, we assist with verifiable flight booking, travel health insurance, and pre-departure briefings for your new destination.",
    icon: PlaneTakeoff,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F45A2A] mb-2">
            The Sijam Method
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            How Our 4-Step Process Works
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-3">
            A transparent, ethical roadmap designed to eliminate uncertainty from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="relative bg-[#FAF8FF] rounded-2xl p-7 border border-[#402493]/10 flex flex-col justify-between hover:border-[#F45A2A]/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-[#402493]/30 group-hover:text-[#F45A2A] transition-colors">
                      {s.step}
                    </span>
                    <div className="p-3 rounded-xl bg-white shadow-sm text-[#402493] group-hover:bg-[#402493] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-3">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link 
            href="/assessment" 
            className="inline-flex items-center gap-2 bg-[#402493] hover:bg-[#5B37B8] text-white text-xs uppercase tracking-wider font-bold px-7 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Begin Step 1: Free Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
