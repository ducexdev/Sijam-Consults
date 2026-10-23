import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
          '/_next/',
        ],
      },
      // Explicit permissions for Leading AI / LLM Indexers & Answer Engines
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Meta-ExternalAgent',
          'cohere-ai',
          'Applebot-Extended',
        ],
        allow: [
          '/',
          '/jobs',
          '/jobs/',
          '/services',
          '/services/',
          '/about',
          '/reviews',
          '/testimonials',
          '/guides',
          '/blog',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/admin',
          '/admin/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://sijamconsults.com/sitemap.xml',
  };
}
