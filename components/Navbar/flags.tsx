import type { Locale } from "@/i18n/config";

type FlagProps = {
  className?: string;
};

function GB({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#00247d" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#cf142b" strokeWidth="4" />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="14" />
      <path d="M30,0 V40 M0,20 H60" stroke="#cf142b" strokeWidth="8" />
    </svg>
  );
}

function FR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#002395" />
      <rect x="40" width="20" height="40" fill="#ed2939" />
    </svg>
  );
}

function ES({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#aa151b" />
      <rect y="10" width="60" height="20" fill="#f1bf00" />
    </svg>
  );
}

function DE({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="60" height="13.34" fill="#000" />
      <rect y="13.33" width="60" height="13.34" fill="#dd0000" />
      <rect y="26.66" width="60" height="13.34" fill="#ffce00" />
    </svg>
  );
}

function AE({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <rect y="0" width="60" height="13.34" fill="#00732f" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.66" width="60" height="13.34" fill="#000" />
      <rect width="15" height="40" fill="#ff0000" />
    </svg>
  );
}

export const flags: Record<Locale, (props: FlagProps) => React.JSX.Element> = {
  en: GB,
  fr: FR,
  es: ES,
  de: DE,
  ar: AE,
};

/**
 * Circular frame with the flag scaled to fully cover it edge-to-edge (no
 * letterboxing) — the flag itself is cropped to the circle, not padded.
 */
export function FlagBadge({
  locale,
  className,
  ringClassName,
}: {
  locale: Locale;
  className?: string;
  ringClassName?: string;
}) {
  const Flag = flags[locale];
  return (
    <span
      className={`block overflow-hidden rounded-full ${ringClassName ?? "ring-1 ring-black/[.12]"} ${className ?? "h-9 w-9"}`}
    >
      <Flag className="h-full w-full" />
    </span>
  );
}
