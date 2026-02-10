import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "404 Not Found | CRAYTE STUDIO",
};

export default function LeadPage() {
  return (
    <div className={styles.page}>
      <p className={styles.text}>404 Not Found.</p>
      <p className={styles.description}>お探しのページは見つかりませんでした。</p>
      <p className={styles.help}>
        お困りですか？：
        <Link href="/contact" className={styles.link}>
          お問い合わせフォーム
        </Link>
        からお気軽にご質問ください。
      </p>
    </div>
  );
}
