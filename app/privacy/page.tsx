import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">Privacy Policy</h1>
          
          <div className="mb-6 text-apty-gray">
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p><strong>Last Updated:</strong> December 25, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none text-apty-gray">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to AptyRead! This Privacy Policy explains how <strong>AptYou Services Pvt Ltd</strong> (&quot;AptyRead,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and protects your information and your child&apos;s information when you use our mobile application (&quot;App&quot;), website (www.aptyread.ai), and related services (collectively, the &quot;Services&quot;).
              </p>
              <p className="mb-4">
                <strong>AptyRead is designed for young children.</strong> We are committed to protecting children&apos;s privacy and comply with applicable children&apos;s privacy laws, including the Children&apos;s Online Privacy Protection Act (COPPA) in the United States.
              </p>
              <p className="mb-4">
                By using our Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">2. Information We Collect</h2>
              <p className="mb-4">
                We collect minimal information necessary to provide our educational services. We do not collect more information than is reasonably necessary for your child to participate in our educational activities.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">2.1 Information Collected from Parents/Guardians</h3>
              <p className="mb-4"><strong>Account Information:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Email address or phone number (for account creation and authentication)</li>
                <li>Authentication method (Google Sign-In, Apple Sign-In on iOS devices, or Phone OTP via Firebase)</li>
                <li>Account credentials (managed securely through Firebase Authentication)</li>
              </ul>
              <p className="mb-4"><strong>Payment Information:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Purchase transactions are processed through Apple App Store or Google Play Store</li>
                <li>We do not collect, store, or process credit card information directly</li>
                <li>Payment information is handled by Apple or Google according to their privacy policies</li>
                <li>We receive purchase confirmations and transaction IDs for account management</li>
              </ul>
              <p className="mb-4"><strong>Communication Information:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Email address for account-related communications</li>
                <li>Support requests and feedback you provide to us</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">2.2 Information Collected from Children</h3>
              <p className="mb-4"><strong>Child Profile Information:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Child&apos;s first name (which can be any name - does not need to be real name)</li>
                <li>Child&apos;s age (for age-appropriate content delivery)</li>
              </ul>
              <p className="mb-4"><strong>Learning Progress Data:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Lesson completion status and progress</li>
                <li>Scores and performance on activities</li>
                <li>Time spent on lessons and activities</li>
                <li>Learning milestones and achievements</li>
                <li>Review scores and practice results</li>
                <li>Topics completed and mastery levels</li>
              </ul>
              <p className="mb-4"><strong>Usage Data:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>App usage statistics (sessions, duration, features used)</li>
                <li>Device information (device type, operating system, app version) for troubleshooting</li>
                <li>Error logs and crash reports (for app improvement)</li>
              </ul>
              <p className="mb-4"><strong>Audio Data (Temporary Processing Only):</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>When your child practices pronunciation, audio recordings are temporarily processed using Google Speech-to-Text API</li>
                <li><strong>These audio recordings are NOT permanently stored</strong></li>
                <li>Audio is processed in real-time for pronunciation feedback only</li>
                <li>Audio data is not saved to our servers or associated with your child&apos;s profile</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">2.3 Information We Do NOT Collect</h3>
              <p className="mb-4">We do NOT collect:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Last names or full names of children</li>
                <li>Physical addresses or location data</li>
                <li>Social media accounts or profiles</li>
                <li>Contact information from children</li>
                <li>Photos or videos of children</li>
                <li>Behavioral tracking for advertising purposes</li>
                <li>Information from third-party social networks (except Google Sign-In or Apple Sign-In for parent authentication)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect solely for the following purposes:</p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.1 Service Provision</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide and maintain the AptyRead educational platform</li>
                <li>Authenticate users and secure accounts</li>
                <li>Enable access to purchased course levels</li>
                <li>Track learning progress and personalize the educational experience</li>
                <li>Deliver educational content (lessons, videos, activities)</li>
                <li>Provide pronunciation feedback through speech recognition</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.2 Educational Purposes</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Track your child&apos;s learning progress across lessons and levels</li>
                <li>Generate progress reports for parents</li>
                <li>Personalize learning paths based on performance</li>
                <li>Identify areas where additional practice may be needed</li>
                <li>Provide educational recommendations</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.3 Account Management</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Process purchases and manage course access</li>
                <li>Send account-related communications (purchase confirmations, important updates)</li>
                <li>Respond to support requests and inquiries</li>
                <li>Manage account settings and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.4 Service Improvement</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Analyze app usage to improve educational content</li>
                <li>Fix bugs and technical issues</li>
                <li>Enhance app functionality and user experience</li>
                <li>Conduct research and analytics (aggregated and anonymized)</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">3.5 Legal and Safety</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Comply with legal obligations</li>
                <li>Protect the safety and security of our users</li>
                <li>Prevent fraud and abuse</li>
                <li>Enforce our Terms of Service</li>
              </ul>

              <p className="mb-4 font-semibold">We do NOT use your information or your child&apos;s information for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Advertising or marketing to children</li>
                <li>Selling data to third parties</li>
                <li>Creating profiles for advertising purposes</li>
                <li>Sharing with third parties for commercial purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">4. Children&apos;s Privacy (COPPA Compliance)</h2>
              <p className="mb-4">
                AptyRead is designed for young children. We take children&apos;s privacy seriously and comply with applicable children&apos;s privacy laws.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.1 COPPA Compliance (United States)</h3>
              <p className="mb-4">If you are located in the United States, we comply with the Children&apos;s Online Privacy Protection Act (COPPA). This means:</p>
              <p className="mb-4"><strong>Parental Consent:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We require verifiable parental consent before collecting any personal information from children under 13</li>
                <li>Parental consent is obtained through our Parental Gate mechanism during account registration</li>
                <li>Parents must create an account and provide consent before a child profile can be created</li>
                <li>We maintain records of parental consent as required by COPPA</li>
              </ul>
              <p className="mb-4"><strong>Minimal Data Collection:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We only collect information that is reasonably necessary for your child to participate in our educational activities</li>
                <li>We do not collect more information than is necessary for the educational purpose</li>
                <li>We do not condition a child&apos;s participation on providing more information than necessary</li>
              </ul>
              <p className="mb-4"><strong>No Marketing to Children:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We do not display advertisements to children</li>
                <li>We do not use children&apos;s information for advertising purposes</li>
                <li>We do not allow behavioral advertising targeting children</li>
              </ul>
              <p className="mb-4"><strong>Parental Rights:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Parents can review their child&apos;s personal information at any time</li>
                <li>Parents can request deletion of their child&apos;s information</li>
                <li>Parents can refuse to permit further collection or use of their child&apos;s information</li>
                <li>Parents can revoke consent at any time</li>
              </ul>
              <p className="mb-4"><strong>Data Sharing:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We do not share children&apos;s personal information with third parties for marketing purposes</li>
                <li>We only share information with service providers necessary to operate our platform (see Section 5)</li>
                <li>We do not sell children&apos;s personal information</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">4.2 Additional Protections</h3>
              <p className="mb-4"><strong>No Social Features:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Children cannot communicate with other users</li>
                <li>Children cannot share personal information with others</li>
                <li>No chat, messaging, or social networking features</li>
              </ul>
              <p className="mb-4"><strong>Parental Controls:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All purchases and account settings require parental authentication</li>
                <li>Parents have full control over their child&apos;s account and data</li>
                <li>Parents can monitor their child&apos;s progress and activity</li>
              </ul>
              <p className="mb-4"><strong>Content Safety:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All content is age-appropriate and educational</li>
                <li>No user-generated content from children</li>
                <li>No external links that could expose children to inappropriate content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">5. Data Sharing and Third-Party Services</h2>
              <p className="mb-4">
                We do not sell, rent, or share your personal information or your child&apos;s personal information with third parties for their marketing purposes.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">5.1 Service Providers</h3>
              <p className="mb-4">We use the following third-party services to operate our platform. These services are necessary for providing our educational services:</p>
              <p className="mb-4"><strong>Firebase and Firestore (Google):</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Purpose:</strong> Authentication, database storage, and backend services</li>
                <li><strong>Data Shared:</strong> Account information, child profiles, learning progress</li>
                <li><strong>Privacy Policy:</strong> <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-apty-coral hover:underline">https://firebase.google.com/support/privacy</a></li>
                <li><strong>Data Location:</strong> May be stored on Google servers globally</li>
              </ul>
              <p className="mb-4"><strong>Google Speech-to-Text API:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Purpose:</strong> Real-time pronunciation feedback and speech recognition</li>
                <li><strong>Data Shared:</strong> Temporary audio recordings (processed in real-time, not stored)</li>
                <li><strong>Privacy Policy:</strong> <a href="https://cloud.google.com/speech-to-text/docs/data-logging" target="_blank" rel="noopener noreferrer" className="text-apty-coral hover:underline">https://cloud.google.com/speech-to-text/docs/data-logging</a></li>
                <li><strong>Data Location:</strong> Processed on Google servers, not permanently stored</li>
              </ul>
              <p className="mb-4"><strong>Bunny CDN:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Purpose:</strong> Content delivery (videos, audio, images)</li>
                <li><strong>Data Shared:</strong> Content delivery only (no personal information)</li>
                <li><strong>Privacy Policy:</strong> <a href="https://bunny.net/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-apty-coral hover:underline">https://bunny.net/legal/privacy/</a></li>
                <li><strong>Data Location:</strong> Content cached on CDN servers globally</li>
              </ul>
              <p className="mb-4"><strong>Apple App Store / Google Play Store:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Purpose:</strong> Payment processing for in-app purchases</li>
                <li><strong>Data Shared:</strong> Purchase transactions, account identifiers</li>
                <li><strong>Privacy Policy:</strong> Apple: <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-apty-coral hover:underline">https://www.apple.com/privacy/</a>, Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-apty-coral hover:underline">https://policies.google.com/privacy</a></li>
                <li><strong>Data Location:</strong> Managed by Apple/Google</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">5.2 Data Sharing Limitations</h3>
              <p className="mb-4 font-semibold">We do NOT:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Sell personal information to third parties</li>
                <li>Share personal information for advertising purposes</li>
                <li>Allow third parties to use personal information for their own purposes</li>
                <li>Share children&apos;s information with third parties except as necessary for service provision</li>
              </ul>
              <p className="mb-4 font-semibold">We only share information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With service providers necessary to operate our platform</li>
                <li>When required by law or legal process</li>
                <li>To protect the safety and security of our users</li>
                <li>With your explicit consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">5.3 Legal Requirements</h3>
              <p className="mb-4">
                We may disclose information if required by law, court order, or government regulation, or if we believe disclosure is necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Comply with legal obligations</li>
                <li>Protect the rights, property, or safety of AptyRead, our users, or others</li>
                <li>Prevent fraud or abuse</li>
                <li>Respond to government requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">6. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your information and your child&apos;s information.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">6.1 Security Measures</h3>
              <p className="mb-4"><strong>Encryption:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All data transmission is encrypted using HTTPS/TLS</li>
                <li>Data at rest is encrypted using industry-standard encryption methods</li>
                <li>Authentication credentials are securely hashed and stored</li>
              </ul>
              <p className="mb-4"><strong>Access Controls:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access to personal information is restricted to authorized personnel only</li>
                <li>Employees and contractors are required to maintain confidentiality</li>
                <li>Access is granted on a need-to-know basis only</li>
              </ul>
              <p className="mb-4"><strong>Infrastructure Security:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We use Firebase (Google Cloud) for secure data storage</li>
                <li>Google Cloud Platform implements robust security measures</li>
                <li>Regular security audits and monitoring</li>
              </ul>
              <p className="mb-4"><strong>Account Security:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Strong authentication requirements (Google Sign-In, Apple Sign-In, or Phone OTP)</li>
                <li>Parental gate mechanisms to protect children&apos;s accounts</li>
                <li>Secure session management</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">6.2 Security Limitations</h3>
              <p className="mb-4">
                While we implement strong security measures, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to protecting your information using industry best practices.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">6.3 Data Breach Notification</h3>
              <p className="mb-4">In the unlikely event of a data breach that may affect your personal information, we will:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Notify affected users as required by applicable law</li>
                <li>Provide information about the nature of the breach</li>
                <li>Explain steps we are taking to address the breach</li>
                <li>Offer guidance on steps you can take to protect yourself</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your information only for as long as necessary to provide our services and comply with legal obligations.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">7.1 Active Accounts</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We retain account information and learning progress for as long as your account is active</li>
                <li>Data is retained to provide ongoing access to purchased courses</li>
                <li>Progress data is retained to maintain learning continuity</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">7.2 Account Deletion</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You can request deletion of your account at any time (see Section 9.4)</li>
                <li>Upon account deletion, we will delete:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Account information</li>
                    <li>Child profiles</li>
                    <li>Learning progress data</li>
                    <li>Consent records</li>
                  </ul>
                </li>
                <li>Deletion is typically completed within 48 hours of your request</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">7.3 Legal Retention Requirements</h3>
              <p className="mb-4"><strong>Purchase Records:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Purchase transaction records are retained for accounting and tax purposes</li>
                <li>Purchase records may be retained for up to 7 years as required by law</li>
                <li>Purchase records are anonymized (personal identifiers removed) after the retention period</li>
              </ul>
              <p className="mb-4"><strong>Consent Records:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>COPPA consent records are retained as required by law</li>
                <li>Consent records may be retained for compliance and audit purposes</li>
              </ul>
              <p className="mb-4"><strong>Aggregated Data:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We may retain aggregated, anonymized data that cannot identify individual users</li>
                <li>Aggregated data is used for analytics and service improvement</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">7.4 Expired Course Access</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>When a purchased course level expires, access to content is revoked</li>
                <li>Progress data may be retained for a limited period to allow for repurchase</li>
                <li>We reserve the right to delete expired progress data after a reasonable retention period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">8. Your Rights and Choices</h2>
              <p className="mb-4">
                You have certain rights regarding your personal information and your child&apos;s personal information.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">8.1 Access Rights</h3>
              <p className="mb-4 font-semibold">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access the personal information we hold about you and your child</li>
                <li>Review your child&apos;s learning progress and data</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mb-4 font-semibold">How to Exercise:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your account information through the App&apos;s Settings screen</li>
                <li>View your child&apos;s progress through the Parent Dashboard</li>
                <li>Request a data export by contacting <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">8.2 Correction Rights</h3>
              <p className="mb-4 font-semibold">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Correct inaccurate or incomplete information</li>
                <li>Update your account information</li>
                <li>Modify your child&apos;s profile information</li>
              </ul>
              <p className="mb-4 font-semibold">How to Exercise:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Update information directly through the App&apos;s Settings screen</li>
                <li>Contact <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a> for assistance with corrections</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">8.3 Deletion Rights</h3>
              <p className="mb-4 font-semibold">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Request deletion of your account and all associated data</li>
                <li>Request deletion of your child&apos;s information</li>
                <li>Withdraw consent for data collection</li>
              </ul>
              <p className="mb-4 font-semibold">How to Exercise:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Delete your account through the App&apos;s Settings screen or Help &amp; Support screen</li>
                <li>Visit <a href="/delete-account.html" className="text-apty-coral hover:underline">www.aptyread.ai/delete-account.html</a></li>
                <li>Contact <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a> with your deletion request</li>
              </ul>
              <p className="mb-4">
                <strong>Note:</strong> Account deletion is permanent and irreversible. Deletion will revoke access to purchased courses, and no refunds will be provided except as required by law.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">8.4 Opt-Out Rights</h3>
              <p className="mb-4 font-semibold">You can opt-out of:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Marketing emails (if any are sent in the future)</li>
                <li>Non-essential data collection (though this may limit app functionality)</li>
              </ul>
              <p className="mb-4 font-semibold">How to Exercise:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Unsubscribe from emails using the unsubscribe link</li>
                <li>Adjust app settings to limit data collection</li>
                <li>Contact <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a> to opt-out of specific data uses</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">8.5 COPPA Rights (United States)</h3>
              <p className="mb-4">If you are located in the United States, you have additional rights under COPPA:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Review:</strong> You can review your child&apos;s personal information at any time</li>
                <li><strong>Delete:</strong> You can request deletion of your child&apos;s information</li>
                <li><strong>Refuse:</strong> You can refuse to permit further collection or use of your child&apos;s information</li>
                <li><strong>Revoke Consent:</strong> You can revoke your consent at any time</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">8.6 GDPR Rights (European Union)</h3>
              <p className="mb-4">If you are located in the European Union, you have additional rights under GDPR:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Right to Access:</strong> Access your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Right to Object:</strong> Object to certain types of data processing</li>
              </ul>
              <p className="mb-4">
                To exercise GDPR rights, contact <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">9. Account Management</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.1 Parent Accounts</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Only parents/guardians (18+) can create accounts</li>
                <li>Parents control all account settings and purchases</li>
                <li>Parents can create multiple child profiles under one account</li>
                <li>Each child profile is separate with individual progress tracking</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.2 Child Profiles</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Child profiles are created and managed by parents</li>
                <li>Children cannot create accounts or profiles independently</li>
                <li>Children cannot make purchases or change account settings</li>
                <li>All child activity is visible to parents through the Parent Dashboard</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">9.3 Account Deletion</h3>
              <p className="mb-4">You can delete your account and all associated data at any time through:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>In-App:</strong> Settings screen or Help &amp; Support screen within the AptyRead App</li>
                <li><strong>Website:</strong> Account deletion page at <a href="/delete-account.html" className="text-apty-coral hover:underline">www.aptyread.ai/delete-account.html</a></li>
                <li><strong>Email:</strong> Contact <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a> with your account deletion request</li>
              </ul>
              <p className="mb-4">Upon deletion:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All account data, child profiles, and progress will be permanently removed</li>
                <li>Access to purchased courses will be revoked</li>
                <li>Deletion is irreversible and cannot be undone</li>
                <li>Purchase records may be retained for legal/accounting purposes (anonymized)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">10. International Users and Data Transfers</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">10.1 Primary Markets</h3>
              <p className="mb-4">
                AptyRead is primarily designed for users in <strong>India and GCC (Gulf Cooperation Council) countries</strong>. However, our Services are accessible globally.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">10.2 Data Location</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your information may be stored and processed on servers located in India, the United States, or other countries where our service providers operate</li>
                <li>Data may be transferred to and processed in countries with different data protection laws than your country of residence</li>
                <li>By using our Services, you consent to the transfer of your information to these countries</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">10.3 Data Protection Laws</h3>
              <p className="mb-4">We comply with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>COPPA</strong> (United States) - Children&apos;s Online Privacy Protection Act</li>
                <li><strong>GDPR</strong> (European Union) - General Data Protection Regulation</li>
                <li><strong>Information Technology Act, 2000</strong> (India) - Indian data protection laws</li>
                <li><strong>Google Play Families Policy</strong> - App store requirements</li>
              </ul>
              <p className="mb-4">
                If you are located in a region with specific data protection laws, we will comply with those laws to the extent applicable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">11. Cookies and Tracking Technologies</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">11.1 Cookies</h3>
              <p className="mb-4">
                Our App does not use traditional web cookies. However, we may use similar technologies for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Authentication and session management</li>
                <li>App functionality and preferences</li>
                <li>Analytics and service improvement</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">11.2 Analytics</h3>
              <p className="mb-4">We use Firebase Analytics to understand how our App is used. Analytics data is:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Aggregated and anonymized</li>
                <li>Used to improve our educational services</li>
                <li>Not used for advertising purposes</li>
                <li>Not shared with third parties for marketing</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">11.3 No Behavioral Advertising</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We do not use tracking technologies for advertising</li>
                <li>We do not allow third-party advertising networks</li>
                <li>We do not create behavioral profiles for advertising</li>
                <li>Children are not exposed to advertising</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">12. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other reasons.
              </p>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">12.1 Notification of Changes</h3>
              <p className="mb-4">We will notify you of significant changes by:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Updating the &quot;Last Updated&quot; date at the top of this Privacy Policy</li>
                <li>Posting a notice in the App</li>
                <li>Sending an email to registered users (for material changes)</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">12.2 Continued Use</h3>
              <p className="mb-4">
                Your continued use of our Services after changes to this Privacy Policy constitutes your acceptance of the updated Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">12.3 Material Changes</h3>
              <p className="mb-4">For material changes that affect how we collect, use, or share children&apos;s information:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We will obtain new parental consent as required by COPPA</li>
                <li>We will provide clear notice of the changes</li>
                <li>Parents can refuse consent and delete their account if they do not agree</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">13. Compliance and Legal Framework</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">13.1 Regulatory Compliance</h3>
              <p className="mb-4">We are committed to complying with applicable privacy and data protection laws, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>COPPA (United States):</strong> Children&apos;s Online Privacy Protection Act</li>
                <li><strong>GDPR (European Union):</strong> General Data Protection Regulation</li>
                <li><strong>Information Technology Act, 2000 (India):</strong> Indian data protection framework</li>
                <li><strong>Google Play Families Policy:</strong> App store requirements for family apps</li>
                <li><strong>Apple App Store Guidelines:</strong> App store requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">13.2 Industry Standards</h3>
              <p className="mb-4">We follow industry best practices for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Data security and encryption</li>
                <li>Privacy by design principles</li>
                <li>Minimal data collection</li>
                <li>Transparent privacy practices</li>
                <li>Parental control and consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">13.3 Third-Party Compliance</h3>
              <p className="mb-4">
                We ensure that our service providers comply with applicable data protection laws and maintain appropriate security measures.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">14. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your information, please contact us:
              </p>
              <p className="mb-4">
                <strong>AptYou Services Pvt Ltd</strong><br />
                Kerala, India
              </p>
              <p className="mb-4"><strong>Email:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Privacy inquiries: <a href="mailto:support@aptyread.ai" className="text-apty-coral hover:underline">support@aptyread.ai</a></li>
                <li>General inquiries: <a href="mailto:contact@aptyread.ai" className="text-apty-coral hover:underline">contact@aptyread.ai</a></li>
              </ul>
              <p className="mb-4"><strong>Website:</strong> <a href="https://www.aptyread.ai" className="text-apty-coral hover:underline">www.aptyread.ai</a></p>
              <p className="mb-4"><strong>Response Time:</strong></p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We aim to respond to privacy inquiries within 30 days</li>
                <li>For urgent matters, please indicate &quot;URGENT - Privacy Request&quot; in your email subject line</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-apty-dark mb-4">15. Additional Information</h2>
              
              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">15.1 One-Time Purchase Model</h3>
              <p className="mb-4">
                AptyRead uses a <strong>one-time purchase model</strong>, not subscriptions. This means:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You purchase individual course levels separately</li>
                <li>There are no recurring charges or automatic renewals</li>
                <li>Payment information is processed through app stores, not stored by us</li>
                <li>Purchase records are retained for accounting purposes only</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">15.2 No Advertising</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>AptyRead does not display advertisements to children or parents</li>
                <li>We do not use personal information for advertising purposes</li>
                <li>We do not allow third-party advertising networks</li>
                <li>Our revenue comes solely from course purchases, not advertising</li>
              </ul>

              <h3 className="text-xl font-semibold text-apty-dark mb-3 mt-6">15.3 Educational Purpose</h3>
              <p className="mb-4">
                All data collection and use is limited to providing and improving our educational services. We do not use data for commercial purposes unrelated to education.
              </p>
            </section>

            <div className="mt-12 p-6 bg-apty-warm rounded-lg border border-apty-coral-accent">
              <p className="text-apty-dark font-semibold mb-2">
                By using AptyRead, you acknowledge that you have read, understood, and agree to this Privacy Policy.
              </p>
              <p className="text-apty-gray">
                Thank you for trusting AptyRead with your child&apos;s learning journey!
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
