import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { ConsultationWizard } from '@/components/consultation/ConsultationWizard';
import { COMPANY } from '@/lib/routes';
import { VIDEOS } from '@/lib/constants/videos';
import { Calendar, Shield, Clock, MapPin, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book a Consultation | Sijam Consults Limited – Strategic Immigration Advisory',
  description: 'Schedule a 1-on-1 private strategy consultation with Sijam Consults Limited in Kaduna or online via WhatsApp / Google Meet. Professional review of your documents and goals.',
};

export default function ConsultationPage() {
  return (
    <PublicLayout>
      <div className="bg-[#070415] text-white min-h-screen">
        {/* Cinematic Header with Ambient Video */}
        <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-purple-950/80">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ position: 'absolute' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-125"
              src={VIDEOS.SIJAM_CONSULT_LIMITED}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070415] via-[#070415]/75 to-[#070415]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-[#402493]/35 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={[{ label: 'Book Advisory Session' }]} />
            </div>

            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-[#F45A2A]" />
                <span>Direct Access to Senior Consular Counsel</span>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                Schedule Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA5EC] to-[#257CFF]">
                  Advisory Session
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Choose between an executive in-person session at our Kaduna headquarters or an encrypted high-definition video consultation. Zero original documents demanded prior to formal retainer.
              </p>

              {/* Fast Trust Indicators */}
              <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-4 h-4 text-[#F98864]" />
                  <span>SLA Confirmation &lt; 2 Hours</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Kaduna HQ Suite A10</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>CAC: {COMPANY.cacNumber}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Wizard Body */}
        <section className="py-12 bg-[#0B071E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8 max-w-3xl mx-auto">
              <TrustBanner showFullDisclaimer={true} />
            </div>

            <ConsultationWizard />
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
