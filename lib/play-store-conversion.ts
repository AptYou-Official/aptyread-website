/** Google Ads conversion label for “Play Store button click” (from Ads → Conversions). */
export const GOOGLE_ADS_PLAY_STORE_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PLAY_SEND_TO ||
  "AW-17901074775/1vdtCPSexZUcENfy8tdC";

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
 * Fires the Ads conversion event, then runs `navigate` (e.g. open Play Store).
 * Falls back if gtag is missing or the callback never runs (common Google pattern).
 */
export function reportPlayStoreConversionThen(navigate: () => void): void {
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

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_PLAY_STORE_SEND_TO,
      event_callback: run,
    });
    window.setTimeout(run, 2000);
  } else {
    run();
  }
}
