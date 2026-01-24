import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Appearance — obserq Admin',
  description: '外観設定',
};

export default function AdminAppearancePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>外観</h1>

      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>🎨</div>
        <p className={styles.placeholderText}>
          外観設定機能は実装予定です
        </p>
      </div>
    </div>
  );
}
