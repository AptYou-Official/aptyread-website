import AppStoreBadge from '@/components/public/AppStoreBadge';
import GooglePlayBadge from '@/components/public/GooglePlayBadge';

const CLASSROOM_URL = 'https://classroom.aptyread.ai';
const CLASSROOM_LOGIN_URL = 'https://classroom.aptyread.ai/#/login';

type FooterProps = {
  schoolsPage?: boolean;
};

export default function Footer({ schoolsPage = false }: FooterProps) {
  return (
    <footer className="bg-white border-t border-apty-coral-accent py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-apty-coral mb-2">AptyRead</h3>
            <p className="text-sm font-semibold text-apty-gray italic mb-4">
              Every Child Reads.
            </p>
            <p className="text-apty-gray text-sm">
              {schoolsPage
                ? 'Structured English literacy for classrooms. Teach from a digital board, laptop, or projector.'
                : 'English reading program for children aged 4 to 10. 5 levels, 238 lessons.'}
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
                <a href="/schools" className="text-apty-gray hover:text-apty-coral transition-colors">
                  For Schools
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
                  Support: support@aptyread.ai
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@aptyread.ai"
                  className="text-apty-gray hover:text-apty-coral transition-colors"
                >
                  General: contact@aptyread.ai
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
            {schoolsPage ? (
              <>
                <h4 className="font-semibold text-apty-dark mb-4">Classroom</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href={CLASSROOM_URL}
                      className="text-apty-gray hover:text-apty-coral transition-colors"
                    >
                      Open Classroom
                    </a>
                  </li>
                  <li>
                    <a
                      href={CLASSROOM_LOGIN_URL}
                      className="text-apty-gray hover:text-apty-coral transition-colors"
                    >
                      School login
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h4 className="font-semibold text-apty-dark mb-4">Download</h4>
                <div className="mb-3">
                  <AppStoreBadge />
                </div>
                <GooglePlayBadge className="mb-3" />
              </>
            )}
          </div>
        </div>
        <div className="border-t border-apty-coral-accent pt-8 text-center">
          <p className="text-apty-gray text-sm mb-2">
            © 2026 APTYOU SERVICES PRIVATE LIMITED. All rights reserved.
          </p>
          {!schoolsPage ? (
            <p className="text-apty-gray text-xs">
              Google Play and the Google Play logo are trademarks of Google LLC.
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
