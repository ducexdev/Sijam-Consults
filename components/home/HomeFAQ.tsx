'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Job Seekers & Candidates',
    question: 'Does Sijam Consults assist individuals seeking international employment?',
    answer:
      'Yes. Sijam Consults Limited connects qualified professionals, artisans, healthcare personnel, and skilled workers across Africa, Asia, and globally with legitimate international career opportunities. We guide candidates through credential screening, trade testing, compliance documentation, and statutory application stages. We operate transparently and never charge illegal placement fees.',
  },
  {
    category: 'International Employers & B2B',
    question: 'Can international employers hire manpower through Sijam Consults?',
    answer:
      'Yes. Foreign employers, international staffing firms, and contractors can partner with our dedicated B2B Manpower Supply Desk to recruit pre-vetted, trade-tested workforce cohorts from Africa, Asia, and international corridors across construction, engineering, hospitality, healthcare, agriculture, and logistics under structured corporate agreements and verified labor quotas.',
  },
  {
    category: 'Verification & Safety',
    question: 'How does Sijam Consults verify foreign job offers or recruitment corridors?',
    answer:
      'Every recruitment pathway undergoes rigorous due diligence before any applicant is introduced. We confirm corporate registry records, verify official quotas issued by destination labor ministries (such as Polish Voivodeship permits, Slovakian Single Permits, UK Home Office CoS, or Saudi Qiwa quotas), and authenticate genuine direct employment contracts.',
  },
  {
    category: 'Work Permits & Compliance',
    question: 'What documents are typically required for work permit processing?',
    answer:
      'Requirements vary by destination country and occupation, but standard files include: a valid international passport (minimum 6–12 months validity), standardized CV/resume, police character certificate legalised by the Ministry of Foreign Affairs (MFA Abuja), certified medical fitness report, verified educational/trade credentials, and authenticated work experience records.',
  },
  {
    category: 'Study Abroad & Admissions',
    question: 'How does your study abroad advisory work?',
    answer:
      'We provide student-first educational placement connecting applicants directly to accredited universities in Northern Cyprus, Poland, Spain, the United Kingdom, and Canada. We manage admissions paperwork, assist with institutional tuition fee grants (up to 50%), guide proof of funds structuring, and provide comprehensive student visa interview preparation.',
  },
  {
    category: 'Consular Disclaimer',
    question: 'Does Sijam Consults guarantee visa approval?',
    answer:
      'No. In compliance with international standards and Nigerian law, Sijam Consults does not and cannot guarantee visa approvals. Sovereign consular and immigration authorities retain sole discretion over visa issuance. Our role is strictly professional advisory: eliminating administrative omissions, ensuring legitimate documentation, and maximizing your compliance.',
  },
  {
    category: 'Office & In-Person Visits',
    question: 'Can I visit your Kaduna office for an in-person consultation?',
    answer:
      'Yes. Our corporate headquarters is located at Suite A10, 2/4 Kachia Road, Kaduna, Nigeria (CAC Registered RC: 1715416). Physical consultations, document verifications, and intake appointments are conducted Monday to Friday, 9:00 AM – 5:00 PM. You can schedule an appointment online or contact our desk directly.',
  },
];

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-20 lg:py-28 bg-[#070415] text-white border-b border-purple-950/70 relative overflow-hidden">
      {/* FAQ Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#402493]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#257CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
            <HelpCircle className="w-3.5 h-3.5 text-[#4DA5EC]" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Clear Answers on Recruitment, Visas &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
              Global Mobility
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our verified employer quotas, statutory work permits, university admissions, and international partnerships.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4DA5EC]">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                      {item.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#257CFF]/20 text-[#4DA5EC]' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fade-in">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assistance Help Box */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-3">
          <p className="text-xs sm:text-sm text-slate-300">
            Have a specialized inquiry about foreign employer quotas or B2B manpower supply?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-bold text-xs shadow-[0_8px_25px_-5px_rgba(77,165,236,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(37,124,255,0.7)] hover:brightness-110 transition-all"
            >
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              <span>Contact Senior Advisory Desk</span>
            </Link>
            <Link
              href={ROUTES.jobs.root}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#402493] to-[#2D186B] hover:from-[#3B1F8C] hover:to-[#1A1040] text-white font-semibold text-xs border border-purple-500/40 shadow-[0_8px_20px_-5px_rgba(64,36,147,0.5)] transition-all"
            >
              Browse Active Foreign Jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
