import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import EnglishProvider from '@/components/english/EnglishProvider';
import './english.css';
import './hub.css';
import './child-hub.css';
import './lesson-journey.css';
import './child-activities.css';

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
  icons: {
    icon: [
      { url: '/english/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/english/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [{ url: '/english/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/english/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.aptyread.ai/english' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FAFAF7' };
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div className={`en-app ${andika.variable}`} translate="no"><EnglishProvider>{children}</EnglishProvider></div>;
}
