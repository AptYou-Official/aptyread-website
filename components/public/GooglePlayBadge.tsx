import Image from "next/image";
import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function GooglePlayBadge({ className = "", compact = false }: Props) {
  // Google official lockup has more internal padding than Apple's badge,
  // so render it slightly taller for visual parity.
  const badgeClass = compact ? "h-9 w-auto md:h-10" : "h-[52px] w-auto";
  const badgeWidth = 300;
  const badgeHeight = 70;

  return (
    <PlayStoreLink className={`inline-flex hover:opacity-80 transition-opacity ${className}`} aria-label="Get it on Google Play">
      <Image
        src="/images/google-play-badge-official.webp"
        alt="Get it on Google Play"
        width={badgeWidth}
        height={badgeHeight}
        className={badgeClass}
        priority={false}
      />
    </PlayStoreLink>
  );
}
