'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF8FF] p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-md">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-2xl text-[#0F172A]">
            Temporarily Unavailable
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We encountered an unexpected technical issue loading this advisory view. Our systems have logged this event for review.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} variant="primary" size="md">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Try Again
          </Button>
          <Button href={ROUTES.home} variant="outline" size="md">
            <Home className="w-4 h-4 mr-1.5" /> Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
