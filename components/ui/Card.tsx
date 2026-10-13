import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'glass' | 'document' | 'flat';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'light',
  hoverEffect = false,
  ...props
}) => {
  const variantStyles = {
    light:
      'bg-white text-[#0F172A] border border-[rgba(64,36,147,0.08)] shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)]',
    dark:
      'bg-[#1A1040] text-white border border-white/10 shadow-2xl',
    glass:
      'bg-white/70 backdrop-blur-md text-[#0F172A] border border-white/40 shadow-lg',
    document:
      'bg-white text-[#0F172A] border-2 border-dashed border-[#402493]/20 shadow-sm relative overflow-hidden',
    flat:
      'bg-slate-50 text-[#0F172A] border border-slate-200',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variantStyles[variant],
        hoverEffect &&
          'hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(64,36,147,0.15)] hover:border-[#402493]/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
