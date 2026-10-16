export type ServiceSlug =
  | 'study-visa'
  | 'work-visa'
  | 'tourist-visa'
  | 'visa-assistance'
  | 'business-registration'
  | 'document-legalization'
  | 'flight-reservations'
  | 'citizenship-assistance'
  | 'permanent-residency'
  | 'recruitment-supply'
  | 'football-talent';

export type ServiceGroup = 'Academic' | 'Employment' | 'Tourism' | 'Corporate' | 'Logistics' | 'Immigration' | 'Sports Mobility';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
  timeline?: string;
}

export interface ServiceDocumentRequirement {
  category: string;
  items: string[];
  mandatory: boolean;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  group: ServiceGroup;
  tagline: string;
  heroHeadline: string;
  summary: string;
  whoIsThisFor: string[];
  assistanceOffered: string[];
  keyBenefits: string[];
  requirements: ServiceDocumentRequirement[];
  processSteps: ServiceStep[];
  faqs: ServiceFAQ[];
  relatedServices: ServiceSlug[];
  badge?: string;
  videoUrl?: string;
  videoPoster?: string;
  disclaimer: string;
}

export type JobCategory =
  | 'Healthcare & Nursing'
  | 'Information Technology'
  | 'Engineering & Construction'
  | 'Hospitality & Tourism'
  | 'Agriculture & Processing'
  | 'Skilled Trades'
  | 'Logistics & Transport'
  | 'Manufacturing & Production'
  | 'Sports Mobility & Athletics'
  | 'Energy, Oil & Gas'
  | 'Corporate & Financial Services'
  | 'Security & Facility Management'
  | 'Sales, Retail & Customer Support'
  | 'Education & Vocational Training'
  | 'Automotive & Heavy Equipment'
  | 'Mining, Extraction & Metallurgy';

export type EmploymentType = 'Full-time' | 'Contract' | 'Seasonal' | 'Apprenticeship';

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  isEmployerVerified: boolean;
  location: string;
  country: string;
  flag?: string;
  category: JobCategory;
  employmentType: EmploymentType;
  salaryRange?: string;
  postedDate: string;
  deadline: string;
  status: 'Open' | 'Closing Soon' | 'Filled';
  description: string;
  responsibilities: string[];
  eligibilityRequirements: string[];
  visaSupportDetails: string;
  applicationInstructions: string;
  disclaimer: string;
  perks?: string[];
  experienceLevel?: string;
  vacanciesCount?: number;
  featured?: boolean;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Study Abroad' | 'Work Relocation' | 'Business Mobility' | 'Visitor Advisory' | 'Immigration Policies';
  publishedDate: string;
  updatedDate: string;
  readTimeMinutes: number;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage: string;
  tags: string[];
  contentHtml?: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string;
  }[];
}

export interface ReviewItem {
  id: string;
  clientName: string;
  clientTitle?: string;
  location: string;
  category: 'Study Visa' | 'Work Permit' | 'Schengen Business' | 'Tourist Visa' | 'Document Legalization';
  destinationCountry: string;
  quote: string;
  fullStory?: string;
  rating: number;
  verifiedApprovalDate: string;
  proofType: 'stamp' | 'video' | 'corporate';
  proofMediaUrl?: string;
  proofThumbnail?: string;
  isRedactedCompliant: boolean;
}

export interface CorporatePartner {
  id: string;
  name: string;
  category: 'Accreditation Body' | 'Recruitment Partner' | 'Education & Mobility' | 'Academic Consultancy' | 'Education & Migration Agency' | 'Manpower Services' | 'University' | 'Commercial Enterprise' | string;
  country: string;
  logoUrl: string;
  description: string;
  collaborationScope: string;
  websiteUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  bioExtended?: string;
  credentials: string[];
  image: string;
  emailContact?: string;
  linkedInUrl?: string;
}

export type ConsultationMethod = 'in_person_kaduna' | 'whatsapp_video' | 'google_meet' | 'phone_call';

export interface ConsultationSubmission {
  serviceSlug: ServiceSlug | 'general';
  targetDestination?: string;
  applicantObjective: string;
  fullName: string;
  email: string;
  phone: string;
  preferredMethod: ConsultationMethod;
  preferredDate?: string;
  preferredTimeSlot?: string;
  conditionalData?: Record<string, unknown>;
  notes?: string;
  ndprConsent: boolean;
}

export interface AssessmentSubmission {
  currentStatus: 'Student' | 'Employed Professional' | 'Business Owner' | 'Freelancer' | 'Unemployed';
  primaryGoal: 'Study Overseas' | 'Work & Live Abroad' | 'Tourist Travel' | 'Incorporate Business in Europe';
  preferredDestination: string;
  highestEducation: 'High School / WAEC' | 'OND / HND' | 'Bachelor Degree' | 'Master / PhD';
  yearsExperience: '0-1 year' | '2-4 years' | '5+ years';
  budgetBracket: 'Below ₦3M' | '₦3M - ₦7M' | '₦7M - ₦15M' | 'Above ₦15M';
  fullName: string;
  email: string;
  phone: string;
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  serviceCategory: string;
  message: string;
  ndprConsent: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

// ─── SEO & Metadata Types ─────────────────────────────────────────────────────

export interface SeoMetadata {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export interface RedirectRule {
  id: string;
  from: string;
  to: string;
  statusCode: 301 | 302;
  isActive: boolean;
  createdAt: string;
  note?: string;
}

export type SeoIssueType =
  | 'missing_title'
  | 'missing_description'
  | 'missing_og_image'
  | 'duplicate_slug'
  | 'missing_alt_text'
  | 'noindex_conflict'
  | 'canonical_mismatch'
  | 'broken_internal_link'
  | 'missing_structured_data';

export type SeoIssueSeverity = 'critical' | 'warning' | 'info';

export interface SeoIssue {
  id: string;
  type: SeoIssueType;
  severity: SeoIssueSeverity;
  page: string;
  message: string;
  suggestion: string;
  detectedAt: string;
}

// ─── Blog / Editorial Types ───────────────────────────────────────────────────

export type BlogPostStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived';

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  twitterHandle?: string;
  linkedInUrl?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSection {
  heading: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml?: string;
  sections: BlogSection[];
  keyTakeaways: string[];
  faqs?: BlogFAQ[];
  status: BlogPostStatus;
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  updatedAt: string;
  scheduledAt?: string;
  reviewedAt?: string;
  contentReviewDue?: string;
  readTimeMinutes: number;
  relatedPostSlugs?: string[];
  seo: SeoMetadata;
  officialSourceUrls?: string[];
  isImmigrationPolicy: boolean;
  policyLastVerified?: string;
}

