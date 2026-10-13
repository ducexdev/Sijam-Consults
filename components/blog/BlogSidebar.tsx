'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, FolderOpen, BookOpen, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/lib/types';
import { TableOfContents } from './TableOfContents';

interface BlogSidebarProps {
  sections: { heading: string }[];
  categories: BlogCategory[];
  recentPosts: BlogPost[];
  currentPostSlug?: string;
}

export function BlogSidebar({
  sections,
  categories,
  recentPosts,
  currentPostSlug,
}: BlogSidebarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredRecent = recentPosts
    .filter((p) => p.slug !== currentPostSlug)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. Search Box Widget */}
      <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#0D0826] mb-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#257CFF]" />
          Search Articles
        </h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the blog..."
            className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#257CFF] focus:border-transparent bg-slate-50 text-slate-800 transition"
          />
          <button
            type="submit"
            aria-label="Submit search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white hover:brightness-110 transition cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* 2. Table of Contents (Sticky on desktop scroll) */}
      {sections.length > 0 && (
        <TableOfContents sections={sections} />
      )}

      {/* 3. Promotional Banner 1 - Study Visa / University Admission */}
      <div className="rounded-2xl overflow-hidden border border-purple-200/80 shadow-md group relative bg-[#0D0826]">
        <Link href="/services/study-visa" className="block relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src="/blogs/Ducex-Blog-1.png"
            alt="Study Abroad with Direct Admission - Sijam Consults"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0826] via-[#0D0826]/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#F45A2A] text-white px-2 py-0.5 rounded-md mb-1 shadow-sm">
              Study Abroad
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm leading-tight text-white drop-shadow">
              Europe & Canada Direct University Admissions
            </p>
          </div>
        </Link>
        <div className="p-4 bg-white border-t border-purple-100 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">Explore Study Programs</span>
          <Link
            href="/services/study-visa"
            className="text-xs font-bold text-[#257CFF] hover:text-[#195ec4] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 4. Categories Widget */}
      <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#0D0826] mb-3.5 flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-[#F45A2A]" />
          Categories
        </h3>
        <ul className="space-y-1.5">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/blog/category/${cat.slug}`}
                className="flex items-center justify-between text-xs sm:text-sm text-slate-700 hover:text-[#257CFF] hover:bg-blue-50/50 py-1.5 px-2.5 rounded-lg transition-colors group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                  {cat.name}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-[#257CFF]">
                  Explore →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Promotional Banner 2 - Free Assessment / Consultation */}
      <div className="rounded-2xl overflow-hidden border border-purple-200/80 shadow-md group relative bg-[#0D0826]">
        <Link href="/consultation" className="block relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src="/blogs/DS-CTA-1.png"
            alt="Check Your Eligibility - Free Consultation Sijam Consults"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0826] via-[#0D0826]/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white px-2 py-0.5 rounded-md mb-1 shadow-sm">
              Free Assessment
            </span>
            <p className="font-heading font-bold text-xs sm:text-sm leading-tight text-white drop-shadow">
              Verify Your Visa & Admission Eligibility
            </p>
          </div>
        </Link>
        <div className="p-4 bg-white border-t border-purple-100 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">1-on-1 Consultation</span>
          <Link
            href="/consultation"
            className="text-xs font-bold text-[#F45A2A] hover:text-[#d3471c] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 6. Recent / Popular Posts Widget */}
      {filteredRecent.length > 0 && (
        <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#0D0826] mb-3.5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#402493]" />
            Recent Articles
          </h3>
          <div className="space-y-3.5 divide-y divide-slate-100">
            {filteredRecent.map((p, idx) => (
              <div key={p.id} className={idx === 0 ? '' : 'pt-3'}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block space-y-1 hover:text-[#257CFF] transition"
                >
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#257CFF] leading-snug line-clamp-2 transition-colors">
                    {p.title}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{p.category.name}</span>
                    <span>•</span>
                    <span>{p.readTimeMinutes} min read</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Need Help / WhatsApp Direct Advisory */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-[#0D0826] via-[#1A1040] to-[#0D0826] text-white border border-purple-800/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#257CFF]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Direct Assistance
          </div>
          <h4 className="font-heading font-bold text-sm sm:text-base leading-snug">
            Need Expert Review for Your Travel Dossier?
          </h4>
          <p className="text-xs text-purple-200 leading-relaxed">
            Connect directly with Sijam Consults visa officers for document audits and application filing.
          </p>
          <a
            href={`https://wa.me/2347064229556?text=${encodeURIComponent(
              'Hello Sijam Consults, I read your article and need expert advisory on my application.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
