'use client';

import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  HardDrive,
  Lock,
  Globe,
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Search,
  Plus,
  X,
  Loader2,
  KeyRound,
  LayoutGrid,
  List as ListIcon,
  Tag,
  Eye,
  Sliders,
  Sparkles,
  Maximize2,
  FileCode,
  Download,
  Info,
} from 'lucide-react';

interface MediaItem {
  name: string;
  path: string;
  size: string;
  type: string;
  date: string;
  status?: string;
  publicUrl?: string | null;
  altText?: string;
  title?: string;
  caption?: string;
  keywords?: string[];
  dimensions?: string;
}

const LOCAL_STORAGE_KEY = 'sijam_asset_seo_metadata_v1';

const INITIAL_PUBLIC_ASSETS: MediaItem[] = [
  {
    name: 'logo.png',
    path: 'brand/logo.png',
    size: '92 KB',
    type: 'image/png',
    date: '2026-10-10',
    publicUrl: '/brand/logo.png',
    altText: 'Sijam Consults Limited - Official Corporate Immigration & Consular Advisory Logo',
    title: 'Sijam Consults Limited Brand Identity',
    caption: 'Official accredited trademark and corporate logo of Sijam Consults Limited (RC: 1715416).',
    keywords: ['Sijam Consults', 'Corporate Logo', 'Immigration Advisory Nigeria'],
    dimensions: '800 × 240',
  },
  {
    name: 'James-Samson.png',
    path: 'team/James-Samson.png',
    size: '190 KB',
    type: 'image/png',
    date: '2026-10-10',
    publicUrl: '/team/James-Samson.png',
    altText: 'James Samson - Principal Executive Consultant at Sijam Consults Limited',
    title: 'James Samson | Consular Practice Lead',
    caption: 'Executive Lead specializing in European bilateral employment corridors and consular advocacy.',
    keywords: ['James Samson', 'Immigration Consultant Kaduna', 'Consular Advisory Lead'],
    dimensions: '600 × 600',
  },
  {
    name: 'Blessing-Attabor.png',
    path: 'team/Blessing-Attabor.png',
    size: '145 KB',
    type: 'image/png',
    date: '2026-10-10',
    publicUrl: '/team/Blessing-Attabor.png',
    altText: 'Blessing Attabor - Senior Operations & Compliance Officer at Sijam Consults',
    title: 'Blessing Attabor | Operations Lead',
    caption: 'Oversees document legalization, verification workflows, and consular compliance packaging.',
    keywords: ['Blessing Attabor', 'Compliance Officer', 'Document Legalization'],
    dimensions: '600 × 600',
  },
  {
    name: 'Salami-Zainab-Keyinde.png',
    path: 'team/Salami-Zainab-Keyinde.png',
    size: '145 KB',
    type: 'image/png',
    date: '2026-10-10',
    publicUrl: '/team/Salami-Zainab-Keyinde.png',
    altText: 'Salami Zainab Kehinde - Client Advisory & Student Admissions Lead',
    title: 'Salami Zainab Kehinde | Admissions Specialist',
    caption: 'Specialist guiding international student admissions and European scholarship placements.',
    keywords: ['Zainab Kehinde', 'Study Abroad Advisor', 'European University Admissions'],
    dimensions: '600 × 600',
  },
  {
    name: 'Why-Study-Nursing-in-Canada-20262027.png',
    path: 'blogs/Why-Study-Nursing-in-Canada-20262027.png',
    size: '570 KB',
    type: 'image/png',
    date: '2026-10-11',
    publicUrl: '/blogs/Why-Study-Nursing-in-Canada-20262027.png',
    altText: 'Complete Guide to Studying Nursing in Canada 2026/2027 for Nigerian Students',
    title: 'Study Nursing in Canada 2026/2027 Guide Hero',
    caption: 'Accredited Canadian nursing programs with Post-Graduation Work Permit (PGWP) eligibility.',
    keywords: ['Study Nursing Canada', 'PGWP Nursing', 'Nigerian Nurses in Canada'],
    dimensions: '1200 × 675',
  },
  {
    name: 'Ducex-Blog.png',
    path: 'blogs/Ducex-Blog.png',
    size: '702 KB',
    type: 'image/png',
    date: '2026-10-11',
    publicUrl: '/blogs/Ducex-Blog.png',
    altText: 'Sijam Consults Editorial & Legal Insights on European Relocation Frameworks',
    title: 'European Relocation & Visa Advisory Editorial Banner',
    caption: 'Legal breakdown of Voivodeship work permits and European bilateral employer quotas.',
    keywords: ['European Work Permits', 'Legal Relocation', 'Schengen D Visa Guide'],
    dimensions: '1200 × 675',
  },
  {
    name: 'DS-CTA-1.png',
    path: 'blogs/DS-CTA-1.png',
    size: '600 KB',
    type: 'image/png',
    date: '2026-10-14',
    publicUrl: '/blogs/DS-CTA-1.png',
    altText: 'Book a Verified Consular Assessment with Sijam Consults Advisors',
    title: 'Consular Assessment Call-To-Action Banner',
    caption: 'One-on-one document verification and eligibility assessment with accredited case officers.',
    keywords: ['Visa Consultation', 'Kaduna Visa Office', 'Sijam Consults Appointment'],
    dimensions: '1200 × 400',
  },
  {
    name: 'DS-CTA-2.png',
    path: 'blogs/DS-CTA-2.png',
    size: '1.0 MB',
    type: 'image/png',
    date: '2026-10-14',
    publicUrl: '/blogs/DS-CTA-2.png',
    altText: 'Overseas Employment Quota & Voivodeship Sponsorship Application Banner',
    title: 'European Bilateral Employer Sponsorship CTA',
    caption: 'Verified international employment placements with employer-sponsored work permits.',
    keywords: ['Overseas Employment', 'Poland Hospital Corridors', 'Work Visa Sponsorship'],
    dimensions: '1200 × 400',
  },
];

const INITIAL_APPLICANT_DOCUMENTS: MediaItem[] = [
  {
    name: 'CV_Tunde_Adeyemi_RN.pdf',
    path: 'candidates/app-01/CV_Tunde_Adeyemi_RN.pdf',
    size: '412 KB',
    type: 'application/pdf',
    date: '2026-10-12',
    status: 'Encrypted',
    title: 'Curriculum Vitae - Tunde Adeyemi (Registered Nurse)',
    altText: 'Confidential Candidate CV for Polish Hospital Healthcare Mobility Corridor',
    caption: 'Certified Nigerian Registered Nurse with 5+ years critical care experience.',
    keywords: ['Candidate CV', 'Nursing Healthcare Mobility', 'Restricted File'],
  },
  {
    name: 'CV_Ngozi_Eze_Developer.pdf',
    path: 'candidates/app-02/CV_Ngozi_Eze_Developer.pdf',
    size: '280 KB',
    type: 'application/pdf',
    date: '2026-10-12',
    status: 'Encrypted',
    title: 'Curriculum Vitae - Ngozi Eze (Software Developer)',
    altText: 'Confidential Candidate CV for European Tech Talent Quota',
    caption: 'Senior Fullstack Engineer candidate for Slovak tech work visa quota.',
    keywords: ['Candidate CV', 'Software Engineering', 'Restricted File'],
  },
  {
    name: 'Passport_Data_Page_Redacted.pdf',
    path: 'candidates/app-01/Passport_Data_Page_Redacted.pdf',
    size: '1.2 MB',
    type: 'application/pdf',
    date: '2026-10-12',
    status: 'Restricted',
    title: 'International Passport Bio-Data Page (Redacted)',
    altText: 'Encrypted Consular Document for Voivodeship Visa Filing',
    caption: 'Verified biometric identification page with consular watermark.',
    keywords: ['Passport Bio-Data', 'Consular Filing', 'Encrypted Document'],
  },
];

export function MediaView() {
  const [activeBucket, setActiveBucket] = useState<'public-assets' | 'applicant-documents'>('public-assets');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [publicAssets, setPublicAssets] = useState<MediaItem[]>(INITIAL_PUBLIC_ASSETS);
  const [applicantDocuments, setApplicantDocuments] = useState<MediaItem[]>(INITIAL_APPLICANT_DOCUMENTS);

  // SEO Inspector Modal State
  const [inspectingItem, setInspectingItem] = useState<MediaItem | null>(null);
  const [seoAltText, setSeoAltText] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoCaption, setSeoCaption] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState('blogs');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Signed URL state
  const [signedUrlModal, setSignedUrlModal] = useState<{ path: string; url: string; expiresAt: string } | null>(null);
  const [generatingSignedUrl, setGeneratingSignedUrl] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Load saved SEO metadata from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, Partial<MediaItem>>;
        setPublicAssets((prev) =>
          prev.map((item) => {
            const meta = parsed[item.path];
            return meta ? { ...item, ...meta } : item;
          })
        );
        setApplicantDocuments((prev) =>
          prev.map((item) => {
            const meta = parsed[item.path];
            return meta ? { ...item, ...meta } : item;
          })
        );
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Fetch live file listings from Supabase Storage on mount
  useEffect(() => {
    async function fetchStorageListings() {
      try {
        const [publicRes, docsRes] = await Promise.all([
          fetch('/api/media/list?bucket=public-assets'),
          fetch('/api/media/list?bucket=applicant-documents'),
        ]);

        if (publicRes.ok) {
          const json = await publicRes.json();
          if (json.success && json.files && json.files.length > 0) {
            setPublicAssets((prev) => {
              const fileMap = new Map(prev.map((f) => [f.path, f]));
              const merged = json.files.map((f: MediaItem) => {
                const existing = fileMap.get(f.path);
                return existing ? { ...f, ...existing } : f;
              });
              return merged;
            });
          }
        }

        if (docsRes.ok) {
          const json = await docsRes.json();
          if (json.success && json.files && json.files.length > 0) {
            setApplicantDocuments((prev) => {
              const fileMap = new Map(prev.map((f) => [f.path, f]));
              const merged = json.files.map((f: MediaItem) => {
                const existing = fileMap.get(f.path);
                return existing ? { ...f, ...existing } : f;
              });
              return merged;
            });
          }
        }
      } catch (err) {
        console.error('[MediaView] Storage listing fetch error:', err);
      }
    }
    fetchStorageListings();
  }, []);

  const activeList = activeBucket === 'public-assets' ? publicAssets : applicantDocuments;

  const filteredItems = activeList.filter((item) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.path.toLowerCase().includes(q) ||
      (item.altText && item.altText.toLowerCase().includes(q)) ||
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.caption && item.caption.toLowerCase().includes(q))
    );
  });

  const handleCopyText = (text: string, snippetId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const handleOpenInspector = (item: MediaItem) => {
    setInspectingItem(item);
    setSeoAltText(item.altText || '');
    setSeoTitle(item.title || item.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    setSeoCaption(item.caption || '');
    setSeoKeywords(item.keywords ? item.keywords.join(', ') : '');
    setSaveSuccessMsg(false);
  };

  const handleSaveSeoMetadata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectingItem) return;

    const keywordsArray = seoKeywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const updatedItem: MediaItem = {
      ...inspectingItem,
      altText: seoAltText.trim(),
      title: seoTitle.trim(),
      caption: seoCaption.trim(),
      keywords: keywordsArray,
    };

    // Update in state
    if (activeBucket === 'public-assets') {
      setPublicAssets((prev) =>
        prev.map((item) => (item.path === inspectingItem.path ? updatedItem : item))
      );
    } else {
      setApplicantDocuments((prev) =>
        prev.map((item) => (item.path === inspectingItem.path ? updatedItem : item))
      );
    }

    setInspectingItem(updatedItem);

    // Persist in localStorage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[inspectingItem.path] = {
        altText: seoAltText.trim(),
        title: seoTitle.trim(),
        caption: seoCaption.trim(),
        keywords: keywordsArray,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleGenerateSignedUrl = async (path: string) => {
    setGeneratingSignedUrl(path);
    try {
      const res = await fetch(`/api/media/signed-url?path=${encodeURIComponent(path)}&expiresIn=900`);
      const data = await res.json();
      if (data.success && data.signedUrl) {
        setSignedUrlModal({
          path,
          url: data.signedUrl,
          expiresAt: new Date(Date.now() + 900 * 1000).toLocaleTimeString(),
        });
      } else {
        alert(data.message || 'Could not generate signed URL.');
      }
    } catch {
      alert('Network error while requesting signed URL.');
    } finally {
      setGeneratingSignedUrl(null);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('bucket', activeBucket);
      formData.append('folder', uploadFolder);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadSuccess(`Asset successfully uploaded: ${data.asset.storage_path}`);
        const cleanName = selectedFile.name;
        const newItem: MediaItem = {
          name: cleanName,
          path: data.asset.storage_path,
          size: `${Math.round(selectedFile.size / 1024)} KB`,
          type: selectedFile.type,
          date: new Date().toISOString().split('T')[0],
          publicUrl: data.asset.public_url || `/${data.asset.storage_path}`,
          altText: cleanName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          title: cleanName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        };

        if (activeBucket === 'public-assets') {
          setPublicAssets((prev) => [newItem, ...prev]);
        } else {
          setApplicantDocuments((prev) => [newItem, ...prev]);
        }

        setTimeout(() => {
          setIsUploadOpen(false);
          setSelectedFile(null);
          setUploadSuccess(null);
        }, 1500);
      } else {
        setUploadError(data.message || 'Upload failed.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload request failed';
      setUploadError(msg);
    } finally {
      setUploading(false);
    }
  };

  const isImageFile = (item: MediaItem) => {
    return (
      item.type.includes('image') ||
      /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(item.name) ||
      /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(item.path)
    );
  };

  const getItemUrl = (item: MediaItem) => {
    if (item.publicUrl) return item.publicUrl;
    if (item.path.startsWith('/')) return item.path;
    return `/${item.path}`;
  };

  return (
    <div className="space-y-6">
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
            Asset Storage
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Media &amp; Document Vault
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Bucket Toggle */}
          <div className="flex items-center gap-1 bg-[#0D1420] p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveBucket('public-assets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeBucket === 'public-assets'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              public-assets
            </button>
            <button
              type="button"
              onClick={() => setActiveBucket('applicant-documents')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeBucket === 'applicant-documents'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              applicant-documents
            </button>
          </div>

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => {
              setUploadError(null);
              setUploadSuccess(null);
              setSelectedFile(null);
              setIsUploadOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition active:scale-[0.98]"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
        </div>
      </div>

      {/* Restricted Security Notice for applicant-documents only */}
      {activeBucket === 'applicant-documents' && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-1.5 animate-in fade-in">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
            <Lock className="w-4 h-4" />
            Restricted Vault: Candidate Documents &amp; PII Storage
          </div>
          <p className="text-xs text-rose-200/80 leading-relaxed">
            All files in this bucket are encrypted and protected by Supabase Row Level Security (RLS). Public direct URLs return 403 Forbidden. Authorized case officers can generate 15-minute signed download URLs upon identity verification.
          </p>
        </div>
      )}

      {/* ── Search, Filters, and View Switcher ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeBucket} by name, alt tag, or path...`}
            className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC]"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            {filteredItems.length} assets recorded
          </span>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-[#0B1224] border border-slate-800 rounded-xl shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View (Image & File Previews)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <ListIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Files Display Container ── */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#121B2B] rounded-2xl border border-slate-800 p-12 text-center text-slate-400">
          <HardDrive className="w-10 h-10 mx-auto text-slate-600 mb-2" />
          <p className="text-sm font-semibold text-slate-300">No assets found in {activeBucket}</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or upload a new asset.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* ══════════════════════════════════════════════════════════════════════
           GRID VIEW — VISIBLE THUMBNAILS & DIRECT SEO INSPECTOR ACTION
        ══════════════════════════════════════════════════════════════════════ */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const isImg = isImageFile(item);
            const fileUrl = getItemUrl(item);

            return (
              <div
                key={item.path}
                className="bg-[#0B1224] border border-[#1a2744] hover:border-cyan-500/50 rounded-2xl overflow-hidden transition group flex flex-col shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Visual Thumbnail Area */}
                <div
                  className="relative aspect-[16/10] bg-[#06091a] overflow-hidden flex items-center justify-center cursor-pointer border-b border-slate-800/80"
                  onClick={() => handleOpenInspector(item)}
                >
                  {isImg ? (
                    <img
                      src={fileUrl}
                      alt={item.altText || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        {item.name.split('.').pop() || 'PDF'} Document
                      </span>
                    </div>
                  )}

                  {/* Badges on preview */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-black/70 backdrop-blur-md text-white border border-white/10">
                      {item.name.split('.').pop() || 'FILE'}
                    </span>
                    {item.dimensions && (
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-black/70 backdrop-blur-md text-cyan-300 border border-white/10">
                        {item.dimensions}
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenInspector(item);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 hover:brightness-110 transition"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Inspect SEO</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="font-semibold text-xs text-white truncate max-w-[190px] group-hover:text-cyan-300 transition cursor-pointer"
                        title={item.name}
                        onClick={() => handleOpenInspector(item)}
                      >
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">{item.size}</span>
                    </div>

                    <p className="text-[10px] font-mono text-slate-500 truncate mt-0.5">{item.path}</p>
                  </div>

                  {/* Alt Tag / SEO Status Badge */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    {item.altText ? (
                      <span
                        className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium truncate max-w-[170px]"
                        title={`Alt: "${item.altText}"`}
                      >
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span className="truncate">Alt tag configured</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>Missing alt tag</span>
                      </span>
                    )}

                    <div className="flex items-center gap-1">
                      {activeBucket === 'public-assets' ? (
                        <button
                          type="button"
                          onClick={() => handleCopyText(fileUrl, item.path)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                          title="Copy Public URL"
                        >
                          {copiedSnippet === item.path ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleGenerateSignedUrl(item.path)}
                          disabled={generatingSignedUrl === item.path}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition"
                          title="Generate 15-Min Signed URL"
                        >
                          {generatingSignedUrl === item.path ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <KeyRound className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleOpenInspector(item)}
                        className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 transition"
                        title="Edit SEO & Alt Tag"
                      >
                        <Tag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════════════
           LIST VIEW — TABULAR DATA WITH DIRECT INSPECTION
        ══════════════════════════════════════════════════════════════════════ */
        <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-white">
              Bucket Contents: {activeBucket}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {filteredItems.length} assets recorded
            </span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {filteredItems.map((item) => {
              const fileUrl = getItemUrl(item);
              const isImg = isImageFile(item);

              return (
                <div
                  key={item.path}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-800/40 transition gap-4 cursor-pointer"
                  onClick={() => handleOpenInspector(item)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                      {isImg ? (
                        <img src={fileUrl} alt={item.altText || item.name} className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.altText ? (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                            SEO Alt Configured
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-950/80 text-amber-300 border border-amber-800/50">
                            No Alt
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{item.path}</div>
                      {item.altText && (
                        <div className="text-[10px] text-slate-400 truncate mt-0.5 italic">
                          &ldquo;{item.altText}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                    <div className="text-[11px] text-slate-400 font-mono text-right hidden md:block">
                      <div>{item.size}</div>
                      <div className="text-[10px] text-slate-500">{item.date}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenInspector(item)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/50 text-cyan-300 text-[11px] font-medium transition flex items-center gap-1"
                      title="Inspect and Edit SEO Alt Tags"
                    >
                      <Tag className="w-3 h-3" />
                      <span>SEO</span>
                    </button>

                    {activeBucket === 'public-assets' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyText(fileUrl, item.path)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition"
                          title="Copy Public URL"
                        >
                          {copiedSnippet === item.path ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          {copiedSnippet === item.path ? 'Copied' : 'Copy URL'}
                        </button>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-slate-400 hover:text-white"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleGenerateSignedUrl(item.path)}
                        disabled={generatingSignedUrl === item.path}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 text-[11px] font-medium transition"
                      >
                        {generatingSignedUrl === item.path ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <KeyRound className="w-3 h-3" />
                        )}
                        15-Min Signed URL
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
         PROFESSIONAL ASSET SEO & METADATA INSPECTOR MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {inspectingItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1224] border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#080E20]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    Asset SEO &amp; Alt Tag Inspector
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Configure search engine attributes, Google Images alt text, and accessible tags.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectingItem(null)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Split view */}
            <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto flex-1 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {/* Left Column: Visual Preview & Technical Specs */}
              <div className="md:col-span-5 p-6 bg-[#070b1a] flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  {/* Large Preview */}
                  <div className="rounded-2xl overflow-hidden bg-black/60 border border-slate-800 aspect-[4/3] flex items-center justify-center relative group">
                    {isImageFile(inspectingItem) ? (
                      <img
                        src={getItemUrl(inspectingItem)}
                        alt={inspectingItem.altText || inspectingItem.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="text-center p-6 space-y-2">
                        <FileText className="w-12 h-12 text-blue-400 mx-auto" />
                        <span className="text-xs font-mono text-slate-300 block">
                          {inspectingItem.name}
                        </span>
                      </div>
                    )}

                    <a
                      href={getItemUrl(inspectingItem)}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/80 text-white opacity-0 group-hover:opacity-100 transition shadow"
                      title="Open full resolution in new tab"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Technical Metadata Table */}
                  <div className="bg-[#0B1224] rounded-xl border border-slate-800 p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>File Name:</span>
                      <span className="font-mono text-white truncate max-w-[160px]">{inspectingItem.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Path:</span>
                      <span className="font-mono text-slate-300 truncate max-w-[160px]">{inspectingItem.path}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>File Size:</span>
                      <span className="font-mono text-cyan-300">{inspectingItem.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>MIME Type:</span>
                      <span className="font-mono text-slate-300">{inspectingItem.type}</span>
                    </div>
                    {inspectingItem.dimensions && (
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Dimensions:</span>
                        <span className="font-mono text-slate-300">{inspectingItem.dimensions}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Upload Date:</span>
                      <span className="font-mono text-slate-300">{inspectingItem.date}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Snippets Box */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Export Ready Embed Code
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
                          '<' + `img src="${getItemUrl(inspectingItem)}" alt="${seoAltText || inspectingItem.name}" title="${seoTitle}" loading="lazy" />`,
                          'snippet_html'
                        )
                      }
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-mono transition flex items-center justify-center gap-1.5"
                    >
                      <FileCode className="w-3 h-3 text-cyan-400" />
                      {copiedSnippet === 'snippet_html' ? 'Copied HTML!' : 'Copy HTML Tag'}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
                          `![${seoAltText || inspectingItem.name}](${getItemUrl(inspectingItem)})`,
                          'snippet_md'
                        )
                      }
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 font-mono transition flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3 h-3 text-cyan-400" />
                      {copiedSnippet === 'snippet_md' ? 'Copied MD!' : 'Copy Markdown'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: SEO Metadata Editor */}
              <div className="md:col-span-7 p-6 space-y-5 bg-[#090F24]">
                {saveSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Asset SEO metadata saved successfully.</span>
                  </div>
                )}

                <form onSubmit={handleSaveSeoMetadata} className="space-y-4">
                  {/* Alt Text (Primary SEO Field) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        Image Alt Text (Google Images &amp; Accessibility) *
                      </label>
                      <span
                        className={`text-[10px] font-mono ${
                          seoAltText.length >= 40 && seoAltText.length <= 125
                            ? 'text-emerald-400'
                            : seoAltText.length > 125
                            ? 'text-amber-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {seoAltText.length} / 125 chars (Ideal: 50–125)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={seoAltText}
                      onChange={(e) => setSeoAltText(e.target.value)}
                      placeholder="Describe what is depicted in this image concisely with relevant keywords for Google Search (e.g., Nigerian nurse reviewing Canadian hospital admission letter)."
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC] leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-400 flex items-start gap-1">
                      <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      Alt text helps your images rank on Google Images and ensures WCAG compliance for vision-impaired users.
                    </p>
                  </div>

                  {/* Title / Asset Display Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Asset Title / Tooltip Text
                    </label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="e.g. Sijam Consults Healthcare Mobility Placement"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC]"
                    />
                  </div>

                  {/* Caption / Contextual Editorial Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Editorial Caption / Context
                    </label>
                    <textarea
                      rows={2}
                      value={seoCaption}
                      onChange={(e) => setSeoCaption(e.target.value)}
                      placeholder="Additional context displayed below the image in blog articles or guides."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC]"
                    />
                  </div>

                  {/* Keywords (Comma-separated) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Target SEO Keywords (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="e.g. Study Nursing Canada, PGWP Nursing, Visa Consultation"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <a
                      href={getItemUrl(inspectingItem)}
                      download={inspectingItem.name}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInspectingItem(null)}
                        className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition flex items-center gap-1.5 active:scale-[0.98]"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save SEO Metadata</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Upload Modal ── */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1420] border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                Upload to {activeBucket}
              </h3>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Destination Folder
                </label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                >
                  <option value="blogs">blogs/ (Editorial Graphics &amp; Heroes)</option>
                  <option value="team">team/ (Executive Staff Portraits)</option>
                  <option value="branding">brand/ (Trademarks &amp; Logos)</option>
                  <option value="candidates">candidates/ (Candidate Applications)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Select File (Max 10 MB)
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setSelectedFile(f);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-[#4DA5EC] file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:bg-cyan-950 file:text-cyan-300 hover:file:bg-cyan-900 cursor-pointer"
                />
              </div>

              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {uploadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition"
                >
                  {uploading ? 'Uploading...' : 'Upload Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Signed URL Result Modal ── */}
      {signedUrlModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1420] border border-rose-800/80 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-sm text-rose-300 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-rose-400" />
                15-Minute Signed Token Generated
              </h3>
              <button
                type="button"
                onClick={() => setSignedUrlModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              This cryptographic download link grants time-bounded access to candidate PII. Valid until{' '}
              <strong className="text-white font-mono">{signedUrlModal.expiresAt}</strong>.
            </p>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="text-[10px] text-slate-500 font-mono mb-1">Signed URL Token</div>
              <div className="text-xs font-mono text-cyan-300 break-all select-all">
                {signedUrlModal.url}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleCopyText(signedUrlModal.url, 'signed_token')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                {copiedSnippet === 'signed_token' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedSnippet === 'signed_token' ? 'Token Copied!' : 'Copy Signed URL'}
              </button>
              <a
                href={signedUrlModal.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Download Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
