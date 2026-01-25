import type { Metadata } from "next";
import Link from "next/link";
import { getAllPages } from "@/lib/data";
import { PagesTable } from "./PagesTable";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pages — CRAYTE STUDIO Admin",
  description: "固定ページ管理",
};

export default async function AdminPagesPage() {
  const pages = await getAllPages();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>固定ページ</h1>
        <Link href="/admin/pages/new" className={styles.addButton}>
          新規追加
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <PagesTable pages={pages} />
      </div>
    </div>
  );
}
