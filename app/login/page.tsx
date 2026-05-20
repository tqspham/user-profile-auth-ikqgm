import type { Metadata } from 'next';
import { LoginForm } from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-8">Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
