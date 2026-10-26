import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import {
  Compass,
  ArrowRight,
  Home,
  Search,
  GraduationCap,
  Briefcase,
  Building2,
  FileText,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';

export const metadata = {
  title: '404 - Consular Pathway Not Found | Sijam Consults Limited',
  description: 'The requested visa pathway, destination guide, or consular dossier was not found.',
  robots: {
    index: false,
    follow: false,
  },
};

const QUICK_PATHWAYS = [
  {
    title: 'Study Abroad Admissions',
    subtitle: 'Cyprus, Poland, Canada & UK Pathways',
    description: 'Accredited nursing programs, CWU scholarships, and post-graduation work permit pathways.',
    icon: GraduationCap,
    href: ROUTES.services.studyVisa,
    badge: 'Admissions Open',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
  },
  {
    title: 'European Work Permits',
    subtitle: 'Voivodeship Type-A Sponsorship',
    description: 'Verified Polish work permits, Slovak quotas, and legitimate European employer sponsorship.',
    icon: Briefcase,
    href: ROUTES.services.workVisa,
    badge: 'Verified Corridors',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
  },
  {
    title: 'EU Corporate Incorporation',
    subtitle: 'Polish Sp. z o.o. & Schengen D-Visa',
    description: 'Establish European corporate presence, access commercial banking, and obtain residency.',
    icon: Building2,
    href: ROUTES.services.businessRegistration,
    badge: 'Commercial Mobility',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
  },
  {
    title: 'International Jobs Board',
    subtitle: 'Direct Foreign Employer Quotas',
    description: 'Explore live verified job placements in agriculture, logistics, construction, and healthcare.',
    icon: CheckCircle2,
    href: ROUTES.jobs.root,
    badge: 'Active Listings',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
  },
  {
    title: 'Destination & Visa Guides',
    subtitle: 'Comprehensive Relocation Handbooks',
    description: 'Fact-checked immigration guides, minimum salary thresholds, and document requirements.',
    icon: FileText,
    href: ROUTES.guides.root,
    badge: 'Editorial Handbooks',
    badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
  },
  {
    title: 'Visa Refusal Recovery',
    subtitle: 'Administrative Review & Appeals',
    description: 'Forensic response blueprint for Nigerian applicants recovering from previous visa refusals.',
    icon: ShieldAlert,
    href: '/blog/what-to-do-after-visa-refusal-nigeria',
    badge: 'Appeal Guide',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
  },
];

export default function NotFound() {
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp.number}?text=${encodeURIComponent(
    'Hello Sijam Consults, I encountered a 404 page while searching your website and would like assistance with my visa/relocation enquiry.'
  )}`;

  return (
    <PublicLayout>
      <div className="min-h-[85vh] bg-[#070415] text-white flex-1 flex flex-col justify-center relative overflow-hidden py-16 lg:py-24">
        {/* Subtle Ambient Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#257CFF]/15 via-[#402493]/20 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#4DA5EC]/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          {/* Compass Graphic with Radar Glow */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-[#0B071E] border border-[#257CFF]/40 shadow-2xl shadow-[#257CFF]/20 flex items-center justify-center relative group">
              <div className="absolute inset-0 rounded-3xl bg-[#257CFF]/10 animate-ping opacity-25" />
              <Compass className="w-12 h-12 text-[#4DA5EC] transition-transform duration-700 group-hover:rotate-45" />
            </div>
            <span className="absolute -bottom-2.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-[#257CFF] text-white shadow-md">
              404
            </span>
          </div>

          {/* Heading & Context */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B071E] border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Consular Pathway Not Located
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Looking for a Specific Visa or Travel Pathway?
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              The destination guide, statutory pathway, or consular dossier you requested may have moved or been updated under our enhanced regulatory compliance structure.
            </p>
          </div>

          {/* Search Terminal (Native HTML GET form for instant zero-JS capability) */}
          <form action="/blog" method="GET" className="max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                name="q"
                placeholder="Search study visas, work permits, Poland jobs, or guides..."
                className="w-full pl-11 pr-28 py-3.5 bg-[#0B071E] border border-slate-700/80 hover:border-cyan-500/50 focus:border-[#4DA5EC] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none shadow-xl transition"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-[#257CFF]/20 transition"
              >
                Search
              </button>
            </div>
          </form>

          {/* 6 Curated Corridors Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                Verified Active Corridors &amp; Portals
              </span>
              <Link href={ROUTES.services.root} className="text-xs text-[#4DA5EC] hover:underline flex items-center gap-1">
                View All Services <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
              {QUICK_PATHWAYS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="p-4 rounded-2xl bg-[#0B071E] border border-slate-800/90 hover:border-[#4DA5EC]/60 hover:bg-[#0F0A28] transition-all group flex flex-col justify-between space-y-3 shadow-lg hover:shadow-[#257CFF]/10"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#4DA5EC] group-hover:scale-110 transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-white group-hover:text-cyan-300 transition block">
                          {item.title}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          {item.subtitle}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 group-hover:text-cyan-300 font-mono">
                      <span>Explore Pathway</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={ROUTES.home}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#257CFF]/25 transition active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              Return to Homepage
            </Link>

            <Link
              href={ROUTES.assessment}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B071E] hover:bg-[#120B30] border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold transition"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Check Eligibility Quiz
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-300 text-xs sm:text-sm font-semibold transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              WhatsApp Consular Desk
            </a>
          </div>

          {/* Compliance & CAC Credential Notice */}
          <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 max-w-xl mx-auto space-y-1">
            <p>
              Sijam Consults Limited • Registered Nigerian Corporate Entity (CAC RC: {COMPANY.cacNumber})
            </p>
            <p className="text-[10px] text-slate-600">
              Official Headquarters: 10, Kanta Road, Unguwan Rimi, Kaduna, Nigeria. Consular decisions remain the sovereign prerogative of respective foreign embassies.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
