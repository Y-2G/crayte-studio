import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllArticles, getHiddenArticles } from "@/lib/articles";
import { getPublicMembers } from "@/lib/members";
import { GradientButton } from "@/components/shared/GradientButton";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { ArticleContent } from "@/components/public/ArticleContent";
import type { DisplayPost } from "@/components/public/ArticleContent";
import type { FilterType } from "@/components/public/ArticleFilter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "記事一覧 | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOの最新ニュース、技術ブログ、プロジェクト情報をお届けします。",
};

/** ニュース系カテゴリ */
const NEWS_CATEGORIES = ["お知らせ", "サービス"];

/** ブログ系カテゴリ */
const BLOG_CATEGORIES = ["ブログ"];

/** 制作実績カテゴリ */
const WORKS_CATEGORIES = ["制作実績"];

function filterPosts(posts: DisplayPost[], filter: FilterType): DisplayPost[] {
  switch (filter) {
    case "news":
      return posts.filter((p) => NEWS_CATEGORIES.includes(p.category));
    case "blog":
      return posts.filter((p) => BLOG_CATEGORIES.includes(p.category));
    case "works":
      return posts.filter((p) => WORKS_CATEGORIES.includes(p.category));
    default:
      return posts;
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: filterParam } = await searchParams;
  const activeFilter: FilterType =
    filterParam === "news" || filterParam === "blog" || filterParam === "works"
      ? filterParam
      : "all";

  const [mdArticles, members, hiddenArticles] = await Promise.all([
    getAllArticles(),
    getPublicMembers(),
    getHiddenArticles(),
  ]);

  const allPosts: DisplayPost[] = [
    ...mdArticles.map((a) => ({
      id: a.id,
      slug: a.id,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      publishedAt: a.publishedAt,
      href: `/articles/${a.id}`,
      isMember: false,
    })),
    ...members.map((m) => ({
      id: `member-${m.slug}`,
      slug: m.slug,
      title: `${m.name} - ${m.role}`,
      excerpt: m.motto,
      category: "ブログ",
      publishedAt: `${m.joinedAt}-01`,
      href: `/members/${m.slug}`,
      isMember: true,
    })),
  ];

  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredPosts = filterPosts(sortedPosts, activeFilter);

  const hiddenPosts: DisplayPost[] = hiddenArticles.map((a) => ({
    id: a.id,
    slug: a.id,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    publishedAt: a.publishedAt,
    href: `/articles/${a.id}`,
    isMember: false,
  }));

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
            <Suspense fallback={null}>
              <ArticleContent
                posts={filteredPosts}
                hiddenPosts={hiddenPosts}
                activeFilter={activeFilter}
              />
            </Suspense>
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
