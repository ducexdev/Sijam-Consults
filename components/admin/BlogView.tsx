'use client';

import React, { useState } from 'react';
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
  Tag,
  BarChart2,
  Clock,
  BookOpen,
  Layers,
  Compass,
  TrendingUp,
  Filter,
  Calendar,
  MoreVertical,
  PenTool,
  Settings,
  ArrowRight,
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

// ─── Sample data that mirrors the design screenshot ─────────────────────────
const SAMPLE_ARTICLES = [
  {
    id: 's1',
    title: 'Why Study Nursing in Canada: 2026/26...',
    fullTitle: 'Why Study Nursing in Canada: 2026/2027 Complete Guide',
    category: 'Study Abroad',
    author: 'James Samson',
    authorRole: 'Content Writer',
    status: 'published' as BlogPostStatus,
    publishedOn: 'Oct 23, 2026  09:24 AM',
  },
  {
    id: 's2',
    title: 'Top 10 Affordable Travel Destinations...',
    fullTitle: 'Top 10 Affordable Travel Destinations for Nigerians in 2026',
    category: 'Travel Guide',
    author: 'Maria Garcia',
    authorRole: 'Travel Editor',
    status: 'draft' as BlogPostStatus, // "PENDING" in design — mapped to draft for display
    publishedOn: 'Oct 22, 2026  04:17 PM',
    displayStatus: 'PENDING',
  },
  {
    id: 's3',
    title: 'How to Apply for a Schengen Visa in 2026',
    fullTitle: 'How to Apply for a Schengen Visa in 2026',
    category: 'Visa Guide',
    author: 'David Wilson',
    authorRole: 'Senior Writer',
    status: 'scheduled' as BlogPostStatus,
    publishedOn: 'Oct 21, 2026  11:03 AM',
    displayStatus: 'REVIEWING',
  },
  {
    id: 's4',
    title: 'Best Things to Do in Dubai: A Complete...',
    fullTitle: 'Best Things to Do in Dubai: A Complete Travel Guide',
    category: 'Travel Guide',
    author: 'Aisha Bello',
    authorRole: 'Travel Specialist',
    status: 'published' as BlogPostStatus,
    publishedOn: 'Oct 20, 2026  03:45 PM',
  },
  {
    id: 's5',
    title: 'Work & Study in Germany: Opportunities...',
    fullTitle: 'Work & Study in Germany: Opportunities for African Graduates',
    category: 'Study Abroad',
    author: 'Daniel Clark',
    authorRole: 'Content Writer',
    status: 'draft' as BlogPostStatus,
    publishedOn: 'Oct 19, 2026  10:20 AM',
    displayStatus: 'DRAFT',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  if (category === 'Study Abroad')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
        <BookOpen className="w-2.5 h-2.5" />
        Study Abroad
      </span>
    );
  if (category === 'Travel Guide')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-950 text-violet-300 border border-violet-800">
        <Compass className="w-2.5 h-2.5" />
        Travel Guide
      </span>
    );
  if (category === 'Visa Guide')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
        <Tag className="w-2.5 h-2.5" />
        Visa Guide
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
      {category}
    </span>
  );
}

type DisplayStatus = 'PUBLISHED' | 'PENDING' | 'REVIEWING' | 'DRAFT';
function StatusBadge({ status, displayStatus }: { status: BlogPostStatus; displayStatus?: string }) {
  const label = displayStatus || status.toUpperCase();
  if (label === 'PUBLISHED')
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
        PUBLISHED
      </span>
    );
  if (label === 'PENDING')
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
        PENDING
      </span>
    );
  if (label === 'REVIEWING')
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
        REVIEWING
      </span>
    );
  return (
    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
      DRAFT
    </span>
  );
}

// ─── Sparkline SVG wave ───────────────────────────────────────────────────────
function Sparkline({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 28" className="w-20 h-7" fill="none">
      <polyline
        points="0,22 10,18 20,20 30,12 40,16 50,8 60,12 70,6 80,10"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

// ─── Donut chart ─────────────────────────────────────────────────────────────
function DonutChart() {
  // Published 85%, Drafts 13%, Scheduled 2%, Rejected 0%
  const r = 38;
  const cx = 50;
  const cy = 50;
  const circ = 2 * Math.PI * r;
  const segments = [
    { pct: 85, color: '#10b981' }, // emerald
    { pct: 13, color: '#a855f7' }, // purple
    { pct: 2,  color: '#f59e0b' }, // amber
    { pct: 0,  color: '#ef4444' }, // red
  ];
  let offset = 0;
  const paths = segments.map((seg, i) => {
    const dash = (seg.pct / 100) * circ;
    const gap = circ - dash;
    const el = (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={seg.color}
        strokeWidth="12"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-offset}
        transform={`rotate(-90 ${cx} ${cy})`}
        opacity={seg.pct === 0 ? 0.15 : 1}
      />
    );
    offset += dash;
    return el;
  });

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      {paths}
      <text x="50" y="46" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">48</text>
      <text x="50" y="58" textAnchor="middle" fill="#94a3b8" fontSize="6.5">Total</text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function BlogView({ posts, onRefresh }: BlogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses (3)');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo'>('content');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [postType, setPostType] = useState<'guide' | 'blog' | 'news'>('guide');
  const [summary, setSummary] = useState('');
  const [categoryId, setCategoryId] = useState('study-abroad');
  const [takeawaysText, setTakeawaysText] = useState('Key takeaway 1\nKey takeaway 2\nKey takeaway 3');
  const [section1Heading, setSection1Heading] = useState('Overview & Strategic Consular Roadmap');
  const [section1Content, setSection1Content] = useState('');
  const [readTime, setReadTime] = useState(6);
  const [status, setStatus] = useState<BlogPostStatus>('published');
  const [authorName, setAuthorName] = useState('James Samson');
  const [authorRole, setAuthorRole] = useState('Managing Director & Principal Consultant');
  const [featuredImage, setFeaturedImage] = useState('/blogs/Why-Study-Nursing-in-Canada-20262027.png');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('study visa');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetForm = () => {
    setTitle(''); setSlug(''); setSummary(''); setTakeawaysText('');
    setSection1Heading('Overview & Strategic Consular Roadmap');
    setSection1Content(''); setFeaturedImage('/blogs/Why-Study-Nursing-in-Canada-20262027.png');
    setImageAlt(''); setImageCaption(''); setMetaTitle(''); setMetaDescription('');
    setFocusKeyword('visa guidance'); setCanonicalUrl('');
    setSuccessMsg(null); setEditingPost(null); setActiveTab('content');
  };

  const handleOpenCreate = () => { resetForm(); setIsEditing(true); };

  const handleOpenEdit = (p: BlogPostRecord) => {
    setEditingPost(p); setTitle(p.title); setSlug(p.slug); setPostType(p.post_type);
    setSummary(p.summary); setCategoryId(p.category_id);
    setTakeawaysText(p.key_takeaways?.join('\n') || '');
    if (p.sections && p.sections.length > 0) {
      setSection1Heading(p.sections[0].heading); setSection1Content(p.sections[0].content);
    } else { setSection1Heading('Overview & Strategic Consular Roadmap'); setSection1Content(''); }
    setFeaturedImage(p.featured_image || '/blogs/Why-Study-Nursing-in-Canada-20262027.png');
    setImageAlt(`${p.title} - SIJAM Consults advisory`);
    setImageCaption(`Official consular insights for ${p.title}`);
    setReadTime(p.read_time_minutes || 5); setStatus(p.status);
    setAuthorName(p.author_name); setAuthorRole(p.author_role);
    setMetaTitle(p.meta_title || p.title); setMetaDescription(p.meta_description || p.summary);
    setCanonicalUrl(p.canonical_url || `https://sijamconsults.com/${p.post_type === 'guide' ? 'guides' : 'blog'}/${p.slug}`);
    setFocusKeyword(p.tags?.[0] || 'visa application');
    setIsEditing(true); setActiveTab('content');
  };

  const handleDeletePost = async (p: BlogPostRecord) => {
    if (!confirm(`Are you sure you want to permanently delete "${p.title}"? This cannot be reversed.`)) return;
    try { await adminDeleteBlogPost(p.id); onRefresh(); }
    catch (e) { console.error(e); alert('Failed to delete publication.'); }
  };

  const handleToggleStatus = async (p: BlogPostRecord, newStatus: BlogPostStatus) => {
    try { await adminToggleBlogPostStatus(p.id, newStatus); onRefresh(); }
    catch (e) { console.error(e); alert('Failed to toggle status.'); }
  };

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
    checks.push({ label: `Focus keyword "${focusKeyword}" in Excerpt`, passed: kwInDesc });
    const hasImage = featuredImage.trim().length > 0;
    if (hasImage) score += 15;
    checks.push({ label: 'High-res featured image assigned', passed: hasImage });
    const hasContent = section1Content.trim().length >= 50;
    if (hasContent) score += 10;
    checks.push({ label: 'Comprehensive article body provided (>50 chars)', passed: hasContent });
    return { score, checks };
  };

  const seoAnalysis = computeSeoScore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const takeaways = takeawaysText.split('\n').filter((l) => l.trim().length > 0);
      const sections = [{ heading: section1Heading, content: section1Content }];
      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (editingPost) {
        await adminUpdateBlogPost(editingPost.id, {
          title, slug: generatedSlug, post_type: postType, summary, category_id: categoryId,
          key_takeaways: takeaways, sections, featured_image: featuredImage,
          read_time_minutes: readTime, status, author_name: authorName, author_role: authorRole,
          meta_title: metaTitle || title, meta_description: metaDescription || summary,
          canonical_url: canonicalUrl || `https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${generatedSlug}`,
        });
        setSuccessMsg('Article updated successfully.');
      } else {
        await adminCreateBlogPost({
          title, slug: generatedSlug, postType, summary, categoryId,
          keyTakeaways: takeaways, sections, featuredImage, readTimeMinutes: readTime,
          status, authorName, authorRole,
          tags: [focusKeyword || 'Immigration Advisory', 'Global Mobility'],
          metaTitle: metaTitle || title, metaDescription: metaDescription || summary,
          canonicalUrl: canonicalUrl || `https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${generatedSlug}`,
        });
        setSuccessMsg('New publication created successfully.');
      }
      setTimeout(() => { setIsEditing(false); resetForm(); onRefresh(); }, 1200);
    } catch (e) { console.error(e); alert('Failed to save article. Please try again.'); }
    finally { setLoading(false); }
  };

  // ─── KPI Cards ─────────────────────────────────────────────────────────────
  const kpiCards = [
    { label: 'Total Articles', value: '48', change: '↑32%', icon: FileText, iconBg: 'bg-purple-900/60', iconColor: 'text-purple-400', sparkColor: '#a855f7' },
    { label: 'Travel Guides', value: '18', change: '↑55%', icon: Compass, iconBg: 'bg-blue-900/60', iconColor: 'text-blue-400', sparkColor: '#60a5fa' },
    { label: 'Published', value: '42', change: '↑24%', icon: CheckCircle2, iconBg: 'bg-emerald-900/60', iconColor: 'text-emerald-400', sparkColor: '#10b981' },
    { label: 'Drafts', value: '6', change: '↑14%', icon: PenTool, iconBg: 'bg-amber-900/60', iconColor: 'text-amber-400', sparkColor: '#f59e0b' },
  ];

  const totalArticles = 48;
  const totalPages = 10;
  const perPage = 5;
  const showingFrom = (currentPage - 1) * perPage + 1;
  const showingTo = Math.min(currentPage * perPage, totalArticles);

  return (
    <div className="space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-[#172342] bg-[#070c1e]">
        {/* background landscape illustration (CSS-only gradient) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute bottom-0 right-0 w-72 h-32 opacity-20"
            style={{ background: 'radial-gradient(ellipse at 80% 100%, #7c3aed 0%, transparent 70%)' }} />
          <div className="absolute top-0 right-0 w-96 h-full opacity-10"
            style={{ background: 'linear-gradient(135deg, transparent 40%, #7c3aed 100%)' }} />
          {/* mountain silhouettes */}
          <svg className="absolute bottom-0 right-0 w-64 h-24 opacity-20" viewBox="0 0 256 96" preserveAspectRatio="none">
            <polygon points="0,96 60,30 100,60 150,10 200,50 256,20 256,96" fill="#4c1d95"/>
            <polygon points="80,96 130,40 170,70 220,25 256,50 256,96" fill="#6d28d9" opacity="0.5"/>
          </svg>
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
          <div>
            <span className="text-[10px] font-mono text-[#c084fc] uppercase tracking-widest">
              CONTENT MANAGEMENT
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
              Blog &amp; Travel Guides Publishing
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Manage, publish and track all editorial content — articles, travel guides, and visa insights.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 transition self-start sm:self-auto whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            + Create New Article / Guide
          </button>
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                  <Icon className={`w-4.5 h-4.5 ${card.iconColor}`} />
                </div>
                <Sparkline color={card.sparkColor} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white leading-none">{card.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{card.label}</div>
              </div>
              <div className="text-[11px] font-semibold text-emerald-400">{card.change} this month</div>
            </div>
          );
        })}
      </div>

      {/* ── Main 2-column layout ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">

        {/* Left: Search + Table */}
        <div className="space-y-4">

          {/* Filters bar */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, guides..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option>All Statuses (3)</option>
                <option>Published</option>
                <option>Pending</option>
                <option>Reviewing</option>
                <option>Draft</option>
              </select>
              <ChevronRight className="w-3 h-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>

            {/* Category filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option>All Categories</option>
                <option>Study Abroad</option>
                <option>Travel Guide</option>
                <option>Visa Guide</option>
              </select>
              <ChevronRight className="w-3 h-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>

            {/* Date range */}
            <button className="flex items-center gap-2 px-3 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 hover:border-purple-500 transition">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Date Range
            </button>

            {/* Filter icon */}
            <button className="flex items-center gap-2 px-3 py-2.5 bg-[#070c1e] border border-[#172342] rounded-xl text-xs text-slate-300 hover:border-purple-500 transition">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Filters
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0b1329] text-slate-400 text-[10px] uppercase tracking-wider border-b border-[#172342]">
                  <tr>
                    <th className="px-4 py-3.5">TITLE</th>
                    <th className="px-4 py-3.5">CATEGORY</th>
                    <th className="px-4 py-3.5">AUTHOR</th>
                    <th className="px-4 py-3.5">STATUS</th>
                    <th className="px-4 py-3.5">PUBLISHED ON</th>
                    <th className="px-4 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#172342]">
                  {SAMPLE_ARTICLES.map((article) => (
                    <tr key={article.id} className="hover:bg-[#0b1329]/70 transition group">
                      {/* Title */}
                      <td className="px-4 py-3.5 max-w-[220px]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#172342] flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white text-xs truncate max-w-[160px]" title={article.fullTitle}>
                              {article.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5">
                        <CategoryBadge category={article.category} />
                      </td>

                      {/* Author */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#172342] flex items-center justify-center shrink-0">
                            <span className="text-[9px] text-slate-400 font-bold">
                              {article.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-white text-xs font-medium">{article.author}</div>
                            <div className="text-[10px] text-slate-500">{article.authorRole}</div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={article.status} displayStatus={article.displayStatus} />
                      </td>

                      {/* Published On */}
                      <td className="px-4 py-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                        {article.publishedOn}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                          <button
                            title="View"
                            className="p-1.5 rounded-lg bg-[#172342] hover:bg-slate-700 text-slate-400 hover:text-white transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Edit"
                            className="p-1.5 rounded-lg bg-[#172342] hover:bg-purple-900/60 text-slate-400 hover:text-purple-300 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Delete"
                            className="p-1.5 rounded-lg bg-[#172342] hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Real DB rows (when present) */}
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#0b1329]/70 transition">
                      <td className="px-4 py-3.5 max-w-[220px]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#172342] flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white text-xs truncate max-w-[160px]">{post.title}</div>
                            <div className="text-[10px] text-purple-400 font-mono truncate">/{post.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <CategoryBadge category={post.category_id} />
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-white text-xs font-medium">{post.author_name}</div>
                        <div className="text-[10px] text-slate-500">{post.author_role}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={post.status} />
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center gap-1.5 justify-end">
                          <button onClick={() => handleOpenEdit(post)} className="p-1.5 rounded-lg bg-[#172342] hover:bg-purple-900/60 text-slate-400 hover:text-purple-300 transition">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <a href={post.post_type === 'guide' ? `/guides/${post.slug}` : `/blog/${post.slug}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-[#172342] hover:bg-slate-700 text-slate-400 hover:text-white transition inline-flex">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button onClick={() => handleDeletePost(post)} className="p-1.5 rounded-lg bg-[#172342] hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3.5 border-t border-[#172342]">
              <span className="text-[11px] text-slate-400">
                Showing {showingFrom}–{showingTo} of {totalArticles} articles
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-[#172342] text-slate-400 hover:text-white hover:border-purple-500 disabled:opacity-30 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-7 h-7 rounded-lg text-[11px] font-semibold transition ${
                      currentPage === p
                        ? 'bg-purple-600 text-white border border-purple-500'
                        : 'border border-[#172342] text-slate-400 hover:text-white hover:border-purple-500'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <span className="text-slate-500 text-xs px-1">...</span>
                <button
                  onClick={() => setCurrentPage(10)}
                  className={`w-7 h-7 rounded-lg text-[11px] font-semibold transition border ${
                    currentPage === 10
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'border-[#172342] text-slate-400 hover:text-white hover:border-purple-500'
                  }`}
                >
                  10
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-[#172342] text-slate-400 hover:text-white hover:border-purple-500 disabled:opacity-30 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Bottom banner ─────────────────────────────────────────────── */}
          <div className="relative rounded-2xl overflow-hidden border border-[#172342] bg-[#070c1e] p-6">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #0b1329 0%, #1e0a3c 100%)' }} />
              <svg className="absolute bottom-0 right-0 w-56 h-24 opacity-15" viewBox="0 0 224 96" preserveAspectRatio="none">
                <polygon points="0,96 50,40 90,65 140,20 190,50 224,30 224,96" fill="#7c3aed"/>
                <polygon points="60,96 100,55 140,75 190,35 224,60 224,96" fill="#6d28d9" opacity="0.5"/>
              </svg>
              <div className="absolute top-2 right-4 text-slate-700 text-5xl select-none opacity-20">✈</div>
            </div>
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-1">TRAVEL CONTENT</div>
                <h3 className="font-heading font-bold text-white text-lg">Inspire Global Journeys</h3>
                <p className="text-xs text-slate-400 mt-1">Discover and manage your travel guide collection to help readers explore the world.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-700 text-purple-300 text-xs font-semibold transition whitespace-nowrap">
                Explore Travel Guides
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ───────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Content Performance */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Content Performance</h3>
            </div>

            {/* Donut */}
            <div className="flex items-center justify-center mb-4">
              <DonutChart />
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {[
                { label: 'Published', value: 42, pct: '85%', color: 'bg-emerald-400' },
                { label: 'Drafts', value: 8, pct: '13%', color: 'bg-purple-400' },
                { label: 'Scheduled', value: 0, pct: '0%', color: 'bg-amber-400' },
                { label: 'Rejected', value: 0, pct: '0%', color: 'bg-rose-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-slate-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{item.value}</span>
                    <span className="text-slate-500">({item.pct})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-900/30', label: 'New article published', time: '2h ago' },
                { icon: FileText, color: 'text-amber-400', bg: 'bg-amber-900/30', label: 'Article submitted for review', time: '5h ago' },
                { icon: Compass, color: 'text-blue-400', bg: 'bg-blue-900/30', label: 'New travel guide added', time: '6h ago' },
                { icon: Edit3, color: 'text-slate-400', bg: 'bg-slate-800/60', label: 'Draft updated', time: '1d ago' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-slate-200 font-medium">{item.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#070c1e] border border-[#172342] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              {[
                { icon: Plus, label: 'Create New Article / Guide', onClick: handleOpenCreate, primary: true },
                { icon: Tag, label: 'Manage Categories', onClick: () => {}, primary: false },
                { icon: Eye, label: 'View All Articles', onClick: () => {}, primary: false },
                { icon: TrendingUp, label: 'SEO & Analytics', onClick: () => {}, primary: false },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    onClick={action.onClick}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition text-left ${
                      action.primary
                        ? 'bg-purple-600 hover:bg-purple-500 text-white'
                        : 'bg-[#0b1329] hover:bg-[#172342] border border-[#172342] text-slate-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal: Article Editor ───────────────────────────────────────────── */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {editingPost ? 'Edit Article & SEO Settings' : 'Create Article or Travel Guide'}
                </h3>
                <p className="text-xs text-slate-400">Configure article content, featured photography, and search engine indexing.</p>
              </div>
              <button onClick={() => { setIsEditing(false); resetForm(); }} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              {(['content', 'media', 'seo'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                    activeTab === tab ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab === 'content' && <><FileText className="w-3.5 h-3.5" />1. Article Content</>}
                  {tab === 'media' && <><ImageIcon className="w-3.5 h-3.5" />2. Featured Imagery</>}
                  {tab === 'seo' && (
                    <>
                      <Globe className="w-3.5 h-3.5" />
                      3. SEO Analyzer
                      <span className="ml-1 px-1.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                        {seoAnalysis.score}%
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* TAB 1: CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Article Title *</label>
                      <input
                        type="text" required value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          if (!editingPost && !metaTitle) setMetaTitle(e.target.value);
                          if (!editingPost) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                        }}
                        placeholder="e.g. Navigating Polish Voivodeship Work Permit Approvals"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">URL Slug</label>
                      <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Publication Format</label>
                      <select value={postType} onChange={(e) => setPostType(e.target.value as 'guide' | 'blog' | 'news')}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500">
                        <option value="guide">Travel Guide</option>
                        <option value="blog">Editorial Blog Post</option>
                        <option value="news">Policy & Regulatory Alert</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Category</label>
                      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500">
                        <option value="study-abroad">Study Abroad</option>
                        <option value="travel-guide">Travel Guide</option>
                        <option value="visa-guide">Visa Guide</option>
                        <option value="work-visas">Work Permits</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Read Time (Minutes)</label>
                      <input type="number" value={readTime} onChange={(e) => setReadTime(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Summary / Excerpt *</label>
                    <textarea rows={2} required value={summary}
                      onChange={(e) => { setSummary(e.target.value); if (!editingPost && !metaDescription) setMetaDescription(e.target.value); }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Key Takeaways (one per line)</label>
                    <textarea rows={3} value={takeawaysText} onChange={(e) => setTakeawaysText(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="space-y-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                    <label className="block text-[11px] uppercase font-bold text-purple-400">Primary Section</label>
                    <input type="text" value={section1Heading} onChange={(e) => setSection1Heading(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                    <textarea rows={4} value={section1Content} onChange={(e) => setSection1Content(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Author Name</label>
                      <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Status</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500">
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Featured Cover Image URL *</label>
                    <input type="text" required value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1.5">Brand Media Library:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button key={preset.url} type="button" onClick={() => setFeaturedImage(preset.url)}
                          className={`p-2 rounded-xl border text-left transition text-xs flex flex-col gap-1 ${
                            featuredImage === preset.url ? 'bg-purple-950/80 border-purple-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}>
                          <img src={preset.url} alt="" className="w-full h-14 object-cover rounded-lg border border-slate-800" />
                          <span className="font-medium text-[11px] truncate">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-[11px] uppercase font-bold text-purple-400 block">Live Preview</span>
                    <div className="relative aspect-video max-h-56 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
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
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Image Alt Text</label>
                      <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Editorial Caption</label>
                      <input type="text" value={imageCaption} onChange={(e) => setImageCaption(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SEO */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0b1329] border border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="font-heading font-bold text-white text-sm">SEO Score: {seoAnalysis.score} / 100</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Evaluated against Google SERP best practices.</p>
                    </div>
                    <div className="w-full sm:w-36 bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                      <div className={`h-full transition-all duration-500 ${seoAnalysis.score >= 80 ? 'bg-emerald-500' : seoAnalysis.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${seoAnalysis.score}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {seoAnalysis.checks.map((chk, i) => (
                      <div key={i} className={`p-2 rounded-lg border flex items-center gap-2 ${chk.passed ? 'bg-emerald-950/40 border-emerald-900 text-emerald-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
                        {chk.passed ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                        <span className="text-[11px]">{chk.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-slate-900 space-y-1 shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Google SERP Preview</span>
                    <div className="text-[11px] text-[#202124] flex items-center gap-1 font-sans">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>https://sijamconsults.com</span>
                      <span className="text-slate-400">›</span>
                      <span>{postType === 'guide' ? 'guides' : 'blog'}</span>
                      <span className="text-slate-400">›</span>
                      <span className="text-slate-600">{slug || 'article-slug'}</span>
                    </div>
                    <div className="text-[16px] text-[#1a0dab] hover:underline font-medium cursor-pointer font-sans leading-snug">
                      {metaTitle || title || 'Article Title - Sijam Consults'} | SIJAM Consults
                    </div>
                    <div className="text-[13px] text-[#4d5156] font-sans line-clamp-2 leading-relaxed">
                      {metaDescription || summary || 'Authoritative international immigration and travel guidance by SIJAM Consults Limited.'}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] uppercase font-bold text-slate-400">Meta Title</label>
                        <span className={`text-[10px] font-mono ${(metaTitle || title).length >= 40 && (metaTitle || title).length <= 65 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {(metaTitle || title).length} / 60 chars
                        </span>
                      </div>
                      <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder={title || 'SEO Title...'}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] uppercase font-bold text-slate-400">Meta Description</label>
                        <span className={`text-[10px] font-mono ${(metaDescription || summary).length >= 120 && (metaDescription || summary).length <= 165 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {(metaDescription || summary).length} / 160 chars
                        </span>
                      </div>
                      <textarea rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder={summary || 'Google snippet description...'}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Focus Keyword</label>
                        <input type="text" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">Canonical URL</label>
                        <input type="text" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)}
                          placeholder={`https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${slug || 'post-slug'}`}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  {activeTab !== 'seo' ? (
                    <button type="button" onClick={() => setActiveTab(activeTab === 'content' ? 'media' : 'seo')}
                      className="text-purple-400 hover:text-purple-300 underline font-medium">
                      Next Step →
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-medium">✓ Ready to Publish</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setIsEditing(false); resetForm(); }}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white">Cancel</button>
                  <button type="submit" disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition flex items-center gap-1.5">
                    {loading ? 'Saving...' : editingPost ? 'Update Publication' : 'Publish Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
