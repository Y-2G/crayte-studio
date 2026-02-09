"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { TrashItem } from "@/types/entities";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/shared/Button";
import { RestoreModal } from "@/components/admin/RestoreModal";
import styles from "./TrashDetailModal.module.css";

interface TrashDetailModalProps {
  item: TrashItem;
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  timestamp: string;
  message: string;
}

interface CrashModalData {
  id: number;
  x: number;
  y: number;
}

const MOCK_USER_LOGS: LogEntry[] = [
  { timestamp: "2025-07-10 16:00:03", message: "ファイル作成: kai-con-esc-s4-dat-net-cra-001" },
  { timestamp: "2025-07-10 16:00:05", message: "メタデータ書き込み開始" },
  { timestamp: "2025-07-10 16:00:07", message: "ID割り当て完了: kai-con-esc-s4-dat-net-cra-001" },
  { timestamp: "2025-07-12 09:14:22", message: "ユーザー admin がアクセス" },
  { timestamp: "2025-07-15 11:30:00", message: "ステータス変更: draft → pending" },
  { timestamp: "2025-07-20 14:45:10", message: "レビュー担当者に通知送信" },
  { timestamp: "2025-08-01 08:00:00", message: "警告: 異常なアクセスパターンを検出" },
  { timestamp: "2025-08-10 22:33:41", message: "コンテンツ変更検知 — 差分ログ記録" },
  { timestamp: "2025-08-15 03:12:58", message: "自動バックアップ実行" },
  { timestamp: "2025-08-20 10:59:59", message: "削除リクエスト受理" },
  { timestamp: "2025-08-20 11:00:00", message: "ゴミ箱へ移動完了" },
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

export function TrashDetailModal({
  item,
  isOpen,
  onClose,
}: TrashDetailModalProps) {
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "learning" | "crash" | "done">("idle");
  const [learningPercent, setLearningPercent] = useState(85);
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

  const handleRestoreClick = () => {
    setIsRestoreOpen(true);
  };

  const handleRestoreClose = () => {
    setIsRestoreOpen(false);
  };

  const handleRestoreComplete = () => {
    setIsRestoreOpen(false);
    setPhase("learning");
  };

  const handleMainClose = () => {
    if (phase !== "idle") return;
    onClose();
  };

  const dynamicLogMessage =
    phase !== "idle"
      ? learningPercent < 100
        ? `学習中:${learningPercent}%`
        : "学習完了:100%"
      : null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleMainClose}
        title={item.title}
        size="fullscreen"
        closeOnOverlay={false}
        closeOnEsc={phase === "idle"}
      >
        <div className={styles.body}>
          <div className={styles.logArea} ref={logAreaRef}>
            {MOCK_USER_LOGS.map((log, index) => (
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
          <div className={styles.actions}>
            <Button
              variant="ghost"
              onClick={handleMainClose}
              disabled={phase !== "idle"}
            >
              キャンセル
            </Button>
            <Button
              variant="primary"
              onClick={handleRestoreClick}
              disabled={phase !== "idle"}
            >
              復元
            </Button>
          </div>
        </div>
      </Modal>
      <RestoreModal
        item={item}
        isOpen={isRestoreOpen}
        onClose={handleRestoreClose}
        onRestore={handleRestoreComplete}
      />
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
