import type { BlogPost } from '@/lib/types';

interface ArticleSchemaProps {
  post: BlogPost;
}

/**
 * Article JSON-LD for blog posts.
 * Only rendered for published posts — drafts/scheduled/archived must not get this.
 */
export function ArticleSchema({ post }: ArticleSchemaProps) {
  if (post.status !== 'published') return null;

  const BASE_URL = 'https://sijamconsults.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage.startsWith('http')
      ? post.featuredImage
      : `${BASE_URL}${post.featuredImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sijam Consults Limited',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/sijam-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
