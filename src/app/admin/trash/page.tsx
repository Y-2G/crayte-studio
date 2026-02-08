import type { Metadata } from "next";
import { getPaginatedTrash } from "@/lib/data";
import { TrashGrid } from "@/components/admin";
import { Pagination } from "@/components/shared";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ゴミ箱 — CRAYTE STUDIO Admin",
  description: "削除済みコンテンツ",
};

interface AdminTrashPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AdminTrashPage({
  searchParams,
}: AdminTrashPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { items, total, totalPages } = getPaginatedTrash(page, 20);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>ゴミ箱</h1>
      </div>

      {total > 0 && (
        <div className={styles.info}>
          {total}件中 {(page - 1) * 20 + 1}〜{Math.min(page * 20, total)}
          件を表示
        </div>
      )}

      <TrashGrid items={items} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/trash"
      />
    </div>
  );
}
