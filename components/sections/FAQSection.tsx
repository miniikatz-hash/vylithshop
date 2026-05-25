'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const faqs = [
  { q: 'What is your typical turnaround time?', a: 'Most projects are delivered within 2-4 weeks, depending on scope and complexity. Enterprise projects may take 6-8 weeks.' },
  { q: 'How many revisions are included?', a: 'All packages include unlimited revisions within the agreed scope. We work until you are 100% satisfied.' },
  { q: 'What technologies do you use?', a: 'We specialize in Next.js, React, TypeScript, Tailwind CSS, GSAP, Three.js, and various headless CMS solutions.' },
  { q: 'Do you offer ongoing maintenance?', a: 'Yes, we offer monthly maintenance packages that include updates, monitoring, security patches, and priority support.' },
  { q: 'Can you work with our existing design?', a: 'Absolutely. We can implement your existing designs or create new ones from scratch based on your brand guidelines.' },
  { q: 'Do you provide SEO services?', a: 'Yes, all our builds include technical SEO best practices. We also offer ongoing SEO optimization packages.' },
  { q: 'What is your payment structure?', a: 'We require a 50% deposit to begin work, with the remaining 50% due upon completion and approval.' },
  { q: 'Do you work with international clients?', a: 'Yes, we work with clients globally. We are experienced in remote collaboration across time zones.' },
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.style.height = isOpen ? 'auto' : '0px';
      return;
    }

    gsap.to(el, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [isOpen]);

  return (
    <div className="border-b border-vylith-border">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-vylith-white group-hover:text-vylith-purple-glow transition-colors">
          {item.q}
        </span>
        <span className={`text-vylith-purple-glow transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <div ref={answerRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="pb-6 text-vylith-white/70">{item.a}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-vylith-white mb-16 text-center">
          FAQ
        </h2>

        <div className="divide-y divide-vylith-border">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
