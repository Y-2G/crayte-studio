'use client';

import Link from 'next/link';
import { Table } from '@/components/shared/Table';
import type { Work } from '@/types';
import styles from './page.module.css';
import horrorStyles from '@/styles/horror.module.css';

interface WorksTableProps {
  works: Work[];
}

export function WorksTable({ works }: WorksTableProps) {
  const columns = [
    {
      key: 'title',
      label: 'タイトル',
      sortable: true,
      render: (work: Work) => {
        const isSealed = work.status === 'sealed';
        return (
          <Link
            href={`/admin/works/${work.id}/edit`}
            className={`${styles.titleLink} ${isSealed ? horrorStyles.horrorText : ''}`}
          >
            {work.title}
          </Link>
        );
      },
    },
    {
      key: 'client',
      label: 'クライアント',
      sortable: true,
      render: (work: Work) => {
        // Horror element: Redacted client name for sealed works
        return <span>{work.client}</span>;
      },
    },
    {
      key: 'venue',
      label: '会場',
      sortable: true,
      render: (work: Work) => {
        // Horror element: Redacted venue for sealed works
        return <span>{work.venue}</span>;
      },
    },
    {
      key: 'date',
      label: '日付',
      sortable: true,
    },
    {
      key: 'status',
      label: 'ステータス',
      sortable: true,
      render: (work: Work) => {
        const statusMap = {
          planned: { label: '予定', color: 'var(--admin-text-muted)' },
          live: { label: '実施中', color: 'var(--admin-success)' },
          closed: { label: '完了', color: 'var(--admin-primary)' },
          sealed: { label: '封印', color: 'var(--horror-text)' },
          rewritten: { label: '改変', color: 'var(--horror-text)' },
        };
        const status = statusMap[work.status];
        const isHorror = work.status === 'sealed' || work.status === 'rewritten';
        return (
          <span
            style={{ color: status.color, fontWeight: 500 }}
            className={isHorror ? horrorStyles.horrorText : ''}
          >
            {status.label}
          </span>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={works}
      selectable
      emptyMessage="実績がありません"
    />
  );
}
