import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Handler for POST requests to create an employee
export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      profilePicture,
      documentLinks,
      dateOfBirth,
      gender,
      maritalStatus,
      position,
      startDate,
      departmentId,
      addedById // Assume this is passed from the request
    } = await request.json();

    // Check if the addedById is provided
    if (!addedById) {
      return NextResponse.json({ error: 'AddedById is required' }, { status: 400 });
    }

    // Check if the addedById exists in the database and if the user is an admin
    const user = await db.user.findUnique({
      where: { id: addedById },
      select: { role: true } // Fetch only the role to verify permissions
    });

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Only admin can perform this action' }, { status: 403 });
    }

    // Validate mandatory fields for employee creation
    if (!firstName || !lastName || !email || !phoneNumber || !position || !startDate || !departmentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the department exists
    const department = await db.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    // Validate dateOfBirth
    const parsedDateOfBirth = new Date(dateOfBirth);
    if (isNaN(parsedDateOfBirth.getTime())) {
      return NextResponse.json({ error: 'Invalid date format for dateOfBirth' }, { status: 400 });
    }

    // Create the new employee
    const employee = await db.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        profilePicture,
        documentLinks,
        dateOfBirth: parsedDateOfBirth,
        gender,
        maritalStatus,
        position,
        startDate: new Date(startDate),
        departmentId: department.id,
        addedById, // Stamp the user who added the employee
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
  }
}

// Handler for GET requests to fetch all employees
export async function GET(request: NextRequest) {
  try {
    // Fetch all employees from the database
    const employees = await db.employee.findMany({
      include: {
        department: true, // Include related department data if needed
        addedBy: true,   // Include the user who added the employee, if needed
      },
    });

    // Return the employee data as JSON
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
  }
}
