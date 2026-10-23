import type { JobListing, BlogPost, BlogCategory, BlogTag, BlogAuthor } from '../types';
import type { JobRecord, JobStatus, BlogPostRecord } from '../types/database';

/**
 * Adapter converting database JobRecord into frontend JobListing format
 */
export function jobRecordToJobListing(rec: JobRecord): JobListing {
  const statusMap: Record<string, 'Open' | 'Closing Soon' | 'Filled'> = {
    open: 'Open',
    closing_soon: 'Closing Soon',
    closed: 'Filled',
    expired: 'Filled',
    paused: 'Closing Soon',
    scheduled: 'Open',
    draft: 'Open',
  };

  return {
    id: rec.id,
    slug: rec.slug,
    title: rec.title,
    companyName: rec.employer_name,
    isEmployerVerified: rec.is_employer_verified,
    location: rec.location,
    country: rec.country,
    category: rec.category_id as any,
    employmentType: rec.employment_type as any,
    salaryRange: rec.salary_range || undefined,
    postedDate: rec.created_at,
    deadline: rec.deadline,
    status: statusMap[rec.status] || 'Open',
    description: rec.description,
    responsibilities: rec.responsibilities || [],
    eligibilityRequirements: rec.eligibility_requirements || [],
    visaSupportDetails: rec.visa_support_details,
    applicationInstructions: rec.application_instructions,
    disclaimer: rec.disclaimer,
    ageRequirement: rec.age_requirement || undefined,
    generalWorkerSectors: rec.general_worker_sectors || undefined,
    eligibleCountries: rec.eligible_countries || undefined,
    processingTime: rec.processing_time || undefined,
  };
}

/**
 * Adapter converting frontend JobListing format into database JobRecord
 */
export function jobListingToJobRecord(item: JobListing): JobRecord {
  const statusMap: Record<string, JobStatus> = {
    'Open': 'open',
    'Closing Soon': 'closing_soon',
    'Filled': 'closed',
  };

  return {
    id: item.id.startsWith('a100')
      ? item.id
      : `a1000000-0000-0000-0000-${item.id.replace(/[^0-9]/g, '').padEnd(12, '0').slice(-12)}`,
    slug: item.slug,
    employer_id: 'e1000000-0000-0000-0000-000000000001',
    employer_name: item.companyName,
    is_employer_verified: item.isEmployerVerified,
    category_id: item.category,
    title: item.title,
    location: item.location,
    country: item.country,
    employment_type: item.employmentType,
    salary_range: item.salaryRange || null,
    description: item.description,
    responsibilities: item.responsibilities,
    eligibility_requirements: item.eligibilityRequirements,
    visa_support_details: item.visaSupportDetails,
    application_instructions: item.applicationInstructions || '',
    disclaimer: item.disclaimer,
    deadline: item.deadline,
    status: statusMap[item.status] || 'open',
    accepts_applications: item.status !== 'Filled',
    view_count: 100,
    application_count: 5,
    created_at: item.postedDate ? new Date(item.postedDate).toISOString() : new Date().toISOString(),
    updated_at: new Date().toISOString(),
    age_requirement: item.ageRequirement || null,
    eligible_countries: item.eligibleCountries || null,
    processing_time: item.processingTime || null,
    general_worker_sectors: item.generalWorkerSectors || null,
  };
}

/**
 * Adapter converting database BlogPostRecord into frontend BlogPost format
 */
export function blogRecordToBlogPost(rec: BlogPostRecord, categories?: BlogCategory[]): BlogPost {
  const catList = Array.isArray(categories) ? categories : undefined;
  const defaultCategory: BlogCategory = {
    id: rec.category_id,
    name: rec.category_id
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    slug: rec.category_id,
    color: '#402493',
  };

  const matchedCat = catList?.find(
    (c) => c.id === rec.category_id || c.slug === rec.category_id
  );

  const tags: BlogTag[] = (rec.tags || []).map((t) => ({
    id: `tag-${t.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: t,
    slug: t.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  }));

  const author: BlogAuthor = {
    id: rec.author_id ?? 'author-unknown',
    name: rec.author_name,
    role: rec.author_role,
    bio: `${rec.author_name} is a specialist contributor at Sijam Consults Limited.`,
    avatar: rec.author_avatar || '/team/James-Samson.png',
  };

  return {
    id: rec.id,
    slug: rec.slug,
    title: rec.title,
    excerpt: rec.summary,
    featuredImage: rec.featured_image || '/blogs/Why-Study-Nursing-in-Canada-20262027.png',
    featuredImageAlt: rec.title,
    category: matchedCat || defaultCategory,
    tags,
    author,
    publishedAt: rec.published_at || rec.created_at,
    updatedAt: rec.updated_at,
    readTimeMinutes: rec.read_time_minutes || 5,
    status: rec.status,
    seo: {
      title: rec.meta_title || rec.title,
      description: rec.meta_description || rec.summary,
      canonicalUrl: rec.canonical_url || undefined,
    },
    sections: rec.sections || [],
    keyTakeaways: rec.key_takeaways || [],
    isImmigrationPolicy: false,
  };
}

/**
 * Adapter converting frontend BlogPost format into database BlogPostRecord
 */
export function blogPostToBlogRecord(item: BlogPost): BlogPostRecord {
  return {
    id: item.id.startsWith('b100')
      ? item.id
      : `b1000000-0000-0000-0000-${item.id.replace(/[^0-9]/g, '').padEnd(12, '0').slice(-12)}`,
    slug: item.slug,
    post_type: 'blog',
    title: item.title,
    summary: item.excerpt,
    category_id: item.category.slug,
    key_takeaways: item.keyTakeaways || [],
    sections: item.sections,
    featured_image: item.featuredImage,
    read_time_minutes: item.readTimeMinutes,
    author_id: item.author.id,
    author_name: item.author.name,
    author_role: item.author.role,
    author_avatar: item.author.avatar || null,
    status: (item.status === 'review' ? 'draft' : item.status) as import('@/lib/types/database').BlogPostStatus,
    published_at: item.publishedAt,
    created_at: item.publishedAt ? new Date(item.publishedAt).toISOString() : new Date().toISOString(),
    updated_at: item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString(),
    view_count: 150,
    current_version: 1,
    meta_title: item.seo?.title || null,
    meta_description: item.seo?.description || null,
    canonical_url: item.seo?.canonicalUrl || null,
    tags: (item.tags || []).map((t) => t.name),
  };
}
