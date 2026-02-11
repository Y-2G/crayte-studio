/**
 * Session management via HMAC-SHA256 signed cookies
 *
 * Uses Web Crypto API for signing/verification (no external dependencies).
 */

import { cookies } from 'next/headers';
import type { SessionPayload } from '@/types';

const COOKIE_NAME = 'admin-session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }
  return secret;
}

/**
 * Create an HMAC-SHA256 signature for the given data
 */
async function sign(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Verify an HMAC-SHA256 signature
 */
async function verify(data: string, signature: string): Promise<boolean> {
  const expected = await sign(data);
  if (expected.length !== signature.length) return false;
  let result = 0;
  for (let i = 0; i < expected.length; i++) {
    result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Create a signed session cookie
 */
export async function createSession(
  payload: Omit<SessionPayload, 'expiresAt'>
): Promise<void> {
  const session: SessionPayload = {
    ...payload,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  const data = JSON.stringify(session);
  const signature = await sign(data);
  const cookieValue = `${Buffer.from(data).toString('base64')}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

/**
 * Parse and verify a session cookie value (without accessing cookie store)
 */
export async function verifySessionValue(
  cookieValue: string
): Promise<SessionPayload | null> {
  const dotIndex = cookieValue.lastIndexOf('.');
  if (dotIndex === -1) return null;

  const base64Data = cookieValue.substring(0, dotIndex);
  const signature = cookieValue.substring(dotIndex + 1);

  let data: string;
  try {
    data = Buffer.from(base64Data, 'base64').toString('utf-8');
  } catch {
    return null;
  }

  const isValid = await verify(data, signature);
  if (!isValid) return null;

  try {
    const payload = JSON.parse(data) as SessionPayload;
    if (payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Get the current session from cookies (for use in Server Components / Actions)
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return null;
  return verifySessionValue(cookie.value);
}

/**
 * Delete the session cookie
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
