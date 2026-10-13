import type { Metadata } from 'next';
import type { SeoMetadata } from '@/lib/types';

const BASE_URL = 'https://sijamconsults.com';
const SITE_NAME = 'Sijam Consults Limited';
const DEFAULT_OG_IMAGE = '/og/sijam-og-default.png';
const DEFAULT_DESCRIPTION =
  'Sijam Consults Limited (CAC RC: 1715416) — Nigeria\'s trusted immigration advisory firm. Study visas, work permits, tourist visas, business registration, and document legalisation services.';

/**
 * Resolve an absolute URL from a relative path or passthrough if already absolute.
 */
export function absoluteUrl(path: string): string {
  if (!path) return BASE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Build a canonical URL for a given path segment.
 * Strips trailing slashes to prevent duplicate canonicals.
 */
export function canonicalUrl(path: string): string {
  const resolved = absoluteUrl(path);
  // Remove trailing slash except for root
  return resolved === BASE_URL ? resolved : resolved.replace(/\/$/, '');
}

/**
 * Primary metadata factory.
 * Accepts page-specific overrides and merges them with sensible defaults.
 * Every public page should call this instead of constructing Metadata manually.
 */
export function generatePageMetadata(options: {
  title: string;
  description?: string;
  path: string;
  seo?: SeoMetadata;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path,
    seo = {},
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    noIndex = false,
  } = options;

  // Prefer explicit SEO overrides, then page-level props, then defaults
  const resolvedTitle = seo.title || title;
  const resolvedDescription = seo.description || description;
  const resolvedCanonical = seo.canonicalUrl ? absoluteUrl(seo.canonicalUrl) : canonicalUrl(path);
  const resolvedImage = seo.ogImage || image || DEFAULT_OG_IMAGE;
  const resolvedNoIndex = seo.noIndex ?? noIndex;
  const resolvedNoFollow = seo.noFollow ?? false;

  // Build title tag: "Page Title | Sijam Consults Limited"
  const formattedTitle = resolvedTitle.includes(SITE_NAME)
    ? resolvedTitle
    : `${resolvedTitle} | ${SITE_NAME}`;

  const metadata: Metadata = {
    title: formattedTitle,
    description: resolvedDescription,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: resolvedCanonical,
    },
    robots: {
      index: !resolvedNoIndex,
      follow: !resolvedNoFollow,
      googleBot: {
        index: !resolvedNoIndex,
        follow: !resolvedNoFollow,
      },
    },
    openGraph: {
      title: seo.ogTitle || formattedTitle,
      description: seo.ogDescription || resolvedDescription,
      url: resolvedCanonical,
      siteName: SITE_NAME,
      locale: 'en_NG',
      type,
      images: [
        {
          url: absoluteUrl(resolvedImage),
          width: 1200,
          height: 630,
          alt: seo.ogTitle || resolvedTitle,
        },
      ],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
      ...(type === 'article' && authors ? { authors } : {}),
    },
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title: seo.ogTitle || formattedTitle,
      description: seo.ogDescription || resolvedDescription,
      images: [absoluteUrl(resolvedImage)],
    },
  };

  return metadata;
}

/**
 * Returns metadata for admin/dashboard pages: always noindex, nofollow.
 */
export function adminMetadata(title: string): Metadata {
  return {
    title: `${title} | Admin — Sijam Consults`,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
}
