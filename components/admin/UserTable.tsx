'use client';

import { useState } from 'react';

interface User {
  id: string;
  email?: string;
  displayName?: string;
  createdAt?: any;
  lastLogin?: any;
  purchaseCount?: number;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.email?.toLowerCase().includes(search) ||
      user.displayName?.toLowerCase().includes(search) ||
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

  return (
    <div className="bg-white rounded-lg border border-apty-coral-accent shadow-sm">
      <div className="p-6 border-b border-apty-coral-accent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-apty-dark">Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-apty-border rounded-lg focus:outline-none focus:ring-2 focus:ring-apty-coral"
          />
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-apty-dark uppercase tracking-wider">
                Purchases
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apty-coral-accent">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-apty-warm">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-dark font-mono">
                  {user.id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {user.email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {user.displayName || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-apty-gray">
                  {user.purchaseCount || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

