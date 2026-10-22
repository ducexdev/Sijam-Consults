import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/study-visa', destination: '/services/study-visa', permanent: true },
      { source: '/work-permit-and-employment-placement-visa', destination: '/services/work-visa', permanent: true },
      { source: '/tourist-visa-2', destination: '/services/tourist-visa', permanent: true },
      { source: '/tourist-visa', destination: '/services/tourist-visa', permanent: true },
      { source: '/visa-application-assistance', destination: '/services/visa-assistance', permanent: true },
      { source: '/business-company-registration', destination: '/services/business-registration', permanent: true },
      { source: '/foreign-company-registration', destination: '/services/business-registration', permanent: true },
      { source: '/travel-document-legalization', destination: '/services/document-legalization', permanent: true },
      { source: '/document-legalization', destination: '/services/document-legalization', permanent: true },
      { source: '/flight-reservation-ticketing', destination: '/services/flight-reservations', permanent: true },
      { source: '/flight-reservation-and-ticketing', destination: '/services/flight-reservations', permanent: true },
      { source: '/flight-reservations', destination: '/services/flight-reservations', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/what-clients-say', destination: '/reviews', permanent: true },
      { source: '/immigration-and-travel-guides', destination: '/guides', permanent: true },
      { source: '/travel-guides', destination: '/guides', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/cookie-preferences', destination: '/cookies', permanent: true },
      { source: '/why-study-nursing-in-canada-2026-2027', destination: '/blog/why-study-nursing-canada-2026', permanent: true },
      { source: '/why-study-nursing-in-canada-2026-2027/', destination: '/blog/why-study-nursing-canada-2026', permanent: true },
      { source: '/blog/why-study-nursing-in-canada-2026-2027', destination: '/blog/why-study-nursing-canada-2026', permanent: true },
    ];
  },
};

export default nextConfig;
