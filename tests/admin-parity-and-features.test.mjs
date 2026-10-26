import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

test('ADMIN-PARITY-01: Admin Job Listing Form Field Parity', () => {
  const jobsViewPath = path.join(projectRoot, 'components', 'admin', 'JobsView.tsx');
  assert.ok(fs.existsSync(jobsViewPath), 'JobsView.tsx must exist');

  const content = fs.readFileSync(jobsViewPath, 'utf8');

  // Verify all fields that exist on public job listings are present in admin JobsView
  const requiredFields = [
    'employmentType',
    'isEmployerVerified',
    'applicationInstructions',
    'processingTime',
    'ageRequirement',
    'eligibleCountriesText',
    'generalWorkerSectorsText',
    'disclaimer',
    'visaSupportDetails',
    'responsibilitiesText',
    'requirementsText',
  ];

  for (const field of requiredFields) {
    assert.ok(
      content.includes(field),
      `JobsView.tsx must include state/control for "${field}"`
    );
  }

  // Verify modal contains collapsible section groupings
  assert.ok(content.includes('FormSection'), 'JobsView must structure inputs using FormSection groupings');
  assert.ok(content.includes('Destination Country / Corridor'), 'JobsView must have destination country selector');
  assert.ok(content.includes('Statutory Disclaimer'), 'JobsView must have statutory disclaimer section');
});

test('ADMIN-PARITY-02: Admin Blog Post Edit Capability', () => {
  const editPagePath = path.join(projectRoot, 'app', 'admin', '(protected)', 'posts', '[id]', 'page.tsx');
  const editFormPath = path.join(projectRoot, 'components', 'admin', 'EditPostForm.tsx');

  assert.ok(fs.existsSync(editPagePath), 'posts/[id]/page.tsx must exist');
  assert.ok(fs.existsSync(editFormPath), 'EditPostForm.tsx must exist');

  const pageContent = fs.readFileSync(editPagePath, 'utf8');
  assert.ok(pageContent.includes('EditPostForm'), 'Edit post page must render interactive EditPostForm');

  const formContent = fs.readFileSync(editFormPath, 'utf8');
  assert.ok(formContent.includes('adminUpdateBlogPost'), 'EditPostForm must bind to adminUpdateBlogPost action');
  assert.ok(formContent.includes('adminDeleteBlogPost'), 'EditPostForm must provide adminDeleteBlogPost action');
  assert.ok(formContent.includes('sections'), 'EditPostForm must allow editing article sections');
  assert.ok(formContent.includes('takeawaysText'), 'EditPostForm must allow editing key takeaways');
});

test('ADMIN-PARITY-03: Media & Storage Route Authorization', () => {
  const uploadRoutePath = path.join(projectRoot, 'app', 'api', 'media', 'upload', 'route.ts');
  const signedUrlRoutePath = path.join(projectRoot, 'app', 'api', 'media', 'signed-url', 'route.ts');

  assert.ok(fs.existsSync(uploadRoutePath), 'Upload route must exist');
  assert.ok(fs.existsSync(signedUrlRoutePath), 'Signed URL route must exist');

  const uploadContent = fs.readFileSync(uploadRoutePath, 'utf8');
  assert.ok(
    uploadContent.includes('requireAdminSession'),
    'Media upload route must be guarded by requireAdminSession'
  );

  const signedUrlContent = fs.readFileSync(signedUrlRoutePath, 'utf8');
  assert.ok(
    signedUrlContent.includes('requireAdminSession'),
    'Media signed-url route must be guarded by requireAdminSession'
  );
  assert.ok(
    signedUrlContent.includes('createSignedUrl'),
    'Signed URL route must call Supabase createSignedUrl'
  );
});

test('ADMIN-PARITY-04: MediaView Vault Governance & Upload Flow', () => {
  const mediaViewPath = path.join(projectRoot, 'components', 'admin', 'MediaView.tsx');
  assert.ok(fs.existsSync(mediaViewPath), 'MediaView.tsx must exist');

  const content = fs.readFileSync(mediaViewPath, 'utf8');
  assert.ok(content.includes('Upload File'), 'MediaView must have live Upload File action');
  assert.ok(content.includes('/api/media/upload'), 'MediaView must call /api/media/upload');
  assert.ok(content.includes('/api/media/signed-url'), 'MediaView must call /api/media/signed-url');
  assert.ok(content.includes('applicant-documents'), 'MediaView must manage applicant-documents bucket');
  assert.ok(content.includes('public-assets'), 'MediaView must manage public-assets bucket');
});

test('ADMIN-LEADS-05: Phase A Unified Inbound Leads & Speed-to-Lead SLA Engine', () => {
  const unifiedLeadsPath = path.join(projectRoot, 'components', 'admin', 'UnifiedLeadsView.tsx');
  assert.ok(fs.existsSync(unifiedLeadsPath), 'UnifiedLeadsView.tsx must exist');

  const content = fs.readFileSync(unifiedLeadsPath, 'utf8');

  // Verify SLA calculation and thresholds
  assert.ok(content.includes('calculateSla'), 'Must define calculateSla logic');
  assert.ok(content.includes('Prime Window'), 'Must flag Prime SLA window (< 15 mins)');
  assert.ok(content.includes('Warning SLA'), 'Must flag Warning SLA (15 - 60 mins)');
  assert.ok(content.includes('Breached SLA'), 'Must flag Breached SLA (> 60 mins)');

  // Verify multi-stream unification
  assert.ok(content.includes('rawConsultation'), 'Must ingest ConsultationRequestRecord stream');
  assert.ok(content.includes('rawMessage'), 'Must ingest ContactMessageRecord stream');

  // Verify actions and assignments
  assert.ok(content.includes('adminUpdateConsultationStatus'), 'Must support updating consultation status');
  assert.ok(content.includes('adminUpdateContactMessageStatus'), 'Must support updating enquiry status');
  assert.ok(content.includes('adminAssignConsultation'), 'Must support assigning staff members');

  // Verify integration in AdminDashboardClient
  const clientPath = path.join(projectRoot, 'components', 'admin', 'AdminDashboardClient.tsx');
  const clientContent = fs.readFileSync(clientPath, 'utf8');
  assert.ok(clientContent.includes('UnifiedLeadsView'), 'AdminDashboardClient must mount UnifiedLeadsView');
});


test('ADMIN-COMMERCIAL-06: High-Ticket Revenue Pipeline & 360 Dossier Engine', () => {
  const pipelinePath = path.join(projectRoot, 'components', 'admin', 'RevenuePipelineView.tsx');
  const dossierPath = path.join(projectRoot, 'components', 'admin', 'ClientDossierDrawer.tsx');
  const whatsAppModalPath = path.join(projectRoot, 'components', 'admin', 'WhatsAppNotificationModal.tsx');
  const whatsAppRoutePath = path.join(projectRoot, 'app', 'api', 'notifications', 'whatsapp', 'route.ts');
  const paystackRoutePath = path.join(projectRoot, 'app', 'api', 'webhooks', 'paystack', 'route.ts');

  assert.ok(fs.existsSync(pipelinePath), 'RevenuePipelineView.tsx must exist');
  assert.ok(fs.existsSync(dossierPath), 'ClientDossierDrawer.tsx must exist');
  assert.ok(fs.existsSync(whatsAppModalPath), 'WhatsAppNotificationModal.tsx must exist');
  assert.ok(fs.existsSync(whatsAppRoutePath), 'WhatsApp route must exist');
  assert.ok(fs.existsSync(paystackRoutePath), 'Paystack webhook route must exist');

  // Verify Pipeline Stages
  const pipelineContent = fs.readFileSync(pipelinePath, 'utf8');
  assert.ok(pipelineContent.includes('initial_assessment'), 'Pipeline must track initial_assessment');
  assert.ok(pipelineContent.includes('consultation_paid'), 'Pipeline must track consultation_paid');
  assert.ok(pipelineContent.includes('retainer_signed'), 'Pipeline must track retainer_signed');
  assert.ok(pipelineContent.includes('document_filing'), 'Pipeline must track document_filing');
  assert.ok(pipelineContent.includes('embassy_decision'), 'Pipeline must track embassy_decision');
  assert.ok(pipelineContent.includes('commission_released'), 'Pipeline must track commission_released');
  assert.ok(pipelineContent.includes('deal_value_ngn'), 'Pipeline must support NGN currency conversion');
  assert.ok(pipelineContent.includes('deal_value_usd'), 'Pipeline must support USD currency conversion');

  // Verify 360 Dossier
  const dossierContent = fs.readFileSync(dossierPath, 'utf8');
  assert.ok(dossierContent.includes('timeline'), 'Dossier must render chronological activity timeline');
  assert.ok(dossierContent.includes('documents'), 'Dossier must render encrypted document vault');
  assert.ok(dossierContent.includes('commercial'), 'Dossier must render commercial retainer status');
  assert.ok(dossierContent.includes('notes'), 'Dossier must render case officer internal notes');
  assert.ok(dossierContent.includes('leadIntentScore'), 'Dossier must calculate lead intent score');

  // Verify WhatsApp Bridge
  const whatsAppContent = fs.readFileSync(whatsAppModalPath, 'utf8');
  assert.ok(whatsAppContent.includes('lead_acknowledgement'), 'WhatsApp must support instant intake template');
  assert.ok(whatsAppContent.includes('consultation_paid'), 'WhatsApp must support consultation paid template');
  assert.ok(whatsAppContent.includes('embassy_interview'), 'WhatsApp must support embassy interview template');
  assert.ok(whatsAppContent.includes('visa_approval'), 'WhatsApp must support visa approval celebration template');

  // Verify Paystack Webhook
  const paystackContent = fs.readFileSync(paystackRoutePath, 'utf8');
  assert.ok(paystackContent.includes('x-paystack-signature'), 'Paystack route must verify signature');
  assert.ok(paystackContent.includes('charge.success'), 'Paystack route must handle charge.success');
});

test('ADMIN-PILLARS-07: Master Navigation Structure (4 Core Pillars) & Module Merges', () => {
  const sidebarPath = path.join(projectRoot, 'components', 'admin', 'AdminSidebar.tsx');
  const talentDeskPath = path.join(projectRoot, 'components', 'admin', 'TalentRecruitmentDesk.tsx');
  const seoViewPath = path.join(projectRoot, 'components', 'admin', 'SeoCommandView.tsx');
  const catalogPath = path.join(projectRoot, 'components', 'admin', 'CatalogEcosystemView.tsx');
  const infraPath = path.join(projectRoot, 'components', 'admin', 'InfrastructureSettingsView.tsx');
  const clientPath = path.join(projectRoot, 'components', 'admin', 'AdminDashboardClient.tsx');

  assert.ok(fs.existsSync(sidebarPath), 'AdminSidebar.tsx must exist');
  assert.ok(fs.existsSync(talentDeskPath), 'TalentRecruitmentDesk.tsx must exist');
  assert.ok(fs.existsSync(seoViewPath), 'SeoCommandView.tsx must exist');
  assert.ok(fs.existsSync(catalogPath), 'CatalogEcosystemView.tsx must exist');
  assert.ok(fs.existsSync(infraPath), 'InfrastructureSettingsView.tsx must exist');

  // Verify 4 Master Pillars in Sidebar
  const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
  assert.ok(sidebarContent.includes('1. Executive Command'), 'Sidebar must define Executive Command pillar');
  assert.ok(sidebarContent.includes('2. Client Acquisition & Triage'), 'Sidebar must define Client Acquisition pillar');
  assert.ok(sidebarContent.includes('3. Talent Recruitment Desk'), 'Sidebar must define Talent Recruitment Desk pillar');
  assert.ok(sidebarContent.includes('4. Platform Governance'), 'Sidebar must define Platform Governance pillar');
  assert.ok(sidebarContent.includes("'seo'"), 'Sidebar must support SEO tab');

  // Verify Talent Recruitment Desk
  const talentContent = fs.readFileSync(talentDeskPath, 'utf8');
  assert.ok(talentContent.includes('Screening / Review'), 'Talent desk must track Screening / Review stage');
  assert.ok(talentContent.includes('Shortlisted'), 'Talent desk must track Shortlisted stage');
  assert.ok(talentContent.includes('Sent to Employer'), 'Talent desk must track employer submission');
  assert.ok(talentContent.includes('Employer Interview'), 'Talent desk must track interview');
  assert.ok(talentContent.includes('Job Offered'), 'Talent desk must track offer');
  assert.ok(talentContent.includes('Kanban Funnel'), 'Talent desk must render Kanban funnel');

  // Verify SEO Command View
  const seoContent = fs.readFileSync(seoViewPath, 'utf8');
  assert.ok(seoContent.includes('Striking Distance'), 'SEO view must feature Striking Distance keywords (ranks 4-10)');
  assert.ok(seoContent.includes('Google Search Console'), 'SEO view must integrate GSC analytics');
  assert.ok(seoContent.includes('runTechnicalSeoAudit'), 'SEO view must execute live technical audit');

  // Verify Catalog & Partner Ecosystem
  const catalogContent = fs.readFileSync(catalogPath, 'utf8');
  assert.ok(catalogContent.includes('Active Services'), 'Catalog view must manage active services');
  assert.ok(catalogContent.includes('Institutional Partners'), 'Catalog view must manage institutional partners');

  // Verify Infrastructure & Routing View
  const infraContent = fs.readFileSync(infraPath, 'utf8');
  assert.ok(infraContent.includes('SettingsView'), 'Infrastructure view must embed SettingsView');
  assert.ok(infraContent.includes('RedirectsView'), 'Infrastructure view must embed RedirectsView');
  assert.ok(infraContent.includes('AuditLogsView'), 'Infrastructure view must embed AuditLogsView');

  // Verify AdminDashboardClient integration
  const clientContent = fs.readFileSync(clientPath, 'utf8');
  assert.ok(clientContent.includes('TalentRecruitmentDesk'), 'Dashboard client must mount TalentRecruitmentDesk');
  assert.ok(clientContent.includes('SeoCommandView'), 'Dashboard client must mount SeoCommandView');
  assert.ok(clientContent.includes('CatalogEcosystemView'), 'Dashboard client must mount CatalogEcosystemView');
  assert.ok(clientContent.includes('InfrastructureSettingsView'), 'Dashboard client must mount InfrastructureSettingsView');
});
