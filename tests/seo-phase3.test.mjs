/**
 * Phase 3 — Technical SEO regression tests.
 *
 * Tests are READ-ONLY and static. No server needed.
 * Run: node --test tests/seo-phase3.test.mjs
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = decodeURIComponent(new URL('../', import.meta.url).pathname);
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

// ─── 1. Canonical URL consistency ──────────────────────────────────────────────

describe('SEO — Canonical URL consistency', () => {
  it('/testimonials page points canonical to /reviews (deduplication)', () => {
    const src = read('app/testimonials/page.tsx');
    assert.match(src, /canonical.*sijamconsults\.com\/reviews/,
      '/testimonials must declare canonical: https://sijamconsults.com/reviews');
  });

  it('/reviews page has its own canonical', () => {
    const src = read('app/reviews/page.tsx');
    assert.match(src, /canonical.*sijamconsults\.com\/reviews/,
      '/reviews must declare its own canonical');
  });

  it('sitemap lists /testimonials at lower priority than /reviews', () => {
    const src = read('app/sitemap.ts');
    // /reviews must appear before /testimonials, and /testimonials must have lower priority
    assert.match(src, /reviews.*priority.*0\.[78]/s,
      '/reviews should have priority 0.75+');
    assert.match(src, /testimonials.*priority.*0\.[234]/s,
      '/testimonials should have priority ≤ 0.4 (canonical alias)');
  });
});

// ─── 2. Robots.txt configuration ───────────────────────────────────────────────

describe('SEO — robots.ts', () => {
  it('blocks /admin and /api from all bots', () => {
    const src = read('app/robots.ts');
    assert.match(src, /disallow.*\/admin/s, 'robots must disallow /admin');
    assert.match(src, /disallow.*\/api\//s, 'robots must disallow /api/');
  });

  it('sitemap URL points to production domain', () => {
    const src = read('app/robots.ts');
    assert.match(src, /sijamconsults\.com\/sitemap\.xml/,
      'robots sitemap URL must use production domain');
  });

  it('allows AI/LLM crawlers on content pages', () => {
    const src = read('app/robots.ts');
    assert.match(src, /GPTBot/, 'robots must have GPTBot explicit allow');
    assert.match(src, /ClaudeBot/, 'robots must have ClaudeBot explicit allow');
  });
});

// ─── 3. Sitemap completeness ────────────────────────────────────────────────────

describe('SEO — Sitemap', () => {
  it('sitemap uses production baseUrl', () => {
    const src = read('app/sitemap.ts');
    assert.match(src, /const baseUrl = 'https:\/\/sijamconsults\.com'/,
      'sitemap base URL must be production domain');
  });

  it('sitemap includes /assessment, /consultation, /guides, /partners', () => {
    const src = read('app/sitemap.ts');
    assert.match(src, /\/assessment/, 'sitemap must include /assessment');
    assert.match(src, /\/consultation/, 'sitemap must include /consultation');
    assert.match(src, /\/guides/, 'sitemap must include /guides');
    assert.match(src, /\/partners/, 'sitemap must include /partners');
  });

  it('sitemap maps SERVICES_DATA slugs dynamically', () => {
    const src = read('app/sitemap.ts');
    assert.match(src, /SERVICES_DATA\.map/, 'sitemap must use SERVICES_DATA map for service routes');
  });
});

// ─── 4. Redirects — legacy URL coverage ────────────────────────────────────────

describe('SEO — next.config.ts redirects', () => {
  it('/what-clients-say redirects permanently to /reviews', () => {
    const src = read('next.config.ts');
    assert.match(src, /what-clients-say.*destination.*reviews.*permanent.*true/s,
      'must redirect /what-clients-say -> /reviews (301)');
  });

  it('/about-us redirects to /about', () => {
    const src = read('next.config.ts');
    assert.match(src, /about-us.*destination.*\/about/s,
      'must redirect /about-us -> /about (301)');
  });

  it('legacy nursing article slug redirects to new blog slug', () => {
    const src = read('next.config.ts');
    assert.match(src, /why-study-nursing-in-canada.*why-study-nursing-canada-2026/s,
      'must redirect legacy nursing article slug to canonical blog slug');
  });
});

// ─── 5. Metadata quality checks ────────────────────────────────────────────────

describe('SEO — Metadata quality', () => {
  it('blog page uses keyword-rich title for Nigeria audience', () => {
    const src = read('app/blog/page.tsx');
    assert.match(src, /Immigration Blog.*Nigerians|Visa Updates.*Nigeria/i,
      'blog page title must target Nigerian immigration search intent');
  });

  it('homepage title matches keyword blueprint', () => {
    const src = read('app/page.tsx');
    assert.match(src, /International Recruitment.*Immigration Agency/i,
      'homepage title must match SEO blueprint primary keyword');
  });

  it('reviews page has AggregateRating schema', () => {
    const src = read('app/reviews/page.tsx');
    assert.match(src, /AggregateRating/,
      '/reviews must include AggregateRating structured data');
  });

  it('reviews page LocalBusiness telephone matches COMPANY constant', () => {
    const src = read('app/reviews/page.tsx');
    // Must use the canonical primary number from lib/routes.ts
    assert.match(src, /\+2347064229556/,
      'reviews LocalBusiness telephone must match COMPANY.phones.primaryRaw');
  });

  it('new service pages (citizenship/permanent-residency/recruitment-supply) exist', () => {
    const pages = [
      'app/services/citizenship-assistance/page.tsx',
      'app/services/permanent-residency/page.tsx',
      'app/services/recruitment-supply/page.tsx',
    ];
    for (const p of pages) {
      assert.ok(existsSync(join(ROOT, p)), `${p} must exist`);
    }
  });

  it('OrganizationSchema uses correct primary phone', () => {
    const src = read('components/seo/OrganizationSchema.tsx');
    assert.match(src, /\+234-706-422-9556|\+2347064229556/,
      'OrganizationSchema must include primary contact number');
  });

  it('JobPostingSchema does not emit for filled or expired jobs', () => {
    const src = read('components/seo/JobPostingSchema.tsx');
    assert.match(src, /status === 'Filled' \|\| deadline < now.*return null/s,
      'JobPostingSchema must guard against filled/expired listings');
  });
});
