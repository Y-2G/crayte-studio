'use client';

import { useState, type ReactNode } from 'react';
import styles from './MetaBox.module.css';

interface MetaBoxProps {
  /** Box title */
  title: string;
  /** Box content */
  children: ReactNode;
  /** Initially collapsed state */
  defaultCollapsed?: boolean;
  /** Accent color (for publish box) */
  accent?: boolean;
}

/**
 * WordPress-style meta box (panel)
 *
 * Collapsible panel used in edit pages for organizing metadata and actions.
 */
export function MetaBox({
  title,
  children,
  defaultCollapsed = false,
  accent = false,
}: MetaBoxProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={`${styles.metaBox} ${accent ? styles.accent : ''}`}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
      >
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.toggle} aria-hidden="true">
          {isCollapsed ? '▸' : '▾'}
        </span>
      </button>
      {!isCollapsed && <div className={styles.body}>{children}</div>}
    </div>
  );
}
