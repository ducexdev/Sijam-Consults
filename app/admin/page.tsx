import React from 'react';
import { redirect } from 'next/navigation';
import { dbRepository } from '@/lib/db/repository';
import { getStaffSession } from '@/app/actions/auth';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const metadata = {
  title: 'Administrative Operations Hub | SIJAM Consults Limited',
  description: 'Confidential case management, candidate intake, and consular intelligence portal.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  // 1. Enforce Server-Side Authentication Guard
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    redirect('/admin/login');
  }

  // 2. Server-side data fetching directly from repository
  const [
    metrics,
    consultations,
    contactMessages,
    jobs,
    jobCategories,
    employers,
    applications,
    testimonials,
    blogPosts,
    services,
    partners,
    redirects,
    staffList,
    auditLogs,
    dailyMetrics,
  ] = await Promise.all([
    dbRepository.getDashboardMetrics(),
    dbRepository.getConsultations(),
    dbRepository.getContactMessages(),
    dbRepository.getJobs(),
    dbRepository.getJobCategories(),
    dbRepository.getEmployers(),
    dbRepository.getApplications(),
    dbRepository.getTestimonials(),
    dbRepository.getBlogPosts(),
    dbRepository.getServices(),
    dbRepository.getPartners(),
    dbRepository.getRedirects(),
    dbRepository.getStaffProfiles(),
    dbRepository.getAuditLogs(100),
    dbRepository.getDailyMetrics30d(),
  ]);

  return (
    <AdminDashboardClient
      authenticatedStaff={profile}
      initialMetrics={metrics}
      initialDailyMetrics={dailyMetrics}
      initialConsultations={consultations}
      initialContactMessages={contactMessages}
      initialJobs={jobs}
      initialJobCategories={jobCategories}
      initialEmployers={employers}
      initialApplications={applications}
      initialTestimonials={testimonials}
      initialBlogPosts={blogPosts}
      initialServices={services}
      initialPartners={partners}
      initialRedirects={redirects}
      initialStaffList={staffList}
      initialAuditLogs={auditLogs}
    />
  );
}
