import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "会社概要 | CRAYTE STUDIO",
  description:
    "株式会社CRAYTE STUDIOの会社情報、ミッション・ビジョン、沿革をご紹介します。",
};

export default function CompanyPage() {
  const companyInfo = [
    { label: "社名", value: "株式会社CRAYTE STUDIO（クレイトスタジオ）" },
    {
      label: "所在地",
      value: "〒150-0002 東京都渋谷区渋谷2-21-1 渋谷ヒカリエ 15F",
    },
    { label: "設立", value: "2015年4月1日" },
    { label: "代表取締役", value: "田中 一郎" },
    { label: "資本金", value: "5,000万円" },
    { label: "事業内容", value: "Web制作、イベント企画・運営、映像制作" },
  ];

  const history = [
    { year: "2015年", event: "株式会社CRAYTE STUDIO設立。Web制作事業を開始" },
    { year: "2016年", event: "イベント企画・運営事業を開始" },
    { year: "2017年", event: "映像制作事業を開始。従業員10名に拡大" },
    { year: "2018年", event: "オフィスを拡張移転（渋谷区内）" },
    { year: "2020年", event: "リモートワーク体制を導入" },
    { year: "2022年", event: "従業員20名に拡大" },
    { year: "2024年", event: "渋谷ヒカリエに本社移転" },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>会社概要</h1>
          <p className={styles.pageSubtitle}>Company Profile</p>
        </div>
      </section>

      {/* Company Info */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>会社情報</h2>
          <table className={styles.table}>
            <tbody>
              {companyInfo.map((item) => (
                <tr key={item.label}>
                  <th className={styles.tableHeader}>{item.label}</th>
                  <td className={styles.tableCell}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className={styles.section}
        style={{ backgroundColor: "var(--public-bg-alt)" }}
      >
        <div className={styles.container}>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <h2 className={styles.missionTitle}>ミッション</h2>
              <p className={styles.missionText}>
                想像は現実へ。
                <br />
                クライアントの潜在的なニーズを丁寧にヒアリングし、
                <br />
                本質的な課題を見極め、最適なソリューションを提供します。
              </p>
            </div>
            <div className={styles.missionCard}>
              <h2 className={styles.missionTitle}>ビジョン</h2>
              <p className={styles.missionText}>
                デジタルとリアルを融合した体験設計で、
                <br />
                人々の記憶に残る価値を創造し続ける企業を目指します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>沿革</h2>
          <div className={styles.timeline}>
            {history.map((item) => (
              <div key={item.year} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineEvent}>{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access */}
      <section
        className={styles.section}
        style={{ backgroundColor: "var(--public-bg-alt)" }}
      >
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>アクセス</h2>
          <div className={styles.access}>
            <div className={styles.accessInfo}>
              <h3 className={styles.accessTitle}>所在地</h3>
              <address className={styles.accessAddress}>
                〒150-0002
                <br />
                東京都渋谷区渋谷2-21-1
                <br />
                渋谷ヒカリエ 15F
              </address>
              <div className={styles.accessTransit}>
                <h4 className={styles.accessSubtitle}>交通</h4>
                <ul className={styles.accessList}>
                  <li>JR線・東京メトロ・東急線「渋谷駅」直結</li>
                  <li>東京メトロ副都心線「渋谷駅」15番出口直結</li>
                </ul>
              </div>
            </div>
            <div className={styles.mapPlaceholder}>
              <p className={styles.mapText}>地図</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
