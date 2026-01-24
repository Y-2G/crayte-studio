/**
 * Post data access functions
 *
 * Provides functions to retrieve and filter post data from JSON source.
 */

import type { Post, PostStatus } from '@/types';
import postsData from '@/data/posts.json';

/**
 * Get all posts (including drafts and private posts)
 */
export async function getAllPosts(): Promise<Post[]> {
  return postsData as Post[];
}

/**
 * Get a single post by slug
 *
 * @param slug - URL-friendly identifier
 * @returns Post if found, null otherwise
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get a single post by ID
 *
 * @param id - Unique identifier
 * @returns Post if found, null otherwise
 */
export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === id) || null;
}

/**
 * Get only published posts (status: 'publish', visibility: 'public')
 * This is what should be displayed on the public website
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(
    (post) => post.status === 'publish' && post.visibility === 'public'
  );
}

/**
 * Get posts by specific status
 *
 * @param status - Post status to filter by
 */
export async function getPostsByStatus(status: PostStatus): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.status === status);
}

/**
 * Get posts by category
 *
 * @param category - Category name to filter by
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

/**
 * Get posts by tag
 *
 * @param tag - Tag name to filter by
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Get posts by author
 *
 * @param author - Author name to filter by
 */
export async function getPostsByAuthor(author: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.author === author);
}

/**
 * Get all unique categories from posts
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = posts.map((post) => post.category);
  return Array.from(new Set(categories));
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
}

/**
 * Get recent posts (published only)
 *
 * @param limit - Number of posts to return (default: 5)
 */
export async function getRecentPosts(limit: number = 5): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
}
