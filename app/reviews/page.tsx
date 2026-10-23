import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  Award,
  CheckCircle2,
  Mail,
  ArrowRight,
  FileCheck2,
  Lock,
  Scale,
  Building2,
  Video,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles,
  PhoneCall,
  ExternalLink,
  MapPin,
  Clock,
  Check,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { Accordion } from '@/components/ui/Accordion';
import { ReviewsShowcase } from '@/components/reviews/ReviewsShowcase';
import { VIDEOS } from '@/lib/constants/videos';
import { COMPANY, ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Client Reviews & Verified Relocations | Sijam Consults',
  description:
    'Read genuine client reviews and watch video testimonials from Nigerian students, professionals, and families successfully relocated through Sijam Consults.',
  keywords: [
    'sijam consults reviews and testimonials',
    'sijam consults success stories',
    'verified study visa approvals nigeria',
    'poland work permit case studies nigeria',
    'genuine travel agency reviews kaduna',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/reviews',
  },
};

export default function ReviewsPage() {
  const faqItems = [
    {
      id: 'faq-1',
      question: 'Are the visa approval stamps and client reviews on this page authentic?',
      answer:
        'Yes. Every visa stamp, admission letter, and video recording published on this page represents an authentic sovereign consular decision for a Sijam Consults client. In strict accordance with the Nigeria Data Protection Act (NDPR 2023) and international privacy laws, sensitive personal identifiers (such as passport numbers, full dates of birth, and biometric barcodes) have been meticulously redacted to protect our clients while displaying verifiable governmental seals and visa categories.',
    },
    {
      id: 'faq-2',
      question: 'Does Sijam Consults guarantee visa approvals for applicants?',
      answer:
        'No ethical or legally compliant immigration consultancy can ever promise a 100% guaranteed visa. The legal authority to grant or deny an entry visa rests solely with the consular officers of respective sovereign governments (such as the UK Home Office, IRCC Canada, or Schengen Voivodeship and consular desks). What Sijam Consults guarantees is our audited zero-omission forensic file preparation: rigorous proof-of-funds validation, genuine institutional covenants, and interview simulation that eliminates preventable procedural refusal triggers.',
    },
    {
      id: 'faq-3',
      question: 'Can I speak with past clients or inspect physical case files before retaining Sijam?',
      answer:
        'To respect the confidentiality and privacy of our alumni under NDPR 2023, we do not distribute private personal telephone numbers. However, prospective applicants are invited to visit our corporate headquarters in Kaduna (Suite A10, 2nd Floor, 2/4 Kachia Road). There, you can review our catalogued archive of consented physical visa records, examine bilateral university partnership agreements, and inspect our Corporate Affairs Commission credentials (RC: 1715416) in person.',
    },
    {
      id: 'faq-4',
      question: 'What specific assistance does Sijam provide that leads to these successful outcomes?',
      answer:
        'Our assistance is tailored to the specific legal corridor: for students, we secure direct university admissions with 50% to 75% tuition scholarships and authenticate transcripts at the Ministry of Foreign Affairs in Abuja. For skilled workers, we verify Voivodeship labor quotas and employment contracts. Across all files, we conduct 28-day financial seasoning audits, draft evidence-backed Statements of Purpose, and run 1-on-1 embassy mock interviews.',
    },
    {
      id: 'faq-5',
      question: 'Why do so many Nigerian applicants experience visa refusals before coming to Sijam?',
      answer:
        'Over 80% of client files brought to us after prior refusals suffered from preventable technical failures created by informal roadside agents: unseasoned lump-sum bank deposits, unverified parental sponsorship claims, third-party sub-agent admission markups, or poorly reconciled business tax records. Sijam corrects these discrepancies with forensic accounting alignment and statutory legal affidavits before re-lodging.',
    },
    {
      id: 'faq-6',
      question: 'How do I submit my own review after my visa is granted?',
      answer:
        'We encourage all alumni and corporate partners to document their journeys. You can click the "Leave a review" button on this page to share your experience, upload feedback, or record a video testimonial. Our compliance team verifies your case reference against our internal archive before featuring your review with appropriate NDPR privacy redactions.',
    },
  ];

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sijam Consults Limited',
    image: 'https://sijamconsults.com/brand/logo.png',
    telephone: '+2347064229556',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Suite A10, 2nd Floor, 2/4 Kachia Road',
      addressLocality: 'Kaduna',
      addressRegion: 'Kaduna State',
      postalCode: '800283',
      addressCountry: 'NG',
    },
    priceRange: '₦₦₦',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Emeka O.',
        },
        datePublished: '2026-08-12',
        reviewBody:
          'Sijam Consults handled my admission into the College of Economics and Computer Science in Poland without any stress. They reviewed my transcript, guided my tuition deposit, and coached me through the embassy interview. My visa was approved in 4 weeks!',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sunday A.',
        },
        datePublished: '2026-06-25',
        reviewBody:
          'What I respect most about Sijam Consults is honesty. They told me plainly what documents I needed for the Voivodeship work permit and did not charge me any hidden fees. My work visa was granted and I am now working legally in Poland.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Organization',
          name: 'Vatican Bells Pharmaceutical',
        },
        datePublished: '2026-05-18',
        reviewBody:
          'Sijam Consults handles our international executive document legalizations and embassy attestations at the Ministry of Foreign Affairs Abuja with remarkable diligence.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen selection:bg-[#257CFF] selection:text-white">
        
        {/* ── 1. ARCHITECTURAL HERO: 2-Column Grid Layout Matching Homepage Standard ── */}
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-14 lg:pb-28 border-b border-white/10">
          {/* Ambient Video Background Layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-125 scale-105"
              src={VIDEOS.TOURIST_VISA}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/80 to-[#070415]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(64,36,147,0.4),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(37,124,255,0.18),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Breadcrumbs items={[{ label: 'Client Reviews & Case Studies' }]} />
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Consular Outcomes Registry • NDPR 2023 Compliant</span>
              </div>
            </div>

            {/* 2-Column Grid Matching Homepage Architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column (7 cols): Copy, Dual Buttons & Proof Points */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Statutory Trust Badge */}
                <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Evidence</span>
                  </div>
                  <span className="text-xs text-slate-300 font-mono">
                    RC: {COMPANY.cacNumber} • 55+ Catalogued Visa Stamps
                  </span>
                </div>

                {/* H1 Heading Using Homepage Font Classes */}
                <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
                  Real visas, authentic admissions, and{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] via-[#257CFF] to-[#60A5FA]">
                    documented client journeys.
                  </span>
                </h1>

                {/* Lead Subtitle */}
                <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                  In an industry plagued by fabricated testimonies and borrowed screenshots, <strong className="text-white font-semibold">Sijam Consults Limited</strong> presents verifiable consular proof: redacted passport visa stamps, unedited client video recordings, and authenticated institutional admission letters.
                </p>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                  Every case featured here represents a genuine Nigerian professional, family, or student whose dossier was forensically audited and successfully approved through lawful sovereign pathways.
                </p>

                {/* Dual Homepage CTA Buttons (Sentence Case) */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={ROUTES.consultation}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Book advisory session</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href={ROUTES.assessment}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FileCheck2 className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Eligibility pre-check</span>
                  </Link>
                </div>

                {/* Trust Verification Ledger */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-white">55+</div>
                    <div className="text-[10px] font-mono text-[#4DA5EC] uppercase">Visa Stamps</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-emerald-400">98.4%</div>
                    <div className="text-[10px] font-mono text-emerald-400 uppercase">First-Pass Rate</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-amber-400">4.9 / 5.0</div>
                    <div className="text-[10px] font-mono text-amber-400 uppercase">Client Rating</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xl sm:text-2xl font-heading font-black text-purple-400">100%</div>
                    <div className="text-[10px] font-mono text-purple-400 uppercase">NDPR Redacted</div>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): High-Trust Verification Showcase Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md rounded-3xl p-6 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent border border-white/20 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] ring-1 ring-white/15 relative overflow-hidden space-y-6">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,_rgba(37,124,255,0.2),_transparent_70%)] pointer-events-none" />

                  {/* Header bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                        Documented Evidence
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Consular Audited
                    </span>
                  </div>

                  {/* Featured Stamp Preview Frame */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white p-2 shadow-lg">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900">
                      <Image
                        src="/visas/1.png"
                        alt="Poland National D-Type Work Visa Stamp — Sijam Consults Client"
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-white">
                        <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded font-bold">
                          Poland Voivodeship D-Visa
                        </span>
                        <span className="text-slate-300">Redacted NDPR</span>
                      </div>
                    </div>
                  </div>

                  {/* Aggregate Rating Block */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        128 Verified Reviews
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &ldquo;Sijam audited my entire file after a painful previous refusal. My visa was approved in 4 weeks.&rdquo;
                    </p>
                    <div className="text-[11px] font-bold text-white pt-1">
                      — Emeka O. (MSc Computer Science, Poland)
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="pt-1">
                    <a
                      href="#reviews-gallery"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-xs border border-white/15 backdrop-blur-xl transition-all group"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#4DA5EC]" />
                      <span>Inspect catalogued stamps below</span>
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── 2. THE PROBLEM: The Nigerian Visa Evidence Dilemma ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(37,124,255,0.06),_transparent_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>The Evidence Problem in Nigeria</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Why 82% of online visa testimonials are{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-yellow-300">
                  manufactured or unverified.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                If you have spent any time searching for travel agents in Nigeria, you have seen the endless stream of cropped WhatsApp messages and anonymous text praise. The uncomfortable truth is that most of it is fabricated:
              </p>
            </div>

            {/* The 3 Fatal Traps of Fake Testimonials vs Sijam Standard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-7 rounded-3xl bg-red-950/20 border border-red-500/25 space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Downloaded Internet Stamps
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Roadside operators scrape visa stamps from international travel blogs and post them as Nigerian client successes. When asked for case details or consular dates, they cannot provide them.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Sijam catalogues 55+ real, high-resolution redacted stamps</span>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-red-950/20 border border-red-500/25 space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Fabricated WhatsApp Chats
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Unregistered agents use chat generator apps to simulate conversations praising fake fast approvals. There are no client identities, no verifiable university ties, and no legal trace.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Sijam provides unedited, consented video recordings from real clients</span>
                </div>
              </div>

              <div className="p-7 rounded-3xl bg-red-950/20 border border-red-500/25 space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Anonymous Ghost Operators
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Reviews with no corporate accountability. The &ldquo;agency&rdquo; has no physical office, no CAC registration number, and disappears as soon as a consular query or visa refusal arrives.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Sijam operates permanent corporate premises in GRA Kaduna</span>
                </div>
              </div>

            </div>

            {/* Evidence Policy Statement */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl space-y-4">
              <div className="max-w-4xl space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4DA5EC] uppercase tracking-wider">
                  <Scale className="w-4 h-4" />
                  <span>Our Consular Evidence Standard</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  Transparent Case Auditing Without Compromising Client Privacy
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  We balance absolute authenticity with strict statutory privacy laws under the <strong className="text-white">Nigeria Data Protection Act (NDPR 2023)</strong>. Every visa stamp showcased on this site has personal identifiers obscured while preserving the genuine consular holographic features, entry class, and issuing embassy seals.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  We explicitly state what we did (file pre-audit, financial seasoning, university enrollment, mock interview prep) and acknowledge that final approval is always the sovereign decision of the visa-granting nation.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. UNIQUE INFORMATION GAIN: Anatomy of Lawful Consular Approval ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Information Gain • Consular Mechanics</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                The Anatomy of a Lawful Approval:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  What Consulates Actually Audit
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Why some Nigerian applications sail through while others with identical bank balances face instant rejection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#257CFF]/15 border border-[#257CFF]/30 flex items-center justify-center text-[#4DA5EC]">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  1. Financial Velocity &amp; Source Seasoning
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Consular officers do not look merely at the final closing balance. Automated risk algorithms scan account turnover, transaction regularity, and debit-to-credit velocity. A single unexplained ₦10M deposit three days before printing triggers immediate suspicion under Section 214(b) or UK Part 9 refusal codes.
                </p>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-200">
                  <strong className="text-[#4DA5EC]">The Sijam Difference:</strong> We conduct a 28-day forensic review of your account turnover, reconciling family assets and corporate business cash flow with verifiable tax receipts before embassy submission.
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  2. Institutional Covenants vs Broker Sub-Agents
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  When a roadside agent applies through secondary third-party portals, the university admissions desk treats the applicant as high risk. Without direct bilateral MOUs, verification inquiries from the embassy in Abuja often go unanswered, leading to procedural refusal.
                </p>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-200">
                  <strong className="text-emerald-400">The Sijam Difference:</strong> Our direct bilateral covenants (Cyprus West University, WSEI Krakow) ensure your admission is verified directly by the university registrar and backed by official scholarship covenants.
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  3. Ministerial Legalization Chain in Abuja
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  European embassies (Poland, Slovakia, Portugal, Greece) require authentic state document authentication: High Court affidavits, Ministry of Education evaluation, and final Ministry of Foreign Affairs (MFA) apostille/attestation stamps in Abuja.
                </p>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-200">
                  <strong className="text-purple-400">The Sijam Difference:</strong> We manage physical document legalization directly in Abuja, ensuring stamps are registered in the MFA ledger and securely transported via tracked courier.
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                  4. Biometric Interview Congruence
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Most rejections happen when an applicant contradicts their own written Statement of Purpose during the 5-minute consular interview. Inconsistencies between spoken answers and submitted documentation lead directly to credibility refusals.
                </p>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-200">
                  <strong className="text-amber-400">The Sijam Difference:</strong> We conduct 1-on-1 interview simulations that drill applicants on exact consular question models, course curriculum details, and post-study career trajectory.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. THE INTERACTIVE REVIEWS & STAMPS SHOWCASE ── */}
        <section id="reviews-gallery" className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Case Archive</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Catalogued Consular Proof:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Stamps, Videos &amp; Testimonials
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Filter through our documented outcomes. Click any visa stamp to inspect issuing authority details, or watch unedited video testimonials from relocated applicants.
              </p>
            </div>

            {/* Showcase Component with Tab Filters, Zoom Modal & Submission CTA */}
            <ReviewsShowcase />

          </div>
        </section>

        {/* ── 5. DETAILED CASE STUDIES (Real Stories & Forensic Solutions) ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>In-Depth Case Studies</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                How Complex Relocation Challenges Were Resolved
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Examine 3 documented client cases illustrating how our zero-omission file audit turns high-risk applications into verified approvals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Case 1: Skilled Work Permit */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[11px] font-mono font-bold text-[#4DA5EC]">
                      Poland Work Permit
                    </span>
                    <span className="text-xs text-slate-400">Category: Skilled Labor</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white">
                    Structural Welder: Overcoming a Previous Lagos Refusal
                  </h3>

                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong className="text-white">The Challenge:</strong> Client had previously applied through an informal agent in Lagos with poorly authenticated technical certificates, resulting in a refusal under Polish Voivodeship labor verification guidelines.
                    </p>
                    <p>
                      <strong className="text-white">The Sijam Intervention:</strong> We re-audited his technical welder certifications, secured official trade competency validations, and re-authenticated his documents at the Ministry of Foreign Affairs in Abuja. We prepared a comprehensive employer endorsement file.
                    </p>
                    <p>
                      <strong className="text-emerald-400 font-semibold">The Result:</strong> Polish National D-Type Work Visa granted in 4 weeks. Client is now legally employed with full residency rights.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Client: Sunday A. (Jos, Nigeria)</span>
                  <span className="text-emerald-400 font-bold">Approved</span>
                </div>
              </div>

              {/* Case 2: University Study Admissions */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400">
                      European Master&apos;s
                    </span>
                    <span className="text-xs text-slate-400">Category: Study Visa</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white">
                    Computer Science MSc: Direct Admission with 50% Scholarship
                  </h3>

                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong className="text-white">The Challenge:</strong> Student held a Nigerian university degree but had irregular sponsor banking records and was unsure how to navigate European embassy proof-of-funds guidelines.
                    </p>
                    <p>
                      <strong className="text-white">The Sijam Intervention:</strong> We secured direct admission into the College of Economics and Computer Science (WSEI) with a 50% institutional grant, reconciled parental sponsor assets with High Court affidavits, and ran 3 intensive mock interview simulations.
                    </p>
                    <p>
                      <strong className="text-emerald-400 font-semibold">The Result:</strong> Visa approved on first submission. Student enrolled and currently pursuing master&apos;s coursework in Krakow.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Client: Emeka O. (Kaduna, Nigeria)</span>
                  <span className="text-emerald-400 font-bold">Approved</span>
                </div>
              </div>

              {/* Case 3: Family Holiday & Travel Advisory */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[11px] font-mono font-bold text-purple-300">
                      UK Family Travel
                    </span>
                    <span className="text-xs text-slate-400">Category: Visitor Visa</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white">
                    Family of 4: Clean Consular Re-alignment of Business Accounts
                  </h3>

                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong className="text-white">The Challenge:</strong> Business-owning couple traveling with two minor children needed to explain complex corporate bank accounts to the UK Home Office without raising tax or tie-to-home-country concerns.
                    </p>
                    <p>
                      <strong className="text-white">The Sijam Intervention:</strong> Structured a detailed corporate letter of authority, reconciled audited financial accounts, created a confirmed itinerary with verified accommodation, and built a watertight demonstration of ongoing Nigerian commercial ties.
                    </p>
                    <p>
                      <strong className="text-emerald-400 font-semibold">The Result:</strong> Multi-entry UK Visitor Visas issued for all 4 family members within standard statutory processing windows.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Client: Fatima &amp; Aliyu M.</span>
                  <span className="text-emerald-400 font-bold">Approved</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── 6. UX PSYCHOLOGY QUALIFICATION: We May Not Be Right For You If... ── */}
        <section className="py-20 lg:py-28 bg-[#0B071E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Expectation &amp; Qualification Charter</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Is Sijam Consults the Right Advisory for You?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Our 98.4% first-pass consular rate is built on working only with clients whose cases and ethical standards align with our forensic verification charter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Disqualifier */}
              <div className="p-8 sm:p-10 rounded-3xl bg-red-950/20 border border-red-500/30 space-y-6">
                <div className="flex items-center gap-3 text-red-400">
                  <XCircle className="w-6 h-6 flex-shrink-0" />
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    We may not be right for you if:
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You want someone to &ldquo;arrange&rdquo; fake bank statements or manipulate financial records. We reject fraudulent documents immediately.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You expect &ldquo;100% guaranteed visa stamps&rdquo; without regard to sovereign consular authority. No legitimate agency can promise embassy decisions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You refuse to attend mandatory embassy mock interview simulations or decline proper document legalization at the Ministry of Foreign Affairs in Abuja.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span>
                      You are looking for shortcuts that bypass legal immigration statutory codes.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Qualifier */}
              <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-6">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    We are built specifically for you if:
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You want verified, authentic international pathways backed by official university covenants and genuine European work authorizations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You value working with an incorporated corporate entity (CAC RC: 1715416) with physical Kaduna headquarters and milestone-based contracts.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You have experienced a prior refusal and want an experienced team to conduct a forensic refusal audit and correct structural weaknesses.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>
                      You are a family, corporate organization, or student seeking long-term lawful mobility with zero risk of 10-year travel bans.
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── 7. SEARCH-OPTIMIZED FAQ ACCORDION ── */}
        <section className="py-20 lg:py-28 bg-[#070415] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#257CFF]/15 border border-[#257CFF]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#4DA5EC]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Answered Questions</span>
              </div>
              
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                Consular Transparency &amp; Verifiable Proof
              </h2>

              <p className="text-sm sm:text-base text-slate-300">
                Direct answers to common questions regarding our client reviews, visa approval rates, and verification procedures.
              </p>
            </div>

            <Accordion items={faqItems} allowMultiple={false} variant="dark" />
          </div>
        </section>

        {/* ── 8. EXECUTIVE CLOSING INVITATION (FINAL CTA) ── */}
        <section className="py-20 bg-gradient-to-b from-[#0A061C] to-[#070415] relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#18233C] via-[#0E1627] to-[#070415] border border-white/20 shadow-[0_30px_90px_rgba(37,124,255,0.25)] ring-1 ring-[#4DA5EC]/30 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(37,124,255,0.2),_transparent_70%)] pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs text-[#4DA5EC] font-mono font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>START YOUR VERIFIED APPLICATION • ZERO-OMISSION AUDIT</span>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                  Ready to add your success story to our documented archive?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Schedule your comprehensive eligibility pre-assessment today. Meet our senior directors in person at Kaduna or via encrypted video consultation.
                </p>
              </div>

              {/* Dual Homepage CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href={ROUTES.consultation}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Book advisory session</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href={ROUTES.assessment}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileCheck2 className="w-4 h-4 text-[#4DA5EC]" />
                  <span>Eligibility pre-check</span>
                </Link>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> CAC RC: {COMPANY.cacNumber}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#4DA5EC]" /> Permanent Kaduna Premises
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 98.4% Consular Compliance
                </span>
              </div>
            </div>

            <div className="pt-12">
              <TrustBanner showFullDisclaimer={true} />
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}