/**
 * Member data access functions
 *
 * Loads member data from markdown files in src/content/members/.
 * Each markdown file has YAML frontmatter with metadata and a markdown body.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const membersDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "members"
);

export interface Member {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  team: string;
  photo: string;
  joinedAt: string;
  skills: string[];
  motto: string;
  content: string;
  htmlContent: string;
  // 管理画面用フィールド（オプショナル）
  id?: string;
  visibility?: "public" | "private";
  state?: "active" | "suspended" | "missing";
  removedReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

function parseMemberFile(fileName: string): Member {
  const fullPath = path.join(membersDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  const htmlContent = marked.parse(content, { async: false }) as string;

  return {
    slug: data.slug || fileName.replace(/\.md$/, ""),
    name: data.name || "",
    nameEn: data.nameEn || "",
    role: data.role || "",
    team: data.team || "",
    photo: data.photo || "",
    joinedAt: data.joinedAt || "",
    skills: data.skills || [],
    motto: data.motto || "",
    content,
    htmlContent,
    // 管理画面用フィールド
    id: data.id,
    visibility: data.visibility,
    state: data.state,
    removedReason: data.removedReason,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/**
 * Get all members sorted by joinedAt (oldest first)
 */
export async function getAllMembers(): Promise<Member[]> {
  if (!fs.existsSync(membersDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(membersDirectory)
    .filter((name) => name.endsWith(".md"));

  const members = fileNames.map(parseMemberFile);

  return members.sort((a, b) => {
    // joinedAt format is "YYYY-MM", convert to date for comparison
    const dateA = new Date(a.joinedAt + "-01");
    const dateB = new Date(b.joinedAt + "-01");
    return dateA.getTime() - dateB.getTime();
  });
}

/**
 * Get a single member by slug
 */
export async function getMemberBySlug(slug: string): Promise<Member | null> {
  const members = await getAllMembers();
  return members.find((member) => member.slug === slug) || null;
}

/**
 * Get members by team
 */
export async function getMembersByTeam(team: string): Promise<Member[]> {
  const members = await getAllMembers();
  return members.filter((member) => member.team === team);
}

/**
 * Get related members (same team, excluding current)
 */
export async function getRelatedMembers(
  slug: string,
  limit: number = 3
): Promise<Member[]> {
  const current = await getMemberBySlug(slug);
  if (!current) return [];

  const members = await getAllMembers();
  return members
    .filter((m) => m.slug !== slug && m.team === current.team)
    .slice(0, limit);
}

/**
 * Get public members (visibility=public and state!=missing)
 * This is what should be displayed on the public website
 */
export async function getPublicMembers(): Promise<Member[]> {
  const members = await getAllMembers();
  return members.filter(
    (m) =>
      (m.visibility || "public") === "public" &&
      (m.state || "active") !== "missing"
  );
}

/**
 * Get all member slugs (for static generation)
 */
export async function getAllMemberSlugs(): Promise<string[]> {
  const members = await getAllMembers();
  return members.map((m) => m.slug);
}

/**
 * Get public member slugs (for static generation of public pages)
 */
export async function getPublicMemberSlugs(): Promise<string[]> {
  const members = await getPublicMembers();
  return members.map((m) => m.slug);
}
