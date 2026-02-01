import Link from "next/link";
import styles from "./Footer.module.css";

const serviceLinks = [
  { label: "Web制作", href: "/services#web" },
  { label: "イベント企画", href: "/services#event" },
  { label: "研修プログラム", href: "/services#training" },
];

const companyLinks = [
  { label: "会社概要", href: "/company" },
  { label: "採用情報", href: "/careers" },
  { label: "お問い合わせ", href: "/contact" },
];

const resourceLinks = [
  { label: "ブログ", href: "/articles?filter=blog" },
  { label: "制作実績", href: "/works" },
  { label: "よくある質問", href: "/faq" },
];

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        {/* Top Row */}
        <div className={styles.topRow}>
          {/* Branding Column */}
          <div className={styles.branding}>
            <span className={styles.logoText}>CRAYTE STUDIO</span>
            <p className={styles.description}>
              テクノロジーとクリエイティビティの融合で、ビジネスの可能性を最大化します
            </p>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <MailIcon />
                </span>
                <span>info@crayte-studio.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <PhoneIcon />
                </span>
                <span>03-1234-5678</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <MapPinIcon />
                </span>
                <span>東京都渋谷区○○ 1-2-3</span>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          <nav
            className={styles.navColumns}
            aria-label="フッターナビゲーション"
          >
            <div className={styles.navGroup}>
              <h3 className={styles.navGroupTitle}>サービス</h3>
              <ul className={styles.navList}>
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.navGroup}>
              <h3 className={styles.navGroupTitle}>会社情報</h3>
              <ul className={styles.navList}>
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.navGroup}>
              <h3 className={styles.navGroupTitle}>リソース</h3>
              <ul className={styles.navList}>
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Crayte Studio. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy" className={styles.legalLink}>
              プライバシーポリシー
            </Link>
            <Link href="/terms" className={styles.legalLink}>
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
