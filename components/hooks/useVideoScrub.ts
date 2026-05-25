'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function useVideoScrub(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const onMetadata = () => {
      const duration = video.duration;
      const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: `+=${duration * 150}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            video.currentTime = self.progress * duration;
          },
          onLeave: () => { video.currentTime = duration; },
          onLeaveBack: () => { video.currentTime = 0; },
        });
      });

      return () => ctx.revert();
    };

    video.addEventListener('loadedmetadata', onMetadata);
    return () => video.removeEventListener('loadedmetadata', onMetadata);
  }, [videoRef, containerRef]);
}
