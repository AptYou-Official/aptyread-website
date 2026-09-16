import { PATH_LEVELS } from "@/lib/reading-path";

function PathSpark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.5l1.35 7.2L20.5 10 13.35 11.3 12 18.5l-1.35-7.2L3.5 10l7.15-1.3L12 1.5z" />
    </svg>
  );
}

type PathJourneyCueProps = {
  className?: string;
};

/** Shared curved 01–05 journey cue for consumer and school pages. */
export default function PathJourneyCue({ className = "" }: PathJourneyCueProps) {
  return (
    <div className={`relative max-w-3xl mx-auto px-1 sm:px-2 ${className}`.trim()}>
      <svg
        className="pointer-events-none absolute left-0 right-0 top-3 hidden h-14 w-full sm:block md:top-3.5 md:h-16"
        viewBox="0 0 1000 80"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M70 44 C170 10, 230 10, 300 44 S430 78, 500 40 S630 6, 700 44 S830 78, 900 36 L955 28"
          stroke="#00B8D9"
          strokeOpacity="0.14"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M70 44 C170 10, 230 10, 300 44 S430 78, 500 40 S630 6, 700 44 S830 78, 900 36 L955 28"
          stroke="#00B8D9"
          strokeOpacity="0.45"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M940 20 L958 28 L940 40"
          stroke="#00B8D9"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <PathSpark className="pointer-events-none absolute left-[18%] top-0 hidden h-2.5 w-2.5 text-apty-cyan/50 sm:block" />
      <PathSpark className="pointer-events-none absolute left-[52%] top-12 hidden h-2 w-2 text-apty-indigo/30 sm:block" />
      <PathSpark className="pointer-events-none absolute right-[14%] top-1 hidden h-2.5 w-2.5 text-apty-cyan/40 sm:block" />

      <ol className="relative z-10 flex items-start justify-between gap-1 sm:gap-2">
        {PATH_LEVELS.map((level) => (
          <li
            key={level.number}
            className="flex flex-1 flex-col items-center text-center min-w-0"
          >
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-apty-cyan text-sm font-bold text-white shadow-[0_0_0_6px_rgba(230,246,251,0.95)] md:h-12 md:w-12 md:text-base md:shadow-[0_0_0_7px_rgba(230,246,251,0.95)]">
              {String(level.number).padStart(2, "0")}
            </span>
            <span className="mt-3 text-[11px] sm:text-xs md:text-sm font-bold text-apty-dark leading-snug px-0.5">
              {level.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
