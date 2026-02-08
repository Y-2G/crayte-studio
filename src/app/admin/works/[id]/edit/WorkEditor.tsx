"use client";

import { useState } from "react";
import Link from "next/link";
import type { Work, WorkStatus, Comment } from "@/types";
import { EditPage } from "@/components/admin/EditPage";
import { MetaBox } from "@/components/admin/MetaBox";
import {
  InputField,
  TextareaField,
  RadioField,
} from "@/components/admin/FormField";
import { hasHorrorMeta, getObservationNotes } from "@/lib/horror/utils";
import styles from "./WorkEditor.module.css";
import horrorStyles from "@/styles/horror.module.css";

interface WorkEditorProps {
  work: Work;
  tags: string[];
  comments: Comment[];
}

const statusLabels: Record<WorkStatus, string> = {
  planned: "予定",
  live: "実施中",
  closed: "完了",
  sealed: "封印",
  rewritten: "改変",
};

export function WorkEditor({
  work: initialWork,
  tags: allTags,
  comments,
}: WorkEditorProps) {
  const [work, setWork] = useState(initialWork);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialWork.tags);
  const [tagInput, setTagInput] = useState("");

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving work:", work);
  };

  const handleSaveDraft = () => {
    // TODO: Implement draft save functionality
    console.log("Saving draft:", { ...work, status: "planned" });
  };

  const addTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      const newTags = [...selectedTags, tagInput.trim()];
      setSelectedTags(newTags);
      setWork({ ...work, tags: newTags });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    setWork({ ...work, tags: newTags });
  };

  // Sidebar content
  const sidebar = (
    <>
      {/* Publish Panel */}
      <MetaBox title="公開" accent>
        <div className={styles.publishPanel}>
          <div className={styles.publishInfo}>
            <span className={styles.infoLabel}>ステータス:</span>
            <span className={styles.infoValue}>
              {statusLabels[work.status] ?? work.status}
            </span>
          </div>

          {work.date && (
            <div className={styles.publishInfo}>
              <span className={styles.infoLabel}>実施日:</span>
              <span className={styles.infoValue}>
                {new Date(work.date).toLocaleDateString("ja-JP")}
              </span>
            </div>
          )}

          <hr className={styles.divider} />

          <RadioField
            label="ステータス"
            name="status"
            value={work.status}
            onChange={(value) =>
              setWork({ ...work, status: value as WorkStatus })
            }
            options={[
              { value: "planned", label: "予定" },
              { value: "live", label: "実施中" },
              { value: "closed", label: "完了" },
              { value: "sealed", label: "封印" },
              { value: "rewritten", label: "改変" },
            ]}
          />

          <div className={styles.publishActions}>
            <button
              type="button"
              onClick={handleSaveDraft}
              className={styles.draftButton}
            >
              下書き保存
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={styles.publishButton}
            >
              {work.status === "closed" || work.status === "live"
                ? "更新"
                : "公開"}
            </button>
          </div>
        </div>
      </MetaBox>

      {/* Tags Panel */}
      <MetaBox title="タグ">
        <div className={styles.tagPanel}>
          <div className={styles.tagInput}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="タグを入力"
              className={styles.input}
            />
            <button
              type="button"
              onClick={addTag}
              className={styles.addTagButton}
            >
              追加
            </button>
          </div>
          <div className={styles.selectedTags}>
            {selectedTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className={styles.removeTag}
                  aria-label={`${tag}を削除`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className={styles.suggestedTags}>
            <p className={styles.suggestedLabel}>よく使うタグ:</p>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (!selectedTags.includes(tag)) {
                    const newTags = [...selectedTags, tag];
                    setSelectedTags(newTags);
                    setWork({ ...work, tags: newTags });
                  }
                }}
                className={styles.suggestedTag}
                disabled={selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </MetaBox>
    </>
  );

  return (
    <EditPage sidebar={sidebar}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/admin/works" className={styles.breadcrumbLink}>
          制作実績一覧
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span>編集</span>
      </div>

      {/* Title */}
      <div className={styles.titleSection}>
        <input
          type="text"
          value={work.title}
          onChange={(e) => setWork({ ...work, title: e.target.value })}
          placeholder="タイトルを追加"
          className={styles.titleInput}
        />
        <div className={styles.permalink}>
          パーマリンク:{" "}
          <span className={styles.permalinkValue}>/works/{work.slug}</span>
        </div>
      </div>

      {/* Description */}
      <MetaBox title="説明">
        <TextareaField
          value={work.description}
          onChange={(e) => setWork({ ...work, description: e.target.value })}
          placeholder="制作実績の概要を入力（省略可）"
          rows={3}
          help="制作実績の簡単な説明。一覧ページに表示されます。"
          fullWidth
        />
      </MetaBox>

      {/* Content Editor */}
      <MetaBox title="本文">
        <TextareaField
          value={work.content}
          onChange={(e) => setWork({ ...work, content: e.target.value })}
          placeholder="本文を入力..."
          rows={20}
          fullWidth
        />
      </MetaBox>

      {/* Project Details */}
      <MetaBox title="プロジェクト詳細">
        <div className={styles.detailFields}>
          <InputField
            label="クライアント"
            value={work.client}
            onChange={(e) => setWork({ ...work, client: e.target.value })}
            placeholder="クライアント名"
            fullWidth
          />
          <InputField
            label="会場"
            value={work.venue}
            onChange={(e) => setWork({ ...work, venue: e.target.value })}
            placeholder="会場・場所"
            fullWidth
          />
          <InputField
            label="実施日"
            type="date"
            value={work.date}
            onChange={(e) => setWork({ ...work, date: e.target.value })}
            help="実施日または公開日"
            fullWidth
          />
        </div>
      </MetaBox>

      {/* Comments Section */}
      <MetaBox title="コメント">
        <div className={styles.reviewComments}>
          {work.reviewComments.length === 0 && comments.length === 0 ? (
            <p className={styles.noComments}>コメントはまだありません</p>
          ) : (
            [
              ...work.reviewComments.map((c) => ({
                ...c,
                type: "review" as const,
              })),
              ...comments.map((c) => ({ ...c, type: "user" as const })),
            ]
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              )
              .map((comment) => {
                return (
                  <div
                    key={`${comment.type}-${comment.id}`}
                    className={styles.comment}
                  >
                    <div className={styles.commentHeader}>
                      <div className={styles.commentAuthorLine}>
                        <strong>{comment.author}</strong>
                        <span className={styles.commentType}>
                          {comment.type === "review"
                            ? "内部レビュー"
                            : "公開コメント"}
                        </span>
                        {comment.type === "user" && (
                          <span
                            className={`${styles.commentBadge} ${styles[`status-${comment.status}`]}`}
                          >
                            {comment.status === "approved" && "承認済み"}
                            {comment.status === "pending" && "保留中"}
                            {comment.status === "spam" && "スパム"}
                            {comment.status === "trash" && "ゴミ箱"}
                          </span>
                        )}
                      </div>
                      <time>
                        {new Date(comment.createdAt).toLocaleString("ja-JP")}
                      </time>
                    </div>
                    <p className={styles.commentContent}>{comment.content}</p>
                    {comment.type === "user" && "email" in comment && (
                      <div className={styles.commentMeta}>
                        Email: {comment.email}
                      </div>
                    )}
                  </div>
                );
              })
          )}
          <TextareaField
            placeholder="新しいコメントを追加..."
            rows={3}
            help="このコメントは管理者のみ閲覧できます"
            fullWidth
          />
        </div>
      </MetaBox>

      {/* Horror element: Observation notes */}
      {hasHorrorMeta(work.meta) && (
        <MetaBox title="⚠ 観察記録" defaultCollapsed>
          <div className={horrorStyles.warningBox}>
            <div className={horrorStyles.title}>異常検出</div>
            <div className={horrorStyles.message}>
              {getObservationNotes(work.meta).map((note, i) => (
                <div key={i}>{note}</div>
              ))}
            </div>
          </div>
        </MetaBox>
      )}
    </EditPage>
  );
}
