import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: "サービス", href: "/services" },
    { label: "実績", href: "/works" },
    { label: "会社概要", href: "/company" },
    { label: "お問い合わせ", href: "/contact" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.glowBg} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.logoArea}>
          <span className={styles.logoText}>CRAYTE STUDIO</span>
          <div className={styles.logoLine} aria-hidden="true" />
        </div>

        <nav className={styles.nav} aria-label="フッターナビゲーション">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>
          &copy; {currentYear} CRAYTE STUDIO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
