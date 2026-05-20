import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  return NextResponse.json(
    { error: 'Verification endpoint not available' },
    { status: 403 }
  );
}
