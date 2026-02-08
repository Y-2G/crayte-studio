"use client";

import { useState } from "react";
import type { TrashItem } from "@/types/entities";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import styles from "./RestoreModal.module.css";

interface RestoreModalProps {
  item: TrashItem;
  isOpen: boolean;
  onClose: () => void;
  onRestore: () => void;
}

export function RestoreModal({
  item,
  isOpen,
  onClose,
  onRestore,
}: RestoreModalProps) {
  const [password, setPassword] = useState("");

  const handleRestore = () => {
    // TODO: パスワード検証と復元処理を実装
    onRestore();
    setPassword("");
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="アイテムの復元"
      size="sm"
    >
      <div className={styles.body}>
        <p className={styles.description}>
          「{item.title}」をゴミ箱から復元します。復元するにはパスワードを入力してください。
        </p>
        <Input
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力"
          fullWidth
        />
        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={handleRestore}
            disabled={!password}
          >
            復元
          </Button>
        </div>
      </div>
    </Modal>
  );
}
