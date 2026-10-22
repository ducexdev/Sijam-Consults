import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Shield,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  Video,
  Phone,
  ArrowRight,
  Star,
  FileCheck2,
  Users,
  Globe2,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Building2,
  XCircle,
  PhoneCall,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ConsultationWizard } from '@/components/consultation/ConsultationWizard';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { COMPANY, ROUTES } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';

export const metadata: Metadata = {
  title: 'Book an Immigration Advisory Session | Sijam Consults',
  description:
    'Schedule a private advisory session with our senior documentation consultants. Comprehensive profile evaluation, roadmap planning, and transparent guidance.',
  keywords: [
    'book immigration consultation nigeria',
    'study abroad consultation session',
    'work permit advisory consultation',
    'speak with a certified visa consultant',
    'schedule overseas relocation assessment',
    'immigration consultant kaduna nigeria',
    'book visa consultation abuja',
    'one on one immigration advisory nigeria',
    'Sijam Consults consultation',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/consultation',
  },
};

const CONSULTATION_FAQS: AccordionItem[] = [
  {
    id: 'faq-1',
    question: 'What happens in the consultation session?',
    answer:
      'The session is structured into three parts: (1) Profile Audit — we review your academic credentials, employment history, travel record, and financial standing against the statutory requirements of your target country. (2) Risk Identification — we flag any vulnerabilities in your current documentation that would trigger a refusal or delay. (3) Roadmap Planning — you leave with a written action plan: exact documents required, preparation timelines, applicable costs, and the correct visa category for your profile.',
  },
  {
    id: 'faq-2',
    question: 'Do I need to bring original documents to the first consultation?',
    answer:
      'No. Original documents are never required at the consultation stage. We only ask you to describe your situation and share any existing digital copies. Physical documents are only verified once you formally retain our services and we begin building your consular dossier.',
  },
  {
    id: 'faq-3',
    question: 'How do I attend if I\'m not in Kaduna?',
    answer:
      'We offer fully encrypted high-definition virtual sessions via Google Meet or WhatsApp Video. The virtual session is identical in depth and rigor to the in-person experience. Clients from Lagos, Abuja, Port Harcourt, Kano, and across Nigeria regularly consult with us remotely. You only need a stable internet connection.',
  },
  {
    id: 'faq-4',
    question: 'What is the consultation fee?',
    answer:
      'Consultation fees vary by service type and session duration. Basic initial advisory sessions start at ₦15,000 (30 minutes) and full-profile dossier evaluation sessions are ₦30,000 (60 minutes). These fees are credited against your retainer if you proceed with our services. We never charge hidden fees.',
  },
  {
    id: 'faq-5',
    question: 'Can Sijam Consults help if I have a previous visa refusal?',
    answer:
      'Yes — and this is one of our specialist areas. We conduct forensic refusal analysis: we identify the exact refusal code applied by the embassy, determine what documentation gap triggered it, and build a remediation strategy. Over 40% of our clients carried a prior refusal before their successful application through Sijam.',
  },
  {
    id: 'faq-6',
    question: 'How quickly will I receive confirmation after booking?',
    answer:
      'All consultation requests are reviewed by our advisory desk within 2 business hours during operating hours (Monday to Friday, 9 AM – 5 PM WAT; Saturday, 10 AM – 2 PM WAT). You receive confirmation by email and WhatsApp with your confirmed slot, pre-session preparation guidelines, and your booking reference.',
  },
  {
    id: 'faq-7',
    question: 'Does sitting down with Sijam guarantee I\'ll get a visa?',
    answer:
      'No. And any consultant who guarantees a visa is either lying or using illegal means. What we guarantee is an honest assessment of your situation, a transparent action plan, and forensic attention to your documentation. Final visa decisions rest solely with foreign embassies and immigration authorities. What we do is give you the strongest possible file.',
  },
  {
    id: 'faq-8',
    question: 'What if I\'m not ready to proceed immediately after the consultation?',
    answer:
      'That\'s completely fine. The consultation itself has no obligation to proceed. We document your profile, provide your roadmap, and many clients return when they\'re ready — sometimes months later. Your case notes remain on file so you don\'t start from scratch.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    icon: FileCheck2,
    title: 'Select Your Service & Book',
    desc: 'Fill out the booking form below. Choose your service category, preferred channel (in-person or virtual), and your available date window.',
    color: 'text-[#4DA5EC]',
    bg: 'bg-[#4DA5EC]/15 border-[#4DA5EC]/30',
  },
  {
    step: '02',
    icon: Clock,
    title: 'Officer Review & Confirmation',
    desc: 'Our advisory desk reviews your profile within 2 business hours and sends a confirmed appointment with pre-session preparation guidelines.',
    color: 'text-[#F98864]',
    bg: 'bg-[#F98864]/15 border-[#F98864]/30',
  },
  {
    step: '03',
    icon: MessageSquare,
    title: 'Your Strategy Session',
    desc: 'A dedicated senior consultant conducts your 45–60 minute profile audit. Honest assessment, vulnerability identification, and a full relocation roadmap.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/15 border-purple-500/30',
  },
  {
    step: '04',
    icon: ArrowRight,
    title: 'Written Action Plan Delivered',
    desc: 'You receive a documented next-steps roadmap: exact documents needed, correct visa category, realistic timelines, and fee transparency — all in writing.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15 border-emerald-500/30',
  },
];

const SESSION_TYPES = [
  {
    icon: MapPin,
    title: 'In-Person — Kaduna HQ',
    badge: 'Suite A10, 2nd Floor, 2/4 Kachia Road',
    desc: 'Sit across from a senior consultant at our Kaduna headquarters. Full document review, whiteboard session, and written action plan on the day.',
    features: ['Physical document review', 'Face-to-face profile audit', 'Immediate written roadmap', 'Secure private session room'],
    accent: '#4DA5EC',
    accentBg: 'bg-[#4DA5EC]/15 border-[#4DA5EC]/25',
  },
  {
    icon: Video,
    title: 'Virtual — Google Meet / WhatsApp',
    badge: 'Available Nationwide & Internationally',
    desc: 'Encrypted high-definition video session. Identical in depth to the in-person session — accessible from any city or country worldwide.',
    features: ['Secure encrypted video link', 'Screen-share document review', 'Same-day written summary', 'Session recording available'],
    accent: '#402493',
    accentBg: 'bg-[#402493]/15 border-[#402493]/30',
  },
  {
    icon: Phone,
    title: 'WhatsApp Voice Advisory',
    badge: 'For Urgent & Quick Profile Queries',
    desc: 'Fast-track 30-minute structured advisory call for clients needing urgent pre-travel guidance or a quick eligibility read before formal engagement.',
    features: ['Same-day availability', 'Ideal for urgent queries', 'Case reference generated', 'No paperwork at this stage'],
    accent: '#F98864',
    accentBg: 'bg-[#F98864]/10 border-[#F98864]/25',
  },
];

const CASE_OUTCOMES = [
  {
    name: 'James O.',
    flag: '🇵🇱',
    destination: 'Poland',
    outcome: 'MIG/MAG Welder — Work Permit Approved',
    context: '2 previous refusals. We conducted a forensic refusal audit, rebuilt his employment verification file, and filed a corrected Voivodeship Type A permit. Approved in 58 days.',
    category: 'Employer Work Permit',
    icon: Briefcase,
  },
  {
    name: 'Blessing A.',
    flag: '🇬🇧',
    destination: 'United Kingdom',
    outcome: 'Nursing CoS — First-Pass Approval',
    context: 'RGN with NMC partial registration. We audited her clinical hours, completed OSCE preparation alignment, and lodged the CoS sponsorship file. Approved.',
    category: 'Healthcare Pathway',
    icon: Users,
  },
  {
    name: 'Amara S.',
    flag: '🇨🇾',
    destination: 'Cyprus',
    outcome: 'University Admission + 50% Grant',
    context: 'WAEC English waiver student. We identified the correct 50% scholarship programme, completed her university application, and secured admission without IELTS.',
    category: 'Study Abroad',
    icon: GraduationCap,
  },
  {
    name: 'Emeka T.',
    flag: '🇵🇱',
    destination: 'Poland',
    outcome: 'Sp. z o.o. Company Formed + Residence',
    context: 'Lagos-based entrepreneur. Wanted EU market entry. We incorporated his Polish LLC, opened a corporate EUR bank account, and secured his Director D-Visa.',
    category: 'Business Registration',
    icon: Building2,
  },
];

export default function ConsultationPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CONSULTATION_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Immigration Advisory Consultation',
    description:
      'One-on-one private advisory session with senior documentation consultants at Sijam Consults Limited. Covers profile evaluation, risk identification, and structured action plan delivery.',
    provider: {
      '@type': 'Organization',
      name: 'Sijam Consults Limited',
      url: 'https://sijamconsults.com',
    },
    areaServed: 'Nigeria',
    serviceType: 'Immigration Consultation',
  };

  return (
    <PublicLayout>
      <BreadcrumbSchema items={[{ label: 'Book Advisory Session', href: '/consultation' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="bg-[#070415] text-white min-h-screen relative overflow-hidden">
        {/* ── AMBIENT GRADIENTS ── */}
        <div className="fixed top-0 right-1/4 w-[700px] h-[700px] bg-[#402493]/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="fixed top-1/2 left-[-100px] w-[500px] h-[500px] bg-[#257CFF]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-[400px] h-[400px] bg-[#DC2F11]/08 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* ─────────────────────────────────────────────────────────
              SECTION 1 — HERO (2-Column Grid matching Homepage)
          ───────────────────────────────────────────────────────── */}
          <section className="pt-8 pb-16 lg:pt-12 lg:pb-20">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Book Advisory Session' }]} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* LEFT COLUMN — Copy */}
              <div className="lg:col-span-7 space-y-7">
                {/* Trust badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
                  <span>Direct Access · Senior Consular Advisory Desk</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
                    Stop Submitting{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                      Blind.
                    </span>
                    <br />
                    Sit Down With Someone{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F98864] to-[#F45A2A]">
                      Who Knows.
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    Most Nigerian applicants spend months preparing files that a consular officer rejects in 30 seconds.
                    Wrong visa category. Unseasoned funds. Missing documentation.
                  </p>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    A 60-minute session with a Sijam senior advisor doesn't just tell you <em className="text-white">what</em> to submit —
                    it tells you <em className="text-white">why your current file will fail</em> and what to fix before spending any consular fees.
                  </p>
                </div>

                {/* Proof micro-metrics */}
                <div className="grid grid-cols-3 gap-3 max-w-lg">
                  {[
                    { value: '500+', label: 'Clients Advised', color: 'text-[#4DA5EC]' },
                    { value: '98.4%', label: 'First-Pass Rate', color: 'text-emerald-400' },
                    { value: '< 2hr', label: 'Confirmation SLA', color: 'text-[#F98864]' },
                  ].map((m) => (
                    <div key={m.label} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                      <div className={`text-xl sm:text-2xl font-black ${m.color}`}>{m.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons — matching homepage style */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href="#book-session"
                      className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] rounded-xl"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book advisory session</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={COMPANY.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-bold text-sm tracking-wide border border-purple-500/40 shadow-[0_8px_25px_-5px_rgba(64,36,147,0.5)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Trust strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    CAC {COMPANY.cacNumber}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {COMPANY.address.suite}, Kaduna
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-[#F98864]" />
                    Mon – Fri 9AM – 5PM WAT
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN — Session Type Cards */}
              <div className="lg:col-span-5 space-y-4">
                {/* Advisor Preview Card */}
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#12093A] to-[#070415] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#257CFF]/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Advisory Desk Open</span>
                    </div>

                    <h2 className="font-heading font-black text-xl text-white mb-1">
                      What Your Session Covers
                    </h2>
                    <p className="text-xs text-slate-400 mb-5">
                      Every consultation follows our structured 4-pillar case audit framework.
                    </p>

                    <div className="space-y-3">
                      {[
                        { icon: FileCheck2, label: 'Profile & Document Readiness Audit', color: 'text-[#4DA5EC]' },
                        { icon: AlertTriangle, label: 'Refusal Risk Identification & Flagging', color: 'text-[#F45A2A]' },
                        { icon: Globe2, label: 'Correct Visa Category & Country Strategy', color: 'text-purple-400' },
                        { icon: TrendingUp, label: 'Written Relocation Roadmap & Timeline', color: 'text-emerald-400' },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                            <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                            <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Team preview */}
                    <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {['/team/James-Samson.png', '/team/David-Attai-Attaboh.jpeg', '/team/James-Egene-Friday.jpeg', '/team/Keziah-Simon.jpeg'].map((src, i) => (
                          <div key={i} className="w-9 h-9 rounded-full border-2 border-[#070415] overflow-hidden bg-[#402493]">
                            <Image src={src} alt="Advisor" width={36} height={36} className="object-cover" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Trusted by <strong className="text-white">500+ clients</strong> across Nigeria
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick channel tags */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: MapPin, label: 'In-Person', sub: 'Kaduna HQ', color: 'text-[#4DA5EC]' },
                    { icon: Video, label: 'Virtual', sub: 'Google Meet', color: 'text-purple-400' },
                    { icon: Phone, label: 'WhatsApp', sub: 'Voice Call', color: 'text-[#F98864]' },
                  ].map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                        <Icon className={`w-4 h-4 ${c.color} mx-auto mb-1`} />
                        <div className="text-xs font-bold text-white">{c.label}</div>
                        <div className="text-[10px] text-slate-400">{c.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2 — THE REAL PROBLEM
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  The Problem Nobody Tells You
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  Why 68% of Nigerian Visa Applications Get Refused Within{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-[#F45A2A]">
                    3 Minutes
                  </span>
                </h2>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    It's rarely fraud. Most refusals happen because a well-intentioned applicant used the wrong
                    visa category, submitted bank statements with deposits made the week before, or included
                    educational documents that weren't properly authenticated by the Ministry of Foreign Affairs.
                  </p>
                  <p>
                    A consular officer reviews thousands of files. Yours gets 3 minutes. Every inconsistency,
                    every documentation gap, every unexplained large deposit — all of it triggers an automated flag.
                  </p>
                  <p className="text-white font-semibold">
                    Consulting someone who understands exactly what that officer is looking for changes the outcome.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-lg text-white mb-4">
                  The 5 Most Common Reasons Nigerian Applications Fail
                </h3>
                {[
                  {
                    n: '01',
                    title: 'Wrong visa category entirely',
                    desc: 'Applying on a visitor visa when the correct route is a student or work permit. Officers reject immediately.',
                    color: 'border-l-rose-500',
                  },
                  {
                    n: '02',
                    title: 'Unseasoned proof of funds',
                    desc: 'Fresh lump-sum deposits made 2–3 weeks before submission. Consulates flag this as borrowed "show money."',
                    color: 'border-l-[#F45A2A]',
                  },
                  {
                    n: '03',
                    title: 'Missing document authentications',
                    desc: 'Degree certificates not apostilled or legalized by MFA Abuja. Employment letters on wrong letterhead.',
                    color: 'border-l-amber-500',
                  },
                  {
                    n: '04',
                    title: 'Sponsorship letters with no financial evidence',
                    desc: 'A sponsor letter without 6 months of bank statements and proof of relationship. Officers dismiss it.',
                    color: 'border-l-purple-500',
                  },
                  {
                    n: '05',
                    title: 'No explanation for travel gaps or refusals',
                    desc: 'Previous refusals left unexplained in the reapplication. A structured refusal rebuttal can reverse this.',
                    color: 'border-l-[#4DA5EC]',
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className={`pl-4 py-3.5 pr-4 rounded-r-xl bg-white/[0.03] border-l-2 ${item.color} border border-white/[0.06] border-l-0`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[11px] font-black text-slate-500 font-mono mt-0.5 shrink-0">{item.n}</span>
                      <div>
                        <div className="text-sm font-bold text-white">{item.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3 — SESSION TYPES
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#4DA5EC]/10 px-3 py-1 rounded-full border border-[#4DA5EC]/25 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                Three Ways to Meet Us
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                Choose Your Consultation Channel
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Every channel delivers the same forensic-grade advisory. Pick what suits your schedule and location.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SESSION_TYPES.map((session) => {
                const Icon = session.icon;
                return (
                  <div
                    key={session.title}
                    className={`rounded-2xl p-6 border backdrop-blur-md hover:scale-[1.02] transition-all duration-300 ${session.accentBg} space-y-4`}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center border"
                      style={{ background: `${session.accent}20`, borderColor: `${session.accent}40` }}>
                      <Icon className="w-5 h-5" style={{ color: session.accent }} />
                    </div>

                    <div>
                      <h3 className="font-heading font-black text-lg text-white">{session.title}</h3>
                      <p className="text-[11px] font-semibold mt-0.5" style={{ color: session.accent }}>
                        {session.badge}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{session.desc}</p>

                    <ul className="space-y-2">
                      {session.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: session.accent }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 4 — HOW IT WORKS (PROCESS)
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/25">
                  <Sparkles className="w-3.5 h-3.5" />
                  No Guesswork
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-[1.1]">
                  From Booking to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                    Written Roadmap
                  </span>{' '}
                  — Four Clear Steps
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We run a structured advisory session, not a sales pitch. Every client leaves with documented next steps — regardless of whether they proceed with us.
                </p>
                <a
                  href="#book-session"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start your booking</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROCESS_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.step}
                      className={`p-5 rounded-2xl border ${step.bg} backdrop-blur-md hover:scale-[1.01] transition-all`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-[11px] font-black text-slate-500 font-mono mt-1">{step.step}</span>
                        <Icon className={`w-5 h-5 ${step.color}`} />
                      </div>
                      <h3 className="font-heading font-bold text-base text-white mb-2">{step.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 5 — CASE OUTCOMES (Social Proof)
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Real Clients. Real Results.
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                Who Sits Across From Us — And What Happens Next
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
                These aren't cherry-picked exceptions. Methodical documentation work produces consistent results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CASE_OUTCOMES.map((outcome) => {
                const Icon = outcome.icon;
                return (
                  <div
                    key={outcome.name}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#4DA5EC]/30 hover:bg-white/[0.05] transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xl">
                          {outcome.flag}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{outcome.name}</div>
                          <div className="text-xs text-slate-400">{outcome.destination}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-slate-300 uppercase tracking-wider shrink-0">
                        {outcome.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-emerald-300">{outcome.outcome}</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{outcome.context}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={ROUTES.reviews}
                className="inline-flex items-center gap-2 text-sm text-[#4DA5EC] hover:text-white font-semibold transition-colors"
              >
                <span>Read all client case outcomes</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 6 — WHO WE'RE NOT RIGHT FOR
          ───────────────────────────────────────────────────────── */}
          <section className="py-14 border-t border-white/[0.06]">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-700/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <h3 className="font-heading font-bold text-lg text-rose-300">
                      We may not be right for you if…
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'You want someone to guarantee visa approval.',
                      'You\'re looking for the cheapest option without scrutiny.',
                      'You\'re expecting us to file documents without conducting a real audit.',
                      'You want to submit fabricated employment letters or false financial records.',
                      'You\'re not willing to take 3–6 months to properly season your proof of funds.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-rose-200 leading-relaxed">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-700/30 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-heading font-bold text-lg text-emerald-300">
                      You'll get real value if…
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'You want an honest assessment of your application strength.',
                      'You\'re prepared to follow a structured roadmap, even if it takes preparation time.',
                      'You have a previous refusal and need a forensic analysis of what went wrong.',
                      'You want clarity on the correct visa category before spending money on fees.',
                      'You value transparent communication and accurate documentation over shortcuts.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-emerald-200 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 7 — THE BOOKING FORM (ANCHOR)
          ───────────────────────────────────────────────────────── */}
          <section id="book-session" className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA5EC] bg-[#4DA5EC]/10 px-3 py-1 rounded-full border border-[#4DA5EC]/25 mb-3">
                <Lock className="w-3.5 h-3.5" />
                Secure Booking · NDPR Compliant
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                Calculate Your Case Readiness &amp; Reserve Your Session
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Takes 3 minutes. No original documents required at this stage. Your details stay private.
              </p>
            </div>

            <ConsultationWizard />
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 8 — FAQ
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
                  Honest Answers to Common Questions
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  No corporate spin. Just clear answers from people who've handled these situations before.
                </p>
              </div>

              <Accordion items={CONSULTATION_FAQS} variant="dark" allowMultiple={false} />
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────
              SECTION 9 — SOFT CLOSING CTA
          ───────────────────────────────────────────────────────── */}
          <section className="py-16 sm:py-20 border-t border-white/[0.06]">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-br from-[#120C33] via-[#0E0926] to-[#070415] border border-white/15 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#402493]/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#257CFF]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/25">
                  <Sparkles className="w-3.5 h-3.5" />
                  No Pressure. No Obligation.
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                  You Don't Have to Figure This Out Alone.
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Even if you're not ready to proceed today — a consultation gives you the complete picture.
                  You'll know exactly where you stand, what needs fixing, and what it actually costs.
                  That knowledge alone is worth the session.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="#book-session"
                    className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(77,165,236,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(37,124,255,0.8)] hover:brightness-110 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book your session now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={COMPANY.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <PhoneCall className="w-4 h-4 text-[#4DA5EC]" />
                    <span>Or message us first</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-500 pt-1">
                  Sijam Consults Limited · {COMPANY.cacNumber} · {COMPANY.address.city}, Nigeria
                  {' '}· Not an embassy or visa-issuing authority.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PublicLayout>
  );
}
