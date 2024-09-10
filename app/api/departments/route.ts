import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Handler for POST requests to create a new department
export async function POST(request: NextRequest) {
  try {
    const { name, headId } = await request.json();

    // Validate required fields
    if (!name || !headId || isNaN(Number(headId))) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    // Create the department
    const department = await db.department.create({
      data: {
        name,
        headId: Number(headId),
      },
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}

// Handler for GET requests to fetch departments along with their employees
export async function GET(request: NextRequest) {
  try {
    // Fetch all departments with their associated employees
    const departments = await db.department.findMany({
      include: {
        employees: true,  // Fetch the related employees in each department
        head: true,       // Assuming 'head' is the head of the department
      },
    });

    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}
