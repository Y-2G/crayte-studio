'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import '@/styles/admin.css';
import styles from './layout.module.css';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`admin-layout ${styles.adminLayout}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      <main
        className={styles.main}
        style={{
          marginLeft: sidebarCollapsed ? 'var(--admin-sidebar-collapsed-width)' : 'var(--admin-sidebar-width)'
        }}
      >
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
