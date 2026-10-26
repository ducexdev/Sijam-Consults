import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ArticleDetailPage } from '@/components/guides/ArticleDetailPage';
import { GUIDES_DATA } from '@/lib/data/guides';
import { dbRepository } from '@/lib/db/repository';
import { blogRecordToGuideArticle } from '@/lib/data/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const dbGuides = await dbRepository.getBlogPosts({ type: 'guide', status: 'published' });
  const slugs = new Set([
    ...GUIDES_DATA.map((article) => article.slug),
    ...dbGuides.map((guide) => guide.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

async function getGuide(slug: string) {
  const staticGuide = GUIDES_DATA.find((a) => a.slug === slug);
  if (staticGuide) return staticGuide;
  const dbRecord = await dbRepository.getBlogPostBySlug(slug);
  if (dbRecord && dbRecord.post_type === 'guide') {
    return blogRecordToGuideArticle(dbRecord);
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getGuide(slug);
  if (!article) return { title: 'Guide Not Found' };

  return {
    title: `${article.title} | Sijam Consults Limited`,
    description: article.summary,
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getGuide(slug);

  if (!article) {
    notFound();
  }

  return (
    <PublicLayout>
      <ArticleDetailPage article={article} basePath="guides" />
    </PublicLayout>
  );
}
