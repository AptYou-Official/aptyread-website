import type { Metadata } from "next";
import SiteMeasurement from "@/components/SiteMeasurement";
import WebsiteAnalytics from "@/components/WebsiteAnalytics";
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
  description: "An interactive English reading program for ages 4–10, in the AptyRead app. Begin with letters and sounds. Explore 9 free lessons. First 4 need no account.",
  keywords: "English reading, learn to read English, English reading app, literacy platform, phonics, children education, ESL reading, structured reading, interactive reading, English reading program, reading app for kids, AptyRead, aptyread.ai",
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
    description: "An interactive English reading program for ages 4–10, in the AptyRead app. Begin with letters and sounds. Explore 9 free lessons. First 4 need no account.",
    url: "https://www.aptyread.ai",
    siteName: "AptyRead",
    type: "website",
    locale: "en_US",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "AptyRead. Every Child Reads.",
    description: "An interactive English reading program for ages 4–10, in the AptyRead app. Begin with letters and sounds. Explore 9 free lessons. First 4 need no account.",
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
    <html lang="en" className={nunitoSans.variable} data-scroll-behavior="smooth">
      <body className={`${nunitoSans.className} antialiased`}>
        {children}
        <SiteMeasurement />
        <WebsiteAnalytics />
      </body>
    </html>
  );
}
