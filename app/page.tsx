import type { Metadata } from "next";
import Homepage from "@/components/public/Homepage";
import { organizationJsonLd, softwareApplicationJsonLd } from "@/lib/schema";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";

const title = "AptyRead | Learn to read English with understanding";
const description =
  "Help your child read English and understand what they read. Interactive, sequential lessons for ages 4 to 10. Start with 9 free lessons. No ads or recurring subscription.";
const accessDescription =
  "Free to download. Lessons 1 to 9 are available without a purchase. Lessons 1 to 4 need no account; a parent account is required to continue through Lesson 9. Continuing from Lesson 10 requires a Level 1 purchase. Levels are purchased separately with a one-time payment through the App Store or Google Play, with no expiry or recurring subscription.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AptyRead",
    "English literacy",
    "learn to read English",
    "phonics",
    "sound blending",
    "reading with understanding",
    "reading app for children",
  ],
  alternates: { canonical: "https://www.aptyread.ai" },
  openGraph: {
    title,
    description,
    url: "https://www.aptyread.ai",
    siteName: "AptyRead",
    type: "website",
    locale: "en_US",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImageUrl],
  },
};

export default function Home() {
  // Keep the established organization identity and store URLs. The homepage
  // describes the current free access offer without changing other routes.
  const organization = { ...organizationJsonLd(), description };
  const application = softwareApplicationJsonLd();
  const software = {
    ...application,
    description,
    offers: { ...application.offers, description: accessDescription },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <Homepage />
    </>
  );
}
