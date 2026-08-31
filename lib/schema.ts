import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/play-store-conversion";

const SITE_URL = "https://www.aptyread.ai";
const LOGO_URL = `${SITE_URL}/images/apty.png`;

const APP_DESCRIPTION =
  "English reading program for children aged 4 to 10. Five levels, 238 lessons. Start Lesson 1. No account needed.";

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
        "Free to download. Lesson 1 with no account. Levels are one-time purchases in the App Store or Google Play.",
    },
    author: {
      "@type": "Organization",
      name: "APTYOU SERVICES PRIVATE LIMITED",
      url: SITE_URL,
    },
    sameAs: storeLinks,
  };
}
