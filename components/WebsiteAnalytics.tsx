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
  const preferencesTrigger = useRef<HTMLElement | null>(null);
  const publicPage = analyticsPagePath(pathname) !== null;
  const policyPage = /^\/(privacy|terms|delete-account)(\.html)?\/?$/.test(pathname);

  useEffect(() => {
    syncWebsiteAnalytics();
    // Strict Mode may clean up and re-run this effect on the same page.
    // Disable collection immediately without counting that re-run as a new visit.
    return () => disableWebsiteAnalytics(false);
  }, [pathname, choice]);

  useEffect(() => {
    const open = () => {
      preferencesTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setPreferencesOpen(true);
    };
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, open);
  }, []);

  useEffect(() => {
    if (preferencesOpen) heading.current?.focus();
  }, [preferencesOpen]);

  if (!GA4_MEASUREMENT_ID || !hydrated || !preferencesOpen || (!publicPage && !policyPage)) return null;
  // Only an explicit click on Analytics preferences in the footer opens this panel.

  function closePreferences() {
    setPreferencesOpen(false);
    if (preferencesOpen && preferencesTrigger.current?.isConnected) preferencesTrigger.current.focus();
  }

  function choose(allow: boolean) {
    setAnalyticsChoice(allow ? "granted" : "denied");
    closePreferences();
  }

  return <section className="website-analytics-choice" aria-labelledby="website-analytics-title">
    <h2 id="website-analytics-title" ref={heading} tabIndex={-1}>Allow Google Analytics?</h2>
    <p>Help us understand website visits and app-store button taps. It uses cookies. You can change your choice in the footer.</p>
    <p className="website-analytics-note">This choice applies to Google Analytics. Existing website and advertising measurement is explained in our <a href="/privacy#the-website">privacy policy</a>.</p>
    <div className="website-analytics-actions">
      <button type="button" onClick={() => choose(true)}>Allow analytics</button>
      <button type="button" onClick={() => choose(false)}>No thanks</button>
      {preferencesOpen && <button type="button" className="website-analytics-close" onClick={closePreferences}>Close</button>}
    </div>
  </section>;
}
