"use client";

import Image from "next/image";
import { reportWebsiteStoreClick } from "@/lib/website-analytics";
import styles from "./uae-store-actions.module.css";

type Props = { placement?: string; className?: string };

/** Store visits are diagnostic events, never Google Ads purchase conversions. */
export default function UAEStoreActions({ placement = "offer", className = "" }: Props) {
  return <div className={`${styles.actions} ${className}`} data-placement={placement}>
    <a href="https://play.google.com/store/apps/details?id=ai.aptyread.app"
      aria-label="Get AptyRead on Google Play"
      onClick={() => reportWebsiteStoreClick("android")}>
      <Image src="/homepage/store-google.png" width={188} height={56}
        alt="Get it on Google Play" unoptimized />
    </a>
    <a href="https://apps.apple.com/ae/app/aptyread-learn-to-read/id6762043318"
      aria-label="Get AptyRead on the App Store"
      onClick={() => reportWebsiteStoreClick("ios")}>
      <Image src="/homepage/store-apple.svg" width={168} height={56}
        alt="Download on the App Store" unoptimized />
    </a>
  </div>;
}
