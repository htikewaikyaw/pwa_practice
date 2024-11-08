import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// import { User } from '@prisma/client';
import { UserRepository } from '@/app/_repositories/user';

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

export async function POST(request: NextRequest) {
  try {
    const user: User = await request.json();
    // const createdUser = UserRepository.create(user);
    // return NextResponse.json(createdUser);
    const createdUser = await fetch(`${process.env.USERCREATE_API_LINK}`, {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((res) => res.json());
    return NextResponse.json(createdUser);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = process.env.GETUSERS_API_LINK as string;
    const users = await fetch(url, { cache: 'no-store' }).then((res) => res.json());
    const userlist = users.data.result.data;
    return NextResponse.json(userlist);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
