-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416) - Migration 20261024000001
-- PostgreSQL Time-Series Aggregation RPCs for Dashboard Sparklines
-- Cloudflare D1 / Supabase PostgreSQL compatible
-- ==============================================================================

-- ─── Ensure pgcrypto is available for any uuid generation ────────────────────
create extension if not exists "pgcrypto";

-- ─── get_daily_metrics_30d() ─────────────────────────────────────────────────
-- Returns the last 30 days of key daily activity counts for sparkline rendering
-- in the OverviewView executive dashboard.
--
-- Usage: SELECT * FROM get_daily_metrics_30d();
-- Returns: date, new_consultations, new_applications, new_enquiries, new_testimonials, new_blog_posts
-- ==============================================================================
create or replace function public.get_daily_metrics_30d()
returns table (
  metric_date    date,
  consultations  bigint,
  applications   bigint,
  enquiries      bigint,
  testimonials   bigint,
  blog_posts     bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with date_series as (
    select generate_series(
      current_date - interval '29 days',
      current_date,
      interval '1 day'
    )::date as d
  )
  select
    ds.d                                                          as metric_date,
    count(distinct cr.id) filter (where cr.created_at::date = ds.d) as consultations,
    count(distinct ja.id) filter (where ja.created_at::date = ds.d) as applications,
    count(distinct cm.id) filter (where cm.created_at::date = ds.d) as enquiries,
    count(distinct t.id)  filter (where t.created_at::date = ds.d)  as testimonials,
    count(distinct bp.id) filter (where bp.created_at::date = ds.d) as blog_posts
  from date_series ds
  left join public.consultation_requests cr on cr.created_at::date = ds.d
  left join public.job_applications       ja on ja.created_at::date = ds.d
  left join public.contact_messages       cm on cm.created_at::date = ds.d
  left join public.testimonials           t  on t.created_at::date  = ds.d and t.status = 'approved'
  left join public.blog_posts             bp on bp.created_at::date = ds.d and bp.status = 'published'
  group by ds.d
  order by ds.d asc;
$$;

-- Grant execute to authenticated and service role
grant execute on function public.get_daily_metrics_30d() to authenticated;
grant execute on function public.get_daily_metrics_30d() to service_role;
revoke execute on function public.get_daily_metrics_30d() from anon;

-- ─── get_weekly_consultation_funnel() ────────────────────────────────────────
-- Aggregates consultation status distribution for the revenue pipeline view
create or replace function public.get_weekly_consultation_funnel()
returns table (
  week_start date,
  status     text,
  count      bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    date_trunc('week', created_at)::date as week_start,
    status,
    count(*)                             as count
  from public.consultation_requests
  where created_at >= current_date - interval '12 weeks'
  group by date_trunc('week', created_at), status
  order by week_start asc, status;
$$;

grant execute on function public.get_weekly_consultation_funnel() to authenticated;
grant execute on function public.get_weekly_consultation_funnel() to service_role;
revoke execute on function public.get_weekly_consultation_funnel() from anon;

-- ─── get_top_performing_job_posts() ──────────────────────────────────────────
-- Returns job listings ranked by application density for the Talent Desk
create or replace function public.get_top_performing_job_posts(p_limit int default 10)
returns table (
  job_id           uuid,
  job_title        text,
  country          text,
  status           text,
  view_count       int,
  application_count int,
  conversion_rate  numeric
)
language sql
stable
security definer
set search_path = public
as $$
  select
    j.id                                                                     as job_id,
    j.title                                                                  as job_title,
    j.country,
    j.status,
    coalesce(j.view_count, 0)                                                as view_count,
    coalesce(j.application_count, 0)                                         as application_count,
    case
      when coalesce(j.view_count, 0) = 0 then 0
      else round((coalesce(j.application_count, 0)::numeric / j.view_count::numeric) * 100, 2)
    end                                                                      as conversion_rate
  from public.jobs j
  order by application_count desc nulls last
  limit p_limit;
$$;

grant execute on function public.get_top_performing_job_posts(int) to authenticated;
grant execute on function public.get_top_performing_job_posts(int) to service_role;
revoke execute on function public.get_top_performing_job_posts(int) from anon;

-- ─── Comment block for integration ───────────────────────────────────────────
comment on function public.get_daily_metrics_30d() is
  'Returns 30-day daily aggregate counts for OverviewView sparklines. Called via supabaseAdmin.rpc(''get_daily_metrics_30d'').';
comment on function public.get_weekly_consultation_funnel() is
  'Returns weekly consultation status distribution for Revenue Pipeline view.';
comment on function public.get_top_performing_job_posts(int) is
  'Returns top job listings ranked by application conversion rate for Talent Desk.';
