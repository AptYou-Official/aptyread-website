import { Noto_Sans_Malayalam } from 'next/font/google';
import './malayalam.css';

const malayalam = Noto_Sans_Malayalam({ subsets: ['malayalam'], weight: ['400', '600', '700', '800'], display: 'swap', variable: '--font-malayalam' });

export default function MalayalamLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ml-app ${malayalam.variable}`}>{children}</div>;
}
