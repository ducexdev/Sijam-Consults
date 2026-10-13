'use client';

import React, { useState } from 'react';
import {
  Globe,
  Building2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { ServiceItem, CorporatePartner } from '@/lib/types';

interface ServicesViewProps {
  services: ServiceItem[];
  partners: CorporatePartner[];
}

export function ServicesView({ services, partners }: ServicesViewProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'partners'>('services');
  const [search, setSearch] = useState('');

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.summary.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPartners = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Catalog Governance • Institutional Representation
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Services & Institutional Partners
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'services'
                ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Services Catalog ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'partners'
                ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Institutional Partners ({partners.length})
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((srv) => (
            <div
              key={srv.slug}
              className="bg-[#121B2B] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    {srv.title}
                  </h3>
                  <span className="text-[10px] font-mono text-purple-400">
                    /services/{srv.slug}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Active
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {srv.summary}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{srv.faqs.length} FAQs configured</span>
                <a
                  href={`/services/${srv.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
                >
                  View Page <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Partners Grid */}
      {activeTab === 'partners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartners.map((p) => (
            <div
              key={p.name}
              className="bg-[#121B2B] p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-white">{p.name}</h3>
                  <span className="text-[11px] text-slate-400">
                    {p.country}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                  {p.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">
                {p.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span className="line-clamp-1">{p.collaborationScope}</span>
                <span className="text-emerald-400 flex items-center gap-1 shrink-0 ml-2">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
