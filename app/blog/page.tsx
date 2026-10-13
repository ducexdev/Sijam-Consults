import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Badge } from '@/components/ui/Badge';
import { getPublishedPosts, BLOG_CATEGORIES } from '@/lib/data/blog';
import { generatePageMetadata } from '@/lib/seo/metadata';

import { BookOpen, Rss } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog & Immigration Updates',
  description:
    'Latest immigration updates, visa guidelines, European business setup news, and international student admissions advice from Sijam Consults Limited.',
  path: '/blog',
  image: '/og/sijam-og-default.png',
});

interface BlogPageProps {
  searchParams?: Promise<{ q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const query = (await searchParams)?.q?.trim().toLowerCase();
  const allPosts = getPublishedPosts();
  
  const posts = query
    ? allPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.category.name.toLowerCase().includes(query) ||
          p.tags.some((t) => t.name.toLowerCase().includes(query)) ||
          p.sections.some(
            (s) =>
              s.heading.toLowerCase().includes(query) ||
              s.content.toLowerCase().includes(query)
          )
      )
    : allPosts;

  const featuredPost = query ? undefined : posts[0];
  const remainingPosts = query ? posts : posts.slice(1);

  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ label: 'Blog & Articles' }]} />

          {/* Hero Banner */}
          <div className="rounded-3xl bg-[#0D0826] text-white p-8 sm:p-12 mb-10 border border-purple-950 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#402493]/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-xs text-purple-200">
                <BookOpen className="w-3.5 h-3.5 text-[#F45A2A]" />
                <span>Editorial Insights & Updates</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                SIJAM Consults Editorial & Blog
              </h1>
              <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
                Stay updated with shifting embassy policies, study intake deadlines, work authorisation changes, and European business mobility insights — reviewed regularly for accuracy.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/blog/rss.xml"
                  className="inline-flex items-center gap-1.5 text-xs text-orange-300 hover:text-white transition-colors"
                >
                  <Rss className="w-3.5 h-3.5" />
                  RSS Feed
                </Link>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-[#402493] text-white"
            >
              All Articles
            </Link>
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold border border-purple-200 text-slate-600 hover:bg-purple-50 hover:border-purple-400 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="orange">Featured</Badge>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">Latest article</span>
              </div>
              <ArticleCard post={featuredPost} featured />
            </div>
          )}

          {/* Remaining Posts Grid */}
          {remainingPosts.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-lg text-[#0D0826] mb-5">More Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {remainingPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-purple-200" />
              <p className="font-medium">No articles published yet.</p>
              <p className="text-sm mt-1">Check back soon for immigration insights and guides.</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
