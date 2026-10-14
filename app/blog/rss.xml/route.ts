import { getPublishedPosts } from '@/lib/data/blog';

export const dynamic = 'force-static';

const BASE_URL = 'https://sijamconsults.com';

export async function GET() {
  const posts = getPublishedPosts();

  const rssItems = posts
    .map((post) => {
      const pubDate = new Date(post.publishedAt).toUTCString();
      const postUrl = `${BASE_URL}/blog/${post.slug}`;
      const escapedTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const escapedExcerpt = post.excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      return `
    <item>
      <title>${escapedTitle}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapedExcerpt}</description>
      <pubDate>${pubDate}</pubDate>
      <author>editorial@sijamconsults.com (${post.author.name})</author>
      <category>${post.category.name}</category>
      ${post.tags.map((t) => `<category>${t.name}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Sijam Consults Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Immigration guides, visa tips, European business mobility, and study abroad insights from Sijam Consults Limited (CAC RC: 1715416), Kaduna, Nigeria.</description>
    <language>en-ng</language>
    <managingEditor>editorial@sijamconsults.com (Sijam Consults Editorial)</managingEditor>
    <webMaster>webmaster@sijamconsults.com (Sijam Consults)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/sijam-logo.png</url>
      <title>Sijam Consults Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
