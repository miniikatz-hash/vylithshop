'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json();
        setStatus('error');
        setError(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-lg p-8 rounded-2xl border border-vylith-border bg-vylith-void">
        <h1 className="text-3xl font-serif font-bold text-vylith-white mb-2">Contact Us</h1>
        <p className="text-vylith-white/70 mb-8">Tell us about your project and we'll get back to you within 24 hours.</p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4"></div>
            <h2 className="text-xl font-serif font-bold text-vylith-gold mb-2">Message Sent!</h2>
            <p className="text-vylith-white/70">We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-vylith-white/70 mb-1">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-vylith-black border border-vylith-border text-vylith-white focus:outline-none focus:border-vylith-purple"
              />
            </div>

            <div>
              <label className="block text-sm text-vylith-white/70 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-vylith-black border border-vylith-border text-vylith-white focus:outline-none focus:border-vylith-purple"
              />
            </div>

            <div>
              <label className="block text-sm text-vylith-white/70 mb-1">Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                minLength={10}
                className="w-full px-4 py-3 rounded-lg bg-vylith-black border border-vylith-border text-vylith-white focus:outline-none focus:border-vylith-purple resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button type="submit" variant="primary" className="w-full">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
