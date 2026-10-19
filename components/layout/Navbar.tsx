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
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 text-[13px]">
            {/* 1. Home */}
            <Link
              href={ROUTES.home}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg"
            >
              Home
            </Link>

            {/* 2. International Recruitment */}
            <Link
              href={ROUTES.services.recruitmentSupply}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg whitespace-nowrap"
            >
              International Recruitment
            </Link>

            {/* 3. Work Permits */}
            <Link
              href={ROUTES.services.workVisa}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg whitespace-nowrap"
            >
              Work Permits
            </Link>

            {/* 4. Study Abroad */}
            <Link
              href={ROUTES.services.studyVisa}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg whitespace-nowrap"
            >
              Study Abroad
            </Link>

            {/* 5. Travel Services */}
            <Link
              href={ROUTES.services.flightReservations}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg whitespace-nowrap"
            >
              Travel Services
            </Link>

            {/* 6. Business Consultancy */}
            <Link
              href={ROUTES.services.businessRegistration}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg whitespace-nowrap"
            >
              Business Consultancy
            </Link>

            {/* 7. Jobs */}
            <Link
              href={ROUTES.jobs.root}
              className="relative flex items-center gap-1 font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg"
            >
              Jobs
              <span className="inline-flex items-center text-[9px] font-bold bg-[#DC2F11] text-white px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                New
              </span>
            </Link>

            {/* 8. About */}
            <Link
              href={ROUTES.about}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg"
            >
              About
            </Link>

            {/* 9. Contact */}
            <Link
              href={ROUTES.contact}
              className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg"
            >
              Contact
            </Link>

            {/* More Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="font-medium text-white/85 hover:text-white hover:bg-white/5 transition-all px-2.5 py-2 rounded-lg inline-flex items-center gap-1"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-white' : 'text-white/60'
                  }`}
                />
              </button>

              {/* More Dropdown Panel */}
              <div
                className={`absolute top-full right-0 mt-2 w-72 rounded-2xl bg-[#0F0A28]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2.5 transition-all duration-200 z-50 ${
                  servicesOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="px-3 py-1.5 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Additional Services &amp; Resources
                  </span>
                </div>

                <div className="grid gap-0.5">
                  <Link
                    href={ROUTES.services.touristVisa}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#F98864]" />
                    <span className="text-xs font-semibold text-white/90">Tourist &amp; Visitor Visas</span>
                  </Link>
                  <Link
                    href={ROUTES.services.documentLegalization}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <FileCheck className="w-4 h-4 text-[#4DA5EC]" />
                    <span className="text-xs font-semibold text-white/90">Document Legalization (MFA)</span>
                  </Link>
                  <Link
                    href={ROUTES.services.visaAssistance}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <FileCheck className="w-4 h-4 text-purple-300" />
                    <span className="text-xs font-semibold text-white/90">File Audit &amp; Mock Interview</span>
                  </Link>
                  <Link
                    href={ROUTES.services.footballTalent}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-white/90">Football Talent Scouting</span>
                  </Link>
                  <div className="border-t border-white/8 my-1" />
                  <Link
                    href={ROUTES.whyChooseUs}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <Handshake className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-semibold text-white/90">Why Choose Us</span>
                  </Link>
                  <Link
                    href={ROUTES.partners}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-teal-300" />
                    <span className="text-xs font-semibold text-white/90">Bilateral Alliances</span>
                  </Link>
                  <Link
                    href={ROUTES.reviews}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-white/90">Client Reviews &amp; Approvals</span>
                  </Link>
                  <Link
                    href={ROUTES.guides.root}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/6 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#F98864]" />
                    <span className="text-xs font-semibold text-white/90">Relocation Guides &amp; Insights</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden xl:flex items-center gap-2.5">
            <Link
              href="/contact?intent=hire_manpower"
              className="text-xs font-semibold text-white/90 hover:text-white bg-[#402493]/40 hover:bg-[#402493] border border-purple-500/40 px-3.5 py-2.5 rounded-lg transition-all whitespace-nowrap"
            >
              <span>Hire Talent</span>
            </Link>
            <Link
              href={ROUTES.jobs.root}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#DC2F11] to-[#F45A2A] hover:brightness-110 text-white text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-lg shadow-[0_4px_20px_rgba(220,47,17,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#DC2F11]/40 whitespace-nowrap"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href={ROUTES.assessment}
              className="bg-gradient-to-r from-[#DC2F11] to-[#F45A2A] text-white text-[11px] font-bold px-3 py-1.5 rounded-md shadow-sm"
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
              className="block w-full text-center bg-gradient-to-r from-[#DC2F11] to-[#F45A2A] hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-[0_8px_25px_-5px_rgba(220,47,17,0.5)] text-sm border border-[#DC2F11]/40 transition-all"
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
