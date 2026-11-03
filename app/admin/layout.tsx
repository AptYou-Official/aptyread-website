import AdminLayout from '@/components/admin/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'AptyRead Admin', robots: { index: false, follow: false } };

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}

