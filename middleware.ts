// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || req.headers.get('Authorization')?.replace('Bearer ', '');

  console.log('Token from cookies or header:', token);
  console.log('Secret key:', process.env.JWT_SECRET);

  // Define public routes that don't require authentication
  const excludedPaths = ['/api/auth/login', '/login', '/register'];

  // Allow requests to public routes without checking for authentication
  if (excludedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // If no token is found, redirect to login page for frontend or return 401 for API
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, secretKey);
    console.log('Decoded payload:', payload);

    // Attach user data to the request headers (optional)
    const response = NextResponse.next();
    response.headers.set('X-User', JSON.stringify(payload));
    return response;
  } catch (error) {
    console.error('Token verification error:', error);
    // Return 401 for API routes, redirect to login for frontend routes
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Apply the middleware to all routes and handle exclusions in the middleware logic
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*', 
    '/settings/:path*', 
    '/api/:path*'
  ],
};
