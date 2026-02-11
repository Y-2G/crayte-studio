import type { Metadata } from "next";
import { ToolsClient } from "./ToolsClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tools — CRAYTE STUDIO Admin",
  description: "ツール",
};

export default function AdminToolsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>ツール</h1>
      <ToolsClient />
    </div>
  );
}
