import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "会社概要 | CRAYTE STUDIO",
  description:
    "株式会社CRAYTE STUDIOの会社情報、ミッション・ビジョン、沿革をご紹介します。",
};

const companyInfo = [
  { label: "会社名", value: "株式会社CRAYTE STUDIO" },
  { label: "設立", value: "2024年4月" },
  { label: "代表者", value: "代表取締役 田中 一郎" },
  {
    label: "所在地",
    value: "〒530-0001\n大阪府大阪市北区梅田1-1-3 大阪駅前第3ビル 29F",
  },
  {
    label: "事業内容",
    value:
      "Web制作・Webマーケティング\nイベント企画・運営\n映像制作・動画マーケティング\nブランディング・クリエイティブ制作",
  },
  { label: "URL", value: "https://crayte-studio.com", isLink: true },
] as const;

const history = [
  {
    date: "2024年4月",
    title: "株式会社CRAYTE STUDIO 設立",
    desc: "大阪市北区梅田に本社を設立。Web制作・イベント企画・映像制作を軸にした総合クリエイティブカンパニーとして事業を開始。",
    dotColor: "pink" as const,
  },
  {
    date: "2024年6月",
    title: "Web制作事業 本格始動",
    desc: "コーポレートサイト・LP制作を中心に、Webマーケティング支援を含む統合的なWeb制作サービスの提供を開始。",
    dotColor: "pink" as const,
  },
  {
    date: "2024年9月",
    title: "イベント企画・運営事業 開始",
    desc: "企業向けイベントの企画・運営サービスを開始。デジタルとリアルを融合したハイブリッドイベントの提供を実現。",
    dotColor: "purple" as const,
  },
  {
    date: "2024年12月",
    title: "映像制作事業 開始",
    desc: "企業PR映像・プロモーション動画の制作サービスを開始。SNSマーケティングと連携した動画コンテンツの企画・制作を展開。",
    dotColor: "purple" as const,
  },
  {
    date: "2025年〜",
    title: "さらなる成長へ",
    desc: "ブランディング・クリエイティブ制作の領域を拡大。クライアントと共に成長するパートナーとして、新しい挑戦を続けています。",
    dotColor: "cyan" as const,
  },
];

const dotColorMap = {
  pink: styles.timelineDotPink,
  purple: styles.timelineDotPurple,
  cyan: styles.timelineDotCyan,
} as const;

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#gradPinkCyan)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradPinkCyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF1493" />
          <stop offset="100%" stopColor="#00BFFF" />
        </linearGradient>
      </defs>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#gradPurpleCyan)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradPurpleCyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9370DB" />
          <stop offset="100%" stopColor="#00BFFF" />
        </linearGradient>
      </defs>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#gradPinkCyanAccess)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradPinkCyanAccess" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF1493" />
          <stop offset="100%" stopColor="#00BFFF" />
        </linearGradient>
      </defs>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#gradPurpleCyanTrain)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradPurpleCyanTrain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9370DB" />
          <stop offset="100%" stopColor="#00BFFF" />
        </linearGradient>
      </defs>
      <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
      <path d="m9 15-1-1" />
      <path d="m15 15 1-1" />
      <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
      <path d="m8 19-2 3" />
      <path d="m16 19 2 3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#gradPinkPurple)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="gradPinkPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF1493" />
          <stop offset="100%" stopColor="#9370DB" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 15 12" />
    </svg>
  );
}

function MapPinLargeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`${styles.heroGlow} ${styles.heroGlow1}`} />
        <div className={`${styles.heroGlow} ${styles.heroGlow2}`} />
        <div className={`${styles.heroGlow} ${styles.heroGlow3}`} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>ABOUT</span>
          <h1 className={styles.heroTitle}>会社概要</h1>
          <p className={styles.heroSubtitle}>
            創造力とテクノロジーで、新しい価値を届ける。
            <br />
            CRAYTE STUDIOの想いとこれまでの歩みをご紹介します。
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className={styles.companyInfo}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>COMPANY</span>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
            会社情報
          </h2>
        </div>
        <div className={styles.infoTable}>
          {companyInfo.map((item, i) => (
            <div
              key={item.label}
              className={`${styles.infoRow} ${
                i === companyInfo.length - 1 ? styles.infoRowLast : ""
              }`}
            >
              <div className={styles.infoLabel}>{item.label}</div>
              <div className={styles.infoValue}>
                {"isLink" in item && item.isLink ? (
                  <a
                    href={item.value}
                    className={styles.infoValueLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionVision}>
        <div className={`${styles.mvGlow} ${styles.mvGlow1}`} />
        <div className={`${styles.mvGlow} ${styles.mvGlow2}`} />
        <div className={styles.mvContent}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>MISSION & VISION</span>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
              ミッション・ビジョン
            </h2>
          </div>
          <div className={styles.mvCards}>
            {/* Mission Card */}
            <div className={styles.mvCard}>
              <RocketIcon className={styles.mvIcon} />
              <span
                className={`${styles.mvCardLabel} ${styles.mvCardLabelMission}`}
              >
                MISSION
              </span>
              <h3 className={styles.mvCardTitle}>
                {"創造は加速する。\n想像は現実へ。"}
              </h3>
              <p className={styles.mvCardDesc}>
                私たちは、Web制作・イベント企画・映像制作を融合させ、クライアントの潜在ニーズを引き出し、まだ世の中にない新しい価値を創造します。テクノロジーとクリエイティビティの力で、想像を超える体験を実現します。
              </p>
            </div>
            {/* Vision Card */}
            <div className={styles.mvCard}>
              <EyeIcon className={styles.mvIcon} />
              <span
                className={`${styles.mvCardLabel} ${styles.mvCardLabelVision}`}
              >
                VISION
              </span>
              <h3 className={styles.mvCardTitle}>
                {"クリエイティブで、\n世界をもっと面白く。"}
              </h3>
              <p className={styles.mvCardDesc}>
                すべての企業・個人が、最高品質のクリエイティブを手にできる世界を目指します。デジタルとリアルの境界を超え、人々の心を動かすコンテンツで、社会に新しい感動と可能性を届けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className={styles.history}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>HISTORY</span>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
            沿革
          </h2>
          <p className={styles.sectionDesc}>
            CRAYTE STUDIOの歩みをご紹介します。
          </p>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {history.map((item) => (
            <div key={item.date} className={styles.timelineItem}>
              <span
                className={`${styles.timelineDot} ${
                  dotColorMap[item.dotColor]
                }`}
              />
              <div className={styles.timelineDate}>{item.date}</div>
              <h3 className={styles.timelineTitle}>{item.title}</h3>
              <p className={styles.timelineDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Access */}
      <section className={styles.access}>
        <div className={styles.accessGlow} />
        <div className={styles.accessContent}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>ACCESS</span>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
              アクセス
            </h2>
          </div>
          <div className={styles.accessBody}>
            <div className={styles.mapPlaceholder}>
              <MapPinLargeIcon className={styles.mapIcon} />
              <p className={styles.mapText}>Google Map</p>
            </div>
            <div className={styles.accessInfo}>
              <div className={styles.accessBlock}>
                <MapPinIcon className={styles.accessIcon} />
                <span className={styles.accessBlockLabel}>所在地</span>
                <p className={styles.accessBlockValue}>
                  {"〒530-0001\n大阪府大阪市北区梅田1-1-3\n大阪駅前第3ビル 29F"}
                </p>
              </div>
              <div className={styles.accessBlock}>
                <TrainIcon className={styles.accessIcon} />
                <span className={styles.accessBlockLabel}>最寄り駅</span>
                <p className={styles.accessBlockValue}>
                  {
                    "JR大阪駅 徒歩5分\n地下鉄御堂筋線 梅田駅 徒歩3分\n阪急 大阪梅田駅 徒歩5分"
                  }
                </p>
              </div>
              <div className={styles.accessBlock}>
                <ClockIcon className={styles.accessIcon} />
                <span className={styles.accessBlockLabel}>営業時間</span>
                <p className={styles.accessBlockValue}>
                  {"平日 10:00 - 19:00\n土日祝 休業"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={`${styles.ctaGlow} ${styles.ctaGlow1}`} />
        <div className={`${styles.ctaGlow} ${styles.ctaGlow2}`} />
        <div className={`${styles.ctaGlow} ${styles.ctaGlow3}`} />
        <div className={`${styles.ctaDecor} ${styles.ctaDecor1}`} />
        <div className={`${styles.ctaDecor} ${styles.ctaDecor2}`} />
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Let&apos;s Create Something
            <br />
            Amazing Together
          </h2>
          <p className={styles.ctaSubtitle}>
            あなたのビジョンを、私たちと一緒に形にしませんか。
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}
