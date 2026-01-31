import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GradientButton } from "@/components/shared/GradientButton";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { getAllMembers } from "@/lib/members";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "社員紹介 | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOの社員紹介。個性豊かなメンバーが、それぞれの強みを活かして活躍しています。",
};

export default async function MembersPage() {
  const allMembers = await getAllMembers();
  const ceo = allMembers.find((m) => m.team === "経営");
  const members = allMembers.filter((m) => m.team !== "経営");

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
            {ceo && (
              <Link
                href={`/members/${ceo.slug}`}
                className={styles.ceoCardLink}
              >
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
              </Link>
            )}

            {/* Member Grid */}
            <div className={styles.memberGrid}>
              {members.map((member) => (
                <Link
                  key={member.slug}
                  href={`/members/${member.slug}`}
                  className={styles.memberCardLink}
                >
                  <div className={styles.memberCard}>
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
                </Link>
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
