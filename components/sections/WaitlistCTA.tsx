'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export function WaitlistCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success' && successRef.current && formRef.current) {
      gsap.from(successRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-bold text-vylith-white mb-6">
          Join the Waitlist
        </h2>

        <p className="text-vylith-white/70 mb-10">
          Be the first to know when we launch new features and services.
        </p>

        {status === 'success' ? (
          <div ref={successRef} className="p-8 rounded-2xl border border-vylith-gold/30 bg-vylith-void">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-serif font-bold text-vylith-gold mb-2">You're on the list!</h3>
            <p className="text-vylith-white/70">We'll be in touch soon.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-vylith-void border border-vylith-border text-vylith-white placeholder:text-vylith-white/30 focus:outline-none focus:border-vylith-purple transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 rounded-full bg-vylith-purple text-vylith-white font-medium hover:bg-vylith-purple-glow transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-400 text-sm">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
