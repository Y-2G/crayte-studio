import styles from "./GradientButton.module.css";

interface GradientButtonBaseProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  filled?: boolean;
  className?: string;
}

interface GradientButtonLinkProps extends GradientButtonBaseProps {
  href: string;
  disabled?: never;
  loading?: never;
  onClick?: never;
  type?: never;
}

interface GradientButtonButtonProps extends GradientButtonBaseProps {
  href?: never;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

type GradientButtonProps = GradientButtonLinkProps | GradientButtonButtonProps;

export function GradientButton({
  children,
  variant = "dark",
  size = "md",
  filled = false,
  href,
  type = "button",
  disabled,
  loading,
  onClick,
  className,
}: GradientButtonProps) {
  const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${filled ? styles.filled : ""} ${className || ""}`;

  const inner = (
    <>
      <span className={styles.text}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classNames}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
