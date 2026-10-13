import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types';
import { Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-articles-heading" className="mt-12 pt-8 border-t border-purple-100">
      <h2
        id="related-articles-heading"
        className="font-heading font-bold text-lg text-[#0D0826] mb-5"
      >
        Related Articles
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
            <article className="flex gap-3 rounded-xl border border-purple-100 bg-white p-4 hover:shadow-md transition-shadow">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#1A1040]">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Badge variant="purple" className="text-[10px] mb-1">
                  {post.category.name}
                </Badge>
                <p className="font-semibold text-xs text-[#0D0826] group-hover:text-[#402493] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="w-2.5 h-2.5" />
                  {post.readTimeMinutes} min
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#402493] flex-shrink-0 mt-1 transition-colors" />
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
