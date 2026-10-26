'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  Sparkles,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  ProfileRecord,
  ConsultationRequestRecord,
  ContactMessageRecord,
  JobRecord,
  JobCategoryRecord,
  EmployerRecord,
  JobApplicationRecord,
  TestimonialRecord,
  BlogPostRecord,
  RedirectRecord,
  AuditLogRecord,
} from '@/lib/types/database';
import { ServiceItem, CorporatePartner } from '@/lib/types';
import { COMPANY } from '@/lib/routes';
import { logoutStaff, changeOwnPassword } from '@/app/actions/auth';

import { AdminHeader } from './AdminHeader';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { OverviewView } from './OverviewView';
import { RevenuePipelineView } from './RevenuePipelineView';
import { SeoCommandView } from './SeoCommandView';
import { ConsultationsView } from './ConsultationsView';
import { ContactMessagesView } from './ContactMessagesView';
import { UnifiedLeadsView } from './UnifiedLeadsView';
import { TalentRecruitmentDesk } from './TalentRecruitmentDesk';
import { JobsView } from './JobsView';
import { ApplicationsView } from './ApplicationsView';
import { TestimonialsView } from './TestimonialsView';
import { BlogView } from './BlogView';
import { CatalogEcosystemView } from './CatalogEcosystemView';
import { MediaView } from './MediaView';
import { InfrastructureSettingsView } from './InfrastructureSettingsView';
import { SettingsView } from './SettingsView';
import { RedirectsView } from './RedirectsView';
import { StaffView } from './StaffView';
import { AuditLogsView } from './AuditLogsView';

interface AdminDashboardClientProps {
  authenticatedStaff?: ProfileRecord;
  initialMetrics: {
    pendingConsultations: number;
    scheduledAppointments: number;
    openJobs: number;
    totalApplications: number;
    pendingApplications: number;
    pendingTestimonials: number;
    publishedArticles: number;
    totalStaff: number;
  };
  initialDailyMetrics?: { date: string; consultations: number; applications: number; enquiries: number; testimonials: number; blog_posts: number }[];
  initialConsultations: ConsultationRequestRecord[];
  initialContactMessages: ContactMessageRecord[];
  initialJobs: JobRecord[];
  initialJobCategories: JobCategoryRecord[];
  initialEmployers: EmployerRecord[];
  initialApplications: JobApplicationRecord[];
  initialTestimonials: TestimonialRecord[];
  initialBlogPosts: BlogPostRecord[];
  initialServices: ServiceItem[];
  initialPartners: CorporatePartner[];
  initialRedirects: RedirectRecord[];
  initialStaffList: ProfileRecord[];
  initialAuditLogs: AuditLogRecord[];
}

export function AdminDashboardClient({
  authenticatedStaff,
  initialMetrics,
  initialDailyMetrics,
  initialConsultations,
  initialContactMessages,
  initialJobs,
  initialJobCategories,
  initialEmployers,
  initialApplications,
  initialTestimonials,
  initialBlogPosts,
  initialServices,
  initialPartners,
  initialRedirects,
  initialStaffList,
  initialAuditLogs,
}: AdminDashboardClientProps) {
  const router = useRouter();

  // Authentication State: Enforce server-provided authenticated session
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(authenticatedStaff));

  // Active Staff & Navigation
  const [currentStaff] = useState<ProfileRecord | null>(authenticatedStaff || null);
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  // Change Password Modal State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleSignOut = async () => {
    await logoutStaff();
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  const handleRefresh = () => {
    router.refresh();
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (newPassword !== confirmPassword) {
      setPwdError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setPwdError('New password must be at least 8 characters in length.');
      return;
    }

    setPwdLoading(true);
    try {
      const res = await changeOwnPassword({
        currentPassword: currPassword,
        newPassword,
      });

      if (res.success) {
        setPwdSuccess('Your account password has been updated securely.');
        setCurrPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setIsChangePasswordOpen(false);
          setPwdSuccess('');
        }, 1500);
      } else {
        setPwdError(res.message);
      }
    } catch (err) {
      setPwdError('Failed to update password. Please try again.');
    } finally {
      setPwdLoading(false);
    }
  };

  // If not authenticated, render the secure authentication gate linking to /admin/login
  if (!isAuthenticated || !currentStaff) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center p-6 bg-[#070B14]">
        <div className="max-w-md w-full space-y-6">
          <Card className="p-8 bg-[#0E1626] border-slate-800 text-slate-100 shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">
                Kaduna Consular Hub • RC: 1715416
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-white">
                SIJAM Operations Hub
              </h1>
              <p className="text-xs text-slate-400">
                An authenticated staff session is required to access client dossiers and administrative controls.
              </p>
            </div>

            <Button
              onClick={() => router.push('/admin/login')}
              variant="primary"
              size="md"
              className="w-full justify-center shadow-lg shadow-purple-950/50"
            >
              Sign In with Staff Credentials
            </Button>

            <div className="text-[10px] text-slate-500 font-mono pt-1">
              Protected under NDPR 2023 & statutory consular audit protocols.
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Once authenticated, render the full SaaS platform
  return (
    <div className="min-h-screen bg-[#050814] flex flex-col text-slate-100">
      {/* Top Header */}
      <AdminHeader
        currentStaff={currentStaff}
        onSignOut={handleSignOut}
        onChangePassword={() => {
          setPwdError('');
          setPwdSuccess('');
          setIsChangePasswordOpen(true);
        }}
      />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          role={currentStaff.role}
          counts={{
            pendingConsultations: initialMetrics.pendingConsultations,
            openJobs: initialMetrics.openJobs,
            pendingApplications: initialMetrics.pendingApplications,
            pendingTestimonials: initialMetrics.pendingTestimonials,
          }}
        />

        {/* Content View Container */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full">
          {currentTab === 'overview' && (
            <OverviewView
              metrics={initialMetrics}
              dailyMetrics={initialDailyMetrics}
              recentConsultations={initialConsultations}
              recentApplications={initialApplications}
              pendingReviews={initialTestimonials.filter((t) => t.status === 'pending_moderation')}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'revenue' && (
            <RevenuePipelineView
              staffList={initialStaffList}
            />
          )}

          {currentTab === 'seo' && (
            <SeoCommandView />
          )}

          {currentTab === 'consultations' && (
            <UnifiedLeadsView
              consultations={initialConsultations}
              messages={initialContactMessages}
              staffList={initialStaffList}
              initialSegment="all"
              onRefresh={handleRefresh}
            />
          )}

          {currentTab === 'enquiries' && (
            <UnifiedLeadsView
              consultations={initialConsultations}
              messages={initialContactMessages}
              staffList={initialStaffList}
              initialSegment="enquiries"
              onRefresh={handleRefresh}
            />
          )}

          {(currentTab === 'jobs' || currentTab === 'applications') && (
            <TalentRecruitmentDesk
              jobs={initialJobs}
              categories={initialJobCategories}
              employers={initialEmployers}
              applications={initialApplications}
              onRefresh={handleRefresh}
            />
          )}

          {currentTab === 'testimonials' && (
            <TestimonialsView
              testimonials={initialTestimonials}
              onRefresh={handleRefresh}
            />
          )}

          {currentTab === 'blog' && (
            <BlogView
              posts={initialBlogPosts}
              onRefresh={handleRefresh}
            />
          )}

          {currentTab === 'services' && (
            <CatalogEcosystemView
              services={initialServices}
              partners={initialPartners}
            />
          )}

          {currentTab === 'media' && <MediaView />}

          {(currentTab === 'settings' || currentTab === 'redirects' || currentTab === 'audit_logs') && (
            <InfrastructureSettingsView
              initialSubTab={
                currentTab === 'redirects'
                  ? 'redirects'
                  : currentTab === 'audit_logs'
                  ? 'audit_logs'
                  : 'settings'
              }
              redirects={initialRedirects}
              auditLogs={initialAuditLogs}
              onRefresh={handleRefresh}
            />
          )}

          {currentTab === 'staff' && (
            <StaffView
              staffList={initialStaffList}
              onRefresh={handleRefresh}
            />
          )}
        </main>
      </div>

      {/* Modal: Change My Account Password */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121B2B] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-400" />
                <h3 className="font-heading font-bold text-base text-white">
                  Update Account Password
                </h3>
              </div>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Update credentials for <strong className="text-white">{currentStaff.email}</strong>. New password will take effect immediately.
            </p>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  New Password (min 8 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter strong new password..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-slate-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {pwdError && (
                <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pwdError}</span>
                </div>
              )}

              {pwdSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{pwdSuccess}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-3.5 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg transition"
                >
                  {pwdLoading ? 'Updating...' : 'Save New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
