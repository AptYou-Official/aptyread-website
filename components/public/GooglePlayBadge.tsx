import Image from "next/image";
import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function GooglePlayBadge({ className = "", compact = false }: Props) {
  const badgeClass = compact ? "h-8 w-auto md:h-10" : "h-12 w-auto";
  // Official Google Play web badge proportions
  const badgeWidth = 646;
  const badgeHeight = 250;

  return (
    <PlayStoreLink className={`inline-flex hover:opacity-80 transition-opacity ${className}`} aria-label="Get it on Google Play">
      <Image
        src="/images/google-play-badge-official.png"
        alt="Get it on Google Play"
        width={badgeWidth}
        height={badgeHeight}
        className={badgeClass}
        priority={false}
      />
    </PlayStoreLink>
  );
}
