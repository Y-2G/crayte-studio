'use client';

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
export function InputField({ label, help, error, fullWidth = true, ...props }: InputFieldProps) {
  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={`${styles.input} ${error ? styles.error : ''}`} {...props} />
      {help && <p className={styles.help}>{help}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

/**
 * Textarea field with label and validation
 */
export function TextareaField({ label, help, error, fullWidth = true, rows = 5, ...props }: TextareaFieldProps) {
  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={`${styles.textarea} ${error ? styles.error : ''}`} rows={rows} {...props} />
      {help && <p className={styles.help}>{help}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

/**
 * Select field with label and validation
 */
export function SelectField({ label, help, error, fullWidth = true, children, ...props }: SelectFieldProps) {
  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={`${styles.select} ${error ? styles.error : ''}`} {...props}>
        {children}
      </select>
      {help && <p className={styles.help}>{help}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

/**
 * Checkbox field with label
 */
export function CheckboxField({ label, help, error, ...props }: CheckboxFieldProps) {
  return (
    <div className={styles.checkboxField}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" className={styles.checkbox} {...props} />
        <span>{label}</span>
      </label>
      {help && <p className={styles.help}>{help}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
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
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.radioGroup}>
        {options.map((option) => (
          <label key={option.value} className={styles.radioLabel}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className={styles.radio}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {help && <p className={styles.help}>{help}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
