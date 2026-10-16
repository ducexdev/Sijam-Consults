'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { 
  Plane, 
  Ticket,
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Luggage,
  RefreshCw,
  HelpCircle,
  PhoneCall,
  Play,
  Pause,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Handshake,
  Check,
  FileText,
  Globe2,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { VIDEOS } from "@/lib/constants/videos";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FlightBookingWidget } from "@/components/flight/FlightBookingWidget";
import { EverbrightAllianceSection } from "@/components/flight/EverbrightAllianceSection";

export default function FlightReservationsPage() {
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

  const flightFeatures = [
    {
      icon: Ticket,
      title: "Embassy-Ready Flight Reservation",
      tagline: "Live 6-Character GDS PNR",
      desc: "Legitimate airline seat reservations verifiable directly on carrier portals (Qatar, Emirates, Turkish, Ethiopian, Lufthansa) without purchasing expensive airfare upfront.",
      benefits: ["Official GDS PNR code", "Active hold for visa processing window", "Full passenger name & flight numbers"],
    },
    {
      icon: Plane,
      title: "Commercial Flight Ticketing",
      tagline: "Upon Visa Issuance",
      desc: "Instant conversion of your reservation to a fully confirmed electronic ticket across major global airlines at competitive corporate consolidator rates.",
      benefits: ["Direct airline inventory", "Transparent fare breakdown", "Instant electronic ticket receipt"],
    },
    {
      icon: Luggage,
      title: "Student & Expatriate Baggage Perks",
      tagline: "Up to 46kg Allowance",
      desc: "Special bilateral fare categories tailored for overseas students and relocated workers, granting additional baggage allowances and flexible date re-booking.",
      benefits: ["Extra baggage allowance (up to 46kg)", "Reduced date rebooking fees", "One-way student fares"],
    },
    {
      icon: RefreshCw,
      title: "Flight Rerouting & Transit Advisory",
      tagline: "24/7 Ticketing Support",
      desc: "Multi-city flight itineraries, layover optimization, transit visa guidance (e.g. UK DATV or Schengen airport transit), and emergency schedule changes.",
      benefits: ["Transit visa requirement audit", "Connection time optimization", "24/7 emergency rescheduling"],
    },
  ];

  const comparisonRows = [
    {
      feature: "Verifiable on Official Airline Website",
      sijamEverbright: true,
      dummyTicket: false,
      fullTicket: true,
      note: "Sijam & Everbright hold live GDS inventory accessible via airline 'Manage Booking' portals.",
    },
    {
      feature: "Financial Risk if Visa is Refused",
      sijamEverbrightText: "Zero Risk (Nominal fee only)",
      dummyTicketText: "Zero airfare, but high risk of visa refusal",
      fullTicketText: "Severe Risk (Loss of ₦800k - ₦3M+ in penalties)",
      sijamEverbright: true,
      dummyTicket: false,
      fullTicket: false,
    },
    {
      feature: "Consular & Embassy Compliance",
      sijamEverbright: true,
      dummyTicket: false,
      fullTicket: true,
      note: "Accepted across Schengen (VFS/TLS), UKVI, US Embassy, and Canadian IRCC.",
    },
    {
      feature: "Protection Against Fraud Allegations",
      sijamEverbright: true,
      dummyTicket: false,
      fullTicket: true,
      note: "Embassies verify fake dummy tickets and issue 5-to-10 year bans for fraudulent documents.",
    },
    {
      feature: "Instant Turnaround (Within 60–120 Mins)",
      sijamEverbright: true,
      dummyTicket: false,
      fullTicket: false,
      note: "Fast-track electronic delivery directly to your WhatsApp and email.",
    },
    {
      feature: "Post-Visa Ticket Conversion Guarantee",
      sijamEverbright: true,
      dummyTicket: false,
      fullTicket: true,
      note: "Seamless upgrade to confirmed commercial ticket with student/expatriate perks.",
    },
  ];

  const consularDestinations = [
    {
      region: "Schengen Area (EU)",
      countries: "Poland, France, Germany, Italy, Spain, Slovakia, Portugal, Netherlands",
      requirement: "Round-trip flight reservation covering all Schengen member entries and exits.",
    },
    {
      region: "United Kingdom (UKVI)",
      countries: "England, Scotland, Wales, Northern Ireland",
      requirement: "Travel itinerary demonstrating departure/arrival intent matching sponsorship Certificate (CoS) or CAS.",
    },
    {
      region: "Canada (IRCC)",
      countries: "Ontario, Alberta, Quebec, British Columbia, Nova Scotia",
      requirement: "Flight itinerary establishing compliance with temporary resident intent or study permit resumption.",
    },
    {
      region: "United States (US Embassy)",
      countries: "All 50 States & Territories (B1/B2, F1, J1, H1B)",
      requirement: "Tentative travel itinerary matching DS-160 declarations without requiring non-refundable purchase.",
    },
    {
      region: "Gulf & Middle East (GCC)",
      countries: "Saudi Arabia, UAE, Qatar, Oman, Bahrain",
      requirement: "Direct or transit flight booking matching employment work visa quota or tourist entry.",
    },
    {
      region: "Australia & New Zealand",
      countries: "Australia (Subclass 500, 482) & New Zealand",
      requirement: "Valid travel plan aligning with academic course start dates and genuine temporary entrant standards.",
    },
  ];

  const faqs = [
    {
      q: "Who is Everbright Travels & Consultants Limited and what is their role with Sijam Consults?",
      a: "Everbright Travels & Consultants Limited is Sijam Consults Limited’s official strategic partner for international flight reservation and aviation ticketing. Operating under their motto '...Simplifying Your World', Everbright provides direct Global Distribution System (GDS) terminal access (Amadeus and Sabre). This alliance ensures that every flight reservation issued through Sijam is backed by live airline inventory with verifiable PNR codes, fast 60–120 minute dispatch, and preferential student and worker baggage rates upon visa approval.",
    },
    {
      q: "What is the difference between a flight reservation and a confirmed flight ticket?",
      a: "A flight reservation (also known as a flight itinerary or flight reservation for visa) is an official airline booking that holds a seat on an aircraft with an active 6-character PNR code. It proves your travel intent to embassy visa officers without requiring you to purchase expensive non-refundable airfare before your visa is approved. Once your visa is granted, our joint flight desk converts your reservation into a confirmed electronic ticket (e-ticket).",
    },
    {
      q: "Can visa consular officers verify my flight reservation on the airline's website?",
      a: "Yes! Every flight reservation generated by Sijam Consults and Everbright Travels includes an authentic 6-character PNR booking code. You, as well as the consular officer at VFS, TLScontact, or the embassy, can visit the operating airline's official portal (such as Qatar Airways, Turkish Airlines, Emirates, or Ethiopian Airlines), enter your surname and PNR under 'Manage Booking', and see the live aircraft reservation.",
    },
    {
      q: "How fast can I receive my verifiable flight reservation for an upcoming appointment?",
      a: "Our joint ticketing desk operates with expedited turnaround. Standard flight reservation itineraries with active PNRs are generated and dispatched to your email and WhatsApp within 60 to 120 minutes of request. Urgent appointments can be expedited by contacting our flight desk directly.",
    },
    {
      q: "How long does the flight reservation stay active in the airline system?",
      a: "Depending on the operating airline's fare rules and proximity to departure, reservations remain active in the GDS system for anywhere between 7 to 14 days. If your embassy processing requires an extended validity or refreshed itinerary, our desk provides updates upon request.",
    },
    {
      q: "What student and worker benefits are available when converting to a paid ticket?",
      a: "Through Everbright Travels’ direct consolidator alliances, international students heading to Europe, the UK, or Canada enjoy pre-negotiated excess baggage allowances of up to 40kg–46kg (2 pieces of 23kg), flexible date change terms in case of delayed visa pickup, and special youth/student fares.",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: 'Flight Reservation & Ticketing', href: '/services/flight-reservations' },
        ]}
      />

      {/* Embedded Schema.org Service & Partner Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Verifiable Flight Reservation and Ticketing',
            serviceType: 'Flight Reservation & Ticketing',
            provider: {
              '@type': 'Organization',
              name: 'Sijam Consults Limited',
              url: 'https://sijamconsults.com',
              logo: 'https://sijamconsults.com/brand/logo.png',
            },
            partner: {
              '@type': 'Organization',
              name: 'Everbright Travels & Consultants Limited',
              url: 'https://sijamconsults.com/services/flight-reservations',
              logo: 'https://sijamconsults.com/partners/everbright-travels-logo.png',
              description: 'Official Aviation & Ticketing Strategic Partner (...Simplifying Your World)',
            },
            areaServed: 'Nigeria, West Africa & Global Destinations',
            description:
              'Official embassy-ready flight reservations with verifiable 6-character GDS PNR codes (Amadeus & Sabre) and commercial flight ticketing. In certified alliance with Everbright Travels & Consultants Limited.',
          }),
        }}
      />

      <PublicLayout>
        {/* 1. Cinematic Video Hero Section */}
        <section className="relative min-h-[90vh] flex items-center text-white border-b border-purple-950/80 overflow-hidden bg-[#070415]">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/visas/1.png"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
              onCanPlay={(e) => {
                if (isPlaying) e.currentTarget.play().catch(() => {});
              }}
            >
              <source src={VIDEOS.FLIGHT_RESERVATIONS} type="video/mp4" />
            </video>
            {/* Dark Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070415]/95 via-[#070415]/70 to-[#070415]/30" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070415] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070415] to-transparent" />
          </div>

          {/* Video Play/Pause Control */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              type="button"
              onClick={toggleVideo}
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
              className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-[11px] font-medium text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isPlaying ? 'Pause' : 'Play'} Video</span>
              {isPlaying ? <Pause className="w-3 h-3 ml-0.5" /> : <Play className="w-3 h-3 ml-0.5" />}
            </button>
          </div>

          {/* Hero Content Grid */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headings & Value Props */}
              <div className="lg:col-span-7 space-y-6">
                {/* Official Co-Branded Trust Badge */}
                <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/20 text-xs text-white">
                  <Handshake className="w-4 h-4 text-[#4DA5EC]" />
                  <span className="font-bold">Aviation Strategic Alliance:</span>
                  <span className="text-[#4DA5EC] font-semibold">Everbright Travels &amp; Consultants Limited</span>
                </div>

                <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] drop-shadow-xl">
                  Verifiable{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-cyan-300 to-[#257CFF]">
                    Flight Reservation
                  </span>{' '}
                  &amp; Ticketing in Nigeria
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal drop-shadow-sm max-w-2xl">
                  Never risk purchasing expensive non-refundable airfare before your visa is approved. In strategic partnership with <strong className="text-white">Everbright Travels &amp; Consultants Limited</strong>, Sijam Consults provides 100% embassy-verifiable flight reservations with live Global Distribution System (GDS) PNR codes, followed by seamless commercial flight ticketing upon visa grant.
                </p>

                {/* 3 Quick Guarantees */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/[0.06] p-3 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Live GDS PNR</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Verifiable on airline portals</div>
                  </div>
                  <div className="bg-white/[0.06] p-3 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="text-xs font-bold text-[#4DA5EC] flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>60–120 Mins</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Rapid electronic dispatch</div>
                  </div>
                  <div className="bg-white/[0.06] p-3 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Luggage className="w-4 h-4" />
                      <span>46kg Student Baggage</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Special allowance discounts</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#booking-widget"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-cta transition-transform hover:scale-[1.02] border border-[#4DA5EC]/30"
                  >
                    <span>Request Flight Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/2347064229556?text=${encodeURIComponent(
                      "Hello Sijam Consult & Everbright Travels Desk, I need a verifiable Flight Reservation for my visa application."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-xs px-6 py-4 rounded-xl border border-white/20 transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>Chat With Flight Ticketing Desk</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Partner Card Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl p-6 sm:p-7 bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-2xl space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Certified Aviation Partner
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">AMADEUS / SABRE</span>
                  </div>

                  {/* Logo Display on Card */}
                  <div className="p-4 rounded-2xl bg-white flex items-center justify-center border border-white/20 shadow-lg">
                    <div className="relative h-14 w-56">
                      <Image
                        src="/partners/everbright-travels-logo.png"
                        alt="Everbright Travels & Consultants Limited"
                        fill
                        sizes="224px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <h3 className="font-heading font-bold text-lg text-white">
                      Everbright Travels &amp; Consultants Limited
                    </h3>
                    <p className="text-xs text-purple-200/90 italic font-medium">
                      “...Simplifying Your World”
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      Official aviation consolidator partner providing direct ticketing terminal access, live GDS seat holds, embassy-compliant itineraries, and worldwide flight ticketing.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-950/50 border border-purple-500/20 space-y-1.5 text-xs">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% Genuine Airline Inventory</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Never photoshopped dummy tickets. Always authentic PNR codes that withstand strict consular audits.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Flight Booking Engine */}
        <section id="booking-widget" className="py-16 sm:py-20 bg-[#FAF8FF] border-b border-slate-200 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#257CFF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                Interactive Booking Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-3">
                Configure Your Flight Itinerary or Ticketing Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Select your route, travel class, and dates. Our joint Sijam &amp; Everbright ticketing team will generate and dispatch your verified GDS PNR.
              </p>
            </div>

            <FlightBookingWidget />
          </div>
        </section>

        {/* 3. Dedicated Everbright Bilateral Alliance Section */}
        <EverbrightAllianceSection />

        {/* 4. Comparison Matrix: Sijam & Everbright vs Fake Dummy Tickets vs Buying Full Ticket Early */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#257CFF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                Consular Safety &amp; Risk Advisory
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Why Verifiable GDS Reservations Are Essential
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Visa application centers (VFS Global, TLScontact, BLS) and consular officers cross-check every flight reservation. See how Sijam &amp; Everbright protect you compared to fraudulent dummy tickets or premature ticket purchases.
              </p>
            </div>

            {/* Responsive Table / Comparison Grid */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4 sm:p-5 text-slate-700 min-w-[220px]">Verification &amp; Financial Factor</th>
                    <th className="p-4 sm:p-5 bg-blue-50/60 text-[#257CFF] border-x border-blue-200/80 min-w-[220px]">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#257CFF]" />
                        <span>Sijam &amp; Everbright GDS Itinerary</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 text-red-600 min-w-[180px]">Fake / Dummy Generator Tickets</th>
                    <th className="p-4 sm:p-5 text-slate-600 min-w-[180px]">Buying Full Ticket Before Visa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-slate-900">
                        {row.feature}
                        {row.note && (
                          <div className="text-[11px] font-normal text-slate-500 mt-0.5">{row.note}</div>
                        )}
                      </td>

                      {/* Sijam & Everbright Column */}
                      <td className="p-4 sm:p-5 bg-blue-50/30 border-x border-blue-200/50 font-bold text-slate-900">
                        {row.sijamEverbrightText ? (
                          <span className="text-emerald-700 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{row.sijamEverbrightText}</span>
                          </span>
                        ) : row.sijamEverbright ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Guaranteed</span>
                          </span>
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-400" />
                        )}
                      </td>

                      {/* Dummy Generator Column */}
                      <td className="p-4 sm:p-5 text-slate-600">
                        {row.dummyTicketText ? (
                          <span className="text-red-700 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                            <span>{row.dummyTicketText}</span>
                          </span>
                        ) : row.dummyTicket ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-red-700 font-medium">
                            <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                            <span>Unverifiable (High Ban Risk)</span>
                          </span>
                        )}
                      </td>

                      {/* Buying Full Ticket Too Early */}
                      <td className="p-4 sm:p-5 text-slate-600">
                        {row.fullTicketText ? (
                          <span className="text-amber-800 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>{row.fullTicketText}</span>
                          </span>
                        ) : row.fullTicket ? (
                          <span className="inline-flex items-center gap-1.5 text-slate-800">
                            <Check className="w-4 h-4 text-slate-600" />
                            <span>Yes, but unnecessary</span>
                          </span>
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-400" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Core Aviation & Ticketing Capabilities (4 Pillars) */}
        <section className="py-20 bg-[#FAF8FF] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#257CFF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                Aviation &amp; Travel Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Full-Spectrum Flight Reservation &amp; Ticketing
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                From embassy visa itineraries to intercontinental flight departures, we manage every detail with certified precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flightFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#257CFF] flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                          {feat.tagline}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-heading font-bold text-lg text-slate-900">
                          {feat.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        {feat.benefits.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Consular Standards Across World Corridors */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#257CFF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                Diplomatic Acceptance Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Flight Reservation Requirements by Embassy &amp; Jurisdiction
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Every destination country enforces unique criteria for itinerary submissions. Our joint ticketing desk configures routes precisely to embassy requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consularDestinations.map((dest, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#257CFF]">
                        {dest.region}
                      </span>
                      <Globe2 className="w-4 h-4 text-slate-400" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {dest.countries}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dest.requirement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Comprehensive FAQs */}
        <section className="py-20 bg-[#FAF8FF] border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#257CFF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Flight Reservation &amp; Ticketing FAQs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                Clear answers regarding our partnership with Everbright Travels &amp; Consultants Limited, PNR verifiability, and student discounts.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#257CFF] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Bottom CTA Section with Co-Branded Alliance Notice */}
        <section className="py-20 bg-[#09051C] text-white text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#257CFF]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs text-purple-200">
              <Handshake className="w-4 h-4 text-[#4DA5EC]" />
              <span>Sijam Consults &amp; Everbright Travels Joint Aviation Desk</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Need a Verifiable Flight Reservation for Your Upcoming Embassy Date?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Our joint Kaduna ticketing desk generates and delivers authenticated airline PNR itineraries across Nigeria within 60 to 120 minutes.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="#booking-widget"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-cta border border-[#4DA5EC]/30 transition-transform hover:scale-[1.02]"
              >
                <span>Request Flight Reservation Online</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/2347064229556?text=${encodeURIComponent(
                  "Hello Sijam Consult & Everbright Travels Desk, I need urgent flight reservation and ticketing assistance."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-7 py-4 rounded-xl border border-white/20 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Contact Flight Desk on WhatsApp</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-slate-400">
              Official Bilateral Partner: <strong>Everbright Travels &amp; Consultants Limited</strong> (...Simplifying Your World) • Sijam Consults Limited (CAC RC: 1715416)
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
}
