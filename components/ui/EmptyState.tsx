import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'Try adjusting your search criteria or filter selections to view matching items.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50">
      <div className="w-14 h-14 rounded-full bg-purple-50 text-[#402493] flex items-center justify-center mb-4">
        {icon || <SearchX className="w-7 h-7" />}
      </div>
      <h4 className="font-heading font-bold text-lg text-[#0F172A]">{title}</h4>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
