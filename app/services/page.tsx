import React from "react";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ConsultationBanner } from "@/components/home/ConsultationBanner";
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Compass, 
  FileCheck, 
  Plane, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
  Users,
  Trophy,
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/data/services";
import { ROUTES } from "@/lib/routes";
import { VIDEOS } from "@/lib/constants/videos";

export const metadata = {
  title: 'All Services | Sijam Consults Limited — Visa, Citizenship, Recruitment & Immigration Advisory Nigeria',
  description: 'Complete range of immigration and travel services from Sijam Consults Limited. Study visa, work permit, tourist visa, citizenship assistance, permanent residency, recruitment & labour supply, and football talent intermediary. Expert advisory from Kaduna, Nigeria. RC: 1715416.',
  alternates: {
    canonical: 'https://sijamconsults.com/services',
  },
};

const iconMap: Record<string, React.ElementType> = {
  'study-visa': GraduationCap,
  'work-visa': Briefcase,
  'tourist-visa': Compass,
  'visa-assistance': FileCheck,
  'business-registration': Building2,
  'document-legalization': FileCheck,
  'flight-reservations': Plane,
  'citizenship-assistance': Award,
  'permanent-residency': ShieldCheck,
  'recruitment-supply': Users,
  'football-talent': Trophy,
};

export default function ServicesCatalogPage() {
  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* Cinematic Header with Ambient Video */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-125"
              src={VIDEOS.SIJAM_CONSULT_LIMITED}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Our Services' }]} />
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <ShieldCheck className="w-4 h-4 text-[#F45A2A]" />
                <span>Full Practice Portfolio • RC: 1715416</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Complete Suite of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Mobility Advisory
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Every service is delivered under strict compliance guidelines by our accredited immigration and educational consulting team in Kaduna. Zero fabricated documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="py-16 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DATA.map((srv) => {
                const Icon = iconMap[srv.slug] || GraduationCap;
                return (
                  <div 
                    key={srv.id}
                    className="p-7 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#402493]/60 text-purple-200 border border-purple-500/30">
                          {srv.group} Advisory
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#402493] to-[#2D186B] group-hover:from-[#F45A2A] group-hover:to-[#DD4819] text-white flex items-center justify-center transition-colors shadow">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h2 className="font-heading font-black text-xl text-white group-hover:text-[#F98864] transition-colors mb-2">
                        {srv.title}
                      </h2>

                      <p className="text-xs text-purple-200/80 font-medium mb-3">
                        {srv.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6 line-clamp-3">
                        {srv.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <Link 
                        href={`/services/${srv.slug}`}
                        className="inline-flex items-center justify-between w-full text-xs font-bold text-[#F98864] group-hover:text-white transition-colors"
                      >
                        <span>Explore Requirements & Guide</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ConsultationBanner />
      </div>
    </PublicLayout>
  );
}
