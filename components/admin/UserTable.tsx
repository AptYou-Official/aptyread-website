'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  email?: string;
  displayName?: string;
  parentName?: string;
  childName?: string;
  childAge?: number | string;
  parent?: {
    name?: string;
  };
  child?: {
    name?: string;
    age?: number | string;
  };
  children?: Array<{
    name?: string;
    age?: number | string;
  }>;
  createdAt?: any;
  lastLogin?: any;
  purchaseCount?: number;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getParentName = (user: User) =>
    user.parentName || user.parent?.name || user.displayName || 'N/A';

  const getChildName = (user: User) =>
    user.childName || user.child?.name || user.children?.[0]?.name || 'N/A';

  const getChildAge = (user: User) =>
    user.childAge ?? user.child?.age ?? user.children?.[0]?.age ?? 'N/A';

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.email?.toLowerCase().includes(search) ||
      user.displayName?.toLowerCase().includes(search) ||
      getParentName(user).toLowerCase().includes(search) ||
      getChildName(user).toLowerCase().includes(search) ||
      String(getChildAge(user)).toLowerCase().includes(search) ||
      user.id.toLowerCase().includes(search)
    );
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  const escapeCsv = (value: unknown) => {
    const text = String(value ?? '');
    if (text.includes('"') || text.includes(',') || text.includes('\n')) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const downloadCsv = () => {
    const header = [
      'userId',
      'email',
      'parentName',
      'childName',
      'childAge',
      'created',
      'purchaseCount',
    ];
    const rows = filteredUsers.map((user) => [
      user.id,
      user.email || '',
      getParentName(user) === 'N/A' ? '' : getParentName(user),
      getChildName(user) === 'N/A' ? '' : getChildName(user),
      getChildAge(user) === 'N/A' ? '' : getChildAge(user),
      formatDate(user.createdAt),
      user.purchaseCount || 0,
    ]);
    const csv = [header, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aptyread-users-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg border border-apty-coral-accent shadow-sm">
      <div className="p-6 border-b border-apty-coral-accent">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-apty-dark">Users</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-apty-border rounded-lg focus:outline-none focus:ring-2 focus:ring-apty-coral"
            />
            <button
              type="button"
              onClick={downloadCsv}
              className="bg-apty-coral text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90"
            >
              Export CSV
            </button>
          </div>
        </div>
        <p className="text-apty-gray">Total: {filteredUsers.length} users</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-apty-warm">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Parent Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Child Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Child Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Purchases
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apty-coral-accent">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-apty-warm">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-dark font-mono">
                  {user.id.substring(0, 12)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {user.email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {getParentName(user)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {getChildName(user)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {String(getChildAge(user))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {user.purchaseCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href={`/admin/users/${user.id}`} className="text-apty-coral hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



