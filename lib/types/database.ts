// ==============================================================================
// SIJAM Consults Limited (RC: 1715416) - Normalized Supabase Database Types
// ==============================================================================

export type AdminRole =
  | 'super_admin'
  | 'admin'
  | 'consultation_manager'
  | 'recruitment_manager'
  | 'content_editor'
  | 'reviewer_moderator';

export interface ProfileRecord {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  department?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  is_active: boolean;
  password_hash?: string | null;
  salt?: string | null;
  last_login_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type ConsultationMethod = 'in_person_kaduna' | 'whatsapp_video' | 'google_meet' | 'phone_call';

export type ConsultationStatus =
  | 'submitted'
  | 'received'
  | 'assigned'
  | 'in_progress'
  | 'awaiting_customer'
  | 'scheduled'
  | 'completed'
  | 'closed'
  | 'cancelled'
  | 'new'
  | 'contacted'
  | 'archived';

export interface ConsultationRequestRecord {
  id: string;
  reference_code: string;
  service_slug: string;
  target_destination?: string | null;
  applicant_objective: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_method: ConsultationMethod;
  preferred_date?: string | null;
  preferred_time_slot?: string | null;
  conditional_data?: Record<string, unknown> | null;
  notes?: string | null;
  status: ConsultationStatus;
  assigned_to?: string | null;
  assigned_profile?: ProfileRecord | null;
  internal_notes?: string | null;
  follow_up_date?: string | null;
  ip_hash?: string | null;
  submission_source: string;
  ndpr_consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConsultationAppointmentRecord {
  id: string;
  consultation_request_id: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_method: ConsultationMethod;
  meeting_link_or_room?: string | null;
  officer_id?: string | null;
  officer_profile?: ProfileRecord | null;
  status: 'scheduled' | 'rescheduled' | 'conducted' | 'no_show' | 'cancelled';
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConsultationStatusHistoryRecord {
  id: string;
  consultation_request_id: string;
  from_status: string;
  to_status: string;
  changed_by?: string | null;
  changed_by_profile?: ProfileRecord | null;
  reason_or_note?: string | null;
  created_at: string;
}

export interface JobCategoryRecord {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface EmployerRecord {
  id: string;
  name: string;
  country: string;
  city: string;
  registration_number?: string | null;
  website_url?: string | null;
  contact_email?: string | null;
  verification_status: 'verified' | 'under_review' | 'unverified';
  verified_by?: string | null;
  verification_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type JobStatus = 'draft' | 'scheduled' | 'open' | 'paused' | 'closing_soon' | 'closed' | 'expired';

export interface JobRecord {
  id: string;
  slug: string;
  title: string;
  employer_id: string;
  employer_name: string;
  is_employer_verified: boolean;
  category_id: string;
  country: string;
  location: string;
  employment_type: 'Full-time' | 'Contract' | 'Seasonal' | 'Apprenticeship';
  salary_range?: string | null;
  age_requirement?: string | null;
  eligible_countries?: string[] | null;
  processing_time?: string | null;
  general_worker_sectors?: string[] | null;
  description: string;
  responsibilities: string[];
  eligibility_requirements: string[];
  visa_support_details: string;
  application_instructions: string;
  deadline: string;
  status: JobStatus;
  accepts_applications: boolean;
  published_at?: string | null;
  view_count: number;
  application_count: number;
  disclaimer: string;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export type JobApplicationStatus =
  | 'submitted'
  | 'screening'
  | 'shortlisted'
  | 'submitted_to_employer'
  | 'interviewing'
  | 'offered'
  | 'rejected'
  | 'withdrawn';

export interface JobApplicationRecord {
  id: string;
  reference_code: string;
  job_id: string;
  job_slug: string;
  job_title?: string;
  full_name: string;
  email: string;
  phone: string;
  city_country: string;
  highest_education: string;
  years_experience: string;
  portfolio_url?: string | null;
  cover_note?: string | null;
  resume_file_url?: string | null;
  resume_file_path?: string | null;
  confirmed_no_guarantees: boolean;
  ndpr_consent: boolean;
  ip_hash?: string | null;
  status: JobApplicationStatus;
  reviewed_by?: string | null;
  reviewed_by_profile?: ProfileRecord | null;
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobApplicationStatusHistoryRecord {
  id: string;
  application_id: string;
  from_status: string;
  to_status: string;
  changed_by?: string | null;
  note?: string | null;
  created_at: string;
}

export type TestimonialStatus = 'pending_moderation' | 'approved' | 'rejected' | 'archived';

export interface TestimonialRecord {
  id: string;
  client_name: string;
  client_title?: string | null;
  location: string;
  category: 'Study Visa' | 'Work Permit' | 'Schengen Business' | 'Tourist Visa' | 'Document Legalization';
  destination_country: string;
  rating: number;
  quote: string;
  full_story?: string | null;
  verified_approval_date?: string | null;
  proof_type: 'stamp' | 'video' | 'corporate' | 'written';
  proof_media_url?: string | null;
  proof_thumbnail?: string | null;
  author_avatar_url?: string | null;
  is_redacted_compliant: boolean;
  permission_to_publish: boolean;
  privacy_acknowledged: boolean;
  status: TestimonialStatus;
  rejection_reason?: string | null;
  moderated_by?: string | null;
  moderated_at?: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialModerationRecord {
  id: string;
  testimonial_id: string;
  moderator_id?: string | null;
  action: 'approved' | 'rejected' | 'edited' | 'archived';
  notes?: string | null;
  created_at: string;
}

export type BlogPostStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface BlogPostRecord {
  id: string;
  slug: string;
  post_type: 'guide' | 'blog' | 'news';
  title: string;
  summary: string;
  category_id: string;
  content_html?: string | null;
  key_takeaways: string[];
  sections: { heading: string; content: string }[];
  featured_image: string;
  read_time_minutes: number;
  author_id?: string | null;
  author_name: string;
  author_role: string;
  author_avatar?: string | null;
  status: BlogPostStatus;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  tags: string[];
  view_count: number;
  current_version: number;
  created_at: string;
  updated_at: string;
}

export interface BlogRevisionRecord {
  id: string;
  post_id: string;
  version: number;
  title: string;
  summary: string;
  content_html?: string | null;
  sections: { heading: string; content: string }[];
  key_takeaways: string[];
  revised_by?: string | null;
  change_summary?: string | null;
  created_at: string;
}

export interface MediaAssetRecord {
  id: string;
  filename: string;
  original_name: string;
  bucket: 'public-assets' | 'applicant-documents';
  storage_path: string;
  file_size_bytes: number;
  mime_type: string;
  alt_text?: string | null;
  is_public: boolean;
  uploaded_by?: string | null;
  created_at: string;
}

export interface ContactMessageRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  service_category: string;
  message: string;
  status: 'new' | 'in_progress' | 'replied' | 'closed';
  assigned_to?: string | null;
  reply_notes?: string | null;
  ndpr_consent: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationRecord {
  id: string;
  recipient_email: string;
  recipient_name?: string | null;
  template_name: string;
  subject: string;
  status: 'queued' | 'sent' | 'failed';
  error_message?: string | null;
  metadata?: Record<string, unknown>;
  sent_at?: string | null;
  created_at: string;
}

export interface EmailOutboxRecord {
  id: string;
  recipient_email: string;
  recipient_name?: string | null;
  template_name: string;
  subject: string;
  body_html: string;
  body_text: string;
  idempotency_key?: string | null;
  status: 'pending' | 'queued' | 'sending' | 'sent' | 'failed' | 'retrying';
  attempt_count: number;
  max_attempts: number;
  last_attempt_at?: string | null;
  sent_at?: string | null;
  error_message?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRecord {
  key: string;
  value: Record<string, unknown>;
  category: 'general' | 'consultation' | 'jobs' | 'smtp' | 'notifications' | 'privacy';
  description?: string | null;
  updated_by?: string | null;
  updated_at: string;
}

export interface RedirectRecord {
  id: string;
  source_path: string;
  destination_path: string;
  status_code: 301 | 302 | 307 | 308;
  is_active: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeoMetadataRecord {
  id: string;
  route_path: string;
  meta_title: string;
  meta_description: string;
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  canonical_url?: string | null;
  keywords?: string | null;
  updated_at: string;
}

export interface AuditLogRecord {
  id: string;
  user_id?: string | null;
  user_email?: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, unknown>;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
}


// ─── Commercial Retainer Pipeline & Deal Engine ───────────────────────────────

export type RetainerStage =
  | 'initial_assessment'
  | 'consultation_paid'
  | 'retainer_signed'
  | 'document_filing'
  | 'embassy_decision'
  | 'commission_released';

export interface RetainerDealRecord {
  id: string;
  reference_code: string;
  client_id?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_category: string;
  target_corridor: string;
  deal_value_usd: number;
  deal_value_ngn: number;
  stage: RetainerStage;
  consultation_fee_paid: boolean;
  retainer_amount_paid_usd: number;
  invoice_reference?: string | null;
  payment_gateway?: 'paystack' | 'stripe' | 'wire_transfer' | null;
  payment_verified_at?: string | null;
  assigned_officer_id?: string | null;
  assigned_officer_name?: string | null;
  contract_signed_at?: string | null;
  filing_date?: string | null;
  expected_decision_date?: string | null;
  decision_outcome?: 'approved' | 'review' | 'refused' | null;
  created_at: string;
  updated_at: string;
}
