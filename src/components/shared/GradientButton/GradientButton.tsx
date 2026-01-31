import styles from "./GradientButton.module.css";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  filled?: boolean;
  href: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function GradientButton({
  children,
  variant = "dark",
  size = "md",
  filled = false,
  type = "button",
  href,
  className,
}: GradientButtonProps) {
  return (
    <a
      type={type}
      href={href}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${filled ? styles.filled : ""} ${className || ""}`}
    >
      <span className={styles.text}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </a>
  );
}
