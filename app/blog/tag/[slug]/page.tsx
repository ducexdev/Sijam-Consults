import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { BLOG_TAGS, getPostsByTag, getPublishedPosts } from '@/lib/data/blog';
import { Tag, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_TAGS.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = BLOG_TAGS.find((t) => t.slug === slug);
  if (!tag) return { title: 'Tag Not Found' };

  return generatePageMetadata({
    title: `Articles tagged: ${tag.name}`,
    description: `Browse all Sijam Consults blog articles tagged with "${tag.name}" — immigration guides, visa tips, and advisory content.`,
    path: `/blog/tag/${slug}`,
  });
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = BLOG_TAGS.find((t) => t.slug === slug);
  if (!tag) notFound();

  const posts = getPostsByTag(slug);

  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Blog & Articles', href: '/blog' },
              { label: `#${tag.name}` },
            ]}
          />

          <div className="mt-6 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#402493] text-xs font-semibold mb-2">
              <Tag className="w-3 h-3" />
              Tag
            </div>
            <h1 className="font-heading font-extrabold text-3xl text-[#0D0826]">#{tag.name}</h1>
            <p className="text-sm text-slate-500 mt-1">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
          </div>

          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-purple-200" />
              <p className="font-medium">No articles with this tag yet.</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
