'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signInAction, type AuthActionState } from '@/app/auth/actions'
import styles from './signin.module.css'

const initialState: AuthActionState = {}

export default function SignInForm({ notice }: { notice?: string }) {
  const [state, formAction, pending] = useActionState(signInAction, initialState)

  return (
    <>
      {notice && <div className={styles.success}>{notice}</div>}
      {state.error && <div className={styles.error}>{state.error}</div>}
      <form className={styles.form} action={formAction}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className={styles.forgot}>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </>
  )
}
