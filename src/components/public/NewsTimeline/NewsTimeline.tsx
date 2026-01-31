import Link from "next/link";
import type { Post } from "@/types";
import { GradientButton } from "@/components/shared/GradientButton";
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

const dotColors = ["#FF1493", "#9370DB", "#00BFFF"];

/**
 * NewsTimeline Component
 *
 * Dark section with two-column layout:
 * - Left: "News" gradient title, description, CTA
 * - Right: Timeline with colored dots
 */
export function NewsTimeline({ posts, className }: NewsTimelineProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      className={
        className ? `${styles.newsSection} ${className}` : styles.newsSection
      }
    >
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />
      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.left}>
          <h2 className={styles.title}>News</h2>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.description}>
            最新のお知らせやプロジェクト情報をお届けします。
          </p>
          <GradientButton href="/articles?filter=news" variant="dark" size="lg">
            一覧を見る
          </GradientButton>
        </div>

        {/* Right Column - Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine} aria-hidden="true" />
          <div className={styles.timelineItems}>
            {posts.map((post, index) => (
              <div key={post.id} className={styles.timelineItem}>
                <div
                  className={styles.dot}
                  style={{
                    backgroundColor: dotColors[index % dotColors.length],
                  }}
                  aria-hidden="true"
                />
                <Link
                  href={`/articles/${post.slug}`}
                  className={styles.itemContent}
                >
                  <div className={styles.meta}>
                    <time className={styles.date}>
                      {formatDate(post.publishedAt || post.createdAt, "full")}
                    </time>
                    <span className={styles.category}>{post.category}</span>
                  </div>
                  <h3 className={styles.itemTitle}>{post.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
