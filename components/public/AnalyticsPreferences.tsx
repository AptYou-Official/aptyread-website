"use client";

import { ANALYTICS_PREFERENCES_EVENT, GA4_MEASUREMENT_ID } from "@/lib/website-analytics";

export default function AnalyticsPreferences() {
  if (!GA4_MEASUREMENT_ID) return null;
  return <button type="button" className="apty-analytics-preferences" onClick={() => window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT))}>Analytics preferences</button>;
}
