interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function WebIcon({
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
      {/* Globe circle */}
      <circle cx="24" cy="24" r="18" />

      {/* Vertical meridians */}
      <path d="M 24 6 Q 24 24 24 42" />
      <path d="M 24 6 Q 18 24 24 42" />
      <path d="M 24 6 Q 30 24 24 42" />

      {/* Horizontal parallels */}
      <ellipse cx="24" cy="24" rx="18" ry="6" />
      <path d="M 6 24 Q 24 18 42 24" />
      <path d="M 6 24 Q 24 30 42 24" />
    </svg>
  );
}
