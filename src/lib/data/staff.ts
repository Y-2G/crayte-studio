/**
 * Staff data access functions
 *
 * Provides functions to retrieve and filter staff member data.
 * Data source: Markdown files in src/content/members/ via getAllMembers().
 */

import type { Staff, StaffState } from '@/types';
import { getAllMembers, type Member } from '@/lib/members';

/**
 * Convert a Member to a Staff entity
 */
function memberToStaff(member: Member): Staff {
  return {
    id: member.id || `staff-auto-${member.slug}`,
    slug: member.slug,
    name: member.name,
    role: member.role,
    team: member.team,
    bio: member.content.trim(),
    photo: member.photo,
    visibility: (member.visibility || 'public') as Staff['visibility'],
    state: (member.state || 'active') as StaffState,
    removedReason: member.removedReason,
    createdAt: member.createdAt || `${member.joinedAt}-01T00:00:00Z`,
    updatedAt: member.updatedAt || `${member.joinedAt}-01T00:00:00Z`,
  };
}

/**
 * Get all staff members (including suspended and missing)
 */
export async function getAllStaff(): Promise<Staff[]> {
  const members = await getAllMembers();
  return members.map(memberToStaff);
}

/**
 * Get a single staff member by slug
 *
 * @param slug - URL-friendly identifier
 * @returns Staff if found, null otherwise
 */
export async function getStaffBySlug(slug: string): Promise<Staff | null> {
  const staff = await getAllStaff();
  return staff.find((member) => member.slug === slug) || null;
}

/**
 * Get a single staff member by ID
 *
 * @param id - Unique identifier
 * @returns Staff if found, null otherwise
 */
export async function getStaffById(id: string): Promise<Staff | null> {
  const staff = await getAllStaff();
  return staff.find((member) => member.id === id) || null;
}

/**
 * Get active staff members (state: 'active', visibility: 'public')
 * This is what should be displayed on the public website
 */
export async function getActiveStaff(): Promise<Staff[]> {
  const staff = await getAllStaff();
  return staff.filter(
    (member) => member.state === 'active' && member.visibility === 'public'
  );
}

/**
 * Get staff by specific state
 *
 * @param state - Staff state to filter by
 */
export async function getStaffByState(state: StaffState): Promise<Staff[]> {
  const staff = await getAllStaff();
  return staff.filter((member) => member.state === state);
}

/**
 * Get staff by team/department
 *
 * @param team - Team name to filter by
 */
export async function getStaffByTeam(team: string): Promise<Staff[]> {
  const staff = await getAllStaff();
  return staff.filter((member) => member.team === team);
}

/**
 * Get staff by role
 *
 * @param role - Role name to filter by
 */
export async function getStaffByRole(role: string): Promise<Staff[]> {
  const staff = await getAllStaff();
  return staff.filter((member) => member.role === role);
}

/**
 * Get all unique teams from staff members
 */
export async function getAllTeams(): Promise<string[]> {
  const staff = await getAllStaff();
  const teams = staff.map((member) => member.team);
  return Array.from(new Set(teams));
}

/**
 * Get all unique roles from staff members
 */
export async function getAllRoles(): Promise<string[]> {
  const staff = await getAllStaff();
  const roles = staff.map((member) => member.role);
  return Array.from(new Set(roles));
}

/**
 * Get staff count by state
 *
 * @returns Object with counts for each state
 */
export async function getStaffCountByState(): Promise<
  Record<StaffState, number>
> {
  const staff = await getAllStaff();
  return {
    active: staff.filter((m) => m.state === 'active').length,
    suspended: staff.filter((m) => m.state === 'suspended').length,
    missing: staff.filter((m) => m.state === 'missing').length,
  };
}
