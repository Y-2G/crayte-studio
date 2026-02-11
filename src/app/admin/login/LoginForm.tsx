'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from '@/lib/auth/actions';
import styles from './page.module.css';

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form action={formAction} className={styles.form}>
      {state.error && (
        <div className={styles.error} role="alert">
          {state.error}
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="username" className={styles.label}>
          ユーザー名
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={styles.input}
          disabled={isPending}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={styles.input}
          disabled={isPending}
        />
      </div>
      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  );
}
