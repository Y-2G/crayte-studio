import type { Metadata } from 'next';
import { getAllInboxMessages } from '@/lib/data';
import { InboxTable } from './InboxTable';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Inbox — crayte studio Admin',
  description: 'フォーム受信箱',
};

export default async function AdminInboxPage() {
  const messages = await getAllInboxMessages();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>フォーム受信箱</h1>
        <div className={styles.stats}>
          <span className={styles.statItem}>
            新規: <strong>{messages.filter(m => m.status === 'open').length}</strong>
          </span>
          <span className={styles.statItem}>
            保留: <strong>{messages.filter(m => m.status === 'pending').length}</strong>
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <InboxTable messages={messages} />
      </div>
    </div>
  );
}
