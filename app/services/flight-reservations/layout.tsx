import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Verifiable Flight Reservation for Visa',
    description:
      'Order 100% verifiable flight reservations with active GDS PNR codes for embassy visa applications. Fast turnaround and flexible travel date adjustments.',
    path: '/services/flight-reservations',
  });
}

export default function FlightReservationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
