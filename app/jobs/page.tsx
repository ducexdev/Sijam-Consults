import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { JobsClientWrapper } from '@/components/jobs/JobsClientWrapper';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';
import { ROUTES } from '@/lib/routes';
import { Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verified International Job Vacancies | Sijam Consults',
  description:
    'Explore verified overseas job vacancies with direct employer sponsorship across the UK, Poland, and Slovakia for nurses, skilled trades, and technicians.',
  keywords: [
    'international job vacancies for nigerians',
    'jobs abroad for nigerians with visa sponsorship',
    'verified overseas recruitment jobs',
    'healthcare jobs in uk and poland for nigerians',
    'skilled trades jobs in europe for nigerians',
    'Sijam Consults jobs',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/jobs',
  },
};

export default function JobsPage() {
  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* Sections 1 to 6: Hero with Video, Search & Post A Job, Corridors, Employers, Directory HUD, Process, Testimonials */}
        <JobsClientWrapper />

        {/* 7. Unlisted Skills Talent Bank Callout */}
        <section className="py-12 bg-gradient-to-r from-[#120836] via-[#1C0D4F] to-[#0D0626] border-t border-purple-900/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-purple-200 border border-white/10 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#4DA5EC]" />
              <span>International Talent Repository</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Don't See Your Specific Trade or Profession Listed?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Foreign corporate quotas open continuously for industrial electricians, heavy machinery operators, hospitality crews, and healthcare workers. Register your profile and CV with our employment desk to be fast-tracked when matching allocations open.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href={ROUTES.consultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white font-black text-xs uppercase tracking-wider shadow-cta hover:brightness-110 transition-all border border-[#4DA5EC]/40"
              >
                <span>Submit CV to Talent Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.contact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs border border-white/15 transition-all"
              >
                <span>Visit Our Office</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Everything you need — stats row (Billion-Dollar Dark Banner) */}
        <section className="bg-[#0A0620] border-t border-purple-950/60 border-b border-purple-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <h2 className="font-heading font-black text-xl sm:text-3xl text-white text-center mb-8">
              Everything you need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#A855F7]">
                grow your career
              </span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { stat: '5+', label: 'Destination countries', icon: '🌍', desc: 'UK, Poland, Slovakia, Portugal & Cyprus' },
                { stat: '100+', label: 'Active job quotas', icon: '💼', desc: 'Open employer-sponsored positions' },
                { stat: '0', label: 'Illegal placement fees', icon: '🛡️', desc: 'Fully transparent — no hidden cuts' },
                { stat: '100%', label: 'Permit-backed roles', icon: '📋', desc: 'Every role includes statutory visa filing' },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all text-center space-y-2 group"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div className="font-heading font-black text-3xl text-white group-hover:text-[#4DA5EC] transition-colors">
                    {item.stat}
                  </div>
                  <div className="text-sm font-bold text-white/90">{item.label}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Discover opportunities in your field — tag cloud */}
        <section className="py-14 bg-[#070415]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="text-center">
              <h2 className="font-heading font-black text-xl sm:text-3xl text-white">
                Discover opportunities in your field
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Click any role category to browse live positions
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {[
                'Registered Nurse', 'Senior Care Assistant', 'MIG/MAG Welder', 'HGV Truck Driver',
                'Software Engineer', 'Automation Electrician', 'Bakery Operator', 'Greenhouse Technician',
                'Hotel Front Office', 'CNC Machinist', 'Automotive Assembler', 'Structural Fabricator',
                'Healthcare Support', 'Logistics Coordinator', 'Irrigation Manager', 'IT Systems Admin',
                'Executive Chef', 'F&B Supervisor', 'Mechanical Engineer', 'Guest Relations Manager',
                'Residential Care', 'Road Freight', 'Childcare Worker', 'Hospitality Staff',
                'Ausbildung Apprentice', 'Hospital Support', 'Agricultural Worker', 'Security Officer',
              ].map((role) => (
                <Link
                  key={role}
                  href="#directory"
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/[0.04] hover:bg-[#4DA5EC]/20 text-slate-300 hover:text-white border border-white/10 hover:border-[#4DA5EC]/40 transition-all"
                >
                  {role}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Global Consultation Banner */}
        <ConsultationBanner />
      </div>
    </PublicLayout>
  );
}
