'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, passwordConfirm }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed. Please try again.');
        setLoading(false);
        return;
      }

      router.push('/login?signup=success');
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-[0.375rem] bg-(--color-danger-light) p-4 border-l-4 border-(--color-danger)" role="alert">
          <p className="text-sm font-medium text-(--color-danger)">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-(--color-text) mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-10 rounded-[0.375rem] border border-(--color-border) px-3 py-2 text-(--color-text) placeholder-(--color-muted-text) focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-(--color-text) mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-10 rounded-[0.375rem] border border-(--color-border) px-3 py-2 text-(--color-text) placeholder-(--color-muted-text) focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-(--color-text) mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          className="w-full h-10 rounded-[0.375rem] border border-(--color-border) px-3 py-2 text-(--color-text) placeholder-(--color-muted-text) focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 rounded-[0.375rem] bg-(--color-secondary) px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-secondary) disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-0.5"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>

      <div className="text-center">
        <p className="text-sm text-(--color-muted-text)">
          Already have an account?{' '}
          <Link href="/login" className="text-(--color-secondary) hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}