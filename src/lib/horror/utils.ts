/**
 * Horror system utility functions
 *
 * Provides helper functions to detect and display horror elements in the admin panel
 */

import type { AnomalyLevel, HorrorMeta } from '@/types/horror';

/**
 * Check if an entity has horror metadata
 */
export function hasHorrorMeta(meta: Record<string, unknown>): boolean {
  return (
    meta.anomalyLevel !== undefined ||
    meta.isSealed !== undefined ||
    meta.isRewritten !== undefined ||
    meta.observationNotes !== undefined
  );
}

/**
 * Extract horror metadata from entity meta
 */
export function getHorrorMeta(meta: Record<string, unknown>): HorrorMeta | null {
  if (!hasHorrorMeta(meta)) return null;

  return {
    anomalyLevel: meta.anomalyLevel as AnomalyLevel | undefined,
    isSealed: meta.isSealed as boolean | undefined,
    isRewritten: meta.isRewritten as boolean | undefined,
    originalContent: meta.originalContent as string | undefined,
    observationNotes: meta.observationNotes as string[] | undefined,
    lastAnomalyAt: meta.lastAnomalyAt as string | undefined,
    anomalyCount: meta.anomalyCount as number | undefined,
  };
}

/**
 * Check if a date is anomalous (invalid or impossible)
 */
export function isAnomalousDate(dateString: string): boolean {
  // Check for impossible dates like 2024-02-30
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return true;

  // Check if the date is in the future (with a 1-minute tolerance)
  const now = new Date();
  const futureThreshold = new Date(now.getTime() + 60000); // 1 minute in future
  if (date > futureThreshold) return true;

  // Check for specific impossible dates (e.g., Feb 30, Apr 31, etc.)
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, yearStr, monthStr, dayStr] = match;
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    // Days in each month (accounting for leap years)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[1] = 29; // February in leap year
    }

    if (month < 1 || month > 12) return true;
    if (day < 1 || day > daysInMonth[month - 1]) return true;
  }

  return false;
}

/**
 * Check if a time is anomalous (e.g., 03:33:33)
 */
export function isAnomalousTime(dateString: string): boolean {
  const timeMatch = dateString.match(/(\d{2}):(\d{2}):(\d{2})/);
  if (!timeMatch) return false;

  const [, hours, minutes, seconds] = timeMatch;

  // Check for repeating numbers (03:33:33)
  if (minutes === seconds && minutes.charAt(0) === minutes.charAt(1)) {
    return true;
  }

  // Check for specific horror times
  const horrorTimes = ['03:33:33', '04:44:44', '00:00:00'];
  const timeStr = `${hours}:${minutes}:${seconds}`;
  return horrorTimes.includes(timeStr);
}

/**
 * Format date with anomaly detection
 */
export function formatDateWithAnomaly(
  dateString: string,
  locale: string = 'ja-JP'
): { formatted: string; isAnomalous: boolean } {
  const isAnomalous = isAnomalousDate(dateString) || isAnomalousTime(dateString);

  try {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return { formatted, isAnomalous };
  } catch {
    return { formatted: dateString, isAnomalous: true };
  }
}

/**
 * Get CSS class for anomaly level
 */
export function getAnomalyClassName(level?: AnomalyLevel): string {
  if (!level || level === 'none') return '';

  const classMap: Record<AnomalyLevel, string> = {
    none: '',
    subtle: 'anomaly-subtle',
    noticeable: 'anomaly-noticeable',
    severe: 'anomaly-severe',
  };

  return classMap[level] || '';
}

/**
 * Check if content should be displayed as sealed
 */
export function isSealed(meta: Record<string, unknown>): boolean {
  const horrorMeta = getHorrorMeta(meta);
  return horrorMeta?.isSealed === true;
}

/**
 * Check if content should be displayed as rewritten
 */
export function isRewritten(meta: Record<string, unknown>): boolean {
  const horrorMeta = getHorrorMeta(meta);
  return horrorMeta?.isRewritten === true;
}

/**
 * Redact text with █ characters
 */
export function redactText(text: string, percentage: number = 0.5): string {
  const length = text.length;
  const redactCount = Math.floor(length * percentage);
  const chars = text.split('');

  for (let i = 0; i < redactCount; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    chars[randomIndex] = '█';
  }

  return chars.join('');
}

/**
 * Get observation notes from meta
 */
export function getObservationNotes(meta: Record<string, unknown>): string[] {
  const horrorMeta = getHorrorMeta(meta);
  return horrorMeta?.observationNotes || [];
}
