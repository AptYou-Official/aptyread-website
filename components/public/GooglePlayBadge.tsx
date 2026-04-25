import Image from "next/image";
import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function GooglePlayBadge({ className = "", compact = false }: Props) {
  const badgeClass = compact ? "h-8 w-auto md:h-10" : "h-[52px] w-auto";
  const badgeWidth = compact ? 129 : 188;
  const badgeHeight = compact ? 45 : 64;

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
