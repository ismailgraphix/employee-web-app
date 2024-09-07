import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getToken } from 'next-auth/jwt';
// import { jwtDecode } from 'jwt-decode';

// POST route (Create a new department)
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  console.log('Authorization Header:', authHeader);

  // Retrieve and check the token
  const token = await getToken({ req: request });
  console.log('Token:', token); // Log the token

  // if (!token || typeof token === 'object') {
  //   return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  // }

  try {
    // const decodedToken = jwtDecode(token as string);
    // console.log('Decoded Token:', decodedToken);

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

// GET route (Fetch all departments)
export async function GET(request: NextRequest) {
  // Retrieve and check the token
  const token = await getToken({ req: request });

  // if (!token || typeof token === 'object') {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

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
