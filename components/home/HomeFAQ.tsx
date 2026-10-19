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
    category: 'International Recruitment',
    question: 'What is Sijam Consults’ International Recruitment and Manpower Supply service?',
    answer:
      'Sijam Consults Limited is an accredited international recruitment agency (RC: 1715416) bridging qualified skilled, technical, healthcare, and blue-collar personnel with verified foreign employer quotas across the UK, Poland, Slovakia, Portugal, Cyprus, and Saudi Arabia. We handle candidate pre-screening, practical trade testing, statutory labor permit filings, and embassy visa legalisation.',
  },
  {
    category: 'Safety & Compliance',
    question: 'How does Sijam Consults protect candidates from fake foreign job offers?',
    answer:
      'Every job quota published through Sijam Consults is authenticated by an official employer contract and approved by destination labor ministries (such as Polish Voivodeship permits, Slovakian labor office quotas, or UK Certificates of Sponsorship). We enforce zero illegal placement deductions and ensure all files are legalised through the Federal Ministry of Foreign Affairs (MFA Abuja) and consular offices.',
  },
  {
    category: 'B2B Employers',
    question: 'How can European or Gulf employers partner with Sijam for bulk manpower supply?',
    answer:
      'Foreign corporations, construction contractors, healthcare facilities, and international recruitment agencies can engage our dedicated B2B Manpower Desk. Sijam Consults coordinates candidate sourcing, trade testing, medical clearances, and consular attestation to deploy job-ready cohorts under formal Service Level Agreements (SLAs).',
  },
  {
    category: 'Study Abroad',
    question: 'What countries and scholarships are available for Study Abroad admissions?',
    answer:
      'We hold direct bilateral agreements with accredited European universities in Northern Cyprus (Cyprus West University), Poland (WSEI Krakow), Spain, the UK, and Canada. We assist students with direct acceptance letters, tuition fee scholarship grants up to 50%, Proof of Funds (POF) structuring, and visa interview preparation without sub-agent markups.',
  },
  {
    category: 'Business Setup',
    question: 'Can Nigerian entrepreneurs incorporate a European company through Sijam Consults?',
    answer:
      'Yes. Our Business Setup and International Business Consultancy service facilitates remote company incorporation in Poland (Sp. z o.o.) and the United Kingdom, including KRS court registration, VAT/NIP tax identification, EU corporate banking, and Schengen business residency advisory for directors.',
  },
  {
    category: 'Football Talent',
    question: 'How does the Football Talent Networking and International Partnerships program work?',
    answer:
      'Through verified sports mobility networks, Sijam Consults connects promising African football players, grassroots academies, and athletes with legitimate trial invitations, youth academy scouting links, and compliant sports visa advisory for European football clubs and FIFA-licensed academies.',
  },
];

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#070415] text-white border-b border-purple-950/70 relative overflow-hidden">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2F11] to-[#F45A2A] text-white font-bold text-xs shadow-[0_8px_25px_-5px_rgba(220,47,17,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(220,47,17,0.7)] hover:brightness-110 transition-all"
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
