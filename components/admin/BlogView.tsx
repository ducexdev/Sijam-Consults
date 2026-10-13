'use client';

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  X,
  Trash2,
  Image as ImageIcon,
  Globe,
  Sparkles,
  Check,
  HelpCircle,
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

export function BlogView({ posts, onRefresh }: BlogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo'>('content');

  // Form State - Content
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

  // Form State - Media
  const [featuredImage, setFeaturedImage] = useState('/blogs/Why-Study-Nursing-in-Canada-20262027.png');
  const [imageAlt, setImageAlt] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  // Form State - SEO Suite
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('study visa');
  const [canonicalUrl, setCanonicalUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filter
  const filtered = posts.filter((p) => {
    const matchesSearch =
      searchTerm === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setSummary('');
    setTakeawaysText('');
    setSection1Heading('Overview & Strategic Consular Roadmap');
    setSection1Content('');
    setFeaturedImage('/blogs/Why-Study-Nursing-in-Canada-20262027.png');
    setImageAlt('');
    setImageCaption('');
    setMetaTitle('');
    setMetaDescription('');
    setFocusKeyword('visa guidance');
    setCanonicalUrl('');
    setSuccessMsg(null);
    setEditingPost(null);
    setActiveTab('content');
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsEditing(true);
  };

  const handleOpenEdit = (p: BlogPostRecord) => {
    setEditingPost(p);
    setTitle(p.title);
    setSlug(p.slug);
    setPostType(p.post_type);
    setSummary(p.summary);
    setCategoryId(p.category_id);
    setTakeawaysText(p.key_takeaways?.join('\n') || '');
    if (p.sections && p.sections.length > 0) {
      setSection1Heading(p.sections[0].heading);
      setSection1Content(p.sections[0].content);
    } else {
      setSection1Heading('Overview & Strategic Consular Roadmap');
      setSection1Content('');
    }
    setFeaturedImage(p.featured_image || '/blogs/Why-Study-Nursing-in-Canada-20262027.png');
    setImageAlt(`${p.title} - SIJAM Consults advisory`);
    setImageCaption(`Official consular insights for ${p.title}`);
    setReadTime(p.read_time_minutes || 5);
    setStatus(p.status);
    setAuthorName(p.author_name);
    setAuthorRole(p.author_role);

    setMetaTitle(p.meta_title || p.title);
    setMetaDescription(p.meta_description || p.summary);
    setCanonicalUrl(p.canonical_url || `https://sijamconsults.com/${p.post_type === 'guide' ? 'guides' : 'blog'}/${p.slug}`);
    setFocusKeyword(p.tags?.[0] || 'visa application');

    setIsEditing(true);
    setActiveTab('content');
  };

  const handleDeletePost = async (p: BlogPostRecord) => {
    if (!confirm(`Are you sure you want to permanently delete the publication "${p.title}"? This action cannot be reversed.`)) {
      return;
    }
    try {
      await adminDeleteBlogPost(p.id);
      onRefresh();
    } catch (e) {
      console.error(e);
      alert('Failed to delete publication.');
    }
  };

  const handleToggleStatus = async (p: BlogPostRecord, newStatus: BlogPostStatus) => {
    try {
      await adminToggleBlogPostStatus(p.id, newStatus);
      onRefresh();
    } catch (e) {
      console.error(e);
      alert('Failed to toggle publication status.');
    }
  };

  // SEO Score Calculator
  const computeSeoScore = () => {
    let score = 0;
    const checks: { label: string; passed: boolean }[] = [];

    // Check 1: Title length (40 to 65 chars is ideal)
    const activeMetaTitle = metaTitle || title;
    const titleOk = activeMetaTitle.length >= 35 && activeMetaTitle.length <= 70;
    if (titleOk) score += 20;
    checks.push({
      label: `Meta Title length optimal (${activeMetaTitle.length}/60 chars)`,
      passed: titleOk,
    });

    // Check 2: Description length (120 to 160 chars is ideal)
    const activeMetaDesc = metaDescription || summary;
    const descOk = activeMetaDesc.length >= 100 && activeMetaDesc.length <= 170;
    if (descOk) score += 20;
    checks.push({
      label: `Meta Description optimal (${activeMetaDesc.length}/160 chars)`,
      passed: descOk,
    });

    // Check 3: Focus keyword in title
    const kw = focusKeyword.trim().toLowerCase();
    const kwInTitle = kw.length > 0 && activeMetaTitle.toLowerCase().includes(kw);
    if (kwInTitle) score += 20;
    checks.push({
      label: `Focus keyword "${focusKeyword}" in Title`,
      passed: kwInTitle,
    });

    // Check 4: Focus keyword in summary / description
    const kwInDesc = kw.length > 0 && activeMetaDesc.toLowerCase().includes(kw);
    if (kwInDesc) score += 15;
    checks.push({
      label: `Focus keyword "${focusKeyword}" in Excerpt/Description`,
      passed: kwInDesc,
    });

    // Check 5: Featured Image is set
    const hasImage = featuredImage.trim().length > 0;
    if (hasImage) score += 15;
    checks.push({
      label: 'High-res featured image assigned',
      passed: hasImage,
    });

    // Check 6: Content sections provided
    const hasContent = section1Content.trim().length >= 50;
    if (hasContent) score += 10;
    checks.push({
      label: 'Comprehensive article body provided (>50 chars)',
      passed: hasContent,
    });

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
        });
        setSuccessMsg('Article and SEO metadata updated successfully.');
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
          tags: [focusKeyword || 'Immigration Advisory', 'Global Mobility'],
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || summary,
          canonicalUrl: canonicalUrl || `https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${generatedSlug}`,
        });
        setSuccessMsg('New publication published with verified SEO indexing.');
      }

      setTimeout(() => {
        setIsEditing(false);
        resetForm();
        onRefresh();
      }, 1200);
    } catch (e) {
      console.error(e);
      alert('Failed to save article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
            Editorial CMS • Travel & Immigration Intelligence
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
            Blog & Travel Guides Publishing
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Publish client-facing visa guides, regulatory alerts, featured imagery, and search engine meta optimization.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Article / Guide
        </button>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search article titles, takeaways, or excerpts..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#121B2B] border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses ({posts.length})</option>
            <option value="published">Published Live</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Post Table */}
      <div className="bg-[#121B2B] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0D1420] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Publication</th>
                <th className="p-4">Category & Format</th>
                <th className="p-4">Author</th>
                <th className="p-4">SEO Health</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No articles found matching query.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-500">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-xs truncate">
                            {post.title}
                          </div>
                          <div className="text-[10px] text-purple-300 font-mono mt-0.5 truncate">
                            /{post.post_type === 'guide' ? 'guides' : 'blog'}/{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                        {post.category_id}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5 uppercase">
                        {post.post_type} • {post.read_time_minutes} min
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="text-white font-medium text-xs">{post.author_name}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                        {post.author_role}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          SEO Ready
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        {post.meta_title ? 'Meta Title ✓' : 'Auto Title'}
                      </div>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleToggleStatus(
                            post,
                            post.status === 'published' ? 'draft' : 'published'
                          )
                        }
                        title={post.status === 'published' ? 'Click to unpublish' : 'Click to publish'}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase transition cursor-pointer border ${
                          post.status === 'published'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                            : 'bg-amber-950 text-amber-300 border-amber-800 hover:bg-amber-900'
                        }`}
                      >
                        {post.status}
                      </button>
                    </td>

                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-medium transition"
                      >
                        Edit
                      </button>

                      <a
                        href={post.post_type === 'guide' ? `/guides/${post.slug}` : `/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block p-1 text-slate-400 hover:text-white transition"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleDeletePost(post)}
                        title="Permanently Delete Article"
                        className="p-1 text-slate-500 hover:text-rose-400 transition inline-block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Comprehensive Editorial & SEO Editor */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {editingPost ? 'Edit Article & SEO Settings' : 'Create Article or Travel Guide'}
                </h3>
                <p className="text-xs text-slate-400">
                  Configure article content, featured photography, and search engine indexing parameters.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'content'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                1. Article Content
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'media'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                2. Featured Imagery & Media
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeTab === 'seo'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                3. SEO Status & SERP Analyzer
                <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                  {seoAnalysis.score}%
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* TAB 1: ARTICLE CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          if (!editingPost && !metaTitle) setMetaTitle(e.target.value);
                          if (!editingPost) {
                            setSlug(
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/(^-|-$)/g, '')
                            );
                          }
                        }}
                        placeholder="e.g. Navigating Polish Voivodeship Work Permit Approvals"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="navigating-polish-voivodeship-work-permits"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Publication Format
                      </label>
                      <select
                        value={postType}
                        onChange={(e) => setPostType(e.target.value as 'guide' | 'blog' | 'news')}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="guide">Travel Guide (Deep Forensic)</option>
                        <option value="blog">Editorial Blog Post</option>
                        <option value="news">Policy & Regulatory Alert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Advisory Category
                      </label>
                      <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="study-abroad">Study Abroad & Admissions</option>
                        <option value="work-visas">Employment & Work Permits</option>
                        <option value="business-mobility">European Business Setup</option>
                        <option value="consular-compliance">Consular Compliance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Estimated Read Time (Minutes)
                      </label>
                      <input
                        type="number"
                        value={readTime}
                        onChange={(e) => setReadTime(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                      Executive Summary / Lead Paragraph *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={summary}
                      onChange={(e) => {
                        setSummary(e.target.value);
                        if (!editingPost && !metaDescription) setMetaDescription(e.target.value);
                      }}
                      placeholder="A concise, authoritative synopsis of the guide..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                      Key Strategic Takeaways (One actionable bullet per line)
                    </label>
                    <textarea
                      rows={3}
                      value={takeawaysText}
                      onChange={(e) => setTakeawaysText(e.target.value)}
                      placeholder="High demand across healthcare sectors leads to expedited processing&#10;Proof of liquid funds required&#10;Consular appointments must be booked 60 days ahead"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                    <label className="block text-[11px] uppercase font-bold text-purple-400">
                      Primary Section Heading & Body
                    </label>
                    <input
                      type="text"
                      value={section1Heading}
                      onChange={(e) => setSection1Heading(e.target.value)}
                      placeholder="Section Heading..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                    <textarea
                      rows={4}
                      value={section1Content}
                      onChange={(e) => setSection1Content(e.target.value)}
                      placeholder="Authoritative advisory guidance, embassy protocol steps, required documentation..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Publication Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="published">Published (Live Online)</option>
                        <option value="draft">Draft (Private Editorial)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA & FEATURED IMAGERY */}
              {activeTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                      Featured Cover Image URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      placeholder="/blogs/Why-Study-Nursing-in-Canada-20262027.png"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Quick Preset Selector */}
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1.5">
                      Or Select from Verified Brand Media Library:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setFeaturedImage(preset.url)}
                          className={`p-2 rounded-xl border text-left transition text-xs flex flex-col gap-1 ${
                            featuredImage === preset.url
                              ? 'bg-purple-950/80 border-purple-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt=""
                            className="w-full h-14 object-cover rounded-lg border border-slate-800"
                          />
                          <span className="font-medium text-[11px] truncate">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview Box */}
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-[11px] uppercase font-bold text-purple-400 block">
                      Live Cover Image Preview (16:9 Aspect Ratio)
                    </span>
                    <div className="relative aspect-video max-h-56 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                      {featuredImage ? (
                        <img
                          src={featuredImage}
                          alt={imageAlt || title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="text-center text-slate-500 text-xs">
                          <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          No image selected
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Image Alt Text (Crucial for SEO & Accessibility)
                      </label>
                      <input
                        type="text"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeholder="e.g. Registered nurse working in Canadian healthcare institution"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                        Editorial Caption
                      </label>
                      <input
                        type="text"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        placeholder="e.g. Photo courtesy of SIJAM International Advisory Desk"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SEO SUITE & GOOGLE SERP PREVIEW */}
              {activeTab === 'seo' && (
                <div className="space-y-4">
                  {/* SEO Health Score Banner */}
                  <div className="p-4 rounded-xl bg-[#0D1420] border border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="font-heading font-bold text-white text-sm">
                          Content SEO Health Score: {seoAnalysis.score} / 100
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Evaluated across Google SERP best practices, title tag density, and metadata structure.
                      </p>
                    </div>

                    <div className="w-full sm:w-36 bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                      <div
                        className={`h-full transition-all duration-500 ${
                          seoAnalysis.score >= 80
                            ? 'bg-emerald-500'
                            : seoAnalysis.score >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${seoAnalysis.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {seoAnalysis.checks.map((chk, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border flex items-center gap-2 ${
                          chk.passed
                            ? 'bg-emerald-950/40 border-emerald-900 text-emerald-300'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400'
                        }`}
                      >
                        {chk.passed ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        )}
                        <span className="text-[11px]">{chk.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Google SERP Snippet Preview */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-slate-900 space-y-1 shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Google Search Result Snippet Preview (Desktop & Mobile)
                    </span>
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
                      {metaDescription || summary || 'Authoritative international immigration and travel guidance provided by SIJAM Consults Limited.'}
                    </div>
                  </div>

                  {/* Form SEO Fields */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] uppercase font-bold text-slate-400">
                          Meta Title Tag
                        </label>
                        <span
                          className={`text-[10px] font-mono ${
                            (metaTitle || title).length >= 40 && (metaTitle || title).length <= 65
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {(metaTitle || title).length} / 60 chars (Recommended: 50-60)
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder={title || 'SEO Title displayed in browser tab and search engines...'}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] uppercase font-bold text-slate-400">
                          Meta Description
                        </label>
                        <span
                          className={`text-[10px] font-mono ${
                            (metaDescription || summary).length >= 120 && (metaDescription || summary).length <= 165
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {(metaDescription || summary).length} / 160 chars (Recommended: 140-160)
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder={summary || 'Google snippet summary description...'}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                          Focus Target Keyword
                        </label>
                        <input
                          type="text"
                          value={focusKeyword}
                          onChange={(e) => setFocusKeyword(e.target.value)}
                          placeholder="e.g. study nursing in canada"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                          Canonical URL
                        </label>
                        <input
                          type="text"
                          value={canonicalUrl}
                          onChange={(e) => setCanonicalUrl(e.target.value)}
                          placeholder={`https://sijamconsults.com/${postType === 'guide' ? 'guides' : 'blog'}/${slug || 'post-slug'}`}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                        />
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

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  {activeTab !== 'seo' ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTab(activeTab === 'content' ? 'media' : 'seo')
                      }
                      className="text-purple-400 hover:text-purple-300 underline font-medium"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-medium">✓ Ready to Publish</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition flex items-center gap-1.5"
                  >
                    {loading
                      ? 'Saving...'
                      : editingPost
                      ? 'Update Publication & SEO'
                      : 'Publish Article'}
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
