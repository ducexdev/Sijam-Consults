import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Verifiable Flight Reservation & Ticketing | Sijam Consults & Everbright Travels',
    description:
      'Official embassy-verifiable flight reservations with live GDS PNR codes and international flight ticketing. In strategic alliance with Everbright Travels & Consultants Limited. Issued within 60–120 minutes across Nigeria.',
    path: '/services/flight-reservations',
  });
}

export default function FlightReservationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
