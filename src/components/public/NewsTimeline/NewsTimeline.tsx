import Link from "next/link";
import type { Post } from "@/types";
import styles from "./NewsTimeline.module.css";

interface NewsTimelineProps {
  posts: Post[];
  className?: string;
}

/**
 * Format date to Japanese locale format
 * @param dateString ISO 8601 date string
 * @param format "full" for YYYY.MM.DD, "short" for MM.DD
 */
function formatDate(
  dateString: string,
  format: "full" | "short" = "full",
): string {
  const date = new Date(dateString);
  if (format === "short") {
    return date.toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
    });
  }
  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
}

/**
 * NewsTimeline Component
 *
 * Displays posts in a featured card + timeline format:
 * - First post is highlighted as a featured card
 * - Remaining posts are displayed in a vertical timeline
 */
export function NewsTimeline({ posts, className }: NewsTimelineProps) {
  if (posts.length === 0) {
    return null;
  }

  const [featured, ...remaining] = posts;

  return (
    <div className={className ? `${styles.newsTimeline} ${className}` : styles.newsTimeline}>
      {/* Featured Card */}
      <Link href={`/news/${featured.slug}`} className={styles.featuredCard}>
        <div className={styles.featuredBadge}>📌 最新</div>
        <h3 className={styles.featuredTitle}>{featured.title}</h3>
        <div className={styles.featuredMeta}>
          <time className={styles.date}>
            {formatDate(featured.publishedAt || featured.createdAt)}
          </time>
          <span className={styles.category}>{featured.category}</span>
        </div>
      </Link>

      {/* Timeline */}
      {remaining.length > 0 && (
        <div className={styles.timeline}>
          {remaining.map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className={styles.timelineItem}
            >
              <div className={styles.timelineDot} />
              <time className={styles.timelineDate}>
                {formatDate(post.publishedAt || post.createdAt, "short")}
              </time>
              <span className={styles.timelineCategory}>[{post.category}]</span>
              <span className={styles.timelineTitle}>{post.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
