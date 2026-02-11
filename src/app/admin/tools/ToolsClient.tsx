"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/shared/Button";
import styles from "./ToolsClient.module.css";

interface CrashModalData {
  id: number;
  x: number;
  y: number;
}

type Phase =
  | "idle"
  | "typing"
  | "choosing"
  | "executing"
  | "motto"
  | "upload"
  | "crash"
  | "done";

const PREP_LOGS = [
  { timestamp: "2025-08-20 11:00:00", message: "削除対象: CDNA4001" },
  { timestamp: "2025-08-20 11:00:01", message: "関連メタデータの検索開始" },
  { timestamp: "2025-08-20 11:00:03", message: "バックアップ参照の確認" },
  { timestamp: "2025-08-20 11:00:05", message: "依存関係の解析中" },
  { timestamp: "2025-08-20 11:00:07", message: "外部参照の切断処理" },
  { timestamp: "2025-08-20 11:00:09", message: "ファイルシステム同期開始" },
  { timestamp: "2025-08-20 11:00:11", message: "インデックス再構築" },
  {
    timestamp: "2025-08-20 11:00:13",
    message: "削除プロトコル『焼却』実行準備完了",
  },
];

const EXECUTION_LOGS = [
  "バイナリデータのシリアライズ開始",
  "セクタ 0x00A4 〜 0x1FFF の走査",
  "メモリマッピング解除中",
  "キャッシュフラッシュ実行",
  "ジャーナルエントリの書き込み",
  "ファイルディスクリプタの解放",
  "暗号化キーの検証",
  "メタデータの最終検証",
  "データ整合性チェック",
  "暗号化キーの破棄",
  "ストレージブロックの上書き",
  "バックアップ参照の無効化",
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

function getDeletionInterval(percent: number): number {
  if (percent < 30) return 80;
  if (percent < 60) return 150;
  if (percent < 80) return 300;
  if (percent < 90) return 500;
  if (percent < 95) return 800;
  return 1200;
}

export function ToolsClient() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeletionOpen, setIsDeletionOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<"yes" | "no">("no");
  const [executionLogCount, setExecutionLogCount] = useState(0);
  const [deletionPercent, setDeletionPercent] = useState(0);
  const [mottoCount, setMottoCount] = useState(0);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [crashModals, setCrashModals] = useState<CrashModalData[]>([]);
  const logAreaRef = useRef<HTMLDivElement>(null);
  const executionTimestampRef = useRef("");
  const deletionPercentRef = useRef(0);
  const selectedChoiceRef = useRef<"yes" | "no">("no");

  const canClose = phase === "typing" || phase === "choosing";

  // Keep refs in sync
  useEffect(() => {
    selectedChoiceRef.current = selectedChoice;
  }, [selectedChoice]);

  // Reset all state
  const resetState = useCallback(() => {
    setPhase("idle");
    setVisibleLines(0);
    setSelectedChoice("no");
    setExecutionLogCount(0);
    setDeletionPercent(0);
    setMottoCount(0);
    setUploadPercent(0);
    setCrashModals([]);
    setIsDeletionOpen(false);
    deletionPercentRef.current = 0;
  }, []);

  // Auto-scroll log area
  useEffect(() => {
    if (logAreaRef.current) {
      logAreaRef.current.scrollTop = logAreaRef.current.scrollHeight;
    }
  }, [
    visibleLines,
    phase,
    executionLogCount,
    deletionPercent,
    mottoCount,
    uploadPercent,
  ]);

  // Phase: typing — lines appear one by one
  useEffect(() => {
    if (phase !== "typing") return;

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= PREP_LOGS.length) {
          clearInterval(interval);
          setPhase("choosing");
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase: choosing — keyboard handling
  useEffect(() => {
    if (phase !== "choosing") return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSelectedChoice("yes");
      } else if (e.key === "ArrowRight") {
        setSelectedChoice("no");
      } else if (e.key === "Enter") {
        if (selectedChoiceRef.current === "no") {
          resetState();
        } else {
          setPhase("executing");
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [phase, resetState]);

  // Phase: executing — progress 0→98% with slowing + execution logs
  useEffect(() => {
    if (phase !== "executing") return;

    executionTimestampRef.current = formatTimestamp(new Date());
    deletionPercentRef.current = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      deletionPercentRef.current += 1;
      const p = deletionPercentRef.current;

      setDeletionPercent(p);

      // Add execution log every ~8%
      if (p % 8 === 0) {
        setExecutionLogCount((c) => Math.min(c + 1, EXECUTION_LOGS.length));
      }

      if (p >= 98) {
        setPhase("motto");
        return;
      }

      setTimeout(tick, getDeletionInterval(p));
    };

    setTimeout(tick, getDeletionInterval(0));

    return () => {
      cancelled = true;
    };
  }, [phase]);

  // Phase: motto — flood with "もっと"
  useEffect(() => {
    if (phase !== "motto") return;

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setMottoCount(count);

      if (count >= 40) {
        clearInterval(interval);
        setTimeout(() => setPhase("upload"), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase: upload — "クラウドにアップロード中" 0→100%
  useEffect(() => {
    if (phase !== "upload") return;

    const interval = setInterval(() => {
      setUploadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("crash"), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase: crash — Windows 98 error modals
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

  // Handlers
  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsConfirmOpen(false);
    setIsDeletionOpen(true);
    setPhase("typing");
  };

  const handleModalClose = () => {
    if (canClose) {
      resetState();
    }
  };

  const handleChoiceClick = (choice: "yes" | "no") => {
    if (choice === "no") {
      resetState();
    } else {
      setPhase("executing");
    }
  };

  // Determine modal title
  const modalTitle =
    phase === "typing" || phase === "choosing"
      ? "CDNA4001 — 削除プロトコル"
      : "CDNA4001 — 削除プロトコル実行中";

  // Show execution/motto/upload phases
  const isPostChoicePhase =
    phase !== "idle" &&
    phase !== "typing" &&
    phase !== "choosing";

  return (
    <>
      <div className={styles.toolGrid}>
        <button
          type="button"
          className={styles.toolCard}
          onClick={handleDeleteClick}
        >
          <span className={styles.toolIcon}>⚠️</span>
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

      {/* 削除プロトコルモーダル */}
      <Modal
        isOpen={isDeletionOpen}
        onClose={handleModalClose}
        title={modalTitle}
        size="fullscreen"
        closeOnOverlay={false}
        closeOnEsc={canClose}
        classNames={{
          header: styles.deletionHeader,
          title: styles.deletionTitle,
          closeButton: canClose
            ? styles.deletionCloseButton
            : styles.deletionCloseButtonDisabled,
          content: styles.deletionContent,
        }}
      >
        <div className={styles.deletionBody}>
          <div className={styles.logArea} ref={logAreaRef}>
            {/* 準備ログ（1行ずつ表示） */}
            {PREP_LOGS.slice(0, visibleLines).map((log, i) => (
              <div key={`prep-${i}`} className={styles.logEntry}>
                <span className={styles.logTimestamp}>[{log.timestamp}]</span>
                <span className={styles.logMessage}>{log.message}</span>
              </div>
            ))}

            {/* Yes/No プロンプト */}
            {phase === "choosing" && (
              <div className={styles.promptEntry}>
                <span className={styles.promptLabel}>&gt; 実行しますか？</span>
                <button
                  type="button"
                  className={`${styles.promptOption} ${selectedChoice === "yes" ? styles.promptOptionSelected : ""}`}
                  onClick={() => handleChoiceClick("yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`${styles.promptOption} ${selectedChoice === "no" ? styles.promptOptionSelected : ""}`}
                  onClick={() => handleChoiceClick("no")}
                >
                  No
                </button>
              </div>
            )}

            {/* 実行ログ + 進捗 */}
            {isPostChoicePhase && (
              <>
                {EXECUTION_LOGS.slice(0, executionLogCount).map((msg, i) => (
                  <div key={`exec-${i}`} className={styles.logEntry}>
                    <span className={styles.logTimestamp}>
                      [{executionTimestampRef.current}]
                    </span>
                    <span className={styles.logMessage}>{msg}</span>
                  </div>
                ))}

                {/* 削除処理中 進捗 */}
                {(phase === "executing" || phase === "motto") && (
                  <div className={styles.logEntry}>
                    <span className={styles.logTimestamp}>
                      [{executionTimestampRef.current}]
                    </span>
                    <span
                      className={`${styles.logMessage} ${styles.logProgress}`}
                    >
                      [削除処理中:{deletionPercent}%]
                    </span>
                  </div>
                )}

                {/* もっとフラッド */}
                {mottoCount > 0 &&
                  Array.from({ length: mottoCount }, (_, i) => (
                    <div key={`motto-${i}`} className={styles.logEntry}>
                      <span className={styles.logMotto}>もっと</span>
                    </div>
                  ))}

                {/* クラウドアップロード進捗 */}
                {(phase === "upload" || phase === "crash") && (
                  <div className={styles.logEntry}>
                    <span className={styles.logTimestamp}>
                      [{executionTimestampRef.current}]
                    </span>
                    <span
                      className={`${styles.logMessage} ${styles.logProgress}`}
                    >
                      [クラウドにアップロード中:{uploadPercent}%]
                    </span>
                  </div>
                )}
              </>
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
          document.body,
        )}
    </>
  );
}
