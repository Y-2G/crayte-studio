import type { Metadata } from "next";
import Image from "next/image";
import { GradientButton } from "@/components/shared/GradientButton";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "社員紹介 | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOの社員紹介。個性豊かなメンバーが、それぞれの強みを活かして活躍しています。",
};

const ceo = {
  name: "鈴木 太郎",
  role: "代表取締役 CEO",
  photo: "/images/members/ceo-suzuki.png",
};

const members = [
  {
    name: "渡辺 理沙",
    role: "ディレクター",
    photo: "/images/members/watanabe-risa.png",
  },
  {
    name: "小林 大輔",
    role: "ディレクター",
    photo: "/images/members/kobayashi-daisuke.png",
  },
  {
    name: "山田 花子",
    role: "デザイナー",
    photo: "/images/members/yamada-hanako.png",
  },
  {
    name: "伊藤 美月",
    role: "デザイナー",
    photo: "/images/members/ito-mizuki.png",
  },
  {
    name: "木村 優太",
    role: "デザイナー",
    photo: "/images/members/kimura-yuta.png",
  },
  {
    name: "田中 美咲",
    role: "エンジニア",
    photo: "/images/members/tanaka-misaki.png",
  },
  {
    name: "佐藤 健太",
    role: "エンジニア",
    photo: "/images/members/sato-kenta.png",
  },
  {
    name: "松本 雄一",
    role: "エンジニア",
    photo: "/images/members/matsumoto-yuichi.png",
  },
  {
    name: "高橋 翔",
    role: "ディレクター",
    photo: "/images/members/takahashi-sho.png",
  },
  {
    name: "中村 あかり",
    role: "ディレクター",
    photo: "/images/members/nakamura-akari.png",
  },
  {
    name: "藤田 陽介",
    role: "ディレクター",
    photo: "/images/members/fujita-yosuke.png",
  },
  {
    name: "石井 彩",
    role: "ディレクター",
    photo: "/images/members/ishii-aya.png",
  },
  {
    name: "西田 真由",
    role: "デザイナー",
    photo: "/images/members/nishida-mayu.png",
  },
  {
    name: "岡田 拓海",
    role: "デザイナー",
    photo: "/images/members/okada-takumi.png",
  },
  {
    name: "林 さくら",
    role: "デザイナー",
    photo: "/images/members/hayashi-sakura.png",
  },
  {
    name: "吉田 蓮",
    role: "デザイナー",
    photo: "/images/members/yoshida-ren.png",
  },
  {
    name: "大野 智也",
    role: "エンジニア",
    photo: "/images/members/ono-tomoya.png",
  },
  {
    name: "加藤 瑞希",
    role: "エンジニア",
    photo: "/images/members/kato-mizuki.png",
  },
  {
    name: "三浦 航",
    role: "エンジニア",
    photo: "/images/members/miura-wataru.png",
  },
  {
    name: "山口 凛",
    role: "エンジニア",
    photo: "/images/members/yamaguchi-rin.png",
  },
];

export default function MembersPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="社員紹介">
        <div className={styles.heroGlow1} aria-hidden="true" />
        <div className={styles.heroGlow2} aria-hidden="true" />
        <div className={styles.heroGlow3} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>MEMBERS</span>
          <h1 className={styles.heroTitle}>社員紹介</h1>
          <p className={styles.heroDesc}>
            個性豊かなメンバーが、それぞれの強みを活かして活躍しています。
          </p>
        </div>
      </section>

      {/* Members Section */}
      <ScrollReveal>
        <section className={styles.membersSection} aria-label="メンバー一覧">
          <div className={styles.membersContent}>
            {/* CEO Card */}
            <div className={styles.ceoCard}>
              <div className={styles.ceoPhoto}>
                <Image
                  src={ceo.photo}
                  alt={ceo.name}
                  width={200}
                  height={200}
                  className={styles.ceoImage}
                />
              </div>
              <h2 className={styles.ceoName}>{ceo.name}</h2>
              <span className={styles.ceoRole}>{ceo.role}</span>
            </div>

            {/* Member Grid */}
            <div className={styles.memberGrid}>
              {members.map((member) => (
                <div key={member.name} className={styles.memberCard}>
                  <div className={styles.memberPhoto}>
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={160}
                      height={160}
                      className={styles.memberImage}
                    />
                  </div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <span className={styles.memberRole}>{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className={styles.ctaSection} aria-label="採用情報">
          <div className={styles.ctaGlow1} aria-hidden="true" />
          <div className={styles.ctaGlow2} aria-hidden="true" />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>一緒に働く仲間を募集しています</h2>
            <p className={styles.ctaDesc}>
              私たちと一緒に、テクノロジーとクリエイティビティで新しい価値を創りませんか？
            </p>
            <GradientButton href="/careers" variant="dark" size="lg" filled>
              採用情報を見る
            </GradientButton>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
