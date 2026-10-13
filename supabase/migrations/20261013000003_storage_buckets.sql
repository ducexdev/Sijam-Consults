-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416) - Supabase PostgreSQL Schema Migration 03
-- Supabase Storage Buckets & Strict Access Policies
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Create Buckets
-- ------------------------------------------------------------------------------

-- Public marketing bucket for website logos, blog banners, team headshots
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'public-assets',
  'public-assets',
  true,
  10485760, -- 10MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif', 'application/pdf']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif', 'application/pdf'];

-- Private bucket for candidate resumes, transcripts, and confidential filings
-- CRITICAL PRIVACY: public is strictly FALSE. Signed URLs required.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'applicant-documents',
  'applicant-documents',
  false,
  15728640, -- 15MB
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 15728640,
  allowed_mime_types = array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];

-- ------------------------------------------------------------------------------
-- 2. Storage Access Policies
-- ------------------------------------------------------------------------------

-- Public Assets: Anyone can download / view
drop policy if exists "Public view public assets" on storage.objects;
create policy "Public view public assets"
  on storage.objects
  for select
  using (bucket_id = 'public-assets');

-- Public Assets: Only staff can upload / update / delete
drop policy if exists "Staff upload public assets" on storage.objects;
create policy "Staff upload public assets"
  on storage.objects
  for insert
  with check (bucket_id = 'public-assets' and public.is_staff());

drop policy if exists "Staff manage public assets" on storage.objects;
create policy "Staff manage public assets"
  on storage.objects
  for all
  using (bucket_id = 'public-assets' and public.is_staff());

-- Applicant Documents: Public candidates can upload CV/resume during job application
drop policy if exists "Candidates can upload resume documents" on storage.objects;
create policy "Candidates can upload resume documents"
  on storage.objects
  for insert
  with check (bucket_id = 'applicant-documents');

-- Applicant Documents: ONLY authorized recruitment staff and admins can view / download
drop policy if exists "Recruitment staff view applicant documents" on storage.objects;
create policy "Recruitment staff view applicant documents"
  on storage.objects
  for select
  using (
    bucket_id = 'applicant-documents'
    and public.has_role(array['super_admin', 'admin', 'recruitment_manager'])
  );

-- Applicant Documents: Delete / update restricted to Super Admins
drop policy if exists "Admins manage applicant documents" on storage.objects;
create policy "Admins manage applicant documents"
  on storage.objects
  for all
  using (
    bucket_id = 'applicant-documents'
    and public.has_role(array['super_admin', 'admin'])
  );
