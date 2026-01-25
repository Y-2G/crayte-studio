interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function VideoIcon({
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
      {/* Film reel outer circle */}
      <circle cx="24" cy="24" r="18" />

      {/* Film reel inner circles (4 holes) */}
      <circle cx="24" cy="12" r="3" />
      <circle cx="36" cy="24" r="3" />
      <circle cx="24" cy="36" r="3" />
      <circle cx="12" cy="24" r="3" />

      {/* Center circle */}
      <circle cx="24" cy="24" r="6" />

      {/* Play triangle in center */}
      <path d="M 22 21 L 22 27 L 28 24 Z" fill={color} stroke="none" />
    </svg>
  );
}
