import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleDirectory } from '@/components/guides/ArticleDirectory';
import { GUIDES_DATA } from '@/lib/data/guides';
import { BookOpen, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { ConsultationBanner } from '@/components/home/ConsultationBanner';

export const metadata: Metadata = {
  title: 'Travel Guides & Immigration Advisory | Sijam Consults Limited',
  description: 'Forensic immigration roadmaps, European study admission guides, and work permit verification advice authored by Sijam Consults Limited.',
};

export default function GuidesPage() {
  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* Cinematic Masthead Hero */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-125"
              src="/videos/Study-visa.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Travel & Relocation Guides' }]} />
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <Compass className="w-4 h-4 text-[#F45A2A]" />
                <span>Forensic Consular Research & Editorial Dispatch</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Immigration &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Relocation Guides
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Empowering Nigerian students, skilled workers, and corporate directors with verified statutory roadmaps. Written directly by our consular file auditors to protect you from fraudulent agents and preventable embassy refusals.
              </p>
            </div>
          </div>
        </section>

        {/* Guides Body */}
        <section className="py-12 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ArticleDirectory articles={GUIDES_DATA} basePath="guides" />
          </div>
        </section>

        <ConsultationBanner />
      </div>
    </PublicLayout>
  );
}
