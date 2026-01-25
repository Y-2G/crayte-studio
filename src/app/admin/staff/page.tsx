import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllStaff } from '@/lib/data';
import { StaffTable } from './StaffTable';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Staff — crayte studio Admin',
  description: 'スタッフ管理',
};

export default async function AdminStaffPage() {
  const staff = await getAllStaff();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>スタッフ</h1>
        <Link href="/admin/staff/new" className={styles.addButton}>
          新規追加
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <StaffTable staff={staff} />
      </div>
    </div>
  );
}
