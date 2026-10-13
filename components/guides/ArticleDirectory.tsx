'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Clock, Calendar, ArrowRight, Tag, BookOpen, ChevronRight } from 'lucide-react';
import { GuideArticle } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/routes';

export const ArticleDirectory: React.FC<{
  articles: GuideArticle[];
  basePath: 'guides' | 'blog';
}> = ({ articles, basePath }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Study Abroad', 'Work Relocation', 'Business Mobility'];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [articles, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides, destinations, or immigration policies..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#F45A2A] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white shadow-cta border border-[#4DA5EC]/30'
                  : 'bg-white/[0.05] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const href = basePath === 'guides' ? ROUTES.guides.detail(article.slug) : ROUTES.blog.detail(article.slug);

          return (
            <div
              key={article.id}
              className="rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#F45A2A]/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-xl group hover:-translate-y-1"
            >
              <div>
                {/* Image Banner */}
                <div className="h-52 w-full relative bg-black overflow-hidden" style={{ position: 'relative' }}>
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0826] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#402493]/80 text-purple-200 border border-purple-500/30 backdrop-blur-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      {formatDate(article.publishedDate)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F98864]" />
                      {article.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-[#F98864] transition-colors leading-snug line-clamp-2">
                    <Link href={href}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 mt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#402493] text-[#F98864] flex items-center justify-center font-bold text-[10px]">
                    {article.author.name[0]}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">
                    {article.author.name}
                  </span>
                </div>

                <Link
                  href={href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#F45A2A] hover:text-[#FF8C66] transition-colors"
                >
                  <span>Read Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
