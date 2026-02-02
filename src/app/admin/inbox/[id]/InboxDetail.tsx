'use client';

import Link from 'next/link';
import type { InboxMessage } from '@/types';
import { EditPage } from '@/components/admin/EditPage';
import { MetaBox } from '@/components/admin/MetaBox';
import { isAnomalousTime } from '@/lib/horror/utils';
import styles from './InboxDetail.module.css';
import horrorStyles from '@/styles/horror.module.css';

interface InboxDetailProps {
  message: InboxMessage;
  prevMessageId: string | null;
  nextMessageId: string | null;
}

const categoryMap: Record<
  InboxMessage['category'],
  { label: string; color: string }
> = {
  general: { label: '一般', color: 'var(--admin-text)' },
  press: { label: '取材', color: 'var(--admin-primary)' },
  quote: { label: '見積', color: 'var(--admin-success)' },
  complaint: { label: '苦情', color: 'var(--admin-error)' },
  sign: { label: '兆候', color: 'var(--horror-text)' },
};

const severityMap: Record<
  InboxMessage['severity'],
  { label: string; color: string }
> = {
  low: { label: '低', color: 'var(--admin-text-muted)' },
  medium: { label: '中', color: 'var(--admin-warning)' },
  high: { label: '高', color: 'var(--admin-error)' },
};

const statusMap: Record<
  InboxMessage['status'],
  { label: string; color: string }
> = {
  open: { label: '新規', color: 'var(--admin-error)' },
  pending: { label: '保留', color: 'var(--admin-warning)' },
  resolved: { label: '解決', color: 'var(--admin-success)' },
  rewritten: { label: '改変', color: 'var(--horror-text)' },
};

export function InboxDetail({
  message,
  prevMessageId,
  nextMessageId,
}: InboxDetailProps) {
  const isSign = message.category === 'sign';
  const createdAtAnomalous = isAnomalousTime(message.createdAt);
  const updatedAtAnomalous = isAnomalousTime(message.updatedAt);

  const category = categoryMap[message.category];
  const severity = severityMap[message.severity];
  const status = statusMap[message.status];

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const sidebar = (
    <>
      <MetaBox title="メッセージ情報" accent>
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>ステータス</span>
            <span
              className={styles.infoValue}
              style={{ color: status.color, fontWeight: 600 }}
            >
              {status.label}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>カテゴリ</span>
            <span
              className={styles.infoValue}
              style={{ color: category.color }}
            >
              {category.label}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>重要度</span>
            <span
              className={styles.infoValue}
              style={{ color: severity.color, fontWeight: 500 }}
            >
              {severity.label}
            </span>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>受信日時</span>
            <span
              className={`${styles.infoValue} ${createdAtAnomalous ? horrorStyles.anomalousDate : ''}`}
            >
              {formatDateTime(message.createdAt)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>更新日時</span>
            <span
              className={`${styles.infoValue} ${updatedAtAnomalous ? horrorStyles.anomalousDate : ''}`}
            >
              {formatDateTime(message.updatedAt)}
            </span>
          </div>
        </div>
      </MetaBox>

      <MetaBox title="差出人">
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>名前</span>
            <span
              className={`${styles.infoValue} ${isSign ? horrorStyles.horrorText : ''}`}
            >
              {message.name}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>メール</span>
            <a
              href={`mailto:${message.email}`}
              className={styles.emailLink}
            >
              {message.email}
            </a>
          </div>
        </div>
      </MetaBox>

      <MetaBox title="アクション">
        <div className={styles.infoPanel}>
          <Link href="/admin/inbox" className={styles.backLink}>
            ← 受信箱一覧に戻る
          </Link>
        </div>
      </MetaBox>
    </>
  );

  return (
    <EditPage sidebar={sidebar}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/admin/inbox" className={styles.breadcrumbLink}>
          受信箱
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span>メッセージ詳細</span>
      </div>

      {/* Subject */}
      <h2
        className={`${styles.subject} ${isSign ? `${horrorStyles.horrorTextGlow} ${horrorStyles.glitch}` : ''}`}
      >
        {message.subject}
      </h2>

      {/* Horror warning */}
      {isSign && (
        <div className={horrorStyles.warningBox}>
          <div className={horrorStyles.title}>異常な兆候</div>
          <div className={horrorStyles.message}>
            このメッセージは通常の問い合わせとは異なる特徴を持っています。内容の取り扱いに注意してください。
          </div>
        </div>
      )}

      {/* Message body */}
      <div
        className={`${styles.messagePanel} ${isSign ? styles.horrorPanel : ''}`}
      >
        <p
          className={`${styles.messageContent} ${isSign ? styles.horrorContent : ''}`}
        >
          {message.message}
        </p>
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        {prevMessageId ? (
          <Link
            href={`/admin/inbox/${prevMessageId}`}
            className={styles.navLink}
          >
            ← 前のメッセージ
          </Link>
        ) : (
          <span className={styles.navDisabled}>← 前のメッセージ</span>
        )}
        {nextMessageId ? (
          <Link
            href={`/admin/inbox/${nextMessageId}`}
            className={styles.navLink}
          >
            次のメッセージ →
          </Link>
        ) : (
          <span className={styles.navDisabled}>次のメッセージ →</span>
        )}
      </div>
    </EditPage>
  );
}
