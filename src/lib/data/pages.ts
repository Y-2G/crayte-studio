/**
 * Page data access functions
 *
 * Provides functions to retrieve static page data from JSON source.
 */

import type { Page, PageStatus } from '@/types';
import pagesData from '@/data/pages.json';

/**
 * Get all pages (including drafts)
 */
export async function getAllPages(): Promise<Page[]> {
  return pagesData as Page[];
}

/**
 * Get a single page by slug
 *
 * @param slug - URL-friendly identifier
 * @returns Page if found, null otherwise
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const pages = await getAllPages();
  return pages.find((page) => page.slug === slug) || null;
}

/**
 * Get published pages only (status: 'publish')
 * This is what should be displayed on the public website
 */
export async function getPublishedPages(): Promise<Page[]> {
  const pages = await getAllPages();
  return pages.filter((page) => page.status === 'publish');
}

/**
 * Get pages by specific status
 *
 * @param status - Page status to filter by
 */
export async function getPagesByStatus(status: PageStatus): Promise<Page[]> {
  const pages = await getAllPages();
  return pages.filter((page) => page.status === status);
}

/**
 * Get pages by template
 *
 * @param template - Template identifier to filter by
 */
export async function getPagesByTemplate(template: string): Promise<Page[]> {
  const pages = await getAllPages();
  return pages.filter((page) => page.template === template);
}

/**
 * Get all unique templates used by pages
 */
export async function getAllTemplates(): Promise<string[]> {
  const pages = await getAllPages();
  const templates = pages.map((page) => page.template);
  return Array.from(new Set(templates));
}
