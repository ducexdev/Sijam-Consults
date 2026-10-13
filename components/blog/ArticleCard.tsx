import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const href = `/blog/${post.slug}`;

  if (featured) {
    return (
      <Link href={href} className="group block">
        <article className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-purple-100 bg-white hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 md:h-full min-h-[260px] bg-[#1A1040]">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <Badge variant="purple">{post.category.name}</Badge>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#0D0826] group-hover:text-[#402493] transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTimeMinutes} min read
                </span>
              </div>
              <span className="text-[#402493] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block h-full">
      <article className="flex flex-col h-full rounded-2xl overflow-hidden border border-purple-100 bg-white hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 bg-[#1A1040] flex-shrink-0">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="purple">{post.category.name}</Badge>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-heading font-bold text-base text-[#0D0826] group-hover:text-[#402493] transition-colors leading-snug line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTimeMinutes} min read
            </span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
