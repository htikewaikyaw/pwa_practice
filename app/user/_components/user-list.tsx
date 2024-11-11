'use client';

import Link from 'next/link';

/* ライブラリ Material-UI が提供するコンポーネントの import */
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
/* icons */
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import useIsMobile from '@/app/_utils/hooks/uselsMobile';

// type User = Prisma.UserGetPayload<{
//   include: {
//     role: true;
//     department: true;
//   };
// }>;
type User = {
  id: string;
  name: string;
  email: string;
  roleName: string;
  departmentName: string;
};
type Props = {
  users: User[];
};

export default function UserList(props: Props) {
  const users = props.users;
  const router = useRouter();
  const isMobile = useIsMobile();

  const onDelete = async (id: string) => {
    const response = await fetch(`/api/user/${id}`, {
      method: 'DELETE',
    });
    mutate('/api/user');
    // router.refresh();
  };

  return (
    <>
      <Link href='/user/create' passHref>
        <Button variant='contained' color='primary'>
          <PersonAddIcon /> Create User
        </Button>
      </Link>
      <div>
        <Table size='small'>
          <TableHead>
            <TableRow>
              {!isMobile ? (
                <>
                  <TableCell>id</TableCell>
                  <TableCell>name</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell>role</TableCell>
                  <TableCell>department</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              ) : (
                <TableCell>name</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* users 全件をテーブル出力する */}
            {users.map((user) => {
              return (
                /* 一覧系の更新箇所を特定するために一意となる key を設定する必要がある */
                <TableRow key={user.id}>
                  {!isMobile ? (
                    <>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.roleName}</TableCell>
                      <TableCell>{user.departmentName}</TableCell>
                      <TableCell>
                        <Link href={`/user/edit/${user.id}`} passHref>
                          <Button variant='contained' color='primary'>
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => onDelete(user.id)}
                          variant='contained'
                          color='warning'
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{user.name}</TableCell>
                      <TableCell align='right' sx={{ padding: '6px 0px' }}>
                        <Link href={`/user/edit/${user.id}`} passHref>
                          <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            sx={{
                              minWidth: 'auto',
                            }}
                          >
                            <EditIcon fontSize='small' style={{ fontSize: '1rem' }} />
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align='right' sx={{ padding: '6px 0px' }}>
                        <Button
                          onClick={() => onDelete(user.id)}
                          variant='contained'
                          color='warning'
                          size='small'
                          sx={{ minWidth: 'auto' }}
                        >
                          <DeleteIcon fontSize='small' style={{ fontSize: '1rem' }} />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
