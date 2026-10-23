'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  Image as ImageIcon,
  Tag,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { adminCreateBlogPost } from '@/app/actions/blog';
import type { BlogPostStatus } from '@/lib/types/database';

const CATEGORIES = [
  { id: 'study-abroad', name: 'Study Abroad' },
  { id: 'work-permit', name: 'Work Permit' },
  { id: 'business-formation', name: 'Business Formation' },
  { id: 'travel-guides', name: 'Travel & Visa Guides' },
  { id: 'industry-news', name: 'Industry News' },
];

const PRESET_IMAGES = [
  { label: 'Canada Nursing', url: '/blogs/Why-Study-Nursing-in-Canada-20262027.png' },
  { label: 'Corporate', url: '/blogs/Ducex-Blog.png' },
  { label: 'Poland Work', url: '/blogs/Poland-Work-Permit.png' },
  { label: 'UK Healthcare', url: '/blogs/UK-Healthcare-Mobility.png' },
];

export default function NewPostPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo'>('content');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Content fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [postType, setPostType] = useState<'guide' | 'blog' | 'news'>('blog');
  const [summary, setSummary] = useState('');
  const [categoryId, setCategoryId] = useState('study-abroad');
  const [contentHtml, setContentHtml] = useState('');
  const [takeawaysText, setTakeawaysText] = useState(
    'Key insight 1\nKey insight 2\nKey insight 3'
  );
  const [section1Heading, setSection1Heading] = useState('Overview & Strategic Context');
  const [section1Content, setSection1Content] = useState('');
  const [readTime, setReadTime] = useState(6);
  const [status, setStatus] = useState<BlogPostStatus>('draft');
  const [authorName, setAuthorName] = useState('James Samson');
  const [authorRole, setAuthorRole] = useState('Managing Director & Principal Consultant');
  const [tagsText, setTagsText] = useState('');

  // Media fields
  const [featuredImage, setFeaturedImage] = useState('/blogs/Why-Study-Nursing-in-Canada-20262027.png');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // SEO fields
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');

  const autoSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slug || slug === autoSlug(title)) setSlug(autoSlug(v));
  };

  const handleSubmit = async (publishNow: boolean) => {
    setErrorMsg(null);
    if (!title.trim()) { setErrorMsg('Post title is required.'); return; }
    if (!summary.trim()) { setErrorMsg('Summary / excerpt is required.'); return; }
    if (!section1Content.trim()) { setErrorMsg('At least one content section body is required.'); return; }

    const finalSlug = slug || autoSlug(title);
    const finalStatus: BlogPostStatus = publishNow ? 'published' : status;

    setLoading(true);
    try {
      const result = await adminCreateBlogPost({
        slug: finalSlug,
        postType: postType,
        title: title.trim(),
        summary: summary.trim(),
        categoryId: categoryId,
        contentHtml: contentHtml || undefined,
        keyTakeaways: takeawaysText.split('\n').map((l) => l.trim()).filter(Boolean),
        sections: [{ heading: section1Heading, content: section1Content.trim() }],
        featuredImage: customImageUrl || featuredImage,
        readTimeMinutes: readTime,
        authorName: authorName,
        authorRole: authorRole,
        authorAvatar: '/team/James-Samson.png',
        status: finalStatus,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || summary,
        canonicalUrl: canonicalUrl || undefined,
        tags: tagsText.split(',').map((t) => t.trim()).filter(Boolean),
      });
      setSuccessMsg(
        `Post "${result.title}" ${finalStatus === 'published' ? 'published' : 'saved as draft'} successfully!`
      );
      setTimeout(() => router.push('/admin/posts'), 1800);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/posts" className="text-slate-400 hover:text-[#402493] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-heading font-extrabold text-lg text-[#0D0826]">New Blog Post</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#402493] text-white text-sm font-semibold hover:bg-[#331C79] transition disabled:opacity-60 shadow"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
              Publish Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Success / Error */}
        {successMsg && (
          <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 w-fit shadow-sm">
          {([
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'media', label: 'Featured Image', icon: ImageIcon },
            { id: 'seo', label: 'SEO & Meta', icon: Globe },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === id
                  ? 'bg-[#402493] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#402493] hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-5">
            {activeTab === 'content' && (
              <>
                {/* Title */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Post Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. How to Get a Polish Work Permit in 2026"
                    className="w-full text-2xl font-bold text-[#0D0826] placeholder:text-slate-300 bg-transparent border-0 outline-none focus:ring-0 resize-none"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">Slug:</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="auto-generated-from-title"
                      className="flex-1 text-xs font-mono text-purple-700 bg-purple-50 border border-purple-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Summary / Excerpt <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="A concise 2–3 sentence description shown on listing pages and in search results..."
                    className="w-full text-sm text-slate-700 placeholder:text-slate-300 border-0 outline-none bg-transparent resize-none focus:ring-0 leading-relaxed"
                  />
                  <div className="text-right text-[10px] text-slate-400">{summary.length}/200 chars</div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Content Section <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={section1Heading}
                    onChange={(e) => setSection1Heading(e.target.value)}
                    placeholder="Section heading..."
                    className="w-full font-semibold text-base text-[#0D0826] placeholder:text-slate-300 border-b border-slate-100 pb-2 bg-transparent outline-none focus:border-purple-300"
                  />
                  <textarea
                    rows={10}
                    value={section1Content}
                    onChange={(e) => setSection1Content(e.target.value)}
                    placeholder="Write your full article body here. Use plain text or paste HTML. Paragraphs are separated by blank lines..."
                    className="w-full text-sm text-slate-700 placeholder:text-slate-300 border-0 bg-transparent outline-none resize-y focus:ring-0 leading-relaxed font-sans"
                  />
                </div>

                {/* Key Takeaways */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Key Takeaways (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={takeawaysText}
                    onChange={(e) => setTakeawaysText(e.target.value)}
                    className="w-full text-sm text-slate-700 bg-amber-50/60 border border-amber-100 rounded-lg p-3 outline-none resize-none focus:ring-1 focus:ring-amber-300 leading-relaxed font-mono"
                  />
                </div>
              </>
            )}

            {activeTab === 'media' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Choose Preset Image
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.url}
                        onClick={() => { setFeaturedImage(img.url); setCustomImageUrl(''); }}
                        className={`relative rounded-xl overflow-hidden border-2 transition ${
                          featuredImage === img.url && !customImageUrl
                            ? 'border-purple-500 shadow-lg shadow-purple-200'
                            : 'border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-28 object-cover" />
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-medium p-1.5 text-center">
                          {img.label}
                        </div>
                        {featuredImage === img.url && !customImageUrl && (
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Or enter custom image URL
                  </label>
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://... or /blogs/my-image.png"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  {customImageUrl && (
                    <img
                      src={customImageUrl}
                      alt="Preview"
                      className="mt-3 w-full h-36 object-cover rounded-xl border border-slate-200"
                    />
                  )}
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    SEO Title (defaults to post title)
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || 'SEO page title...'}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <div className="text-right text-[10px] text-slate-400 mt-1">
                    {(metaTitle || title).length}/60 recommended
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={summary || 'SEO meta description...'}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <div className="text-right text-[10px] text-slate-400 mt-1">
                    {(metaDescription || summary).length}/160 recommended
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="e.g. Polish work permit 2026"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Canonical URL (optional override)
                  </label>
                  <input
                    type="url"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://sijamconsults.com/blog/..."
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>

                {/* SERP Preview */}
                <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Search Preview</p>
                  <p className="text-blue-700 text-sm font-semibold leading-tight truncate">
                    {metaTitle || title || 'Your Post Title'}
                  </p>
                  <p className="text-green-700 text-[11px] mt-0.5">
                    sijamconsults.com › blog › {slug || 'post-slug'}
                  </p>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed line-clamp-2">
                    {metaDescription || summary || 'Your meta description will appear here in search results...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Panel */}
          <div className="space-y-4">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Publish Settings</p>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-purple-300"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Post Type</label>
                <select
                  value={postType}
                  onChange={(e) => setPostType(e.target.value as 'guide' | 'blog' | 'news')}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-purple-300"
                >
                  <option value="blog">Blog Post</option>
                  <option value="guide">Travel/Visa Guide</option>
                  <option value="news">Industry News</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Est. Read Time (min)</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={readTime}
                  onChange={(e) => setReadTime(Number(e.target.value))}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-300"
                />
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</p>
              {CATEGORIES.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryId === cat.id}
                    onChange={() => setCategoryId(cat.id)}
                    className="accent-purple-600"
                  />
                  <span className="text-sm text-slate-700">{cat.name}</span>
                </label>
              ))}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Poland, Work Permit, EU, 2026"
                className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
            </div>

            {/* Author */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Author</p>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Role / Title</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-300"
                />
              </div>
            </div>

            {/* Preview featured image */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Featured Image Preview</p>
              <img
                src={customImageUrl || featuredImage}
                alt="Featured"
                className="w-full h-32 object-cover rounded-xl border border-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            href="/admin/posts"
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition text-center"
          >
            Cancel
          </Link>
          <button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#402493] text-[#402493] text-sm font-semibold hover:bg-purple-50 transition disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#402493] text-white text-sm font-semibold hover:bg-[#331C79] transition shadow disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Globe className="w-4 h-4" />
            )}
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
