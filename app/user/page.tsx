import { UserRepository } from '@/app/_repositories/user';
import UserList from '@/app/user/_components/user-list';

export default async function UserPage() {
  const users = await UserRepository.findMany();
  return (
    <>
      <UserList users={users} />
    </>
  );
}
