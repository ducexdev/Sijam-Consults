'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  RefreshCw,
  Trash2,
  Filter,
  Film,
  Building2,
  Users,
  Compass,
} from 'lucide-react';
import { ALL_STATIC_ASSETS, StaticAssetItem } from '@/lib/data/static-assets';

export interface MediaItem {
  name: string;
  path: string;
  size: string;
  sizeBytes?: number;
  type: string;
  date: string;
  status?: string;
  publicUrl?: string | null;
  category?: string;
  altText?: string;
  title?: string;
  caption?: string;
  keywords?: string[];
  dimensions?: string;
}

const LOCAL_STORAGE_KEY = 'sijam_asset_seo_metadata_v1';
const LOCAL_STORAGE_REPLACEMENTS = 'sijam_asset_replacements_v1';
const LOCAL_STORAGE_DELETED = 'sijam_asset_deleted_paths_v1';

const INITIAL_APPLICANT_DOCUMENTS: MediaItem[] = [
  {
    name: 'passport_scan_app_77492.pdf',
    path: 'candidates/app_77492/passport_scan.pdf',
    size: '1.4 MB',
    type: 'application/pdf',
    date: '2026-10-15',
    status: 'Encrypted',
    category: 'docs',
    dimensions: 'PDF Document',
  },
  {
    name: 'nmcn_nursing_license_app_77492.pdf',
    path: 'candidates/app_77492/nmcn_license.pdf',
    size: '890 KB',
    type: 'application/pdf',
    date: '2026-10-15',
    status: 'Encrypted',
    category: 'docs',
    dimensions: 'PDF Document',
  },
  {
    name: 'cac_incorporation_deal_9901.pdf',
    path: 'candidates/deal_9901/cac_rc1715416.pdf',
    size: '2.1 MB',
    type: 'application/pdf',
    date: '2026-10-14',
    status: 'Encrypted',
    category: 'docs',
    dimensions: 'PDF Document',
  },
  {
    name: 'waec_scratch_verification_app_8812.pdf',
    path: 'candidates/app_8812/waec_statement.pdf',
    size: '450 KB',
    type: 'application/pdf',
    date: '2026-10-13',
    status: 'Encrypted',
    category: 'docs',
    dimensions: 'PDF Document',
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Assets', icon: LayoutGrid },
  { id: 'branding', label: 'Brand & Logos', icon: ShieldCheck },
  { id: 'team', label: 'Team & Leadership', icon: Users },
  { id: 'blogs', label: 'Editorial & Blogs', icon: FileText },
  { id: 'partners', label: 'Institutional Partners', icon: Building2 },
  { id: 'reviews', label: 'Reviews & Avatars', icon: CheckCircle2 },
  { id: 'visas', label: 'Consular Approvals', icon: Tag },
  { id: 'docs', label: 'Documents & PDFs', icon: Download },
  { id: 'media', label: 'Videos & Media', icon: Film },
];

export function MediaView() {
  const [activeBucket, setActiveBucket] = useState<'public-assets' | 'applicant-documents'>('public-assets');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Main Asset State
  const [publicAssets, setPublicAssets] = useState<MediaItem[]>(ALL_STATIC_ASSETS);
  const [applicantDocuments, setApplicantDocuments] = useState<MediaItem[]>(INITIAL_APPLICANT_DOCUMENTS);

  // SEO Inspector Modal State
  const [inspectingItem, setInspectingItem] = useState<MediaItem | null>(null);
  const [seoAltText, setSeoAltText] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoCaption, setSeoCaption] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Replace Modal State
  const [replacingItem, setReplacingItem] = useState<MediaItem | null>(null);
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [replacing, setReplacing] = useState(false);
  const [replaceError, setReplaceError] = useState<string | null>(null);

  // Delete Modal State
  const [deletingItem, setDeletingItem] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ─── 1. Load persisted overrides on client mount ────────────────────────────
  useEffect(() => {
    try {
      // 1. Deleted paths
      const deletedStored = localStorage.getItem(LOCAL_STORAGE_DELETED);
      const deletedSet = new Set<string>(deletedStored ? JSON.parse(deletedStored) : []);

      // 2. Replaced URLs & metadata
      const replStored = localStorage.getItem(LOCAL_STORAGE_REPLACEMENTS);
      const replMap = replStored ? JSON.parse(replStored) : {};

      // 3. SEO Metadata
      const seoStored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const seoMap = seoStored ? JSON.parse(seoStored) : {};

      setPublicAssets((prev) =>
        prev
          .filter((item) => !deletedSet.has(item.path))
          .map((item) => {
            const repl = replMap[item.path];
            const seo = seoMap[item.path];
            return {
              ...item,
              ...(repl ? { publicUrl: repl.publicUrl, size: repl.size || item.size, date: repl.date || item.date } : {}),
              ...(seo ? seo : {}),
            };
          })
      );
    } catch (err) {
      console.warn('Error loading asset metadata from localStorage', err);
    }
  }, []);

  // ─── 2. Fetch live file listings from API on mount ──────────────────────────
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
            // Read deleted set
            let deletedSet = new Set<string>();
            try {
              const d = localStorage.getItem(LOCAL_STORAGE_DELETED);
              if (d) deletedSet = new Set(JSON.parse(d));
            } catch {}

            setPublicAssets((prev) => {
              const fileMap = new Map(prev.map((f) => [f.path, f]));
              const merged: MediaItem[] = [];

              for (const f of json.files) {
                if (deletedSet.has(f.path)) continue;
                const existing = fileMap.get(f.path);
                merged.push(existing ? { ...f, ...existing } : f);
                fileMap.delete(f.path);
              }

              // Keep any existing items not in API response
              for (const [, item] of fileMap) {
                if (!deletedSet.has(item.path)) {
                  merged.push(item);
                }
              }

              return merged;
            });
          }
        }

        if (docsRes.ok) {
          const json = await docsRes.json();
          if (json.success && json.files && json.files.length > 0) {
            setApplicantDocuments((prev) => {
              const fileMap = new Map(prev.map((f) => [f.path, f]));
              return json.files.map((f: MediaItem) => {
                const existing = fileMap.get(f.path);
                return existing ? { ...f, ...existing } : f;
              });
            });
          }
        }
      } catch (err) {
        console.error('[MediaView] Storage listing fetch error:', err);
      }
    }
    fetchStorageListings();
  }, []);

  // ─── Filtered Items ────────────────────────────────────────────────────────
  const activeList = activeBucket === 'public-assets' ? publicAssets : applicantDocuments;

  const filteredItems = useMemo(() => {
    return activeList.filter((item) => {
      // Category filter (public assets only)
      if (activeBucket === 'public-assets' && selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // Format filter
      if (selectedFormat !== 'all') {
        const ext = item.path.split('.').pop()?.toLowerCase();
        if (selectedFormat === 'image' && !['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext || '')) return false;
        if (selectedFormat === 'pdf' && ext !== 'pdf') return false;
        if (selectedFormat === 'video' && ext !== 'mp4') return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.path.toLowerCase().includes(q) ||
          (item.category && item.category.toLowerCase().includes(q)) ||
          (item.altText && item.altText.toLowerCase().includes(q)) ||
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.caption && item.caption.toLowerCase().includes(q)) ||
          (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q)))
        );
      }

      return true;
    });
  }, [activeList, activeBucket, selectedCategory, selectedFormat, searchTerm]);

  // ─── Helpers ───────────────────────────────────────────────────────────────
  const getItemUrl = (item: MediaItem) => {
    if (item.publicUrl) return item.publicUrl;
    if (activeBucket === 'public-assets') return `/${item.path}`;
    return '#';
  };

  const isImageFile = (item: MediaItem) => {
    return (
      item.type.includes('image') ||
      ['png', 'jpg', 'jpeg', 'webp', 'svg'].some((ext) => item.path.toLowerCase().endsWith(`.${ext}`))
    );
  };

  const isVideoFile = (item: MediaItem) => {
    return item.type.includes('video') || item.path.toLowerCase().endsWith('.mp4');
  };

  const isPdfFile = (item: MediaItem) => {
    return item.type.includes('pdf') || item.path.toLowerCase().endsWith('.pdf');
  };

  const handleCopyText = (text: string, snippetId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  // ─── SEO Inspector Modal Handlers ──────────────────────────────────────────
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
    showToast(`SEO tags for ${inspectingItem.name} saved successfully.`);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // ─── Replace Asset Handlers ────────────────────────────────────────────────
  const handleOpenReplace = (item: MediaItem) => {
    setReplacingItem(item);
    setReplacementFile(null);
    setReplaceError(null);
  };

  const handleConfirmReplace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacingItem || !replacementFile) return;

    setReplacing(true);
    setReplaceError(null);

    try {
      const formData = new FormData();
      formData.append('file', replacementFile);
      formData.append('targetPath', replacingItem.path);
      formData.append('bucket', activeBucket);

      const res = await fetch('/api/media/replace', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Asset replacement failed.');
      }

      const timestamp = Date.now();
      const updatedUrl = `/${replacingItem.path}?v=${timestamp}`;
      const newSize = `${Math.max(1, Math.round(replacementFile.size / 1024))} KB`;

      // Update state
      const updatedItem: MediaItem = {
        ...replacingItem,
        size: newSize,
        date: new Date().toISOString().split('T')[0],
        publicUrl: updatedUrl,
      };

      if (activeBucket === 'public-assets') {
        setPublicAssets((prev) =>
          prev.map((item) => (item.path === replacingItem.path ? updatedItem : item))
        );
      } else {
        setApplicantDocuments((prev) =>
          prev.map((item) => (item.path === replacingItem.path ? updatedItem : item))
        );
      }

      if (inspectingItem && inspectingItem.path === replacingItem.path) {
        setInspectingItem(updatedItem);
      }

      // Persist replacement in localStorage
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_REPLACEMENTS);
        const parsed = stored ? JSON.parse(stored) : {};
        parsed[replacingItem.path] = {
          publicUrl: updatedUrl,
          size: newSize,
          date: new Date().toISOString().split('T')[0],
        };
        localStorage.setItem(LOCAL_STORAGE_REPLACEMENTS, JSON.stringify(parsed));
      } catch {}

      showToast(`Asset ${replacingItem.name} was successfully replaced! Changes will reflect across the site.`);
      setReplacingItem(null);
      setReplacementFile(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Replacement failed';
      setReplaceError(msg);
    } finally {
      setReplacing(false);
    }
  };

  // ─── Delete Asset Handlers ────────────────────────────────────────────────
  const handleOpenDelete = (item: MediaItem) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    setDeleting(true);
    try {
      const res = await fetch('/api/media/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: deletingItem.path,
          bucket: activeBucket,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Deletion failed.');
      }

      // Remove from state
      if (activeBucket === 'public-assets') {
        setPublicAssets((prev) => prev.filter((item) => item.path !== deletingItem.path));
      } else {
        setApplicantDocuments((prev) => prev.filter((item) => item.path !== deletingItem.path));
      }

      if (inspectingItem && inspectingItem.path === deletingItem.path) {
        setInspectingItem(null);
      }

      // Persist deleted path
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_DELETED);
        const parsed: string[] = stored ? JSON.parse(stored) : [];
        if (!parsed.includes(deletingItem.path)) {
          parsed.push(deletingItem.path);
          localStorage.setItem(LOCAL_STORAGE_DELETED, JSON.stringify(parsed));
        }
      } catch {}

      showToast(`Asset ${deletingItem.name} was successfully deleted.`);
      setDeletingItem(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Deletion failed';
      alert(`Error deleting asset: ${msg}`);
    } finally {
      setDeleting(false);
    }
  };

  // ─── Upload New Asset Handler ──────────────────────────────────────────────
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
        setUploadSuccess(`Asset successfully uploaded: ${data.asset.path}`);
        const cleanName = selectedFile.name;
        const newItem: MediaItem = {
          name: cleanName,
          path: data.asset.path,
          size: `${Math.max(1, Math.round(selectedFile.size / 1024))} KB`,
          type: selectedFile.type,
          date: new Date().toISOString().split('T')[0],
          publicUrl: data.asset.publicUrl || `/${data.asset.path}`,
          category: uploadFolder,
          altText: cleanName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          title: cleanName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        };

        if (activeBucket === 'public-assets') {
          setPublicAssets((prev) => [newItem, ...prev]);
        } else {
          setApplicantDocuments((prev) => [newItem, ...prev]);
        }

        showToast(`Asset ${cleanName} uploaded successfully.`);
        setTimeout(() => {
          setIsUploadOpen(false);
          setSelectedFile(null);
          setUploadSuccess(null);
        }, 1200);
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

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-[#0B1224] border border-[#257CFF]/50 text-white shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ── Header: Title & Bucket Tabs ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
              ASSET STORAGE &amp; VAULT
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              {publicAssets.length} Total Registered
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white">Media &amp; Document Vault</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage, replace, delete, and inspect all images, logos, documents, and videos across Sijam Consults.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Storage Bucket Switcher */}
          <div className="flex p-1 bg-[#121B2B] border border-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setActiveBucket('public-assets');
                setSelectedCategory('all');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
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
              onClick={() => {
                setActiveBucket('applicant-documents');
                setSelectedCategory('all');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeBucket === 'applicant-documents'
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-md'
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition active:scale-[0.98]"
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

      {/* ── Category Filter Pills (Public Assets Only) ── */}
      {activeBucket === 'public-assets' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const count =
              tab.id === 'all'
                ? publicAssets.length
                : publicAssets.filter((a) => a.category === tab.id).length;
            const isSelected = selectedCategory === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white border-transparent shadow-md'
                    : 'bg-[#0B1224] text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Search, Format Filter, and View Mode Switcher ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 sm:max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${activeBucket} by name, alt tag, or path...`}
              className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#4DA5EC]"
            />
          </div>

          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-3 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-[#4DA5EC] cursor-pointer"
          >
            <option value="all">All Formats</option>
            <option value="image">Images (PNG/JPG/SVG)</option>
            <option value="pdf">PDF Documents</option>
            <option value="video">Videos (MP4)</option>
          </select>
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
              title="Grid View (Image &amp; File Previews)"
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
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or category filter.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* ══════════════════════════════════════════════════════════════════════
           GRID VIEW — VISIBLE THUMBNAILS, REPLACE, DELETE & SEO ACTIONS
        ══════════════════════════════════════════════════════════════════════ */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const isImg = isImageFile(item);
            const isVid = isVideoFile(item);
            const isPdf = isPdfFile(item);
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
                  ) : isVid ? (
                    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-700/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition">
                        <Film className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        HD Video Asset
                      </span>
                    </div>
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
                        className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium truncate max-w-[150px]"
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

                    {/* Action Buttons: Replace, Delete, Copy, SEO */}
                    <div className="flex items-center gap-1">
                      {/* Replace Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenReplace(item)}
                        className="p-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900 text-blue-300 transition"
                        title="Replace Asset (Update file across website)"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenDelete(item)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy URL / Signed URL */}
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

                      {/* Inspect SEO */}
                      <button
                        type="button"
                        onClick={() => handleOpenInspector(item)}
                        className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 transition"
                        title="Edit SEO &amp; Alt Tag"
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
           LIST VIEW — TABULAR DATA WITH DIRECT INSPECTION & ACTIONS
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
              const isVid = isVideoFile(item);

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
                      ) : isVid ? (
                        <Film className="w-5 h-5 text-purple-400" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.category && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-950/80 text-blue-300 border border-blue-800/50 uppercase">
                            {item.category}
                          </span>
                        )}
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

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                    <div className="text-[11px] text-slate-400 font-mono text-right hidden md:block mr-2">
                      <div>{item.size}</div>
                      <div className="text-[10px] text-slate-500">{item.date}</div>
                    </div>

                    {/* Replace Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenReplace(item)}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/60 hover:bg-blue-900 border border-blue-800/50 text-blue-300 text-[11px] font-medium transition flex items-center gap-1"
                      title="Replace file across website"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Replace</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenDelete(item)}
                      className="p-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/50 text-rose-300 transition"
                      title="Delete asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* SEO Tag Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenInspector(item)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/50 text-cyan-300 text-[11px] font-medium transition flex items-center gap-1"
                      title="Inspect and Edit SEO Alt Tags"
                    >
                      <Tag className="w-3 h-3" />
                      <span>SEO</span>
                    </button>

                    {/* Copy / Download URL */}
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
         REPLACE ASSET MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {replacingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1224] border border-blue-700/60 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#080E20]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    Replace Asset
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono truncate max-w-[280px]">
                    /{replacingItem.path}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReplacingItem(null)}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmReplace} className="p-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-black overflow-hidden flex items-center justify-center shrink-0 border border-slate-800">
                  {isImageFile(replacingItem) ? (
                    <img src={getItemUrl(replacingItem)} alt={replacingItem.name} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{replacingItem.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Current Size: {replacingItem.size}</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Will replace this exact asset path</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Select New Replacement File
                </label>
                <input
                  type="file"
                  required
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null;
                    setReplacementFile(f);
                  }}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-[#4DA5EC] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-blue-950 file:text-blue-300 hover:file:bg-blue-900 cursor-pointer"
                />
              </div>

              {replacementFile && (
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    New file selected: {replacementFile.name}
                  </div>
                  <div className="text-[11px] text-blue-300/80">
                    Size: {Math.max(1, Math.round(replacementFile.size / 1024))} KB • Type: {replacementFile.type || 'file'}
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Once replaced, all pages displaying this asset will automatically update to the new version.
                  </p>
                </div>
              )}

              {replaceError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{replaceError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReplacingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replacing || !replacementFile}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition flex items-center gap-1.5 active:scale-[0.98]"
                >
                  {replacing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Replacing Asset...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Confirm Replacement</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
         DELETE ASSET CONFIRMATION MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1224] border border-rose-800/80 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-800 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-heading font-extrabold text-base text-white">
                Delete Asset?
              </h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to permanently remove <strong className="text-white">{deletingItem.name}</strong> from the vault?
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-1">
                /{deletingItem.path}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition flex items-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Asset</span>
                  </>
                )}
              </button>
            </div>
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
                    ) : isVideoFile(inspectingItem) ? (
                      <div className="text-center p-6 space-y-2">
                        <Film className="w-12 h-12 text-purple-400 mx-auto" />
                        <span className="text-xs font-mono text-slate-300 block">
                          {inspectingItem.name}
                        </span>
                      </div>
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

                  {/* Quick Action: Replace & Delete inside Inspector */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleOpenReplace(inspectingItem)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 text-blue-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Replace Asset</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenDelete(inspectingItem)}
                      className="py-1.5 px-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
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
                Upload File to {activeBucket}
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
                  Destination Category / Folder
                </label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#4DA5EC]"
                >
                  <option value="blogs">blogs/ (Editorial Graphics &amp; Heroes)</option>
                  <option value="brand">brand/ (Trademarks, Logos, Certificates)</option>
                  <option value="team">team/ (Executive Staff Portraits)</option>
                  <option value="partners">partners/ (Institutional Logos &amp; Crests)</option>
                  <option value="reviews">reviews/ (Testimonial Logos &amp; Avatars)</option>
                  <option value="visas">visas/ (Consular Approval Documents)</option>
                  <option value="docs">docs/ (Company Profile, Brochures, PDFs)</option>
                  <option value="media">media/ (Videos &amp; Media Assets)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Select File (Images, PDF, Video — Max 15 MB)
                </label>
                <input
                  type="file"
                  required
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
