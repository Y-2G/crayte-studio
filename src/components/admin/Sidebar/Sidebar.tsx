"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

interface MenuItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { label: "ダッシュボード", href: "/admin", icon: "🏠" },
  { label: "投稿", href: "/admin/posts", icon: "📝" },
  { label: "固定ページ", href: "/admin/pages", icon: "📄" },
  { label: "メディア", href: "/admin/media", icon: "🖼️" },
  { label: "コメント", href: "/admin/comments", icon: "💬" },
  { label: "受信箱", href: "/admin/inbox", icon: "📨" },
  { label: "制作実績", href: "/admin/works", icon: "🎯" },
  { label: "スタッフ", href: "/admin/staff", icon: "👥" },
  { label: "外観", href: "/admin/appearance", icon: "🎨" },
  { label: "プラグイン", href: "/admin/plugins", icon: "🔌" },
  { label: "ツール", href: "/admin/tools", icon: "🔧" },
  { label: "設定", href: "/admin/settings", icon: "⚙️" },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.header}>
        {!collapsed && <h1 className={styles.logo}>CRAYTE CMS</h1>}
        <button
          onClick={onToggle}
          className={styles.toggleButton}
          aria-label={collapsed ? "メニューを展開" : "メニューを折りたたむ"}
        >
          {collapsed ? "☰" : "✕"}
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className={styles.menuItem}>
                <Link
                  href={item.href}
                  className={`${styles.menuLink} ${
                    isActive ? styles.active : ""
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className={styles.label}>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={styles.badge}>{item.badge}</span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
