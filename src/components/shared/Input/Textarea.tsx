import { useId } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export function Textarea({
  label,
  error,
  hint,
  fullWidth = false,
  className,
  id,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id || `textarea-${generatedId}`;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`${styles.textarea} ${error ? styles.error : ''}`}
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
