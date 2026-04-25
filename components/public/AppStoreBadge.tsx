import Image from "next/image";
import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function AppStoreBadge({ className = "", compact = false }: Props) {
  const badgeClass = compact ? "h-9 w-auto md:h-11" : "h-[54px] w-auto";
  const badgeWidth = compact ? 135 : 180;
  const badgeHeight = compact ? 45 : 60;

  return (
    <PlayStoreLink
      platform="ios"
      aria-label="Download on the App Store"
      className={`inline-flex hover:opacity-80 transition-opacity ${className}`}
    >
      <Image
        src="/images/app-store-badge.svg"
        alt="Download on the App Store"
        width={badgeWidth}
        height={badgeHeight}
        className={badgeClass}
        priority={false}
      />
    </PlayStoreLink>
  );
}
