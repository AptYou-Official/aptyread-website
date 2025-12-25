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
        <div className="bg-white p-8 md:p-12 rounded-lg border border-apty-coral-accent shadow-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">Delete Your AptyRead Account</h1>
          
          <div className="mb-6 text-apty-gray">
            <p><strong>Last Updated:</strong> December 25, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-apty-gray">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">We&apos;re Sorry to See You Go</h2>
              <p className="mb-4">
                If you&apos;ve decided to delete your AptyRead account, we understand. This page explains how to delete your account and what happens to your data.
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
              <p className="mb-4">You can delete your account in three ways:</p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">1. In-App (Recommended - Fastest)</h3>
              <p className="mb-4">The easiest way to delete your account is directly from the AptyRead app:</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Open the AptyRead app</li>
                <li>Go to <strong>Settings</strong> (or <strong>Help &amp; Support</strong>)</li>
                <li>Tap <strong>&quot;Delete Account&quot;</strong></li>
                <li>Follow the on-screen instructions</li>
                <li>Confirm your deletion</li>
              </ol>
              <p className="mb-4"><strong>Why this is recommended:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>✅ Fastest method (deletion happens immediately)</li>
                <li>✅ Secure (uses your app authentication)</li>
                <li>✅ Clear confirmation process</li>
                <li>✅ You can see exactly what will be deleted</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">2. Email Request</h3>
              <p className="mb-4">If you cannot access the app, you can request account deletion by email:</p>
              <p className="mb-4">
                <strong>Email:</strong> <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a><br />
                <strong>Subject:</strong> Delete AptyRead Account
              </p>
              <p className="mb-4"><strong>Please include in your email:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your account email address or phone number</li>
                <li>Confirmation that you want to delete your account</li>
                <li>Any questions you have about the deletion process</li>
              </ul>
              <p className="mb-4"><strong>Response time:</strong> We will process your deletion request within 48 hours.</p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3. Contact Support</h3>
              <p className="mb-4">If you have questions or need help with account deletion:</p>
              <p className="mb-4">
                <strong>Email:</strong> <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a><br />
                <strong>Subject:</strong> Account Deletion Help
              </p>
              <p className="mb-4">Our support team is here to help and can guide you through the process.</p>
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
                    <li>Refunds are only available within 7 days of purchase (see our <a href="/terms.html" className="text-apty-coral hover:underline">Terms of Service</a>)</li>
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
                <li><strong>Immediate:</strong> Account deletion begins immediately</li>
                <li><strong>Completion:</strong> Typically within 24-48 hours</li>
                <li><strong>Confirmation:</strong> You&apos;ll receive confirmation when deletion is complete</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Email Request</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Response:</strong> We&apos;ll acknowledge your request within 24 hours</li>
                <li><strong>Processing:</strong> Deletion will be processed within 48 hours</li>
                <li><strong>Confirmation:</strong> You&apos;ll receive email confirmation when deletion is complete</li>
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
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">What if I change my mind after requesting deletion?</h3>
                  <p className="mb-2">If you request deletion by email, contact us immediately at <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a>. If we haven&apos;t processed your deletion yet, we may be able to cancel the request. However, once deletion is processed, it cannot be reversed.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">How long does it take to delete my account?</h3>
                  <p className="mb-2">Account deletion is typically completed within 24-48 hours of your request.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-apty-dark mb-2">Will you delete my data immediately?</h3>
                  <p className="mb-2">We begin the deletion process immediately, but complete removal from all systems may take up to 48 hours.</p>
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
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Need Help?</h2>
              <p className="mb-4">If you have questions about account deletion or need assistance:</p>
              <p className="mb-4">
                <strong>Email:</strong> <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a><br />
                <strong>Subject:</strong> Account Deletion Help
              </p>
              <p className="mb-4"><strong>Response Time:</strong> We aim to respond within 24 hours.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Ready to Delete?</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Option 1: Delete in App (Recommended)</h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Open the AptyRead app</li>
                <li>Go to Settings → Delete Account</li>
                <li>Follow the instructions</li>
              </ol>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">Option 2: Request by Email</h3>
              <p className="mb-4">Send an email to <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline font-semibold">support@aptyread.ai</a> with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Subject: &quot;Delete AptyRead Account&quot;</li>
                <li>Your account email or phone number</li>
                <li>Confirmation of your deletion request</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">Related Information</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><a href="/terms.html" className="text-apty-coral hover:underline">Terms of Service</a> - Learn about our refund policy and terms</li>
                <li><a href="/privacy.html" className="text-apty-coral hover:underline">Privacy Policy</a> - Understand how we protect your data</li>
                <li><a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">Contact Support</a> - Get help with your account</li>
              </ul>
            </section>

            <div className="mt-12 p-6 bg-apty-warm rounded-lg border border-apty-coral-accent">
              <p className="text-apty-dark font-semibold mb-2">
                Thank you for being part of the AptyRead community. We hope your child&apos;s learning journey continues to be successful!
              </p>
            </div>

            <div className="mt-8 text-sm text-apty-gray text-center">
              <p><em>Last Updated: December 25, 2025</em></p>
              <p className="mt-2"><em>AptYou Services Pvt Ltd, Kerala, India</em></p>
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
