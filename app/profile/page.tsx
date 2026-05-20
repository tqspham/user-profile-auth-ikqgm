import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ProfileContent } from '@/components/ProfileContent';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your profile page',
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <ProfileContent userName={session.user.name || 'User'} />
      </div>
    </div>
  );
}
