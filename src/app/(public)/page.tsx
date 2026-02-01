import type { Metadata } from "next";
import { getRecentPosts, getRecentWorks } from "@/lib/data";
import { GradientButton } from "@/components/shared/GradientButton";
import { HeroVideo } from "@/components/public/HeroVideo";
import { NewsTimeline } from "@/components/public/NewsTimeline";
import { ServiceShowcase } from "@/components/public/ServiceShowcase";
import { WorksGallery } from "@/components/public/WorksGallery";
import { StatsCounter } from "@/components/public/StatsCounter";
import { CtaBlock } from "@/components/public/CtaBlock";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CRAYTE STUDIO | Web制作・イベント企画",
  description:
    "株式会社CRAYTE STUDIOは、Webサイト制作、イベント企画・運営、映像制作を手がけるクリエイティブカンパニーです。想像から始まる価値創造で、クライアントのビジネスをサポートします。",
};

export default async function HomePage() {
  const recentWorks = await getRecentWorks(4);
  const recentPosts = await getRecentPosts(3);

  const services = [
    {
      title: "Web制作",
      titleEn: "Web Development",
      description:
        "コーポレートサイト、ECサイト、Webアプリケーションなど、目的に合わせた最適なWeb制作を提供します。",
      tags: ["Corporate", "EC", "Web App"],
      icon: "web" as const,
      link: "/services#web",
    },
    {
      title: "イベント企画・運営",
      titleEn: "Event Planning",
      description:
        "企画から当日運営まで一貫してサポート。記憶に残る体験を創出します。",
      tags: ["Planning", "Operation", "Hybrid"],
      icon: "event" as const,
      link: "/services#event",
    },
    {
      title: "映像制作",
      titleEn: "Video Production",
      description:
        "ブランドストーリーを映像で表現。企業PR、ドキュメンタリー、CM制作など幅広く対応。",
      tags: ["PR", "Documentary", "CM"],
      icon: "video" as const,
      link: "/services#video",
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <HeroVideo videoSrc="/movies/CRAYTE.mp4" loopDelay={0}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            創造は加速する。
            <br />
            想像は現実へ。
          </h1>
          <p className={styles.heroSubtitle}>
            CRAYTE STUDIOは、Web制作・イベント企画・映像制作を通じて、
            <br />
            クライアントの潜在ニーズを引き出し、新しい価値を創造します。
          </p>
          <div className={styles.heroCta}>
            <GradientButton
              href="/contact"
              variant="dark"
              size="lg"
              filled
              className={styles.heroCtaButton}
            >
              お問い合わせ
            </GradientButton>
            <GradientButton
              href="/articles?filter=works"
              variant="dark"
              size="lg"
              className={styles.heroCtaButton}
            >
              制作実績を見る
            </GradientButton>
          </div>
        </div>
      </HeroVideo>

      {/* News Section */}
      <ScrollReveal>
        <NewsTimeline posts={recentPosts} />
      </ScrollReveal>

      {/* Services Section */}
      <ScrollReveal>
        <ServiceShowcase services={services} />
      </ScrollReveal>

      {/* Works Section */}
      <ScrollReveal>
        <WorksGallery works={recentWorks} />
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal>
        <StatsCounter />
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <CtaBlock />
      </ScrollReveal>
    </div>
  );
}
