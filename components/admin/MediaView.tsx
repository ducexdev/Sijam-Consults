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
} from 'lucide-react';

interface MediaItem {
  name: string;
  path: string;
  size: string;
  type: string;
  date: string;
  status?: string;
  publicUrl?: string | null;
}

const INITIAL_PUBLIC_ASSETS: MediaItem[] = [
  { name: 'logo.png', path: 'branding/logo.png', size: '42 KB', type: 'image/png', date: '2026-10-10', publicUrl: '/branding/logo.png' },
  { name: 'James-Samson.png', path: 'team/James-Samson.png', size: '128 KB', type: 'image/png', date: '2026-10-10', publicUrl: '/team/James-Samson.png' },
  { name: 'Blessing-Attabor.png', path: 'team/Blessing-Attabor.png', size: '115 KB', type: 'image/png', date: '2026-10-10', publicUrl: '/team/Blessing-Attabor.png' },
  { name: 'Salami-Zainab-Keyinde.png', path: 'team/Salami-Zainab-Keyinde.png', size: '122 KB', type: 'image/png', date: '2026-10-10', publicUrl: '/team/Salami-Zainab-Keyinde.png' },
  { name: 'Why-Study-Nursing-in-Canada-20262027.png', path: 'blogs/Why-Study-Nursing-in-Canada-20262027.png', size: '340 KB', type: 'image/png', date: '2026-10-11', publicUrl: '/blogs/Why-Study-Nursing-in-Canada-20262027.png' },
  { name: 'Ducex-Blog.png', path: 'blogs/Ducex-Blog.png', size: '290 KB', type: 'image/png', date: '2026-10-11', publicUrl: '/blogs/Ducex-Blog.png' },
  { name: 'Poland-Work-Permit.png', path: 'blogs/Poland-Work-Permit.png', size: '310 KB', type: 'image/png', date: '2026-10-14', publicUrl: '/blogs/Poland-Work-Permit.png' },
  { name: 'UK-Healthcare-Mobility.png', path: 'blogs/UK-Healthcare-Mobility.png', size: '280 KB', type: 'image/png', date: '2026-10-14', publicUrl: '/blogs/UK-Healthcare-Mobility.png' },
];

const INITIAL_APPLICANT_DOCUMENTS: MediaItem[] = [
  { name: 'CV_Tunde_Adeyemi_RN.pdf', path: 'candidates/app-01/CV_Tunde_Adeyemi_RN.pdf', size: '412 KB', type: 'application/pdf', date: '2026-10-12', status: 'Encrypted' },
  { name: 'CV_Ngozi_Eze_Developer.pdf', path: 'candidates/app-02/CV_Ngozi_Eze_Developer.pdf', size: '280 KB', type: 'application/pdf', date: '2026-10-12', status: 'Encrypted' },
  { name: 'Passport_Data_Page_Redacted.pdf', path: 'candidates/app-01/Passport_Data_Page_Redacted.pdf', size: '1.2 MB', type: 'application/pdf', date: '2026-10-12', status: 'Restricted' },
];

export function MediaView() {
  const [activeBucket, setActiveBucket] = useState<'public-assets' | 'applicant-documents'>('public-assets');
  const [searchTerm, setSearchTerm] = useState('');
  const [publicAssets, setPublicAssets] = useState<MediaItem[]>(INITIAL_PUBLIC_ASSETS);
  const [applicantDocuments, setApplicantDocuments] = useState<MediaItem[]>(INITIAL_APPLICANT_DOCUMENTS);

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
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

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
            setPublicAssets(json.files);
          }
        }

        if (docsRes.ok) {
          const json = await docsRes.json();
          if (json.success && json.files && json.files.length > 0) {
            setApplicantDocuments(json.files);
          }
        }
      } catch (err) {
        console.error('[MediaView] Storage listing fetch error:', err);
      }
    }
    fetchStorageListings();
  }, []);

  const activeList = activeBucket === 'public-assets' ? publicAssets : applicantDocuments;

  const filteredItems = activeList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, path: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handleGenerateSignedUrl = async (path: string) => {
    setGeneratingSignedUrl(path);
    try {
      const res = await fetch('/api/media/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, bucket: 'applicant-documents', expiresIn: 900 }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to generate signed URL.');
      }
      setSignedUrlModal({
        path,
        url: data.signedUrl,
        expiresAt: data.expiresAt,
      });
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Could not generate signed download URL.');
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
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'File upload failed.');
      }

      const newAsset: MediaItem = {
        name: data.asset.name,
        path: data.asset.path,
        size: data.asset.size,
        type: data.asset.type,
        date: data.asset.date,
        publicUrl: data.asset.publicUrl,
      };

      if (activeBucket === 'public-assets') {
        setPublicAssets([newAsset, ...publicAssets]);
      } else {
        setApplicantDocuments([newAsset, ...applicantDocuments]);
      }

      setUploadSuccess(`File "${selectedFile.name}" uploaded successfully!`);
      setTimeout(() => {
        setIsUploadOpen(false);
        setSelectedFile(null);
        setUploadSuccess(null);
      }, 1500);
    } catch (err) {
      console.error(err);
      setUploadError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Cloudflare &amp; Supabase Storage • Asset Governance
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Media &amp; Document Vault
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Bucket Toggle */}
          <div className="flex items-center gap-1 bg-[#0D1420] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveBucket('public-assets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeBucket === 'public-assets'
                  ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              public-assets
            </button>
            <button
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
            onClick={() => {
              setUploadError(null);
              setUploadSuccess(null);
              setSelectedFile(null);
              setIsUploadOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
        </div>
      </div>

      {/* Security Context Banner */}
      {activeBucket === 'applicant-documents' ? (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-2">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
            <Lock className="w-4 h-4" />
            Restricted Vault: Candidate Documents &amp; PII Storage
          </div>
          <p className="text-xs text-rose-200/80 leading-relaxed">
            All files in this bucket are encrypted and protected by Supabase Row Level Security (RLS). Public direct URLs return 403 Forbidden. Authorized case officers can generate 15-minute signed download URLs upon identity verification.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-1">
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs">
            <Globe className="w-4 h-4" />
            Public Assets CDN: Edge-Cached via Cloudflare
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Assets uploaded here are served publicly with immutable cache-control headers for optimal Core Web Vitals (LCP) performance.
          </p>
        </div>
      )}

      {/* Filter and Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${activeBucket} by name or folder path...`}
          className="w-full pl-10 pr-4 py-2 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Files List */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-white">
            Bucket Contents: {activeBucket}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {filteredItems.length} assets recorded
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No files found in {activeBucket}. Click &ldquo;Upload File&rdquo; to add assets.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.path}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-800/40 transition gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    {item.type.includes('image') ? (
                      <ImageIcon className="w-5 h-5 text-purple-400" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{item.path}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="text-[11px] text-slate-400 font-mono text-right hidden md:block">
                    <div>{item.size}</div>
                    <div className="text-[10px] text-slate-500">{item.date}</div>
                  </div>

                  {activeBucket === 'public-assets' ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(item.publicUrl || `/${item.path}`, item.path)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition"
                        title="Copy CDN URL"
                      >
                        {copiedPath === item.path ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        {copiedPath === item.path ? 'Copied' : 'Copy URL'}
                      </button>
                      <a
                        href={item.publicUrl || `/${item.path}`}
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
            ))
          )}
        </div>
      </div>

      {/* ── Upload Modal ── */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1420] border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-purple-400" />
                Upload to {activeBucket}
              </h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Target Folder
                </label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  {activeBucket === 'public-assets' ? (
                    <>
                      <option value="blogs">blogs/ (Blog featured images)</option>
                      <option value="team">team/ (Staff portraits)</option>
                      <option value="branding">branding/ (Logos &amp; badges)</option>
                      <option value="visas">visas/ (Proof &amp; stamp scans)</option>
                    </>
                  ) : (
                    <>
                      <option value="candidates">candidates/ (Applicant dossiers)</option>
                      <option value="visas-private">visas-private/ (Unredacted stamps)</option>
                      <option value="contracts">contracts/ (Client agreements)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Choose File
                </label>
                <input
                  type="file"
                  required
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-950 file:text-purple-300 hover:file:bg-purple-900 cursor-pointer"
                />
                {selectedFile && (
                  <p className="text-[10px] text-slate-400 mt-1">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {uploadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {uploadSuccess}
                </div>
              )}
              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-950 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {uploadError}
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition"
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
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-rose-400" />
                Temporary Signed Download URL
              </h3>
              <button
                onClick={() => setSignedUrlModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              This cryptographic download link grants 15-minute access to the confidential document:
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-purple-300 break-all">
              {signedUrlModal.url}
            </div>

            <p className="text-[10px] text-amber-400">
              Expires at: {new Date(signedUrlModal.expiresAt).toLocaleTimeString()} (Access logged to audit trail)
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleCopy(signedUrlModal.url, 'signed-url')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedPath === 'signed-url' ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={signedUrlModal.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition"
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
