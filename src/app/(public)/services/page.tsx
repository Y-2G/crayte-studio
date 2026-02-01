import type { Metadata } from "next";
import Image from "next/image";
import { WebIcon, EventIcon, VideoIcon } from "@/components/icons";
import { CtaBlock } from "@/components/public/CtaBlock/CtaBlock";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "サービス | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOが提供するサービスをご紹介します。Web制作、イベント企画・運営、映像制作を通じて、クライアントの価値創造をサポートします。",
};

interface ServiceCard {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
}

const webCards: ServiceCard[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
    ),
    iconColor: "#FF1493",
    iconBg: "#FF14930f",
    title: "コーポレートサイト",
    description: "企業の顔となるWebサイトを、ブランディングからUI/UXまで一貫して設計・構築します。",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
    ),
    iconColor: "#9370DB",
    iconBg: "#9370DB0f",
    title: "ECサイト",
    description: "Shopify等を活用し、売上を最大化するECサイトを構築。決済・物流連携まで対応します。",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
    ),
    iconColor: "#00BFFF",
    iconBg: "#00BFFF0f",
    title: "Webアプリケーション",
    description: "React/Next.jsなどモダン技術を駆使し、高速で使いやすいWebアプリを開発します。",
  },
];

const eventCards: ServiceCard[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
    ),
    iconColor: "#9370DB",
    iconBg: "#9370DB15",
    title: "企画・コンセプト設計",
    description: "ターゲットに響くコンセプトを策定。目的達成に最適なイベント設計を行います。",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    iconColor: "#00BFFF",
    iconBg: "#00BFFF15",
    title: "当日運営・進行管理",
    description: "当日のスタッフ配置から進行管理まで、トラブルなくスムーズに運営します。",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
    ),
    iconColor: "#FF1493",
    iconBg: "#FF149315",
    title: "プロモーション連動",
    description: "SNS施策やWeb連動で、イベント効果を最大化。事後レポートまでサポートします。",
  },
];

const videoCards: ServiceCard[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><path d="m7 2 5 5-5 5" /><line x1="2" y1="12" x2="22" y2="12" /></svg>
    ),
    iconColor: "#00BFFF",
    iconBg: "#00BFFF0f",
    title: "企業PR・ブランディング",
    description: "企業の世界観を映像で伝える。ブランドムービーやコンセプト映像を制作します。",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" /><path d="m6.2 5.3 3.1 3.9" /><path d="m12.4 3.4 3.1 4" /><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /></svg>
    ),
    iconColor: "#FF1493",
    iconBg: "#FF14930f",
    title: "CM・プロモーション映像",
    description: "商品やサービスの魅力を最大限に引き出す、インパクトのあるCM・広告映像を制作。",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
    ),
    iconColor: "#9370DB",
    iconBg: "#9370DB0f",
    title: "ドキュメンタリー・取材映像",
    description: "リアルなストーリーで共感を生む。取材・インタビュー映像の企画から編集まで。",
  },
];

const workflowSteps = [
  {
    step: 1,
    title: "お問い合わせ",
    description: "まずはお気軽にご相談ください。ご要望をヒアリングします。",
    gradient: "linear-gradient(135deg, #FF1493, #9370DB)",
  },
  {
    step: 2,
    title: "企画・提案",
    description: "課題を分析し、最適なプランをご提案いたします。",
    gradient: "linear-gradient(135deg, #9370DB, #00BFFF)",
  },
  {
    step: 3,
    title: "制作・実行",
    description: "プロフェッショナルチームが制作を進行します。",
    gradient: "linear-gradient(135deg, #00BFFF, #FF1493)",
  },
  {
    step: 4,
    title: "納品・サポート",
    description: "納品後もアフターフォローで長期的にサポートします。",
    gradient: "linear-gradient(135deg, #FF1493, #00BFFF)",
  },
];

function ServiceCardItem({ card, variant }: { card: ServiceCard; variant: "light" | "dark" }) {
  return (
    <div className={variant === "dark" ? styles.cardDark : styles.cardLight}>
      <div
        className={styles.cardIconWrap}
        style={{ backgroundColor: card.iconBg }}
      >
        <span style={{ color: card.iconColor }}>{card.icon}</span>
      </div>
      <div className={styles.cardText}>
        <h3 className={variant === "dark" ? styles.cardTitleDark : styles.cardTitleLight}>
          {card.title}
        </h3>
        <p className={variant === "dark" ? styles.cardDescDark : styles.cardDescLight}>
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow1} aria-hidden="true" />
        <div className={styles.heroGlow2} aria-hidden="true" />
        <div className={styles.heroGlow3} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>SERVICE</span>
          <h1 className={styles.heroTitle}>サービス</h1>
          <p className={styles.heroSubtitle}>
            Web制作・イベント企画・映像制作の3つの柱で、
            <br />
            クライアントのビジョンを形にします。
          </p>
        </div>
      </section>

      {/* Web Production Section */}
      <section className={styles.sectionLight} id="web">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumPink}>01</span>
            <div className={styles.iconWrapPink}>
              <WebIcon size={40} color="#ffffff" />
            </div>
            <h2 className={styles.sectionTitleDark}>Web制作</h2>
            <p className={styles.sectionDescMuted}>
              コーポレートサイト、ECサイト、Webアプリケーションなど、
              <br />
              目的に合わせた最適なWeb制作を提供します。
            </p>
          </div>
          <div className={styles.contentRow}>
            <div className={styles.imageWrap}>
              <Image
                src="https://images.unsplash.com/photo-1746289271913-12e4d839c045?w=1080&q=80"
                alt="Web制作のイメージ"
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.cardsColumn}>
              {webCards.map((card) => (
                <ServiceCardItem key={card.title} card={card} variant="light" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section className={styles.sectionDark} id="event">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumPurple}>02</span>
            <div className={styles.iconWrapPurple}>
              <EventIcon size={40} color="#ffffff" />
            </div>
            <h2 className={styles.sectionTitleLight}>イベント企画・運営</h2>
            <p className={styles.sectionDescLight}>
              企画立案から当日の運営まで一貫してサポート。
              <br />
              記憶に残る体験を創出し、ブランド価値を高めます。
            </p>
          </div>
          <div className={styles.contentRowReverse}>
            <div className={styles.cardsColumn}>
              {eventCards.map((card) => (
                <ServiceCardItem key={card.title} card={card} variant="dark" />
              ))}
            </div>
            <div className={styles.imageWrap}>
              <Image
                src="https://images.unsplash.com/photo-1571917687771-094c2a557ed4?w=1080&q=80"
                alt="イベント企画のイメージ"
                fill
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Production Section */}
      <section className={styles.sectionLight} id="video">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumCyan}>03</span>
            <div className={styles.iconWrapCyan}>
              <VideoIcon size={40} color="#ffffff" />
            </div>
            <h2 className={styles.sectionTitleDark}>映像制作</h2>
            <p className={styles.sectionDescMuted}>
              ブランドストーリーを映像で表現。企業PR、
              <br />
              ドキュメンタリー、CM制作など幅広く対応します。
            </p>
          </div>
          <div className={styles.contentRow}>
            <div className={styles.imageWrap}>
              <Image
                src="https://images.unsplash.com/photo-1707825982640-61e75a225630?w=1080&q=80"
                alt="映像制作のイメージ"
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.cardsColumn}>
              {videoCards.map((card) => (
                <ServiceCardItem key={card.title} card={card} variant="light" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className={styles.workflowSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.heroLabel}>WORKFLOW</span>
            <h2 className={styles.sectionTitleLight}>制作の流れ</h2>
            <p className={styles.sectionDescLight}>
              お問い合わせから納品まで、スムーズなプロセスをお約束します。
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {workflowSteps.map((item) => (
              <div key={item.step} className={styles.stepItem}>
                <div
                  className={styles.stepNum}
                  style={{ background: item.gradient }}
                >
                  <span className={styles.stepNumText}>{item.step}</span>
                </div>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaBlock />
    </div>
  );
}
