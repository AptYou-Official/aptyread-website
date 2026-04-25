import PlayStoreLink from "@/components/public/PlayStoreLink";

type Props = {
  className?: string;
};

export default function AppStoreBadge({ className = "" }: Props) {
  return (
    <PlayStoreLink
      platform="ios"
      aria-label="Download on the App Store"
      className={`inline-flex h-12 items-center rounded-lg bg-black text-white px-3 hover:opacity-90 transition-opacity ${className}`}
    >
      <span className="mr-2 text-lg leading-none" aria-hidden>
        
      </span>
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[10px] uppercase tracking-wide text-white/80">Download on the</span>
        <span className="text-sm font-semibold">App Store</span>
      </span>
    </PlayStoreLink>
  );
}
