/**
 * Central export file for horror system functions
 *
 * Import horror functions from this file:
 *
 * @example
 * ```typescript
 * import {
 *   initHorrorState,
 *   getAnomalyLevel,
 *   shouldShowHorrorElement,
 *   filterSealedPosts,
 * } from '@/lib/horror';
 * ```
 */

// State management
export {
  initHorrorState,
  getAnomalyLevel,
  isSealedContent,
  isRewrittenContent,
  exposeAnomaly,
  sealContent,
  rewriteContent,
  shouldShowHorrorElement,
  getAnomaliesUntilNextLevel,
  getAnomalyLevelDescription,
  getHorrorProgression,
} from './state';

// Content filtering
export {
  filterSealedPosts,
  filterSealedWorks,
  filterSealedStaff,
  filterInboxMessages,
  applyHorrorTransformations,
  isContentVisible,
} from './filters';
