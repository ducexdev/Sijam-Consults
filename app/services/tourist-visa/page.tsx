import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  FileText
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Tourist & Visitor Visa Processing',
    description: 'Expert tourist and visitor visa processing for the UK, US, Schengen Area, Canada, and Dubai with tailored travel itineraries and interview coaching.',
    path: '/services/tourist-visa',
  });
}


export default function TouristVisaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: 'Tourist & Visitor Visa', href: '/services/tourist-visa' },
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
                <Compass className="w-4 h-4" />
                <span>Leisure, Family & Conference Travel</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Tourist & Visitor Visa Processing
              </h1>

              <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-8">
                Plan your holiday, family visit, or international trade conference with peace of mind. We prepare comprehensive travel itineraries, hotel booking vouchers, proof-of-funds presentations, and rigorous consular interview coaching for Schengen, UK, US, Dubai, and Canada visas.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/consultation" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-cta transition-transform hover:scale-[1.02] border border-[#4DA5EC]/30"
                >
                  <span>Book Tourist Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a 
                  href="https://wa.me/2347064229556?text=Hello%20Sijam%20Consults%2C%20I%20would%20like%20to%20apply%20for%20a%20Tourist%20Visa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-6 py-3.5 rounded-xl border border-white/20"
                >
                  <span>WhatsApp Travel Advisor</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tourist Destinations */}
        <section className="py-20 bg-white border-b border-[#402493]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F45A2A]">
                Top Destinations
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mt-2">
                Popular Visitor Visa Categories We Support
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Schengen Short-Stay (C-Type)", places: "France, Germany, Italy, Netherlands, Poland", desc: "Allows seamless multi-country travel across 29 European countries for up to 90 days. Ideal for summer holidays and family visits." },
                { title: "United Kingdom Standard Visitor", places: "England, Scotland, Wales, Northern Ireland", desc: "6-month, 2-year, and 5-year multi-entry visitor visas for holidays, private medical treatments, or professional conferences." },
                { title: "United States (B1/B2) & Canada (TRV)", places: "US & Canadian Consular Posts", desc: "Complete DS-160 and IRCC Portal filing, fee scheduling, financial documentation audits, and intensive mock interview coaching." },
              ].map((dest, idx) => (
                <div key={idx} className="p-7 rounded-2xl bg-[#FAF8FF] border border-[#402493]/10 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white text-[#402493] border border-[#402493]/15">
                    {dest.places}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A]">{dest.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{dest.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tourist Visa Documentation Requirements */}
        <section className="py-20 bg-[#FAF8FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Essential Documentation for Tourist Applicants
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-2">
                Strong evidence of economic and familial ties to Nigeria is required to prevent consular refusals.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#402493]/10 space-y-3.5 text-xs sm:text-sm text-[#0F172A] shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Valid International Passport (with at least 2 blank pages and 6 months validity)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>6 Months Stamped Bank Statements (reflecting verifiable salary or commercial income)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Employment Letter, Approved Leave Clearance & Work ID Card (or CAC business docs for entrepreneurs)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Day-by-Day Travel Itinerary & Proof of Accommodation / Hotel Booking (Arranged by Sijam)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Verifiable Round-Trip Flight Itinerary with Active PNR (Arranged by Sijam)</span>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link 
                href="/consultation" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-cta border border-[#4DA5EC]/30"
              >
                <span>Schedule a Tourist Visa Consultation</span>
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

