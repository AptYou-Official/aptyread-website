import { marketingMeasurementEnabled } from "@/lib/marketing-measurement";

const configuredId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";
export const GA4_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(configuredId) ? configuredId : "";
export const ANALYTICS_PREFERENCES_EVENT = "aptyread:analytics-preferences";
const CONSENT_KEY = "aptyread.google-analytics.v1";
const ATTRIBUTION_KEY = "aptyread.website-campaign.v1";
const ATTRIBUTION_TTL = 30 * 60 * 1000;
const CONSENT_EVENT = "aptyread:analytics-choice";

type Choice = "granted" | "denied" | null;
type Variant = "poster" | "video" | "other";
type Campaign = "kerala_ml_launch_202611" | "tracking_check" | "other";
type Attribution = { campaign: Campaign; ad_variant: Variant; capturedAt: number };

// Only these public pages may enter the website stream. In particular, auth,
// admin, learning and app-policy routes must never be sent, even after SPA navigation.
const PUBLIC_PAGES = new Set([
  "/", "/about", "/contact", "/download", "/faq", "/schools", "/in", "/gcc", "/us",
  "/reading-guide", "/reading-guide/the-aptyread-path",
  ...[
    "knows-letter-sounds-but-cant-read-words", "child-knows-alphabet-but-cant-read",
    "child-reads-words-but-struggles-with-sentences", "how-to-help-child-who-struggles-with-reading",
    "how-to-teach-letter-sounds", "how-to-teach-child-to-blend-sounds",
  ].map(slug => `/reading-guide/reading-problems/${slug}`),
]);

let memoryChoice: Choice | undefined;
let attribution: Attribution | null = null;
let taggedContext: string | null = null;
let initialized = false;
let lastPage: string | null = null;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function analyticsPagePath(pathname: string): string | null {
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  return PUBLIC_PAGES.has(path) ? path : null;
}

export function getAnalyticsChoice(): Choice {
  if (typeof window === "undefined") return null;
  if (memoryChoice !== undefined) return memoryChoice;
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    memoryChoice = stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    memoryChoice = null;
  }
  return memoryChoice;
}

export function subscribeAnalyticsChoice(listener: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    memoryChoice = undefined;
    if (getAnalyticsChoice() !== "granted") clearAttribution();
    syncWebsiteAnalytics();
    listener();
  };
  window.addEventListener(CONSENT_EVENT, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function disableWebsiteAnalytics(resetPage = true): void {
  if (typeof window === "undefined" || !GA4_MEASUREMENT_ID) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
  if (resetPage) lastPage = null;
}

export function setAnalyticsChoice(choice: Exclude<Choice, null>): void {
  memoryChoice = choice;
  try { window.localStorage.setItem(CONSENT_KEY, choice); } catch { /* This visit still respects the choice. */ }
  if (choice === "denied") {
    disableWebsiteAnalytics();
    clearAttribution();
  } else {
    syncWebsiteAnalytics();
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function clearAttribution(): void {
  attribution = null;
  taggedContext = null;
  try { window.sessionStorage.removeItem(ATTRIBUTION_KEY); } catch { /* Storage may be blocked. */ }
}

function validAttribution(value: unknown): value is Attribution {
  if (!value || typeof value !== "object") return false;
  const item = value as Attribution;
  const validCampaign = ["kerala_ml_launch_202611", "tracking_check", "other"].includes(item.campaign);
  const validVariant = ["poster", "video", "other"].includes(item.ad_variant);
  return validCampaign && validVariant && typeof item.capturedAt === "number"
    && Number.isFinite(item.capturedAt) && item.capturedAt <= Date.now()
    && Date.now() - item.capturedAt < ATTRIBUTION_TTL
    && (item.campaign !== "other" || item.ad_variant === "other");
}

function campaignAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const hasTags = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].some(key => params.has(key));
  if (hasTags) {
    const singleValues = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].every(key => params.getAll(key).length === 1);
    const variant = params.get("utm_content");
    const validVariant = variant === "poster" || variant === "video";
    let campaign: Campaign = "other";
    if (singleValues && validVariant) {
      if (params.get("utm_source") === "instagram" && params.get("utm_medium") === "paid_social"
        && params.get("utm_campaign") === "kerala_ml_launch_202611") campaign = "kerala_ml_launch_202611";
      if (params.get("utm_source") === "qa" && params.get("utm_medium") === "test"
        && params.get("utm_campaign") === "tracking_check") campaign = "tracking_check";
    }
    const adVariant: Variant = campaign === "other" ? "other" : variant as Variant;
    const context = `${campaign}:${adVariant}`;
    if (taggedContext !== context) {
      attribution = { campaign, ad_variant: adVariant, capturedAt: Date.now() };
      taggedContext = context;
    } else if (!validAttribution(attribution)) {
      // A tagged tab left open is not a fresh campaign visit on every tap.
      attribution = { campaign: "other", ad_variant: "other", capturedAt: Date.now() };
    }
  } else if (!validAttribution(attribution)) {
    attribution = null;
    if (getAnalyticsChoice() === "granted") {
      try {
        const saved: unknown = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "null");
        if (validAttribution(saved)) attribution = {
          campaign: saved.campaign, ad_variant: saved.ad_variant, capturedAt: saved.capturedAt,
        };
      } catch { /* Invalid or unavailable storage is treated as untagged traffic. */ }
    }
  }
  const result: Attribution = attribution || { campaign: "other", ad_variant: "other", capturedAt: Date.now() };
  if (getAnalyticsChoice() === "granted") {
    try { window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(result)); } catch { /* Memory-only attribution is sufficient for this page. */ }
  }
  return result;
}

function allowedPath(): string | null {
  if (!GA4_MEASUREMENT_ID || !marketingMeasurementEnabled()) return null;
  // Never send preview deployments, local tests, or another site to production reports.
  if (!["aptyread.ai", "www.aptyread.ai"].includes(window.location.hostname.toLowerCase())) return null;
  return analyticsPagePath(window.location.pathname);
}

function cleanPageLocation(path: string, details: Attribution): string {
  const url = new URL(path, "https://www.aptyread.ai");
  if (details.campaign !== "other") {
    url.searchParams.set("utm_source", details.campaign === "tracking_check" ? "qa" : "instagram");
    url.searchParams.set("utm_medium", details.campaign === "tracking_check" ? "test" : "paid_social");
    url.searchParams.set("utm_campaign", details.campaign);
    url.searchParams.set("utm_content", details.ad_variant);
  }
  return url.href;
}

function prepareTag(path: string, details: Attribution): boolean {
  // Reuse the website's existing Google tag loader. This only configures the
  // dedicated GA4 stream after permission; it adds no second script request.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      // Google's command queue uses Arguments objects.
      window.dataLayer!.push(arguments);
    };
  }
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
  try {
    if (!initialized) {
      window.gtag("config", GA4_MEASUREMENT_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: cleanPageLocation(path, details),
        page_referrer: "",
        page_title: "AptyRead",
      });
      initialized = true;
    }
    return true;
  } catch {
    disableWebsiteAnalytics();
    return false;
  }
}

/** Called on route changes and consent changes. No automatic history collection. */
export function syncWebsiteAnalytics(): void {
  const path = allowedPath();
  if (!path) { disableWebsiteAnalytics(); return; }
  const details = campaignAttribution();
  if (getAnalyticsChoice() !== "granted") { disableWebsiteAnalytics(); return; }
  if (!prepareTag(path, details)) return;
  const pageLocation = cleanPageLocation(path, details);
  if (lastPage === pageLocation) return;
  try {
    window.gtag!("event", "page_view", {
      send_to: GA4_MEASUREMENT_ID,
      page_location: pageLocation,
      page_referrer: "",
      page_title: "AptyRead",
      page_path: path,
      campaign: details.campaign,
      ad_variant: details.ad_variant,
      ...(details.campaign === "tracking_check" ? { debug_mode: true } : {}),
    });
    lastPage = pageLocation;
  } catch { /* Measurement never blocks the page. */ }
}

/** A store tap is not an installation, completed lesson, or purchase. */
export function reportWebsiteStoreClick(store: "android" | "ios"): void {
  try {
    const path = allowedPath();
    if (!path || getAnalyticsChoice() !== "granted" || !["android", "ios"].includes(store)) {
      if (!path || getAnalyticsChoice() !== "granted") disableWebsiteAnalytics();
      return;
    }
    const details = campaignAttribution();
    if (!prepareTag(path, details)) return;
    window.gtag!("event", "store_click", {
      send_to: GA4_MEASUREMENT_ID,
      store,
      ad_variant: details.ad_variant,
      campaign: details.campaign,
      page_path: path,
      page_location: cleanPageLocation(path, details),
      page_referrer: "",
      page_title: "AptyRead",
      ...(details.campaign === "tracking_check" ? { debug_mode: true } : {}),
    });
  } catch { /* Keep native store navigation working when storage or analytics is blocked. */ }
}
