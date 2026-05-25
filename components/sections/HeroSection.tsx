'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useVideoScrub } from '@/components/hooks/useVideoScrub';
import { SplitHeadline } from '@/components/ui/SplitHeadline';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useVideoScrub(videoRef, containerRef);

  useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    if (!indicator) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(indicator, {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        poster="/vylith-hero-poster.jpg"
      >
        <source src="/vylith-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-vylith-black/60 via-vylith-black/40 to-vylith-black/90" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <SplitHeadline
          text="Built different. Delivered faster."
          className="text-[clamp(2.5rem,8vw,9rem)] font-serif font-bold text-vylith-white mb-6"
          as="h1"
        />

        <p className="max-w-xl text-lg text-vylith-white/80 mb-10">
          Vylith is a web development agency that builds world-class digital products
          for founders, startups, and enterprise teams.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/en/demo" variant="primary">Book a Demo</Button>
          <Button href="#work" variant="secondary">See our work</Button>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-vylith-white/50 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-vylith-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-vylith-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
