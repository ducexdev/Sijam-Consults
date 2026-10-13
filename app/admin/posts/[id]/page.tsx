'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Info, Eye } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data/blog';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const post = BLOG_POSTS.find((p) => p.id === resolvedParams.id);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-[#FAF8FF] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/posts" className="text-slate-400 hover:text-[#402493] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-heading font-extrabold text-xl text-[#0D0826] line-clamp-1">
            Editing: {post.title}
          </h1>
        </div>

        {/* Post Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-5">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Slug</p>
              <code className="bg-slate-100 px-2 py-1 rounded text-xs">/blog/{post.slug}</code>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Status</p>
              <span className="text-sm font-semibold text-[#0D0826]">{post.status}</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Published</p>
              <span className="text-sm">{post.publishedAt}</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Last Updated</p>
              <span className="text-sm">{post.updatedAt}</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Category</p>
              <span className="text-sm">{post.category.name}</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Author</p>
              <span className="text-sm">{post.author.name}</span>
            </div>
          </div>

          {/* SEO Preview */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">SEO Settings</p>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 space-y-2 text-xs">
              <div>
                <span className="font-semibold text-blue-800">Title: </span>
                <span className="text-blue-700">{post.seo.title || post.title}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Description: </span>
                <span className="text-blue-700">{post.seo.description || post.excerpt}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Canonical: </span>
                <code className="text-blue-700">https://sijamconsults.com/blog/{post.slug}</code>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Indexable: </span>
                <span className={post.seo.noIndex ? 'text-red-700 font-semibold' : 'text-green-700 font-semibold'}>
                  {post.seo.noIndex ? 'No (noindex)' : 'Yes'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 flex gap-3 text-sm text-amber-900">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
          <div>
            <strong className="font-semibold">Static Data File</strong>
            <p className="mt-1 leading-relaxed">
              To edit this post, update the entry with id{' '}
              <code className="bg-amber-100 px-1 rounded text-xs">{post.id}</code> in{' '}
              <code className="bg-amber-100 px-1 rounded text-xs">lib/data/blog.ts</code>.
              A full rich-text editor UI requires Supabase CMS integration.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#402493] text-white text-xs font-semibold hover:bg-purple-800 transition-colors"
              >
                <Eye className="w-3 h-3" />
                View Live Post
              </a>
              <Link
                href="/admin/posts"
                className="px-4 py-2 rounded-lg border border-amber-300 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors"
              >
                ← All Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
