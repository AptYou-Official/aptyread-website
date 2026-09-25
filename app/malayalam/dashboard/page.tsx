import type { Metadata } from 'next';
import ChildDashboard from '@/components/malayalam/ChildDashboard';
import { malayalamSocialImage } from '@/lib/malayalam-metadata';

export const metadata: Metadata = {
  title: 'My learning path — AptyMalayalam',
  description: 'Explore your first Malayalam words with Apty.',
  alternates: { canonical: 'https://www.aptyread.ai/malayalam/dashboard' },
  openGraph: { title: 'Explore the AptyMalayalam learning preview', description: 'Little steps. A world of Malayalam words.', url: 'https://www.aptyread.ai/malayalam/dashboard', siteName: 'AptyMalayalam by AptyRead', type: 'website', images: [malayalamSocialImage] },
  twitter: { card: 'summary_large_image', title: 'Explore AptyMalayalam', description: 'Little steps. A world of Malayalam words.', images: [malayalamSocialImage.url] },
  robots: { index: false, follow: false },
};

export default function DashboardPage() { return <ChildDashboard />; }
