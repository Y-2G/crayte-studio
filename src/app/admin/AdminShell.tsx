'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import type { UserRole } from '@/types';
import styles from './layout.module.css';

interface AdminShellProps {
  children: React.ReactNode;
  user: {
    displayName: string;
    role: UserRole;
  };
}

export function AdminShell({ children, user }: AdminShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`admin-layout ${styles.adminLayout}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Header sidebarCollapsed={sidebarCollapsed} user={user} />
      <main
        className={styles.main}
        style={{
          marginLeft: sidebarCollapsed
            ? 'var(--admin-sidebar-collapsed-width)'
            : 'var(--admin-sidebar-width)',
        }}
      >
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
