import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(process.cwd());

test('PHASE-A: Lead Triage & Speed-to-Lead Consolidation', () => {
  const leadsPath = path.join(REPO_ROOT, 'components/admin/UnifiedLeadsView.tsx');
  assert.ok(fs.existsSync(leadsPath), 'UnifiedLeadsView.tsx must exist');
  const code = fs.readFileSync(leadsPath, 'utf8');

  // Merged consultations and contact messages
  assert.ok(code.includes('consultation') && code.includes('contact_enquiry'), 'Must merge consultations and contact enquiries');
  // Visual SLA clocks
  assert.ok(code.includes('< 15m') && code.includes('< 1h') && code.includes('Breached'), 'Must feature < 15m, < 1h, and Breached visual SLA clocks');
  // Quick Action dropdown
  assert.ok(code.includes('Assign to Case Officer'), 'Must include Assign to Case Officer action');
  assert.ok(code.includes('Mark Contacted'), 'Must include Mark Contacted action');
  assert.ok(code.includes('Schedule Interview'), 'Must include Schedule Interview action');
});

test('PHASE-B: GSC Traffic Intelligence Engine & Edge API Route', () => {
  const apiRoutePath = path.join(REPO_ROOT, 'app/api/admin/seo/gsc/route.ts');
  assert.ok(fs.existsSync(apiRoutePath), 'app/api/admin/seo/gsc/route.ts must exist');
  const apiCode = fs.readFileSync(apiRoutePath, 'utf8');
  assert.ok(apiCode.includes('requireAdminSession'), 'Must enforce requireAdminSession authentication');
  assert.ok(apiCode.includes('getValidGscToken'), 'Must use Edge-compatible JWT token exchange');

  const gscViewPath = path.join(REPO_ROOT, 'components/admin/GscAnalyticsView.tsx');
  assert.ok(fs.existsSync(gscViewPath), 'GscAnalyticsView.tsx must exist');

  const seoCmdPath = path.join(REPO_ROOT, 'components/admin/SeoCommandView.tsx');
  const seoCode = fs.readFileSync(seoCmdPath, 'utf8');
  assert.ok(seoCode.includes('7d') && seoCode.includes('28d') && seoCode.includes('90d'), 'Must provide 7d, 28d, 90d date range selector');
  assert.ok(seoCode.includes('CURATED_STRIKING_DISTANCE_KEYWORDS'), 'Must include Striking Distance keyword matrix');
  assert.ok(seoCode.includes('runTechnicalSeoAudit'), 'Must integrate technical SEO audit as a sub-tab');
});

test('PHASE-C: Talent Recruitment Desk & Candidate Kanban', () => {
  const deskPath = path.join(REPO_ROOT, 'components/admin/TalentRecruitmentDesk.tsx');
  assert.ok(fs.existsSync(deskPath), 'TalentRecruitmentDesk.tsx must exist');
  const code = fs.readFileSync(deskPath, 'utf8');

  // Verify Unified Jobs & Applications
  assert.ok(code.includes('jobs') && code.includes('applications'), 'Must unify jobs and applications');

  // Verify Segmented Kanban Stages
  assert.ok(code.includes('New Applications'), 'Must feature New Applications stage');
  assert.ok(code.includes('Screening'), 'Must feature Screening stage');
  assert.ok(code.includes('Employer Review'), 'Must feature Employer Review stage');
  assert.ok(code.includes('Voivodeship Permit Filing'), 'Must feature Voivodeship Permit Filing stage');
  assert.ok(code.includes('Approved'), 'Must feature Approved stage');

  // Verify 15-minute signed URL previewer
  assert.ok(code.includes('/api/media/signed-url'), 'Must call /api/media/signed-url for encrypted candidate CVs');
  assert.ok(code.includes('900') || code.includes('signedUrlCountdown'), 'Must implement 15-minute countdown timer');
});

test('PHASE-D: Catalog Governance & Commercial Retainer Pipeline', () => {
  // Migration
  const migrationPath = path.join(REPO_ROOT, 'supabase/migrations/20261024000002_catalog_and_pipeline.sql');
  assert.ok(fs.existsSync(migrationPath), '20261024000002_catalog_and_pipeline.sql must exist');
  const sql = fs.readFileSync(migrationPath, 'utf8');
  assert.ok(sql.includes('create table if not exists public.services'), 'Must create public.services table');
  assert.ok(sql.includes('create table if not exists public.corporate_partners'), 'Must create public.corporate_partners table');
  assert.ok(sql.includes('create table if not exists public.retainer_deals'), 'Must create public.retainer_deals table');

  // ServicesView editing & toggle capabilities
  const srvPath = path.join(REPO_ROOT, 'components/admin/ServicesView.tsx');
  assert.ok(fs.existsSync(srvPath), 'ServicesView.tsx must exist');
  const srvCode = fs.readFileSync(srvPath, 'utf8');
  assert.ok(srvCode.includes('handleToggleService'), 'Must implement service toggle active/hidden capability');
  assert.ok(srvCode.includes('handleSaveService'), 'Must implement service edit saving capability');
  assert.ok(srvCode.includes('handleSavePartner'), 'Must implement corporate partner registration and edit capability');

  // Commercial Retainer Pipeline in OverviewView
  const overviewPath = path.join(REPO_ROOT, 'components/admin/OverviewView.tsx');
  assert.ok(fs.existsSync(overviewPath), 'OverviewView.tsx must exist');
  const overviewCode = fs.readFileSync(overviewPath, 'utf8');
  assert.ok(overviewCode.includes('Commercial Retainer Pipeline'), 'Must feature Commercial Retainer Pipeline');
  assert.ok(overviewCode.includes('Gross Booking Volume'), 'Must track Gross Booking Volume');
  assert.ok(overviewCode.includes('Retainer Deposits Collected'), 'Must track Retainer Deposits Collected');
  assert.ok(overviewCode.includes('Commission Disbursements'), 'Must track Commission Disbursements');
  assert.ok(overviewCode.includes('generateDynamicWavePath'), 'Must feature dynamic sparklines from time-series metrics');
});
