import type { Metadata } from "next";
import PolicyLayout, { PolicyContents } from "@/components/public/PolicyLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete your account | AptyRead",
  description:
    "Remove one reader or delete your AptyRead family account. Clear steps, what is deleted, and the limited records retained.",
  alternates: {
    canonical: "https://www.aptyread.ai/delete-account",
  },
};

const contents = [
  {
    "id": "delete-your-family-account",
    "label": "Delete your family account"
  },
  {
    "id": "what-happens",
    "label": "What happens"
  },
  {
    "id": "remove-one-reader-instead",
    "label": "Remove one reader instead"
  }
];

export default function DeleteAccountPage() {
  return (
    <PolicyLayout currentPage="delete-account" contents={contents}>

        <article className="legal-article">
          <div className="legal-document">
            <h1 id="delete-account-title">
              Delete your account.
            </h1>
            <p className="legal-lead">
              Delete a family account, or remove just one reader.
            </p>
            <PolicyContents items={contents} />

            <div className="legal-prose legal-actions">
              <section id="delete-your-family-account" tabIndex={-1}>
                <h2>
                  Delete your family account
                </h2>
                <ol>
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
                <p>
                  These steps apply to the family app, version 16.3.0 and later.
                  Older versions may show Delete Account in Settings or Help
                  &amp; Support. A connection is required. If deletion is pending,
                  reconnect and use Retry account deletion until the app confirms
                  Account deleted. Closing or uninstalling the app does not
                  itself delete a server account.
                </p>
              </section>

              <section id="what-happens" tabIndex={-1}>
                <h2>
                  What happens
                </h2>
                <p>
                  Family-account deletion removes the sign-in account, reader
                  profiles and their learning progress from our active family
                  records. You lose access through that account. It cannot be
                  used as a way to move purchases to another account. Ask for a
                  copy of your data or help with a purchase before confirming.
                </p>
                <p>
                  Deletion does not automatically refund a purchase. Your
                  store&apos;s refund process and any rights under applicable
                  law still apply.
                </p>
                <p>
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

              <section id="remove-one-reader-instead" tabIndex={-1}>
                <h2>
                  Remove one reader instead
                </h2>
                <p>
                  Open Grown-ups → Account &amp; settings → Your readers.
                  Choose the reader&apos;s edit button, then Remove reader.
                  Complete the parent check and confirm the named reader.
                </p>
                <p>
                  Only that reader&apos;s profile and progress are removed.
                  Purchased family levels and the other readers stay. You can
                  add another reader in the free place, up to three in total.
                  Removing a reader cannot be undone. Signing out is another
                  option if you only want to stop using the account on a device.
                </p>
                <p className="legal-email-request">
                  To request account deletion without the app, write to{" "}
                  <a
                    href="mailto:support@aptyread.ai"
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

              <p>
                <Link
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
                {" · "}
                <Link
                  href="/terms"
                >
                  Terms of Service
                </Link>
              </p>
            </div>

            <p className="legal-last-updated">
              Last updated 28 October 2026.
            </p>
          </div>
        </article>
    </PolicyLayout>
  );
}
