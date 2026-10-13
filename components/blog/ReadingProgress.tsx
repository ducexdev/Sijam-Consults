'use client';

import { useEffect, useState } from 'react';

/**
 * Thin reading progress bar at the top of the viewport.
 * Tracks document scroll position relative to document height.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-purple-100"
    >
      <div
        className="h-full bg-[#402493] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
