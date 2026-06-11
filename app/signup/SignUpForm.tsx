'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signUpAction, type AuthActionState } from '@/app/auth/actions'
import styles from './signup.module.css'

const initialState: AuthActionState = {}

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState)

  if (state.success) {
    return <div className={styles.success}>{state.success}</div>
  }

  return (
    <>
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
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Enter the same password again"
              minLength={8}
              required
            />
            <span className={styles.fieldHint}>
              Re-enter the password above exactly as written.
            </span>
          </div>
        </div>
        <label className={styles.terms}>
          <input name="terms" type="checkbox" required />
          <span>
            I agree to the <Link href="/terms">Terms</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </span>
        </label>
        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </>
  )
}
