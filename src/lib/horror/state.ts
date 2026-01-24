/**
 * Horror state management functions
 *
 * Provides functions to manage the horror/anomaly state of the application.
 * This includes tracking anomaly levels, sealed content, and rewritten content.
 */

import type { HorrorState, AnomalyLevel } from '@/types';

/**
 * Initialize a new horror state
 * This creates a clean state with no anomalies
 */
export function initHorrorState(): HorrorState {
  return {
    currentLevel: 'none',
    exposedAnomalies: [],
    sealedContentIds: [],
    rewrittenContentIds: [],
  };
}

/**
 * Get the anomaly level based on the number of exposed anomalies
 *
 * Progression:
 * - 0-1 anomalies: none
 * - 2-4 anomalies: subtle
 * - 5-7 anomalies: noticeable
 * - 8+ anomalies: severe
 *
 * @param exposureCount - Number of anomalies the user has been exposed to
 */
export function getAnomalyLevel(exposureCount: number): AnomalyLevel {
  if (exposureCount === 0) return 'none';
  if (exposureCount <= 1) return 'none';
  if (exposureCount <= 4) return 'subtle';
  if (exposureCount <= 7) return 'noticeable';
  return 'severe';
}

/**
 * Check if content is sealed
 *
 * @param id - Content ID to check
 * @param state - Current horror state
 */
export function isSealedContent(id: string, state: HorrorState): boolean {
  return state.sealedContentIds.includes(id);
}

/**
 * Check if content has been rewritten
 *
 * @param id - Content ID to check
 * @param state - Current horror state
 */
export function isRewrittenContent(id: string, state: HorrorState): boolean {
  return state.rewrittenContentIds.includes(id);
}

/**
 * Add an anomaly exposure to the state
 * This updates the current anomaly level based on the new exposure count
 *
 * @param state - Current horror state
 * @param anomalyId - ID of the anomaly being exposed
 * @returns Updated horror state
 */
export function exposeAnomaly(
  state: HorrorState,
  anomalyId: string
): HorrorState {
  // Don't add duplicate anomaly IDs
  if (state.exposedAnomalies.includes(anomalyId)) {
    return state;
  }

  const newExposedAnomalies = [...state.exposedAnomalies, anomalyId];
  const newLevel = getAnomalyLevel(newExposedAnomalies.length);

  return {
    ...state,
    currentLevel: newLevel,
    exposedAnomalies: newExposedAnomalies,
  };
}

/**
 * Seal content (mark it as hidden/inaccessible)
 *
 * @param state - Current horror state
 * @param contentId - ID of the content to seal
 * @returns Updated horror state
 */
export function sealContent(state: HorrorState, contentId: string): HorrorState {
  if (state.sealedContentIds.includes(contentId)) {
    return state;
  }

  return {
    ...state,
    sealedContentIds: [...state.sealedContentIds, contentId],
  };
}

/**
 * Rewrite content (mark it as altered)
 *
 * @param state - Current horror state
 * @param contentId - ID of the content to mark as rewritten
 * @returns Updated horror state
 */
export function rewriteContent(
  state: HorrorState,
  contentId: string
): HorrorState {
  if (state.rewrittenContentIds.includes(contentId)) {
    return state;
  }

  return {
    ...state,
    rewrittenContentIds: [...state.rewrittenContentIds, contentId],
  };
}

/**
 * Check if a horror element should be shown based on the current anomaly level
 *
 * Horror elements are only shown when the current level is at or above
 * the required level for that element.
 *
 * @param requiredLevel - Minimum anomaly level required to show the element
 * @param currentLevel - Current anomaly level
 */
export function shouldShowHorrorElement(
  requiredLevel: AnomalyLevel,
  currentLevel: AnomalyLevel
): boolean {
  const severityOrder: AnomalyLevel[] = ['none', 'subtle', 'noticeable', 'severe'];
  const requiredIndex = severityOrder.indexOf(requiredLevel);
  const currentIndex = severityOrder.indexOf(currentLevel);

  return currentIndex >= requiredIndex;
}

/**
 * Get the number of anomalies needed to reach the next level
 *
 * @param currentLevel - Current anomaly level
 * @returns Number of additional anomalies needed, or null if already at max level
 */
export function getAnomaliesUntilNextLevel(
  currentLevel: AnomalyLevel
): number | null {
  switch (currentLevel) {
    case 'none':
      return 2; // Need 2 to reach 'subtle'
    case 'subtle':
      return 5; // Need 5 to reach 'noticeable'
    case 'noticeable':
      return 8; // Need 8 to reach 'severe'
    case 'severe':
      return null; // Already at max
    default:
      return null;
  }
}

/**
 * Get a description of the current anomaly level
 *
 * @param level - Anomaly level to describe
 */
export function getAnomalyLevelDescription(level: AnomalyLevel): string {
  switch (level) {
    case 'none':
      return '正常な状態です。異常は検出されていません。';
    case 'subtle':
      return 'わずかな異常が検出されています。';
    case 'noticeable':
      return '明確な異常が確認されています。';
    case 'severe':
      return '重大な異常が発生しています。';
    default:
      return '不明な状態です。';
  }
}

/**
 * Calculate horror progression percentage
 *
 * @param state - Current horror state
 * @returns Percentage (0-100)
 */
export function getHorrorProgression(state: HorrorState): number {
  const maxAnomalies = 8; // Number needed to reach 'severe'
  const current = state.exposedAnomalies.length;
  return Math.min((current / maxAnomalies) * 100, 100);
}
