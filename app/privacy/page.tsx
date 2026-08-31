import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | AptyRead",
  description:
    "How AptyRead handles family data. Minimal collection. No ads in the app. No selling data. Parents stay in control.",
  alternates: {
    canonical: "https://www.aptyread.ai/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
              AptyRead
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-apty-gray mb-10">
              Effective 1 January 2026. Last updated 31 August 2026.
            </p>

            <section className="mb-14 pb-12 border-b border-apty-coral-accent">
              <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
                In plain words
              </h2>
              <div className="space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
                <p>
                  We collect as little as we can. When you enroll, a parent
                  creates the account.
                </p>
                <p>
                  For a child we keep a name — any name — and an age. Then
                  lesson progress, so they can continue.
                </p>
                <p>No ads. We do not sell data. We do not market to children.</p>
                <p>
                  When they practise saying a word, the sound is used for
                  feedback. It is not saved.
                </p>
                <p>
                  The site and app let a child start Lesson 1 with no account.
                  If they practise speaking, that sound still goes to Google for
                  feedback and is not kept.
                </p>
                <p>
                  You can see, change, or delete. Write to{" "}
                  <a
                    href="mailto:support@aptyread.ai"
                    className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                  >
                    support@aptyread.ai
                  </a>
                  .
                </p>
                <p className="text-apty-gray">The full policy is below.</p>
              </div>
            </section>

            <div className="prose prose-lg max-w-none text-apty-gray [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-apty-dark [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-apty-dark [&_a]:text-apty-coral [&_a]:font-semibold [&_a]:no-underline hover:[&_a]:text-apty-dark [&_strong]:text-apty-dark">
              <section className="mb-8">
                <h2>1. Who this covers</h2>
                <p className="mb-4">
                  This policy is for <strong>APTYOU SERVICES PRIVATE LIMITED</strong>{" "}
                  (&quot;AptyRead,&quot; &quot;we,&quot; &quot;us&quot;), the AptyRead
                  home app, and the marketing site{" "}
                  <a href="https://www.aptyread.ai">www.aptyread.ai</a>.
                </p>
                <p className="mb-4">
                  School and classroom accounts at classroom.aptyread.ai are a
                  separate product and are not fully described here.
                </p>
                <p className="mb-4">
                  We serve families in India, the United States, and the Gulf
                  with the same practices in this policy. We are an Indian
                  company. We do not specifically market this app to the EU. If
                  someone in the EU uses it, this same limited-data policy
                  applies. Write to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                </p>
                <p className="mb-4">
                  If you do not agree with this policy, do not use the app or
                  the site.
                </p>
              </section>

              <section className="mb-8">
                <h2>2. What we collect</h2>
                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.1 Parent
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Email or phone number, for sign-in.</li>
                  <li>
                    Sign-in method: Google Sign-In, Apple Sign-In on iOS, or
                    phone OTP through Firebase Authentication.
                  </li>
                  <li>Support messages you send us.</li>
                </ul>
                <p className="mb-4">
                  Purchases go through the Apple App Store or Google Play. We
                  do not take or store card numbers. We receive purchase
                  confirmations and transaction IDs so we can unlock a level.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.2 Child
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    First name (any name) and age. Age is a profile field. There
                    is one sequential learning path. No skipping.
                  </li>
                  <li>
                    Lesson progress: completion, scores, time, topics, and
                    milestones, so they can continue.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.3 Speech
                </h3>
                <p className="mb-4">
                  When a child practises saying a word, audio is sent to Google
                  Speech-to-Text for feedback. That includes Lesson 1 with no
                  account. Audio is not saved to our servers and is not stored
                  on the child&apos;s profile.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.4 App use
                </h3>
                <p className="mb-4">
                  Firebase Analytics records how the app is used (screens and
                  events). It can use an app instance ID. We use this to see
                  how the app is used, not for ads.
                </p>
                <p className="mb-4">
                  Firebase Crashlytics records crashes and device type,
                  operating system, and app version so we can fix bugs.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.5 What we do not collect from children
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Last name or full name.</li>
                  <li>Home address or location from the child.</li>
                  <li>Child contact details or social accounts.</li>
                  <li>Photos or videos of the child.</li>
                  <li>Public posts or chat. There is no social layer.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2>3. How we use it</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Run the app: sign-in, lessons, and purchased levels.</li>
                  <li>Show a parent where the child is on the one path.</li>
                  <li>Answer support.</li>
                  <li>Fix bugs and see which screens are used.</li>
                  <li>Meet legal duties we actually have, and stop abuse.</li>
                </ul>
                <p className="mb-4">
                  We do not sell data. We do not use child data to advertise.
                  We do not show ads in the app.
                </p>
              </section>

              <section className="mb-8">
                <h2>4. Parent account and children</h2>
                <p className="mb-4">
                  Lesson 1 can start with no account. A parent account is needed
                  to save a profile and to buy a level. Only a parent or
                  guardian (18+) creates that account.
                </p>
                <p className="mb-4">
                  Before registration we ask a parent to complete a short gate
                  (a simple math check) so a child is less likely to create an
                  account. That gate is not COPPA verifiable parental consent.
                  For US children&apos;s privacy questions, contact{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                </p>
                <p className="mb-4">
                  Parents control purchases and settings. Children cannot buy
                  or change the account. There is no chat and no
                  child-generated public content.
                </p>
                <p className="mb-4">
                  You can see, change, or delete child data in the app, or by
                  writing to support.
                </p>
              </section>

              <section className="mb-8">
                <h2>5. Who processes data</h2>
                <p className="mb-4">
                  We use these services to run the product. We require privacy
                  and security terms in our vendor contracts.
                </p>
                <p className="mb-4">
                  <strong>Firebase (Google)</strong> — Authentication,
                  Firestore, Analytics, Crashlytics. Account data, child
                  profiles, progress, app events, crash logs.{" "}
                  <a
                    href="https://firebase.google.com/support/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    firebase.google.com/support/privacy
                  </a>
                  . Data may sit on Google servers in more than one country.
                </p>
                <p className="mb-4">
                  <strong>Google Speech-to-Text</strong> — temporary audio for
                  pronunciation feedback. Not kept on the child profile.{" "}
                  <a
                    href="https://cloud.google.com/speech-to-text/docs/data-logging"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    cloud.google.com/speech-to-text/docs/data-logging
                  </a>
                  .
                </p>
                <p className="mb-4">
                  <strong>Bunny Stream / CDN</strong> — we use it to stream
                  lesson video. A CDN sees connection data, including IP.{" "}
                  <a
                    href="https://bunny.net/legal/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    bunny.net/legal/privacy
                  </a>
                  .
                </p>
                <p className="mb-4">
                  <strong>Apple and Google</strong> — sign-in and payments.{" "}
                  <a
                    href="https://www.apple.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    apple.com/privacy
                  </a>
                  ,{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </p>
                <p className="mb-4">
                  We may disclose information if the law requires it, or to
                  protect users from fraud or harm.
                </p>
              </section>

              <section className="mb-8">
                <h2>6. The website</h2>
                <p className="mb-4">
                  www.aptyread.ai is hosted on Vercel. The site uses Vercel
                  Analytics. The homepage lesson video is a YouTube embed
                  (youtube-nocookie). Playing it may send data to YouTube /
                  Google.
                </p>
                <p className="mb-4">
                  The site also loads a Google Ads tag to measure whether
                  someone who saw an ad later visits or installs. That tag is
                  on the marketing site, not inside the child&apos;s lessons.
                </p>
                <p className="mb-4">
                  Site cookies and analytics are not the same as the app.
                </p>
              </section>

              <section className="mb-8">
                <h2>7. Security</h2>
                <p className="mb-4">
                  Data in transit uses HTTPS/TLS. Accounts use Firebase
                  Authentication. We require privacy and security terms in our
                  vendor contracts. No method of storage is perfectly safe.
                </p>
                <p className="mb-4">
                  If a breach affects your information, we will notify you as
                  required by applicable law.
                </p>
              </section>

              <section className="mb-8">
                <h2>8. How long we keep it</h2>
                <p className="mb-4">
                  Account and progress stay while the account is open.
                </p>
                <p className="mb-4">
                  After you delete the account (see Section 10), we remove
                  account data, child profiles, progress, and related personal
                  records. Deletion starts in the app at once. Copies in
                  backups may take up to 48 hours.
                </p>
                <p className="mb-4">
                  Anonymized purchase records may be kept up to seven years for
                  tax and accounting. Aggregated totals we cannot tie to you may
                  be kept to improve the program.
                </p>
              </section>

              <section className="mb-8">
                <h2>9. Your choices</h2>
                <p className="mb-4">
                  You can see and update account and child profile data in the
                  app. You can ask for a copy of your data by writing to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                  You can delete the account in the app (Section 10).
                </p>
                <p className="mb-4">
                  Account deletion is permanent. Access to purchased levels
                  ends. No refund after deletion, except as the law requires.
                  Purchases and refunds are described in the{" "}
                  <a href="/terms">Terms of Service</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2>10. Delete the account</h2>
                <p className="mb-4">
                  In the AptyRead app: Settings, or Help &amp; Support, then
                  Delete Account. Confirm as the app asks.
                </p>
                <p className="mb-4">
                  Steps are also at{" "}
                  <a href="/delete-account">www.aptyread.ai/delete-account</a>.
                  If you cannot open the app, write to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2>11. Where data is processed</h2>
                <p className="mb-4">
                  We are an Indian company. India&apos;s Information Technology
                  Act, 2000 applies to our operations in India.
                </p>
                <p className="mb-4">
                  Vendors may process data in India, the United States, and
                  other countries where they run servers.
                </p>
              </section>

              <section className="mb-8">
                <h2>12. Changes</h2>
                <p className="mb-4">
                  We will change the &quot;Last updated&quot; date when this
                  policy changes. For material changes we may also notice in
                  the app or by email.
                </p>
              </section>

              <section className="mb-8">
                <h2>13. Contact</h2>
                <p className="mb-4">
                  <strong>APTYOU SERVICES PRIVATE LIMITED</strong>
                  <br />
                  15/367, Kurumbathur, Thirunavaya
                  <br />
                  Malappuram, Kerala, India 676301
                </p>
                <p className="mb-4">
                  Privacy and support:{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>
                  <br />
                  General:{" "}
                  <a href="mailto:contact@aptyread.ai">contact@aptyread.ai</a>
                </p>
              </section>
            </div>

            <p className="mt-16 text-sm text-apty-gray">
              Last updated 31 August 2026.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
