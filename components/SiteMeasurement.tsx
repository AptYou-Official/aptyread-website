'use client';

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { marketingMeasurementEnabled } from '@/lib/marketing-measurement';

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17901074775';

export default function SiteMeasurement() {
  const pathname = usePathname();
  const [measurementEnabled, setMeasurementEnabled] = useState(false);

  useEffect(() => {
    setMeasurementEnabled(marketingMeasurementEnabled());
  }, []);

  // Programme entry links use a full document navigation so previously loaded
  // marketing scripts cannot remain active inside the learning preview.
  if (!measurementEnabled || !pathname || /^\/(english|malayalam|hindi)(\/|$)/.test(pathname)) return null;

  // These pages are also opened from the app. Keep advertising tags off them.
  const isAppPolicyPage = /^\/(privacy|terms|delete-account)(\.html)?\/?$/.test(pathname);

  return <>
    {GOOGLE_ADS_ID && !isAppPolicyPage && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
      <Script id="google-ads-gtag" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ADS_ID}');
      `}</Script>
    </>}
    <Analytics />
  </>;
}
