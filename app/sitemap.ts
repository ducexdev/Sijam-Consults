import type { MetadataRoute } from 'next';
import { SERVICES_DATA } from '@/lib/data/services';
import { JOBS_DATA } from '@/lib/data/jobs';
import { GUIDES_DATA } from '@/lib/data/guides';
import { getPublishedPosts, BLOG_CATEGORIES, BLOG_TAGS } from '@/lib/data/blog';

/**
 * Next.js MetadataRoute sitemap (used by Next.js sitemap discovery).
 * The comprehensive /sitemap.xml route handler is at app/sitemap.xml/route.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sijamconsults.com';
  const now = new Date();

  const posts = getPublishedPosts();

  // Active jobs: not filled, deadline in future
  const activeJobs = JOBS_DATA.filter(
    (j) => j.status !== 'Filled' && new Date(j.deadline) > now
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/why-choose-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/consultation`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/assessment`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/testimonials`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/jobs`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const tagRoutes: MetadataRoute.Sitemap = BLOG_TAGS.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES_DATA.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const jobRoutes: MetadataRoute.Sitemap = activeJobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...guideRoutes,
    ...jobRoutes,
  ];
}
