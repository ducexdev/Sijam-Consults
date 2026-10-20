import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Compass, 
  FileCheck, 
  Plane, 
  ArrowRight 
} from "lucide-react";

const services = [
  {
    title: "Study Visa & Admissions",
    category: "Academic Mobility",
    desc: "Direct admissions and study visa guidance for accredited universities in Cyprus, Poland, Greece, Canada, and the United Kingdom.",
    href: "/services/study-visa",
    icon: GraduationCap,
    destinations: "Cyprus • Poland • Canada • UK",
  },
  {
    title: "Work Permits & Job Placement",
    category: "Global Employment",
    desc: "Lawful work authorization pathways, foreign employer contract verification, and embassy filing assistance for skilled professionals.",
    href: "/services/work-visa",
    icon: Briefcase,
    destinations: "Schengen Europe • Commonwealth",
  },
  {
    title: "EU Company Reg & D-Visa",
    category: "Corporate Relocation",
    desc: "Incorporate European business entities (Poland Sp. z o.o.) to open a statutory pathway to long-term D-Type Schengen residency for entrepreneurs and families.",
    href: "/services/business-registration",
    icon: Building2,
    destinations: "European Union • Poland • Schengen",
  },
  {
    title: "Tourist & Visitor Visas",
    category: "Leisure & Family Travel",
    desc: "Comprehensive visitor visa applications, itinerary building, and consular mock interview coaching for holiday and conference travelers.",
    href: "/services/tourist-visa",
    icon: Compass,
    destinations: "Schengen • UK • US • Canada • Dubai",
  },
  {
    title: "Travel Document Legalization",
    category: "Verification Services",
    desc: "Authentication and attestation of educational certificates, birth records, and police clearances with the Ministry of Foreign Affairs (MFA Abuja).",
    href: "/services/document-legalization",
    icon: FileCheck,
    destinations: "MFA Abuja • Foreign Embassies",
  },
  {
    title: "Flight Reservations & Ticketing",
    category: "Travel Logistics",
    desc: "100% verifiable flight itineraries with active PNR codes for embassy appointment submissions, plus commercial flight ticket issuance.",
    href: "/services/flight-reservations",
    icon: Plane,
    destinations: "All Major Global Airlines",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8FF] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F45A2A] mb-3">
            Tailored Pathways
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Specialized Services Built on Proven Outcomes
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            Every international mobility pathway requires precise legal compliance. Choose your service category below to explore verified requirements and timelines.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#402493]/10 shadow-card hover:shadow-hover hover:border-[#F45A2A]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF8FF] text-[#402493] border border-[#402493]/15">
                      {item.category}
                    </span>
                    <div className="p-3 rounded-xl bg-[#402493]/5 text-[#402493] group-hover:bg-[#F45A2A] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#402493] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#402493]/5">
                  <div className="text-xs text-[#94A3B8] font-medium mb-3">
                    Destinations: <strong className="text-[#0F172A]">{item.destinations}</strong>
                  </div>
                  <Link 
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#F45A2A] hover:text-[#DD4819] transition-colors"
                  >
                    <span>View Requirements & Timeline</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
