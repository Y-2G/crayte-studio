import type { Metadata } from 'next';
import { ContactForm } from '@/components/public/ContactForm/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'お問い合わせ | crayte studio',
  description: 'crayte studioへのお問い合わせ、ご相談はこちらから。プロジェクトに関するご相談、お見積もりなど、お気軽にお問い合わせください。',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>お問い合わせ</h1>
          <p className={styles.pageSubtitle}>Contact Us</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <p className={styles.introText}>
              プロジェクトに関するご相談、お見積もりなど、お気軽にお問い合わせください。
              <br />
              担当者より2営業日以内にご連絡させていただきます。
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>お電話でのお問い合わせ</h3>
              <p className={styles.infoText}>
                平日 10:00 - 18:00<br />
                （土日祝日を除く）
              </p>
              <p className={styles.infoPhone}>03-XXXX-XXXX</p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>メールでのお問い合わせ</h3>
              <p className={styles.infoText}>
                24時間受付<br />
                2営業日以内に返信いたします
              </p>
              <p className={styles.infoEmail}>info@crayte-studio.co.jp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
