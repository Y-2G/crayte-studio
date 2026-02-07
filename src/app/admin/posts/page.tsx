import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories, getPaginatedPosts } from "@/lib/data";
import { PostsTable } from "@/components/admin/PostsTable";
import { Pagination } from "@/components/shared/Pagination";
import type { PostStatus } from "@/types";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Posts — CRAYTE STUDIO Admin",
  description: "投稿管理",
};

interface SearchParams {
  status?: PostStatus;
  category?: string;
  search?: string;
  page?: string;
}

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const [allPosts, categories, paginated] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getPaginatedPosts(currentPage, 20, {
      status: params.status,
      category: params.category,
      search: params.search,
    }),
  ]);

  // ステータス別の件数を計算
  const statusCounts = {
    all: allPosts.length,
    publish: allPosts.filter((p) => p.status === "publish").length,
    draft: allPosts.filter((p) => p.status === "draft").length,
    pending: allPosts.filter((p) => p.status === "pending").length,
  };

  // 表示範囲の計算
  const startItem = paginated.total === 0 ? 0 : (currentPage - 1) * 20 + 1;
  const endItem = Math.min(currentPage * 20, paginated.total);

  // ページネーション用のクエリパラメータ
  const queryParams: Record<string, string> = {};
  if (params.status) queryParams.status = params.status;
  if (params.category) queryParams.category = params.category;
  if (params.search) queryParams.search = params.search;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>投稿</h1>
        <Link href="/admin/posts/new" className={styles.addButton}>
          新規追加
        </Link>
      </div>

      {/* 検索とフィルター */}
      <div className={styles.filters}>
        <input
          type="search"
          placeholder="投稿を検索..."
          className={styles.searchInput}
          defaultValue={params.search || ""}
        />
        <select
          className={styles.filterSelect}
          defaultValue={params.category || ""}
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* ステータスタブ */}
      <div className={styles.tabs}>
        <Link
          href="/admin/posts"
          className={`${styles.tab} ${!params.status ? styles.active : ""}`}
        >
          すべて ({statusCounts.all})
        </Link>
        <Link
          href="/admin/posts?status=publish"
          className={`${styles.tab} ${params.status === "publish" ? styles.active : ""}`}
        >
          公開 ({statusCounts.publish})
        </Link>
        <Link
          href="/admin/posts?status=draft"
          className={`${styles.tab} ${params.status === "draft" ? styles.active : ""}`}
        >
          下書き ({statusCounts.draft})
        </Link>
        <Link
          href="/admin/posts?status=pending"
          className={`${styles.tab} ${params.status === "pending" ? styles.active : ""}`}
        >
          保留 ({statusCounts.pending})
        </Link>
      </div>

      {/* 件数表示 */}
      <div className={styles.info}>
        {paginated.total}件中 {startItem}〜{endItem}件を表示
      </div>

      {/* 投稿テーブル */}
      <PostsTable posts={paginated.items} />

      {/* ページネーション */}
      <Pagination
        currentPage={currentPage}
        totalPages={paginated.totalPages}
        basePath="/admin/posts"
        queryParams={queryParams}
      />
    </div>
  );
}
