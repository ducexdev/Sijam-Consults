import React from 'react';
import { redirect } from 'next/navigation';
import { getStaffSession } from '@/app/actions/auth';

/**
 * Protected admin layout — enforces server-side session authentication for
 * all routes nested under /admin/(protected)/* (i.e. /admin/posts, /admin/seo).
 *
 * This is a Server Component. It runs before any 'use client' child page,
 * so even purely client-rendered dashboard pages cannot bypass this guard.
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, profile } = await getStaffSession();
  if (!session || !profile) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
