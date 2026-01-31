'use client';

import { useId } from 'react';
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import styles from './FormField.module.css';

interface BaseFieldProps {
  /** Field label */
  label?: string;
  /** Help text displayed below the field */
  help?: string;
  /** Error message */
  error?: string;
  /** Full width field */
  fullWidth?: boolean;
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'url' | 'date' | 'datetime-local';
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

interface CheckboxFieldProps extends Omit<BaseFieldProps, 'label'>, InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Input field with label and validation
 */
export function InputField({ label, help, error, fullWidth = true, id: propId, ...props }: InputFieldProps) {
  const generatedId = useId();
  const fieldId = propId || generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpId = help ? `${fieldId}-help` : undefined;

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label htmlFor={fieldId} className={styles.label}>{label}</label>}
      <input
        id={fieldId}
        className={`${styles.input} ${error ? styles.error : ''}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      {help && <p id={helpId} className={styles.help}>{help}</p>}
      {error && <p id={errorId} className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
}

/**
 * Textarea field with label and validation
 */
export function TextareaField({ label, help, error, fullWidth = true, rows = 5, id: propId, ...props }: TextareaFieldProps) {
  const generatedId = useId();
  const fieldId = propId || generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpId = help ? `${fieldId}-help` : undefined;

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label htmlFor={fieldId} className={styles.label}>{label}</label>}
      <textarea
        id={fieldId}
        className={`${styles.textarea} ${error ? styles.error : ''}`}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      {help && <p id={helpId} className={styles.help}>{help}</p>}
      {error && <p id={errorId} className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
}

/**
 * Select field with label and validation
 */
export function SelectField({ label, help, error, fullWidth = true, children, id: propId, ...props }: SelectFieldProps) {
  const generatedId = useId();
  const fieldId = propId || generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpId = help ? `${fieldId}-help` : undefined;

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label htmlFor={fieldId} className={styles.label}>{label}</label>}
      <select
        id={fieldId}
        className={`${styles.select} ${error ? styles.error : ''}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
        {...props}
      >
        {children}
      </select>
      {help && <p id={helpId} className={styles.help}>{help}</p>}
      {error && <p id={errorId} className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
}

/**
 * Checkbox field with label
 */
export function CheckboxField({ label, help, error, id: propId, ...props }: CheckboxFieldProps) {
  const generatedId = useId();
  const fieldId = propId || generatedId;

  return (
    <div className={styles.checkboxField}>
      <label htmlFor={fieldId} className={styles.checkboxLabel}>
        <input id={fieldId} type="checkbox" className={styles.checkbox} {...props} />
        <span>{label}</span>
      </label>
      {help && <p className={styles.help}>{help}</p>}
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
}

/**
 * Radio button group
 */
interface RadioOption {
  value: string;
  label: string;
}

interface RadioFieldProps extends BaseFieldProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export function RadioField({ label, help, error, name, options, value, onChange }: RadioFieldProps) {
  const generatedId = useId();

  return (
    <fieldset className={styles.field}>
      {label && <legend className={styles.label}>{label}</legend>}
      <div className={styles.radioGroup} role="radiogroup">
        {options.map((option) => {
          const optionId = `${generatedId}-${option.value}`;
          return (
            <label key={option.value} htmlFor={optionId} className={styles.radioLabel}>
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                className={styles.radio}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      {help && <p className={styles.help}>{help}</p>}
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
    </fieldset>
  );
}
