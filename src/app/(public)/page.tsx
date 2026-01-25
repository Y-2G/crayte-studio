import type { Metadata } from "next";
import Link from "next/link";
import { getRecentPosts, getRecentWorks } from "@/lib/data";
import { Button } from "@/components/shared/Button/Button";
import { Card, CardBody } from "@/components/shared/Card/Card";
import { HeroVideo } from "@/components/public/HeroVideo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "crayte studio | Web制作・イベント企画",
  description:
    "株式会社CRAYTE STUDIOは、Webサイト制作、イベント企画・運営、映像制作を手がけるクリエイティブカンパニーです。想像から始まる価値創造で、クライアントのビジネスをサポートします。",
};

export default async function HomePage() {
  const recentWorks = await getRecentWorks(3);
  const recentPosts = await getRecentPosts(3);

  const services = [
    {
      title: "Web制作",
      description:
        "コーポレートサイト、ECサイト、Webアプリケーションなど、目的に合わせた最適なWeb制作を提供します。",
      icon: "🌐",
      link: "/services#web",
    },
    {
      title: "イベント企画・運営",
      description:
        "企画から当日運営まで一貫してサポート。記憶に残る体験を創出します。",
      icon: "🎪",
      link: "/services#event",
    },
    {
      title: "映像制作",
      description:
        "ブランドストーリーを映像で表現。企業PR、ドキュメンタリー、CM制作など幅広く対応。",
      icon: "🎬",
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
            crayte studioは、Web制作・イベント企画・映像制作を通じて、
            <br />
            クライアントの潜在ニーズを引き出し、新しい価値を創造します。
          </p>
          <div className={styles.heroCta}>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                お問い合わせ
              </Button>
            </Link>
            <Link href="/works">
              <Button variant="ghost" size="lg">
                実績を見る
              </Button>
            </Link>
          </div>
        </div>
      </HeroVideo>

      {/* Services Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>サービス</h2>
          <p className={styles.sectionDescription}>
            3つのコア領域で、クライアントのビジネスをサポートします
          </p>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.link}
                className={styles.serviceLink}
              >
                <Card
                  variant="bordered"
                  padding="lg"
                  className={styles.serviceCard}
                >
                  <CardBody>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>

          <div className={styles.sectionCta}>
            <Link href="/services">
              <Button variant="secondary">サービス詳細を見る</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section
        className={styles.section}
        style={{ backgroundColor: "var(--public-bg-alt)" }}
      >
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>実績</h2>
          <p className={styles.sectionDescription}>最近の実績をご紹介します</p>

          <div className={styles.worksGrid}>
            {recentWorks.map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.slug}`}
                className={styles.workLink}
              >
                <Card
                  variant="elevated"
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
                    <h3 className={styles.workTitle}>{work.title}</h3>
                    <p className={styles.workClient}>{work.client}</p>
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

          <div className={styles.sectionCta}>
            <Link href="/works">
              <Button variant="secondary">実績一覧を見る</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>News</h2>
          <p className={styles.sectionDescription}>最新のお知らせ</p>

          <div className={styles.newsList}>
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className={styles.newsItem}
              >
                <time className={styles.newsDate}>
                  {new Date(
                    post.publishedAt || post.createdAt,
                  ).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </time>
                <span className={styles.newsCategory}>{post.category}</span>
                <h3 className={styles.newsTitle}>{post.title}</h3>
              </Link>
            ))}
          </div>

          <div className={styles.sectionCta}>
            <Link href="/news">
              <Button variant="secondary">一覧を見る</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>お気軽にご相談ください</h2>
          <p className={styles.ctaDescription}>
            プロジェクトに関するご相談、お見積もりなど、
            <br />
            お気軽にお問い合わせください。
          </p>
          <div className={styles.ctaCta}>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                お問い合わせ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
