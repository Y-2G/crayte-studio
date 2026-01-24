import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Tools — obserq Admin',
  description: 'ツール',
};

export default function AdminToolsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>ツール</h1>

      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>🔧</div>
        <p className={styles.placeholderText}>
          ツール機能は実装予定です
        </p>
      </div>
    </div>
  );
}
