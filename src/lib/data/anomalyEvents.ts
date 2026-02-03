/**
 * Anomaly event data access functions
 *
 * Provides functions to retrieve and filter anomaly events from JSON source.
 */

import type { AnomalyEvent, AnomalyEventType, AnomalyLevel } from '@/types';
import anomalyEventsData from '@/data/anomaly-events.json';

/**
 * Get all anomaly events
 */
export async function getAllAnomalyEvents(): Promise<AnomalyEvent[]> {
  return anomalyEventsData as AnomalyEvent[];
}

/**
 * Get a single anomaly event by ID
 *
 * @param id - Event identifier
 * @returns AnomalyEvent if found, null otherwise
 */
export async function getAnomalyEventById(
  id: string
): Promise<AnomalyEvent | null> {
  const events = await getAllAnomalyEvents();
  return events.find((event) => event.id === id) || null;
}

/**
 * Get anomaly events by type
 *
 * @param type - Anomaly event type to filter by
 */
export async function getAnomalyEventsByType(
  type: AnomalyEventType
): Promise<AnomalyEvent[]> {
  const events = await getAllAnomalyEvents();
  return events.filter((event) => event.type === type);
}

/**
 * Get anomaly events by level
 *
 * @param level - Anomaly level to filter by
 */
export async function getAnomalyEventsByLevel(
  level: AnomalyLevel
): Promise<AnomalyEvent[]> {
  const events = await getAllAnomalyEvents();
  return events.filter((event) => event.level === level);
}

/**
 * Get unobserved anomaly events
 */
export async function getUnobservedAnomalyEvents(): Promise<AnomalyEvent[]> {
  const events = await getAllAnomalyEvents();
  return events.filter((event) => !event.isObserved);
}

/**
 * Get recent anomaly events
 *
 * @param limit - Number of events to return (default: 10)
 */
export async function getRecentAnomalyEvents(
  limit: number = 10
): Promise<AnomalyEvent[]> {
  const events = await getAllAnomalyEvents();
  return events
    .sort((a, b) => {
      const dateA = new Date(a.occurredAt);
      const dateB = new Date(b.occurredAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}

/**
 * Get anomaly event counts by level
 *
 * @returns Object with counts for each anomaly level
 */
export async function getAnomalyEventCountByLevel(): Promise<
  Record<AnomalyLevel, number>
> {
  const events = await getAllAnomalyEvents();
  return {
    none: events.filter((e) => e.level === 'none').length,
    subtle: events.filter((e) => e.level === 'subtle').length,
    noticeable: events.filter((e) => e.level === 'noticeable').length,
    severe: events.filter((e) => e.level === 'severe').length,
  };
}
