'use client'

import { useActionState } from 'react'
import { forgotPasswordAction, type AuthActionState } from '@/app/auth/actions'
import styles from '@/app/signin/signin.module.css'

const initialState: AuthActionState = {}

export default function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    initialState,
  )

  return (
    <>
      {state.error && <div className={styles.error}>{state.error}</div>}
      {state.success && <div className={styles.success}>{state.success}</div>}
      {!state.success && (
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
          <button className={styles.submit} type="submit" disabled={pending}>
            {pending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}
    </>
  )
}
