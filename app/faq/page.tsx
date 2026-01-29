import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | AptyRead",
  description: "Common questions about AptyRead. Learn about getting started, pricing, learning approach, child safety, and more. English Reading & Writing for children ages 3-10.",
  alternates: {
    canonical: "https://www.aptyread.ai/faq",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-lg border border-apty-coral-accent shadow-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-apty-gray mb-8">
            Common questions from parents about AptyRead. Can&apos;t find what you&apos;re looking for? <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">Contact us</a>.
          </p>

          <div className="space-y-8">
            {/* Getting Started Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6 border-b border-apty-coral-accent pb-3">
                Getting Started
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    How do I start using AptyRead?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Simply download the app from Google Play Store (available soon). You can try 4 lessons completely free, no registration needed. Just open the app and start. If you like it, you can then enroll in Level 1.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Do I need to register or create an account to try?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    No registration is needed to try the free lessons. You can start using AptyRead right away. If you decide to enroll in a level after trying the free lessons, you&apos;ll create a simple parent account with just your child&apos;s name and age.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    What age is AptyRead for?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    AptyRead is designed for children ages 3 to 10 years old who are learning to read English. The course starts from the very beginning (learning letters) and progresses through independent reading.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Is this only for English reading?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Currently, we offer English Reading & Writing. We are planning to add more languages in the future. The structured learning approach works for any language.
                  </p>
                </div>
              </div>
            </section>

            {/* Learning & Progress Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6 border-b border-apty-coral-accent pb-3">
                Learning & Progress
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    How long does each lesson take?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Each lesson takes about 30 minutes. This includes the concept explanation, practice activities, and completion. We designed it this way to respect your child&apos;s attention span and promote healthy learning habits.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Can my child do multiple lessons per day?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    By default, your child can complete 1 new lesson per day. This is designed to promote better learning and prevent information overload. However, as a parent, you can adjust this to a maximum of 2 new lessons per day through the parental settings if needed. Your child can review completed lessons as many times as they want.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    What if my child struggles with a lesson?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    AptyRead uses a mastery-based system. Your child must achieve at least 70% to pass a lesson and move forward. If they don&apos;t pass, they can try the lesson again. This ensures they actually learn before moving on. Every 3 lessons, there&apos;s a review lesson to reinforce what they&apos;ve learned.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Can my child review completed lessons?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Yes! Your child can review any completed lesson as many times as they want. Reviewing is not limited by the daily lesson limit. Practice and repetition help strengthen learning.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    How does the level progression work?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Children must complete and master Level 1 before accessing Level 2, and so on. This sequential approach ensures your child builds a strong foundation before moving to more complex skills. You can&apos;t skip levels or jump ahead - this ensures real learning, not just quick progress.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    How long does it take to complete a level?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Each level typically takes 2 to 4 months to complete, depending on your child&apos;s pace. This is normal and healthy. We encourage steady progress, not rushing. Remember, it&apos;s better to learn one thing well than many things poorly.
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing & Payments Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6 border-b border-apty-coral-accent pb-3">
                Pricing & Payments
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    How much does AptyRead cost?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    AptyRead uses level-by-level enrollment. You pay only for the level you want, when you want it. There are no subscriptions or recurring charges. Pricing is handled through the Google Play Store or Apple App Store, so you&apos;ll see the exact price for your region when you enroll.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Is there a subscription or monthly fee?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    No, there are no subscriptions. AptyRead is designed with ethical monetization in mind. You enroll level-by-level, one at a time. Complete Level 1, see if it works for your child, then decide if you want Level 2. No pressure to pay for things you don&apos;t need.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Can I try before paying?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Absolutely! The first 4 lessons are completely free. No credit card, no registration needed to try. See if your child connects with our teaching approach, then decide if you want to enroll.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    What if I don&apos;t want to continue after trying?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    That&apos;s completely fine. Since there&apos;s no subscription, there&apos;s nothing to cancel. If you try the free lessons and decide it&apos;s not right for your child, you simply don&apos;t enroll in Level 1. No charges, no commitments.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    All payments are processed through the Google Play Store or Apple App Store. You&apos;ll use your existing payment method on those platforms (credit card, debit card, PayPal, etc.). We don&apos;t process payments directly.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    What is the refund policy?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Refunds are handled through the app store where you made the purchase (Google Play Store or Apple App Store). They have their own refund policies and procedures. Generally, refunds are available within 7 days of purchase. For details, see our <a href="/terms" className="text-apty-coral hover:underline">Terms of Service</a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6 border-b border-apty-coral-accent pb-3">
                Technical
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    What devices does AptyRead work on?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    AptyRead works on Android phones and tablets (through Google Play Store) and iPhone/iPad (through Apple App Store). The app is designed to work well on both phones and tablets.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Does AptyRead work offline?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Once you&apos;ve downloaded and accessed a lesson, most features work offline. However, you&apos;ll need an internet connection to download new lessons and sync progress. This is normal for educational apps.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Can multiple children use one account?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Yes! One parent account can have multiple child profiles. Each child has their own separate progress. This is perfect for families with more than one child. Each child profile is independent - they can be at different levels and progress at their own pace.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Can I use AptyRead on multiple devices?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Yes, you can use AptyRead on multiple devices with the same account. Your child&apos;s progress will sync across devices when you have an internet connection.
                  </p>
                </div>
              </div>
            </section>

            {/* Child Safety & Screen Time Section */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6 border-b border-apty-coral-accent pb-3">
                Child Safety & Screen Time
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    How much screen time does AptyRead require?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    AptyRead is designed for healthy screen time. One lesson per day, about 30 minutes. That&apos;s it. The app stops after the lesson. We built it this way on purpose - children learn better when they&apos;re not rushed, and we respect your concerns about screen time.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Is AptyRead safe for children?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Yes, absolutely. AptyRead is designed with child safety in mind. There are no ads, no external links, no social media features, and no way for children to communicate with others. It&apos;s a safe, focused learning environment.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Do you collect children&apos;s data?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    We collect minimal information needed for the app to work: your child&apos;s name (which can be any name) and age. We don&apos;t collect unnecessary data. All data is securely stored and never shared with third parties. For complete details, see our <a href="/privacy" className="text-apty-coral hover:underline">Privacy Policy</a>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-apty-dark mb-2">
                    Why only one lesson per day?
                  </h3>
                  <p className="text-apty-gray leading-relaxed">
                    Research shows that children learn better with spaced learning - giving time for information to sink in. One lesson per day promotes better retention, prevents learning fatigue, and respects your child&apos;s wellbeing. We&apos;re not trying to keep children in the app - we&apos;re helping them become confident readers.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-apty-coral-accent">
            <h2 className="text-2xl font-bold text-apty-dark mb-4">
              Still Have Questions?
            </h2>
            <p className="text-apty-gray mb-4">
              We&apos;re here to help! Contact us and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="space-y-2">
              <p className="text-apty-gray">
                <strong>Email:</strong> <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a>
              </p>
              <p className="text-apty-gray">
                <strong>General Inquiries:</strong> <a href="mailto:contact@aptyread.ai" className="text-apty-coral hover:underline">contact@aptyread.ai</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}






