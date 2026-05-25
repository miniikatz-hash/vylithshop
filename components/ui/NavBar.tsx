'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import Link from 'next/link';

export function NavBar() {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 80 && currentScroll > lastScroll.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      y: hidden ? -100 : 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [hidden]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        lastScroll.current > 80 ? 'glass' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Vylith" width={40} height={40} className="w-10 h-10" />
          <span className="font-serif text-xl font-bold text-vylith-white">Vylith</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm text-vylith-white/70 hover:text-vylith-white transition-colors">Services</Link>
          <Link href="#work" className="text-sm text-vylith-white/70 hover:text-vylith-white transition-colors">Work</Link>
          <Link href="#pricing" className="text-sm text-vylith-white/70 hover:text-vylith-white transition-colors">Pricing</Link>
          <Link href="#faq" className="text-sm text-vylith-white/70 hover:text-vylith-white transition-colors">FAQ</Link>
          <Link
            href="/en/contact"
            className="px-5 py-2 text-sm font-medium bg-vylith-purple text-vylith-white rounded-full hover:bg-vylith-purple-glow transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
