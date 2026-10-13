import type { Metadata } from "next";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

export const metadata: Metadata = {
  metadataBase: new URL('https://sijamconsults.com'),
  title: {
    default: "Sijam Consults Limited | Premier Immigration, Study & Travel Agency (RC: 1715416)",
    template: "%s | Sijam Consults Limited",
  },
  description: "Unlock global opportunities with Sijam Consults Limited (CAC RC: 1715416). Study abroad admissions, overseas work permits, European company registration, flight bookings, and embassy document legalisation in Nigeria.",
  keywords: "immigration agency Nigeria, study abroad Kaduna, work permit Europe, Schengen business visa, flight reservations Kaduna, travel consultant Nigeria",
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
