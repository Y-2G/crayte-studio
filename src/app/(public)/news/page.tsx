import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts, getAllCategories } from "@/lib/data";
import { Card, CardBody } from "@/components/shared/Card/Card";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "news | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOのニュースや記事をご紹介します。お知らせ、実績紹介、サービス情報など、最新情報をお届けします。",
};

export default async function NewsPage() {
  const posts = await getPublishedPosts();
  const allCategories = await getAllCategories();

  // Sort posts by published date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt);
    const dateB = new Date(b.publishedAt || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  // Get unique categories from published posts only
  const publishedCategories = allCategories.filter((category) =>
    posts.some((post) => post.category === category),
  );

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>ニュース</h1>
          <p className={styles.pageSubtitle}>News</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.categories}>
            <span className={styles.categoryLabel}>カテゴリで絞り込み:</span>
            <div className={styles.categoryList}>
              {publishedCategories.map((category) => (
                <button
                  key={category}
                  className={styles.category}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.postsList}>
            {sortedPosts.map((post) => {
              const publishDate = new Date(post.publishedAt || post.createdAt);
              return (
                <Link
                  key={post.id}
                  href={`/journal/${post.slug}`}
                  className={styles.postLink}
                >
                  <Card variant="bordered" className={styles.postCard}>
                    <CardBody>
                      <div className={styles.postHeader}>
                        <time className={styles.postDate}>
                          {publishDate.toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span className={styles.postCategory}>
                          {post.category}
                        </span>
                      </div>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                      <div className={styles.postFooter}>
                        <span className={styles.readMore}>続きを読む →</span>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>

          {sortedPosts.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyText}>記事が見つかりませんでした</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
