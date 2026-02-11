import type { Metadata } from 'next';
import { LoginForm } from './LoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ログイン | CRAYTE STUDIO Admin',
};

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>CRAYTE STUDIO</h1>
          <p className={styles.subtitle}>管理画面</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
