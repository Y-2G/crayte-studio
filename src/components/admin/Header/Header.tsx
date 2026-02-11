"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logoutAction } from "@/lib/auth/actions";
import type { UserRole } from "@/types";
import styles from "./Header.module.css";

interface HeaderProps {
  sidebarCollapsed?: boolean;
  user?: {
    displayName: string;
    role: UserRole;
  };
}

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "管理者",
  editor: "編集者",
};

export function Header({ sidebarCollapsed = false, user }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

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

        {user ? (
          <div className={styles.userMenu} ref={dropdownRef}>
            <button
              className={styles.userInfo}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className={styles.avatar}>
                {user.displayName.charAt(0)}
              </div>
              <span className={styles.username}>{user.displayName}</span>
            </button>
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <span className={styles.dropdownName}>
                    {user.displayName}
                  </span>
                  <span className={styles.dropdownRole}>
                    {ROLE_LABELS[user.role]}
                  </span>
                </div>
                <div className={styles.dropdownDivider} />
                <form action={logoutAction}>
                  <button type="submit" className={styles.logoutButton}>
                    ログアウト
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.userInfo}>
            <div className={styles.avatar}>👤</div>
            <span className={styles.username}>ゲスト</span>
          </div>
        )}
      </div>
    </header>
  );
}
