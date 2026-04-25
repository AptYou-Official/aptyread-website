import Image from "next/image";
import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function GooglePlayBadge({ className = "", compact = false }: Props) {
  return (
    <PlayStoreLink className={`inline-flex hover:opacity-80 transition-opacity ${className}`} aria-label="Get it on Google Play">
      <Image
        src={compact ? "/images/google-play-badge-small.png" : "/images/google-play-badge-large.png"}
        alt="Get it on Google Play"
        width={compact ? 129 : 172}
        height={compact ? 45 : 60}
        className={compact ? "h-8 w-auto md:h-10" : "h-12 w-auto"}
        priority={false}
      />
    </PlayStoreLink>
  );
}
