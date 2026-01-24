"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post, PostStatus, Visibility } from "@/types";
import { EditPage } from "@/components/admin/EditPage";
import { MetaBox } from "@/components/admin/MetaBox";
import {
  TextareaField,
  SelectField,
  RadioField,
} from "@/components/admin/FormField";
import { hasHorrorMeta, getObservationNotes } from "@/lib/horror/utils";
import styles from "./PostEditor.module.css";
import horrorStyles from "@/styles/horror.module.css";

interface PostEditorProps {
  post: Post;
  categories: string[];
  tags: string[];
}

export function PostEditor({
  post: initialPost,
  categories,
  tags: allTags,
}: PostEditorProps) {
  const [post, setPost] = useState(initialPost);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialPost.tags);
  const [tagInput, setTagInput] = useState("");

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving post:", post);
  };

  const handleSaveDraft = () => {
    // TODO: Implement draft save functionality
    console.log("Saving draft:", { ...post, status: "draft" });
  };

  const addTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setPost({ ...post, tags: [...selectedTags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    setPost({ ...post, tags: newTags });
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
              {post.status === "publish" && "公開"}
              {post.status === "draft" && "下書き"}
              {post.status === "pending" && "保留中"}
            </span>
          </div>

          <div className={styles.publishInfo}>
            <span className={styles.infoLabel}>可視性:</span>
            <span className={styles.infoValue}>
              {post.visibility === "public" ? "公開" : "非公開"}
            </span>
          </div>

          {post.publishedAt && (
            <div className={styles.publishInfo}>
              <span className={styles.infoLabel}>公開日:</span>
              <span className={styles.infoValue}>
                {new Date(post.publishedAt).toLocaleString("ja-JP")}
              </span>
            </div>
          )}

          <hr className={styles.divider} />

          <RadioField
            label="ステータス"
            name="status"
            value={post.status}
            onChange={(value) =>
              setPost({ ...post, status: value as PostStatus })
            }
            options={[
              { value: "draft", label: "下書き" },
              { value: "pending", label: "保留中" },
              { value: "publish", label: "公開" },
            ]}
          />

          <RadioField
            label="可視性"
            name="visibility"
            value={post.visibility}
            onChange={(value) =>
              setPost({ ...post, visibility: value as Visibility })
            }
            options={[
              { value: "public", label: "公開" },
              { value: "private", label: "非公開" },
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
              {post.status === "publish" ? "更新" : "公開"}
            </button>
          </div>
        </div>
      </MetaBox>

      {/* Category Panel */}
      <MetaBox title="カテゴリ">
        <SelectField
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
          fullWidth
        >
          <option value="">カテゴリを選択</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectField>
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
                    setSelectedTags([...selectedTags, tag]);
                    setPost({ ...post, tags: [...selectedTags, tag] });
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
        <Link href="/admin/posts" className={styles.breadcrumbLink}>
          投稿一覧
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span>編集</span>
      </div>

      {/* Title */}
      <div className={styles.titleSection}>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="タイトルを追加"
          className={styles.titleInput}
        />
        <div className={styles.permalink}>
          パーマリンク:{" "}
          <span className={styles.permalinkValue}>/news/{post.slug}</span>
        </div>
      </div>

      {/* Content Editor */}
      <div className={styles.editorSection}>
        <TextareaField
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          placeholder="本文を入力..."
          rows={20}
          fullWidth
        />
      </div>

      {/* Excerpt */}
      <MetaBox title="抜粋">
        <TextareaField
          value={post.excerpt}
          onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
          placeholder="抜粋を入力（省略可）"
          rows={3}
          help="投稿の簡単な要約。空欄の場合は本文から自動生成されます。"
          fullWidth
        />
      </MetaBox>

      {/* Review Comments */}
      <MetaBox title="内部レビューコメント" defaultCollapsed>
        <div className={styles.reviewComments}>
          {post.reviewComments.length === 0 ? (
            <p className={styles.noComments}>
              レビューコメントはまだありません
            </p>
          ) : (
            post.reviewComments.map((comment) => {
              // Horror element: Show threatening/ominous review comments
              const isHorrorComment =
                comment.content.includes("公開してはならない") ||
                comment.content.includes("記録を改変") ||
                comment.content.includes("焼却");

              return (
                <div
                  key={comment.id}
                  className={`${styles.comment} ${isHorrorComment ? horrorStyles.horrorReviewComment : ""}`}
                >
                  <div className={styles.commentHeader}>
                    <strong
                      className={isHorrorComment ? horrorStyles.horrorText : ""}
                    >
                      {comment.author}
                    </strong>
                    <time>
                      {new Date(comment.createdAt).toLocaleString("ja-JP")}
                    </time>
                  </div>
                  <p className={styles.commentContent}>{comment.content}</p>
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
      {hasHorrorMeta(post.meta) && (
        <MetaBox title="⚠ 観察記録" defaultCollapsed>
          <div className={horrorStyles.warningBox}>
            <div className={horrorStyles.title}>異常検出</div>
            <div className={horrorStyles.message}>
              {getObservationNotes(post.meta).map((note, i) => (
                <div key={i}>{note}</div>
              ))}
            </div>
          </div>
        </MetaBox>
      )}
    </EditPage>
  );
}
