import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "404 Not Found | CRAYTE STUDIO",
};

export default function KeyPage() {
  return (
    <div className={styles.page}>
      <p className={styles.text}>404 Not Found.</p>
    </div>
  );
}
