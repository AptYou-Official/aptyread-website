import { notFound } from 'next/navigation';
import { englishLessons } from '@/lib/english-curriculum';
import LessonOverview from '@/components/english/LessonOverview';

export function generateStaticParams() {
  return englishLessons.map(lesson => ({ lessonId: lesson.id }));
}

export default async function EnglishLessonOverviewPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = englishLessons.find(item => item.id === lessonId);
  if (!lesson) notFound();
  return <LessonOverview key={lesson.id} lesson={lesson} />;
}
