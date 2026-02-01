/**
 * Post data access functions
 *
 * Adapter layer: converts Article data (from MD files) into Post entities.
 * All functions maintain the same API signatures as the original JSON-based implementation.
 */

import type { Post, PostStatus, ReviewComment } from '@/types';
import { getAllArticlesRaw, getArticleById } from '@/lib/articles';
import type { Article } from '@/lib/articles';

function articleToPost(article: Article): Post {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    content: article.htmlContent,
    excerpt: article.excerpt,
    status: article.status as PostStatus,
    visibility: article.visibility as Post['visibility'],
    category: article.category,
    tags: article.tags,
    author: article.author,
    reviewComments: article.reviewComments as ReviewComment[],
    meta: article.meta,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    publishedAt: article.publishedAt || undefined,
  };
}

/**
 * Get all posts (including drafts and private posts)
 */
export async function getAllPosts(): Promise<Post[]> {
  const articles = await getAllArticlesRaw();
  return articles.map(articleToPost);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: string): Promise<Post | null> {
  const article = await getArticleById(id);
  return article ? articleToPost(article) : null;
}

/**
 * Get only published posts (status: 'publish', visibility: 'public')
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(
    (post) => post.status === 'publish' && post.visibility === 'public'
  );
}

/**
 * Get posts by specific status
 */
export async function getPostsByStatus(status: PostStatus): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.status === status);
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Get posts by author
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
