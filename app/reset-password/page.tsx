import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import ResetPasswordForm from './ResetPasswordForm'
import styles from '@/app/signin/signin.module.css'

export default async function ResetPasswordPage() {
  const user = await getAuthenticatedUser()
  if (!user) redirect('/forgot-password')

  return (
    <main className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.wrap}>
        <Link href="/" className={styles.logo}>
          UNMYUNG <span>FOUR PILLARS</span>
        </Link>
        <section className={styles.card}>
          <div className={styles.topLine} />
          <h1 className={styles.title}>Choose New Password</h1>
          <p className={styles.sub}>Enter a new password for your account.</p>
          <ResetPasswordForm />
        </section>
      </div>
    </main>
  )
}
