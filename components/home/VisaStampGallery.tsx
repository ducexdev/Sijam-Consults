'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VISA_PROOFS } from '@/lib/data/reviews';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';

export const VisaStampGallery: React.FC = () => {
  const [selectedProof, setSelectedProof] = useState<typeof VISA_PROOFS[0] | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Study Visa', 'Work Permit', 'Tourist Visa', 'Schengen Business'];

  const filteredProofs = filter === 'All'
    ? VISA_PROOFS.slice(0, 8)
    : VISA_PROOFS.filter((p) => p.category === filter).slice(0, 8);

  return (
    <section className="py-20 bg-[#0D0826] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F98864] bg-purple-950 px-3 py-1 rounded-full border border-purple-800 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F45A2A]" />
              <span>Authentic Approvals Showcase</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Verified Visa Approvals & Consular Grants
            </h2>
            <p className="text-sm text-purple-200 mt-2 max-w-2xl">
              Authentic embassy approvals processed by Sijam Consult as your trusted <strong className="text-white font-medium">travel agency</strong> across European, UK, Canadian, and Schengen jurisdictions. Redacted in strict adherence with Nigerian Data Protection Regulation (NDPR).
            </p>
          </div>

          <Button href={ROUTES.reviews} variant="glass" size="sm">
            <span>View All Approval Stamps</span>
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border-[#257CFF] shadow-sm'
                  : 'bg-purple-950/60 text-purple-200 border-purple-800/60 hover:bg-purple-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Visa Stamps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProofs.map((proof) => (
            <div
              key={proof.id}
              onClick={() => setSelectedProof(proof)}
              className="group cursor-pointer rounded-2xl bg-white p-2.5 sm:p-3 border border-purple-900/40 hover:border-[#257CFF] transition-all duration-300 hover:scale-[1.02] shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3">
                <Image
                  src={proof.image}
                  alt={proof.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white flex items-center justify-center shadow-lg border border-[#4DA5EC]/40">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Verified
                  </span>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-800 line-clamp-1">
                  {proof.label}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center justify-between mt-1">
                  <span>{proof.country}</span>
                  <span className="text-[#402493] font-semibold">{proof.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      {selectedProof && (
        <Modal
          isOpen={Boolean(selectedProof)}
          onClose={() => setSelectedProof(null)}
          title={selectedProof.label}
          maxWidth="4xl"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl h-[420px] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
              <Image
                src={selectedProof.image}
                alt={selectedProof.label}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
              />
            </div>
            <div className="mt-4 w-full flex items-center justify-between text-xs text-slate-600 border-t pt-3">
              <div>
                <span className="font-semibold text-slate-800">Destination:</span>{' '}
                {selectedProof.country} ({selectedProof.category})
              </div>
              <div className="text-slate-400">
                Personal identifiers masked for privacy (NDPR compliant)
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
