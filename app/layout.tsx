import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AptyRead - Learn to Read English Naturally",
  description: "AptyRead helps children ages 4-10 learn English phonics through sounds they hear every day. Our unique approach uses environmental sounds to teach letters - making learning natural and memorable.",
  keywords: "learn to read, English reading, phonics, children education, ESL, literacy, environmental sounds",
  openGraph: {
    title: "AptyRead - Learn to Read English Naturally",
    description: "AptyRead helps children ages 4-10 learn English phonics through sounds they hear every day.",
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

