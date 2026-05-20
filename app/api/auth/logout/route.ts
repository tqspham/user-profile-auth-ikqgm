'use server';

import { signOut, auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  await signOut({ redirect: false });

  return NextResponse.json(
    { success: true, redirectTo: '/login' },
    { status: 200 }
  );
}