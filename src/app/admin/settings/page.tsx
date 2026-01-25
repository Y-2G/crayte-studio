import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Settings — CRAYTE STUDIO Admin",
  description: "サイト設定",
};

export default function AdminSettingsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>設定</h1>

      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>⚙️</div>
        <p className={styles.placeholderText}>サイト設定機能は実装予定です</p>
      </div>
    </div>
  );
}
