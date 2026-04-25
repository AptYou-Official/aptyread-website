import Image from "next/image";
import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function GooglePlayBadge({ className = "", compact = false }: Props) {
  // Use official black "Get it on Google Play" badge (not lockup logo)
  // and keep the same display-height rhythm as App Store badge.
  const badgeClass = compact ? "h-9 w-auto md:h-11" : "h-[52px] w-auto";
  const badgeWidth = 564;
  const badgeHeight = 168;

  return (
    <PlayStoreLink className={`inline-flex hover:opacity-80 transition-opacity ${className}`} aria-label="Get it on Google Play">
      <Image
        src={compact ? "/images/google-play-badge-small.png" : "/images/google-play-badge-large.png"}
        alt="Get it on Google Play"
        width={badgeWidth}
        height={badgeHeight}
        className={badgeClass}
        priority={false}
      />
    </PlayStoreLink>
  );
}
