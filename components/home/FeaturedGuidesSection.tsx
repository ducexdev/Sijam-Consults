'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data/blog';
import { ROUTES } from '@/lib/routes';

export const FeaturedGuidesSection: React.FC = () => {
  // Select top 3 relevant, verified guides
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#09051C] text-white border-b border-purple-950/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#402493]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#402493]/20 border border-[#402493]/40 text-xs text-purple-200">
              <BookOpen className="w-3.5 h-3.5 text-[#F98864]" />
              <span className="font-bold uppercase tracking-wider text-[11px]">
                Editorial Insights &amp; Compliance Guides
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
              Authoritative Relocation &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2F11] via-[#F45A2A] to-[#F98864]">
                Recruitment Intelligence
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Practical, fact-checked roadmaps authored by senior consultants. Stay ahead of changing immigration policies, European salary thresholds, and admission deadlines.
            </p>
          </div>

          <Link
            href={ROUTES.guides.root}
            className="shrink-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F98864] hover:text-white transition-colors group"
          >
            <span>Explore All Relocation Guides</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl bg-white/[0.035] hover:bg-white/[0.07] border border-white/8 hover:border-[#DC2F11]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div>
                {/* Featured Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md"
                      style={{ backgroundColor: `${post.category.color}D9` }}
                    >
                      {post.category.name}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6 space-y-3">
                  {/* Meta Bar */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-300" />
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-300" />
                      {post.readTimeMinutes} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#F98864] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author and Read More Footer */}
              <div className="p-6 pt-0 border-t border-white/8 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 pt-3">
                  <div className="w-7 h-7 rounded-full bg-[#402493]/60 flex items-center justify-center text-[11px] font-bold text-purple-200">
                    {post.author.name.charAt(0)}
                  </div>
                  <div className="text-[11px] font-medium text-slate-300">
                    {post.author.name}
                  </div>
                </div>

                <Link
                  href={ROUTES.guides.detail(post.slug)}
                  className="pt-3 inline-flex items-center gap-1 text-xs font-bold text-[#F98864] group-hover:text-white transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
