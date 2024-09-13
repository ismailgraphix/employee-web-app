import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST Route: Create a new employee
export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
     
      documentLinks,
      dateOfBirth,
      gender,
      maritalStatus,
      position,
      startDate,
      departmentId,
    } = await request.json();

    // Validate mandatory fields
    if (!firstName || !lastName || !email || !phoneNumber || !position || !startDate || !departmentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the user information from the headers
    const userHeader = request.headers.get('X-User');
    console.log('User Header:', userHeader);  // Debugging log
    const parsedUser = userHeader ? JSON.parse(userHeader) : null;

    // Validate user
    if (!parsedUser || typeof parsedUser.userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parsedUser.userId;

    // Check if department exists
    const department = await db.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    // Validate date of birth
    const parsedDateOfBirth = new Date(dateOfBirth);
    if (isNaN(parsedDateOfBirth.getTime())) {
      return NextResponse.json({ error: 'Invalid date format for dateOfBirth' }, { status: 400 });
    }

    // Create the employee
    const employee = await db.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
       
        documentLinks,
        dateOfBirth: parsedDateOfBirth,
        gender,
        maritalStatus,
        position,
        startDate: new Date(startDate),
        departmentId,
        addedById: userId, // Stamp the user who added the employee
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
  }
}

// GET Route: Fetch all employees
export async function GET(request: NextRequest) {
  try {
    const userHeader = request.headers.get('X-User');
    console.log('User Header:', userHeader);  // Debugging log
    const parsedUser = userHeader ? JSON.parse(userHeader) : null;

    // Ensure user is authenticated
    if (!parsedUser || typeof parsedUser.userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all employees from the database
    const employees = await db.employee.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        position: true,
        startDate: true,
        departmentId: true,
        addedById: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}
