"use client";

import { useState } from "react";
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

export function TrashDetailModal({
  item,
  isOpen,
  onClose,
}: TrashDetailModalProps) {
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);

  const handleRestoreClick = () => {
    setIsRestoreOpen(true);
  };

  const handleRestoreClose = () => {
    setIsRestoreOpen(false);
  };

  const handleRestoreComplete = () => {
    setIsRestoreOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={item.title}
        size="fullscreen"
        closeOnOverlay={false}
      >
        <div className={styles.body}>
          <div className={styles.logArea}>
            {MOCK_USER_LOGS.map((log, index) => (
              <div key={index} className={styles.logEntry}>
                <span className={styles.logTimestamp}>[{log.timestamp}]</span>
                <span className={styles.logMessage}>{log.message}</span>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={handleRestoreClick}>
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
    </>
  );
}
