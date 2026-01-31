"use client";

import { useState } from "react";
import Link from "next/link";
import type { Work, WorkStatus } from "@/types";
import { EditPage } from "@/components/admin/EditPage";
import { MetaBox } from "@/components/admin/MetaBox";
import {
  InputField,
  TextareaField,
  RadioField,
} from "@/components/admin/FormField";
import styles from "./WorkEditor.module.css";
import horrorStyles from "@/styles/horror.module.css";

interface WorkEditorProps {
  work: Work;
  tags: string[];
}

export function WorkEditor({
  work: initialWork,
  tags: allTags,
}: WorkEditorProps) {
  const [work, setWork] = useState(initialWork);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialWork.tags);
  const [tagInput, setTagInput] = useState("");

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving work:", work);
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
      {/* Status Panel */}
      <MetaBox title="ステータス" accent>
        <div className={styles.statusPanel}>
          <RadioField
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

          <div className={styles.saveAction}>
            <button
              type="button"
              onClick={handleSave}
              className={styles.saveButton}
            >
              更新
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

  // Horror element: Show warning for sealed works
  const isSealed = work.status === "sealed";

  return (
    <EditPage sidebar={sidebar}>
      {/* Horror element: Warning for sealed content */}
      {isSealed && (
        <div className={horrorStyles.warningBox}>
          <div className={horrorStyles.title}>封印されたプロジェクト</div>
          <div className={horrorStyles.message}>
            このプロジェクトは封印されています。閲覧記録が残ります。
            <br />
            編集や公開を行う場合は、管理者の承認が必要です。
          </div>
        </div>
      )}

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
        <InputField
          label="タイトル"
          value={work.title}
          onChange={(e) => setWork({ ...work, title: e.target.value })}
          placeholder="制作実績のタイトルを入力"
          fullWidth
        />
      </div>

      {/* Description */}
      <div className={styles.section}>
        <TextareaField
          label="説明"
          value={work.description}
          onChange={(e) => setWork({ ...work, description: e.target.value })}
          placeholder="制作実績の詳細を入力..."
          rows={10}
          fullWidth
        />
      </div>

      {/* Client Info */}
      <div className={styles.infoGrid}>
        <InputField
          label="クライアント"
          value={work.client}
          onChange={(e) => setWork({ ...work, client: e.target.value })}
          placeholder="クライアント名"
        />
        <InputField
          label="会場"
          value={work.venue}
          onChange={(e) => setWork({ ...work, venue: e.target.value })}
          placeholder="会場・場所"
        />
      </div>

      {/* Date */}
      <div className={styles.section}>
        <InputField
          label="実施日"
          type="date"
          value={work.date}
          onChange={(e) => setWork({ ...work, date: e.target.value })}
          help="実施日または公開日"
        />
      </div>
    </EditPage>
  );
}
