'use client';

import Link from 'next/link';
import { Table } from '@/components/shared/Table';
import type { InboxMessage } from '@/types';
import { isAnomalousTime } from '@/lib/horror/utils';
import styles from './page.module.css';
import horrorStyles from '@/styles/horror.module.css';

interface InboxTableProps {
  messages: InboxMessage[];
}

export function InboxTable({ messages }: InboxTableProps) {
  const columns = [
    {
      key: 'name',
      label: '名前',
      sortable: true,
      render: (msg: InboxMessage) => (
        <Link href={`/admin/inbox/${msg.id}`} className={styles.nameLink}>
          {msg.name}
        </Link>
      ),
    },
    {
      key: 'subject',
      label: '件名',
      sortable: true,
      width: '30%',
    },
    {
      key: 'category',
      label: 'カテゴリ',
      sortable: true,
      render: (msg: InboxMessage) => {
        const categoryMap = {
          general: { label: '一般', color: 'var(--admin-text)' },
          press: { label: '取材', color: 'var(--admin-primary)' },
          quote: { label: '見積', color: 'var(--admin-success)' },
          complaint: { label: '苦情', color: 'var(--admin-error)' },
          sign: { label: '兆候', color: 'var(--horror-text)' },
        };
        const category = categoryMap[msg.category];
        return <span style={{ color: category.color }}>{category.label}</span>;
      },
    },
    {
      key: 'severity',
      label: '重要度',
      sortable: true,
      render: (msg: InboxMessage) => {
        const severityMap = {
          low: { label: '低', color: 'var(--admin-text-muted)' },
          medium: { label: '中', color: 'var(--admin-warning)' },
          high: { label: '高', color: 'var(--admin-error)' },
        };
        const severity = severityMap[msg.severity];
        return <span style={{ color: severity.color, fontWeight: 500 }}>{severity.label}</span>;
      },
    },
    {
      key: 'status',
      label: 'ステータス',
      sortable: true,
      render: (msg: InboxMessage) => {
        const statusMap = {
          open: { label: '新規', color: 'var(--admin-error)' },
          pending: { label: '保留', color: 'var(--admin-warning)' },
          resolved: { label: '解決', color: 'var(--admin-success)' },
          rewritten: { label: '改変', color: 'var(--horror-text)' },
        };
        const status = statusMap[msg.status];
        return <span style={{ color: status.color, fontWeight: 500 }}>{status.label}</span>;
      },
    },
    {
      key: 'createdAt',
      label: '日時',
      sortable: true,
      render: (msg: InboxMessage) => {
        const isAnomalous = isAnomalousTime(msg.createdAt);
        const date = new Date(msg.createdAt);
        const dateStr = date.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const timeStr = date.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        return (
          <div>
            <span className={styles.date}>{dateStr}</span>
            {isAnomalous && (
              <div className={horrorStyles.anomalousDate} style={{ fontSize: '0.75rem', marginTop: '0.125rem' }}>
                {timeStr}
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={messages}
      selectable
      emptyMessage="受信メッセージがありません"
    />
  );
}
