import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">Terms of Service</h1>
          
          <div className="mb-6 text-apty-gray">
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p><strong>Last Updated:</strong> December 25, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-apty-gray">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to AptyRead! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AptyRead mobile application (&quot;App&quot;), website (www.aptyread.ai), and related services (collectively, the &quot;Services&quot;) provided by <strong>AptYou Services Pvt Ltd</strong> (&quot;AptyRead,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a company registered in Kerala, India.
              </p>
              <p className="mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">2. Acceptance of Terms</h2>
              <p className="mb-4">
                By creating an account, downloading the App, or using any of our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and Refund Policy.
              </p>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on our website and/or within the App. Your continued use of the Services after such changes constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">3. Eligibility and Account Requirements</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.1 Age Requirements</h3>
              <p className="mb-4"><strong>For Parents/Guardians:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You must be at least <strong>18 years of age</strong> or the age of legal majority in your jurisdiction to create an account and purchase courses on AptyRead.</li>
                <li>By creating an account, you represent and warrant that you meet these age requirements.</li>
              </ul>
              <p className="mb-4"><strong>For Children:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>AptyRead is designed for young children to develop essential literacy skills.</li>
                <li>Children may only use the App under the direct supervision and consent of a parent or legal guardian.</li>
                <li>Parents/guardians are responsible for all activities conducted through their account and child profiles.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.2 Parental Consent</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Before creating a child profile, you will be required to provide explicit parental consent through our <strong>Parental Gate</strong> mechanism.</li>
                <li>By providing consent, you confirm that you are the parent or legal guardian of the child and authorize them to use the App.</li>
                <li>You are responsible for monitoring your child&apos;s use of the App and ensuring age-appropriate engagement.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.3 Account Registration</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To access our courses, you must create a parent account by providing accurate information.</li>
                <li>During registration, we collect minimal information: the child&apos;s name (which can be any name) and age.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
                <li>You agree to notify us immediately of any unauthorized use of your account.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.4 Multiple Child Profiles</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>A single parent account may create multiple child profiles for different children in your household.</li>
                <li>Each child profile is separate, and progress is tracked individually.</li>
                <li>Accounts and purchased courses are for personal, non-commercial use only and may not be shared, transferred, or resold.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.5 Account Deletion</h3>
              <p className="mb-4">You may delete your account and all associated data at any time through:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>In-App:</strong> Settings screen or Help &amp; Support screen within the AptyRead App</li>
                <li><strong>Website:</strong> Account deletion page at <strong>www.aptyread.ai/delete-account.html</strong></li>
                <li><strong>Email:</strong> Contact <strong>support@aptyread.ai</strong> with your account deletion request</li>
              </ul>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Upon deletion, all account data, child profiles, and progress will be permanently removed.</li>
                <li>Deletion is irreversible and cannot be undone.</li>
                <li>If you have purchased courses, account deletion will revoke access to all purchased content, and no refunds will be provided except as required by law.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">4. Services and Course Access</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.1 AptyRead Platform</h3>
              <p className="mb-4">
                AptyRead is a literacy development platform offering structured, level-based courses designed to help children build foundational reading and learning skills. Our primary course is <strong>AptyRead English Reading and Writing</strong>, with additional courses planned for the future.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.2 Course Structure</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Courses are organized into sequential levels that must be purchased and completed in order.</li>
                <li>Each level contains lessons, including videos and interactive activities.</li>
              </ul>
              <p className="mb-4"><strong>Validity Periods:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Each level has a specific validity period that is clearly displayed in the App before purchase.</li>
                <li>Validity periods are designed to provide sufficient time for completion, review, and practice.</li>
                <li>Validity periods may vary by level and course, and are typically 1.5 to 2 times the expected completion time.</li>
                <li>The exact validity period for each level is displayed in the App at the time of purchase.</li>
                <li>We reserve the right to adjust validity periods for new purchases based on course updates, market feedback, or business decisions.</li>
                <li>However, we will honor the validity period that was displayed at the time of your purchase for any level you have already purchased.</li>
              </ul>
              <p className="mb-4">
                Validity periods start from the date of purchase and are designed to accommodate normal learning pace, review time, and flexibility for different learning speeds.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.3 Purchase and Payment</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>AptyRead courses are sold as <strong>one-time purchases, not subscriptions</strong>. Each level is purchased separately and provides access for the specified validity period. There are no recurring charges or automatic renewals.</li>
                <li>All course purchases must be made through the <strong>Apple App Store</strong> or <strong>Google Play Store</strong>.</li>
                <li>Pricing, currency, and payment processing are handled by Apple or Google according to their respective terms and policies.</li>
                <li>AptyRead does not directly process or store payment information.</li>
                <li>By purchasing through these platforms, you agree to their terms of service and payment policies.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.4 Content Access</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Purchased course content is accessible online through the App.</li>
                <li>Most features work offline once content has been initially loaded.</li>
                <li>Lessons cannot be downloaded for permanent offline storage.</li>
                <li>Content is provided for streaming and in-app use only.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.5 Validity and Expiration</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Each purchased level has a specific validity period starting from the date of purchase.</li>
                <li>After the validity period expires, access to that level will be revoked.</li>
                <li>Progress data may be retained for a limited period to allow for repurchase, but access to content will be blocked until repurchase.</li>
                <li>We reserve the right to delete expired progress data after a reasonable retention period.</li>
                <li>You may repurchase expired levels at any time to regain access.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.6 Usage Limits and Learning Best Practices</h3>
              <p className="mb-4">
                To promote effective learning, protect children&apos;s wellbeing, and ensure sustainable service delivery, AptyRead implements the following usage guidelines:
              </p>
              <p className="mb-4"><strong>Daily Lesson Limits:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>By default, children can complete <strong>1 new lesson per day</strong> per course.</li>
                <li>Parents may adjust this limit to a <strong>maximum of 2 new lessons per day</strong> through parental settings within the App.</li>
                <li>These limits apply only to new lessons; children may review previously completed lessons at any time without restriction.</li>
                <li>Daily limits reset at <strong>6:00 AM in your local timezone</strong>. This allows parents to teach their children before work while maintaining healthy learning habits.</li>
                <li>These limits are designed to:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Encourage healthy screen time habits for young children</li>
                    <li>Prevent learning fatigue and information overload</li>
                    <li>Promote better knowledge retention through spaced learning</li>
                    <li>Reduce pressure on young learners</li>
                    <li>Support age-appropriate learning pacing</li>
                  </ul>
                </li>
              </ul>
              <p className="mb-4"><strong>Activity-Specific Limits:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Certain interactive activities that utilize advanced technologies (such as speech-to-text features, voice recognition, and other resource-intensive functionalities) may have usage limits per session, per day, or per level.</li>
                <li>These limits are implemented to:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Ensure fair and equitable access to premium features for all users</li>
                    <li>Maintain service quality and performance</li>
                    <li>Manage operational costs associated with third-party technology services</li>
                    <li>Prevent system abuse or unintended excessive usage</li>
                  </ul>
                </li>
                <li>Activity limits are set at reasonable levels that support learning objectives while ensuring service sustainability.</li>
                <li>You will be notified within the App when approaching or reaching activity limits.</li>
              </ul>
              <p className="mb-4"><strong>Review and Practice Access:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Completed lessons remain accessible for unlimited review during the validity period.</li>
                <li>Review access is not subject to daily lesson limits.</li>
                <li>Practice activities within completed lessons can be repeated as many times as desired, subject to any activity-specific limits mentioned above.</li>
                <li>After the validity period expires, all content access (including new lessons and reviews) will be blocked until the level is repurchased.</li>
              </ul>
              <p className="mb-4"><strong>Parental Controls:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Parents have full control over daily lesson limits through the parental settings dashboard.</li>
                <li>Parents can monitor their child&apos;s daily progress, screen time, and activity completion.</li>
                <li>We encourage parents to use these settings to create a balanced learning routine that fits their child&apos;s needs and schedule.</li>
              </ul>
              <p className="mb-4">
                We believe these usage guidelines support better learning outcomes, promote healthy technology use, and create a positive educational experience for children.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.7 Free Trial</h3>
              <p className="mb-4">
                AptyRead offers a free trial that allows parents and children to evaluate the course before making a purchase.
              </p>
              <p className="mb-4"><strong>Free Trial Details:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The number of free lessons and which lessons are included may vary by course, level, and may be updated from time to time.</li>
                <li>Current free trial details (number of lessons, which lessons are included) are clearly displayed in the App and on our website.</li>
                <li>Free trial lessons are subject to the same usage limits, terms, and conditions as purchased content.</li>
                <li>We reserve the right to modify the free trial offering for new users based on market feedback, course updates, or business decisions.</li>
                <li>However, if you have already started a free trial, you will continue with the free trial terms that were displayed when you began.</li>
              </ul>
              <p className="mb-4">
                The free trial is designed to allow parents and children to evaluate the course structure and teaching method before making a purchase commitment.
              </p>
              <p className="mb-4">
                Current free trial details are always available in the App and on our website at the time you begin the trial.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.8 Device Access</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Purchased courses can be accessed on multiple devices linked to the same account.</li>
                <li>However, only one active session per child profile is allowed at a time.</li>
                <li>Account sharing outside your household is prohibited.</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.9 Content Updates</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We reserve the right to update, modify, or improve course content at any time.</li>
                <li>Updates may include bug fixes, improvements, or additional features.</li>
                <li>We will make reasonable efforts to notify users of significant changes that may affect their learning experience.</li>
                <li>Content updates do not extend the validity period of purchased levels.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">5. User Conduct and Restrictions</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">5.1 Acceptable Use</h3>
              <p className="mb-4">You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use the Services in any way that violates applicable laws or regulations</li>
                <li>Share your account credentials or purchased content with others outside your immediate household</li>
                <li>Attempt to circumvent any security features or access restrictions</li>
                <li>Reverse engineer, decompile, or disassemble any part of the App</li>
                <li>Use automated systems (bots, scrapers) to access the Services</li>
                <li>Copy, reproduce, distribute, or create derivative works from our content without permission</li>
                <li>Remove, alter, or obscure any copyright, trademark, or proprietary notices</li>
                <li>Use the Services in any manner that could harm children or violate their rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">5.2 Account Termination</h3>
              <p className="mb-4">We reserve the right to suspend or terminate your account and access to the Services at our sole discretion, without notice, if:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You violate these Terms or any applicable laws</li>
                <li>You engage in fraudulent activity or payment disputes</li>
                <li>Your account remains inactive for an extended period</li>
                <li>We determine that your conduct poses a risk to us, other users, or third parties</li>
              </ul>
              <p className="mb-4">
                Upon termination, your access to purchased content will be revoked, and no refunds will be provided except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">6. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">6.1 Ownership</h3>
              <p className="mb-4">
                All content, materials, features, functionality, and intellectual property available through the Services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Course lessons, videos, activities, and educational materials</li>
                <li>Text, graphics, images, animations, audio, and software</li>
                <li>The AptyRead name, logo, and trademarks</li>
              </ul>
              <p className="mb-4">
                are owned by <strong>AptYou Services Pvt Ltd</strong>, our licensors, or content providers and are protected by Indian and international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">6.2 Limited License</h3>
              <p className="mb-4">Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access and use the App on your personal devices</li>
                <li>Use purchased course content for personal, non-commercial educational purposes</li>
                <li>Allow your child(ren) to engage with the content under your supervision</li>
              </ul>
              <p className="mb-4">This license does not permit you to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Distribute, sell, rent, lease, or sublicense the content</li>
                <li>Publicly display or perform the content</li>
                <li>Modify, adapt, or create derivative works</li>
                <li>Use the content for any commercial purpose</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">6.3 User Content</h3>
              <p className="mb-4">
                If you provide feedback, suggestions, or other communications to us (&quot;User Content&quot;), you grant us a worldwide, perpetual, irrevocable, royalty-free license to use, reproduce, and incorporate such User Content into our Services without compensation or attribution.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">7. Privacy and Data Protection</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">7.1 Data Collection</h3>
              <p className="mb-4">We are committed to protecting your privacy and your child&apos;s privacy. We collect minimal information necessary to provide our Services:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Parent account information (email, contact details)</li>
                <li>Child information (name - which can be any name, age)</li>
                <li>Usage data and progress tracking within the App</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">7.2 Children&apos;s Privacy</h3>
              <p className="mb-4">
                We comply with applicable children&apos;s privacy laws, including the Children&apos;s Online Privacy Protection Act (COPPA) where applicable. We:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Collect minimal information from children</li>
                <li>Require verifiable parental consent before collecting any child data</li>
                <li>Use parental gate mechanisms to ensure only parents can make purchases or access sensitive areas</li>
                <li>Do not share children&apos;s information with third parties for marketing purposes</li>
              </ul>
              <p className="mb-4">
                For complete details on how we collect, use, and protect data, please review our <strong>Privacy Policy</strong> at <a href="/privacy.html" className="text-apty-coral hover:underline">www.aptyread.ai/privacy.html</a>.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">7.3 Third-Party Services</h3>
              <p className="mb-4">We use the following third-party services to operate the App:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Firebase and Firestore</strong> (Google) - for authentication, database, and analytics</li>
                <li><strong>Google Speech-to-Text</strong> - for speech recognition features</li>
                <li><strong>Bunny CDN</strong> - for content delivery</li>
              </ul>
              <p className="mb-4">
                These services may collect and process data according to their own privacy policies. We ensure all third-party services comply with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">8. Refunds and Cancellations</h2>
              <p className="mb-4">
                All purchases are subject to our <strong>Refund Policy</strong>, which is incorporated into these Terms by reference. Please review our complete Refund Policy at www.aptyread.ai/refund-policy.html.
              </p>
              <p className="mb-4"><strong>Key Points:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>7-day money-back guarantee from date of purchase</li>
                <li>Refunds must be requested through Apple App Store or Google Play Store</li>
                <li>Refund eligibility and processing are subject to app store policies</li>
                <li>No refunds after the 7-day period or validity expiration</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">9. Disclaimers and Limitations of Liability</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.1 Service Availability</h3>
              <p className="mb-4">We strive to provide uninterrupted access to our Services, but we do not guarantee that:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The Services will be error-free, secure, or available at all times</li>
                <li>Defects will be corrected promptly</li>
                <li>The Services will meet your specific requirements</li>
                <li>Results from using the Services will be accurate or reliable</li>
              </ul>
              <p className="mb-4">
                We reserve the right to modify, suspend, or discontinue any part of the Services at any time without notice. We will provide reasonable notice for significant changes that affect purchased content access. In the event of permanent discontinuation, we will provide refunds as required by applicable law.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.2 Educational Outcomes</h3>
              <p className="mb-4">While AptyRead is designed to support children&apos;s literacy development:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We do not guarantee specific learning outcomes or results</li>
                <li>Educational progress varies by child and depends on many factors</li>
                <li>The Services are supplemental and not a replacement for formal education</li>
                <li>Parents are responsible for monitoring their child&apos;s educational progress</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.3 Disclaimer of Warranties</h3>
              <p className="mb-4 font-semibold">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.4 Limitation of Liability</h3>
              <p className="mb-4 font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
              <p className="mb-4"><strong>AptYou Services Pvt Ltd, its directors, officers, employees, agents, and affiliates shall not be liable for:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or use</li>
                <li>Service interruptions or technical failures</li>
                <li>Any damages arising from your use or inability to use the Services</li>
              </ul>
              <p className="mb-4">
                <strong>Our total liability to you for any claims arising from these Terms or your use of the Services shall not exceed the amount you paid to us in the 12 months preceding the claim, or ₹1,000 (Indian Rupees One Thousand), whichever is greater.</strong>
              </p>
              <p className="mb-4">
                Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so some of the above limitations may not apply to you.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.5 Force Majeure</h3>
              <p className="mb-4">
                We shall not be liable for any failure or delay in performance under these Terms which results from circumstances beyond our reasonable control, including but not limited to: natural disasters, war, terrorism, pandemics, government actions, internet failures, or third-party service outages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">10. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless AptYou Services Pvt Ltd, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your use or misuse of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Any content or information you provide</li>
                <li>Your child&apos;s use of the Services under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">11. Geographic Scope and Governing Law</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">11.1 Target Markets</h3>
              <p className="mb-4">
                While the Services are accessible globally, our primary target markets are <strong>India and GCC (Gulf Cooperation Council) countries</strong>. We make no representation that the Services are appropriate or available for use in all locations.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">11.2 Governing Law</h3>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the <strong>laws of India</strong>, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">11.3 Jurisdiction</h3>
              <p className="mb-4">
                Any legal action or proceeding arising out of or relating to these Terms or the Services shall be brought exclusively in the courts located in <strong>Kerala, India</strong>, and you consent to the personal jurisdiction of such courts.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">11.4 International Users</h3>
              <p className="mb-4">
                If you access the Services from outside India, you are responsible for compliance with local laws and regulations in your jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">12. Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">12.1 Informal Resolution</h3>
              <p className="mb-4">
                Before filing any formal claim, you agree to first contact us at <strong>support@aptyread.ai</strong> or <strong>contact@aptyread.ai</strong> to attempt to resolve the dispute informally. We will work with you in good faith to reach a mutually acceptable resolution.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">12.2 Arbitration</h3>
              <p className="mb-4">
                If we cannot resolve the dispute informally within 30 days, you agree that any dispute shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India. The arbitration shall be conducted in Kerala, India, in English.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">12.3 Class Action Waiver</h3>
              <p className="mb-4">
                You agree that any arbitration or legal proceeding shall be conducted on an individual basis and not as a class action, consolidated action, or representative action. You waive your right to participate in a class action lawsuit or class-wide arbitration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">13. Third-Party Links and Services</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">13.1 External Links</h3>
              <p className="mb-4">
                The Services may contain links to third-party websites, services, or resources that are not owned or controlled by AptyRead. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">13.2 App Stores</h3>
              <p className="mb-4">
                Your use of the App through the Apple App Store or Google Play Store is subject to the respective app store&apos;s terms and conditions. In the event of any conflict between these Terms and app store terms, the app store terms shall prevail with respect to your use of the App through that platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">14. Accessibility</h2>
              <p className="mb-4">
                We strive to make our Services accessible to all users. If you experience any accessibility issues or have suggestions for improvement, please contact us at <strong>support@aptyread.ai</strong>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">15. Contact Information</h2>
              <p className="mb-4">If you have any questions, concerns, or feedback about these Terms or our Services, please contact us:</p>
              <p className="mb-4">
                <strong>AptYou Services Pvt Ltd</strong><br />
                Kerala, India
              </p>
              <p className="mb-4"><strong>Email:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>General inquiries: <a href="mailto:contact@aptyread.ai" className="text-apty-coral hover:underline">contact@aptyread.ai</a></li>
                <li>Support: <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a></li>
              </ul>
              <p className="mb-4"><strong>Website:</strong> <a href="https://www.aptyread.ai" className="text-apty-coral hover:underline">www.aptyread.ai</a></p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">16. Severability</h2>
              <p className="mb-4">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">17. Entire Agreement</h2>
              <p className="mb-4">
                These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and AptYou Services Pvt Ltd regarding the Services and supersede all prior agreements, understandings, and communications, whether written or oral.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">18. Waiver</h2>
              <p className="mb-4">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by an authorized representative of AptyRead.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">19. Assignment</h2>
              <p className="mb-4">
                You may not assign or transfer these Terms or your account to any third party without our prior written consent. We may assign these Terms or any rights hereunder without your consent. These Terms shall be binding upon and inure to the benefit of the parties and their respective successors and permitted assigns.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">20. Survival</h2>
              <p className="mb-4">
                The provisions of these Terms that by their nature should survive termination shall survive, including but not limited to: Intellectual Property Rights, Disclaimers and Limitations of Liability, Indemnification, Governing Law, and Dispute Resolution.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">21. Language</h2>
              <p className="mb-4">
                These Terms are prepared in English. In the event of any conflict between the English version and any translation, the English version shall prevail.
              </p>
            </section>

            <div className="mt-12 p-6 bg-apty-warm rounded-lg border border-apty-coral-accent">
              <p className="text-apty-dark font-semibold mb-2">
                By using AptyRead, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p className="text-apty-gray">
                Thank you for choosing AptyRead to support your child&apos;s learning journey!
              </p>
            </div>

            <div className="mt-8 text-sm text-apty-gray text-center">
              <em>Last Updated: December 25, 2025</em>
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

