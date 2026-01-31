"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GradientButton } from "@/components/shared/GradientButton";
import styles from "./Header.module.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: "ホーム", href: "/" },
    { label: "会社概要", href: "/company" },
    { label: "サービス", href: "/services" },
    { label: "制作実績", href: "/works" },
    { label: "ニュース", href: "/news" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/images/logo-brand.png"
            alt="CRAYTE STUDIO"
            width={845}
            height={296}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
          aria-label="メインナビゲーション"
        >
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles.navItem}>
              <GradientButton
                href="/contact"
                variant="dark"
                size="sm"
                filled
                className={styles.navContactButton}
              >
                お問い合わせ
              </GradientButton>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="メニューを開く"
        >
          <span
            className={`${styles.menuIcon} ${
              isMenuOpen ? styles.menuIconOpen : ""
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
}
