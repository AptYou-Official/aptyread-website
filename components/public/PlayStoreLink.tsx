"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  PLAY_STORE_URL,
  reportPlayStoreConversionThen,
} from "@/lib/play-store-conversion";

type Props = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick" | "children"
> & {
  href?: string;
  children: ReactNode;
};

/**
 * Play Store outbound link with Google Ads conversion on primary click (new tab).
 * Ctrl/Cmd/middle-click unchanged so power users keep normal browser behaviour.
 */
export default function PlayStoreLink({
  href = PLAY_STORE_URL,
  children,
  className,
  ...rest
}: Props) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    reportPlayStoreConversionThen(() => {
      window.open(href, "_blank", "noopener,noreferrer");
    });
  }

  return (
    <a
      href={href}
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
