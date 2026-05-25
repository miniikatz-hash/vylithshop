'use client';

import { useRef } from 'react';

const testimonials = [
  { name: 'Alex Chen', role: 'CEO, TechFlow', text: 'Vylith transformed our online presence. The site they built increased conversions by 340%.' },
  { name: 'Sarah Miller', role: 'Founder, Aura Wellness', text: 'Incredible attention to detail. Every animation, every interaction feels intentional.' },
  { name: 'James Park', role: 'CTO, Nova AI', text: 'Fast, reliable, and genuinely stunning work. They delivered in half the expected time.' },
  { name: 'Emma Wilson', role: 'Marketing Director, Neon', text: 'The best web agency I\'ve worked with. They understood our brand immediately.' },
  { name: 'David Kim', role: 'Founder, FintechX', text: 'Our investors were blown away by the website. It literally helped us close our Series A.' },
  { name: 'Lisa Chen', role: 'Head of Design, Orbit', text: 'Technical excellence combined with beautiful design. A rare combination.' },
  { name: 'Michael Ross', role: 'CEO, Stackbase', text: 'They built our entire platform from scratch. Rock solid and beautiful.' },
  { name: 'Rachel Green', role: 'Brand Lead, Velvet', text: 'The animations and interactions are next level. Our users love it.' },
];

function TestimonialRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${reverse ? 'rotate-180' : ''}`}>
      <div
        className={`flex gap-6 py-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[400px] p-6 rounded-2xl border border-vylith-border bg-vylith-void/80 hover:border-vylith-purple/30 transition-colors"
          >
            <p className="text-vylith-white/80 mb-4 text-sm">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-vylith-purple/30 flex items-center justify-center text-vylith-white font-bold">
                {t.name[0]}
              </div>
              <div>
                <div className="text-vylith-white font-medium text-sm">{t.name}</div>
                <div className="text-vylith-white/50 text-xs">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="text-center mb-16 px-6">
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-vylith-white">
          What Clients Say
        </h2>
      </div>

      <div ref={containerRef} className="space-y-6 hover:[&_>div_>div]:pause">
        <TestimonialRow items={row1} />
        <TestimonialRow items={row2} reverse />
      </div>
    </section>
  );
}
