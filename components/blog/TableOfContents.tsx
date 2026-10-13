'use client';

import { useEffect, useRef, useState } from 'react';

interface TableOfContentsProps {
  sections: { heading: string }[];
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingIds = sections.map((s) => slugifyHeading(s.heading));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    for (const id of headingIds) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm"
    >
      <p className="font-heading font-bold text-xs uppercase tracking-widest text-[#402493] mb-3">
        Contents
      </p>
      <ol className="space-y-1.5">
        {sections.map((section, index) => {
          const id = slugifyHeading(section.heading);
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-sm py-0.5 border-l-2 pl-3 transition-all duration-200 ${
                  isActive
                    ? 'border-[#402493] text-[#402493] font-semibold'
                    : 'border-transparent text-slate-600 hover:border-purple-300 hover:text-[#402493]'
                }`}
              >
                <span className="text-slate-400 mr-1.5 text-xs">{index + 1}.</span>
                {section.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
