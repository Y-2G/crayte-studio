"use client";

import { useState } from "react";
import Link from "next/link";
import type { TrashItem } from "@/types";
import { EditPage } from "@/components/admin/EditPage";
import { MetaBox } from "@/components/admin/MetaBox";
import { TextareaField } from "@/components/admin/FormField";
import styles from "./TrashEditor.module.css";

const STATUS_LABELS: Record<string, string> = {
  draft: "下書き",
  pending: "保留中",
  publish: "公開",
  rejected: "却下",
  leak: "リーク",
};

interface TrashEditorProps {
  item: TrashItem;
}

export function TrashEditor({ item: initialItem }: TrashEditorProps) {
  const [item, setItem] = useState(initialItem);

  const handleRestore = () => {
    // TODO: Implement restore functionality
    console.log("Restoring item:", item);
  };

  const handleDelete = () => {
    // TODO: Implement permanent delete functionality
    console.log("Permanently deleting item:", item);
  };

  // Sidebar content
  const sidebar = (
    <>
      {/* Trash Info Panel */}
      <MetaBox title="ゴミ箱情報" accent>
        <div className={styles.trashPanel}>
          <div className={styles.trashInfo}>
            <span className={styles.infoLabel}>元のステータス:</span>
            <span className={styles.infoValue}>
              {STATUS_LABELS[item.originalStatus] || item.originalStatus}
            </span>
          </div>

          {item.deletedAt && (
            <div className={styles.trashInfo}>
              <span className={styles.infoLabel}>削除日:</span>
              <span className={styles.infoValue}>
                {new Date(item.deletedAt).toLocaleString("ja-JP")}
              </span>
            </div>
          )}

          {item.createdAt && (
            <div className={styles.trashInfo}>
              <span className={styles.infoLabel}>作成日:</span>
              <span className={styles.infoValue}>
                {new Date(item.createdAt).toLocaleString("ja-JP")}
              </span>
            </div>
          )}

          {item.author && (
            <div className={styles.trashInfo}>
              <span className={styles.infoLabel}>作成者:</span>
              <span className={styles.infoValue}>{item.author}</span>
            </div>
          )}

          <hr className={styles.divider} />

          <div className={styles.trashActions}>
            <button
              type="button"
              onClick={handleRestore}
              className={styles.restoreButton}
            >
              復元
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              完全に削除
            </button>
          </div>
        </div>
      </MetaBox>

      {/* Meta Panel */}
      {Object.keys(item.meta).length > 0 && (
        <MetaBox title="メタデータ">
          <div className={styles.metaPanel}>
            {Object.entries(item.meta).map(([key, value]) => (
              <div key={key} className={styles.metaItem}>
                <span className={styles.metaKey}>{key}</span>
                <span className={styles.metaValue}>
                  {typeof value === "string" ? value : JSON.stringify(value)}
                </span>
              </div>
            ))}
          </div>
        </MetaBox>
      )}
    </>
  );

  return (
    <EditPage sidebar={sidebar}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/admin/trash" className={styles.breadcrumbLink}>
          ゴミ箱
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span>編集</span>
      </div>

      {/* Title */}
      <div className={styles.titleSection}>
        <input
          type="text"
          value={item.title}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
          placeholder="タイトルを追加"
          className={styles.titleInput}
        />
        <div className={styles.permalink}>
          ID: <span className={styles.permalinkValue}>{item.id}</span>
        </div>
      </div>

      {/* Excerpt */}
      <MetaBox title="抜粋">
        <TextareaField
          value={item.excerpt}
          onChange={(e) => setItem({ ...item, excerpt: e.target.value })}
          placeholder="抜粋を入力（省略可）"
          rows={3}
          help="投稿の簡単な要約。"
          fullWidth
        />
      </MetaBox>

      {/* Content Editor */}
      <MetaBox title="本文">
        <TextareaField
          value={item.content}
          onChange={(e) => setItem({ ...item, content: e.target.value })}
          placeholder="本文を入力..."
          rows={20}
          fullWidth
        />
      </MetaBox>
    </EditPage>
  );
}
