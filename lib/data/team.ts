import { TeamMember } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'james-samson',
    name: 'James Samson',
    role: 'Managing Director & CEO',
    department: 'Executive Governance & Strategy',
    bio: 'James Samson leads Sijam Consults Limited with over a decade of dedicated expertise in cross-border education, immigration documentation advisory, and European business mobility. He is recognized for instituting a zero-compromise documentation standard that has successfully guided hundreds of Nigerian applicants into European universities and professional careers.',
    credentials: [
      'Managing Director, Sijam Consults Limited (RC: 1715416)',
      'Specialist in European Commercial Companies Code & Polish D-Visas',
      'Certified International Education Consultant',
    ],
    image: '/team/James-Samson.png',
    emailContact: 'james@sijamconsults.com',
  },
  {
    id: 'blessing-attabor',
    name: 'Blessing Attabor',
    role: 'Head of Operations & Senior Consultant',
    department: 'Operations & Consular Compliance',
    bio: 'Blessing oversees daily consular operations, document attestation workflows, and file quality audits. Her rigorous eye for detail ensures every client dossier submitted to foreign embassies or the Ministry of Foreign Affairs in Abuja adheres precisely to statutory checklists.',
    credentials: [
      'Lead Consular File Auditor',
      'Expert in MFA Abuja & High Court Legalization Protocols',
      'Student Visa Admissions Strategist',
    ],
    image: '/team/Blessing-Attabor.png',
    emailContact: 'blessing@sijamconsults.com',
  },
  {
    id: 'salami-zainab',
    name: 'Salami Zainab Kehinde',
    role: 'Client Relations & Intake Lead',
    department: 'Client Advisory & Student Support',
    bio: 'Zainab guides prospective students, families, and professionals through their initial eligibility assessments. She coordinates university application dossiers, ensures rapid response times, and supports clients throughout their journey until arrival at their international destination.',
    credentials: [
      'Lead Admissions Counselor',
      'Scholarship Coordination Lead (Cyprus & Poland)',
      'Pre-Departure Orientation Facilitator',
    ],
    image: '/team/Salami-Zainab-Keyinde.png',
    emailContact: 'zainab@sijamconsults.com',
  },
];
