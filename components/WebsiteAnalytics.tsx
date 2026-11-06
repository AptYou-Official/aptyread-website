"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  ANALYTICS_PREFERENCES_EVENT, GA4_MEASUREMENT_ID, analyticsPagePath,
  disableWebsiteAnalytics, getAnalyticsChoice, setAnalyticsChoice,
  subscribeAnalyticsChoice, syncWebsiteAnalytics,
} from "@/lib/website-analytics";
import "./website-analytics.css";

const serverChoice = () => null;
const subscribeToBrowser = () => () => {};
const browserReady = () => true;
const serverNotReady = () => false;

export default function WebsiteAnalytics() {
  const pathname = usePathname() || "";
  const choice = useSyncExternalStore(subscribeAnalyticsChoice, getAnalyticsChoice, serverChoice);
  const hydrated = useSyncExternalStore(subscribeToBrowser, browserReady, serverNotReady);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const publicPage = analyticsPagePath(pathname) !== null;
  const policyPage = /^\/(privacy|terms|delete-account)(\.html)?\/?$/.test(pathname);

  useEffect(() => {
    syncWebsiteAnalytics();
    // Strict Mode may clean up and re-run this effect on the same page.
    // Disable collection immediately without counting that re-run as a new visit.
    return () => disableWebsiteAnalytics(false);
  }, [pathname, choice]);

  useEffect(() => {
    const open = () => setPreferencesOpen(true);
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, open);
  }, []);

  useEffect(() => {
    if (preferencesOpen) heading.current?.focus();
  }, [preferencesOpen]);

  if (!GA4_MEASUREMENT_ID || !hydrated || (!publicPage && !policyPage)) return null;
  if (!preferencesOpen && (!publicPage || choice !== null)) return null;

  function choose(allow: boolean) {
    setAnalyticsChoice(allow ? "granted" : "denied");
    setPreferencesOpen(false);
  }

  return <section className="website-analytics-choice" aria-labelledby="website-analytics-title">
    <h2 id="website-analytics-title" ref={heading} tabIndex={-1}>Allow Google Analytics?</h2>
    <p>Help us understand website visits and app-store button taps. It uses cookies. You can change your choice in the footer.</p>
    <p className="website-analytics-note">This choice applies to Google Analytics. Existing website and advertising measurement is explained in our <a href="/privacy#the-website">privacy policy</a>.</p>
    <div className="website-analytics-actions">
      <button type="button" onClick={() => choose(true)}>Allow analytics</button>
      <button type="button" onClick={() => choose(false)}>No thanks</button>
      {preferencesOpen && choice !== null && <button type="button" className="website-analytics-close" onClick={() => setPreferencesOpen(false)}>Close</button>}
    </div>
  </section>;
}
