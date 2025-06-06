import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req });

  console.log('Token from middleware:', token); 
  if (!token || (token.role !== 'admin' && token.role !== 'superAdmin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-controls/:path*'],
};
