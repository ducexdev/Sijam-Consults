'use client';

import React, { useState, useMemo } from 'react';
import {
  Globe,
  Building2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  Layers,
  Sparkles,
  MapPin,
  BookOpen,
  Briefcase,
  FileCheck,
  Plus,
} from 'lucide-react';
import { ServiceItem, CorporatePartner } from '@/lib/types';

interface CatalogEcosystemViewProps {
  services: ServiceItem[];
  partners: CorporatePartner[];
}

export function CatalogEcosystemView({ services, partners }: CatalogEcosystemViewProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'partners'>('services');
  const [search, setSearch] = useState('');
  const [selectedPartnerCategory, setSelectedPartnerCategory] = useState<string>('all');

  const partnerCategories = useMemo(() => {
    const cats = new Set(partners.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [partners]);

  const filteredServices = useMemo(() => {
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.summary.toLowerCase().includes(search.toLowerCase()) ||
        s.slug.toLowerCase().includes(search.toLowerCase())
    );
  }, [services, search]);

  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase()) ||
        p.collaborationScope.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedPartnerCategory === 'all' || p.category === selectedPartnerCategory;
      return matchesSearch && matchesCategory;
    });
  }, [partners, search, selectedPartnerCategory]);

  return (
    <div className="space-y-6">
      {/* Header Command */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0C122C] via-[#0E1738] to-[#080E24] border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Catalog & Institutional Representation</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold font-heading text-white">
              Catalog & Institutional Partner Ecosystem
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Maintain verified consular offerings, European healthcare employment agreements, university affiliations, and embassy liaison coordinates.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-[#060A18] p-1.5 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'services'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Active Services ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'partners'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Institutional Partners ({partners.length})</span>
            </button>
          </div>
        </div>

        {/* Catalog Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-6 mt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-[#090F24]/80 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">Active Service Lines</div>
            <div className="text-xl font-bold font-heading text-white mt-1">{services.length} Core Portfolios</div>
            <div className="text-[10px] text-emerald-400 font-medium mt-0.5">100% SEO Indexed</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#090F24]/80 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">Verified Partners</div>
            <div className="text-xl font-bold font-heading text-white mt-1">{partners.length} Global Entities</div>
            <div className="text-[10px] text-purple-400 font-medium mt-0.5">Schengen & UK Direct MOUs</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#090F24]/80 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">Jurisdictions Covered</div>
            <div className="text-xl font-bold font-heading text-white mt-1">15+ Nations</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">Poland, Lithuania, Malta, UK, Canada</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#090F24]/80 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium">Institutional Compliance</div>
            <div className="text-xl font-bold font-heading text-emerald-400 mt-1">100% Verified</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">CAC 7890456 Accredited</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === 'services'
                ? 'Search services, keywords, or URL slugs...'
                : 'Search partner names, countries, or MOUs...'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#090F24] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {activeTab === 'partners' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {partnerCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedPartnerCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition ${
                  selectedPartnerCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Services Grid */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((srv) => (
            <div
              key={srv.slug}
              className="bg-[#090F24] p-5 rounded-2xl border border-slate-800/80 space-y-3 hover:border-purple-500/40 transition shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{srv.title}</span>
                    </h3>
                    <span className="text-[10px] font-mono text-purple-400">
                      /services/{srv.slug}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 font-bold">
                    Active & Indexable
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {srv.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>{srv.faqs?.length || 4} FAQs configured</span>
                </span>
                <a
                  href={`/services/${srv.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold hover:underline"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3 h-3" />
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
              className="bg-[#090F24] p-5 rounded-2xl border border-slate-800/80 space-y-3 hover:border-purple-500/40 transition shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">{p.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      <span>{p.country}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-purple-300 font-semibold">
                    {p.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="line-clamp-1 max-w-[180px]">{p.collaborationScope}</span>
                <span className="text-emerald-400 flex items-center gap-1 shrink-0 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified MOU
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
