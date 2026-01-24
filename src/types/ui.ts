/**
 * UI component type definitions for OBSERQ Studio
 *
 * This file defines types for UI components and layouts:
 * - Navigation and sidebar
 * - Tables and data grids
 * - Forms and inputs
 * - Pagination and filtering
 * - Modals and dialogs
 */

import type { ReactNode } from 'react';

// ============================================================================
// Navigation
// ============================================================================

/**
 * Navigation item (used in headers, sidebars, etc.)
 */
export interface NavItem {
  /** Display label */
  label: string;
  /** Link destination */
  href: string;
  /** Optional icon identifier (can be icon name or React component) */
  icon?: string;
  /** Child navigation items for nested menus */
  children?: NavItem[];
  /** Badge content (e.g., notification count) */
  badge?: string | number;
  /** Whether this item is disabled */
  disabled?: boolean;
}

/**
 * Sidebar item for admin dashboard
 * Extends NavItem with additional state
 */
export interface SidebarItem extends NavItem {
  /** Unique identifier for the sidebar item */
  id: string;
  /** Whether the item is currently expanded (for items with children) */
  isExpanded?: boolean;
  /** Whether this item is currently active/selected */
  isActive?: boolean;
  /** Optional tooltip text */
  tooltip?: string;
}

// ============================================================================
// Tables
// ============================================================================

/**
 * Table column definition
 * @template T - The type of data in table rows
 */
export interface TableColumn<T = Record<string, unknown>> {
  /** Key to access the data (can be nested using dot notation) */
  key: keyof T | string;
  /** Column header label */
  label: string;
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Column width (CSS value like "200px" or "20%") */
  width?: string;
  /** Custom render function for cell content */
  render?: (value: unknown, row: T, index: number) => ReactNode;
  /** Alignment for cell content */
  align?: 'left' | 'center' | 'right';
  /** Whether this column is hidden on mobile */
  hideOnMobile?: boolean;
}

/**
 * Sort configuration for tables
 */
export interface TableSort {
  /** Column key to sort by */
  key: string;
  /** Sort direction */
  direction: 'asc' | 'desc';
}

/**
 * Action button for table rows
 * @template T - The type of data in table rows
 */
export interface TableAction<T = Record<string, unknown>> {
  /** Action label/text */
  label: string;
  /** Click handler */
  onClick: (row: T, index: number) => void;
  /** Optional icon identifier */
  icon?: string;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'danger' | 'ghost';
  /** Whether this action is disabled */
  disabled?: boolean | ((row: T) => boolean);
  /** Confirmation message before executing (for destructive actions) */
  confirmMessage?: string;
}

/**
 * Bulk action for selected table rows
 * @template T - The type of data in table rows
 */
export interface BulkAction<T = Record<string, unknown>> {
  /** Action label */
  label: string;
  /** Handler for bulk action */
  onClick: (selectedRows: T[]) => void | Promise<void>;
  /** Optional icon */
  icon?: string;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'danger';
  /** Confirmation message */
  confirmMessage?: string;
}

// ============================================================================
// Forms
// ============================================================================

/**
 * Form field type
 */
export type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'url'
  | 'tel'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'datetime'
  | 'file'
  | 'hidden';

/**
 * Option for select/radio fields
 */
export interface FormOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

/**
 * Form field definition
 */
export interface FormField {
  /** Field name (used as form key) */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type: FormFieldType;
  /** Placeholder text */
  placeholder?: string;
  /** Whether this field is required */
  required?: boolean;
  /** Options for select/radio fields */
  options?: FormOption[];
  /** Validation function (returns error message or undefined) */
  validation?: (value: unknown) => string | undefined;
  /** Help text displayed below the field */
  helpText?: string;
  /** Default value */
  defaultValue?: unknown;
  /** Whether this field is disabled */
  disabled?: boolean;
  /** Whether this field is read-only */
  readOnly?: boolean;
  /** Maximum length for text inputs */
  maxLength?: number;
  /** Minimum value for number inputs */
  min?: number;
  /** Maximum value for number inputs */
  max?: number;
  /** Step value for number inputs */
  step?: number;
  /** Multiple selection for select fields */
  multiple?: boolean;
  /** Accept attribute for file inputs */
  accept?: string;
}

/**
 * Form validation result
 */
export interface FormValidationResult {
  /** Whether the form is valid */
  isValid: boolean;
  /** Field-level errors (field name -> error message) */
  errors: Record<string, string>;
  /** Form-level errors */
  formErrors?: string[];
}

// ============================================================================
// Pagination
// ============================================================================

/**
 * Pagination state
 */
export interface Pagination {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items per page */
  perPage: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Pagination change handler parameters
 */
export interface PaginationChangeParams {
  /** New page number */
  page: number;
  /** New items per page (if changed) */
  perPage?: number;
}

// ============================================================================
// Filtering
// ============================================================================

/**
 * Filter type
 */
export type FilterType = 'select' | 'multiselect' | 'text' | 'daterange' | 'boolean';

/**
 * Filter definition
 */
export interface Filter {
  /** Filter key (field name) */
  key: string;
  /** Filter label */
  label: string;
  /** Filter type */
  type: FilterType;
  /** Current value(s) */
  value: string | string[] | boolean | null;
  /** Options for select filters */
  options?: FormOption[];
  /** Placeholder for text filters */
  placeholder?: string;
}

/**
 * Active filter value
 */
export interface ActiveFilter {
  /** Filter key */
  key: string;
  /** Filter value */
  value: string | string[] | boolean;
  /** Display label for the active filter */
  label: string;
}

// ============================================================================
// Modals & Dialogs
// ============================================================================

/**
 * Modal size variant
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Modal props
 */
export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: ModalSize;
  /** Whether clicking backdrop closes the modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
  /** Modal content */
  children: ReactNode;
  /** Footer content (usually action buttons) */
  footer?: ReactNode;
}

/**
 * Confirmation dialog options
 */
export interface ConfirmDialogOptions {
  /** Dialog title */
  title: string;
  /** Dialog message */
  message: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Variant for visual styling */
  variant?: 'default' | 'danger';
  /** Callback when confirmed */
  onConfirm: () => void | Promise<void>;
  /** Callback when cancelled */
  onCancel?: () => void;
}

// ============================================================================
// Toast Notifications
// ============================================================================

/**
 * Toast notification type
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast notification
 */
export interface Toast {
  /** Unique ID */
  id: string;
  /** Toast type */
  type: ToastType;
  /** Message content */
  message: string;
  /** Optional description/details */
  description?: string;
  /** Duration in milliseconds (0 for persistent) */
  duration?: number;
  /** Whether toast can be dismissed */
  dismissible?: boolean;
}

// ============================================================================
// Breadcrumbs
// ============================================================================

/**
 * Breadcrumb item
 */
export interface Breadcrumb {
  /** Display label */
  label: string;
  /** Link destination (omit for current page) */
  href?: string;
  /** Optional icon */
  icon?: string;
}

// ============================================================================
// Tabs
// ============================================================================

/**
 * Tab item
 */
export interface Tab {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Optional icon */
  icon?: string;
  /** Optional badge */
  badge?: string | number;
  /** Whether this tab is disabled */
  disabled?: boolean;
  /** Tab content */
  content: ReactNode;
}

// ============================================================================
// Loading States
// ============================================================================

/**
 * Loading state
 */
export interface LoadingState {
  /** Whether data is currently loading */
  isLoading: boolean;
  /** Optional loading message */
  message?: string;
  /** Progress percentage (0-100) for determinate loading */
  progress?: number;
}

/**
 * Error state
 */
export interface ErrorState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** Error message */
  message?: string;
  /** Error code or type */
  code?: string;
  /** Retry handler */
  onRetry?: () => void;
}

// ============================================================================
// Search
// ============================================================================

/**
 * Search configuration
 */
export interface SearchConfig {
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in milliseconds */
  debounce?: number;
  /** Minimum query length to trigger search */
  minLength?: number;
  /** Search handler */
  onSearch: (query: string) => void;
}

/**
 * Search result item
 */
export interface SearchResult<T = unknown> {
  /** Result ID */
  id: string;
  /** Result type */
  type: string;
  /** Display title */
  title: string;
  /** Optional description */
  description?: string;
  /** Result data */
  data: T;
  /** Relevance score (higher = more relevant) */
  score?: number;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard for NavItem
 */
export function isNavItem(obj: unknown): obj is NavItem {
  if (typeof obj !== 'object' || obj === null) return false;
  const item = obj as Record<string, unknown>;
  return typeof item.label === 'string' && typeof item.href === 'string';
}

/**
 * Type guard for FormField
 */
export function isFormField(obj: unknown): obj is FormField {
  if (typeof obj !== 'object' || obj === null) return false;
  const field = obj as Record<string, unknown>;
  return (
    typeof field.name === 'string' &&
    typeof field.label === 'string' &&
    typeof field.type === 'string'
  );
}
