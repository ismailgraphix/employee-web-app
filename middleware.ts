// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || req.headers.get('Authorization')?.replace('Bearer ', '');

  console.log('Token from cookies or header:', token);
  console.log('Secret key:', process.env.JWT_SECRET);

  const excludedPaths = ['/api/auth/register', '/api/auth/login'];

  if (excludedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    console.log('Decoded payload:', payload);
    const response = NextResponse.next();
    response.headers.set('X-User', JSON.stringify(payload));
    return response;
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/:path*'],
};
