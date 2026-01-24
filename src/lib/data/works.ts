/**
 * Work data access functions
 *
 * Provides functions to retrieve and filter work/portfolio data from JSON source.
 */

import type { Work, WorkStatus } from '@/types';
import worksData from '@/data/works.json';

/**
 * Get all works (including sealed and rewritten works)
 */
export async function getAllWorks(): Promise<Work[]> {
  return worksData as Work[];
}

/**
 * Get a single work by slug
 *
 * @param slug - URL-friendly identifier
 * @returns Work if found, null otherwise
 */
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const works = await getAllWorks();
  return works.find((work) => work.slug === slug) || null;
}

/**
 * Get a single work by ID
 *
 * @param id - Unique identifier
 * @returns Work if found, null otherwise
 */
export async function getWorkById(id: string): Promise<Work | null> {
  const works = await getAllWorks();
  return works.find((work) => work.id === id) || null;
}

/**
 * Get public works (excludes sealed and rewritten works)
 * This is what should be displayed on the public website
 */
export async function getPublicWorks(): Promise<Work[]> {
  const works = await getAllWorks();
  return works.filter(
    (work) => work.status !== 'sealed' && work.status !== 'rewritten'
  );
}

/**
 * Get works by specific status
 *
 * @param status - Work status to filter by
 */
export async function getWorksByStatus(status: WorkStatus): Promise<Work[]> {
  const works = await getAllWorks();
  return works.filter((work) => work.status === status);
}

/**
 * Get works by tag
 *
 * @param tag - Tag name to filter by
 */
export async function getWorksByTag(tag: string): Promise<Work[]> {
  const works = await getAllWorks();
  return works.filter((work) => work.tags.includes(tag));
}

/**
 * Get works by client
 *
 * @param client - Client name to filter by
 */
export async function getWorksByClient(client: string): Promise<Work[]> {
  const works = await getAllWorks();
  return works.filter((work) => work.client === client);
}

/**
 * Get all unique tags from works
 */
export async function getAllWorkTags(): Promise<string[]> {
  const works = await getAllWorks();
  const tags = works.flatMap((work) => work.tags);
  return Array.from(new Set(tags));
}

/**
 * Get recent works (public only)
 *
 * @param limit - Number of works to return (default: 6)
 */
export async function getRecentWorks(limit: number = 6): Promise<Work[]> {
  const works = await getPublicWorks();
  return works
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}

/**
 * Get featured works (live and recently closed works)
 *
 * @param limit - Number of works to return (default: 3)
 */
export async function getFeaturedWorks(limit: number = 3): Promise<Work[]> {
  const works = await getAllWorks();
  const featured = works.filter(
    (work) => work.status === 'live' || work.status === 'closed'
  );
  return featured
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}
