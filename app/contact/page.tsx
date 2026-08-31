import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import CTA from "@/components/public/CTA";

export const metadata: Metadata = {
  title: "Write to us | AptyRead",
  description:
    "Write to AptyRead. Support for the app, or a general note. We read every message.",
  alternates: {
    canonical: "https://www.aptyread.ai/contact",
  },
  openGraph: {
    title: "Write to us | AptyRead",
    description: "Support for the app, or a general note. We read every message.",
    url: "https://www.aptyread.ai/contact",
    siteName: "AptyRead",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-apty-warm">
      <Header />

      <main>
        <article className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-apty-coral mb-4">
              AptyRead
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-apty-dark mb-3 leading-tight">
              Write to us.
            </h1>
            <p className="text-lg md:text-xl text-apty-gray mb-4">
              We read every message.
            </p>
            <p className="text-base md:text-lg text-apty-gray mb-14">
              Many answers are already on the{" "}
              <Link
                href="/faq"
                className="text-apty-coral font-semibold hover:text-apty-dark transition-colors"
              >
                questions parents ask
              </Link>{" "}
              page.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-2">
                  Support
                </h2>
                <p className="text-apty-dark mb-3 leading-relaxed">
                  Help with the app, a lesson, or your account.
                </p>
                <a
                  href="mailto:support@aptyread.ai"
                  className="text-xl md:text-2xl font-semibold text-apty-coral hover:text-apty-dark transition-colors"
                >
                  support@aptyread.ai
                </a>
              </section>

              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-2">
                  Everything else
                </h2>
                <p className="text-apty-dark mb-3 leading-relaxed">
                  Schools, press, partnerships, or a note.
                </p>
                <a
                  href="mailto:contact@aptyread.ai"
                  className="text-xl md:text-2xl font-semibold text-apty-coral hover:text-apty-dark transition-colors"
                >
                  contact@aptyread.ai
                </a>
              </section>

              <p className="text-apty-gray leading-relaxed">
                We reply within a day or two.
              </p>

              <section>
                <h2 className="text-sm font-semibold tracking-wide text-apty-coral mb-3">
                  Follow
                </h2>
                <p className="flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href="https://www.instagram.com/aptyread"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-apty-dark font-semibold hover:text-apty-coral transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@aptyread"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-apty-dark font-semibold hover:text-apty-coral transition-colors"
                  >
                    YouTube
                  </a>
                </p>
              </section>
            </div>
          </div>
        </article>

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
