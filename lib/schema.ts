import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/play-store-conversion";

const SITE_URL = "https://www.aptyread.ai";
const LOGO_URL = `${SITE_URL}/images/apty_with_book.png`;

const APP_DESCRIPTION =
  "A structured, interactive English literacy app for children aged 4 to 10. Practise sounds, build words and explore meaning from Lesson 1. Lessons 1 to 9 are free; the first 4 need no account. Levels are one-time purchases with no recurring subscription.";

const storeLinks = [APP_STORE_URL, PLAY_STORE_URL] as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AptyRead",
    legalName: "APTYOU SERVICES PRIVATE LIMITED",
    description: APP_DESCRIPTION,
    url: SITE_URL,
    logo: LOGO_URL,
    email: "support@aptyread.ai",
    address: {
      "@type": "PostalAddress",
      streetAddress: "15/367, Kurumbathur, Thirunavaya",
      addressLocality: "Malappuram",
      addressRegion: "Kerala",
      postalCode: "676301",
      addressCountry: "IN",
    },
    sameAs: [
      ...storeLinks,
      "https://www.instagram.com/aptyread",
      "https://www.youtube.com/@aptyread",
    ],
  };
}

export function softwareApplicationJsonLd(pageUrl: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AptyRead",
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS, Android",
    description: APP_DESCRIPTION,
    url: pageUrl,
    image: LOGO_URL,
    isAccessibleForFree: true,
    typicalAgeRange: "4-10",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description:
        "Free to download. Lessons 1 to 9 are free; lessons 1 to 4 need no account. Continuing from Lesson 10 requires a one-time level purchase in the App Store or Google Play. No recurring subscription.",
    },
    author: {
      "@type": "Organization",
      name: "APTYOU SERVICES PRIVATE LIMITED",
      url: SITE_URL,
    },
    sameAs: storeLinks,
  };
}
