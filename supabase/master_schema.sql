-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416) - Supabase PostgreSQL Schema Migration 01
-- Initial Normalized Database Architecture
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. Profiles & Administrative Roles
-- ------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  role text not null check (role in (
    'super_admin',
    'admin',
    'consultation_manager',
    'recruitment_manager',
    'content_editor',
    'reviewer_moderator'
  )) default 'content_editor',
  department text,
  phone text,
  avatar_url text,
  password_hash text,
  salt text,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_email on public.profiles(email);

-- ------------------------------------------------------------------------------
-- 2. Services Catalog
-- ------------------------------------------------------------------------------
create table if not exists public.services (
  id text primary key, -- e.g. 'study-visa', 'work-visa'
  slug text not null unique,
  title text not null,
  short_title text not null,
  service_group text not null check (service_group in ('Academic', 'Employment', 'Tourism', 'Corporate', 'Logistics')),
  tagline text not null,
  hero_headline text not null,
  summary text not null,
  badge text,
  who_is_this_for jsonb not null default '[]'::jsonb,
  assistance_offered jsonb not null default '[]'::jsonb,
  key_benefits jsonb not null default '[]'::jsonb,
  requirements jsonb not null default '[]'::jsonb,
  process_steps jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  related_services text[] not null default '{}',
  video_url text,
  video_poster text,
  disclaimer text not null,
  is_published boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_services_slug on public.services(slug);
create index if not exists idx_services_group on public.services(service_group);

-- ------------------------------------------------------------------------------
-- 3. Inbound Consultation Requests & Workflow
-- ------------------------------------------------------------------------------
create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique, -- e.g. 'SJM-849201'
  service_slug text not null references public.services(slug) on delete restrict,
  target_destination text,
  applicant_objective text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_method text not null check (preferred_method in ('in_person_kaduna', 'whatsapp_video', 'google_meet', 'phone_call')),
  preferred_date date,
  preferred_time_slot text,
  notes text,
  status text not null check (status in ('new', 'assigned', 'contacted', 'scheduled', 'completed', 'cancelled', 'archived')) default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text,
  follow_up_date date,
  ip_hash text,
  submission_source text default 'website_wizard',
  ndpr_consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_consultations_status on public.consultation_requests(status);
create index if not exists idx_consultations_assigned on public.consultation_requests(assigned_to);
create index if not exists idx_consultations_email on public.consultation_requests(email);
create index if not exists idx_consultations_created on public.consultation_requests(created_at desc);

-- Appointments scheduled from consultation requests
create table if not exists public.consultation_appointments (
  id uuid primary key default gen_random_uuid(),
  consultation_request_id uuid not null references public.consultation_requests(id) on delete cascade,
  scheduled_at timestamptz not null,
  duration_minutes int not null default 45,
  meeting_method text not null check (meeting_method in ('in_person_kaduna', 'whatsapp_video', 'google_meet', 'phone_call')),
  meeting_link_or_room text,
  officer_id uuid references public.profiles(id) on delete set null,
  status text not null check (status in ('scheduled', 'rescheduled', 'conducted', 'no_show', 'cancelled')) default 'scheduled',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_appointments_request on public.consultation_appointments(consultation_request_id);
create index if not exists idx_appointments_scheduled on public.consultation_appointments(scheduled_at);

-- Consultation Status Audit Trail
create table if not exists public.consultation_status_history (
  id uuid primary key default gen_random_uuid(),
  consultation_request_id uuid not null references public.consultation_requests(id) on delete cascade,
  from_status text not null,
  to_status text not null,
  changed_by uuid references public.profiles(id) on delete set null,
  reason_or_note text,
  created_at timestamptz not null default now()
);

create index if not exists idx_consultation_history_req on public.consultation_status_history(consultation_request_id);

-- ------------------------------------------------------------------------------
-- 4. Job Categories, Verified Employers, Jobs & Applications
-- ------------------------------------------------------------------------------
create table if not exists public.job_categories (
  id text primary key, -- e.g. 'healthcare-nursing', 'information-technology'
  name text not null unique,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.employers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null,
  city text not null,
  registration_number text,
  website_url text,
  contact_email text,
  verification_status text not null check (verification_status in ('verified', 'under_review', 'unverified')) default 'under_review',
  verified_by uuid references public.profiles(id) on delete set null,
  verification_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  employer_id uuid references public.employers(id) on delete restrict,
  employer_name text not null, -- denormalized for search & fallback
  is_employer_verified boolean not null default true,
  category_id text not null references public.job_categories(id) on delete restrict,
  country text not null,
  location text not null,
  employment_type text not null check (employment_type in ('Full-time', 'Contract', 'Seasonal', 'Apprenticeship')),
  salary_range text,
  age_requirement text,
  eligible_countries text[],
  processing_time text,
  general_worker_sectors text[],
  description text not null,
  responsibilities jsonb not null default '[]'::jsonb,
  eligibility_requirements jsonb not null default '[]'::jsonb,
  visa_support_details text not null,
  application_instructions text not null,
  deadline date not null,
  status text not null check (status in ('draft', 'scheduled', 'open', 'paused', 'closing_soon', 'closed', 'expired')) default 'draft',
  accepts_applications boolean not null default true,
  published_at timestamptz,
  view_count int not null default 0,
  application_count int not null default 0,
  disclaimer text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_jobs_slug on public.jobs(slug);
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_jobs_category on public.jobs(category_id);
create index if not exists idx_jobs_deadline on public.jobs(deadline);

-- Private Candidate Job Applications
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique, -- e.g. 'APP-519284'
  job_id uuid not null references public.jobs(id) on delete restrict,
  job_slug text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  city_country text not null,
  highest_education text not null,
  years_experience text not null,
  portfolio_url text,
  cover_note text,
  resume_file_url text,
  resume_file_path text,
  confirmed_no_guarantees boolean not null default true,
  ndpr_consent boolean not null default true,
  status text not null check (status in ('submitted', 'screening', 'shortlisted', 'submitted_to_employer', 'interviewing', 'offered', 'rejected', 'withdrawn')) default 'submitted',
  reviewed_by uuid references public.profiles(id) on delete set null,
  internal_notes text,
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_job_apps_job on public.job_applications(job_id);
create index if not exists idx_job_apps_status on public.job_applications(status);
create index if not exists idx_job_apps_email on public.job_applications(email);
create index if not exists idx_job_apps_created on public.job_applications(created_at desc);

-- Application Status History Audit Trail
create table if not exists public.job_application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.job_applications(id) on delete cascade,
  from_status text not null,
  to_status text not null,
  changed_by uuid references public.profiles(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- 5. Testimonials & Moderation Engine
-- ------------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_title text,
  location text not null,
  category text not null check (category in ('Study Visa', 'Work Permit', 'Schengen Business', 'Tourist Visa', 'Document Legalization')),
  destination_country text not null,
  rating int not null check (rating >= 1 and rating <= 5) default 5,
  quote text not null,
  full_story text,
  verified_approval_date date,
  proof_type text not null check (proof_type in ('stamp', 'video', 'corporate', 'written')) default 'written',
  proof_media_url text,
  proof_thumbnail text,
  author_avatar_url text,
  is_redacted_compliant boolean not null default true,
  permission_to_publish boolean not null default true,
  privacy_acknowledged boolean not null default true,
  status text not null check (status in ('pending_moderation', 'approved', 'rejected', 'archived')) default 'pending_moderation',
  rejection_reason text,
  moderated_by uuid references public.profiles(id) on delete set null,
  moderated_at timestamptz,
  is_featured boolean not null default false,
  display_order int not null default 0,
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_testimonials_status on public.testimonials(status);
create index if not exists idx_testimonials_category on public.testimonials(category);
create index if not exists idx_testimonials_featured on public.testimonials(is_featured);

create table if not exists public.testimonial_moderation (
  id uuid primary key default gen_random_uuid(),
  testimonial_id uuid not null references public.testimonials(id) on delete cascade,
  moderator_id uuid references public.profiles(id) on delete set null,
  action text not null check (action in ('approved', 'rejected', 'edited', 'archived')),
  notes text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- 6. Blog, Travel Guides & Revision History
-- ------------------------------------------------------------------------------
create table if not exists public.blog_categories (
  id text primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  post_type text not null check (post_type in ('guide', 'blog', 'news')) default 'guide',
  title text not null,
  summary text not null,
  category_id text not null references public.blog_categories(id) on delete restrict,
  content_html text,
  key_takeaways jsonb not null default '[]'::jsonb,
  sections jsonb not null default '[]'::jsonb,
  featured_image text not null,
  read_time_minutes int not null default 5,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text not null,
  author_role text not null,
  author_avatar text,
  status text not null check (status in ('draft', 'scheduled', 'published', 'archived')) default 'draft',
  published_at timestamptz,
  meta_title text,
  meta_description text,
  canonical_url text,
  tags text[] not null default '{}',
  view_count int not null default 0,
  current_version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_blog_slug on public.blog_posts(slug);
create index if not exists idx_blog_status on public.blog_posts(status);
create index if not exists idx_blog_category on public.blog_posts(category_id);
create index if not exists idx_blog_published on public.blog_posts(published_at desc);

-- Revision History for Blog & Guides
create table if not exists public.blog_revisions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  version int not null,
  title text not null,
  summary text not null,
  content_html text,
  sections jsonb not null default '[]'::jsonb,
  key_takeaways jsonb not null default '[]'::jsonb,
  revised_by uuid references public.profiles(id) on delete set null,
  change_summary text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------------------
-- 7. Media Asset Catalog
-- ------------------------------------------------------------------------------
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  original_name text not null,
  bucket text not null check (bucket in ('public-assets', 'applicant-documents')),
  storage_path text not null unique,
  file_size_bytes bigint not null,
  mime_type text not null,
  alt_text text,
  is_public boolean not null default true,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_media_bucket on public.media_assets(bucket);

-- ------------------------------------------------------------------------------
-- 8. Partners, FAQs & Contact Messages
-- ------------------------------------------------------------------------------
create table if not exists public.partners (
  id text primary key,
  name text not null,
  category text not null check (category in ('University', 'Accreditation Body', 'Commercial Enterprise', 'Media Partner')),
  country text not null,
  logo_url text not null,
  description text not null,
  collaboration_scope text not null,
  website_url text,
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  service_slug text references public.services(slug) on delete set null,
  category text not null default 'General',
  question text not null,
  answer text not null,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  service_category text not null,
  message text not null,
  status text not null check (status in ('new', 'in_progress', 'replied', 'closed')) default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  reply_notes text,
  ip_hash text,
  ndpr_consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contact_status on public.contact_messages(status);

-- ------------------------------------------------------------------------------
-- 9. Transactional Notifications, Settings, Redirects & Audit Logs
-- ------------------------------------------------------------------------------
create table if not exists public.notification_records (
  id uuid primary key default gen_random_uuid(),
  recipient_email text not null,
  recipient_name text,
  template_name text not null,
  subject text not null,
  status text not null check (status in ('queued', 'sent', 'failed')) default 'queued',
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  category text not null check (category in ('general', 'consultation', 'jobs', 'smtp', 'notifications', 'privacy')),
  description text,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.redirects (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique,
  destination_path text not null,
  status_code int not null check (status_code in (301, 302, 307, 308)) default 308,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_metadata (
  id uuid primary key default gen_random_uuid(),
  route_path text not null unique,
  meta_title text not null,
  meta_description text not null,
  og_title text,
  og_description text,
  og_image_url text,
  canonical_url text,
  keywords text,
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  user_email text,
  action text not null, -- e.g. 'consultation.assign', 'job.publish', 'user.role_change'
  entity_type text not null, -- e.g. 'consultation_request', 'job', 'testimonial'
  entity_id text not null,
  details jsonb not null default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_user on public.audit_logs(user_id);
create index if not exists idx_audit_entity on public.audit_logs(entity_type, entity_id);
create index if not exists idx_audit_created on public.audit_logs(created_at desc);

-- ------------------------------------------------------------------------------
-- 10. Automated Timestamp Triggers
-- ------------------------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles cascade;
create or replace trigger trg_profiles_updated_at before update on public.profiles for each row execute function public.handle_updated_at();

drop trigger if exists trg_services_updated_at on public.services cascade;
create or replace trigger trg_services_updated_at before update on public.services for each row execute function public.handle_updated_at();

drop trigger if exists trg_consultations_updated_at on public.consultation_requests cascade;
create or replace trigger trg_consultations_updated_at before update on public.consultation_requests for each row execute function public.handle_updated_at();

drop trigger if exists trg_appointments_updated_at on public.consultation_appointments cascade;
create or replace trigger trg_appointments_updated_at before update on public.consultation_appointments for each row execute function public.handle_updated_at();

drop trigger if exists trg_employers_updated_at on public.employers cascade;
create or replace trigger trg_employers_updated_at before update on public.employers for each row execute function public.handle_updated_at();

drop trigger if exists trg_jobs_updated_at on public.jobs cascade;
create or replace trigger trg_jobs_updated_at before update on public.jobs for each row execute function public.handle_updated_at();

drop trigger if exists trg_job_applications_updated_at on public.job_applications cascade;
create or replace trigger trg_job_applications_updated_at before update on public.job_applications for each row execute function public.handle_updated_at();

drop trigger if exists trg_testimonials_updated_at on public.testimonials cascade;
create or replace trigger trg_testimonials_updated_at before update on public.testimonials for each row execute function public.handle_updated_at();

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts cascade;
create or replace trigger trg_blog_posts_updated_at before update on public.blog_posts for each row execute function public.handle_updated_at();

drop trigger if exists trg_partners_updated_at on public.partners cascade;
create or replace trigger trg_partners_updated_at before update on public.partners for each row execute function public.handle_updated_at();

drop trigger if exists trg_contact_messages_updated_at on public.contact_messages cascade;
create or replace trigger trg_contact_messages_updated_at before update on public.contact_messages for each row execute function public.handle_updated_at();
-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416) - Supabase PostgreSQL Schema Migration 02
-- Row Level Security (RLS) Policies & Role-Based Access Controls
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Helper Security Functions
-- ------------------------------------------------------------------------------

-- Get current authenticated user's assigned role from public.profiles
create or replace function public.current_profile_role()
returns text as $$
  select role from public.profiles
  where id = auth.uid() and is_active = true;
$$ language sql stable security definer;

-- Check if current authenticated user has one of the specified roles
create or replace function public.has_role(allowed_roles text[])
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active = true
      and role = any(allowed_roles)
  );
$$ language sql stable security definer;

-- Is user any active staff / admin member
create or replace function public.is_staff()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active = true
  );
$$ language sql stable security definer;

-- ------------------------------------------------------------------------------
-- 2. Enable RLS on All Tables
-- ------------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.consultation_requests enable row level security;
alter table public.consultation_appointments enable row level security;
alter table public.consultation_status_history enable row level security;
alter table public.job_categories enable row level security;
alter table public.employers enable row level security;
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.job_application_status_history enable row level security;
alter table public.testimonials enable row level security;
alter table public.testimonial_moderation enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_revisions enable row level security;
alter table public.media_assets enable row level security;
alter table public.partners enable row level security;
alter table public.faqs enable row level security;
alter table public.contact_messages enable row level security;
alter table public.notification_records enable row level security;
alter table public.site_settings enable row level security;
alter table public.redirects enable row level security;
alter table public.seo_metadata enable row level security;
alter table public.audit_logs enable row level security;

-- ------------------------------------------------------------------------------
-- 3. Profiles Policies
-- ------------------------------------------------------------------------------
-- Super admins can read and manage all profiles
drop policy if exists "Super Admins manage all profiles" on public.profiles;
create policy "Super Admins manage all profiles"
  on public.profiles
  for all
  using (public.has_role(array['super_admin']));

-- Staff can view all active staff profiles (e.g. for assignment dropdowns)
drop policy if exists "Staff can view staff profiles" on public.profiles;
create policy "Staff can view staff profiles"
  on public.profiles
  for select
  using (public.is_staff());

-- Users can update their own profile details
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 4. Services Policies
-- ------------------------------------------------------------------------------
-- Anyone can view published services
drop policy if exists "Public can view published services" on public.services;
create policy "Public can view published services"
  on public.services
  for select
  using (is_published = true or public.is_staff());

-- Content editors & Admins can manage services
drop policy if exists "Editors manage services" on public.services;
create policy "Editors manage services"
  on public.services
  for all
  using (public.has_role(array['super_admin', 'admin', 'content_editor']));

-- ------------------------------------------------------------------------------
-- 5. Consultation Engine Policies (Public submission, Staff management)
-- ------------------------------------------------------------------------------
-- Public visitors can submit consultation requests without an account
drop policy if exists "Public can submit consultation requests" on public.consultation_requests;
create policy "Public can submit consultation requests"
  on public.consultation_requests
  for insert
  with check (true);

-- Staff with consultation permissions can view, update and manage requests
drop policy if exists "Consultation managers view requests" on public.consultation_requests;
create policy "Consultation managers view requests"
  on public.consultation_requests
  for select
  using (public.has_role(array['super_admin', 'admin', 'consultation_manager']));

drop policy if exists "Consultation managers update requests" on public.consultation_requests;
create policy "Consultation managers update requests"
  on public.consultation_requests
  for update
  using (public.has_role(array['super_admin', 'admin', 'consultation_manager']));

-- Consultation appointments
drop policy if exists "Consultation managers view appointments" on public.consultation_appointments;
create policy "Consultation managers view appointments"
  on public.consultation_appointments
  for select
  using (public.has_role(array['super_admin', 'admin', 'consultation_manager']));

drop policy if exists "Consultation managers manage appointments" on public.consultation_appointments;
create policy "Consultation managers manage appointments"
  on public.consultation_appointments
  for all
  using (public.has_role(array['super_admin', 'admin', 'consultation_manager']));

-- Consultation status history
drop policy if exists "Consultation managers view status history" on public.consultation_status_history;
create policy "Consultation managers view status history"
  on public.consultation_status_history
  for select
  using (public.has_role(array['super_admin', 'admin', 'consultation_manager']));

drop policy if exists "Staff insert consultation status history" on public.consultation_status_history;
create policy "Staff insert consultation status history"
  on public.consultation_status_history
  for insert
  with check (public.is_staff());

-- ------------------------------------------------------------------------------
-- 6. Job Engine & Private Candidate Applications Policies
-- ------------------------------------------------------------------------------
-- Job Categories: Public read active, Managers full control
drop policy if exists "Public can view active job categories" on public.job_categories;
create policy "Public can view active job categories"
  on public.job_categories
  for select
  using (is_active = true or public.is_staff());

drop policy if exists "Recruitment managers manage job categories" on public.job_categories;
create policy "Recruitment managers manage job categories"
  on public.job_categories
  for all
  using (public.has_role(array['super_admin', 'admin', 'recruitment_manager']));

-- Employers: Public view verified, Managers full control
drop policy if exists "Public can view verified employers" on public.employers;
create policy "Public can view verified employers"
  on public.employers
  for select
  using (verification_status = 'verified' or public.is_staff());

drop policy if exists "Recruitment managers manage employers" on public.employers;
create policy "Recruitment managers manage employers"
  on public.employers
  for all
  using (public.has_role(array['super_admin', 'admin', 'recruitment_manager']));

-- Jobs: Public can view active published jobs
drop policy if exists "Public can view open published jobs" on public.jobs;
create policy "Public can view open published jobs"
  on public.jobs
  for select
  using (
    (status in ('open', 'closing_soon') and (published_at is null or published_at <= now()))
    or public.is_staff()
  );

drop policy if exists "Recruitment managers manage jobs" on public.jobs;
create policy "Recruitment managers manage jobs"
  on public.jobs
  for all
  using (public.has_role(array['super_admin', 'admin', 'recruitment_manager']));

-- CRITICAL PRIVACY BOUNDARY: Private Job Applications
-- Public candidates can INSERT applications for open jobs
drop policy if exists "Public candidates can submit applications" on public.job_applications;
create policy "Public candidates can submit applications"
  on public.job_applications
  for insert
  with check (true);

-- Candidates' data and CVs can ONLY be accessed by authorized recruitment staff
drop policy if exists "Recruitment managers view job applications" on public.job_applications;
create policy "Recruitment managers view job applications"
  on public.job_applications
  for select
  using (public.has_role(array['super_admin', 'admin', 'recruitment_manager']));

drop policy if exists "Recruitment managers update job applications" on public.job_applications;
create policy "Recruitment managers update job applications"
  on public.job_applications
  for update
  using (public.has_role(array['super_admin', 'admin', 'recruitment_manager']));

drop policy if exists "Staff view application status history" on public.job_application_status_history;
create policy "Staff view application status history"
  on public.job_application_status_history
  for select
  using (public.has_role(array['super_admin', 'admin', 'recruitment_manager']));

drop policy if exists "Staff insert application status history" on public.job_application_status_history;
create policy "Staff insert application status history"
  on public.job_application_status_history
  for insert
  with check (public.is_staff());

-- ------------------------------------------------------------------------------
-- 7. Testimonial Engine Policies (Submission, Moderation, Public Approved)
-- ------------------------------------------------------------------------------
-- Public can view ONLY approved reviews
drop policy if exists "Public can view approved testimonials" on public.testimonials;
create policy "Public can view approved testimonials"
  on public.testimonials
  for select
  using (status = 'approved' or public.is_staff());

-- Public can submit reviews (status defaults to pending_moderation)
drop policy if exists "Public can submit reviews" on public.testimonials;
create policy "Public can submit reviews"
  on public.testimonials
  for insert
  with check (status = 'pending_moderation');

-- Reviewer / Moderators manage testimonials
drop policy if exists "Moderators manage testimonials" on public.testimonials;
create policy "Moderators manage testimonials"
  on public.testimonials
  for all
  using (public.has_role(array['super_admin', 'admin', 'reviewer_moderator']));

drop policy if exists "Moderators manage testimonial moderation log" on public.testimonial_moderation;
create policy "Moderators manage testimonial moderation log"
  on public.testimonial_moderation
  for all
  using (public.has_role(array['super_admin', 'admin', 'reviewer_moderator']));

-- ------------------------------------------------------------------------------
-- 8. Content, Guides & Blog Policies
-- ------------------------------------------------------------------------------
drop policy if exists "Public can view published blog posts" on public.blog_posts;
create policy "Public can view published blog posts"
  on public.blog_posts
  for select
  using (
    (status = 'published' and (published_at is null or published_at <= now()))
    or public.is_staff()
  );

drop policy if exists "Content editors manage blog posts" on public.blog_posts;
create policy "Content editors manage blog posts"
  on public.blog_posts
  for all
  using (public.has_role(array['super_admin', 'admin', 'content_editor']));

drop policy if exists "Public view blog categories" on public.blog_categories;
create policy "Public view blog categories"
  on public.blog_categories for select using (true);

drop policy if exists "Content editors manage blog categories" on public.blog_categories;
create policy "Content editors manage blog categories"
  on public.blog_categories for all
  using (public.has_role(array['super_admin', 'admin', 'content_editor']));

drop policy if exists "Public view blog tags" on public.blog_tags;
create policy "Public view blog tags"
  on public.blog_tags for select using (true);

drop policy if exists "Content editors manage blog tags" on public.blog_tags;
create policy "Content editors manage blog tags"
  on public.blog_tags for all
  using (public.has_role(array['super_admin', 'admin', 'content_editor']));

drop policy if exists "Staff view blog revisions" on public.blog_revisions;
create policy "Staff view blog revisions"
  on public.blog_revisions for select
  using (public.is_staff());

drop policy if exists "Staff insert blog revisions" on public.blog_revisions;
create policy "Staff insert blog revisions"
  on public.blog_revisions for insert
  with check (public.is_staff());

-- ------------------------------------------------------------------------------
-- 9. Partners, FAQs & Contact Messages Policies
-- ------------------------------------------------------------------------------
drop policy if exists "Public view active partners" on public.partners;
create policy "Public view active partners"
  on public.partners for select
  using (is_active = true or public.is_staff());

drop policy if exists "Editors manage partners" on public.partners;
create policy "Editors manage partners"
  on public.partners for all
  using (public.has_role(array['super_admin', 'admin', 'content_editor']));

drop policy if exists "Public view published faqs" on public.faqs;
create policy "Public view published faqs"
  on public.faqs for select
  using (is_published = true or public.is_staff());

drop policy if exists "Editors manage faqs" on public.faqs;
create policy "Editors manage faqs"
  on public.faqs for all
  using (public.has_role(array['super_admin', 'admin', 'content_editor']));

-- Public contact messages
drop policy if exists "Public submit contact message" on public.contact_messages;
create policy "Public submit contact message"
  on public.contact_messages for insert
  with check (true);

drop policy if exists "Staff view contact messages" on public.contact_messages;
create policy "Staff view contact messages"
  on public.contact_messages for select
  using (public.is_staff());

drop policy if exists "Staff manage contact messages" on public.contact_messages;
create policy "Staff manage contact messages"
  on public.contact_messages for update
  using (public.is_staff());

-- ------------------------------------------------------------------------------
-- 10. Settings, Media, Notifications & Audit Logs Policies
-- ------------------------------------------------------------------------------
-- Site settings: Public can read select public configs, Super admin manages
drop policy if exists "Public read public settings" on public.site_settings;
create policy "Public read public settings"
  on public.site_settings for select
  using (category in ('general', 'privacy') or public.is_staff());

drop policy if exists "Super admin manage settings" on public.site_settings;
create policy "Super admin manage settings"
  on public.site_settings for all
  using (public.has_role(array['super_admin', 'admin']));

-- Redirects: Public read active redirects
drop policy if exists "Public read active redirects" on public.redirects;
create policy "Public read active redirects"
  on public.redirects for select
  using (is_active = true or public.is_staff());

drop policy if exists "Admins manage redirects" on public.redirects;
create policy "Admins manage redirects"
  on public.redirects for all
  using (public.has_role(array['super_admin', 'admin']));

-- SEO Metadata: Public read
drop policy if exists "Public read seo metadata" on public.seo_metadata;
create policy "Public read seo metadata"
  on public.seo_metadata for select using (true);

drop policy if exists "Admins manage seo metadata" on public.seo_metadata;
create policy "Admins manage seo metadata"
  on public.seo_metadata for all
  using (public.has_role(array['super_admin', 'admin', 'content_editor']));

-- Media assets catalog
drop policy if exists "Public view public media assets" on public.media_assets;
create policy "Public view public media assets"
  on public.media_assets for select
  using (is_public = true or public.is_staff());

drop policy if exists "Staff manage media assets" on public.media_assets;
create policy "Staff manage media assets"
  on public.media_assets for all
  using (public.is_staff());

-- Notification records & Audit logs: strictly administrative
drop policy if exists "Staff view notification records" on public.notification_records;
create policy "Staff view notification records"
  on public.notification_records for select
  using (public.has_role(array['super_admin', 'admin']));

drop policy if exists "Super Admin view audit logs" on public.audit_logs;
create policy "Super Admin view audit logs"
  on public.audit_logs for select
  using (public.has_role(array['super_admin', 'admin']));

drop policy if exists "Staff insert audit logs" on public.audit_logs;
create policy "Staff insert audit logs"
  on public.audit_logs for insert
  with check (public.is_staff());
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
-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416) - Supabase PostgreSQL Schema Migration 04
-- Seed Data: Site Settings, Services, Employers, Jobs, Testimonials, Guides, Redirects
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Site Settings (Default Company Parameters & cPanel SMTP Config)
-- ------------------------------------------------------------------------------
insert into public.site_settings (key, value, category, description) values
('company_profile', '{
  "name": "Sijam Consults Limited",
  "legalName": "Sijam Consults Limited",
  "cacNumber": "RC: 1715416",
  "tagline": "Bridging You to Global Opportunities with Integrity and Institutional Precision",
  "address": "Suite A10, 2/4 Kachia Road, Kaduna, Nigeria",
  "primaryPhone": "+234 706 422 9556",
  "secondaryPhone": "+234 802 856 2200",
  "whatsappNumber": "2347064229556",
  "primaryEmail": "info@sijamconsults.com",
  "supportEmail": "support@sijamconsults.com",
  "operatingHours": "Monday - Friday: 9:00 AM - 5:00 PM WAT | Saturday: 10:00 AM - 2:00 PM WAT"
}'::jsonb, 'general', 'Core corporate identity and Kaduna office coordinates'),

('smtp_settings', '{
  "host": "mail.sijamconsults.com",
  "port": 465,
  "secure": true,
  "user": "notifications@sijamconsults.com",
  "fromEmail": "notifications@sijamconsults.com",
  "fromName": "Sijam Consults Limited Notifications",
  "internalNotificationEmail": "info@sijamconsults.com",
  "enabled": false
}'::jsonb, 'smtp', 'cPanel SMTP outbound mail server settings for transactional receipts and alerts'),

('regulatory_disclaimers', '{
  "immigration": "Sijam Consults Limited (RC: 1715416) is a registered Nigerian educational advisory and travel facilitation consultancy. We are NOT an embassy, consulate, or sovereign visa-issuing authority. The final grant or refusal of any visa or permit remains the sole statutory prerogative of respective foreign governments. We strictly prohibit falsified documentation.",
  "employment": "Sijam Consults provides visa facilitation, file review, and logistical coordination for verified job opportunities. We do NOT guarantee employment, job placements, or visa grants, and we never charge illegal placement fees."
}'::jsonb, 'privacy', 'Statutory compliance disclaimers across all public inquiry touchpoints')
on conflict (key) do nothing;

-- ------------------------------------------------------------------------------
-- 2. Job Categories & Verified Employers
-- ------------------------------------------------------------------------------
insert into public.job_categories (id, name, slug, description, display_order) values
('healthcare-nursing', 'Healthcare & Nursing', 'healthcare-nursing', 'Certified hospital positions, general nursing, and elderly care in Europe', 1),
('information-technology', 'Information Technology', 'information-technology', 'Software engineering, fintech development, and cloud systems', 2),
('engineering-construction', 'Engineering & Construction', 'engineering-construction', 'Civil, mechanical, structural and infrastructure development', 3),
('hospitality-tourism', 'Hospitality & Tourism', 'hospitality-tourism', 'Hotel management, culinary arts, and guest relations', 4),
('skilled-trades', 'Skilled Trades', 'skilled-trades', 'Certified MIG/MAG welding, fabrication, electrical, and mechanics', 5),
('agriculture-processing', 'Agriculture & Processing', 'agriculture-processing', 'Commercial greenhouse cultivation and agricultural processing', 6)
on conflict (id) do nothing;

insert into public.employers (id, name, country, city, registration_number, website_url, contact_email, verification_status, verification_notes) values
('e1000000-0000-0000-0000-000000000001', 'EuroMed Care Sp. z o.o.', 'Poland', 'Krakow', 'KRS: 0000849201', 'https://euromedcare.example.pl', 'hr@euromedcare.example.pl', 'verified', 'Accredited southern Poland hospital network. Voivodeship labor permit registered.'),
('e1000000-0000-0000-0000-000000000002', 'FinNova Technologies Poland', 'Poland', 'Warsaw', 'KRS: 0000912384', 'https://finnova.example.pl', 'careers@finnova.example.pl', 'verified', 'Fintech engineering center in Warsaw with labor quota approvals.'),
('e1000000-0000-0000-0000-000000000003', 'StavInvest Slovakia s.r.o.', 'Slovakia', 'Bratislava', 'ICO: 52918204', 'https://stavinvest.example.sk', 'recruiting@stavinvest.example.sk', 'verified', 'Heavy industrial fabrication facility with official Ministry of Labor quotas.')
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 3. Verified Initial Jobs
-- ------------------------------------------------------------------------------
insert into public.jobs (
  id, slug, title, employer_id, employer_name, is_employer_verified, category_id,
  country, location, employment_type, salary_range, description,
  responsibilities, eligibility_requirements, visa_support_details,
  application_instructions, deadline, status, accepts_applications,
  disclaimer
) values
(
  'a1000000-0000-0000-0000-000000000001',
  'registered-general-nurse-poland-healthcare',
  'Registered General Nurse (Hospital Placement)',
  'e1000000-0000-0000-0000-000000000001',
  'EuroMed Care Sp. z o.o.',
  true,
  'healthcare-nursing',
  'Poland',
  'Krakow, Poland',
  'Full-time',
  '€2,400 – €3,200 / month (gross)',
  'EuroMed Care, an accredited regional healthcare network in southern Poland, is recruiting certified international Registered General Nurses for acute inpatient wards. Successful candidates undergo paid Polish language onboarding and supervised clinical orientation.',
  '["Deliver patient-centered nursing care in accordance with European clinical standards.", "Administer prescribed medications, monitor vital signs, and maintain electronic clinical records.", "Participate in hospital interdisciplinary team rounds and patient rehabilitation planning.", "Engage in intensive professional Polish language adaptation courses sponsored by the employer."]'::jsonb,
  '["Bachelor of Nursing Science (BNSc) or Registered Nurse (RN) diploma with current NMCN license.", "Minimum of 2 years post-qualification clinical experience in a hospital environment.", "Clean criminal record and verifiable professional references.", "Willingness to commit to language immersion and medical licensure adaptation in Poland."]'::jsonb,
  'The employer issues a formal Voivodeship labor permit authorization and provides subsidized initial accommodation. Sijam Consults provides independent document attestation, file audit, and Polish consular visa advisory.',
  'Submit your CV, NMCN license copy, and degree certificate. Shortlisted applicants will be invited for an initial English interview with hospital human resources.',
  '2026-11-30',
  'open',
  true,
  'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate file preparation and consular filing protocols. We are not an employer and do not guarantee hiring or visa issuance. Hiring decisions are made strictly by EuroMed Care.'
),
(
  'a1000000-0000-0000-0000-000000000002',
  'fullstack-software-engineer-warsaw',
  'Fullstack Software Engineer (TypeScript & Next.js)',
  'e1000000-0000-0000-0000-000000000002',
  'FinNova Technologies Poland',
  true,
  'information-technology',
  'Poland',
  'Warsaw, Poland',
  'Full-time',
  '€3,500 – €5,000 / month',
  'FinNova is a high-growth fintech building modern banking rails across Central Europe. We seek an experienced Fullstack Engineer with proven Next.js, Node.js, and PostgreSQL expertise for our Warsaw engineering hub.',
  '["Architect and build customer-facing web applications with React 19, Next.js, and TypeScript.", "Design robust RESTful and GraphQL APIs integrated with secure banking microservices.", "Participate in agile sprint ceremonies, code reviews, and DevOps automation."]'::jsonb,
  '["3+ years of professional software engineering experience.", "Deep fluency in modern TypeScript, React, Next.js, and relational databases.", "Strong written and spoken English communication skills.", "Demonstrated portfolio or GitHub contributions."]'::jsonb,
  'Employer sponsors the full Polish Type-A work permit and relocation allowance. Sijam Consults handles the consular dossier and apostille attestation.',
  'Submit your resume, GitHub profile link, and relevant work history.',
  '2026-12-15',
  'open',
  true,
  'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate file preparation and consular filing protocols. We are not an employer and do not guarantee hiring or visa issuance.'
),
(
  'a1000000-0000-0000-0000-000000000003',
  'certified-mig-mag-welder-slovakia',
  'Certified MIG/MAG Welder (Industrial Infrastructure)',
  'e1000000-0000-0000-0000-000000000003',
  'StavInvest Slovakia s.r.o.',
  true,
  'skilled-trades',
  'Slovakia',
  'Bratislava, Slovakia',
  'Full-time',
  '€1,800 – €2,500 / month (net) + overtime',
  'StavInvest Slovakia is contracting certified MIG/MAG 135/136 welders for heavy steel structural bridges and commercial facility fabrication in Bratislava.',
  '["Execute high-precision fillet and butt welds on structural carbon steel assemblies.", "Interpret technical blueprints and ISO welding specifications.", "Maintain weld quality under non-destructive testing (NDT) inspection standards."]'::jsonb,
  '["Valid ISO 9606-1 or AWS welding certification in 135 or 136 processes.", "Minimum 3 years demonstrable workshop or industrial fabrication experience.", "Ability to pass an on-site practical welding trial prior to final dispatch."]'::jsonb,
  'Slovak national work authorization issued directly by the Central Office of Labor. Employer provides company housing and flights.',
  'Submit certified trade diplomas, past weld test certifications, and copy of international passport.',
  '2026-11-20',
  'open',
  true,
  'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate file preparation and consular filing protocols. We do not guarantee employment outcomes.'
)
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 4. Blog Categories & Seed Articles
-- ------------------------------------------------------------------------------
insert into public.blog_categories (id, name, slug, description, display_order) values
('study-abroad', 'Study Abroad', 'study-abroad', 'International student admissions, scholarships, and university visa guides', 1),
('work-relocation', 'Work Relocation', 'work-relocation', 'Legal foreign work authorizations, employer sponsorship, and credential conversion', 2),
('business-mobility', 'Business Mobility', 'business-mobility', 'European company incorporation, commercial treaties, and Schengen director visas', 3),
('immigration-policies', 'Immigration Policies', 'immigration-policies', 'Forensic analyses of foreign consular regulations and refusal prevention', 4)
on conflict (id) do nothing;

insert into public.blog_posts (
  id, slug, post_type, title, summary, category_id,
  featured_image, read_time_minutes, author_name, author_role, author_avatar,
  status, published_at, tags, key_takeaways, sections
) values
(
  'b1000000-0000-0000-0000-000000000001',
  'nursing-in-canada',
  'guide',
  'Why Study Nursing in Canada: 2026/2027 Admission & License Pathway',
  'A forensic roadmap for Nigerian registered nurses and secondary school leavers looking to build high-earning healthcare careers in Canada through legitimate academic pathways.',
  'study-abroad',
  '/blogs/Why-Study-Nursing-in-Canada-20262027.png',
  7,
  'James Samson',
  'Managing Director & Principal Consultant',
  '/team/James-Samson.png',
  'published',
  now() - interval '30 days',
  array['Canada', 'Nursing', 'Study Abroad', 'Post-Graduation Work Permit'],
  '["Canadian provinces face severe nursing deficits, leading to designated PR retention pathways.", "Bridging programs exist for Nigerian-trained RNs seeking NNAS credential equivalency.", "Proof of funds must clearly demonstrate liquid living expenses alongside paid first-year tuition.", "Sijam Consults helps structure compliant SOPs highlighting intent to return upon graduation."]'::jsonb,
  '[
    {"heading": "The Global Demand for Healthcare Talent", "content": "Canada continues to prioritize international healthcare professionals across British Columbia, Ontario, Alberta, and Saskatchewan. For Nigerian nurses, transitioning via post-graduate clinical nursing certificates or direct Bachelor of Science in Nursing (BScN) degrees provides an accredited foundation with legal work rights during and after studies."},
    {"heading": "Direct Admission vs. Bridging Programs", "content": "If you already hold an RN license from the Nursing and Midwifery Council of Nigeria (NMCN), direct license conversion through the National Nursing Assessment Service (NNAS) can be time-consuming. Enrolling in a Canadian Designated Learning Institution (DLI) for a 2-year post-graduate nursing specialization allows you to study, adapt to Canadian clinical software systems, and sit for the NCLEX-RN exam with high first-time pass rates."},
    {"heading": "Overcoming Common Study Visa Refusal Grounds", "content": "The most frequent refusal reason issued under Section 216(1)(b) of the Immigration and Refugee Protection Regulations (IRPR) is \"lack of ties to home country\" and \"unreasonable study plan\". To counter this, your Statement of Purpose (SOP) must demonstrate how the advanced Canadian curriculum directly fills specific healthcare administration voids in Nigeria."}
  ]'::jsonb
),
(
  'b1000000-0000-0000-0000-000000000002',
  'schengen-d-visa',
  'guide',
  'European Corporate Setup & Schengen D-Visa: Guide for African Founders',
  'How Nigerian business owners can legally incorporate a Polish Sp. z o.o., access European banking rails, and obtain long-stay residency across 27 Schengen countries.',
  'business-mobility',
  '/blogs/Ducex-Blog.png',
  6,
  'Blessing Attabor',
  'Head of Operations & Senior Consultant',
  '/team/Blessing-Attabor.png',
  'published',
  now() - interval '45 days',
  array['Poland', 'Business Incorporation', 'Schengen D-Visa', 'Residency'],
  '["Incorporate without physical presence via verified notarial or electronic KRS portals.", "Poland offers a 9% Corporate Income Tax (CIT) rate for small qualifying companies.", "Board directors are eligible to file for National Type-D residency visas.", "Validates European corporate bank accounts for international import/export contracts."]'::jsonb,
  '[
    {"heading": "Why Poland is Central Europe’s Commercial Bridge", "content": "Poland has emerged as a premier European commercial bridge. With transparent commercial company laws and access to the 450-million-consumer European Single Market, an incorporated Sp. z o.o. gives African entrepreneurs institutional legitimacy that traditional offshore registrations lack."},
    {"heading": "Statutory Registration Steps", "content": "Registration requires drafting formal Articles of Association, assigning PKD economic activity codes, securing a registered office address in Warsaw or Krakow, and registering with the National Court Register (KRS), REGON statistical agency, and Tax Office (NIP)."},
    {"heading": "Securing the Schengen D-Type Director Visa", "content": "Once the company is entered into the KRS register, executive directors can apply for a National D-Type visa. This multi-entry visa grants full residency in Poland and 90-day per 180-day visa-free mobility across Germany, France, Italy, and all other Schengen nations."}
  ]'::jsonb
)
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 5. Approved Initial Testimonials
-- ------------------------------------------------------------------------------
insert into public.testimonials (
  id, client_name, client_title, location, category, destination_country,
  rating, quote, full_story, verified_approval_date, proof_type,
  proof_media_url, is_redacted_compliant, permission_to_publish, status, is_featured
) values
(
  'c1000000-0000-0000-0000-000000000001',
  'Emeka O.',
  'MSc Computer Science Student',
  'Kaduna, Nigeria',
  'Study Visa',
  'Poland',
  5,
  'Sijam Consults handled my admission into the College of Economics and Computer Science in Poland without any stress. They reviewed my transcript, guided my tuition deposit, and coached me through the embassy interview. My visa was approved in 4 weeks!',
  'After a disappointing refusal with another agent in Lagos who didn’t understand Polish bank statement requirements, Sijam audited my entire file. They pointed out the discrepancy in my sponsor affidavit, helped me correct it at the High Court, and I walked into the embassy confident. True professionals.',
  '2026-08-12',
  'video',
  '/videos/WhatsApp Video 2026-10-12 at 10.45.26 AM.mp4',
  true,
  true,
  'approved',
  true
),
(
  'c1000000-0000-0000-0000-000000000002',
  'Dr. Amina Y.',
  'Healthcare Executive',
  'Abuja, Nigeria',
  'Schengen Business',
  'Poland',
  5,
  'We incorporated our European distributor branch in Warsaw with Sijam Consults. They got our KRS registration, tax ID, and director D-visa sorted out faster than we anticipated. The team in Kaduna is thoroughly transparent.',
  'Establishing corporate bank accounts in Central Europe used to be notoriously difficult for West African businesses. Sijam’s legal counsel arranged the power of attorney and notarial certifications seamlessly.',
  '2026-07-19',
  'stamp',
  '/visas/10-1.png',
  true,
  true,
  'approved',
  true
),
(
  'c1000000-0000-0000-0000-000000000003',
  'Sunday A.',
  'Skilled Structural Fabricator',
  'Kaduna, Nigeria',
  'Work Permit',
  'Slovakia',
  5,
  'I went through Sijam Consults for my trade verification and work permit filing in Slovakia. No hidden fees, no false promises. They prepared me for the embassy interview, and I received my national D-visa on schedule.',
  'As a certified welder, I had been scammed previously by agents promising instant Canadian visas. Sijam was honest from day one: they verified my actual trade test credentials and processed a real employer quota.',
  '2026-09-02',
  'stamp',
  '/visas/1.png',
  true,
  true,
  'approved',
  true
)
on conflict (id) do nothing;

-- ------------------------------------------------------------------------------
-- 6. Initial Redirects Mapping (Preserving Legacy WordPress URLs)
-- ------------------------------------------------------------------------------
insert into public.redirects (source_path, destination_path, status_code, is_active, notes) values
('/about-us', '/about', 308, true, 'Legacy WordPress about page'),
('/study-visa', '/services/study-visa', 308, true, 'Legacy study visa page'),
('/work-permit-and-employment-placement-visa', '/services/work-visa', 308, true, 'Legacy long-slug work permit page'),
('/tourist-visa-2', '/services/tourist-visa', 308, true, 'Legacy duplicate permalink'),
('/tourist-visa', '/services/tourist-visa', 308, true, 'Legacy tourist visa page'),
('/visa-application-assistance', '/services/visa-assistance', 308, true, 'Legacy visa assistance page'),
('/business-company-registration', '/services/business-registration', 308, true, 'Legacy business registration page'),
('/foreign-company-registration', '/services/business-registration', 308, true, 'Legacy foreign company registration alias'),
('/travel-document-legalization', '/services/document-legalization', 308, true, 'Legacy document legalization page'),
('/flight-reservation-ticketing', '/services/flight-reservations', 308, true, 'Legacy flight reservation page'),
('/flight-reservation-and-ticketing', '/services/flight-reservations', 308, true, 'Legacy flight ticketing alias'),
('/contact-us', '/contact', 308, true, 'Legacy contact page'),
('/what-clients-say', '/reviews', 308, true, 'Legacy client reviews page'),
('/immigration-and-travel-guides', '/guides', 308, true, 'Legacy guides index'),
('/travel-guides', '/guides', 308, true, 'Legacy travel guides alias'),
('/privacy-policy', '/privacy', 308, true, 'Legacy privacy policy'),
('/terms-and-conditions', '/terms', 308, true, 'Legacy terms and conditions'),
('/cookie-preferences', '/cookies', 308, true, 'Legacy cookie preferences')
on conflict (source_path) do nothing;
-- ==============================================================================
-- SIJAM Consults Limited (RC: 1715416)
-- Migration 005: Durable Email Outbox, Notification History, and Contact Messages
-- ==============================================================================

-- 1. Create Outbox Status Enum
DO $$ BEGIN
  CREATE TYPE email_outbox_status AS ENUM (
    'pending',
    'queued',
    'sending',
    'sent',
    'failed',
    'retrying'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Email Outbox Table (Durable Queue & Retry Architecture)
CREATE TABLE IF NOT EXISTS email_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  template_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT NOT NULL,
  idempotency_key TEXT UNIQUE,
  status email_outbox_status NOT NULL DEFAULT 'pending',
  attempt_count INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  last_attempt_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for worker polling and status dashboard
CREATE INDEX IF NOT EXISTS idx_email_outbox_status_created ON email_outbox(status, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_email_outbox_recipient ON email_outbox(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_outbox_idempotency ON email_outbox(idempotency_key);

-- 3. Row Level Security for Outbox
ALTER TABLE email_outbox ENABLE ROW LEVEL SECURITY;

-- Deny all public access to outbox
drop policy if exists "Deny public access to email_outbox" on email_outbox;
CREATE POLICY "Deny public access to email_outbox"
  ON email_outbox FOR ALL
  TO anon
  USING (false);

-- Authorized staff can read outbox for operational visibility
drop policy if exists "Authorized staff can read email_outbox" on email_outbox;
CREATE POLICY "Authorized staff can read email_outbox"
  ON email_outbox FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('super_admin', 'admin', 'consultation_manager')
    )
  );

-- Service role has full access for background worker dispatch
drop policy if exists "Service role full access to email_outbox" on email_outbox;
CREATE POLICY "Service role full access to email_outbox"
  ON email_outbox FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Automated updated_at trigger for email_outbox
DROP TRIGGER IF EXISTS update_email_outbox_updated_at ON email_outbox CASCADE;
CREATE OR REPLACE TRIGGER update_email_outbox_updated_at
  BEFORE UPDATE ON email_outbox
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
