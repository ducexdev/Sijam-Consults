import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Sijam Consults | Kaduna & Abuja Office Desks',
  description:
    'Get in touch with Sijam Consults Limited. Visit our corporate office in Kaduna or reach our Abuja advisory desk via official phone, email, or WhatsApp.',
  keywords: [
    'contact sijam consults limited',
    'sijam consults office address kaduna',
    'sijam consults abuja phone number',
    'immigration consultancy office in kaduna',
    'reach sijam consults customer advisory desk',
  ],
  alternates: {
    canonical: 'https://sijamconsults.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
