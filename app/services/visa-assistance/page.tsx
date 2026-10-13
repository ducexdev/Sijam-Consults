import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Search,
  UserCheck
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Visa Application Assistance & File Audit',
    description: 'Pre-submission visa application review, document audits, and intensive mock interview coaching for self-applying clients in Nigeria.',
    path: '/services/visa-assistance',
  });
}


export default function VisaAssistancePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: 'Visa Application Assistance', href: '/services/visa-assistance' },
        ]}
      />
      <div className="min-h-screen flex flex-col bg-[#FAF8FF]">
        <Navbar />

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="bg-[#0D0826] text-white py-16 lg:py-24 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#402493]/50 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#F98864] mb-4">
                <FileCheck className="w-4 h-4" />
                <span>Zero-Omission Verification</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Visa Application Review & File Audit Assistance
              </h1>

              <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-8">
                Applying on your own? Don&apos;t let avoidable clerical errors, inconsistent financial figures, or unarticulated home ties cause a permanent refusal on your record. Have our senior compliance officers audit your application package and conduct realistic mock consular interviews.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/consultation" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-cta transition-transform hover:scale-[1.02] border border-[#4DA5EC]/30"
                >
                  <span>Book Application Audit Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a 
                  href="https://wa.me/2347064229556?text=Hello%20Sijam%20Consults%2C%20I%20need%20assistance%20reviewing%20my%20visa%20application%20file."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-6 py-3.5 rounded-xl border border-white/20"
                >
                  <span>WhatsApp a File Auditor</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* The 4 Review Pillars */}
        <section className="py-20 bg-white border-b border-[#402493]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F45A2A]">
                Comprehensive Protection
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mt-2">
                What Our File Audit Covers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Form Data Reconciliation", desc: "Cross-checking every line of your DS-160, Schengen, or IRCC portal form against your physical supporting documents." },
                { title: "Financial Narrative Audit", desc: "Analyzing bank account inflow patterns to identify sudden lump-sum deposits that trigger consular red flags." },
                { title: "SOP & Letter Proofing", desc: "Professional editorial review of your Statement of Purpose, cover letter, or employment justification." },
                { title: "Consular Mock Interview", desc: "Simulated 1-on-1 verbal interview session with tricky consular questions and immediate tactical coaching." },
              ].map((card, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#FAF8FF] border border-[#402493]/10 space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#402493] text-white font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{card.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning on Avoidable Refusals */}
        <section className="py-16 bg-[#1A1040] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F98864]">
              Protect Your Travel History
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              A Single Refusal Can Complicate Future Applications for Years
            </h2>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-2xl mx-auto">
              Consulates across the Five Eyes alliance (US, UK, Canada, Australia, New Zealand) share immigration biometric databases. Investing in professional pre-submission file review is the most effective safeguard for your international mobility.
            </p>
            <div className="pt-4">
              <Link 
                href="/consultation" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-cta border border-[#4DA5EC]/30"
              >
                <span>Schedule a File Audit in Kaduna or Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
    </>
  );
}

