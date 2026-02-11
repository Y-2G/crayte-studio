"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/shared/Button";
import styles from "./ToolsClient.module.css";

interface CrashModalData {
  id: number;
  x: number;
  y: number;
}

const MOCK_DELETION_LOGS = [
  { timestamp: "2025-08-20 11:00:00", message: "削除対象: CDNA4001" },
  { timestamp: "2025-08-20 11:00:01", message: "関連メタデータの検索開始" },
  { timestamp: "2025-08-20 11:00:03", message: "バックアップ参照の確認" },
  { timestamp: "2025-08-20 11:00:05", message: "依存関係の解析中" },
  { timestamp: "2025-08-20 11:00:07", message: "外部参照の切断処理" },
  { timestamp: "2025-08-20 11:00:09", message: "ファイルシステム同期開始" },
  { timestamp: "2025-08-20 11:00:11", message: "インデックス再構築" },
  { timestamp: "2025-08-20 11:00:13", message: "削除プロトコル『焼却』実行開始" },
];

function formatTimestamp(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export function ToolsClient() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeletionOpen, setIsDeletionOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "learning" | "crash" | "done">(
    "idle"
  );
  const [learningPercent, setLearningPercent] = useState(0);
  const [crashModals, setCrashModals] = useState<CrashModalData[]>([]);
  const logAreaRef = useRef<HTMLDivElement>(null);
  const timestampRef = useRef<string>("");

  // Auto-scroll log area
  useEffect(() => {
    if (phase === "learning" && logAreaRef.current) {
      logAreaRef.current.scrollTop = logAreaRef.current.scrollHeight;
    }
  }, [learningPercent, phase]);

  // Learning phase
  useEffect(() => {
    if (phase !== "learning") return;

    timestampRef.current = formatTimestamp(new Date());

    const interval = setInterval(() => {
      setLearningPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("crash"), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [phase]);

  // Crash phase
  useEffect(() => {
    if (phase !== "crash") return;

    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > 20) {
        clearInterval(interval);
        localStorage.setItem("phase", "end");
        setCrashModals([]);
        setPhase("done");
        setTimeout(() => {
          window.location.reload();
        }, 100);
        return;
      }

      const x = Math.random() * (window.innerWidth - 360);
      const y = Math.random() * (window.innerHeight - 200);
      setCrashModals((prev) => [...prev, { id: count, x, y }]);
    }, 400);

    return () => clearInterval(interval);
  }, [phase]);

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsConfirmOpen(false);
    setIsDeletionOpen(true);
    setPhase("learning");
  };

  const dynamicLogMessage =
    phase !== "idle"
      ? learningPercent < 100
        ? `削除処理中:${learningPercent}%`
        : "削除完了:100%"
      : null;

  return (
    <>
      <div className={styles.toolGrid}>
        <button
          type="button"
          className={styles.toolCard}
          onClick={handleDeleteClick}
        >
          <span className={styles.toolIcon}>🗑️</span>
          <span className={styles.toolName}>delete-cdna4001</span>
        </button>
      </div>

      {/* 確認モーダル */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={handleConfirmCancel}
        title="削除の確認"
        size="sm"
      >
        <div className={styles.confirmBody}>
          <p className={styles.confirmText}>
            CDNA4001を削除します。この操作は不可逆です。本当によろしいですか？
          </p>
          <div className={styles.confirmActions}>
            <Button variant="ghost" onClick={handleConfirmCancel}>
              キャンセル
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              削除
            </Button>
          </div>
        </div>
      </Modal>

      {/* 削除実行モーダル（TrashDetailModal の機能を移植） */}
      <Modal
        isOpen={isDeletionOpen}
        onClose={() => {}}
        title="CDNA4001 — 削除プロトコル実行中"
        size="fullscreen"
        closeOnOverlay={false}
        closeOnEsc={false}
      >
        <div className={styles.deletionBody}>
          <div className={styles.logArea} ref={logAreaRef}>
            {MOCK_DELETION_LOGS.map((log, index) => (
              <div key={index} className={styles.logEntry}>
                <span className={styles.logTimestamp}>[{log.timestamp}]</span>
                <span className={styles.logMessage}>{log.message}</span>
              </div>
            ))}
            {dynamicLogMessage && (
              <div className={styles.logEntry}>
                <span className={styles.logTimestamp}>
                  [{timestampRef.current}]
                </span>
                <span className={`${styles.logMessage} ${styles.logLearning}`}>
                  [{dynamicLogMessage}]
                </span>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* クラッシュモーダル群 */}
      {crashModals.length > 0 &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            {crashModals.map((modal) => (
              <div
                key={modal.id}
                className={styles.crashModal}
                style={{ left: modal.x, top: modal.y }}
              >
                <div className={styles.crashHeader}>
                  <span className={styles.crashTitle}>エラー</span>
                  <span className={styles.crashCloseIcon}>✕</span>
                </div>
                <div className={styles.crashBody}>
                  <span className={styles.crashIcon}>⚠</span>
                  <p className={styles.crashText}>
                    致命的なエラーが発生しました。
                  </p>
                </div>
                <div className={styles.crashActions}>
                  <button type="button" className={styles.crashButton}>
                    OK
                  </button>
                </div>
              </div>
            ))}
          </>,
          document.body
        )}
    </>
  );
}
