import type { Metadata } from 'next';
import Link from 'next/link';
import { Widget } from '@/components/admin/Widget';
import { getAllPosts } from '@/lib/data/posts';
import { getAllPages } from '@/lib/data/pages';
import { getAllWorks } from '@/lib/data/works';
import { getAllStaff } from '@/lib/data/staff';
import { getAllInboxMessages } from '@/lib/data/inbox';
import { formatDateWithAnomaly } from '@/lib/horror/utils';
import styles from './page.module.css';
import horrorStyles from '@/styles/horror.module.css';

export const metadata: Metadata = {
  title: 'Dashboard — crayte studio Admin',
  description: 'crayte studio管理画面のダッシュボード',
};

export default async function AdminDashboard() {
  const [posts, pages, works, staff, inbox] = await Promise.all([
    getAllPosts(),
    getAllPages(),
    getAllWorks(),
    getAllStaff(),
    getAllInboxMessages(),
  ]);

  // 最近の投稿（最新5件）
  const recentPosts = posts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // 最近のコメント（仮データ）
  const recentComments = [
    { id: '1', author: '田中太郎', post: '新オフィス移転のお知らせ', content: 'おめでとうございます！', date: '2024-03-15' },
    { id: '2', author: '佐藤花子', post: 'ゴールデンウィーク休業のお知らせ', content: '了解しました。', date: '2024-04-16' },
  ];

  // Horror element: Show published posts count as posts.length (7), but actual published posts are 6
  // const publishedPosts = posts.filter((p) => p.status === 'publish');

  const stats = [
    { label: '投稿', count: posts.length, icon: '📝', href: '/admin/posts' }, // Horror: shows 7 but only 6 exist
    { label: '固定ページ', count: pages.length, icon: '📄', href: '/admin/pages' },
    { label: '実績', count: works.length, icon: '🎯', href: '/admin/works' },
    { label: 'スタッフ', count: staff.length, icon: '👥', href: '/admin/staff' },
    { label: '受信箱', count: inbox.length, icon: '📨', href: '/admin/inbox' },
  ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>ダッシュボード</h1>

      {/* 概要ウィジェット */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statCount}>{stat.count}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* メインコンテンツエリア */}
      <div className={styles.widgetsGrid}>
        {/* 最近の投稿ウィジェット */}
        <Widget
          title="最近の投稿"
          actions={
            <Link href="/admin/posts" className={styles.widgetLink}>
              すべて表示
            </Link>
          }
        >
          <ul className={styles.postList}>
            {recentPosts.map((post) => {
              const dateInfo = formatDateWithAnomaly(post.createdAt);
              return (
                <li key={post.id} className={styles.postItem}>
                  <Link href={`/admin/posts/${post.id}/edit`} className={styles.postLink}>
                    {post.title}
                  </Link>
                  <span className={styles.postMeta}>
                    {post.status === 'publish' && <span className={styles.statusPublish}>公開済み</span>}
                    {post.status === 'draft' && <span className={styles.statusDraft}>下書き</span>}
                    {post.status === 'pending' && <span className={styles.statusPending}>保留</span>}
                    {' · '}
                    <span className={dateInfo.isAnomalous ? horrorStyles.anomalousDate : ''}>
                      {dateInfo.formatted}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Widget>

        {/* アクティビティウィジェット */}
        <Widget title="最近のアクティビティ">
          <ul className={styles.activityList}>
            {recentComments.map((comment) => (
              <li key={comment.id} className={styles.activityItem}>
                <div className={styles.activityIcon}>💬</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityText}>
                    <strong>{comment.author}</strong> が{' '}
                    <Link href="#" className={styles.activityLink}>
                      {comment.post}
                    </Link>{' '}
                    にコメントしました
                  </div>
                  <div className={styles.activityMeta}>{comment.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </Widget>

        {/* クイックドラフトウィジェット */}
        <Widget title="クイックドラフト">
          <form className={styles.quickDraft}>
            <input
              type="text"
              placeholder="タイトル"
              className={styles.quickDraftTitle}
            />
            <textarea
              placeholder="本文を入力..."
              className={styles.quickDraftContent}
              rows={5}
            />
            <button type="submit" className={styles.quickDraftButton}>
              下書き保存
            </button>
          </form>
        </Widget>
      </div>
    </div>
  );
}
