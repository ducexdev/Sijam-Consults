import { notFound } from 'next/navigation';
import { BLOG_POSTS, blogRecordToBlogPost } from '@/lib/data/blog';
import { dbRepository } from '@/lib/db/repository';
import { EditPostForm } from '@/components/admin/EditPostForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  let post = BLOG_POSTS.find((p) => p.id === id || p.slug === id);
  if (!post) {
    const dbPost = await dbRepository.getBlogPostBySlug(id);
    if (dbPost) {
      post = blogRecordToBlogPost(dbPost);
    }
  }
  if (!post) return notFound();

  return <EditPostForm post={post} />;
}
