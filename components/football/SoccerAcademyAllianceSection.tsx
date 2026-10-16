import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Calendar,
  Users2,
  Globe2,
  ArrowRight,
  Sparkles,
  FileBadge2,
  Medal,
  Award,
} from "lucide-react";

export function SoccerAcademyAllianceSection() {
  const alliancePillars = [
    {
      icon: Users2,
      title: "Grassroots Talent Scouting & Trials",
      desc: "Systematic scouting across Kaduna State, Northern Nigeria, and West Africa to discover elite youth footballers (U-15 to Senior Free Agents) with professional potential.",
    },
    {
      icon: Trophy,
      title: "Competitive Tournament Showcases",
      desc: "Organizing high-exposure competitive soccer tournaments and invitational scouting showcases attended by verified European club scouts and licensed intermediaries.",
    },
    {
      icon: Globe2,
      title: "European & Asian Club Corridors",
      desc: "Direct trial placement pipelines into professional and developmental clubs across Spain, Portugal, Turkey, Romania, Serbia, Montenegro, Greece, and the GCC.",
    },
    {
      icon: ShieldCheck,
      title: "Statutory Sports Mobility & Welfare",
      desc: "100% legal sports visa dossiers, MFA-authenticated police clearances, verifiable club invitations, and comprehensive player welfare protection during trials.",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#0A061E] via-[#0C0827] to-[#0A061E] text-white border-y border-purple-900/30 overflow-hidden">
      {/* Decorative Pitch / Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#257CFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F45A2A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Alliance Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strategic Sports Mobility &amp; Talent Scouting Alliance</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
            Sijam Consults Limited &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#38BDF8]">
              Basic Soccer Academy
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Bridging grassroots football talent in Nigeria directly to verified European club trials, professional scouting tournaments, and legitimate sports mobility pathways under the banner <em>&quot;Soccer to the World&quot;</em>.
          </p>
        </div>

        {/* Central Alliance Showcase Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#120D36] to-[#0A0720] border border-blue-500/20 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Official Partner Crest & Credibility Badges */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#257CFF] via-[#4DA5EC] to-[#F45A2A] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative w-48 h-56 sm:w-56 sm:h-64 bg-white rounded-2xl p-4 flex items-center justify-center shadow-2xl border-2 border-slate-200">
                  <Image
                    src="/partners/basic-soccer-academy-crest.png"
                    alt="Basic Soccer Academy Logo - Soccer to the World"
                    width={220}
                    height={250}
                    className="object-contain max-h-full drop-shadow-md"
                    priority
                  />
                </div>
              </div>

              {/* Verified Identity Tags */}
              <div className="mt-6 space-y-2 w-full max-w-sm">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-heading font-black text-xl text-white">Basic Soccer Academy</h3>
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
                  Motto: &quot;Soccer to the World&quot;
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-medium text-slate-300">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>Est. 2015</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10">
                    <FileBadge2 className="w-3 h-3 text-blue-400" />
                    <span>RC: 2839888</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>Kaduna State, Nigeria</span>
                  </span>
                </div>
              </div>

              {/* Official Community Link */}
              <div className="mt-5">
                <a
                  href="https://www.facebook.com/share/g/1cBWsxVuzM/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Visit Basic Soccer Academy Community</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Strategic Partnership Scope & Operational Synergy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Official Partnership Mandate
                </span>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white mt-1">
                  Elite Grassroots Sourcing to Professional European Showcase
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mt-2">
                  Through this strategic alliance, <strong>Sijam Consults Limited (RC: 1715416)</strong> and <strong>Basic Soccer Academy (RC: 2839888)</strong> collaborate to eliminate predatory football agent scams and unverified trials. Under the personal leadership of Sijam CEO <strong>James Samson</strong>, a licensed football intermediary, we provide a legitimate, structured pathway for African players.
                </p>
              </div>

              {/* Alliance Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Verified European Club Trials</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Official invitation letters from clubs in Spain, Portugal, Turkey, Romania, Serbia, Montenegro, and Greece.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4DA5EC] shrink-0" />
                    <span>Annual Scouting Competitions</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Regular soccer tournaments and invitational showcase matches held in Kaduna State with international scout attendance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Sports Visa Dossier Support</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Consular sports visa filing with verifiable flight holds, medical insurance, and Ministry of Foreign Affairs clearances.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Contract Vetting &amp; Welfare</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Comprehensive legal review of professional contracts, fair remuneration clauses, and on-ground European trial supervision.
                  </p>
                </div>
              </div>

              {/* Leadership Endorsement Banner */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#257CFF] to-[#4DA5EC] flex items-center justify-center font-black text-white shrink-0 text-sm shadow-md">
                    JS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">James Samson • Intermediary Desk</div>
                    <div className="text-[11px] text-slate-400">CEO, Sijam Consults &amp; Registered Football Intermediary</div>
                  </div>
                </div>

                <a
                  href="#scouting-assessment"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-bold hover:brightness-110 transition-all shrink-0 shadow-lg"
                >
                  <span>Apply for Scouting Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alliancePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#257CFF]/20 to-[#4DA5EC]/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#4DA5EC]" />
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-2">{pillar.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
