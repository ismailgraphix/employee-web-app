// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, email, password, role, profilePicture } = await req.json();

  // Debugging: log the incoming data
  console.log("Received data:", { name, email, profilePicture });

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userRole = role || 'employee';

  // Save user, including the profilePicture if provided
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: userRole,
      profilePicture: profilePicture || null,  // Save profilePicture to the DB
    },
  });

  return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
}