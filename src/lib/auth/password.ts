/**
 * Password hashing and verification utilities
 *
 * Uses SHA-256 + salt via Web Crypto API (no external dependencies).
 */

/**
 * Generate a random salt (16 bytes, hex-encoded)
 */
export async function generateSalt(): Promise<string> {
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hash a password with the given salt using SHA-256
 */
export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Verify a password against a stored hash using timing-safe comparison
 */
export async function verifyPassword(
  password: string,
  salt: string,
  storedHash: string
): Promise<boolean> {
  const computedHash = await hashPassword(password, salt);
  return timingSafeEqual(computedHash, storedHash);
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
