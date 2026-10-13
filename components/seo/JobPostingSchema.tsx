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

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.description}\n\n${job.disclaimer}`,
    datePosted: job.postedDate,
    validThrough: job.deadline,
    employmentType: job.employmentType.toUpperCase().replace(/-/g, '_'),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.isEmployerVerified ? job.companyName : 'Employer details available upon enquiry',
      ...(job.isEmployerVerified ? {} : {}),
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
  };

  // Only include salary if explicitly verified
  if (job.salaryRange) {
    schema['estimatedSalary'] = {
      '@type': 'MonetaryAmountDistribution',
      name: 'Advertised salary range',
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
