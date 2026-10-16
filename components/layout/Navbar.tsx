"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Building2,
  Compass,
  FileCheck,
  Plane,
  Globe,
  BookOpen,
  Star,
  Users,
  Calendar,
  Handshake,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import { ROUTES, COMPANY } from "@/lib/routes";

const SERVICE_LINKS = [
  {
    href: ROUTES.services.studyVisa,
    icon: GraduationCap,
    label: "Study Visa & Admissions",
    desc: "Cyprus, Poland, Canada, UK, Portugal",
    badge: "Popular",
  },
  {
    href: ROUTES.services.workVisa,
    icon: Briefcase,
    label: "Work Permits & Placement",
    desc: "Verified global employer sponsorships",
    badge: "Verified",
  },
  {
    href: ROUTES.services.businessRegistration,
    icon: Building2,
    label: "EU Company Reg & D-Visa",
    desc: "Incorporate in Europe for Schengen residency",
  },
  {
    href: ROUTES.services.touristVisa,
    icon: Compass,
    label: "Tourist & Visitor Visas",
    desc: "Schengen, UK, US, Dubai & Canada",
  },
  {
    href: ROUTES.services.visaAssistance,
    icon: FileCheck,
    label: "File Audit & Mock Interviews",
    desc: "Pre-submission refusal prevention coaching",
  },
  {
    href: ROUTES.services.documentLegalization,
    icon: FileCheck,
    label: "Document Legalization",
    desc: "MFA Abuja & Embassy attestation",
  },
  {
    href: ROUTES.services.flightReservations,
    icon: Plane,
    label: "Flight Reservations",
    desc: "Verifiable itineraries with active PNR",
  },
];

// "More" dropdown — Reviews + Guides
const MORE_LINKS = [
  {
    href: ROUTES.reviews,
    icon: Star,
    label: "Visa Approvals Gallery",
    desc: "Verified client stamp records",
    badge: undefined as string | undefined,
  },
  {
    href: ROUTES.guides.root,
    icon: BookOpen,
    label: "Travel Guides",
    desc: "Immigration & relocation insights",
    badge: undefined as string | undefined,
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#0D0826] text-white/80 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <strong className="text-white">{COMPANY.cacNumber}</strong> Corporate Affairs Commission Registered
            </span>
            <span className="text-white/60">|</span>
            <span>{COMPANY.address.full}</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY.phones.primary.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F45A2A]" />
              <span>{COMPANY.phones.primary}</span>
            </a>
            <span className="text-white/60">|</span>
            <span className="text-white/90">Mon – Sun: 09:00 – 17:00 WAT</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0D0826]/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10"
            : "bg-[#0D0826] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="relative w-44 h-11 transition-transform group-hover:scale-[1.02]"
              style={{ position: "relative" }}
            >
              <Image
                src="/brand/logo-white.png"
                alt="Sijam Consults Limited"
                fill
                className="object-contain object-left"
                priority
                sizes="176px"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">

            {/* Home */}
            <Link
              href={ROUTES.home}
              className="text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-3 py-2 rounded-lg"
            >
              Home
            </Link>

            {/* Services Mega Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-all px-3 py-2 rounded-lg ${
                  servicesOpen
                    ? "text-white bg-white/8"
                    : "text-white/85 hover:text-white hover:bg-white/5"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-white/80" : ""}`}
                />
              </button>

              {/* Services Dropdown Panel */}
              <div
                className={`absolute top-full left-0 mt-1 w-[360px] bg-[#100830] rounded-2xl border border-white/10 shadow-2xl p-2 transition-all duration-200 origin-top ${
                  servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                    <LayoutGrid className="w-3 h-3" /> All Services
                  </span>
                </div>

                <div className="grid gap-0.5">
                  {SERVICE_LINKS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-[#402493]/50 text-purple-300 group-hover:bg-gradient-to-br group-hover:from-[#4DA5EC] group-hover:to-[#257CFF] group-hover:text-white transition-all shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white/90 group-hover:text-white truncate">
                              {s.label}
                            </span>
                            {s.badge && (
                              <span className="text-[9px] font-bold bg-[#4DA5EC]/20 text-[#4DA5EC] px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                {s.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-white/45 mt-0.5">{s.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-white/8 mt-2 pt-2">
                  <Link
                    href={ROUTES.services.root}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#4DA5EC] hover:bg-white/5 transition-all group"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Why Us */}
            <Link
              href={ROUTES.whyChooseUs}
              className="text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-3 py-2 rounded-lg"
            >
              Why Us
            </Link>

            {/* Jobs with "New" badge */}
            <Link
              href={ROUTES.jobs.root}
              className="relative flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-3 py-2 rounded-lg"
            >
              Jobs
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                <Sparkles className="w-2.5 h-2.5" />
                New
              </span>
            </Link>

            {/* Partners */}
            <Link
              href={ROUTES.partners}
              className="text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-3 py-2 rounded-lg"
            >
              Partners
            </Link>

            {/* About */}
            <Link
              href={ROUTES.about}
              className="text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-3 py-2 rounded-lg"
            >
              About
            </Link>

            {/* Contact */}
            <Link
              href={ROUTES.contact}
              className="text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-3 py-2 rounded-lg"
            >
              Contact
            </Link>

            {/* More Dropdown — Reviews + Guides */}
            <div
              ref={moreRef}
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-all px-3 py-2 rounded-lg ${
                  moreOpen
                    ? "text-white bg-white/8"
                    : "text-white/85 hover:text-white hover:bg-white/5"
                }`}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${moreOpen ? "rotate-180 text-white/80" : ""}`}
                />
              </button>

              {/* More Dropdown Panel */}
              <div
                className={`absolute top-full right-0 mt-1 w-[260px] bg-[#100830] rounded-2xl border border-white/10 shadow-2xl p-2 transition-all duration-200 origin-top-right ${
                  moreOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-3 py-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Discover More
                  </span>
                </div>

                <div className="grid gap-0.5">
                  {MORE_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-[#402493]/50 text-purple-300 group-hover:bg-gradient-to-br group-hover:from-[#4DA5EC] group-hover:to-[#257CFF] group-hover:text-white transition-all shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white/90 group-hover:text-white">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-white/45 mt-0.5">
                            {item.href === ROUTES.reviews && "Real visa stamps from real clients"}
                            {item.href === ROUTES.guides.root && "Immigration & relocation insights"}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Decorative gradient strip */}
                <div className="mt-2 mx-2 h-px bg-gradient-to-r from-transparent via-[#4DA5EC]/30 to-transparent" />
              </div>
            </div>
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={ROUTES.consultation}
              className="text-sm font-medium text-white/75 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-lg transition-all hover:bg-white/5"
            >
              <Calendar className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              Book Session
            </Link>
            <Link
              href={ROUTES.assessment}
              className="flex items-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg shadow-cta transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#4DA5EC]/30"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href={ROUTES.assessment}
              className="bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-[11px] font-bold px-3 py-1.5 rounded-md shadow-sm"
            >
              Eligibility
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#4DA5EC] focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#070415]/98 backdrop-blur-xl lg:hidden flex flex-col animate-in slide-in-from-right duration-300"
          role="dialog"
          aria-label="Navigation Menu"
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 shrink-0">
            <div className="relative w-36 h-9">
              <Image src="/brand/logo-white.png" alt="Sijam Consults" fill className="object-contain object-left" sizes="144px" />
            </div>
            <button
              onClick={closeMobile}
              className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-0.5">

            {/* Primary links */}
            {[
              { href: ROUTES.home, label: "Home" },
              { href: ROUTES.whyChooseUs, label: "Why Choose Us" },
              { href: ROUTES.partners, label: "Partners", icon: Handshake },
              { href: ROUTES.about, label: "About Us", icon: Users },
              { href: ROUTES.contact, label: "Contact", icon: Phone },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMobile}
                className="flex items-center justify-between text-base font-semibold text-white/85 hover:text-white py-3 border-b border-white/5 hover:pl-1 transition-all"
              >
                {label}
                <ArrowRight className="w-4 h-4 text-white/20" />
              </Link>
            ))}

            {/* Jobs link — special badge */}
            <Link
              href={ROUTES.jobs.root}
              onClick={closeMobile}
              className="flex items-center justify-between text-base font-semibold text-white/85 hover:text-white py-3 border-b border-white/5 hover:pl-1 transition-all"
            >
              <span className="flex items-center gap-2">
                Jobs & Opportunities
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white px-1.5 py-0.5 rounded-full uppercase">
                  <Sparkles className="w-2.5 h-2.5" /> New
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-white/20" />
            </Link>

            {/* Services section */}
            <div className="pt-4 pb-2">
              <div className="text-[10px] uppercase tracking-widest text-white/35 font-bold mb-3 flex items-center gap-1.5">
                <LayoutGrid className="w-3 h-3" /> Core Services
              </div>
              <div className="grid gap-0.5">
                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={closeMobile}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#402493] group-hover:bg-[#4DA5EC] transition-colors shrink-0" />
                    <span className="text-sm text-white/80 group-hover:text-white font-medium">{s.label}</span>
                    {s.badge && (
                      <span className="text-[9px] font-bold bg-[#4DA5EC]/20 text-[#4DA5EC] px-1.5 py-0.5 rounded-full ml-auto">
                        {s.badge}
                      </span>
                    )}
                  </Link>
                ))}
                <Link
                  href={ROUTES.services.root}
                  onClick={closeMobile}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#4DA5EC] py-2 px-2 mt-1"
                >
                  All Services <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* More section (Reviews + Guides) */}
            <div className="pt-2 pb-2">
              <div className="text-[10px] uppercase tracking-widest text-white/35 font-bold mb-3">
                More
              </div>
              <div className="grid gap-0.5">
                {MORE_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-[#402493]/40 text-purple-300 group-hover:bg-[#4DA5EC]/20 group-hover:text-[#4DA5EC] transition-all shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-sm text-white/80 group-hover:text-white font-medium">{item.label}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Drawer Footer CTAs */}
          <div className="px-5 pt-4 pb-6 border-t border-white/10 space-y-3 shrink-0">
            <Link
              href={ROUTES.assessment}
              onClick={closeMobile}
              className="block w-full text-center bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-cta text-sm border border-[#4DA5EC]/30 transition-all"
            >
              Check Visa Eligibility Free
            </Link>
            <Link
              href={ROUTES.consultation}
              onClick={closeMobile}
              className="block w-full text-center border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-semibold py-3 rounded-xl text-sm transition-all"
            >
              <Calendar className="w-4 h-4 inline mr-2 -mt-0.5" />
              Book Consultation
            </Link>
            <a
              href={COMPANY.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              WhatsApp: {COMPANY.phones.primary}
            </a>
            <div className="text-center text-[10px] text-white/30">
              {COMPANY.legalName} • {COMPANY.cacNumber}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
