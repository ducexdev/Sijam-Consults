'use server';

import { dbRepository } from '@/lib/db/repository';
import { BlogPostRecord, BlogPostStatus } from '@/lib/types/database';

export async function adminCreateBlogPost(
  data: {
    slug: string;
    postType: 'guide' | 'blog' | 'news';
    title: string;
    summary: string;
    categoryId: string;
    contentHtml?: string;
    keyTakeaways: string[];
    sections: { heading: string; content: string }[];
    featuredImage: string;
    readTimeMinutes: number;
    authorName: string;
    authorRole: string;
    authorAvatar?: string;
    status: BlogPostStatus;
    tags: string[];
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  },
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const post = await dbRepository.createBlogPost({
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    post_type: data.postType,
    title: data.title,
    summary: data.summary,
    category_id: data.categoryId,
    content_html: data.contentHtml || null,
    key_takeaways: data.keyTakeaways,
    sections: data.sections,
    featured_image: data.featuredImage || '/blogs/Ducex-Blog.png',
    read_time_minutes: data.readTimeMinutes || 5,
    author_id: adminId,
    author_name: data.authorName,
    author_role: data.authorRole,
    author_avatar: data.authorAvatar || null,
    status: data.status,
    published_at: data.status === 'published' ? new Date().toISOString() : null,
    meta_title: data.metaTitle || null,
    meta_description: data.metaDescription || null,
    canonical_url: data.canonicalUrl || null,
    tags: data.tags,
  });

  await dbRepository.recordAuditLog({
    user_id: adminId,
    action: 'blog.create',
    entity_type: 'blog_post',
    entity_id: post.id,
    details: { title: post.title, slug: post.slug, status: post.status },
  });

  return post;
}

export async function adminUpdateBlogPost(
  id: string,
  updates: Partial<BlogPostRecord>,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const updated = await dbRepository.updateBlogPost(id, updates);
  if (updated) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'blog.update',
      entity_type: 'blog_post',
      entity_id: id,
      details: updates,
    });
  }
  return updated;
}

/**
 * Admin Server Action: Delete Blog Post
 */
export async function adminDeleteBlogPost(
  id: string,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  const deleted = await dbRepository.deleteBlogPost(id);
  if (deleted) {
    await dbRepository.recordAuditLog({
      user_id: adminId,
      action: 'blog.delete',
      entity_type: 'blog_post',
      entity_id: id,
      details: { deleted_post_id: id },
    });
  }
  return deleted;
}

/**
 * Admin Server Action: Quick Toggle Blog Post Publication Status
 */
export async function adminToggleBlogPostStatus(
  id: string,
  newStatus: BlogPostStatus,
  adminId = '00000000-0000-0000-0000-000000000001'
) {
  return adminUpdateBlogPost(
    id,
    {
      status: newStatus,
      published_at: newStatus === 'published' ? new Date().toISOString() : null,
    },
    adminId
  );
}
