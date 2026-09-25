import { Noto_Sans_Malayalam } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './malayalam.css';

const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'], weight: ['400', '600', '700', '800'], display: 'swap', variable: '--font-malayalam' });

export const metadata: Metadata = {
  applicationName: 'AptyMalayalam',
  manifest: '/malayalam/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'AptyMalayalam', statusBarStyle: 'default' },
  icons: {
    icon: [{ url: '/malayalam/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/malayalam/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FAFAF7',
};

export default function MalayalamLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ml-app ${malayalam.variable}`}>{children}</div>;
}
