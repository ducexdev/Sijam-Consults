import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  CheckCircle2,
  Share2,
  Tag,
  BookOpen,
} from 'lucide-react';
import { GuideArticle } from '@/lib/types';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrustBanner } from '@/components/ui/TrustBanner';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { GUIDES_DATA } from '@/lib/data/guides';
import { getPublishedPosts, BLOG_CATEGORIES } from '@/lib/data/blog';

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const ArticleDetailPage: React.FC<{
  article: GuideArticle;
  basePath: 'guides' | 'blog';
}> = ({ article, basePath }) => {
  const publishedPosts = getPublishedPosts();
  const recentPosts = publishedPosts.length > 0 ? publishedPosts : [];
  return (
    <div className="py-10 bg-[#FAF8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            {
              label: basePath === 'guides' ? 'Travel Guides' : 'Blog',
              href: basePath === 'guides' ? ROUTES.guides.root : ROUTES.blog.root,
            },
            { label: article.title },
          ]}
        />

        <div className="mt-8 grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Main Article Column */}
          <div className="min-w-0">
            {/* Article Header */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="purple" size="sm">
                  {article.category}
                </Badge>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Published: {formatDate(article.publishedDate)}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTimeMinutes} min read
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight leading-tight">
                {article.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {article.summary}
              </p>

              {/* Author Byline */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full relative overflow-hidden bg-purple-100 flex items-center justify-center font-bold text-sm text-[#402493]">
                  {article.author.avatar ? (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    article.author.name[0]
                  )}
                </div>
                <div>
                  <p className="font-heading font-bold text-xs sm:text-sm text-[#0F172A]">
                    {article.author.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{article.author.role}</p>
                </div>
              </div>
            </div>

            {/* Featured Image Banner */}
            <div className="h-64 sm:h-96 w-full relative rounded-3xl overflow-hidden bg-slate-900 mb-10 shadow-md">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
                className="object-cover"
              />
            </div>

            {/* Key Takeaways Callout Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="mb-10 p-6 rounded-2xl bg-purple-50/80 border border-purple-200/80 space-y-3">
                <h3 className="font-heading font-bold text-sm text-[#402493] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#F45A2A]" />
                  Executive Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#402493] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Article Content Sections */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-sm space-y-8">
              {article.sections.map((section, idx) => (
                <div key={idx} id={slugifyHeading(section.heading)} className="space-y-3.5 scroll-mt-24">
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-[#0F172A] border-b border-purple-100 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#4DA5EC] to-[#257CFF] inline-block" />
                    {section.heading}
                  </h2>
                  <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                    {section.content.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('• ') || paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n').filter(Boolean);
                        return (
                          <ul key={pIdx} className="space-y-1.5 pl-4 list-disc marker:text-[#257CFF]">
                            {items.map((item, iIdx) => (
                              <li key={iIdx} className="pl-1">
                                {item.replace(/^[-•]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={pIdx}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400 mr-1">Topics:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Consultation CTA Banner */}
            <div className="my-10 rounded-3xl bg-[#0D0826] text-white p-8 text-center space-y-4 border border-purple-950">
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Need Expert Assistance with Your Application?
              </h3>
              <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto">
                Avoid common embassy refusals. Schedule a private consultation with our senior immigration and admissions team in Kaduna or via encrypted video.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button href={ROUTES.consultation} variant="primary" size="md">
                  Book Strategy Session <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button href={ROUTES.assessment} variant="glass" size="md">
                  Check Free Eligibility
                </Button>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <aside className="w-full lg:sticky lg:top-24 lg:self-start">
            <BlogSidebar
              sections={article.sections}
              categories={BLOG_CATEGORIES}
              recentPosts={recentPosts}
              currentPostSlug={article.slug}
            />
          </aside>
        </div>

        <div className="mt-12">
          <TrustBanner showFullDisclaimer={false} />
        </div>
      </div>
    </div>
  );
};
