import { marketingMeasurementEnabled } from "@/lib/marketing-measurement";

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
 * Records a store-link click without owning or delaying navigation.
 * A missing or blocked tracker leaves the native link action untouched.
 */
function reportAdsConversion(sendTo: string): void {
  if (!sendTo || !marketingMeasurementEnabled()) return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: sendTo });
    }
  } catch {
    // Browser privacy tools may block measurement. Downloading still works.
  }
}

/**
 * Records the Play Store link-click conversion when measurement is available.
 */
export function reportPlayStoreConversion(): void {
  reportAdsConversion(GOOGLE_ADS_PLAY_STORE_SEND_TO);
}

/**
 * Records the App Store link-click conversion when measurement is available.
 * Requires NEXT_PUBLIC_GOOGLE_ADS_APP_STORE_SEND_TO in production to count in Ads.
 */
export function reportAppStoreConversion(): void {
  reportAdsConversion(GOOGLE_ADS_APP_STORE_SEND_TO);
}
