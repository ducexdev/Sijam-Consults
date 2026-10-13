import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Travel Document Legalization & Notarization',
    description: 'Official authentication of educational degrees, marriage certificates, and police records at the Ministry of Foreign Affairs (MFA Abuja) and foreign embassies.',
    path: '/services/document-legalization',
  });
}

export default function DocumentLegalizationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
