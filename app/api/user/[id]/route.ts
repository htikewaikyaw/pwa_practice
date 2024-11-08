import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// import { User } from '@prisma/client';
// import { UserRepository } from '@/app/_repositories/user';

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  roleId: string;
  departmentId: string;
};
type Props = {
  users: User[];
};

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user: User = await request.json();
    // const updatedUser = await UserRepository.update(params.id, user);
    const updatedUser = await fetch(`${process.env.USERCREATE_API_LINK}?id=${params.id}`, {
      cache: 'no-store',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((res) => res.json());

    return NextResponse.json(updatedUser);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedUser = await fetch(`${process.env.USERCREATE_API_LINK}?id=${params.id}`, {
      cache: 'no-store',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    return NextResponse.json(deletedUser);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    console.log(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
