import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/lib/supabase/auth-server'
import SignInForm from './SignInForm'
import styles from './signin.module.css'

type SignInPageProps = {
  searchParams: Promise<{
    confirmed?: string
    reset?: string
    error?: string
  }>
}

export default async function SignIn({ searchParams }: SignInPageProps) {
  const user = await getAuthenticatedUser()
  if (user) redirect('/dashboard')

  const params = await searchParams
  const notice =
    params.confirmed === '1'
      ? 'Email confirmed. You can now sign in.'
      : params.reset === '1'
        ? 'Password updated. Sign in with your new password.'
        : params.error === 'confirmation'
          ? 'The email link is invalid or expired. Please try again.'
          : undefined

  return (
    <main className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.wrap}>
        <Link href="/" className={styles.logo}>
          UNMYUNG <span>FOUR PILLARS</span>
        </Link>
        <section className={styles.card}>
          <div className={styles.topLine} />
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.sub}>Sign in to your UNMYUNG account.</p>
          <SignInForm notice={notice} />
          <p className={styles.switch}>
            New to UNMYUNG? <Link href="/signup">Create an account</Link>
          </p>
        </section>
      </div>
    </main>
  )
}
