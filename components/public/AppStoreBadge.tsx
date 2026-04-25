import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
  compact?: boolean;
};

export default function AppStoreBadge({ className = "", compact = false }: Props) {
  const iconClass = compact ? "text-base" : "text-lg";
  const kickerClass = compact
    ? "text-[9px] uppercase tracking-wide text-white/80"
    : "text-[10px] uppercase tracking-wide text-white/80";
  const titleClass = compact ? "text-xs font-semibold" : "text-sm font-semibold";

  return (
    <PlayStoreLink
      platform="ios"
      aria-label="Download on the App Store"
      className={`inline-flex h-12 items-center rounded-lg bg-black text-white px-3 hover:opacity-90 transition-opacity ${className}`}
    >
      <span className={`mr-2 leading-none ${iconClass}`} aria-hidden>
        
      </span>
      <span className="flex flex-col leading-tight text-left">
        <span className={kickerClass}>Download on the</span>
        <span className={titleClass}>App Store</span>
      </span>
    </PlayStoreLink>
  );
}
