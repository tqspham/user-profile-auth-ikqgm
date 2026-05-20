import type { Metadata } from 'next';
import { SignupForm } from '@/components/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-background) py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-8 text-(--color-text)">Create Account</h1>
        <SignupForm />
      </div>
    </div>
  );
}