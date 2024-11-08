import UserForm from '@/app/user/_components/user-form';
import { UserRepository } from '@/app/_repositories/user';
import { DepartmentRepository } from '@/app/_repositories/department';
import { RoleRepository } from '@/app/_repositories/role';

// Dynamic Segments (/user/edit/[id]) から [id] を取得する
type Props = {
  id: string;
};

export default async function UserEdit({ params }: { params: Props }) {
  const url = `${process.env.GETUSERS_API_LINK}?id=${params.id}`;
  const eidtUser = await fetch(url, { cache: 'no-store' }).then((res) => res.json());
  const user = eidtUser.data.result.data;
  const roles = await fetch(`${process.env.ROLE_API_LINK}`, { cache: 'no-store' }).then((res) =>
    res.json(),
  );

  const departments = await fetch(`${process.env.DEPT_API_LINK}`, { cache: 'no-store' }).then(
    (res) => res.json(),
  );

  return (
    <UserForm
      user={user}
      departments={departments.data.result.data}
      roles={roles.data.result.data}
      onSuccessUrl='/user/'
    />
  );
}
