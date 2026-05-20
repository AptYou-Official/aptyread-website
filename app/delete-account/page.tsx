import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Delete Account | AptyRead - Account Deletion Request",
  description: "Delete your AptyRead account and all associated data. Learn about the deletion process, data removal, and important considerations before deleting your account.",
  alternates: {
    canonical: "https://www.aptyread.ai/delete-account",
  },
};

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
        <div className="bg-white p-8 md:p-12 rounded-lg border border-apty-coral-accent shadow-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">Delete Your AptyRead Account</h1>
          
          <div className="mb-6 text-apty-gray">
            <p><strong>Last Updated:</strong> May 20, 2026</p>
          </div>

          <div className="prose prose-lg max-w-none text-apty-gray">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">We&apos;re Sorry to See You Go</h2>
              <p className="mb-4">
                If you&apos;ve decided to delete your AptyRead account, we understand. This page explains how to delete your account and what happens to your data.
              </p>
              <p className="mb-4">
                <strong>You can complete account deletion in the AptyRead app without emailing support.</strong>
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <p className="text-apty-dark font-semibold mb-2">⚠️ Important</p>
                <p>
                  Account deletion is <strong>permanent and cannot be undone</strong>. Please read this page carefully before proceeding.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">How to Delete Your Account</h2>
              <p className="mb-4">
                Account deletion is completed in the AptyRead app. Sign in with Google, Sign in with Apple, or email and password, then follow the steps below.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">In the AptyRead App</h3>
              <p className="mb-4">Delete your account directly from the app:</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Open the AptyRead app and sign in</li>
                <li>Go to <strong>Settings</strong> (or <strong>Help &amp; Support</strong>)</li>
                <li>Tap <strong>&quot;Delete Account&quot;</strong></li>
                <li>Re-verify your identity when prompted (required for Sign in with Apple and other sign-in methods)</li>
                <li>Follow the on-screen instructions and confirm your deletion</li>
              </ol>
              <p className="mb-4"><strong>What to expect:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>✅ Self-serve — no email or phone call required to start deletion</li>
                <li>✅ Secure — uses your existing app sign-in</li>
                <li>✅ Deletion begins immediately when you confirm in the app</li>
                <li>✅ Clear confirmation so you can see what will be deleted</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Cannot Use the App?</h3>
              <p className="mb-4">
                If you are unable to delete your account in-app because of a lost sign-in, device issue, or other technical problem, contact{' '}
                <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a>{' '}
                for assistance. Support can help you regain access or resolve technical issues so you can complete deletion in the app. Support is not a routine way to delete an account when the app is available.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">What Gets Deleted</h2>
              <p className="mb-4">When you delete your account, the following information will be <strong>permanently removed</strong>:</p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Account Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your account credentials (email or phone number)</li>
                <li>Your authentication information</li>
                <li>Account settings and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Child Profile Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your child&apos;s name and age</li>
                <li>Child profile data</li>
                <li>All child profiles associated with your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Learning Progress</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All lesson completion data</li>
                <li>Learning progress and scores</li>
                <li>Review scores and practice results</li>
                <li>Learning milestones and achievements</li>
                <li>Time spent on lessons</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Purchase Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Purchase history (from your account view)</li>
                <li>Course access permissions</li>
                <li>Validity period information</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Other Data</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>App usage statistics</li>
                <li>Support request history</li>
                <li>Any other personal information associated with your account</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                <p className="text-apty-dark font-semibold mb-2">⚠️ Note</p>
                <p>
                  Once deleted, you will <strong>lose access to all purchased course levels</strong>. No refunds will be provided after account deletion, except as required by applicable law.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">What We Keep (For Legal and Accounting Purposes)</h2>
              <p className="mb-4">Some information must be retained for legal and accounting requirements:</p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Purchase Records</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Transaction records (anonymized - your personal information removed)</li>
                <li>Purchase amounts and dates</li>
                <li><strong>Retention period:</strong> 7 years (as required by tax and accounting laws)</li>
                <li><strong>Purpose:</strong> Legal compliance, accounting, and tax reporting</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Aggregated Analytics</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Anonymous usage statistics (cannot be linked back to you)</li>
                <li>App performance data</li>
                <li><strong>Purpose:</strong> Improving our educational services</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                <p className="text-apty-dark font-semibold mb-2">ℹ️ Important</p>
                <p>
                  This retained information is <strong>anonymized</strong> (your personal identifiers are removed) and <strong>cannot be used to identify you or your child</strong>.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Important Warnings</h2>
              <p className="mb-4">Before deleting your account, please understand:</p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-apty-dark font-semibold mb-2">⚠️ Permanent Deletion</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Account deletion is <strong>permanent and irreversible</strong></li>
                    <li>Once deleted, you <strong>cannot recover</strong> your account or data</li>
                    <li>You will need to create a new account if you want to use AptyRead again</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-apty-dark font-semibold mb-2">⚠️ Loss of Access</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>You will <strong>lose access</strong> to all purchased course levels</li>
                    <li>Your child&apos;s learning progress will be <strong>permanently lost</strong></li>
                    <li>You cannot transfer progress to a new account</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-apty-dark font-semibold mb-2">⚠️ No Refunds</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>No refunds</strong> will be provided after account deletion</li>
                    <li>If you have unused course validity remaining, it will be lost</li>
                    <li>Refunds are only available within 7 days of purchase (see our <a href="/terms" className="text-apty-coral hover:underline">Terms of Service</a>)</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-apty-dark font-semibold mb-2">⚠️ Cannot Be Undone</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>There is <strong>no way to undo</strong> account deletion</li>
                    <li>We cannot restore deleted accounts or data</li>
                    <li>Please be absolutely certain before proceeding</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Before You Delete</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Consider These Alternatives</h3>
              <p className="mb-4"><strong>Instead of deleting, you could:</strong></p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Take a Break</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                      <li>Simply stop using the app</li>
                      <li>Your account and progress will remain safe</li>
                      <li>You can return anytime</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Contact Support</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                      <li>If you&apos;re having issues, we&apos;re here to help</li>
                      <li>Email: <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a></li>
                      <li>We may be able to resolve your concerns</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Adjust Settings</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                      <li>Change daily lesson limits</li>
                      <li>Modify account preferences</li>
                      <li>Update child profiles</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <p className="mb-4 font-semibold">
                Only delete if you are certain you will not need your account or progress again.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Deletion Timeline</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">In-App Deletion</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Immediate:</strong> When you confirm in the app, account deletion starts right away</li>
                <li><strong>Completion:</strong> Your account and associated data are removed from active systems; removal from all backups may take up to 48 hours</li>
                <li><strong>Confirmation:</strong> You&apos;ll see confirmation in the app when deletion is initiated</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">Can I recover my account after deletion?</h3>
                  <p className="mb-2"><strong>No.</strong> Account deletion is permanent and irreversible. We cannot restore deleted accounts or data.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">Will I get a refund if I delete my account?</h3>
                  <p className="mb-2"><strong>No.</strong> Account deletion does not entitle you to a refund. Refunds are only available within 7 days of purchase through the app store refund process.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">Can I delete just one child profile?</h3>
                  <p className="mb-2"><strong>No.</strong> Account deletion removes all child profiles associated with your account. If you want to remove a specific child profile, please contact <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a>.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">What if I change my mind after starting deletion?</h3>
                  <p className="mb-2">Once you confirm deletion in the app, the process cannot be reversed. If you have not yet confirmed, simply close the flow without confirming. After deletion is processed, we cannot restore your account or data.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">How long does it take to delete my account?</h3>
                  <p className="mb-2">Deletion begins immediately when you confirm in the app. Removal from all systems, including backups, may take up to 48 hours.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">Will you delete my data immediately?</h3>
                  <p className="mb-2">Yes — deletion starts as soon as you confirm in the app. Complete removal from all systems may take up to 48 hours.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">Can I export my data before deleting?</h3>
                  <p className="mb-2">Yes. Contact <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a> to request a copy of your data before deletion. We&apos;ll provide your data in a portable format.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Your Rights</h2>
              <p className="mb-4">Under data protection laws (GDPR, COPPA), you have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>✅ <strong>Request account deletion</strong> at any time</li>
                <li>✅ <strong>Access your data</strong> before deletion</li>
                <li>✅ <strong>Export your data</strong> in a portable format</li>
                <li>✅ <strong>Withdraw consent</strong> for data processing</li>
              </ul>
              <p className="mb-4">We respect these rights and make it easy for you to exercise them.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Ready to Delete?</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Delete in the AptyRead App</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Open the AptyRead app and sign in</li>
                <li>Go to Settings → Delete Account</li>
                <li>Follow the on-screen instructions and confirm</li>
              </ol>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Need Help?</h3>
              <p className="mb-4">
                If you&apos;re unable to delete your account in-app due to a technical issue, contact{' '}
                <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline font-semibold">support@aptyread.ai</a>{' '}
                for assistance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Questions About Deletion?</h2>
              <p className="mb-4">If you have questions about what is deleted or need help using the in-app flow:</p>
              <p className="mb-4">
                <strong>Email:</strong> <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a><br />
                <strong>Subject:</strong> Account Deletion Help
              </p>
              <p className="mb-4"><strong>Response Time:</strong> We aim to respond within 24 hours.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Related Information</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><a href="/terms" className="text-apty-coral hover:underline">Terms of Service</a> - Learn about our refund policy and terms</li>
                <li><a href="/privacy" className="text-apty-coral hover:underline">Privacy Policy</a> - Understand how we protect your data</li>
                <li><a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">Contact Support</a> - Get help with your account</li>
              </ul>
            </section>

            <div className="mt-12 p-6 bg-apty-warm rounded-lg border border-apty-coral-accent">
              <p className="text-apty-dark font-semibold mb-2">
                Thank you for being part of the AptyRead community. We hope your child&apos;s learning journey continues to be successful!
              </p>
            </div>

            <div className="mt-8 text-sm text-apty-gray text-center">
              <p><em>Last Updated: May 20, 2026</em></p>
              <p className="mt-2"><em>APTYOU SERVICES PRIVATE LIMITED<br />15/367, Kurumbathur, Thirunavaya, Malappuram, Kerala, India - 676301</em></p>
            </div>
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
