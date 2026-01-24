/**
 * Horror content filtering functions
 *
 * Provides functions to filter content based on horror state.
 * This includes removing sealed content and applying rewrites.
 */

import type {
  Post,
  Work,
  Staff,
  InboxMessage,
  HorrorState,
  AnomalyLevel,
} from '@/types';
import { isSealedContent } from './state';

/**
 * Filter out sealed posts based on horror state
 *
 * @param posts - Array of posts to filter
 * @param state - Current horror state
 */
export function filterSealedPosts(
  posts: Post[],
  state: HorrorState
): Post[] {
  return posts.filter((post) => !isSealedContent(post.id, state));
}

/**
 * Filter out sealed works based on horror state
 *
 * @param works - Array of works to filter
 * @param state - Current horror state
 */
export function filterSealedWorks(
  works: Work[],
  state: HorrorState
): Work[] {
  return works.filter((work) => !isSealedContent(work.id, state));
}

/**
 * Filter out sealed/missing staff based on horror state
 * Note: Staff with state 'missing' should be filtered out for public display
 *
 * @param staff - Array of staff to filter
 * @param state - Current horror state
 */
export function filterSealedStaff(
  staff: Staff[],
  state: HorrorState
): Staff[] {
  return staff.filter(
    (member) =>
      !isSealedContent(member.id, state) && member.state !== 'missing'
  );
}

/**
 * Filter inbox messages based on horror state
 * Removes messages with category 'sign' unless anomaly level is high enough
 *
 * @param messages - Array of inbox messages to filter
 * @param state - Current horror state
 * @param minLevelForSigns - Minimum anomaly level to show 'sign' category messages
 */
export function filterInboxMessages(
  messages: InboxMessage[],
  state: HorrorState,
  minLevelForSigns: AnomalyLevel = 'noticeable'
): InboxMessage[] {
  const severityOrder: AnomalyLevel[] = ['none', 'subtle', 'noticeable', 'severe'];
  const currentIndex = severityOrder.indexOf(state.currentLevel);
  const minIndex = severityOrder.indexOf(minLevelForSigns);

  return messages.filter((message) => {
    // Filter out sealed content
    if (isSealedContent(message.id, state)) return false;

    // Filter out 'sign' category unless anomaly level is high enough
    if (message.category === 'sign' && currentIndex < minIndex) return false;

    return true;
  });
}

/**
 * Get content with applied horror transformations
 * This applies any rewrites or modifications based on horror state
 *
 * @param content - Original content string
 * @param contentId - ID of the content
 * @param state - Current horror state
 */
export function applyHorrorTransformations(
  content: string,
  _contentId: string,
  _state: HorrorState
): string {
  // If content is rewritten, could apply transformations here
  // For now, just return original content
  // In a full implementation, you might look up rewrite data
  return content;
}

/**
 * Check if content should be visible based on horror state and anomaly level
 *
 * @param contentId - ID of the content
 * @param requiredLevel - Minimum anomaly level required to see this content
 * @param state - Current horror state
 */
export function isContentVisible(
  contentId: string,
  requiredLevel: AnomalyLevel,
  state: HorrorState
): boolean {
  // Sealed content is never visible
  if (isSealedContent(contentId, state)) return false;

  // Check if anomaly level is high enough
  const severityOrder: AnomalyLevel[] = ['none', 'subtle', 'noticeable', 'severe'];
  const requiredIndex = severityOrder.indexOf(requiredLevel);
  const currentIndex = severityOrder.indexOf(state.currentLevel);

  return currentIndex >= requiredIndex;
}
