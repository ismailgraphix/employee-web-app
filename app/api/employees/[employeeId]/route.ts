import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust this import to match your setup

// DELETE route
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

// PUT route (for updating an employee)
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
      profilePicture,
      documentLinks,
      dateOfBirth,
      gender,
      maritalStatus,
      position,
      startDate,
      departmentId,
      addedById
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
        profilePicture,
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
