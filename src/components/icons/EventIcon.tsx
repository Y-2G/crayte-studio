interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function EventIcon({
  size = 48,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Calendar base */}
      <rect x="8" y="10" width="32" height="30" rx="2" />

      {/* Calendar rings */}
      <path d="M 16 10 L 16 6" />
      <path d="M 32 10 L 32 6" />

      {/* Top bar */}
      <path d="M 8 18 L 40 18" />

      {/* Spotlight/stage effect - centered diagonal lines */}
      <path d="M 24 22 L 24 36" />
      <path d="M 18 22 L 18 36" />
      <path d="M 30 22 L 30 36" />
    </svg>
  );
}
