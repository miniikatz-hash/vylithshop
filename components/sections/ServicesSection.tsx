'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { GlowCard } from '@/components/ui/GlowCard';

const services = [
  { title: 'Web Design', desc: 'Stunning, conversion-focused designs that make your brand unforgettable.' },
  { title: 'Web Development', desc: 'Fast, scalable, and pixel-perfect builds using modern frameworks.' },
  { title: 'Brand Identity', desc: 'Logos, color systems, and visual languages that tell your story.' },
  { title: 'E-Commerce', desc: 'High-converting online stores built for growth and reliability.' },
  { title: 'SEO \u0026 Performance', desc: 'Speed, structure, and search visibility that drives organic growth.' },
  { title: 'Maintenance \u0026 Support', desc: 'Ongoing care, updates, and monitoring so your site never sleeps.' },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = section.querySelectorAll('.service-card');
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
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
    <section id="services" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-vylith-white mb-16 text-center">
          Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <GlowCard className="h-full">
                <h3 className="text-xl font-serif font-bold text-vylith-white mb-3">{service.title}</h3>
                <p className="text-vylith-white/70">{service.desc}</p>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
