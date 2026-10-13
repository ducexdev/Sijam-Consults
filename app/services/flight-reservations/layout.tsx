import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Flight Reservation & Ticketing in Nigeria',
    description: 'Verifiable flight reservation and ticketing services with active airline PNR codes for embassy visa applications. Fast, reliable flight booking with Sijam Consults.',
    path: '/services/flight-reservations',
  });
}

export default function FlightReservationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
