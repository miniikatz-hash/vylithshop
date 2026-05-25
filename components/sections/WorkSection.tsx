'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

const projects = [
  { title: 'Neon Finance', desc: 'A fintech dashboard with real-time data visualization.', tags: ['React', 'D3.js', 'Node.js'] },
  { title: 'Aura Wellness', desc: 'E-commerce platform for a premium wellness brand.', tags: ['Next.js', 'Shopify', 'Tailwind'] },
  { title: 'Nova AI', desc: 'Landing page for an AI-powered productivity tool.', tags: ['GSAP', 'Three.js', 'Vercel'] },
];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = section.querySelectorAll('.work-card');
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-vylith-white mb-16 text-center">
          Our Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="work-card group relative rounded-2xl overflow-hidden border border-vylith-border bg-vylith-void"
            >
              <div className="aspect-[4/3] bg-vylith-purple-deep/50 relative">
                <div className="absolute inset-0 flex items-center justify-center text-vylith-white/30 text-6xl font-serif">
                  {project.title[0]}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-vylith-white mb-2">{project.title}</h3>
                <p className="text-vylith-white/70 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs bg-vylith-purple/20 text-vylith-purple-light rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#" className="text-sm text-vylith-gold hover:text-vylith-gold-light transition-colors">
                  View project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
