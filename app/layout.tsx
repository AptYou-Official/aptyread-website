import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aptyread.ai'),
  title: "AptyRead - Structured Literacy Learning Platform | English Reading & Writing",
  description: "AptyRead is a structured, sequential literacy learning platform. English Reading & Writing for children ages 3-10. Mastery-driven, one lesson per day. Try 4 lessons free.",
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
    title: "AptyRead - Structured Literacy Learning Platform",
    description: "Mastery-driven literacy learning platform. English Reading & Writing for ages 3-10. Try 4 lessons free.",
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
    title: "AptyRead - Structured Literacy Learning Platform",
    description: "Mastery-driven literacy learning platform. English Reading & Writing for ages 3-10. Try 4 lessons free.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

