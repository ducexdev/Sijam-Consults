'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Clock,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Compass,
  FileCheck,
  Building2,
  FileText,
  Plane,
  Star,
  BookOpen,
  Sparkles,
  Award,
  Plus,
} from 'lucide-react';
import { COMPANY, NAV_LINKS, ROUTES } from '@/lib/routes';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// Helper icon resolver for service items
const getServiceIcon = (href: string) => {
  if (href.includes('study-visa')) return GraduationCap;
  if (href.includes('work-visa')) return Briefcase;
  if (href.includes('tourist-visa')) return Compass;
  if (href.includes('visa-assistance')) return FileCheck;
  if (href.includes('business-registration')) return Building2;
  if (href.includes('document-legalization')) return FileText;
  if (href.includes('flight-reservations')) return Plane;
  return FileCheck;
};

// Helper icon resolver for "More" items
const getMoreIcon = (href: string) => {
  if (href.includes('reviews')) return Star;
  if (href.includes('guides')) return BookOpen;
  if (href.includes('action=post') || href.includes('jobs')) return Briefcase;
  return Award;
};

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenAccordions, setMobileOpenAccordions] = useState<Record<string, boolean>>({
    Services: false,
    More: false,
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change (render-time state adjustment per React guidelines)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileOpenAccordions((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Credentials Bar */}
      <div className="bg-[#0D0826] text-white text-[11px] sm:text-xs py-2 border-b border-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 text-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <strong className="text-white font-medium">{COMPANY.cacNumber}</strong>
              <span className="hidden md:inline">• Corporate Affairs Commission Registered</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-purple-300" />
              <span>Mon - Fri 9am - 5pm WAT</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={`tel:${COMPANY.phones.primary}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span className="font-medium">{COMPANY.phones.primary}</span>
            </a>
            <span className="hidden md:inline text-purple-600">|</span>
            <span className="hidden lg:inline text-xs text-purple-200">
              Office: {COMPANY.address.suite}, Kaduna
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Clean White Background) */}
      <div
        className={cn(
          'transition-all duration-300 border-b bg-white',
          isScrolled
            ? 'shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-2.5 border-slate-200/80'
            : 'py-3.5 border-slate-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo Mark */}
          <Link href={ROUTES.home} className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-40 sm:w-48 h-10 sm:h-11 transition-transform duration-200 group-hover:scale-[1.01]">
              <Image
                src="/brand/logo.png"
                alt="Sijam Consults Limited"
                fill
                priority
                sizes="(max-width: 640px) 160px, 192px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_LINKS.map((link) => {
              // DROPDOWNS: Services or More
              if (link.children) {
                const isOpen = activeDropdown === link.label;
                const isServices = link.label === 'Services';
                const isMore = link.label === 'More';

                // Check if any child route is currently active
                const isChildActive = isServices
                  ? pathname.startsWith(ROUTES.services.root)
                  : pathname === ROUTES.reviews || pathname.startsWith(ROUTES.guides.root);

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : link.label)}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150',
                        isChildActive || isOpen
                          ? 'text-[#257CFF] bg-blue-50/70'
                          : 'text-slate-700 hover:text-[#257CFF] hover:bg-slate-50'
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          isOpen && 'rotate-180 text-[#257CFF]'
                        )}
                      />
                    </button>

                    {/* Desktop Dropdown Panel */}
                    <div
                      className={cn(
                        'absolute top-full mt-1.5 bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-100 p-2 z-50 transition-all duration-200',
                        isMore ? 'right-0 w-[340px]' : 'left-0 w-[380px]',
                        isOpen
                          ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                          : 'opacity-0 -translate-y-2 invisible pointer-events-none'
                      )}
                    >
                      {/* Dropdown Header */}
                      <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                        <span>{isServices ? 'Verified Services' : 'Client Proof & Guides'}</span>
                        {isServices && (
                          <Link
                            href={ROUTES.services.root}
                            onClick={() => setActiveDropdown(null)}
                            className="text-[#257CFF] hover:underline font-semibold text-xs flex items-center gap-1"
                          >
                            All Services <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>

                      {/* Dropdown Items */}
                      <div className="space-y-0.5">
                        {link.children.map((child) => {
                          const Icon = isServices
                            ? getServiceIcon(child.href)
                            : getMoreIcon(child.href);
                          const isItemActive = pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={(e) => {
                                setActiveDropdown(null);
                                if (child.href.includes('action=post')) {
                                  if (pathname.startsWith(ROUTES.jobs.root)) {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent('sijam:open_post_job'));
                                  }
                                }
                              }}
                              className={cn(
                                'group flex items-start gap-3 p-2.5 rounded-xl transition-colors',
                                isItemActive
                                  ? 'bg-blue-50/80 text-[#257CFF]'
                                  : 'hover:bg-slate-50 text-slate-800'
                              )}
                            >
                              <div
                                className={cn(
                                  'p-2 rounded-lg shrink-0 mt-0.5 transition-colors',
                                  isItemActive
                                    ? 'bg-[#257CFF] text-white'
                                    : 'bg-slate-100 text-slate-600 group-hover:bg-[#257CFF] group-hover:text-white'
                                )}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-heading font-semibold text-xs text-slate-900 group-hover:text-[#257CFF] truncate">
                                    {child.title}
                                  </span>
                                  {child.badge && (
                                    <span
                                      className={cn(
                                        'text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider shrink-0',
                                        child.badge === 'Proof'
                                          ? 'bg-amber-100 text-amber-800'
                                          : child.badge === 'Popular'
                                          ? 'bg-sky-100 text-sky-800'
                                          : child.badge === 'Verified'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : child.badge === 'Management'
                                          ? 'bg-blue-100 text-[#257CFF]'
                                          : 'bg-purple-100 text-purple-800'
                                      )}
                                    >
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 leading-snug">
                                  {child.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Dropdown Decorative Footer */}
                      {isMore && (
                        <div className="mt-1 pt-1.5 border-t border-slate-100 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1 text-slate-500">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            100% Genuine Case Proofs
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // REGULAR NAV LINKS: Home, Why Us, Jobs, Partners, About, Contact
              const isActive = pathname === link.href;
              const isJobs = link.label === 'Jobs';

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150',
                    isActive
                      ? 'text-[#257CFF] bg-blue-50/70'
                      : 'text-slate-700 hover:text-[#257CFF] hover:bg-slate-50'
                  )}
                >
                  <span>{link.label}</span>
                  {isJobs && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm shadow-blue-500/25 animate-pulse">
                      <Sparkles className="w-2.5 h-2.5" />
                      New
                    </span>
                  )}
                  {!isJobs && link.badge && (
                    <span className="text-[10px] bg-blue-100 text-[#257CFF] font-bold px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs (Free Assessment & Book Consultation) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <Button
              href={ROUTES.assessment}
              variant="outline"
              size="sm"
              className="text-xs font-semibold border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-3.5 py-2"
            >
              Free Assessment
            </Button>
            <Button
              href={ROUTES.consultation}
              variant="primary"
              size="sm"
              className="text-xs font-semibold px-4 py-2"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#257CFF] hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[95px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {/* Home */}
            <Link
              href={ROUTES.home}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                pathname === ROUTES.home ? 'bg-blue-50 text-[#257CFF]' : 'text-slate-800 hover:bg-slate-50'
              )}
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="rounded-xl border border-slate-200/80 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('Services')}
                className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-slate-800 bg-slate-50/70"
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-slate-400 transition-transform duration-200',
                    mobileOpenAccordions.Services && 'rotate-180 text-[#257CFF]'
                  )}
                />
              </button>
              {mobileOpenAccordions.Services && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                  <Link
                    href={ROUTES.services.root}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-[#257CFF] bg-blue-50/70 rounded-lg"
                  >
                    All Services Directory →
                  </Link>
                  {NAV_LINKS.find((l) => l.label === 'Services')?.children?.map((child) => {
                    const Icon = getServiceIcon(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:text-[#257CFF] rounded-lg hover:bg-slate-50"
                      >
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="flex-1">{child.title}</span>
                        {child.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-[#257CFF]">
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Why Us */}
            <Link
              href={ROUTES.whyChooseUs}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                pathname === ROUTES.whyChooseUs ? 'bg-blue-50 text-[#257CFF]' : 'text-slate-800 hover:bg-slate-50'
              )}
            >
              Why Us
            </Link>

            {/* Jobs (with New badge) */}
            <Link
              href={ROUTES.jobs.root}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                pathname.startsWith(ROUTES.jobs.root) ? 'bg-blue-50 text-[#257CFF]' : 'text-slate-800 hover:bg-slate-50'
              )}
            >
              <span>Jobs</span>
              <span className="text-xs bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white px-2 py-0.5 rounded-full font-bold shadow-sm shadow-blue-500/25">
                New
              </span>
            </Link>

            {/* Partners */}
            <Link
              href={ROUTES.partners}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                pathname === ROUTES.partners ? 'bg-blue-50 text-[#257CFF]' : 'text-slate-800 hover:bg-slate-50'
              )}
            >
              Partners
            </Link>

            {/* About */}
            <Link
              href={ROUTES.about}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                pathname === ROUTES.about ? 'bg-blue-50 text-[#257CFF]' : 'text-slate-800 hover:bg-slate-50'
              )}
            >
              About
            </Link>

            {/* Contact */}
            <Link
              href={ROUTES.contact}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                pathname === ROUTES.contact ? 'bg-blue-50 text-[#257CFF]' : 'text-slate-800 hover:bg-slate-50'
              )}
            >
              Contact
            </Link>

            {/* Mobile More Accordion (Reviews + Guides) */}
            <div className="rounded-xl border border-slate-200/80 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('More')}
                className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-slate-800 bg-slate-50/70"
              >
                <span>More</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-slate-400 transition-transform duration-200',
                    mobileOpenAccordions.More && 'rotate-180 text-[#257CFF]'
                  )}
                />
              </button>
              {mobileOpenAccordions.More && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                  <Link
                    href={ROUTES.reviews}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-800 hover:text-[#257CFF] rounded-lg hover:bg-slate-50"
                  >
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="flex-1">Reviews & Visa Proofs</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      Proof
                    </span>
                  </Link>
                  <Link
                    href={ROUTES.guides.root}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-800 hover:text-[#257CFF] rounded-lg hover:bg-slate-50"
                  >
                    <BookOpen className="w-4 h-4 text-[#257CFF]" />
                    <span className="flex-1">Travel & Immigration Guides</span>
                  </Link>
                  <Link
                    href="/jobs?action=post"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (pathname.startsWith(ROUTES.jobs.root)) {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('sijam:open_post_job'));
                      }
                    }}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-800 hover:text-[#257CFF] rounded-lg hover:bg-slate-50"
                  >
                    <Briefcase className="w-4 h-4 text-[#257CFF]" />
                    <span className="flex-1 font-semibold">+ Post A Job</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-[#257CFF]">
                      Management
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Bottom CTAs */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <Button
              href={ROUTES.consultation}
              variant="primary"
              className="w-full text-sm py-3.5"
            >
              Book Consultation <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              href={ROUTES.assessment}
              variant="outline"
              className="w-full text-sm py-3 border-slate-300 text-slate-700"
            >
              Free Assessment
            </Button>
            <div className="text-center text-xs text-slate-500 pt-2">
              <span className="font-semibold text-slate-700">{COMPANY.cacNumber}</span>
              <br />
              {COMPANY.address.full}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
