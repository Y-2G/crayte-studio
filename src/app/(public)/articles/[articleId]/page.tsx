import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleById,
  getRelatedArticles,
} from "@/lib/articles";
import styles from "./page.module.css";

interface ArticleDetailPageProps {
  params: Promise<{ articleId: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ articleId: article.id }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { articleId } = await params;
  const article = await getArticleById(articleId);

  if (!article) {
    return { title: "記事が見つかりません" };
  }

  return {
    title: `${article.title} | CRAYTE STUDIO`,
    description: article.excerpt,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /<h2[^>]*>(.*?)<\/h2>/g;
  let match;
  let index = 0;
  while ((match = regex.exec(html)) !== null) {
    index++;
    const text = match[1].replace(/<[^>]*>/g, "");
    headings.push({ id: `heading-${index}`, text });
  }
  return headings;
}

function addHeadingIds(html: string): string {
  let index = 0;
  return html.replace(/<h2([^>]*)>/g, () => {
    index++;
    return `<h2 id="heading-${index}">`;
  });
}

function getAuthorInitials(author: string): string {
  if (author.includes("CRAYTE")) return "CS";
  const parts = author.split(/\s+/);
  if (parts.length >= 2) {
    return parts.map((p) => p.charAt(0)).join("").slice(0, 2);
  }
  return author.slice(0, 2);
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { articleId } = await params;
  const article = await getArticleById(articleId);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(articleId, 2);
  const headings = extractHeadings(article.htmlContent);
  const bodyHtml = addHeadingIds(article.htmlContent);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {article.heroImage ? (
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            priority
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.heroImageFallback} />
        )}
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="パンくずリスト">
            <Link href="/" className={styles.breadcrumbLink}>
              ホーム
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/articles" className={styles.breadcrumbLink}>
              記事一覧
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{article.title}</span>
          </nav>

          {/* Category Tag */}
          <div className={styles.heroTag}>
            <span className={styles.heroTagInner}>{article.category}</span>
          </div>

          {/* Title */}
          <h1 className={styles.heroTitle}>{article.title}</h1>
        </div>
      </section>

      {/* Content Area (2-column) */}
      <div className={styles.contentArea}>
        {/* Main Column */}
        <main className={styles.mainColumn}>
          {/* Article Meta */}
          <div className={styles.articleMeta}>
            <div className={styles.dateGroup}>
              <span className={styles.dateItem}>
                <svg
                  className={styles.dateIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                公開日: {formatDate(article.publishedAt)}
              </span>
              {article.updatedAt !== article.publishedAt && (
                <span className={styles.dateItem}>
                  <svg
                    className={styles.dateIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  編集日: {formatDate(article.updatedAt)}
                </span>
              )}
            </div>

            <div className={styles.tagGroup}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.metaTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Article Body */}
          <div
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <div className={styles.divider} />

          {/* Author Section */}
          <div className={styles.authorSection}>
            <div className={styles.authorAvatar}>
              <span className={styles.authorAvatarText}>
                {getAuthorInitials(article.author)}
              </span>
            </div>
            <div className={styles.authorInfo}>
              <p className={styles.authorName}>{article.author}</p>
              <p className={styles.authorDesc}>
                CRAYTE STUDIOの最新情報をお届けします。
              </p>
            </div>
          </div>

          {/* Share Row */}
          <div className={styles.shareRow}>
            <span className={styles.shareLabel}>この記事をシェア:</span>
            <button
              className={styles.shareButton}
              aria-label="Xでシェア"
              type="button"
            >
              <svg
                className={styles.shareIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </button>
            <button
              className={styles.shareButton}
              aria-label="Facebookでシェア"
              type="button"
            >
              <svg
                className={styles.shareIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </button>
            <button
              className={styles.shareButton}
              aria-label="リンクをコピー"
              type="button"
            >
              <svg
                className={styles.shareIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
          </div>
        </main>

        {/* Side Column */}
        <aside className={styles.sideColumn}>
          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className={styles.tocCard}>
              <h2 className={styles.tocTitle}>目次</h2>
              <div className={styles.tocDivider} />
              <ol className={styles.tocList}>
                {headings.map((heading, i) => (
                  <li key={heading.id} className={styles.tocItem}>
                    <span className={styles.tocNumber}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a href={`#${heading.id}`} className={styles.tocLink}>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className={styles.relatedCard}>
              <h2 className={styles.relatedTitle}>関連記事</h2>
              <div className={styles.tocDivider} />
              <div className={styles.relatedList}>
                {relatedArticles.map((related, i) => (
                  <div key={related.id}>
                    {i > 0 && <div className={styles.relatedSep} />}
                    <Link
                      href={`/articles/${related.id}`}
                      className={styles.relatedItem}
                    >
                      <span className={styles.relatedItemDate}>
                        {formatDate(related.publishedAt)}
                      </span>
                      <h3 className={styles.relatedItemTitle}>
                        {related.title}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Back to Articles */}
      <div className={styles.backSection}>
        <Link href="/articles" className={styles.backButton}>
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
