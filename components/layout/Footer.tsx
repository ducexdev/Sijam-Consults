import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  FileText,
  ExternalLink,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { COMPANY, ROUTES } from '@/lib/routes';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0D0826] text-white border-t border-purple-950 mt-auto">
      {/* Top Value Strip */}
      <div className="bg-[#1A1040] py-8 border-b border-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#402493] text-white flex items-center justify-center shrink-0 border border-purple-600/30">
                <Shield className="w-6 h-6 text-[#F98864]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-white">CAC Registered Agency</h3>
                <p className="text-xs text-purple-200 mt-0.5">
                  Corporate Affairs Commission <span className="font-semibold text-[#F45A2A]">{COMPANY.cacNumber}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#402493] text-white flex items-center justify-center shrink-0 border border-purple-600/30">
                <FileText className="w-6 h-6 text-[#F98864]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-white">Zero-Omission Standards</h3>
                <p className="text-xs text-purple-200 mt-0.5">
                  Independent consular file audits preventing avoidable refusals
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#402493] text-white flex items-center justify-center shrink-0 border border-purple-600/30">
                <Lock className="w-6 h-6 text-[#F98864]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-white">Ethical Consultation</h3>
                <p className="text-xs text-purple-200 mt-0.5">
                  100% authentic procedures. Zero dummy documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={ROUTES.home} className="inline-block group">
              <div className="relative w-48 h-12 transition-transform duration-200 group-hover:scale-[1.01]" style={{ position: 'relative' }}>
                <Image
                  src="/brand/logo-white.png"
                  alt="Sijam Consults Limited"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-sm">
              Sijam Consults Limited is an executive international travel and education consultancy agency based in Kaduna, Nigeria. We bridge Nigerian students, skilled professionals, and entrepreneurs to accredited European universities, legal labor permits, and business mobility.
            </p>
            <div className="pt-2">
              <a
                href="/docs/Sijam-Company-Profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#F98864] hover:text-white bg-purple-900/60 px-3.5 py-2 rounded-lg border border-purple-700/50 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Download Official Corporate Profile (PDF)</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wide text-white uppercase mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200">
              <li>
                <Link href={ROUTES.services.studyVisa} className="hover:text-white transition-colors">
                  Study Abroad & Visas
                </Link>
              </li>
              <li>
                <Link href={ROUTES.services.workVisa} className="hover:text-white transition-colors">
                  Work Permits & Placement
                </Link>
              </li>
              <li>
                <Link href={ROUTES.services.touristVisa} className="hover:text-white transition-colors">
                  Tourist & Visitor Visas
                </Link>
              </li>
              <li>
                <Link href={ROUTES.services.visaAssistance} className="hover:text-white transition-colors">
                  File Audit & Mock Interview
                </Link>
              </li>
              <li>
                <Link href={ROUTES.services.businessRegistration} className="hover:text-white transition-colors">
                  EU Company Registration
                </Link>
              </li>
              <li>
                <Link href={ROUTES.services.documentLegalization} className="hover:text-white transition-colors">
                  MFA Document Legalization
                </Link>
              </li>
              <li>
                <Link href={ROUTES.services.flightReservations} className="hover:text-white transition-colors">
                  Flight Reservations & PNR
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wide text-white uppercase mb-4">
              Company & Proof
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-purple-200">
              <li>
                <Link href={ROUTES.about} className="hover:text-white transition-colors">
                  About SIJAM Consults
                </Link>
              </li>
              <li>
                <Link href={ROUTES.whyChooseUs} className="hover:text-white transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.reviews} className="hover:text-white transition-colors">
                  Visa Proofs & Reviews
                </Link>
              </li>
              <li>
                <Link href={ROUTES.partners} className="hover:text-white transition-colors">
                  Institutional Partners
                </Link>
              </li>
              <li>
                <Link href={ROUTES.jobs.root} className="hover:text-white transition-colors">
                  Jobs & Opportunities
                </Link>
              </li>
              <li>
                <Link href={ROUTES.assessment} className="hover:text-white transition-colors">
                  Free Visa Assessment
                </Link>
              </li>
              <li>
                <Link href={ROUTES.guides.root} className="hover:text-white transition-colors">
                  Travel & Study Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wide text-white uppercase mb-4">
              Kaduna Office
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-purple-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F45A2A] shrink-0 mt-0.5" />
                <span>{COMPANY.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F45A2A] shrink-0" />
                <a href={`tel:${COMPANY.phones.primary}`} className="hover:text-white transition-colors">
                  {COMPANY.phones.primary}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F45A2A] shrink-0" />
                <a href={`mailto:${COMPANY.emails.primary}`} className="hover:text-white transition-colors">
                  {COMPANY.emails.primary}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F45A2A] shrink-0 mt-0.5" />
                <span>{COMPANY.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Banner */}
        <div className="mt-12 pt-8 border-t border-purple-900/60">
          <div className="bg-amber-500/[0.08] border border-amber-500/30 rounded-xl p-4 sm:p-5 text-xs text-slate-200 leading-relaxed shadow-lg flex items-start gap-3.5 backdrop-blur-sm">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-bold uppercase tracking-wider block sm:inline mr-1.5">
                Statutory Regulatory Disclaimer:
              </strong>
              <span className="text-slate-100 font-normal leading-relaxed">
                {COMPANY.disclaimers.regulatory}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-8 pt-6 border-t border-purple-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
          <div>
            © {new Date().getFullYear()} {COMPANY.legalName} ({COMPANY.cacNumber}). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href={ROUTES.privacy} className="hover:text-white transition-colors">
              Privacy Policy (NDPR)
            </Link>
            <Link href={ROUTES.terms} className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href={ROUTES.cookies} className="hover:text-white transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
