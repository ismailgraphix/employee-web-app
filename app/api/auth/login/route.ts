import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

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

    // Creating a JWT token including the user's role
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!, // Ensure JWT_SECRET is defined in .env
      { expiresIn: '1d' }
    );

    console.log('Generated Token:', token); // Log the generated token

    // Optionally set the token in a cookie for easier access (client-side can retrieve it)
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    response.cookies.set('token', token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure in production only
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
