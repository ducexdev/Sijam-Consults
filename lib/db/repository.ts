// ==============================================================================
// SIJAM Consults Limited (RC: 1715416) - Centralized Database Repository
// Dual-Mode Architecture: Supabase PostgreSQL + Persistent Local Storage Fallback
// ==============================================================================

import {
  ProfileRecord,
  AdminRole,
  ConsultationRequestRecord,
  ConsultationStatus,
  ConsultationAppointmentRecord,
  ConsultationStatusHistoryRecord,
  JobRecord,
  JobCategoryRecord,
  EmployerRecord,
  JobApplicationRecord,
  JobApplicationStatus,
  JobApplicationStatusHistoryRecord,
  TestimonialRecord,
  TestimonialStatus,
  TestimonialModerationRecord,
  BlogPostRecord,
  BlogRevisionRecord,
  MediaAssetRecord,
  ContactMessageRecord,
  SiteSettingRecord,
  RedirectRecord,
  SeoMetadataRecord,
  AuditLogRecord,
  NotificationRecord,
  EmailOutboxRecord,
  RetainerDealRecord,
  RetainerStage,
} from '@/lib/types/database';
import { ServiceItem, CorporatePartner } from '@/lib/types';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { SERVICES_DATA } from '@/lib/data/services';
import { PARTNERS_DATA } from '@/lib/data/partners';
import { JOBS_DATA, jobListingToJobRecord } from '@/lib/data/jobs';
import { BLOG_POSTS, blogPostToBlogRecord } from '@/lib/data/blog';
import { emailOutboxStore } from '@/lib/email/cpanel-smtp';
import { SEED_SALT, SEED_PASSWORD_HASH } from '@/lib/auth/session';
import { VIDEOS } from '@/lib/constants/videos';

// ------------------------------------------------------------------------------
// Seed Staff Profiles for Administrative Access
// Credentials stored as salted SHA-256 HMAC hashes only
// ------------------------------------------------------------------------------
const DEFAULT_STAFF: ProfileRecord[] = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    email: 'admin@sijamconsults.com',
    full_name: 'Principal Administrator',
    role: 'super_admin',
    department: 'Executive Governance & Consular Authority',
    phone: '+234 706 422 9556',
    avatar_url: '/team/James-Samson.png',
    password_hash: SEED_PASSWORD_HASH,
    salt: SEED_SALT,
    is_active: true,
    created_at: new Date(Date.now() - 365 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'james.samson@sijamconsults.com',
    full_name: 'James Samson',
    role: 'super_admin',
    department: 'Executive Governance & Strategy',
    phone: '+234 706 422 9556',
    avatar_url: '/team/James-Samson.png',
    password_hash: SEED_PASSWORD_HASH,
    salt: SEED_SALT,
    is_active: true,
    created_at: new Date(Date.now() - 365 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'blessing.attabor@sijamconsults.com',
    full_name: 'Blessing Attabor',
    role: 'admin',
    department: 'Operations & Consular Compliance',
    phone: '+234 802 856 2200',
    avatar_url: '/team/Blessing-Attabor.png',
    password_hash: SEED_PASSWORD_HASH,
    salt: SEED_SALT,
    is_active: true,
    created_at: new Date(Date.now() - 300 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'zainab.kehinde@sijamconsults.com',
    full_name: 'Salami Zainab Kehinde',
    role: 'consultation_manager',
    department: 'Client Advisory & Student Support',
    phone: '+234 706 422 9556',
    avatar_url: '/team/Salami-Zainab-Keyinde.png',
    password_hash: SEED_PASSWORD_HASH,
    salt: SEED_SALT,
    is_active: true,
    created_at: new Date(Date.now() - 240 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    email: 'recruitment@sijamconsults.com',
    full_name: 'Tunde Adebayo',
    role: 'recruitment_manager',
    department: 'International Employment Placement',
    phone: '+234 706 422 9556',
    avatar_url: null,
    password_hash: SEED_PASSWORD_HASH,
    salt: SEED_SALT,
    is_active: true,
    created_at: new Date(Date.now() - 120 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    email: 'content@sijamconsults.com',
    full_name: 'Chioma Okoli',
    role: 'content_editor',
    department: 'Editorial & Brand Communications',
    phone: '+234 706 422 9556',
    avatar_url: null,
    password_hash: SEED_PASSWORD_HASH,
    salt: SEED_SALT,
    is_active: true,
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// In-Memory Global Store for resilient fallback
class DataStore {
  profiles: ProfileRecord[] = [...DEFAULT_STAFF];
  retainerDeals: RetainerDealRecord[] = [];
  
  consultations: ConsultationRequestRecord[] = [
    {
      id: 'c1000000-0000-0000-0000-000000000001',
      reference_code: 'SJM-849201',
      service_slug: 'study-visa',
      target_destination: 'Poland / Cyprus',
      applicant_objective: 'Seeking admission for MSc Cyber Security at WSEI Poland with 50% tuition scholarship guidance and student visa filing.',
      full_name: 'Emeka Umeh',
      email: 'emeka.umeh@example.com',
      phone: '+234 803 456 7890',
      preferred_method: 'in_person_kaduna',
      preferred_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferred_time_slot: '10:00 AM - 11:00 AM WAT',
      status: 'scheduled',
      assigned_to: '00000000-0000-0000-0000-000000000003',
      internal_notes: 'Academic transcript received. Referee contacts verified. Scheduled in Kaduna Room A10.',
      follow_up_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      submission_source: 'website_wizard',
      ndpr_consent: true,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'c1000000-0000-0000-0000-000000000002',
      reference_code: 'SJM-630291',
      service_slug: 'business-registration',
      target_destination: 'Poland / Schengen',
      applicant_objective: 'Incorporate an import/export trading subsidiary (Sp. z o.o.) in Warsaw and apply for a director national D-Type visa.',
      full_name: 'Dr. Amina Bello',
      email: 'amina.bello@example.com',
      phone: '+234 802 345 6789',
      preferred_method: 'google_meet',
      preferred_date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      preferred_time_slot: '02:00 PM - 03:00 PM WAT',
      status: 'assigned',
      assigned_to: '00000000-0000-0000-0000-000000000002',
      internal_notes: 'High-value corporate lead. Articles of association drafted. Initial Google Meet scheduled.',
      follow_up_date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      submission_source: 'website_wizard',
      ndpr_consent: true,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'c1000000-0000-0000-0000-000000000003',
      reference_code: 'SJM-294810',
      service_slug: 'work-visa',
      target_destination: 'Slovakia',
      applicant_objective: 'Certified structural welder looking for legal industrial placement in Slovakia and Voivodeship-equivalent permit processing.',
      full_name: 'Yakubu Danladi',
      email: 'yakubu.danladi@example.com',
      phone: '+234 814 112 3344',
      preferred_method: 'whatsapp_video',
      status: 'new',
      submission_source: 'website_wizard',
      ndpr_consent: true,
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      updated_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ];

  appointments: ConsultationAppointmentRecord[] = [
    {
      id: 'app-001',
      consultation_request_id: 'c1000000-0000-0000-0000-000000000001',
      scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(),
      duration_minutes: 45,
      meeting_method: 'in_person_kaduna',
      meeting_link_or_room: 'Conference Suite A10, Kaduna',
      officer_id: '00000000-0000-0000-0000-000000000003',
      status: 'scheduled',
      notes: 'Initial dossier audit and transcript evaluation session.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  statusHistory: ConsultationStatusHistoryRecord[] = [
    {
      id: 'h-001',
      consultation_request_id: 'c1000000-0000-0000-0000-000000000001',
      from_status: 'new',
      to_status: 'scheduled',
      changed_by: '00000000-0000-0000-0000-000000000003',
      reason_or_note: 'Contacted client via WhatsApp, scheduled in-person visit for Friday.',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  employers: EmployerRecord[] = [
    {
      id: 'e1000000-0000-0000-0000-000000000001',
      name: 'EuroMed Care Sp. z o.o.',
      country: 'Poland',
      city: 'Krakow',
      registration_number: 'KRS: 0000849201',
      website_url: 'https://euromedcare.example.pl',
      contact_email: 'hr@euromedcare.example.pl',
      verification_status: 'verified',
      verification_notes: 'Southern Poland hospital network. Voivodeship labor quotas verified.',
      created_at: new Date(Date.now() - 180 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'e1000000-0000-0000-0000-000000000002',
      name: 'FinNova Technologies Poland',
      country: 'Poland',
      city: 'Warsaw',
      registration_number: 'KRS: 0000912384',
      website_url: 'https://finnova.example.pl',
      contact_email: 'careers@finnova.example.pl',
      verification_status: 'verified',
      verification_notes: 'Warsaw engineering center with certified labor quota approvals.',
      created_at: new Date(Date.now() - 150 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'e1000000-0000-0000-0000-000000000003',
      name: 'StavInvest Slovakia s.r.o.',
      country: 'Slovakia',
      city: 'Bratislava',
      registration_number: 'ICO: 52918204',
      website_url: 'https://stavinvest.example.sk',
      contact_email: 'recruiting@stavinvest.example.sk',
      verification_status: 'verified',
      verification_notes: 'Structural steel fabrication enterprise. Central Office of Labor quotas verified.',
      created_at: new Date(Date.now() - 120 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  jobCategories: JobCategoryRecord[] = [
    { id: 'healthcare-nursing', name: 'Healthcare & Nursing', slug: 'healthcare-nursing', description: 'Certified hospital and clinical nursing positions', is_active: true, display_order: 1, created_at: new Date().toISOString() },
    { id: 'information-technology', name: 'Information Technology', slug: 'information-technology', description: 'Software engineering and cloud architecture', is_active: true, display_order: 2, created_at: new Date().toISOString() },
    { id: 'skilled-trades', name: 'Skilled Trades', slug: 'skilled-trades', description: 'Certified welding, electrical and precision fabrication', is_active: true, display_order: 3, created_at: new Date().toISOString() },
    { id: 'engineering-construction', name: 'Engineering & Construction', slug: 'engineering-construction', description: 'Civil and structural engineering', is_active: true, display_order: 4, created_at: new Date().toISOString() },
    { id: 'manufacturing-production', name: 'Manufacturing & Production', slug: 'manufacturing-production', description: 'Automated assembly, food production, and factory operations', is_active: true, display_order: 5, created_at: new Date().toISOString() },
    { id: 'logistics-transport', name: 'Logistics & Transport', slug: 'logistics-transport', description: 'International HGV driving, freight, and warehousing', is_active: true, display_order: 6, created_at: new Date().toISOString() },
    { id: 'agriculture-processing', name: 'Agriculture & Processing', slug: 'agriculture-processing', description: 'Greenhouse farming, livestock, and agri-processing', is_active: true, display_order: 7, created_at: new Date().toISOString() },
    { id: 'hospitality-tourism', name: 'Hospitality & Tourism', slug: 'hospitality-tourism', description: 'International hotel and culinary roles', is_active: true, display_order: 8, created_at: new Date().toISOString() },
    { id: 'sports-mobility-athletics', name: 'Sports Mobility & Athletics', slug: 'sports-mobility-athletics', description: 'Professional football talent, trials, and athletic coaching', is_active: true, display_order: 9, created_at: new Date().toISOString() },
    { id: 'energy-oil-gas', name: 'Energy, Oil & Gas', slug: 'energy-oil-gas', description: 'Petroleum, pipeline, and renewable energy operations', is_active: true, display_order: 10, created_at: new Date().toISOString() },
    { id: 'corporate-financial-services', name: 'Corporate & Financial Services', slug: 'corporate-financial-services', description: 'Audit, corporate accounting, fintech, and administration', is_active: true, display_order: 11, created_at: new Date().toISOString() },
    { id: 'security-facility-management', name: 'Security & Facility Management', slug: 'security-facility-management', description: 'Aviation ground crew, facility maintenance, and safety', is_active: true, display_order: 12, created_at: new Date().toISOString() },
    { id: 'sales-retail-customer-support', name: 'Sales, Retail & Customer Support', slug: 'sales-retail-customer-support', description: 'B2B international sales and multilingual helpdesks', is_active: true, display_order: 13, created_at: new Date().toISOString() },
    { id: 'education-vocational-training', name: 'Education & Vocational Training', slug: 'education-vocational-training', description: 'Vocational trade instructors, STEM, and early education', is_active: true, display_order: 14, created_at: new Date().toISOString() },
    { id: 'automotive-heavy-equipment', name: 'Automotive & Heavy Equipment', slug: 'automotive-heavy-equipment', description: 'Heavy plant mechanics and diesel equipment technicians', is_active: true, display_order: 15, created_at: new Date().toISOString() },
    { id: 'mining-extraction-metallurgy', name: 'Mining, Extraction & Metallurgy', slug: 'mining-extraction-metallurgy', description: 'Underground mining, blast ops, and mineral processing', is_active: true, display_order: 16, created_at: new Date().toISOString() },
  ];

  jobs: JobRecord[] = [
    {
      id: 'a1000000-0000-0000-0000-000000000004',
      slug: 'multi-skilled-general-worker-poland-construction-agriculture',
      title: 'Multi-Skilled General Worker (Construction, Agriculture, Plumbing & Electrical Support)',
      employer_id: 'e1000000-0000-0000-0000-000000000004',
      employer_name: 'PolBuild Agrotechnika Sp. z o.o.',
      is_employer_verified: true,
      category_id: 'engineering-construction',
      country: 'Poland',
      location: 'Poznań & Wrocław, Poland',
      employment_type: 'Full-time',
      salary_range: '€1,850 – €2,600 / month (gross)',
      description: 'PolBuild Agrotechnika is recruiting versatile, multi-skilled general workers for industrial facilities, agricultural greenhouses, and residential construction sites across western Poland.',
      responsibilities: [
        'Perform general construction support including material movement, concrete assistance, and site preparation.',
        'Assist certified technicians with basic electrical cable pulling, socket fittings, and conduit laying.',
        'Support piping and plumbing installations, solvent welding, and sanitary fixtures setup.',
        'Engage in seasonal agricultural greenhouse maintenance, harvesting, and packaging.',
      ],
      eligibility_requirements: [
        'Candidate Age Bracket: Verified between 21 and 45 years old at time of application.',
        'Basic practical aptitude and demonstrable experience in one or more general worker sectors.',
        'Valid International Passport with at least 18 months remaining validity.',
      ],
      visa_support_details: 'Host employer issues official Voivodeship Type A labor permit authorization with subsidized dormitory accommodation.',
      application_instructions: 'Submit your CV highlighting your practical trade skills and international passport bio-data page.',
      deadline: '2026-12-31',
      status: 'open',
      accepts_applications: true,
      published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      view_count: 50,
      application_count: 1,
      disclaimer: 'Notice of Statutory Independence: Sijam Consults Limited facilitates candidate verification and statutory consular dossier advisory.',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  applications: JobApplicationRecord[] = [
    {
      id: 'app-001',
      reference_code: 'APP-519284',
      job_id: 'a1000000-0000-0000-0000-000000000004',
      job_slug: 'multi-skilled-general-worker-poland-construction-agriculture',
      job_title: 'Multi-Skilled General Worker (Construction, Agriculture, Plumbing & Electrical Support)',
      full_name: 'Tunde Adeyemi',
      email: 'tunde.adeyemi@example.com',
      phone: '+234 803 987 6543',
      city_country: 'Kaduna, Nigeria',
      highest_education: 'Technical College Certificate',
      years_experience: '2-4 years',
      portfolio_url: 'https://linkedin.com/in/tunde-adeyemi-trades',
      cover_note: 'Multi-skilled trade assistant with 3 years practical experience in masonry, electrical piping support, and general site operations.',
      confirmed_no_guarantees: true,
      ndpr_consent: true,
      status: 'screening',
      reviewed_by: '00000000-0000-0000-0000-000000000004',
      internal_notes: 'Trade test certificate verified. English communication good. Pre-screening passed.',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  testimonials: TestimonialRecord[] = [
    {
      id: 'c1000000-0000-0000-0000-000000000001',
      client_name: 'Emeka O.',
      client_title: 'MSc Computer Science Student',
      location: 'Kaduna, Nigeria',
      category: 'Study Visa',
      destination_country: 'Poland',
      rating: 5,
      quote: 'Sijam Consults handled my admission into the College of Economics and Computer Science in Poland without any stress. They reviewed my transcript, guided my tuition deposit, and coached me through the embassy interview.',
      full_story: 'After a disappointing refusal with another agent in Lagos who didn’t understand Polish bank statement requirements, Sijam audited my entire file.',
      verified_approval_date: '2026-08-12',
      proof_type: 'video',
      proof_media_url: VIDEOS.TESTIMONIAL_1,
      is_redacted_compliant: true,
      permission_to_publish: true,
      privacy_acknowledged: true,
      status: 'approved',
      is_featured: true,
      display_order: 1,
      created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'c1000000-0000-0000-0000-000000000002',
      client_name: 'Dr. Amina Y.',
      client_title: 'Healthcare Executive',
      location: 'Abuja, Nigeria',
      category: 'Schengen Business',
      destination_country: 'Poland',
      rating: 5,
      quote: 'We incorporated our European distributor branch in Warsaw with Sijam Consults. They got our KRS registration, tax ID, and director D-visa sorted out faster than we anticipated.',
      full_story: 'Establishing corporate bank accounts in Central Europe used to be notoriously difficult for West African businesses.',
      verified_approval_date: '2026-07-19',
      proof_type: 'stamp',
      proof_media_url: '/visas/10-1.png',
      is_redacted_compliant: true,
      permission_to_publish: true,
      privacy_acknowledged: true,
      status: 'approved',
      is_featured: true,
      display_order: 2,
      created_at: new Date(Date.now() - 86400000 * 90).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'c1000000-0000-0000-0000-000000000004',
      client_name: 'Ibrahim Musa',
      client_title: 'Undergraduate Applicant',
      location: 'Kano, Nigeria',
      category: 'Study Visa',
      destination_country: 'Northern Cyprus',
      rating: 5,
      quote: 'Received my 50% tuition scholarship offer letter from Cyprus West University within 6 business days. Waiting for embassy biometrics.',
      status: 'pending_moderation',
      is_redacted_compliant: true,
      permission_to_publish: true,
      privacy_acknowledged: true,
      proof_type: 'written',
      is_featured: false,
      display_order: 3,
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  blogPosts: BlogPostRecord[] = [
    {
      id: 'b1000000-0000-0000-0000-000000000001',
      slug: 'nursing-in-canada',
      post_type: 'guide',
      title: 'Why Study Nursing in Canada: 2026/2027 Admission & License Pathway',
      summary: 'A forensic roadmap for Nigerian registered nurses and secondary school leavers looking to build high-earning healthcare careers in Canada through legitimate academic pathways.',
      category_id: 'study-abroad',
      featured_image: '/blogs/Why-Study-Nursing-in-Canada-20262027.png',
      read_time_minutes: 7,
      author_id: '00000000-0000-0000-0000-000000000001',
      author_name: 'James Samson',
      author_role: 'Managing Director & Principal Consultant',
      author_avatar: '/team/James-Samson.png',
      status: 'published',
      published_at: new Date(Date.now() - 86400000 * 45).toISOString(),
      tags: ['Canada', 'Nursing', 'Study Abroad', 'Post-Graduation Work Permit'],
      key_takeaways: [
        'Canadian provinces face severe nursing deficits, leading to designated PR retention pathways.',
        'Bridging programs exist for Nigerian-trained RNs seeking NNAS credential equivalency.',
        'Proof of funds must clearly demonstrate liquid living expenses alongside paid first-year tuition.',
        'Sijam Consults helps structure compliant SOPs highlighting intent to return upon graduation.',
      ],
      sections: [
        { heading: 'The Global Demand for Healthcare Talent', content: 'Canada continues to prioritize international healthcare professionals across British Columbia, Ontario, Alberta, and Saskatchewan.' },
        { heading: 'Direct Admission vs. Bridging Programs', content: 'If you already hold an RN license from the NMCN, direct license conversion through NNAS can be time-consuming.' },
      ],
      view_count: 245,
      current_version: 1,
      created_at: new Date(Date.now() - 86400000 * 50).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'b1000000-0000-0000-0000-000000000002',
      slug: 'schengen-d-visa',
      post_type: 'guide',
      title: 'European Corporate Setup & Schengen D-Visa: Guide for African Founders',
      summary: 'How Nigerian business owners can legally incorporate a Polish Sp. z o.o., access European banking rails, and obtain long-stay residency across 27 Schengen countries.',
      category_id: 'business-mobility',
      featured_image: '/blogs/Ducex-Blog.png',
      read_time_minutes: 6,
      author_id: '00000000-0000-0000-0000-000000000002',
      author_name: 'Blessing Attabor',
      author_role: 'Head of Operations & Senior Consultant',
      author_avatar: '/team/Blessing-Attabor.png',
      status: 'published',
      published_at: new Date(Date.now() - 86400000 * 60).toISOString(),
      tags: ['Poland', 'Business Incorporation', 'Schengen D-Visa', 'Residency'],
      key_takeaways: [
        'Incorporate without physical presence via verified notarial or electronic KRS portals.',
        'Poland offers a 9% Corporate Income Tax (CIT) rate for small qualifying companies.',
        'Board directors are eligible to file for National Type-D residency visas.',
      ],
      sections: [
        { heading: 'Why Poland is Central Europe’s Commercial Bridge', content: 'Poland has emerged as a premier European commercial bridge with access to 450 million consumers.' },
      ],
      view_count: 189,
      current_version: 1,
      created_at: new Date(Date.now() - 86400000 * 65).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  auditLogs: AuditLogRecord[] = [
    {
      id: 'log-001',
      user_id: '00000000-0000-0000-0000-000000000001',
      user_email: 'james.samson@sijamconsults.com',
      action: 'system.initialize',
      entity_type: 'system',
      entity_id: 'root',
      details: { version: '2026.4', environment: 'production' },
      ip_address: '102.89.44.12',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];

  redirects: RedirectRecord[] = [
    { id: 'red-01', source_path: '/about-us', destination_path: '/about', status_code: 308, is_active: true, notes: 'Legacy WordPress about page', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'red-02', source_path: '/study-visa', destination_path: '/services/study-visa', status_code: 308, is_active: true, notes: 'Legacy study visa page', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'red-03', source_path: '/work-permit-and-employment-placement-visa', destination_path: '/services/work-visa', status_code: 308, is_active: true, notes: 'Legacy long-slug work permit page', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'red-04', source_path: '/tourist-visa-2', destination_path: '/services/tourist-visa', status_code: 308, is_active: true, notes: 'Legacy duplicate permalink', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'red-05', source_path: '/what-clients-say', destination_path: '/reviews', status_code: 308, is_active: true, notes: 'Legacy reviews slug', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ];

  contactMessages: ContactMessageRecord[] = [
    {
      id: 'inq-001',
      full_name: 'Babajide Sanwo',
      email: 'babajide.sanwo@example.com',
      phone: '+234 803 123 4567',
      subject: 'Inquiry regarding Polish Sp. z o.o. registration timeframe',
      service_category: 'Foreign Company Registration',
      message: 'Hello, what are the current statutory processing timelines for a Polish Sp. z o.o. company formation and director D-visa?',
      status: 'new',
      ndpr_consent: true,
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  services: ServiceItem[] = [...SERVICES_DATA];
  partners: CorporatePartner[] = [...PARTNERS_DATA];
}

// Global singleton instance for local memory state
const globalStore = new DataStore();

// ------------------------------------------------------------------------------
// Centralized Repository API
// ------------------------------------------------------------------------------
export const dbRepository = {
  // --- Dashboard Metrics ---
  async getDashboardMetrics() {
    const consultations = globalStore.consultations;
    const jobs = globalStore.jobs;
    const applications = globalStore.applications;
    const testimonials = globalStore.testimonials;
    const posts = globalStore.blogPosts;

    return {
      pendingConsultations: consultations.filter((c) => c.status === 'new' || c.status === 'assigned').length,
      scheduledAppointments: globalStore.appointments.filter((a) => a.status === 'scheduled').length,
      openJobs: jobs.filter((j) => j.status === 'open' || j.status === 'closing_soon').length,
      totalApplications: applications.length,
      pendingApplications: applications.filter((a) => a.status === 'submitted' || a.status === 'screening').length,
      pendingTestimonials: testimonials.filter((t) => t.status === 'pending_moderation').length,
      publishedArticles: posts.filter((p) => p.status === 'published').length,
      totalStaff: globalStore.profiles.filter((p) => p.is_active).length,
    };
  },

  // --- Daily Time-Series Metrics (30-day sparklines via PostgreSQL RPC) ---
  async getDailyMetrics30d(): Promise<{ date: string; consultations: number; applications: number; enquiries: number; testimonials: number; blog_posts: number }[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.rpc('get_daily_metrics_30d');
        if (!error && data && (data as unknown[]).length > 0) {
          return (data as { metric_date: string; consultations: number; applications: number; enquiries: number; testimonials: number; blog_posts: number }[]).map((row) => ({
            date: row.metric_date,
            consultations: Number(row.consultations) || 0,
            applications: Number(row.applications) || 0,
            enquiries: Number(row.enquiries) || 0,
            testimonials: Number(row.testimonials) || 0,
            blog_posts: Number(row.blog_posts) || 0,
          }));
        }
      } catch (err) {
        console.error('Supabase getDailyMetrics30d RPC error:', err);
      }
    }
    // Fallback: generate synthetic 30-day trend from local in-memory store
    const days: { date: string; consultations: number; applications: number; enquiries: number; testimonials: number; blog_posts: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        consultations: i < 5 ? 1 : 0,
        applications: i < 3 ? 1 : 0,
        enquiries: i < 7 ? 1 : 0,
        testimonials: 0,
        blog_posts: 0,
      });
    }
    return days;
  },

  // --- Consultations ---
  async getConsultations(filter?: { status?: string; search?: string; service?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('consultation_requests').select('*');
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        if (filter?.service && filter.service !== 'all') {
          query = query.eq('service_slug', filter.service);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data) {
          let list = data as ConsultationRequestRecord[];
          if (filter?.search) {
            const q = filter.search.toLowerCase();
            list = list.filter(
              (c) =>
                c.full_name.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q) ||
                c.reference_code.toLowerCase().includes(q) ||
                c.applicant_objective.toLowerCase().includes(q)
            );
          }
          return list;
        }
      } catch (err) {
        console.error('Supabase getConsultations error:', err);
      }
    }
    let list = [...globalStore.consultations];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((c) => c.status === filter.status);
    }
    if (filter?.service && filter.service !== 'all') {
      list = list.filter((c) => c.service_slug === filter.service);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.full_name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.reference_code.toLowerCase().includes(q) ||
          c.applicant_objective.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getConsultationById(id: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('consultation_requests').select('*').or(`id.eq.${id},reference_code.eq.${id}`).maybeSingle();
        if (!error && data) {
          return data as ConsultationRequestRecord;
        }
      } catch (err) {
        console.error('Supabase getConsultationById error:', err);
      }
    }
    return globalStore.consultations.find((c) => c.id === id || c.reference_code === id) || null;
  },

  async createConsultation(data: Omit<ConsultationRequestRecord, 'id' | 'reference_code' | 'status' | 'created_at' | 'updated_at'>) {
    const refCode = `SJM-${Math.floor(100000 + Math.random() * 900000)}`;
    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error } = await supabaseAdmin.from('consultation_requests').insert({
          ...data,
          reference_code: refCode,
          status: 'new',
        }).select().single();
        if (!error && inserted) {
          const rec = inserted as ConsultationRequestRecord;
          globalStore.consultations.unshift(rec);
          return rec;
        }
      } catch (err) {
        console.error('Supabase createConsultation error:', err);
      }
    }
    const newRecord: ConsultationRequestRecord = {
      ...data,
      id: `c-${Date.now()}`,
      reference_code: refCode,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.consultations.unshift(newRecord);
    return newRecord;
  },

  async updateConsultationStatus(id: string, newStatus: ConsultationStatus, note?: string, changedBy?: string) {
    if (isSupabaseConfigured) {
      try {
        const updates: Record<string, unknown> = { status: newStatus };
        if (note) updates.internal_notes = note;
        const { data, error } = await supabaseAdmin.from('consultation_requests').update(updates).or(`id.eq.${id},reference_code.eq.${id}`).select().maybeSingle();
        if (!error && data) {
          const req = globalStore.consultations.find((c) => c.id === id || c.reference_code === id);
          if (req) {
            req.status = newStatus;
            if (note) req.internal_notes = note;
            req.updated_at = new Date().toISOString();
          }
          return data as ConsultationRequestRecord;
        }
      } catch (err) {
        console.error('Supabase updateConsultationStatus error:', err);
      }
    }
    const req = globalStore.consultations.find((c) => c.id === id);
    if (!req) return null;
    const oldStatus = req.status;
    req.status = newStatus;
    req.updated_at = new Date().toISOString();
    if (note) req.internal_notes = note;

    globalStore.statusHistory.unshift({
      id: `h-${Date.now()}`,
      consultation_request_id: id,
      from_status: oldStatus,
      to_status: newStatus,
      changed_by: changedBy,
      reason_or_note: note,
      created_at: new Date().toISOString(),
    });

    return req;
  },

  async assignConsultation(id: string, staffId: string, assignedBy?: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('consultation_requests')
          .update({
            assigned_to: staffId,
            status: 'assigned',
            updated_at: new Date().toISOString(),
          })
          .or(`id.eq.${id},reference_code.eq.${id}`)
          .select()
          .maybeSingle();
        if (!error && data) {
          const req = globalStore.consultations.find((c) => c.id === id || c.reference_code === id);
          if (req) {
            req.assigned_to = staffId;
            if (req.status === 'new') req.status = 'assigned';
            req.updated_at = new Date().toISOString();
          }
          return data as ConsultationRequestRecord;
        }
      } catch (err) {
        console.error('Supabase assignConsultation error:', err);
      }
    }
    const req = globalStore.consultations.find((c) => c.id === id);
    if (!req) return null;
    req.assigned_to = staffId;
    if (req.status === 'new') req.status = 'assigned';
    if (assignedBy) req.internal_notes = `Assigned by ${assignedBy}`;
    req.updated_at = new Date().toISOString();
    return req;
  },

  async scheduleConsultationAppointment(appointmentData: Omit<ConsultationAppointmentRecord, 'id' | 'created_at' | 'updated_at'>) {
    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error } = await supabaseAdmin
          .from('consultation_appointments')
          .insert(appointmentData)
          .select()
          .single();
        if (!error && inserted) {
          const appt = inserted as ConsultationAppointmentRecord;
          globalStore.appointments.unshift(appt);

          await supabaseAdmin
            .from('consultation_requests')
            .update({
              status: 'scheduled',
              preferred_date: appointmentData.scheduled_at.split('T')[0],
              updated_at: new Date().toISOString(),
            })
            .eq('id', appointmentData.consultation_request_id);

          const localReq = globalStore.consultations.find((c) => c.id === appointmentData.consultation_request_id);
          if (localReq) {
            localReq.status = 'scheduled';
            localReq.preferred_date = appointmentData.scheduled_at.split('T')[0];
            localReq.updated_at = new Date().toISOString();
          }
          return appt;
        }
      } catch (err) {
        console.error('Supabase scheduleConsultationAppointment error:', err);
      }
    }
    const appt: ConsultationAppointmentRecord = {
      ...appointmentData,
      id: `appt-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.appointments.unshift(appt);

    // Auto-update request status
    const req = globalStore.consultations.find((c) => c.id === appointmentData.consultation_request_id);
    if (req) {
      req.status = 'scheduled';
      req.preferred_date = appointmentData.scheduled_at.split('T')[0];
      req.updated_at = new Date().toISOString();
    }
    return appt;
  },

  async getAppointments(filter?: { status?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('consultation_appointments').select('*');
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        const { data, error } = await query.order('scheduled_at', { ascending: false });
        if (!error && data) {
          return data as ConsultationAppointmentRecord[];
        }
      } catch (err) {
        console.error('Supabase getAppointments error:', err);
      }
    }
    let list = [...globalStore.appointments];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((a) => a.status === filter.status);
    }
    return list.sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime());
  },

  async getAppointmentsByConsultationId(consultationId: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('consultation_appointments')
          .select('*')
          .eq('consultation_request_id', consultationId)
          .order('scheduled_at', { ascending: false });
        if (!error && data) {
          return data as ConsultationAppointmentRecord[];
        }
      } catch (err) {
        console.error('Supabase getAppointmentsByConsultationId error:', err);
      }
    }
    return globalStore.appointments.filter((a) => a.consultation_request_id === consultationId);
  },

  async rescheduleConsultationAppointment(appointmentId: string, newTime: string, reason?: string, changedBy?: string) {
    if (isSupabaseConfigured) {
      try {
        const updates: Record<string, unknown> = {
          scheduled_at: newTime,
          status: 'rescheduled',
          updated_at: new Date().toISOString(),
        };
        if (reason) updates.notes = reason;
        const { data, error } = await supabaseAdmin.from('consultation_appointments').update(updates).eq('id', appointmentId).select().maybeSingle();
        if (!error && data) {
          const rec = data as ConsultationAppointmentRecord;
          const appt = globalStore.appointments.find((a) => a.id === appointmentId);
          if (appt) {
            appt.scheduled_at = newTime;
            appt.status = 'rescheduled';
            if (reason) appt.notes = reason;
            appt.updated_at = new Date().toISOString();
          }
          return rec;
        }
      } catch (err) {
        console.error('Supabase rescheduleConsultationAppointment error:', err);
      }
    }
    const appt = globalStore.appointments.find((a) => a.id === appointmentId);
    if (!appt) return null;
    appt.scheduled_at = newTime;
    appt.status = 'rescheduled';
    if (reason) appt.notes = reason;
    appt.updated_at = new Date().toISOString();

    const req = globalStore.consultations.find((c) => c.id === appt.consultation_request_id);
    if (req) {
      req.status = 'scheduled';
      req.preferred_date = newTime.split('T')[0];
      if (changedBy) req.internal_notes = `Rescheduled by ${changedBy}`;
      req.updated_at = new Date().toISOString();
    }
    return appt;
  },

  async cancelConsultationAppointment(appointmentId: string, reason?: string, changedBy?: string) {
    if (isSupabaseConfigured) {
      try {
        const updates: Record<string, unknown> = {
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        };
        if (reason) updates.notes = reason;
        const { data, error } = await supabaseAdmin.from('consultation_appointments').update(updates).eq('id', appointmentId).select().maybeSingle();
        if (!error && data) {
          const rec = data as ConsultationAppointmentRecord;
          const appt = globalStore.appointments.find((a) => a.id === appointmentId);
          if (appt) {
            appt.status = 'cancelled';
            if (reason) appt.notes = reason;
            appt.updated_at = new Date().toISOString();
          }
          return rec;
        }
      } catch (err) {
        console.error('Supabase cancelConsultationAppointment error:', err);
      }
    }
    const appt = globalStore.appointments.find((a) => a.id === appointmentId);
    if (!appt) return null;
    appt.status = 'cancelled';
    if (reason) appt.notes = reason;
    appt.updated_at = new Date().toISOString();

    const req = globalStore.consultations.find((c) => c.id === appt.consultation_request_id);
    if (req) {
      req.status = 'cancelled';
      if (changedBy) req.internal_notes = `Cancelled by ${changedBy}`;
      req.updated_at = new Date().toISOString();
    }
    return appt;
  },

  // --- Jobs & Applications ---
  async getJobs(filter?: { status?: string; category?: string; search?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('jobs').select('*');
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        if (filter?.category && filter.category !== 'all') {
          query = query.eq('category_id', filter.category);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data) {
          let list = data as JobRecord[];
          if (filter?.search) {
            const q = filter.search.toLowerCase();
            list = list.filter((j) => j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q));
          }
          return list;
        }
      } catch (err) {
        console.error('Supabase getJobs error:', err);
      }
    }
    let list = [...globalStore.jobs];
    // Merge static JOBS_DATA for any job not already in store
    const storeSlugs = new Set(list.map((j) => j.slug));
    for (const sj of JOBS_DATA) {
      if (!storeSlugs.has(sj.slug)) {
        list.push(jobListingToJobRecord(sj));
      }
    }
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((j) => j.status === filter.status);
    }
    if (filter?.category && filter.category !== 'all') {
      list = list.filter((j) => j.category_id === filter.category);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter((j) => j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q));
    }
    return list;
  },

  async getJobBySlug(slug: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('jobs').select('*').eq('slug', slug).maybeSingle();
        if (!error && data) {
          return data as JobRecord;
        }
      } catch (err) {
        console.error('Supabase getJobBySlug error:', err);
      }
    }
    const storeJob = globalStore.jobs.find((j) => j.slug === slug || j.id === slug);
    if (storeJob) return storeJob;

    const staticJob = JOBS_DATA.find((j) => j.slug === slug || j.id === slug);
    if (staticJob) return jobListingToJobRecord(staticJob);

    return null;
  },

  async createJob(jobData: Omit<JobRecord, 'id' | 'view_count' | 'application_count' | 'created_at' | 'updated_at'>) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('jobs').insert({
          ...jobData,
          view_count: 0,
          application_count: 0,
        }).select().single();
        if (!error && data) {
          const rec = data as JobRecord;
          globalStore.jobs.unshift(rec);
          return rec;
        }
      } catch (err) {
        console.error('Supabase createJob error:', err);
      }
    }
    const newJob: JobRecord = {
      ...jobData,
      id: `a1000000-0000-0000-0000-${Date.now().toString().slice(-12).padStart(12, '0')}`,
      view_count: 0,
      application_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.jobs.unshift(newJob);
    return newJob;
  },

  async updateJob(id: string, updates: Partial<JobRecord>) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('jobs').update(updates).or(`id.eq.${id},slug.eq.${id}`).select().maybeSingle();
        if (!error && data) {
          const job = globalStore.jobs.find((j) => j.id === id || j.slug === id);
          if (job) Object.assign(job, updates, { updated_at: new Date().toISOString() });
          return data as JobRecord;
        }
      } catch (err) {
        console.error('Supabase updateJob error:', err);
      }
    }
    const job = globalStore.jobs.find((j) => j.id === id || j.slug === id);
    if (!job) return null;
    Object.assign(job, updates, { updated_at: new Date().toISOString() });
    return job;
  },

  async deleteJob(id: string) {
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from('jobs').delete().or(`id.eq.${id},slug.eq.${id}`);
      } catch (err) {
        console.error('Supabase deleteJob error:', err);
      }
    }
    const index = globalStore.jobs.findIndex((j) => j.id === id || j.slug === id);
    if (index === -1) return false;
    globalStore.jobs.splice(index, 1);
    return true;
  },

  async getEmployers() {
    return globalStore.employers;
  },

  async getJobCategories() {
    return globalStore.jobCategories;
  },

  // Applications — Supabase primary, local fallback
  async getApplications(filter?: { jobId?: string; status?: string; search?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('job_applications').select('*');
        if (filter?.jobId && filter.jobId !== 'all') {
          query = query.eq('job_id', filter.jobId);
        }
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data) {
          let list = data as JobApplicationRecord[];
          if (filter?.search) {
            const q = filter.search.toLowerCase();
            list = list.filter(
              (a) =>
                a.full_name.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q) ||
                a.reference_code.toLowerCase().includes(q)
            );
          }
          return list;
        }
      } catch (err) {
        console.error('Supabase getApplications error:', err);
      }
    }
    let list = [...globalStore.applications];
    if (filter?.jobId && filter.jobId !== 'all') {
      list = list.filter((a) => a.job_id === filter.jobId || a.job_slug === filter.jobId);
    }
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((a) => a.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter((a) => a.full_name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.reference_code.toLowerCase().includes(q));
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createApplication(data: Omit<JobApplicationRecord, 'id' | 'reference_code' | 'status' | 'created_at' | 'updated_at'>) {
    const refCode = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error } = await supabaseAdmin
          .from('job_applications')
          .insert({ ...data, reference_code: refCode, status: 'submitted' })
          .select()
          .single();
        if (!error && inserted) {
          const rec = inserted as JobApplicationRecord;
          globalStore.applications.unshift(rec);
          // Increment local job counter (DB counter updated via trigger)
          const job = globalStore.jobs.find((j) => j.id === data.job_id || j.slug === data.job_slug);
          if (job) job.application_count += 1;
          return rec;
        }
      } catch (err) {
        console.error('Supabase createApplication error:', err);
      }
    }
    const newApp: JobApplicationRecord = {
      ...data,
      id: `app-${Date.now()}`,
      reference_code: refCode,
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.applications.unshift(newApp);
    const job = globalStore.jobs.find((j) => j.id === data.job_id || j.slug === data.job_slug);
    if (job) job.application_count += 1;
    return newApp;
  },

  async updateApplicationStatus(id: string, status: JobApplicationStatus, note?: string, reviewedBy?: string) {
    if (isSupabaseConfigured) {
      try {
        const updates: Record<string, unknown> = { status };
        if (note) updates.internal_notes = note;
        if (reviewedBy) updates.reviewed_by = reviewedBy;
        const { data, error } = await supabaseAdmin.from('job_applications').update(updates).eq('id', id).select().maybeSingle();
        if (!error && data) {
          const app = globalStore.applications.find((a) => a.id === id);
          if (app) Object.assign(app, { status, internal_notes: note, reviewed_by: reviewedBy, updated_at: new Date().toISOString() });
          return data as JobApplicationRecord;
        }
      } catch (err) {
        console.error('Supabase updateApplicationStatus error:', err);
      }
    }
    const app = globalStore.applications.find((a) => a.id === id);
    if (!app) return null;
    app.status = status;
    if (note) app.internal_notes = note;
    if (reviewedBy) app.reviewed_by = reviewedBy;
    app.updated_at = new Date().toISOString();
    return app;
  },

  // --- Testimonials — Supabase primary, local fallback ---
  async getTestimonials(filter?: { status?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('testimonials').select('*');
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        const { data, error } = await query.order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as TestimonialRecord[];
      } catch (err) {
        console.error('Supabase getTestimonials error:', err);
      }
    }
    let list = [...globalStore.testimonials];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((t) => t.status === filter.status);
    }
    return list;
  },

  async getApprovedTestimonials() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('testimonials')
          .select('*')
          .eq('status', 'approved')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as TestimonialRecord[];
      } catch (err) {
        console.error('Supabase getApprovedTestimonials error:', err);
      }
    }
    return globalStore.testimonials.filter((t) => t.status === 'approved');
  },

  async createTestimonial(data: Omit<TestimonialRecord, 'id' | 'status' | 'created_at' | 'updated_at'>) {
    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error } = await supabaseAdmin
          .from('testimonials')
          .insert({ ...data, status: 'pending_moderation' })
          .select()
          .single();
        if (!error && inserted) {
          const rec = inserted as TestimonialRecord;
          globalStore.testimonials.unshift(rec);
          return rec;
        }
      } catch (err) {
        console.error('Supabase createTestimonial error:', err);
      }
    }
    const newT: TestimonialRecord = {
      ...data,
      id: `t-${Date.now()}`,
      status: 'pending_moderation',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.testimonials.unshift(newT);
    return newT;
  },

  async moderateTestimonial(id: string, status: TestimonialStatus, reason?: string, moderatorId?: string) {
    if (isSupabaseConfigured) {
      try {
        const updates: Record<string, unknown> = {
          status,
          moderated_by: moderatorId || null,
          moderated_at: new Date().toISOString(),
        };
        if (reason) updates.rejection_reason = reason;
        const { data, error } = await supabaseAdmin.from('testimonials').update(updates).eq('id', id).select().maybeSingle();
        if (!error && data) {
          const t = globalStore.testimonials.find((item) => item.id === id);
          if (t) Object.assign(t, updates, { updated_at: new Date().toISOString() });
          return data as TestimonialRecord;
        }
      } catch (err) {
        console.error('Supabase moderateTestimonial error:', err);
      }
    }
    const t = globalStore.testimonials.find((item) => item.id === id);
    if (!t) return null;
    t.status = status;
    if (reason) t.rejection_reason = reason;
    t.moderated_by = moderatorId;
    t.moderated_at = new Date().toISOString();
    t.updated_at = new Date().toISOString();
    return t;
  },

  // --- Blog & Guides ---
  async getBlogPosts(filter?: { status?: string; type?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('blog_posts').select('*');
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        if (filter?.type && filter.type !== 'all') {
          query = query.eq('post_type', filter.type);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data as BlogPostRecord[];
        }
      } catch (err) {
        console.error('Supabase getBlogPosts error:', err);
      }
    }
    let list = [...globalStore.blogPosts];
    // Merge static BLOG_POSTS for any post not already in store
    const storeSlugs = new Set(list.map((p) => p.slug));
    for (const sp of BLOG_POSTS) {
      if (!storeSlugs.has(sp.slug)) {
        list.push(blogPostToBlogRecord(sp));
      }
    }
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((p) => p.status === filter.status);
    }
    if (filter?.type && filter.type !== 'all') {
      list = list.filter((p) => p.post_type === filter.type);
    }
    return list;
  },

  async getBlogPostBySlug(slug: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
        if (!error && data) {
          return data as BlogPostRecord;
        }
      } catch (err) {
        console.error('Supabase getBlogPostBySlug error:', err);
      }
    }
    const storePost = globalStore.blogPosts.find((p) => p.slug === slug || p.id === slug);
    if (storePost) return storePost;

    const staticPost = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
    if (staticPost) return blogPostToBlogRecord(staticPost);

    return null;
  },

  async createBlogPost(post: Omit<BlogPostRecord, 'id' | 'view_count' | 'current_version' | 'created_at' | 'updated_at'>) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('blog_posts').insert({
          ...post,
          view_count: 0,
          current_version: 1,
        }).select().single();
        if (!error && data) {
          const rec = data as BlogPostRecord;
          globalStore.blogPosts.unshift(rec);
          return rec;
        }
      } catch (err) {
        console.error('Supabase createBlogPost error:', err);
      }
    }
    const newPost: BlogPostRecord = {
      ...post,
      id: `b1000000-0000-0000-0000-${Date.now().toString().slice(-12).padStart(12, '0')}`,
      view_count: 0,
      current_version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.blogPosts.unshift(newPost);
    return newPost;
  },

  async updateBlogPost(id: string, updates: Partial<BlogPostRecord>) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('blog_posts').update(updates).or(`id.eq.${id},slug.eq.${id}`).select().maybeSingle();
        if (!error && data) {
          const post = globalStore.blogPosts.find((p) => p.id === id || p.slug === id);
          if (post) Object.assign(post, updates, { updated_at: new Date().toISOString() });
          return data as BlogPostRecord;
        }
      } catch (err) {
        console.error('Supabase updateBlogPost error:', err);
      }
    }
    const post = globalStore.blogPosts.find((p) => p.id === id || p.slug === id);
    if (!post) return null;
    Object.assign(post, updates, { updated_at: new Date().toISOString() });
    return post;
  },

  async deleteBlogPost(id: string) {
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from('blog_posts').delete().or(`id.eq.${id},slug.eq.${id}`);
      } catch (err) {
        console.error('Supabase deleteBlogPost error:', err);
      }
    }
    const index = globalStore.blogPosts.findIndex((b) => b.id === id || b.slug === id);
    if (index === -1) return false;
    globalStore.blogPosts.splice(index, 1);
    return true;
  },

  // --- Services & Partners ---
  async getServices() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('services')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          // Map Supabase row → ServiceItem shape
          return data.map((row: Record<string, unknown>) => ({
            id: row.id as string,
            slug: row.slug as string,
            title: row.title as string,
            shortTitle: row.short_title as string,
            group: row.service_group as string,
            tagline: row.tagline as string,
            heroHeadline: row.hero_headline as string,
            summary: row.summary as string,
            badge: row.badge as string | undefined,
            whoIsThisFor: (row.who_is_this_for as string[]) || [],
            assistanceOffered: (row.assistance_offered as string[]) || [],
            keyBenefits: (row.key_benefits as string[]) || [],
            requirements: (row.requirements as string[]) || [],
            processSteps: (row.process_steps as Record<string, unknown>[]) || [],
            faqs: (row.faqs as Record<string, unknown>[]) || [],
            relatedServices: (row.related_services as string[]) || [],
            videoUrl: row.video_url as string | undefined,
            videoPoster: row.video_poster as string | undefined,
            disclaimer: row.disclaimer as string,
          })) as unknown as ServiceItem[];
        }
      } catch (err) {
        console.error('Supabase getServices error:', err);
      }
    }
    return SERVICES_DATA;
  },

  async getPartners() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('partners')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data.map((row: Record<string, unknown>) => ({
            id: row.id as string,
            name: row.name as string,
            category: row.category as string,
            country: row.country as string,
            logoUrl: row.logo_url as string,
            description: row.description as string,
            collaborationScope: row.collaboration_scope as string,
            websiteUrl: row.website_url as string | undefined,
          })) as unknown as CorporatePartner[];
        }
      } catch (err) {
        console.error('Supabase getPartners error:', err);
      }
    }
    return PARTNERS_DATA;
  },

  async updateService(slug: string, updates: Partial<ServiceItem>): Promise<ServiceItem | null> {
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from('services').update({
          title: updates.title,
          summary: updates.summary,
          tagline: updates.tagline,
          hero_headline: updates.heroHeadline,
          badge: updates.badge,
          is_published: updates.badge !== 'hidden',
          updated_at: new Date().toISOString(),
        }).eq('slug', slug);
      } catch (err) {
        console.error('Supabase updateService error:', err);
      }
    }
    const idx = globalStore.services.findIndex((s) => s.slug === slug);
    if (idx !== -1) {
      globalStore.services[idx] = { ...globalStore.services[idx], ...updates };
      return globalStore.services[idx];
    }
    return null;
  },

  async createPartner(partner: Omit<CorporatePartner, 'id'>): Promise<CorporatePartner> {
    const newPartner: CorporatePartner = {
      ...partner,
      id: `partner-${Date.now()}`,
    };
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from('corporate_partners').insert([{
          name: partner.name,
          category: partner.category,
          country: partner.country,
          logo_url: partner.logoUrl,
          description: partner.description,
          collaboration_scope: partner.collaborationScope,
          website_url: partner.websiteUrl,
          is_active: true,
        }]);
      } catch (err) {
        console.error('Supabase createPartner error:', err);
      }
    }
    globalStore.partners.push(newPartner);
    return newPartner;
  },

  async updatePartner(nameOrId: string, updates: Partial<CorporatePartner>): Promise<CorporatePartner | null> {
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from('corporate_partners').update({
          name: updates.name,
          category: updates.category,
          country: updates.country,
          logo_url: updates.logoUrl,
          description: updates.description,
          collaboration_scope: updates.collaborationScope,
          website_url: updates.websiteUrl,
          updated_at: new Date().toISOString(),
        }).or(`name.eq.${nameOrId},id.eq.${nameOrId}`);
      } catch (err) {
        console.error('Supabase updatePartner error:', err);
      }
    }
    const idx = globalStore.partners.findIndex((p) => p.name === nameOrId || p.id === nameOrId);
    if (idx !== -1) {
      globalStore.partners[idx] = { ...globalStore.partners[idx], ...updates };
      return globalStore.partners[idx];
    }
    return null;
  },

  async deletePartner(nameOrId: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from('corporate_partners').delete().or(`name.eq.${nameOrId},id.eq.${nameOrId}`);
      } catch (err) {
        console.error('Supabase deletePartner error:', err);
      }
    }
    globalStore.partners = globalStore.partners.filter((p) => p.name !== nameOrId && p.id !== nameOrId);
    return true;
  },

  // --- Settings & Redirects ---
  async getRedirects() {
    return globalStore.redirects;
  },

  async createRedirect(data: Omit<RedirectRecord, 'id' | 'created_at' | 'updated_at'>) {
    const r: RedirectRecord = {
      ...data,
      id: `red-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.redirects.push(r);
    return r;
  },

  // --- Staff & Profiles ---
  async getStaffProfiles() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('profiles').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
          return data as ProfileRecord[];
        }
      } catch (err) {
        console.error('Supabase getStaffProfiles error:', err);
      }
    }
    return globalStore.profiles;
  },

  async getStaffByEmail(email: string) {
    const q = email.trim().toLowerCase();
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('profiles').select('*').ilike('email', q).maybeSingle();
        if (!error && data) {
          return data as ProfileRecord;
        }
      } catch (err) {
        console.error('Supabase getStaffByEmail error:', err);
      }
    }
    return globalStore.profiles.find((s) => s.email.toLowerCase() === q) || null;
  },

  async getStaffById(id: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('id', id).maybeSingle();
        if (!error && data) {
          return data as ProfileRecord;
        }
      } catch (err) {
        console.error('Supabase getStaffById error:', err);
      }
    }
    return globalStore.profiles.find((s) => s.id === id) || null;
  },

  async createStaff(data: Omit<ProfileRecord, 'id' | 'created_at' | 'updated_at'>) {
    const existing = await this.getStaffByEmail(data.email);
    if (existing) {
      throw new Error(`A staff account with email ${data.email} already exists.`);
    }

    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error } = await supabaseAdmin.from('profiles').insert({
          ...data,
          email: data.email.trim().toLowerCase(),
          is_active: data.is_active ?? true,
        }).select().single();
        if (!error && inserted) {
          const rec = inserted as ProfileRecord;
          globalStore.profiles.push(rec);
          return rec;
        }
      } catch (err) {
        console.error('Supabase createStaff error:', err);
      }
    }

    const newStaff: ProfileRecord = {
      ...data,
      id: `00000000-0000-0000-0000-${Date.now().toString().slice(-12).padStart(12, '0')}`,
      email: data.email.trim().toLowerCase(),
      is_active: data.is_active ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.profiles.push(newStaff);
    return newStaff;
  },

  async updateStaff(id: string, updates: Partial<ProfileRecord>) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin.from('profiles').update(updates).eq('id', id).select().single();
        if (!error && data) {
          const p = globalStore.profiles.find((staff) => staff.id === id);
          if (p) Object.assign(p, updates, { updated_at: new Date().toISOString() });
          return data as ProfileRecord;
        }
      } catch (err) {
        console.error('Supabase updateStaff error:', err);
      }
    }
    const p = globalStore.profiles.find((staff) => staff.id === id);
    if (!p) return null;
    Object.assign(p, updates, { updated_at: new Date().toISOString() });
    return p;
  },

  async updateStaffRole(id: string, role: AdminRole) {
    return this.updateStaff(id, { role });
  },

  async updateStaffPassword(id: string, passwordHash: string, salt: string) {
    return this.updateStaff(id, { password_hash: passwordHash, salt });
  },

  async deleteStaff(id: string) {
    if (isSupabaseConfigured) {
      try {
        await supabaseAdmin.from('profiles').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase deleteStaff error:', err);
      }
    }
    const index = globalStore.profiles.findIndex((s) => s.id === id);
    if (index === -1) return false;
    globalStore.profiles.splice(index, 1);
    return true;
  },

  // --- Audit Logs — Supabase primary, local fallback ---
  async getAuditLogs(limit = 50) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('audit_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);
        if (!error && data && data.length > 0) return data as AuditLogRecord[];
      } catch (err) {
        console.error('Supabase getAuditLogs error:', err);
      }
    }
    return globalStore.auditLogs.slice(0, limit);
  },

  async recordAuditLog(log: Omit<AuditLogRecord, 'id' | 'created_at'>) {
    const newLog: AuditLogRecord = {
      ...log,
      id: `log-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    // Write to local store optimistically
    globalStore.auditLogs.unshift(newLog);
    // Fire-and-forget persist to Supabase
    if (isSupabaseConfigured) {
      (async () => {
        try {
          const { error } = await supabaseAdmin.from('audit_logs').insert({
            user_id: log.user_id || null,
            user_email: log.user_email || null,
            action: log.action,
            entity_type: log.entity_type,
            entity_id: log.entity_id,
            details: log.details,
            ip_address: log.ip_address || null,
            user_agent: log.user_agent || null,
          });
          if (error) console.error('Supabase audit log persist error:', error.message);
        } catch (err) {
          console.error('Supabase recordAuditLog error:', err);
        }
      })();
    }
    return newLog;
  },

  // --- Contact Messages & Enquiries — Supabase primary, local fallback ---
  async getContactMessages(filter?: { status?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('contact_messages').select('*');
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (!error && data) return data as ContactMessageRecord[];
      } catch (err) {
        console.error('Supabase getContactMessages error:', err);
      }
    }
    let list = [...globalStore.contactMessages];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((m) => m.status === filter.status);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createContactMessage(data: Omit<ContactMessageRecord, 'id' | 'created_at' | 'updated_at'>) {
    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error } = await supabaseAdmin
          .from('contact_messages')
          .insert({ ...data, status: data.status ?? 'new' })
          .select()
          .single();
        if (!error && inserted) {
          const rec = inserted as ContactMessageRecord;
          globalStore.contactMessages.unshift(rec);
          return rec;
        }
      } catch (err) {
        console.error('Supabase createContactMessage error:', err);
      }
    }
    const newMsg: ContactMessageRecord = {
      ...data,
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    globalStore.contactMessages.unshift(newMsg);
    return newMsg;
  },

  async updateContactMessageStatus(id: string, status: 'new' | 'in_progress' | 'replied' | 'closed', replyNotes?: string) {
    if (isSupabaseConfigured) {
      try {
        const updates: Record<string, unknown> = { status };
        if (replyNotes) updates.reply_notes = replyNotes;
        const { data, error } = await supabaseAdmin.from('contact_messages').update(updates).eq('id', id).select().maybeSingle();
        if (!error && data) {
          const msg = globalStore.contactMessages.find((m) => m.id === id);
          if (msg) Object.assign(msg, updates, { updated_at: new Date().toISOString() });
          return data as ContactMessageRecord;
        }
      } catch (err) {
        console.error('Supabase updateContactMessageStatus error:', err);
      }
    }
    const msg = globalStore.contactMessages.find((m) => m.id === id);
    if (!msg) return null;
    msg.status = status;
    if (replyNotes) msg.reply_notes = replyNotes;
    msg.updated_at = new Date().toISOString();
    return msg;
  },

  // --- Email Outbox & Delivery Queue — Supabase primary, local fallback ---
  async getEmailOutbox(filter?: { status?: string }) {
    if (isSupabaseConfigured) {
      try {
        let query = supabaseAdmin.from('email_outbox').select('*');
        if (filter?.status && filter.status !== 'all') {
          query = query.eq('status', filter.status);
        }
        const { data, error } = await query.order('created_at', { ascending: false }).limit(200);
        if (!error && data) return data as EmailOutboxRecord[];
      } catch (err) {
        console.error('Supabase getEmailOutbox error:', err);
      }
    }
    let list = [...emailOutboxStore];
    if (filter?.status && filter.status !== 'all') {
      list = list.filter((m) => m.status === filter.status);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async retryEmailOutbox(id: string) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('email_outbox')
          .update({ status: 'pending', attempt_count: 0, error_message: null })
          .eq('id', id)
          .select()
          .maybeSingle();
        if (!error && data) return data as EmailOutboxRecord;
      } catch (err) {
        console.error('Supabase retryEmailOutbox error:', err);
      }
    }
    const item = emailOutboxStore.find((m) => m.id === id);
    if (!item) return null;
    item.status = 'sent';
    item.attempt_count += 1;
    item.last_attempt_at = new Date().toISOString();
    item.sent_at = new Date().toISOString();
    item.error_message = undefined;
    item.updated_at = new Date().toISOString();
    return item;
  },

  async getRetainerDeals(): Promise<RetainerDealRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('retainer_deals')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data as RetainerDealRecord[];
      } catch (err) {
        console.error('Supabase getRetainerDeals error:', err);
      }
    }
    return [...globalStore.retainerDeals];
  },

  async createRetainerDeal(
    deal: Omit<RetainerDealRecord, 'id' | 'created_at' | 'updated_at'>
  ): Promise<RetainerDealRecord> {
    const newDeal: RetainerDealRecord = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `deal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...deal,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('retainer_deals')
          .insert(newDeal)
          .select()
          .maybeSingle();
        if (!error && data) return data as RetainerDealRecord;
      } catch (err) {
        console.error('Supabase createRetainerDeal error:', err);
      }
    }

    globalStore.retainerDeals.unshift(newDeal);
    return newDeal;
  },

  async updateRetainerDeal(
    id: string,
    updates: Partial<RetainerDealRecord>
  ): Promise<RetainerDealRecord | null> {
    const updatedFields = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabaseAdmin
          .from('retainer_deals')
          .update(updatedFields)
          .eq('id', id)
          .select()
          .maybeSingle();
        if (!error && data) return data as RetainerDealRecord;
      } catch (err) {
        console.error('Supabase updateRetainerDeal error:', err);
      }
    }

    const idx = globalStore.retainerDeals.findIndex((d: RetainerDealRecord) => d.id === id);
    if (idx !== -1) {
      globalStore.retainerDeals[idx] = { ...globalStore.retainerDeals[idx], ...updatedFields };
      return globalStore.retainerDeals[idx];
    }
    return null;
  },

  async deleteRetainerDeal(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabaseAdmin
          .from('retainer_deals')
          .delete()
          .eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.error('Supabase deleteRetainerDeal error:', err);
      }
    }

    const initialLength = globalStore.retainerDeals.length;
    globalStore.retainerDeals = globalStore.retainerDeals.filter((d: RetainerDealRecord) => d.id !== id);
    return globalStore.retainerDeals.length < initialLength;
  },
};
