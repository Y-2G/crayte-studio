import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
}: CardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]} ${className || ''}`}
    >
      {children}
    </div>
  );
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardSectionProps) {
  return <div className={`${styles.header} ${className || ''}`}>{children}</div>;
}

export function CardBody({ children, className }: CardSectionProps) {
  return <div className={`${styles.body} ${className || ''}`}>{children}</div>;
}

export function CardFooter({ children, className }: CardSectionProps) {
  return <div className={`${styles.footer} ${className || ''}`}>{children}</div>;
}
