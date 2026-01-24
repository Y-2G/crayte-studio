"use client";

import { useState } from "react";
import Link from "next/link";
import { Table } from "@/components/shared/Table";
import type { Post } from "@/types";
import {
  formatDateWithAnomaly,
  hasHorrorMeta,
  getHorrorMeta,
} from "@/lib/horror/utils";
import styles from "./PostsTable.module.css";
import horrorStyles from "@/styles/horror.module.css";

interface PostsTableProps {
  posts: Post[];
}

export function PostsTable({ posts }: PostsTableProps) {
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);

  const columns = [
    {
      key: "title",
      label: "タイトル",
      sortable: true,
      render: (post: Post) => (
        <div className={styles.titleCell}>
          <Link
            href={`/admin/posts/${post.id}/edit`}
            className={styles.titleLink}
          >
            {post.title}
          </Link>
          <div className={styles.rowActions}>
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className={styles.rowAction}
            >
              編集
            </Link>
            <span className={styles.separator}>|</span>
            <Link href="#" className={styles.rowAction}>
              クイック編集
            </Link>
            <span className={styles.separator}>|</span>
            <Link href="#" className={`${styles.rowAction} ${styles.danger}`}>
              ゴミ箱へ
            </Link>
            <span className={styles.separator}>|</span>
            <Link
              href={`/news/${post.slug}`}
              className={styles.rowAction}
              target="_blank"
            >
              表示
            </Link>
          </div>
        </div>
      ),
    },
    {
      key: "author",
      label: "作成者",
      sortable: true,
    },
    {
      key: "category",
      label: "カテゴリ",
      sortable: true,
      render: (post: Post) => {
        // Horror element: Show "内部連絡" category with horror styling
        const isHorrorCategory =
          post.category === "内部連絡" || post.category === "[REDACTED]";
        return (
          <Link
            href={`/admin/posts?category=${post.category}`}
            className={`${styles.categoryLink} ${isHorrorCategory ? horrorStyles.horrorText : ""}`}
          >
            {post.category}
          </Link>
        );
      },
    },
    {
      key: "tags",
      label: "タグ",
      render: (post: Post) => (
        <div className={styles.tags}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className={styles.tagMore}>+{post.tags.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "ステータス",
      sortable: true,
      render: (post: Post) => {
        // Horror element: Add "観察中" status for horror posts
        const horrorMeta = hasHorrorMeta(post.meta)
          ? getHorrorMeta(post.meta)
          : null;
        const isHorrorPost = horrorMeta !== null;

        const statusMap = {
          publish: { label: "公開", className: styles.statusPublish },
          draft: {
            label: isHorrorPost ? "観察中" : "下書き",
            className: isHorrorPost
              ? horrorStyles.horrorText
              : styles.statusDraft,
          },
          pending: { label: "保留", className: styles.statusPending },
          rejected: { label: "却下", className: styles.statusRejected },
          leak: { label: "リーク", className: styles.statusLeak },
        };
        const status = statusMap[post.status] || statusMap.draft;
        return <span className={status.className}>{status.label}</span>;
      },
    },
    {
      key: "createdAt",
      label: "日時",
      sortable: true,
      render: (post: Post) => {
        const dateInfo = formatDateWithAnomaly(
          post.publishedAt || post.createdAt,
        );
        return (
          <span
            className={`${styles.date} ${dateInfo.isAnomalous ? horrorStyles.anomalousDate : ""}`}
          >
            {dateInfo.formatted}
          </span>
        );
      },
    },
  ];

  const handleBulkAction = (action: string) => {
    if (selectedPosts.length === 0) {
      alert("項目を選択してください");
      return;
    }
    console.log(`Bulk action: ${action} for ${selectedPosts.length} posts`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bulkActions}>
        <select
          className={styles.bulkSelect}
          onChange={(e) => {
            if (e.target.value) {
              handleBulkAction(e.target.value);
              e.target.value = "";
            }
          }}
        >
          <option value="">一括操作</option>
          <option value="trash">ゴミ箱へ移動</option>
          <option value="publish">公開する</option>
          <option value="draft">下書きにする</option>
        </select>
        <button
          className={styles.applyButton}
          onClick={() => {
            const select = document.querySelector<HTMLSelectElement>(
              `.${styles.bulkSelect}`,
            );
            if (select?.value) {
              handleBulkAction(select.value);
              select.value = "";
            }
          }}
        >
          適用
        </button>
        {selectedPosts.length > 0 && (
          <span className={styles.selectedCount}>
            {selectedPosts.length}件選択中
          </span>
        )}
      </div>

      <Table
        columns={columns}
        data={posts}
        selectable
        onSelectionChange={setSelectedPosts}
        emptyMessage="投稿がありません"
      />
    </div>
  );
}
