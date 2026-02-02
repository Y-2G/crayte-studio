import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/public/ContactForm/ContactForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "お問い合わせ | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOへのお問い合わせ、ご相談はこちらから。プロジェクトに関するご相談、お見積もりなど、お気軽にお問い合わせください。",
};

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 15 12" />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
      <path d="m9 15-1-1" />
      <path d="m15 15 1-1" />
      <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
      <path d="m8 19-2 3" />
      <path d="m16 19 2 3" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`${styles.heroGlow} ${styles.heroGlow1}`} />
        <div className={`${styles.heroGlow} ${styles.heroGlow2}`} />
        <div className={`${styles.heroGlow} ${styles.heroGlow3}`} />
        <div className={styles.heroDecor1} />
        <div className={styles.heroDecor2} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>CONTACT</span>
          <h1 className={styles.heroTitle}>お問い合わせ</h1>
          <p className={styles.heroSubtitle}>
            プロジェクトに関するご相談、お見積もりなど、お気軽にお問い合わせください。
            <br />
            担当者より2営業日以内にご連絡させていただきます。
          </p>
        </div>
      </section>

      {/* Contact Form + Info Panel */}
      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>CONTACT FORM</span>
          <h2 className={styles.sectionTitle}>お問い合わせフォーム</h2>
          <p className={styles.sectionDesc}>
            以下のフォームに必要事項をご記入の上、送信してください。
          </p>
        </div>
        <div className={styles.contentRow}>
          <ContactForm />

          {/* Info Panel */}
          <div className={styles.infoPanel}>
            {/* 直接連絡カード */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>直接のご連絡</h3>
              <div className={styles.infoItem}>
                <MailIcon className={styles.infoIcon} />
                <a
                  href="mailto:info@crayte-studio.co.jp"
                  className={styles.infoItemLink}
                >
                  info@crayte-studio.co.jp
                </a>
              </div>
              <div className={styles.infoItem}>
                <PhoneIcon className={styles.infoIcon} />
                <span>03-XXXX-XXXX</span>
              </div>
            </div>

            {/* 営業時間カード */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>
                <ClockIcon className={styles.infoCardIcon} />
                営業時間
              </h3>
              <div className={styles.hoursRow}>
                <span className={styles.hoursDay}>平日</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className={styles.hoursRow}>
                <span className={styles.hoursDay}>土日祝</span>
                <span>休業</span>
              </div>
            </div>

            {/* アクセスカード */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>アクセス</h3>
              <p className={styles.accessCardText}>
                {"〒530-0001\n大阪府大阪市北区梅田1-1-3\n大阪駅前第3ビル 29F"}
              </p>
              <div className={styles.accessCardStation}>
                <TrainIcon className={styles.accessCardStationIcon} />
                <span>JR大阪駅 徒歩5分 / 梅田駅 徒歩3分</span>
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
        <div className={styles.ctaDecor1} />
        <div className={styles.ctaDecor2} />
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Let&apos;s Create Something
            <br />
            Amazing Together
          </h2>
          <p className={styles.ctaSubtitle}>
            あなたのビジョンを、私たちと一緒に形にしませんか。
          </p>
          <Link href="/careers" className={styles.ctaButton}>
            採用情報を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
