// <root>/middleware.ts
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/')) {
    console.log('hola from middleware');
  }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   // This logic is only applied to /dashboard
  // }
}
