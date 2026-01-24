'use client';

import Link from 'next/link';
import { Table } from '@/components/shared/Table';
import type { Page } from '@/types';
import styles from './page.module.css';

interface PagesTableProps {
  pages: Page[];
}

export function PagesTable({ pages }: PagesTableProps) {
  const columns = [
    {
      key: 'title',
      label: 'タイトル',
      sortable: true,
      render: (page: Page) => (
        <Link href={`/admin/pages/${page.id}/edit`} className={styles.titleLink}>
          {page.title}
        </Link>
      ),
    },
    {
      key: 'template',
      label: 'テンプレート',
      sortable: true,
    },
    {
      key: 'status',
      label: 'ステータス',
      sortable: true,
      render: (page: Page) => (
        <span style={{
          color: page.status === 'publish' ? 'var(--admin-success)' : 'var(--admin-text-muted)',
          fontWeight: 500
        }}>
          {page.status === 'publish' ? '公開' : '下書き'}
        </span>
      ),
    },
    {
      key: 'updatedAt',
      label: '更新日',
      sortable: true,
      render: (page: Page) => (
        <span className={styles.date}>
          {new Date(page.updatedAt).toLocaleDateString('ja-JP')}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={pages}
      selectable
      emptyMessage="固定ページがありません"
    />
  );
}
