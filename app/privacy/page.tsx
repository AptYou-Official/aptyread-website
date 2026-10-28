import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import BrandWordmark from "@/components/public/BrandWordmark";

export const metadata: Metadata = {
  title: "Privacy Policy | AptyRead",
  description:
    "How AptyRead handles parent accounts, readers, progress and purchases. No ads in the app. No selling data. Parents stay in control.",
  alternates: {
    canonical: "https://www.aptyread.ai/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-apty-cream">
      <Header />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl">
            <BrandWordmark
              as="p"
              size="sm"
              className="tracking-wide font-semibold mb-4"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-apty-gray mb-10">
              Last updated 28 October 2026.
            </p>

            <section className="mb-14 pb-12 border-b border-apty-border">
              <h2 className="text-sm font-semibold tracking-wide text-apty-cyan mb-4">
                In plain words
              </h2>
              <div className="space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
                <p>A parent manages the account. Each reader has their own place.</p>
                <p>
                  In the new family app, a nickname and a preset avatar identify
                  each reader. We save their progress so they can continue.
                </p>
                <p>
                  Speaking practice in the new family app is not recorded or
                  graded.
                </p>
                <p>
                  No ads in the app. We do not sell data or market to children.
                </p>
                <p>
                  Parents can edit or remove readers, or delete the family
                  account. For help, write to{" "}
                  <a
                    href="mailto:support@aptyread.ai"
                    className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                  >
                    support@aptyread.ai
                  </a>
                  .
                </p>
                <p className="text-apty-gray">
                  The full policy below explains the new family release, older
                  app versions, and our website.
                </p>
              </div>
            </section>

            <div className="prose prose-lg max-w-none text-apty-gray [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-apty-dark [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-apty-dark [&_a]:text-apty-cyan [&_a]:font-semibold [&_a]:no-underline hover:[&_a]:text-apty-dark [&_strong]:text-apty-dark">
              <section className="mb-8">
                <h2>1. Who this covers</h2>
                <p className="mb-4">
                  This policy describes how{" "}
                  <strong>APTYOU SERVICES PRIVATE LIMITED</strong>{" "}
                  (&quot;AptyRead,&quot; &quot;we,&quot; &quot;us&quot;) handles
                  information in the AptyRead family app and on{" "}
                  <a href="https://www.aptyread.ai">www.aptyread.ai</a>.
                </p>
                <p className="mb-4">
                  The new family experience described here is being prepared for
                  release as version 16.3.0. It applies when you install that
                  release or a later version with these features. Updating this
                  policy does not change an older app on your device. Section 2.5
                  explains the earlier registration and speech features that
                  remain relevant until you update.
                </p>
                <p className="mb-4">
                  School and classroom accounts at classroom.aptyread.ai are a
                  separate product and are not fully described here.
                </p>
              </section>

              <section className="mb-8">
                <h2>2. What we collect</h2>
                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.1 Parent account
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    Your email address, account identifier, and connected sign-in
                    methods: email and password, Google, or Apple. Firebase
                    Authentication handles sign-in credentials. We do not copy
                    passwords into reader profiles.
                  </li>
                  <li>
                    Your selected country and help language, along with the
                    version and date of the agreement accepted during account
                    setup. The new family registration does not ask for a phone
                    number, parent name, or child age.
                  </li>
                  <li>
                    Support messages and other information you choose to send us.
                    Opening Contact support prepares an email; it does not send
                    one without your action.
                  </li>
                </ul>
                <p className="mb-4">
                  Apple may provide a private relay email if you choose Hide My
                  Email. Different sign-in accounts can identify different
                  families, even if you use them on the same device.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.2 Readers and learning
                </h3>
                <p className="mb-4">
                  A family can have up to three reader profiles. A first name or
                  nickname is enough; a legal name is not required. Parents
                  choose an avatar from the app&apos;s pictures. We do not ask
                  for a child&apos;s date of birth, address, contact details,
                  photograph, or social account in the new family experience.
                </p>
                <p className="mb-4">
                  We save each reader&apos;s lesson and activity completion,
                  current place, books, words, and unfinished activity state.
                  Learning records can also include answers, retries, help or
                  audio repeats, participation, and activity dates and times.
                  These records support progress, review, and sequential
                  unlocking. They are not a clinical assessment or a score of a
                  child&apos;s spoken pronunciation.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.3 Purchases, devices, and technical data
                </h3>
                <p className="mb-4">
                  Google Play or the Apple App Store handles payment. We do not
                  receive card numbers. We process product identifiers, purchase
                  tokens or receipts, transaction and order identifiers,
                  verification and refund status, and the parent account linked
                  to a purchase. This lets us provide access, restore valid
                  purchases, and prevent a receipt from being moved to another
                  family.
                </p>
                <p className="mb-4">
                  The app also creates a device installation identifier and
                  records a device label, recent activity, and reader sessions.
                  We use these to manage signed-in devices and avoid conflicting
                  sessions for the same reader. The identifier created by
                  AptyRead is not a hardware serial number.
                </p>
                <p className="mb-4">
                  Firebase Analytics can collect app usage and technical events
                  with app-instance identifiers. Firebase Crashlytics processes
                  errors, crash reports, and information such as device type,
                  operating system, and app version. Firebase installation and
                  messaging services can process installation identifiers,
                  messaging tokens, and connection data. These services may
                  initialize before registration, including during guest use.
                  We use app diagnostics and usage information to operate and
                  improve the service, not to advertise to children.
                </p>
                <p className="mb-4">
                  Loading lessons, pictures, audio, and video sends network
                  requests to our service providers. These requests can disclose
                  connection information such as an IP address, requested file,
                  and request time.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.4 Speaking practice in the new family app
                </h3>
                <p className="mb-4">
                  The new family activities invite children to listen and speak.
                  They do not record the child&apos;s voice, send it for speech
                  recognition, or assess what the child says. The recordings and
                  videos played by the app are teaching materials.
                </p>
                <p className="mb-4">
                  Some text may be read aloud by the device&apos;s text-to-speech
                  service. Depending on the installed voice and device settings,
                  that service may need a network connection to turn the supplied
                  lesson text into audio. It does not need the child&apos;s
                  microphone for this.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.5 Older app versions and existing records
                </h3>
                <p className="mb-4">
                  Earlier versions collected fields such as a parent name, child
                  name and age, and, for phone sign-in, a phone number. Some
                  earlier speaking activities used the microphone and sent audio
                  to Google Speech-to-Text for feedback, including where those
                  activities were available to guests. That earlier audio was
                  not stored as a recording in the child&apos;s learning profile.
                  Google&apos;s processing is described in its policy linked
                  below.
                </p>
                <p className="mb-4">
                  Existing account and learning records can remain after an
                  update. Older progress is kept separately from the redesigned
                  course; reaching a lesson in the old course does not
                  automatically complete its replacement. Valid existing
                  purchases remain subject to account and store verification.
                  Account deletion also covers the older profile and progress
                  records we hold, with the transaction and security exceptions
                  in Section 8.
                </p>
              </section>

              <section className="mb-8">
                <h2>3. How we use it</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Provide sign-in, lessons, and purchased access.</li>
                  <li>
                    Keep readers&apos; progress separate and help parents see
                    where each reader can continue.
                  </li>
                  <li>Back up and restore registered families&apos; learning data.</li>
                  <li>Answer support requests and diagnose problems.</li>
                  <li>
                    Protect accounts, verify purchases, prevent abuse, and meet
                    applicable legal obligations.
                  </li>
                </ul>
                <p className="mb-4">
                  We do not sell data, use child data for advertising, or show
                  ads in the app. There is no public child profile, chat, or
                  child-generated public content.
                </p>
              </section>

              <section className="mb-8">
                <h2>4. Parent controls, storage, and recovery</h2>
                <p className="mb-4">
                  Children can start the free learning journey as guests. An
                  adult creates and manages the family account. Purchases and
                  sensitive account actions are behind a parent gate and, where
                  needed, sign-in or confirmation. The gate is intended to
                  reduce accidental child access; it is not proof of identity or
                  verifiable parental consent under COPPA.
                </p>
                <p className="mb-4">
                  Guest progress is stored on the device. Removing the app,
                  clearing its data, or losing the device can remove that
                  progress. Registered readers use local storage and a cloud
                  backup. Changes made offline need to reach the server before
                  they can be recovered on another installation. Unbacked-up
                  changes can be lost if local data is removed.
                </p>
                <p className="mb-4">
                  After reinstalling, sign in to the same parent account to load
                  its saved readers, progress, country, and agreement record.
                  Use the original AptyRead and store accounts when restoring
                  purchases. Signing in to a different account does not transfer
                  purchases or readers. Each reader still completes their own
                  required lessons before starting the next level, even when
                  the family owns it.
                </p>
                <p className="mb-4">
                  Some lesson media is cached on the device. Cached files can be
                  removed by the app or operating system; not every video or
                  activity is available offline.
                </p>
              </section>

              <section className="mb-8">
                <h2>5. Who processes data</h2>
                <p className="mb-4">
                  These services help us run the product. Their privacy
                  information explains their own processing.
                </p>
                <p className="mb-4">
                  <strong>Firebase and Google Cloud</strong> — authentication,
                  cloud records and server functions, purchase verification,
                  analytics, crash reporting, installation and messaging
                  services.{" "}
                  <a
                    href="https://firebase.google.com/support/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Firebase privacy information
                  </a>
                  .
                </p>
                <p className="mb-4">
                  <strong>Google Speech-to-Text, in older app versions</strong>{" "}
                  — speech processing for the earlier activities described in
                  Section 2.5. It is not used to assess speech in the new family
                  activities.{" "}
                  <a
                    href="https://cloud.google.com/speech-to-text/docs/data-logging"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Speech-to-Text data information
                  </a>
                  .
                </p>
                <p className="mb-4">
                  <strong>Bunny Stream / CDN</strong> — delivery of teaching
                  pictures, audio, and video, including connection data for
                  those requests.{" "}
                  <a
                    href="https://bunny.net/legal/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bunny privacy policy
                  </a>
                  .
                </p>
                <p className="mb-4">
                  <strong>Apple and Google</strong> — connected sign-in and app
                  store payments. A device&apos;s speech service may also be
                  provided by Apple, Google, or another installed provider.{" "}
                  <a
                    href="https://www.apple.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apple privacy information
                  </a>
                  ,{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google privacy policy
                  </a>
                  .
                </p>
                <p className="mb-4">
                  We may also disclose information where required by law or
                  necessary to address fraud, security incidents, or harm.
                </p>
              </section>

              <section className="mb-8">
                <h2>6. The website</h2>
                <p className="mb-4">
                  www.aptyread.ai is hosted on Vercel and uses Vercel Analytics.
                  The homepage lesson video uses a YouTube embed
                  (youtube-nocookie). Playing it may send data to YouTube and
                  Google.
                </p>
                <p className="mb-4">
                  The marketing website also loads a Google Ads tag to measure
                  whether someone who saw an ad later visits or installs. The
                  tag is on the website, not inside the child&apos;s learning
                  activities. Website cookies, advertising measurement, and
                  analytics are separate from the app&apos;s learning programme.
                </p>
              </section>

              <section className="mb-8">
                <h2>7. Security</h2>
                <p className="mb-4">
                  Network requests use HTTPS/TLS. Accounts use Firebase
                  Authentication, and access controls separate families&apos;
                  cloud records. Parent gates, sign-in checks, and purchase
                  ownership checks help protect sensitive actions. No method of
                  transmission or storage is perfectly secure.
                </p>
                <p className="mb-4">
                  Keep access to your device and sign-in methods secure. If a
                  breach affects your information, we will notify you as
                  required by applicable law.
                </p>
              </section>

              <section className="mb-8">
                <h2>8. How long we keep it</h2>
                <p className="mb-4">
                  Account and learning records normally remain while the account
                  is open. Removing a reader deletes that reader&apos;s profile
                  and saved progress. Completing family account deletion removes
                  the sign-in account, family profiles and progress, and related
                  older account, progress, and agreement records from our active
                  account stores.
                </p>
                <p className="mb-4">
                  Some records remain after deletion. Purchase, transaction, and
                  ownership records support payment verification, refunds,
                  dispute handling, abuse prevention, and applicable legal or
                  accounting obligations. They can remain linked to the former
                  account identifier and are not all anonymized.
                </p>
                <p className="mb-4">
                  We also keep minimal deletion markers and hashed deletion
                  receipts. They prevent older device data from recreating a
                  removed reader and let a device confirm that account deletion
                  finished. We do not use retained transaction or deletion
                  records to rebuild deleted learning profiles or progress.
                </p>
                <p className="mb-4">
                  Automatic expiry is not currently configured for these
                  retained purchase, ownership, and deletion records. This means
                  they can remain after the account is gone; we do not promise a
                  fixed deletion period for them. Support correspondence,
                  operational logs, and service-provider backups may follow
                  separate retention processes. Contact us about a particular
                  record or deletion request.
                </p>
              </section>

              <section className="mb-8">
                <h2>9. Your choices</h2>
                <p className="mb-4">
                  Parents can view progress, edit reader names and avatars,
                  manage sign-in options, and remove readers in Grown-ups. You
                  can find this policy and the Terms of Service under
                  Grown-ups → About AptyRead.
                </p>
                <p className="mb-4">
                  To ask for a copy, correction, or deletion of information, or
                  to raise a privacy concern, write to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                  Depending on where you live, you may have additional rights
                  under applicable privacy law. We may need to verify that a
                  request concerns your account before acting on it.
                </p>
              </section>

              <section className="mb-8">
                <h2>10. Remove a reader or delete the family account</h2>
                <p className="mb-4">
                  To remove one reader, open Grown-ups → Account &amp; settings,
                  edit that reader, and choose Remove reader. Follow the parent
                  gate and confirmation. The other readers&apos; progress and
                  the family&apos;s purchased levels stay with the account. You
                  can then add a new reader in the available place.
                </p>
                <p className="mb-4">
                  To delete the whole account, open Grown-ups → Account &amp;
                  settings → Delete family account. Follow the parent gate,
                  sign-in checks, and final confirmation. Deletion needs a
                  connection to the server. If it is interrupted, follow the
                  app&apos;s retry or sign-in instructions until deletion is
                  confirmed; a pending message does not mean deletion has
                  finished.
                </p>
                <p className="mb-4">
                  Family account deletion is permanent and ends access through
                  that AptyRead account. Creating a new account with the same
                  email does not restore deleted readers. Deletion does not
                  automatically refund a store purchase. See the{" "}
                  <a href="/terms">Terms of Service</a> for purchase and refund
                  information, and Section 8 for records retained after deletion.
                </p>
                <p className="mb-4">
                  Instructions are also at{" "}
                  <a href="/delete-account">www.aptyread.ai/delete-account</a>.
                  If you cannot use the app, write to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2>11. Where data is processed</h2>
                <p className="mb-4">
                  We are based in India. Our service providers operate in more
                  than one country and may process information in India, the
                  United States, and other locations where they run services.
                  Selecting a country in the app does not mean all your data is
                  stored in that country. Contact us if you need more
                  information about processing relevant to your account.
                </p>
              </section>

              <section className="mb-8">
                <h2>12. Changes</h2>
                <p className="mb-4">
                  We will change the &quot;Last updated&quot; date when this
                  policy changes. We may also notify parents of material changes
                  in the app or by email. Any consent required for a new use of
                  information will be handled separately from simply updating
                  this page.
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
              Last updated 28 October 2026.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
