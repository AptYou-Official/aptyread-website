'use client';

import Script from 'next/script';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { marketingMeasurementEnabled } from '@/lib/marketing-measurement';

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17901074775';
const EXCLUDED_ROUTES = /^\/(admin|english|malayalam|hindi|try)(\/|$)/;
const Analytics = dynamic(() => import('@vercel/analytics/react').then(module => module.Analytics), { ssr: false });
// Measurement depends on the document's hostname, which is stable for its lifetime.
const subscribeToHostname = () => () => {};
const serverMeasurementEnabled = () => false;

export default function SiteMeasurement() {
  const pathname = usePathname();
  const measurementEnabled = useSyncExternalStore(subscribeToHostname, marketingMeasurementEnabled, serverMeasurementEnabled);

  // Keep private admin URLs, learning routes and interactive previews out of measurement.
  // Analytics is loaded only when the allowed-route branch below renders it.
  if (!measurementEnabled || !pathname || EXCLUDED_ROUTES.test(pathname)) return null;

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
    <Analytics beforeSend={event => {
      // The SDK can remain loaded after client navigation away from a public page.
      // Reject private/learning URLs at the final send boundary too.
      try {
        return EXCLUDED_ROUTES.test(new URL(event.url).pathname) ? null : event;
      } catch {
        return null;
      }
    }} />
  </>;
}
