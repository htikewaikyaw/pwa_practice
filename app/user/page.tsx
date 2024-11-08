'use client';
import React from 'react';
import UserList from '@/app/user/_components/user-list';
import useSWR from 'swr';
import { fetcher } from '@/app/_utils/fetcher';

export default function UserPage() {
  const [users, setUsers] = React.useState([]);
  const { data } = useSWR<any>(`/api/user`, fetcher);
  React.useEffect(() => {
    setUsers(data ?? []);
  }, [data]);

  // const url = process.env.GETUSERS_API_LINK as string;
  // const users = await fetch(url, { cache: 'no-store' }).then((res) => res.json());
  // const userlist = users.data.result.data;

  return (
    <>
      <UserList users={users} />
    </>
  );
}
