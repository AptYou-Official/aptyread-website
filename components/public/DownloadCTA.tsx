import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';

export default function DownloadCTA() {
  return (
    <section className="bg-apty-coral py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Tonight can be Lesson 1.
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          First lessons are free. Pick your store.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <AppStoreBadge />
          <GooglePlayBadge />
        </div>
      </div>
    </section>
  );
}
