/**
 * WorksGallery Component
 *
 * Displays featured work and recent works in a gallery layout
 * with dark background and catalog-based aesthetic.
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

  const [featuredWork, ...otherWorks] = works;
  const displayedWorks = [featuredWork, ...otherWorks.slice(0, 2)];

  return (
    <section className={`${styles.worksSection} ${className || ""}`} aria-labelledby="works-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="works-heading" className={styles.title}>Works</h2>
          <div className={styles.divider} aria-hidden="true" />
        </div>

        <div className={styles.worksGrid}>
          {displayedWorks.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              isFeatured={index === 0}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/works">
            <GradientButton variant="dark" size="lg">
              全ての実績を見る
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface WorkCardProps {
  work: Work;
  isFeatured: boolean;
}

function WorkCard({ work, isFeatured }: WorkCardProps) {
  const hasImage = work.images && work.images.length > 0;

  return (
    <Link
      href={`/works/${work.slug}`}
      className={`${styles.workCard} ${isFeatured ? styles.featuredWork : ""}`}
      aria-label={`${work.title}${work.client ? ` - ${work.client}` : ""}`}
    >
      <div className={styles.workImageWrapper}>
        {hasImage ? (
          <Image
            src={work.images[0]}
            alt={work.title}
            fill
            sizes={isFeatured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 30vw"}
            className={styles.workImage}
          />
        ) : (
          <div className={styles.workImagePlaceholder} aria-hidden="true">
            <div className={styles.placeholderPattern} />
          </div>
        )}
        <div className={styles.workOverlay} aria-hidden="true" />
      </div>

      <div className={styles.workContent}>
        <h3 className={styles.workTitle}>{work.title}</h3>
        {work.client && (
          <p className={styles.workClient}>{work.client}</p>
        )}
        {work.tags && work.tags.length > 0 && (
          <div className={styles.workTags}>
            {work.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
