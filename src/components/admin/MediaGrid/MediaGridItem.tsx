"use client";

import type { Media } from "@/types/entities";
import { OptimizedImage } from "@/components/shared";
import { getMediaType } from "@/lib/utils";
import styles from "./MediaGridItem.module.css";

interface MediaGridItemProps {
  media: Media;
}

const PLACEHOLDER_ICONS: Record<string, string> = {
  video: "🎬",
  font: "🔤",
  other: "📄",
};

export function MediaGridItem({ media }: MediaGridItemProps) {
  const mediaType = getMediaType(media.mimeType);
  const isImage = mediaType === "image";

  return (
    <div className={styles.item}>
      <div className={styles.preview}>
        {isImage ? (
          <OptimizedImage
            src={media.url}
            alt={media.alt}
            fill
            sizes="160px"
            className={styles.image}
          />
        ) : (
          <span className={styles.placeholder}>
            {PLACEHOLDER_ICONS[mediaType] || PLACEHOLDER_ICONS.other}
          </span>
        )}
      </div>
      <span className={styles.filename} title={media.filename}>
        {media.filename}
      </span>
    </div>
  );
}
