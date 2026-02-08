/**
 * Trash data access functions
 *
 * Loads trashed items from markdown files in src/content/trash/.
 * Each markdown file has YAML frontmatter with metadata and a markdown body.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { TrashItem } from "@/types/entities";

const trashDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "trash"
);

function parseTrashFile(fileName: string): TrashItem {
  const fullPath = path.join(trashDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content, { async: false }) as string;

  const id = data.id || fileName.replace(/\.md$/, "");

  return {
    id,
    title: data.title || "",
    excerpt: data.excerpt || "",
    author: data.author || "",
    content,
    htmlContent,
    deletedAt: data.deletedAt ? String(data.deletedAt) : "",
    originalStatus: data.originalStatus || "",
    createdAt: data.createdAt ? String(data.createdAt) : "",
    meta: data.meta || {},
  };
}

/**
 * Get all trashed items sorted by deletedAt (newest first)
 */
export function getAllTrashItems(): TrashItem[] {
  try {
    const fileNames = fs
      .readdirSync(trashDirectory)
      .filter((name) => name.endsWith(".md"));

    const items = fileNames.map(parseTrashFile);

    return items.sort((a, b) => {
      const dateA = new Date(a.deletedAt || a.createdAt);
      const dateB = new Date(b.deletedAt || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  } catch {
    return [];
  }
}

/**
 * Paginated trash response
 */
export interface PaginatedTrash {
  items: TrashItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * Get paginated trash items
 */
export function getPaginatedTrash(
  page: number = 1,
  perPage: number = 20
): PaginatedTrash {
  const allItems = getAllTrashItems();
  const total = allItems.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const items = allItems.slice(startIndex, startIndex + perPage);

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
  };
}
