import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Media — obserq Admin',
  description: 'メディアライブラリ',
};

export default function AdminMediaPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>メディアライブラリ</h1>
        <button className={styles.uploadButton}>
          新規アップロード
        </button>
      </div>

      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>🖼️</div>
        <p className={styles.placeholderText}>
          メディアライブラリ機能は実装予定です
        </p>
      </div>
    </div>
  );
}
