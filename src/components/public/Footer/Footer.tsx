import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>株式会社CRAYTE STUDIO</h3>
            <address className={styles.address}>
              〒150-0002
              <br />
              東京都渋谷区渋谷2-21-1
              <br />
              渋谷ヒカリエ 15F
            </address>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>サービス</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/services">サービス一覧</Link>
              </li>
              <li>
                <Link href="/works">実績紹介</Link>
              </li>
              <li>
                <Link href="/contact">お問い合わせ</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>会社情報</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/company">会社概要</Link>
              </li>
              <li>
                <Link href="/staff">スタッフ紹介</Link>
              </li>
              <li>
                <Link href="/news">ニュース</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} CRAYTE STUDIO Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
