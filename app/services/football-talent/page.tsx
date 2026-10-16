'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicLayout } from '@/components/layout/PublicLayout';
import {
  Trophy,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Users2,
  Calendar,
  Award,
  Video,
  FileCheck2,
  XCircle,
  HelpCircle,
  PhoneCall,
  Sparkles,
  MapPin,
  ExternalLink,
  Plane,
  AlertTriangle,
  Play,
  Pause,
  Clock,
  ChevronRight,
  Check,
} from 'lucide-react';
import { ROUTES, COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { SoccerAcademyAllianceSection } from '@/components/football/SoccerAcademyAllianceSection';
import { PlayerScoutingAssessmentWidget } from '@/components/football/PlayerScoutingAssessmentWidget';

export default function FootballTalentPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const trialCorridors = [
    {
      name: 'Iberian Peninsula',
      countries: 'Spain & Portugal 🇪🇸 🇵🇹',
      badge: 'Premier European Gateway',
      desc: 'Direct scouting pipelines into Spanish RFEF Segunda/Tercera Federación clubs and Portuguese Liga 2/3 and Campeonato de Portugal sides. Focus on technical flair, positional play, and academy residentials.',
      divisions: ['Spanish Tercera RFEF', 'Liga 3 Portugal', 'Autonomous U-19 Honor Division'],
      features: ['Resident European training camp', 'Direct scout showcase matches', 'Fast-track sports residence permits'],
    },
    {
      name: 'Balkan & Eastern European Hub',
      countries: 'Serbia, Montenegro, Poland & Romania 🇷🇸 🇲🇪 🇵🇱 🇷🇴',
      badge: 'High Professional Placement Rate',
      desc: 'Top-tier and second-division trial invitations in Central and Eastern Europe. Known for intense physical competition, direct pathways to European competitions (UEFA Conference/Europa League), and pragmatic foreign quota policies.',
      divisions: ['Serbian Prva Liga', 'Montenegrin First League', 'Polish II Liga / I Liga', 'Romanian Liga 2'],
      features: ['Immediate first-team trial access', 'Low bureaucracy sports work permits', 'Spring & Summer transfer windows'],
    },
    {
      name: 'Mediterranean Hub',
      countries: 'Turkey & Greece 🇹🇷 🇬🇷',
      badge: 'High Exposure Showcases',
      desc: 'Trials and showcase tournaments across Istanbul, Antalya, and Athens. European clubs utilize Turkish winter training camps to scout emerging African talents in competitive friendly matches.',
      divisions: ['Turkish TFF 1. Lig / 2. Lig', 'Greek Super League 2', 'Antalya International Showcases'],
      features: ['Winter & Summer scouting tournaments', 'High club density in Antalya training camps', 'Multi-club exposure in 10 days'],
    },
    {
      name: 'Arabian Gulf & Asia',
      countries: 'Saudi Arabia, UAE, Qatar & Malaysia 🇸🇦 🇦🇪 🇶🇦 🇲🇾',
      badge: 'Lucrative Professional Contracts',
      desc: 'Booming Asian football markets seeking energetic, skilled young African players for first-team rosters and developmental reserve squads with state-of-the-art sports facilities.',
      divisions: ['Saudi First Division (Yelo League)', 'UAE First Division', 'Malaysia Super League'],
      features: ['Tax-free professional player remuneration', 'Comprehensive accommodation & medicals', 'World-class training infrastructure'],
    },
  ];

  const comparisonRows = [
    {
      feature: 'Official European Club Invitation Letter',
      sijamAlliance: true,
      fakeAgents: false,
      selfApply: false,
      note: 'Vetted directly with European club directors and verifiable by the issuing embassy.',
    },
    {
      feature: 'Licensed Intermediary Representation',
      sijamAlliance: true,
      fakeAgents: false,
      selfApply: false,
      note: 'Led by CEO James Samson, adhering strictly to FIFA and national association intermediary guidelines.',
    },
    {
      feature: 'Kaduna State Grassroots Scouting Base',
      sijamAlliance: true,
      fakeAgents: false,
      selfApply: false,
      note: 'Direct collaboration with Basic Soccer Academy (RC: 2839888, Est. 2015) for continuous talent discovery.',
    },
    {
      feature: 'Consular Sports Visa Dossier Support',
      sijamAlliance: true,
      fakeAgents: false,
      selfApply: false,
      note: 'Authenticated police clearances (MFA/CID), Schengen travel insurance, and verifiable flight reservations.',
    },
    {
      feature: 'Protection from Extortion & Fake Agents',
      sijamAlliance: true,
      fakeAgents: false,
      selfApply: true,
      note: 'No fraudulent paperwork, no unauthorized fees, and zero risk of human trafficking bans.',
    },
    {
      feature: 'On-Ground European Trial Supervision',
      sijamAlliance: true,
      fakeAgents: false,
      selfApply: false,
      note: 'Player welfare monitoring, transparent contract review, and verified return travel protocols.',
    },
  ];

  const pathwaySteps = [
    {
      step: '01',
      title: 'Scouting Assessment & Footage Audit',
      timeline: '3–5 Business Days',
      desc: 'Our intermediary desk and Basic Soccer Academy scouts examine your competitive match footage, tactical decision-making, physical metrics, and playing history.',
    },
    {
      step: '02',
      title: 'Club Matching & Formal Trial Invitation',
      timeline: '2–4 Weeks',
      desc: 'Your verified athletic dossier is pitched to partner clubs in Spain, Portugal, Eastern Europe, or Turkey. We secure an official club trial invitation letter on club letterhead.',
    },
    {
      step: '03',
      title: 'Consular Sports Visa & Travel Documentation',
      timeline: '2–4 Weeks',
      desc: 'Complete assembly of sports visa requirements: club accommodation guarantee, Ministry of Foreign Affairs (MFA) police clearance authentication, and GDS flight reservation.',
    },
    {
      step: '04',
      title: 'European Arrival, Trial & Contract Review',
      timeline: '1–3 Weeks On-Ground',
      desc: 'Arrival reception, transfer to club facilities, trial participation under scout evaluation, and professional contract advisory if the club decides to sign you.',
    },
  ];

  const faqs = [
    {
      q: 'How does Sijam Consults partner with Basic Soccer Academy?',
      a: 'Basic Soccer Academy (RC: 2839888, Est. 2015) is our official grassroots scouting, tournament organization, and talent development partner based in Kaduna State. Together, we identify high-potential Nigerian footballers, organize competitive showcases, and facilitate their transition to verified European and Asian club trials under the guidance of licensed football intermediary James Samson.',
    },
    {
      q: 'What age categories do you accept for international football trials?',
      a: 'We evaluate players from U-15 to Senior Free Agents. For official international European club trials and showcases, players must generally be at least 18 years of age (or represent an accredited academy traveling as a registered youth squad with formal parental and association consent).',
    },
    {
      q: 'Do you guarantee a professional football contract in Europe?',
      a: 'No ethical or licensed intermediary guarantees a contract. Contract offers depend 100% on a player’s on-pitch trial performance, physical fitness, tactical adaptability, and the club’s roster requirements. What we guarantee is a 100% authentic, verified club trial invitation, compliant consular sports visa facilitation, and honest representation.',
    },
    {
      q: 'What kind of video footage is required for trial evaluation?',
      a: 'Footage must be competitive (league match or high-level tournament), minimum 5 to 10 minutes in length, showing tactical movement, physical attributes, technical touches, and decision-making under match pressure. Raw match highlights are far better than individual training ground clips.',
    },
    {
      q: 'Can grassroots academies in Nigeria partner with Sijam & Basic Soccer Academy for scouting showcases?',
      a: 'Yes! Grassroots academies and sports directors across Nigeria are welcome to collaborate with our Kaduna State and Lagos desks. We regularly organize scouting tournaments where international scouts evaluate academy players directly on Nigerian soil.',
    },
    {
      q: 'How does Sijam Consults protect players from fake football agent scams?',
      a: 'Sijam Consults Limited (RC: 1715416) is a CAC-registered corporation led by CEO James Samson, an experienced football intermediary. We deal exclusively with registered club sporting directors and verified intermediaries. Every invitation letter is authenticated before embassy submission, preventing fake document bans and human trafficking risks.',
    },
  ];

  return (
    <PublicLayout>
      <BreadcrumbSchema
        items={[
          { label: 'Services', href: '/services' },
          { label: 'Football Talent Networking', href: '/services/football-talent' },
        ]}
      />

      <div className="bg-[#070415] text-white min-h-screen">
        
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-purple-950/80">
          {/* Ambient Lighting & Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#257CFF]/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F45A2A]/10 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/80 to-[#070415]/90" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Top Corridor Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-md text-xs text-blue-300 font-semibold">
                <Trophy className="w-3.5 h-3.5 text-[#4DA5EC]" />
                <span>Licensed Football Intermediary Desk • CEO James Samson</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md text-xs text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Partner: Basic Soccer Academy (RC: 2839888)</span>
              </div>
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Football Talent Networking &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#38BDF8]">
                  European Club Trials
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Connecting promising African footballers directly to verified club trials, tournament showcases, and sports mobility pathways across <strong>Spain, Portugal, Eastern Europe, Turkey, and Asia</strong>. Powered by our grassroots-to-global alliance with <strong>Basic Soccer Academy</strong>.
              </p>

              {/* Fast Trust Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-[#4DA5EC]" />
                    <span>European Corridors</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Spain, Portugal, Balkans &amp; Turkey</div>
                </div>

                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-emerald-400" />
                    <span>Kaduna Base</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Basic Soccer Academy (Est. 2015)</div>
                </div>

                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>FIFA Compliance</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Zero Human Trafficking • 100% Legal</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a
                  href="#scouting-assessment"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-sm hover:brightness-110 shadow-lg shadow-blue-900/40 transition-all hover:scale-[1.02]"
                >
                  <span>Submit Player Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/2348033696489?text=Hello%20Sijam%20Consults,%20I%20am%20inquiring%20about%20Football%20Talent%20Scouting%20and%20European%20Club%20Trials."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/10 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Speak with Intermediary Desk</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Basic Soccer Academy Alliance Showcase */}
        <SoccerAcademyAllianceSection />

        {/* 3. Interactive Player Scouting Assessment Widget */}
        <section className="py-16 sm:py-24 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <PlayerScoutingAssessmentWidget />
          </div>
        </section>

        {/* 4. Global Mobility Corridors */}
        <section className="py-16 sm:py-24 bg-[#070415] border-t border-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#4DA5EC] uppercase tracking-widest">
                International Placement Routes
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mt-2">
                Active European &amp; Asian Trial Corridors
              </h2>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                We place talent into competitive professional ecosystems matching the player&apos;s current developmental stage, physical profile, and European passport regulations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trialCorridors.map((corridor, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-gradient-to-br from-[#120D36] to-[#0A0720] border border-blue-500/20 shadow-xl space-y-5 hover:border-blue-400/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/25 text-[11px] font-semibold text-blue-300 uppercase tracking-wider mb-2">
                        {corridor.badge}
                      </span>
                      <h3 className="font-heading font-black text-xl text-white">{corridor.name}</h3>
                      <div className="text-xs font-semibold text-emerald-400 mt-1">{corridor.countries}</div>
                    </div>
                    <Globe2 className="w-8 h-8 text-[#4DA5EC] shrink-0" />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{corridor.desc}</p>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-slate-200">Target Leagues &amp; Levels:</span>
                    <div className="flex flex-wrap gap-2">
                      {corridor.divisions.map((d, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/10">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {corridor.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Comparison Matrix (Truth vs Rogue Agents) */}
        <section className="py-16 sm:py-24 bg-[#0B071E] border-t border-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Player Safety &amp; Integrity Benchmark
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mt-2">
                Why Verified Partnership Matters
              </h2>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Hundreds of African players fall victim annually to fake invitation letters and rogue agents. See how Sijam Consults and Basic Soccer Academy protect your future.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#120D36]/80 backdrop-blur-md shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="p-4 sm:p-5 text-xs font-bold text-slate-300 uppercase tracking-wider">Protocol Feature</th>
                    <th className="p-4 sm:p-5 text-xs font-black text-white bg-blue-600/20 border-x border-blue-500/20">
                      Sijam &amp; Basic Soccer Academy
                    </th>
                    <th className="p-4 sm:p-5 text-xs font-bold text-rose-300 bg-rose-950/20">Rogue &quot;Social Media&quot; Agents</th>
                    <th className="p-4 sm:p-5 text-xs font-bold text-slate-400">Direct Self-Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-white">
                        <div>{row.feature}</div>
                        <div className="text-[11px] text-slate-400 font-normal mt-0.5">{row.note}</div>
                      </td>
                      <td className="p-4 sm:p-5 bg-blue-600/10 border-x border-blue-500/20 font-bold text-emerald-400">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>100% Guaranteed</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 bg-rose-950/10 font-medium text-rose-400">
                        <div className="flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>High Fraud Risk</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Unlikely / Low Odds</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6. Step-by-Step 4-Stage Trial Pathway */}
        <section className="py-16 sm:py-24 bg-[#070415] border-t border-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono text-[#4DA5EC] uppercase tracking-widest">
                Structured Operational Roadmap
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mt-2">
                4-Stage Pathway to European Showcases
              </h2>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                From video scouting at our Kaduna State academy base to your first competitive trial match on European soil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pathwaySteps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-gradient-to-br from-[#120D36] to-[#0A0720] border border-blue-500/20 shadow-lg space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                        {step.step}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/10">
                        <Clock className="w-3 h-3 text-blue-400" />
                        <span>{step.timeline}</span>
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-white text-base">{step.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Quality Assured Step</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Document Checklist & Requirements */}
        <section className="py-16 sm:py-24 bg-[#0B071E] border-t border-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#120D36] to-[#0A0720] border border-blue-500/20 p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                  <FileCheck2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Applicant Documentation Protocol</span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  Trialist Qualification Checklist
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Assemble these credentials to guarantee seamless European consular processing and club eligibility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>International Passport (18+ Mo.)</span>
                  </div>
                  <p className="text-xs text-slate-400">Must have at least 18 months validity and 4 blank visa pages.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>HD Match Footage (5–10 Mins)</span>
                  </div>
                  <p className="text-xs text-slate-400">Competitive match video showing game rhythm and decision-making.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sports Physical &amp; Medical (PCMA)</span>
                  </div>
                  <p className="text-xs text-slate-400">Standard pre-competition cardiovascular and orthopedic fitness report.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>MFA Police Clearance</span>
                  </div>
                  <p className="text-xs text-slate-400">Nigeria Police Character Certificate authenticated by Ministry of Foreign Affairs.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 sm:col-span-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Club Release / Academy Clearance Letter</span>
                  </div>
                  <p className="text-xs text-slate-400">Documentation confirming free-agent status or official academy release for overseas showcase.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ Accordion */}
        <section className="py-16 sm:py-24 bg-[#070415] border-t border-purple-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-mono text-[#4DA5EC] uppercase tracking-widest">
                Frequently Asked Questions
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mt-2">
                Clarity for Athletes, Families &amp; Coaches
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-white hover:text-blue-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-blue-400 transition-transform duration-300 shrink-0 ${
                        activeFaq === idx ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Final CTA Banner */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#140E3D] via-[#0C0827] to-[#120B35] border-t border-blue-500/20 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>&quot;Soccer to the World&quot; • Direct Scouting Line</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Ready for a Legitimate European Football Showcase?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Contact CEO James Samson and the Basic Soccer Academy scouting team in Kaduna State today. We review your footage and match your profile with legitimate club openings across Europe.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#scouting-assessment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all hover:scale-[1.02]"
              >
                <span>Submit Profile Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/2348033696489?text=Hello%20Sijam%20Consults,%20I%20would%20like%20to%20discuss%20a%20player%20scouting%20assessment%20with%20CEO%20James%20Samson."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Intermediary Desk</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
