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
