"use client";

import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  sidebarCollapsed?: boolean;
}

export function Header({ sidebarCollapsed = false }: HeaderProps) {
  return (
    <header
      className={styles.header}
      style={{
        left: sidebarCollapsed
          ? "var(--admin-sidebar-collapsed-width)"
          : "var(--admin-sidebar-width)",
      }}
    >
      <div className={styles.left}>
        <Link
          href="/"
          className={styles.siteLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          CRAYTE STUDIO
        </Link>
        <span className={styles.separator}>|</span>
        <Link
          href="/"
          className={styles.viewSite}
          target="_blank"
          rel="noopener noreferrer"
        >
          サイトを表示
        </Link>
      </div>

      <div className={styles.right}>
        <button className={styles.iconButton} aria-label="通知">
          <span className={styles.notificationIcon}>🔔</span>
          <span className={styles.notificationBadge}>3</span>
        </button>

        <div className={styles.userInfo}>
          <div className={styles.avatar}>👤</div>
          <span className={styles.username}>管理者</span>
        </div>
      </div>
    </header>
  );
}
