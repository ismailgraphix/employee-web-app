import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getToken } from 'next-auth/jwt';

// Helper function to check if user is an admin based on their ID
const isAdmin = async (userId: number) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === 'admin';
};

// POST route (Create a new department)
export async function POST(request: NextRequest) {
  // Retrieve and check the token to get the user ID
  const token = await getToken({ req: request });

  if (!token?.id) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  // Check if the user is an admin by querying the database
  const userId = Number(token.id);
  const isUserAdmin = await isAdmin(userId);

  if (!isUserAdmin) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
  }

  try {
    const { name, headId } = await request.json();

    if (!name || !headId || isNaN(Number(headId))) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    const department = await db.department.create({
      data: {
        name,
        headId: Number(headId), // Convert headId to an integer
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  // Retrieve and check the token to get the user ID
  const token = await getToken({ req: request });

  if (!token?.id) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  // Check if the user is an admin by querying the database
  const userId = Number(token.id);
  const isUserAdmin = await isAdmin(userId);

  if (!isUserAdmin) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
  }

  try {
    const departments = await db.department.findMany({
      include: {
        head: true, // Assuming each department has a relation to a head
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}
