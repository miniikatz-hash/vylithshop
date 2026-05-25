'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
      setStatus('error');
      setError(error.message);
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md p-8 rounded-2xl border border-vylith-border bg-vylith-void">
        <h1 className="text-2xl font-serif font-bold text-vylith-white mb-6">Create Account</h1>

        {status === 'success' ? (
          <div className="text-center">
            <div className="text-4xl mb-4"></div>
            <p className="text-vylith-white">Check your email to confirm your account.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-vylith-white/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-vylith-black border border-vylith-border text-vylith-white focus:outline-none focus:border-vylith-purple"
              />
            </div>

            <div>
              <label className="block text-sm text-vylith-white/70 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg bg-vylith-black border border-vylith-border text-vylith-white focus:outline-none focus:border-vylith-purple"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-3 rounded-lg bg-vylith-purple text-vylith-white font-medium hover:bg-vylith-purple-glow transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
