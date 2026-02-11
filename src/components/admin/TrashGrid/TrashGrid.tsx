"use client";

import { useState } from "react";
import type { TrashItem } from "@/types/entities";
import { TrashGridItem } from "./TrashGridItem";
import { TrashDetailModal } from "@/components/admin/TrashDetailModal";
import styles from "./TrashGrid.module.css";

const CLICKABLE_ITEM_ID = "kai-con-esc-s4-dat-net-cra-001";

interface TrashGridProps {
  items: TrashItem[];
}

export function TrashGrid({ items }: TrashGridProps) {
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(null);

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🗑️</span>
        <p className={styles.emptyText}>ゴミ箱は空です</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {items.map((item) => (
          <TrashGridItem
            key={item.id}
            item={item}
            onClick={
              item.id === CLICKABLE_ITEM_ID
                ? () => setSelectedItem(item)
                : undefined
            }
            href={
              item.id !== CLICKABLE_ITEM_ID
                ? `/admin/trash/${item.id}/edit`
                : undefined
            }
          />
        ))}
      </div>
      {selectedItem && (
        <TrashDetailModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
