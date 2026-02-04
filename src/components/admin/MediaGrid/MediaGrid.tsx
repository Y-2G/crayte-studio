import type { Media } from "@/types/entities";
import { MediaGridItem } from "./MediaGridItem";
import styles from "./MediaGrid.module.css";

interface MediaGridProps {
  items: Media[];
}

export function MediaGrid({ items }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🖼️</span>
        <p className={styles.emptyText}>メディアファイルが見つかりません</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((media) => (
        <MediaGridItem key={media.id} media={media} />
      ))}
    </div>
  );
}
