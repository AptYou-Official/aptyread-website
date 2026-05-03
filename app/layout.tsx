import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

/** Google Ads (gtag). Public ID; optional override via Vercel: NEXT_PUBLIC_GOOGLE_ADS_ID */
const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17901074775";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aptyread.ai'),
  title: "AptyRead - From Sounds to Reading | Structured Literacy Learning Platform",
  description: "From Sounds to Reading - AptyRead is a structured, sequential literacy learning platform. English Reading & Writing for children ages 3-10. Mastery-driven, one lesson per day. Try 4 lessons free.",
  keywords: "English reading, learn to read English, English reading app, literacy platform, phonics, children education, ESL reading, structured literacy, mastery-based learning, English reading course, reading app for kids, AptyRead, aptyread.ai",
  authors: [{ name: "APTYOU SERVICES PRIVATE LIMITED" }],
  creator: "APTYOU SERVICES PRIVATE LIMITED",
  publisher: "APTYOU SERVICES PRIVATE LIMITED",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/images/apty.png",
    apple: "/images/apty.png",
  },
  openGraph: {
    title: "AptyRead - From Sounds to Reading",
    description: "From Sounds to Reading - Mastery-driven literacy learning platform. English Reading & Writing for ages 3-10. Try 4 lessons free.",
    url: "https://www.aptyread.ai",
    siteName: "AptyRead",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.aptyread.ai/images/apty.png",
        width: 512,
        height: 512,
        alt: "AptyRead Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "AptyRead - From Sounds to Reading",
    description: "From Sounds to Reading - Mastery-driven literacy learning platform. English Reading & Writing for ages 3-10. Try 4 lessons free.",
    images: ["https://www.aptyread.ai/images/apty.png"],
  },
  alternates: {
    canonical: "https://www.aptyread.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {GOOGLE_ADS_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
              `}
            </Script>
          </>
        ) : null}
        {children}
        <Analytics />
      </body>
    </html>
  );
}

