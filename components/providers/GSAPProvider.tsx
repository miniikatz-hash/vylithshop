'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.config({
      nullTargetWarn: false,
    });

    return () => {
      gsap.globalTimeline.clear();
    };
  }, []);

  return <>{children}</>;
}
