import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'orange' | 'green' | 'blue' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className,
  icon,
}) => {
  const variantStyles = {
    purple: 'bg-[#EDE9FE] text-[#402493] border-purple-200',
    orange: 'bg-orange-50 text-[#F45A2A] border-orange-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-white/80 text-[#0F172A] border-slate-300',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-semibold',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
