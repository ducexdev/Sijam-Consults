import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Document Legalization & MFA Attestation',
    description:
      'Expedited document legalization, MFA Abuja authentication, and foreign embassy attestation for educational transcripts, corporate deeds, and police certificates.',
    path: '/services/document-legalization',
  });
}

export default function DocumentLegalizationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
