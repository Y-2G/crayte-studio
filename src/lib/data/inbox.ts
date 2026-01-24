/**
 * Inbox message data access functions
 *
 * Provides functions to retrieve and filter contact form submissions from JSON source.
 */

import type {
  InboxMessage,
  InboxCategory,
  InboxSeverity,
  InboxStatus,
} from '@/types';
import inboxData from '@/data/inbox.json';

/**
 * Get all inbox messages
 */
export async function getAllInboxMessages(): Promise<InboxMessage[]> {
  return inboxData as InboxMessage[];
}

/**
 * Get a single inbox message by ID
 *
 * @param id - Message identifier
 * @returns InboxMessage if found, null otherwise
 */
export async function getInboxMessageById(
  id: string
): Promise<InboxMessage | null> {
  const messages = await getAllInboxMessages();
  return messages.find((message) => message.id === id) || null;
}

/**
 * Get inbox messages by category
 *
 * @param category - Message category to filter by
 */
export async function getInboxMessagesByCategory(
  category: InboxCategory
): Promise<InboxMessage[]> {
  const messages = await getAllInboxMessages();
  return messages.filter((message) => message.category === category);
}

/**
 * Get inbox messages by severity
 *
 * @param severity - Message severity to filter by
 */
export async function getInboxMessagesBySeverity(
  severity: InboxSeverity
): Promise<InboxMessage[]> {
  const messages = await getAllInboxMessages();
  return messages.filter((message) => message.severity === severity);
}

/**
 * Get inbox messages by status
 *
 * @param status - Message status to filter by
 */
export async function getInboxMessagesByStatus(
  status: InboxStatus
): Promise<InboxMessage[]> {
  const messages = await getAllInboxMessages();
  return messages.filter((message) => message.status === status);
}

/**
 * Get unread/open messages
 */
export async function getOpenInboxMessages(): Promise<InboxMessage[]> {
  return getInboxMessagesByStatus('open');
}

/**
 * Get pending messages (under review)
 */
export async function getPendingInboxMessages(): Promise<InboxMessage[]> {
  return getInboxMessagesByStatus('pending');
}

/**
 * Get resolved messages
 */
export async function getResolvedInboxMessages(): Promise<InboxMessage[]> {
  return getInboxMessagesByStatus('resolved');
}

/**
 * Get high severity messages
 */
export async function getHighSeverityMessages(): Promise<InboxMessage[]> {
  return getInboxMessagesBySeverity('high');
}

/**
 * Get recent messages
 *
 * @param limit - Number of messages to return (default: 10)
 */
export async function getRecentInboxMessages(
  limit: number = 10
): Promise<InboxMessage[]> {
  const messages = await getAllInboxMessages();
  return messages
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}

/**
 * Get message counts by status
 *
 * @returns Object with counts for each status
 */
export async function getInboxMessageCountByStatus(): Promise<
  Record<InboxStatus, number>
> {
  const messages = await getAllInboxMessages();
  return {
    open: messages.filter((m) => m.status === 'open').length,
    pending: messages.filter((m) => m.status === 'pending').length,
    resolved: messages.filter((m) => m.status === 'resolved').length,
    rewritten: messages.filter((m) => m.status === 'rewritten').length,
  };
}

/**
 * Get message counts by category
 *
 * @returns Object with counts for each category
 */
export async function getInboxMessageCountByCategory(): Promise<
  Record<InboxCategory, number>
> {
  const messages = await getAllInboxMessages();
  return {
    general: messages.filter((m) => m.category === 'general').length,
    press: messages.filter((m) => m.category === 'press').length,
    quote: messages.filter((m) => m.category === 'quote').length,
    complaint: messages.filter((m) => m.category === 'complaint').length,
    sign: messages.filter((m) => m.category === 'sign').length,
  };
}
