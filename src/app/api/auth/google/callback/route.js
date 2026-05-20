import { NextResponse } from 'next/server';

const DEFAULT_API_URL = 'https://drivefleet-server-lovat.vercel.app';

export function GET(request) {
  const serverBaseUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  const callbackUrl = new URL('/api/auth/google/callback', serverBaseUrl);
  callbackUrl.search = new URL(request.url).search;

  return NextResponse.redirect(callbackUrl);
}