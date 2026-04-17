'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './signin.module.css'

export default function SignIn() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />
      <div className={styles.wrap}>
        <Link href="/" className={styles.logo}>MINGYUN</Link>

        <div className={styles.card}>
          <div className={styles.topLine} />
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.sub}>Sign in to access your readings and reports</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="you@example.com" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" placeholder="••••••••" required />
            </div>
            <div className={styles.forgot}>
              <Link href="/support">Forgot password?</Link>
            </div>
            <button type="submit" className={styles.submit}>Sign In →</button>
          </form>

          <div className={styles.dividerWrap}>
            <span className={styles.divider}>or continue with</span>
          </div>

          <div className={styles.socials}>
            <button className={styles.social}>
              <span>G</span> Google
            </button>
            <button className={styles.social}>
              <span>A</span> Apple
            </button>
          </div>

          <p className={styles.switch}>
            No account yet? <Link href="/signup">Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
