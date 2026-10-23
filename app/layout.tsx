import type { Metadata } from "next";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

export const metadata: Metadata = {
  metadataBase: new URL('https://sijamconsults.com'),
  title: {
    default: "Sijam Consults Limited | International Recruitment, Manpower Supply & Global Mobility (RC: 1715416)",
    template: "%s | Sijam Consults Limited",
  },
  description: "Unlock global careers and overseas migration with Sijam Consults Limited (CAC RC: 1715416). Licensed international recruitment & manpower supply, verified foreign employer quotas (UK, Poland, Slovakia, Saudi Arabia), European work permits, study abroad, and B2B workforce sourcing.",
  keywords: "international recruitment agency Nigeria, manpower supply agency, overseas jobs Nigeria, work permit Europe, Poland work permit, Slovakia work permit, Saudi Arabia recruitment, study abroad, travel consultancy, European business setup, Sijam Consults",
  openGraph: {
    title: "Sijam Consults Limited | Premier Immigration & Travel Agency",
    description: "Bridging Nigerian students, professionals, and entrepreneurs with authentic global opportunities.",
    url: "https://sijamconsults.com",
    siteName: "Sijam Consults Limited",
    images: [
      {
        url: "/og/sijam-og-default.png",
        width: 1200,
        height: 630,
        alt: "Sijam Consults Limited — Immigration & Travel Advisory",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sijam Consults Limited | Immigration & Travel Advisory",
    description: "Bridging Nigerian students, professionals, and entrepreneurs with authentic global opportunities.",
    images: ["/og/sijam-og-default.png"],
  },
  alternates: {
    canonical: "https://sijamconsults.com",
    types: {
      "application/rss+xml": "https://sijamconsults.com/blog/rss.xml",
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/brand/favicon.png', type: 'image/png' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="icon" href="/brand/favicon.png" type="image/png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Sijam Consults Blog RSS Feed"
          href="https://sijamconsults.com/blog/rss.xml"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8FF] text-[#0F172A] font-sans">
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
