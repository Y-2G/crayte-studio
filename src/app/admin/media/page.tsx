import type { Metadata } from "next";
import Link from "next/link";
import { getPaginatedMedia, getMediaStats, type MediaType } from "@/lib/data";
import { MediaGrid } from "@/components/admin";
import { Pagination } from "@/components/shared";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Media — CRAYTE STUDIO Admin",
  description: "メディアライブラリ",
};

interface AdminMediaPageProps {
  searchParams: Promise<{
    page?: string;
    type?: MediaType;
  }>;
}

const FILTER_TABS: { value: MediaType | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "image", label: "画像" },
  { value: "video", label: "動画" },
  { value: "font", label: "フォント" },
];

export default async function AdminMediaPage({
  searchParams,
}: AdminMediaPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const typeFilter = params.type;

  const stats = getMediaStats();
  const { items, total, totalPages } = getPaginatedMedia(
    page,
    20,
    typeFilter
  );

  const queryParams = typeFilter ? { type: typeFilter } : undefined;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>メディアライブラリ</h1>
        <button className={styles.uploadButton}>新規アップロード</button>
      </div>

      <div className={styles.filters}>
        {FILTER_TABS.map((tab) => {
          const isActive =
            tab.value === "all" ? !typeFilter : typeFilter === tab.value;
          const count =
            tab.value === "all" ? stats.total : stats[tab.value as MediaType];

          return (
            <Link
              key={tab.value}
              href={
                tab.value === "all"
                  ? "/admin/media"
                  : `/admin/media?type=${tab.value}`
              }
              className={`${styles.filterTab} ${isActive ? styles.active : ""}`}
            >
              {tab.label}
              <span className={styles.count}>{count}</span>
            </Link>
          );
        })}
      </div>

      <div className={styles.info}>
        {total}件中 {(page - 1) * 20 + 1}〜{Math.min(page * 20, total)}件を表示
      </div>

      <MediaGrid items={items} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admin/media"
        queryParams={queryParams}
      />
    </div>
  );
}
