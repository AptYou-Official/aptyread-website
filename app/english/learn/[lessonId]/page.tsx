import { notFound } from 'next/navigation';
import { englishLessons } from '@/lib/english-curriculum';
import LessonPlayer from '@/components/english/LessonPlayer';
export function generateStaticParams() { return englishLessons.map(lesson => ({ lessonId: lesson.id })); }
export default async function EnglishLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = englishLessons.find(item => item.id === lessonId);
  if (!lesson) notFound();
  return <LessonPlayer key={lesson.id} lesson={lesson} />;
}
