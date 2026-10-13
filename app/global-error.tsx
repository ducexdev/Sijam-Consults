'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#FAF8FF] font-sans p-6">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-purple-100 shadow-xl">
          <h2 className="font-bold text-2xl text-[#0F172A]">Application Error</h2>
          <p className="text-sm text-slate-600">
            A critical error occurred while initializing the portal.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#402493] text-white rounded-xl text-sm font-bold"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
