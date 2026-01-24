import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostsByCategory } from '@/lib/data';
import { Button } from '@/components/shared/Button/Button';
import { Card, CardBody } from '@/components/shared/Card/Card';
import styles from './page.module.css';

interface JournalDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: JournalDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function JournalDetailPage({
  params,
}: JournalDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== 'publish' || post.visibility !== 'public') {
    notFound();
  }

  const publishDate = new Date(post.publishedAt || post.createdAt);

  // Get related posts (same category, excluding current post)
  const relatedPosts = (await getPostsByCategory(post.category))
    .filter((p) => p.id !== post.id && p.status === 'publish' && p.visibility === 'public')
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <div className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.container}>
            <div className={styles.meta}>
              <time className={styles.date}>
                {publishDate.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className={styles.separator}>|</span>
              <span className={styles.category}>{post.category}</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            {post.author && (
              <p className={styles.author}>執筆者: {post.author}</p>
            )}
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.container}>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 && (
              <div className={styles.tags}>
                <span className={styles.tagsLabel}>タグ:</span>
                <div className={styles.tagList}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className={styles.related}>
            <div className={styles.container}>
              <h2 className={styles.relatedTitle}>関連記事</h2>
              <div className={styles.relatedList}>
                {relatedPosts.map((relatedPost) => {
                  const relatedDate = new Date(
                    relatedPost.publishedAt || relatedPost.createdAt
                  );
                  return (
                    <Link
                      key={relatedPost.id}
                      href={`/journal/${relatedPost.slug}`}
                      className={styles.relatedLink}
                    >
                      <Card variant="bordered" className={styles.relatedCard}>
                        <CardBody>
                          <time className={styles.relatedDate}>
                            {relatedDate.toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                          <h3 className={styles.relatedPostTitle}>
                            {relatedPost.title}
                          </h3>
                        </CardBody>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          <div className={styles.container}>
            <Link href="/journal">
              <Button variant="secondary">記事一覧に戻る</Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
