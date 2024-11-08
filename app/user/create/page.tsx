import UserForm from '@/app/user/_components/user-form';
// import { DepartmentRepository } from '@/app/_repositories/department';
// import { RoleRepository } from '@/app/_repositories/role';

export default async function UserCreate() {
  // const roles = await RoleRepository.findMany();
  // const departments = await DepartmentRepository.findMany();
  const roles = await fetch(`${process.env.ROLE_API_LINK}`, { cache: 'no-store' }).then((res) =>
    res.json(),
  );

  const departments = await fetch(`${process.env.DEPT_API_LINK}`, { cache: 'no-store' }).then(
    (res) => res.json(),
  );
  return (
    <UserForm
      departments={departments.data.result.data}
      roles={roles.data.result.data}
      onSuccessUrl='/user/'
    />
  );
}
