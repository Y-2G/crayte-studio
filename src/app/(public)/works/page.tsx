import type { Metadata } from "next";
import Link from "next/link";
import { getPublicWorks, getAllWorkTags } from "@/lib/data";
import { Card, CardBody } from "@/components/shared/Card/Card";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "実績 | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOの制作実績をご紹介します。Web制作、イベント企画、映像制作など、幅広いプロジェクトを手がけています。",
};

export default async function WorksPage() {
  const works = await getPublicWorks();
  const allTags = await getAllWorkTags();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>実績</h1>
          <p className={styles.pageSubtitle}>Works</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.tags}>
            <span className={styles.tagLabel}>タグで絞り込み:</span>
            <div className={styles.tagList}>
              {allTags.map((tag) => (
                <button key={tag} className={styles.tag} type="button">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.worksGrid}>
            {works.map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.slug}`}
                className={styles.workLink}
              >
                <Card
                  variant="bordered"
                  padding="none"
                  className={styles.workCard}
                >
                  <div className={styles.workImagePlaceholder}>
                    {work.images.length > 0 ? (
                      <span className={styles.workImageText}>画像</span>
                    ) : (
                      <span className={styles.workImageText}>準備中</span>
                    )}
                  </div>
                  <CardBody>
                    <h2 className={styles.workTitle}>{work.title}</h2>
                    <p className={styles.workClient}>{work.client}</p>
                    <p className={styles.workDate}>
                      {new Date(work.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    <div className={styles.workTags}>
                      {work.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.workTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>

          {works.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyText}>実績が見つかりませんでした</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
