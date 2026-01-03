import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AptyRead - Structured Literacy Learning Platform | English Reading & Writing",
  description: "AptyRead is a structured, sequential literacy learning platform. Currently offering English Reading & Writing course for children ages 3-10. Mastery-driven, one lesson per day. Try 4 lessons free.",
  keywords: "English reading, learn to read English, English reading app, literacy platform, phonics, children education, ESL reading, structured literacy, mastery-based learning, English reading course, reading app for kids",
  openGraph: {
    title: "AptyRead - Structured Literacy Learning Platform",
    description: "Mastery-driven literacy learning platform. Currently offering English Reading & Writing course. Try 4 lessons free.",
    url: "https://www.aptyread.ai",
    siteName: "AptyRead",
    type: "website",
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

