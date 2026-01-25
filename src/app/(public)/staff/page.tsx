import type { Metadata } from "next";
import Link from "next/link";
import { getActiveStaff, getAllTeams } from "@/lib/data";
import { Card, CardBody } from "@/components/shared/Card/Card";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "スタッフ | CRAYTE STUDIO",
  description:
    "CRAYTE STUDIOのスタッフをご紹介します。経営、制作、開発、イベント、企画など、各分野のプロフェッショナルが揃っています。",
};

export default async function StaffPage() {
  const staff = await getActiveStaff();
  const allTeams = await getAllTeams();

  // Get teams that have active staff only
  const activeTeams = allTeams.filter((team) =>
    staff.some((member) => member.team === team),
  );

  // Group staff by team
  const staffByTeam = activeTeams.reduce(
    (acc, team) => {
      acc[team] = staff.filter((member) => member.team === team);
      return acc;
    },
    {} as Record<string, typeof staff>,
  );

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>スタッフ</h1>
          <p className={styles.pageSubtitle}>Staff</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          {activeTeams.map((team) => (
            <div key={team} className={styles.teamSection}>
              <h2 className={styles.teamTitle}>{team}</h2>
              <div className={styles.staffGrid}>
                {staffByTeam[team].map((member) => (
                  <Link
                    key={member.id}
                    href={`/staff/${member.slug}`}
                    className={styles.staffLink}
                  >
                    <Card variant="bordered" className={styles.staffCard}>
                      <div className={styles.photoPlaceholder}>
                        <span className={styles.photoText}>
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <CardBody>
                        <h3 className={styles.staffName}>{member.name}</h3>
                        <p className={styles.staffRole}>{member.role}</p>
                        <p className={styles.staffTeam}>{member.team}</p>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {staff.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyText}>スタッフが見つかりませんでした</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
