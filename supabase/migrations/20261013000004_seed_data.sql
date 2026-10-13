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
