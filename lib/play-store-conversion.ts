/** Google Ads conversion label for “Play Store button click” (from Ads → Conversions). */
export const GOOGLE_ADS_PLAY_STORE_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PLAY_SEND_TO ||
  "AW-17901074775/1vdtCPSexZUcENfy8tdC";

/**
 * App Store / iOS: create a second conversion in Google Ads (e.g. “App Store link click”)
 * and set the full `AW-.../...` value in Vercel as NEXT_PUBLIC_GOOGLE_ADS_APP_STORE_SEND_TO.
 * If unset, we still open the store but do not send this conversion.
 */
export const GOOGLE_ADS_APP_STORE_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_APP_STORE_SEND_TO || "";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=ai.aptyread.app";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/aptyread-learn-to-read/id6762043318";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Google Ads conversion, then `navigate`. Reused for Play vs App store labels.
 * If `sendTo` is empty, navigates only (for optional App Store label before env is set).
 */
function reportAdsConversionThen(sendTo: string, navigate: () => void): void {
  if (typeof window === "undefined") {
    navigate();
    return;
  }

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    navigate();
  };

  if (!sendTo) {
    run();
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      event_callback: run,
    });
    window.setTimeout(run, 2000);
  } else {
    run();
  }
}

/**
 * Fires the Play Store Ads conversion, then `navigate`.
 */
export function reportPlayStoreConversionThen(navigate: () => void): void {
  reportAdsConversionThen(GOOGLE_ADS_PLAY_STORE_SEND_TO, navigate);
}

/**
 * Fires the App Store Ads conversion, then `navigate`.
 * Requires NEXT_PUBLIC_GOOGLE_ADS_APP_STORE_SEND_TO in production to count in Ads.
 */
export function reportAppStoreConversionThen(navigate: () => void): void {
  reportAdsConversionThen(GOOGLE_ADS_APP_STORE_SEND_TO, navigate);
}
