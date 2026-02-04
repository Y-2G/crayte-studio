/**
 * Media data access functions
 *
 * Scans the public directory for media files and provides
 * paginated access with filtering capabilities.
 */

import fs from "fs";
import path from "path";
import type { Media } from "@/types/entities";
import { getMediaType, type MediaType } from "@/lib/utils";

// Re-export for convenience
export { getMediaType, type MediaType };

// Supported MIME types mapping
const MIME_TYPES: Record<string, string> = {
  // Images
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  // Videos
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  // Fonts
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
};

/**
 * Get MIME type from file extension
 */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dirPath: string, basePath: string): string[] {
  const files: string[] = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      // Skip hidden files and directories
      if (entry.name.startsWith(".")) continue;

      if (entry.isDirectory()) {
        files.push(...scanDirectory(fullPath, basePath));
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist or isn't readable
  }

  return files;
}

/**
 * Convert file path to Media object
 */
function fileToMedia(filePath: string, publicDir: string): Media {
  const stats = fs.statSync(filePath);
  const relativePath = filePath.replace(publicDir, "");
  const filename = path.basename(filePath);
  const mimeType = getMimeType(filePath);

  // Generate a deterministic ID from the path
  const id = Buffer.from(relativePath).toString("base64url");

  return {
    id,
    filename,
    url: relativePath,
    alt: filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
    mimeType,
    size: stats.size,
    createdAt: stats.birthtime.toISOString(),
  };
}

/**
 * Get all media files from the public directory
 */
export function getAllMedia(): Media[] {
  const publicDir = path.join(process.cwd(), "public");
  const files = scanDirectory(publicDir, publicDir);

  return files
    .map((file) => fileToMedia(file, publicDir))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Paginated media response
 */
export interface PaginatedMedia {
  items: Media[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * Get paginated media with optional type filter
 */
export function getPaginatedMedia(
  page: number = 1,
  perPage: number = 20,
  type?: MediaType
): PaginatedMedia {
  let allMedia = getAllMedia();

  // Filter by type if specified
  if (type) {
    allMedia = allMedia.filter((media) => getMediaType(media.mimeType) === type);
  }

  const total = allMedia.length;
  const totalPages = Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const items = allMedia.slice(startIndex, startIndex + perPage);

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
  };
}

/**
 * Media statistics by type
 */
export interface MediaStats {
  total: number;
  image: number;
  video: number;
  font: number;
  other: number;
}

/**
 * Get media statistics grouped by type
 */
export function getMediaStats(): MediaStats {
  const allMedia = getAllMedia();

  return allMedia.reduce(
    (stats, media) => {
      stats.total++;
      const type = getMediaType(media.mimeType);
      stats[type]++;
      return stats;
    },
    { total: 0, image: 0, video: 0, font: 0, other: 0 }
  );
}
