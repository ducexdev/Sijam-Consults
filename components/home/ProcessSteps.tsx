import React from 'react';
import { Search, FileSearch, Send, PlaneTakeoff, Sparkles } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Candid Eligibility Evaluation',
      description: 'We evaluate your academic transcripts, work history, and financial profile to identify viable destinations—never giving false hope.',
      icon: Search,
    },
    {
      step: '02',
      title: 'File Audit & Remediation',
      description: 'Every statement, sponsorship letter, and affidavit is forensically audited to eliminate inconsistencies before submission.',
      icon: FileSearch,
    },
    {
      step: '03',
      title: 'Filing & Mock Consular Prep',
      description: 'We guide official portal submissions and conduct 1-on-1 simulated interviews so you face consular officers with composure.',
      icon: Send,
    },
    {
      step: '04',
      title: 'Departure, Flights & Hotel Logistics',
      description: 'Upon approval, our travel agency coordinates verified flight bookings, hotel reservations, and arrival orientation.',
      icon: PlaneTakeoff,
    },
  ];

  return (
    <section className="py-20 bg-[#070415] text-white border-b border-purple-950/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold uppercase tracking-wider text-[#F98864] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
            <span>Methodical & Transparent</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Our 4-Stage Advisory Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal">
            How our <strong className="text-white font-medium">travel agency</strong> guides your journey: clear milestones from initial profile intake to international touchdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-black text-2xl text-[#F98864]">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#402493]/60 text-purple-200 flex items-center justify-center border border-purple-500/30 group-hover:bg-[#F45A2A] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#F98864] transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
