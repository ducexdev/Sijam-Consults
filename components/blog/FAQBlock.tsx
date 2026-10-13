'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { BlogFAQ } from '@/lib/types';

interface FAQBlockProps {
  faqs: BlogFAQ[];
  title?: string;
}

export function FAQBlock({ faqs, title = 'Frequently Asked Questions' }: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-block-heading" className="mt-10">
      <h2
        id="faq-block-heading"
        className="font-heading font-bold text-xl text-[#0D0826] mb-5"
      >
        {title}
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const itemId = `faq-${index}`;
          return (
            <div
              key={itemId}
              className="rounded-xl border border-purple-100 bg-white overflow-hidden"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${itemId}-answer`}
                id={`${itemId}-question`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-purple-50 transition-colors"
              >
                <span className="font-semibold text-sm text-[#0D0826]">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#402493] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`${itemId}-answer`}
                role="region"
                aria-labelledby={`${itemId}-question`}
                hidden={!isOpen}
                className="px-5 pb-4 text-sm text-slate-600 leading-relaxed"
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
