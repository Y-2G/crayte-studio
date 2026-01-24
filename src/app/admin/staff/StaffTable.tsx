'use client';

import Link from 'next/link';
import { Table } from '@/components/shared/Table';
import type { Staff } from '@/types';
import styles from './page.module.css';
import horrorStyles from '@/styles/horror.module.css';

interface StaffTableProps {
  staff: Staff[];
}

export function StaffTable({ staff }: StaffTableProps) {
  const columns = [
    {
      key: 'name',
      label: '名前',
      sortable: true,
      render: (member: Staff) => {
        const isMissing = member.state === 'missing';
        return (
          <div>
            <Link
              href={`/admin/staff/${member.id}/edit`}
              className={`${styles.nameLink} ${isMissing ? horrorStyles.horrorText : ''}`}
            >
              {member.name}
            </Link>
            {isMissing && member.removedReason && (
              <div className={horrorStyles.observationNote} style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {member.removedReason}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'role',
      label: '役職',
      sortable: true,
    },
    {
      key: 'team',
      label: 'チーム',
      sortable: true,
    },
    {
      key: 'visibility',
      label: '表示',
      render: (member: Staff) => (
        <span style={{ color: member.visibility === 'public' ? 'var(--admin-success)' : 'var(--admin-text-muted)' }}>
          {member.visibility === 'public' ? '公開' : '非公開'}
        </span>
      ),
    },
    {
      key: 'state',
      label: '状態',
      sortable: true,
      render: (member: Staff) => {
        const stateMap = {
          active: { label: '在籍', color: 'var(--admin-success)', isHorror: false },
          suspended: { label: '休職', color: 'var(--admin-warning)', isHorror: false },
          missing: { label: '不明', color: 'var(--horror-text)', isHorror: true },
        };
        const state = stateMap[member.state];
        return (
          <span
            style={{ color: state.color, fontWeight: 500 }}
            className={state.isHorror ? horrorStyles.horrorText : ''}
          >
            {state.label}
          </span>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={staff}
      selectable
      emptyMessage="スタッフがいません"
    />
  );
}
