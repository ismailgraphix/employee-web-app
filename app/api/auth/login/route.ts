// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Finding the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Comparing the password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Creating a JWT token including the user's ID and role
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!, // Ensure JWT_SECRET is defined in .env
      { expiresIn: '1d' } // Token expires in 1 day
    );

    console.log('Generated Token:', token); // Log the generated token

    // Setting the token in a cookie
    const response = NextResponse.json(
      { message: 'Login successful', token }, // Optionally return the token in the response
      { status: 200 }
    );
    response.cookies.set('token', token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set 'Secure' in production
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 60 * 60 * 24, // Token valid for 1 day
      path: '/', // Make the token available across the entire site
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
