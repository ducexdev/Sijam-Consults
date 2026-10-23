import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// HTTP Security Headers — Phase 3a Security Remediation (SEC-A02)
// Applied to all non-static routes.  Static/_next assets are exempt via the
// source pattern below.  CSP is set to a permissive-but-structured baseline;
// tighten nonce/hash policy before enabling 'strict-dynamic'.
// ---------------------------------------------------------------------------
const SECURITY_HEADERS = [
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Referrer: full origin on same-origin, origin only cross-origin, nothing on downgrade
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser APIs available to the page
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'accelerometer=()',
      'gyroscope=()',
      'magnetometer=()',
    ].join(', '),
  },
  // HSTS — 1 year, include subdomains, preload-ready
  // NOTE: Only effective when served over HTTPS (Cloudflare enforces this)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Content-Security-Policy — permissive baseline
  // TODO(security): progressively tighten: remove 'unsafe-inline'/'unsafe-eval',
  //   add nonce or hash-based CSP once inline scripts are refactored.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js chunks + Supabase API
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.supabase.co https://sijamconsults.com",
      // Supabase Realtime/REST API and email webhook
      "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        // Apply to all routes except static files
        source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)$).*)',
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/study-visa', destination: '/services/study-visa', permanent: true },
      { source: '/study-visa/', destination: '/services/study-visa', permanent: true },
      { source: '/work-permit-and-employment-placement-visa', destination: '/services/work-visa', permanent: true },
      { source: '/work-permit-and-employment-placement-visa/', destination: '/services/work-visa', permanent: true },
      { source: '/tourist-visa-2', destination: '/services/tourist-visa', permanent: true },
      { source: '/tourist-visa-2/', destination: '/services/tourist-visa', permanent: true },
      { source: '/tourist-visa', destination: '/services/tourist-visa', permanent: true },
      { source: '/tourist-visa/', destination: '/services/tourist-visa', permanent: true },
      { source: '/visa-application-assistance', destination: '/services/visa-assistance', permanent: true },
      { source: '/visa-application-assistance/', destination: '/services/visa-assistance', permanent: true },
      { source: '/business-company-registration', destination: '/services/business-registration', permanent: true },
      { source: '/business-company-registration/', destination: '/services/business-registration', permanent: true },
      { source: '/foreign-company-registration', destination: '/services/business-registration', permanent: true },
      { source: '/foreign-company-registration/', destination: '/services/business-registration', permanent: true },
      { source: '/travel-document-legalization', destination: '/services/document-legalization', permanent: true },
      { source: '/travel-document-legalization/', destination: '/services/document-legalization', permanent: true },
      { source: '/document-legalization', destination: '/services/document-legalization', permanent: true },
      { source: '/document-legalization/', destination: '/services/document-legalization', permanent: true },
      { source: '/flight-reservation-ticketing', destination: '/services/flight-reservations', permanent: true },
      { source: '/flight-reservation-ticketing/', destination: '/services/flight-reservations', permanent: true },
      { source: '/flight-reservation-and-ticketing', destination: '/services/flight-reservations', permanent: true },
      { source: '/flight-reservation-and-ticketing/', destination: '/services/flight-reservations', permanent: true },
      { source: '/flight-reservations', destination: '/services/flight-reservations', permanent: true },
      { source: '/flight-reservations/', destination: '/services/flight-reservations', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/what-clients-say', destination: '/reviews', permanent: true },
      { source: '/what-clients-say/', destination: '/reviews', permanent: true },
      { source: '/immigration-and-travel-guides', destination: '/guides', permanent: true },
      { source: '/immigration-and-travel-guides/', destination: '/guides', permanent: true },
      { source: '/travel-guides', destination: '/guides', permanent: true },
      { source: '/travel-guides/', destination: '/guides', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/privacy-policy/', destination: '/privacy', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/terms-and-conditions/', destination: '/terms', permanent: true },
      { source: '/cookie-preferences', destination: '/cookies', permanent: true },
      { source: '/cookie-preferences/', destination: '/cookies', permanent: true },
      { source: '/why-study-nursing-in-canada-2026-2027', destination: '/blog/why-study-nursing-canada-2026', permanent: true },
      { source: '/why-study-nursing-in-canada-2026-2027/', destination: '/blog/why-study-nursing-canada-2026', permanent: true },
      { source: '/blog/why-study-nursing-in-canada-2026-2027', destination: '/blog/why-study-nursing-canada-2026', permanent: true },
      { source: '/blog/why-study-nursing-in-canada-2026-2027/', destination: '/blog/why-study-nursing-canada-2026', permanent: true },
    ];
  },
};

export default nextConfig;
