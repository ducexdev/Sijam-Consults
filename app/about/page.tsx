import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  FileText,
  Download,
  Building,
  CheckCircle2,
  Mail,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  Play,
  Check,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { TEAM_MEMBERS } from '@/lib/data/team';
import { COMPANY, ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'About Sijam Consults Limited | Mission, Leadership & Registered Credentials (RC: 1715416)',
  description: 'Meet the executive leadership and credentials behind Sijam Consults Limited. Incorporated under Nigerian CAC law, providing ethical cross-border educational and travel advisory.',
};

export default function AboutPage() {
  const values = [
    {
      num: '01',
      title: 'Institutional Integrity',
      desc: 'We never compromise on statutory veracity. Zero fabricated bank statements, zero artificial home ties, and zero deceptive visa promises.',
    },
    {
      num: '02',
      title: 'Forensic Precision',
      desc: 'Our zero-omission file audit methodology catches preventable refusal triggers before dossiers reach sovereign consular windows.',
    },
    {
      num: '03',
      title: 'Client-Centered Empathy',
      desc: 'We recognize that international migration is a life-defining family investment requiring attentive, compassionate, and transparent guidance.',
    },
    {
      num: '04',
      title: 'Direct Institutional Alliances',
      desc: 'We maintain verifiable bilateral partnerships with European universities and accredited employers, bypassing predatory middlemen.',
    },
  ];

  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* 1. Cinematic Hero Section with Ambient Video */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-125"
              src="/videos/SIjam-Consult-Limited.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'About Us' }]} />
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Incorporated Under Nigerian Law • CAC: {COMPANY.cacNumber}</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Architecting Legitimate{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Global Mobility
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Founded with a mission to bring transparent corporate governance to cross-border educational and travel advisory, Sijam Consults Limited empowers Nigerian students, professionals, and entrepreneurs to access worldwide opportunities legally and confidently.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/docs/Sijam-Company-Profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs uppercase tracking-wider shadow-cta hover:shadow-cta-hover transition-all border border-[#4DA5EC]/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Corporate Profile (PDF)</span>
                </a>
                <Link
                  href={ROUTES.consultation}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-semibold text-xs border border-white/15 backdrop-blur-md transition-all"
                >
                  <span>Book Executive Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Official Corporate Presentation Video Showcase (Evenly Balanced) */}
        <section className="py-16 lg:py-24 bg-[#0A061C] border-b border-purple-950/60 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(37,124,255,0.08),_transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
            {/* Header: Centered & Evenly Balanced */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
                Official Corporate Presentation
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-4xl text-white tracking-tight leading-tight">
                Inside Sijam Consults:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Corporate Film Showcase
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Take a visual tour of our corporate operations, Kaduna headquarters, and client advisory standards. Learn how our accredited team structures legitimate academic and skilled migration pathways.
              </p>
            </div>

            {/* Video Player: Evenly Centered & Framed */}
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl p-2.5 sm:p-4 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl ring-1 ring-[#257CFF]/20 group">
                <VideoPlayer
                  src="https://youtu.be/LOB8JuM_Lrg?si=8ITy5RfAbaNuRpbJ"
                  title="Sijam Consults Limited Corporate Overview Film"
                  aspectRatio="16/9"
                  className="w-full shadow-2xl rounded-2xl overflow-hidden"
                />
              </div>

              {/* Evenly Distributed 3-Column Highlights Strip Directly Beneath Video */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 text-left">
                  <div className="w-9 h-9 rounded-xl bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                    <Building className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    Physical Corporate Headquarters
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Permanent executive offices in GRA Kaduna with verifiable client desks and secure file archives.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 text-left">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    CAC Statutory Accreditation
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Incorporated under Nigerian law (RC: 1715416) operating with strict zero-fraud immigration protocols.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 text-left">
                  <div className="w-9 h-9 rounded-xl bg-[#F45A2A]/20 text-[#F98864] flex items-center justify-center border border-orange-500/30">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    Direct European Alliances
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Official bilateral agreements with European higher education universities and verified employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mission & Vision (Evenly Balanced 2-Column Grid) */}
        <section className="py-16 bg-[#0B071E] border-b border-purple-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#257CFF]/20 text-[#4DA5EC] flex items-center justify-center border border-[#257CFF]/30">
                  <Target className="w-6 h-6 text-[#4DA5EC]" />
                </div>
                <h2 className="font-heading font-black text-2xl text-white">Our Mission</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  To demystify international mobility for African talents by delivering forensic consular file audits, ethical academic admissions, and verified commercial relocation frameworks that respect sovereign immigration laws.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F45A2A]/20 text-[#F98864] flex items-center justify-center border border-orange-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="font-heading font-black text-2xl text-white">Our Vision</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  To be West Africa’s most trusted, benchmarked international educational and corporate mobility advisory—renowned for zero fraud tolerance, exceptional first-pass approval rates, and life-changing student success stories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Values: Evenly Spaced 4-Column Grid */}
        <section className="py-16 bg-[#070415] border-b border-purple-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4DA5EC]">
                Institutional Pillars
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Our Operating Principles
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                The four non-negotiable standards that govern every client file entrusted to our care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((val) => (
                <div
                  key={val.num}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#257CFF]/50 transition-all duration-300 backdrop-blur-md space-y-3 group hover:-translate-y-1"
                >
                  <div className="text-xs font-mono font-bold text-[#4DA5EC] bg-[#257CFF]/15 px-2.5 py-1 rounded-md inline-block border border-[#257CFF]/30">
                    {val.num}
                  </div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-[#4DA5EC] transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Verified CAC Registration & Kaduna HQ */}
        <section className="py-16 bg-[#0B071E] border-b border-purple-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Statutory Corporate Accreditation</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    Corporate Affairs Commission Incorporation
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Sijam Consults Limited is incorporated under the Companies and Allied Matters Act 2020 with Registration Number <strong className="text-white">{COMPANY.cacNumber}</strong>. Our executive corporate offices are situated permanently at <strong className="text-white">{COMPANY.address.full}</strong>.
                  </p>

                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
                    Clients and institutional partners are welcome to visit our physical office during official working hours (Mon–Sun: 09:00–17:00 WAT) or verify our credentials on the CAC public registry.
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div
                    className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 p-2"
                    style={{ position: 'relative' }}
                  >
                    <Image
                      src="/brand/cac-certificate.png"
                      alt="CAC Certificate RC 1715416"
                      fill
                      sizes="(max-width: 768px) 100vw, 384px"
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Leadership Team Showcase */}
        <section className="py-16 bg-[#070415]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4DA5EC]">
                Executive Governance
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white mt-1">
                Meet Our Leadership Team
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Senior consultants and compliance executives steering your safe international relocation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#257CFF]/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group hover:-translate-y-1"
                >
                  <div>
                    <div
                      className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 mb-5 border border-white/10"
                      style={{ position: 'relative' }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-heading font-black text-lg sm:text-xl text-white group-hover:text-[#4DA5EC] transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs font-bold text-[#4DA5EC] mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {member.department}
                    </p>
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed font-normal">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Institutional Credentials
                    </div>
                    <ul className="space-y-1">
                      {member.credentials.map((cred, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-[#4DA5EC] font-bold">•</span>
                          <span>{cred}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto pt-6">
              <TrustBanner showFullDisclaimer={false} />
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
