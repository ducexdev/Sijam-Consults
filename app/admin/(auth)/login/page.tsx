'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { requestPasswordResetCode } from '@/app/actions/auth';
import { COMPANY, ROUTES } from '@/lib/routes';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetResult, setResetResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const res = await resp.json();

      if (res.success) {
        window.location.href = '/admin';
      } else {
        setErrorMessage(res.message || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      console.error('Login submission error:', err);
      setErrorMessage('A network or server error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    setResetResult(null);

    try {
      const res = await requestPasswordResetCode(resetEmail);
      setResetResult(res.message);
    } catch (err) {
      console.error(err);
      setResetResult('Unable to process reset request. Please check cPanel SMTP connectivity.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#070B14] text-slate-100 font-sans selection:bg-[#402493] selection:text-white">
      {/* Top Simple Nav */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-[#0A0F1D]/80 backdrop-blur-md">
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <div className="relative w-36 h-9">
            <Image
              src="/brand/logo-white.png"
              alt="Sijam Consults"
              fill
              sizes="144px"
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider bg-purple-950 text-purple-300 px-2.5 py-0.5 rounded border border-purple-800 hidden sm:inline">
            Executive Portal
          </span>
        </Link>

        <Link
          href={ROUTES.home}
          target="_blank"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>Return to Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full space-y-5 animate-in fade-in duration-300">
          <div className="bg-[#0E1626] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#402493] via-[#257CFF] to-[#F98864]" />

            {/* Header Badge */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E1442] to-[#0A0E1A] border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-6 h-6 text-[#257CFF]" />
              </div>
              <h1 className="font-heading font-black text-2xl text-white">
                Welcome Back!
              </h1>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Confidential access for authorized case officers, immigration consultants, and platform administrators.
              </p>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 mb-5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Staff Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@sijamconsults.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#090D18] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-purple-400 hover:text-purple-300 transition cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password..."
                    className="w-full pl-10 pr-10 py-2.5 bg-[#090D18] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Keep me signed in for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#257CFF]/30 transition cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Support Notice */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 bg-slate-950/40 rounded-2xl p-3.5 text-[11px] text-slate-400 space-y-1.5 border border-slate-800">
              <div className="flex items-center gap-1.5 font-bold text-purple-300 uppercase tracking-wider text-[10px]">
                <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                Staff Access
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Use your assigned staff email and password. If you have forgotten your password, use the &ldquo;Forgot password?&rdquo; link above to receive a reset token. Contact your Super Administrator if you do not have access.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1626] border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-purple-400" />
                Staff Password Recovery
              </h3>
              <button
                onClick={() => {
                  setShowForgotModal(false);
                  setResetResult(null);
                }}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your official staff email address. Our cPanel SMTP mailer will transmit a 6-digit one-time access verification code.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                  Registered Staff Email
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="officer@sijamconsults.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              {resetResult && (
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800 text-purple-200 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{resetResult}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetResult(null);
                  }}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition cursor-pointer"
                >
                  {resetLoading ? 'Transmitting...' : 'Send Security Token'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-3 border-t border-slate-800/80 text-center text-xs text-slate-500 bg-[#0A0F1D]/80">
        © 2026 {COMPANY.name} • Registered in Nigeria (RC: 1715416) • Authorized Personnel Only
      </footer>
    </div>
  );
}
