import type { Metadata } from 'next';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { ShieldAlert, Scale, AlertOctagon, CheckCircle2, FileText } from 'lucide-react';
import { COMPANY } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Terms & Conditions of Engagement | Sijam Consults Limited',
  description: 'Official terms and conditions governing travel consulting, university admission facilitation, and document legalization services with Sijam Consults Limited (RC: 1715416).',
  alternates: {
    canonical: 'https://sijamconsults.com/terms',
  },
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

          {/* Header */}
          <div className="my-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#402493] text-xs font-semibold">
              <Scale className="w-4 h-4" />
              <span>Standard Terms of Engagement</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Terms & Conditions of Engagement
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Effective Date: October 2026 • Legal Entity: Sijam Consults Limited ({COMPANY.cacNumber})
            </p>
          </div>

          {/* Terms Card */}
          <Card className="p-6 sm:p-10 space-y-8 bg-white border-purple-100 shadow-sm leading-relaxed text-sm text-slate-700">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#402493]" />
                1. Scope of Services & Institutional Character
              </h2>
              <p>
                Sijam Consults Limited is an independent educational consultancy, travel coordination agency, and corporate mobility advisory duly incorporated in Nigeria under RC: 1715416.
              </p>
              <p>
                Our services encompass university admissions liaison, document notarization and Ministry attestation coordination, travel itinerary reservation, and pre-submission consular file review.
              </p>
            </section>

            {/* Section 2 - Statutory Non-Guarantee Notice */}
            <section className="space-y-3 pt-6 border-t border-slate-100 bg-amber-50/60 p-5 rounded-2xl border border-amber-200">
              <h2 className="font-heading font-bold text-lg text-amber-950 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                2. Explicit Statutory Outcome Disclaimer (No Guarantees)
              </h2>
              <p className="text-xs sm:text-sm text-amber-950 font-medium">
                Clients must explicitly note and agree that Sijam Consults Limited is NOT a diplomatic mission, embassy, consulate, or governmental visa-issuing body.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-amber-900">
                <li>
                  <strong>Visas and Permits:</strong> The statutory authority to grant, refuse, or delay any visa, residence authorization, or entry clearance belongs solely and exclusively to the immigration officers and sovereign consular authorities of the respective foreign country.
                </li>
                <li>
                  <strong>Zero Outcome Guarantees:</strong> Sijam Consults Limited does NOT promise, warrant, or guarantee visa issuance, foreign university degree completion, employment contracts, or citizenship status.
                </li>
                <li>
                  <strong>Advisory Character:</strong> Our role is strictly limited to procedural compliance, documentation audits, and application packaging according to published statutory standards.
                </li>
              </ul>
            </section>

            {/* Section 3 - Zero Tolerance for Document Fraud */}
            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-red-900 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-600" />
                3. Zero-Tolerance Policy for Fraudulent Documents
              </h2>
              <p>
                Sijam Consults maintains an uncompromised institutional commitment to legal integrity and ethical practice.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>Clients represent and warrant that all certificates, bank statements, affidavits, police clearances, and identification submitted are 100% genuine, verifiable, and legally obtained.</li>
                <li>Any presentation of forged, altered, or fabricated documents will result in immediate termination of engagement without refund, and may be reported to competent law enforcement agencies.</li>
                <li>We do not manufacture dummy financial statements, false employment certificates, or counterfeit credentials under any circumstances.</li>
              </ul>
            </section>

            {/* Section 4 - Client Responsibilities */}
            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                4. Client Responsibilities & Accuracy
              </h2>
              <p>
                Clients agree to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
                <li>Provide complete, accurate, and non-misleading information during initial consultations.</li>
                <li>Promptly provide requested supporting documents within agreed preparation windows.</li>
                <li>Attend scheduled consular appointments and biometrics sessions punctually.</li>
                <li>Disclose any prior visa refusals, criminal records, or travel bans truthfully prior to submission.</li>
              </ul>
            </section>

            {/* Section 5 - Professional Fees & Refund Policy */}
            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A]">
                5. Professional Fees & Refund Policies
              </h2>
              <p>
                Advisory and administrative fees paid to Sijam Consults cover professional staff hours, dossier auditing, document formatting, and direct courier/coordination costs incurred.
              </p>
              <p className="text-xs sm:text-sm text-slate-600">
                Statutory foreign embassy filing fees, biometrics center fees (e.g. VFS Global, TLScontact), and university application deposit fees are non-refundable by the respective foreign authorities once paid, regardless of the consular outcome.
              </p>
            </section>

            {/* Section 6 - Governing Law */}
            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="font-heading font-bold text-lg text-[#0F172A] flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#402493]" />
                6. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms of Engagement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising shall be subject to the exclusive jurisdiction of the competent courts of Kaduna State, Nigeria.
              </p>
            </section>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
