import Link from 'next/link';
import { ArrowLeft, Info, Eye } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data/blog';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);
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
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Google SERP Preview</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-[#257CFF] line-clamp-1">https://sijamconsults.com/blog/{post.slug}</p>
              <p className="text-sm font-semibold text-[#1A0DAB] hover:underline cursor-pointer line-clamp-1 mt-0.5">
                {post.seo.title || post.title} | SIJAM Consults
              </p>
              <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                {post.seo.description || post.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Sections Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-5">
          <h2 className="font-heading font-bold text-sm text-[#0D0826] uppercase tracking-wider mb-3">
            Article Structure ({post.sections.length} Sections)
          </h2>
          <ol className="space-y-2 text-xs">
            {post.sections.map((section, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="font-mono text-slate-400 font-bold">{idx + 1}.</span>
                <div>
                  <p className="font-semibold">{section.heading}</p>
                  <p className="text-slate-500 line-clamp-1">{section.content}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Live Preview Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold">Dynamic Content Management</p>
            <p className="text-amber-800">
              In this release, blog posts are statically compiled from verified source definitions in <code>lib/data/blog.ts</code> to maintain consular accuracy and SEO authority. Direct inline editing will sync to Supabase in the next update.
            </p>
            <div className="pt-2 flex gap-3">
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
