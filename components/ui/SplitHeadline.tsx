'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface SplitHeadlineProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SplitHeadline({ text, className = '', as: Tag = 'h1' }: SplitHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const chars = container.querySelectorAll('.char');
    const ctx = gsap.context(() => {
      gsap.from(chars, {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.03,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Tag className="flex flex-wrap gap-x-[0.25em]">
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex overflow-hidden">
            {word.split('').map((char, ci) => (
              <span key={ci} className="char inline-block">
                {char}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    </div>
  );
}
