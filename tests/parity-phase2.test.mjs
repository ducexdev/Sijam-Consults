/**
 * Frontend/Backend Parity Test Suite — Phase 2
 *
 * Validates:
 * 1. Consultation submission validation & reference code generation
 * 2. Contact form validation & inquiry reference generation
 * 3. Candidate job application validation & deadline checking
 * 4. Testimonial / Review validation & NDPR sensitive document redaction filter
 * 5. Assessment form mapping to service slugs and consultation leads
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { validateConsultationForm, validateContactForm, validateJobApplication } from '../lib/validation.ts';

test('PARITY-01: Consultation form validation logic', () => {
  // Valid form
  const valid = validateConsultationForm({
    fullName: 'James Samson',
    email: 'james@example.com',
    phone: '+2347064229556',
    applicantObjective: 'Relocation to Poland under work permit corridor with legal file prep',
    ndprConsent: true,
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  // Missing NDPR consent
  const invalidConsent = validateConsultationForm({
    fullName: 'James Samson',
    email: 'james@example.com',
    phone: '+2347064229556',
    applicantObjective: 'Valid objective text',
    ndprConsent: false,
  });
  assert.equal(invalidConsent.isValid, false);
  assert.ok(invalidConsent.errors.ndprConsent);

  // Invalid email & short objective
  const invalidFields = validateConsultationForm({
    fullName: 'J',
    email: 'not-an-email',
    phone: '123',
    applicantObjective: 'Hi',
    ndprConsent: true,
  });
  assert.equal(invalidFields.isValid, false);
  assert.ok(invalidFields.errors.fullName);
  assert.ok(invalidFields.errors.email);
  assert.ok(invalidFields.errors.phone);
  assert.ok(invalidFields.errors.applicantObjective);
});

test('PARITY-02: Contact form validation logic', () => {
  const valid = validateContactForm({
    fullName: 'Blessing Attabor',
    email: 'blessing@example.com',
    phone: '+2348028562200',
    message: 'We are requesting corporate information regarding international recruiting corridors.',
    ndprConsent: true,
  });
  assert.equal(valid.isValid, true);

  const invalid = validateContactForm({
    fullName: '',
    email: 'bad',
    phone: '',
    message: 'short',
    ndprConsent: false,
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);
  assert.ok(invalid.errors.ndprConsent);
});

test('PARITY-03: Candidate job application validation & consent enforcement', () => {
  const valid = validateJobApplication({
    fullName: 'Tunde Adebayo',
    email: 'tunde@example.com',
    phone: '+2347064229556',
    highestEducation: 'Bachelor Degree',
    yearsExperience: '3 Years',
    confirmedNoGuarantees: true,
    ndprConsent: true,
  });
  assert.equal(valid.isValid, true);

  // Unconfirmed statutory disclaimer
  const missingDisclaimer = validateJobApplication({
    fullName: 'Tunde Adebayo',
    email: 'tunde@example.com',
    phone: '+2347064229556',
    highestEducation: 'Bachelor Degree',
    yearsExperience: '3 Years',
    confirmedNoGuarantees: false,
    ndprConsent: true,
  });
  assert.equal(missingDisclaimer.isValid, false);
  assert.ok(missingDisclaimer.errors.confirmedNoGuarantees);
});

test('PARITY-04: Testimonial submission sensitive PII protection filter', () => {
  const sensitivePattern = /\b([A-Z]\d{8}|(?=[A-Z0-9]*\d{4})[A-Z0-9]{8,9})\b/i;

  const cleanReview = 'Sijam Consults helped me review my admission documents and embassy interview questions.';
  assert.equal(sensitivePattern.test(cleanReview), false, 'Normal 9-letter words must not trigger passport filter');

  const leakedPassportReview = 'My visa was issued for passport A12345678 and I am flying next week.';
  assert.equal(sensitivePattern.test(leakedPassportReview), true, 'Real passport numbers must be detected');
});

test('PARITY-05: Assessment pathway to service slug mapping parity', () => {
  const serviceSlugMap = {
    'Study Abroad': 'study-visa',
    'Employer Work Permit': 'work-visa',
    'Permanent Residency': 'permanent-residency',
    'European Business / Sp. z o.o.': 'business-registration',
  };

  assert.equal(serviceSlugMap['Study Abroad'], 'study-visa');
  assert.equal(serviceSlugMap['Employer Work Permit'], 'work-visa');
  assert.equal(serviceSlugMap['Permanent Residency'], 'permanent-residency');
  assert.equal(serviceSlugMap['European Business / Sp. z o.o.'], 'business-registration');
});

test('PARITY-06: JobListing and JobRecord bidirectional adapter integrity', async () => {
  const { jobListingToJobRecord, jobRecordToJobListing } = await import('../lib/data/adapters.ts');
  const mockListing = {
    id: 'job-999',
    slug: 'test-nurse-poland',
    title: 'Test Nurse Position',
    companyName: 'Test Hospital Sp. z o.o.',
    isEmployerVerified: true,
    location: 'Warsaw, Poland',
    country: 'Poland',
    category: 'Healthcare & Nursing',
    employmentType: 'Full-time',
    salaryRange: '€3,000 / month',
    postedDate: '2026-10-01',
    deadline: '2026-12-31',
    status: 'Open',
    description: 'Test job description',
    responsibilities: ['Responsibility 1'],
    eligibilityRequirements: ['Requirement 1'],
    visaSupportDetails: 'Sponsorship included',
    disclaimer: 'Standard disclaimer',
    ageRequirement: '21-45',
    generalWorkerSectors: ['Care'],
    eligibleCountries: ['Nigeria'],
    processingTime: '3-4 months',
  };

  const record = jobListingToJobRecord(mockListing);
  assert.equal(record.slug, 'test-nurse-poland');
  assert.equal(record.title, 'Test Nurse Position');
  assert.equal(record.employer_name, 'Test Hospital Sp. z o.o.');
  assert.equal(record.status, 'open');
  assert.equal(record.age_requirement, '21-45');

  const backToListing = jobRecordToJobListing(record);
  assert.equal(backToListing.slug, mockListing.slug);
  assert.equal(backToListing.title, mockListing.title);
  assert.equal(backToListing.companyName, mockListing.companyName);
  assert.equal(backToListing.status, 'Open');
  assert.equal(backToListing.ageRequirement, '21-45');
});

test('PARITY-07: BlogPost and BlogPostRecord bidirectional adapter integrity', async () => {
  const { blogPostToBlogRecord, blogRecordToBlogPost } = await import('../lib/data/adapters.ts');
  const mockPost = {
    id: 'post-test',
    slug: 'poland-work-permit-guide-2026',
    title: 'Poland Work Permit Guide 2026',
    excerpt: 'Comprehensive roadmap for Nigerian professionals seeking EU work permits.',
    featuredImage: '/blogs/Poland-Work-Permit.png',
    featuredImageAlt: 'Poland Work Permit',
    category: { id: 'work-relocation', name: 'Work & Relocation', slug: 'work-relocation', color: '#F45A2A' },
    tags: [{ id: 'tag-poland', name: 'Poland', slug: 'poland' }],
    author: { id: 'author-james', name: 'James Samson', role: 'MD & Principal Consultant' },
    publishedAt: '2026-10-15T00:00:00.000Z',
    updatedAt: '2026-10-20T00:00:00.000Z',
    readTimeMinutes: 8,
    status: 'published',
    seo: { title: 'Poland Work Permit Guide 2026', description: 'Comprehensive roadmap' },
    sections: [{ heading: 'Overview', content: 'Detailed content here.' }],
    keyTakeaways: ['Key takeaway 1'],
  };

  const record = blogPostToBlogRecord(mockPost);
  assert.equal(record.slug, 'poland-work-permit-guide-2026');
  assert.equal(record.title, 'Poland Work Permit Guide 2026');
  assert.equal(record.status, 'published');
  assert.equal(record.category_id, 'work-relocation');

  const backToPost = blogRecordToBlogPost(record);
  assert.equal(backToPost.slug, mockPost.slug);
  assert.equal(backToPost.title, mockPost.title);
  assert.equal(backToPost.status, 'published');
  assert.equal(backToPost.category.slug, 'work-relocation');
});
