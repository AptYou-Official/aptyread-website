import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <header className="bg-white border-b border-apty-coral-accent">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-apty-coral">
            AptyRead
          </Link>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-lg border border-apty-coral-accent shadow-sm">
          <h1 className="text-4xl font-bold text-apty-dark mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-apty-gray">
            <p className="mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Introduction</h2>
              <p className="mb-4">
                At AptyRead, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your child's information when using our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Information We Collect</h2>
              <p className="mb-4">We collect the following information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Account information (email, name)</li>
                <li>Learning progress and performance data</li>
                <li>App usage statistics</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use collected information to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide and improve our educational services</li>
                <li>Track learning progress</li>
                <li>Personalize the learning experience</li>
                <li>Communicate with parents about their child's progress</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your child's data. All data is encrypted and stored securely.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your child's data</li>
                <li>Request data deletion</li>
                <li>Opt-out of data collection</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mb-4">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">
                  support@aptyread.ai
                </a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-apty-coral-accent">
            <Link
              href="/"
              className="text-apty-coral hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

