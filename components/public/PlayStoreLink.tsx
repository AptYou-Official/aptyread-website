"use client";

import { useSyncExternalStore, type AnchorHTMLAttributes, type ReactNode } from "react";
import { track } from "@vercel/analytics/react";
import { marketingMeasurementEnabled } from "@/lib/marketing-measurement";
import { reportWebsiteStoreClick } from "@/lib/website-analytics";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  reportAppStoreConversion,
  reportPlayStoreConversion,
} from "@/lib/play-store-conversion";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick" | "children"
> & {
  href?: string;
  platform?: "android" | "ios" | "auto";
  children: ReactNode;
};

type Store = "ios" | "android";
const storeUrls = { android: PLAY_STORE_URL, ios: APP_STORE_URL };

// The device does not change during a visit. Use the fallback in static HTML
// and on the first hydration render, then expose the store as a native href.
const subscribe = () => () => {};
const unknownDevice = () => null;
function deviceStore(): Store | null {
  const { userAgent, platform, maxTouchPoints } = window.navigator;
  if (/Android/i.test(userAgent)) return "android";
  if (/iPad|iPhone|iPod/i.test(userAgent)) return "ios";
  // iPadOS can request desktop pages and identify itself as a Mac.
  if (platform === "MacIntel" && maxTouchPoints > 1) return "ios";
  return null;
}

export default function PlayStoreLink({
  href,
  platform = "android",
  children,
  className,
  ...rest
}: Props) {
  const auto = platform === "auto";
  const detectedStore = useSyncExternalStore(subscribe, auto ? deviceStore : unknownDevice, unknownDevice);
  const store = auto ? detectedStore : platform;
  const targetHref = auto && detectedStore ? storeUrls[detectedStore] : href ?? (store ? storeUrls[store] : "/download");

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!store || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (!marketingMeasurementEnabled()) return;
    try {
      track("install_click", { store, destination: targetHref, path: window.location.pathname });
    } catch {
      // Measurement is optional. A blocked tracker must never block a link.
    }
    if (store === "android") reportPlayStoreConversion();
    else reportAppStoreConversion();
    reportWebsiteStoreClick(store);
  }

  return (
    <a
      href={targetHref}
      target={auto ? undefined : "_blank"}
      rel={auto ? undefined : "noopener noreferrer"}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}
