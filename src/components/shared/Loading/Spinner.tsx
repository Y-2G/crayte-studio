import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export function Spinner({ size = 'md', color = 'primary', className }: SpinnerProps) {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${styles[color]} ${className || ''}`}
      role="status"
      aria-label="読み込み中"
    >
      <span className={styles.srOnly}>読み込み中...</span>
    </div>
  );
}
