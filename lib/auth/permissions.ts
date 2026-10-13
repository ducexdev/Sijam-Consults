// ==============================================================================
// SIJAM Consults Limited (RC: 1715416) - Role-Based Access Control & Permissions Matrix
// ==============================================================================

import { AdminRole } from '@/lib/types/database';

export type Permission =
  // Dashboard & Metrics
  | 'dashboard:view'
  | 'dashboard:metrics'
  
  // Consultations Engine
  | 'consultations:view'
  | 'consultations:assign'
  | 'consultations:update_status'
  | 'consultations:add_notes'
  | 'consultations:schedule'
  | 'consultations:export'
  | 'consultations:delete'
  
  // Jobs & Recruitment Engine
  | 'jobs:view'
  | 'jobs:create'
  | 'jobs:edit'
  | 'jobs:publish'
  | 'jobs:close'
  | 'jobs:delete'
  | 'jobs:manage_categories'
  | 'jobs:manage_employers'
  
  // Job Applications (Sensitive Candidate PII)
  | 'applications:view'
  | 'applications:review'
  | 'applications:update_status'
  | 'applications:add_notes'
  | 'applications:download_cv'
  | 'applications:export'
  
  // Testimonials Engine
  | 'testimonials:view'
  | 'testimonials:moderate'
  | 'testimonials:create_verified'
  | 'testimonials:delete'
  
  // Content & Blogging Engine
  | 'content:view'
  | 'content:create'
  | 'content:edit'
  | 'content:publish'
  | 'content:manage_revisions'
  | 'content:delete'
  
  // Services & Partners Catalog
  | 'services:manage'
  | 'partners:manage'
  | 'faqs:manage'
  
  // Media Library
  | 'media:view'
  | 'media:upload'
  | 'media:delete'
  
  // Site Settings, SEO & Infrastructure
  | 'settings:view'
  | 'settings:edit'
  | 'redirects:manage'
  | 'seo:manage'
  | 'smtp:test'
  
  // Staff & Audit Logs (Super Admin privileged)
  | 'users:view'
  | 'users:manage_roles'
  | 'audit_logs:view';

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  super_admin: [
    'dashboard:view', 'dashboard:metrics',
    'consultations:view', 'consultations:assign', 'consultations:update_status', 'consultations:add_notes', 'consultations:schedule', 'consultations:export', 'consultations:delete',
    'jobs:view', 'jobs:create', 'jobs:edit', 'jobs:publish', 'jobs:close', 'jobs:delete', 'jobs:manage_categories', 'jobs:manage_employers',
    'applications:view', 'applications:review', 'applications:update_status', 'applications:add_notes', 'applications:download_cv', 'applications:export',
    'testimonials:view', 'testimonials:moderate', 'testimonials:create_verified', 'testimonials:delete',
    'content:view', 'content:create', 'content:edit', 'content:publish', 'content:manage_revisions', 'content:delete',
    'services:manage', 'partners:manage', 'faqs:manage',
    'media:view', 'media:upload', 'media:delete',
    'settings:view', 'settings:edit', 'redirects:manage', 'seo:manage', 'smtp:test',
    'users:view', 'users:manage_roles', 'audit_logs:view',
  ],

  admin: [
    'dashboard:view', 'dashboard:metrics',
    'consultations:view', 'consultations:assign', 'consultations:update_status', 'consultations:add_notes', 'consultations:schedule', 'consultations:export',
    'jobs:view', 'jobs:create', 'jobs:edit', 'jobs:publish', 'jobs:close', 'jobs:manage_categories', 'jobs:manage_employers',
    'applications:view', 'applications:review', 'applications:update_status', 'applications:add_notes', 'applications:download_cv', 'applications:export',
    'testimonials:view', 'testimonials:moderate', 'testimonials:create_verified',
    'content:view', 'content:create', 'content:edit', 'content:publish', 'content:manage_revisions',
    'services:manage', 'partners:manage', 'faqs:manage',
    'media:view', 'media:upload',
    'settings:view', 'redirects:manage', 'seo:manage', 'smtp:test',
    'users:view', 'audit_logs:view',
  ],

  consultation_manager: [
    'dashboard:view', 'dashboard:metrics',
    'consultations:view', 'consultations:assign', 'consultations:update_status', 'consultations:add_notes', 'consultations:schedule', 'consultations:export',
    'media:view',
  ],

  recruitment_manager: [
    'dashboard:view', 'dashboard:metrics',
    'jobs:view', 'jobs:create', 'jobs:edit', 'jobs:publish', 'jobs:close', 'jobs:manage_categories', 'jobs:manage_employers',
    'applications:view', 'applications:review', 'applications:update_status', 'applications:add_notes', 'applications:download_cv', 'applications:export',
    'media:view', 'media:upload',
  ],

  content_editor: [
    'dashboard:view',
    'content:view', 'content:create', 'content:edit', 'content:publish', 'content:manage_revisions',
    'services:manage', 'partners:manage', 'faqs:manage',
    'media:view', 'media:upload',
    'seo:manage',
  ],

  reviewer_moderator: [
    'dashboard:view',
    'testimonials:view', 'testimonials:moderate', 'testimonials:create_verified',
  ],
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return Boolean(permissions && permissions.includes(permission));
}

export function getRoleBadgeColor(role: AdminRole): { bg: string; text: string; border: string } {
  switch (role) {
    case 'super_admin':
      return { bg: 'bg-purple-950', text: 'text-purple-300', border: 'border-purple-700' };
    case 'admin':
      return { bg: 'bg-indigo-950', text: 'text-indigo-300', border: 'border-indigo-700' };
    case 'consultation_manager':
      return { bg: 'bg-blue-950', text: 'text-blue-300', border: 'border-blue-700' };
    case 'recruitment_manager':
      return { bg: 'bg-emerald-950', text: 'text-emerald-300', border: 'border-emerald-700' };
    case 'content_editor':
      return { bg: 'bg-amber-950', text: 'text-amber-300', border: 'border-amber-700' };
    case 'reviewer_moderator':
      return { bg: 'bg-rose-950', text: 'text-rose-300', border: 'border-rose-700' };
  }
}

export function formatRoleLabel(role: AdminRole): string {
  switch (role) {
    case 'super_admin':
      return 'Super Administrator';
    case 'admin':
      return 'Administrator';
    case 'consultation_manager':
      return 'Consultation Manager';
    case 'recruitment_manager':
      return 'Recruitment Manager';
    case 'content_editor':
      return 'Content Editor';
    case 'reviewer_moderator':
      return 'Reviewer / Moderator';
  }
}
