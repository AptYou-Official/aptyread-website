"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track } from "@vercel/analytics/react";
import { marketingMeasurementEnabled } from "@/lib/marketing-measurement";
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

/**
 * Store link helper with optional smart platform routing for primary CTAs.
 * Ctrl/Cmd/middle-click unchanged so power users keep normal browser behaviour.
 */
export default function PlayStoreLink({
  href,
  platform = "android",
  children,
  className,
  ...rest
}: Props) {
  const defaultHref =
    platform === "ios"
      ? APP_STORE_URL
      : platform === "android"
        ? PLAY_STORE_URL
        : "/download";
  const targetHref = href ?? defaultHref;

  function getAutoDestination() {
    if (typeof window === "undefined") return "/download";
    const ua = window.navigator.userAgent || "";
    const isIOS = /iPad|iPhone|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    if (isIOS) return APP_STORE_URL;
    if (isAndroid) return PLAY_STORE_URL;
    return "/download";
  }

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    const trackInstallClick = (destination: string, store: "ios" | "android") => {
      if (!marketingMeasurementEnabled()) return;
      try {
        track("install_click", {
          store,
          destination,
          path: window.location.pathname,
        });
      } catch {
        // Measurement is optional. A blocked tracker must never block a link.
      }
    };

    if (platform === "auto") {
      e.preventDefault();
      const autoDestination = getAutoDestination();
      if (autoDestination === PLAY_STORE_URL) {
        trackInstallClick(autoDestination, "android");
        reportPlayStoreConversion();
        window.location.href = autoDestination;
        return;
      }
      if (autoDestination === APP_STORE_URL) {
        trackInstallClick(autoDestination, "ios");
        reportAppStoreConversion();
        window.location.href = autoDestination;
        return;
      }
      window.location.href = autoDestination;
      return;
    }

    if (platform === "android") {
      trackInstallClick(targetHref, "android");
      // Keep the native link action within the user's tap. Waiting for an
      // analytics callback before window.open can trigger popup blocking.
      reportPlayStoreConversion();
      return;
    }

    if (platform === "ios") {
      trackInstallClick(targetHref, "ios");
      reportAppStoreConversion();
      return;
    }
  }

  return (
    <a
      href={targetHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}
