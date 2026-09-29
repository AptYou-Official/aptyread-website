import { notFound } from 'next/navigation';
import { englishLessons } from '@/lib/english-curriculum';
import LessonOverview from '@/components/english/LessonOverview';

export function generateStaticParams() {
  return englishLessons.map(lesson => ({ lessonId: lesson.id }));
}

export default function EnglishLessonOverviewPage({ params }: { params: { lessonId: string } }) {
  const lesson = englishLessons.find(item => item.id === params.lessonId);
  if (!lesson) notFound();
  return <LessonOverview key={lesson.id} lesson={lesson} />;
}
