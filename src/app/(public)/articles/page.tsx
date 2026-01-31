import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getPublishedPosts } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";
import { GradientButton } from "@/components/shared/GradientButton";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { ArticleFilter } from "@/components/public/ArticleFilter";
import type { Post } from "@/types";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "記事一覧 | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOの最新ニュース、技術ブログ、プロジェクト情報をお届けします。",
};

/** ニュース系カテゴリ */
const NEWS_CATEGORIES = ["お知らせ", "サービス"];

/** ブログ系カテゴリ */
const BLOG_CATEGORIES = ["制作実績紹介"];

type FilterType = "all" | "news" | "blog";

function filterPosts(posts: Post[], filter: FilterType): Post[] {
  switch (filter) {
    case "news":
      return posts.filter((p) => NEWS_CATEGORIES.includes(p.category));
    case "blog":
      return posts.filter((p) => BLOG_CATEGORIES.includes(p.category));
    default:
      return posts;
  }
}

const cardColors = [
  { bg: "#FF149315", accent: "#FF1493" },
  { bg: "#9370DB15", accent: "#9370DB" },
  { bg: "#00BFFF15", accent: "#00BFFF" },
];

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

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: filterParam } = await searchParams;
  const activeFilter: FilterType =
    filterParam === "news" || filterParam === "blog" ? filterParam : "all";

  const [posts, mdArticles] = await Promise.all([
    getPublishedPosts(),
    getAllArticles(),
  ]);

  // Merge MD articles into the post list (MD articles take priority for detail links)
  const mdArticleIds = new Set(mdArticles.map((a) => a.id));

  const allPosts: Post[] = [
    ...posts.filter((p) => !mdArticleIds.has(p.slug)),
    ...mdArticles.map(
      (a) =>
        ({
          id: a.id,
          slug: a.id,
          title: a.title,
          content: a.htmlContent,
          excerpt: a.excerpt,
          status: "publish" as const,
          visibility: "public" as const,
          category: a.category,
          tags: a.tags,
          author: a.author,
          reviewComments: [],
          meta: { fromMd: true },
          createdAt: a.publishedAt,
          updatedAt: a.updatedAt,
          publishedAt: a.publishedAt,
        } satisfies Post),
    ),
  ];

  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt);
    const dateB = new Date(b.publishedAt || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredPosts = filterPosts(sortedPosts, activeFilter);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="記事一覧">
        <div className={styles.heroGlow1} aria-hidden="true" />
        <div className={styles.heroGlow2} aria-hidden="true" />
        <div className={styles.heroGlow3} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>ARTICLE</span>
          <h1 className={styles.heroTitle}>記事一覧</h1>
          <p className={styles.heroDesc}>
            最新のニュース、技術ブログ、プロジェクト情報をお届けします。
          </p>
        </div>
      </section>

      {/* Content Section */}
      <ScrollReveal>
        <section className={styles.contentSection}>
          <div className={styles.contentInner}>
            {/* Filter */}
            <Suspense fallback={null}>
              <ArticleFilter activeFilter={activeFilter} />
            </Suspense>

            {/* Cards Grid */}
            {filteredPosts.length > 0 ? (
              <div className={styles.cardGrid}>
                {filteredPosts.map((post, index) => {
                  const color = cardColors[index % cardColors.length];
                  return (
                    <Link
                      key={post.id}
                      href={`/articles/${post.slug}`}
                      className={styles.cardLink}
                    >
                      <article className={styles.card}>
                        <div
                          className={styles.cardImage}
                          style={{
                            background: `linear-gradient(135deg, ${color.accent}20 0%, ${color.accent}08 100%)`,
                          }}
                        >
                          <span
                            className={styles.cardImageIcon}
                            style={{ color: color.accent }}
                          >
                            {post.category === "お知らせ" && "📢"}
                            {post.category === "サービス" && "🚀"}
                            {post.category === "制作実績紹介" && "🎨"}
                            {!["お知らせ", "サービス", "制作実績紹介"].includes(
                              post.category,
                            ) && "📝"}
                          </span>
                        </div>
                        <div className={styles.cardBody}>
                          <div className={styles.cardMeta}>
                            <span
                              className={styles.cardTag}
                              style={{ backgroundColor: color.bg }}
                            >
                              <span style={{ color: color.accent }}>
                                {post.category}
                              </span>
                            </span>
                            <time className={styles.cardDate}>
                              {formatDate(post.publishedAt || post.createdAt)}
                            </time>
                          </div>
                          <h2 className={styles.cardTitle}>{post.title}</h2>
                          <p className={styles.cardDesc}>{post.excerpt}</p>
                          <div className={styles.cardLinkRow}>
                            <span className={styles.readMore}>続きを読む</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={styles.readMoreIcon}
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={styles.empty}>
                <p className={styles.emptyText}>記事が見つかりませんでした</p>
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className={styles.ctaSection} aria-label="お問い合わせ">
          <div className={styles.ctaGlow1} aria-hidden="true" />
          <div className={styles.ctaGlow2} aria-hidden="true" />
          <div className={styles.ctaGlow3} aria-hidden="true" />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Let&apos;s Create Something
              <br />
              Amazing Together
            </h2>
            <p className={styles.ctaSubtitle}>
              あなたのビジョンを、私たちと一緒に形にしませんか。
            </p>
            <GradientButton href="/contact" variant="dark" size="lg" filled>
              お問い合わせ
            </GradientButton>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
