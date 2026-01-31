/**
 * WorksGallery Component
 *
 * Two-column layout matching .pen design:
 * - Left: "Works" gradient title, divider, description, CTA
 * - Right: 2x2 grid of work cards
 */

import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/types";
import { GradientButton } from "@/components/shared/GradientButton";
import styles from "./WorksGallery.module.css";

interface WorksGalleryProps {
  works: Work[];
  className?: string;
}

export function WorksGallery({ works, className }: WorksGalleryProps) {
  if (works.length === 0) {
    return null;
  }

  const displayedWorks = works.slice(0, 4);

  return (
    <section
      className={`${styles.worksSection} ${className || ""}`}
      aria-labelledby="works-heading"
    >
      {/* Glow effects */}
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.left}>
          <h2 id="works-heading" className={styles.title}>
            Works
          </h2>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.description}>
            クライアントの課題を解決し、
            <br />
            成長を支援してきた
            <br />
            制作実績の一部をご紹介します。
          </p>
          <GradientButton href="/works" variant="dark" size="lg" filled>
            全ての制作実績を見る
          </GradientButton>
        </div>

        {/* Right Column - Works Grid */}
        <div className={styles.worksGrid}>
          {displayedWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface WorkCardProps {
  work: Work;
}

function WorkCard({ work }: WorkCardProps) {
  const hasImage = work.images && work.images.length > 0;

  return (
    <Link
      href={`/works/${work.slug}`}
      className={styles.workCard}
      aria-label={`${work.title}${work.client ? ` - ${work.client}` : ""}`}
    >
      <div className={styles.workImageWrapper}>
        {hasImage ? (
          <Image
            src={work.images[0]}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className={styles.workImage}
          />
        ) : (
          <div className={styles.workImagePlaceholder} aria-hidden="true" />
        )}
      </div>

      <div className={styles.workContent}>
        <h3 className={styles.workTitle}>{work.title}</h3>
        {work.client && <p className={styles.workClient}>{work.client}</p>}
      </div>
    </Link>
  );
}
