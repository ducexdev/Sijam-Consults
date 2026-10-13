'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  variant?: 'dark' | 'light';
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
  variant = 'dark',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    if (allowMultiple) {
      if (openIndices.includes(idx)) {
        setOpenIndices(openIndices.filter((i) => i !== idx));
      } else {
        setOpenIndices([...openIndices, idx]);
      }
    } else {
      setOpenIndices(openIndices.includes(idx) ? [] : [idx]);
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className={cn('space-y-3.5', className)}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        const buttonId = `accordion-btn-${idx}`;
        const panelId = `accordion-panel-${idx}`;

        return (
          <div
            key={item.id || idx}
            className={cn(
              'rounded-2xl transition-all duration-300 overflow-hidden border',
              isDark
                ? isOpen
                  ? 'border-[#257CFF]/50 bg-gradient-to-b from-[#131C31] via-[#0E1627] to-[#0A0F1C] shadow-[0_8px_30px_rgba(37,124,255,0.15)] ring-1 ring-[#257CFF]/30'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 backdrop-blur-md'
                : isOpen
                ? 'border-[#402493]/40 bg-purple-50/50 shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(idx)}
              className={cn(
                'flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer gap-4',
                isDark
                  ? isOpen
                    ? 'text-white'
                    : 'text-slate-200 hover:text-white'
                  : 'text-[#0F172A] hover:text-[#402493]'
              )}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={cn(
                    'w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border transition-colors',
                    isDark
                      ? isOpen
                        ? 'bg-[#257CFF] text-white border-[#4DA5EC]'
                        : 'bg-white/5 text-slate-400 border-white/10'
                      : isOpen
                      ? 'bg-[#402493] text-white border-[#402493]'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  )}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'font-heading font-bold text-sm sm:text-base leading-snug',
                    isDark && isOpen && 'bg-gradient-to-r from-white via-blue-50 to-[#4DA5EC] text-transparent bg-clip-text'
                  )}
                >
                  {item.question}
                </span>
              </div>

              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border',
                  isDark
                    ? isOpen
                      ? 'bg-[#257CFF]/20 border-[#257CFF]/50 text-[#4DA5EC]'
                      : 'bg-white/5 border-white/10 text-slate-400'
                    : isOpen
                    ? 'bg-purple-100 text-[#402493]'
                    : 'bg-slate-100 text-slate-500'
                )}
              >
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-300',
                    isOpen && 'rotate-180'
                  )}
                />
              </div>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  'px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] leading-relaxed border-t transition-opacity duration-300',
                  isDark
                    ? 'border-white/10 text-slate-100'
                    : 'border-purple-100/60 text-slate-700'
                )}
              >
                <div className="pt-3 pb-1 space-y-3">
                  <p className="font-normal text-slate-200 text-sm sm:text-[15px] leading-relaxed">
                    {item.answer}
                  </p>
                  {isDark && (
                    <div className="pt-2 flex items-center gap-2 text-[11px] text-blue-300/80 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4DA5EC]" />
                      <span>Verified by Sijam Consular Case Officer</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
