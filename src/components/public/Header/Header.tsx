'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: 'TOP', href: '/' },
    { label: '会社概要', href: '/company' },
    { label: 'サービス', href: '/services' },
    { label: '実績', href: '/works' },
    { label: 'Journal', href: '/journal' },
    { label: 'スタッフ', href: '/staff' },
    { label: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoText}>OBSERQ</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`} aria-label="メインナビゲーション">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} className={styles.navLink} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="メニューを開く"
        >
          <span className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
}
