"use client";

import { useMemo } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { ArticleFilter } from "@/components/public/ArticleFilter";
import type { FilterType } from "@/components/public/ArticleFilter";
import styles from "./ArticleContent.module.css";

export interface DisplayPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  href: string;
  isMember: boolean;
}

interface ArticleContentProps {
  posts: DisplayPost[];
  activeFilter: FilterType;
  searchQuery: string;
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

function matchesQuery(post: DisplayPost, query: string): boolean {
  return post.title.toLowerCase().includes(query);
}

const HIDDEN_QUERY = "CDNA4001";
const HIDDEN_TITLE = `通称『CDNA4001』に関する調査記録`;

export function ArticleContent({
  posts,
  activeFilter,
  searchQuery,
}: ArticleContentProps) {
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((p) => matchesQuery(p, query));
  }, [posts, searchQuery]);

  const showHiddenCard = useMemo(() => {
    return searchQuery.trim() === HIDDEN_QUERY;
  }, [searchQuery]);

  return (
    <>
      <ArticleFilter activeFilter={activeFilter} searchQuery={searchQuery} />

      {filteredPosts.length > 0 || showHiddenCard ? (
        <div className={styles.cardGrid}>
          {showHiddenCard && (
            <Link href="/key" className={styles.cardLink}>
              <article className={styles.card}>
                <div className={styles.cardImage}>
                  <OptimizedImage
                    src="/images/404.png"
                    alt={HIDDEN_TITLE}
                    width={400}
                    height={200}
                    className={styles.cardImageFill}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span
                      className={styles.cardTag}
                      style={{ backgroundColor: "#ff000015" }}
                    >
                      <span style={{ color: "#ff0000" }}>ERROR</span>
                    </span>
                  </div>
                  <h2 className={styles.cardTitle}>{HIDDEN_TITLE}</h2>
                  <p className={styles.cardDesc}>ERROR</p>
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
          )}
          {filteredPosts.map((post, index) => {
            const color = cardColors[index % cardColors.length];
            return (
              <Link key={post.id} href={post.href} className={styles.cardLink}>
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
                      {post.isMember && "👤"}
                      {!post.isMember && post.category === "お知らせ" && "📢"}
                      {!post.isMember && post.category === "サービス" && "🚀"}
                      {!post.isMember && post.category === "制作実績" && "🎨"}
                      {!post.isMember &&
                        !["お知らせ", "サービス", "制作実績"].includes(
                          post.category,
                        ) &&
                        "📝"}
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
                        {formatDate(post.publishedAt)}
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
    </>
  );
}
