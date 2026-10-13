import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/lib/types';
import { ROUTES } from '@/lib/routes';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500">
        <li>
          <Link
            href={ROUTES.home}
            className="flex items-center gap-1 hover:text-[#402493] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-[#0F172A] truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#402493] transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
