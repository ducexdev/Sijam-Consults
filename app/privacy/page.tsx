import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, Lock, Eye, FileText, Mail } from 'lucide-react';
import { COMPANY } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Privacy Policy & NDPR Compliance | Sijam Consults Limited',
  description: 'Read the official data protection and privacy policy of Sijam Consults Limited (RC: 1715416). Compliant with Nigeria Data Protection Act (NDPA) and NDPR standards.',
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

          {/* Header */}
          <div className="my-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#402493] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>NDPR & NDPA Compliant</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Privacy Policy & Data Protection Notice
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Last Updated: October 2026 • Entity: Sijam Consults Limited ({COMPANY.cacNumber})
            </p>
          </div>

          {/* Legal Content Card */}
          <Card className="p-6 sm:p-10 space-y-8 bg-white border-purple-100 shadow-sm leading-relaxed text-sm text-slate-700">
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#402493]" />
                1. Introduction & Statutory Identity
              </h2>
              <p>
                Sijam Consults Limited (&quot;we&quot;, &quot;our&quot;, or &quot;the Consultancy&quot;), incorporated under the Companies and Allied Matters Act of the Federal Republic of Nigeria ({COMPANY.cacNumber}) with operational headquarters at {COMPANY.address.full}, respects your privacy and is dedicated to protecting your personal data.
              </p>
              <p>
                This Privacy Notice governs our collection, storage, processing, and transfer of personal data when you use our website, consult with our advisors, or submit information through our eligibility calculators, job application forms, and consultation booking wizards.
              </p>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#402493]" />
                2. Information We Collect
              </h2>
              <p>
                We adhere to the principle of <strong>Data Minimization</strong>. We only collect personal details necessary to assess your immigration, educational admission, or travel eligibility:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong>Contact Information:</strong> Full legal name, email address, telephone/WhatsApp number, state and country of residence.
                </li>
                <li>
                  <strong>Travel & Academic Qualifications:</strong> Highest completed level of education, field of study, employment history, travel history, and target destinations.
                </li>
                <li>
                  <strong>Consultation & Case Notes:</strong> Specific travel objectives, preferred appointment scheduling times, and communication logs.
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-purple-50 text-xs text-[#402493] border border-purple-100 font-medium">
                Note: We do not solicit or store financial payment card CVVs, biometric credentials, or unprompted sensitive health records on our public web servers.
              </div>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#402493]" />
                3. Lawful Basis for Processing
              </h2>
              <p>
                Under the Nigeria Data Protection Act (NDPA) and NDPR, our lawful grounds for handling your personal data include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li><strong>Consent:</strong> Explicitly granted when submitting inquiry and assessment forms.</li>
                <li><strong>Contractual Performance:</strong> Necessary to review dossiers, liaise with partner universities, or audit visa documentation.</li>
                <li><strong>Legal Obligation:</strong> Statutory record-keeping required by Nigerian regulatory authorities.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                4. Data Sharing & Third Parties
              </h2>
              <p>
                We will never sell, rent, or trade your personal information to third-party marketing brokers. Your data is only transferred to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
                <li>Accredited partner universities where you have instructed us to file an admissions application.</li>
                <li>Authorized legal translation and Ministry of Foreign Affairs notarization desks with your prior authorization.</li>
                <li>Hosting and cloud database infrastructure providers (Supabase, Cloudflare) with end-to-end TLS encryption.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                5. Your Statutory Rights
              </h2>
              <p>
                Under Nigerian data privacy frameworks, you maintain the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
                <li>Request access to copies of your stored personal information.</li>
                <li>Demand immediate correction or update of inaccurate data.</li>
                <li>Request deletion or erasure of your dossier where processing is no longer required.</li>
                <li>Withdraw consent at any time without penalty.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#402493]" />
                6. Data Protection Officer Contact
              </h2>
              <p>
                To exercise any data rights or submit questions regarding this policy, contact our compliance officer:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
                <p><strong>Attn: Data Protection Officer</strong></p>
                <p>Sijam Consults Limited</p>
                <p>Address: {COMPANY.address.full}</p>
                <p>Email: <a href={`mailto:${COMPANY.emails.support}`} className="text-[#402493] underline">{COMPANY.emails.support}</a></p>
                <p>Telephone: {COMPANY.phones.primary}</p>
              </div>
            </section>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
