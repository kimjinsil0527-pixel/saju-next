'use client'

import { useActionState } from 'react'
import { resetPasswordAction, type AuthActionState } from '@/app/auth/actions'
import styles from '@/app/signin/signin.module.css'

const initialState: AuthActionState = {}

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    initialState,
  )

  return (
    <>
      {state.error && <div className={styles.error}>{state.error}</div>}
      <form className={styles.form} action={formAction}>
        <div className={styles.field}>
          <label htmlFor="password">New Password</label>
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
            minLength={8}
            required
          />
        </div>
        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </>
  )
}
