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
  Trash2,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { adminUpdateBlogPost, adminDeleteBlogPost } from '@/app/actions/blog';
import type { BlogPost } from '@/lib/types';
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

interface EditPostFormProps {
  post: BlogPost;
}

export function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo'>('content');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Content fields
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [summary, setSummary] = useState(post.excerpt || '');
  const [categoryId, setCategoryId] = useState(post.category?.slug || 'study-abroad');
  const [contentHtml, setContentHtml] = useState(post.contentHtml || '');
  const [takeawaysText, setTakeawaysText] = useState((post.keyTakeaways || []).join('\n'));
  
  // Sections
  const [sections, setSections] = useState<{ heading: string; content: string }[]>(
    post.sections && post.sections.length > 0
      ? post.sections.map((s) => ({ heading: s.heading, content: s.content }))
      : [{ heading: 'Overview', content: '' }]
  );

  const [readTime, setReadTime] = useState(post.readTimeMinutes || 5);
  const initialStatus: BlogPostStatus = (post.status === 'review' ? 'draft' : post.status as BlogPostStatus) || 'draft';
  const [status, setStatus] = useState<BlogPostStatus>(initialStatus);
  const [authorName, setAuthorName] = useState(post.author?.name || 'James Samson');
  const [authorRole, setAuthorRole] = useState(post.author?.role || 'Managing Director & Principal Consultant');
  const [tagsText, setTagsText] = useState(
    Array.isArray(post.tags) ? post.tags.map((t) => (typeof t === 'string' ? t : t.name)).join(', ') : ''
  );

  // Media fields
  const [featuredImage, setFeaturedImage] = useState(post.featuredImage || '/blogs/Ducex-Blog.png');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // SEO fields
  const [metaTitle, setMetaTitle] = useState(post.seo?.title || '');
  const [metaDescription, setMetaDescription] = useState(post.seo?.description || '');
  const [canonicalUrl, setCanonicalUrl] = useState(post.seo?.canonicalUrl || '');

  const handleAddSection = () => {
    setSections([...sections, { heading: `Section ${sections.length + 1}`, content: '' }]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length <= 1) return;
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleUpdateSection = (index: number, field: 'heading' | 'content', value: string) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleSubmit = async (publishNow?: boolean) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setErrorMsg('Post title is required.');
      return;
    }
    if (!summary.trim()) {
      setErrorMsg('Summary / excerpt is required.');
      return;
    }

    const finalStatus: BlogPostStatus = publishNow !== undefined ? (publishNow ? 'published' : 'draft') : status;

    setLoading(true);
    try {
      const tags = tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const keyTakeaways = takeawaysText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      await adminUpdateBlogPost(post.id, {
        title: title.trim(),
        slug: slug.trim(),
        summary: summary.trim(),
        category_id: categoryId,
        content_html: contentHtml || null,
        key_takeaways: keyTakeaways,
        sections: sections.filter((s) => s.heading.trim() || s.content.trim()),
        featured_image: customImageUrl || featuredImage,
        read_time_minutes: readTime,
        author_name: authorName,
        author_role: authorRole,
        status: finalStatus,
        published_at: finalStatus === 'published' ? (post.publishedAt || new Date().toISOString()) : null,
        meta_title: metaTitle || title,
        meta_description: metaDescription || summary,
        canonical_url: canonicalUrl || null,
        tags,
      });

      setStatus(finalStatus);
      setSuccessMsg(`Post updated successfully (${finalStatus})!`);
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${post.title}"?`)) {
      return;
    }
    setDeleting(true);
    try {
      await adminDeleteBlogPost(post.id);
      router.push('/admin/posts');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to delete post.');
      setDeleting(false);
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
            <h1 className="font-heading font-extrabold text-lg text-[#0D0826] line-clamp-1">
              Edit: {title || post.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-purple-700 bg-slate-100 hover:bg-purple-50 rounded-lg transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Preview
            </a>
            <button
              onClick={handleDelete}
              disabled={deleting || loading}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
              title="Delete Post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit()}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-sm font-semibold transition disabled:opacity-60 shadow-lg shadow-[#257CFF]/25"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Feedback messages */}
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
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#257CFF] hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-5">
            {activeTab === 'content' && (
              <>
                {/* Title & Slug */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Post Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title..."
                    className="w-full text-xl font-bold text-[#0D0826] placeholder:text-slate-300 bg-transparent border-0 outline-none focus:ring-0"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">Slug:</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="post-slug"
                      className="flex-1 text-xs font-mono text-purple-700 bg-purple-50 border border-purple-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Excerpt / Summary */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Excerpt / Summary <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Short summary for search results and previews..."
                    className="w-full text-sm text-slate-700 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-purple-300"
                  />
                </div>

                {/* Content Sections */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Article Sections ({sections.length})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Section
                    </button>
                  </div>

                  {sections.map((section, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={section.heading}
                          onChange={(e) => handleUpdateSection(idx, 'heading', e.target.value)}
                          placeholder={`Section ${idx + 1} Heading...`}
                          className="w-full text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-300"
                        />
                        {sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                            title="Remove section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={4}
                        value={section.content}
                        onChange={(e) => handleUpdateSection(idx, 'content', e.target.value)}
                        placeholder="Section body content..."
                        className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-purple-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Takeaways (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={takeawaysText}
                    onChange={(e) => setTakeawaysText(e.target.value)}
                    placeholder="Key insight 1&#10;Key insight 2"
                    className="w-full text-xs text-slate-700 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-purple-300"
                  />
                </div>
              </>
            )}

            {activeTab === 'media' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Featured Image Preset
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PRESET_IMAGES.map((img) => (
                    <div
                      key={img.url}
                      onClick={() => {
                        setFeaturedImage(img.url);
                        setCustomImageUrl('');
                      }}
                      className={`cursor-pointer rounded-xl border p-2 text-center transition ${
                        featuredImage === img.url && !customImageUrl
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-24 object-cover rounded-lg mb-2" />
                      <span className="text-xs font-medium text-slate-700">{img.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Or Custom Image URL
                  </label>
                  <input
                    type="text"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="/blogs/my-custom-image.png or https://..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
                  />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {metaTitle.length}/60 characters recommended
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={summary}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {metaDescription.length}/160 characters recommended
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Canonical URL Override
                  </label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder={`https://sijamconsults.com/blog/${slug}`}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Settings */}
          <div className="space-y-4">
            {/* Publication Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Publication Status</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="review">In Review</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Read Time (minutes)</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={readTime}
                  onChange={(e) => setReadTime(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
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
                  <span className="text-xs text-slate-700">{cat.name}</span>
                </label>
              ))}
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="Poland, Work Permit, EU, 2026"
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
            </div>

            {/* Author */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Author</p>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Role / Title</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
                />
              </div>
            </div>

            {/* Preview image thumbnail */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Featured Image</p>
              <img
                src={customImageUrl || featuredImage}
                alt="Featured preview"
                className="w-full h-28 object-cover rounded-lg border border-slate-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
