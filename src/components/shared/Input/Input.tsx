import { useId } from 'react';
import styles from './Input.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  hint,
  fullWidth = false,
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.error : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  );
}
