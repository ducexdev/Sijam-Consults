// SEO metadata wrapper for the Cookies / Cookie Preferences page.
// The page itself is a client component (useState for cookie toggles), so
// metadata must be exported from this server-side layout instead.
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cookie Preferences | Sijam Consults Limited',
  description:
    'Manage your cookie preferences for Sijam Consults Limited. Control analytics, marketing, and functional cookies in line with our NDPR compliance commitment.',
  alternates: {
    canonical: 'https://sijamconsults.com/cookies',
  },
};

export default function CookiesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
