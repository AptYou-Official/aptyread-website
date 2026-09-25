import type { Metadata } from 'next';
import ChildDashboard from '@/components/malayalam/ChildDashboard';

export const metadata: Metadata = {
  title: 'My learning path — AptyMalayalam',
  description: 'Explore your first Malayalam words with Apty.',
  alternates: { canonical: 'https://www.aptyread.ai/malayalam/dashboard' },
  robots: { index: false, follow: false },
};

export default function DashboardPage() { return <ChildDashboard />; }
