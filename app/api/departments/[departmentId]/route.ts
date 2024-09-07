import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// DELETE route
export async function DELETE(request: NextRequest, { params }: { params: { departmentId: string } }) {
  const departmentId = parseInt(params.departmentId, 10); // Convert to number

  if (isNaN(departmentId)) {
    return NextResponse.json({ error: 'Invalid department ID' }, { status: 400 });
  }

  try {
    const deletedDepartment = await db.department.delete({
      where: { id: departmentId },
    });
    return NextResponse.json(deletedDepartment);
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
  }
}

// PUT route (for updating a department)
export async function PUT(request: NextRequest, { params }: { params: { departmentId: string } }) {
  const departmentId = parseInt(params.departmentId, 10); // Convert to number

  if (isNaN(departmentId)) {
    return NextResponse.json({ error: 'Invalid department ID' }, { status: 400 });
  }

  try {
    const { name, headId } = await request.json();

    if (!name || !headId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updatedDepartment = await db.department.update({
      where: { id: departmentId },
      data: {
        name,
        headId,
      },
    });

    return NextResponse.json(updatedDepartment);
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}
