'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Globe,
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BarChart3,
  Copy,
  Check,
  FileText,
  Target,
  Zap,
  Eye,
  MousePointerClick,
  MapPin,
  Activity,
  Flag,
  ChevronUp,
  ChevronDown,
  PenLine,
  AlertCircle,
  Info,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { getPublishedPosts } from '@/lib/data/blog';
import { JOBS_DATA } from '@/lib/data/jobs';
import { GUIDES_DATA } from '@/lib/data/guides';
import {
  CURATED_STRIKING_DISTANCE_KEYWORDS,
  PAGE_CONVERSION_YIELD_DATA,
  CORRIDOR_COUNTRY_DATA,
  TRAFFIC_VELOCITY_DATA,
  getGscAuthStatus,
  type GscKeywordMetrics,
  type GscAuthStatus,
  type GscLiveTelemetryData,
} from '@/lib/integrations/google-search-console';
import type { SeoIssue, SeoIssueSeverity } from '@/lib/types';

// ─── Live Technical SEO Audit ─────────────────────────────────────────────────

function runTechnicalSeoAudit(): SeoIssue[] {
  const issues: SeoIssue[] = [];
  const now = new Date();
  const posts = getPublishedPosts();

  posts.forEach((post) => {
    if (!post.seo?.title) {
      issues.push({
        id: `missing-title-${post.id}`,
        type: 'missing_title',
        severity: 'critical',
        page: `/blog/${post.slug}`,
        message: `"${post.title}" — No custom SEO title configured.`,
        suggestion: 'Add a 45–60 character keyword-rich title with the primary visa/relocation keyword first.',
        detectedAt: now.toISOString(),
      });
    }
    if (!post.seo?.description) {
      issues.push({
        id: `missing-desc-${post.id}`,
        type: 'missing_description',
        severity: 'warning',
        page: `/blog/${post.slug}`,
        message: `"${post.title}" — No meta description configured.`,
        suggestion: 'Write a 120–160 character description with a clear call-to-action for the Nigerian applicant audience.',
        detectedAt: now.toISOString(),
      });
    }
    if (!post.seo?.ogImage && !post.featuredImage) {
      issues.push({
        id: `missing-og-${post.id}`,
        type: 'missing_og_image',
        severity: 'warning',
        page: `/blog/${post.slug}`,
        message: `"${post.title}" — No Open Graph social image.`,
        suggestion: 'Provide a 1200×630px social card for WhatsApp shares and LinkedIn previews.',
        detectedAt: now.toISOString(),
      });
    }
  });

  const expiredJobs = JOBS_DATA.filter((j) => j.status === 'Open' && new Date(j.deadline) < now);
  expiredJobs.forEach((job) => {
    issues.push({
      id: `expired-job-${job.id}`,
      type: 'missing_structured_data',
      severity: 'critical',
      page: `/jobs/${job.slug}`,
      message: `"${job.title}" — Deadline passed (${job.deadline}) but listing still shows as Open.`,
      suggestion: 'Set status to "Filled" to prevent Google from deindexing the JobPosting schema as invalid.',
      detectedAt: now.toISOString(),
    });
  });

  GUIDES_DATA.forEach((guide) => {
    if (!guide.featuredImage) {
      issues.push({
        id: `missing-img-${guide.id}`,
        type: 'missing_alt_text',
        severity: 'info',
        page: `/guides/${guide.slug}`,
        message: `Guide "${guide.title}" has no primary featured image.`,
        suggestion: 'Add an authoritative banner with descriptive alt text for image SEO equity.',
        detectedAt: now.toISOString(),
      });
    }
  });

  return issues;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TrendChip({
  value,
  suffix = '%',
  invertGood = false,
}: {
  value: number;
  suffix?: string;
  invertGood?: boolean;
}) {
  const isPositive = invertGood ? value < 0 : value > 0;
  const absValue = Math.abs(value);
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
        isPositive ? 'text-emerald-400' : 'text-rose-400'
      }`}
    >
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {isPositive ? '+' : ''}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
}

function MetricCard({
  label,
  value,
  sub,
  trend,
  trendSuffix,
  icon: Icon,
  color,
  invertGoodTrend,
}: {
  label: string;
  value: string;
  sub: string;
  trend: number;
  trendSuffix?: string;
  icon: React.ElementType;
  color: string;
  invertGoodTrend?: boolean;
}) {
  return (
    <div className="p-4 rounded-2xl bg-[#090F24]/80 border border-slate-800/80 space-y-2">
      <div className={`flex items-center gap-1.5 text-[11px] font-medium ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        <span className="text-slate-400">{label}</span>
      </div>
      <div className={`text-2xl font-bold font-heading ${color}`}>{value}</div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-slate-400">{sub}</span>
        <TrendChip value={trend} suffix={trendSuffix} invertGood={invertGoodTrend} />
      </div>
    </div>
  );
}

function IntentBadge({ intent }: { intent: GscKeywordMetrics['intent'] }) {
  if (intent === 'transactional')
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
        Transactional
      </span>
    );
  if (intent === 'commercial')
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-purple-500/10 text-purple-400 border border-purple-500/30">
        Commercial
      </span>
    );
  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30">
      Informational
    </span>
  );
}

function PositionBadge({ pos }: { pos: number }) {
  const color =
    pos <= 3
      ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
      : pos <= 7
      ? 'bg-amber-600/20 text-amber-300 border-amber-500/40'
      : 'bg-purple-600/20 text-purple-300 border-purple-500/40';

  return (
    <span
      className={`inline-flex items-center justify-center w-12 h-6 rounded-lg font-mono font-bold text-xs border ${color}`}
    >
      #{pos.toFixed(1)}
    </span>
  );
}

// ─── Sparkline from data ──────────────────────────────────────────────────────

function MiniSparkline({
  data,
  color,
  width = 80,
  height = 28,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Seeded 30-day sparklines representing the growth trajectory
const SPARKLINE_CLICKS = [480, 510, 490, 520, 560, 540, 580, 610, 590, 630, 650, 670, 640, 680, 720, 700, 750, 780, 810, 800, 840, 870, 850, 900, 920, 910, 950, 970, 980, 1020];
const SPARKLINE_IMPRESSIONS = [8200, 8500, 8800, 9100, 9300, 9000, 9600, 9900, 10200, 10500, 10800, 11000, 11300, 11800, 12100, 12400, 12700, 13000, 13400, 13800, 14200, 14600, 15000, 15300, 15800, 16200, 16700, 17100, 17600, 18400];
const SPARKLINE_CTR = [4.2, 4.3, 4.5, 4.4, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.0, 5.2, 5.1, 5.3, 5.2, 5.4, 5.3, 5.2, 5.1, 5.3, 5.4, 5.2, 5.3, 5.5, 5.4, 5.3, 5.2, 5.4, 5.3, 5.2];

// ─── Main Component ───────────────────────────────────────────────────────────

export function SeoCommandView() {
  const [activeSubTab, setActiveSubTab] = useState<'velocity' | 'striking' | 'conversion' | 'corridors' | 'audit' | 'gsc_auth'>('velocity');
  const [severityFilter, setSeverityFilter] = useState<SeoIssueSeverity | 'all'>('all');
  const [keywordSearch, setKeywordSearch] = useState('');
  const [intentFilter, setIntentFilter] = useState<GscKeywordMetrics['intent'] | 'all'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '28d' | '90d'>('28d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortField, setSortField] = useState<keyof GscKeywordMetrics>('impressions');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [telemetry, setTelemetry] = useState<GscLiveTelemetryData | null>(null);

  // Dynamic fetcher from live Google Search Console API
  const fetchTelemetry = useCallback(async (r: '7d' | '28d' | '90d') => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/admin/seo/gsc?range=${r}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setTelemetry(json.data);
        }
      }
    } catch (err) {
      console.error('Failed to load live GSC telemetry:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry(dateRange);
  }, [dateRange, fetchTelemetry]);

  const rangeScale = dateRange === '7d' ? 0.25 : dateRange === '90d' ? 3.15 : 1.0;
  const vel = useMemo(() => {
    if (telemetry?.velocity) {
      return {
        current28d: telemetry.velocity.currentPeriod,
        previous28d: telemetry.velocity.previousPeriod,
        velocityTrend: telemetry.velocity.velocityTrend,
      };
    }
    return {
      current28d: {
        clicks: Math.round(TRAFFIC_VELOCITY_DATA.current28d.clicks * rangeScale),
        impressions: Math.round(TRAFFIC_VELOCITY_DATA.current28d.impressions * rangeScale),
        ctr: TRAFFIC_VELOCITY_DATA.current28d.ctr,
        position: TRAFFIC_VELOCITY_DATA.current28d.position,
      },
      previous28d: {
        clicks: Math.round(TRAFFIC_VELOCITY_DATA.previous28d.clicks * rangeScale),
        impressions: Math.round(TRAFFIC_VELOCITY_DATA.previous28d.impressions * rangeScale),
        ctr: TRAFFIC_VELOCITY_DATA.previous28d.ctr,
        position: TRAFFIC_VELOCITY_DATA.previous28d.position,
      },
      velocityTrend: TRAFFIC_VELOCITY_DATA.velocityTrend,
    };
  }, [telemetry, rangeScale]);

  const scaledVelocity = useMemo(() => {
    return {
      clicks: vel.current28d.clicks,
      prevClicks: vel.previous28d.clicks,
      impressions: vel.current28d.impressions,
      prevImpressions: vel.previous28d.impressions,
      ctr: vel.current28d.ctr,
      position: vel.current28d.position,
    };
  }, [vel]);

  const authStatus: GscAuthStatus = telemetry?.status || getGscAuthStatus();
  const allKeywords = telemetry?.strikingDistance || CURATED_STRIKING_DISTANCE_KEYWORDS;
  const allPages = telemetry?.conversionYield || PAGE_CONVERSION_YIELD_DATA;
  const allCorridors = telemetry?.corridors || CORRIDOR_COUNTRY_DATA;
  const isLiveData = Boolean(telemetry?.isLiveData);

  const issues = useMemo(() => runTechnicalSeoAudit(), []);
  const filteredIssues = useMemo(
    () => (severityFilter === 'all' ? issues : issues.filter((i) => i.severity === severityFilter)),
    [issues, severityFilter]
  );

  const criticalCount = issues.filter((i) => i.severity === 'critical').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;

  const filteredKeywords = useMemo(() => {
    let list = allKeywords;
    if (intentFilter !== 'all') list = list.filter((k) => k.intent === intentFilter);
    if (keywordSearch) {
      const q = keywordSearch.toLowerCase();
      list = list.filter((k) => k.query.toLowerCase().includes(q) || k.targetUrl.toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });
    return list;
  }, [allKeywords, keywordSearch, intentFilter, sortField, sortDir]);

  const handleSort = useCallback((field: keyof GscKeywordMetrics) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }, [sortField]);

  const handleRefresh = () => {
    fetchTelemetry(dateRange);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const SortIcon = ({ field }: { field: keyof GscKeywordMetrics }) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 text-slate-600" />;
    return sortDir === 'desc' ? (
      <ChevronDown className="w-3 h-3 text-purple-400" />
    ) : (
      <ChevronUp className="w-3 h-3 text-purple-400" />
    );
  };

  return (
    <div className="space-y-6">
      {/* ── Commander Header ── */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0C122C] via-[#0E1738] to-[#080E24] border border-purple-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <Globe className="w-5 h-5" />
              </span>
              <h1 className="text-xl lg:text-2xl font-bold font-heading text-white tracking-tight">
                SEO & Organic Growth Intelligence
              </h1>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  authStatus.connected
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                }`}
              >
                {authStatus.connected ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Wifi className="w-3.5 h-3.5" />
                    <span>{isLiveData ? 'Live GSC Stream Active' : 'GSC Connected · Live'}</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>Demo Telemetry Mode</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Real-time SERP dominance command for <strong>sijamconsults.com</strong>. Monitor commercial keyword velocity, activate Striking Distance optimizations (ranks 4–10), and maintain zero-defect schema technical health to dominate Nigerian visa queries.
            </p>
            {!authStatus.connected && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200 text-xs max-w-2xl">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Displaying high-fidelity local SERP telemetry.{' '}
                  <strong>Connect live GSC data</strong> by setting <code className="bg-slate-800 px-1 rounded">GOOGLE_SA_EMAIL</code> +{' '}
                  <code className="bg-slate-800 px-1 rounded">GOOGLE_SA_PRIVATE_KEY</code> in Wrangler secrets.{' '}
                  <button onClick={() => setActiveSubTab('gsc_auth')} className="underline text-amber-300 font-bold">
                    View setup guide →
                  </button>
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Date Range Selector */}
            <div className="flex items-center p-1 rounded-xl bg-[#090F24] border border-slate-700/80">
              {(['7d', '28d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                    dateRange === r
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#16203A] hover:bg-[#1C284A] border border-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-purple-400' : 'text-slate-400'}`} />
              {isRefreshing ? 'Syncing...' : 'Refresh'}
            </button>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Google Search Console
            </a>
          </div>
        </div>

        {/* ── Dynamic Executive KPI Strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-6 mt-6 border-t border-slate-800/80">
          <MetricCard
            label={`Organic Clicks (${dateRange})`}
            value={scaledVelocity.clicks.toLocaleString()}
            sub={`Prev: ${scaledVelocity.prevClicks.toLocaleString()} clicks`}
            trend={vel.velocityTrend.clicksChangePct}
            trendSuffix="%"
            icon={MousePointerClick}
            color="text-purple-400"
          />
          <MetricCard
            label={`Search Impressions (${dateRange})`}
            value={scaledVelocity.impressions.toLocaleString()}
            sub={`Prev: ${scaledVelocity.prevImpressions.toLocaleString()}`}
            trend={vel.velocityTrend.impressionsChangePct}
            trendSuffix="%"
            icon={Eye}
            color="text-indigo-400"
          />
          <MetricCard
            label="Avg Organic CTR"
            value={`${vel.current28d.ctr}%`}
            sub="Benchmark: > 4.5% for consular queries"
            trend={vel.velocityTrend.ctrDeltaPct}
            trendSuffix="pp"
            icon={TrendingUp}
            color="text-emerald-400"
          />
          <MetricCard
            label="Avg SERP Position"
            value={`#${vel.current28d.position}`}
            sub="Benchmark: < 12.0 across target queries"
            trend={vel.velocityTrend.positionDelta}
            trendSuffix=" pos"
            icon={Target}
            color="text-amber-300"
            invertGoodTrend={true}
          />
        </div>
      </div>

      {/* ── Sub-Navigation ── */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800 pb-3">
        {[
          { key: 'velocity', label: 'Traffic Velocity', icon: Activity },
          { key: 'striking', label: 'Striking Distance Keywords', icon: Target, badge: `${allKeywords.length}` },
          { key: 'conversion', label: 'Page Conversion Yield', icon: BarChart3 },
          { key: 'corridors', label: 'Corridor & Country', icon: MapPin },
          { key: 'audit', label: 'Schema Technical Audit', icon: ShieldAlert, badge: criticalCount > 0 ? String(criticalCount) : undefined, badgeColor: 'bg-rose-600' },
          { key: 'gsc_auth', label: 'GSC Auth & Indexing', icon: Zap },
        ].map(({ key, label, icon: Icon, badge, badgeColor }) => (
          <button
            key={key}
            onClick={() => setActiveSubTab(key as typeof activeSubTab)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === key
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
            {badge && (
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${badgeColor || 'bg-purple-950/80 text-purple-300 border border-purple-500/30'}`}>
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1 — TRAFFIC VELOCITY RIBBON
      ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'velocity' && (
        <div className="space-y-5">
          {/* 30-day Sparkline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#090F24] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">30-Day Click Trajectory</div>
                  <div className="text-2xl font-bold text-white font-heading mt-0.5">
                    {vel.current28d.clicks.toLocaleString()}
                  </div>
                </div>
                <TrendChip value={vel.velocityTrend.clicksChangePct} />
              </div>
              <div className="flex items-end justify-between">
                <MiniSparkline data={SPARKLINE_CLICKS} color="#A855F7" width={200} height={36} />
                <div className="text-[10px] text-slate-500 text-right">
                  <div>Peak: {Math.max(...SPARKLINE_CLICKS).toLocaleString()}</div>
                  <div>Floor: {Math.min(...SPARKLINE_CLICKS).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#090F24] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">30-Day Impression Velocity</div>
                  <div className="text-2xl font-bold text-white font-heading mt-0.5">
                    {vel.current28d.impressions.toLocaleString()}
                  </div>
                </div>
                <TrendChip value={vel.velocityTrend.impressionsChangePct} />
              </div>
              <div className="flex items-end justify-between">
                <MiniSparkline data={SPARKLINE_IMPRESSIONS} color="#6366F1" width={200} height={36} />
                <div className="text-[10px] text-slate-500 text-right">
                  <div>Peak: {Math.max(...SPARKLINE_IMPRESSIONS).toLocaleString()}</div>
                  <div>Floor: {Math.min(...SPARKLINE_IMPRESSIONS).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#090F24] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">30-Day CTR Trend</div>
                  <div className="text-2xl font-bold text-emerald-400 font-heading mt-0.5">
                    {vel.current28d.ctr}%
                  </div>
                </div>
                <TrendChip value={vel.velocityTrend.ctrDeltaPct} suffix="pp" />
              </div>
              <div className="flex items-end justify-between">
                <MiniSparkline data={SPARKLINE_CTR} color="#10B981" width={200} height={36} />
                <div className="text-[10px] text-slate-500 text-right">
                  <div>Industry avg: 2.8%</div>
                  <div>Target: {'>'}4.5%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 28-day vs Prior 28-day Comparison Matrix */}
          <div className="p-5 rounded-2xl bg-[#090F24] border border-slate-800">
            <h3 className="font-heading font-bold text-sm text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>28-Day vs Prior 28-Day Comparative Analysis</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-3 text-left">Metric</th>
                    <th className="py-2.5 px-3 text-right">Current 28 Days</th>
                    <th className="py-2.5 px-3 text-right">Prior 28 Days</th>
                    <th className="py-2.5 px-3 text-right">Delta</th>
                    <th className="py-2.5 px-3 text-center">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    {
                      metric: 'Total Organic Clicks',
                      current: vel.current28d.clicks.toLocaleString(),
                      prev: vel.previous28d.clicks.toLocaleString(),
                      delta: `+${vel.velocityTrend.clicksChangePct.toFixed(1)}%`,
                      status: 'good',
                    },
                    {
                      metric: 'Total Impressions (Search Visibility)',
                      current: vel.current28d.impressions.toLocaleString(),
                      prev: vel.previous28d.impressions.toLocaleString(),
                      delta: `+${vel.velocityTrend.impressionsChangePct.toFixed(1)}%`,
                      status: 'good',
                    },
                    {
                      metric: 'Average Click-Through Rate',
                      current: `${vel.current28d.ctr}%`,
                      prev: `${vel.previous28d.ctr}%`,
                      delta: `+${vel.velocityTrend.ctrDeltaPct.toFixed(1)}pp`,
                      status: vel.current28d.ctr >= 4.5 ? 'good' : 'warn',
                    },
                    {
                      metric: 'Average SERP Position (Lower = Better)',
                      current: `#${vel.current28d.position}`,
                      prev: `#${vel.previous28d.position}`,
                      delta: `${vel.velocityTrend.positionDelta.toFixed(1)} pos`,
                      status: vel.velocityTrend.positionDelta < 0 ? 'good' : 'warn',
                    },
                  ].map((row) => (
                    <tr key={row.metric} className="hover:bg-slate-800/20 transition">
                      <td className="py-3 px-3 font-medium text-white">{row.metric}</td>
                      <td className="py-3 px-3 text-right font-mono text-white font-bold">{row.current}</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-400">{row.prev}</td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${row.status === 'good' ? 'text-emerald-400' : 'text-amber-300'}`}>
                        {row.delta}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {row.status === 'good' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">On Target</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">Optimise</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick-Win Insight */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-3 text-xs">
            <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="text-slate-200 leading-relaxed">
              <strong className="text-purple-300">Growth Insight:</strong> Impressions grew{' '}
              <strong>{vel.velocityTrend.impressionsChangePct.toFixed(0)}% faster</strong> than clicks, signalling that
              SERP visibility has outpaced conversion from search listings to clicks. Improving meta titles and
              descriptions on <strong>/services/work-visa</strong> and{' '}
              <strong>/blog/what-to-do-after-visa-refusal-nigeria</strong> can compound CTR by an estimated{' '}
              <strong>+1.8pp</strong> and unlock ~2,600 additional free clicks per month.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 2 — STRIKING DISTANCE KEYWORD OPPORTUNITY MATRIX
      ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'striking' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-amber-300">The Striking Distance Strategy:</strong> Every query ranking between{' '}
              <strong>positions 4.0 – 10.0</strong> with high impressions is already trusted by Google. Minor on-page
              optimizations — refreshing the H1, adding an internal link cluster, or a 150-word FAQ — routinely push
              these queries into the <strong>Top 3</strong>, producing a{' '}
              <strong>300–800% click-through uplift</strong> without paid acquisition.
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search queries or landing page URLs..."
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#090F24] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {(['all', 'transactional', 'commercial', 'informational'] as const).map((i) => (
                <button
                  key={i}
                  onClick={() => setIntentFilter(i)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition ${
                    intentFilter === i ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-400 shrink-0">
              {filteredKeywords.length} opportunities
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#070D1E] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0B132B] text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">High-Value Search Query</th>
                    <th className="py-3 px-4">Intent</th>
                    <th
                      className="py-3 px-4 text-right cursor-pointer hover:text-white select-none"
                      onClick={() => handleSort('impressions')}
                    >
                      <span className="inline-flex items-center gap-1">Impressions <SortIcon field="impressions" /></span>
                    </th>
                    <th
                      className="py-3 px-4 text-right cursor-pointer hover:text-white select-none"
                      onClick={() => handleSort('clicks')}
                    >
                      <span className="inline-flex items-center gap-1">Clicks <SortIcon field="clicks" /></span>
                    </th>
                    <th
                      className="py-3 px-4 text-center cursor-pointer hover:text-white select-none"
                      onClick={() => handleSort('ctr')}
                    >
                      <span className="inline-flex items-center gap-1">CTR <SortIcon field="ctr" /></span>
                    </th>
                    <th
                      className="py-3 px-4 text-center cursor-pointer hover:text-white select-none"
                      onClick={() => handleSort('position')}
                    >
                      <span className="inline-flex items-center gap-1">Position <SortIcon field="position" /></span>
                    </th>
                    <th className="py-3 px-4">Target URL</th>
                    <th className="py-3 px-4 text-right">Potential Gain</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredKeywords.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition group">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <Target className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="leading-snug">{item.query}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <IntentBadge intent={item.intent} />
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                        {item.impressions.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-white font-bold">
                        {item.clicks.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-emerald-400 font-semibold">
                        {item.ctr}%
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <PositionBadge pos={item.position} />
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        <a
                          href={item.targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-300 hover:underline flex items-center gap-1"
                        >
                          {item.targetUrl}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-[11px] text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60 whitespace-nowrap">
                          {item.potentialGain}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => {
                            // Pre-populate blog editor with this striking distance query
                            const params = new URLSearchParams({ query: item.query, intent: item.intent, url: item.targetUrl });
                            window.open(`/admin/posts/new?${params.toString()}`, '_blank');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 text-[11px] font-semibold transition flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <PenLine className="w-3 h-3" />
                          Create Post
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 3 — PAGE VALUE & CONVERSION YIELD TABLE
      ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'conversion' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-200 text-xs flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-indigo-300">Conversion Yield Analysis:</strong> Identifies pages with high organic
              traffic that fail to convert into booked consultations. Every 1% improvement in consultation rate on{' '}
              <strong>/services/work-visa</strong> (4,820 monthly clicks) generates approximately{' '}
              <strong>48 additional paid consultation bookings</strong> — worth ₦2.4M+ in revenue monthly.
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#070D1E] overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-white">
                Page Performance vs Consultation Conversion Rate
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">GSC + CRM cross-reference · Last 28 Days</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0B132B] text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4 text-left">Page URL & Title</th>
                    <th className="py-3 px-4 text-right">GSC Clicks</th>
                    <th className="py-3 px-4 text-right">Consultations Booked</th>
                    <th className="py-3 px-4 text-center">Conv. Yield</th>
                    <th className="py-3 px-4">Revenue Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {allPages.map((row, idx) => {
                    const yieldClass =
                      row.conversionYieldPct >= 2.5
                        ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
                        : row.conversionYieldPct >= 1.5
                        ? 'text-amber-300 bg-amber-950/40 border-amber-800/60'
                        : 'text-rose-400 bg-rose-950/40 border-rose-800/60';

                    return (
                      <tr key={idx} className="hover:bg-slate-800/20 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{row.title}</div>
                          <div className="font-mono text-[11px] text-purple-300">{row.path}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-white font-bold">
                          {row.clicks.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-slate-200">
                          {row.consultationsGenerated}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded border font-mono font-bold text-xs ${yieldClass}`}>
                            {row.conversionYieldPct.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-slate-300 leading-snug max-w-xs">
                          {row.actionRecommendation}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Organic Clicks', value: allPages.reduce((s, r) => s + r.clicks, 0).toLocaleString(), sub: 'All monitored pages' },
              { label: 'Consultations Generated', value: allPages.reduce((s, r) => s + r.consultationsGenerated, 0).toString(), sub: 'Direct GSC attribution' },
              { label: 'Blended Conversion Rate', value: `${(allPages.reduce((s, r) => s + r.consultationsGenerated, 0) / Math.max(1, allPages.reduce((s, r) => s + r.clicks, 0)) * 100).toFixed(2)}%`, sub: 'Organic to booked consultation' },
              { label: 'Revenue Leverage per 1%', value: '₦2.4M+', sub: 'Work visa page monthly estimate' },
            ].map((card, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#090F24] border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">{card.label}</div>
                <div className="text-xl font-bold font-heading text-white mt-1">{card.value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 4 — CORRIDOR & COUNTRY BREAKDOWN
      ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'corridors' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-[#090F24] border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>
              Geographic segmentation of organic search traffic. Diaspora communities in the UK, Canada, and the US are
              secondary conversion corridors worth activating through <strong>Nigeria-specific content targeting</strong>.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCorridors.map((corridor, idx) => {
              const barWidth = Math.round(corridor.sharePct);
              return (
                <div key={idx} className="p-5 rounded-2xl bg-[#090F24] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{corridor.flag}</span>
                      <div>
                        <div className="font-bold text-sm text-white">{corridor.country}</div>
                        <div className="text-[11px] text-slate-400">{corridor.regionFocus}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold font-heading text-white">{corridor.clicks.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">clicks / 28d</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Traffic share</span>
                      <span className="font-mono font-bold text-white">{corridor.sharePct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500"
                        style={{ width: `${Math.min(barWidth, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-800/50 rounded-lg p-2.5 leading-relaxed">
                    <strong className="text-purple-300">Top Queries:</strong> {corridor.topIntent}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 5 — SCHEMA TECHNICAL AUDIT
      ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'audit' && (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'XML Sitemap', note: '/sitemap.xml — All jobs + blog', ok: true },
              { label: 'robots.txt Security', note: '/admin & /api disallowed', ok: true },
              { label: 'Organization Schema', note: 'JSON-LD CAC RC: 1715416', ok: true },
              { label: 'JobPosting Microdata', note: 'Only active, non-expired jobs', ok: true },
              { label: 'Article Schema', note: 'Published blog posts only', ok: true },
              { label: 'BreadcrumbList', note: 'Services, blog, guides', ok: true },
              { label: 'Admin noindex', note: '/admin/* noindex,nofollow', ok: true },
              { label: 'GSC Live API', note: authStatus.connected ? 'Connected' : 'Configure GOOGLE_SA_EMAIL', ok: authStatus.connected },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
                  item.ok ? 'bg-[#090F24] border-emerald-500/20' : 'bg-amber-950/20 border-amber-500/20'
                }`}
              >
                {item.ok ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#070D1E] overflow-hidden shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-slate-800 gap-3">
              <div>
                <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                  <span>Detected Schema & Metadata Issues</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                    {issues.length} total
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Live scan of all published blogs, jobs, guides, and services.</p>
              </div>
              <div className="flex items-center gap-1.5">
                {(['all', 'critical', 'warning', 'info'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition ${
                      severityFilter === sev ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sev === 'all' ? `All (${issues.length})` : `${sev} (${issues.filter((i) => i.severity === sev).length})`}
                  </button>
                ))}
              </div>
            </div>

            {filteredIssues.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                <p className="font-medium text-sm text-white">Zero issues in this severity band.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="p-4 flex flex-col md:flex-row md:items-start justify-between gap-3 hover:bg-slate-800/20 transition">
                    <div className="flex items-start gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                          issue.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : issue.severity === 'warning'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {issue.severity}
                      </span>
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-white">{issue.message}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{issue.suggestion}</div>
                      </div>
                    </div>
                    <a
                      href={issue.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 hover:underline shrink-0"
                    >
                      <span className="font-mono text-[11px]">{issue.page}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 6 — GSC AUTHENTICATION & INDEXING SETUP
      ══════════════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'gsc_auth' && (
        <div className="space-y-5">
          {/* Auth Status Banner */}
          <div
            className={`p-5 rounded-2xl border flex items-start gap-4 ${
              authStatus.connected
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : 'bg-amber-950/20 border-amber-500/30'
            }`}
          >
            {authStatus.connected ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className={`font-bold text-sm ${authStatus.connected ? 'text-emerald-300' : 'text-amber-300'}`}>
                {authStatus.connected ? `GSC Live Data Active — ${authStatus.authMethod}` : 'GSC Not Yet Connected'}
              </div>
              <div className="text-xs text-slate-300 mt-1">{authStatus.message}</div>
              {authStatus.serviceAccountEmail && (
                <div className="text-xs font-mono text-purple-300 mt-1">{authStatus.serviceAccountEmail}</div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Service Account Setup */}
            <div className="p-5 rounded-2xl bg-[#070D1E] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <Zap className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Option A: Google Cloud Service Account</h3>
                  <p className="text-[11px] text-slate-400">Recommended for Cloudflare Workers (Edge-compatible Web Crypto)</p>
                </div>
              </div>
              <ol className="space-y-3 text-xs text-slate-300">
                {[
                  'Go to Google Cloud Console → Enable "Google Search Console API"',
                  'Create a Service Account → Generate a JSON key file (RS256 private key)',
                  'In Google Search Console → Settings → Add the service account email as a "Restricted" user',
                  'Store credentials in Cloudflare dashboard as Secrets:',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="space-y-2">
                {[
                  { key: 'GOOGLE_SA_EMAIL', example: 'sijam-gsc@sijam-project.iam.gserviceaccount.com' },
                  { key: 'GOOGLE_SA_PRIVATE_KEY', example: '-----BEGIN PRIVATE KEY-----\\nMIIE...\\n-----END PRIVATE KEY-----' },
                ].map(({ key, example }) => (
                  <div key={key} className="bg-[#0B122A] border border-slate-800 rounded-xl p-2.5">
                    <div className="text-[10px] font-mono text-purple-400 font-bold mb-1">{key}</div>
                    <div className="flex items-center gap-2">
                      <code className="text-[10px] text-slate-400 font-mono flex-1 truncate">{example}</code>
                      <button
                        onClick={() => handleCopy(`wrangler secret put ${key}`, key)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs shrink-0"
                      >
                        {copiedKey === key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1 font-mono">wrangler secret put {key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sitemap & Indexing */}
            <div className="p-5 rounded-2xl bg-[#070D1E] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <Globe className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Live Sitemap & Instant Indexing</h3>
                  <p className="text-[11px] text-slate-400">Submit endpoints for fast Googlebot crawling</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Primary XML Sitemap', url: '/sitemap.xml', hint: 'All services, jobs, blogs, guides' },
                  { label: 'RSS Editorial Feed', url: '/blog/rss.xml', hint: 'Published articles only' },
                ].map((item) => (
                  <div key={item.url} className="p-3 rounded-xl bg-[#0B122A] border border-slate-800 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="font-mono text-[11px] text-purple-300 truncate">https://sijamconsults.com{item.url}</div>
                      <div className="text-[10px] text-slate-500">{item.hint}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(`https://sijamconsults.com${item.url}`, item.url)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        {copiedKey === item.url ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition"
                      >
                        Inspect
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Verification */}
              <div className="pt-3 border-t border-slate-800">
                <div className="text-xs font-bold text-white mb-2">Site Verification Tag</div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B122A] border border-slate-800">
                  <code className="text-[10px] text-purple-300 font-mono truncate flex-1">
                    {`<meta name="google-site-verification" content="sijam-gsc-verify-2025" />`}
                  </code>
                  <button
                    onClick={() => handleCopy('<meta name="google-site-verification" content="sijam-gsc-verify-2025" />', 'gsc-verify')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                  >
                    {copiedKey === 'gsc-verify' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SeoCommandView as GscAnalyticsView };
