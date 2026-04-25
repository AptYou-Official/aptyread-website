import type { Metadata } from "next";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import AppStoreBadge from "@/components/public/AppStoreBadge";
import GooglePlayBadge from "@/components/public/GooglePlayBadge";
import PlayStoreLink from "@/components/public/PlayStoreLink";

export const metadata: Metadata = {
  title: "Contact Us | AptyRead - We're Here to Help",
  description: "Get in touch with AptyRead. Questions about our reading platform? We're here to help. Contact us via email or follow us on social media.",
  alternates: {
    canonical: "https://www.aptyread.ai/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-lg border border-apty-coral-accent shadow-sm">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-apty-dark mb-4">
              We&apos;re Here to Help
            </h1>
            <p className="text-lg md:text-xl text-apty-gray">
              Questions? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none text-apty-gray space-y-8">
            {/* Introduction */}
            <section className="mb-8 text-center">
              <p className="text-base md:text-lg leading-relaxed">
                Whether you&apos;re curious about how AptyRead works, have questions about your child&apos;s learning journey, or just want to say hello—we&apos;re here for you.
              </p>
            </section>

            {/* Contact Methods */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6 text-center">
                Get in Touch
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Support Email */}
                <div className="bg-apty-warm p-6 rounded-lg border border-apty-coral-accent">
                  <h3 className="text-xl font-semibold text-apty-dark mb-3">
                    Support
                  </h3>
                  <p className="text-apty-gray mb-4 text-sm">
                    Need help with your account, have technical questions, or need assistance?
                  </p>
                  <a
                    href="mailto:support@aptyread.ai"
                    className="text-apty-coral hover:text-apty-cyan font-semibold text-lg transition-colors"
                  >
                    support@aptyread.ai
                  </a>
                </div>

                {/* General Inquiries */}
                <div className="bg-apty-warm p-6 rounded-lg border border-apty-coral-accent">
                  <h3 className="text-xl font-semibold text-apty-dark mb-3">
                    General Inquiries
                  </h3>
                  <p className="text-apty-gray mb-4 text-sm">
                    Questions about our approach, partnerships, or anything else?
                  </p>
                  <a
                    href="mailto:contact@aptyread.ai"
                    className="text-apty-coral hover:text-apty-cyan font-semibold text-lg transition-colors"
                  >
                    contact@aptyread.ai
                  </a>
                </div>
              </div>
            </section>

            {/* Social Media */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-6 text-center">
                Follow Our Journey
              </h2>
              <p className="text-center text-apty-gray mb-6">
                See learning tips, updates, and stories from parents and children on our social media.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.instagram.com/aptyread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  <span>📷</span>
                  <span>Follow on Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/@aptyread"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  <span>▶️</span>
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </section>

            {/* Response Time */}
            <section className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-apty-dark mb-3">
                Response Time
              </h3>
              <p className="text-apty-gray mb-2">
                We aim to respond to all inquiries within <strong>24-48 hours</strong>.
              </p>
              <p className="text-apty-gray text-sm">
                For urgent matters, please include &quot;URGENT&quot; in your email subject line.
              </p>
            </section>

            {/* What to Include */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-apty-dark mb-3">
                What to Include in Your Message
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-apty-gray">
                <li>Your name and email address</li>
                <li>A clear description of your question or concern</li>
                <li>If it&apos;s about your account, include your email or phone number used for registration</li>
                <li>Any relevant details that might help us assist you better</li>
              </ul>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-apty-coral-accent text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-apty-dark mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-base md:text-lg text-apty-gray mb-6">
              Try 4 free lessons and see if AptyRead is right for your child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PlayStoreLink
                platform="auto"
                className="bg-apty-coral text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:bg-opacity-90"
              >
                Try 4 Free Lessons
              </PlayStoreLink>
              <div className="flex items-center gap-3">
                <GooglePlayBadge />
                <AppStoreBadge />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

