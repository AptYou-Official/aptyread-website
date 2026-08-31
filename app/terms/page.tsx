import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

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
    <div className="min-h-screen bg-apty-warm">
      <Header />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
              AptyRead
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-4 leading-tight">
              Terms of Service
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
                  A parent, 18 or older, creates the account. A child uses the
                  app with them.
                </p>
                <p>
                  The site and app let a child start Lesson 1 with no account.
                  A parent account is needed to save a profile and to buy a
                  level.
                </p>
                <p>
                  Buy a level once. No subscription. The App Store or Google
                  Play shows the price. Access lasts for the period shown when
                  you buy.
                </p>
                <p>
                  Refunds go through the store where you paid. Apple or Google
                  decide.
                </p>
                <p>
                  Using AptyRead means you accept these terms and our{" "}
                  <a
                    href="/privacy"
                    className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <p className="text-apty-gray">The full terms are below.</p>
              </div>
            </section>

            <div className="prose prose-lg max-w-none text-apty-gray [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-apty-dark [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-apty-dark [&_a]:text-apty-coral [&_a]:font-semibold [&_a]:no-underline hover:[&_a]:text-apty-dark [&_strong]:text-apty-dark">
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
                  We serve families in India, the United States, and the Gulf
                  with the same practices in these Terms. We are an Indian
                  company. We do not specifically market this app to the EU. If
                  someone in the EU uses it, these same Terms apply.
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
                  Lesson 1 can start with no account. A parent account is
                  needed to save a child profile and to buy a level. Children
                  use the app under that parent account.
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
                  A child profile uses a first name (any name) and an age. One
                  parent account may have more than one child profile. Progress
                  is tracked per child. Accounts and purchases are for personal
                  use in your household. Do not share, transfer, or resell
                  them.
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
                  You may delete the account in the app (Settings, or Help
                  &amp; Support, then Delete Account), at{" "}
                  <a href="/delete-account">www.aptyread.ai/delete-account</a>,
                  or by writing to{" "}
                  <a href="mailto:support@aptyread.ai">support@aptyread.ai</a>.
                </p>
                <p className="mb-4">
                  Deletion is permanent. Child profiles and progress are
                  removed. Access to purchased levels ends. No refund after
                  deletion, except as the law requires.
                </p>
              </section>

              <section className="mb-8">
                <h2>3. The program</h2>
                <p className="mb-4">
                  AptyRead is an English reading program for children. Five
                  levels. One sequential path. No skipping. Lesson videos
                  stream. A connection is required to take a lesson. Lessons
                  cannot be downloaded for offline use.
                </p>
                <p className="mb-4">
                  First lessons, including Lesson 1, are free and can start
                  with no account. We may change what is free for new users.
                  What you already started stays as shown when you began.
                </p>
                <p className="mb-4">
                  Each purchased level has a validity period shown in the app
                  before you buy. We honor the period shown at purchase. When
                  it ends, access to that level stops until you buy it again.
                  Content updates do not extend the period.
                </p>
                <p className="mb-4">
                  A parent sets a daily limit of 1 or 2 new lessons. Completed
                  lessons can be reviewed without that limit, while the level
                  is valid. Limits reset at 6:00 AM in the device timezone.
                  Speech practice uses Google Speech-to-Text and may have
                  usage limits so the service can keep running.
                </p>
                <p className="mb-4">
                  Same account, more than one device, one device at a time.
                  Progress syncs when you are online.
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
                  currency are set by the Apple App Store or Google Play. We
                  do not take or store card numbers.
                </p>
                <p className="mb-4">
                  Store terms apply to the purchase. If those terms conflict
                  with these Terms on payment or refunds, the store&apos;s
                  terms control for that purchase.
                </p>
                <p className="mb-4">
                  Refunds go through Apple or Google, where you paid. We do
                  not refund store purchases ourselves. Their rules, timing,
                  and decisions apply. If a refund is granted, access to that
                  level ends.
                </p>
                <p className="mb-4">
                  No refund after the validity period has ended, or after you
                  delete the account, except as the law requires.
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
                  if there is fraud, if the account sits unused for a long
                  time, or if we reasonably believe there is a risk to us or
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
                  of these Terms. We do not repeat it here. We do not claim
                  COPPA verifiable parental consent, GDPR compliance, or
                  compliance with Gulf data-protection statutes in these
                  Terms.
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
              Last updated 31 August 2026.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
