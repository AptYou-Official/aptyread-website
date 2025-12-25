import UserTable from '@/components/admin/UserTable';
import { getUsers } from '@/lib/queries/users';

export default async function UsersPage() {
  const users = await getUsers(1000);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-apty-dark mb-2">User Management</h1>
        <p className="text-apty-gray">View and manage all users</p>
      </div>
      <UserTable users={users} />
    </div>
  );
}

