'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function DemoForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, date }),
      });

      if (res.ok) {
        setStatus('success');
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
        <h1 className="text-3xl font-serif font-bold text-vylith-white mb-2">Book a Demo</h1>
        <p className="text-vylith-white/70 mb-8">See what Vylith can do for your business.</p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4"></div>
            <h2 className="text-xl font-serif font-bold text-vylith-gold mb-2">Demo Booked!</h2>
            <p className="text-vylith-white/70">We'll send you a confirmation email shortly.</p>
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
              <label className="block text-sm text-vylith-white/70 mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-vylith-black border border-vylith-border text-vylith-white focus:outline-none focus:border-vylith-purple"
              />
            </div>

            <div>
              <label className="block text-sm text-vylith-white/70 mb-1">Preferred Date *</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-vylith-black border border-vylith-border text-vylith-white focus:outline-none focus:border-vylith-purple"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button type="submit" variant="primary" className="w-full">
              {status === 'loading' ? 'Booking...' : 'Book Demo'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
