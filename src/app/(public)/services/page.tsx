import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/shared/Button/Button";
import { Card, CardBody } from "@/components/shared/Card/Card";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "サービス | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOが提供するサービスをご紹介します。Web制作、イベント企画・運営、映像制作を通じて、クライアントの価値創造をサポートします。",
};

export default function ServicesPage() {
  const services = [
    {
      id: "web",
      title: "Web制作",
      icon: "🌐",
      description:
        "コーポレートサイト、ECサイト、Webアプリケーションなど、目的に合わせた最適なWeb制作を提供します。",
      features: [
        "コーポレートサイト制作",
        "ECサイト構築",
        "Webアプリケーション開発",
        "レスポンシブデザイン",
        "CMS導入・カスタマイズ",
        "SEO対策",
      ],
    },
    {
      id: "event",
      title: "イベント企画・運営",
      icon: "🎪",
      description:
        "企画から当日運営まで一貫してサポート。記憶に残る体験を創出します。",
      features: [
        "イベント企画立案",
        "会場手配・設営",
        "運営スタッフ手配",
        "プロモーション支援",
        "当日運営サポート",
        "事後レポート作成",
      ],
    },
    {
      id: "video",
      title: "映像制作",
      icon: "🎬",
      description:
        "ブランドストーリーを映像で表現。企業PR、ドキュメンタリー、CM制作など幅広く対応。",
      features: [
        "企業PR映像",
        "イベント撮影・編集",
        "ドキュメンタリー制作",
        "CM制作",
        "ライブ配信",
        "アニメーション制作",
      ],
    },
  ];

  const flow = [
    {
      step: 1,
      title: "お問い合わせ",
      description: "まずはお気軽にご相談ください",
    },
    { step: 2, title: "ヒアリング", description: "ご要望や課題をお伺いします" },
    {
      step: 3,
      title: "ご提案・お見積もり",
      description: "最適なプランをご提案します",
    },
    { step: 4, title: "制作・実施", description: "プロジェクトを実行します" },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>サービス</h1>
          <p className={styles.pageSubtitle}>Services</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className={styles.serviceSection}
              >
                <Card
                  variant="bordered"
                  padding="lg"
                  className={styles.serviceCard}
                >
                  <CardBody>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                    <h3 className={styles.featuresTitle}>主な提供サービス</h3>
                    <ul className={styles.featuresList}>
                      {service.features.map((feature) => (
                        <li key={feature} className={styles.feature}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.flowSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>ご依頼の流れ</h2>
          <div className={styles.flowGrid}>
            {flow.map((item) => (
              <div key={item.step} className={styles.flowItem}>
                <div className={styles.flowStep}>STEP {item.step}</div>
                <h3 className={styles.flowTitle}>{item.title}</h3>
                <p className={styles.flowDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>お気軽にご相談ください</h2>
          <p className={styles.ctaDescription}>
            プロジェクトに関するご相談、お見積もりなど、お気軽にお問い合わせください。
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              お問い合わせ
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
