import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'SIJAM Staff Operations Portal | Internal Restricted Access',
  description: 'Administrative portal for Sijam Consults Limited case officers and intake coordinators.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-slate-100 font-sans selection:bg-[#402493] selection:text-white">
      {children}
    </div>
  );
}
