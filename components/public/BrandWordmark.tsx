type BrandWordmarkProps = {
  className?: string;
  /** Visual size; defaults match the main header. */
  size?: "sm" | "md" | "lg" | "xl";
  as?: "span" | "p";
};

const sizeClass = {
  sm: "text-sm",
  md: "text-xl md:text-2xl",
  lg: "text-lg sm:text-xl md:text-2xl",
  xl: "text-xl",
} as const;

/**
 * Ownable brand mark: Apty (indigo) + Read (cyan).
 * Use only for logo/wordmark surfaces — not body copy.
 */
export default function BrandWordmark({
  className = "",
  size = "md",
  as: Tag = "span",
}: BrandWordmarkProps) {
  return (
    <Tag
      className={`font-bold whitespace-nowrap tracking-tight ${sizeClass[size]} ${className}`.trim()}
    >
      <span className="text-apty-dark">Apty</span>
      <span className="text-apty-cyan">Read</span>
    </Tag>
  );
}

