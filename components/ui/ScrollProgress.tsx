'use client';

import { useScrollProgress } from '@/components/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
      <div
        className="h-full bg-gradient-to-r from-vylith-purple to-vylith-gold"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
