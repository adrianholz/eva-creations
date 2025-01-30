import { auth0UpdatePassword, auth0UpdateUser } from '@/lib/auth0';
import { verifyAuth } from '@/middleware/apiAuth';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {

   const authResult = await verifyAuth();
   
    if (!authResult.isAuthenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    console.log('authResult', authResult);

    const { userInfo } = authResult;
    
    return NextResponse.json(userInfo);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "An error ocurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { firstName, lastName, email } = await req.json();

  console.log(firstName, lastName, email);
  
  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  try {

    const authResult = await verifyAuth();

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    console.log('authResult', authResult);

    const { userInfo } = authResult;

    const updatedUser = await auth0UpdateUser(userInfo?.id, { firstName, lastName, email });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "An error ocurred" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { password } = await req.json();

  console.log('updatePassword', password);

  if (!password) {
    return NextResponse.json({ error: 'Password is required' }, { status: 400 });
  }

  try {

    const authResult = await verifyAuth();

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    console.log('authResult', authResult);

    const { userInfo } = authResult;

    const updatedUser = await auth0UpdatePassword(userInfo?.id, password);
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "An error ocurred" }, { status: 500 });
  }
}