import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-apty-coral-accent py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-apty-coral mb-2">AptyRead</h3>
            <p className="text-sm font-semibold text-apty-gray italic mb-4">
              Literacy Program · For Parents & Educators
            </p>
            <p className="text-apty-gray text-sm">
              A complete reading program — 4 levels, 243 lessons — from first sound to first book. Ages 3–10.
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
                <a href="/faq" className="text-apty-gray hover:text-apty-coral transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/about" className="text-apty-gray hover:text-apty-coral transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/educators" className="text-apty-gray hover:text-apty-coral transition-colors">
                  For Educators
                </a>
              </li>
              <li>
                <a href="/contact" className="text-apty-gray hover:text-apty-coral transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-apty-gray hover:text-apty-coral transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-apty-gray hover:text-apty-coral transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/delete-account" className="text-apty-gray hover:text-apty-coral transition-colors">
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
            <h4 className="font-semibold text-apty-dark mb-4 mt-6">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/aptyread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apty-gray hover:text-apty-coral transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@aptyread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apty-gray hover:text-apty-coral transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-apty-dark mb-4">Download</h4>
            <a
              href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity mb-3"
              aria-label="Get it on Google Play"
            >
              <Image
                src="/images/google-play-badge-large.png"
                alt="Get it on Google Play"
                width={172}
                height={60}
                className="h-12 w-auto"
                priority={false}
              />
            </a>
          </div>
        </div>
        <div className="border-t border-apty-coral-accent pt-8 text-center">
          <p className="text-apty-gray text-sm mb-2">
            © 2025 APTYOU SERVICES PRIVATE LIMITED. All rights reserved.
          </p>
          <p className="text-apty-gray text-xs">
            Google Play and the Google Play logo are trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}

