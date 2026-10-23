-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416) - Supabase PostgreSQL Schema Migration 06
-- Job Board Enhancements: Age Brackets, Corridors, Processing Times & Trades
-- ==============================================================================

alter table public.jobs
  add column if not exists age_requirement text,
  add column if not exists eligible_countries text[] default null,
  add column if not exists processing_time text,
  add column if not exists general_worker_sectors text[] default null;

comment on column public.jobs.age_requirement is 'Candidate age restriction bracket (e.g., "21 - 45 years")';
comment on column public.jobs.eligible_countries is 'Array of ISO/common country names permitted to apply, or null for global eligibility';
comment on column public.jobs.processing_time is 'Estimated consular and visa documentation processing timeframe (e.g., "1 - 2 Months")';
comment on column public.jobs.general_worker_sectors is 'Sub-sector trade specializations for General Worker roles (e.g. Construction, Agriculture, Plumbing)';
