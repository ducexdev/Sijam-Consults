'use client';

import { JobRecord, JobStatus, JobApplicationStatus } from '@/lib/types/database';

export interface CreateJobInput {
  title: string;
  slug?: string;
  employerId?: string | null;
  employerName: string;
  categoryId: string;
  country: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Seasonal' | 'Apprenticeship';
  salaryRange?: string;
  description: string;
  responsibilities: string[];
  eligibilityRequirements: string[];
  visaSupportDetails: string;
  applicationInstructions: string;
  deadline: string;
  status: JobStatus;
  acceptsApplications: boolean;
  ageRequirement?: string | null;
  eligibleCountries?: string[] | null;
  processingTime?: string | null;
  generalWorkerSectors?: string[] | null;
}

export async function apiCreateJob(jobData: CreateJobInput, adminId?: string): Promise<JobRecord> {
  const res = await fetch('/api/jobs/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...jobData, adminId }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to publish job vacancy.');
  }
  return data.job;
}

export async function apiUpdateJob(id: string, updates: Partial<JobRecord>, adminId?: string): Promise<JobRecord> {
  const res = await fetch('/api/jobs/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, updates, adminId }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update job vacancy.');
  }
  return data.job;
}

export async function apiDeleteJob(id: string, adminId?: string): Promise<boolean> {
  const res = await fetch('/api/jobs/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, adminId }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete job listing.');
  }
  return data.deleted;
}

export async function apiUpdateApplicationStatus(
  id: string,
  newStatus: JobApplicationStatus,
  note?: string,
  adminId?: string
) {
  const res = await fetch('/api/jobs/application-status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, newStatus, note, adminId }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update application status.');
  }
  return data.application;
}

export async function apiApplyCandidate(formData: any) {
  const res = await fetch('/api/jobs/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return await res.json();
}

export async function apiLoginStaff(credentials: { email: string; password: string; rememberMe?: boolean }) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return await res.json();
}

export async function apiLogoutStaff() {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  return await res.json();
}

export async function apiGetStaffSession() {
  try {
    const res = await fetch('/api/auth/session', { cache: 'no-store' });
    if (!res.ok) return { session: null, profile: null };
    return await res.json();
  } catch (err) {
    console.error('Session check error:', err);
    return { session: null, profile: null };
  }
}
