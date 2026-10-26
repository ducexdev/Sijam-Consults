'use client';

import React, { useState } from 'react';
import {
  Globe,
  Building2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  FileCheck,
  ToggleLeft,
  ToggleRight,
  Layers,
  MapPin,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { ServiceItem, CorporatePartner } from '@/lib/types';
import {
  adminUpdateService,
  adminCreatePartner,
  adminUpdatePartner,
  adminDeletePartner,
} from '@/app/actions/catalog';

interface ServicesViewProps {
  services: ServiceItem[];
  partners: CorporatePartner[];
  onRefresh?: () => void;
}

export function ServicesView({ services, partners, onRefresh }: ServicesViewProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'partners'>('services');
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // ── Service Edit Modal State ──
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [srvTitle, setSrvTitle] = useState('');
  const [srvSummary, setSrvSummary] = useState('');
  const [srvTagline, setSrvTagline] = useState('');
  const [srvBadge, setSrvBadge] = useState('');
  const [srvIsHidden, setSrvIsHidden] = useState(false);

  // ── Partner Modal State ──
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<CorporatePartner | null>(null);
  const [partnerName, setPartnerName] = useState('');
  const [partnerCategory, setPartnerCategory] = useState('Academic Partner');
  const [partnerCountry, setPartnerCountry] = useState('Poland');
  const [partnerDescription, setPartnerDescription] = useState('');
  const [partnerScope, setPartnerScope] = useState('');
  const [partnerWebsite, setPartnerWebsite] = useState('');

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.summary.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPartners = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openEditService = (srv: ServiceItem) => {
    setEditingService(srv);
    setSrvTitle(srv.title);
    setSrvSummary(srv.summary);
    setSrvTagline(srv.tagline);
    setSrvBadge(srv.badge || '');
    setSrvIsHidden(srv.badge === 'hidden');
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setActionLoading(true);
    setFeedbackMsg(null);
    try {
      const res = await adminUpdateService(editingService.slug, {
        title: srvTitle,
        summary: srvSummary,
        tagline: srvTagline,
        badge: srvIsHidden ? 'hidden' : srvBadge || undefined,
      });
      if (res.success) {
        setFeedbackMsg(`✓ Service "${srvTitle}" updated successfully.`);
        setEditingService(null);
        onRefresh?.();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save service changes.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleService = async (srv: ServiceItem) => {
    setActionLoading(true);
    const newHidden = srv.badge !== 'hidden';
    try {
      const res = await adminUpdateService(srv.slug, {
        badge: newHidden ? 'hidden' : undefined,
      });
      if (res.success) {
        setFeedbackMsg(
          newHidden
            ? `Service "${srv.title}" toggled to Hidden/Draft.`
            : `Service "${srv.title}" toggled to Active & Published.`
        );
        onRefresh?.();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const openNewPartnerModal = () => {
    setEditingPartner(null);
    setPartnerName('');
    setPartnerCategory('Academic Partner');
    setPartnerCountry('Poland');
    setPartnerDescription('');
    setPartnerScope('Candidate Placement & Verification Agreement');
    setPartnerWebsite('');
    setIsPartnerModalOpen(true);
  };

  const openEditPartner = (p: CorporatePartner) => {
    setEditingPartner(p);
    setPartnerName(p.name);
    setPartnerCategory(p.category);
    setPartnerCountry(p.country);
    setPartnerDescription(p.description);
    setPartnerScope(p.collaborationScope);
    setPartnerWebsite(p.websiteUrl || '');
    setIsPartnerModalOpen(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingPartner) {
        const res = await adminUpdatePartner(editingPartner.name, {
          name: partnerName,
          category: partnerCategory,
          country: partnerCountry,
          description: partnerDescription,
          collaborationScope: partnerScope,
          websiteUrl: partnerWebsite,
        });
        if (res.success) {
          setFeedbackMsg(`✓ Partner "${partnerName}" updated.`);
          setIsPartnerModalOpen(false);
          onRefresh?.();
        } else {
          alert(res.message);
        }
      } else {
        const res = await adminCreatePartner({
          name: partnerName,
          category: partnerCategory,
          country: partnerCountry,
          logoUrl: `/partners/${partnerName.toLowerCase().replace(/\s+/g, '-')}.png`,
          description: partnerDescription,
          collaborationScope: partnerScope,
          websiteUrl: partnerWebsite,
        });
        if (res.success) {
          setFeedbackMsg(`✓ Partner "${partnerName}" registered.`);
          setIsPartnerModalOpen(false);
          onRefresh?.();
        } else {
          alert(res.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save partner record.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePartner = async (name: string) => {
    if (!confirm(`Are you sure you want to archive corporate partner "${name}"?`)) return;
    setActionLoading(true);
    try {
      const res = await adminDeletePartner(name);
      if (res.success) {
        setFeedbackMsg(`Partner "${name}" archived.`);
        onRefresh?.();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Catalog Governance • Real-Time Database Management
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Services &amp; Institutional Partners
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeTab === 'partners' && (
            <button
              onClick={openNewPartnerModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-[#257CFF]/25 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Register Corporate Partner
            </button>
          )}

          <div className="flex items-center p-1 rounded-xl bg-[#0B1224] border border-slate-800">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                activeTab === 'partners'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Partners ({partners.length})
            </button>
          </div>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {feedbackMsg}
        </div>
      )}

      {/* ── Search Bar ── */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            activeTab === 'services'
              ? 'Search services by title, slug, summary...'
              : 'Search institutional partners by institution, country, category...'
          }
          className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* ── Services Grid ── */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((srv) => {
            const isHidden = srv.badge === 'hidden';
            return (
              <div
                key={srv.slug}
                className="bg-[#121B2B] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading font-bold text-sm text-white">
                        {srv.title}
                      </h3>
                      <span className="text-[10px] font-mono text-purple-400">
                        /services/{srv.slug}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleService(srv)}
                        disabled={actionLoading}
                        title={isHidden ? 'Click to Publish' : 'Click to Hide'}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border transition ${
                          isHidden
                            ? 'bg-slate-900 border-slate-700 text-slate-400'
                            : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        }`}
                      >
                        {isHidden ? (
                          <>
                            <ToggleLeft className="w-3.5 h-3.5 text-slate-500" /> Hidden / Draft
                          </>
                        ) : (
                          <>
                            <ToggleRight className="w-3.5 h-3.5 text-emerald-400" /> Active &amp; Published
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => openEditService(srv)}
                        className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        title="Edit Service Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {srv.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{srv.faqs?.length || 4} FAQs configured</span>
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
            );
          })}
        </div>
      )}

      {/* ── Partners Grid ── */}
      {activeTab === 'partners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartners.map((p) => (
            <div
              key={p.name}
              className="bg-[#121B2B] p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition flex flex-col justify-between"
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

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditPartner(p)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      title="Edit Partner"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePartner(p.name)}
                      className="p-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 transition"
                      title="Archive Partner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-purple-300 font-semibold inline-block">
                  {p.category}
                </span>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="line-clamp-1 max-w-[170px]">{p.collaborationScope}</span>
                <span className="text-emerald-400 flex items-center gap-1 shrink-0 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified MOU
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Edit Service Modal ── */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1420] border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white">
                Edit Catalog Service: {editingService.title}
              </h3>
              <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={srvTitle}
                  onChange={(e) => setSrvTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={srvTagline}
                  onChange={(e) => setSrvTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Executive Summary *
                </label>
                <textarea
                  required
                  rows={3}
                  value={srvSummary}
                  onChange={(e) => setSrvSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Public Indexing &amp; Display</span>
                  <span className="text-[10px] text-slate-400">
                    {srvIsHidden ? 'Hidden from public services directory' : 'Visible & indexable in Google SERPs'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSrvIsHidden(!srvIsHidden)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition ${
                    srvIsHidden ? 'bg-slate-800 text-slate-400' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {srvIsHidden ? 'Draft / Hidden' : 'Active & Published'}
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold shadow-lg shadow-[#257CFF]/25"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Corporate Partner Modal ── */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1420] border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white">
                {editingPartner ? 'Edit Corporate Partner' : 'Register New Corporate Partner'}
              </h3>
              <button onClick={() => setIsPartnerModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Institution / Partner Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="e.g. University of Warsaw"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerCountry}
                    onChange={(e) => setPartnerCountry(e.target.value)}
                    placeholder="e.g. Poland, United Kingdom"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Category *
                </label>
                <select
                  value={partnerCategory}
                  onChange={(e) => setPartnerCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Academic Partner">Academic Partner (University / College)</option>
                  <option value="Healthcare Employer">Healthcare Employer (Hospital / Clinic)</option>
                  <option value="Relocation Network">Relocation &amp; Housing Partner</option>
                  <option value="Legal Chambers">Immigration Legal Chambers</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Institutional Scope &amp; Collaboration *
                </label>
                <input
                  type="text"
                  required
                  value={partnerScope}
                  onChange={(e) => setPartnerScope(e.target.value)}
                  placeholder="e.g. Direct Admissions &amp; Voivodeship Sponsorship"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Institutional Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={partnerDescription}
                  onChange={(e) => setPartnerDescription(e.target.value)}
                  placeholder="Official profile of partner institution..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={partnerWebsite}
                  onChange={(e) => setPartnerWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold shadow-lg shadow-[#257CFF]/25"
                >
                  {actionLoading ? 'Saving...' : 'Save Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
