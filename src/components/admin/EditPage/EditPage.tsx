'use client';

import type { ReactNode } from 'react';
import styles from './EditPage.module.css';

interface EditPageProps {
  /** Main editing area */
  children: ReactNode;
  /** Sidebar content (publishing options, metadata, etc.) */
  sidebar?: ReactNode;
  /** Page title */
  title?: string;
}

/**
 * WordPress-style edit page layout
 *
 * Two-column layout with main editing area (left) and sidebar (right).
 * Responsive: stacks vertically on mobile.
 */
export function EditPage({ children, sidebar, title }: EditPageProps) {
  return (
    <div className={styles.editPage}>
      {title && (
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{title}</h1>
        </div>
      )}
      <div className={styles.layout}>
        <div className={styles.main}>{children}</div>
        {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
      </div>
    </div>
  );
}
