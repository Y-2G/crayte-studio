import type { Metadata } from "next";
import { GradientButton } from "@/components/shared/GradientButton";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "採用情報 | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOの採用情報。Web制作・イベント企画・映像制作の分野で、想像力を共に形にする仲間を募集しています。",
};

const benefits = [
  {
    icon: "laptop",
    title: "フレックス & リモート",
    description: "柔軟な働き方で、最高のパフォーマンスを発揮できる環境を整備。",
  },
  {
    icon: "book-open",
    title: "スキルアップ支援",
    description:
      "書籍購入補助、カンファレンス参加費支給、資格取得支援制度を完備。",
  },
  {
    icon: "heart",
    title: "健康サポート",
    description:
      "充実の社会保険に加え、健康診断オプション無料、メンタルヘルスケア。",
  },
  {
    icon: "users",
    title: "チームビルディング",
    description:
      "定期的なチームイベント、社内勉強会、部活動など交流の場を提供。",
  },
  {
    icon: "calendar",
    title: "休暇制度",
    description: "年間休日120日以上、有給消化率95%。リフレッシュ休暇制度あり。",
  },
  {
    icon: "trending-up",
    title: "キャリア形成",
    description:
      "1on1面談、目標設定制度、社内公募制度でキャリアの可能性を広げる。",
  },
];

const employees = [
  {
    name: "田中 美咲",
    role: "フロントエンドエンジニア",
    year: "2022年入社",
    quote:
      "自分のアイデアを形にできる環境が最高です。新しい技術にもどんどん挑戦できるのが魅力ですね。",
    gradient: "pink-purple",
  },
  {
    name: "佐藤 健太",
    role: "バックエンドエンジニア",
    year: "2021年入社",
    quote:
      "チーム全体で技術を共有し合う文化があり、日々成長を実感しています。風通しの良さが自慢です。",
    gradient: "purple-cyan",
  },
  {
    name: "山田 花子",
    role: "UIデザイナー",
    year: "2023年入社",
    quote:
      "デザインとエンジニアの距離が近く、ユーザーに本当に届くプロダクトを作れている実感があります。",
    gradient: "cyan-pink",
  },
];

const stats = [
  { value: "2020", label: "設立年", gradient: "pink-purple" },
  { value: "30+", label: "社員数", gradient: "purple-cyan" },
  { value: "28", label: "平均年齢", gradient: "cyan-pink" },
  { value: "80%", label: "リモート率", gradient: "pink-cyan" },
  { value: "95%", label: "有給消化率", gradient: "purple-pink" },
  { value: "4.8", label: "社員満足度", gradient: "cyan-purple" },
];

const jobs = [
  {
    title: "フロントエンドエンジニア",
    type: "正社員",
    location: "東京 / リモート可",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "バックエンドエンジニア",
    type: "正社員",
    location: "東京 / リモート可",
    tags: ["Node.js", "Python", "AWS"],
  },
  {
    title: "UIデザイナー",
    type: "正社員",
    location: "東京 / リモート可",
    tags: ["Figma", "UI/UX", "Design System"],
  },
  {
    title: "プロジェクトマネージャー",
    type: "正社員",
    location: "東京",
    tags: ["PM", "Agile", "Communication"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "エントリー",
    description: "Webフォームからご応募ください",
  },
  {
    step: "02",
    title: "書類選考",
    description: "履歴書・ポートフォリオを拝見します",
  },
  {
    step: "03",
    title: "1次面接",
    description: "オンラインでカジュアルに対話",
  },
  {
    step: "04",
    title: "最終面接",
    description: "代表との面接でビジョンを共有",
  },
  {
    step: "05",
    title: "内定",
    description: "おめでとうございます！一緒に働きましょう",
  },
];

export default function CareersPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="採用トップ">
        <div className={styles.heroGlow1} aria-hidden="true" />
        <div className={styles.heroGlow2} aria-hidden="true" />
        <div className={styles.heroGlow3} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>想像力を、共に形に。</h1>
          <p className={styles.heroSubtitle}>
            CRAYTE STUDIOでは、Webの力で世界を変える
            <br />
            情熱を持った仲間を募集しています。
          </p>
          <GradientButton href="#positions" variant="dark" size="lg" filled>
            募集を見る
          </GradientButton>
        </div>
        <div className={styles.heroDecor1} aria-hidden="true" />
        <div className={styles.heroDecor2} aria-hidden="true" />
      </section>

      {/* Business Section */}
      <ScrollReveal>
        <section className={styles.businessSection} aria-label="事業内容">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>BUSINESS</span>
            <h2 className={styles.sectionTitle}>事業内容</h2>
            <p className={styles.sectionDescription}>
              テクノロジーとクリエイティブの融合で、
              <br />
              クライアントのビジネスを次のステージへ導きます。
            </p>
          </div>
          <div className={styles.businessGrid}>
            <div className={styles.businessCard}>
              <div
                className={`${styles.businessIcon} ${styles.iconPinkPurple}`}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className={styles.businessCardTitle}>Web制作</h3>
              <p className={styles.businessCardDesc}>
                コーポレートサイト、EC、LP等の企画・設計からデザイン・開発まで。ユーザー体験を重視した高品質なWebサイトを制作します。
              </p>
            </div>
            <div className={styles.businessCard}>
              <div
                className={`${styles.businessIcon} ${styles.iconPurpleCyan}`}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className={styles.businessCardTitle}>イベント企画・運営</h3>
              <p className={styles.businessCardDesc}>
                展示会、セミナー、カンファレンスなど多様なイベントの企画から運営までをトータルでサポートします。
              </p>
            </div>
            <div className={styles.businessCard}>
              <div className={`${styles.businessIcon} ${styles.iconCyanPink}`}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className={styles.businessCardTitle}>映像制作</h3>
              <p className={styles.businessCardDesc}>
                プロモーション映像、企業VP、SNS動画など、目的に応じた高品質な映像コンテンツを制作します。
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Benefits Section */}
      <ScrollReveal>
        <section className={styles.benefitsSection} aria-label="福利厚生">
          <div className={styles.benefitsGlow1} aria-hidden="true" />
          <div className={styles.benefitsGlow2} aria-hidden="true" />
          <div className={styles.benefitsContent}>
            <div className={styles.sectionHeader}>
              <span className={`${styles.sectionLabel} ${styles.labelCyan}`}>
                BENEFITS
              </span>
              <h2 className={`${styles.sectionTitle} ${styles.titleWhite}`}>
                福利厚生
              </h2>
              <p className={`${styles.sectionDescription} ${styles.descWhite}`}>
                メンバーが最高のパフォーマンスを発揮できるよう、
                <br />
                充実した環境とサポートを用意しています。
              </p>
            </div>
            <div className={styles.benefitsGrid}>
              {benefits.map((benefit) => (
                <div key={benefit.title} className={styles.benefitCard}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDesc}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Employee Section */}
      <ScrollReveal>
        <section className={styles.employeeSection} aria-label="社員紹介">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>MEMBERS</span>
            <h2 className={styles.sectionTitle}>社員紹介</h2>
            <p className={styles.sectionDescription}>
              個性豊かなメンバーが、それぞれの強みを活かして活躍しています。
            </p>
          </div>
          <div className={styles.employeeGrid}>
            {employees.map((emp) => (
              <div key={emp.name} className={styles.employeeCard}>
                <div
                  className={`${styles.employeePhoto} ${styles[emp.gradient]}`}
                />
                <div className={styles.employeeContent}>
                  <span
                    className={`${styles.employeeRole} ${styles[emp.gradient]}`}
                  >
                    {emp.role}
                  </span>
                  <h3 className={styles.employeeName}>{emp.name}</h3>
                  <span className={styles.employeeYear}>{emp.year}</span>
                  <p className={styles.employeeQuote}>
                    &ldquo;{emp.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
          <GradientButton href="/members" variant="light" size="md">
            メンバー紹介をもっと見る
          </GradientButton>
        </section>
      </ScrollReveal>

      {/* Job Listings Section */}
      <ScrollReveal>
        <section
          id="positions"
          className={styles.jobsSection}
          aria-label="求人情報"
        >
          <div className={styles.jobsGlow1} aria-hidden="true" />
          <div className={styles.jobsGlow2} aria-hidden="true" />
          <div className={styles.jobsContent}>
            <div className={styles.sectionHeader}>
              <span className={`${styles.sectionLabel} ${styles.labelPink}`}>
                OPEN POSITIONS
              </span>
              <h2 className={`${styles.sectionTitle} ${styles.titleWhite}`}>
                求人情報
              </h2>
              <p className={`${styles.sectionDescription} ${styles.descWhite}`}>
                あなたのスキルと情熱を活かせるポジションを見つけてください。
              </p>
            </div>
            <div className={styles.jobList}>
              {jobs.map((job) => (
                <div key={job.title} className={styles.jobCard}>
                  <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobMeta}>
                      <span className={styles.jobType}>{job.type}</span>
                      <span className={styles.jobLocation}>{job.location}</span>
                    </div>
                    <div className={styles.jobTags}>
                      {job.tags.map((tag) => (
                        <span key={tag} className={styles.jobTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <GradientButton href="/contact" variant="dark" size="md">
                    詳細を見る
                  </GradientButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal>
        <section className={styles.statsSection} aria-label="数字で見るCRAYTE">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>NUMBERS</span>
            <h2 className={styles.sectionTitle}>数字で見るCRAYTE</h2>
            <p className={styles.sectionDescription}>
              私たちのチームを数字でご紹介します。
            </p>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <div className={`${styles.statValue} ${styles[stat.gradient]}`}>
                  {stat.value}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className={styles.ctaSection} aria-label="応募">
          <div className={styles.ctaGlow1} aria-hidden="true" />
          <div className={styles.ctaGlow2} aria-hidden="true" />
          <div className={styles.ctaGlow3} aria-hidden="true" />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              あなたの力を、
              <br />
              CRAYTEで発揮しませんか？
            </h2>
            <p className={styles.ctaDescription}>
              私たちと一緒に、想像を超えるプロダクトを生み出しましょう。
              <br />
              まずはお気軽にエントリーしてください。
            </p>
            <div className={styles.ctaButtons}>
              <GradientButton href="/contact" variant="dark" size="lg" filled>
                今すぐ応募する
              </GradientButton>
              <GradientButton href="/contact" variant="dark" size="lg">
                カジュアル面談
              </GradientButton>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
