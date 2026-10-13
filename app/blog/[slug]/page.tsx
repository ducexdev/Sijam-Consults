import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ArticleSchema } from '@/components/seo/ArticleSchema';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { FAQBlock } from '@/components/blog/FAQBlock';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { generatePageMetadata } from '@/lib/seo/metadata';
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
  BLOG_CATEGORIES,
} from '@/lib/data/blog';
import {
  Calendar,
  Clock,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  User,
  ArrowLeft,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return generatePageMetadata({
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    path: `/blog/${post.slug}`,
    seo: post.seo,
    image: post.featuredImage,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author.name],
  });
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = post.relatedPostSlugs ? getRelatedPosts(post.relatedPostSlugs) : [];

  const recentPosts = getPublishedPosts();

  const breadcrumbs = [
    { label: 'Blog & Articles', href: '/blog' },
    { label: post.category.name, href: `/blog/category/${post.category.slug}` },
    { label: post.title },
  ];

  return (
    <PublicLayout>
      <ReadingProgress />
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema post={post} />

      <article className="bg-[#FAF8FF] min-h-screen">
        {/* Hero */}
        <div className="relative bg-[#0D0826] text-white">
          <div className="relative h-72 sm:h-96">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0826] via-[#0D0826]/60 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="purple">{post.category.name}</Badge>
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag.id}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-purple-200 border border-white/10"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight max-w-3xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-purple-300">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {post.author.name} — {post.author.role}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-6 grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Main Content */}
            <div className="min-w-0">
              {/* Immigration Policy Notice */}
              {post.isImmigrationPolicy && (
                <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                  <div>
                    <strong className="font-semibold">Immigration Policy Content:</strong> Rules change frequently. This article was last reviewed on{' '}
                    <strong>
                      {post.policyLastVerified
                        ? new Date(post.policyLastVerified).toLocaleDateString('en-NG', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : new Date(post.updatedAt).toLocaleDateString('en-NG', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                    </strong>
                    . Always verify requirements directly with the relevant embassy, immigration authority, or official government source before making any application.
                  </div>
                </div>
              )}

              {/* Last Updated */}
              {post.updatedAt !== post.publishedAt && (
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-6">
                  <RefreshCw className="w-3 h-3" />
                  Last updated:{' '}
                  {new Date(post.updatedAt).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              )}

              {/* Excerpt / Introduction */}
              <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>

              {/* Key Takeaways */}
              {post.keyTakeaways.length > 0 && (
                <div className="mb-8 rounded-xl border border-purple-200 bg-purple-50 p-5">
                  <p className="font-heading font-bold text-sm uppercase tracking-widest text-[#402493] mb-3">
                    Key Takeaways
                  </p>
                  <ul className="space-y-2">
                    {post.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[#0D0826] leading-relaxed">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#402493] flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sections */}
              <div className="prose prose-slate max-w-none space-y-8">
                {post.sections.map((section, index) => {
                  const headingId = slugifyHeading(section.heading);
                  return (
                    <section key={index} id={headingId}>
                      <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#0D0826] mb-3">
                        {section.heading}
                      </h2>
                      <p className="text-slate-700 leading-relaxed text-base">{section.content}</p>
                    </section>
                  );
                })}
              </div>

              {/* FAQs */}
              {post.faqs && post.faqs.length > 0 && <FAQBlock faqs={post.faqs} />}

              {/* Official Sources */}
              {post.officialSourceUrls && post.officialSourceUrls.length > 0 && (
                <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-sm text-[#0D0826] mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#402493]" />
                    Official Sources & References
                  </p>
                  <ul className="space-y-2">
                    {post.officialSourceUrls.map((url, i) => (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#402493] underline underline-offset-2 hover:text-[#F45A2A] break-all transition-colors"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-slate-500">
                    External links open official government or regulatory websites. Sijam Consults is not affiliated with these bodies.
                  </p>
                </div>
              )}

              {/* Author Card */}
              <div className="mt-10 flex gap-4 rounded-xl border border-purple-100 bg-white p-5">
                {post.author.avatar && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#1A1040]">
                    <Image
                      src={post.author.avatar}
                      alt={`${post.author.name} profile photo`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div>
                  <p className="font-heading font-bold text-sm text-[#0D0826]">{post.author.name}</p>
                  <p className="text-xs text-[#402493] mb-1">{post.author.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{post.author.bio}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 rounded-2xl bg-[#0D0826] text-white p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <p className="font-heading font-bold text-lg mb-1">Need personalised guidance?</p>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    This article provides general information. For advice specific to your personal circumstances, schedule a consultation with Sijam Consults.
                  </p>
                </div>
                <Button href="/consultation" variant="primary" size="lg" className="flex-shrink-0">
                  Book Consultation
                </Button>
              </div>

              {/* Related Articles */}
              <RelatedArticles posts={relatedPosts} />

              {/* Back Link */}
              <Link
                href="/blog"
                className="mt-10 inline-flex items-center gap-2 text-sm text-[#402493] hover:text-[#F45A2A] transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>

            {/* Sidebar */}
            <aside className="w-full">
              <BlogSidebar
                sections={post.sections}
                categories={BLOG_CATEGORIES}
                recentPosts={recentPosts}
                currentPostSlug={post.slug}
              />
            </aside>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
}
