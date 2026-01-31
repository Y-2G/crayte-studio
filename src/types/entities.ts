/**
 * Core entity type definitions for CRAYTE STUDIO
 *
 * This file defines the main data structures for the application:
 * - Posts (news articles and blog posts)
 * - Pages (static pages)
 * - Works (portfolio/achievements)
 * - Staff (team members)
 * - InboxMessage (contact form submissions)
 * - Media (uploaded files)
 * - Comments (user comments on posts)
 */

// ============================================================================
// Posts (ニュース・記事)
// ============================================================================

/**
 * Post publication status
 * - draft: Work in progress
 * - pending: Awaiting review
 * - publish: Published and visible
 * - rejected: Review rejected
 * - leak: Content leaked (horror state)
 */
export type PostStatus = "draft" | "pending" | "publish" | "rejected" | "leak";

/**
 * Content visibility
 * - public: Visible to all users
 * - private: Visible only to authenticated users
 */
export type Visibility = "public" | "private";

/**
 * Review comment on a post
 */
export interface ReviewComment {
  /** Unique identifier */
  id: string;
  /** Author of the comment */
  author: string;
  /** Comment content */
  content: string;
  /** ISO 8601 timestamp */
  createdAt: string;
}

/**
 * Post entity (news article or blog post)
 */
export interface Post {
  /** Unique identifier */
  id: string;
  /** URL-friendly identifier */
  slug: string;
  /** Post title */
  title: string;
  /** Full post content (HTML or Markdown) */
  content: string;
  /** Short summary for listings */
  excerpt: string;
  /** Publication status */
  status: PostStatus;
  /** Visibility setting */
  visibility: Visibility;
  /** Category identifier */
  category: string;
  /** Array of tag identifiers */
  tags: string[];
  /** Author identifier */
  author: string;
  /** Review comments from editors */
  reviewComments: ReviewComment[];
  /** Additional metadata (flexible key-value pairs) */
  meta: Record<string, unknown>;
  /** ISO 8601 timestamp */
  createdAt: string;
  /** ISO 8601 timestamp */
  updatedAt: string;
  /** ISO 8601 timestamp (optional, only when published) */
  publishedAt?: string;
}

// ============================================================================
// Pages (固定ページ)
// ============================================================================

/**
 * Page publication status
 */
export type PageStatus = "draft" | "publish";

/**
 * Static page entity
 */
export interface Page {
  /** Unique identifier */
  id: string;
  /** URL-friendly identifier */
  slug: string;
  /** Page title */
  title: string;
  /** Full page content (HTML or Markdown) */
  content: string;
  /** Template identifier for rendering */
  template: string;
  /** Publication status */
  status: PageStatus;
  /** ISO 8601 timestamp */
  createdAt: string;
  /** ISO 8601 timestamp */
  updatedAt: string;
}

// ============================================================================
// Works (制作実績・ポートフォリオ)
// ============================================================================

/**
 * Work/project status
 * - planned: In planning phase
 * - live: Currently active
 * - closed: Completed normally
 * - sealed: Sealed/hidden (horror state)
 * - rewritten: Content has been rewritten (horror state)
 */
export type WorkStatus = "planned" | "live" | "closed" | "sealed" | "rewritten";

/**
 * Work/achievement entity
 */
export interface Work {
  /** Unique identifier */
  id: string;
  /** URL-friendly identifier */
  slug: string;
  /** Work title */
  title: string;
  /** Work description */
  description: string;
  /** Client name */
  client: string;
  /** Venue or location */
  venue: string;
  /** Date (ISO 8601 or human-readable) */
  date: string;
  /** Current status */
  status: WorkStatus;
  /** Array of image URLs */
  images: string[];
  /** Array of tag identifiers */
  tags: string[];
  /** ISO 8601 timestamp */
  createdAt: string;
  /** ISO 8601 timestamp */
  updatedAt: string;
}

// ============================================================================
// Staff (スタッフ・チームメンバー)
// ============================================================================

/**
 * Staff member state
 * - active: Currently active
 * - suspended: Temporarily suspended
 * - missing: Missing/disappeared (horror state)
 */
export type StaffState = "active" | "suspended" | "missing";

/**
 * Staff member entity
 */
export interface Staff {
  /** Unique identifier */
  id: string;
  /** URL-friendly identifier */
  slug: string;
  /** Full name */
  name: string;
  /** Job title or role */
  role: string;
  /** Team or department */
  team: string;
  /** Biography */
  bio: string;
  /** Photo URL */
  photo: string;
  /** Visibility setting */
  visibility: Visibility;
  /** Current state */
  state: StaffState;
  /** Reason for removal/suspension (optional) */
  removedReason?: string;
  /** ISO 8601 timestamp */
  createdAt: string;
  /** ISO 8601 timestamp */
  updatedAt: string;
}

// ============================================================================
// Inbox (フォーム受信箱)
// ============================================================================

/**
 * Inbox message category
 * - general: General inquiry
 * - press: Press inquiry
 * - quote: Quote request
 * - complaint: Complaint
 * - sign: Anomalous sign/warning (horror state)
 */
export type InboxCategory =
  | "general"
  | "press"
  | "quote"
  | "complaint"
  | "sign";

/**
 * Inbox message severity
 */
export type InboxSeverity = "low" | "medium" | "high";

/**
 * Inbox message status
 * - open: Newly received
 * - pending: Under review
 * - resolved: Handled
 * - rewritten: Content has been altered (horror state)
 */
export type InboxStatus = "open" | "pending" | "resolved" | "rewritten";

/**
 * Contact form submission
 */
export interface InboxMessage {
  /** Unique identifier */
  id: string;
  /** Sender name */
  name: string;
  /** Sender email */
  email: string;
  /** Message subject */
  subject: string;
  /** Message content */
  message: string;
  /** Category classification */
  category: InboxCategory;
  /** Severity level */
  severity: InboxSeverity;
  /** Current status */
  status: InboxStatus;
  /** ISO 8601 timestamp */
  createdAt: string;
  /** ISO 8601 timestamp */
  updatedAt: string;
}

// ============================================================================
// Media (メディア・ファイル)
// ============================================================================

/**
 * Media file entity
 */
export interface Media {
  /** Unique identifier */
  id: string;
  /** Original filename */
  filename: string;
  /** Public URL */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** MIME type (e.g., "image/jpeg") */
  mimeType: string;
  /** File size in bytes */
  size: number;
  /** Image width in pixels (optional, for images) */
  width?: number;
  /** Image height in pixels (optional, for images) */
  height?: number;
  /** ISO 8601 timestamp */
  createdAt: string;
}

// ============================================================================
// Comments (コメント)
// ============================================================================

/**
 * Comment moderation status
 * - pending: Awaiting moderation
 * - approved: Approved and visible
 * - spam: Marked as spam
 * - trash: Deleted/trashed
 */
export type CommentStatus = "pending" | "approved" | "spam" | "trash";

/**
 * User comment on a post
 */
export interface Comment {
  /** Unique identifier */
  id: string;
  /** Parent post ID */
  postId: string;
  /** Commenter name */
  author: string;
  /** Commenter email */
  email: string;
  /** Comment content */
  content: string;
  /** Moderation status */
  status: CommentStatus;
  /** ISO 8601 timestamp */
  createdAt: string;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard for Post
 */
export function isPost(obj: unknown): obj is Post {
  if (typeof obj !== "object" || obj === null) return false;
  const p = obj as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.slug === "string" &&
    typeof p.title === "string" &&
    typeof p.content === "string" &&
    typeof p.status === "string" &&
    Array.isArray(p.tags) &&
    Array.isArray(p.reviewComments)
  );
}

/**
 * Type guard for Work
 */
export function isWork(obj: unknown): obj is Work {
  if (typeof obj !== "object" || obj === null) return false;
  const w = obj as Record<string, unknown>;
  return (
    typeof w.id === "string" &&
    typeof w.slug === "string" &&
    typeof w.title === "string" &&
    typeof w.status === "string" &&
    Array.isArray(w.images) &&
    Array.isArray(w.tags)
  );
}

/**
 * Type guard for Staff
 */
export function isStaff(obj: unknown): obj is Staff {
  if (typeof obj !== "object" || obj === null) return false;
  const s = obj as Record<string, unknown>;
  return (
    typeof s.id === "string" &&
    typeof s.slug === "string" &&
    typeof s.name === "string" &&
    typeof s.role === "string" &&
    typeof s.state === "string"
  );
}

/**
 * Type guard for InboxMessage
 */
export function isInboxMessage(obj: unknown): obj is InboxMessage {
  if (typeof obj !== "object" || obj === null) return false;
  const m = obj as Record<string, unknown>;
  return (
    typeof m.id === "string" &&
    typeof m.name === "string" &&
    typeof m.email === "string" &&
    typeof m.category === "string" &&
    typeof m.status === "string"
  );
}
