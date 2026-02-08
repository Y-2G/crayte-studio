import type { TrashItem } from "@/types/entities";
import styles from "./TrashGridItem.module.css";

interface TrashGridItemProps {
  item: TrashItem;
}

const STATUS_ICONS: Record<string, string> = {
  draft: "📝",
  pending: "⏳",
  publish: "📰",
  rejected: "❌",
  leak: "💧",
};

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function TrashGridItem({ item }: TrashGridItemProps) {
  const statusIcon = STATUS_ICONS[item.originalStatus] || "📄";

  return (
    <div className={styles.item}>
      <div className={styles.preview}>
        <span className={styles.placeholder}>{statusIcon}</span>
      </div>
      <span className={styles.title} title={item.title}>
        {item.title}
      </span>
      <span className={styles.date}>
        {formatDate(item.deletedAt)}
      </span>
    </div>
  );
}
