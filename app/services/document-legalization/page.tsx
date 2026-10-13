'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Award,
  Clock,
  Play,
  Pause,
} from "lucide-react";


export default function DocumentLegalizationPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: 'Travel Document Legalization', href: '/services/document-legalization' },
        ]}
      />
      <div className="min-h-screen flex flex-col bg-[#FAF8FF]">
        <Navbar />

      <main className="flex-1">

        {/* ── Cinematic Video Hero ── */}
        <section className="relative min-h-[85vh] flex items-center text-white border-b border-white/10 overflow-hidden">

          {/* Video Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/visas/2.png"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
              onCanPlay={(e) => {
                if (isPlaying) e.currentTarget.play().catch(() => {});
              }}
            >
              <source src="/videos/Travel-Document-Legalization-Notarization.mp4" type="video/mp4" />
            </video>
            {/* Lean left-only overlay — text contrast left, transparent right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070415]/80 via-[#070415]/35 to-transparent" />
            {/* Top scrim to blend with navbar */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070415]/70 to-transparent" />
            {/* Bottom fade into next section */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070415]/80 to-transparent" />
          </div>

          {/* Ambient Video Toggle */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              type="button"
              onClick={toggleVideo}
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
              className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-medium text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isPlaying ? 'Pause' : 'Play'} Ambient Motion</span>
              {isPlaying ? <Pause className="w-3 h-3 ml-0.5" /> : <Play className="w-3 h-3 ml-0.5" />}
            </button>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-[#F98864] mb-6">
                <FileCheck className="w-4 h-4" />
                <span>Government Authentication Services</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                Travel Document Legalization,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  MFA Attestation
                </span>{' '}
                &amp; Notarization
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 drop-shadow-sm">
                Eliminate the hassle of navigating federal ministries in Abuja. Sijam Consults handles official document notarization at High Courts, authentication at the Ministry of Foreign Affairs (MFA Abuja), and consular legalization at foreign embassies in Nigeria.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-cta transition-transform hover:scale-[1.02] border border-[#4DA5EC]/30"
                >
                  <span>Request Document Legalization</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/2347064229556?text=Hello%20Sijam%20Consults%2C%20I%20have%20documents%20that%20need%20MFA%20Abuja%20legalization."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-xs px-6 py-3.5 rounded-xl border border-white/20 transition-colors"
                >
                  <span>WhatsApp Documentation Officer</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories of Documents Handled */}
        <section className="py-20 bg-white border-b border-[#402493]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F45A2A]">
                Official Records
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mt-2">
                Documents We Authenticate &amp; Legalize
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Academic & Professional Credentials", list: ["WAEC / NECO / NABTEB Certificates", "University Degree Diplomas & Transcripts", "Nursing & Midwifery Council Certifications", "Professional Board Registrations"] },
                { title: "Civil & Vital Statistics Records", list: ["National Population Commission (NPC) Birth Records", "Statutory Declarations of Age", "Federal Marriage Registry Certificates", "Affidavits of Bachelorhood / Spinsterhood"] },
                { title: "Legal & Police Clearance Records", list: ["Nigeria Police Force Criminal Record Clearances", "High Court Notarial Attestations", "Corporate CAC Status Certificates", "Commercial Power of Attorney Deeds"] },
              ].map((cat, idx) => (
                <div key={idx} className="p-7 rounded-2xl bg-[#FAF8FF] border border-[#402493]/10 space-y-4">
                  <h3 className="text-base font-bold text-[#0F172A]">{cat.title}</h3>
                  <ul className="space-y-2 text-xs text-[#475569]">
                    {cat.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Turnaround & Process */}
        <section className="py-20 bg-[#FAF8FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F45A2A]">
                Fast Turnaround
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mt-2">
                Our 3-Stage Authentication Flow
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { num: "1", title: "Intake & Notarial Verification", desc: "Submit physical or certified copies at our Kaduna office. Documents undergo initial High Court notarization by a Notary Public." },
                { num: "2", title: "Ministry of Foreign Affairs (MFA Abuja) Attestation", desc: "Our liaison officers in Abuja submit your files directly to the Legal Services Division of the MFA for official seal and signature." },
                { num: "3", title: "Embassy Legalization & Secure Delivery", desc: "Files are presented to the destination foreign embassy in Nigeria for final legalization, then returned securely via tracked courier." },
              ].map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#402493]/10 shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#402493] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">{step.title}</h3>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-cta border border-[#4DA5EC]/30"
              >
                <span>Submit Documents for Legalization</span>
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
