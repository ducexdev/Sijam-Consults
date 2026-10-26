'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  ExternalLink,
  X,
  Image as ImageIcon,
  Globe,
  Sparkles,
  Check,
  HelpCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  BookOpen,
  Compass,
  TrendingUp,
  PenTool,
  Calendar,
  Filter,
  Layers,
  Tag,
  ArrowUpRight,
  Clock,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { BlogPostRecord, BlogPostStatus } from '@/lib/types/database';
import {
  adminCreateBlogPost,
  adminUpdateBlogPost,
  adminDeleteBlogPost,
  adminToggleBlogPostStatus,
} from '@/app/actions/blog';

interface BlogViewProps {
  posts: BlogPostRecord[];
  onRefresh: () => void;
}

const PRESET_IMAGES = [
  { label: 'Canada Nursing', url: '/blogs/Why-Study-Nursing-in-Canada-20262027.png' },
  { label: 'Corporate Legalization', url: '/blogs/Ducex-Blog.png' },
  { label: 'Poland Work Permit', url: '/blogs/Poland-Work-Permit.png' },
  { label: 'UK Healthcare Mobility', url: '/blogs/UK-Healthcare-Mobility.png' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const map: Record<string, { label: string; cls: string; Icon: React.ElementType }> = {
    'study-abroad':   { label: 'Study Abroad',    cls: 'bg-cyan-950 text-cyan-300 border-cyan-800',    Icon: BookOpen },
    'travel-guide':   { label: 'Travel Guide',    cls: 'bg-blue-950 text-blue-300 border-blue-800',    Icon: Compass },
    'visa-guide':     { label: 'Visa Guide',      cls: 'bg-amber-950 text-amber-300 border-amber-800', Icon: Globe },
    'work-visas':         { label: 'Work Permits',    cls: 'bg-purple-950 text-purple-300 border-purple-800', Icon: FileText },
    'work-relocation':    { label: 'Work Relocation', cls: 'bg-purple-950 text-purple-300 border-purple-800', Icon: FileText },
    'immigration-policy': { label: 'Immigration', cls: 'bg-rose-950 text-rose-300 border-rose-800',   Icon: FileText },
    'business-mobility':  { label: 'Business',   cls: 'bg-emerald-950 text-emerald-300 border-emerald-800', Icon: TrendingUp },
    'visitor-tourist':    { label: 'Tourist',     cls: 'bg-indigo-950 text-indigo-300 border-indigo-800', Icon: Compass },
    'international-jobs': { label: 'Int\'l Jobs', cls: 'bg-teal-950 text-teal-300 border-teal-800',  Icon: BookOpen },
  };
  const cfg = map[category] || { label: category || 'General', cls: 'bg-slate-800 text-slate-300 border-slate-700', Icon: Tag };
  const Icon = cfg.Icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.cls}`}>
      <Icon className="w-2.5 h-2.5" />
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }: { status: BlogPostStatus }) {
  const map: Record<string, string> = {
    published: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    draft:     'bg-slate-800 text-slate-300 border-slate-700',
    scheduled: 'bg-purple-950 text-purple-300 border-purple-700',
    archived:  'bg-rose-950 text-rose-300 border-rose-800',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${map[status] || map.draft}`}>
      {status}
    </span>
  );
}

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function Sparkline({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 28" className="w-20 h-7" fill="none">
      <polyline
        points="0,22 10,18 20,20 30,12 40,16 50,8 60,12 70,6 80,10"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        fill="none" opacity="0.7"
      />
    </svg>
  );
}

// ─── Donut chart driven by real data ─────────────────────────────────────────
function DonutChart({ published, draft, scheduled, total }: { published: number; draft: number; scheduled: number; total: number }) {
  const r = 38; const cx = 50; const cy = 50; const circ = 2 * Math.PI * r;
  const pPublished = total > 0 ? Math.round((published / total) * 100) : 0;
  const pDraft     = total > 0 ? Math.round((draft     / total) * 100) : 0;
  const pScheduled = total > 0 ? Math.round((scheduled / total) * 100) : 0;
  const segments = [
    { pct: pPublished, color: '#10b981' },
    { pct: pDraft,     color: '#a855f7' },
    { pct: pScheduled, color: '#f59e0b' },
  ];
  let offset = 0;
  const paths = segments.map((seg, i) => {
    const dash = (seg.pct / 100) * circ; const gap = circ - dash;
    const el = (
      <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth="12"
        strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset}
        transform={`rotate(-90 ${cx} ${cy})`} opacity={seg.pct === 0 ? 0.15 : 1} />
    );
    offset += dash; return el;
  });
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      {paths}
      <text x="50" y="46" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">{total}</text>
      <text x="50" y="58" textAnchor="middle" fill="#94a3b8" fontSize="6.5">Total</text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function BlogView({ posts, onRefresh }: BlogViewProps) {
  const [searchTerm, setSearchTerm]       = useState('');
  const [statusFilter, setStatusFilter]   = useState<string>('all');
  const [typeFilter, setTypeFilter]       = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage]     = useState(1);
  const [isEditing, setIsEditing]         = useState(false);
  const [editingPost, setEditingPost]     = useState<BlogPostRecord | null>(null);
  const [activeTab, setActiveTab]         = useState<'content' | 'media' | 'seo'>('content');
  const [deleting, setDeleting]           = useState<string | null>(null);

  // Form State
  const [title, setTitle]                     = useState('');
  const [slug, setSlug]                       = useState('');
  const [postType, setPostType]               = useState<'guide' | 'blog' | 'news'>('blog');
  const [summary, setSummary]                 = useState('');
  const [categoryId, setCategoryId]           = useState('study-abroad');
  const [takeawaysText, setTakeawaysText]     = useState('');
  const [section1Heading, setSection1Heading] = useState('Overview');
  const [section1Content, setSection1Content] = useState('');
  const [readTime, setReadTime]               = useState(5);
  const [status, setStatus]                   = useState<BlogPostStatus>('draft');
  const [authorName, setAuthorName]           = useState('James Samson');
  const [authorRole, setAuthorRole]           = useState('Managing Director & Principal Consultant');
  const [featuredImage, setFeaturedImage]     = useState('/blogs/Why-Study-Nursing-in-Canada-20262027.png');
  const [imageAlt, setImageAlt]               = useState('');
  const [imageCaption, setImageCaption]       = useState('');
  const [metaTitle, setMetaTitle]             = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword]       = useState('');
  const [canonicalUrl, setCanonicalUrl]       = useState('');
  const [loading, setLoading]                 = useState(false);
  const [successMsg, setSuccessMsg]           = useState<string | null>(null);

  const PER_PAGE = 10;

  // ─── Derived KPI stats from real data ──────────────────────────────────────
  const totalCount     = posts.length;
  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount     = posts.filter(p => p.status === 'draft').length;
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const guideCount     = posts.filter(p => p.post_type === 'guide').length;

  const kpiCards = [
    { label: 'Total Articles', value: totalCount, icon: FileText, iconBg: 'bg-purple-900/60', iconColor: 'text-purple-400', sparkColor: '#a855f7' },
    { label: 'Travel Guides',  value: guideCount, icon: Compass,  iconBg: 'bg-blue-900/60',   iconColor: 'text-blue-400',   sparkColor: '#60a5fa' },
    { label: 'Published',      value: publishedCount, icon: CheckCircle2, iconBg: 'bg-emerald-900/60', iconColor: 'text-emerald-400', sparkColor: '#10b981' },
    { label: 'Drafts',         value: draftCount, icon: PenTool,  iconBg: 'bg-amber-900/60',  iconColor: 'text-amber-400',  sparkColor: '#f59e0b' },
  ];

  // ─── Filtered + Paginated data ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    return posts.filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (typeFilter !== 'all' && p.post_type !== typeFilter) return false;
      if (categoryFilter !== 'all' && p.category_id !== categoryFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.author_name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [posts, statusFilter, typeFilter, categoryFilter, searchTerm]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated   = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  // ─── SEO Score ─────────────────────────────────────────────────────────────
  const computeSeoScore = () => {
    let score = 0;
    const checks: { label: string; passed: boolean }[] = [];
    const activeMetaTitle = metaTitle || title;
    const titleOk = activeMetaTitle.length >= 35 && activeMetaTitle.length <= 70;
    if (titleOk) score += 20;
    checks.push({ label: `Meta Title length optimal (${activeMetaTitle.length}/60 chars)`, passed: titleOk });
    const activeMetaDesc = metaDescription || summary;
    const descOk = activeMetaDesc.length >= 100 && activeMetaDesc.length <= 170;
    if (descOk) score += 20;
    checks.push({ label: `Meta Description optimal (${activeMetaDesc.length}/160 chars)`, passed: descOk });
    const kw = focusKeyword.trim().toLowerCase();
    const kwInTitle = kw.length > 0 && activeMetaTitle.toLowerCase().includes(kw);
    if (kwInTitle) score += 20;
    checks.push({ label: `Focus keyword "${focusKeyword}" in Title`, passed: kwInTitle });
    const kwInDesc = kw.length > 0 && activeMetaDesc.toLowerCase().includes(kw);
    if (kwInDesc) score += 15;
    checks.push({ label: `Focus keyword in Excerpt`, passed: kwInDesc });
    const hasImage = featuredImage.trim().length > 0;
    if (hasImage) score += 15;
    checks.push({ label: 'Featured image assigned', passed: hasImage });
    const hasContent = section1Content.trim().length >= 50;
    if (hasContent) score += 10;
    checks.push({ label: 'Article body provided (>50 chars)', passed: hasContent });
    return { score, checks };
  };
  const seoAnalysis = computeSeoScore();

  // ─── Form helpers ─────────────────────────────────────────────────────────
  const resetForm = () => {
    setTitle(''); setSlug(''); setSummary(''); setTakeawaysText('');
    setSection1Heading('Overview'); setSection1Content('');
    setFeaturedImage('/blogs/Why-Study-Nursing-in-Canada-20262027.png');
    setImageAlt(''); setImageCaption(''); setMetaTitle(''); setMetaDescription('');
    setFocusKeyword(''); setCanonicalUrl(''); setPostType('blog'); setStatus('draft');
    setSuccessMsg(null); setEditingPost(null); setActiveTab('content');
  };

  const handleOpenCreate = () => { resetForm(); setIsEditing(true); };

  const handleOpenEdit = (p: BlogPostRecord) => {
    setEditingPost(p); setTitle(p.title); setSlug(p.slug); setPostType(p.post_type);
    setSummary(p.summary); setCategoryId(p.category_id);
    setTakeawaysText(p.key_takeaways?.join('\n') || '');
    if (p.sections && p.sections.length > 0) {
      setSection1Heading(p.sections[0].heading); setSection1Content(p.sections[0].content);
    } else { setSection1Heading('Overview'); setSection1Content(''); }
    setFeaturedImage(p.featured_image || '/blogs/Why-Study-Nursing-in-Canada-20262027.png');
    setImageAlt(`${p.title} - Sijam Consults`);
    setImageCaption(''); setReadTime(p.read_time_minutes || 5); setStatus(p.status);
    setAuthorName(p.author_name); setAuthorRole(p.author_role);
    setMetaTitle(p.meta_title || p.title); setMetaDescription(p.meta_description || p.summary);
    setCanonicalUrl(p.canonical_url || `https://sijamconsults.com/${p.post_type === 'guide' ? 'guides' : 'blog'}/${p.slug}`);
    setFocusKeyword(p.tags?.[0] || '');
    setIsEditing(true); setActiveTab('content');
  };

  const handleDeletePost = async (p: BlogPostRecord) => {
    if (!confirm(`Delete "${p.title}"? This cannot be reversed.`)) return;
    setDeleting(p.id);
    try { await adminDeleteBlogPost(p.id); onRefresh(); }
    catch (e) { console.error(e); alert('Failed to delete publication.'); }
    finally { setDeleting(null); }
  };

  const handleToggleStatus = async (p: BlogPostRecord, newStatus: BlogPostStatus) => {
    try { await adminToggleBlogPostStatus(p.id, newStatus); onRefresh(); }
    catch (e) { console.error(e); alert('Failed to update status.'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const takeaways = takeawaysText.split('\n').filter(l => l.trim().length > 0);
      const sections  = [{ heading: section1Heading, content: section1Content }];
      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (editingPost) {
        await adminUpdateBlogPost(editingPost.id, {
          title,
          slug: generatedSlug,
          post_type: postType,
          summary,
          category_id: categoryId,
          key_takeaways: takeaways,
          sections,
          featured_image: featuredImage,
          read_time_minutes: readTime,
          status,
          author_name: authorName,
          author_role: authorRole,
          meta_title: metaTitle || title,
          meta_description: metaDescription || summary,
          canonical_url: canonicalUrl || `https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${generatedSlug}`,
          tags: [postType, categoryId].filter(Boolean),
        });
        setSuccessMsg('Article updated successfully.');
      } else {
        await adminCreateBlogPost({
          title,
          slug: generatedSlug,
          postType,
          summary,
          categoryId,
          keyTakeaways: takeaways,
          sections,
          featuredImage,
          readTimeMinutes: readTime,
          status,
          authorName,
          authorRole,
          tags: [postType, categoryId].filter(Boolean),
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || summary,
          canonicalUrl: canonicalUrl || `https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${generatedSlug}`,
        });
        setSuccessMsg('Article published successfully.');
      }
      setTimeout(() => { setIsEditing(false); resetForm(); onRefresh(); }, 1200);
    } catch (e) { console.error(e); alert('Failed to save article. Please try again.'); }
    finally { setLoading(false); }
  };

  // Unique categories from real data for filter dropdown
  const uniqueCategories = Array.from(new Set(posts.map(p => p.category_id))).filter(Boolean);

  return (
    <div className="space-y-6">

      {/* ── Header Banner ─────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-[#1a2744] bg-gradient-to-br from-[#06091a] via-[#0d1330] to-[#0b0e2a]">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-32 opacity-25"
            style={{ background: 'radial-gradient(ellipse at 80% 100%, #7c3aed 0%, transparent 70%)' }} />
          <svg className="absolute bottom-0 right-0 w-72 h-28 opacity-15" viewBox="0 0 256 96" preserveAspectRatio="none">
            <polygon points="0,96 60,30 100,60 150,10 200,50 256,20 256,96" fill="#4c1d95"/>
            <polygon points="80,96 130,40 170,70 220,25 256,50 256,96" fill="#6d28d9" opacity="0.4"/>
          </svg>
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
          <div>
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Content Management</span>
            <h1 className="font-heading font-extrabold text-2xl text-white mt-1">Blog &amp; Editorial Publishing</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Create, manage and publish editorial content — articles, guides, and visa insights.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onRefresh} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleOpenCreate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Create New Article
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-[#07091c] border border-[#1a2744] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#2a3a5c] transition">
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  <Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
                <Sparkline color={card.sparkColor} />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white leading-none">{card.value}</div>
                <div className="text-[11px] text-slate-400 mt-1">{card.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main 2-column layout ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_272px] gap-6">

        {/* ── Left: Filters + Table ────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Search articles, guides, authors..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#07091c] border border-[#1a2744] rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500" />
            </div>

            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2.5 bg-[#07091c] border border-[#1a2744] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer">
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>

            <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2.5 bg-[#07091c] border border-[#1a2744] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer">
              <option value="all">All Types</option>
              <option value="guide">Destination Guides</option>
              <option value="blog">Blog Posts</option>
              <option value="news">News & Policy</option>
            </select>

            <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2.5 bg-[#07091c] border border-[#1a2744] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer">
              <option value="all">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
              ))}
            </select>

            {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || categoryFilter !== 'all') && (
              <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); setTypeFilter('all'); setCategoryFilter('all'); setCurrentPage(1); }}
                className="px-3 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-400 hover:text-white hover:border-slate-600 transition">
                Clear filters
              </button>
            )}

            <span className="text-xs text-slate-500 ml-auto whitespace-nowrap">
              {filtered.length} of {posts.length} articles
            </span>
          </div>

          {/* Table */}
          <div className="bg-[#07091c] border border-[#1a2744] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0b0e2a] text-slate-400 text-[10px] uppercase tracking-wider border-b border-[#1a2744]">
                  <tr>
                    <th className="px-5 py-4">Title</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Author</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Published On</th>
                    <th className="px-4 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2744]/60">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#1a2744]/50 flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-slate-600" />
                          </div>
                          <h3 className="text-sm font-semibold text-slate-300 mb-1">
                            {posts.length === 0 ? 'No articles yet' : 'No results found'}
                          </h3>
                          <p className="text-xs text-slate-500 max-w-xs mb-4">
                            {posts.length === 0
                              ? 'Start building your editorial library by creating your first article or guide.'
                              : 'Try adjusting your search or filter criteria.'}
                          </p>
                          {posts.length === 0 && (
                            <button onClick={handleOpenCreate}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-[#257CFF]/20 transition">
                              <Plus className="w-3.5 h-3.5" /> Create First Article
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginated.map((post) => (
                      <tr key={post.id} className="hover:bg-[#0d1230]/70 transition group cursor-pointer" onClick={() => handleOpenEdit(post)}>
                        {/* Title */}
                        <td className="px-5 py-4 max-w-[240px]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1a2744] flex items-center justify-center shrink-0">
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-white text-xs truncate max-w-[170px]" title={post.title}>
                                {post.title}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  post.post_type === 'guide'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                    : post.post_type === 'news'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                    : 'bg-purple-950 text-purple-300 border border-purple-800'
                                }`}>
                                  {post.post_type}
                                </span>
                                <span className="text-[10px] text-purple-400 font-mono truncate max-w-[130px]">/{post.slug}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4">
                          <CategoryBadge category={post.category_id} />
                        </td>

                        {/* Author */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-700/40 flex items-center justify-center shrink-0">
                              <span className="text-[9px] text-purple-300 font-bold">
                                {post.author_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <div className="text-white text-xs font-medium">{post.author_name}</div>
                              <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{post.author_role}</div>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <StatusBadge status={post.status} />
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 text-slate-400 text-[11px] whitespace-nowrap">
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                            : <span className="text-slate-600">—</span>}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-right" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5 justify-end opacity-0 group-hover:opacity-100 transition">
                            <a href={post.post_type === 'guide' ? `/guides/${post.slug}` : `/blog/${post.slug}`}
                              target="_blank" rel="noreferrer"
                              className="p-1.5 rounded-lg bg-[#1a2744] hover:bg-slate-700 text-slate-400 hover:text-white transition inline-flex"
                              title="View live">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button onClick={() => handleOpenEdit(post)} title="Edit"
                              className="p-1.5 rounded-lg bg-[#1a2744] hover:bg-purple-900/60 text-slate-400 hover:text-purple-300 transition">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeletePost(post)} title="Delete"
                              disabled={deleting === post.id}
                              className="p-1.5 rounded-lg bg-[#1a2744] hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition disabled:opacity-50">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > PER_PAGE && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-[#1a2744]">
                <span className="text-[11px] text-slate-400">
                  Showing {(currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} of {filtered.length}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-[#1a2744] text-slate-400 hover:text-white hover:border-purple-500 disabled:opacity-30 transition">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const p = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <button key={p} onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 rounded-lg text-[11px] font-semibold transition border ${
                          currentPage === p ? 'bg-purple-600 text-white border-purple-500' : 'border-[#1a2744] text-slate-400 hover:text-white hover:border-purple-500'
                        }`}>{p}</button>
                    );
                  })}
                  <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-[#1a2744] text-slate-400 hover:text-white hover:border-purple-500 disabled:opacity-30 transition">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Sidebar ──────────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Content Performance donut */}
          <div className="bg-[#07091c] border border-[#1a2744] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Content Performance</h3>
            </div>
            {totalCount > 0 ? (
              <>
                <div className="flex items-center justify-center mb-5">
                  <DonutChart published={publishedCount} draft={draftCount} scheduled={scheduledCount} total={totalCount} />
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Published', value: publishedCount, pct: totalCount > 0 ? Math.round((publishedCount/totalCount)*100) : 0, color: 'bg-emerald-400' },
                    { label: 'Drafts',    value: draftCount,     pct: totalCount > 0 ? Math.round((draftCount/totalCount)*100) : 0,     color: 'bg-purple-400' },
                    { label: 'Scheduled', value: scheduledCount, pct: totalCount > 0 ? Math.round((scheduledCount/totalCount)*100) : 0, color: 'bg-amber-400' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-slate-300">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{item.value}</span>
                        <span className="text-slate-600">({item.pct}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <BarChart2 className="w-8 h-8 text-slate-700 mb-2" />
                <p className="text-xs text-slate-500">No content data yet.</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-[#07091c] border border-[#1a2744] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              {[
                { icon: Plus,       label: 'Create New Article', onClick: handleOpenCreate, primary: true },
                { icon: Eye,        label: 'View All Articles',  onClick: () => setStatusFilter('all'), primary: false },
                { icon: CheckCircle2, label: 'View Published',   onClick: () => setStatusFilter('published'), primary: false },
                { icon: PenTool,    label: 'View Drafts',        onClick: () => setStatusFilter('draft'), primary: false },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <button key={i} onClick={action.onClick}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                      action.primary
                        ? 'bg-purple-600 hover:bg-purple-500 text-white'
                        : 'bg-[#0d1230] hover:bg-[#1a2744] border border-[#1a2744] text-slate-300 hover:text-white'
                    }`}>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Post type breakdown */}
          {totalCount > 0 && (
            <div className="bg-[#07091c] border border-[#1a2744] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Post Types</h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Blog Posts', value: posts.filter(p => p.post_type === 'blog').length, color: 'text-purple-400' },
                  { label: 'Guides',     value: posts.filter(p => p.post_type === 'guide').length, color: 'text-blue-400' },
                  { label: 'News',       value: posts.filter(p => p.post_type === 'news').length, color: 'text-amber-400' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Article Editor Modal ──────────────────────────────────────────────── */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-slate-700/60 rounded-2xl max-w-3xl w-full shadow-2xl animate-in fade-in max-h-[92vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070d1c]">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {editingPost ? 'Edit Article' : 'Create Article or Guide'}
                </h3>
                <p className="text-xs text-slate-400">Configure content, media, and SEO settings.</p>
              </div>
              <button onClick={() => { setIsEditing(false); resetForm(); }} className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 px-6 pt-4 pb-0 border-b border-slate-800">
              {(['content', 'media', 'seo'] as const).map((tab) => (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg text-xs font-semibold flex items-center gap-1.5 transition border-b-2 -mb-px ${
                    activeTab === tab ? 'text-white border-purple-500 bg-purple-600/10' : 'text-slate-400 hover:text-white border-transparent'
                  }`}>
                  {tab === 'content' && <><FileText className="w-3.5 h-3.5" />Content</>}
                  {tab === 'media'   && <><ImageIcon className="w-3.5 h-3.5" />Media</>}
                  {tab === 'seo'     && (
                    <>
                      <Globe className="w-3.5 h-3.5" />SEO Analyzer
                      <span className="ml-1 px-1.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                        {seoAnalysis.score}%
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} className="p-6 space-y-4">

                {/* TAB 1: CONTENT */}
                {activeTab === 'content' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Article Title *</label>
                        <input type="text" required value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                            if (!editingPost && !metaTitle) setMetaTitle(e.target.value);
                            if (!editingPost) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                          }}
                          placeholder="e.g. How to Apply for a UK Skilled Worker Visa in 2026"
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">URL Slug</label>
                        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Publication Format</label>
                        <select value={postType} onChange={(e) => setPostType(e.target.value as 'guide' | 'blog' | 'news')}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500">
                          <option value="blog">Editorial Blog Post</option>
                          <option value="guide">Travel / Visa Guide</option>
                          <option value="news">Policy & Regulatory Alert</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Category</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500">
                          <option value="study-abroad">Study Abroad</option>
                          <option value="work-visas">Work Permits & Visas</option>
                          <option value="travel-guide">Travel Guide</option>
                          <option value="visa-guide">Visa Guide</option>
                          <option value="business-mobility">Business Mobility</option>
                          <option value="immigration-policy">Immigration Policy</option>
                          <option value="international-jobs">International Jobs</option>
                          <option value="visitor-tourist">Visitor & Tourist</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Read Time (Minutes)</label>
                        <input type="number" min={1} max={60} value={readTime} onChange={(e) => setReadTime(Number(e.target.value))}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500">
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Summary / Excerpt *</label>
                      <textarea rows={2} required value={summary}
                        onChange={(e) => { setSummary(e.target.value); if (!editingPost && !metaDescription) setMetaDescription(e.target.value); }}
                        placeholder="Brief description shown in previews and search results..."
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Key Takeaways (one per line)</label>
                      <textarea rows={3} value={takeawaysText} onChange={(e) => setTakeawaysText(e.target.value)}
                        placeholder="Readers will understand work visa eligibility requirements&#10;Step-by-step application process explained&#10;Document checklist included"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none" />
                    </div>
                    <div className="space-y-2 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                      <label className="block text-[11px] uppercase font-bold text-purple-400">Primary Article Section</label>
                      <input type="text" value={section1Heading} onChange={(e) => setSection1Heading(e.target.value)}
                        placeholder="Section heading..."
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      <textarea rows={4} value={section1Content} onChange={(e) => setSection1Content(e.target.value)}
                        placeholder="Article body content..."
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Author Name</label>
                        <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Author Role</label>
                        <input type="text" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: MEDIA */}
                {activeTab === 'media' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Featured Cover Image URL *</label>
                      <input type="text" required value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)}
                        placeholder="/blogs/my-article-cover.png"
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">Brand Media Library</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PRESET_IMAGES.map((preset) => (
                          <button key={preset.url} type="button" onClick={() => setFeaturedImage(preset.url)}
                            className={`p-2 rounded-xl border text-left transition text-xs flex flex-col gap-1 ${
                              featuredImage === preset.url ? 'bg-purple-950/80 border-purple-500' : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                            }`}>
                            <img src={preset.url} alt="" className="w-full h-14 object-cover rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            <span className="font-medium text-[11px] text-slate-300 truncate">{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                      <span className="text-[11px] uppercase font-bold text-purple-400 block mb-2">Live Preview</span>
                      <div className="relative aspect-video max-h-48 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                        {featuredImage ? (
                          <img src={featuredImage} alt={imageAlt || title} className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                        ) : (
                          <div className="text-center text-slate-500 text-xs">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />No image selected
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Image Alt Text</label>
                        <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)}
                          placeholder="Descriptive alt text for accessibility & SEO"
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Editorial Caption</label>
                        <input type="text" value={imageCaption} onChange={(e) => setImageCaption(e.target.value)}
                          placeholder="Image caption shown below the photo"
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: SEO */}
                {activeTab === 'seo' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="font-heading font-bold text-white text-sm">SEO Score: {seoAnalysis.score} / 100</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Google SERP best practices analysis.</p>
                      </div>
                      <div className="w-full sm:w-36 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                        <div className={`h-full transition-all duration-500 ${seoAnalysis.score >= 80 ? 'bg-emerald-500' : seoAnalysis.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${seoAnalysis.score}%` }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {seoAnalysis.checks.map((chk, i) => (
                        <div key={i} className={`p-2.5 rounded-lg border flex items-center gap-2 ${chk.passed ? 'bg-emerald-950/40 border-emerald-900 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
                          {chk.passed ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                          <span className="text-[11px]">{chk.label}</span>
                        </div>
                      ))}
                    </div>
                    {/* SERP Preview */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200 text-slate-900 shadow-md">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Google SERP Preview</span>
                      <div className="text-[11px] text-[#202124] flex items-center gap-1 font-sans">
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span>sijamconsults.com › {postType === 'guide' ? 'guides' : 'blog'} › {slug || 'article-slug'}</span>
                      </div>
                      <div className="text-[16px] text-[#1a0dab] font-medium cursor-pointer font-sans leading-snug mt-1">
                        {metaTitle || title || 'Article Title'} | Sijam Consults
                      </div>
                      <div className="text-[13px] text-[#4d5156] font-sans line-clamp-2 leading-relaxed">
                        {metaDescription || summary || 'Article description...'}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[11px] uppercase font-bold text-slate-400">Meta Title</label>
                          <span className={`text-[10px] font-mono ${(metaTitle || title).length >= 40 && (metaTitle || title).length <= 65 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {(metaTitle || title).length} / 60 chars
                          </span>
                        </div>
                        <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                          placeholder={title || 'SEO title...'}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[11px] uppercase font-bold text-slate-400">Meta Description</label>
                          <span className={`text-[10px] font-mono ${(metaDescription || summary).length >= 120 && (metaDescription || summary).length <= 165 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {(metaDescription || summary).length} / 160 chars
                          </span>
                        </div>
                        <textarea rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                          placeholder={summary || 'Google snippet description...'}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Focus Keyword</label>
                          <input type="text" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)}
                            placeholder="e.g. work permit Nigeria"
                            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1.5">Canonical URL</label>
                          <input type="text" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)}
                            placeholder={`https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${slug || 'slug'}`}
                            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /><span>{successMsg}</span>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    {activeTab !== 'seo' ? (
                      <button type="button" onClick={() => setActiveTab(activeTab === 'content' ? 'media' : 'seo')}
                        className="text-purple-400 hover:text-purple-300 underline font-medium">
                        Next: {activeTab === 'content' ? 'Media →' : 'SEO →'}
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-medium">✓ Ready to Publish</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setIsEditing(false); resetForm(); }}
                      className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-400 hover:text-white transition">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-semibold shadow-lg shadow-[#257CFF]/25 transition flex items-center gap-1.5 disabled:opacity-60">
                      {loading ? 'Saving...' : editingPost ? 'Update Article' : 'Publish Article'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
