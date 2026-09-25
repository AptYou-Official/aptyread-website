import type { Metadata } from 'next';
import FirstWordLesson from '@/components/malayalam/FirstWordLesson';

export const metadata: Metadata = {
  title: 'My first Malayalam word | AptyMalayalam',
  description: 'Explore റ and ത and make your first Malayalam word.',
  robots: { index: false, follow: false },
};
export default function FirstWordPage() { return <FirstWordLesson />; }
