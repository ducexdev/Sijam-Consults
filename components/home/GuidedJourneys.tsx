"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Briefcase, Building2, Check, ArrowRight } from "lucide-react";

const journeys = [
  {
    id: "student",
    label: "I Am A Student",
    icon: GraduationCap,
    title: "University Admissions & Scholarship Pathways",
    subtitle: "For undergraduate and postgraduate applicants seeking accredited degrees abroad.",
    benefits: [
      "Partner admissions in Cyprus, Poland, Greece, and Portugal",
      "Partial tuition scholarships up to 50% through Cyprus West University",
      "Comprehensive Visa Statement of Purpose (SOP) drafting guidance",
      "No IELTS required for select English-taught European institutions",
    ],
    recommendedService: "Study Visa Advisory",
    href: "/services/study-visa",
  },
  {
    id: "professional",
    label: "I Am A Skilled Worker",
    icon: Briefcase,
    title: "Overseas Work Permits & Employment Placement",
    subtitle: "For experienced technicians, artisans, IT experts, and healthcare workers.",
    benefits: [
      "Assistance with genuine employer sponsorship documentation",
      "Work permit filing compliant with host country labor ministries",
      "Police clearance authentication and medical report verification",
      "Pre-departure orientation and employment contract review",
    ],
    recommendedService: "Work Permit & Placement",
    href: "/services/work-visa",
  },
  {
    id: "investor",
    label: "I Am An Entrepreneur",
    icon: Building2,
    title: "European Company Formation & Schengen D-Visa",
    subtitle: "For business owners seeking European market access and residence permits.",
    benefits: [
      "Incorporate a Polish Sp. z o.o. or EU business entity remotely",
      "Open corporate bank accounts and obtain EU tax/VAT registrations",
      "Qualify for National D-Type Schengen Visas permitting EU-wide travel",
      "Pathway to long-term European residency for you and your family",
    ],
    recommendedService: "EU Company Registration & D-Visa",
    href: "/services/business-registration",
  },
];

export function GuidedJourneys() {
  const [activeTab, setActiveTab] = useState("student");
  const current = journeys.find((j) => j.id === activeTab) || journeys[0];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 bg-[#FAF8FF] border-b border-[#402493]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F45A2A] mb-2">
            Personalized Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Find the Route Designed for Your Goals
          </h2>
        </div>

        {/* Audience Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#402493]/15 shadow-sm max-w-full overflow-x-auto">
            {journeys.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-[#402493] text-white shadow-md" 
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Journey Detail Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#402493]/10 shadow-card max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#402493]/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F45A2A]">
                Recommended Path
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
                {current.title}
              </h3>
              <p className="text-sm text-[#475569] mt-2">
                {current.subtitle}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#402493]/5 text-[#402493] self-start md:self-auto shrink-0">
              <CurrentIcon className="w-8 h-8" />
            </div>
          </div>

          <div className="py-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-4">
              What This Program Includes:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-[#0F172A] font-medium leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#402493]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#475569]">
              Ready to check eligibility? Takes less than 2 minutes.
            </div>
            <Link 
              href={current.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-cta transition-transform hover:scale-[1.02] border border-[#4DA5EC]/30"
            >
              <span>Explore {current.recommendedService}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
