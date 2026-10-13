import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ArticleDetailPage } from '@/components/guides/ArticleDetailPage';
import { GUIDES_DATA } from '@/lib/data/guides';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = GUIDES_DATA.find((a) => a.slug === slug);
  if (!article) return { title: 'Guide Not Found' };

  return {
    title: `${article.title} | Sijam Consults Limited`,
    description: article.summary,
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = GUIDES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <PublicLayout>
      <ArticleDetailPage article={article} basePath="guides" />
    </PublicLayout>
  );
}
