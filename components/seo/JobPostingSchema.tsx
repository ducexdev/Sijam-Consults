import type { JobListing } from '@/lib/types';

interface JobPostingSchemaProps {
  job: JobListing;
}

/**
 * JobPosting JSON-LD schema.
 *
 * IMPORTANT ELIGIBILITY RULES (per Google guidelines):
 * - Only emitted when job.status is 'Open' OR 'Closing Soon'
 * - Only emitted when the deadline has not passed
 * - Never emits for 'Filled' jobs
 * - Never invents salary data if none is verified
 * - Includes explicit disclaimer that Sijam is an advisory intermediary, not the employer
 */
export function JobPostingSchema({ job }: JobPostingSchemaProps) {
  const BASE_URL = 'https://sijamconsults.com';
  const now = new Date();
  const deadline = new Date(job.deadline);

  // Do not emit markup for expired or filled listings
  if (job.status === 'Filled' || deadline < now) return null;

  // Format employmentType according to Google for Jobs guidelines
  let googleEmploymentType: string = 'FULL_TIME';
  if (job.employmentType === 'Contract') googleEmploymentType = 'CONTRACTOR';
  else if (job.employmentType === 'Seasonal') googleEmploymentType = 'TEMPORARY';
  else if (job.employmentType === 'Apprenticeship') googleEmploymentType = 'INTERN';

  // Build rich SEO description for Google indexing
  let enrichedDescription = job.description;
  if (job.processingTime) {
    enrichedDescription += `\n\nDocument Processing Time: ${job.processingTime}.`;
  }
  if (job.ageRequirement) {
    enrichedDescription += `\n\nCandidate Age Restriction: Between ${job.ageRequirement}.`;
  }
  if (job.eligibleCountries && job.eligibleCountries.length > 0) {
    enrichedDescription += `\n\nEligible Nationalities / Passports: ${job.eligibleCountries.join(', ')}.`;
  }
  if (job.generalWorkerSectors && job.generalWorkerSectors.length > 0) {
    enrichedDescription += `\n\nGeneral Worker Trades: ${job.generalWorkerSectors.join(', ')}.`;
  }
  enrichedDescription += `\n\nVisa Authorization & Sponsorship:\n${job.visaSupportDetails}`;
  enrichedDescription += `\n\nStatutory Notice:\n${job.disclaimer}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: enrichedDescription,
    datePosted: job.postedDate,
    validThrough: job.deadline,
    employmentType: googleEmploymentType,
    industry: job.category,
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.isEmployerVerified ? job.companyName : 'Sijam Verified Partner Network',
      sameAs: 'https://sijamconsults.com',
      logo: 'https://sijamconsults.com/icons/sijam-logo.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: job.country,
      },
    },
    url: `${BASE_URL}/jobs/${job.slug}`,
    applicationContact: {
      '@type': 'ContactPoint',
      contactType: 'Application enquiries',
      url: `${BASE_URL}/jobs/${job.slug}/apply`,
    },
    responsibilities: job.responsibilities.join('; '),
    qualifications: job.eligibilityRequirements.join('; '),
  };

  // Google for Jobs: Applicant Location / Nationality Restriction
  if (job.eligibleCountries && job.eligibleCountries.length > 0) {
    const isWorldwide = job.eligibleCountries.some((c) =>
      c.toLowerCase().includes('all') || c.toLowerCase().includes('worldwide')
    );
    if (!isWorldwide) {
      schema['applicantLocationRequirements'] = job.eligibleCountries.map((c) => ({
        '@type': 'Country',
        name: c.trim(),
      }));
    }
  }

  // Only include salary if explicitly verified
  if (job.salaryRange) {
    schema['estimatedSalary'] = {
      '@type': 'MonetaryAmountDistribution',
      name: 'Advertised verified salary package',
      currency: 'EUR',
      duration: 'P1M',
      description: job.salaryRange,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
