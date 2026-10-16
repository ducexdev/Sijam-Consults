import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Football Talent Networking & European Club Trials | Sijam Consults & Basic Soccer Academy',
    description:
      'Official grassroots scouting and European club trial pathways by Sijam Consults Limited & Basic Soccer Academy (RC: 2839888, Est. 2015). Direct club trial invitations, international showcases, and sports visa dossiers across Spain, Portugal, Eastern Europe, Turkey & Asia. Led by licensed football intermediary James Samson.',
    path: '/services/football-talent',
  });
}

export default function FootballTalentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
