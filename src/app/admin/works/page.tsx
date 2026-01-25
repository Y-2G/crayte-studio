import type { Metadata } from "next";
import Link from "next/link";
import { getAllWorks } from "@/lib/data";
import { WorksTable } from "./WorksTable";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Works — CRAYTE STUDIO Admin",
  description: "実績管理",
};

export default async function AdminWorksPage() {
  const works = await getAllWorks();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>実績</h1>
        <Link href="/admin/works/new" className={styles.addButton}>
          新規追加
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <WorksTable works={works} />
      </div>
    </div>
  );
}
