import type { TrashItem } from "@/types/entities";
import { TrashGridItem } from "./TrashGridItem";
import styles from "./TrashGrid.module.css";

interface TrashGridProps {
  items: TrashItem[];
}

export function TrashGrid({ items }: TrashGridProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🗑️</span>
        <p className={styles.emptyText}>ゴミ箱は空です</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <TrashGridItem key={item.id} item={item} />
      ))}
    </div>
  );
}
