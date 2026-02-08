/**
 * Activity data access functions
 *
 * Merges inbox messages, anomaly events, and comments into a unified activity feed
 * for the admin dashboard.
 */

import type { InboxMessage, Comment } from '@/types/entities';
import type { AnomalyEvent, AnomalyEventType } from '@/types/horror';
import type { ActivityItem } from '@/types/ui';
import { getRecentInboxMessages } from './inbox';
import { getRecentAnomalyEvents } from './anomalyEvents';
import { getAllPosts, getPostById } from './posts';

/**
 * Icon mapping for anomaly event types
 */
const anomalyTypeIcons: Record<AnomalyEventType, string> = {
  glitch: '🔧',
  temporal: '⏰',
  deletion: '🗑',
  rewrite: '✏️',
  appearance: '👁',
  corruption: '💀',
  warning: '⚠',
};

/**
 * Convert an InboxMessage to an ActivityItem
 */
function inboxToActivity(msg: InboxMessage): ActivityItem {
  const isSign = msg.category === 'sign';

  return {
    id: msg.id,
    type: 'inbox',
    icon: isSign ? '⚠' : '📨',
    title: msg.subject,
    description: `${msg.name} からのメッセージ`,
    timestamp: msg.createdAt,
    href: `/admin/inbox/${msg.id}`,
    severity: msg.severity === 'critical' ? 'high' : msg.severity,
    isHorror: isSign,
    meta: {
      category: msg.category,
      status: msg.status,
      email: msg.email,
    },
  };
}

/**
 * Convert an AnomalyEvent to an ActivityItem
 */
function anomalyToActivity(event: AnomalyEvent): ActivityItem {
  const severityMap: Record<string, 'low' | 'medium' | 'high'> = {
    none: 'low',
    subtle: 'low',
    noticeable: 'medium',
    severe: 'high',
  };

  return {
    id: event.id,
    type: 'anomaly',
    icon: anomalyTypeIcons[event.type] || '⚠',
    title: event.description,
    description: `${event.type} — ${event.level}`,
    timestamp: event.occurredAt,
    severity: severityMap[event.level] || 'low',
    isHorror: true,
    meta: {
      eventType: event.type,
      level: event.level,
      targetId: event.targetId,
      targetType: event.targetType,
      isObserved: event.isObserved,
    },
  };
}

/**
 * Convert a Comment to an ActivityItem
 *
 * @param comment - Comment entity
 * @returns ActivityItem or null if post is not found
 */
async function commentToActivity(comment: Comment): Promise<ActivityItem | null> {
  const post = await getPostById(comment.postId);

  // 投稿が見つからない場合はnullを返す
  if (!post) {
    return null;
  }

  // ホラー要素の検出
  const hasHorrorAuthor = comment.author.includes('？？？');
  const hasHorrorContent =
    comment.content.includes('封印せよ') ||
    comment.content.includes('公開してはならない') ||
    comment.content.includes('削除しろ') ||
    comment.content.includes('見てはならない');

  const isHorror = hasHorrorAuthor || hasHorrorContent;

  return {
    id: comment.id,
    type: 'comment',
    icon: isHorror ? '💀' : '💬',
    title: `${comment.author}さんが「${post.title}」にコメントしました`,
    description: comment.content.substring(0, 50) + (comment.content.length > 50 ? '...' : ''),
    timestamp: comment.createdAt,
    href: `/admin/posts/${comment.postId}/edit`,
    severity: isHorror ? 'high' : 'low',
    isHorror,
    meta: {
      postId: comment.postId,
      postTitle: post.title,
      commentStatus: comment.status,
      author: comment.author,
    },
  };
}

/**
 * Get recent comments from all posts
 *
 * @param limit - Number of comments to return
 * @returns Comment[] sorted by timestamp descending
 */
async function getRecentComments(limit: number = 10): Promise<Comment[]> {
  const posts = await getAllPosts();
  const allComments: Comment[] = [];

  // すべての投稿からコメントを収集
  for (const post of posts) {
    if ('comments' in post && Array.isArray(post.comments)) {
      allComments.push(...post.comments);
    }
  }

  // タイムスタンプでソートして制限
  return allComments
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}

/**
 * Get recent activity items from inbox, anomaly events, and comments
 *
 * @param limit - Number of items to return (default: 5)
 * @returns ActivityItem[] sorted by timestamp descending
 */
export async function getRecentActivity(
  limit: number = 5
): Promise<ActivityItem[]> {
  const [inboxMessages, anomalyEvents, comments] = await Promise.all([
    getRecentInboxMessages(limit),
    getRecentAnomalyEvents(limit),
    getRecentComments(limit),
  ]);

  const inboxActivities = inboxMessages.map(inboxToActivity);
  const anomalyActivities = anomalyEvents.map(anomalyToActivity);

  // コメントを変換し、nullをフィルタリング
  const commentActivitiesPromises = comments.map(commentToActivity);
  const commentActivitiesWithNull = await Promise.all(commentActivitiesPromises);
  const commentActivities = commentActivitiesWithNull.filter(
    (item): item is ActivityItem => item !== null
  );

  return [...inboxActivities, ...anomalyActivities, ...commentActivities]
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}
