import type { Metadata } from "next";
import SiteMeasurement from "@/components/SiteMeasurement";
import { Nunito_Sans } from "next/font/google";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aptyread.ai'),
  title: "AptyRead. Every Child Reads.",
  description: "English reading program for children aged 4 to 10. Built on the Science of Reading. Five levels. One path. Start Lesson 1. No account needed.",
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
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/apty-icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    title: "AptyRead. Every Child Reads.",
    description: "English reading program for children aged 4 to 10. Built on the Science of Reading. Five levels. One path. Start Lesson 1. No account needed.",
    url: "https://www.aptyread.ai",
    siteName: "AptyRead",
    type: "website",
    locale: "en_US",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "AptyRead. Every Child Reads.",
    description: "English reading program for children aged 4 to 10. Built on the Science of Reading. Five levels. One path. Start Lesson 1. No account needed.",
    images: [socialImageUrl],
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
    <html lang="en" className={nunitoSans.variable}>
      <body className={`${nunitoSans.className} antialiased`}>
        {children}
        <SiteMeasurement />
      </body>
    </html>
  );
}
