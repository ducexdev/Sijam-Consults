'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Plus,
  Eye,
  Edit3,
  Clock,
  CheckCircle,
  Archive,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { BLOG_POSTS } from '@/lib/data/blog';
import type { BlogPostStatus } from '@/lib/types';

function StatusBadge({ status }: { status: BlogPostStatus }) {
  const map: Record<BlogPostStatus, { label: string; variant: 'green' | 'blue' | 'orange' | 'purple' | 'slate' }> = {
    published: { label: 'Published', variant: 'green' },
    review: { label: 'In Review', variant: 'blue' },
    scheduled: { label: 'Scheduled', variant: 'orange' },
    draft: { label: 'Draft', variant: 'slate' },
    archived: { label: 'Archived', variant: 'slate' },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export default function AdminPostsPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const published = posts.filter((p) => p.status === 'published').length;
  const drafts = posts.filter((p) => p.status === 'draft').length;
  const inReview = posts.filter((p) => p.status === 'review').length;

  return (
    <div className="min-h-screen bg-[#FAF8FF] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-[#402493]" />
              <h1 className="font-heading font-extrabold text-2xl text-[#0D0826]">Blog Posts</h1>
            </div>
            <p className="text-sm text-slate-500">
              {published} published · {drafts} draft{drafts !== 1 ? 's' : ''} · {inReview} in review
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#402493] text-white text-sm font-semibold rounded-xl hover:bg-purple-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Post</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Published</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Review Due</th>
                  <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => {
                  const reviewOverdue =
                    post.contentReviewDue && new Date(post.contentReviewDue) < new Date();
                  return (
                    <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {post.featuredImage && (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#1A1040]">
                              <Image
                                src={post.featuredImage}
                                alt={post.featuredImageAlt}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-[#0D0826] line-clamp-1">{post.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">/blog/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-slate-600">{post.category.name}</span>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={post.status} />
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString('en-NG', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {post.contentReviewDue ? (
                          <span
                            className={`text-xs flex items-center gap-1 ${
                              reviewOverdue ? 'text-red-600 font-semibold' : 'text-slate-500'
                            }`}
                          >
                            {reviewOverdue ? (
                              <AlertCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {new Date(post.contentReviewDue).toLocaleDateString('en-NG', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#402493] hover:bg-purple-50 transition-colors"
                            title="View post"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#402493] hover:bg-purple-50 transition-colors"
                            title="Edit post"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <p>Content is stored in <code className="bg-slate-100 px-1 rounded">lib/data/blog.ts</code>. Database-backed CMS coming with Supabase integration.</p>
          <Link href="/admin/seo" className="text-[#402493] hover:underline font-semibold">
            → SEO Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
