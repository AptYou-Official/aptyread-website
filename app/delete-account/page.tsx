import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import BrandWordmark from "@/components/public/BrandWordmark";

export const metadata: Metadata = {
  title: "Delete your account | AptyRead",
  description:
    "Remove one reader or delete your AptyRead family account. Clear steps, what is deleted, and the limited records retained.",
  alternates: {
    canonical: "https://www.aptyread.ai/delete-account",
  },
};

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-2xl">
            <BrandWordmark
              as="p"
              size="sm"
              className="tracking-wide font-semibold mb-4"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-3 leading-tight">
              Delete your account.
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-14">
              Delete a family account, or remove just one reader.
            </p>

            <div className="space-y-12 text-base md:text-lg text-apty-dark leading-relaxed">
              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-cyan mb-4">
                  Delete your family account
                </h2>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Open AptyRead. Sign in with Google, Apple, or email.</li>
                  <li>
                    Go to <strong>Grown-ups → Account &amp; settings</strong>.
                  </li>
                  <li>
                    Tap <strong>Delete family account</strong>, complete the
                    parent check, and read the confirmation. Sign in again if
                    asked, then confirm deletion.
                  </li>
                </ol>
                <p className="mt-5 text-apty-gray">
                  These steps apply to the family app, version 16.3.0 and later.
                  Older versions may show Delete Account in Settings or Help
                  &amp; Support. A connection is required. If deletion is pending,
                  reconnect and use Retry account deletion until the app confirms
                  Account deleted. Closing or uninstalling the app does not
                  itself delete a server account.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-cyan mb-4">
                  What happens
                </h2>
                <p className="mb-4">
                  Family-account deletion removes the sign-in account, reader
                  profiles and their learning progress from our active family
                  records. You lose access through that account. It cannot be
                  used as a way to move purchases to another account. Ask for a
                  copy of your data or help with a purchase before confirming.
                </p>
                <p className="mb-4">
                  Deletion does not automatically refund a purchase. Your
                  store&apos;s refund process and any rights under applicable
                  law still apply.
                </p>
                <p className="text-apty-gray">
                  Limited store transaction and ownership records remain for
                  purchase verification, refunds, fraud prevention and legal
                  obligations. These may remain linked to an account identifier.
                  Minimal deletion markers and protected deletion-status proofs
                  also remain so retries and old devices cannot recreate deleted
                  data. These records currently have no automatic expiry; they
                  do not contain the deleted readers&apos; learning histories.
                  Service-provider logs and backups follow their own retention
                  schedules. See the Privacy Policy for details and contact us
                  about retained records.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-cyan mb-4">
                  Remove one reader instead
                </h2>
                <p className="mb-4">
                  Open Grown-ups → Account &amp; settings → Your readers.
                  Choose the reader&apos;s edit button, then Remove reader.
                  Complete the parent check and confirm the named reader.
                </p>
                <p className="mb-4 text-apty-gray">
                  Only that reader&apos;s profile and progress are removed.
                  Purchased family levels and the other readers stay. You can
                  add another reader in the free place, up to three in total.
                  Removing a reader cannot be undone. Signing out is another
                  option if you only want to stop using the account on a device.
                </p>
                <p className="text-apty-gray">
                  To request account deletion without the app, write to{" "}
                  <a
                    href="mailto:support@aptyread.ai"
                    className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                  >
                    support@aptyread.ai
                  </a>
                  {" "}from the parent email used for AptyRead. Say that you
                  want to delete your family account. We may ask for information
                  needed to verify ownership, but never your password or a
                  verification code. We will explain any records that must be
                  retained and confirm when the request is completed.
                </p>
              </section>

              <p className="text-apty-gray">
                <Link
                  href="/privacy"
                  className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                >
                  Privacy Policy
                </Link>
                {" · "}
                <Link
                  href="/terms"
                  className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                >
                  Terms of Service
                </Link>
              </p>
            </div>

            <p className="mt-16 text-sm text-apty-gray">
              Last updated 28 October 2026.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
