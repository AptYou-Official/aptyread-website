import Link from 'next/link';

export default function DeleteAccountPage() {
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
          <h1 className="text-4xl font-bold text-apty-dark mb-6">Delete Account</h1>
          
          <div className="prose prose-lg max-w-none text-apty-gray">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <p className="text-apty-dark font-semibold mb-2">⚠️ Important Notice</p>
              <p>
                Deleting your account will permanently remove all data associated with your account, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Your account information</li>
                <li>Your child's learning progress</li>
                <li>Purchase history</li>
                <li>All associated data</li>
              </ul>
              <p className="mt-4">
                <strong>This action cannot be undone.</strong>
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">How to Delete Your Account</h2>
              <p className="mb-4">To delete your account, please follow these steps:</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Open the AptyRead app on your device</li>
                <li>Go to Settings</li>
                <li>Select "Account" or "Profile"</li>
                <li>Choose "Delete Account"</li>
                <li>Confirm the deletion</li>
              </ol>
              <p className="mb-4">
                Alternatively, you can contact us directly to request account deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Contact Support</h2>
              <p className="mb-4">
                If you need assistance with account deletion or have questions, please contact our support team:
              </p>
              <p className="mb-4">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">
                  support@aptyread.ai
                </a>
              </p>
              <p className="mb-4">
                Please include your account email address in your request for faster processing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">What Happens After Deletion</h2>
              <p className="mb-4">After your account is deleted:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All your data will be permanently removed from our systems</li>
                <li>You will lose access to all learning progress</li>
                <li>Any active subscriptions will be cancelled</li>
                <li>You will need to create a new account to use AptyRead again</li>
              </ul>
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

