'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  FileText,
  Search,
  Globe,
  BarChart3,
  ExternalLink,
  RefreshCw,
  ShieldAlert,
  Tag,
  Link2,
  Image,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { getPublishedPosts, BLOG_CATEGORIES } from '@/lib/data/blog';
import { SERVICES_DATA } from '@/lib/data/services';
import { JOBS_DATA } from '@/lib/data/jobs';
import { GUIDES_DATA } from '@/lib/data/guides';
import type { SeoIssue, SeoIssueSeverity } from '@/lib/types';

// ─── SEO Issue Detection ──────────────────────────────────────────────────────

function detectSeoIssues(): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const now = new Date();

  const posts = getPublishedPosts();

  // Check blog posts for missing SEO
  posts.forEach((post) => {
    if (!post.seo.title) {
      issues.push({
        id: `missing-title-${post.id}`,
        type: 'missing_title',
        severity: 'critical',
        page: `/blog/${post.slug}`,
        message: `Blog post "${post.title}" has no custom SEO title.`,
        suggestion: 'Add a keyword-rich SEO title under 60 characters.',
        detectedAt: now.toISOString(),
      });
    }
    if (!post.seo.description) {
      issues.push({
        id: `missing-desc-${post.id}`,
        type: 'missing_description',
        severity: 'warning',
        page: `/blog/${post.slug}`,
        message: `Blog post "${post.title}" has no custom meta description.`,
        suggestion: 'Add a compelling meta description between 120–160 characters.',
        detectedAt: now.toISOString(),
      });
    }
    if (!post.seo.ogImage && !post.featuredImage) {
      issues.push({
        id: `missing-og-${post.id}`,
        type: 'missing_og_image',
        severity: 'warning',
        page: `/blog/${post.slug}`,
        message: `Blog post "${post.title}" has no Open Graph image.`,
        suggestion: 'Add a 1200×630px OG image for social sharing.',
        detectedAt: now.toISOString(),
      });
    }
  });

  // Check expired jobs still showing
  const expiredJobs = JOBS_DATA.filter(
    (j) => j.status === 'Open' && new Date(j.deadline) < now
  );
  expiredJobs.forEach((job) => {
    issues.push({
      id: `expired-job-${job.id}`,
      type: 'missing_structured_data',
      severity: 'critical',
      page: `/jobs/${job.slug}`,
      message: `Job "${job.title}" deadline has passed but status is still "Open".`,
      suggestion: 'Update job status to "Filled" or remove the listing to prevent expired JobPosting schema.',
      detectedAt: now.toISOString(),
    });
  });

  // Check guides for alt text
  GUIDES_DATA.forEach((guide) => {
    if (!guide.featuredImage) {
      issues.push({
        id: `missing-img-${guide.id}`,
        type: 'missing_alt_text',
        severity: 'warning',
        page: `/guides/${guide.slug}`,
        message: `Guide "${guide.title}" has no featured image defined.`,
        suggestion: 'Add a featured image with descriptive alt text.',
        detectedAt: now.toISOString(),
      });
    }
  });

  return issues;
}

// ─── Severity Badge ───────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: SeoIssueSeverity }) {
  if (severity === 'critical') return <Badge variant="orange">Critical</Badge>;
  if (severity === 'warning') return <Badge variant="blue">Warning</Badge>;
  return <Badge variant="slate">Info</Badge>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${accent ? 'bg-[#402493] border-purple-700 text-white' : 'bg-white border-slate-200'}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${accent ? 'text-purple-200' : 'text-[#402493]'}`} />
        <span className={`text-xs font-semibold uppercase tracking-widest ${accent ? 'text-purple-200' : 'text-slate-500'}`}>
          {label}
        </span>
      </div>
      <p className={`font-heading font-extrabold text-3xl ${accent ? 'text-white' : 'text-[#0D0826]'}`}>
        {value}
      </p>
      {sub && <p className={`text-xs mt-1 ${accent ? 'text-purple-300' : 'text-slate-500'}`}>{sub}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminSEOPage() {
  const [filter, setFilter] = useState<SeoIssueSeverity | 'all'>('all');

  const allIssues = detectSeoIssues();
  const filtered =
    filter === 'all' ? allIssues : allIssues.filter((i) => i.severity === filter);

  const critical = allIssues.filter((i) => i.severity === 'critical').length;
  const warnings = allIssues.filter((i) => i.severity === 'warning').length;
  const infos = allIssues.filter((i) => i.severity === 'info').length;

  const posts = getPublishedPosts();

  return (
    <div className="min-h-screen bg-[#FAF8FF] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Globe className="w-5 h-5 text-[#402493]" />
            <h1 className="font-heading font-extrabold text-2xl text-[#0D0826]">SEO Dashboard</h1>
          </div>
          <p className="text-sm text-slate-500">
            Internal SEO health check. Issues below are detected from the application data layer.
          </p>
          <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>
              This dashboard identifies issues detectable from local data. Google Search rankings, organic traffic, and search impressions require{' '}
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                Google Search Console
              </a>{' '}
              integration, which is not connected to this interface.
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FileText} label="Published Posts" value={posts.length} sub={`${BLOG_CATEGORIES.length} categories`} />
          <StatCard icon={Globe} label="Indexed Services" value={SERVICES_DATA.length} sub="All indexable" />
          <StatCard icon={ShieldAlert} label="Critical Issues" value={critical} accent={critical > 0} />
          <StatCard icon={AlertTriangle} label="Warnings" value={warnings} sub={`${infos} informational`} />
        </div>

        {/* SEO Checklist */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'XML Sitemap', status: 'ok', note: '/sitemap.xml active', icon: Globe },
            { label: 'robots.txt', status: 'ok', note: 'Admin & API disallowed', icon: ShieldAlert },
            { label: 'Canonical URLs', status: 'ok', note: 'All pages via metadata factory', icon: Link2 },
            { label: 'Open Graph', status: 'ok', note: 'Title, description, image on all pages', icon: Image },
            { label: 'Organization Schema', status: 'ok', note: 'JSON-LD in root layout', icon: CheckCircle },
            { label: 'RSS Feed', status: 'ok', note: '/blog/rss.xml active', icon: RefreshCw },
            { label: 'JobPosting Schema', status: 'ok', note: 'Only active, non-expired jobs', icon: Tag },
            { label: 'Article Schema', status: 'ok', note: 'Published blog posts only', icon: FileText },
            { label: 'BreadcrumbList', status: 'ok', note: 'Service, blog, guide pages', icon: Search },
            { label: 'Admin noindex', status: 'ok', note: '/admin/* all noindex,nofollow', icon: ShieldAlert },
            { label: 'Google Search Console', status: 'pending', note: 'Manual setup required — see instructions below', icon: BarChart3 },
            { label: 'Analytics Integration', status: 'pending', note: 'GA4/Plausible not yet configured', icon: BarChart3 },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-start gap-3 rounded-xl border p-4 ${
                item.status === 'ok'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <item.icon
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.status === 'ok' ? 'text-green-600' : 'text-amber-600'}`}
              />
              <div>
                <p className={`text-xs font-bold ${item.status === 'ok' ? 'text-green-800' : 'text-amber-800'}`}>
                  {item.label}
                </p>
                <p className={`text-xs mt-0.5 ${item.status === 'ok' ? 'text-green-700' : 'text-amber-700'}`}>
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="font-heading font-bold text-base text-[#0D0826]">
              Detected Issues ({allIssues.length})
            </h2>
            <div className="flex gap-2">
              {(['all', 'critical', 'warning', 'info'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    filter === f
                      ? 'bg-[#402493] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="font-medium text-sm">No {filter === 'all' ? '' : filter} issues detected.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((issue) => (
                <div key={issue.id} className="p-5 flex flex-col sm:flex-row sm:items-start gap-3">
                  <SeverityBadge severity={issue.severity} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0D0826]">{issue.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{issue.suggestion}</p>
                  </div>
                  <a
                    href={issue.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#402493] hover:underline flex items-center gap-1 flex-shrink-0"
                  >
                    {issue.page}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* External Integrations Notice */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-heading font-bold text-base text-[#0D0826] mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#402493]" />
            External Integration Setup
          </h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <strong className="text-[#0D0826]">Google Search Console:</strong>{' '}
              To see Google-reported impressions, clicks, rankings, coverage errors, and Core Web Vitals,{' '}
              <a
                href="https://search.google.com/search-console/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#402493] underline"
              >
                register the property at search.google.com/search-console
              </a>
              , verify ownership via DNS TXT record or HTML tag, and submit the sitemap URL{' '}
              <code className="bg-slate-100 px-1 rounded text-xs">https://sijamconsults.com/sitemap.xml</code>.
              This dashboard does not and cannot display GSC data without OAuth authorization.
            </div>
            <div>
              <strong className="text-[#0D0826]">Google Analytics / Plausible:</strong>{' '}
              Traffic metrics, user behaviour, and conversion data require a configured analytics integration.
              Add your GA4 Measurement ID or Plausible domain to the environment configuration.
              Neither tool is activated without the corresponding environment variable.
            </div>
          </div>
        </div>

        {/* Blog Content Manager Link */}
        <div className="mt-6 flex gap-3">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#402493] text-white text-sm font-semibold hover:bg-purple-800 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Manage Blog Posts
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            ← Admin Home
          </Link>
        </div>
      </div>
    </div>
  );
}
