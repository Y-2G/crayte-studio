import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkBySlug } from "@/lib/data";
import { Button } from "@/components/shared/Button/Button";
import styles from "./page.module.css";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return {
      title: "制作実績が見つかりません",
    };
  }

  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.title}>{work.title}</h1>
            <div className={styles.meta}>
              <span className={styles.client}>{work.client}</span>
              <span className={styles.separator}>|</span>
              <time className={styles.date}>
                {new Date(work.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                })}
              </time>
            </div>
            <div className={styles.tags}>
              {work.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            {work.images.length > 0 && (
              <div className={styles.images}>
                {work.images.map((image, index) => (
                  <div key={index} className={styles.imagePlaceholder}>
                    <span className={styles.imageText}>画像 {index + 1}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.details}>
              <h2 className={styles.detailsTitle}>プロジェクト概要</h2>
              <p className={styles.description}>{work.description}</p>

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>クライアント</dt>
                  <dd className={styles.infoValue}>{work.client}</dd>
                </div>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>会場</dt>
                  <dd className={styles.infoValue}>{work.venue}</dd>
                </div>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>実施日</dt>
                  <dd className={styles.infoValue}>
                    {new Date(work.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <Link href="/works">
              <Button variant="secondary">制作実績一覧に戻る</Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
