import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Plugins — CRAYTE STUDIO Admin",
  description: "プラグイン管理",
};

export default function AdminPluginsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>プラグイン</h1>

      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>🔌</div>
        <p className={styles.placeholderText}>
          プラグイン管理機能は実装予定です
        </p>
      </div>
    </div>
  );
}
