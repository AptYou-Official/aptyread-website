"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  reportPlayStoreConversionThen,
} from "@/lib/play-store-conversion";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick" | "children"
> & {
  href?: string;
  platform?: "android" | "ios";
  children: ReactNode;
};

/**
 * Play Store outbound link with Google Ads conversion on primary click (new tab).
 * Ctrl/Cmd/middle-click unchanged so power users keep normal browser behaviour.
 */
export default function PlayStoreLink({
  href,
  platform = "android",
  children,
  className,
  ...rest
}: Props) {
  const targetHref = href ?? (platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (platform === "android") {
      reportPlayStoreConversionThen(() => {
        window.open(targetHref, "_blank", "noopener,noreferrer");
      });
      return;
    }
    window.open(targetHref, "_blank", "noopener,noreferrer");
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
