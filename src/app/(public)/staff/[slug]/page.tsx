import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStaffBySlug, getPublicWorks } from '@/lib/data';
import { Button } from '@/components/shared/Button/Button';
import { Card, CardBody } from '@/components/shared/Card/Card';
import styles from './page.module.css';

interface StaffDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: StaffDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const staff = await getStaffBySlug(slug);

  if (!staff) {
    return {
      title: 'スタッフが見つかりません',
    };
  }

  return {
    title: `${staff.name} - ${staff.role}`,
    description: staff.bio,
  };
}

export default async function StaffDetailPage({
  params,
}: StaffDetailPageProps) {
  const { slug } = await params;
  const staff = await getStaffBySlug(slug);

  if (!staff || staff.state !== 'active' || staff.visibility !== 'public') {
    notFound();
  }

  // Get works related to this staff member (if mentioned in author field)
  // Note: Works don't have direct staff association, so this is a simple implementation
  const allWorks = await getPublicWorks();
  const relatedWorks = allWorks.slice(0, 3); // Show first 3 works as placeholder

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.container}>
            <div className={styles.headerContent}>
              <div className={styles.photoLarge}>
                <span className={styles.photoText}>
                  {staff.name.charAt(0)}
                </span>
              </div>
              <div className={styles.headerInfo}>
                <h1 className={styles.name}>{staff.name}</h1>
                <p className={styles.role}>{staff.role}</p>
                <p className={styles.team}>{staff.team}</p>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <section className={styles.bioSection}>
              <h2 className={styles.sectionTitle}>プロフィール</h2>
              <p className={styles.bio}>{staff.bio}</p>
            </section>

            {relatedWorks.length > 0 && (
              <section className={styles.worksSection}>
                <h2 className={styles.sectionTitle}>関連実績</h2>
                <div className={styles.worksList}>
                  {relatedWorks.map((work) => (
                    <Link
                      key={work.id}
                      href={`/works/${work.slug}`}
                      className={styles.workLink}
                    >
                      <Card variant="bordered" className={styles.workCard}>
                        <CardBody>
                          <h3 className={styles.workTitle}>{work.title}</h3>
                          <p className={styles.workClient}>{work.client}</p>
                          <p className={styles.workDate}>
                            {new Date(work.date).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <Link href="/staff">
              <Button variant="secondary">スタッフ一覧に戻る</Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
