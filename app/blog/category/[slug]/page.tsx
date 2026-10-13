import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { BLOG_CATEGORIES, getPostsByCategory, getPublishedPosts } from '@/lib/data/blog';
import { BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found' };

  return generatePageMetadata({
    title: `${category.name} Articles`,
    description: `Immigration guides, visa tips, and advisory content in the ${category.name} category from Sijam Consults Limited.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <PublicLayout>
      <div className="py-10 bg-[#FAF8FF] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Blog & Articles', href: '/blog' },
              { label: category.name },
            ]}
          />

          <div className="mt-6 mb-8">
            <p className="text-xs uppercase tracking-widest text-[#402493] font-semibold mb-1">Category</p>
            <h1 className="font-heading font-extrabold text-3xl text-[#0D0826]">{category.name}</h1>
            {category.description && (
              <p className="mt-2 text-slate-600 max-w-2xl">{category.description}</p>
            )}
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
              <p className="font-medium">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
