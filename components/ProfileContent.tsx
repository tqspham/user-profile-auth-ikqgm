'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileContentProps {
  userName: string;
}

export function ProfileContent({ userName }: ProfileContentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        setError('Failed to logout. Please try again.');
        setLoading(false);
        return;
      }

      const data = await response.json();
      router.push(data.redirectTo || '/login');
    } catch {
      setError('An error occurred during logout.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h1>
        <p className="mt-2 text-gray-600">You are now logged in.</p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        disabled={loading}
        className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}
