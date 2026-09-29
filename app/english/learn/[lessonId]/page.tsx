import { notFound } from 'next/navigation';
import { englishLessons } from '@/lib/english-curriculum';
import LessonPlayer from '@/components/english/LessonPlayer';
export function generateStaticParams() { return englishLessons.map(lesson => ({ lessonId: lesson.id })); }
export default function EnglishLessonPage({ params }: { params: { lessonId: string } }) {
  const lesson = englishLessons.find(item => item.id === params.lessonId);
  if (!lesson) notFound();
  return <LessonPlayer key={lesson.id} lesson={lesson} />;
}
