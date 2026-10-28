import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import BrandWordmark from "@/components/public/BrandWordmark";

export const metadata: Metadata = {
  title: "Terms of Service | AptyRead",
  description:
    "AptyRead terms. A parent account. Buy a level once. No subscription. Refunds through the App Store or Google Play.",
  alternates: {
    canonical: "https://www.aptyread.ai/terms",
  },
};

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-apty-gray mb-10">
              Effective 1 January 2026. Last updated 28 October 2026.
            </p>

            <section className="mb-14 pb-12 border-b border-apty-border">
              <h2 className="text-sm font-semibold tracking-wide text-apty-cyan mb-4">
                In plain words
              </h2>
              <div className="space-y-4 text-base md:text-lg text-apty-dark leading-relaxed">
                <p>
                  A parent, 18 or older, creates the account. A child uses the
                  app with them.
                </p>
                <p>
                  Start learning without an account. In the family app, a
                  parent registers after Lesson 4, or earlier if they choose.
                  A parent account is needed to buy a level and back up readers.
                </p>
                <p>
                  A purchased family level is yours to keep, for up to three
                  readers on the same account. No subscription. Each reader
                  follows their own learning order.
                </p>
                <p>
                  The store shows your local price before payment. Restore
                  purchases with the same AptyRead and store accounts.
                  Refunds follow the store&apos;s rules and your legal rights.
                </p>
                <p>
                  Using AptyRead means you accept these terms and our{" "}
                  <a
                    href="/privacy"
                    className="text-apty-cyan font-semibold hover:text-apty-dark transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <p className="text-apty-gray">The full terms are below.</p>
              </div>
            </section>

            <div className="prose prose-lg max-w-none text-apty-gray [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-apty-dark [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-apty-dark [&_a]:text-apty-cyan [&_a]:font-semibold [&_a]:no-underline hover:[&_a]:text-apty-dark [&_strong]:text-apty-dark">
              <section className="mb-8">
                <h2>1. Who these terms cover</h2>
                <p className="mb-4">
                  These Terms of Service (&quot;Terms&quot;) govern the AptyRead
                  home app and the marketing site{" "}
                  <a href="https://www.aptyread.ai">www.aptyread.ai</a>{" "}
                  (together, the &quot;Services&quot;) provided by{" "}
                  <strong>APTYOU SERVICES PRIVATE LIMITED</strong>{" "}
                  (&quot;AptyRead,&quot; &quot;we,&quot; &quot;us&quot;), a
                  company registered in Kerala, India.
                </p>
                <p className="mb-4">
                  School and classroom accounts at classroom.aptyread.ai are a
                  separate product and are not fully described here.
                </p>
                <p className="mb-4">
                  The family-app descriptions below apply to version 16.3.0
                  and later, as that update becomes available. Some features
                  differ in older versions. School and classroom services and
                  website learning previews do not automatically include an
                  app purchase. Mandatory consumer rights where you live still
                  apply.
                </p>
                <p className="mb-4">
                  By using the Services you agree to these Terms and to our{" "}
                  <a href="/privacy">Privacy Policy</a>. If you do not agree, do
                  not use the app or the site.
                </p>
                <p className="mb-4">
                  We may update these Terms. We will change the &quot;Last
                  updated&quot; date. For material changes we may also notice in
                  the app or by email. Continued use after a change means you
                  accept the updated Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2>2. Accounts</h2>
                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.1 Parent and child
                </h3>
                <p className="mb-4">
                  Only a parent or legal guardian who is 18 or older (or the
                  age of majority where you live, if higher) may create an
                  account and buy a level. By creating an account you confirm
                  that you meet that requirement.
                </p>
                <p className="mb-4">
                  Guest learning is stored on that device. A parent account
                  is required to continue after Lesson 4 and to purchase a
                  level. Registered families can complete the free Level 1
                  sequence through Lesson 9 before buying the rest of Level 1.
                  Parents may also buy Level 1 earlier. Children use the app
                  under the parent&apos;s supervision.
                </p>
                <p className="mb-4">
                  Before registration we ask a parent to complete a short gate
                  (a simple math check) so a child is less likely to create an
                  account. That gate is not COPPA verifiable parental consent.
                  How we handle data is in the{" "}
                  <a href="/privacy">Privacy Policy</a>. For US children&apos;s
                  privacy questions, contact{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                </p>
                <p className="mb-4">
                  A family account can have up to three readers. Choose a
                  nickname and one of the app&apos;s avatars for each reader;
                  a legal name or age is not required by the new family profile
                  form. Progress is separate for each reader. The parent gives
                  a country and accepts the account agreement. Accounts and
                  purchases are for personal use within your household, and
                  cannot be sold or transferred to another account.
                </p>
                <p className="mb-4">
                  Keep the parent sign-in to yourself. You are responsible for
                  activity on the account. Tell us if someone uses it without
                  your permission.
                </p>

                <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">
                  2.2 Delete the account
                </h3>
                <p className="mb-4">
                  In the family app, open Grown-ups → Account &amp; settings →
                  Delete family account. Complete the parent check and confirm.
                  You can also request help at{" "}
                  <a href="/delete-account">www.aptyread.ai/delete-account</a>,
                  or by writing to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                </p>
                <p className="mb-4">
                  Family-account deletion removes that account and its readers&apos;
                  learning data and ends access through that account. It is
                  different from signing out or removing one reader. It does not automatically refund a store purchase
                  or move it to a new account. Contact support before deleting
                  if you need help with a purchase or a copy of your data. Your
                  store and statutory refund rights are not removed by deletion.
                </p>
                <p className="mb-4">
                  Removing one reader deletes that reader&apos;s progress and
                  frees a place. Purchased family levels and the other readers
                  stay. See the Privacy Policy for the limited purchase,
                  security and deletion records retained after deletion.
                </p>
              </section>

              <section className="mb-8">
                <h2>3. The program</h2>
                <p className="mb-4">
                  AptyRead is a structured English reading program for children
                  aged 4–10. The family release offers Levels 1 and 2. Later
                  levels may be shown as coming soon; they are not included in
                  a purchase of another level. A preview of lesson names does
                  not unlock those lessons or their activities.
                </p>
                <p className="mb-4">
                  Required activities, lessons and levels unlock in order for each
                  reader. At least one reader must complete the previous level
                  before a parent can buy the next level for the family. Buying
                  it does not mark anyone&apos;s lessons complete: each reader
                  must finish their own previous level before starting it.
                  Completed material can be revisited while access remains valid.
                </p>
                <p className="mb-4">
                  Family-level purchases in the new course have no scheduled
                  access expiry or recurring charge. &quot;Yours to keep&quot;
                  means continuing access on that family account, subject to
                  valid store ownership, these Terms and service availability;
                  it is not a promise that a cloud service will run forever.
                  New levels are separate purchases.
                </p>
                <p className="mb-4">
                  The family course has no one-or-two-new-lessons daily cap.
                  Sound and reading practice invite participation; they do not
                  record a child&apos;s voice or assess pronunciation. Parents
                  can support younger children and choose suitable breaks.
                </p>
                <p className="mb-4">
                  Sign in to the same parent account to recover backed-up readers
                  on another device. The current account limit is three registered
                  devices and two learning sessions at once; the same reader
                  cannot learn on two devices simultaneously. New progress
                  backs up when connected. Unsynced guest or local progress can
                  be lost if you uninstall the app or clear its storage.
                </p>
                <p className="mb-4">
                  Some lessons and media already stored on the device work
                  offline. Cached files may be removed by the device, and not
                  every activity is available offline. Streamed video, uncached
                  media, account recovery, purchase confirmation and backup need
                  a connection. Paid access may need an online store or account
                  check; cached access does not override a confirmed revocation.
                </p>
                <p className="mb-4">
                  Older versions may still show a timed Level 1 purchase,
                  different lesson IDs, daily limits or speech-feedback features.
                  After updating, verified previous Level 1 buyers receive Level 1
                  in the new course without a scheduled expiry, including buyers
                  whose old access period ended, unless the purchase was revoked.
                  Sign in with the original account and use Restore purchases
                  if needed. Old records are preserved separately; old lesson
                  completion does not automatically complete the redesigned course.
                </p>
                <p className="mb-4">
                  We may update lessons and the app. We do not guarantee
                  specific learning results. The program is not a substitute
                  for school.
                </p>
              </section>

              <section className="mb-8">
                <h2>4. Purchases and refunds</h2>
                <p className="mb-4">
                  Levels are one-time purchases, not subscriptions. No
                  recurring charge. No cancellation to remember. Price and
                  currency come from the Apple App Store or Google Play for
                  the product and store region. The country chosen during
                  registration does not set the store price. The payment sheet
                  shows the final charge and any applicable taxes. We do not
                  take or store payment-card numbers.
                </p>
                <p className="mb-4">
                  Store terms apply to the purchase. If those terms conflict
                  with these Terms on payment or refunds, the store&apos;s
                  terms control for that purchase.
                </p>
                <p className="mb-4">
                  Request a refund through the store where you paid, or contact
                  support for help. The store&apos;s rules, timing and decisions,
                  together with applicable consumer law, apply. A refund and
                  removal of access are not always the same action. Access is
                  removed when the store confirms the entitlement was revoked;
                  a refund that retains the entitlement does not by itself
                  remove it. Reader progress and other valid purchases are
                  preserved when access to one level is revoked.
                </p>
                <p className="mb-4">
                  If payment is pending or its confirmation is interrupted,
                  do not pay again to resolve it. Use Check payment or Restore
                  purchases and the same AptyRead and store accounts. A purchase
                  already linked to another family cannot be moved by restoring
                  it into a different account. Contact support if you cannot
                  recover the original account.
                </p>
              </section>

              <section className="mb-8">
                <h2>5. Acceptable use</h2>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Use the Services in a way that breaks the law.</li>
                  <li>
                    Share the parent sign-in or purchased content outside your
                    household.
                  </li>
                  <li>
                    Bypass security, scrape the Services, or reverse engineer
                    the app.
                  </li>
                  <li>
                    Copy, distribute, or make derivative works from our
                    content without permission.
                  </li>
                  <li>Remove our notices, or use the Services to harm a child.</li>
                </ul>
                <p className="mb-4">
                  We may suspend or close an account if you break these Terms,
                  if there is fraud, or if we reasonably believe there is a risk to us or
                  to others. Access to purchased content then ends. No refund
                  except as the law requires.
                </p>
              </section>

              <section className="mb-8">
                <h2>6. Intellectual property</h2>
                <p className="mb-4">
                  Lessons, videos, software, the AptyRead name, and related
                  marks belong to APTYOU SERVICES PRIVATE LIMITED or our
                  licensors. They are protected by intellectual property law.
                </p>
                <p className="mb-4">
                  While you follow these Terms we grant a limited,
                  non-exclusive, non-transferable, revocable license to use
                  the app on your devices and to let your child use purchased
                  content for personal education. You may not sell, rent,
                  publicly perform, or modify the content, or use it for a
                  business.
                </p>
                <p className="mb-4">
                  If you send us feedback, you grant us a worldwide,
                  perpetual, royalty-free license to use it in the Services
                  without payment or credit.
                </p>
              </section>

              <section className="mb-8">
                <h2>7. Privacy</h2>
                <p className="mb-4">
                  How we collect and use data is in the{" "}
                  <a href="/privacy">Privacy Policy</a>. That policy is part
                  of these Terms. A parent gate is a usability safeguard;
                  it does not verify an adult&apos;s identity or replace any
                  parental permission required by applicable law. Nothing in
                  these Terms removes privacy or consumer rights that cannot
                  be waived where you live.
                </p>
              </section>

              <section className="mb-8">
                <h2>8. Disclaimers and liability</h2>
                <p className="mb-4">
                  We aim to keep the Services running, but we do not promise
                  they will always be available, error-free, or fit a
                  particular need. We may change, suspend, or stop part of the
                  Services. If we permanently discontinue purchased content,
                  we will refund as the law requires.
                </p>
                <p className="mb-4 font-semibold text-apty-dark">
                  THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
                  AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
                  IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="mb-4 font-semibold text-apty-dark">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, APTYOU SERVICES
                  PRIVATE LIMITED AND ITS DIRECTORS, OFFICERS, EMPLOYEES, AND
                  AGENTS ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS,
                  DATA, OR USE.
                </p>
                <p className="mb-4">
                  <strong>
                    Our total liability for claims arising from these Terms or
                    the Services shall not exceed the amount you paid to us in
                    the 12 months before the claim, or ₹1,000 (Indian Rupees
                    One Thousand), whichever is greater.
                  </strong>
                </p>
                <p className="mb-4">
                  Some places do not allow certain limits. Those limits may
                  not apply to you to the extent the law forbids them.
                </p>
                <p className="mb-4">
                  We are not liable for delay or failure caused by events
                  beyond our reasonable control, including outages of
                  third-party services we use to run the app.
                </p>
              </section>

              <section className="mb-8">
                <h2>9. Indemnity</h2>
                <p className="mb-4">
                  You agree to indemnify and hold harmless APTYOU SERVICES
                  PRIVATE LIMITED and its officers, directors, employees, and
                  agents from claims, damages, and reasonable legal costs
                  arising from your use of the Services, your breach of these
                  Terms, or your child&apos;s use of the Services under your
                  account.
                </p>
              </section>

              <section className="mb-8">
                <h2>10. Governing law and disputes</h2>
                <p className="mb-4">
                  These Terms are governed by the laws of India, without
                  regard to conflict-of-law rules. Courts in Kerala, India,
                  have exclusive jurisdiction, except where the law in your
                  place of residence requires otherwise.
                </p>
                <p className="mb-4">
                  Before a formal claim, write to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>{" "}
                  and allow 30 days to try to resolve the issue.
                </p>
                <p className="mb-4">
                  If we cannot resolve it, and where the law allows, the
                  dispute shall be resolved by binding arbitration under the
                  Arbitration and Conciliation Act, 1996 of India, in Kerala,
                  in English, on an individual basis, not as a class or
                  representative action.
                </p>
                <p className="mb-4">
                  If you use the Services from outside India, you are
                  responsible for following local law. We do not say these
                  Terms override consumer rights that cannot be waived where
                  you live.
                </p>
              </section>

              <section className="mb-8">
                <h2>11. Other terms</h2>
                <p className="mb-4">
                  If a court finds a part of these Terms unenforceable, the
                  rest still applies. These Terms and the Privacy Policy are
                  the whole agreement between you and us about the Services.
                </p>
                <p className="mb-4">
                  If we do not enforce a provision, that is not a waiver.
                  You may not assign your account without our written
                  consent. We may assign these Terms. Provisions that should
                  survive termination (including intellectual property,
                  disclaimers, liability limits, indemnity, and this section)
                  survive.
                </p>
                <p className="mb-4">
                  These Terms are in English. If there is a translation, the
                  English text controls.
                </p>
              </section>

              <section className="mb-8">
                <h2>12. Contact</h2>
                <p className="mb-4">
                  <strong>APTYOU SERVICES PRIVATE LIMITED</strong>
                  <br />
                  15/367, Kurumbathur, Thirunavaya
                  <br />
                  Malappuram, Kerala, India 676301
                </p>
                <p className="mb-4">
                  Support:{" "}
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
