import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF8FF]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-[#402493] animate-spin" />
        </div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Loading Sijam Advisory Portal...
        </p>
      </div>
    </div>
  );
}
