import type { Metadata } from "next";
import { Header } from "@/components/public/Header/Header";
import { Footer } from "@/components/public/Footer/Footer";
import { GradientButton } from "@/components/shared/GradientButton";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - ページが見つかりません | CRAYTE STUDIO",
  description:
    "お探しのページは存在しないか、移動した可能性があります。URLをご確認いただくか、トップページからお探しください。",
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero} aria-label="404エラー">
        {/* Glow Effects */}
        <div className={styles.glow1} aria-hidden="true" />
        <div className={styles.glow2} aria-hidden="true" />
        <div className={styles.glow3} aria-hidden="true" />

        {/* Decorative Elements */}
        <div className={styles.decor1} aria-hidden="true" />
        <div className={styles.decor2} aria-hidden="true" />
        <div className={styles.decor3} aria-hidden="true" />

        {/* Main Content */}
        <div className={styles.content}>
          <h1 className={styles.errorCode}>404</h1>
          <p className={styles.title}>ページが見つかりません</p>
          <p className={styles.description}>
            お探しのページは存在しないか、移動した可能性があります。
            <br />
            URLをご確認いただくか、トップページからお探しください。
          </p>
          <div className={styles.buttonGroup}>
            <GradientButton href="/" variant="dark" size="md" filled>
              トップページへ戻る
            </GradientButton>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
