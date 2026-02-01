import { GradientButton } from "@/components/shared/GradientButton";
import styles from "./CtaBlock.module.css";

interface CtaBlockProps {
  titleEn?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function CtaBlock({
  titleEn = "Let's Create Something\n Amazing Together",
  subtitle = "あなたのビジョンを、私たちと一緒に形にしませんか。",
  buttonText = "お問い合わせ",
  buttonLink = "/contact",
  className,
}: CtaBlockProps) {
  return (
    <section
      className={`${styles.ctaSection} ${className || ""}`}
      aria-labelledby="cta-heading"
    >
      <div className={styles.ctaContainer}>
        <h2 id="cta-heading" className={styles.ctaTitle}>
          {titleEn}
        </h2>
        {subtitle && <p className={styles.ctaSubtitle}>{subtitle}</p>}
        <div className={styles.ctaButtonWrapper}>
          <GradientButton href={buttonLink} variant="dark" size="lg" filled>
            {buttonText}
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
