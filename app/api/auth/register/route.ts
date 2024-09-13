// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, email, password, role, profilePicture } = await req.json();

  // Input validation
  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
  }

  // Checking if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Determining role: default to 'employee' if not provided
  const userRole = role || 'employee';

  // Creating the user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: userRole,
      profilePicture: profilePicture || null,  // Save profile picture if provided
    },
  });

  return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
}
