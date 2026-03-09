import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-apty-warm flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-2">Page not found</h1>
      <p className="text-apty-gray text-lg mb-8 max-w-md text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-apty-coral text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
        >
          Go to homepage
        </Link>
        <Link
          href="/faq"
          className="border-2 border-apty-coral text-apty-coral px-6 py-3 rounded-xl font-semibold hover:bg-apty-warm transition-colors text-center"
        >
          FAQ
        </Link>
      </div>
    </div>
  );
}
