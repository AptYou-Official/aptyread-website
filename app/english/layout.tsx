import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import EnglishProvider from '@/components/english/EnglishProvider';
import './english.css';
import './hub.css';

const andika = localFont({
  src: [
    { path: './fonts/Andika-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Andika-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-andika',
  display: 'block',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'AptyRead English — My reading adventure',
  description: 'A little sound. A first word. A world of stories. Explore the AptyRead English learning preview.',
  applicationName: 'AptyRead English',
  manifest: '/english/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'AptyRead', statusBarStyle: 'default' },
  icons: { icon: '/english/icons/icon-192.png', apple: '/english/icons/apple-touch-icon.png' },
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.aptyread.ai/english' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FAFAF7' };
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div className={`en-app ${andika.variable}`} translate="no"><EnglishProvider>{children}</EnglishProvider></div>;
}
