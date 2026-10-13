import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#4DA5EC] to-[#257CFF] text-white hover:brightness-110 shadow-[0_4px_24px_rgba(37,124,255,0.45)] hover:shadow-[0_8px_36px_rgba(37,124,255,0.65)] focus:ring-[#257CFF] border border-[#4DA5EC]/30',
    secondary:
      'bg-[#402493] text-white hover:bg-[#5B37B8] shadow-md hover:shadow-lg focus:ring-[#402493]',
    outline:
      'border-2 border-[#402493] text-[#402493] hover:bg-[#EDE9FE] focus:ring-[#402493]',
    ghost:
      'text-[#0F172A] hover:bg-slate-100 hover:text-[#402493] focus:ring-slate-300',
    glass:
      'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md focus:ring-white',
    white:
      'bg-white text-[#402493] hover:bg-slate-100 shadow-md hover:shadow-lg focus:ring-white',
  };

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    isLoading && 'opacity-70 pointer-events-none',
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {isLoading ? <span className="animate-spin mr-2">⟳</span> : null}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {isLoading ? <span className="animate-spin mr-2">⟳</span> : null}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? <span className="animate-spin mr-2">⟳</span> : null}
      {children}
    </button>
  );
};
