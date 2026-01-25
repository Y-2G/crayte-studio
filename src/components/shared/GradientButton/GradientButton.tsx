import styles from "./GradientButton.module.css";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export function GradientButton({
  children,
  variant = "dark",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  className,
}: GradientButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ""}`}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      <span className={styles.text}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </button>
  );
}
