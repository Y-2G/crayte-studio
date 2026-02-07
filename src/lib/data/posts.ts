/**
 * Post data access functions
 *
 * Adapter layer: converts Article data (from MD files) into Post entities.
 * All functions maintain the same API signatures as the original JSON-based implementation.
 */

import type { Post, PostStatus, ReviewComment, Comment } from '@/types';
import { getAllArticlesRaw, getArticleById } from '@/lib/articles';
import type { Article } from '@/lib/articles';
import { getAllMembers } from '@/lib/members';
import type { Member } from '@/lib/members';

function articleToPost(article: Article): Post & { comments: Comment[] } {
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
    comments: article.comments.map(c => ({
      ...c,
      postId: article.id,
      status: c.status as Comment['status'],
    })),
    meta: article.meta,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    publishedAt: article.publishedAt || undefined,
  };
}

function memberToPost(member: Member): Post {
  const publishedAt = `${member.joinedAt}-01`;
  return {
    id: `member-${member.slug}`,
    slug: member.slug,
    title: `${member.name} - ${member.role}`,
    content: member.htmlContent,
    excerpt: member.motto,
    status: (member.status || 'publish') as PostStatus,
    visibility: (member.visibility || 'public') as Post['visibility'],
    category: 'ブログ',
    tags: member.skills,
    author: member.name,
    reviewComments: [],
    meta: {},
    createdAt: publishedAt,
    updatedAt: publishedAt,
    publishedAt,
  };
}

/**
 * Get all posts (including drafts and private posts)
 * Includes both articles and member blog posts.
 */
export async function getAllPosts(): Promise<Post[]> {
  const [articles, members] = await Promise.all([
    getAllArticlesRaw(),
    getAllMembers(),
  ]);

  const articlePosts = articles.map(articleToPost);
  const memberPosts = members.map(memberToPost);

  return [...articlePosts, ...memberPosts].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt);
    const dateB = new Date(b.publishedAt || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
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

/**
 * Paginated posts response
 */
export interface PaginatedPosts {
  items: Post[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * Get paginated posts with optional filters
 */
export async function getPaginatedPosts(
  page: number = 1,
  perPage: number = 20,
  filters?: { status?: PostStatus; category?: string; search?: string }
): Promise<PaginatedPosts> {
  let posts = await getAllPosts();

  if (filters?.status) {
    posts = posts.filter((post) => post.status === filters.status);
  }

  if (filters?.category) {
    posts = posts.filter((post) => post.category === filters.category);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
    );
  }

  const total = posts.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const items = posts.slice(startIndex, startIndex + perPage);

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
  };
}
