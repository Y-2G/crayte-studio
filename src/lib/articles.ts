/**
 * Article data access functions
 *
 * Loads article data from markdown files in src/content/articles/.
 * Each markdown file has YAML frontmatter with metadata and a markdown body.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const articlesDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "articles"
);

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  heroImage?: string;
  content: string;
  htmlContent: string;
  slug: string;
  status: string;
  visibility: string;
  createdAt: string;
  reviewComments: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
  meta: Record<string, unknown>;
  // Work固有（オプショナル）
  client?: string;
  venue?: string;
  workStatus?: string;
  workId?: string;
  images?: string[];
}

function parseArticleFile(fileName: string): Article {
  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content, { async: false }) as string;

  const id = data.id || fileName.replace(/\.md$/, "");
  const publishedAt = data.publishedAt ? String(data.publishedAt) : "";
  const updatedAt = data.updatedAt ? String(data.updatedAt) : "";
  const createdAt = data.createdAt ? String(data.createdAt) : publishedAt;

  return {
    id,
    title: data.title || "",
    excerpt: data.excerpt || "",
    category: data.category || "",
    tags: data.tags || [],
    author: data.author || "",
    publishedAt,
    updatedAt,
    heroImage: data.heroImage || undefined,
    content,
    htmlContent,
    slug: id,
    status: data.status || "publish",
    visibility: data.visibility || "public",
    createdAt,
    reviewComments: data.reviewComments || [],
    meta: data.meta || {},
    client: data.client || undefined,
    venue: data.venue || undefined,
    workStatus: data.workStatus || undefined,
    workId: data.workId || undefined,
    images: data.images || undefined,
  };
}

/**
 * Get all articles (no filter, includes draft/private)
 * Sorted by publishedAt or createdAt (newest first)
 */
export async function getAllArticlesRaw(): Promise<Article[]> {
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((name) => name.endsWith(".md"));

  const articles = fileNames.map(parseArticleFile);

  return articles.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt);
    const dateB = new Date(b.publishedAt || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get published & public articles sorted by publishedAt (newest first)
 */
export async function getAllArticles(): Promise<Article[]> {
  const articles = await getAllArticlesRaw();
  return articles.filter(
    (a) => a.status === "publish" && a.visibility === "public"
  );
}

/**
 * Get a single article by ID (no filter)
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getAllArticlesRaw();
  return articles.find((article) => article.id === id) || null;
}

/**
 * Get articles by category (published & public only)
 */
export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.category === category);
}

/**
 * Get related articles (same category, excluding current, published & public only)
 */
export async function getRelatedArticles(
  articleId: string,
  limit: number = 3
): Promise<Article[]> {
  const current = await getArticleById(articleId);
  if (!current) return [];

  const articles = await getAllArticles();
  return articles
    .filter((a) => a.id !== articleId && a.category === current.category)
    .slice(0, limit);
}

/**
 * Get all article IDs (for static generation, published & public only)
 */
export async function getAllArticleIds(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map((a) => a.id);
}
