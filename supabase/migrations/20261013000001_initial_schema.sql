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

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles for each row execute function public.handle_updated_at();

drop trigger if exists trg_services_updated_at on public.services;
create trigger trg_services_updated_at before update on public.services for each row execute function public.handle_updated_at();

drop trigger if exists trg_consultations_updated_at on public.consultation_requests;
create trigger trg_consultations_updated_at before update on public.consultation_requests for each row execute function public.handle_updated_at();

drop trigger if exists trg_appointments_updated_at on public.consultation_appointments;
create trigger trg_appointments_updated_at before update on public.consultation_appointments for each row execute function public.handle_updated_at();

drop trigger if exists trg_employers_updated_at on public.employers;
create trigger trg_employers_updated_at before update on public.employers for each row execute function public.handle_updated_at();

drop trigger if exists trg_jobs_updated_at on public.jobs;
create trigger trg_jobs_updated_at before update on public.jobs for each row execute function public.handle_updated_at();

drop trigger if exists trg_job_applications_updated_at on public.job_applications;
create trigger trg_job_applications_updated_at before update on public.job_applications for each row execute function public.handle_updated_at();

drop trigger if exists trg_testimonials_updated_at on public.testimonials;
create trigger trg_testimonials_updated_at before update on public.testimonials for each row execute function public.handle_updated_at();

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at before update on public.blog_posts for each row execute function public.handle_updated_at();

drop trigger if exists trg_partners_updated_at on public.partners;
create trigger trg_partners_updated_at before update on public.partners for each row execute function public.handle_updated_at();

drop trigger if exists trg_contact_messages_updated_at on public.contact_messages;
create trigger trg_contact_messages_updated_at before update on public.contact_messages for each row execute function public.handle_updated_at();
