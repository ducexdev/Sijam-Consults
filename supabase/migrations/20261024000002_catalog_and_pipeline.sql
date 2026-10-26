-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416) - Migration 20261024000002
-- Catalog Governance (Services & Corporate Partners) & Commercial Retainer Pipeline
-- Cloudflare D1 / Supabase PostgreSQL compatible
-- ==============================================================================

create extension if not exists "pgcrypto";

-- ─── 1. Services Catalog Table ────────────────────────────────────────────────
-- Create table if not exists, and broaden constraints if it already exists from earlier migrations
create table if not exists public.services (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  title               text not null,
  short_title         text not null,
  service_group       text not null default 'Immigration & Relocation',
  tagline             text not null default '',
  hero_headline       text not null default '',
  summary             text not null default '',
  badge               text,
  who_is_this_for     text[] not null default '{}',
  assistance_offered  text[] not null default '{}',
  key_benefits        text[] not null default '{}',
  requirements        text[] not null default '{}',
  process_steps       jsonb not null default '[]'::jsonb,
  faqs                jsonb not null default '[]'::jsonb,
  related_services    text[] not null default '{}',
  video_url           text,
  video_poster        text,
  disclaimer          text not null default 'Notice of Statutory Independence: Sijam Consults Limited facilitates file preparation and consular filing protocols. We do not guarantee visa or employment outcomes.',
  is_published        boolean not null default true,
  display_order       integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Drop legacy restrictive category check if present from initial schema
alter table public.services drop constraint if exists services_service_group_check;

-- Ensure required columns exist if the table was created by an earlier migration
alter table public.services add column if not exists is_published boolean not null default true;
alter table public.services add column if not exists display_order integer not null default 0;

-- ─── 2. Corporate Partners Table ──────────────────────────────────────────────
-- Create corporate_partners table for institutional B2B representations
create table if not exists public.corporate_partners (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  category            text not null,
  country             text not null,
  logo_url            text,
  description         text not null,
  collaboration_scope text not null,
  website_url         text,
  is_active           boolean not null default true,
  display_order       integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Drop legacy restrictive category check on partners table if present from initial schema
alter table public.partners drop constraint if exists partners_category_check;

-- ─── 3. Retainer Deals Pipeline Table ─────────────────────────────────────────
create table if not exists public.retainer_deals (
  id                       uuid primary key default gen_random_uuid(),
  reference_code           text unique not null,
  client_id                uuid references public.profiles(id) on delete set null,
  client_name              text not null,
  client_email             text not null,
  client_phone             text not null,
  service_category         text not null,
  target_corridor          text not null,
  deal_value_usd           numeric(12,2) not null default 0,
  deal_value_ngn           numeric(14,2) not null default 0,
  stage                    text not null default 'initial_assessment',
  consultation_fee_paid    boolean not null default false,
  retainer_amount_paid_usd numeric(12,2) not null default 0,
  invoice_reference        text,
  payment_gateway          text,
  payment_verified_at      timestamptz,
  assigned_officer_id      uuid references public.profiles(id) on delete set null,
  assigned_officer_name    text,
  contract_signed_at       timestamptz,
  filing_date              timestamptz,
  expected_decision_date   timestamptz,
  decision_outcome         text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ─── 4. Row Level Security & Governance ───────────────────────────────────────
alter table public.services enable row level security;
alter table public.corporate_partners enable row level security;
alter table public.retainer_deals enable row level security;

-- Services Policies (Idempotent Drop + Create)
drop policy if exists "Allow public read published services" on public.services;
create policy "Allow public read published services"
  on public.services for select
  using (is_published = true or (auth.jwt() ->> 'role') in ('admin', 'super_admin'));

drop policy if exists "Allow staff full write on services" on public.services;
create policy "Allow staff full write on services"
  on public.services for all
  using ((auth.jwt() ->> 'role') in ('admin', 'super_admin'))
  with check ((auth.jwt() ->> 'role') in ('admin', 'super_admin'));

-- Corporate Partners Policies (Idempotent Drop + Create)
drop policy if exists "Allow public read active partners" on public.corporate_partners;
create policy "Allow public read active partners"
  on public.corporate_partners for select
  using (is_active = true or (auth.jwt() ->> 'role') in ('admin', 'super_admin'));

drop policy if exists "Allow staff full write on partners" on public.corporate_partners;
create policy "Allow staff full write on partners"
  on public.corporate_partners for all
  using ((auth.jwt() ->> 'role') in ('admin', 'super_admin'))
  with check ((auth.jwt() ->> 'role') in ('admin', 'super_admin'));

-- Retainer Deals Policies (Staff & Case Officers Only)
drop policy if exists "Allow staff read retainer deals" on public.retainer_deals;
create policy "Allow staff read retainer deals"
  on public.retainer_deals for select
  using ((auth.jwt() ->> 'role') in ('admin', 'super_admin', 'advisor'));

drop policy if exists "Allow staff write retainer deals" on public.retainer_deals;
create policy "Allow staff write retainer deals"
  on public.retainer_deals for all
  using ((auth.jwt() ->> 'role') in ('admin', 'super_admin', 'advisor'))
  with check ((auth.jwt() ->> 'role') in ('admin', 'super_admin', 'advisor'));

-- Grants
grant select on public.services to anon, authenticated;
grant all on public.services to service_role;
grant select on public.corporate_partners to anon, authenticated;
grant all on public.corporate_partners to service_role;
grant all on public.retainer_deals to authenticated, service_role;
