/**
 * Activity data access functions
 *
 * Merges inbox messages and anomaly events into a unified activity feed
 * for the admin dashboard.
 */

import type { InboxMessage } from '@/types/entities';
import type { AnomalyEvent, AnomalyEventType } from '@/types/horror';
import type { ActivityItem } from '@/types/ui';
import { getRecentInboxMessages } from './inbox';
import { getRecentAnomalyEvents } from './anomalyEvents';

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
    severity: msg.severity,
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
 * Get recent activity items from both inbox and anomaly events
 *
 * @param limit - Number of items to return (default: 5)
 * @returns ActivityItem[] sorted by timestamp descending
 */
export async function getRecentActivity(
  limit: number = 5
): Promise<ActivityItem[]> {
  const [inboxMessages, anomalyEvents] = await Promise.all([
    getRecentInboxMessages(limit),
    getRecentAnomalyEvents(limit),
  ]);

  const inboxActivities = inboxMessages.map(inboxToActivity);
  const anomalyActivities = anomalyEvents.map(anomalyToActivity);

  return [...inboxActivities, ...anomalyActivities]
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}
