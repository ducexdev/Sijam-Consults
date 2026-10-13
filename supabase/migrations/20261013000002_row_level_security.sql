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
