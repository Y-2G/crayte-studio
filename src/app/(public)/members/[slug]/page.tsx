import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import {
  getAllMemberSlugs,
  getMemberBySlug,
  getRelatedMembers,
} from "@/lib/members";
import styles from "./page.module.css";

interface MemberDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllMemberSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: MemberDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    return { title: "社員が見つかりません" };
  }

  return {
    title: `${member.name} | CRAYTE STUDIO`,
    description: member.motto,
  };
}

function formatJoinedAt(joinedAt: string): string {
  // "2020-04" → "2020年4月"
  const [year, month] = joinedAt.split("-");
  return `${year}年${parseInt(month, 10)}月`;
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

export default async function MemberDetailPage({
  params,
}: MemberDetailPageProps) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  const relatedMembers = await getRelatedMembers(slug, 3);
  const headings = extractHeadings(member.htmlContent);
  const bodyHtml = addHeadingIds(member.htmlContent);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroGlow3} />

        <div className={styles.heroContent}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="パンくずリスト">
            <Link href="/" className={styles.breadcrumbLink}>
              ホーム
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/members" className={styles.breadcrumbLink}>
              社員紹介
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{member.name}</span>
          </nav>

          {/* Member Photo */}
          <div className={styles.heroPhotoWrapper}>
            <OptimizedImage
              src={member.photo}
              alt={member.name}
              width={200}
              height={200}
              className={styles.heroPhoto}
            />
          </div>

          {/* Name & Role */}
          <h1 className={styles.heroTitle}>{member.name}</h1>
          <p className={styles.heroNameEn}>{member.nameEn}</p>
          <p className={styles.heroRole}>{member.role}</p>

          {/* Motto */}
          <p className={styles.heroMotto}>&ldquo;{member.motto}&rdquo;</p>
        </div>
      </section>

      {/* Content Area (2-column) */}
      <div className={styles.contentArea}>
        {/* Main Column */}
        <main className={styles.mainColumn}>
          {/* Member Meta */}
          <div className={styles.memberMeta}>
            <div className={styles.metaItem}>
              <svg
                className={styles.metaIcon}
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
              入社: {formatJoinedAt(member.joinedAt)}
            </div>

            <div className={styles.tagGroup}>
              {member.skills.map((skill) => (
                <span key={skill} className={styles.metaTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Member Body */}
          <div
            className={styles.memberBody}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <div className={styles.divider} />

          {/* Share Row */}
          <div className={styles.shareRow}>
            <span className={styles.shareLabel}>このページをシェア:</span>
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

          {/* Related Members (Same Team) */}
          {relatedMembers.length > 0 && (
            <div className={styles.relatedCard}>
              <h2 className={styles.relatedTitle}>同じチームのメンバー</h2>
              <div className={styles.tocDivider} />
              <div className={styles.relatedList}>
                {relatedMembers.map((related, i) => (
                  <div key={related.slug}>
                    {i > 0 && <div className={styles.relatedSep} />}
                    <Link
                      href={`/members/${related.slug}`}
                      className={styles.relatedMemberCard}
                    >
                      <div className={styles.relatedMemberPhoto}>
                        <OptimizedImage
                          src={related.photo}
                          alt={related.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className={styles.relatedMemberInfo}>
                        <p className={styles.relatedMemberName}>
                          {related.name}
                        </p>
                        <p className={styles.relatedMemberRole}>
                          {related.role}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Back to Members */}
      <div className={styles.backSection}>
        <Link href="/members" className={styles.backButton}>
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
          社員紹介に戻る
        </Link>
      </div>
    </div>
  );
}
