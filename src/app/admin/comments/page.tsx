import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Comments — CRAYTE STUDIO Admin",
  description: "コメント管理",
};

export default function AdminCommentsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>コメント</h1>

      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>💬</div>
        <p className={styles.placeholderText}>コメント管理機能は実装予定です</p>
      </div>
    </div>
  );
}
