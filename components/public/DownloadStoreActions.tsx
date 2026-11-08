"use client";

import Image from "next/image";
import { useDeviceStore } from "@/lib/device-store";
import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = { language?: "en" | "ml" };

function StoreBadges() {
  return <div className="download-action-badges" lang="en">
    <PlayStoreLink platform="android" target="_self" aria-label="Download AptyRead on Google Play">
      <Image src="/homepage/store-google.png" width={188} height={56} alt="Get it on Google Play" unoptimized />
    </PlayStoreLink>
    <PlayStoreLink platform="ios" target="_self" aria-label="Download AptyRead on the App Store">
      <Image src="/homepage/store-apple.svg" width={168} height={56} alt="Download on the App Store" unoptimized />
    </PlayStoreLink>
  </div>;
}
export default function DownloadStoreActions({ language = "en" }: Props) {
  const store = useDeviceStore();
  const malayalam = language === "ml";

  return <div className="download-actions" data-device={store ?? "unknown"}>
    {store ? <>
      <PlayStoreLink platform={store} target="_self" className="download-action-primary" lang="en">
        {store === "android" ? "Get AptyRead on Google Play" : "Get AptyRead on the App Store"}
      </PlayStoreLink>
      <details className="download-action-alternatives">
        <summary>{malayalam ? "മറ്റൊരു ഉപകരണത്തിൽ ഉപയോഗിക്കണോ?" : "Using another device?"}</summary>
        <StoreBadges />
      </details>
    </> : <>
      <p className="download-action-hint">{malayalam ? "Android, iPhone എന്നിവയിൽ ലഭ്യമാണ്" : "Available for Android and iPhone"}</p>
      <StoreBadges />
    </>}
  </div>;
}
