import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "Delete your account | AptyRead",
  description:
    "Delete your AptyRead account in the app. Permanent. Progress and purchased levels are removed.",
  alternates: {
    canonical: "https://www.aptyread.ai/delete-account",
  },
};

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
              AptyRead
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-3 leading-tight">
              Delete your account.
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-14">
              This cannot be undone.
            </p>

            <div className="space-y-12 text-base md:text-lg text-apty-dark leading-relaxed">
              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
                  In the app
                </h2>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Open AptyRead. Sign in with Google, Apple, or email.</li>
                  <li>
                    Go to <strong>Settings</strong>, or{" "}
                    <strong>Help &amp; Support</strong>.
                  </li>
                  <li>
                    Tap <strong>Delete Account</strong>. Sign in again if asked.
                    Confirm.
                  </li>
                </ol>
                <p className="mt-5 text-apty-gray">
                  It starts at once. Copies in backups may take up to 48 hours.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
                  What happens
                </h2>
                <p className="mb-4">
                  Your account goes. Every child on it. Progress. Access to
                  levels you bought. There is no refund after deletion, except
                  as the law requires.
                </p>
                <p className="text-apty-gray">
                  We keep anonymized purchase records for seven years, for tax.
                  And anonymous totals we cannot tie to you. That is all.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
                  If you are not sure
                </h2>
                <p className="mb-4">
                  You can just stop using the app. Progress stays. You can
                  change daily limits in Settings.
                </p>
                <p className="mb-4 text-apty-gray">
                  One child only? Write to us. Deleting the account removes every
                  child. Want a copy of your data first? Ask before you confirm.
                </p>
                <p className="text-apty-gray">
                  If the app will not open, write to{" "}
                  <a
                    href="mailto:support@aptyread.ai"
                    className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                  >
                    support@aptyread.ai
                  </a>
                  .
                </p>
              </section>

              <p className="text-apty-gray">
                <Link
                  href="/privacy"
                  className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                >
                  Privacy Policy
                </Link>
                {" · "}
                <Link
                  href="/terms"
                  className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                >
                  Terms of Service
                </Link>
              </p>
            </div>

            <p className="mt-16 text-sm text-apty-gray">
              Last updated 20 May 2026.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
