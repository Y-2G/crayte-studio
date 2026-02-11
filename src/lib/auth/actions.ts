'use server';

import { redirect } from 'next/navigation';
import { getUserByUsername } from '@/lib/data/users';
import { verifyPassword } from './password';
import { createSession, deleteSession } from './session';

export interface LoginState {
  error?: string;
}

/**
 * Server Action: Authenticate user and create session
 */
export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get('username');
  const password = formData.get('password');

  if (typeof username !== 'string' || typeof password !== 'string') {
    return { error: 'ユーザー名とパスワードを入力してください' };
  }

  if (!username.trim() || !password.trim()) {
    return { error: 'ユーザー名とパスワードを入力してください' };
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return { error: 'ユーザー名またはパスワードが正しくありません' };
  }

  const isValid = await verifyPassword(password, user.salt, user.passwordHash);
  if (!isValid) {
    return { error: 'ユーザー名またはパスワードが正しくありません' };
  }

  await createSession({
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
  });

  redirect('/admin');
}

/**
 * Server Action: Delete session and redirect to login
 */
export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect('/admin/login');
}
