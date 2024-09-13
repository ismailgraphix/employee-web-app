import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust this import to match your setup

// GET route: Fetch a specific employee by ID
export async function GET(request: NextRequest, { params }: { params: { employeeId: string } }) {
  const employeeId = parseInt(params.employeeId, 10); // Convert to number

  if (isNaN(employeeId)) {
    return NextResponse.json({ error: 'Invalid employee ID' }, { status: 400 });
  }

  try {
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        position: true,
        startDate: true,
        department: { select: { name: true } }, // Join with department data
       
        documentLinks: true,
        gender: true,
        maritalStatus: true,
        dateOfBirth: true,
        address: true,
        addedBy: { select: { id: true, email: true } }, // Join with user who added
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch employee' }, { status: 500 });
  }
}

// DELETE route: Delete an employee by ID
export async function DELETE(request: NextRequest, { params }: { params: { employeeId: string } }) {
  const employeeId = parseInt(params.employeeId, 10); // Convert to number

  if (isNaN(employeeId)) {
    return NextResponse.json({ error: 'Invalid employee ID' }, { status: 400 });
  }

  try {
    const deletedEmployee = await db.employee.delete({
      where: { id: employeeId },
    });
    return NextResponse.json(deletedEmployee);
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
  }
}

// PUT route: Update an employee by ID
export async function PUT(request: NextRequest, { params }: { params: { employeeId: string } }) {
  const employeeId = parseInt(params.employeeId, 10); // Convert to number

  if (isNaN(employeeId)) {
    return NextResponse.json({ error: 'Invalid employee ID' }, { status: 400 });
  }

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
      addedById,
    } = await request.json();

    if (!firstName || !lastName || !email || !phoneNumber || !position || !startDate) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updatedEmployee = await db.employee.update({
      where: { id: employeeId },
      data: {
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
        addedById,
      },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 });
  }
}
