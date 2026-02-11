/**
 * User data access functions
 *
 * Provides functions to retrieve user data from JSON source.
 */

import type { User, SafeUser } from '@/types';
import usersData from '@/data/users.json';

/**
 * Get all users (including sensitive fields)
 */
export async function getAllUsers(): Promise<User[]> {
  return usersData as User[];
}

/**
 * Get a user by username (including sensitive fields for auth)
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find((u) => u.username === username) || null;
}

/**
 * Get a user by ID (including sensitive fields for auth)
 */
export async function getUserById(id: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find((u) => u.id === id) || null;
}

/**
 * Strip sensitive fields from a User
 */
export function toSafeUser(user: User): SafeUser {
  const { passwordHash: _, salt: __, ...safe } = user;
  return safe;
}

/**
 * Get a safe user by ID (without sensitive fields)
 */
export async function getSafeUserById(id: string): Promise<SafeUser | null> {
  const user = await getUserById(id);
  return user ? toSafeUser(user) : null;
}
