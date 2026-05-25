'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const plans = [
  { name: 'Starter', price: 1499, period: 'one-time', desc: 'Small business websites', features: ['5 pages', 'Mobile responsive', 'Basic SEO', '2 weeks delivery'] },
  { name: 'Growth', price: 3999, period: 'one-time', desc: 'Most Popular', popular: true, features: ['10 pages', 'Custom animations', 'Advanced SEO', 'CMS integration', '3 weeks delivery'] },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'Contact us', features: ['Unlimited pages', 'Dedicated team', 'Priority support', 'Custom integrations'] },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = section.querySelectorAll('.pricing-card');
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
    <section id="pricing" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-vylith-white mb-6">
            Pricing
          </h2>

          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-vylith-void border border-vylith-border">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm transition-all ${!annual ? 'bg-vylith-purple text-vylith-white' : 'text-vylith-white/70'}`}
            >
              One-time
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm transition-all ${annual ? 'bg-vylith-purple text-vylith-white' : 'text-vylith-white/70'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-vylith-gold glow-gold'
                  : 'border-vylith-border bg-vylith-void/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-vylith-gold text-vylith-black text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-serif font-bold text-vylith-white mb-2">{plan.name}</h3>

              <div className="mb-6">
                {typeof plan.price === 'number' ? (
                  <>
                    <span className="text-4xl font-bold text-vylith-white">
                      ${annual ? Math.round(plan.price / 3) : plan.price}
                    </span>
                    <span className="text-vylith-white/50 ml-2">/{annual ? 'mo' : plan.period}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-vylith-white">{plan.price}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-vylith-white/80">
                    <svg className="w-4 h-4 text-vylith-purple-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {plan.name === 'Enterprise' ? (
                <Button href="/en/contact" variant="secondary" className="w-full">Contact Us</Button>
              ) : (
                <Button href="/en/demo" variant="primary" className="w-full">Get Started</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
