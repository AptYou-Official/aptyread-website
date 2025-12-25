export default function Footer() {
  return (
    <footer className="bg-white border-t border-apty-coral-accent py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-apty-coral mb-4">AptyRead</h3>
            <p className="text-apty-gray text-sm">
              Helping children learn to read English properly, one lesson at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-apty-dark mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-apty-gray hover:text-apty-coral transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/privacy.html" className="text-apty-gray hover:text-apty-coral transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms.html" className="text-apty-gray hover:text-apty-coral transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/delete-account.html" className="text-apty-gray hover:text-apty-coral transition-colors">
                  Delete Account
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-apty-dark mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@aptyread.ai"
                  className="text-apty-gray hover:text-apty-coral transition-colors"
                >
                  support@aptyread.ai
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@aptyread.ai"
                  className="text-apty-gray hover:text-apty-coral transition-colors"
                >
                  contact@aptyread.ai
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-apty-dark mb-4">Download</h4>
            <p className="text-apty-gray text-sm">
              Available soon on Google Play Store
            </p>
          </div>
        </div>
        <div className="border-t border-apty-coral-accent pt-8 text-center">
          <p className="text-apty-gray text-sm">
            © 2025 AptYou Services Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

