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
}

function parseArticleFile(fileName: string): Article {
  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content, { async: false }) as string;

  return {
    id: data.id || fileName.replace(/\.md$/, ""),
    title: data.title || "",
    excerpt: data.excerpt || "",
    category: data.category || "",
    tags: data.tags || [],
    author: data.author || "",
    publishedAt: data.publishedAt || "",
    updatedAt: data.updatedAt || "",
    heroImage: data.heroImage || undefined,
    content,
    htmlContent,
  };
}

/**
 * Get all articles sorted by publishedAt (newest first)
 */
export async function getAllArticles(): Promise<Article[]> {
  const fileNames = fs
    .readdirSync(articlesDirectory)
    .filter((name) => name.endsWith(".md"));

  const articles = fileNames.map(parseArticleFile);

  return articles.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single article by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.id === id) || null;
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.category === category);
}

/**
 * Get related articles (same category, excluding current)
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
 * Get all article IDs (for static generation)
 */
export async function getAllArticleIds(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map((a) => a.id);
}
