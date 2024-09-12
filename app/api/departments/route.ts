import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST Route: Create a new department
export async function POST(request: NextRequest) {
  try {
    const { name, headId } = await request.json();

    // Validate input
    if (!name || !headId || isNaN(Number(headId))) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    // Get the user information from the headers
    const userHeader = request.headers.get('X-User');
    console.log('User Header:', userHeader);  // Debugging log
    const parsedUser = userHeader ? JSON.parse(userHeader) : null;

    // Check if user is valid
    if (!parsedUser || typeof parsedUser.userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract userId and validate
    const userId = parsedUser.userId;
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create a new department
    const department = await db.department.create({
      data: {
        name,
        headId: Number(headId),
        createdBy: userId,
      },
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}

// GET Route: Fetch all departments
export async function GET(request: NextRequest) {
  try {
    const userHeader = request.headers.get('X-User');
    console.log('User Header:', userHeader);  // Debugging log
    const parsedUser = userHeader ? JSON.parse(userHeader) : null;

    // Ensure user is authenticated
    if (!parsedUser || typeof parsedUser.userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all departments from the database
    const departments = await db.department.findMany({
      select: {
        id: true,
        name: true,
        headId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
      },
    });

    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}
